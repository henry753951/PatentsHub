import { ipcMain, BrowserWindow } from "electron";
import { consola } from "consola";
const getWindowFromEvent = (event: Electron.IpcMainInvokeEvent) => {
   const webContents = event.sender;
   const win = BrowserWindow.fromWebContents(webContents);
   return win;
};

export default (mainWindow: BrowserWindow) => {
   ipcMain.handle("isMaximized:app", (event) => {
      const win = getWindowFromEvent(event);
      return win?.isMaximized();
   });

   ipcMain.handle(
      "titlebar:action",
      (event, action: "toggleMaximize" | "minimize") => {
         const win = getWindowFromEvent(event);
         if (!win) return;
         switch (action) {
            case "toggleMaximize":
               if (win.isMaximized()) {
                  win.unmaximize();
               }
               else {
                  win.maximize();
               }
               break;
            case "minimize":
               win.minimize();
               break;
         }
      },
   );

   ipcMain.handle("close:app", (event) => {
      const win = getWindowFromEvent(event);
      if (!win) return;
      win.close();
   });

   ipcMain.handle("get:windowVisible", (_event) => {
      return mainWindow.isVisible();
   });

   mainWindow.on("maximize", () => {
      consola.log("Window maximized");
      mainWindow.webContents.send("window:maximizeChanged", true);
   });
   mainWindow.on("unmaximize", () => {
      consola.log("Window unmaximized");
      mainWindow.webContents.send("window:maximizeChanged", false);
   });
   mainWindow.on("enter-full-screen", () =>
      mainWindow.webContents.send("window:fullscreenChanged", true),
   );
   mainWindow.on("leave-full-screen", () =>
      mainWindow.webContents.send("window:fullscreenChanged", false),
   );

   consola.log("[-] MODULE::titleBarActions Initialized");
};
