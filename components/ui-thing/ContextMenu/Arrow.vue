<template>
  <ContextMenuArrow v-bind="forwarded" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { ContextMenuArrow } from "reka-ui";
  import type { ContextMenuArrowProps } from "reka-ui";

  const props = defineProps<
    ContextMenuArrowProps & {
      /** Custom class(es) to add to teh arrow */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "border bg-muted",
  });
</script>
