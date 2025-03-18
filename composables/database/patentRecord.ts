import type { z } from "zod";
import type { RouterOutput, dbZ } from "~/server";

export const useDatabasePatentRecord = (
   defaultPatentId = undefined as number | undefined,
   options: {
      lazy?: boolean
   } = { lazy: true },
) => {
   const { $trpc } = useNuxtApp();
   // [State]
   const fillter = ref(defaultPatentId);
   const { data, status } = useAsyncData<
      RouterOutput["data"]["patentRecord"]["getPatentRecords"]
   >(
      `patent-${fillter.value}:records`,
      async () => {
         if (fillter.value == undefined) {
            return null;
         }
         const data = await getRecords({
            where: {
               PatentID: fillter.value,
            },
         });
         return data;
      },
      {
         watch: [fillter],
         lazy: options.lazy,
      },
   );

   const refresh = async () => {
      await refreshNuxtData([`patent-${fillter.value}:records`]);
   };

   // [CRUD]
   // Create
   const createRecord = async (
      data: z.infer<typeof dbZ.PatentRecordCreateInputSchema>,
   ) => {
      const currentPatentId = fillter.value;
   };

   // Read
   const getRecords = async (args: {
      where: z.infer<typeof dbZ.PatentRecordWhereInputSchema>
   }) => {};

   // Update
   const updateRecord = async (args: {
      where: z.infer<typeof dbZ.PatentRecordWhereUniqueInputSchema>
      data: z.infer<typeof dbZ.PatentRecordUpdateInputSchema>
   }) => {
      const currentPatentId = fillter.value;
   };

   // Delete
   const deleteRecord = async (args: {
      where: z.infer<typeof dbZ.PatentRecordWhereUniqueInputSchema>
   }) => {
      const currentPatentId = fillter.value;
   };

   return {
      data,
      fillter,
      status,
      refresh,
      crud: {
         getRecords,
         createRecord,
         updateRecord,
         deleteRecord,
      },
   };
};
