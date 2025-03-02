<template>
   <Popover>
      <PopoverTrigger as-child>
         <div
            class="bg-slate-50 dark:bg-zinc-900 p-3 rounded-lg w-full border border-slate-200 dark:border-zinc-800 hover:shadow-sm transition-shadow"
         >
            <div class="font-semibold color-slate-800 dark:color-zinc-100">
               工學院
            </div>
            <div class="color-slate-600 dark:color-zinc-400">
               資訊工程學系
            </div>
         </div>
      </PopoverTrigger>
      <PopoverContent class="w-[var(--radix-popper-anchor-width)]">
         <div class="flex gap-2">
            <div
               v-for="college in colleges"
               :key="college.CollegeID"
               class="flex"
            >
               <div></div>
               <div class="flex">
                  <div
                     v-for="department in college.departments"
                     :key="department.DepartmentID"
                     class="department-option"
                  >
                  </div>
               </div>
            </div>
         </div>
      </PopoverContent>
   </Popover>
</template>

<script lang="ts" setup>
const belongs = defineModel("modelValue", {
   type: Object as PropType<{
      collegeID: string
      departmentID: string
   }>,
   required: false,
});

const collegesStore = useCollegesStore();
const { colleges } = storeToRefs(collegesStore);
</script>

<style scoped>
.department-option {
   padding: 0.5rem;
   border-radius: 0.5rem;
   background-color: var(--color-slate-50);
   color: var(--color-slate-800);
   cursor: pointer;
   transition: background-color 0.2s;
   writing-mode: vertical-rl;
}

.department-option:hover {
   background-color: var(--color-slate-100);
}
</style>
