<template>
   <div
      class="flex items-center justify-between w-full px-4 py-4 bg-white dark:bg-zinc-900"
   >
      <!-- Left Section: 發明人 -->
      <div class="flex items-center space-x-3 px-4">
         <div class="flex flex-col items-center">
            <span class="text-xs font-light text-gray-500 dark:text-gray-400">
               發明人
            </span>
            <span class="text-gray-700 dark:text-gray-200 font-bold text-lg">
               {{ author?.contactInfo.Name ?? "無資料" }}
            </span>
            <div
               v-if="coAuthors.length > 0"
               class="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-700 px-1 py-[1px] rounded flex items-center space-x-1"
            >
               <Icon
                  name="ic:baseline-people-alt"
                  size="16"
               />
               <div class="text-xs">
                  +{{ coAuthors.length }}
               </div>
            </div>
         </div>
      </div>

      <!-- Middle Section: 發明名稱、學院、系所、資助單位 -->
      <div class="flex flex-col items-start flex-1">
         <div class="flex items-center space-x-2">
            <CustomBadgeWithText
               :text="patent.department.college.Name"
               size="xs"
            />

            <div class="text-gray-700 dark:text-gray-200 text-sm">
               {{ patent.department.Name }}
            </div>
         </div>
         <span
            class="text-gray-700 dark:text-gray-200 mt-1 line-clamp-1 font-medium text-lg"
         >
            {{ name }}
         </span>
         <div class="flex items-center space-x-2 mt-1">
            <span class="text-gray-600 dark:text-gray-300 text-xs">
               資助單位:
            </span>
            <span class="text-gray-700 dark:text-gray-200 text-xs">
               {{ fundingUnit }}
            </span>
         </div>
      </div>

      <!-- Right Section: 編號、專利國家、專利類型、維護期程、維護年度、狀態 -->
      <div class="flex items-center space-x-4">
         <div class="flex flex-col items-end">
            <div class="flex items-center gap-1">
               <NuxtImg
                  v-if="patent.country"
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
                  class="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 px-2 py-0.5 text-xs rounded"
               >
                  {{ patentTypeStr }}
               </span>
            </div>
            <div class="flex items-center space-x-2">
               <span class="text-gray-600 dark:text-gray-300 text-xs">
                  維護期程
               </span>
               <span class="text-gray-700 dark:text-gray-200 text-xs">
                  {{ maintenancePeriod }}
               </span>
            </div>
            <div class="flex items-center space-x-2">
               <span class="text-gray-600 dark:text-gray-300 text-xs">
                  維護年度
               </span>
               <span class="text-gray-700 dark:text-gray-200 text-xs">
                  {{ maintenanceYear }}
               </span>
            </div>
         </div>
         <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-500 rounded-full">
            </div>
            <span class="text-green-600 dark:text-green-400">{{ status }}</span>
            <span
               v-if="expiryDate"
               class="text-red-500 dark:text-red-400 text-sm"
            >
               {{ expiryDate }}到期
            </span>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
type Patent = RouterOutput["data"]["patent"]["getPatents"][0];

//    name = "血液分離萃取方法及其裝置", // 發明名稱（必顯示） 👌
//    country = { name: "台灣", code: "TW" }, // 專利國家（必顯示） 👌
//    patentNumber = "I723456", // 編號（必顯示）👌
//    type = "DESIGN", // 專利類型（原始欄位）👌
//    department = { 👌
//       name: "化學工程及材料工程學系", // 系所（原始欄位）
//       college: "工學院", // 學院（原始欄位）
//    },
//    author = "鍾宜璇", // 發明人（必顯示） 👌
//    coAuthors = ["李明哲", "陳雅婷", "王志豪"], // 共同發明人（原始欄位） 👌

// FAKED DATA
const maintenancePeriod = "2023/02/28 - 2033/02/27"; // 維護期程（必顯示）
const expiryDate = "2033-02-27"; // 到期日（假資料）
const status = "有效"; // 狀態（假資料）
const maintenanceYear = "2023"; // 維護年度（必顯示）
const fundingUnit = "科技部"; // 資助單位（必顯示）

const { patent } = defineProps<{
   patent: Patent
}>();

const name = computed(() => {
   if (!patent) return "";
   return patent.Title ?? patent.DraftTitle;
});

const author = computed(() => {
   const mainInventor = patent.inventors.find((i) => i.Main)?.inventor;
   return mainInventor; // 預設值作為後備
});

const coAuthors = computed(() => {
   return patent.inventors.filter((i) => !i.Main).map((i) => i.inventor)
      .length > 0
      ? patent.inventors.filter((i) => !i.Main).map((i) => i.inventor)
      : [];
});

const patentTypeStr = computed(() => {
   const map = {
      INVENTION: "發明",
      UTILITY_MODEL: "新型",
      DESIGN: "設計",
      PLANT: "植物",
   };
   return patent.PatentType ? map[patent.PatentType] : "未選擇";
});
</script>

<style scoped>
/* 保留原始樣式 */
</style>
