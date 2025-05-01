<template>
   <div class="flex flex-col max-h-screen h-screen overflow-hidden">
      <BlockWindowTitleBar class="bg-white dark:bg-zinc-900" />
      <div class="flex flex-1 min-h-0">
         <div>
            <BlockSideMenu class="bg-white dark:bg-zinc-900" />
         </div>
         <div
            ref="el"
            class="inner-page flex-1 h-full w-full overflow-hidden"
         >
            <ScrollArea class="h-full w-full scrollarea">
               <slot />
            </ScrollArea>
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
import { ScrollArea } from "@/components/ui/scroll-area";
const el = useTemplateRef("el");
const { width, height } = useElementSize(el);
watch([width, height], ([w, h]) => {
   if (w > 0 && h > 0) {
      document.documentElement.style.setProperty(
         "--content-area-width",
         `${w}px`,
      );
      document.documentElement.style.setProperty(
         "--content-area-height",
         `${h}px`,
      );
   }
});
</script>

<style scoped>
.inner-page {
   border-top-left-radius: 15px;
}
</style>
