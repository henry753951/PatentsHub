import * as path from "path";
import * as os from "os";
import { consola } from "consola";
import { app, BrowserWindow, protocol } from "electron";
import singleInstance from "./singleInstance";
import dynamicRenderer from "./dynamicRenderer";
import titleBarActionsModule from "./modules/titleBarActions";
import updaterModule from "./modules/updater";
import trpcHandlerModule from "./modules/trpcHandler";
import appProtocolModule from "./modules/appProtocol";

// Initilize
// =========
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
const isProduction = process.env.NODE_ENV !== "development";
const platform = process.platform as "darwin" | "win32" | "linux";
const architucture: "64" | "32" = os.arch() === "x64" ? "64" : "32";
const modules = [
   titleBarActionsModule,
   updaterModule,
   trpcHandlerModule,
   appProtocolModule,
];

protocol.registerSchemesAsPrivileged([
   {
      scheme: "app",
      privileges: {
         bypassCSP: true,
         standard: true,
         secure: true,
         supportFetchAPI: true,
      },
   },
]);

// Initialize app window
// =====================
function createWindow() {
   consola.info("System info", { isProduction, platform, architucture });

   // Create the browser window.
   const mainWindow = new BrowserWindow({
      width: 1440,
      height: 1024,
      minWidth: 1024,
      minHeight: 676,
      roundedCorners: true,
      webPreferences: {
         devTools: !isProduction,
         contextIsolation: true,
         preload: path.join(__dirname, "preload.js"),
      },
      frame: false,
      maximizable: false,
      backgroundMaterial: "acrylic",
      title: "高雄大學專利維護系統",
   });

   // Lock app to single instance
   if (singleInstance(app, mainWindow)) return;

   // Open the DevTools.
   if (!isProduction) {
      mainWindow.webContents.openDevTools({
         mode: "detach",
      });
   }

   return mainWindow;
}

// App events
// ==========
app.whenReady().then(async () => {
   const mainWindow = createWindow();
   if (!mainWindow) return;
   dynamicRenderer(mainWindow);
   // Initialize modules
   consola.log("-".repeat(30) + "\n[+] Loading modules...");
   modules.forEach((module) => {
      try {
         module(mainWindow);
      }
      catch (err: any) {
         consola.log("[!] Module error: ", err.message || err);
      }
   });

   consola.log("[!] Loading modules: Done." + "\r\n" + "-".repeat(30));

   app.on("activate", function () {
      mainWindow.show();
   });
});

app.on("window-all-closed", () => {
   if (process.platform !== "darwin") {
      app.quit();
   }
});
