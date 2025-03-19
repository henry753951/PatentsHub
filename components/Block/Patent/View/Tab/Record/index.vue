<template>
   <div class="p-6 h-[calc(100vh-48px)] flex space-x-6">
      <!-- 左邊：時間軸（可滾動，佔比 2/3） -->
      <OverlayScrollbarsComponent
         :options="{ scrollbars: { autoHide: 'leave'} }"
         class="flex-1 min-h-0 px-6"
         style="max-height: calc(100vh - 48px - 20px); overflow: auto;"
      >
         <Timeline
            :value="events"
            class="custom-timeline"
         >
            <template #opposite="slotProps">
               <small class="text-sm text-muted-foreground">{{ slotProps.item.date }}</small>
            </template>
            <template #content="slotProps">
               <div class="flex items-center space-x-2">
                  <p class="font-bold text-lg">
                     {{ slotProps.item.status }}
                  </p>
                  <i
                     :class="slotProps.item.icon"
                     :style="{ color: slotProps.item.color }"
                     class="mr-2"
                  ></i>
                  <Button
                     variant="outline"
                     size="sm"
                     class="ml-2"
                     @click="editRecord(slotProps.item.id)"
                  >
                     編輯
                  </Button>
               </div>
            </template>
         </Timeline>
      </OverlayScrollbarsComponent>

      <!-- 右邊：日期選擇器、文字輸入框和提交按鈕（佔比 1/3，固定不動） -->
      <div class="w-1/3 h-full flex flex-col justify-between">
         <div class="space-y-4">
            <!-- 日期選擇器 -->
            <Popover>
               <PopoverTrigger as-child>
                  <Button
                     variant="outline"
                     :class="
                        cn(
                           'w-full justify-start text-left font-normal',
                           !newRecord.date && 'text-muted-foreground',
                        )
                     "
                  >
                     <CalendarIcon class="mr-2 h-4 w-4" />
                     {{
                        newRecord.date
                           ? df.format(new Date(newRecord.date))
                           : "Pick a date"
                     }}
                  </Button>
               </PopoverTrigger>
               <PopoverContent class="w-auto p-0">
                  <Calendar
                     v-model="calendarDate"
                     initial-focus
                     @update:model-value="
                        ($event: DateValue | undefined) => {
                           newRecord.date = $event ? $event.toString() : '';
                        }
                     "
                  />
               </PopoverContent>
            </Popover>

            <!-- 文字輸入框 -->
            <Textarea
               v-model="newRecord.record"
               placeholder="輸入新的紀錄，例如 '初審開始'"
               class="w-full h-32"
            />

            <!-- 提交按鈕 -->
            <Button
               class="w-full"
               :disabled="!newRecord.date || !newRecord.record"
               @click="createOrUpdateRecord"
            >
               {{ isEditing ? "更新紀錄" : "提交紀錄" }}
            </Button>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import {
   DateFormatter,
   type DateValue,
   getLocalTimeZone,
   parseDate,
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import Timeline from "primevue/timeline";
import { Textarea } from "@/components/ui/textarea";
import { useNuxtApp } from "#app";

// 定義 patent 的類型
const patent = defineModel({
   type: Object as PropType<RouterOutput["data"]["patent"]["getPatent"]>,
   required: true,
});

// 時間軸數據（內部狀態）
const events = ref<
   Array<{
      id: number
      status: string
      date: string
      icon: string
      color: string
   }>
>([]);

// 日期格式化（內部狀態）
const df = new DateFormatter("en-US", { dateStyle: "long" });

// 新紀錄的數據（內部狀態）
const newRecord = ref({
   record: "",
   date: "",
});
const calendarDate = ref<DateValue | undefined>();

// 編輯狀態
const isEditing = ref(false);
const editingRecordId = ref<number | null>(null);

// 獲取 PatentRecords
const { $trpc } = useNuxtApp();
onMounted(async () => {
   if (patent.value?.PatentID) {
      const records = await $trpc.data.patentRecords.getPatentRecords.query({
         patentID: patent.value.PatentID,
      });
      if (!patent.value.patentRecords) {
         patent.value.patentRecords = [];
      }
      events.value = records.map((record) => ({
         id: record.id,
         status: record.Record || "無紀錄",
         date: record.Date
            ? new Date(record.Date).toLocaleDateString("zh-TW")
            : "未知日期",
         icon: "fluent:slide-record-48-regular",
         color: "#4CAF50",
      }));
      patent.value.patentRecords = records;
      // 測試用，增加更多數據以觸發滾動
      events.value = [
         ...Array(20).fill(null).map((_, i) => ({
            id: i + 1,
            status: `事件 ${i + 1}`,
            date: `2021/10/${(i + 1).toString().padStart(2, "0")}`,
            icon: "pi pi-plus",
            color: "#4CAF50",
         })),
      ];
   }
});

// 編輯記錄
const editRecord = (recordId: number) => {
   const event = events.value.find((e) => e.id === recordId);
   if (event) {
      isEditing.value = true;
      editingRecordId.value = recordId;
      newRecord.value.record = event.status;
      newRecord.value.date = event.date;
      // 將日期轉換為 DateValue 並設置到 calendarDate
      if (event.date !== "未知日期") {
         const parsedDate = new Date(event.date);
         calendarDate.value = parseDate(parsedDate.toISOString().split("T")[0]);
      }
   }
};

// 創建或更新記錄
const createOrUpdateRecord = async () => {
   if (!patent.value?.PatentID || !newRecord.value.date || !newRecord.value.record) {
      alert("請選擇日期並輸入紀錄內容");
      return;
   }

   try {
      if (isEditing.value && editingRecordId.value !== null) {
      // 更新模式
         const updatedRecord = await $trpc.data.patentRecords.updatePatentRecord.mutate({
            id: editingRecordId.value,
            record: newRecord.value.record,
            date: newRecord.value.date,
         });

         // 更新 events
         const index = events.value.findIndex((e) => e.id === editingRecordId.value);
         if (index !== -1) {
            events.value[index] = {
               ...events.value[index],
               status: updatedRecord.Record || "無紀錄",
               date: updatedRecord.Date
                  ? new Date(updatedRecord.Date).toLocaleDateString("zh-TW")
                  : "未知日期",
            };
         }

         // 更新 patent.PatentRecord
         if (patent.value?.patentRecords) {
            const recordIndex = patent.value.patentRecords.findIndex(
               (r) => r.id === editingRecordId.value,
            );
            if (recordIndex !== -1) {
               patent.value.patentRecords[recordIndex] = updatedRecord;
            }
         }
      }
      else {
      // 創建模式
         const createdRecord = await $trpc.data.patentRecords.createPatentRecord.mutate({
            patentID: patent.value.PatentID,
            record: newRecord.value.record,
            date: newRecord.value.date,
         });

         events.value.push({
            id: createdRecord.id,
            status: createdRecord.Record || "無紀錄",
            date: createdRecord.Date
               ? new Date(createdRecord.Date).toLocaleDateString("zh-TW")
               : "未知日期",
            icon: "pi pi-plus",
            color: "#4CAF50",
         });

         if (!patent.value.patentRecords) {
            patent.value.patentRecords = [];
         }
         patent.value.patentRecords.push(createdRecord);
      }

      // 清空輸入並重置編輯狀態
      newRecord.value.record = "";
      newRecord.value.date = "";
      calendarDate.value = undefined;
      isEditing.value = false;
      editingRecordId.value = null;
   }
   catch (error) {
      alert(
         (error as Error).message || (isEditing.value ? "更新紀錄失敗" : "創建紀錄失敗"),
      );
   }
};
</script>

<style scoped>
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
}

.card,
.w-1 {
  min-height: 0;
  flex: 0 0 auto;
}

.custom-timeline .p-timeline-event {
  margin-bottom: 2rem; /* 增加節點間距 */
}

</style>
