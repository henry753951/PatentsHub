<template>
   <div class="container mx-auto space-y-3 py-4">
      <div class="flex justify-between gap-4">
         <div class="flex justify-between gap-4">
            <div class="flex gap-4 items-center">
               <div class="text-sm text-gray-500">
                  第
                  {{ current }} / {{ total }} 筆
               </div>
               <div class="text-sm text-gray-500">
                  校內編號：{{ currentInternalId || "（無）" }}
               </div>
            </div>
            <div v-if="matchedPatent">
               <p class="text-sm text-zinc-500">
                  系統專利名稱：{{ matchedPatent.Title || "（無標題）" }}
               </p>
            </div>
         </div>
         <div class="flex">
            <Button @click="() => start()">
               更新資料庫
            </Button>
         </div>
      </div>

      <div>
         <div
            class="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-2"
         >
            當前專利狀態
         </div>
         <div>
            <BlockPatentStateProgress
               v-if="matchedPatent && statusService"
               class="w-full"
               :status-service="statusService"
               :patent="matchedPatent"
               :update-case-not-found="crud.updateCaseNotFound"
            />
            <div
               v-else
               class="text-red-500 text-sm"
            >
               查無對應專利
            </div>
         </div>
         <div
            class="text-xl font-semibold text-blue-600 dark:text-blue-400 mt-4"
         >
            狀態變更修改
         </div>
         <div class="space-y-2">
            <div class="flex flex-wrap gap-2">
               <span
                  v-for="preset in patentStatusChanger.presetStatus"
                  :key="preset"
                  class="px-2 py-0.5 text-sm rounded-full cursor-pointer transition border border-gray-300"
                  :class="{
                     'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200':
                        patentStatusChanger.isPresetActive(preset),
                     'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300':
                        !patentStatusChanger.isPresetActive(preset),
                  }"
                  @click="() => patentStatusChanger.togglePresetStatus(preset)"
               >
                  {{ preset }}
               </span>
            </div>
            <template v-if="patentStatusChanger.recordRef.value">
               <template
                  v-for="status in patentStatusChanger.recordRef.value"
                  :key="status.type"
               >
                  <div
                     :data-date="
                        status.date ? format(status.date, 'yyyy-MM-dd') : ''
                     "
                     class="flex flex-col gap-2 p-3 rounded-md bg-gray-50 dark:bg-zinc-800 mb-2"
                  >
                     <div
                        class="font-semibold text-gray-700 dark:text-gray-300"
                     >
                        {{ status.type }}
                     </div>
                     <FormDatePicker
                        v-model="status.date"
                        label="日期"
                     />
                  </div>
               </template>
            </template>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";

const {
   data: matchedPatent,
   crud,
   refresh,
   filter,
} = useDatabasePatent(undefined, { lazy: true });

const statusService = shallowRef<ReturnType<typeof usePatentStatus> | null>(
   null,
);

const patentStatusChanger = usePatentStatusChanger(
   computed(() => matchedPatent.value?.InternalID || ""),
);

const current = ref(0);
const total = ref(0);
const currentInternalId = ref<string | null>(null);

const start = () => {
   const { promise, signal } = patentStatusChanger.saveToDatabase();
   watch(signal, async (val) => {
      if (val) {
         current.value = val.current;
         total.value = val.total;
         currentInternalId.value = val.internalId || null;
         const matched = await crud.getPatent({
            where: { InternalID: val.internalId },
         });
         statusService.value = usePatentStatus({
            data: matchedPatent,
            refreshCallback: async () => {
               await refresh();
               const updated = await crud.getPatent({
                  where: { PatentID: matched?.PatentID },
               });
               matchedPatent.value = updated;
            },
         });
         if (matched?.PatentID) {
            filter.value = matched.PatentID;
         }
         else {
            filter.value = undefined;
            console.warn("查無對應專利 InternalID：", val.internalId);
         }
      }
   });
};

definePageMeta({ name: "debug-status-cahnger-import" });
</script>

<style></style>
