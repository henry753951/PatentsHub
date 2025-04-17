import { useNow } from "@vueuse/core";

export const usePatentMaintenances = (patentService: {
   data: Ref<RouterOutput["data"]["patent"]["getPatent"]>
   refreshCallback?: () => Promise<void>
}) => {
   const now = useNow({ interval: 10 * 1000 });
   const { $trpc } = useNuxtApp();
   const { data: patent, refreshCallback } = patentService;
   const DbMaintenances = computed(() => {
      return patent.value?.maintenances ?? [];
   });

   // ==================================================
   // [Actions]
   // ==================================================

   const addMaintenance = async (maintenance: {
      MaintenanceDate: Date
      ExpireDate: Date
      Title?: string
   }) => {
      if (!patent.value) return;
      await $trpc.data.patent.updatePatent.mutate([
         {
            data: {
               maintenances: {
                  create: {
                     MaintenanceDate: maintenance.MaintenanceDate,
                     ExpireDate: maintenance.ExpireDate,
                     Title: maintenance.Title ?? "",
                  },
               },
            },
            patentID: patent.value.PatentID,
         },
      ]);
      if (refreshCallback) await refreshCallback();
   };

   const editMaintenance = async (
      maintenanceID: number,
      maintenance: {
         MaintenanceDate: Date
         ExpireDate: Date
         Title?: string
      },
   ) => {
      if (!patent.value) return;
      await $trpc.data.patent.updatePatent.mutate([
         {
            data: {
               maintenances: {
                  update: {
                     data: {
                        MaintenanceDate: maintenance.MaintenanceDate,
                        ExpireDate: maintenance.ExpireDate,
                        Title: maintenance.Title ?? "",
                     },
                     where: {
                        MaintenanceID: maintenanceID,
                     },
                  },
               },
            },
            patentID: patent.value.PatentID,
         },
      ]);
      if (refreshCallback) await refreshCallback();
   };

   const deleteMaintenance = async (maintenanceID: number) => {
      if (!patent.value) return;
      await $trpc.data.patent.updatePatent.mutate([
         {
            data: {
               maintenances: {
                  delete: {
                     MaintenanceID: maintenanceID,
                  },
               },
            },
            patentID: patent.value.PatentID,
         },
      ]);
      if (refreshCallback) await refreshCallback();
   };

   // ==================================================
   // [Computed Properties]
   // ==================================================

   const sortedMaintenances = computed(() => {
      return [...DbMaintenances.value].sort(
         (a, b) => a.MaintenanceDate.getTime() - b.MaintenanceDate.getTime(),
      );
   });

   const maintenanceStatus = computed(() => {
      if (DbMaintenances.value.length === 0) return null;

      const earliestMaintenance = sortedMaintenances.value[0];
      const latestMaintenance
         = sortedMaintenances.value[sortedMaintenances.value.length - 1];
      const maintenanceStartDate = earliestMaintenance.MaintenanceDate;
      const latestMaintenanceDate = latestMaintenance.MaintenanceDate;
      const nextMaintenanceDate = latestMaintenance.ExpireDate;
      const _maintenanceSeconds = Math.floor(
         nextMaintenanceDate.getTime() - maintenanceStartDate.getTime(),
      );
      const maintenanceYears = Math.floor(_maintenanceSeconds / 1000 / 60 / 60 / 24 / 365 * 10) / 10;

      return {
         maintenanceStartDate,
         latestMaintenanceDate,
         nextMaintenanceDate,
         maintenanceYears,
         nextMaintenanceLabel:
            now.value > nextMaintenanceDate ? "到期時間" : "下次維護期程",
      };
   });

   return {
      addMaintenance,
      editMaintenance,
      deleteMaintenance,
      maintenances: sortedMaintenances,
      maintenanceStatus,
   };
};
