import type { z } from "zod";
import type { RouterOutput, dbZ } from "~/server";

export const useDatabasePatents = (
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
         const data = await getPatents(fillter.value);
         consola.info("Fetching patents with fillter", fillter.value, data);
         return data;
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

   return {
      data,
      fillter,
      status,
      forceRefresh: refresh,
      crud: {
         get: getPatents,
      },
   };
};
