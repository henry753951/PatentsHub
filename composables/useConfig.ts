import { ConfigFile } from "~/zod.dto";

export const useConfig = (onChangeCallback?: () => void) => {
   const { $trpc } = useNuxtApp();
   const config = useState("config", () => ConfigFile.parse(undefined));

   const readConfig = async () => {
      try {
         const data = await $trpc.app.config.readConfig.query();
         config.value = data || ConfigFile.parse(undefined);
         return data;
      }
      catch (error) {
         console.error("Failed to read config:", error);
         return null;
      }
   };

   const stop = watch(
      () => config.value,
      async (newConfig, oldConfig) => {
         try {
            if (onChangeCallback) onChangeCallback();
            await $trpc.app.config.writeConfig.mutate(newConfig);
         }
         catch (error) {
            console.error("Failed to update config:", error);
         }
      },
      { deep: true },
   );

   onMounted(async () => {
      await readConfig();
   });

   onUnmounted(() => {
      stop();
   });

   return {
      config: reactive(config),
      readConfig,
   };
};
