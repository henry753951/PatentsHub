<template>
   <Select
      v-model="modelValue"
      :options="options_"
      option-label="label"
      option-value="value"
      class="w-full"
   >
   </Select>
</template>

<script lang="ts" setup>
import Select from "primevue/select";
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

const options_ = computed(() => {
   const customOptions = [
      ...(modelValue.value && !options.find((o) => o.value === modelValue.value)
         ? [
            {
               label: modelValue.value,
               value: modelValue.value,
            },
         ]
         : []),
      ...options,
   ];

   return customOptions;
});

const modelValue = defineModel({
   type: String,
   default: "",
});
</script>

<style scoped></style>
