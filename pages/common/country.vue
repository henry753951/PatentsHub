<template>
   <div class="container mx-auto p-6 h-full">
      <div
         class="h-full w-full bg-white rounded-lg shadow-md dark:bg-zinc-900 min-h-0 overflow-hidden"
      >
         <FormCountryManage></FormCountryManage>
      </div>
      <div class="grid grid-cols-3 gap-4 container mx-auto p-6 h-full">
         <div></div>
      </div>
   </div>
</template>

<script lang="ts" setup>
definePageMeta({
   name: "country-view",
});
</script>

<style scoped></style>
