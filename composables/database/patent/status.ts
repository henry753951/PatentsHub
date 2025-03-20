import { useNow } from "@vueuse/core";

export const usePatentStatus = (patentService: {
   data: Ref<RouterOutput["data"]["patent"]["getPatent"]>
   refreshCallback?: () => Promise<void>
}) => {
   const now = useNow({ interval: 10000 });
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
      const activeMap = new Map<
         string,
         { Reason: string | null, Date: Date | null }
      >();

      const createStatus = (
         status: "SIGNED" | "REVIEWED" | "CERTIFIED" | "EXPIRED" | "MANUAL",
         reason?: string,
         date?: Date,
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
            data.active = active ?? patent.value.external?.StartDate !== null;
            data.reason = reason ?? (data.active ? "已獲證" : "獲證");
         }
         else if (status === "EXPIRED") {
            const latestMaintenance = DbMaintenances.value.reduce(
               (latest, current) => {
                  return current.ExpireDate > latest.ExpireDate
                     ? current
                     : latest;
               },
               DbMaintenances.value[0],
            );

            const isExpired
               = latestMaintenance && now.value > latestMaintenance.ExpireDate;
            data.active = isExpired;
            data.date = latestMaintenance.ExpireDate;
            data.reason = reason ?? (isExpired ? "已過期" : "到期");
         }
         else if (status === "MANUAL") {
            data.active = active ?? false;
            data.reason = reason ?? "";
            data.date = date ?? null;
         }

         return data;
      };

      // TODO
      // const statusArray = [
      //    createStatus("SIGNED"),
      //    createStatus("REVIEWED"),
      //    createStatus("CERTIFIED"),
      // ];

      // Sort:
      // date: null -> date: Date
      // null : "SIGNED" > "REVIEWED" > "CERTIFIED" > "EXPIRED"
      const statusArray = [];
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
