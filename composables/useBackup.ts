// composables/useBackup.js
export const useBackup = () => {
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
   return {
      downloadDb,
   };
};
