<template>
  <ContextMenuLabel :class="styles({ inset, class: props.class })" v-bind="forwarded">
    <slot>{{ label }}</slot>
  </ContextMenuLabel>
</template>

<script lang="ts" setup>
  import { ContextMenuLabel } from "reka-ui";
  import type { ContextMenuLabelProps } from "reka-ui";

  const props = defineProps<
    ContextMenuLabelProps & {
      /**Custom class(es) to add to the element */
      class?: any;
      /** Wether an indentation should be added to the item or not */
      inset?: boolean;
      /** The label for the item */
      label?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "inset", "label");
  const styles = tv({
    base: "inline-block w-full px-2 py-1.5 text-sm font-semibold text-foreground",
    variants: {
      inset: { true: "pl-8" },
    },
  });
</script>
