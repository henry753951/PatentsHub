import { createDatabaseBackup } from "../modules/discord/utils/database";

declare global {
   // eslint-disable-next-line no-var
   var backupTimer: NodeJS.Timeout;
}

export const timerBackup = async (enabled: boolean, interval: number) => {
   if (interval < 60) {
      throw new Error("Interval must be at least 60 seconds");
   }

   if (global.backupTimer) {
      clearInterval(global.backupTimer);
   }

   if (!enabled) {
      return;
   }

   global.backupTimer = setInterval(() => {
      console.log("[⭐] Auto backup triggered");
      createDatabaseBackup();
   }, interval * 1000);
   return global.backupTimer;
};
