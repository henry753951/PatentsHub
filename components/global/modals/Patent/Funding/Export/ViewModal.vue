<template>
   <Dialog v-model:open="isOpen">
      <DialogContent
         class="max-w-[80vw] gap-1 max-h-[70vh] flex flex-col overflow-hidden min-h-0"
      >
         <DialogHeader>
            <DialogTitle
               class="text-xl font-bold text-gray-900 bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent flex items-center gap-4 pr-5"
            >
               <div>匯出紀錄</div>

               <CustomIconButton
                  secondary
                  name="ic:round-delete"
                  @click="
                     fundingService.exports.actions.deleteExport(exportId);
                     isOpen = false;
                  "
               />
            </DialogTitle>
            <DialogDescription class="text-gray-600 text-lg">
               <div class="grid grid-cols-3 gap-4">
                  <div
                     v-if="dataExported"
                     class="col-span-2 flex items-center gap-3"
                  >
                     <div class="w-full">
                        <CustomContentBlockRow
                           v-model="dataExported.name"
                           title="匯出名稱"
                           @update:model-value="handleAutoSave"
                        />
                     </div>
                     <div class="w-full">
                        <CustomContentBlockRow
                           v-model="dataExported.description"
                           title="匯出說明"
                           @update:model-value="handleAutoSave"
                        />
                     </div>
                  </div>
                  <div class="col-span-1 flex gap-2">
                     <CustomContentBlockRow
                        :model-value="formatTaiwanDate(dataExported?.date)"
                        disabled
                        title="匯出日期"
                     />
                     <CustomContentBlockRow
                        :model-value="`$ ${formatNumber(total)}`"
                        disabled
                        title="總金額"
                     />
                  </div>
               </div>
            </DialogDescription>
         </DialogHeader>
         <Divider />
         <Tabs
            v-model:value="activeTab"
            class="w-full flex-1 h-full overflow-auto"
         >
            <TabList>
               <Tab value="view">
                  詳細資料
               </Tab>
               <Tab value="export">
                  匯出
               </Tab>
            </TabList>
            <TabPanels class="flex-1 flex flex-col">
               <TabPanel value="view">
                  <BlockPatentFundingExportView
                     v-if="activeTab === 'view'"
                     :data-exported="dataExported"
                     :funding-service="fundingService"
                  />
               </TabPanel>
               <TabPanel
                  value="export"
                  class="flex-1 flex p-0 min-h-[370px]"
               >
                  <BlockPatentFundingExportFile
                     v-if="activeTab === 'export'"
                     :funding-service="fundingService"
                     :data-exported="dataExported"
                  />
               </TabPanel>
            </TabPanels>
         </Tabs>
      </DialogContent>
   </Dialog>
</template>
<script lang="ts" setup>
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogFooter,
} from "@/components/ui/dialog";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import { ScrollArea } from "@/components/ui/scroll-area";
import Divider from "primevue/divider";
// Props 和 Model
const isOpen = defineModel("open", { type: Boolean, default: false });
const { fundingService, exportId } = defineProps<{
   fundingService: UsePatentFundings
   exportId: number
}>();
const activeTab = ref("view");

const { fundingData, patentData } = toRefs(fundingService);

// Reactive Data
const dataExported = ref<{
   name: string
   description: string | null
   records: PatentFundingRecord[]
   fundingUnitAccounting: FundingUnitAccounting[]
   internalAccounting: InternalAccountingAdjustment[]
   date: Date
} | null>(null);
const fundingPlan = ref<FundingPlan | null>(null);
const patent = ref<RouterOutput["data"]["patent"]["getPatent"]>(null);

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

// 加載資料
onMounted(() => {
   dataExported.value = fundingService.exports.actions.getExport(exportId);
   fundingPlan.value = fundingData.value?.plan || null;
   patent.value = patentData.value;
});

const handleAutoSave = async () => {
   if (!dataExported.value) return;

   await fundingService.exports.actions.updateExport({
      ExportID: exportId,
      name: dataExported.value.name,
      description: dataExported.value.description,
   });
};

</script>

<style scoped>
* {
   --p-tabs-tab-padding: 0.2rem 1rem;
}
</style>
