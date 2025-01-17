<template>
   <div class="w-12 p-4">
      {{ data }}
      <Button @click="refresh()">
         Refresh
      </Button>
   </div>
</template>

<script lang="ts" setup>
definePageMeta({
   name: "home",
});
const { $trpc } = useNuxtApp();

const { data, refresh } = useAsyncData("getGreetings", async () => {
   return await $trpc.greeting.query({
      name: "World",
   });
});
</script>

<style></style>
