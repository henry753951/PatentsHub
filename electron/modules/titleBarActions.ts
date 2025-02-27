import type { BrowserWindow } from "electron";
import { consola } from "consola";
export default (mainWindow: BrowserWindow) => {
   // !! [DEPRECATED] 改用 tRPC
   // ipcMain.handle("isMaximized:app", (event) => {
   //    const win = getWindowFromEvent(event);
   //    return win?.isMaximized();
   // });

   // ipcMain.handle("get:windowVisible", (_event) => {
   //    return mainWindow.isVisible();
   // });

   mainWindow.on("maximize", () => {
      mainWindow.webContents.send("window:maximizeChanged", true);
      // Electron 無解 bug，有 Material 最大化後背景色會變成黑色、 Frame 邊框壞掉，重開才能解決，
      // 所以這邊強制改回白色，雖然 frame 還是會變不 round，但至少不會全黑。
   });
   mainWindow.on("unmaximize", () => {
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
