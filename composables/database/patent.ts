import type { z } from "zod";
import type { RouterOutput, dbZ } from "~/server";

export const useDatabasePatent = (
   defaultPatentId = undefined as number | undefined,
   options: {
      lazy?: boolean
   } = { lazy: true },
) => {
   const { $trpc } = useNuxtApp();
   // [State]
   const fillter = ref(defaultPatentId);
   const { data, status } = useAsyncData<
      RouterOutput["data"]["patent"]["getPatent"]
   >(
      `patent-${fillter.value}`,
      async () => {
         if (fillter.value == undefined) {
            return null;
         }
         const data = await getPatent({
            where: {
               PatentID: fillter.value,
            },
         });
         consola.info("Fetching patent with fillter", fillter.value, data);
         return data;
      },
      {
         watch: [fillter],
         lazy: options.lazy,
      },
   );

   const refresh = async () => {
      await refreshNuxtData(["patents", `patent-${fillter.value}`]);
   };

   // [CRUD]
   // Create

   // Read many

   // Read
   const getPatent = async (args: {
      where: z.infer<typeof dbZ.PatentWhereUniqueInputSchema>
   }) => {
      return await $trpc.data.patent.getPatent.query(args.where);
   };

   // Update
   const updatePatent = async (
      updateInputs: z.infer<typeof dbZ.PatentUpdateInputSchema>[],
   ) => {
      if (!updateInputs || !fillter.value) return;
      const data = await $trpc.data.patent.updatePatent.mutate(
         updateInputs.map((data) => ({
            patentID: fillter.value!,
            data,
         })),
      );
      consola.success("Patent data updated", updateInputs, data);
   };
   // Delete
   const deletePatent = async () => {
      const data = await $trpc.data.patent.deletePatent.mutate({
         PatentID: fillter.value,
      });
      await refreshNuxtData(["patents", `patent-${fillter.value}`]);
   };
   return {
      data,
      fillter,
      status,
      refresh,
      crud: {
         getPatent,
         deletePatent,
         updatePatent,
      },
   };
};
