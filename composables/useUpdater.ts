import type { UpdateInfo } from "electron-updater";

export const useUpdater = () => {
   const { $trpc } = useNuxtApp();
   const updateInfo = ref<UpdateInfo | null>(null);

   const checkForUpdates = async () => {
      const result = await $trpc.app.update.checkForUpdates.mutate();
      updateInfo.value = result;
   };

   const quitAndInstall = () => {
      $trpc.app.update.quitAndInstall.mutate();
   };
};
