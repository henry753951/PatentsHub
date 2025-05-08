<template>
   <div class="p-4 overflow-hidden h-full">
      <Card
         v-if="true"
         class="h-full overflow-y-scroll"
      >
         <template #title>
            <span>專利總覽 (點擊行以查看詳細資訊)</span>
         </template>
         <template #header>
            <div
               dir="rtl"
               style="text-align: left"
               class="flex mt-4 ml-4 relative"
            >
               <div class="text-black pb-4 mt-2 mr-4 left-12">
                  <Button
                     icon="pi pi-external-link"
                     label="匯出CSV"
                     @click="exportCSV"
                  />
               </div>
               <div class="text-black pb-4 mr-4 mt-2">
                  <Button
                     icon="pi pi-external-link"
                     label="匯出部分CSV"
                     @click="exportCSVpartition"
                  />
               </div>
               <MultiSelect
                  :model-value="selectedColumns"
                  :options="columns"
                  option-label="header"
                  display="chip"
                  placeholder="選擇欄位"
                  :max-selected-labels="8"
                  class="absolute left-4"
                  @update:model-value="onToggle"
               />
            </div>
         </template>
         <template #content>
            <DataTable
               ref="dt"
               v-model:filters="filters"
               paginator
               :value="transformedData"
               filter-display="row"
               class="w-full datatable-small"
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
                  :class="'max-w-[300px] truncate text-ellipsis whitespace-nowrap overflow-hidden'"
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
                        <img
                           :src="`https://flagsapi.com/${slotProps.data.country?.CountryName.toUpperCase()}/flat/64.png`"
                        />
                     </div>
                     <div
                        v-else
                        class="flex items-center"
                     >
                        {{ slotProps.data.country?.CountryName || "N/A" }}
                     </div>
                  </template>
                  <!-- 自訂 MaintenanceInfo 欄位 -->
                  <template
                     v-else-if="col.field === 'MaintenanceInfo'"
                     #body="slotProps"
                  >
                     <div
                        class="flex flex-col"
                        style="white-space: pre-wrap"
                     >
                        <span
                           class="text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
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
                  <!-- 自訂 internal.InitialReviewAgencies 欄位 -->
                  <template
                     v-else-if="col.field === 'internal.InitialReviewAgencies'"
                     #body="slotProps"
                  >
                     <div>
                        <FormPatentAgencyList
                           v-model="
                              slotProps.data.internal.InitialReviewAgencies
                           "
                           :is-taker-agency-unit="false"
                        />
                     </div>
                  </template>
                  <!-- 自訂 internal.TakerAgencies 欄位 -->
                  <template
                     v-else-if="col.field === 'internal.TakerAgencies'"
                     #body="slotProps"
                  >
                     <div>
                        <FormPatentAgencyList
                           v-model="slotProps.data.internal.TakerAgencies"
                           :is-taker-agency-unit="true"
                        />
                     </div>
                  </template>
                  <!-- 其他欄位的內容 -->
                  <template
                     v-else
                     #body="slotProps"
                  >
                     <span
                        :title="
                           formatValue(
                              getNestedValue(slotProps.data, col.field),
                           )
                        "
                     >{{
                        formatValue(
                           getNestedValue(slotProps.data, col.field),
                        )
                     }}</span>
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
                  <template #filterapply="slotProps">
                  </template>
               </Column>
            </DataTable>
         </template>
      </Card>
      <div v-else>
         此頁面正在修復中，有點問題先禁用，請見諒。 😅😅
      </div>
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
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

const agenciesStore = useAgenciesStore();
const { agencies: agenciesInStore } = storeToRefs(agenciesStore);

const getPersonsByIds = (ids: number[]) => {
   // 找到所有符合 id 的聯絡人
   return agenciesInStore.value
      .flatMap((a) => a.Persons)
      .filter((p) => ids.includes(p.ContactInfoID));
};

const { open } = useModals();
definePageMeta({
   name: "search",
});

const onRowClick = (event) => {
   const patentId = event.data.PatentID; // 獲取行的 PatentID
   open("PatentModal", { props: { patentId } }); // 打開對應的模態框
};

const filters = ref({
   "global": { value: null, matchMode: FilterMatchMode.CONTAINS },
   "maintenances.manualStatus": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
   },
   "Year": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
   "internal.InternalID": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
   },
   "department.college.Name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
   },
   "department.Name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
   "inventors": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
   "DraftTitle": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
   "external.PatentNumber": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
   },
   "PublicationDateTaiwan": { value: null, matchMode: FilterMatchMode.DATE_IS },
   "MaintenanceInfo": { value: null, matchMode: FilterMatchMode.CONTAINS },
   "external.PublicationDate": {
      value: null,
      matchMode: FilterMatchMode.DATE_IS,
   },
   "application.ApplicationNumber": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
   },
   "PatentType": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
   "country.CountryName": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
   },
   "internal.InitialReviewAgencies": {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
   },
   "internal.TakerAgencies": {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
   },
   //
   "application.RDResultNumber": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
   },
   "application.NSCNumber": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
   },
   "external.IPCNumber": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
   },
   "external.PatentScope": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
   },
   "technical.MaturityLevel": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
   },
   "internal.InitialReviewDate": {
      value: null,
      matchMode: FilterMatchMode.DATE_IS,
   },
   "technical.keywords": { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const transformedData = computed(() => {
   return data.value
      ? data.value.map((item) => {
         const maintenances = Array.isArray(item.maintenances)
            ? item.maintenances
            : [];

         const latestMaintenance = maintenances.length
            ? [...maintenances].sort((a, b) => {
               return (
                  new Date(b.MaintenanceDate).getTime()
                    - new Date(a.MaintenanceDate).getTime()
               );
            })[0]
            : null;

         const maintenancePeriod = latestMaintenance
            ? `${new Date(
               latestMaintenance.MaintenanceDate,
            ).toLocaleDateString("zh-TW", {
               year: "numeric",
               month: "2-digit",
               day: "2-digit",
            })} - ${new Date(
               latestMaintenance.ExpireDate,
            ).toLocaleDateString("zh-TW", {
               year: "numeric",
               month: "2-digit",
               day: "2-digit",
            })}`
            : "N/A";

         const maintenanceYear = latestMaintenance
            ? new Date(latestMaintenance.MaintenanceDate)
               .getFullYear()
               .toString()
            : "N/A";

         const maintenanceInfo = latestMaintenance
            ? `年度: ${maintenanceYear}\n期程: ${maintenancePeriod}`
            : "N/A";

         // 格式化 internal.InitialReviewDate
         const initialReviewDate = item.internal?.InitialReviewDate
            ? new Date(item.internal.InitialReviewDate)
            : null;
         const formattedInitialReviewDate = initialReviewDate
            ? `${initialReviewDate.getFullYear()}年${initialReviewDate.getMonth() + 1}月${initialReviewDate.getDate()}日 ${initialReviewDate.toLocaleDateString("zh-TW", { weekday: "long" })}`
            : "N/A";
         // 事務所資料攤平
         const initialAgency = item.internal?.InitialReviewAgencies?.[0];
         const takerAgency = item.internal?.TakerAgencies?.[0];
         const takerContacts = takerAgency
            ? getPersonsByIds(
               Array.isArray(takerAgency.agencyUnitPersonIds)
                  ? takerAgency.agencyUnitPersonIds.map((id) => Number(id))
                  : [],
            )
            : [];
         const takerContactsStr = takerContacts
            .map((p) =>
               [
                  `姓名: ${p.contactInfo?.Name ?? "無資料"}`,
                  `電話: ${p.contactInfo?.PhoneNumber ?? "無資料"}`,
                  `email: ${p.contactInfo?.Email ?? "無資料"}`,
                  `職位: ${p.contactInfo?.Role ?? "無資料"}`,
                  `備註: ${p.contactInfo?.Note ?? "無資料"}`,
               ].join("\n"),
            )
            .join("\n---\n");
         return {
            ...item,
            inventors:
                 item.inventors?.find((i) => i.Main)?.inventor?.contactInfo
                    ?.Name || "無資料",
            MaintenanceInfo: maintenanceInfo, // 合併的維護資訊欄位
            internal: {
               ...item.internal,
               InitialReviewDate: formattedInitialReviewDate, // 格式化後的日期
            },
            // 事務所攤平欄位
            __InitialAgencyName: initialAgency?.agencyUnit?.Name || "",
            __InitialAgencyContactIds:
                 initialAgency?.agencyUnitPersonIds?.join(",") || "",
            __TakerAgencyName: takerAgency?.agencyUnit?.Name || "",
            __TakerAgencyContactIds:
                 takerAgency?.agencyUnitPersonIds?.join(",") || "",
            __TakerAgencyFileCode: takerAgency?.FileCode || "",
            __TakerAgencyContacts: takerContactsStr,
         };
      })
      : [];
});

const { data, forceRefresh, filter } = useDatabasePatents();

const columns = ref([
   { field: "maintenances.manualStatus", header: "狀態" },
   { field: "Year", header: "年度" },
   { field: "internal.InternalID", header: "校內編號" },
   { field: "department.college.Name", header: "學院" },
   { field: "department.Name", header: "系所" },
   { field: "inventors", header: "發明人" },
   // { field: "coInventors", header: "共同發明人" }, // 需處理共同發明人邏輯
   { field: "DraftTitle", header: "發明名稱" },
   { field: "external.PatentNumber", header: "專利號碼" },
   // { field: "PatentPeriod", header: "專利權期間" }, // 需處理專利權期間邏輯
   { field: "PublicationDateTaiwan", header: "公告/獲證日期" }, // 轉成民國
   // { field: "MaintenanceYearCount", header: "維護年度計" }, // 需處理維護年度計邏輯 好像預設是3
   // { field: "CertificateYear", header: "領證年度" }, // 需處理領證年度邏輯
   // { field: "ExpireMonth", header: "到期月份" }, // 需處理到期月份邏輯  這個好像可刪除
   { field: "MaintenanceInfo", header: "維護期程" },
   { field: "external.PublicationDate", header: "公告/獲證時間（西元）" },
   { field: "application.ApplicationNumber", header: "申請案號" },
   { field: "PatentType", header: "專利類別" },
   { field: "country.CountryName", header: "專利國家" },
   // { field: "Plan", header: "方案" }, // 需處理方案邏輯 尚未有相關的資料結構  !!!但須保留
   // { field: "FundingAgency", header: "資助單位" }, // 需處理資助單位邏輯  尚未有相關的資料結構  !!!但須保留
   // { field: "application.NSCNumber", header: "計畫編號" }, 找不到資料庫相關屬性
   { field: "internal.InitialReviewAgencies", header: "初評事務所相關資訊" },
   { field: "internal.TakerAgencies", header: "承辦事務所相關資訊" },
   { field: "application.RDResultNumber", header: "研發成果編號（STRIKE）" },
   { field: "application.NSCNumber", header: "國科會編號（STRIKE）" },
   { field: "external.IPCNumber", header: "國際專利分類號IPC" },
   { field: "external.PatentScope", header: "專利範圍" },
   { field: "technical.MaturityLevel", header: "技術成熟度TRL" },
   { field: "internal.InitialReviewDate", header: "技推委員會審理日期" },
   { field: "technical.keywords", header: "技術關鍵字" },
   // 感覺要刪除，未在資料庫的屬性中找到 { field: "external.PatentScope", header: "申請專利範圍" },
]);

const exportColumns = [
   ...columns.value.filter(
      (col) =>
         col.field !== "internal.InitialReviewAgencies"
         && col.field !== "internal.TakerAgencies",
   ),
   { field: "__InitialAgencyName", header: "初評事務所" },
   { field: "__TakerAgencyName", header: "承辦事務所" },
   { field: "__TakerAgencyContacts", header: "承辦事務所聯絡人" },
   { field: "__TakerAgencyFileCode", header: "事務所檔號" },
];

const selectedColumns = ref(columns.value);

function formatValue(value: any, defaultValue: string = "N/A"): string {
   if (value === null || value === undefined || value === "") {
      return defaultValue;
   }
   if (Array.isArray(value) && value.length === 0) {
      return defaultValue; // 處理空陣列
   }
   return value;
}

function getNestedValue<T>(
   obj: T,
   path: string,
   defaultValue: string = "N/A",
): string {
   return (
      path.split(".").reduce((acc: any, key: string) => {
         return acc && acc[key] !== undefined ? acc[key] : undefined;
      }, obj) || defaultValue
   );
}

const onToggle = (val: { field: string, header: string }[]) => {
   selectedColumns.value = val;
};

const dt = ref();
const exportCSV = () => {
   // 暫時儲存目前的 selectedColumns
   const originalSelectedColumns = selectedColumns.value;

   // 將 selectedColumns 設為所有欄位
   selectedColumns.value = exportColumns;

   // 匯出 CSV
   dt.value.exportCSV();

   // 恢復原本的 selectedColumns
   selectedColumns.value = originalSelectedColumns;
};
const exportCSVpartition = () => {
   // 匯出部分
   dt.value.exportCSV();
};
</script>

<style scoped></style>
