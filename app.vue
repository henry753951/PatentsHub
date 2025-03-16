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
   background-color: #e7ecf3d2;
}

.dark body {
   background-color: rgba(0, 0, 0, 0.85);
}

div {
   transition: background-color 0.3s;
}
</style>
