<template>
   <div></div>
</template>

<script lang="ts" setup>
const patent = defineModel({
   type: Object as PropType<RouterOutput["data"]["patent"]["getPatent"]>,
   required: true,
});

const cacheData = ref<RouterOutput["data"]["patent"]["getPatent"] | null>(null);

watch(
   () => patent.value,
   (value) => {
      cacheData.value = value;
   },
   { immediate: true },
);
</script>

<style scoped></style>
