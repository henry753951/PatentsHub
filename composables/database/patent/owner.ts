// composables/useDatabasePatentOwner.ts
import { ref, computed } from "vue";
import { useNuxtApp, useAsyncData, refreshNuxtData } from "#app";
import type { RouterInput, RouterOutput } from "~/server";

// 定義選項類型
interface OwnerItem {
   ownerID: number
   name: string
   ownershipPercentage: number // 持有度（百分比）
}

export const usePatentOwners = (patentService: {
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
   const owners = computed<OwnerItem[]>(() => {
      const mappedOwners
         = patent.value?.owners.map((owner) => ({
            ownerID: owner.OwnerID,
            name: owner.Name || "未知所有權人",
            ownershipPercentage: owner.OwnershipPercentage ?? 0,
         })) ?? [];

      // 按 ownerID 排序（可根據需求改為按 name 或 ownershipPercentage 排序）
      return mappedOwners.sort((a, b) => a.ownerID - b.ownerID);
   });

   // ==================================================
   // [Actions]
   // ==================================================
   const upsertOwner = async (data: {
      ownerID?: number
      name: string
      ownershipPercentage: number
   }) => {
      if (!patent.value) return;
      await $trpc.data.patentOwner.upsertPatentOwner.mutate({
         ownerID: data.ownerID,
         patentID: patent.value.PatentID,
         name: data.name,
         ownershipPercentage: data.ownershipPercentage,
      });
      await refresh();
   };

   // Delete
   const deleteOwner = async (ownerID: number) => {
      await $trpc.data.patentOwner.deletePatentOwner.mutate({
         ownerID,
      });
      await refresh();
   };

   return {
      actions: {
         upsertOwner,
         deleteOwner,
      },
      owners,
   };
};
