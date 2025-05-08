<template>
   <div class="p-4 w-full prose dark:prose-invert space-y-2">
      <div>
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
