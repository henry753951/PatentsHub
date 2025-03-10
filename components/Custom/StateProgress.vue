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
            :key="item.title"
            :delay-duration="100"
            :disabled="!tooltipEnable"
         >
            <Tooltip>
               <TooltipTrigger

                  class="status-block flex flex-col items-start gap-2"
                  :style="{
                     width: item.width,
                  }"
                  :class="{
                     success: item.type === 'success',
                     none: item.type === 'none',
                     warning: item.type === 'warning',
                     'flex-1':
                        index === stateProgress.length - 1 && !item.width,
                  }"
               >
                  <span class="font-bold text-sm">{{ item.title }}</span>
               </TooltipTrigger>

               <TooltipContent v-if="item.date">
                  <p>{{ item.date }}</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </div>
   </div>
</template>

<script setup lang="ts">
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
const tooltipEnable = ref(false);
const stateProgress = ref([
   {
      title: "登錄",
      date: "2023-01-04",
      type: "success",
   },
   {
      title: "初評",
      date: "2023-01-04",
      type: "success",
   },
   {
      title: "已獲證",
      date: "2023-01-04",
      width: "30%",
      type: "success",
      current: true,
   },
   {
      title: "到期",
      date: "2023-01-06",
      type: "none",
   },
   {
      type: "none",
   },
]);

const currentState = computed(() => {
   const current = stateProgress.value.find((item) => item.current);
   if (!current) return null;
   return {
      title: current.title,
      date: current.date,
      type: current.type,
   };
});
</script>

<style scoped>
.status-block > span {
   margin-right: 1.9rem;
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
