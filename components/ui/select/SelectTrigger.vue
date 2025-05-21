<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-vue-next";
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
   const { class: _, ...delegated } = props;

   return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
   <SelectTrigger
      v-bind="forwardedProps"
      :class="cn(
         'flex w-full items-center justify-between rounded-md border-input bg-background px-3 py-2 text-sm data-[placeholder]:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start',
         props.class,
      )"
   >
      <slot />
      <SelectIcon as-child>
         <ChevronDown class="w-4 h-4 mt-[0.7px] opacity-50 shrink-0" />
      </SelectIcon>
   </SelectTrigger>
</template>
