import type { UseScrollReturn } from "@vueuse/core";
import { ref, onMounted } from "vue";
export const useClosestScrollState = (refName: string) => {
   const viewRef = useTemplateRef<HTMLDivElement>(refName);
   const state = ref<UseScrollReturn | null>(null);
   onMounted(() => {
      const scrollContainer = viewRef.value?.closest(
         "[data-overlayscrollbars-contents]",
      );
      if (!scrollContainer) return;
      state.value = useScroll(scrollContainer as HTMLElement);
   });
   return state;
};
