<template>
   <div
      class="bg-white rounded-lg p-4 space-y-2 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800"
   >
      <div class="flex justify-between">
         <div>狀態</div>
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
      </div>
      <div
         class="w-full flex gap-1"
         @mouseover="tooltipEnable = true"
         @mouseleave="tooltipEnable = false"
      >
         <TooltipProvider
            v-for="(item, index) in stateProgress"
            :key="item.status"
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
                     'cursor-pointer': item.status === 'MANUAL',
                  }"
                  @click.stop="item.status === 'MANUAL' && handleEditCustomStatus(item.raw)"
               >
                  <span class="font-bold text-sm mr-4">{{ item.title }}</span>
               </TooltipTrigger>
               <TooltipContent v-if="item.date">
                  <p>{{ format(item.date, "yyyy-MM-dd") }}</p>
                  <CustomTimeAgo :time="item.date" />

                  <div
                     v-if="item.status === 'MANUAL'"
                     class="mt-2 flex gap-2 text-xs"
                  >
                     <button
                        class="px-2 py-0.5 rounded-md transition shadow-sm hover:shadow-md
             bg-white text-gray-800 hover:bg-gray-200
             dark:bg-zinc-800 dark:text-gray-100 dark:hover:bg-zinc-700
             border border-gray-200 dark:border-zinc-700"
                        @click.stop="handleEditCustomStatus(item.raw)"
                     >
                        編輯
                     </button>
                     <button
                        class="px-2 py-0.5 rounded-md transition shadow-sm hover:shadow-md
             bg-white text-red-600 hover:bg-gray-200
             dark:bg-zinc-800 dark:text-red-400 dark:hover:bg-zinc-700
             border border-gray-200 dark:border-zinc-700"
                        @click.stop="handleDeleteCustomStatus(item.raw)"
                     >
                        刪除
                     </button>
                  </div>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <TooltipProvider
            v-if="!isStopped"
            :delay-duration="100"
            :disabled="!tooltipEnable"
         >
            <Tooltip>
               <TooltipTrigger
                  class="status-block flex-1 none cursor-pointer"
                  @click.stop="handleAddCustomStatus"
               >
                  <span class="font-bold text-sm mr-4">新增狀態</span>
               </TooltipTrigger>
               <TooltipContent>
                  <p>點擊以新增自訂狀態</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </div>
   </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import type { usePatentStatus } from "@/composables/database/patent/status";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { z } from "zod";
import type { Config } from "~/components/ui/auto-form/interface";
import { CalendarDateTime, getLocalTimeZone } from "@internationalized/date";

const tooltipEnable = ref(false);

const { statusService } = defineProps<{
   statusService: ReturnType<typeof usePatentStatus>
}>();

const { openAutoModal } = useModals();

const stateProgress = computed(() => {
   const order = {
      SIGNED: 0,
      REVIEWED: 1,
      CERTIFIED: 2,
      EXPIRED: 3,
      MANUAL: 4,
   };

   const manual = [] as typeof statusService.status.value;
   const others = [] as typeof statusService.status.value;

   for (const s of statusService.status.value) {
      if (s.status === "MANUAL") {
         manual.push(s);
      }
      else {
         others.push(s);
      }
   }

   // 先按固定順序排 base，再把 manual 按日期排後接上
   const sortedOthers = [...others].sort((a, b) => {
      return order[a.status] - order[b.status];
   });

   const sortedManual = [...manual].sort((a, b) => {
      const aTime = a.date instanceof Date ? a.date.getTime() : Infinity;
      const bTime = b.date instanceof Date ? b.date.getTime() : Infinity;
      return aTime - bTime;
   });

   return [...sortedOthers, ...sortedManual].map((s) => ({
      status: s.status,
      date: s.date,
      type: s.active
         ? s.status === "EXPIRED"
            ? "warning"
            : "success"
         : "none",
      title: s.reason || s.status,
      active: s.active,
      raw: s,
   }));
});

const isStopped = computed(() => {
   const isExpired = stateProgress.value.some(
      (item) => item.status === "EXPIRED" && item.active,
   );
   const isLastManual
      = stateProgress.value[stateProgress.value.length - 1].status === "MANUAL"
        && stateProgress.value[stateProgress.value.length - 1].active;
   return isExpired || isLastManual;
});

const currentState = computed(() => {
   return stateProgress.value.find((item) => item.active) || null;
});

const customStatusSchema = z.object({
   reason: z.string().min(1, "狀態名稱不可為空"),
   date: z.date().optional(),
});

const customStatusFields: Config<z.infer<typeof customStatusSchema>> = {
   reason: {
      label: "狀態名稱",
   },
   date: {
      label: "發生日期",
   },
};

const handleAddCustomStatus = async () => {
   openAutoModal(
      "新增自訂狀態",
      "請填寫狀態名稱與日期",
      customStatusSchema,
      async (data) => {
         await statusService.addManualStatus?.({
            reason: data.reason,
            date: data.date
               ? new Date(
                  data.date.getFullYear(),
                  data.date.getMonth(),
                  data.date.getDate(),
                  data.date.getHours(),
                  data.date.getMinutes(),
                  data.date.getSeconds(),
                  data.date.getMilliseconds(),
               )
               : undefined,
         });
         await statusService.refreshCallback?.();
      },
      customStatusFields,
      undefined,
      {
         reason: "",
         date: new Date(),
      },
   );
};

const handleEditCustomStatus = (manual: any) => {
   openAutoModal(
      "編輯自訂狀態",
      "修改狀態名稱與日期",
      customStatusSchema,
      async (data) => {
         await statusService.updateManualStatus?.({
            ManualStatusID: manual.ManualStatusID,
            reason: data.reason,
            date: data.date
               ? new Date(
                  data.date.getFullYear(),
                  data.date.getMonth(),
                  data.date.getDate(),
                  data.date.getHours(),
                  data.date.getMinutes(),
                  data.date.getSeconds(),
                  data.date.getMilliseconds(),
               )
               : undefined,
         });
         await statusService.refreshCallback?.();
      },
      customStatusFields,
      undefined,
      {
         reason: manual.reason,
         date: manual.date ? new Date(manual.date) : new Date(),
      },
   );
};

const handleDeleteCustomStatus = async (manual: any) => {
   openAutoModal(
      "刪除確認",
      `確定要刪除狀態 ${manual.reason} 嗎？此操作無法復原。`,
      z.object({}),
      async () => {
         await statusService.removeManualStatus?.(manual.ManualStatusID);
         await statusService.refreshCallback?.();
      },
      {},
   );
};

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
