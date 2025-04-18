<template>
   <div
      class="bg-white rounded-lg p-4 space-y-2 mt-7 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800"
   >
      <div class="flex justify-between">
         <div class="font-bold">
            狀態
         </div>
         <div
            class="font-extrabold transition"
            :class="{
               'text-success text-lg': currentState?.type === 'success',
               'text-warning text-lg': currentState?.type === 'warning',
               'text-none text-lg': currentState?.type === 'none',
            }"
         >
            {{ currentState?.title }}
         </div>
      </div>

      <div class="w-full flex gap-1">
         <!-- 狀態項目 -->
         <div class="flex flex-1 gap-1 pt-7">
            <TooltipProvider
               v-for="(item, index) in stateProgress"
               :key="item.status + '-' + index"
               :delay-duration="50"
            >
               <Tooltip>
                  <TooltipTrigger
                     class="status-block flex flex-col gap-2 cursor-pointer"
                     :class="{
                        success: item.type === 'success',
                        none: item.type === 'none',
                        warning: item.type === 'warning',
                     }"
                     @click="
                        item.status === 'MANUAL' &&
                           handleEditCustomStatus(item.raw)
                     "
                  >
                     <span
                        class="font-bold text-sm"
                        :title="item.title"
                     >{{ item.title }}</span>
                  </TooltipTrigger>
                  <TooltipContent v-if="item.date">
                     <p>{{ format(item.date, "yyyy-MM-dd") }}</p>
                     <CustomTimeAgo :time="item.date" />
                     <div
                        v-if="item.status === 'MANUAL'"
                        class="mt-2 flex gap-2 text-xs"
                     >
                        <button
                           class="px-2 py-0.5 rounded-md transition shadow-sm hover:shadow-md bg-white text-gray-800 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-100 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
                           @click.stop="handleEditCustomStatus(item.raw)"
                        >
                           編輯
                        </button>
                        <button
                           class="px-2 py-0.5 rounded-md transition shadow-sm hover:shadow-md bg-white text-red-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-red-400 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
                           @click.stop="handleDeleteCustomStatus(item.raw)"
                        >
                           刪除
                        </button>
                     </div>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>
         <!-- + 按鈕 -->
         <TooltipProvider :delay-duration="50">
            <Tooltip>
               <TooltipTrigger
                  class="flex items-center justify-center px-1"
                  @click.stop="handleAddCustomStatus"
               >
                  <Button
                     variant="ghost"
                     size="icon"
                     class="w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md dark:bg-zinc-800 dark:border-zinc-700"
                  >
                     <Icon
                        name="material-symbols:add-2-rounded"
                        class="text-[24px] text-gray-400 dark:text-zinc-500"
                     />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  <p>新增自訂狀態</p>
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
   const reversed = [...stateProgress.value].reverse();
   return reversed.find((item) => item.active) || null;
}); // 最後一個 active 的狀態

const customStatusSchema = z.object({
   reason: z.string().min(1, "狀態名稱不可為空"),
   date: z.date().optional(),
   override: z.boolean().default(false),
});

const customStatusFields: Config<z.infer<typeof customStatusSchema>> = {
   reason: {
      label: "狀態名稱",
   },
   override: { label: "置於標準流程之後", component: "switch" },
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
            override: data.override ?? false,
         });
         await statusService.refreshCallback?.();
      },
      customStatusFields,
      undefined,
      {
         reason: "",
         date: new Date(),
         override: false,
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
            override: data.override ?? false,
         });
         await statusService.refreshCallback?.();
      },
      customStatusFields,
      undefined,
      {
         reason: manual.reason,
         date: manual.date ? new Date(manual.date) : new Date(),
         override: manual.Override ?? false,
      },
   );
};

const handleDeleteCustomStatus = async (manual: any) => {
   openAutoModal(
      "刪除確認",
      "確定要刪除這個狀態嗎？此操作無法復原。",
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
.status-block {
   flex: 1 1 0%;
   min-width: 0;
}

.status-block > span {
   font-size: 0.9rem;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   max-width: 100%;
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
