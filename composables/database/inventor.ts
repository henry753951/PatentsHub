import type { z } from "zod";
import type { RouterOutput, dbZ } from "~/server";

export const useDatabaseInventor = (
   defaultFilter: z.infer<typeof dbZ.InventorWhereInputSchema> = {
   },
) => {
   const { $trpc } = useNuxtApp();
   // 篩選條件
   const filter
      = ref<z.infer<typeof dbZ.InventorWhereInputSchema>>(defaultFilter);
   // 查詢數據
   const { data, refresh, status } = useAsyncData<
      RouterOutput["data"]["inventor"]["getInventors"]
   >(
      "inventor",
      async () => {
         // 若篩選條件為空，則不顯示任何資料 (看需求)
         if (Object.keys(filter.value).length === 0) return [];
         return await getInventors({ where: filter.value });
      },
      {
         watch: [filter], // 監聽篩選條件變化
      },
   );

   // [CRUD]
   // Create
   const createInventor = async (
      data: z.infer<typeof dbZ.InventorCreateInputSchema>,
   ) => {
      await $trpc.data.inventor.createInventor.mutate(serialize(data));
      await refresh();
   };

   // Read
   const getInventors = async (args: {
      where: z.infer<typeof dbZ.InventorWhereInputSchema>
   }) => {
      return await $trpc.data.inventor.getInventors.query(
         serialize(args.where),
      );
   };

   // Update
   const updateInventor = async (args: {
      where: z.infer<typeof dbZ.InventorWhereUniqueInputSchema>
      data: z.infer<typeof dbZ.InventorUpdateInputSchema>
   }) => {
      await $trpc.data.inventor.updateInventor.mutate(

         serialize({ where: args.where, data: args.data }),
      );
      await refresh();
   };

   // Delete
   const deleteInventor = async (args: {
      where: z.infer<typeof dbZ.InventorWhereUniqueInputSchema>
   }) => {
      await $trpc.data.inventor.deleteInventor.mutate(
         serialize({ where: args.where }),
      );
      await refresh();
   };
   return {
      data, // 查詢結果
      filter, // 篩選條件
      status, // 查詢狀態
      forceRefresh: refresh, // 手動刷新
      crud: {
         getInventors,
         createInventor,
         updateInventor,
         deleteInventor,
      },
   };
};
