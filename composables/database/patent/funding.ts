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

interface ContributionEntry {
   unitId: number
   amount: number
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
      unitContributions: ContributionEntry[],
   ): FundingUnitAccounting[] => {
      // 創建 remainingContributions 的深層副本，避免修改原始陣列
      const remainingContributions = unitContributions.map((entry) => ({
         ...entry,
      }));

      const accounting = selectedRecords.map((record) => {
         const applicableUnits = record.canFundingBy.map(
            (unit) => unit.FundingUnitID,
         );
         let remainingAmount = Math.floor(record.Amount);
         const contributions: { unitId: number, amount: number }[] = [];

         // 貪婪分配：優先用完可資助單位的金額
         for (const unitId of applicableUnits) {
            // 查找對應 unitId 的 ContributionEntry
            const contribEntry = remainingContributions.find(
               (entry) => entry.unitId === unitId,
            );
            if (contribEntry) {
               if (remainingAmount > 0) {
                  const amount = Math.min(
                     Math.floor(contribEntry.amount),
                     remainingAmount,
                  );
                  contributions.push({ unitId, amount });
                  contribEntry.amount -= amount; // 更新副本中的 amount
                  remainingAmount -= amount;
               }
               else {
                  contributions.push({ unitId, amount: 0 });
               }
            }
         }

         return {
            originalAmount: Math.floor(record.Amount),
            unitContributions: contributions,
            remainingAmount: Math.max(remainingAmount, 0),
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

   const useExportModal = (selectedRecords: PatentFundingRecord[]) => {
   // 定義底層 ref，不包含 remainingAmount
      const fundingUnitAccountingRef = ref<FundingUnitAccounting[]>([]);
      const internalAccountingAdjustmentRef = ref<InternalAccountingAdjustment[]>(
         [],
      );

      const fundingUnits = computed(() => funding.value?.fundingUnits ?? []);

      // UnitContribution 介面
      interface UnitContribution {
         fundingUnitId: number
         name: string
         amount: number
      }

      // unitContributionsRef 為陣列
      const unitContributionsRef = ref<UnitContribution[]>(
         fundingUnits.value.map((unit) => ({
            fundingUnitId: unit.FundingUnitID,
            name: unit.fundingUnit.Name,
            amount: 0,
         })),
      );

      // 定義 computed property，動態計算 remainingAmount
      const fundingUnitAccounting = computed({
      // Getter：返回帶有 remainingAmount 的數組
         get: () => {
            return fundingUnitAccountingRef.value.map((item) => {
               const totalContributed = item.unitContributions.reduce(
                  (sum, contrib) => sum + contrib.amount,
                  0,
               );
               return {
                  ...item,
                  remainingAmount: Math.max(
                     item.originalAmount - totalContributed,
                     0,
                  ),
               };
            });
         },
         // Setter：更新底層 ref
         set: (newValue) => {
            fundingUnitAccountingRef.value = newValue.map((item) => ({
               originalAmount: item.originalAmount,
               unitContributions: item.unitContributions,
               record: item.record,
            }));
         },
      });

      // 計算各資助單位的剩餘金額
      const remainingContributions = computed<ContributionEntry[]>(() => {
         const totalContributions: ContributionEntry[] = [];
         fundingUnitAccounting.value.forEach((account) => {
            account.unitContributions.forEach((contrib) => {
               const existing = totalContributions.find(
                  (entry) => entry.unitId === contrib.unitId,
               );
               if (existing) {
                  existing.amount += contrib.amount;
               }
               else {
                  totalContributions.push({
                     unitId: contrib.unitId,
                     amount: contrib.amount,
                  });
               }
            });
         });
         return unitContributionsRef.value.map((contrib) => {
            const totalContrib
            = totalContributions.find(
               (entry) => entry.unitId === contrib.fundingUnitId,
            )?.amount || 0;
            return {
               unitId: contrib.fundingUnitId,
               amount: contrib.amount - totalContrib,
            };
         });
      });

      // 計算並覆寫 FundingUnitAccounting[]
      const calculateDefaultFundingUnitAccounting = () => {
         if (!selectedRecords.length) return;
         const contributionsAmounts: ContributionEntry[]
         = unitContributionsRef.value.map((contrib) => ({
            unitId: contrib.fundingUnitId,
            amount: contrib.amount,
         }));
         const accounting = calculateFundingUnitAccounting(
            selectedRecords,
            contributionsAmounts,
         );
         // 直接賦值給 ref，computed 會自動更新
         fundingUnitAccountingRef.value = accounting;
         internalAccountingAdjustmentRef.value = [];
      };

      // 計算並覆寫 InternalAccountingAdjustment[]
      const calculateDefaultInternalAccounting = () => {
         if (!funding.value?.plan) return;
         const { results } = calculateInternalAccounting(
            fundingUnitAccounting.value,
            funding.value.plan,
         );
         internalAccountingAdjustmentRef.value = results;
      };

      // 回傳所有需要的資料與函數
      return {
         fundingUnitAccounting, // 返回 computed property
         fundingUnitAccountingRef, // 可選：如果需要直接訪問底層 ref
         internalAccountingAdjustmentRef,
         calculateDefaultFundingUnitAccounting,
         calculateDefaultInternalAccounting,
         unitContribution: {
            contributions: unitContributionsRef,
            remains: remainingContributions,
         },
      };
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
      },
      useExportModal,
   };
};

export type UsePatentFundings = ReturnType<typeof usePatentFundings>;
