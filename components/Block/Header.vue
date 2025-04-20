<template>
   <header>
      <div
         class="flex flex-col md:flex-row items-start md:items-center gap-4"
      >
         <div class="mr-5">
            <h1 class="text-2xl font-bold">
               {{ title }}
            </h1>
            <p
               v-if="description"
               class="text-zinc-600 dark:text-zinc-400"
            >
               {{ description }}
            </p>
         </div>
         <div class="flex gap-4 items-center flex-1 justify-end">
            <slot />
         </div>
      </div>
   </header>
</template>

<script lang="ts" setup>
const props = defineProps<{
   title: string
   description?: string
}>();
</script>

<style scoped></style>
