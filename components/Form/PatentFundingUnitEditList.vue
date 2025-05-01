<template>
   <div class="flex flex-col gap-2">
      <div
         v-if="fundingUnits.length"
         class="space-y-2 rounded-lg dark:bg-zinc-900 bg-card overflow-hidden border"
      >
         <Accordion
            type="single"
            collapsible
         >
            <AccordionItem
               v-for="(unit, index) in fundingUnits"
               :key="unit.FundingUnitID"
               :value="index.toString()"
            >
               <AccordionTrigger class="px-4 py-3 hover:bg-muted/50 border-b border-gray-100 dark:border-zinc-700">
                  <div class="flex items-center justify-between w-full">
                     <div class="flex items-center gap-3 w-full group">
                        <Icon
                           name="ic:sharp-business"
                           class="h-5 w-5 text-muted-foreground"
                        />
                        <span class="font-medium text-foreground">{{ unit.fundingUnit.Name }}</span>
                        <CustomIconButton
                           class="ml-auto mr-2 hidden group-hover:block"
                           name="ic:sharp-remove"
                           @click.stop="deleteFundingUnit(unit.FundingUnitID)"
                        />
                     </div>
                  </div>
               </AccordionTrigger>
               <AccordionContent class="px-4 pt-2 pb-4">
                  <div class="space-y-4">
                     <CustomContentBlockRow
                        v-model="unit.ProjectCode"
                        title="專案編號"
                        icon="tabler:hash"
                     />
                  </div>
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </div>
      <div
         class="flex justify-center items-center py-3 cursor-pointer"
         :class="{
            group: !fundingUnits.length,
         }"
         @click="openFundingUnitModal()"
      >
         <span
            class="group-hover:block flex items-center gap-1"
            :class="{
               hidden: !fundingUnits.length,
            }"
         >
            <Icon name="ic:round-plus" />新增資助單位
         </span>
         <span
            class="group-hover:hidden"
            :class="{
               hidden: fundingUnits.length,
            }"
         >
            無資助單位
         </span>
      </div>
   </div>
</template>

<script lang="ts" setup>
const fundingUnits = defineModel({
   type: Array as PropType<PatentFundingUnit[]>,
   required: true,
});
const { patentID } = defineProps<{
   patentID?: number
}>();

const { open } = useModals();
const openFundingUnitModal = () => {
   open("FundingUnitModal", {
      props: {
         selectedFundingUnitCallback: (fundingUnit: {
            FundingUnitID: number
            Name: string
         }) => {
            fundingUnits.value.push({
               PatentID: patentID ?? -1,
               FundingUnitID: fundingUnit.FundingUnitID,
               ProjectCode: "",
               fundingUnit,
            });
         },
      },
   });
};

const deleteFundingUnit = (id: number) => {
   const index = fundingUnits.value.findIndex(
      (unit) => unit.FundingUnitID === id,
   );
   if (index !== -1) {
      fundingUnits.value.splice(index, 1);
   }
};
</script>

<style scoped></style>
