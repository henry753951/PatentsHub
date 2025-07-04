import { useStorage } from "@vueuse/core";

export const useDebug = () => {
   const isForceDebugMode = useStorage("forceDebugMode", false, localStorage);
   const isProduction = computed(() => {
      return import.meta.env.PROD;
   });

   return {
      isForceDebugMode,
      isDebugMode: computed({
         get: () => isForceDebugMode.value || !isProduction.value,
         set: (value) => {
            isForceDebugMode.value = value;
         },
      }),
      isProduction,
   };
};
