import type { BrowserWindow } from "electron";
import { app } from "electron";
import logger from "../logger";
import { readConfig } from "../utils/config";
import { timerBackup } from "../utils/backup";
import { createDatabaseBackup } from "./discord/utils/database";

let isQuitting = false;
let backupTimer: NodeJS.Timeout | null = null; // Store the timer reference

export default async (mainWindow: BrowserWindow) => {
   await reloadBackupService();

   app.on("before-quit", async (event) => {
      if (isQuitting) {
         logger.info("[⭐] Bye bye, PatentsHub");
         return;
      }

      event.preventDefault(); // Prevent quit until we're ready
      isQuitting = true;

      try {
         const config = await readConfig();
         const backupConfig = config.backup;

         if (backupConfig.backupTrigger.onExit) {
            logger.info("[⭐] App is quitting, triggering backup");
            await createDatabaseBackup();
            logger.info("[⭐] Backup completed successfully");
         }
         else {
            logger.info("[⭐] No backup required on exit");
         }
      }
      catch (error) {
         logger.error("[⭐] Backup failed:", error);
         alert(`備份失敗: ${error}`);
      }
      finally {
         // Clean up timer before quitting
         if (backupTimer) {
            logger.info("[⭐] Clearing backup timer before quit");
            clearInterval(backupTimer);
            backupTimer = null;
         }
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
