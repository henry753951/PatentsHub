<template>
   <div
      v-if="patent"
      class="grid grid-cols-5 gap-4 relative"
   >
      <div class="col-span-3">
         <CustomContentBlock
            v-if="
               applicationData.data.value &&
                  applicationData.data.value.application
            "
            title="申請資訊"
            tclass="sticky top-[87px]"
            :note-key="`${patent.PatentID}:application`"
            :save-button="!applicationData.isSynced.value"
            @save="applicationData.save"
         >
            <div class="grid grid-cols-2 gap-4">
               <CustomContentBlockRow
                  title="申請日期"
                  :is-synced="
                     JSON.stringify(
                        applicationData.data.value?.application?.FilingDate,
                     ) ===
                        JSON.stringify(
                           applicationData.refData.value?.application?.FilingDate,
                        )
                  "
               >
                  <FormDatePicker
                     v-model="applicationData.data.value.application.FilingDate"
                  />
               </CustomContentBlockRow>
               <CustomContentBlockRow
                  v-model="
                     applicationData.data.value.application.ApplicationNumber
                  "
                  title="申請案號"
                  :is-synced="
                     applicationData.data.value?.application
                        ?.ApplicationNumber ===
                        applicationData.refData.value?.application
                           ?.ApplicationNumber
                  "
               />
            </div>
            <div class="grid grid-cols-2 gap-4">
               <CustomContentBlockRow
                  v-model="
                     applicationData.data.value.application.RDResultNumber
                  "
                  title="研發成果編號"
                  :is-synced="
                     applicationData.data.value?.application?.RDResultNumber ===
                        applicationData.refData.value?.application?.RDResultNumber
                  "
               />
               <CustomContentBlockRow
                  v-model="applicationData.data.value.application.NSCNumber"
                  title="國科會編號"
                  :is-synced="
                     applicationData.data.value?.application?.NSCNumber ===
                        applicationData.refData.value?.application?.NSCNumber
                  "
               />
            </div>
         </CustomContentBlock>
         <CustomContentBlock
            v-if="fundingData.data.value && fundingData.data.value.funding"
            title="帳務資訊"
            tclass="sticky top-[87px]"
            :note-key="`${patent.PatentID}:funding`"
            :save-button="!fundingData.isSynced.value"
            @save="fundingData.save"
         >
            <CustomContentBlockRow
               title="資助單位"
               :is-synced="
                  JSON.stringify(
                     fundingData.data.value.funding.fundingUnits,
                  ) ===
                     JSON.stringify(
                        fundingData.refData.value?.funding?.fundingUnits,
                     )
               "
            >
               <FormPatentFundingUnitEditList
                  v-model="fundingData.data.value.funding.fundingUnits"
                  :patent-i-d="patent.PatentID"
               />
            </CustomContentBlockRow>
            <CustomContentBlockRow
               title="資助類別"
               :is-synced="
                  fundingData.data.value.funding.plan?.FundingPlanID ===
                     fundingData.refData.value?.funding?.plan?.FundingPlanID
               "
            >
               <div class="grid grid-cols-3 gap-4">
                  <FormFundingPlanSelect
                     v-model="fundingData.data.value.funding.plan"
                     class="col-span-1"
                  />
                  <div class="flex gap-2 items-center col-span-2">
                     <div
                        v-for="allocation in fundingData.data.value.funding.plan
                           ?.planAllocations"
                        :key="allocation.FundingPlanAllocationID"
                        class="flex items-center gap-1"
                     >
                        <Badge>{{ allocation.target.Name }}</Badge>
                        {{ allocation.Percentage }}%
                     </div>
                  </div>
               </div>
            </CustomContentBlockRow>
         </CustomContentBlock>
         <CustomContentBlock
            v-if="externalData.data.value && externalData.data.value.external"
            title="證書資訊"
            tclass="sticky top-[87px]"
            :note-key="`${patent.PatentID}:external`"
            :save-button="!externalData.isSynced.value"
            @save="externalData.save"
         >
            <div class="flex gap-4">
               <CustomContentBlockRow
                  v-model="externalData.data.value.external.PatentNumber"
                  title="專利號碼"
               />
               <CustomContentBlockRow title="公告獲證日期">
                  <FormDatePicker
                     v-model="externalData.data.value.external.PublicationDate"
                  />
               </CustomContentBlockRow>
            </div>
            <CustomContentBlockRow title="專利權期間">
               <div class="grid grid-cols-2 gap-4">
                  <CustomContentBlockRow title="起始日期">
                     <FormDatePicker
                        v-model="externalData.data.value.external.StartDate"
                     />
                  </CustomContentBlockRow>
                  <CustomContentBlockRow title="結束日期">
                     <FormDatePicker
                        v-model="externalData.data.value.external.EndDate"
                     />
                  </CustomContentBlockRow>
               </div>
            </CustomContentBlockRow>
            <CustomContentBlockRow
               v-model="externalData.data.value.external.IPCNumber"
               title="國際專利分類號IPC"
            />
            <CustomContentBlockRow
               v-model="externalData.data.value.external.PatentScope"
               title="專利範圍"
            />
         </CustomContentBlock>
         <CustomContentBlock
            v-if="
               technicalData.data.value && technicalData.data.value.technical
            "
            title="技術資訊"
            tclass="sticky top-[87px]"
            :save-button="!technicalData.isSynced.value"
            @save="technicalData.save"
         >
            <CustomContentBlockRow
               title="技術關鍵字"
               :is-synced="
                  JSON.stringify(
                     technicalData.data.value?.technical?.keywords,
                  ) ===
                     JSON.stringify(
                        technicalData.refData.value?.technical?.keywords,
                     )
               "
            >
               <FormTechnicalKeywordsInput
                  v-model="technicalData.data.value.technical.keywords"
               />
            </CustomContentBlockRow>
            <CustomContentBlockRow
               v-model="technicalData.data.value.technical.MaturityLevel"
               title="技術成熟度 RTL"
               :is-synced="
                  technicalData.data.value?.technical?.MaturityLevel ===
                     technicalData.refData.value?.technical?.MaturityLevel
               "
            />
         </CustomContentBlock>
         <CustomContentBlock
            v-if="internalData.data.value && internalData.data.value.internal"
            :note-key="`${patent.PatentID}:internal`"
            title="事務所資訊"
            tclass="sticky top-[87px]"
            :save-button="!internalData.isSynced.value"
            @save="internalData.save"
         >
            <CustomContentBlockRow
               title="初評事務所"
               :is-synced="isSynced.initialReviewAgencies.value"
            >
               <FormPatentAgencyList
                  v-model="
                     internalData.data.value.internal.InitialReviewAgencies
                  "
                  :is-taker-agency-unit="false"
               />
            </CustomContentBlockRow>
            <CustomContentBlockRow
               title="承辦事務所"
               :is-synced="isSynced.takerAgencies.value"
            >
               <FormPatentAgencyList
                  v-model="internalData.data.value.internal.TakerAgencies"
                  :is-taker-agency-unit="true"
               />
            </CustomContentBlockRow>
         </CustomContentBlock>
      </div>
      <div class="col-span-2 self-start sticky top-[87px]">
         <CustomContentBlock
            v-if="basicData.data.value"
            :note-key="`${patent.PatentID}:basic`"
            title="基本資訊"
            :save-button="!basicData.isSynced.value"
            @save="basicData.save"
         >
            <CustomContentBlockRow
               v-model="basicData.data.value.InternalID"
               title="校內編號"
               :is-synced="
                  basicData.data.value?.InternalID ===
                     basicData.refData.value?.InternalID
               "
            />
            <div class="grid grid-cols-5 gap-4">
               <CustomContentBlockRow
                  v-model:number="basicData.data.value.Year"
                  class="col-span-1"
                  :is-synced="
                     basicData.data.value.Year === basicData.refData.value?.Year
                  "
                  title="年度"
               />
               <CustomContentBlockRow
                  title="國家"
                  :is-synced="
                     basicData.data.value.country?.CountryID ===
                        basicData.refData.value?.country?.CountryID
                  "
                  class="col-span-2"
               >
                  <FormCountrySelect
                     v-model="basicData.data.value.country"
                     class="w-full"
                     :invalid="
                        basicData.data.value.country?.CountryID !==
                           basicData.refData.value?.country?.CountryID
                     "
                  />
               </CustomContentBlockRow>
               <CustomContentBlockRow
                  title="專利類別"
                  :is-synced="
                     basicData.data.value.PatentType ===
                        basicData.refData.value?.PatentType
                  "
                  class="col-span-2"
               >
                  <FormPatentTypeSelect
                     v-model="basicData.data.value.PatentType"
                     class="w-full"
                     :invalid="
                        basicData.data.value.PatentType !==
                           basicData.refData.value?.PatentType
                     "
                  />
               </CustomContentBlockRow>
            </div>
            <CustomContentBlockRow
               title="技推資訊"
               :is-synced="
                  format(
                     basicData.data.value.InitialReviewDate!,
                     'yyyy-MM-dd',
                  ) ===
                     format(
                        basicData.refData.value?.InitialReviewDate!,
                        'yyyy-MM-dd',
                     ) &&
                     basicData.data.value?.InitialReviewNumber ===
                     basicData.refData.value?.InitialReviewNumber
               "
            >
               <FormPatentReviewInfo
                  v-model:review-date="basicData.data.value.InitialReviewDate"
                  v-model:review-number="
                     basicData.data.value.InitialReviewNumber
                  "
               />
            </CustomContentBlockRow>
            <CustomContentBlockRow
               v-model="basicData.data.value.Title"
               title="發明名稱"
               :is-synced="
                  basicData.data.value.Title === basicData.refData.value?.Title
               "
            />
            <CustomContentBlockRow
               v-model="basicData.data.value.TitleEnglish"
               title="發明名稱(英)"
               :is-synced="
                  basicData.data.value.TitleEnglish ===
                     basicData.refData.value?.TitleEnglish
               "
            />
            <CustomContentBlockRow
               v-model="basicData.data.value.DraftTitle"
               title="草案名稱"
               :is-synced="
                  basicData.data.value.DraftTitle ===
                     basicData.refData.value?.DraftTitle
               "
            />
            <CustomContentBlockRow title="學院與系所">
               <div class="py-1">
                  <FormDepartmentSelect
                     v-model:belongs-in-db="basicData.data.value.department"
                  />
               </div>
            </CustomContentBlockRow>
         </CustomContentBlock>
         <CustomContentBlock
            v-if="inventorData.data.value"
            title="發明人"
            note-key="`${patent.PatentID}:inventors`"
            :save-button="!inventorData.isSynced.value"
            @save="inventorData.save"
         >
            <BlockPatentInventorLiteEditList
               v-model="inventorData.data.value.inventors"
            />
         </CustomContentBlock>
         <CustomContentBlock
            v-if="patentOwnersData.data.value && Array.isArray(patentOwnersData.data.value.owners)"
            title="專利所有權人"
            :note-key="`${patent.PatentID}:owners`"
            :save-button="!patentOwnersData.isSynced.value"
            @save="patentOwnersData.save"
         >
            <BlockPatentOwnershipEditList
               v-model="patentOwnersData.data.value.owners"
               :patent-i-d="patent.PatentID"
            />
         </CustomContentBlock>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { format } from "date-fns";
const patent = defineModel({
   type: Object as PropType<RouterOutput["data"]["patent"]["getPatent"]>,
   required: true,
});

const isSynced = {
   initialReviewAgencies: computed(() => {
      return (
         JSON.stringify(
            internalData.data.value?.internal?.InitialReviewAgencies,
         )
         === JSON.stringify(
            internalData.refData.value?.internal?.InitialReviewAgencies,
         )
      );
   }),
   takerAgencies: computed(() => {
      return (
         JSON.stringify(internalData.data.value?.internal?.TakerAgencies)
         === JSON.stringify(internalData.refData.value?.internal?.TakerAgencies)
      );
   }),
};

const { crud, refresh } = useDatabasePatent(patent.value?.PatentID);
// 基本資訊
const basicData = useSyncData(patent, async (newData) => {
   if (!newData) return;
   await crud.updatePatent([
      {
         Year: newData.Year,
         DraftTitle: newData.DraftTitle,
         Title: newData.Title,
         TitleEnglish: newData.TitleEnglish,
         PatentType: newData.PatentType,
         InternalID: newData.InternalID,
         InitialReviewDate: newData.InitialReviewDate,
         InitialReviewNumber: newData.InitialReviewNumber,
         country: newData.country
            ? {
               connect: {
                  CountryID: newData.country.CountryID,
               },
            }
            : undefined,
         department: newData.department
            ? {
               connect: {
                  DepartmentID: newData.department?.DepartmentID,
               },
            }
            : undefined,
      },
   ]);
});
// 事務所資訊
const internalData = useSyncData(patent, async (newData) => {
   if (!newData) return;
   await crud.updatePatent([
      {
         internal: {
            update: {
               data: {
                  InitialReviewAgencies: {
                     deleteMany: {},
                  },
                  TakerAgencies: {
                     deleteMany: {},
                  },
               },
            },
         },
      },
      {
         internal: {
            update: {
               data: {
                  InitialReviewAgencies: newData.internal
                     ? {
                        create: newData.internal.InitialReviewAgencies.map(
                           (agency) => ({
                              agencyUnit: {
                                 connect: {
                                    AgencyUnitID: agency.AgencyUnitID,
                                 },
                              },
                              agencyUnitPersonIds:
                                   agency.agencyUnitPersonIds as number[],
                           }),
                        ),
                     }
                     : undefined,
                  TakerAgencies: newData.internal
                     ? {
                        create: newData.internal.TakerAgencies.map(
                           (agency) => ({
                              agencyUnit: {
                                 connect: {
                                    AgencyUnitID: agency.AgencyUnitID,
                                 },
                              },
                              FileCode: agency.FileCode,
                              agencyUnitPersonIds:
                                   agency.agencyUnitPersonIds as number[],
                           }),
                        ),
                     }
                     : undefined,
               },
            },
         },
      },
   ]);
});

// 技術資訊
const technicalData = useSyncData(patent, async (newData) => {
   if (!newData) return;
   await crud.updatePatent([
      {
         technical: {
            update: {
               data: newData.technical
                  ? {
                     MaturityLevel: newData.technical.MaturityLevel,
                     keywords: {
                        set: [],
                     },
                  }
                  : undefined,
            },
         },
      },
      {
         technical: {
            update: {
               data: newData.technical
                  ? {
                     keywords: {
                        connectOrCreate: newData.technical.keywords.map(
                           (keyword) => ({
                              where: { KeywordID: keyword.KeywordID },
                              create: { Keyword: keyword.Keyword },
                           }),
                        ),
                     },
                  }
                  : undefined,
            },
         },
      },
   ]);
});

// 證書資訊
const externalData = useSyncData(patent, async (newData) => {
   if (!newData) return;
   await crud.updatePatent([
      {
         external: {
            update: {
               data: newData.external
                  ? {
                     PatentNumber: newData.external.PatentNumber,
                     StartDate: newData.external.StartDate,
                     EndDate: newData.external.EndDate,
                     PublicationDate: newData.external.PublicationDate,
                     IPCNumber: newData.external.IPCNumber,
                     PatentScope: newData.external.PatentScope,
                  }
                  : undefined,
            },
         },
      },
   ]);
});

// 申請資訊
const applicationData = useSyncData(patent, async (newData) => {
   if (!newData) return;
   await crud.updatePatent([
      {
         application: {
            update: {
               data: newData.application
                  ? {
                     FilingDate: newData.application.FilingDate,
                     ApplicationNumber: newData.application.ApplicationNumber,
                     RDResultNumber: newData.application.RDResultNumber,
                     NSCNumber: newData.application.NSCNumber,
                  }
                  : undefined,
            },
         },
      },
   ]);
});

// 發明人資訊
const inventorData = useSyncData(patent, async (newData) => {
   if (!newData || !Array.isArray(newData.inventors)) return;

   await crud.updatePatent([
      {
         inventors: {
            deleteMany: {}, // 先清空專利所有發明人關聯
         },
      },
      {
         inventors: {
            create: newData.inventors.map((i) => ({
               InventorID: i.InventorID,
               Contribution: i.Contribution,
               Main: i.Main,
            })),
         },
      },
   ]);
});

const fundingData = useSyncData(patent, async (newData) => {
   if (!newData || !Array.isArray(newData.funding?.fundingUnits)) return;
   await crud.updatePatent([
      {
         funding: {
            update: {
               data: {
                  fundingUnits: {
                     deleteMany: {},
                  },
                  plan: newData.funding.plan
                     ? {
                        connect: {
                           FundingPlanID: newData.funding.plan.FundingPlanID,
                        },
                     }
                     : undefined,
               },
            },
         },
      },
      {
         funding: {
            update: {
               data: {
                  fundingUnits: {
                     create: newData.funding.fundingUnits.map((f) => ({
                        FundingUnitID: f.FundingUnitID,
                        ProjectCode: f.ProjectCode,
                     })),
                  },
               },
            },
         },
      },
   ]);
});
// 專利所有權人資訊
const patentOwnersData = useSyncData(patent, async (newData) => {
   if (!newData || !Array.isArray(newData.owners)) return;

   // 檢查總持有度
   const totalOwnership = newData.owners.reduce(
      (sum, owner) => sum + owner.OwnershipPercentage,
      0,
   );
   if (totalOwnership > 100) {
      alert("總持有度超過 100%，請調整");
      return;
   }

   await crud.updatePatent([
      {
         owners: {
            deleteMany: {}, // 先清空專利所有權人關聯
         },
      },
      {
         owners: {
            create: newData.owners.map((owner) => ({
               OwnerID: owner.OwnerID !== 0 ? owner.OwnerID : undefined, // 映射 id 到 OwnerID
               Name: owner.Name, // 已使用大寫 Name
               OwnershipPercentage: owner.OwnershipPercentage,
            })),
         },
      },
   ]);
});
</script>

<style scoped></style>
