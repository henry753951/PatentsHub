<template>
   <div
      v-if="patent"
      class="grid grid-cols-3 gap-4 relative"
   >
      <div class="col-span-2">
         <CustomContentBlock
            title="技術資訊"
            tclass="sticky top-[87px]"
         >
            <CustomContentBlockRow
               v-if="patent.technical"
               title="技術關鍵字"
            >
               <TagsInput
                  v-model="patent.technical.keywords"
                  class="min-h-10"
               >
                  <TagsInputItem
                     v-for="item in patent.technical.keywords"
                     :key="item.KeywordID"
                     :value="item"
                  >
                     <TagsInputItemText />
                     <TagsInputItemDelete />
                  </TagsInputItem>
                  <TagsInputInput placeholder="關鍵字..." />
               </TagsInput>
            </CustomContentBlockRow>
            <CustomContentBlockRow
               v-if="patent.technical"
               title="技術成熟度 RTL"
            >
               {{ patent.technical.MaturityLevel }}
            </CustomContentBlockRow>
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
            v-if="patent.internal"
            title="校內資訊"
            tclass="sticky top-[87px]"
         >
            <CustomContentBlockRow title="校內編號">
               {{ patent.internal.InternalID }}
            </CustomContentBlockRow>
            <CustomContentBlockRow title="技推委員會審理日期與第幾次">
               {{ patent.internal.InitialReviewDate }} /
               {{ patent.internal.InitialReviewNumber }}
            </CustomContentBlockRow>
            <CustomContentBlockRow title="初評事務所">
               <div
                  v-for="agency in patent.internal.InitialReviewAgencies"
                  :key="agency.AgencyUnitID"
               >
                  {{ agency.agencyUnit.Name }}
               </div>
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
      </div>
      <div class="col-span-1 sticky top-[87px] self-start">
         <CustomContentBlock
            title="基本資訊"
            :save-button="!basicData.isSynced.value"
            @save="basicData.save"
         >
            <CustomContentBlockRow
               v-model="basicData.data.value.Year"
               title="年度"
            />

            <CustomContentBlockRow
               v-model="basicData.data.value.Title"
               title="發明名稱"
            />
            <CustomContentBlockRow
               v-model="basicData.data.value.TitleEnglish"
               title="發明名稱(英)"
            />
            <CustomContentBlockRow
               v-model="basicData.data.value.DraftTitle"
               title="草案名稱"
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
         <CustomContentBlock
            title="發明人"
            tclass="sticky top-[87px]"
         >
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
const patent = defineModel({
   type: Object as PropType<RouterOutput["data"]["patent"]["getPatent"]>,
   required: true,
});

const basicData = useSyncData(
   computed(() => {
      if (!patent.value) return {};
      return {
         Year: patent.value.Year,
         DraftTitle: patent.value.DraftTitle,
         Title: patent.value.Title,
         TitleEnglish: patent.value.TitleEnglish,
         PatentType: patent.value.PatentType,
         country: patent.value.country,
         department: patent.value.department,
      };
   }),
   async (newData) => {
      if (!patent.value) return;
      patent.value.Year = newData.Year ?? "";
      patent.value.DraftTitle = newData.DraftTitle ?? "";
      patent.value.Title = newData.Title ?? "";
      patent.value.TitleEnglish = newData.TitleEnglish ?? "";
      patent.value.country = newData.country ?? null;
      patent.value.PatentType = newData.PatentType ?? null;
      if (newData.department) patent.value.department = newData.department;
      console.log("saved", patent.value);
   },
);
</script>

<style scoped></style>
