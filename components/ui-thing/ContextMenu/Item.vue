<template>
   <ContextMenuItem
      v-bind="forwarded"
      :class="styles({ inset, class: props.class })"
   >
      <slot>
         <span v-if="title">{{ title }}</span>
      </slot>
      <slot name="shortcut">
         <UiThingContextMenuShortcut v-if="shortcut">
            {{ shortcut }}
         </UiThingContextMenuShortcut>
      </slot>
   </ContextMenuItem>
</template>

<script lang="ts" setup>
import { ContextMenuItem, useForwardPropsEmits } from "reka-ui";
import type { ContextMenuItemEmits, ContextMenuItemProps } from "reka-ui";

const props = defineProps<
  ContextMenuItemProps & {
     /** Custom class(es) to add to the element */
     class?: any
     /** Wether an indentation should be added to the item or not */
     inset?: boolean
     /** The shortcut for the item */
     shortcut?: string
     /** The title for the item */
     title?: string
  }
>();

const emits = defineEmits<ContextMenuItemEmits>();
const forwarded = useForwardPropsEmits(
   reactiveOmit(props, "class", "inset", "shortcut", "title"),
   emits,
);

const styles = tv({
   base: "relative flex cursor-pointer select-none items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
   variants: {
      inset: {
         true: "pl-8",
      },
   },
});
</script>
