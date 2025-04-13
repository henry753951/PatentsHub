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
autoUpdater.setFeedURL({ url, provider: "custom" });
export default (mainWindow: BrowserWindow) => {
   const isMac = process.platform === "darwin";
   if (isMac) {
      autoUpdater.autoDownload = false;
      autoUpdater.autoInstallOnAppQuit = false;
   }

   let readyToInstall = false;
   function sendUpdaterStatus(...args: any[]) {
      mainWindow.webContents.send("updater:statusChanged", args);
   }

   autoUpdater.on("checking-for-update", () => {
      sendUpdaterStatus("check-for-update");
   });
   autoUpdater.on("update-available", (_info) => {
      sendUpdaterStatus("update-available");
   });
   autoUpdater.on("update-not-available", (_info) => {
      sendUpdaterStatus("update-not-available");
   });
   autoUpdater.on("error", (_err) => {
      sendUpdaterStatus("update-error");
   });
   autoUpdater.on("download-progress", (progress) => {
      sendUpdaterStatus("downloading", progress);
   });
   autoUpdater.on("update-downloaded", (_info) => {
      sendUpdaterStatus("update-downloaded");
      mainWindow.webContents.send("updater:readyToInstall");
      readyToInstall = true;
   });

   // IPC Listeners
   // =============
   ipcMain.handle("updater:check", async (_event) => {
      return await autoUpdater.checkForUpdates();
   });

   ipcMain.handle("updater:quitAndInstall", (_event) => {
      if (!readyToInstall) return;
      autoUpdater.quitAndInstall();
   });

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
