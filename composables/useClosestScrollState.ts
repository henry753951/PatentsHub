import type { UseScrollReturn } from "@vueuse/core";
import { ref, onMounted, type ShallowRef } from "vue";
export const useClosestScrollState = (
   viewRef: Readonly<ShallowRef<HTMLDivElement | null>>,
) => {
   const state = ref<UseScrollReturn | null>(null);
   onMounted(() => {
      const scrollContainer = viewRef.value?.closest(
         "[data-overlayscrollbars-contents]",
      );
      if (!scrollContainer) {
         console.warn("No scroll container found", viewRef.value);
         return;
      }
      state.value = useScroll(scrollContainer as HTMLElement);
   });
   return state;
};
