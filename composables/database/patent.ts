import type { z } from "zod";
import type { RouterOutput, dbZ } from "~/server";

export const usePatent = async (
   defaultFillter = undefined as
   | z.infer<typeof dbZ.PatentWhereUniqueInputSchema>
   | undefined,
) => {
   const { $trpc } = useNuxtApp();
   // [State]
   const fillter = ref<
      z.infer<typeof dbZ.PatentWhereUniqueInputSchema> | undefined
   >(defaultFillter);
   const { data, refresh, status } = useAsyncData<
      RouterOutput["data"]["patent"]["getPatent"]
   >(
      "patent-" + JSON.stringify(fillter.value),
      async () => {
         console.log(fillter.value, "fillter.value");
         if (fillter.value == undefined) {
            console.log("fillter.value == undefined");
            return null;
         }
         return await getPatent({ where: fillter.value });
      },
      {
         watch: [fillter],
         lazy: true,
      },
   );

   watch(
      () => data.value,
      async (newData) => {
         if (newData == null) return;
         consola.info("Patent data updated", newData);
         return await $trpc.data.patent.updatePatent.mutate(
            serialize({
               data: {
                  DraftTitle: newData.DraftTitle,
                  Title: newData.Title,
                  TitleEnglish: newData.TitleEnglish,
                  Year: newData.Year,
                  internal: {
                     upsert: newData.internal
                        ? {
                           create: {
                              InternalID: newData.internal.InternalID,
                           },
                           update: {
                              InternalID: newData.internal.InternalID,
                           },
                        }
                        : undefined,
                  },
                  external: {},
                  country: {},
                  department: {},
                  technical: {},
                  inventors: {},
               },
               patentID: newData.PatentID,
            }),
         );
      },
      {
         deep: true,
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
      return await $trpc.data.patent.getPatent.query(serialize(args.where));
   };

   // Update

   // Delete

   return {
      data,
      fillter,
      status,
      forceRefresh: refresh,
      crud: {
         getPatent,
      },
   };
};
