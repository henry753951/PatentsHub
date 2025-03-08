<template>
   <div>
      <p class="text-sm text-gray-500">
         {{ title }}
      </p>
      <p class="font-bold">
         <slot />
      </p>
   </div>
</template>

<script lang="ts" setup>
const { title = undefined } = defineProps({
   title: String,
});
</script>

<style scoped></style>
