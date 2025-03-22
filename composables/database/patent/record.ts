// composables/useDatabasePatentRecord.ts
import { ref } from "vue";
import { useNuxtApp, useAsyncData, refreshNuxtData } from "#app";
import type { RouterInput, RouterOutput } from "~/server";
import { format } from "date-fns";

// 定義選項類型
interface TimelineEvent {
   id: number
   status: string
   date: string
   icon: string
   color: string
   rawDate: Date | null
}

export const usePatentRecords = (patentService: {
   data: Ref<RouterOutput["data"]["patent"]["getPatent"]>
   refreshCallback?: () => Promise<void>
}) => {
   const { $trpc } = useNuxtApp();
   const { data: patent, refreshCallback } = patentService;

   const refresh = async () => {
      if (refreshCallback) await refreshCallback();
   };

   // ==================================================
   // [Computed]
   // ==================================================
   const events = computed<TimelineEvent[]>(() => {
      const mappedEvents
      = patent.value?.patentRecords.map((record) => ({
         id: record.id,
         status: record.Record || "無紀錄",
         date: record.Date
            ? format(new Date(record.Date), "yyyy/MM/dd")
            : "未知日期",
         icon: "fluent:slide-record-48-regular",
         color: "#4CAF50",
         rawDate: record.Date,
      })) ?? [];

      // 按日期排序
      return mappedEvents.sort((a, b) => {
         if (!a.rawDate) return 1; // null 值放在最後
         if (!b.rawDate) return -1; // null 值放在最後
         return new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime();
      });
   });

   // ==================================================
   // [Actions]
   // ==================================================
   const upsertRecord = async (data: {
      id?: number
      record: string
      date: Date
   }) => {
      if (!patent.value) return;
      await $trpc.data.patentRecord.upsertPatentRecord.mutate({
         id: data.id,
         patentID: patent.value?.PatentID,
         record: data.record,
         date: data.date,
      });
      await refresh();
   };

   // Delete
   const deleteRecord = async (id: number) => {
      await $trpc.data.patentRecord.deletePatentRecord.mutate({
         id: id,
      });
      await refresh();
   };

   return {
      actions: {
         upsertRecord,
         deleteRecord,
      },
      events,
   };
};
