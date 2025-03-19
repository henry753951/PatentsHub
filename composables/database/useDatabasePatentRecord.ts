// composables/useDatabasePatentRecord.ts
import { ref } from "vue";
import { useNuxtApp, useAsyncData, refreshNuxtData } from "#app";
import type { RouterInput, RouterOutput } from "~/server";

// 定義選項類型
type Options = {
   lazy?: boolean
};

export const useDatabasePatentRecord = (
   defaultPatentId: number | undefined = undefined,
   options: Options = { lazy: true },
) => {
   const { $trpc } = useNuxtApp();

   // [State]
   const filter = ref(defaultPatentId);

   const { data, status } = useAsyncData<
      RouterOutput["data"]["patentRecord"]["getPatentRecords"]
   >(
      `patent-${filter.value}:records`,
      async () => {
         if (filter.value === undefined) {
            return [];
         }
         const data = await getRecords({ patentID: filter.value });
         return data;
      },
      {
         watch: [filter],
         lazy: options.lazy,
      },
   );

   // 刷新資料
   const refresh = async () => {
      await refreshNuxtData([`patent-${filter.value}:records`]);
   };

   // [CRUD]
   // Create
   const createRecord = async (
      data: RouterInput["data"]["patentRecord"]["createPatentRecord"],
   ) => {
      await $trpc.data.patentRecord.createPatentRecord.mutate({
         patentID: filter.value!,
         record: data.record,
         date: data.date,
      });
      await refresh();
   };

   // Read
   const getRecords = async (
      args: RouterInput["data"]["patentRecord"]["getPatentRecords"],
   ) => {
      return await $trpc.data.patentRecord.getPatentRecords.query(args);
   };

   // Update
   const updateRecord = async (
      args: RouterInput["data"]["patentRecord"]["updatePatentRecord"],
   ) => {
      await $trpc.data.patentRecord.updatePatentRecord.mutate({
         id: args.id,
         record: args.record,
         date: args.date,
      });
      await refresh();
   };

   // Delete
   const deleteRecord = async (
      args: RouterInput["data"]["patentRecord"]["deletePatentRecord"],
   ) => {
      await $trpc.data.patentRecord.deletePatentRecord.mutate({
         id: args.id,
      });
      await refresh();
   };

   return {
      data,
      filter,
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
