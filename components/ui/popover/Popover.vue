<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from "reka-ui";
import { PopoverRoot, useForwardPropsEmits } from "reka-ui";

const props = defineProps<PopoverRootProps>();
const emits = defineEmits<PopoverRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
const isOpen = ref(false);
provide("popoverState", isOpen);
</script>

<template>
   <PopoverRoot
      v-bind="forwarded"
      v-model:open="isOpen"
   >
      <slot />
   </PopoverRoot>
</template>
