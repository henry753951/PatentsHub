<template>
   <div class="flex flex-col gap-4">
      <div class="space-y-2">
         <div class="font-semibold">
            主要發明人
         </div>
         <div class="h-[88px]">
            <BlockPatentInventorRow
               v-if="mainInventor"
               v-model:contribution="mainInventor.Contribution"
               class="h-full"
               :name="mainInventor.inventor.contactInfo.Name"
               :job="mainInventor.inventor.contactInfo.Role || ''"
               :belong="{
                  college: mainInventor.inventor.department.college.Name,
                  department: mainInventor.inventor.department.Name
               }"
               :max="100 - totalContribution + (mainInventor.Contribution || 0)"
               :contribution-input="true"
               :compact="true"
            >
               <template #actions>
                  <div class="ps-6 h-full flex items-center">
                     <CustomIconButton
                        name="material-symbols:close-rounded"
                        @click="deleteInventor(mainInventor.InventorID)"
                     />
                  </div>
               </template>
            </BlockPatentInventorRow>

            <BlockPatentInventorLiteAdd
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
               :key="inventor.InventorID"
               v-model:contribution="inventor.Contribution"
               class="h-[88px]"
               :name="inventor.inventor.contactInfo.Name"
               :job="inventor.inventor.contactInfo.Role || ''"
               :belong="{
                  college: inventor.inventor.department.college.Name,
                  department: inventor.inventor.department.Name
               }"
               :max="100 - totalContribution + (inventor.Contribution || 0)"
               :contribution-input="true"
               :compact="true"
            >
               <template #actions>
                  <div class="ps-6 h-full flex items-center">
                     <CustomIconButton
                        name="material-symbols:close-rounded"
                        @click="deleteInventor(inventor.InventorID)"
                     />
                  </div>
               </template>
            </BlockPatentInventorRow>

            <BlockPatentInventorLiteAdd
               :choose-text="'新增其他共同發明人'"
               @select="addInventor($event, false)"
            />
         </div>
      </div>
   </div>
</template>
<script lang="ts" setup>
interface College {
   Name: string
}

interface Department {
   Name: string
   college: College
}

interface ContactInfo {
   Name: string
   Role: string | null
}

interface Inventor {
   InventorID: number
   department: Department
   contactInfo: ContactInfo
}

interface PatentInventor {
   InventorID: number
   Contribution: number
   Main: boolean
   inventor: Inventor
}

const inventors = defineModel<PatentInventor[]>({ required: false, default: [] });

const totalContribution = computed(() =>
   inventors.value.reduce((acc, i) => acc + (i.Contribution || 0), 0),
);

const mainInventor = computed(() =>
   inventors.value.find((i) => i.Main),
);

const otherInventors = computed(() =>
   inventors.value.filter((i) => !i.Main),
);

const addInventor = (newInventor: Inventor, isMain: boolean) => {
   if (isMain) {
      const currentMain = inventors.value.find((i) => i.Main);
      if (currentMain) currentMain.Main = false;
   }

   const existing = inventors.value.find((i) => i.InventorID === newInventor.InventorID);
   if (existing) {
      existing.Main = isMain;
      return;
   }

   inventors.value.push({
      InventorID: newInventor.InventorID,
      Contribution: 0,
      Main: isMain,
      inventor: newInventor,
   });
};

const deleteInventor = (id: number) => {
   const index = inventors.value.findIndex((i) => i.InventorID === id);
   if (index !== -1) inventors.value.splice(index, 1);
};
</script>
