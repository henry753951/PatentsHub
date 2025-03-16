<template>
   <div class="p-6 h-[calc(100vh-48px)] flex space-x-6">
      <!-- 左邊：時間軸（可滾動，佔比 2/3） -->
      <div class="w-2/3 h-full overflow-y-auto card">
         <Timeline
            :value="events"
            align="alternate"
         >
            <template #content="slotProps">
               <div class="flex items-center justify-between">
                  <div class="flex items-center">
                     <span :class="`text-${slotProps.item.color}-500 mr-2`">
                        {{ slotProps.item.icon }}
                     </span>
                     <div>
                        <p class="font-bold">
                           {{ slotProps.item.status }}
                        </p>
                        <p class="text-sm text-muted-foreground">
                           {{ slotProps.item.date }}
                        </p>
                     </div>
                  </div>
                  <Button
                     variant="outline"
                     size="sm"
                     class="ml-2"
                     @click="deleteRecord(slotProps.item.id)"
                  >
                     刪除
                  </Button>
               </div>
            </template>
         </Timeline>
      </div>

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
               @click="createRecord"
            >
               提交紀錄
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
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";
import { ref, onMounted } from "vue"; // 導入 onMounted
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

// 獲取 PatentRecords
const { $trpc } = useNuxtApp();
onMounted(async () => {
   if (patent.value?.PatentID) {
      const records = await $trpc.data.patentRecord.getPatentRecords.query({
         patentID: patent.value.PatentID,
      });
      events.value = records.map((record) => ({
         id: record.id,
         status: record.Record || "無紀錄",
         date: record.Date
            ? new Date(record.Date).toLocaleDateString("zh-TW")
            : "未知日期",
         icon: "pi pi-plus",
         color: "#4CAF50",
      }));
      // 更新 patent.PatentRecord，添加類型保護
      if (!patent.value.PatentRecord) {
         patent.value.PatentRecord = [];
      }
      patent.value.PatentRecord = records;
   }
});

// 創建新紀錄
const createRecord = async () => {
   if (
      !patent.value?.PatentID
      || !newRecord.value.date
      || !newRecord.value.record
   ) {
      alert("請選擇日期並輸入紀錄內容");
      return;
   }

   try {
      const createdRecord = await $trpc.data.patentRecord.createPatentRecord.mutate({
         patentID: patent.value.PatentID,
         record: newRecord.value.record,
         date: newRecord.value.date,
      });

      // 更新 events
      events.value.push({
         id: createdRecord.id,
         status: createdRecord.Record || "無紀錄",
         date: createdRecord.Date
            ? new Date(createdRecord.Date).toLocaleDateString("zh-TW")
            : "未知日期",
         icon: "pi pi-plus",
         color: "#4CAF50",
      });

      // 更新 patent.PatentRecord，添加類型保護
      if (!patent.value.PatentRecord) {
         patent.value.PatentRecord = [];
      }
      patent.value.PatentRecord.push(createdRecord);

      // 清空輸入
      newRecord.value.record = "";
      newRecord.value.date = "";
      calendarDate.value = undefined;
   }
   catch (error) {
      alert((error as Error).message || "創建紀錄失敗");
   }
};

// 刪除紀錄
const deleteRecord = async (recordId: number) => {
   try {
      await $trpc.data.patentRecord.deletePatentRecord.mutate({ id: recordId });

      // 更新 events
      events.value = events.value.filter((event) => event.id !== recordId);

      // 更新 patent.PatentRecord，添加類型保護
      if (patent.value?.PatentRecord) {
         patent.value.PatentRecord = patent.value.PatentRecord.filter(
            (record) => record.id !== recordId,
         );
      }
   }
   catch (error) {
      alert((error as Error).message || "刪除紀錄失敗");
   }
};
</script>

<style scoped>
.card {
   padding: 1rem;
   border-radius: 0.5rem;
   background-color: #f9f9f9;
}
</style>
