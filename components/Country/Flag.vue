<script setup lang="ts">
const props = defineProps<{
   name: string;
   isocode: string;
}>();
const uppercaseIsoCode = computed(() => props.isocode.toUpperCase());
</script>

<template>
   <div
      class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/4 top-0 w-1/4"
   >
      <div class="flex items-center justify-center h-full w-full">
         <img :src="`https://flagsapi.com/${uppercaseIsoCode}/flat/64.png`" />
      </div>
   </div>
</template>
