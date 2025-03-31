import { computedWithControl } from "@vueuse/core";
type Patent = NonNullable<RouterOutput["data"]["patent"]["getPatent"]>;
type PatentFunding = NonNullable<
   RouterOutput["data"]["patent"]["getPatentFunding"]
>;
export type PatentFundingRecord = PatentFunding["fundingRecords"][number];
export type PatentFundingUnit = PatentFunding["fundingUnits"][number];
export type FundingPlan = NonNullable<PatentFunding["plan"]>;
export type FundingPlanAllocation = FundingPlan["planAllocations"][number];

export interface FundingUnitAccounting {
   originalAmount: number
   unitContributions: { unitId: number, amount: number }[]
   record: PatentFundingRecord
   remainingAmount: number
}

export interface FundingUnitAccountingDynamic extends FundingUnitAccounting {
   unitContributions: {
      unitId: number
      name: string
      amount: number
      percent: number
   }[]
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
   name: string
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

   // [帳目 CRUD]
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

   // 獲取帳目
   const getFundingRecord = (recordId: number) => {
      return fundingRecords.value.find(
         (record) => record.FundingRecordID === recordId,
      );
   };

   // 更新帳目
   const updateFundingRecord = async (
      recordId: number,
      record: {
         name: string
         amount: number
         description?: string
         date: Date
         canFundingBy: number[]
      },
   ) => {
      if (!patent.value?.funding) return;
      await $trpc.data.patent.updatePatent.mutate([
         {
            data: {
               funding: {
                  update: {
                     fundingRecords: {
                        update: {
                           where: { FundingRecordID: recordId },
                           data: {
                              Amount: record.amount,
                              Date: record.date,
                              Name: record.name,
                              Description: record.description,
                              canFundingBy: {
                                 set: record.canFundingBy.map((id) => ({
                                    FundingUnitID: id,
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

   // 刪除帳目
   const deleteFundingRecord = async (recordIds: number[]) => {
      if (!patent.value?.funding) return;
      console.log(recordIds);
      await $trpc.data.patent.updatePatent.mutate([
         {
            data: {
               funding: {
                  update: {
                     data: {
                        fundingRecords: {
                           deleteMany: {
                              FundingRecordID: {
                                 in: recordIds,
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

   const useDynamicFundingUnitAccounting = (
      value: Ref<FundingUnitAccounting[]>,
   ) => {
      return useDeepComputed(
         computed({
            get: () => {
               return value.value.map((item) => {
                  const totalContributed = item.unitContributions.reduce(
                     (sum, contrib) => sum + contrib.amount,
                     0,
                  );
                  const remainingAmount = Math.max(
                     item.originalAmount - totalContributed,
                     0,
                  );
                  return {
                     ...item,
                     unitContributions: item.unitContributions.map(
                        (contrib) => {
                           const percent = Math.ceil(
                              (contrib.amount / item.originalAmount) * 100,
                           );
                           return {
                              ...contrib,
                              name:
                                 fundingUnits.value.find(
                                    (unit) =>
                                       unit.FundingUnitID === contrib.unitId,
                                 )?.fundingUnit.Name ?? "",
                              percent,
                           };
                        },
                     ),
                     remainingAmount,
                  };
               });
            },
            set: (newValue) => {
               newValue.forEach((item, account_index) => {
                  item.unitContributions.forEach((contrib, contrib_index) => {
                     if (
                        contrib.amount
                        > item.remainingAmount + contrib.amount
                     ) {
                        contrib.amount = item.remainingAmount + contrib.amount;
                     }
                  });
               });
               value.value = newValue.map((item) => {
                  return {
                     originalAmount: item.originalAmount,
                     remainingAmount: item.remainingAmount,
                     unitContributions: item.unitContributions.map(
                        (contrib) => ({
                           unitId: contrib.unitId,
                           amount: contrib.amount,
                        }),
                     ),
                     record: item.record,
                  };
               });
            },
         }),
      );
   };

   const useDynamicFundingUnitRemaining = (
      accountingValue: Ref<FundingUnitAccountingDynamic[]>,
      fundingUnitEnrty: Ref<ContributionEntry[]>,
   ) => {
      return useDeepComputed(
         computed({
            get: () => {
               return fundingUnitEnrty.value.map((entry) => {
                  const totalContributed = accountingValue.value.reduce(
                     (sum, item) => {
                        const unitContrib = item.unitContributions.find(
                           (contrib) => contrib.unitId === entry.unitId,
                        );
                        return sum + (unitContrib ? unitContrib.amount : 0);
                     },
                     0,
                  );
                  const remainingAmount = Math.max(
                     entry.amount - totalContributed,
                     0,
                  );
                  return {
                     ...entry,
                     remainingAmount,
                  };
               });
            },
            set: (newValue) => {
               fundingUnitEnrty.value = newValue;
            },
         }),
      );
   };

   // === 導出相關 ===
   // 導出的紀錄
   const exportedRecords = computed(() => funding.value?.fundingExports ?? []);

   // 計算資助單位帳務
   const calculateFundingUnitAccounting = (
      selectedRecords: PatentFundingRecord[],
      unitContributions: ContributionEntry[],
   ): FundingUnitAccounting[] => {
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

   // 計算校內帳務
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
   // [編輯帳目]
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

   // 執行導出
   const performExport = async (
      fundingUnitAccounting: FundingUnitAccounting[],
      internalAccounting: InternalAccountingAdjustment[],
      name: string,
      description: string,
      exportId: number | null = null,
   ) => {
      if (!patent.value?.funding) return;

      const selectedRecords = fundingUnitAccounting.map((a) => a.record);
      const exportDate = new Date();
      if (!exportId) {
         await $trpc.data.patent.updatePatent.mutate([
            {
               data: {
                  funding: {
                     update: {
                        fundingExports: {
                           create: {
                              Name: name,
                              Description: description,
                              ExportDate: exportDate,
                              exportRecords: {
                                 connect: selectedRecords.map((r) => ({
                                    FundingRecordID: r.FundingRecordID,
                                 })),
                              },
                              contributions: {
                                 createMany: {
                                    data: fundingUnitAccounting.flatMap((a) =>
                                       a.unitContributions.map((contrib) => ({
                                          FundingUnitID: contrib.unitId,
                                          Amount: contrib.amount,
                                          RecordID: a.record.FundingRecordID,
                                       })),
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
      }
      else {
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
                                 Name: name,
                                 Description: description,
                                 ExportDate: exportDate,
                                 contributions: {
                                    createMany: {
                                       data: fundingUnitAccounting.flatMap(
                                          (a) =>
                                             a.unitContributions.map(
                                                (contrib) => ({
                                                   FundingUnitID:
                                                      contrib.unitId,
                                                   Amount: contrib.amount,
                                                   RecordID:
                                                      a.record.FundingRecordID,
                                                }),
                                             ),
                                       ),
                                    },
                                 },
                                 internalAllocations: {
                                    createMany: {
                                       data: internalAccounting.map(
                                          (alloc) => ({
                                             PlanTargetID: alloc.targetId,
                                             Amount: alloc.amount,
                                          }),
                                       ),
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
      }

      if (refreshCallback) await refreshCallback();
      refresh();
   };

   // 取得導出
   const getExport = (
      exportId: number,
   ): {
      fundingUnitAccounting: FundingUnitAccounting[]
      internalAccounting: InternalAccountingAdjustment[]
      records: PatentFundingRecord[]
      date: Date
      name: string
      description: string | null
   } | null => {
      const exportRecord = exportedRecords.value.find(
         (record) => record.ExportID === exportId,
      );
      if (!exportRecord) return null;
      const fundingUnitAccounting = exportRecord.contributions.map(
         (contrib) => {
            const record = fundingRecords.value.find(
               (r) => r.FundingRecordID === contrib.RecordID,
            );
            return {
               originalAmount: record?.Amount ?? 0,
               unitContributions: [
                  {
                     unitId: contrib.FundingUnitID,
                     amount: contrib.Amount,
                  },
               ],
               remainingAmount: record?.Amount ?? 0,
               record: record!,
            };
         },
      );
      const internalAccounting = exportRecord.internalAllocations.map(
         (alloc) => ({
            targetId: alloc.PlanTargetID,
            targetName: alloc.planTarget.Name,
            amount: Math.floor(alloc.Amount),
         }),
      );

      return {
         name: exportRecord.Name,
         description: exportRecord.Description,
         records: exportRecord.exportRecords,
         fundingUnitAccounting,
         internalAccounting,
         date: exportRecord.ExportDate,
      };
   };

   // 導出 Dialog
   const useExportModal = (selectedRecords: PatentFundingRecord[]) => {
      // 資助單位
      const fundingUnits = funding.value?.fundingUnits ?? [];

      // [資助單位的貢獻金額]
      // 原始資料
      const fundingUnitAccountingRef = ref<FundingUnitAccounting[]>(
         selectedRecords.map((record) => ({
            originalAmount: Math.floor(record.Amount),
            unitContributions: record.canFundingBy.map((unit) => ({
               unitId: unit.FundingUnitID,
               amount: 0,
            })),
            record,
            remainingAmount: Math.floor(record.Amount),
         })),
      );
      // 動態資料
      const fundingUnitAccounting = useDynamicFundingUnitAccounting(
         fundingUnitAccountingRef,
      );

      // [各資助單位的貢獻金額]
      // 原始資料
      const unitContributionsRef = ref(
         fundingUnits.map(
            (unit) =>
               ({
                  unitId: unit.FundingUnitID,
                  name: unit.fundingUnit.Name,
                  amount: 0,
               }) as ContributionEntry,
         ),
      );
      // 動態資料
      const unitContributions = useDynamicFundingUnitRemaining(
         fundingUnitAccounting,
         unitContributionsRef,
      );

      // === 計算預設資助金額 ===
      const calculateDefaultFundingUnitAccounting = () => {
         const accounting = calculateFundingUnitAccounting(
            selectedRecords,
            unitContributionsRef.value,
         );
         fundingUnitAccountingRef.value = accounting;
      };

      const internalAccountingAdjustment = ref(
         [] as InternalAccountingAdjustment[],
      );
      // === 計算預設校內帳務 ===
      const calculateDefaultInternalAccounting = () => {
         if (!funding.value?.plan) return;
         const { results } = calculateInternalAccounting(
            fundingUnitAccountingRef.value,
            funding.value.plan,
         );
         internalAccountingAdjustment.value = [...results];
      };

      return {
         fundingUnitAccounting,
         calculateDefaultFundingUnitAccounting,
         internalAccountingAdjustment,
         calculateDefaultInternalAccounting,
         unitContribution: unitContributions,
      };
   };

   return {
      fundingUnits,
      patentData: patent,
      fundingData: funding,
      // 紀錄相關
      records: {
         actions: {
            addFundingRecord,
            deleteFundingRecord,
            getFundingRecord,
            updateFundingRecord,
         },
         list: fundingRecords,
      },
      // 導出相關
      exports: {
         actions: {
            calculateFundingUnitAccounting,
            calculateInternalAccounting,
            performExport,
            deleteExport,
            getExport,
         },
         list: exportedRecords,
         exportableRecords,
      },
      useExportModal,
      useDynamicFundingUnitRemaining,
      useDynamicFundingUnitAccounting,
   };
};

export type UsePatentFundings = ReturnType<typeof usePatentFundings>;
