<script setup lang="ts">
import { computed } from "vue";
import { Calendar } from "lucide-vue-next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MonthData {
   year: number
   month: number
   expireCount: number
}

interface SelectedMonth {
   year: number
   month: number
}

interface Divider {
   type: "divider"
   year: number
}

type DisplayItem = MonthData | Divider;

interface MonthlyExpireChartProps {
   data?: MonthData[]
}

// Set default props
const props = withDefaults(defineProps<MonthlyExpireChartProps>(), {
   data: () => [
      { year: 2025, month: 4, expireCount: 0 },
      { year: 2025, month: 5, expireCount: 0 },
      { year: 2025, month: 6, expireCount: 0 },
      { year: 2025, month: 7, expireCount: 0 },
      { year: 2025, month: 8, expireCount: 0 },
      { year: 2025, month: 9, expireCount: 0 },
      { year: 2025, month: 10, expireCount: 0 },
      { year: 2025, month: 11, expireCount: 0 },
      { year: 2025, month: 12, expireCount: 0 },
      { year: 2026, month: 1, expireCount: 0 },
      { year: 2026, month: 2, expireCount: 0 },
      { year: 2026, month: 3, expireCount: 0 },
   ],
});

// Props for selected months
const currentSelected = defineModel("currentSelected", {
   type: Array as () => SelectedMonth[],
   required: false,
   default: () => [],
});

// Month names mapping
const monthNames: string[] = [
   "一月",
   "二月",
   "三月",
   "四月",
   "五月",
   "六月",
   "七月",
   "八月",
   "九月",
   "十月",
   "十一月",
   "十二月",
];

// Get current date for highlighting current month
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

// Get month name
const getMonthName = (month: number): string => {
   return monthNames[(month - 1) % 12];
};

// Check if it's the current month
const isCurrentMonth = (year: number, month: number): boolean => {
   return year === currentYear && month === currentMonth;
};

// Check if the month is selected
const isSelected = (year: number, month: number): boolean => {
   if (currentSelected.value.length === 0) {
      return true;
   }
   return currentSelected.value?.some(
      (item) => item.year === year && item.month === month,
   );
};

// Handle click event
const click = (year: number, month: number): void => {
   const selectedIndex = currentSelected.value.findIndex(
      (item) => item.year === year && item.month === month,
   );

   if (selectedIndex !== -1) {
      currentSelected.value = currentSelected.value.filter(
         (item) => item.year !== year || item.month !== month,
      );
   }
   else {
      currentSelected.value = [{ year, month }];
   }
   emits("clickMonth", year, month);
};

// Type guard to check if an item is a Divider
const isDivider = (item: DisplayItem): item is Divider => {
   return (item as Divider).type === "divider";
};

// Sort data by year and month and insert year dividers
const sortedDataWithDividers = computed((): DisplayItem[] => {
   const sorted = [...props.data].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
   });

   const result: DisplayItem[] = [];
   let lastYear: number | null = null;

   sorted.forEach((item) => {
      if (lastYear !== null && item.year !== lastYear) {
         result.push({ type: "divider", year: item.year });
      }
      result.push(item);
      lastYear = item.year;
   });

   return result;
});

const emits = defineEmits<{
   (e: "clickMonth", year: number, month: number): void
}>();
</script>

<template>
   <Card
      class="w-full bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-900 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
   >
      <CardHeader class="flex flex-row items-center justify-between pb-3">
         <div class="flex items-center justify-between w-full">
            <div class="flex items-center space-x-3">
               <Calendar class="text-blue-500 dark:text-blue-400 h-5 w-5" />
               <div
                  class="text-lg font-semibold text-zinc-800 dark:text-zinc-100"
               >
                  將來月份檢視
               </div>
               <div class="w-px h-3 bg-zinc-300 dark:bg-zinc-600 mx-2">
               </div>
               <div class="text-xs text-zinc-500 dark:text-zinc-400">
                  點選月份可只顯示該月份的專利
               </div>
            </div>
         </div>
      </CardHeader>
      <CardContent>
         <div
            class="gap-3 items-center grid grid-cols-[repeat(auto-fill,minmax(30px,1fr))]"
         >
            <template
               v-for="item in sortedDataWithDividers"
               :key="
                  isDivider(item)
                     ? `divider-${item.year}`
                     : `${item.year}-${item.month}`
               "
            >
               <div
                  v-if="isDivider(item)"
                  class="flex items-center justify-center"
               >
                  <div class="flex flex-col items-center">
                     <div class="w-px h-12 bg-zinc-300 dark:bg-zinc-600">
                     </div>
                  </div>
               </div>
               <div
                  v-else
                  :class="[
                     'flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 col-span-2 cursor-pointer',
                     isCurrentMonth(item.year, item.month)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md'
                        : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800',
                     isSelected(item.year, item.month)
                        ? ''
                        : 'opacity-30 hover:opacity-80',
                  ]"
                  @click="click(item.year, item.month)"
               >
                  <span
                     :class="[
                        'text-sm font-medium',
                        isCurrentMonth(item.year, item.month)
                           ? 'text-blue-600 dark:text-blue-300'
                           : 'text-zinc-700 dark:text-zinc-300',
                     ]"
                  >
                     {{ getMonthName(item.month) }}
                  </span>
                  <span
                     :class="[
                        'text-lg font-bold',
                        isCurrentMonth(item.year, item.month)
                           ? 'text-blue-700 dark:text-blue-200'
                           : 'text-zinc-900 dark:text-zinc-100',
                        item.expireCount > 0
                           ? 'text-red-500 dark:text-red-400'
                           : '',
                     ]"
                  >
                     {{ item.expireCount }}
                  </span>
               </div>
            </template>
         </div>
      </CardContent>
   </Card>
</template>
<style scoped></style>
