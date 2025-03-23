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
   // [Computed Properties]
   // ==================================================

   const status = computed(() => {
      const createStatus = (
         status: "SIGNED" | "REVIEWED" | "CERTIFIED" | "EXPIRED" | "MANUAL",
         reason?: string,
         date?: Date | null,
         active?: boolean,
      ) => {
         const data = {
            status,
            active: false,
            reason: "",
            date: null as Date | null,
         };
         if (!patent.value) return data;
         if (status === "SIGNED") {
            data.date = patent.value?.createdAt;
            data.active = active ?? true;
            data.reason = "教師登錄";
         }
         else if (status === "REVIEWED") {
            data.date = patent.value.internal?.InitialReviewDate ?? null;
            data.active
               = active ?? patent.value.internal?.InitialReviewDate !== null;
            data.reason = reason ?? (data.active ? "已初評" : "初評");
         }
         else if (status === "CERTIFIED") {
            data.date = patent.value.external?.StartDate ?? null; // 不確定是 公告日 還是 開始日
            data.active = active ?? data.date !== null;
            data.reason = reason ?? (data.active ? "已獲證" : "獲證");
         }
         else if (status === "EXPIRED") {
            const sortedMaintenances = DbMaintenances.value.sort((a, b) => {
               if (a.ExpireDate instanceof Date && b.ExpireDate instanceof Date)
                  return a.ExpireDate.getTime() - b.ExpireDate.getTime();
               return 0;
            });
            const latestMaintenance = sortedMaintenances.length
               ? sortedMaintenances[sortedMaintenances.length - 1]
               : null;

            const isExpired = latestMaintenance
               ? now.value > latestMaintenance.ExpireDate
               : false;
            data.active = isExpired;
            data.date = latestMaintenance?.ExpireDate ?? null;
            data.reason = reason ?? (isExpired ? "已過期" : "到期");
         }
         else if (status === "MANUAL") {
            data.active = active ?? false;
            data.reason = reason ?? "";
            data.date = date ?? null;
         }

         return data;
      };

      // Status Array
      const statusArray = [
         createStatus("SIGNED"),
         createStatus("REVIEWED"),
         createStatus("CERTIFIED"),
      ];

      // Expired Status
      if (statusArray[2].active) statusArray.push(createStatus("EXPIRED"));

      // Manual Status
      DbManualStatus.value.forEach((manualStatus) => {
         statusArray.push(
            createStatus(
               "MANUAL",
               manualStatus.Reason,
               manualStatus.Date ?? null,
            ),
         );
      });

      // Sort date 優先 > date null 按照 'SIGNED' > 'REVIEWED' > 'CERTIFIED' > 'EXPIRED' > 'MANUAL'
      statusArray.sort((a, b) => {
         if (a.date instanceof Date && b.date instanceof Date)
            if (a.date && b.date) return a.date.getTime() - b.date.getTime();
         if (a.date && !b.date) return -1;
         if (!a.date && b.date) return 1;
         if (a.status === "SIGNED") return -1;
         if (b.status === "SIGNED") return 1;
         if (a.status === "REVIEWED") return -1;
         if (b.status === "REVIEWED") return 1;
         if (a.status === "CERTIFIED") return -1;
         if (b.status === "CERTIFIED") return 1;
         if (a.status === "EXPIRED") return -1;
         if (b.status === "EXPIRED") return 1;
         return 0;
      });

      return statusArray;
   });

   // ==================================================
   // [Actions]
   // ==================================================

   return {
      status,
      actions: [],
   };
};
