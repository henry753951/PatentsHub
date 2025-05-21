<template>
   <div class="p-4 w-full prose dark:prose-invert space-y-2">
      <div class="w-[500px]">
         <BlockPatentFilter />
      </div>
   </div>
</template>

<script lang="ts" setup>

definePageMeta({
   name: "debug",
});

const { open, modals } = useModals();
const { $trpc } = useNuxtApp();
</script>

<style></style>
