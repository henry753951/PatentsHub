<template>
   <div
      class="flex items-center justify-center w-5 h-5 rounded-full cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      :class="{
         'bg-zinc-200 dark:bg-zinc-800': secondary,
      }"
   >
      <Icon
         :name="name"
         size="13px"
      />
   </div>
</template>

<script lang="ts" setup>
const { name, secondary = true } = defineProps<{
   name: string
   secondary?: boolean
}>();
</script>

<style scoped></style>
