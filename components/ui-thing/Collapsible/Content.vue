<template>
   <CollapsibleContent
      :class="styles({ class: props.class })"
      v-bind="forwarded"
   >
      <slot />
   </CollapsibleContent>
</template>

<script lang="ts" setup>
import { CollapsibleContent } from "reka-ui";
import type { CollapsibleContentProps } from "reka-ui";

const props = defineProps<
  CollapsibleContentProps & {
     /** Customer class(es) to add to the element */
     class?: any
  }
>();
const forwarded = reactiveOmit(props, "class");
const styles = tv({
   base: "overflow-hidden transition will-change-auto data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down",
});
</script>
