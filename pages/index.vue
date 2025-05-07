<template>
   <div
      class="text-zinc-800 mx-auto container dark:text-zinc-100 min-h-full py-5 max-w-[var(--content-area-width)] w-full overflow-hidden"
   >
      <div class="flex gap-6 flex-col w-full">
         <!-- Header Section with Glass Morphism -->
         <BlockHeader
            title="專利到期提醒"
            description="管理和追蹤即將到期的專利"
         >
            <div class="flex justify-between gap-4 w-full items-center">
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
                        suffix=" 天內"
                        show-buttons
                        size="small"
                        :min="1"
                        input-id="endDate-number_input"
                     />
                     <label for="endDate-number_input">結束時間</label>
                  </FloatLabel>
               </div>
               <div class="flex gap-2">
                  <Button
                     variant="outline"
                     class="dark:bg-zinc-800/50 dark:border-zinc-700 dark:hover:bg-zinc-700/50"
                     @click="patentsReminder.forceRefresh()"
                  >
                     <RefreshCcw class="w-4 h-4" />
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
                     新增專利
                  </Button>
               </div>
            </div>
         </BlockHeader>

         <!-- Summary Cards -->
         <div class="grid grid-cols-3 gap-4 w-full">
            <BlockPatentReminderSummaryCard
               title="已過期專利"
               :value="expiredCount"
               description="已過期的專利數量"
               type="danger"
            />
            <BlockPatentReminderSummaryCard
               title="即將到期專利"
               :value="expiringCount"
               description="即將到期的專利數量"
               type="warning"
            />
            <BlockPatentReminderSummaryCard
               title="近期維護的專利"
               :value="recentlyPatents?.length || 0"
               description="近30天內維護的專利"
               type="info"
               class="cursor-pointer"
               @click="
                  open('ReminderRecentlyModal', {
                     props: {
                        patents: recentlyPatents || [],
                        days: 30,
                     },
                  })
               "
            />
         </div>

         <!-- Months view -->
         <BlockPatentReminderStatus
            v-model:current-selected="selectedMonths"
            :data="monthData"
            @click-month="patentsReminder.settings.value.period = 'months'"
         />

         <div>
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
               class="flex flex-col flex-1 gap-4 overflow-hidden"
            >
               <!-- Timeline View -->
               <div
                  class="bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/50 rounded-xl p-6 shadow-xl"
               >
                  <div class="space-y-4 h-fit">
                     <template
                        v-for="(period, index) in patentsReminder.dateArray
                           .value.result"
                        :key="index"
                     >
                        <div
                           v-if="
                              selectedMonths.length > 0
                                 ? selectedMonths.some(
                                    (month) =>
                                       month.year ===
                                       period.date.getFullYear() &&
                                       month.month ===
                                       period.date.getMonth() + 1,
                                 )
                                 : period.type === 'current' ||
                                    patentsReminder.settings.value
                                       .displayEmptyPeriods ||
                                    period.expireds.length > 0 ||
                                    period.expirings.length > 0
                           "
                           class="relative flex items-start gap-4"
                           :class="{
                              'opacity-60': period.type === 'before',
                           }"
                        >
                           <!-- Period Content -->
                           <div class="flex-1 pb-6 overflow-hidden">
                              <!-- Date Header -->
                              <div
                                 class="mb-2 flex justify-between items-center"
                              >
                                 <div class="flex items-center gap-2">
                                    <div
                                       class="w-3 h-3 rounded-full"
                                       :class="{
                                          'bg-zinc-400 dark:bg-zinc-600':
                                             period.type === 'before',
                                          'bg-blue-500':
                                             period.type === 'current',
                                          'bg-zinc-500':
                                             period.type === 'after',
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
                                                patentId:
                                                   patent.patent.PatentID,
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
                                                patentId:
                                                   patent.patent.PatentID,
                                             },
                                          })
                                       "
                                    />
                                 </div>
                              </div>
                              <div
                                 v-if="
                                    period.expireds.length === 0 &&
                                       period.expirings.length === 0
                                 "
                              >
                                 <p
                                    class="text-zinc-500 dark:text-zinc-400 text-sm text-center"
                                 >
                                    無專利數據
                                 </p>
                              </div>
                           </div>
                        </div>
                     </template>
                  </div>
               </div>
            </div>
            <!-- Empty State -->
            <BlockPatentReminderEmptyState
               v-else-if="
                  patentsReminder.status.value === 'success' ||
                     patentsReminder.status.value === 'pending'
               "
            />
         </div>
      </div>
      <BlockPatentReminderFixedSettings />
   </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import InputNumber from "primevue/inputnumber";
import FloatLabel from "primevue/floatlabel";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { RefreshCcw, Plus, AlertTriangle, AlertCircle } from "lucide-vue-next";
import { format, addDays, endOfWeek, differenceInDays } from "date-fns";
interface SelectedMonth {
   year: number
   month: number
}

interface MonthData {
   year: number
   month: number
   expireCount: number
}

definePageMeta({
   name: "home",
});

const { $trpc } = useNuxtApp();
const { open } = useModals();
const patentsReminder = useDatabasePatentsReminder();
provide("patentsReminder", patentsReminder);

// 處理日期輸入
const startDateStr = ref<string>("");
const endDateStr = ref<string>("");
const selectedMonths = ref<SelectedMonth[]>([]);
provide("selectedMonths", selectedMonths);

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

const { data: recentlyPatents } = useAsyncData("recently-patents", async () => {
   const days = 30;
   return await $trpc.data.patent.getPatents.query({
      maintenances: {
         some: {
            MaintenanceDate: {
               gte: new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000),
            },
         },
      },
   });
});

const expiredCount = computed(() => {
   return patentsReminder.dateArray.value.result.reduce((acc, period) => {
      return acc + period.expireds.length;
   }, 0);
});

const expiringCount = computed(() => {
   return patentsReminder.dateArray.value.result.reduce((acc, period) => {
      return acc + period.expirings.length;
   }, 0);
});

const monthData = computed(() => {
   const currentMonth = new Date().getMonth() + 1;
   // Generate month data for the next 12 months
   const data: MonthData[] = [];
   for (let i = 0; i < 12; i++) {
      const month = (currentMonth + i) % 12 || 12; // Handle wrap-around for December
      const year
         = Math.floor((currentMonth + i - 1) / 12) + new Date().getFullYear();
      const expireCount = patentsReminder.data.value?.filter((patent) => {
         const patentDate = new Date(patent.expireDates.toSorted()[0]);
         return (
            patentDate.getFullYear() === year
            && patentDate.getMonth() + 1 === month
         );
      }).length;
      data.push({ year, month, expireCount: expireCount || 0 });
   }
   return data;
});
</script>
