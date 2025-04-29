import { app, type BrowserWindow } from "electron";
import { ipcMain } from "electron";
import pkg from "electron-updater";
import logger from "../logger";
const { autoUpdater } = pkg;
// Config
const server = "https://patent-hub-hazel.vercel.app";
const url = `${server}/update/${process.platform}/${app.getVersion()}`;

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.forceDevUpdateConfig = true;
autoUpdater.setFeedURL({
   url: url,
   provider: "generic",
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
