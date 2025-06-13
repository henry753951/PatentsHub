import { useNow } from "@vueuse/core";

export const usePatentStatus = (patentService: {
   data: Ref<
     | RouterOutput["data"]["patent"]["getPatent"]
     | RouterOutput["data"]["patent"]["getPatents"][number]
   >
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

            let isExpired = false;
            let expireDate: Date | null = null;

            if (latest?.ExpireDate) {
               const expireDateEnd = new Date(latest.ExpireDate);
               expireDateEnd.setHours(0, 0, 0, 0);
               expireDateEnd.setDate(expireDateEnd.getDate() + 1);

               isExpired = now.value > expireDateEnd;
               expireDate = latest.ExpireDate;
            }

            data.date = expireDate;
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
      const signed = createStatus("SIGNED"); // 教師登錄 固定在第一個

      const others = [createStatus("REVIEWED"), createStatus("CERTIFIED")]; // 其他狀態 按照時間排序

      const expired = others[1].active ? createStatus("EXPIRED") : null;
      if (expired) others.push(expired);

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

      const inlineManuals = manualStatuses.filter((m) => !m.override);
      const overrideManuals = manualStatuses.filter((m) => m.override);

      const mix = [...others, ...inlineManuals];
      mix.sort((a, b) => {
         const timeA = a.date instanceof Date ? a.date.getTime() : Infinity;
         const timeB = b.date instanceof Date ? b.date.getTime() : Infinity;
         return timeA - timeB;
      });

      overrideManuals.sort((a, b) => {
         const timeA = a.date instanceof Date ? a.date.getTime() : Infinity;
         const timeB = b.date instanceof Date ? b.date.getTime() : Infinity;
         return timeA - timeB;
      });

      return [signed, ...mix, ...overrideManuals];
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

export const getPatentStatus = (
   patent: RouterOutput["data"]["patent"]["getPatents"][number],
): string => {
   // override 狀態優先
   const override = patent.manualStatus
      .filter((s) => s.Override)
      .sort((a, b) => (b.Date?.getTime() ?? 0) - (a.Date?.getTime() ?? 0))[0];
   if (override) return override.Reason;

   // 沒有任何維護紀錄的 fallback
   const latest = [...(patent.maintenances ?? [])]
      .sort(
         (a, b) =>
            new Date(b.MaintenanceDate).getTime()
              - new Date(a.MaintenanceDate).getTime(),
      )
      .at(0);

   if (!latest) {
      if (patent.external?.PublicationDate) return "已獲證";
      if (patent.InitialReviewDate) return "已初評";
      return "未生效";
   }

   const expireDate = new Date(latest.ExpireDate);
   expireDate.setHours(0, 0, 0, 0);
   expireDate.setDate(expireDate.getDate() + 1);

   const now = new Date();

   if (now >= expireDate) {
      const isNSC = patent.funding?.fundingUnits?.some(
         (unit) =>
            unit.fundingUnit?.Name?.includes("國科會")
            || unit.fundingUnit?.Name?.includes("科技部"),
      );
      return isNSC ? "已過期" : "期滿終止";
   }

   const diff = expireDate.getTime() - now.getTime();
   if (diff <= 1000 * 60 * 60 * 24 * 30) return "即將到期";

   return "有效";
};
