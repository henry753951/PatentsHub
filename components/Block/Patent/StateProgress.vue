<template>
   <div
      class="bg-white rounded-lg p-4 space-y-2 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800"
   >
      <!-- 狀態標題 + 新增按鈕 -->
      <div class="flex justify-between items-center">
         <div class="text-base">
            狀態
         </div>
         <div class="flex items-center gap-2">
            <div
               class="font-bold"
               :class="{
                  'text-success': currentState?.type === 'success',
                  'text-warning': currentState?.type === 'warning',
                  'text-none': currentState?.type === 'none',
               }"
            >
               {{ currentState?.title }}
            </div>
            <button
               class="text-xs text-primary underline"
               @click="handleAddManualStatus"
            >
               新增自訂狀態
            </button>
         </div>
      </div>

      <!-- 狀態進度區塊 -->
      <div
         class="w-full flex gap-1"
         @mouseover="tooltipEnable = true"
         @mouseleave="tooltipEnable = false"
      >
         <TooltipProvider
            v-for="(item, index) in stateProgress"
            :key="item.status + index"
            :delay-duration="100"
            :disabled="!tooltipEnable"
         >
            <Tooltip>
               <TooltipTrigger
                  class="status-block flex flex-col items-start gap-2"
                  :class="{
                     success: item.type === 'success',
                     none: item.type === 'none',
                     warning: item.type === 'warning',
                     'flex-1': index === stateProgress.length - 1 && isStopped,
                     'w-[30%] max-w-[8rem]': item.status === 'EXPIRED' || item.status === 'CERTIFIED',
                  }"
               >
                  <span class="font-bold text-sm mr-4">{{ item.title }}</span>
               </TooltipTrigger>

               <TooltipContent v-if="item.date">
                  <p>{{ format(item.date, "yyyy-MM-dd") }}</p>
                  <CustomTimeAgo :time="item.date" />
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>

         <div
            v-if="!isStopped"
            class="status-block flex-1 none"
         />
      </div>
   </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import { format } from "date-fns";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";

const tooltipEnable = ref(false);

const { statusService } = defineProps<{
   statusService: ReturnType<typeof usePatentStatus>
}>();

const { openAutoModal } = useModals();

const handleAddManualStatus = () => {
   const schema = z.object({
      reason: z.string().min(1, "請輸入狀態名稱"),
      date: z.preprocess(
         (val) => {
            if (typeof val === "string") {
               const parsed = new Date(val);
               return isNaN(parsed.getTime()) ? null : parsed;
            }
            return val;
         },
         z.date().nullable(),
      ),
   });

   openAutoModal(
      "新增自訂狀態",
      "",
      schema,
      async (data) => {
         await statusService.addManualStatus(data.reason, data.date ?? new Date());
      },
      {
         reason: { label: "狀態名稱" },
         date: { label: "狀態日期" },
      },
      undefined, // passthrough
      {
         reason: "",
         date: new Date(), // 預設為今天
      },
   );
};

const stateProgress = computed(() => {
   return statusService.status.value.map((s) => ({
      status: s.status,
      date: s.date,
      type: s.active
         ? s.status === "EXPIRED"
            ? "warning"
            : "success"
         : "none",
      title: s.reason || s.status,
      active: s.active,
   }));
});

const isStopped = computed(() => {
   const isExpired = stateProgress.value.some((item) => item.status === "EXPIRED" && item.active);
   const isLastManual = stateProgress.value[stateProgress.value.length - 1].status === "MANUAL" && stateProgress.value[stateProgress.value.length - 1].active;
   return isExpired || isLastManual;
});

const currentState = computed(() => {
   return stateProgress.value.find((item) => item.active) || null;
});
</script>

<style scoped>
.status-block > span {
   font-size: 0.9rem;
}

.status-block::before {
   content: "";
   display: block;
   width: 100%;
   height: 10px;
   border-radius: 4px;
}
.status-block:hover::before {
   box-shadow: 0px 0px 5px var(--progress-color);
}

.status-block.success::before {
   --progress-color: #34d399;
   background-color: var(--progress-color);
}
.status-block.none::before {
   --progress-color: #d1d5db;
   background-color: var(--progress-color);
}
.status-block.warning::before {
   --progress-color: #f59e0b;
   background-color: var(--progress-color);
}

.text-success {
   color: #29b17f;
}
.text-warning {
   color: #f59e0b;
}
.text-none {
   color: #d1d5db;
}
</style>
