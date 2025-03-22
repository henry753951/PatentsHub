<template>
   <div class="p-8 flex flex-col md:flex-row gap-6 relative">
      <!-- 左邊：時間線 (加入 OverlayScrollbars) -->
      <div class="w-full md:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
         <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            專利審查記錄
         </h2>
         <OverlayScrollbarsComponent
            class="timeline-container"
            :options="{
               scrollbars: {
                  autoHide: 'leave',
                  autoHideDelay: 700,
                  theme: 'os-theme-dark',
               },
               overflow: {
                  x: 'hidden',
                  y: 'scroll', // 強制顯示垂直滾動條
               },
            }"
            defer
         >
            <div class="pb-8">
               <!-- 添加底部間距，確保有足夠的滾動空間 -->
               <Timeline
                  :value="patentRecordsService.events.value"
                  class="timeline-custom"
               >
                  <template #marker="slotProps">
                     <span
                        class="flex h-6 w-6 items-center justify-center rounded-full"
                        :style="{
                           backgroundColor: slotProps.item.color + '20',
                        }"
                     >
                        <i
                           :class="slotProps.item.icon"
                           :style="{ color: slotProps.item.color }"
                           class="text-xs"
                        ></i>
                     </span>
                  </template>
                  <template #opposite="slotProps">
                     <div
                        class="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-md px-3 py-1 inline-block"
                     >
                        {{ slotProps.item.date }}
                     </div>
                  </template>
                  <template #content="slotProps">
                     <div
                        class="bg-white dark:bg-gray-800 border-l-4 border-l-gray-300 dark:border-l-gray-600 pl-3 hover:border-l-blue-500 transition-colors duration-200 mb-8"
                     >
                        <div
                           class="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0"
                        >
                           <p class="font-medium text-base text-gray-800 dark:text-gray-200">
                              {{ slotProps.item.status }}
                           </p>
                           <div class="flex gap-2">
                              <Button
                                 size="sm"
                                 variant="ghost"
                                 class="h-8 px-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                 @click="editRecord(slotProps.item.id)"
                              >
                                 <i class="pi pi-pencil text-xs mr-1"></i>
                                 編輯
                              </Button>
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 class="h-8 px-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                                 @click="
                                    patentRecordsService.actions.deleteRecord(
                                       slotProps.item.id,
                                    )
                                 "
                              >
                                 <i class="pi pi-trash text-xs mr-1"></i>
                                 刪除
                              </Button>
                           </div>
                        </div>
                     </div>
                  </template>
               </Timeline>
            </div>
         </OverlayScrollbarsComponent>
      </div>

      <!-- 右邊：表單 -->
      <div
         class="w-full md:w-1/3 flex flex-col justify-start gap-4 md:sticky md:top-24"
      >
         <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
               {{ newRecord.id ? "更新記錄" : "新增記錄" }}
            </h2>

            <div class="space-y-4">
               <FloatLabel
                  variant="in"
                  class="w-full"
               >
                  <DatePicker
                     v-model="newRecord.date"
                     show-icon
                     fluid
                     date-format="yy/mm/dd"
                     icon-display="input"
                     show-button-bar
                     input-id="review-date_input"
                     class="w-full"
                     :class="{
                        'border-rose-500': !newRecord.date && formSubmitted,
                        'dark:bg-gray-700 dark:text-white dark:border-gray-600': true
                     }"
                  />
                  <label
                     for="review-date_input"
                     class="text-gray-600 dark:text-gray-300"
                  >紀錄日期</label>
               </FloatLabel>

               <div>
                  <Textarea
                     v-model="newRecord.record"
                     placeholder="輸入新的紀錄，例如 '初審開始'"
                     class="w-full h-32 resize-none border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                     :class="{
                        'border-rose-500': !newRecord.record && formSubmitted,
                     }"
                  />
                  <p
                     v-if="!newRecord.record && formSubmitted"
                     class="text-rose-500 text-sm mt-1"
                  >
                     請輸入紀錄内容
                  </p>
               </div>

               <div class="flex gap-3 pt-2">
                  <Button
                     class="w-full flex items-center justify-center gap-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                     variant="default"
                     @click="submitForm"
                  >
                     <i class="pi pi-save"></i>
                     {{ newRecord.id ? "更新紀錄" : "提交紀錄" }}
                  </Button>
                  <Button
                     v-if="newRecord.id"
                     class="w-full flex items-center justify-center gap-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                     variant="outline"
                     @click="resetForm"
                  >
                     <i class="pi pi-times"></i>
                     取消
                  </Button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import Timeline from "primevue/timeline";
import { Textarea } from "@/components/ui/textarea";
import type { RouterOutput } from "~/server";
import DatePicker from "primevue/datepicker";
import FloatLabel from "primevue/floatlabel";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import { onMounted } from "vue";

const patent = defineModel({
   type: Object as PropType<RouterOutput["data"]["patent"]["getPatent"]>,
   required: true,
});

const { patentRecordsService } = defineProps<{
   patentRecordsService: ReturnType<typeof usePatentRecords>
}>();

const newRecord = ref<{
   id: number | undefined
   record: string
   date: Date | null
}>({
   id: undefined,
   record: "",
   date: null,
});

const formSubmitted = ref(false);

const submitForm = async () => {
   formSubmitted.value = true;

   if (!newRecord.value.record || !newRecord.value.date) {
      return;
   }

   await createOrUpdateRecord();
   formSubmitted.value = false;
};

const createOrUpdateRecord = async () => {
   await patentRecordsService.actions.upsertRecord({
      id: newRecord.value.id,
      record: newRecord.value.record,
      date: newRecord.value.date ?? new Date(),
   });
   resetForm();
};

const resetForm = () => {
   newRecord.value = { id: undefined, record: "", date: null };
   formSubmitted.value = false;
};

const editRecord = (id: number) => {
   const record = patentRecordsService.events.value.find((r) => r.id === id);
   if (!record) return;
   newRecord.value = {
      id: record.id,
      record: record.status,
      date: new Date(record.date),
   };
};
</script>

<style>
/* PrimeVue 組件在黑暗模式下的樣式 */
.dark .p-component {
  background-color: #1e293b;
  color: #f8fafc;
}

.dark .p-datepicker {
  background-color: #1e293b;
  color: #f8fafc;
  border-color: #475569;
}

.dark .p-datepicker-header {
  background-color: #334155;
  color: #f8fafc;
}

.dark .p-datepicker-calendar td > span {
  color: #f8fafc;
}

.dark .p-datepicker-calendar td.p-datepicker-today > span {
  background-color: #3B82F6;
  color: #ffffff;
}
</style>

<style scoped>
.timeline-container {
   height: 400px; /* 固定高度，確保有滾動效果 */
   min-height: 300px;
   position: relative; /* 確保滾動條位置正確 */
}

/* OverlayScrollbars 樣式 */
:deep(.os-theme-dark) {
   --os-handle-bg: rgba(255, 255, 255, 0.3) !important;
   --os-handle-bg-hover: rgba(255, 255, 255, 0.5) !important;
   --os-handle-bg-active: rgba(255, 255, 255, 0.7) !important;
   --os-size: 8px !important; /* 增加滾動條寬度 */
}

/* 確保滾動條顯示 */
:deep(.os-scrollbar) {
   opacity: 1 !important;
   visibility: visible !important;
}

:deep(.os-scrollbar-handle) {
   border-radius: 4px !important;
}

/* 亮色模式滾動條 */
.os-theme-light {
   --os-handle-bg: rgba(0, 0, 0, 0.2);
   --os-handle-bg-hover: rgba(0, 0, 0, 0.3);
   --os-handle-bg-active: rgba(0, 0, 0, 0.4);
}

.timeline-custom :deep(.p-timeline-event-opposite) {
   flex: 0 1 auto;
}

.timeline-custom :deep(.p-timeline-event-content) {
   flex: 1;
}

.timeline-custom :deep(.p-timeline-event-separator) {
   margin: 0 1rem;
}

.timeline-custom :deep(.p-timeline-event-connector) {
   background-color: #e5e7eb;
   height: 3rem; /* 增加連接線長度，拉開節點間距 */
}

/* 黑暗模式下的連接線顏色 */
.dark .timeline-custom :deep(.p-timeline-event-connector) {
   background-color: #4b5563;
}

/* 確保在小螢幕上仍然有良好的排版 */
@media (max-width: 768px) {
   .timeline-custom :deep(.p-timeline-event) {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 1.5rem;
   }

   .timeline-custom :deep(.p-timeline-event-opposite) {
      margin-bottom: 0.5rem;
   }

   .timeline-custom :deep(.p-timeline-event-separator) {
      margin: 0.5rem 0;
   }

   .timeline-custom :deep(.p-timeline-event-connector) {
      height: 2.5rem;
   }

   .timeline-container {
      height: 350px;
   }
}
</style>
