<template>
   <div
      class="flex items-center justify-between w-full px-4 py-4 bg-white dark:bg-zinc-900"
   >
      <Icon
         name="basil:star-solid"
         class="text-yellow-500 dark:text-yellow-400 w-6 h-6"
      />
      <!-- Left Section -->
      <div class="flex items-center space-x-3 px-4">
         <div class="flex flex-col items-center">
            <span class="text-xs font-light text-gray-500 dark:text-gray-400">
               發明人
            </span>
            <span class="text-gray-700 dark:text-gray-200 font-bold text-lg">
               鍾宜璇
            </span>

            <div
               class="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-700 px-1 py-[1px] rounded flex items-center space-x-1"
            >
               <Icon
                  name="ic:baseline-people-alt"
                  size="16"
               />
               <div class="text-xs">
                  +3
               </div>
            </div>
         </div>
      </div>

      <!-- Middle Section -->
      <div class="flex flex-col items-start flex-1">
         <div class="flex items-center space-x-2">
            <div
               class="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 px-2 py-0.5 text-xs rounded border border-yellow-200 dark:border-yellow-800"
            >
               工學院
            </div>
            <div class="text-gray-700 dark:text-gray-200 text-sm">
               化學工程及材料工程學系
            </div>
         </div>
         <span
            class="text-gray-700 dark:text-gray-200 mt-1 line-clamp-1 font-medium text-lg"
         >血液分離萃取方法及其裝置</span>
      </div>

      <!-- Right Section -->
      <div class="flex items-center space-x-4">
         <div class="flex flex-col items-end">
            <div class="flex items-center gap-1">
               <NuxtImg
                  v-if="country"
                  :src="`https://flagcdn.com/w160/${country.code.toLowerCase()}.png`"
                  class="h-3 rounded"
               />
               <div
                  v-else
                  class="h-3 w-4 rounded bg-gray-300 dark:bg-gray-700 flex items-center justify-center"
               >
                  <Icon
                     name="ic:baseline-flag"
                     size="8"
                     class="text-gray-500 dark:text-gray-400"
                  />
               </div>
               <span class="text-gray-700 dark:text-gray-200 text-xs">
                  {{ patentNumber ?? "未輸入" }}
               </span>
               <span
                  v-if="type"
                  class="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 px-2 py-0.5 text-xs rounded"
               >
                  {{ type }}
               </span>
            </div>
            <div class="flex items-center space-x-2">
               <span class="text-gray-600 dark:text-gray-300">維護期程</span>
               <span class="text-gray-700 dark:text-gray-200">2023/2/28</span>
            </div>
         </div>
         <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-500 rounded-full">
            </div>
            <span class="text-green-600 dark:text-green-400">有效</span>
            <span
               v-if="expiryDate"
               class="text-red-500 dark:text-red-400 text-sm"
            >
               {{ countdown }}到期
            </span>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { format } from "date-fns";
import { useTimeAgo } from "@vueuse/core";

const currentTime = useNow();
const {
   expiryDate,
   status,
   name,
   country,
   patentNumber,
   type,
   department = {
      name: "化學工程及材料工程學系",
      college: "工學院",
   },
   author,
   coAuthors = [],
} = defineProps<{
   expiryDate?: string
   status?: string
   name: string
   country?: {
      name: string
      code: string
   }
   patentNumber?: string
   type?: string
   department?: {
      name: string
      college: string
   }
   author: string
   coAuthors?: string[]
}>();

const countdown = computed(() => {
   if (expiryDate) {
      const time = new Date(expiryDate);
      console.log(time);
      const timeAgo = useTimeAgo(time, {
         messages: {
            justNow: "剛剛",
            past: (n: any) => `${n}前`,
            future: (n: any) => `${n}後`,
            second: n => `${n} 秒`,
            minute: n => `${n} 分鐘`,
            hour: n => `${n} 小時`,
            day: n => `${n} 天`,
            week: n => `${n} 週`,
            month: n => `${n} 個月`,
            year: n => `${n} 年`,
            invalid: "無效的時間",
         },
      });
      console.log(timeAgo);
      return timeAgo;
   }
   return "";
});
</script>

<style scoped></style>
