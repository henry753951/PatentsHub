<template>
   <div
      v-tooltip.right="{
         value: props.tooltip,
         pt: {
            text: '!bg-primary !text-primary-contrast !font-medium',
         },
      }"
      class="p-2 flex justify-center items-center bg-zinc-100 dark:bg-zinc-800 rounded-full w-9 h-9"
   >
      <Icon :name="props.icon" />
   </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
   icon: string
   tooltip?: string
}>();
</script>

<style scoped></style>
