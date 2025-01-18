<template>
   <div class="flex flex-col max-h-screen h-screen overflow-hidden">
      <WindowTitleBar class="bg-white dark:bg-zinc-900" />
      <div class="flex flex-1 min-h-0">
         <SideMenu class="bg-white dark:bg-zinc-900" />
         <div class="inner-page w-full h-full">
            <OverlayScrollbarsComponent
               :options="{ scrollbars: { autoHide: 'leave' } }"
               class="p-2 container"
            >
               <slot />
            </OverlayScrollbarsComponent>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
</script>

<style scoped>
.inner-page {
   border-top-left-radius: 15px;
   height: 100%;
}
</style>
