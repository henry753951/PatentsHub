<template>
   <div class="p-6 h-[calc(100vh-48px)] flex space-x-6">
      <!-- 左邊：時間軸（可滾動，佔比 2/3） -->
      <OverlayScrollbarsComponent
         :options="{ scrollbars: { autoHide: 'leave' } }"
         class="flex-1 min-h-0 px-6"
         style="max-height: calc(100vh - 48px - 20px); overflow: auto;"
      >
         <div
            v-if="status === 'pending'"
            class="text-center text-muted-foreground"
         >
            載入中...
         </div>
         <div
            v-else-if="status === 'error'"
            class="text-center text-red-500"
         >
            載入失敗，請稍後重試
         </div>
         <Timeline
            v-else
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
                           ? format(new Date(newRecord.date), "PPP")
                           : "Pick a date"
                     }}
                  </Button>
               </PopoverTrigger>
               <PopoverContent class="w-auto p-0">
                  <Calendar
                     v-model="calendarDate"
                     initial-focus
                     @update:model-value="
                        ($event: Date | undefined) => {
                           newRecord.date = $event ? $event.toISOString().split('T')[0] : '';
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
import { CalendarIcon } from "lucide-vue-next";
import { ref, computed } from "vue";
import Timeline from "primevue/timeline";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import type { RouterOutput } from "~/server";

// 定義 patent 的類型
const patent = defineModel({
   type: Object as PropType<RouterOutput["data"]["patent"]["getPatent"]>,
   required: true,
});

// 使用 useDatabasePatentRecord
const { data, status, crud } = useDatabasePatentRecord(patent.value!.PatentID);

// 定義 events 項目的類型
interface TimelineEvent {
   id: number
   status: string
   date: string
   icon: string
   color: string
   rawDate: Date | null
}

// 時間軸數據（從 useDatabasePatentRecord 的 data 映射）
const events = computed<TimelineEvent[]>(() => {
   return data.value!.map((record: RouterOutput["data"]["patentRecord"]["getPatentRecords"][number]) => ({
      id: record.id,
      status: record.Record || "無紀錄",
      date: record.Date
         ? format(new Date(record.Date), "yyyy/MM/dd")
         : "未知日期",
      icon: "fluent:slide-record-48-regular",
      color: "#4CAF50",
      rawDate: record.Date, // 儲存原始 Date 物件，用於編輯時設置
   }));
});

// 新紀錄的數據（內部狀態）
const newRecord = ref<{
   record: string // 不再允許 null
   date: string
}>({
   record: "", // 初始值為空字串，符合後端 API
   date: "",
});
const calendarDate = ref<Date | undefined>();

// 編輯狀態
const isEditing = ref(false);
const editingRecordId = ref<number | null>(null);

// 編輯記錄
const editRecord = (recordId: number) => {
   const event = events.value.find((e: TimelineEvent) => e.id === recordId);
   if (event) {
      isEditing.value = true;
      editingRecordId.value = recordId;
      newRecord.value.record = event.status;

      // 使用原始 Date 物件設置日期
      if (event.rawDate) {
         const date = new Date(event.rawDate);
         if (!isNaN(date.getTime())) { // 檢查日期是否有效
            newRecord.value.date = date.toISOString().split("T")[0]; // 轉為 YYYY-MM-DD 格式
            calendarDate.value = date;
         }
         else {
            newRecord.value.date = "";
            calendarDate.value = undefined;
         }
      }
      else {
         newRecord.value.date = "";
         calendarDate.value = undefined;
      }
   }
};

// 創建或更新記錄
const createOrUpdateRecord = async () => {
   if (!patent.value!.PatentID || !newRecord.value.date || !newRecord.value.record) {
      alert("請選擇日期並輸入紀錄內容");
      return;
   }

   try {
      const date = new Date(newRecord.value.date); // 直接轉為 Date 物件
      if (isNaN(date.getTime())) { // 檢查日期是否有效
         alert("請選擇一個有效的日期");
         return;
      }

      if (isEditing.value && editingRecordId.value !== null) {
      // 更新模式
         await crud.updateRecord({
            id: editingRecordId.value,
            record: newRecord.value.record,
            date: date,
         });
      }
      else {
      // 創建模式
         await crud.createRecord({
            record: newRecord.value.record,
            date: date,
         });
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
