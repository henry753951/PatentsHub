<template>
   <div class="grid grid-cols-4 gap-3">
      <div class="col-span-2">
         <div class="flex flex-col gap-2 h-full">
            <p class="text-gray-600 text-lg font-bold">
               項目
            </p>
            <div
               class="w-full border border-gray-300 dark:border-zinc-800 rounded-lg overflow-hidden flex-1"
            >
               <ScrollArea class="p-3 h-[300px]">
                  <DataTable
                     :value="dataExported?.records"
                     data-key="FundingRecordID"
                     class="p-datatable-sm"
                     :empty-message="'尚無帳目記錄'"
                     row-hover
                     :row-class="(data) => 'cursor-pointer'"
                     @row-click="(e) => openEditRecordModal(e.data)"
                  >
                     <Column
                        field="Name"
                        header="名稱"
                     >
                        <template #body="{ data }">
                           <span
                              class="font-medium text-gray-900 dark:text-white"
                           >
                              {{ data.Name }}
                           </span>
                        </template>
                     </Column>
                     <Column
                        field="Amount"
                        header="帳單"
                     >
                        <template #body="{ data }">
                           <span
                              class="text-lg font-semibold text-gray-900 dark:text-white"
                           >
                              $ {{ formatNumber(data.Amount) }}
                           </span>
                        </template>
                     </Column>
                     <Column
                        field="Date"
                        header="日期"
                     >
                        <template #body="{ data }">
                           <span
                              class="text-sm text-gray-500 dark:text-gray-400"
                           >
                              {{ formatDate(data.Date) }}
                           </span>
                        </template>
                     </Column>
                  </DataTable>
               </ScrollArea>
            </div>
         </div>
      </div>

      <div class="col-span-2">
         <div
            v-if="meterGroup"
            class="p-4 flex flex-col gap-4"
         >
            <div class="grid grid-cols-2 gap-4">
               <CustomContentBlockRow
                  :model-value="`$ ${formatNumber(unitTotal)}`"
                  title="資助單位"
                  disabled
               />
               <CustomContentBlockRow
                  :model-value="`$ ${formatNumber(total - unitTotal)}`"
                  title="校內分配"
                  disabled
               />
            </div>
            <div class="space-y-2">
               <div class="text-lg font-semibold text-gray-800">
                  資助單位
               </div>
               <MeterGroup :value="meterGroup.units">
                  <template #label="{ value }">
                     <div class="flex flex-col gap-1">
                        <template
                           v-for="val of value"
                           :key="val.label"
                        >
                           <div class="flex items-center gap-2">
                              <div
                                 :style="{ backgroundColor: val.color }"
                                 class="w-4 h-4 rounded-full"
                              ></div>
                              <span class="text-sm text-gray-700">
                                 {{ val.label }}
                              </span>
                              <div class="ml-auto">
                                 <span class="text-sm text-gray-700">
                                    {{ formatNumber(val.amount) }} 元
                                 </span>
                                 <span class="text-sm text-gray-500">
                                    ({{ val.value }}%)
                                 </span>
                              </div>
                           </div>
                        </template>
                     </div>
                  </template>
               </MeterGroup>
            </div>
            <div class="space-y-2">
               <div class="text-lg font-semibold text-gray-800">
                  校內分配
               </div>
               <MeterGroup :value="meterGroup.internal">
                  <template #label="{ value }">
                     <div class="flex flex-col gap-1">
                        <template
                           v-for="val of value"
                           :key="val.label"
                        >
                           <div class="flex items-center gap-2">
                              <div
                                 :style="{ backgroundColor: val.color }"
                                 class="w-4 h-4 rounded-full"
                              ></div>
                              <span class="text-sm text-gray-700">
                                 {{ val.label }}
                              </span>
                              <div class="ml-auto">
                                 <span class="text-sm text-gray-700">
                                    {{ formatNumber(val.amount) }} 元
                                 </span>
                                 <span class="text-sm text-gray-500">
                                    ({{ val.value }}%)
                                 </span>
                              </div>
                           </div>
                        </template>
                     </div>
                  </template>
               </MeterGroup>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import MeterGroup from "primevue/metergroup";
import { ScrollArea } from "@/components/ui/scroll-area";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
const props = defineProps<{
   dataExported: {
      name: string
      description: string | null
      records: PatentFundingRecord[]
      fundingUnitAccounting: FundingUnitAccounting[]
      internalAccounting: InternalAccountingAdjustment[]
      date: Date
   } | null
   fundingService: UsePatentFundings
}>();
const fundingService = props.fundingService;
const dataExported = toRef(() => props.dataExported);
const { patentData: patent } = toRefs(fundingService);

// Modals
const { open } = useModals();
const openEditRecordModal = (record: PatentFundingRecord) => {
   open("PatentFundingRecordModal", {
      props: {
         fundingService: fundingService,
         recordID: record.FundingRecordID,
      },
   });
};

const unitContribution = computed(() => {
   if (!dataExported.value || !patent.value) return [];
   const fundingUnits = patent.value.funding?.fundingUnits || [];
   return fundingUnits.map((unit) => {
      const totalContribution = dataExported
         .value!.fundingUnitAccounting.filter((fua) =>
         fua.unitContributions.some(
            (uc) => uc.unitId === unit.fundingUnit.FundingUnitID,
         ),
      )
         .reduce((sum, fua) => {
            return (
               sum
               + fua.unitContributions
                  .filter((uc) => uc.unitId === unit.fundingUnit.FundingUnitID)
                  .reduce((subSum, uc) => subSum + uc.amount, 0)
            );
         }, 0);

      return {
         name: unit.fundingUnit.Name,
         amount: totalContribution || 0,
      };
   });
});
const total = computed(() => {
   if (!dataExported.value) return 0;
   return dataExported.value.records.reduce(
      (sum, item) => sum + item.Amount,
      0,
   );
});
const unitTotal = computed(() => {
   if (!unitContribution.value) return 0;
   return unitContribution.value.reduce((sum, item) => sum + item.amount, 0);
});

const meterGroupData = computed(() => {
   if (!dataExported.value) return null;

   const units = unitContribution.value.map((item) => ({
      name: item.name,
      amount: item.amount,
      percent: Math.round((item.amount / unitTotal.value) * 100),
   }));

   const remainingForInternal = total.value - unitTotal.value;

   const internal = dataExported.value.internalAccounting.map((item) => ({
      name: item.targetName,
      amount: item.amount,
      percent: Math.round((item.amount / remainingForInternal) * 100),
   }));

   return {
      units,
      internal,
   };
});
const meterGroup = computed(() => {
   if (!meterGroupData.value) return null;
   return {
      internal: meterGroupData.value.internal.map((item) => ({
         label: item.name,
         color: useStringToColor(item.name).value,
         value: item.percent,
         amount: item.amount,
      })),
      units: meterGroupData.value.units.map((item) => ({
         label: item.name,
         color: useStringToColor(item.name).value,
         value: item.percent,
         amount: item.amount,
      })),
   };
});
</script>

<style scoped></style>
