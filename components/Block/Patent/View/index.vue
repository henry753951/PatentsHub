<template>
   <div
      v-if="patent"
      ref="viewRef"
   >
      <div
         class="bg-[#f5f5f5] dark:bg-[#1a1a1a] sticky top-0 self-start z-[4] max-h-[230px] min-h-0 transition-all duration-500"
         :class="{
            'py-8': state?.arrivedState.top,
            'py-4': !state?.arrivedState.top,
            'shadow-sm': !state?.arrivedState.top,
            'max-h-[88px]': !state?.arrivedState.top,
         }"
      >
         <div
            class="container mx-auto"
            :class="{
               'mb-8': state?.arrivedState.top,
            }"
         >
            <div
               :class="{
                  'justify-between items-center': !state?.arrivedState.top,
                  'flex-col': state?.arrivedState.top,
               }"
               class="flex gap-4"
            >
               <div class="text-gray-800 dark:text-gray-200 z-[6]">
                  <div
                     class="font-extrabold transition-all duration-300"
                     :class="{
                        'text-3xl': state?.arrivedState.top,
                        'text-xl': !state?.arrivedState.top,
                     }"
                  >
                     {{ title.native }}
                  </div>
                  <div
                     class="font-thin duration-300 transition-all"
                     :class="{
                        'text-xs': !state?.arrivedState.top,
                     }"
                  >
                     {{ title.english }}
                  </div>
               </div>
               <div
                  class="flex justify-between gap-4 transition-all duration-500"
                  :class="{ 'scale-75': !state?.arrivedState.top }"
               >
                  <CustomStatusBlock
                     title="年度"
                     icon="ic:baseline-calendar-today"
                  >
                     {{ patent.Year }}
                  </CustomStatusBlock>
                  <CustomStatusBlock
                     title="類別"
                     icon="ic:baseline-category"
                  >
                     {{
                        patent.application && patent.application.PatentType
                           ? {
                              DESIGN: "設計",
                              UTILITY_MODEL: "實用新型",
                              INVENTION: "發明",
                              PLANT: "植物",
                           }[patent.application.PatentType]
                           : ""
                     }}
                  </CustomStatusBlock>
                  <CustomStatusBlock
                     title="校內編號"
                     icon="tabler:hash"
                  >
                     {{ patent.internal ? patent.internal.InternalID : "" }}
                  </CustomStatusBlock>
                  <CustomStatusBlock
                     title="專利編號"
                     icon="ic:round-fingerprint"
                  >
                     {{ patent.external ? patent.external.PatentNumber : "" }}
                  </CustomStatusBlock>
                  <CustomStatusBlock
                     title="專利國家"
                     icon="mdi:earth"
                  >
                     {{ patent.country?.CountryName }}
                  </CustomStatusBlock>
               </div>
            </div>
         </div>
      </div>
      <div class="relative mb-[6rem] w-full">
         <div
            class="transform -translate-y-1/2 z-[5] absolute transition-all duration-300 flex gap-2 justify-between container mx-auto left-0 right-0"
            :class="{
               'opacity-0 pointer-events-none top-[-50px]':
                  !state?.arrivedState.top,
               'opacity-100 top-0': state?.arrivedState.top,
            }"
         >
            <CustomStateProgress class="flex-1" />
         </div>
      </div>
      <div class="container mx-auto z-[-1]">
         <Tabs value="basic">
            <TabList>
               <Tab value="basic">
                  概要
               </Tab>
               <Tab value="maintenance">
                  維護
               </Tab>
               <Tab value="finance">
                  帳務
               </Tab>
               <Tab value="record">
                  記錄
               </Tab>
            </TabList>
            <TabPanels>
               <TabPanel value="basic">
                  <BlockPatentViewBasic v-model="patent" />
               </TabPanel>
            </TabPanels>
         </Tabs>
      </div>
   </div>
</template>

<script lang="ts" setup>
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
const state = useClosestScrollState("viewRef");
const title = computed(() => {
   if (!patent.value) return { english: "", native: "" };
   return {
      english: patent.value.TitleEnglish,
      native: patent.value.Title ?? patent.value.DraftTitle,
   };
});

const patent = ref<RouterOutput["data"]["patent"]["getPatent"]>({
   PatentID: 1,
   Year: "2023",
   Title: "血液分離萃取方法及其裝置",
   DraftTitle: "血液分離萃取方法及其裝置草稿",
   TitleEnglish: "Blood Separation Extraction Method and Device",
   country: {
      CountryID: 1,
      ISOCode: "TW",
      CountryName: "Taiwan",
   },
   inventors: [
      {
         InventorID: 1,
         PatentID: 0,
         inventor: {
            department: {
               CollegeID: 0,
               DepartmentID: 0,
               Name: "資訊工程學系",
               college: {
                  CollegeID: 0,
                  Name: "工學院",
                  Description: "",
               },
               Description: "",
            },
            DepartmentID: 0,
            InventorID: 0,
            ContactInfoID: 0,
            contactInfo: {
               Name: "",
               ContactInfoID: 0,
               Email: null,
               OfficeNumber: null,
               PhoneNumber: null,
               Role: null,
               Note: null,
            },
         },
         Main: false,
         Contribution: null,
      },
   ],
   technical: {
      PatentID: 1,
      MaturityLevel: "高",
      keywords: [],
   },
   DepartmentID: 101,
   application: {
      PatentID: 1,
      PatentType: "DESIGN",
      ApplicationNumber: "202301040001",
      FilingDate: "2023-01-04",
      RDResultNumber: null,
      NSCNumber: null,
   },
   internal: {
      PatentID: 0,
      InternalID: "",
      InitialReviewDate: null,
      InitialReviewNumber: null,
      InitialReviewAgencies: [],
      TakerAgencies: [],
   },
   external: {
      PatentNumber: "I723456",
      PublicationDate: "2023-06-01",
      StartDate: null,
      EndDate: null,
      IPCNumber: null,
      PatentScope: null,
      PatentID: 0,
   },
   department: {
      CollegeID: 202,
      DepartmentID: 101,
      Name: "資訊工程學系",
      college: {
         CollegeID: 202,
         Name: "工學院",
         Description: "",
      },
      Description: "",
   },
   CountryID: 1,
   funding: {
      PatentID: 0,
      plan: {
         PlanType: 0,
         PlanID: 0,
         Name: "A",
      },
      fundingUnitsDatas: [],
      fundingPlanPlanID: 0,
   },
});
</script>

<style scoped>
* {
   --p-tabs-tab-padding: 0.2rem 1rem;
}
</style>
