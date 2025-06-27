<template>
   <div class="container mx-auto space-y-3 py-4">
      <div class="flex justify-between gap-4">
         <Button
            :disabled="index === 0"
            @click="prev"
         >
            ← 上一筆
         </Button>
         <div class="flex-1 flex justify-between">
            <div>
               <div class="flex gap-4 items-center">
                  <div class="text-sm text-gray-500">
                     第
                     <input
                        v-model.number="indexPlus"
                        type="number"
                        class="w-16 text-center border rounded-md px-2"
                        min="1"
                        :max="total"
                     />
                     / {{ total }} 筆
                  </div>
                  <div class="text-sm text-gray-500">
                     校內編號：{{ current?.校內編號 || "（無）" }}
                  </div>
               </div>
               <div v-if="matchedPatent">
                  <p class="text-sm text-zinc-500">
                     系統專利名稱：{{ matchedPatent.Title || "（無標題）" }}
                  </p>
               </div>
            </div>
            <div class="flex gap-2 items-center">
               <Button
                  variant="link"
                  @click="() => patentStatusChanger.saveChangerData()"
               >
                  存檔
               </Button>
               <Button
                  variant="link"
                  @click="() => patentStatusChanger.importJsonFiles()"
               >
                  匯入
               </Button>
               <Button
                  variant="link"
                  @click="() => patentStatusChanger.resetData()"
               >
                  重置
               </Button>
            </div>
         </div>
         <Button
            :disabled="index >= total - 1"
            @click="next"
         >
            下一筆 →
         </Button>
      </div>

      <div class="mx-auto grid grid-cols-2">
         <div
            v-if="current"
            class="flex justify-between"
         >
            <div class="space-y-4 text-zinc-800 dark:text-white">
               <div>
                  <div
                     class="text-xl font-semibold text-emerald-600 dark:text-emerald-400"
                  >
                     狀態
                  </div>
                  <div class="mt-1 space-y-1 text-lg font-bold leading-relaxed">
                     <DebugStatusChangerHoverLine
                        v-for="(line, i) in splitStatus"
                        :key="'status-' + i"
                        @select="handleLineClick"
                     >
                        {{ line }}
                     </DebugStatusChangerHoverLine>
                  </div>
               </div>
               <div>
                  <div
                     class="text-xl font-semibold text-sky-600 dark:text-sky-400"
                  >
                     進度
                  </div>
                  <div class="mt-1 space-y-1 text-lg font-bold leading-relaxed">
                     <DebugStatusChangerHoverLine
                        v-for="(line, i) in splitProgress"
                        :key="'progress-' + i"
                        @select="handleLineClick"
                     >
                        {{ line }}
                     </DebugStatusChangerHoverLine>
                  </div>
               </div>
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
                  查無對應專利（InternalID: {{ current?.校內編號 }}）
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
                     @click="
                        () => patentStatusChanger.togglePresetStatus(preset)
                     "
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
   </div>
</template>

<script setup lang="ts">
import patentsRaw from "~/public/patents_with_status.json";
import { format } from "date-fns";
const allPatents = structuredClone(patentsRaw);

const total = computed(() => allPatents.length);
const index = useState<number>("debug-patent-index", () => {
   return 0;
});

const indexPlus = computed({
   get: () => index.value + 1,
   set: (val) => {
      index.value = Math.max(0, Math.min(val - 1, total.value - 1));
   },
});

const current = computed(() => allPatents[index.value] ?? null);

const {
   data: matchedPatent,
   crud,
   refresh,
   filter,
} = useDatabasePatent(undefined, { lazy: true });

const statusService = shallowRef<ReturnType<typeof usePatentStatus> | null>(
   null,
);

watch(
   () => matchedPatent.value,
   (patent) => {
      if (patent?.PatentID) {
         statusService.value = usePatentStatus({
            data: matchedPatent,
            refreshCallback: async () => {
               await refresh();
               const updated = await crud.getPatent({
                  where: { PatentID: patent.PatentID },
               });
               matchedPatent.value = updated;
            },
         });
      }
      else {
         statusService.value = null;
      }
   },
   { immediate: true },
);

watch(
   () => current.value,
   async (cur) => {
      if (!cur?.校內編號) return;
      console.log("🔍 搜尋校內編號：", cur.校內編號);

      const matched = await crud.getPatent({
         where: { InternalID: cur.校內編號 },
      });
      if (matched?.PatentID) {
         filter.value = matched.PatentID;
         await refresh();
         matchedPatent.value = await crud.getPatent({
            where: { PatentID: matched.PatentID },
         });
         console.log("找到對應專利：", matchedPatent.value?.Title);
      }
      else {
         filter.value = undefined;
         matchedPatent.value = null;
         console.warn("查無對應專利 InternalID：", cur.校內編號);
      }
   },
   { immediate: true },
);

const next = () => {
   index.value = Math.min(index.value + 1, total.value - 1);
};
const prev = () => {
   index.value = Math.max(index.value - 1, 0);
};

const splitStatus = computed(() => {
   const raw = current.value?.狀態 || "未提供";
   return raw.split(/。|\n|◎/).filter((s) => s.trim() !== "");
});

const splitProgress = computed(() => {
   const raw = current.value?.進度 || "未提供";
   return raw.split(/。|\n|◎/).filter((s) => s.trim() !== "");
});

const patentStatusChanger = usePatentStatusChanger(
   computed(() => matchedPatent.value?.InternalID || ""),
);

const handleLineClick = (
   status: (typeof presetStatus)[number],
   date: Date | null,
) => {
   patentStatusChanger.setPresetStatus(status, date);
};

definePageMeta({ name: "debug-status-cahnger" });
</script>

<style></style>
