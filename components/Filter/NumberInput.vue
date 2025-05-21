<template>
   <input
      v-model="text"
      class="w-full"
      type="number"
   />
</template>

<script lang="ts" setup>
const text = defineModel({
   type: Number,
   default: 0,
});
</script>

<style scoped></style>
