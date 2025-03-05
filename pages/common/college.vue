<template>
   <div class="grid grid-cols-2 gap-4 container mx-auto p-6 h-full">
      <div
         class="h-full w-full bg-white rounded-lg shadow-md dark:bg-zinc-900 min-h-0 overflow-hidden"
      >
         <FormCollegeManage
            v-model="selectedDepartment"
            :selectable="true"
            @update:model-value="onDepartmentSelected"
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
import { useInventorsStore } from "~/stores/inventors";

definePageMeta({
   name: "common-collegeManage",
});

const collegesStore = useCollegesStore();
const inventorsStore = useInventorsStore();

const selectedDepartment = ref<Department | null>(null);

type Department = RouterOutput["data"]["college"]["getColleges"][0]["departments"][0];

onMounted(async () => {
   await collegesStore.refresh();
});

const onDepartmentSelected = async (department: Department | null) => {
   selectedDepartment.value = department;
   inventorsStore.setDepartmentFilter(department?.DepartmentID);
   await inventorsStore.fetchInventors(department?.DepartmentID);
};
</script>

<style scoped></style>
