<template>
   <div
      v-if="patent"
      class="grid grid-cols-5 gap-4 relative"
   >
      <div class="col-span-3">
         <CustomContentBlock
            v-if="internalData.data.value && internalData.data.value.internal"
            :note-key="`${patent.PatentID}:internal`"
            title="校內資訊"
            tclass="sticky top-[87px]"
            :save-button="!internalData.isSynced.value"
            @save="internalData.save"
         >
            <CustomContentBlockRow
               v-model="internalData.data.value.internal.InternalID"
               title="校內編號"
               :is-synced="
                  internalData.data.value?.internal?.InternalID ===
                     internalData.refData.value?.internal?.InternalID
               "
            />
            <CustomContentBlockRow
               title="技推資訊"
               :is-synced="
                  format(
                     internalData.data.value.internal.InitialReviewDate!,
                     'yyyy-MM-dd',
                  ) ===
                     format(
                        internalData.refData.value?.internal
                           ?.InitialReviewDate!,
                        'yyyy-MM-dd',
                     ) &&
                     internalData.data.value?.internal?.InitialReviewNumber ===
                     internalData.refData.value?.internal?.InitialReviewNumber
               "
            >
               <FormPatentReviewInfo
                  v-model:review-date="
                     internalData.data.value.internal.InitialReviewDate
                  "
                  v-model:review-number="
                     internalData.data.value.internal.InitialReviewNumber
                  "
               />
            </CustomContentBlockRow>
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
         <CustomContentBlock
            v-if="patent.application"
            title="申請資訊"
            tclass="sticky top-[87px]"
         >
            <div class="grid grid-cols-2 gap-4">
               <CustomContentBlockRow title="申請日期">
                  {{ patent.application.FilingDate }}
               </CustomContentBlockRow>
               <CustomContentBlockRow title="申請案號">
                  {{ patent.application.ApplicationNumber }}
               </CustomContentBlockRow>
            </div>
            <div class="grid grid-cols-2 gap-4">
               <CustomContentBlockRow title="研發成果編號">
                  <s>{{ patent.application.RDResultNumber }}</s>
               </CustomContentBlockRow>
               <CustomContentBlockRow title="國科會編號">
                  <s>{{ patent.application.NSCNumber }}</s>
               </CustomContentBlockRow>
            </div>
         </CustomContentBlock>
         <CustomContentBlock
            title="資助資訊"
            tclass="sticky top-[87px]"
         >
            <CustomContentBlockRow title="資助單位">
               <div
                  v-for="funding in patent.funding?.fundingUnitsDatas"
                  :key="funding.FundingUnitID"
               >
                  {{ funding.fundingUnit.Name }}
                  {{ funding.ProjectCode }}
               </div>
            </CustomContentBlockRow>
         </CustomContentBlock>
         <CustomContentBlock
            v-if="patent.external"
            title="證書資訊"
            tclass="sticky top-[87px]"
         >
            <CustomContentBlockRow title="專利號碼">
               {{ patent.external.PatentNumber }}
            </CustomContentBlockRow>
            <CustomContentBlockRow title="專利權期間">
               {{ patent.external.StartDate }} ~
               {{ patent.external.EndDate }}
            </CustomContentBlockRow>
            <CustomContentBlockRow title="公告獲證日期">
               {{ patent.external.PublicationDate }}
            </CustomContentBlockRow>
            <CustomContentBlockRow title="國際專利分類號IPC">
               {{ patent.external.IPCNumber }}
            </CustomContentBlockRow>
            <CustomContentBlockRow title="專利範圍">
               {{ patent.external.PatentScope }}
            </CustomContentBlockRow>
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
      </div>
      <div class="col-span-2 self-start sticky top-[87px]">
         <CustomContentBlock
            v-if="basicData.data.value"
            :note-key="`${patent.PatentID}:basic`"
            title="基本資訊"
            :save-button="!basicData.isSynced.value"
            @save="basicData.save"
         >
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
            <CustomContentBlockRow
               v-if="patent.application"
               title="專利國家"
            >
               {{ patent.country?.CountryName }}
            </CustomContentBlockRow>
            <CustomContentBlockRow
               v-if="patent.application"
               title="專利類別"
            >
               {{ patent.PatentType }}
            </CustomContentBlockRow>
         </CustomContentBlock>
         <CustomContentBlock title="發明人">
            <BlockPatentInventorRow
               v-for="inventor in patent.inventors"
               :key="inventor.InventorID"
               :name="inventor.inventor.contactInfo?.Name ?? ''"
               :belong="{
                  college: inventor.inventor.department.college.Name,
                  department: inventor.inventor.department.Name,
               }"
               :job="inventor.inventor.contactInfo?.Role ?? ''"
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
// 校內資訊
const internalData = useSyncData(patent, async (newData) => {
   if (!newData) return;
   await crud.updatePatent([
      {
         internal: {
            update: {
               data: {
                  InternalID: newData.internal?.InternalID,
                  InitialReviewDate: newData.internal?.InitialReviewDate,
                  InitialReviewNumber: newData.internal?.InitialReviewNumber,
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
</script>

<style scoped></style>
