<template>
   <NuxtLayout>
      <NuxtPage />
   </NuxtLayout>
</template>

<script lang="ts" setup>
import "overlayscrollbars/overlayscrollbars.css";
</script>

<style>
body {
   background-color: rgba(240, 240, 240, 0.7);
}

.dark body {
   background-color: rgba(0, 0, 0, 0.85);
}

div {
   transition: background-color 0.3s;
}
</style>
