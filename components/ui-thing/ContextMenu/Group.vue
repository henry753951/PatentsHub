<template>
  <ContextMenuGroup v-bind="props">
    <slot />
  </ContextMenuGroup>
</template>

<script lang="ts" setup>
  import { ContextMenuGroup } from "reka-ui";
  import type { ContextMenuGroupProps } from "reka-ui";

  const props = defineProps<ContextMenuGroupProps>();
</script>
