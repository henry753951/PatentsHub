<template>
   <Dialog v-model:open="isOpen">
      <DialogContent class="max-w-[80vw] gap-1 max-h-[70vh] flex flex-col overflow-hidden min-h-0">
         <DialogHeader>
            <DialogTitle
               class="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent"
            >
               查看匯出紀錄
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
                        />
                     </div>
                     <div class="w-full">
                        <CustomContentBlockRow
                           v-model="dataExported.description"
                           title="匯出說明"
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
                  class="flex-1 flex p-0"
               >
                  <BlockPatentFundingExportFile
                     v-if="activeTab === 'export'"
                     :funding-service="fundingService"
                     :data-exported="dataExported"
                  />
               </TabPanel>
            </TabPanels>
         </Tabs>

         <DialogFooter class="mt-auto">
            <div class="flex justify-end">
               <Button
                  variant="destructive"
                  class="mr-2"
                  @click="
                     () => {
                        fundingService.exports.actions.deleteExport(exportId);
                        isOpen = false;
                     }
                  "
               >
                  移除此匯出
               </Button>
               <Button
                  variant="secondary"
                  class="mr-2"
                  @click="isOpen = false"
               >
                  關閉
               </Button>
            </div>
         </DialogFooter>
      </DialogContent>
   </Dialog>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, defineModel, defineProps } from "vue";
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
         .value!.fundingUnitAccounting.find((fua) =>
         fua.unitContributions.find(
            (uc) => uc.unitId === unit.fundingUnit.FundingUnitID,
         ),
      )
         ?.unitContributions.reduce((sum, uc) => sum + uc.amount, 0);
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
</script>

<style scoped>
* {
   --p-tabs-tab-padding: 0.2rem 1rem;
}
</style>
