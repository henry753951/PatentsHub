import { useNow } from "@vueuse/core";

export const usePatentStatus = (patentService: {
   data: Ref<RouterOutput["data"]["patent"]["getPatent"] | RouterOutput["data"]["patent"]["getPatents"][number]>
   refreshCallback?: () => Promise<void>
}) => {
   const now = useNow({ interval: 10 * 1000 });
   const { $trpc } = useNuxtApp();
   const { data: patent, refreshCallback } = patentService;

   const DbMaintenances = computed(() => patent.value?.maintenances ?? []);
   const DbManualStatus = computed(() => patent.value?.manualStatus ?? []);

   const createStatus = (
      status: "SIGNED" | "REVIEWED" | "CERTIFIED" | "EXPIRED" | "MANUAL",
      reason?: string,
      date?: Date | null,
      active?: boolean,
      override?: boolean,
   ) => {
      const data = {
         status,
         active: false,
         reason: "",
         date: null as Date | null,
         override: false,
      };

      if (!patent.value) return data;

      switch (status) {
         case "SIGNED":
            data.date = patent.value.createdAt ?? null;
            data.active = active ?? true;
            data.reason = "教師登錄";
            break;
         case "REVIEWED":
            data.date = patent.value.InitialReviewDate ?? null;
            data.active = active ?? !!data.date;
            data.reason = reason ?? (data.active ? "已初評" : "初評");
            break;
         case "CERTIFIED":
            data.date = patent.value.external?.PublicationDate ?? null;
            data.active = active ?? !!data.date;
            data.reason = reason ?? (data.active ? "已獲證" : "獲證");
            break;
         case "EXPIRED": {
            const latest = [...DbMaintenances.value]
               .filter((m) => m.ExpireDate instanceof Date)
               .sort((a, b) => a.ExpireDate.getTime() - b.ExpireDate.getTime())
               .at(-1);

            const isExpired = latest ? now.value > latest.ExpireDate : false;
            data.date = latest?.ExpireDate ?? null;
            data.active = isExpired;
            data.reason = reason ?? (isExpired ? "已過期" : "到期");
            break;
         }
         case "MANUAL":
            data.date = date ?? null;
            data.active = active ?? false;
            data.reason = reason ?? "";
            data.override = override ?? false;
            break;
      }

      return data;
   };

   const status = computed(() => {
      const base = [
         createStatus("SIGNED"),
         createStatus("REVIEWED"),
         createStatus("CERTIFIED"),
      ];
      if (base[2].active) base.push(createStatus("EXPIRED"));

      const manualStatuses = DbManualStatus.value.map((m) => ({
         ...createStatus(
            "MANUAL",
            m.Reason,
            m.Date ?? null,
            m.Active,
            m.Override,
         ),
         ManualStatusID: m.ManualStatusID,
      }));

      // 拆成兩種
      const overrideManuals = manualStatuses.filter((m) => m.override);
      const inlineManuals = manualStatuses.filter((m) => !m.override);

      // 全部轉為同一格式
      const combined = [...base, ...inlineManuals];

      // 用日期做排序，沒有日期的放後面
      combined.sort((a, b) => {
         const aTime = a.date instanceof Date ? a.date.getTime() : Infinity;
         const bTime = b.date instanceof Date ? b.date.getTime() : Infinity;
         return aTime - bTime;
      });

      // override 的永遠放後面（但也可以排序）
      overrideManuals.sort((a, b) => {
         const aTime = a.date instanceof Date ? a.date.getTime() : Infinity;
         const bTime = b.date instanceof Date ? b.date.getTime() : Infinity;
         return aTime - bTime;
      });

      return [...combined, ...overrideManuals];
   });

   const addManualStatus = async (manual: {
      reason: string
      date?: Date
      override?: boolean
   }) => {
      if (!patent.value) return;
      await $trpc.data.patentStatus.addManualStatus.mutate({
         patentID: patent.value.PatentID,
         reason: manual.reason,
         date: manual.date ?? undefined,
         active: true,
         override: manual.override ?? false,
      });
   };

   const updateManualStatus = async (manual: {
      ManualStatusID: number
      reason: string
      date?: Date
      override?: boolean
   }) => {
      if (!patent.value) return;
      await $trpc.data.patentStatus.updateManualStatus.mutate({
         manualStatusID: manual.ManualStatusID,
         reason: manual.reason,
         date: manual.date ?? undefined,
         override: manual.override ?? false,
      });
   };

   const removeManualStatus = async (manualStatusID: number) => {
      if (!patent.value) return;
      await $trpc.data.patentStatus.removeManualStatus.mutate({
         manualStatusID,
      });
   };

   return {
      status,
      actions: [],
      createStatus,
      addManualStatus,
      updateManualStatus,
      removeManualStatus,
      refreshCallback,
   };
};
