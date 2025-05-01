<template>
   <Select
      v-model="fundingPlan"
      :options="plans.sort((a, b) => a.Name.localeCompare(b.Name))"
      option-label="Name"
      size="small"
   />
</template>

<script lang="ts" setup>
import Select from "primevue/select";

const fundingPlan = defineModel({
   type: Object as PropType<
      RouterOutput["data"]["fundingPlan"]["getAllFundingPlans"][number] | null
   >,
   required: true,
});

const fundingPlansStore = useFundingPlansStore();
const { plans } = storeToRefs(fundingPlansStore);

onMounted(() => {
   fundingPlansStore.refresh();
});
</script>

<style scoped></style>
