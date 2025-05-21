<template>
   <input
      v-model="text"
      class="w-full"
      type="text"
   />
</template>

<script lang="ts" setup>
const text = defineModel({
   type: String,
   default: "",
});
</script>

<style scoped></style>
