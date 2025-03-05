import type { z } from "zod";
import type { dbZ } from "~/server";

export const inventor = {
   // Create
   // TODO
   // ... implement createInventor procedure

   // Read
   getInventors: async (
      where: z.infer<typeof dbZ.InventorWhereInputSchema>,
   ) => {
      const { $trpc } = useNuxtApp();
      return await $trpc.data.inventor.getInventors.query(where);
   },
};
