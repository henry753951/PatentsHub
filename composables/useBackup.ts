import { toast } from "vue-sonner";

// composables/useBackup.js
export const useBackup = () => {
   const { $trpc } = useNuxtApp();
   const isBackuping = useState("isBackuping", () => false);
   const isRestoring = useState("isRestoring", () => false);
   const { data: cloudBackups, refresh: refreshCloudBackups } = useAsyncData(
      "getCloudBackups",
      async () => await $trpc.app.discord.actions.getBackups.mutate({}),
   );
   const { data: currentDBInfo, refresh: refreshCurrentDBInfo } = useAsyncData(
      "getCurrentDBInfo",
      async () => await $trpc.app.discord.actions.getCurrentDBInfo.mutate({}),
   );

   const deleteBackup = async (backupId: string) => {
      try {
         await $trpc.app.discord.actions.deleteBackup.mutate({ backupId });
         toast.success("備份刪除成功");
         await refreshCloudBackups();
      }
      catch (error) {
         toast.error("備份刪除失敗");
         console.error("刪除備份失敗:", error);
      }
   };

   const createBackup = async () => {
      isBackuping.value = true;
      try {
         consola.info("創建備份中...");
         await $trpc.app.discord.actions.createBackup.mutate({});
         await refreshCloudBackups();
         toast.success("備份創建成功");
      }
      catch (error) {
         toast.error("備份創建失敗");
         console.error("創建備份失敗:", error);
      }
      isBackuping.value = false;
   };

   const downloadDb = async () => {
      try {
         const response = await fetch("app://db");
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         const blob = await response.blob();

         // 使用 FileSystem Access API
         const handle = await window.showSaveFilePicker({
            suggestedName: "app.db",
            types: [
               {
                  description: "資料庫檔案",
                  accept: { "application/octet-stream": [".db"] },
               },
            ],
         });
         const writable = await handle.createWritable();
         await writable.write(blob);
         await writable.close();

         console.log("檔案下載成功");
      }
      catch (error) {
         console.error("下載失敗:", error);
      }
   };

   const useBackupUrl = async (url: string) => {
      isRestoring.value = true;
      try {
         await $trpc.app.discord.actions.useBackupUrl.mutate({ url });
         refreshCloudBackups();
         refreshCurrentDBInfo();
         toast.info("資料庫已被更新", {
            duration: 100000,
            action: {
               label: "重新載入",
               onClick: () => {
                  reloadNuxtApp();
               },
            },
         });
      }
      catch (error) {
         toast.error("使用備份失敗");
         console.error("使用備份失敗:", error);
      }
      isRestoring.value = false;
   };

   const openBackupFileDir = async () => {
      await $trpc.app.config.openDirectory.mutate({
         directory: "",
         selectedFile: "app.db",
      });
   };

   return {
      downloadDb,
      useBackupUrl,
      openBackupFileDir,
      currentDBInfo,
      isBackuping,
      isRestoring,
      backups: {
         cloudBackups,
         refreshCloudBackups,
         deleteBackup,
         createBackup,
      },
   };
};
