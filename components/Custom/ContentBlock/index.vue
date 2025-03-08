<template>
   <div>
      <h3
         v-if="title"
         class="text-lg font-extrabold text-gray-700 sticky top-[87px] self-start bg-white py-3"
      >
         {{ title }}
      </h3>
      <div class="bg-gray-100 p-4 rounded-md">
         <div class="grid grid-cols-1 gap-4">
            <slot />
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
const { title = undefined } = defineProps({
   title: String,
});
</script>

<style scoped></style>
