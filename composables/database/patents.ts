import type { z } from "zod";
import type { RouterOutput, dbZ } from "~/server";

export const usePatents = (
   defaultFillter: z.infer<typeof dbZ.PatentWhereInputSchema> = {},
) => {
   const { $trpc } = useNuxtApp();
   // [State]
   const fillter
      = ref<z.infer<typeof dbZ.PatentWhereInputSchema>>(defaultFillter);
   const { data, refresh, status } = useAsyncData<
      RouterOutput["data"]["patent"]["getPatents"]
   >(
      "patents",
      async () => {
         console.log("fillter.value", fillter.value);
         return await getPatents(fillter.value);
      },
      {
         watch: [fillter],
         lazy: true,
      },
   );

   // [CRUD]
   // Create

   // Read
   const getPatents = async (
      where: z.infer<typeof dbZ.PatentWhereInputSchema>,
   ) => {
      return await $trpc.data.patent.getPatents.query(where);
   };
   // Update

   // Delete
   const deletePatent = async (PatentID: number) => {
      return await $trpc.data.patent.deletePatent.mutate({ PatentID });
   };

   return {
      data,
      fillter,
      status,
      forceRefresh: refresh,
      crud: {
         get: getPatents,
         delete: deletePatent,
      },
   };
};
