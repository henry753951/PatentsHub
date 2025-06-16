<template>
   <select
      v-model="modelValue"
      class="w-full border rounded px-2 py-1"
   >
      <option
         v-for="option in options_"
         :key="option.value"
         :value="option.value"
      >
         {{ option.label }}
      </option>
   </select>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const { options } = defineProps({
   options: {
      type: Array as PropType<
         {
            label: string
            value: string
         }[]
      >,
      default: () => [],
   },
});

const modelValue = defineModel({
   type: String,
   default: "",
});

// 包含當前值但不在原本 options 的情況
const options_ = computed(() => {
   const extra
      = modelValue.value
        && !options.find((o) => o.value === modelValue.value)
         ? [{ label: modelValue.value, value: modelValue.value }]
         : [];

   return [...extra, ...options];
});
</script>

<style scoped></style>
