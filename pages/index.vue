<template>
   <div class="container mx-auto py-3">
      <Button
         @click="
            open('PatentCreateModal', {
               props: {},
            })
         "
      >
         建立專利
      </Button>
      <div class="grid grid-cols-1 gap-4">
         <BlockPatentRow
            v-for="patent in data"
            :key="patent.PatentID"
            :patent="patent"
            class="rounded-lg"
            @click="
               open('PatentModal', { props: { patentId: patent.PatentID } })
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

const { data, forceRefresh } = useDatabasePatents();
</script>

<style scoped></style>
