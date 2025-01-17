<template>
   <div class="flex flex-col h-screen">
      <WindowTitleBar class="bg-white dark:bg-zinc-900" />
      <div class="flex flex-1">
         <SideMenu class="bg-white dark:bg-zinc-900" />
         <div class="inner-page w-full h-full overflow-auto">
            <slot />
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.inner-page {
   border-top-left-radius: 1rem;
}
</style>
