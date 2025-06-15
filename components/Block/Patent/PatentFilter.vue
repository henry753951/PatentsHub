<script setup lang="ts">
import type { z } from "zod";
import type { dbZ } from "~/server";
import { onClickOutside } from "@vueuse/core";
const countriesStore = useCountriesStore();
const collegesStore = useCollegesStore();
const filterItems = {
   startYear: {
      label: "起始年度",
      type: "number",
      value: ref(110),
   },
   endYear: {
      label: "結束年度",
      type: "number",
      value: ref(new Date().getFullYear() - 1911),
   },
   startApplicationDate: {
      label: "起始申請日期",
      type: "date",
      value: ref(new Date()),
   },
   endApplicationDate: {
      label: "結束申請日期",
      type: "date",
      value: ref(new Date()),
   },
   status: {
      label: "狀態",
      type: "select",
      value: ref(""),
      options: ref([
         {
            label: "已登錄",
            value: "已登錄",
         },
         {
            label: "已初評",
            value: "已初評",
         },
         {
            label: "已獲證",
            value: "已獲證",
         },
         {
            label: "有效",
            value: "有效",
         },
         {
            label: "已過期",
            value: "已過期",
         },
         {
            label: "申請終止中",
            value: "申請終止中",
         },
         {
            label: "國科會同意終止",
            value: "國科會同意終止",
         },
         {
            label: "已讓與",
            value: "已讓與",
         },
         {
            label: "已放棄",
            value: "已放棄",
         },
         {
            label: "已撤案",
            value: "已撤案",
         },
      ]),
   },
   departments: {
      label: "系所",
      type: "select",
      value: ref(""),
      options: computed(() => {
         return collegesStore.colleges.flatMap((college) => {
            return college.departments.map((department) => {
               return {
                  label: `${college.Name} - ${department.Name}`,
                  value: `${department.DepartmentID}`,
               };
            });
         });
      }),
   },
   countrys: {
      label: "國別",
      type: "select",
      value: ref(""),
      options: computed(() => {
         return countriesStore.countries.map((country) => {
            return {
               label: country.CountryName,
               value: country.CountryName,
            };
         });
      }),
   },
};

const inputRef = useTemplateRef<HTMLInputElement>("input");
const isHover = ref(false);
const isOR = ref(false);
const {
   toggleFilter,
   searchTexts,
   filterComponents,
   content,
   currentFilter,
   getFilterActive,
} = useFilterComponent(filterItems as Record<string, FilterItem>, inputRef);

const patentFilter = defineModel("patentFilter", {
   type: Object as PropType<PatentFilterType>,
});

const updateFilter = () => {
   const Year
      = getFilterActive("startYear") || getFilterActive("endYear")
         ? {
            gte: getFilterActive("startYear")
               ? filterItems.startYear.value.value
               : undefined,
            lte: getFilterActive("endYear")
               ? filterItems.endYear.value.value
               : undefined,
         }
         : undefined;
   const SearchText
      = searchTexts.value.length > 0
         ? searchTexts.value.map((text) => {
            return {
               OR: [
                  { Title: { contains: text } },
                  { TitleEnglish: { contains: text } },
                  { DraftTitle: { contains: text } },
                  { InternalID: { contains: text } },
                  { application: { ApplicationNumber: { contains: text } } },
                  { external: { PatentNumber: { contains: text } } },
                  { internal: { InitialReviewAgencies: { some: { agencyUnit: { Name: { contains: text } } } } } },
                  { internal: { TakerAgencies: { some: { agencyUnit: { Name: { contains: text } } } } } },
                  {
                     inventors: {
                        some: {
                           Main: true,
                           inventor: {
                              contactInfo: {
                                 Name: {
                                    contains: text,
                                 },
                              },
                           },
                        },
                     },
                  },
               ],
            };
         })
         : undefined;

   const Country = getFilterActive("countrys")
      ? {
         CountryName: {
            contains: getFilterActive("countrys")
               ? filterItems.countrys.value.value
               : undefined,
         },
      }
      : undefined;

   const ApplicationDate
      = getFilterActive("startApplicationDate")
        || getFilterActive("endApplicationDate")
         ? {
            gte: getFilterActive("startApplicationDate")
               ? filterItems.startApplicationDate.value.value
               : undefined,
            lte: getFilterActive("endApplicationDate")
               ? filterItems.endApplicationDate.value.value
               : undefined,
         }
         : undefined;

   const Department = getFilterActive("departments")
      ? {
         DepartmentID: parseInt(filterItems.departments.value.value),
      }
      : undefined;

   patentFilter.value = {
      where: {
         ...(patentFilter.value?.where ?? {}),
         Year: Year,
         country: Country,
         application: {
            FilingDate: ApplicationDate,
         },
         department: Department,
         OR: isOR.value ? SearchText : undefined,
         AND: isOR.value ? undefined : SearchText,
      },
      static: {
         status: getFilterActive("status")
            ? (filterItems.status.value
               .value as PatentFilterType["static"]["status"])
            : undefined,
      },
   };
};
onMounted(() => {
   updateFilter();
});
watchThrottled(
   content,
   (newValue) => {
      updateFilter();
   },
   {
      throttle: 500,
   },
);

const filterBoxRef = useTemplateRef<HTMLDivElement>("filterBox");
onClickOutside(filterBoxRef, (event) => {
   if ((event.target as HTMLElement).classList.contains("p-select-option")) {
      return;
   }
   isHover.value = false;
});
</script>

<template>
   <div
      ref="filterBox"
      class="rounded-lg bg-zinc-200 dark:bg-zinc-900 p-2 relative focus-within:ring-2"
      @click="isHover = true"
   >
      <input
         ref="input"
         v-model="content"
         class="w-full bg-transparent border-0 focus:outline-none"
         type="text"
         placeholder="輸入過濾條件，亦可同時直接輸入發明人、專利名稱、內部編號等"
      />
      <div class="absolute top-0 right-0 flex items-center h-full px-2">
         <TooltipProvider :delay-duration="0">
            <Tooltip>
               <TooltipTrigger>
                  <div
                     class="bg-zinc-100 dark:bg-zinc-900 rounded-full h-fit flex items-center justify-center p-1 cursor-pointer"
                     @click="
                        isOR = !isOR;
                        updateFilter();
                     "
                  >
                     <Icon :name="isOR ? 'mdi:set-or' : 'mdi:set-and'" />
                  </div>
               </TooltipTrigger>
               <TooltipContent>
                  <div>
                     <div class="text-sm font-semibold">
                        {{ !isOR ? "AND" : "OR" }}
                     </div>
                     文字將會以
                     <span class="bg-zinc-100/20 rounded px-1">
                        {{ !isOR ? "同時符合" : "任一符合" }}
                     </span>
                     的方式進行過濾
                  </div>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </div>

      <Transition name="fade">
         <template
            v-if="
               currentFilter?.type !== 'string' &&
                  filterComponents.some((filter) => !getFilterActive(filter.id)) &&
                  isHover
            "
         >
            <div
               class="absolute bottom-0 left-0 translate-y-[calc(100%)] pt-2 z-50"
               :class="{
                  'w-fit min-w-[300px]': currentFilter,
                  'w-full': !currentFilter,
               }"
            >
               <div
                  class="bg-white dark:bg-zinc-900 rounded-lg flex flex-col justify-center p-2 border border-zinc-300 dark:border-zinc-700 shadow-lg"
               >
                  <template v-if="!currentFilter">
                     <div
                        v-for="(filter, index) in filterComponents"
                        :key="index"
                     >
                        <template v-if="!getFilterActive(filter.id)">
                           <div
                              class="cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg p-2 flex gap-2 items-center"
                              @click="toggleFilter(filter.id, true)"
                           >
                              {{ filter.label }}
                           </div>
                        </template>
                     </div>
                  </template>
                  <template v-else>
                     <component
                        :is="currentFilter.component"
                        v-bind="currentFilter.bind"
                        :key="currentFilter.id"
                     />
                  </template>
               </div>
            </div>
         </template>
      </Transition>
   </div>
</template>

<style scoped>
.filter-box {
   overflow-y: hidden;
   overflow-x: scroll;
}
.filter-box::-webkit-scrollbar {
   display: none;
}

/* Transition */

.fade-enter-active,
.fade-leave-active {
   transition: all 0.2s ease;
}
.fade-enter-from {
   opacity: 0;
   transform: translateY(calc(100% - 0.5rem));
}
.fade-leave-to {
   opacity: 1;
   transform: translateY(calc(100%));
}
.fade-leave-to {
   opacity: 0;
   transform: translateY(calc(100% - 0.5rem));
}
</style>
