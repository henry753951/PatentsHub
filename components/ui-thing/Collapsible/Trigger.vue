<template>
   <CollapsibleTrigger v-bind="forwarded">
      <slot />
   </CollapsibleTrigger>
</template>

<script lang="ts" setup>
import { CollapsibleTrigger, useForwardProps } from "reka-ui";
import type { CollapsibleTriggerProps } from "reka-ui";

const props = defineProps<CollapsibleTriggerProps>();
const forwarded = useForwardProps(props);
</script>
