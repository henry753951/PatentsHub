<template>
   <div>
      <div
         v-if="patent"
         ref="viewRef"
         class="pt-[200px] transition-all duration-500 pb-[230px] h-fit"
      >
         <div
            class="bg-[#f5f5f5] dark:bg-[#1a1a1a] fixed top-0 self-start z-[4] max-h-[230px] min-h-0 transition-all duration-500 w-full overflow-hidden"
            :class="{
               'py-8': isTop,
               'py-4': !isTop,
               'shadow-sm': !isTop,
               'max-h-[88px]': !isTop,
            }"
         >
            <div
               class="container mx-auto"
               :class="{
                  'mb-8': isTop,
               }"
            >
               <div
                  :class="{
                     'justify-between items-center': !isTop,
                     'flex-col': isTop,
                  }"
                  class="flex gap-4 overflow-hidden w-full"
               >
                  <div
                     class="text-gray-800 dark:text-gray-200 z-[6] min-w-0 overflow-hidden flex-grow max-w-[70%]"
                  >
                     <div class="flex items-center gap-4 w-full">
                        <div
                           class="font-extrabold transition-all duration-300 whitespace-nowrap text-ellipsis overflow-hidden"
                           :class="{
                              'text-3xl': isTop,
                              'text-xl': !isTop,
                           }"
                           :title="title.native"
                        >
                           {{ title.native }}
                        </div>
                        <TooltipProvider>
                           <Tooltip>
                              <TooltipTrigger as-child>
                                 <Button
                                    variant="ghost"
                                    class="hover:bg-white dark:hover:bg-zinc-700"
                                    @click="
                                       open('PatentActionsModal', {
                                          props: {
                                             patent: {
                                                PatentId: patent.PatentID,
                                                title: title.native,
                                             },
                                             deleteCallback: () => {
                                                crud.deletePatent();
                                             },
                                          },
                                       })
                                    "
                                 >
                                    <Icon name="ic:round-more-horiz" />
                                 </Button>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                 <p>更多選項</p>
                              </TooltipContent>
                           </Tooltip>
                        </TooltipProvider>
                     </div>
                     <div
                        class="font-thin duration-300 transition-all whitespace-nowrap text-ellipsis overflow-hidden"
                        :class="{
                           'text-xs': !isTop,
                        }"
                     >
                        {{ title.english }}
                     </div>
                  </div>
                  <div
                     class="flex-none flex justify-between gap-4 transition-all duration-500 whitespace-nowrap"
                     :class="{ 'scale-75  w-fit': !isTop }"
                     style="view-transition-name: status-block"
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
                           patent.PatentType
                              ? {
                                 DESIGN: "設計",
                                 UTILITY_MODEL: "新型",
                                 INVENTION: "發明",
                                 PLANT: "植物",
                              }[patent.PatentType]
                              : ""
                        }}
                     </CustomStatusBlock>
                     <CustomStatusBlock
                        title="校內編號"
                        icon="tabler:hash"
                     >
                        {{ patent.InternalID ?? "" }}
                     </CustomStatusBlock>
                     <CustomStatusBlock
                        title="專利編號"
                        icon="ic:round-fingerprint"
                     >
                        {{
                           patent.external ? patent.external.PatentNumber : ""
                        }}
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
         <div
            class="relative w-full"
            :class="{
               'mb-[6rem]': title.english === '',
               'mb-[8rem]': title.english !== '',
            }"
         >
            <div
               class="transform z-[5] absolute transition-all duration-300 flex gap-2 justify-between container mx-auto left-0 right-0"
               :class="{
                  'top-[-50px]': title.english === '',
                  'top-[-30px]': title.english !== '',
                  'opacity-0 pointer-events-none top-[-50px]':
                     !state?.arrivedState.top,
                  'opacity-100 top-0': state?.arrivedState.top,
               }"
            >
               <BlockPatentStateProgress
                  class="flex-1"
                  :status-service="patentStatus"
                  :patent="patent"
                  :update-case-not-found="crud.updateCaseNotFound"
               />
            </div>
         </div>
         <div class="container mx-auto z-[-1]">
            <Tabs v-model:value="activeTab">
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
                     <BlockPatentViewTabBasic
                        v-if="activeTab === 'basic'"
                        v-model="patent"
                     />
                  </TabPanel>
                  <TabPanel value="record">
                     <BlockPatentViewTabRecord
                        v-if="activeTab === 'record'"
                        v-model="patent"
                        :patent-records-service="patentRecords"
                     />
                  </TabPanel>
                  <TabPanel value="maintenance">
                     <BlockPatentViewTabMaintenance
                        v-if="activeTab === 'maintenance'"
                        v-model="patent"
                        :patent-maintainances-service="patentMaintainances"
                     />
                  </TabPanel>
                  <TabPanel value="finance">
                     <BlockPatentViewTabFunding
                        v-if="activeTab === 'finance'"
                        v-model="patent"
                     />
                  </TabPanel>
               </TabPanels>
            </Tabs>
         </div>
      </div>
      <div
         v-if="!patent && status === 'success'"
         class="container mx-auto py-[10rem]"
      >
         <div class="flex items-center justify-center h-full">
            <Icon
               name="ic:round-error"
               size="5rem"
               class="text-zinc-400 dark:text-zinc-500"
            />
            <span class="text-zinc-500 text-[3rem] font-bold ml-5">
               {{ "專利不存在" }}
            </span>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import { Button } from "@/components/ui/button";
import type { z } from "zod";
const porps = defineProps<{
   patentId: number
}>();

const { open } = useModals();
const viewRef = useTemplateRef<HTMLDivElement>("viewRef");
const { state } = useClosestScrollState(viewRef);
const isTop = computed(() => {
   if (!state.value) return false;
   return state.value.arrivedState.top;
});
const title = computed(() => {
   if (!patent.value) return { english: "", native: "" };
   return {
      english: patent.value.TitleEnglish,
      native:
         patent.value.Title
         || patent.value.DraftTitle
         || patent.value.TitleEnglish,
   };
});

const activeTab = ref("basic");

const {
   data: patent,
   patentStatus,
   patentRecords,
   patentMaintainances,
   refresh,
   crud,
   status,
} = useDatabasePatent(porps.patentId);
</script>

<style scoped>
* {
   --p-tabs-tab-padding: 0.2rem 1rem;
}
</style>
