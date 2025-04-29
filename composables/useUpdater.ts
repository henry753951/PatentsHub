import type { UpdateInfo } from "electron-updater";

export const useUpdater = () => {
   const { $trpc } = useNuxtApp();
   const updateInfo = ref<UpdateInfo | null>(null);

   const checkForUpdates = async () => {
      try {
         const result = await $trpc.app.update.checkForUpdates.mutate();
         updateInfo.value = result;
      }
      catch (error) {
         console.error("Error checking for updates:", error);
         throw "在檢查更新時發生錯誤，請稍後再試。";
      }
   };

   const quitAndInstall = () => {
      $trpc.app.update.quitAndInstall.mutate();
   };

   return {
      updateInfo,
      checkForUpdates,
      quitAndInstall,
   };
};
