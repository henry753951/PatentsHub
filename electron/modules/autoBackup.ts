import { app, type BrowserWindow, type ipcMain } from "electron";
import logger from "../logger";
import { readConfig } from "../utils/config";

import { timerBackup } from "../utils/backup";
import { createDatabaseBackup } from "./discord/utils/database";
const timer = null;
let isQuitting = false;
export default async (mainWindow: BrowserWindow) => {
   await reloadBackupService();
   app.on("before-quit", async (event) => {
      event.preventDefault();
      const config = await readConfig();
      const backupConfig = config.backup;
      if (backupConfig.backupTrigger.onExit && !isQuitting) {
         logger.info("[⭐] App is quitting, triggering backup");
         isQuitting = true; // Set flag to prevent re-entry
         createDatabaseBackup()
            .then(() => {
               logger.info("[⭐] Backup completed successfully");
               app.quit(); // Quit directly without closing windows manually
            })
            .catch((error) => {
               alert("備份失敗: " + error.message);
               app.quit();
            });

         logger.info("[⭐] Bye bye, PatentsHub");
      }
      else {
         app.quit();
      }
   });

   logger.info("[⭐] MODULE::Discord Bot Initialized");
};

export const reloadBackupService = async () => {
   logger.info("[⭐] Loading backup service");
   const config = await readConfig();
   const backupConfig = config.backup;
   if (backupConfig.backupTrigger.onTimer) {
      logger.info(
         "[⭐] Starting backup timer with interval:",
         backupConfig.interval,
      );
      timerBackup(true, backupConfig.interval);
   }
   else {
      logger.info("[⭐] Stopping backup timer");
      timerBackup(false, backupConfig.interval);
   }
};
