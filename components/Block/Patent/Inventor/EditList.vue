<template>
   <div class="flex flex-col gap-4">
      <div class="space-y-2">
         <div class="font-semibold">
            主要發明人
         </div>
         <div class="h-[88px]">
            <BlockPatentInventorRow
               v-if="mainInventor"
               v-model:contribution="mainInventor.contribution"
               class="h-full"
               :name="mainInventor.name"
               :job="mainInventor.job"
               :belong="mainInventor.belong"
               :max="100 - totalContribution + mainInventor.contribution"
               :contribution-input="true"
            >
               <template #actions>
                  <div class="ps-6 h-full flex items-center">
                     <CustomIconButton
                        name="material-symbols:close-rounded"
                        @click="deleteInventor(mainInventor.id)"
                     />
                  </div>
               </template>
            </BlockPatentInventorRow>
            <BlockPatentInventorAdd
               v-else
               class="h-full"
               :choose-text="'新增主要發明人'"
               @select="addInventor($event, true)"
            />
         </div>
      </div>
      <div class="space-y-2">
         <div class="font-semibold">
            其他共同發明人
         </div>
         <div class="flex flex-col gap-3">
            <BlockPatentInventorRow
               v-for="inventor in otherInventors"
               :key="inventor.id"
               v-model:contribution="inventor.contribution"
               :name="inventor.name"
               :job="inventor.job"
               :belong="inventor.belong"
               :max="100 - totalContribution + inventor.contribution"
               :contribution-input="true"
            >
               <template #actions>
                  <div class="ps-6 h-full flex items-center">
                     <CustomIconButton
                        name="material-symbols:close-rounded"
                        @click="deleteInventor(inventor.id)"
                     />
                  </div>
               </template>
            </BlockPatentInventorRow>
            <BlockPatentInventorAdd
               :choose-text="'新增其他共同發明人'"
               @select="addInventor($event, false)"
            />
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import type { z } from "zod";
import type { CustomZodType } from "~/zod.dto";
interface Inventor {
   id: number
   name: string
   job: string
   belong: {
      college: string
      department: string
   }
}

const inventors = defineModel({
   type: Array as PropType<
      (Inventor & {
         isMain: boolean
         contribution: number
      })[]>,
   required: false,
   default: [],
});

const totalContribution = computed(() =>
   inventors.value.reduce((acc, inventor) => acc + inventor.contribution, 0),
);

const mainInventor = computed(() =>
   inventors.value.find((inventor) => inventor.isMain),
);

const otherInventors = computed(() =>
   inventors.value.filter((inventor) => !inventor.isMain),
);

const addInventor = (inventor: Inventor, isMain: boolean) => {
   if (isMain) {
      const mainInventor = inventors.value.find((i) => i.isMain);
      if (mainInventor !== undefined) {
         mainInventor.isMain = false;
      }
   }
   const existInventor = inventors.value.find((i) => i.id === inventor.id);
   if (existInventor !== undefined) {
      // isNotMain > isMain
      if (!existInventor.isMain && isMain) {
         existInventor.isMain = true;
         return;
      }
      // isMain > isNotMain
      if (existInventor.isMain && !isMain) {
         existInventor.isMain = false;
         return;
      }
      return;
   }

   inventors.value.push({
      id: inventor.id,
      isMain,
      name: inventor.name,
      job: inventor.job,
      belong: inventor.belong,
      contribution: 0,
   });
};

const deleteInventor = (id: number) => {
   const index = inventors.value.findIndex((inventor) => inventor.id === id);
   if (index !== -1) {
      inventors.value.splice(index, 1);
   }
};
</script>

<style scoped></style>
