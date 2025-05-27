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
   const filter = ref(defaultPatentId);
   const { data, status } = useAsyncData<
      RouterOutput["data"]["patent"]["getPatent"]
   >(
      `patent-${filter.value}`,
      async () => {
         if (filter.value == undefined) {
            return null;
         }
         const data = await getPatent({
            where: {
               PatentID: filter.value,
            },
         });
         consola.info("Fetching patent with filter", filter.value, data);
         return data;
      },
      {
         watch: [filter],
         lazy: options.lazy,
      },
   );

   const refresh = async () => {
      await refreshNuxtData(["patents", `patent-${filter.value}`]);
   };

   // ==================================================
   // [CRUD]
   // ==================================================
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
      if (!updateInputs || !filter.value) return;
      const data = await $trpc.data.patent.updatePatent.mutate(
         updateInputs.map((data) => ({
            patentID: filter.value!,
            data,
         })),
      );
      await refresh();
   };

   const updateCaseNotFound = async (
      patentID: number,
      CaseNotFound: boolean,
   ) => {
      await $trpc.data.patent.updatePatent.mutate([
         {
            patentID,
            data: {
               CaseNotFound,
            },
         },
      ]);
      await refresh();
   };

   // Delete
   const deletePatent = async () => {
      const data = await $trpc.data.patent.deletePatent.mutate({
         PatentID: filter.value,
      });
      await refresh();
   };

   // =================================================
   onMounted(() => {
      if (defaultPatentId) {
         refresh();
      }
   });

   const crud = {
      getPatent,
      deletePatent,
      updatePatent,
      updateCaseNotFound,
   };
   return {
      data,
      patentStatus: usePatentStatus({
         data,
         refreshCallback: refresh,
      }),
      patentMaintainances: usePatentMaintenances({
         data,
         refreshCallback: refresh,
      }),
      patentRecords: usePatentRecords({ data, refreshCallback: refresh }),
      filter,
      status,
      refresh,
      crud,
   };
};

export type UseDatabasePatent = ReturnType<typeof useDatabasePatent>;
