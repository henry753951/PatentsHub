<template>
   <div>
      <Popover>
         <PopoverTrigger as-child>
            <div
               v-auto-animate
               class="bg-slate-50 dark:bg-zinc-900 p-3 rounded-xl w-full border border-slate-200 dark:border-zinc-800 hover:shadow-sm transition-shadow cursor-pointer"
            >
               <template
                  v-if="
                     currentCollegeAndDepartment.college &&
                        currentCollegeAndDepartment.department
                  "
               >
                  <div class="flex flex-col gap-1 min-w-0 max-w-[400px]">
                     <div
                        class="font-semibold color-slate-800 dark:color-zinc-100 truncate"
                     >
                        {{ currentCollegeAndDepartment.college.Name }}
                     </div>
                     <div class="color-slate-600 dark:color-zinc-400 truncate">
                        {{ currentCollegeAndDepartment.department.Name }}
                     </div>
                  </div>
               </template>
               <template v-else>
                  <div class="color-slate-400 dark:color-zinc-400">
                     請選擇系所
                  </div>
               </template>
            </div>
         </PopoverTrigger>
         <PopoverContent
            class="w-[var(--reka-popper-anchor-width)] rounded-xl"
         >
            <OverlayScrollbarsComponent>
               <div class="flex gap-8 pb-3 select-none">
                  <div
                     v-for="college in colleges"
                     :key="college.CollegeID"
                     class="flex flex-col gap-2"
                  >
                     <div
                        class="w-full font-semibold college-title border-b border-slate-200 dark:border-zinc-800 pe-2 text-nowrap"
                     >
                        {{ college.Name }}
                     </div>
                     <div class="flex gap-3 flex-1">
                        <div
                           v-for="department in college.departments"
                           :key="department.DepartmentID"
                           class="department-option letter-vertical truncate max-h-[260px]"
                           :class="{
                              'bg-blue-100 dark:bg-blue-950':
                                 belongs?.departmentID ===
                                 department.DepartmentID,
                              'bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800':
                                 belongs?.departmentID !==
                                 department.DepartmentID,
                           }"
                           @click="
                              belongs = {
                                 collegeID: department.CollegeID,
                                 departmentID: department.DepartmentID,
                              };
                              nextTick(updateBelongsInDbModel);
                           "
                        >
                           {{ department.Name }}
                        </div>
                        <div
                           v-if="!college.departments.length"
                           class="text-slate-400 dark:text-zinc-400 letter-vertical flex items-center justify-center w-full"
                        >
                           尚無系所
                        </div>
                     </div>
                  </div>
               </div>
            </OverlayScrollbarsComponent>
         </PopoverContent>
      </Popover>
   </div>
</template>

<script lang="ts" setup>
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import type { z } from "zod";
import type { dbZ } from "~/server";

const belongs = defineModel("modelValue", {
   type: Object as PropType<{
      collegeID: number
      departmentID: number
   } | null>,
   required: false,
});

const belongsInDb = defineModel("belongsInDb", {
   type: Object as PropType<{
      Name: string
      Description: string | null
      college: {
         Name: string
         Description: string | null
         CollegeID: number
      }
      DepartmentID: number
      CollegeID: number
   }>,
   required: false,
});

watch(
   () => belongsInDb.value,
   (value) => {
      if (!value) return;
      belongs.value = {
         collegeID: value.CollegeID,
         departmentID: value.DepartmentID,
      };
   },
   {
      deep: true,
   },
);

const collegesStore = useCollegesStore();
const { colleges } = storeToRefs(collegesStore);

onMounted(async () => {
   await collegesStore.refresh();
   if (belongsInDb.value) {
      belongs.value = {
         collegeID: belongsInDb.value.CollegeID,
         departmentID: belongsInDb.value.DepartmentID,
      };
   }
});

const currentCollegeAndDepartment = computed(() => {
   const college = colleges.value.find(
      (college) =>
         belongs.value && college.CollegeID === belongs.value.collegeID,
   );
   const department = college?.departments.find(
      (department) =>
         belongs.value
         && department.DepartmentID === belongs.value.departmentID,
   );
   return { college, department };
});

const updateBelongsInDbModel = () => {
   if (
      !currentCollegeAndDepartment.value.college
      || !currentCollegeAndDepartment.value.department
   )
      return;

   belongsInDb.value = {
      Name: currentCollegeAndDepartment.value.department.Name,
      Description: currentCollegeAndDepartment.value.department.Description,
      college: {
         Name: currentCollegeAndDepartment.value.college.Name,
         Description: currentCollegeAndDepartment.value.college.Description,
         CollegeID: currentCollegeAndDepartment.value.college.CollegeID,
      },
      DepartmentID: currentCollegeAndDepartment.value.department.DepartmentID,
      CollegeID: currentCollegeAndDepartment.value.college.CollegeID,
   };
};
</script>

<style scoped>
.department-option {
   padding: 0.5rem;
   border-radius: 0.5rem;
   cursor: pointer;
   transition: background-color 0.2s;
}

.letter-vertical {
   writing-mode: vertical-rl;
   letter-spacing: 0.2rem;
}

.college-title {
   font-size: 1.1rem;
}
</style>
