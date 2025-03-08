<template>
   <TooltipProvider :delay-duration="200">
      <Tooltip>
         <TooltipTrigger
            class="p-2 flex justify-center items-center bg-zinc-100 dark:bg-zinc-800 rounded-full w-9 h-9 hover:bg-zinc-200 dark:hover:bg-zinc-700"
         >
            <Icon :name="props.icon" />
         </TooltipTrigger>
         <TooltipContent
            v-if="props.tooltip"
            side="right"
         >
            <p>{{ props.tooltip }}</p>
         </TooltipContent>
      </Tooltip>
   </TooltipProvider>
</template>

<script lang="ts" setup>
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
const props = defineProps<{
   icon: string
   tooltip?: string
}>();
</script>

<style scoped>
</style>
