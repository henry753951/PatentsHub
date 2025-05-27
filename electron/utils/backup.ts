import { createDatabaseBackup } from "../modules/discord/utils/database";

declare global {
   // eslint-disable-next-line no-var
   var backupTimer: NodeJS.Timeout;
}

export const timerBackup = async (enabled: boolean, interval: number) => {
   if (global.backupTimer) {
      clearInterval(global.backupTimer);
   }

   if (!enabled) {
      return;
   }

   global.backupTimer = setInterval(() => {
      createDatabaseBackup();
   }, interval * 1000);
   return global.backupTimer;
};
