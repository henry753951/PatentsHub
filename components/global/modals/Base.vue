<template>
   <component
      :is="modalName"
      v-model:open="isOpen"
      :props="props"
   />
</template>

<script setup lang="ts">
const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const { modalName, props } = defineProps<{
   modalName: string
   props: Record<string, any>
}>();

const emits = defineEmits<{
   (e: "close"): void
}>();

watch(
   () => isOpen.value,
   (newVal) => {
      if (!newVal) {
         setTimeout(() => {
            emits("close");
         }, 500);
      }
   },
);
</script>
