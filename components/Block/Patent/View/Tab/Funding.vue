<template>
   <div
      v-if="patent"
      class="grid grid-cols-3 gap-5 relative"
   >
      <!-- 帳目列表 (佔 2/3) -->
      <div class="col-span-2 space-y-5">
         <div
            class="border-gray-200 dark:border-gray-700 flex justify-between items-center"
         >
            <div>
               <h2 class="text-2xl font-bold tracking-tight">
                  帳目列表
               </h2>
               <p class="text-muted-foreground">
                  管理專利的帳目記錄
               </p>
            </div>
            <div class="flex gap-2">
               <Button
                  variant="outline"
                  size="sm"
                  @click="openNewRecordModal"
               >
                  <Icon
                     name="ic:round-add"
                     class="h-4 w-4 mr-1"
                  />
                  新增帳目
               </Button>
               <Button
                  size="sm"
                  @click="openExportModal"
               >
                  <Icon
                     name="ic:round-exit-to-app"
                     class="h-4 w-4 mr-1"
                  />
                  {{
                     selectedRecords.filter(
                        (record) => record.ExportID === null,
                     ).length
                        ? "匯出已選取未匯出的項目"
                        : "匯出所有未匯出的項目"
                  }}
               </Button>
               <Button
                  v-if="selectedRecords.length"
                  size="sm"
                  variant="destructive"
                  @click="deleteSelectedRecords"
               >
                  <Icon
                     name="ic:round-delete"
                     class="h-4 w-4 mr-1"
                  />
                  清除選擇
               </Button>
            </div>
         </div>
         <div
            class="rounded-lg border border-gray-200 dark:border-gray-700 p-1"
         >
            <DataTable
               v-model:selection="selectedRecords"
               :value="[...records.unexported, ...records.exported]"
               data-key="FundingRecordID"
               class="p-datatable-sm"
               :row-class="rowClass"
               :empty-message="'尚無帳目記錄'"
            >
               <template #empty>
                  <div
                     class="flex flex-col items-center justify-center py-8 text-center"
                  >
                     <Icon
                        name="ic:file-clock"
                        class="h-12 w-12 text-gray-400 mb-3"
                     />
                     <p class="text-gray-500 dark:text-gray-400">
                        尚無帳目記錄
                     </p>
                     <Button
                        variant="ghost"
                        size="sm"
                        class="mt-2"
                        @click="openNewRecordModal"
                     >
                        新增第一筆記錄
                     </Button>
                  </div>
               </template>
               <Column
                  selection-mode="multiple"
                  header-style="width: 3rem"
               >
               </Column>
               <Column
                  field="Name"
                  header="名稱"
               >
                  <template #body="{ data }">
                     <span
                        class="font-medium text-gray-900 dark:text-white cursor-pointer"
                        @click="openEditRecordModal(data)"
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
                     <span class="text-sm text-gray-500 dark:text-gray-400">
                        {{ formatDate(data.Date) }}
                     </span>
                  </template>
               </Column>
               <Column
                  field="ExportID"
                  header="匯出狀態"
               >
                  <template #body="{ data }">
                     <Badge
                        :variant="
                           data.ExportID === null ? 'default' : 'secondary'
                        "
                     >
                        {{ data.ExportID === null ? "未匯出" : "已匯出" }}
                     </Badge>
                  </template>
               </Column>
            </DataTable>
         </div>
      </div>

      <!-- 匯出紀錄 (佔 1/3) -->
      <div class="col-span-1 space-y-4">
         <Tabs default-value="summary">
            <TabsList class="grid w-full grid-cols-2">
               <TabsTrigger value="summary">
                  統計資料
               </TabsTrigger>
               <TabsTrigger value="export">
                  導出紀錄
               </TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
               <Card>
                  <CardHeader class="p-4">
                     <CardTitle>統計資料</CardTitle>
                     <CardDescription> 帳目記錄的統計資料</CardDescription>
                  </CardHeader>
                  <CardContent class="space-y-1 px-4 pb-4">
                     <div class="grid grid-cols-2 gap-2">
                        <div class="col-span-2">
                           <p class="text-sm text-gray-500 dark:text-gray-400">
                              資助單位
                           </p>
                           <div class="flex gap-2 flex-wrap">
                              <template
                                 v-for="unit in fundingUnits"
                                 :key="unit.FundingUnitID"
                              >
                                 <CustomBadgeWithText
                                    :text="unit.fundingUnit.Name"
                                    size="sm"
                                 />
                              </template>
                           </div>
                        </div>
                        <div>
                           <p class="text-sm text-gray-500 dark:text-gray-400">
                              總金額
                           </p>
                           <p
                              class="text-lg font-semibold text-gray-900 dark:text-white"
                           >
                              $ {{ formatNumber(summaryData.totalAmount) }}
                           </p>
                        </div>
                        <div>
                           <p class="text-sm text-gray-500 dark:text-gray-400">
                              總記錄數
                           </p>
                           <p
                              class="text-lg font-semibold text-gray-900 dark:text-white"
                           >
                              {{ summaryData.totalRecords }}
                           </p>
                        </div>
                        <div>
                           <p class="text-sm text-gray-500 dark:text-gray-400">
                              未匯出金額
                           </p>
                           <p
                              class="text-lg font-semibold text-gray-900 dark:text-white"
                           >
                              $ {{ formatNumber(summaryData.unexportedAmount) }}
                           </p>
                        </div>
                        <div>
                           <p class="text-sm text-gray-500 dark:text-gray-400">
                              未匯出記錄數
                           </p>
                           <p
                              class="text-lg font-semibold text-gray-900 dark:text-white"
                           >
                              {{ summaryData.unexportedRecords }}
                           </p>
                        </div>
                        <div>
                           <p class="text-sm text-gray-500 dark:text-gray-400">
                              已匯出金額
                           </p>
                           <p
                              class="text-lg font-semibold text-gray-900 dark:text-white"
                           >
                              $ {{ formatNumber(summaryData.exportedAmount) }}
                           </p>
                        </div>
                        <div>
                           <p class="text-sm text-gray-500 dark:text-gray-400">
                              已匯出記錄數
                           </p>
                           <p
                              class="text-lg font-semibold text-gray-900 dark:text-white"
                           >
                              {{ summaryData.exportedRecords }}
                           </p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>
            <TabsContent value="export">
               <Card>
                  <CardHeader>
                     <CardTitle>導出紀錄</CardTitle>
                     <CardDescription> 帳目記錄的導出紀錄 </CardDescription>
                  </CardHeader>
                  <CardContent class="space-y-2">
                  </CardContent>
               </Card>
            </TabsContent>
         </Tabs>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import type { PatentFundingRecord } from "~/composables/database/patent/funding";
import DataTable from "primevue/datatable";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Column from "primevue/column";

const { open } = useModals();
const patent = defineModel<RouterOutput["data"]["patent"]["getPatent"]>({
   required: true,
});

const fundingsService = usePatentFundings({
   data: patent,
   refreshCallback: async () => {
      // 根據您的實際需求實現刷新邏輯
   },
});
const records = computed(() => ({
   exported: fundingsService.records.list.value.filter(
      (record) => record.ExportID !== null,
   ),
   unexported: fundingsService.records.list.value.filter(
      (record) => record.ExportID === null,
   ),
}));

// 日期與數字格式化
const formatNumber = (num: number) => num.toLocaleString("zh-TW");
const formatDate = (date: Date) => format(date, "PPP", { locale: zhTW });

// 統計資料
const fundingUnits = fundingsService.fundingUnits;
const summaryData = computed(() => {
   const totalAmount = records.value.unexported.reduce(
      (acc, record) => acc + record.Amount,
      0,
   );
   const totalRecords = records.value.unexported.length;
   const unexportedAmount = records.value.unexported.reduce(
      (acc, record) => acc + record.Amount,
      0,
   );
   const unexportedRecords = records.value.unexported.length;
   const exportedAmount = records.value.exported.reduce(
      (acc, record) => acc + record.Amount,
      0,
   );
   const exportedRecords = records.value.exported.length;
   return {
      totalAmount,
      totalRecords,
      unexportedAmount,
      unexportedRecords,
      exportedAmount,
      exportedRecords,
   };
});

// 選擇的記錄
const selectedRecords = ref<PatentFundingRecord[]>([]);
const deleteSelectedRecords = () => {
   const ids = selectedRecords.value.map((record) => record.FundingRecordID);
   fundingsService.records.actions.deleteFundingRecord(ids);
   selectedRecords.value = [];
};
// 根據匯出狀態設置行樣式
const rowClass = (data: PatentFundingRecord) => {
   return { "opacity-60": data.ExportID !== null };
};

const openNewRecordModal = () => {
   open("PatentFundingRecordModal", {
      props: {
         fundingService: fundingsService,
      },
   });
};

const openEditRecordModal = (record: PatentFundingRecord) => {
   open("PatentFundingRecordModal", {
      props: {
         fundingService: fundingsService,
         recordID: record.FundingRecordID,
      },
   });
};

const openExportModal = () => {
   open("PatentFundingExportModal", {
      props: {
         fundingService: fundingsService,
         selectedRecords: selectedRecords.value.filter(
            (record) => record.ExportID === null,
         ).length
            ? selectedRecords.value.filter((record) => record.ExportID === null)
            : records.value.unexported,
      },
   });
};
</script>
