type Patent = NonNullable<RouterOutput["data"]["patent"]["getPatent"]>;
type PatentFunding = NonNullable<
   RouterOutput["data"]["patent"]["getPatentFunding"]
>;
export type PatentFundingRecord = PatentFunding["fundingRecords"][number];
export type PatentFundingUnit = PatentFunding["fundingUnits"][number];
export type FundingPlan = NonNullable<PatentFunding["plan"]>;
export type FundingPlanAllocation = FundingPlan["planAllocations"][number];

// 資助單位帳務的回傳型別
interface FundingUnitAccounting {
   originalAmount: number
   unitContributions: { unitId: number, amount: number }[]
   remainingAmount: number
   record: PatentFundingRecord
}

// 校內帳務的調整型別
export interface InternalAccountingAdjustment {
   targetId: number
   targetName: string
   amount: number // 可調整的金額
}

export const usePatentFundings = (patentService: {
   data: Ref<RouterOutput["data"]["patent"]["getPatent"]>
   refreshCallback?: () => Promise<void>
}) => {
   const { data: patent, refreshCallback } = patentService;

   const { $trpc } = useNuxtApp();
   const { data: funding, refresh } = useAsyncData<
      RouterOutput["data"]["patent"]["getPatentFunding"]
   >(
      "patent-funding-" + patent.value?.PatentID,
      async () => {
         if (!patent.value) return null;
         return await $trpc.data.patent.getPatentFunding.query({
            PatentID: patent.value.PatentID,
         });
      },
      {
         lazy: true,
      },
   );
   // === 紀錄相關 ===
   // Computed properties
   const fundingRecords = computed(() => funding.value?.fundingRecords ?? []);
   const fundingUnits = computed(() => funding.value?.fundingUnits ?? []);
   const exportableRecords = computed(() =>
      fundingRecords.value.filter((record) => record.ExportID === null),
   );

   // 新增帳目
   const addFundingRecord = async (record: {
      name: string
      amount: number
      description?: string
      date: Date
      canFundingBy: number[]
   }) => {
      if (!patent.value?.funding) return;
      await $trpc.data.patent.updatePatent.mutate([
         {
            data: {
               funding: {
                  update: {
                     fundingRecords: {
                        create: {
                           Amount: record.amount,
                           Date: record.date,
                           canFundingBy: {
                              connect: record.canFundingBy.map((id) => ({
                                 FundingUnitID: id,
                              })),
                           },
                           Name: record.name,
                           Description: record.description,
                        },
                     },
                  },
               },
            },
            patentID: patent.value.PatentID,
         },
      ]);

      if (refreshCallback) await refreshCallback();
      refresh();
   };

   // === 導出相關 ===
   // 導出的紀錄
   const exportedRecords = computed(() => funding.value?.fundingExports ?? []);

   // 計算資助單位帳務
   const calculateFundingUnitAccounting = (
      selectedRecords: PatentFundingRecord[],
      unitContributions: { [fundingUnitId: number]: number },
   ): FundingUnitAccounting[] => {
      const remainingContributions = { ...unitContributions };
      const accounting = selectedRecords.map((record) => {
         const applicableUnits = record.canFundingBy.map(
            (unit) => unit.FundingUnitID,
         );
         let remainingAmount = record.Amount;
         const contributions: { unitId: number, amount: number }[] = [];

         // 貪婪分配：優先用完可資助單位的金額
         for (const unitId of applicableUnits) {
            if (remainingContributions[unitId] > 0) {
               const amount = Math.min(
                  remainingContributions[unitId],
                  remainingAmount,
               );
               contributions.push({ unitId, amount });
               remainingContributions[unitId] -= amount;
               remainingAmount -= amount;
               if (remainingAmount <= 0) break;
            }
         }

         return {
            originalAmount: record.Amount,
            unitContributions: contributions,
            remainingAmount: Math.max(remainingAmount, 0), // 避免小數誤差
            record,
         };
      });

      return accounting;
   };

   // 計算校內帳務（初始值）
   const calculateInternalAccounting = (
      fundingUnitAccounting: FundingUnitAccounting[],
      fundingPlan: FundingPlan,
   ): {
      records: FundingUnitAccounting[]
      results: InternalAccountingAdjustment[]
   } => {
      // 篩選有剩餘金額的紀錄
      const remainingRecords = fundingUnitAccounting.filter(
         (r) => r.remainingAmount > 0,
      );
      const totalRemaining = remainingRecords.reduce(
         (sum, r) => sum + r.remainingAmount,
         0,
      );
      // 根據 FundingPlan 計算各目標的初始分配
      const results = fundingPlan.planAllocations.map(
         (alloc: FundingPlanAllocation) => ({
            targetId: alloc.TargetID,
            targetName: alloc.target.Name,
            amount: (alloc.Percentage / 100) * totalRemaining,
         }),
      );
      return { records: remainingRecords, results };
   };

   // 校內帳務的調整用 ref
   const internalAdjustments = ref<InternalAccountingAdjustment[]>([]);
   const totalInternalAmount = computed(() =>
      internalAdjustments.value.reduce((sum, adj) => sum + adj.amount, 0),
   );

   // 執行導出
   const performExport = async (
      fundingUnitAccounting: FundingUnitAccounting[],
      internalAccounting: InternalAccountingAdjustment[],
   ) => {
      if (!patent.value?.funding) return;

      // 計算各資助單位的總貢獻
      const totalContributions: { [unitId: number]: number } = {};
      fundingUnitAccounting.forEach((account) => {
         account.unitContributions.forEach((contrib) => {
            totalContributions[contrib.unitId]
               = (totalContributions[contrib.unitId] || 0) + contrib.amount;
         });
      });

      const selectedRecords = fundingUnitAccounting.map((a) => a.record);
      const exportDate = new Date();

      await $trpc.data.patent.updatePatent.mutate([
         {
            data: {
               funding: {
                  update: {
                     fundingExports: {
                        create: {
                           ExportDate: exportDate,
                           exportRecords: {
                              connect: selectedRecords.map((r) => ({
                                 FundingRecordID: r.FundingRecordID,
                              })),
                           },
                           contributions: {
                              createMany: {
                                 data: Object.entries(totalContributions).map(
                                    ([unitId, amount]) => ({
                                       FundingUnitID: parseInt(unitId),
                                       Amount: amount,
                                    }),
                                 ),
                              },
                           },
                           internalAllocations: {
                              createMany: {
                                 data: internalAccounting.map((alloc) => ({
                                    PlanTargetID: alloc.targetId,
                                    Amount: alloc.amount,
                                 })),
                              },
                           },
                        },
                     },
                  },
               },
            },
            patentID: patent.value.PatentID,
         },
      ]);

      if (refreshCallback) await refreshCallback();
      refresh();
   };

   // 編輯導出（假設更新 ExportDate 與金額）
   const editExport = async (
      exportId: number,
      data: {
         exportDate: Date
         contributions: { unitId: number, amount: number }[]
         internalAllocations: { targetId: number, amount: number }[]
      },
   ) => {
      if (!patent.value?.funding) return;

      await $trpc.data.patent.updatePatent.mutate([
         {
            data: {
               funding: {
                  update: {
                     fundingExports: {
                        update: {
                           where: { ExportID: exportId },
                           data: {
                              contributions: {
                                 deleteMany: {},
                              },
                              internalAllocations: {
                                 deleteMany: {},
                              },
                           },
                        },
                     },
                  },
               },
            },
            patentID: patent.value.PatentID,
         },
         {
            data: {
               funding: {
                  update: {
                     fundingExports: {
                        update: {
                           where: { ExportID: exportId },
                           data: {
                              ExportDate: data.exportDate,
                              contributions: {
                                 createMany: {
                                    data: data.contributions.map((c) => ({
                                       FundingUnitID: c.unitId,
                                       Amount: c.amount,
                                    })),
                                 },
                              },
                              internalAllocations: {
                                 createMany: {
                                    data: data.internalAllocations.map((a) => ({
                                       PlanTargetID: a.targetId,
                                       Amount: a.amount,
                                    })),
                                 },
                              },
                           },
                        },
                     },
                  },
               },
            },
            patentID: patent.value.PatentID,
         },
      ]);

      if (refreshCallback) await refreshCallback();
      refresh();
   };

   // 刪除導出
   const deleteExport = async (exportId: number) => {
      if (!patent.value?.funding) return;

      await $trpc.data.patent.updatePatent.mutate([
         {
            data: {
               funding: {
                  update: {
                     fundingExports: {
                        delete: { ExportID: exportId },
                     },
                  },
               },
            },
            patentID: patent.value.PatentID,
         },
      ]);

      if (refreshCallback) await refreshCallback();
      refresh();
   };

   return {
      fundingUnits,
      // 紀錄相關
      records: {
         actions: { addFundingRecord },
         list: fundingRecords,
      },
      // 導出相關
      exports: {
         actions: {
            calculateFundingUnitAccounting,
            calculateInternalAccounting,
            performExport,
            editExport,
            deleteExport,
         },
         list: exportedRecords,
         exportableRecords,
         internalAdjustments, // 供 UI 調整校內帳務
         totalInternalAmount, // 校內總負責金額
      },
   };
};

export type UsePatentFundings = ReturnType<typeof usePatentFundings>;
