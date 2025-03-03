<script setup lang="ts">
interface CountryCardProps {
   title: string;
   isoCode: string;
   caseCount: number;
}

const props = defineProps<CountryCardProps>();

// 將首位字母轉成大寫
const capitalizeFirstLetter = (string: string) => {
   return string.charAt(0).toUpperCase() + string.slice(1);
};
</script>

<template>
   <div class="relative px-6 pt-12 pb-6 bg-white rounded-xl">
      <CountryFlag :name=props.title />
      <div class="text-center">
         <h2 class="mb-1 text-lg text-neutral-900">{{ capitalizeFirstLetter(props.title) }}</h2>
         <p class="mb-8 text-sm text-stone-500">ISOCode: {{ isoCode }}</p>
         <div class="mb-8">
            <div
               class="mb-0.5 h-1.5 rounded bg-neutral-200 bg-opacity-80"
            ></div>
            <p class="text-xs text-left text-stone-500 text-opacity-80">
               {{ caseCount }}個案件
            </p>
         </div>
         <div class="flex justify-between items-center">
            <div class="flex gap-4">
               <button
                  class="flex gap-1.5 items-center text-xs cursor-pointer text-stone-500"
               >
                  <Icon
                     name="gridicons:create"
                     class="w-6 h-6 text-black"
                  />
                  <span>編輯</span>
               </button>
               <button
                  class="flex gap-1.5 items-center text-xs cursor-pointer text-stone-500"
               >
                  <Icon
                     name="gridicons:trash"
                     class="w-6 h-6 text-black"
                  />
                  <span>刪除</span>
               </button>
            </div>
            <button
               class="px-4 py-1.5 text-xs border border-solid cursor-pointer border-zinc-700 rounded-[100px] text-zinc-700"
            >
               詳細
            </button>
         </div>
      </div>
   </div>
</template>
