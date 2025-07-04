<template>
  <ContextMenuSeparator :class="styles({ class: props.class })" v-bind="props" />
</template>

<script lang="ts" setup>
  import { ContextMenuSeparator } from "reka-ui";
  import type { ContextMenuSeparatorProps } from "reka-ui";

  const props = defineProps<
    ContextMenuSeparatorProps & {
      /**Custom class(es) to add to the element */
      class?: any;
    }
  >();

  const styles = tv({
    base: "-mx-1 my-1 h-px bg-border",
  });
</script>
