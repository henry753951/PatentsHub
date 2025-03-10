import type { z } from "zod";
import type { RouterOutput, dbZ } from "~/server";

export const usePatent = (
   defaultFillter: z.infer<typeof dbZ.PatentWhereInputSchema> = {},
) => {
   const { $trpc } = useNuxtApp();
   // [State]
   const fillter
      = ref<z.infer<typeof dbZ.PatentWhereInputSchema>>(defaultFillter);
   // const { data, refresh, status } = useAsyncData<
   //    RouterOutput["data"]["inventor"]["getInventors"]
   // >(
   //    "inventor",
   //    async () => {
   //       // 若預設不全選，則不顯示任何資料 (看需求)
   //       console.log(getInventors({ where: fillter.value }));
   //       if (Object.keys(fillter.value).length === 0) return [];
   //       return await getInventors({ where: fillter.value });
   //    },
   //    {
   //       watch: [fillter],
   //    },
   // );

   // [CRUD]
   // Create

   // Read many

   // Read
   const getPatent = async (args: {
      where: z.infer<typeof dbZ.PatentWhereUniqueInputSchema>
   }) => {
      return await $trpc.data.patent.getPatent.query(serialize(args.where));
   };

   // Update

   // Delete

   return {
      // data,
      // fillter,
      // status,
      // forceRefresh: refresh,
      crud: {
         getPatent,
      },
   };
};
