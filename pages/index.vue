<template>
   <div class="container mx-auto">
      <Button
         @click="
            open('PatentModal', {
               props: {},
            })
         "
      >
         Open Sheet
      </Button>
   </div>
</template>

<script lang="ts" setup>
const { open } = useModals();

definePageMeta({
   name: "home",
});
</script>

<style></style>
