import { app, type BrowserWindow } from "electron";
import { ipcMain } from "electron";
import pkg from "electron-updater";
import logger from "../logger";
const { autoUpdater } = pkg;
// Config
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.forceDevUpdateConfig = true;
autoUpdater.setFeedURL({
   owner: "henry753951",
   repo: "PatentsHub",
   provider: "github",
});
export default (mainWindow: BrowserWindow) => {
   const isMac = process.platform === "darwin";
   if (isMac) {
      autoUpdater.autoDownload = false;
      autoUpdater.autoInstallOnAppQuit = false;
   }

   autoUpdater.checkForUpdates();

   // Check for updates every 2 hours
   setInterval(
      () => {
         autoUpdater.checkForUpdates();
      },
      1000 * 60 * 60 * 2,
   );

   logger.log("[⭐] MODULE::updater Initialized");
};
