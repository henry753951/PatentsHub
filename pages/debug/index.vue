<template>
   <div>
      <div class="p-6 space-y-4 max-w-6xl mx-auto">
         <div
            v-if="current"
            class="flex justify-between items-center"
         >
            <div class="space-y-1">
               <div class="text-sm text-gray-500 mb-3">
                  第 {{ index + 1 }} / {{ total }} 筆
               </div>
               <div class="text-sm text-gray-500">
                  校內編號：{{ current?.校內編號 || "（無）" }}
               </div>
               <div v-if="matchedPatent">
                  <p class="text-sm text-zinc-500 mb-3">
                     系統專利名稱：{{ matchedPatent.Title || "（無標題）" }}
                  </p>
               </div>

               <div class="space-y-4 text-zinc-800 dark:text-white">
                  <div>
                     <div class="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                        狀態
                     </div>
                     <div class="mt-1 space-y-1 text-lg font-bold leading-relaxed">
                        <div
                           v-for="(line, i) in splitStatus"
                           :key="'status-' + i"
                        >
                           {{ line }}
                        </div>
                     </div>
                  </div>
                  <div>
                     <div class="text-xl font-semibold text-sky-600 dark:text-sky-400">
                        進度
                     </div>
                     <div class="mt-1 space-y-1 text-lg font-bold leading-relaxed">
                        <div
                           v-for="(line, i) in splitProgress"
                           :key="'progress-' + i"
                        >
                           {{ line }}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

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

         <div class="flex justify-between mt-4">
            <Button
               :disabled="index === 0"
               @click="prev"
            >
               ← 上一筆
            </Button>
            <Button
               :disabled="index >= total - 1"
               @click="next"
            >
               下一筆 →
            </Button>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import patentsRaw from "~/public/patents_with_status.json";

const STORAGE_KEY = "patentEditProgressIndex";
const allPatents = structuredClone(patentsRaw); // 深拷貝避免改到原檔
const total = computed(() => allPatents.length);

const index = ref(
   Math.min(
      parseInt(localStorage.getItem(STORAGE_KEY) || "0"),
      total.value - 1,
   ),
);
watch(index, (val) => {
   localStorage.setItem(STORAGE_KEY, val.toString());
});

const current = computed(() => allPatents[index.value] ?? null);

const {
   data: matchedPatent,
   crud,
   refresh,
   filter,
} = useDatabasePatent(undefined, { lazy: true });

const statusService = shallowRef<ReturnType<typeof usePatentStatus> | null>(null);

watch(
   () => matchedPatent.value,
   (patent) => {
      if (patent?.PatentID) {
         statusService.value = usePatentStatus({
            data: matchedPatent,
            refreshCallback: async () => {
               await refresh();
               const updated = await crud.getPatent({ where: { PatentID: patent.PatentID } });
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

      const matched = await crud.getPatent({ where: { InternalID: cur.校內編號 } });
      if (matched?.PatentID) {
         filter.value = matched.PatentID;
         await refresh();
         matchedPatent.value = await crud.getPatent({ where: { PatentID: matched.PatentID } });
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
   return raw.split(/。|\n/).filter((s) => s.trim() !== "");
});

const splitProgress = computed(() => {
   const raw = current.value?.進度 || "未提供";
   return raw.split(/。|\n/).filter((s) => s.trim() !== "");
});

definePageMeta({ name: "debug" });
</script>
