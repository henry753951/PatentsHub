import type { UseScrollReturn } from "@vueuse/core";
import { ref, onMounted, type ShallowRef } from "vue";
export const useClosestScrollState = (
   viewRef: Readonly<ShallowRef<HTMLDivElement | null>>,
) => {
   const state = ref<UseScrollReturn | null>(null);
   const unwatch = watch(viewRef, () => {
      const scrollContainer = viewRef.value?.closest(
         "[data-overlayscrollbars-contents]",
      );
      if (!scrollContainer) {
         console.warn("No scroll container found", viewRef.value);
         return;
      }
      state.value = useScroll(scrollContainer as HTMLElement);
   });

   onUnmounted(() => {
      unwatch();
   });
   return { state };
};
