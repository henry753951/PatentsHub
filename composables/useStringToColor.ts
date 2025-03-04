import { computed } from "vue";

function hashStringToHue(str: string): number {
   let hash = 0;
   for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
   }
   return Math.abs(hash) % 360;
}

export function useStringToColor(text: string) {
   const hue = computed(() => hashStringToHue(text).toString());
   const saturation = "50%";
   const lightness = "60%";
   return computed(() => `hsl(${hue.value}, ${saturation}, ${lightness})`);
}
