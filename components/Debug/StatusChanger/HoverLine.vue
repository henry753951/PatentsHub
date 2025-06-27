<template>
   <Popover v-model:open="isOpen">
      <PopoverTrigger as-child>
         <div
            :data-date="date ? format(date, 'yyyy-MM-dd') : ''"
            class="px-1 rounded-md w-fit hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
         >
            <slot />
         </div>
      </PopoverTrigger>
      <PopoverContent
         align="start"
         class="p-2"
      >
         <div class="font-bold text-zinc-500 dark:text-zinc-400 mb-1">
            {{ date ? format(date, "yyyy-MM-dd") : "無日期" }}
         </div>
         <div class="grid gap-2 p-1 bg-zinc-50 dark:bg-zinc-800 rounded-md">
            <button
               v-for="status in presetStatus"
               :key="status"
               class="w-full text-left px-2 py-1 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors rounded-md"
               @click="handleStatusSelect(status)"
            >
               {{ status }}
            </button>
         </div>
      </PopoverContent>
   </Popover>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";

type Status = (typeof presetStatus)[number];

const props = defineProps<{
   onSelect?: (status: Status, date: Date | null) => void
}>();

const isOpen = ref(false);
const date = ref<Date | null>(null);

const slots = useSlots();
const analyzeSlotsDate = () => {
   const slotContent = slots.default?.()[0]?.children;
   consola.log("Analyzing slot content for date:", slotContent);
   if (typeof slotContent === "string") {
      // 中文日期格式（完整和不完整）
      const chinesePatternFull = /(?:民國)?(\d+)年(\d+)月(\d+)日/;
      const chinesePatternPartial = /(?:民國)?(\d+)年(\d+)月/;
      // 數字日期格式（完整和不完整）
      const numericPatternFull
         = /(\d{2,4})(?:[./-])(\d{1,2})(?:[./-])(\d{1,2})\b/;
      const numericPatternPartial = /(\d{2,4})(?:[./-]?)(\d{1,2})/;

      // 先嘗試匹配中文完整格式
      let match = slotContent.match(chinesePatternFull);
      if (match) {
         consola.log("1", match);
         const [, yearStr, monthStr, dayStr] = match;
         let year = parseInt(yearStr);
         if (yearStr.length <= 3) {
            year += 1911; // 民國年轉西元年
         }
         const month = monthStr.padStart(2, "0");
         const day = dayStr.padStart(2, "0");
         const dateStr = `${year}-${month}-${day}`;
         const date = new Date(dateStr);
         if (!isNaN(date.getTime())) {
            return date; // 有效日期，返回Date物件
         }
      }

      // 再嘗試匹配中文不完整格式（僅年月）
      match = slotContent.match(chinesePatternPartial);
      if (match) {
         consola.log("2", match);
         const [, yearStr, monthStr] = match;
         let year = parseInt(yearStr);
         if (yearStr.length <= 3) {
            year += 1911; // 民國年轉西元年
         }
         const month = monthStr.padStart(2, "0");
         const day = "01"; // 缺少日，設置為1號
         const dateStr = `${year}-${month}-${day}`;
         const date = new Date(dateStr);
         if (!isNaN(date.getTime())) {
            return date; // 有效日期，返回Date物件
         }
      }

      // 再嘗試匹配數字完整格式
      match = slotContent.match(numericPatternFull);
      if (match) {
         consola.log("3", match);
         const [, yearStr, monthStr, dayStr] = match;
         let year = parseInt(yearStr);
         if (yearStr.length <= 3) {
            year += 1911; // 民國年轉西元年
         }
         const month = monthStr.padStart(2, "0");
         const day = dayStr.padStart(2, "0");
         const dateStr = `${year}-${month}-${day}`;
         const date = new Date(dateStr);
         if (!isNaN(date.getTime())) {
            return date; // 有效日期，返回Date物件
         }
      }

      // 最後嘗試匹配數字不完整格式（僅年月）
      match = slotContent.match(numericPatternPartial);
      if (match) {
         consola.log("4", match);
         const [, yearStr, monthStr] = match;
         let year = parseInt(yearStr);
         if (yearStr.length <= 3) {
            year += 1911; // 民國年轉西元年
         }
         const month = monthStr.padStart(2, "0");
         const day = "01"; // 缺少日，設置為1號
         const dateStr = `${year}-${month}-${day}`;
         const date = new Date(dateStr);
         if (!isNaN(date.getTime())) {
            return date; // 有效日期，返回Date物件
         }
      }
   }

   return null; // 無匹配或無效日期，返回null
};

const handleStatusSelect = (status: Status) => {
   if (props.onSelect) {
      props.onSelect(status, date.value);
   }
};

onMounted(() => {
   date.value = analyzeSlotsDate();
});
</script>
