import { useNow } from "@vueuse/core";

export const usePatentStatus = (patentService: {
   data: Ref<RouterOutput["data"]["patent"]["getPatent"]>
   refreshCallback?: () => Promise<void>
}) => {
   const now = useNow({ interval: 10 * 1000 });
   const { $trpc } = useNuxtApp();
   const { data: patent, refreshCallback } = patentService;

   const DbMaintenances = computed(() => {
      return patent.value?.maintenances ?? [];
   });

   const DbManualStatus = computed(() => {
      return patent.value?.manualStatus ?? [];
   });

   // ==================================================
   // [Status Computed]
   // ==================================================

   const createStatus = (
      status: "SIGNED" | "REVIEWED" | "CERTIFIED" | "EXPIRED" | "MANUAL",
      reason?: string,
      date?: Date | null,
      active?: boolean,
   ) => {
      const base = {
         status,
         active: false,
         reason: "",
         date: null as Date | null,
      };

      if (!patent.value) return base;

      if (status === "SIGNED") {
         return {
            ...base,
            active: active ?? true,
            date: patent.value.createdAt,
            reason: "教師登錄",
         };
      }

      if (status === "REVIEWED") {
         const d = patent.value.internal?.InitialReviewDate ?? null;
         return {
            ...base,
            active: active ?? d !== null,
            date: d,
            reason: reason ?? (d ? "已初評" : "初評"),
         };
      }

      if (status === "CERTIFIED") {
         const d = patent.value.external?.StartDate ?? null;
         return {
            ...base,
            active: active ?? d !== null,
            date: d,
            reason: reason ?? (d ? "已獲證" : "獲證"),
         };
      }

      if (status === "EXPIRED") {
         const sorted = DbMaintenances.value.sort(
            (a, b) => a.ExpireDate.getTime() - b.ExpireDate.getTime(),
         );
         const latest = sorted.at(-1);
         const isExpired = latest ? now.value > latest.ExpireDate : false;

         return {
            ...base,
            active: isExpired,
            date: latest?.ExpireDate ?? null,
            reason: reason ?? (isExpired ? "已過期" : "到期"),
         };
      }

      if (status === "MANUAL") {
         return DbManualStatus.value.map((m) => ({
            status: "MANUAL",
            active: m.Active,
            reason: m.Reason,
            date: m.Date ?? null,
         }));
      }

      return base;
   };

   const status = computed(() => {
      const rawArray = [
         createStatus("SIGNED"),
         createStatus("REVIEWED"),
         createStatus("CERTIFIED"),
         createStatus("EXPIRED"),
         createStatus("MANUAL"),
      ];

      const statusArray = rawArray.flat(); // 展平 manual 多筆狀態

      statusArray.sort((a, b) => {
         if (a.date instanceof Date && b.date instanceof Date) {
            return a.date.getTime() - b.date.getTime();
         }
         if (a.date && !b.date) return -1;
         if (!a.date && b.date) return 1;

         const priority = [
            "SIGNED",
            "REVIEWED",
            "CERTIFIED",
            "EXPIRED",
            "MANUAL",
         ];
         return priority.indexOf(a.status) - priority.indexOf(b.status);
      });

      return statusArray;
   });

   // ==================================================
   // [Actions]
   // ==================================================

   const addManualStatus = async (reason: string, date: Date) => {
      if (!patent.value?.PatentID) return;

      await $trpc.patent.manualStatusAdd.mutate({
         patentId: patent.value.PatentID,
         reason,
         date,
      });

      if (refreshCallback) await refreshCallback();
   };

   return {
      status,
      actions: [],
      addManualStatus,
   };
};
