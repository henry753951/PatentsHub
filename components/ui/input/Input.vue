<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
   defaultValue?: any
   modelValue?: any
   class?: HTMLAttributes["class"]
}>();

const emits = defineEmits<{
   (e: "update:modelValue", payload: any): void
}>();

const modelValue = useVModel(props, "modelValue", emits, {
   passive: true,
   defaultValue: props.defaultValue,
});
</script>

<template>
   <input
      v-model="modelValue"
      :class="cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50', props.class)"
   >
</template>
