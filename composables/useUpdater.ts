import type { Unsubscribable } from "@trpc/server/observable";
import type { UpdateInfo } from "electron-updater";
import type { UpdaterStatus } from "~/server/routers/app/update";
import { useStorage } from "@vueuse/core";

export const useUpdater = () => {
   const { $trpc } = useNuxtApp();
   const { open } = useModals();
   let updateStatusBus: Unsubscribable;
   const updateStatus = useState<UpdaterStatus | null>(
      "updateStatus",
      () => null,
   );
   const updateInfo = useState<UpdateInfo | null>("updateInfo", () => null);
   const currentVersion = useStorage("currentVersion", () => {
      return "0.0.1";
   });

   watch(
      () => updateInfo.value,
      async (newValue) => {
         if (!newValue) return;
         const _currentVersion = await $trpc.app.version.query();
         if (_currentVersion !== "0.0.1") {
            if (currentVersion.value !== _currentVersion) {
               currentVersion.value = _currentVersion;
               open("UpdateLogsModal", {
                  props: {
                     updateInfo: newValue,
                  },
               });
            }
         }
      },
   );

   onMounted(async () => {
      updateStatusBus = $trpc.app.update.onStatusChange.subscribe(undefined, {
         onData: (data) => {
            updateStatus.value = data;
            if (data.type === "update-available") {
               updateInfo.value = data.data;
            }
            else if (data.type === "update-not-available") {
               updateInfo.value = data.data;
            }
            else if (data.type === "error") {
               updateInfo.value = null;
               console.error("Update error:", data.data);
            }
            else if (data.type === "download-progress") {
               updateInfo.value = null;
            }
            else if (data.type === "update-downloaded") {
               updateInfo.value = data.data;
               console.log("Update downloaded, ready to install.");
            }
         },
      });

      if (
         updateInfo.value === null
         && updateStatus.value?.type !== "download-progress"
      ) {
         try {
            await checkForUpdates();
         }
         catch (error) {
            console.error("Error checking for updates on mount:", error);
         }
      }
   });
   onUnmounted(() => {
      if (updateStatusBus) {
         updateStatusBus.unsubscribe();
      }
   });

   const checkForUpdates = async () => {
      try {
         await $trpc.app.update.checkForUpdates.mutate();
      }
      catch (error) {
         console.error("Error checking for updates:", error);
         throw "在檢查更新時發生錯誤，請稍後再試。";
      }
   };

   const quitAndInstall = async () => {
      await $trpc.app.update.quitAndInstall.mutate();
   };

   return {
      updateInfo,
      currentVersion,
      updateStatus,
      checkForUpdates,
      quitAndInstall,
   };
};
