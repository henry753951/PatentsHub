import { useStorage } from "@vueuse/core";
import { computed, type Ref } from "vue";
import { z } from "zod";

export const ChangedStatusRecordSchema = z.object({
   date: z
      .date({
         coerce: true,
      })
      .nullable(),
   type: z.string(),
   isEnded: z.boolean(),
});

export const presetStatus = [
   "申請終止中",
   "國科會同意終止",
   "已讓與",
   "已放棄",
   "已撤案",
] as const;

export type ChangedStatusRecord = z.infer<typeof ChangedStatusRecordSchema>;
type InternalId = string;

const dataStringify = (data: {
   records: Map<InternalId, ChangedStatusRecord[]>
   caseNotFoundRecords: Map<InternalId, boolean>
}): string => {
   const obj = { ...data } as Record<string, any>;
   obj.records = Object.fromEntries(data.records);
   obj.caseNotFoundRecords = Object.fromEntries(data.caseNotFoundRecords);
   return JSON.stringify(obj);
};

export const usePatentStatusChanger = (currentInternalId: Ref<string>) => {
   const data = useStorage<{
      records: Map<InternalId, ChangedStatusRecord[]>
      caseNotFoundRecords: Map<InternalId, boolean>
   }>(
      "patentStatusChanger",
      {
         records: new Map<InternalId, ChangedStatusRecord[]>(),
         caseNotFoundRecords: new Map<InternalId, boolean>(),
      },
      localStorage,
      {
         serializer: {
            read: (value) => {
               const parsed = JSON.parse(value) as {
                  records: Record<string, ChangedStatusRecord[]>
                  caseNotFoundRecords?: Record<string, boolean>
               };
               return {
                  records: new Map<InternalId, ChangedStatusRecord[]>(
                     Object.entries(parsed.records).map(([key, val]) => [
                        key,
                        val.map((record: any) =>
                           ChangedStatusRecordSchema.parse(record),
                        ),
                     ]),
                  ),
                  caseNotFoundRecords: new Map<InternalId, boolean>(
                     Object.entries(parsed.caseNotFoundRecords || {}),
                  ),
               };
            },
            write: (value) => dataStringify(value),
         },
      },
   );

   const resetData = () => {
      data.value.records.clear();
      data.value.caseNotFoundRecords.clear();
   };

   const recordRef = computed({
      get: () => data.value.records.get(currentInternalId.value) || [],
      set: (newValue: ChangedStatusRecord[]) => {
         if (!currentInternalId.value || currentInternalId.value === "") {
            data.value.records.delete(currentInternalId.value);
            return;
         }
         data.value.records.set(currentInternalId.value, newValue);
      },
   });

   const caseNotFoundRef = computed({
      get: () =>
         data.value.caseNotFoundRecords.get(currentInternalId.value) || false,
      set: (newValue: boolean) => {
         if (
            !currentInternalId.value
            || currentInternalId.value === ""
            || !newValue
         ) {
            data.value.caseNotFoundRecords.delete(currentInternalId.value);
            return;
         }
         data.value.caseNotFoundRecords.set(currentInternalId.value, newValue);
      },
   });

   const addManualStatus = (type: string, date: Date | null) => {
      if (!currentInternalId.value || currentInternalId.value === "") {
         window.alert("請先選擇一個案件。");
         return;
      }
      const newRecord: ChangedStatusRecord = {
         date: date || new Date(),
         type,
         isEnded: true,
      };
      recordRef.value = [...recordRef.value, newRecord];
   };

   const deleteManualStatus = (index: number) => {
      if (!currentInternalId.value || currentInternalId.value === "") {
         window.alert("請先選擇一個案件。");
         return;
      }
      const currentRecords = recordRef.value;
      if (index < 0 || index >= currentRecords.length) {
         window.alert("無效的索引。");
         return;
      }
      currentRecords.splice(index, 1);
   };

   const saveChangerData = async () => {
      consola.log(data.value);
      const blob = new Blob([dataStringify(data.value)], {
         type: "application/json",
      });
      window
         .showSaveFilePicker({
            suggestedName: "patentStatusChanger.json",
            types: [
               {
                  description: "JSON files",
                  accept: {
                     "application/json": [".json"],
                  },
               },
            ],
         })
         .then((fileHandle) => {
            return fileHandle.createWritable().then((fileStream) => {
               return fileStream.write(blob).then(() => {
                  return fileStream.close();
               });
            });
         })
         .catch((error) => {
            console.error("Error saving file:", error);
            throw new Error("Failed to save the Excel file.");
         });
   };

   const togglePresetStatus = (preset: (typeof presetStatus)[number]) => {
      const currentRecords = recordRef.value;
      const existingRecordIndex = currentRecords.findIndex(
         (record) => record.type === preset,
      );

      if (existingRecordIndex !== -1) {
         currentRecords.splice(existingRecordIndex, 1); // Remove the existing record
      }
      else {
         const newRecord: ChangedStatusRecord = {
            date: new Date(),
            type: preset,
            isEnded: true,
         };
         currentRecords.push(newRecord); // Add the new record
      }

      recordRef.value = currentRecords;
   };

   const setPresetStatus = (
      preset: (typeof presetStatus)[number],
      date: Date | null,
   ) => {
      const currentRecords = recordRef.value;
      const existingRecordIndex = currentRecords.findIndex(
         (record) => record.type === preset,
      );

      const newRecord: ChangedStatusRecord = {
         date: date || new Date(),
         type: preset,
         isEnded: true,
      };

      if (existingRecordIndex !== -1) {
         currentRecords[existingRecordIndex] = newRecord; // Overwrite existing record
      }
      else {
         currentRecords.push(newRecord); // Add new record
      }

      recordRef.value = currentRecords;
   };

   const importJsonFiles = async () => {
      try {
         const fileHandles = await window.showOpenFilePicker({
            multiple: true,
            types: [
               {
                  description: "JSON files",
                  accept: {
                     "application/json": [".json"],
                  },
               },
            ],
         });

         const newRecords = new Map<InternalId, ChangedStatusRecord[]>();
         const newCaseNotFoundRecords = new Map<InternalId, boolean>();
         for (const fileHandle of fileHandles) {
            const file = await fileHandle.getFile();
            const text = await file.text();
            const parsed = JSON.parse(text) as {
               records: Record<string, ChangedStatusRecord[]>
               caseNotFoundRecords?: Record<string, boolean>
            };
            const parsedRecords = new Map<InternalId, ChangedStatusRecord[]>(
               Object.entries(parsed.records).map(([key, val]) => [
                  key,
                  val.map((record) => ChangedStatusRecordSchema.parse(record)),
               ]),
            );

            const caseNotFoundRecords = new Map<InternalId, boolean>(
               Object.entries(parsed.caseNotFoundRecords || {}),
            );

            for (const key of parsedRecords.keys()) {
               if (data.value.records.has(key)) {
                  window.alert(
                     `Duplicate InternalId found: ${key}. Import canceled.`,
                  );
                  return;
               }
               newRecords.set(key, parsedRecords.get(key)!);
            }
            for (const key of caseNotFoundRecords.keys()) {
               if (data.value.caseNotFoundRecords.has(key)) {
                  window.alert(
                     `Duplicate InternalId found in case not found records: ${key}. Import canceled.`,
                  );
                  return;
               }
               newCaseNotFoundRecords.set(key, caseNotFoundRecords.get(key)!);
            }
         }
         // Merge new records with existing data
         for (const [key, value] of newRecords) {
            data.value.records.set(key, value);
         }

         for (const [key, value] of newCaseNotFoundRecords) {
            data.value.caseNotFoundRecords.set(key, value);
         }
      }
      catch (error) {
         console.error("Error importing JSON files:", error);
         window.alert("Failed to import JSON files.");
      }
   };

   return {
      data,
      presetStatus,
      saveChangerData,
      recordRef,
      caseNotFoundRef,
      togglePresetStatus,
      setPresetStatus,
      isPresetActive: (preset: (typeof presetStatus)[number]) => {
         return recordRef.value.some((record) => record.type === preset);
      },

      addManualStatus,
      deleteManualStatus,

      resetData,
      importJsonFiles,
      saveToDatabase: () => {
         const { $trpc } = useNuxtApp();
         const totalRecords = Array.from(data.value.records.entries()).reduce(
            (sum, [, records]) => sum + records.length,
            0,
         );
         const progress = ref({
            current: 0,
            total: totalRecords,
            internalId: "",
         });
         const promise = new Promise<void>((resolve, reject) => {
            (async () => {
               try {
                  let current = 0;
                  for (const [internalId, records] of data.value.records) {
                     await new Promise((r) => setTimeout(r, 300));
                     current += records.length;
                     progress.value = {
                        current,
                        total: totalRecords,
                        internalId,
                     };

                     // Save all records for this InternalId using createMany
                     await $trpc.data.patent.updatePatentByInternalId.mutate({
                        internalID: internalId,
                        data: {
                           manualStatus: {
                              createMany: {
                                 data: records.map((record) => ({
                                    Active: true,
                                    Date: record.date,
                                    Override: true,
                                    Reason: record.type,
                                 })),
                              },
                           },
                        },
                     });
                     await new Promise((r) => setTimeout(r, 300));
                  }
                  resolve();
               }
               catch (error) {
                  console.error("Error saving to database:", error);
                  reject(new Error("Failed to save to database."));
               }
            })();
         });
         return { promise, signal: progress };
      },
   };
};
