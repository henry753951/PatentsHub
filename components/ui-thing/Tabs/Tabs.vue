<template>
  <TabsRoot v-bind="forwarded">
    <slot />
  </TabsRoot>
</template>

<script lang="ts" setup>
  import { TabsRoot, useForwardPropsEmits } from "reka-ui";
  import type { TabsRootEmits, TabsRootProps } from "reka-ui";

  const props = withDefaults(defineProps<TabsRootProps>(), {
    orientation: "horizontal",
    activationMode: "automatic",
  });
  const emits = defineEmits<TabsRootEmits>();
  const forwarded = useForwardPropsEmits(props, emits);
</script>
