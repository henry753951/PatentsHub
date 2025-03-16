<template>
   <Select
      v-model="country"
      :options="countries"
      option-label="CountryName"
   />
</template>

<script lang="ts" setup>
import Select from "primevue/select";

const country = defineModel({
   type: Object as PropType<
      RouterOutput["data"]["country"]["getAllContries"][0] | null
   >,
   required: true,
});

const countriesStore = useCountriesStore();
const { countries } = storeToRefs(countriesStore);

onMounted(async () => {
   await countriesStore.refresh();
});
</script>

<style scoped></style>
