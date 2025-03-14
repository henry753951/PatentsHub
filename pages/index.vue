<template>
   <div class="container mx-auto">
      <Button
         @click="
            open('PatentModal', {
               props: {
                  patentId: 1,
               },
            })
         "
      >
         Open Sheet
      </Button>
      <div class="grid grid-cols-1 gap-4">
         <BlockPatentRow
            v-for="i in 10"
            :key="i"
            class="rounded-lg"
         />
      </div>
   </div>
</template>

<script lang="ts" setup>
const { open } = useModals();

definePageMeta({
   name: "home",
});
</script>

<style scoped></style>
