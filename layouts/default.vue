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
            <div
               ref="viewportRef"
               class="h-full w-full scrollarea"
            >
               <slot />
            </div>
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
const el = useTemplateRef("el");
const viewportRef = useTemplateRef<HTMLElement>("viewportRef");
provide("viewportRef", viewportRef);
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

.scrollarea {
   overflow: auto;
   /* Scrollbar Styling */
}
.scrollarea::-webkit-scrollbar {
   width: 7px;
}

.scrollarea::-webkit-scrollbar-track {
   background-color: #ebebebab;
   -webkit-border-radius: 10px;
   border-radius: 10px;
}

.scrollarea::-webkit-scrollbar-thumb {
   -webkit-border-radius: 10px;
   border-radius: 10px;
   background: #6d6d6d;
}
</style>
