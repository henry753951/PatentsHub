<template>
   <Select
      v-model="patentType"
      :options="patentTypes"
      option-label="label"
   />
</template>

<script lang="ts" setup>
import Select from "primevue/select";

const patentType = defineModel({
   type: String as PropType<"INVENTION" | "UTILITY_MODEL" | "DESIGN" | "PLANT" | null>,
   required: true,
});

const patentTypes = ref([
   { label: "發明專利", value: "INVENTION" },
   { label: "新型專利", value: "UTILITY_MODEL" },
   { label: "設計專利", value: "DESIGN" },
   { label: "植物專利", value: "PLANT" },
]);

</script>

<style scoped></style>
