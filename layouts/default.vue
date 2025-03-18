<template>
   <div class="flex flex-col max-h-screen h-screen overflow-hidden">
      <BlockWindowTitleBar class="bg-white dark:bg-zinc-900" />
      <div class="flex flex-1 min-h-0">
         <BlockSideMenu class="bg-white dark:bg-zinc-900" />
         <div class="inner-page w-full h-full">
            <OverlayScrollbarsComponent
               :options="{ scrollbars: { autoHide: 'leave' } }"
               class="h-full w-full"
            >
               <slot />
            </OverlayScrollbarsComponent>
         </div>
      </div>
      <ClientOnly>
         <ModalsService />
         <Toaster position="top-center" />
      </ClientOnly>
   </div>
</template>

<script lang="ts" setup>
import { Toaster } from "@/components/ui/sonner";
import { ModalsService } from "#components";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
</script>

<style scoped>
.inner-page {
   border-top-left-radius: 15px;
}
</style>
