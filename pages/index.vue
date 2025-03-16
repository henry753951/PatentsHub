<template>
   <div class="container mx-auto">
      <div class="grid grid-cols-1 gap-4">
         <BlockPatentRow
            v-for="patent in data"
            :key="patent.PatentID"
            :patent="patent"
            class="rounded-lg"
            @click="
               open('PatentModal', { props: { patentID: patent.PatentID } })
            "
         />
      </div>
   </div>
</template>

<script lang="ts" setup>
const { open } = useModals();
definePageMeta({
   name: "home",
});

const { data, forceRefresh } = useDatabase().usePatents();
</script>

<style scoped></style>
