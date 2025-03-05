import type { z } from "zod";
import type { RouterOutput, dbZ } from "~/server";

export const useInventor = (
   defaultFillter: z.infer<typeof dbZ.InventorWhereInputSchema> = {},
) => {
   const { $trpc } = useNuxtApp();
   // [State]
   const fillter
      = ref<z.infer<typeof dbZ.InventorWhereInputSchema>>(defaultFillter);
   const { data, refresh, status } = useAsyncData<
      RouterOutput["data"]["inventor"]["getInventors"]
   >(
      "inventor",
      async () => {
         // 若預設不全選，則不顯示任何資料 (看需求)
         console.log(getInventors({ where: fillter.value }));
         if (Object.keys(fillter.value).length === 0) return [];
         return await getInventors({ where: fillter.value });
      },
      {
         watch: [fillter],
      },
   );

   // [CRUD]
   // Create
   const createInventor = async (
      data: z.infer<typeof dbZ.InventorCreateInputSchema>,
   ) => {
      return await $trpc.data.inventor.createInventor.mutate(serialize(data));
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
      return await $trpc.data.inventor.updateInventor.mutate(
         serialize({
            where: args.where,
            data: args.data,
         }),
      );
   };

   // Delete
   const deleteInventor = async (args: {
      where: z.infer<typeof dbZ.InventorWhereUniqueInputSchema>
   }) => {
      return await $trpc.data.inventor.deleteInventor.mutate(
         serialize({
            where: args.where,
         }),
      );
   };

   return {
      data,
      fillter,
      status,
      forceRefresh: refresh,
      crud: {
         getInventors,
         createInventor,
         updateInventor,
         deleteInventor,
      },
   };
};
