<script setup lang="ts">
interface CountryCardProps {
   title: string
   isoCode: string
   caseCount: number
   isSelected: boolean
}

const props = defineProps<CountryCardProps>();
const emit = defineEmits(["edit"]);
// 將首位字母轉成大寫
const capitalizeFirstLetter = (string: string) => {
   return string.charAt(0).toUpperCase() + string.slice(1);
};
</script>

<template>
   <div
      :class="{
         'border-2 border-red-500': props.isSelected,
         'border-2 border-transparent': !props.isSelected,
      }"
      class="relative px-6 pt-12 pb-6 bg-gray-50 dark:bg-zinc-800 rounded-xl"
   >
      <CountryFlag
         :name="props.title"
         :isocode="props.isoCode"
      />
      <div class="text-center">
         <h2 class="mb-1 text-lg text-neutral-900 dark:text-white">
            {{ capitalizeFirstLetter(props.title) }}
         </h2>
         <p class="mb-8 text-sm text-stone-500 dark:text-white">
            ISOCode: {{ props.isoCode }}
         </p>
         <div class="mb-8">
            <div
               class="mb-0.5 h-1.5 rounded bg-neutral-200 bg-opacity-80"
            ></div>
            <p
               class="text-xs text-left text-stone-500 text-opacity-80 dark:text-white"
            >
               {{ props.caseCount }}個案件
            </p>
         </div>
         <div class="flex justify-between items-center">
            <div class="flex gap-4">
               <button
                  class="flex gap-1.5 items-center text-xs cursor-pointer text-stone-500"
                  @click="$emit('edit')"
               >
                  <Icon
                     name="gridicons:create"
                     class="w-6 h-6 text-black dark:text-white"
                  />
                  <span class="dark:text-white">編輯</span>
               </button>
            </div>
            <button
               class="px-4 py-1.5 text-xs border border-solid cursor-pointer border-zinc-700 rounded-[100px] dark:text-white text-zinc-700"
            >
               詳細
            </button>
         </div>
      </div>
   </div>
</template>
