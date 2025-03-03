<script setup lang="ts">
const props = defineProps<{
   name: string;
}>();
</script>

<template>
   <div
      class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/4 top-0 w-1/4"
   >
      <div class="flex items-center justify-center h-full w-full">
         <Icon
            :name="`openmoji:flag-${props.name}`"
            class="w-32 h-20"
         />
      </div>
   </div>
</template>
