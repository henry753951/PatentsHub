<template>
   <div>
      <div
         class="flex justify-between items-center w-full dark:bg-[#09090b] bg-white z-[3]"
         :class="tclass"
      >
         <h3
            v-if="title"
            class="text-lg font-extrabold text-gray-700 py-3 dark:text-gray-200"
         >
            {{ title }}
         </h3>
         <div
            v-if="saveButton"
            class="py-2 px-3 rounded-full flex items-center justify-center bg-zinc-100 cursor-pointer hover:bg-zinc-200 dark:bg-zinc-900 dark:text-white transition-all duration-300 gap-1 select-none"
            @click="emits('save')"
         >
            <Icon name="mdi:content-save" /> <span class="text-xs">保存</span>
         </div>
      </div>
      <div
         class="bg-gray-100 p-4 rounded-md dark:bg-[#1a1a1a] dark:text-gray-200"
      >
         <div class="grid grid-cols-1 gap-4">
            <slot />
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
const {
   title = undefined,
   tclass = "",
   saveButton = false,
} = defineProps({
   title: String,
   tclass: String,
   saveButton: Boolean,
});

const emits = defineEmits<{
   (e: "save"): void
}>();
</script>

<style scoped></style>
