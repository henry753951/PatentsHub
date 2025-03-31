<template>
   <div class="m-4 max-w-[1320px]">
      <Card>
         <template #title>
            <span>專利總覽 (點擊行以查看詳細資訊)</span>
         </template>
         <template #header>
            <div
               style="text-align:left"
               class="flex justify-between mt-4 ml-4"
            >
               <MultiSelect
                  :model-value="selectedColumns"
                  :options="columns"
                  option-label="header"
                  display="chip"
                  placeholder="選擇欄位"
                  @update:model-value="onToggle"
               />
               <div class="text-black  pb-4 mr-8">
                  <Button
                     icon="pi pi-external-link"
                     label="Export"
                     @click="exportCSV"
                  />
               </div>
            </div>
         </template>
         <template #content>
            <DataTable
               ref="dt"
               v-model:filters="filters"
               :value="transformedData"
               filter-display="row"
               class="w-full datatable-small"
               paginator
               show-gridlines
               :rows="10"
               resizable-columns
               column-resize-mode="fit"
               @row-click="onRowClick"
            >
               <Column
                  v-for="col in selectedColumns"
                  :key="col.field"
                  :field="col.field"
                  :header="col.header"
                  filter
                  :filter-placeholder="'搜尋' + col.header"
                  sortable
               >
                  <!-- 自訂 country.CountryName 欄位 -->
                  <template
                     v-if="col.field === 'country.CountryName'"
                     #body="slotProps"
                  >
                     <div
                        v-if="slotProps.data.country?.CountryName"
                        class=""
                     >
                        <img :src="`https://flagsapi.com/${ slotProps.data.country?.CountryName.toUpperCase()}/flat/64.png`" />
                     </div>
                     <div
                        v-else
                        class="flex items-center"
                     >
                        {{ slotProps.data.country?.CountryName || 'N/A' }}
                     </div>
                  </template>
                  <!-- 自訂 MaintenanceInfo 欄位 -->
                  <template
                     v-else-if="col.field === 'MaintenanceInfo'"
                     #body="slotProps"
                  >
                     <div
                        class="flex flex-col"
                        style="white-space: pre-wrap;"
                     >
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
                           {{ slotProps.data.MaintenanceInfo }}
                        </span>
                        <span
                           v-if="slotProps.data.MaintenanceInfo !== 'N/A'"
                           class="text-xs text-gray-500 dark:text-gray-400"
                        >
                           (維護資訊)
                        </span>
                     </div>
                  </template>
                  <!-- 其他欄位的內容 -->
                  <template
                     v-else
                     #body="slotProps"
                  >
                     {{ getNestedValue(slotProps.data, col.field) }}
                  </template>

                  <!-- 篩選器 -->
                  <template #filter="{ filterModel, filterCallback }">
                     <InputText
                        v-model="filterModel.value"
                        type="text"
                        :placeholder="'搜尋' + col.header"
                        @input="filterCallback()"
                     />
                  </template>
               </Column>
            </DataTable>
         </template>
      </Card>
   </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import "primeicons/primeicons.css";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import MultiSelect from "primevue/multiselect";
import { FilterMatchMode } from "@primevue/core/api";

const onRowClick = (event) => {
   const patentId = event.data.PatentID; // 獲取行的 PatentID
   open("PatentModal", { props: { patentId } }); // 打開對應的模態框
};

const filters = ref({
   "global": { value: null, matchMode: FilterMatchMode.CONTAINS },
   "PatentID": { value: null, matchMode: FilterMatchMode.CONTAINS },
   "DraftTitle": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
   "department.Name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
   "department.college.Name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
   },
   "inventors": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
   "country.CountryName": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
   "Year": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
   "MaintenanceInfo": { value: null, matchMode: FilterMatchMode.CONTAINS }, // 合併的維護資訊篩選
});

const transformedData = computed(() => {
   return data.value
      ? data.value.map((item) => {
         const maintenances = Array.isArray(item.maintenances) ? item.maintenances : [];

         const latestMaintenance = maintenances.length
            ? [...maintenances].sort((a, b) => {
               return (
                  new Date(b.MaintenanceDate).getTime()
                    - new Date(a.MaintenanceDate).getTime()
               );
            })[0]
            : null;

         const maintenancePeriod = latestMaintenance
            ? `${new Date(latestMaintenance.MaintenanceDate).toLocaleDateString(
               "zh-TW",
               { year: "numeric", month: "2-digit", day: "2-digit" },
            )} - ${new Date(latestMaintenance.ExpireDate).toLocaleDateString(
               "zh-TW",
               { year: "numeric", month: "2-digit", day: "2-digit" },
            )}`
            : "N/A";

         const maintenanceYear = latestMaintenance
            ? new Date(latestMaintenance.MaintenanceDate).getFullYear().toString()
            : "N/A";

         const maintenanceInfo = latestMaintenance
            ? `年度: ${maintenanceYear}\n期程: ${maintenancePeriod}`
            : "N/A";

         return {
            ...item,
            inventors: item.inventors?.find((i) => i.Main)?.inventor?.contactInfo?.Name || "無資料",
            MaintenanceInfo: maintenanceInfo, // 合併的維護資訊欄位
         };
      })
      : [];
});

const { data, forceRefresh, fillter } = useDatabasePatents();

const columns = ref([
   { field: "PatentID", header: "專利編號" },
   { field: "DraftTitle", header: "專利名稱" },
   { field: "Year", header: "年份" },
   { field: "department.Name", header: "系所名稱" },
   { field: "department.college.Name", header: "學院名稱" },
   { field: "inventors", header: "發明人名稱" },
   { field: "country.CountryName", header: "國家" },
   { field: "MaintenanceInfo", header: "維護期程/年度" },
]);
const selectedColumns = ref(columns.value);

function getNestedValue<T>(obj: T, path: string, defaultValue: string = "N/A"): string {
   return path.split(".").reduce((acc: any, key: string) => {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
   }, obj) || defaultValue;
}

const onToggle = (val: { field: string, header: string }[]) => {
   selectedColumns.value = val;
};

const dt = ref();
const exportCSV = () => {
   dt.value.exportCSV();
};

const { open } = useModals();
definePageMeta({
   name: "search",
});
</script>

<style scoped></style>
