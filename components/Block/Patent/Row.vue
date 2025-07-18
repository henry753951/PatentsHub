<template>
   <div>
      <ContextMenuPatentCard :patent="patent">
         <div
            class="relative select-none overflow-hidden rounded-lg bg-white/80 dark:bg-zinc-900/90 border border-gray-100 dark:border-zinc-800 transition-all duration-300 group cursor-pointer patent-row"
            :data-patent-id="patent.PatentID"
         >
            <!-- 查無案件 Icon -->
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger
                     v-if="props.patent.CaseNotFound"
                     class="absolute top-1 right-1 z-30 w-6 h-6 flex items-center justify-center text-red-400 dark:text-red-300 bg-white/90 dark:bg-zinc-800/80 rounded-full shadow-sm"
                  >
                     <Icon
                        name="mdi:alert-circle-outline"
                        class="text-base"
                     />
                  </TooltipTrigger>
                  <TooltipContent> 智慧局查無案件 </TooltipContent>
               </Tooltip>
            </TooltipProvider>

            <!-- 狀態色條 -->
            <div
               class="absolute top-0 bottom-0 right-0 w-1 h-full"
               :class="{
                  'bg-green-500': status === '有效',
                  'bg-amber-500':
                     status === '即將到期' || status === '申請終止中',
                  'bg-red-500': status === '已過期',
                  'bg-gray-500':
                     status === '期滿終止' ||
                     status === '已讓與' ||
                     status === '已放棄' ||
                     status === '已撤案' ||
                     status === '國科會同意終止',
               }"
            ></div>
            <div
               v-if="flexProp"
               class="absolute h-full flex flex-col justify-center -rotate-90 left-[-0.5rem]"
            >
               <div class="font-mono text-xs text-gray-400 font-bold">
                  {{ patent.InternalID }}
               </div>
            </div>
            <div class="relative flex items-center w-full px-4 py-3">
               <!-- 左側：發明人 -->
               <div
                  class="flex border-r border-gray-100 dark:border-zinc-800 px-4 w-[130px] flex-col"
               >
                  <div class="flex flex-col items-start w-full">
                     <div class="flex gap-1 items-center w-full">
                        <div
                           class="text-xs font-light text-gray-500 dark:text-gray-400"
                        >
                           發明人
                        </div>
                        <div
                           v-if="coAuthors.length > 0"
                           class="text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-zinc-700/80 backdrop-blur-sm px-1.5 py-0.5 rounded-full flex items-center space-x-1"
                        >
                           <Icon
                              name="ic:baseline-people-alt"
                              size="10"
                           />
                           <TooltipProvider :delay-duration="50">
                              <Tooltip>
                                 <TooltipTrigger>
                                    <div class="text-[10px]">
                                       +{{ coAuthors.length }}
                                    </div>
                                 </TooltipTrigger>
                                 <TooltipContent>
                                    {{ coAuthorsStr }}
                                 </TooltipContent>
                              </Tooltip>
                           </TooltipProvider>
                        </div>
                     </div>
                     <span
                        class="text-gray-700 dark:text-gray-200 font-bold truncate w-full"
                        @click.stop="
                           author
                              ? open('ContactModal', {
                                 props: {
                                    contactInfoId: author.ContactInfoID,
                                 },
                              })
                              : null
                        "
                     >
                        {{ author?.contactInfo.Name }}
                     </span>
                  </div>
                  <div
                     v-if="!flexProp"
                     class="font-mono"
                  >
                     {{ patent.InternalID }}
                  </div>
                  <div
                     v-else
                     class="text-xs text-gray-400 font-bold"
                  >
                     {{ flexProp.key }} : {{ flexProp.value }}
                  </div>
               </div>

               <!-- 中間：發明名稱、學院、系所、資助單位 -->
               <div class="flex flex-col px-4 flex-1 min-w-0 max-w-full">
                  <div class="flex items-center space-x-2 min-w-0">
                     <CustomBadgeWithText
                        :text="patent.department.college.Name"
                        size="xs"
                     />
                     <div
                        class="text-gray-600 dark:text-gray-300 text-xs truncate"
                     >
                        {{ patent.department.Name }}
                     </div>
                  </div>

                  <span
                     class="text-gray-800 dark:text-gray-100 mt-1 font-medium truncate"
                  >
                     {{ name }}
                  </span>

                  <div class="flex items-center space-x-2 mt-1 min-w-0">
                     <span class="text-gray-500 dark:text-gray-400 text-xs">資助單位:</span>
                     <span
                        class="text-gray-700 dark:text-gray-200 text-xs truncate"
                     >
                        {{ fundingUnit || "—" }}
                     </span>
                  </div>
               </div>

               <!-- 右側：專利資訊 -->
               <div
                  class="flex items-center space-x-6 pl-4 border-l border-gray-100 dark:border-zinc-800 w-[360px]"
               >
                  <!-- 國家與專利編號 -->
                  <div class="flex flex-col items-start min-w-0 w-[260px]">
                     <div class="flex items-center gap-1 mb-1 min-w-0">
                        <NuxtImg
                           v-if="patent.country"
                           :src="`https://flagcdn.com/w80/${patent.country.ISOCode.toLowerCase()}.png`"
                           class="h-3 w-5 rounded shadow-sm"
                           :alt="patent.country.CountryName"
                        />
                        <div
                           v-else
                           class="h-3 w-5 rounded bg-gray-200 dark:bg-zinc-700 flex items-center justify-center"
                        >
                           <Icon
                              name="ic:baseline-flag"
                              size="8"
                              class="text-gray-500 dark:text-gray-400"
                           />
                        </div>
                        <span
                           class="text-gray-700 dark:text-gray-200 text-xs truncate"
                        >
                           {{ patent.external?.PatentNumber || "無專利號碼" }}
                        </span>
                        <span
                           class="bg-amber-50/80 dark:bg-amber-900/30 backdrop-blur-sm text-amber-700 dark:text-amber-300 px-1.5 py-0.5 text-xs rounded-sm truncate"
                        >
                           {{ patentTypeStr }}
                        </span>
                     </div>

                     <div class="flex items-center space-x-2">
                        <span class="text-gray-500 dark:text-gray-400 text-xs">維護期程</span>
                        <span
                           class="text-gray-700 dark:text-gray-200 text-xs w-[150px] text-right truncate"
                        >
                           {{ maintenancePeriod }}
                        </span>
                     </div>

                     <div class="flex items-center space-x-2 mt-0.5">
                        <span class="text-gray-500 dark:text-gray-400 text-xs">維護年度</span>
                        <span
                           class="text-gray-700 dark:text-gray-200 text-xs w-[150px] text-right truncate"
                        >
                           {{ maintenanceYear }}
                        </span>
                     </div>
                  </div>

                  <!-- 狀態指示器 -->
                  <div class="flex flex-col items-end min-w-0 w-[100px]">
                     <div class="flex items-center space-x-2">
                        <div
                           class="w-2 h-2 rounded-full"
                           :class="{
                              'bg-green-500': status === '有效',
                              'bg-amber-500':
                                 status === '即將到期' ||
                                 status === '申請終止中',
                              'bg-red-500': status === '已過期',
                              'bg-gray-500':
                                 status === '期滿終止' ||
                                 status === '已讓與' ||
                                 status === '已放棄' ||
                                 status === '已撤案' ||
                                 status === '國科會同意終止',
                           }"
                        ></div>
                        <span
                           class="text-sm font-medium truncate"
                           :class="{
                              'text-green-600 dark:text-green-400':
                                 status === '有效',
                              'text-amber-600 dark:text-amber-400':
                                 status === '即將到期' ||
                                 status === '申請終止中',
                              'text-red-600 dark:text-red-400':
                                 status === '已過期',
                              'text-gray-600 dark:text-gray-400':
                                 status === '期滿終止' ||
                                 status === '已讓與' ||
                                 status === '已放棄' ||
                                 status === '已撤案' ||
                                 status === '國科會同意終止',
                           }"
                        >{{ status }}</span>
                     </div>

                     <span
                        v-if="displayDate"
                        class="text-xs mt-1 truncate"
                        :class="{
                           'text-green-600 dark:text-green-400':
                              status === '有效',
                           'text-red-600 dark:text-red-400':
                              status === '已過期',
                           'text-amber-600 dark:text-amber-400':
                              status === '即將到期' || status === '申請終止中',
                           'text-gray-600 dark:text-gray-400':
                              status === '期滿終止' ||
                              status === '已讓與' ||
                              status === '已放棄' ||
                              status === '已撤案' ||
                              status === '國科會同意終止',
                        }"
                     >
                        {{ format(new Date(displayDate), "yyyy/MM/dd") }}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </ContextMenuPatentCard>
   </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { format } from "date-fns";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { getPatentStatus } from "@/composables/database/patent/status";
type Patent = RouterOutput["data"]["patent"]["getPatents"][0];

const { open } = useModals();

const props = defineProps<{
   patent: PatentRowType | Patent
   flexProp?: {
      key: string
      value: string
   }
}>();

const patent = toRef(props, "patent");
provide("patent", patent);

const latestMaintenance = computed(() => {
   const maintenances = [...props.patent.maintenances].sort((a, b) => {
      return (
         new Date(b.MaintenanceDate).getTime()
           - new Date(a.MaintenanceDate).getTime()
      );
   });
   if (maintenances.length === 0) {
      return null;
   }
   return maintenances[0];
});
// 維護期程
const maintenancePeriod = computed(() => {
   if (!latestMaintenance.value) {
      return null;
   }
   const start = new Date(
      latestMaintenance.value.MaintenanceDate,
   ).toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
   });
   const end = new Date(latestMaintenance.value.ExpireDate).toLocaleDateString(
      "zh-TW",
      {
         year: "numeric",
         month: "2-digit",
         day: "2-digit",
      },
   );
   return `${start} - ${end}`;
});

// 維護年度
const maintenanceYear = computed(() => {
   if (!latestMaintenance.value) {
      return null;
   }
   return new Date(latestMaintenance.value.MaintenanceDate)
      .getFullYear()
      .toString();
});

// 資助單位
const fundingUnit = computed(() => {
   return props.patent.funding?.fundingUnits
      ? props.patent.funding?.fundingUnits
         .map((f) => f.fundingUnit?.Name)
         .join(", ")
      : "";
});

// 狀態
const status = computed(() => getPatentStatus(props.patent));

const displayDate = computed(() => {
   const override = props.patent.manualStatus
      .filter((s) => s.Override)
      .sort((a, b) => (b.Date?.getTime() ?? 0) - (a.Date?.getTime() ?? 0))[0];

   const currentStatus = getPatentStatus(props.patent);

   const finalReasons = [
      "申請終止中",
      "國科會同意終止",
      "已讓與",
      "已放棄",
      "已撤案",
      "期滿終止",
   ];

   const isFinalStatus = finalReasons.includes(currentStatus);

   // 如果是 override 且為目前狀態，但又是結尾狀態，就顯示日期（用 override.Date）
   if (override && currentStatus === override.Reason) {
      return isFinalStatus ? (override.Date ?? null) : null;
   }

   const latest = [...(props.patent.maintenances ?? [])].sort(
      (a, b) =>
         new Date(b.MaintenanceDate).getTime()
           - new Date(a.MaintenanceDate).getTime(),
   )[0];

   return latest?.ExpireDate ?? null;
});

// 其他既有 computed 屬性保持不變
const name = computed(() => {
   if (!props.patent) return "";
   if (props.patent.Title) return props.patent.Title;
   else if (props.patent.DraftTitle) return props.patent.DraftTitle;
   else return "無名稱";
});

const author = computed(() => {
   const mainInventor = props.patent.inventors.find((i) => i.Main)?.inventor;
   return mainInventor;
});

const coAuthors = computed(() => {
   return props.patent.inventors.filter((i) => !i.Main).map((i) => i.inventor);
});

const coAuthorsStr = computed(() => {
   return coAuthors.value.map((i) => i.contactInfo.Name).join(", ");
});

const patentTypeStr = computed(() => {
   const map = {
      INVENTION: "發明",
      UTILITY_MODEL: "新型",
      DESIGN: "設計",
      PLANT: "植物",
   };
   return props.patent.PatentType ? map[props.patent.PatentType] : "未選擇";
});
</script>
