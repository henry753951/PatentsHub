<template>
   <UiThingCollapsible
      class="space-y-2"
      :default-open="collapsible ? false : true"
   >
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
      <UiThingCollapsibleContent class="CollapsibleContent space-y-4 pl-2 pb-3">
         <slot />
      </UiThingCollapsibleContent>
   </UiThingCollapsible>
</template>

<script lang="ts" setup>
const props = defineProps<{
   title: string
   collapsible?: boolean
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
