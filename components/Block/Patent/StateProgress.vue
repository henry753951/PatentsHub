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
import { ref, computed } from "vue";
import { format } from "date-fns";
import type { usePatentStatus } from "@/composables/database/patent/status";
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
   return statusService.status.value.some(
      (s) =>
         s.active && (s.status === "MANUAL_STOPED" || s.status === "EXPIRED"),
   );
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
