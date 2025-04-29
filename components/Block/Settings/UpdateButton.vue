<template>
   <div
      class="flex flex-col gap-2 p-4 bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-300/50 dark:border-zinc-700/50 rounded-md"
   >
      <div class="flex items-center justify-between gap-2">
         <h3 class="text-md font-semibold">
            版本更新
         </h3>
         <button @click="updaterService.checkForUpdates">
            檢查更新
         </button>
      </div>
      <p class="text-sm text-muted-foreground">
         {{ updaterService.updateInfo.value }}
      </p>
   </div>
</template>

<script lang="ts" setup>
const { rounded = false } = defineProps<{
   rounded?: boolean
}>();

const updaterService = useUpdater();
</script>

<style scoped></style>
