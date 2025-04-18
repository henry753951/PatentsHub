<template>
   <div class="container mx-auto p-6 h-[var(--content-area-height)]">
      <div
         class="h-full w-full bg-white rounded-lg shadow-md dark:bg-zinc-900 min-h-0 overflow-hidden"
      >
         <FormCountryManage></FormCountryManage>
      </div>
   </div>
</template>

<script lang="ts" setup>
definePageMeta({
   name: "common-countryManage",
});
</script>

<style scoped></style>
