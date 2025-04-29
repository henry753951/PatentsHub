<template>
   <div class="flex flex-col gap-4 py-2">
      <div class="flex flex-col items-center gap-4 py-8">
         <div class="flex gap-6">
            <div
               class="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl hover:shadow-yellow-100 transition-all duration-300 hover:scale-[115%] group"
            >
               <img
                  src="/images/icon.png"
                  class="w-[90px] h-[90px] object-cover"
                  draggable="false"
               />
               <div
                  class="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               ></div>
            </div>
            <div
               class="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl hover:shadow-orange-300 transition-all duration-300 hover:scale-[115%] group"
            >
               <img
                  src="/images/logo.jpg"
                  class="w-[90px] h-[90px] object-cover"
                  draggable="false"
               />
               <div
                  class="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               ></div>
            </div>
         </div>
         <p class="text-lg dark:text-gray-400 font-bold">
            國立高雄大學 專利管理系統
         </p>
      </div>

      <div class="px-2 flex justify-center">
         <p class="text-xs text-gray-500 dark:text-gray-400">
            <span> 系統版本 v{{ currentVersion }} </span>
            <span class="mx-1 text-gray-400">·</span>
            <span class="text-gray-600 dark:text-gray-400">
               © {{ new Date().getFullYear() }} 國立高雄大學 & JYBK
            </span>
         </p>
      </div>
      <BlockSettingsUpdateButton />
   </div>
</template>

<script lang="ts" setup>
const { currentVersion } = useUpdater();
</script>

<style scoped></style>
