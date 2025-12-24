<script setup lang="ts">
interface CountryCardProps {
   title: string
   isoCode: string
}

const props = defineProps<CountryCardProps>();
const emit = defineEmits(["delete", "edit"]);
// 將首位字母轉成大寫
const capitalizeFirstLetter = (string: string) => {
   return string.charAt(0).toUpperCase() + string.slice(1);
};
</script>

<template>
   <div class="relative px-6 pt-12 pb-6 bg-gray-50 dark:bg-zinc-800 rounded-xl">
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

         <div class="flex justify-between items-center">
            <div class="flex gap-4">
               <button
                  class="flex gap-1.5 items-center cursor-pointer text-stone-500 hover:bg-gray-200 px-3 py-1.5 rounded-md dark:text-white dark:hover:bg-zinc-700"
                  @click.stop="$emit('delete')"
               >
                  <Icon
                     name="gridicons:trash"
                     class="text-stone-500 dark:text-white"
                  />
                  <span class="dark:text-white">刪除</span>
               </button>
            </div>
            <button
               class="px-4 py-1.5 text-xs border border-solid cursor-pointer border-zinc-700 rounded-[100px] dark:text-white text-zinc-700 hover:dark:bg-zinc-700 hover:bg-zinc-200"
               @click.stop="$emit('edit')"
            >
               編輯
            </button>
         </div>
      </div>
   </div>
</template>
