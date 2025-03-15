<template>
   <div class="grid grid-cols-2 gap-4 container mx-auto p-6 h-full">
      <div
         class="h-full w-full bg-white rounded-lg shadow-md dark:bg-zinc-900 min-h-0 overflow-hidden"
      >
         <FormCollegeManage
            v-model="selectedDepartment"
            :selectable="true"
         />
      </div>
      <div
         class="h-full w-full bg-white rounded-lg shadow-md dark:bg-zinc-900 min-h-0 overflow-hidden"
      >
         <FormInventorManage :department="selectedDepartment" />
      </div>
   </div>
</template>

<script lang="ts" setup>
definePageMeta({
   name: "common-collegeManage",
});
const selectedDepartment = ref<Department>();

type Department =
   RouterOutput["data"]["college"]["getColleges"][0]["departments"][0];
</script>

<style scoped></style>
