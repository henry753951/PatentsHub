import { useNow } from "@vueuse/core";

export const usePatentStatus = (patentService: {
   data: Ref<RouterOutput["data"]["patent"]["getPatent"]>
   refreshCallback?: () => Promise<void>
}) => {
   const now = useNow();
   const { $trpc } = useNuxtApp();
   const { data: patent, refreshCallback } = patentService;

   const DbMaintenances = computed(() => {
      return patent.value?.maintenances ?? [];
   });
   const DbStatus = computed(() => {
      return patent.value?.status ?? [];
   });

   // ==================================================
   // [Computed Properties]
   // ==================================================

   const status = computed(() => {
      const activeMap = new Map<
         string,
         { Reason: string | null, Date: Date | null }
      >();
      DbStatus.value.forEach((s) => {
         activeMap.set(s.Status, { Reason: s.Reason, Date: s.Date });
      });

      const createStatus = (
         status:
           | "SIGNED"
           | "REVIEWED"
           | "CERTIFIED"
           | "EXPIRED"
           | "MANUAL_STOPED",
         defaultReason: string,
      ) => {
         const statusItem = activeMap.get(status);
         return {
            status,
            active: !!statusItem,
            reason: statusItem?.Reason ?? defaultReason,
            date: statusItem?.Date ?? null,
         };
      };

      const statusArray = [
         createStatus("SIGNED", "教師登錄"),
         createStatus(
            "REVIEWED",
            activeMap.has("REVIEWED") ? "已初評" : "初評",
         ),
         createStatus(
            "CERTIFIED",
            activeMap.has("CERTIFIED") ? "已獲證" : "獲證",
         ),
      ];

      if (activeMap.has("CERTIFIED")) {
         const latestMaintenance = DbMaintenances.value.reduce(
            (latest, current) => {
               return current.ExpireDate > latest.ExpireDate ? current : latest;
            },
            DbMaintenances.value[0],
         );

         const isExpired
            = latestMaintenance && now.value > latestMaintenance.ExpireDate;
         statusArray.push({
            status: "EXPIRED",
            active: isExpired,
            reason: isExpired ? "過期" : "未過期",
            date: latestMaintenance?.ExpireDate ?? null,
         });
      }

      if (activeMap.has("MANUAL_STOPED")) {
         statusArray.push(createStatus("MANUAL_STOPED", "手動停止"));
      }

      return statusArray;
   });

   // ==================================================
   // [Actions]
   // ==================================================

   const manualStop = async (active: boolean, reason: string, date?: Date) => {
      if (!patent.value) return;
      if (active) {
         await $trpc.data.patent.updatePatent.mutate([
            {
               data: {
                  status: {
                     upsert: {
                        create: {
                           Status: "MANUAL_STOPED",
                           Reason: reason,
                           Date: date ?? now.value,
                        },
                        update: {
                           Reason: reason,
                           Date: date ?? now.value,
                        },
                        where: {
                           PatentID_Status: {
                              Status: "MANUAL_STOPED",
                              PatentID: patent.value.PatentID,
                           },
                        },
                     },
                  },
               },
               patentID: patent.value.PatentID,
            },
         ]);
      }
      else {
         await $trpc.data.patent.updatePatent.mutate([
            {
               data: {
                  status: {
                     delete: {
                        PatentID_Status: {
                           PatentID: patent.value.PatentID,
                           Status: "MANUAL_STOPED",
                        },
                     },
                  },
               },
               patentID: patent.value.PatentID,
            },
         ]);
      }
      if (refreshCallback) await refreshCallback();
   };

   return {
      status,
      actions: [manualStop],
   };
};
