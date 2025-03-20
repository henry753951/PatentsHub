<template>
   <div class="p-6 flex gap-3 justify-between relative">
      <Timeline :value="patentRecordsService.events.value">
         <template #opposite="slotProps">
            <small class="text-sm text-muted-foreground">{{
               slotProps.item.date
            }}</small>
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
                  size="sm"
                  @click="editRecord(slotProps.item.id)"
               >
                  編輯
               </Button>
               <Button
                  variant="destructive"
                  size="sm"
                  @click="
                     patentRecordsService.actions.deleteRecord(
                        slotProps.item.id,
                     )
                  "
               >
                  刪除
               </Button>
            </div>
         </template>
      </Timeline>

      <!-- 右邊：表單 -->
      <div
         class="w-1/3 h-full flex flex-col justify-between gap-3 sticky top-[8rem]"
      >
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
         <div class="flex gap-3">
            <Button
               class="w-full"
               @click="createOrUpdateRecord"
            >
               {{ newRecord.id ? "更新紀錄" : "提交紀錄" }}
            </Button>
            <Button
               v-if="newRecord.id"
               class="w-full"
               variant="outline"
               @click="newRecord = { id: undefined, record: '', date: null }"
            >
               取消
            </Button>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import Timeline from "primevue/timeline";
import { Textarea } from "@/components/ui/textarea";=
import type { RouterOutput } from "~/server";
import DatePicker from "primevue/datepicker";
import FloatLabel from "primevue/floatlabel";

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

const createOrUpdateRecord = async () => {
   patentRecordsService.actions.upsertRecord({
      id: newRecord.value.id,
      record: newRecord.value.record,
      date: newRecord.value.date ?? new Date(),
   });
   newRecord.value = { id: undefined, record: "", date: null };
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

<style scoped></style>
