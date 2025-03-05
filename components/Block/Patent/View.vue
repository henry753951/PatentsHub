<template>
   <div></div>
</template>

<script lang="ts" setup>
const title = computed(() => {
   if (!patent.value) return { english: "", native: "" };
   return {
      english: patent.value.TitleEnglish,
      native: patent.value.Title ?? patent.value.DraftTitle,
   };
});
const patent = ref<RouterOutput["data"]["patent"]["getPatent"]>({
   PatentID: 1,
   Year: "2023",
   InternalID: "12345",
   Title: "Title",
   DraftTitle: "DraftTitle",
   TitleEnglish: "TitleEnglish",
   inventors: [],
   technical: {
      PatentID: 0,
      MaturityLevel: null,
      keywords: [],
   },
   DepartmentID: 0,
   CollegeID: 0,
   application: {
      PatentID: 0,
      country: null,
      CountryID: null,
      PatentType: null,
      PatentNumber: null,
      ApplicationNumber: null,
      FilingDate: null,
      PublicationDate: null,
   },
});
</script>

<style scoped></style>
