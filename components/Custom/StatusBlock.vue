<template>
   <div class="flex flex-col gap-1 w-fit">
      <div
         class="font-bold text-gray-700 flex gap-1 items-center dark:text-gray-200"
      >
         <Icon :name="icon" />
         <span class="me-4">{{ title }}</span>
      </div>
      <div class="font-bold text-xl text-gray-800 dark:text-gray-200 select-text">
         <slot />
      </div>
   </div>
</template>

<script lang="ts" setup>
const { title = "", icon = "" } = defineProps({
   title: String,
   icon: String,
});
</script>

<style scoped></style>
