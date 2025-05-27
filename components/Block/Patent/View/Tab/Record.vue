<template>
   <div class="flex flex-col gap-6 relative">
      <!-- 時間線：佔據整個寬度 -->
      <div class="w-full bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4">
         <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            專利記錄
         </h2>

         <Timeline
            :value="patentRecordsService.events.value"
            class="custom-timeline"
         >
            <template #marker="slotProps">
               <span
                  class="flex h-6 w-6 items-center justify-center rounded-full"
                  :style="{
                     backgroundColor: slotProps.item.color + '20',
                  }"
               >
                  <Icon
                     :name="slotProps.item.icon"
                     :style="{ color: slotProps.item.color }"
                     class="h-4 w-4 text-gray-800 dark:text-gray-200"
                  />
               </span>
            </template>
            <template #opposite="slotProps">
               <div
                  class="text-sm font-medium text-gray-500 bg-zinc-100 dark:bg-zinc-700 dark:text-gray-300 rounded-md px-3 py-1 inline-block"
               >
                  {{ slotProps.item.date }}
               </div>
            </template>
            <template #content="slotProps">
               <div>
                  <div
                     class="flex flex-col md:flex-row md:items-center justify-between space-y-1 md:space-y-0"
                  >
                     <p
                        class="font-medium text-base text-gray-800 dark:text-gray-200"
                     >
                        {{ slotProps.item.status }}
                     </p>
                     <div class="flex gap-2">
                        <Button
                           size="sm"
                           variant="ghost"
                           class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                           @click="editRecord(slotProps.item.id)"
                        >
                           <Icon name="ic:round-edit" />
                        </Button>
                     </div>
                  </div>
               </div>
            </template>
         </Timeline>
      </div>
      <Dialog v-model:open="showDialog">
         <DialogTrigger
            class="fixed bottom-6 right-6 rounded-full w-14 h-14 flex items-center justify-center shadow-xl bg-gray-200/80 hover:bg-gray-300/90 dark:bg-zinc-500/80 dark:hover:bg-zinc-400/90 text-gray-900 dark:text-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm z-50"
            @click="
               resetForm();
               showDialog = true;
            "
         >
            <Icon
               name="ic:round-add"
               class="h-8 w-8"
            />
         </DialogTrigger>
         <DialogContent
            class="dark:bg-zinc-800 dark:text-white z-50"
            @interact-outside="(e) => e.preventDefault()"
         >
            <ConfirmPopup></ConfirmPopup>
            <div class="space-y-4">
               <DialogHeader>
                  <DialogTitle
                     class="font-bold text-lg text-gray-800 dark:text-gray-200"
                  >
                     {{ newRecord.id ? "更新記錄" : "新增記錄" }}
                  </DialogTitle>
                  <DialogDescription
                     class="text-sm text-gray-500 dark:text-gray-400"
                  >
                     請輸入紀錄日期和內容以完成操作。
                  </DialogDescription>
               </DialogHeader>

               <FormDatePicker
                  v-model="newRecord.date"
                  label="紀錄日期"
               />

               <div>
                  <Textarea
                     v-model="newRecord.record"
                     placeholder="輸入新的紀錄，例如 '初審開始'"
                     class="w-full h-32 resize-none"
                     :class="{
                        'border-rose-500': !newRecord.record && formSubmitted,
                     }"
                  />
                  <p
                     v-if="!newRecord.record && formSubmitted"
                     class="text-rose-500 text-sm mt-1"
                  >
                     請輸入紀錄內容
                  </p>
               </div>

               <div class="flex gap-3 pt-2">
                  <Button
                     class="w-full flex items-center justify-center gap-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                     variant="default"
                     @click="submitForm"
                  >
                     <Icon
                        :name="newRecord.id ? 'ic:round-edit' : 'ic:round-add'"
                     />
                     {{ newRecord.id ? "更新記錄" : "提交記錄" }}
                  </Button>
                  <Button
                     v-if="newRecord.id"
                     class="w-full flex items-center justify-center gap-1 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"
                     severity="danger"
                     @click="confirmDelete($event)"
                  >
                     <Icon name="ic:round-delete" />
                     刪除
                  </Button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import Timeline from "primevue/timeline";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import ConfirmPopup from "primevue/confirmpopup";
import { useConfirm } from "primevue/useconfirm";
import { ref, onMounted } from "vue";
import consola from "consola";

const confirm = useConfirm();

const { patentRecordsService } = defineProps<{
   patentRecordsService: ReturnType<typeof usePatentRecords>
}>();

onMounted(() => {
   consola.log("Patent Records Service:", patentRecordsService.events.value);
});

// 預設當前日期（2025年5月24日）
const newRecord = ref<{
   id: number | undefined
   record: string
   date: Date | null
}>({
   id: undefined,
   record: "",
   date: new Date(), // 預設為當前日期
});

const formSubmitted = ref(false);
const showDialog = ref(false);

const submitForm = async () => {
   formSubmitted.value = true;

   if (!newRecord.value.record || !newRecord.value.date) {
      return;
   }

   await createOrUpdateRecord();
   formSubmitted.value = false;
   showDialog.value = false;
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
   newRecord.value = { id: undefined, record: "", date: new Date() }; // 重置時也預設當前日期
   formSubmitted.value = false;
   showDialog.value = false;
};

const editRecord = (id: number) => {
   const record = patentRecordsService.events.value.find((r) => r.id === id);
   if (!record) return;
   newRecord.value = {
      id: record.id,
      record: record.status,
      date: new Date(record.date), // 編輯時使用原日期
   };
   showDialog.value = true;
};

const confirmDelete = (event: Event) => {
   if (!newRecord.value.id) return;

   confirm.require({
      target: event.currentTarget as HTMLElement,
      message: "確定要刪除這筆記錄嗎？此操作無法恢復。",
      acceptLabel: "確定",
      rejectLabel: "取消",
      acceptClass: "p-button-danger",
      accept: async () => {
         try {
            await patentRecordsService.actions.deleteRecord(
               newRecord.value.id!,
            );
            showDialog.value = false;
         }
         catch (error) {
            consola.error("刪除記錄失敗:", error);
         }
      },
   });
};
</script>

<style scoped>
.timeline-container {
   height: 400px;
   min-height: 300px;
   position: relative;
}

:deep(.os-theme-dark) {
   --os-handle-bg: rgba(255, 255, 255, 0.3) !important;
   --os-handle-bg-hover: rgba(255, 255, 255, 0.5) !important;
   --os-handle-bg-active: rgba(255, 255, 255, 0.7) !important;
   --os-size: 8px !important;
}

:deep(.os-scrollbar) {
   opacity: 1 !important;
   visibility: visible !important;
}

:deep(.os-scrollbar-handle) {
   border-radius: 4px !important;
}

.os-theme-light {
   --os-handle-bg: rgba(0, 0, 0, 0.2);
   --os-handle-bg-hover: rgba(0, 0, 0, 0.3);
   --os-handle-bg-active: rgba(0, 0, 0, 0.4);
}

/* 自訂時間線樣式，縮短節點間距 */
.custom-timeline :deep(.p-timeline-event) {
   margin-bottom: 0rem !important; /* 移除垂直間距 */
}

.custom-timeline :deep(.p-timeline-event-opposite) {
   flex: 0 1 auto;
}

.custom-timeline :deep(.p-timeline-event-content) {
   flex: 1;
}

.custom-timeline :deep(.p-timeline-event-separator) {
   margin: 0 0.25rem !important; /* 保持水平間距不變 */
}

.custom-timeline :deep(.p-timeline-event-connector) {
   background-color: #e5e7eb;
   height: 0.25rem !important; /* 連接線高度不變 */
}

.dark .custom-timeline :deep(.p-timeline-event-connector) {
   background-color: #4b5563;
}

@media (max-width: 768px) {
   .custom-timeline :deep(.p-timeline-event) {
      flex-direction: column;
      align-items: flex-start;
   }

   .custom-timeline :deep(.p-timeline-event-opposite) {
      margin-bottom: 0rem; /* 小螢幕下也移除垂直間距 */
   }

   .custom-timeline :deep(.p-timeline-event-separator) {
      margin: 0rem 0; /* 小螢幕下移除垂直間距 */
   }

   .custom-timeline :deep(.p-timeline-event-connector) {
      height: 0.25rem !important; /* 連接線高度不變 */
   }

   .timeline-container {
      height: 350px;
   }
}
</style>
