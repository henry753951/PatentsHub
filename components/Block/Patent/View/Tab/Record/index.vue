<template>
   <div class="p-6 h-[calc(100vh-48px)] flex space-x-6">
      <!-- 左邊：時間軸 -->
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
      <!-- 右邊：表單 -->
      <div class="w-1/3 h-full flex flex-col justify-between">
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
               size="small"
               input-id="review-date_input"
            />
            <label for="review-date_input">紀錄日期</label>
         </FloatLabel>
         <Textarea
            v-model="newRecord.record"
            placeholder="輸入新的紀錄，例如 '初審開始'"
            class="w-full h-32"
         />
         <Button
            class="w-full"
            @click="createOrUpdateRecord"
         >
            {{ isEditing ? "更新紀錄" : "提交紀錄" }}
         </Button>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { ref, computed } from "vue";
import Timeline from "primevue/timeline";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import type { RouterOutput } from "~/server";
import DatePicker from "primevue/datepicker";
import FloatLabel from "primevue/floatlabel";

const patent = defineModel({
   type: Object as PropType<RouterOutput["data"]["patent"]["getPatent"]>,
   required: true,
});

const { data, status, crud } = useDatabasePatentRecord(patent.value!.PatentID);

interface TimelineEvent {
   id: number
   status: string
   date: string
   icon: string
   color: string
   rawDate: Date | null
}

const events = computed<TimelineEvent[]>(() => {
   return data.value!.map((record: RouterOutput["data"]["patentRecord"]["getPatentRecords"][number]) => ({
      id: record.id,
      status: record.Record || "無紀錄",
      date: record.Date ? format(new Date(record.Date), "yyyy/MM/dd") : "未知日期",
      icon: "fluent:slide-record-48-regular",
      color: "#4CAF50",
      rawDate: record.Date,
   }));
});

const newRecord = ref<{
   record: string
   date: Date | null
}>({
   record: "",
   date: null,
});

const isEditing = ref(false);
const editingRecordId = ref<number | null>(null);

const editRecord = (recordId: number) => {
   const event = events.value.find((e: TimelineEvent) => e.id === recordId);
   if (event) {
      isEditing.value = true;
      editingRecordId.value = recordId;
      newRecord.value.record = event.status;
      newRecord.value.date = event.rawDate ? new Date(event.rawDate) : null;
   }
};

const createOrUpdateRecord = async () => {
   if (!patent.value!.PatentID || !newRecord.value.date || !newRecord.value.record) {
      alert("請選擇日期並輸入紀錄內容");
      return;
   }

   try {
      const date = new Date(newRecord.value.date);
      if (isNaN(date.getTime())) {
         alert("請選擇一個有效的日期");
         return;
      }

      if (isEditing.value && editingRecordId.value !== null) {
         await crud.updateRecord({
            id: editingRecordId.value,
            record: newRecord.value.record,
            date: date,
         });
      }
      else {
         await crud.createRecord({
            patentID: patent.value!.PatentID,
            record: newRecord.value.record,
            date: date,
         });
      }

      newRecord.value.record = "";
      newRecord.value.date = null;
      isEditing.value = false;
      editingRecordId.value = null;
   }
   catch (error) {
      alert((error as Error).message || (isEditing.value ? "更新紀錄失敗" : "創建紀錄失敗"));
   }
};
</script>

<style scoped>
.custom-timeline .p-timeline-event {
   margin-bottom: 2rem;
}
</style>
