<template>
   <div
      class="w-full text-zinc-800 mx-auto container dark:text-zinc-100 min-h-full py-5"
   >
      <div class="flex gap-6 flex-col">
         <!-- Header Section with Glass Morphism -->
         <header>
            <div
               class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
               <div>
                  <h1 class="text-2xl font-bold">
                     專利到期提醒
                  </h1>
                  <p class="text-zinc-600 dark:text-zinc-400 mt-1">
                     管理和追蹤即將到期的專利
                  </p>
               </div>
               <div class="flex flex-col sm:flex-row gap-4">
                  <Button
                     variant="outline"
                     class="dark:bg-zinc-800/50 dark:border-zinc-700 dark:hover:bg-zinc-700/50"
                     @click="patentsReminder.forceRefresh()"
                  >
                     <RefreshCcw class="w-4 h-4 mr-2" />
                     刷新數據
                  </Button>
                  <Button
                     class="bg-gradient-to-r from-blue-500 to-indigo-600 border-0 hover:from-blue-600 hover:to-indigo-700 text-white"
                     @click="
                        open('PatentCreateModal', {
                           props: {},
                        })
                     "
                  >
                     <Plus class="w-4 h-4 mr-2" />
                     添加專利
                  </Button>
               </div>
            </div>
         </header>
         <div class="flex justify-between gap-2">
            <!-- Period Filter -->
            <Tabs
               v-model="patentsReminder.settings.value.period"
               class="w-full"
            >
               <TabsList
                  class="bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-300/50 dark:border-zinc-700/50"
               >
                  <TabsTrigger
                     value="days"
                     class="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-800 dark:data-[state=active]:text-zinc-100"
                  >
                     每日
                  </TabsTrigger>
                  <TabsTrigger
                     value="weeks"
                     class="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-800 dark:data-[state=active]:text-zinc-100"
                  >
                     每週
                  </TabsTrigger>
                  <TabsTrigger
                     value="months"
                     class="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-800 dark:data-[state=active]:text-zinc-100"
                  >
                     每月
                  </TabsTrigger>
                  <TabsTrigger
                     value="years"
                     class="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-800 dark:data-[state=active]:text-zinc-100"
                  >
                     每年
                  </TabsTrigger>
               </TabsList>
            </Tabs>
            <div class="flex gap-2">
               <FloatLabel
                  variant="in"
                  class="w-full"
               >
                  <InputNumber
                     v-model="
                        patentsReminder.settings.value.dateRange.daysBefore
                     "
                     prefix=""
                     suffix=" 天前"
                     show-buttons
                     size="small"
                     :min="1"
                     input-id="startDate-number_input"
                  />
                  <label for="startDate-number_input">起始時間</label>
               </FloatLabel>
               <FloatLabel
                  variant="in"
                  class="w-full"
               >
                  <InputNumber
                     v-model="
                        patentsReminder.settings.value.dateRange.daysAfter
                     "
                     prefix=""
                     suffix=" 天後"
                     show-buttons
                     size="small"
                     :min="1"
                     input-id="endDate-number_input"
                  />
                  <label for="endDate-number_input">結束時間</label>
               </FloatLabel>
            </div>
         </div>
         <!-- Error State -->
         <div
            v-if="patentsReminder.status.value === 'error'"
            class="bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/50 rounded-xl p-12 shadow-xl flex-1"
         >
            <Alert
               variant="destructive"
               class="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-200"
            >
               <AlertCircle class="h-4 w-4 mr-2" />
               <AlertTitle>載入失敗</AlertTitle>
               <AlertDescription>
                  無法載入專利數據，請重試或聯繫技術支持。
               </AlertDescription>
            </Alert>
         </div>

         <!-- Dashboard Content -->
         <div
            v-else-if="
               patentsReminder.data.value &&
                  patentsReminder.dateArray.value.result.length > 0
            "
            class="flex flex-col flex-1 gap-4"
         >
            <!-- Summary Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
               <!-- Expired Patents -->
               <div
                  class="bg-gradient-to-br from-red-50/80 to-red-100/60 dark:from-red-950/30 dark:to-red-900/20 border border-red-200/60 dark:border-red-900/20 rounded-xl p-6 shadow-xl"
               >
                  <div class="flex justify-between items-start">
                     <div>
                        <h3
                           class="text-zinc-700 dark:text-zinc-300 font-medium text-sm"
                        >
                           已過期專利
                        </h3>
                        <p
                           class="text-2xl font-bold text-red-600 dark:text-red-300 mt-1"
                        >
                           {{ getTotalExpired() }}
                        </p>
                     </div>
                     <div
                        class="bg-red-100/80 dark:bg-red-900/30 p-2 rounded-lg"
                     >
                        <AlertTriangle
                           class="h-6 w-6 text-red-500 dark:text-red-400"
                        />
                     </div>
                  </div>
                  <p class="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
                     需要立即處理的專利
                  </p>
               </div>

               <!-- Expiring Soon -->
               <div
                  class="bg-gradient-to-br from-amber-50/80 to-amber-100/60 dark:from-amber-950/30 dark:to-amber-900/20 border border-amber-200/60 dark:border-amber-900/20 rounded-xl p-6 shadow-xl"
               >
                  <div class="flex justify-between items-start">
                     <div>
                        <h3
                           class="text-zinc-700 dark:text-zinc-300 font-medium text-sm"
                        >
                           30 天內即將到期
                        </h3>
                        <p
                           class="text-2xl font-bold text-amber-600 dark:text-amber-300 mt-1"
                        >
                           {{ getUpcomingExpiring(30) }}
                        </p>
                     </div>
                     <div
                        class="bg-amber-100/80 dark:bg-amber-900/30 p-2 rounded-lg"
                     >
                        <Clock
                           class="h-6 w-6 text-amber-500 dark:text-amber-400"
                        />
                     </div>
                  </div>
                  <p class="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
                     共
                     {{
                        getUpcomingExpiring(
                           dayAfter(
                              patentsReminder.dateArray.value.dateRange.endDate,
                           ),
                        )
                     }}
                     個專利
                     {{
                        dayAfter(
                           patentsReminder.dateArray.value.dateRange.endDate,
                        )
                     }}
                     天內到期
                  </p>
               </div>
            </div>

            <!-- Timeline View -->
            <div
               class="bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/50 rounded-xl p-6 shadow-xl"
            >
               <h2
                  class="text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-4"
               >
                  專利到期時間軸
               </h2>
               <div class="space-y-4 h-fit">
                  <template
                     v-for="(period, index) in patentsReminder.dateArray.value
                        .result"
                     :key="index"
                  >
                     <div
                        v-if="
                           period.expireds.length > 0 ||
                              period.maintaineds.length > 0 ||
                              period.expirings.length > 0
                        "
                        class="relative flex items-start gap-4"
                        :class="{
                           'opacity-60': period.type === 'before',
                        }"
                     >
                        <!-- Period Content -->
                        <div class="flex-1 pb-6">
                           <!-- Date Header -->
                           <div class="mb-2 flex justify-between items-center">
                              <div class="flex items-center gap-2">
                                 <div
                                    class="w-3 h-3 rounded-full"
                                    :class="{
                                       'bg-zinc-400 dark:bg-zinc-600':
                                          period.type === 'before',
                                       'bg-blue-500': period.type === 'current',
                                       'bg-zinc-500': period.type === 'after',
                                    }"
                                 ></div>
                                 <h3
                                    class="font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2"
                                 >
                                    {{ formatPeriodDate(period.date) }}
                                    <span
                                       v-if="period.type === 'current'"
                                       class="ml-2 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full"
                                    >當前</span>
                                 </h3>
                              </div>
                              <div class="flex items-center gap-1 text-sm">
                                 <span
                                    v-if="period.expireds.length > 0"
                                    class="text-red-600 dark:text-red-400 flex items-center gap-1"
                                 >
                                    <AlertTriangle class="h-3 w-3" />
                                    {{ period.expireds.length }}
                                 </span>
                                 <span
                                    v-if="period.maintaineds.length > 0"
                                    class="ml-3 flex items-center gap-1"
                                    :class="{
                                       'text-emerald-600 dark:text-emerald-400':
                                          period.type !== 'after',
                                       'text-amber-600 dark:text-amber-400':
                                          period.type === 'after',
                                    }"
                                 >
                                    <CheckCircle2 class="h-3 w-3" />
                                    {{ period.maintaineds.length }}
                                 </span>
                              </div>
                           </div>

                           <div class="space-y-2">
                              <div
                                 v-for="patent in period.expireds"
                                 :key="patent.patent.PatentID"
                              >
                                 <BlockPatentRow
                                    :patent="patent.patent"
                                    @click="
                                       open('PatentModal', {
                                          props: {
                                             patentId: patent.patent.PatentID,
                                          },
                                       })
                                    "
                                 />
                              </div>
                              <div
                                 v-for="patent in period.maintaineds"
                                 :key="patent.patent.PatentID"
                              >
                                 <BlockPatentRow
                                    :patent="patent.patent"
                                    @click="
                                       open('PatentModal', {
                                          props: {
                                             patentId: patent.patent.PatentID,
                                          },
                                       })
                                    "
                                 />
                              </div>
                              <div
                                 v-for="patent in period.expirings"
                                 :key="patent.patent.PatentID"
                              >
                                 <BlockPatentRow
                                    :patent="patent.patent"
                                    @click="
                                       open('PatentModal', {
                                          props: {
                                             patentId: patent.patent.PatentID,
                                          },
                                       })
                                    "
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </template>
               </div>
            </div>
         </div>

         <!-- Empty State -->
         <div
            v-else-if="
               patentsReminder.status.value === 'success' ||
                  patentsReminder.status.value === 'pending'
            "
            class="bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/50 rounded-xl p-12 shadow-xl flex flex-col items-center justify-center text-center"
         >
            <FileQuestion
               class="h-16 w-16 text-zinc-400 dark:text-zinc-600 mb-4"
            />
            <h3 class="text-xl font-semibold text-zinc-700 dark:text-zinc-300">
               無專利數據
            </h3>
            <p class="text-zinc-600 dark:text-zinc-500 max-w-md mt-2">
               所選時間範圍內沒有專利數據。請調整日期範圍或添加新專利。
            </p>
            <Button
               class="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 border-0 hover:from-blue-600 hover:to-indigo-700 text-white"
            >
               <Plus class="w-4 h-4 mr-2" />
               添加專利
            </Button>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import InputNumber from "primevue/inputnumber";
import FloatLabel from "primevue/floatlabel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
   Accordion,
   AccordionItem,
   AccordionTrigger,
   AccordionContent,
} from "@/components/ui/accordion";
import {
   RefreshCcw,
   Plus,
   AlertTriangle,
   Clock,
   CheckCircle2,
   AlertCircle,
   Loader2,
   FileQuestion,
} from "lucide-vue-next";
import { format, addDays, endOfWeek, differenceInDays } from "date-fns";

definePageMeta({
   name: "home",
});

const { open } = useModals();
const patentsReminder = useDatabasePatentsReminder();

// 處理日期輸入
const startDateStr = ref<string>("");
const endDateStr = ref<string>("");

// 在組件載入時設置初始日期值
onMounted(() => {
   if (patentsReminder.dateArray.value.dateRange.startDate) {
      startDateStr.value = formatDateForInput(
         patentsReminder.dateArray.value.dateRange.startDate,
      );
   }
   if (patentsReminder.dateArray.value.dateRange.endDate) {
      endDateStr.value = formatDateForInput(
         patentsReminder.dateArray.value.dateRange.endDate,
      );
   }
});

const dayAfter = (date: Date): number => {
   const today = new Date();
   const diff = date.getTime() - today.getTime();
   return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// 格式化日期為HTML input[type=date]格式 (YYYY-MM-DD)
const formatDateForInput = (date: Date): string => {
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, "0");
   const day = String(date.getDate()).padStart(2, "0");
   return `${year}-${month}-${day}`;
};

// Format date based on period type
const formatPeriodDate = (date: Date) => {
   const period = patentsReminder.dateArray.value.period;
   if (period === "days") {
      return format(date, "yyyy年MM月dd日");
   }
   else if (period === "weeks") {
      const startDate = date;
      const endDate = endOfWeek(date, { weekStartsOn: 0 });
      return `${format(startDate, "yyyy年MM月dd日")} - ${format(endDate, "yyyy年MM月dd日")}`;
   }
   else if (period === "months") {
      return format(date, "yyyy 年 MM 月");
   }
   else {
      return format(date, "yyyy 年");
   }
};

// Get total expired patents
const getTotalExpired = () => {
   let total = 0;
   patentsReminder.dateArray.value.result.forEach((period) => {
      total += period.expireds.length;
   });
   return total;
};

// Get upcoming expiring patents
const getUpcomingExpiring = (days: number) => {
   let total = 0;
   patentsReminder.dateArray.value.result.forEach((period) => {
      total += period.expirings.length;
      total += period.maintaineds.filter((patent) => {
         return (
            differenceInDays(
               new Date(patent.expireDate),
               addDays(new Date(), days),
            ) <= 0 && period.type === "after"
         );
      }).length;
   });
   return total;
};
</script>
