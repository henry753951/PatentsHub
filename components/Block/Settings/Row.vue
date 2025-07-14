<template>
   <UiThingCollapsible :default-open="collapsible ? false : true">
      <div class="flex items-center justify-between">
         <div class="flex items-center space-x-2">
            <h1 class="text-xl font-semibold">
               {{ title }}
            </h1>
            <div class="flex items-center">
               <slot name="title-tail" />
            </div>
         </div>
         <UiThingCollapsibleTrigger
            v-if="collapsible"
            as-child
         >
            <UiThingButton
               variant="ghost"
               size="sm"
               class="w-9 p-0"
            >
               <Icon
                  name="i-heroicons-chevron-down-solid"
                  class="w-5 h-5"
               />
            </UiThingButton>
         </UiThingCollapsibleTrigger>
      </div>
      <UiThingCollapsibleContent class="CollapsibleContent px-2 py-3 relative">
         <div class="space-y-4">
            <slot />
         </div>
         <div
            v-if="disabled"
            class="rounded-lg backdrop-blur-[2px] h-full w-full absolute inset-0 top-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800 bg-opacity-50"
         >
            <span class="text-gray-500 dark:text-gray-400">
               {{ disabledText || "此功能已停用" }}
            </span>
         </div>
      </UiThingCollapsibleContent>
   </UiThingCollapsible>
</template>

<script lang="ts" setup>
const props = defineProps<{
   title: string
   collapsible?: boolean
   disabled?: boolean
   disabledText?: string
}>();
</script>

<style scoped>
.CollapsibleContent {
   overflow: hidden;
}
.CollapsibleContent[data-state="open"] {
   animation: slideDown 300ms ease-out;
}
.CollapsibleContent[data-state="closed"] {
   animation: slideUp 300ms ease-out;
}

@keyframes slideDown {
   from {
      height: 0;
   }
   to {
      height: var(--reka-collapsible-content-height);
   }
}

@keyframes slideUp {
   from {
      height: var(--reka-collapsible-content-height);
   }
   to {
      height: 0;
   }
}
</style>
