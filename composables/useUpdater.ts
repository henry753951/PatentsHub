import type { Unsubscribable } from "@trpc/server/observable";
import type { UpdateInfo } from "electron-updater";
import type { UpdaterStatus } from "~/server/routers/app/update";
import { useStorage } from "@vueuse/core";

export const useUpdater = () => {
   const { $trpc } = useNuxtApp();
   const { open } = useModals();
   const updateStatusBus = useState<Unsubscribable | null>(
      "updateStatusBus",
      () => null,
   );
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
         const currentVersionAbs = await $trpc.app.version.query();
         if (typeof currentVersionAbs !== "string") {
            console.error(
               "Invalid version format from server:",
               currentVersionAbs,
            );
            return;
         }

         if (currentVersionAbs !== "0.0.1") {
            if (currentVersion.value !== currentVersionAbs) {
               consola.success(
                  "新版本可用",
                  "更新版本:",
                  newValue.version,
                  "當前版本:",
                  currentVersion.value,
               );
               currentVersion.value = currentVersionAbs;
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
      if (updateStatusBus.value !== null) return;
      updateStatusBus.value = $trpc.app.update.onStatusChange.subscribe(
         undefined,
         {
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
         },
      );

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
