<template>
   <div
      class="flex items-center justify-center w-5 h-5 rounded-full cursor-pointer"
      :class="{
         'bg-zinc-200 dark:bg-zinc-800': secondary,
      }"
   >
      <Icon
         :name="name"
         size="15px"
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
