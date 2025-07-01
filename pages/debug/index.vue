<template>
   <div class="container mx-auto space-y-3 py-4">
      <div class="flex gap-2 flex-col">
         <template
            v-for="item in debugItems"
            :key="item.title"
         >
            <NuxtLink
               v-if="item.to"
               :to="item.to"
            >
               <div
                  class="p-2 rounded-lg bg-sky-100 dark:bg-sky-800 text-sky-800 dark:text-sky-200 hover:bg-sky-200 dark:hover:bg-sky-700 transition-colors"
               >
                  {{ item.title }}
               </div>
            </NuxtLink>
         </template>
      </div>
   </div>
</template>

<script setup lang="ts">
definePageMeta({ name: "debug" });

const debugItems = [
   {
      title: "狀態變更器",
      to: { name: "debug-status-cahnger" },
   },
   {
      title: "狀態變更器-資料庫更新",
      to: { name: "debug-status-cahnger-import" },
   },
] as INavItem[];
</script>
