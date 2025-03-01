<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from "radix-vue";
import { TabsRoot, useForwardPropsEmits } from "radix-vue";

const currentTab = defineModel("value", {
   type: String,
   default: "",
});

const props = defineProps<{
   options: {
      label: string
      value: string
   }[]
}>();
</script>

<template>
   <TabsRoot
      v-if="props.options"
      v-model="currentTab"
      class="select-none"
   >
      <TabsList class="w-full  dark:bg-[#18181f] bg-zinc-50">
         <TabsTrigger
            v-for="tab in props.options"
            :key="tab.value"
            :value="tab.value"
            class="w-full rounded-lg"
         >
            {{ tab.label }}
         </TabsTrigger>
      </TabsList>
   </TabsRoot>
</template>
