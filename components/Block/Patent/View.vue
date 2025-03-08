<template>
   <div ref="viewRef">
      <div
         class="bg-[#f5f5f5] dark:bg-[#1a1a1a] sticky top-0 self-start z-[5] max-h-[50vh] min-h-0 transition-all duration-700"
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
               <div class="text-gray-800 dark:text-gray-200">
                  <div
                     class="font-extrabold transition-all duration-300"
                     :class="{
                        'text-3xl': state?.arrivedState.top,
                        'text-xl': !state?.arrivedState.top,
                     }"
                  >
                     血液分離萃取方法及其裝置
                  </div>
                  <div
                     class="font-thin duration-300 transition-all"
                     :class="{
                        'text-xs': !state?.arrivedState.top,
                     }"
                  >
                     Blood Separation Extraction Method and Device
                  </div>
               </div>
               <div
                  class="flex justify-between gap-4"
                  :class="{ 'scale-75': !state?.arrivedState.top }"
               >
                  <CustomStatusBlock
                     title="年度"
                     icon="ic:baseline-calendar-today"
                  >
                     113
                  </CustomStatusBlock>
                  <CustomStatusBlock
                     title="類別"
                     icon="ic:baseline-category"
                  >
                     發明
                  </CustomStatusBlock>
                  <CustomStatusBlock
                     title="校內編號"
                     icon="tabler:hash"
                  >
                     202301040001
                  </CustomStatusBlock>
                  <CustomStatusBlock
                     title="專利編號"
                     icon="ic:round-fingerprint"
                  >
                     I723456
                  </CustomStatusBlock>
                  <CustomStatusBlock
                     title="專利國家"
                     icon="mdi:earth"
                  >
                     台灣
                  </CustomStatusBlock>
               </div>
            </div>
         </div>
      </div>
      <div class="relative mb-[6rem]">
         <div
            v-if="state?.arrivedState.top"
            class="container mx-auto transform -translate-y-1/2 z-[8] absolute top-0"
         >
            <CustomStateProgress />
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
                  <div class="grid grid-cols-3 gap-4 relative">
                     <div class="col-span-2">
                        <CustomContentBlock title="基本資訊">
                           <CustomContentBlockRow title="草稿名稱">
                              血液分離萃取方法及其裝置
                           </CustomContentBlockRow>
                           <CustomContentBlockRow title="中文名稱">
                              血液分離萃取方法及其裝置
                           </CustomContentBlockRow>
                           <CustomContentBlockRow title="英文名稱">
                              Blood Separation Extraction Method and Device
                           </CustomContentBlockRow>
                        </CustomContentBlock>
                        <CustomContentBlock title="校內資訊">
                           <CustomContentBlockRow title="草稿名稱">
                              血液分離萃取方法及其裝置
                           </CustomContentBlockRow>
                           <CustomContentBlockRow title="中文名稱">
                              血液分離萃取方法及其裝置
                           </CustomContentBlockRow>
                           <CustomContentBlockRow title="英文名稱">
                              Blood Separation Extraction Method and Device
                           </CustomContentBlockRow>
                        </CustomContentBlock>
                        <CustomContentBlock
                           v-for="i in 5"
                           :key="i"
                           title="承辦資訊"
                        >
                           <CustomContentBlockRow title="草稿名稱">
                              血液分離萃取方法及其裝置
                           </CustomContentBlockRow>
                           <CustomContentBlockRow title="中文名稱">
                              血液分離萃取方法及其裝置
                           </CustomContentBlockRow>
                           <CustomContentBlockRow title="英文名稱">
                              Blood Separation Extraction Method and Device
                           </CustomContentBlockRow>
                        </CustomContentBlock>
                     </div>
                     <div class="col-span-1 sticky top-[95px] self-start">
                        <CustomContentBlock />
                     </div>
                  </div>
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
   InternalID: "12345",
   Title: "Title",
   DraftTitle: "DraftTitle",
   TitleEnglish: "TitleEnglish",
   inventors: [],
   technical: {
      PatentID: 0,
      MaturityLevel: null,
      keywords: [],
   },
   DepartmentID: 0,
   CollegeID: 0,
   application: {
      PatentID: 0,
      country: null,
      CountryID: null,
      PatentType: null,
      PatentNumber: null,
      ApplicationNumber: null,
      FilingDate: null,
      PublicationDate: null,
   },
});
</script>

<style scoped>
* {
   --p-tabs-tab-padding: 0.2rem 1rem;
}
</style>
