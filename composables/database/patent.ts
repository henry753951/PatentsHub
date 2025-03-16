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
   const { data, refresh, status } = useAsyncData<
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
   // [CRUD]
   // Create

   // Read many

   // Read
   const getPatent = async (args: {
      where: z.infer<typeof dbZ.PatentWhereUniqueInputSchema>
   }) => {
      console.log(args.where, "args.where");
      return await $trpc.data.patent.getPatent.query(args.where);
   };

   // Update
   const updatePatent = async (
      updateInput: z.infer<typeof dbZ.PatentUpdateInputSchema>,
   ) => {
      if (!updateInput || !fillter.value) return;
      consola.success("Patent data updated", updateInput);
      await $trpc.data.patent.updatePatent.mutate({
         data: updateInput,
         patentID: fillter.value,
      });
      await refreshNuxtData(["patents"]);
   };
   // Delete
   const deletePatent = async () => {
      await $trpc.data.patent.deletePatent.mutate({
         PatentID: fillter.value,
      });
      await refreshNuxtData(["patents", `patent-${fillter.value}`]);
   };
   return {
      data,
      fillter,
      status,
      forceRefresh: refresh,
      crud: {
         getPatent,
         deletePatent,
         updatePatent,
      },
   };
};
