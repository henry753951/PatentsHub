import type { z } from "zod";
import type { RouterOutput, dbZ } from "~/server";

export const useDatabaseFundingUnits = () => {
   const { $trpc } = useNuxtApp();
   // 查詢數據
   const { data, refresh, status } = useAsyncData<
      RouterOutput["data"]["fundingUnit"]["getFundingUnits"]
   >("fundingUnits", async () => {
      return await getFundingUnits();
   });

   // [CRUD]
   // Create
   const createFundingUnit = async (data: { name: string }) => {
      await $trpc.data.fundingUnit.createFundingUnit.mutate(data);
      await refresh();
   };

   // Read
   const getFundingUnits = async () => {
      return await $trpc.data.fundingUnit.getFundingUnits.query();
   };

   // Update
   const updateFundingUnit = async (args: {
      fundingUnitID: number
      name: string
   }) => {
      await $trpc.data.fundingUnit.updateFundingUnit.mutate(args);
      await refresh();
   };

   // Delete
   const deleteFundingUnit = async (args: { fundingUnitID: number }) => {
      await $trpc.data.fundingUnit.deleteFundingUnit.mutate(args);
      await refresh();
   };

   return {
      data, // 查詢結果
      status, // 查詢狀態
      forceRefresh: refresh, // 手動刷新
      crud: {
         create: createFundingUnit, // 創建
         read: getFundingUnits, // 讀取
         update: updateFundingUnit, // 更新
         delete: deleteFundingUnit, // 刪除
      },
   };
};
