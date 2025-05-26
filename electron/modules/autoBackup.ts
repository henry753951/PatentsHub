import { BrowserWindow } from "electron";
import logger from "../logger";
import { readConfig } from "../utils/config";
import { app, ipcMain } from "electron";
import { timerBackup } from "../utils/backup";
import { createDatabaseBackup } from "./discord/utils/database";
const timer = null;
let isQuitting = false;
export default async (mainWindow: BrowserWindow) => {
   const config = await readConfig();
   const backupConfig = config.backup;

   if (backupConfig.backupTrigger.onTimer) {
      timerBackup(true, backupConfig.interval);
   }

   app.on("before-quit", (event) => {
      if (backupConfig.backupTrigger.onExit && !isQuitting) {
         event.preventDefault();
         isQuitting = true; // Set flag to prevent re-entry
         createDatabaseBackup()
            .then(() => {
               app.quit(); // Quit directly without closing windows manually
            })
            .catch((error) => {
               alert("備份失敗: " + error.message);
               app.quit();
            });
      }
   });

   logger.info("[⭐] MODULE::Discord Bot Initialized");
};
