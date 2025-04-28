import type { z } from "zod";
import type { RouterOutput, dbZ } from "~/server";
interface OrderBy {
   key: string
   direction: "asc" | "desc"
}

export const useDatabasePatents = (
   defaultFillter: z.infer<typeof dbZ.PatentWhereInputSchema> = {},
) => {
   const { $trpc } = useNuxtApp();
   // [State]
   const fillter
      = ref<z.infer<typeof dbZ.PatentWhereInputSchema>>(defaultFillter);
   const { data, refresh, status } = useAsyncData(
      "patents",
      async () => {
         const data = await getPatents(fillter.value);
         return data.map((item) => {
            return {
               ...item,
               _status: getStatus(item),
               _mainInventor: item.inventors?.find((i) => i.Main),
            };
         });
      },
      {
         watch: [fillter],
         lazy: true,
      },
   );

   const orderBy = ref<OrderBy>({ key: "InternalID", direction: "desc" });
   const dataOrdered = computed(() => {
      if (!data.value) return [];

      const dataSorted = [...data.value].sort((a, b) => {
         const key = orderBy.value.key;
         let valueA = getNestedProperty(a, key);
         let valueB = getNestedProperty(b, key);

         // Handle null/undefined values
         if (valueA == null) valueA = "";
         if (valueB == null) valueB = "";

         // Convert to string for consistent comparison
         const strA = valueA.toString().toLowerCase();
         const strB = valueB.toString().toLowerCase();

         // Compare based on direction
         if (orderBy.value.direction === "asc") {
            return strA < strB ? -1 : strA > strB ? 1 : 0;
         }
         else {
            return strA < strB ? 1 : strA > strB ? -1 : 0;
         }
      });
      return dataSorted.map((item) => {
         const option = orderOptions.find((o) => o.key === orderBy.value.key);
         const value = getNestedProperty(item, orderBy.value.key);
         const transformedValue = option?.transform
            ? option.transform(value)
            : value;
         return {
            ...item,
            flexProp: option?.show
               ? {
                  key: option?.label ?? orderBy.value.key,
                  value: transformedValue,
               }
               : undefined,
         };
      });
   });

   const orderOptions = [
      { label: "校內編號", key: "InternalID" },
      { label: "專利名稱", key: "Title" },
      { label: "專利類型", key: "PatentType" },
      { label: "專利號碼", key: "external.PatentNumber" },
      { label: "系所", key: "department.Name" },
      { label: "專利狀態", key: "_status.status" },
      { label: "發明人", key: "_mainInventor.Name" },
      { label: "專利國家", key: "CountryID" },
      { label: "年度", key: "Year", show: true },
      {
         label: "領證年度",
         key: "external.PublicationDate",
         show: true,
         transform: (value: any) => {
            return value ? new Date(value).getFullYear() - 1911 : null;
         },
      },
      {
         label: "申請年度",
         key: "application.FilingDate",
         show: true,
         transform: (value: any) => {
            return value ? new Date(value).getFullYear() - 1911 : null;
         },
      },
   ] as {
      label: string
      key: string
      show?: boolean
      transform?: (value: any) => any
   }[];

   // [Helpers]
   const getNestedProperty = (obj: any, path: string): any => {
      try {
         return (
            path.split(".").reduce((current, key) => current?.[key], obj) ?? ""
         );
      }
      catch {
         return "";
      }
   };

   // [CRUD]
   // Read
   const getPatents = async (
      where: z.infer<typeof dbZ.PatentWhereInputSchema>,
   ) => {
      return await $trpc.data.patent.getPatents.query(where);
   };

   // [Functions]

   const toggleSortDirection = () => {
      orderBy.value.direction
         = orderBy.value.direction === "asc" ? "desc" : "asc";
   };

   return {
      data: dataOrdered,
      fillter,
      order: {
         orderBy,
         orderOptions,
         toggleSortDirection,
      },
      status,
      forceRefresh: refresh,
      crud: {
         get: getPatents,
      },
   };
};

const getStatus = (
   item: RouterOutput["data"]["patent"]["getPatents"][number],
) => {
   const statusService = usePatentStatus({
      data: ref(item),
   });
   return statusService.status.value;
};
