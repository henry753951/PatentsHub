<script setup lang="ts">
import {
   DialogRoot,
   type DialogRootEmits,
   type DialogRootProps,
   useForwardPropsEmits,
} from "reka-ui";

const { ...props } = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();
const open = defineModel("open", {
   type: Boolean,
   default: false,
});

const onOpenChange = (value: boolean) => {
   open.value = value;
};
const forwarded = useForwardPropsEmits(props, emits);

provide("onOpenChange", onOpenChange);
</script>

<template>
   <DialogRoot
      v-bind="forwarded"
      :open="open"
   >
      <slot />
   </DialogRoot>
</template>
