<template>
   <NuxtLayout>
      <NuxtPage />
   </NuxtLayout>
</template>

<script lang="ts" setup>
import "overlayscrollbars/overlayscrollbars.css";

const discordService = useDiscord();
provide("discordService", discordService);
const countriesStore = useCountriesStore();
const collegesStore = useCollegesStore();
const fundingPlansStore = useFundingPlansStore();
const agenciesStore = useAgenciesStore();

onMounted(() => {
   countriesStore.refresh();
   collegesStore.refresh();
   fundingPlansStore.refresh();
   agenciesStore.refresh();
});

</script>

<style>
body {
   background-color: #e7ecf3d2;
}

.dark body {
   background-color: rgba(0, 0, 0, 0.85);
}

div {
   transition: background-color 0.3s;
}
</style>
