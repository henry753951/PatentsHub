<template>
   <div ref="viewRef">
      <div v-if="patent">
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
                  class="flex gap-4 overflow-hidden w-full"
               >
                  <div
                     class="text-gray-800 dark:text-gray-200 z-[6] min-w-0 overflow-hidden flex-grow max-w-[70%]"
                  >
                     <div class="flex items-center gap-4 w-full">
                        <div
                           class="font-extrabold transition-all duration-300 whitespace-nowrap text-ellipsis overflow-hidden"
                           :class="{
                              'text-3xl': state?.arrivedState.top,
                              'text-xl': !state?.arrivedState.top,
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
                           'text-xs': !state?.arrivedState.top,
                        }"
                     >
                        {{ title.english }}
                     </div>
                  </div>
                  <div
                     class="flex-none flex justify-between gap-4 transition-all duration-500 whitespace-nowrap"
                     :class="{ 'scale-75  w-fit': !state?.arrivedState.top }"
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
                        {{ patent.internal ? patent.internal.InternalID : "" }}
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
                     <BlockPatentViewTabBasic v-model="patent" />
                  </TabPanel>
                  <TabPanel value="record">
                     <BlockPatentViewTabRecord v-model="patent" />
                  </TabPanel>
               </TabPanels>
            </Tabs>
         </div>
      </div>
      <div
         v-else-if="status !== 'pending'"
         class="container mx-auto py-[10rem]"
      >
         <div class="flex items-center justify-center h-full">
            <Icon
               name="ic:round-error"
               size="5rem"
               class="text-zinc-400 dark:text-zinc-500"
            />
            <span class="text-zinc-500 text-[3rem] font-bold ml-5">
               專利不存在
            </span>
            {{ patent }}
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
const state = useClosestScrollState(viewRef);
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

const {
   data: patent,
   refresh,
   crud,
   status,
} = await useDatabasePatent(porps.patentId);

// const patent = ref<RouterOutput["data"]["patent"]["getPatent"]>({
//    PatentID: 2, // 假設新的專利ID為2
//    Year: "2016", // 公告/獲證年度為105年（2016）
//    Title: "分子拓印薄膜之製備方法及其分子拓印薄膜",
//    DraftTitle: "以導電高分子拓印荷爾蒙製備生物感測電極", // 發明名稱(稿)
//    TitleEnglish: "", // 未提供英文名稱，留空
//    country: {
//       CountryID: 1,
//       ISOCode: "TW",
//       CountryName: "中華民國", // 專利國家
//    },
//    inventors: [
//       {
//          InventorID: 1,
//          PatentID: 2,
//          inventor: {
//             department: {
//                CollegeID: 1,
//                DepartmentID: 2,
//                Name: "化學工程及材料工程學系", // 單位系所
//                college: {
//                   CollegeID: 1,
//                   Name: "工學院", // 學院
//                   Description: "",
//                },
//                Description: "",
//             },
//             DepartmentID: 2,
//             InventorID: 1,
//             ContactInfoID: 1,
//             contactInfo: {
//                Name: "林宏殷", // 發明人
//                ContactInfoID: 1,
//                Email: null,
//                OfficeNumber: null,
//                PhoneNumber: null,
//                Role: "發明人",
//                Note: null,
//             },
//          },
//          Main: true, // 假設林宏殷為主要發明人
//          Contribution: null,
//       },
//       {
//          InventorID: 2,
//          PatentID: 2,
//          inventor: {
//             department: {
//                CollegeID: 1,
//                DepartmentID: 2,
//                Name: "化學工程及材料工程學系",
//                college: {
//                   CollegeID: 1,
//                   Name: "工學院",
//                   Description: "",
//                },
//                Description: "",
//             },
//             DepartmentID: 2,
//             InventorID: 2,
//             ContactInfoID: 2,
//             contactInfo: {
//                Name: "李玫樺", // 共同發明人1
//                ContactInfoID: 2,
//                Email: null,
//                OfficeNumber: null,
//                PhoneNumber: null,
//                Role: "共同發明人",
//                Note: null,
//             },
//          },
//          Main: false,
//          Contribution: null,
//       },
//       {
//          InventorID: 3,
//          PatentID: 2,
//          inventor: {
//             department: {
//                CollegeID: 1,
//                DepartmentID: 2,
//                Name: "化學工程及材料工程學系",
//                college: {
//                   CollegeID: 1,
//                   Name: "工學院",
//                   Description: "",
//                },
//                Description: "",
//             },
//             DepartmentID: 2,
//             InventorID: 3,
//             ContactInfoID: 3,
//             contactInfo: {
//                Name: "郭漢章", // 共同發明人2
//                ContactInfoID: 3,
//                Email: null,
//                OfficeNumber: null,
//                PhoneNumber: null,
//                Role: "共同發明人",
//                Note: null,
//             },
//          },
//          Main: false,
//          Contribution: null,
//       },
//    ],
//    technical: {
//       PatentID: 2,
//       MaturityLevel: "4", // 技術成熟度TRL
//       keywords: [], // 未提供技術關鍵字，留空
//    },
//    PatentType: "INVENTION", // 專利類別：發明
//    DepartmentID: 2, // 假設化學工程及材料工程學系的ID為2
//    application: {
//       PatentID: 2,
//       ApplicationNumber: "105101952", // 申請案號
//       FilingDate: "2016-01-22", // 申請日期（105.01.22）
//       RDResultNumber: "108HFA140019", // 研發成果編號（STRIKE）
//       NSCNumber: "109-390-001", // 國科會編號（STRIKE）
//    },
//    internal: {
//       PatentID: 2,
//       InternalID: "10413", // 校內編號
//       InitialReviewDate: "2015-11-03", // 技推委員會審理日期（104.11.03）
//       InitialReviewNumber: null,
//       InitialReviewAgencies: [
//          {
//             agencyUnit: {
//                Name: "初評事務所",
//                AgencyUnitID: 0,
//                Description: "",
//             },
//             AgencyUnitID: 0,
//             PatentID: 0,
//          },
//       ], // 初評事務所
//       TakerAgencies: [
//          {
//             agencyUnit: {
//                Name: "台一",
//                AgencyUnitID: 0,
//                Description: "",
//             },
//             AgencyUnitID: 0,
//             PatentID: 0,
//             FileCode: "",
//          },
//       ], // 承辦事務所
//    },
//    external: {
//       PatentNumber: "I561821", // 專利號碼
//       PublicationDate: "2016-12-11", // 公告/獲證日期（105.12.11）
//       StartDate: "2016-12-11", // 專利權期間開始
//       EndDate: "2036-01-21", // 專利權期間結束
//       IPCNumber: null, // 未提供國際專利分類號IPC
//       PatentScope: null, // 未提供專利範圍
//       PatentID: 2,
//    },
//    department: {
//       CollegeID: 1,
//       DepartmentID: 2,
//       Name: "化學工程及材料工程學系",
//       college: {
//          CollegeID: 1,
//          Name: "工學院",
//          Description: "",
//       },
//       Description: "",
//    },
//    CountryID: 1,
//    funding: {
//       PatentID: 2,
//       plan: {
//          PlanType: 0, // 未明確提供，假設為0
//          PlanID: 1,
//          Name: "C", // 方案
//       },
//       fundingUnitsDatas: [
//          {
//             fundingUnit: {
//                Name: "科技部",
//                UnitID: 0,
//             },
//             PatentID: 0,
//             ProjectCode: "",
//             Amount: 0,
//             FundingUnitID: 0,
//             patentFundingPatentID: null,
//          },
//       ], // 資助單位
//       fundingPlanPlanID: 1,
//    },
// });
</script>

<style scoped>
* {
   --p-tabs-tab-padding: 0.2rem 1rem;
}
</style>
