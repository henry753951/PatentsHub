<script setup lang="ts">
import {
   DialogRoot,
   type DialogRootEmits,
   type DialogRootProps,
   useForwardPropsEmits,
} from "reka-ui";

const { open: open_, ...props } = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();
const open = ref(open_ ?? false);

const onOpenChange = (value: boolean) => {
   open.value = value;
};
const forwarded = useForwardPropsEmits(props, emits);

watchEffect(() => {
   open.value = open_;
});
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
