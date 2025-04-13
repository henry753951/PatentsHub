import * as path from "path";
import * as os from "os";
import * as url from "url";
import { app, BrowserWindow, protocol } from "electron";
import fs from "fs/promises";
import singleInstance from "./singleInstance";
import dynamicRenderer from "./dynamicRenderer";
import titleBarActionsModule from "./modules/titleBarActions";
import updaterModule from "./modules/updater";
import appProtocolModule from "./modules/appProtocol";
import trpcHandlerModule from "./modules/trpcHandler";
import log from "electron-log";

// Initilize
// =========
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
const isProduction = process.env.NODE_ENV !== "development";
const platform = process.platform as "darwin" | "win32" | "linux";
const architucture: "64" | "32" = os.arch() === "x64" ? "64" : "32";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = [
   titleBarActionsModule,
   updaterModule,
   trpcHandlerModule,
   appProtocolModule,
];

// Create default user data folders
// ==================================
const defaultUserDataFolders = ["templates", "logs"];
const userDataPath = app.getPath("userData");
defaultUserDataFolders.forEach(async (folder) => {
   const folderPath = path.join(userDataPath, folder);
   try {
      const folderExists = await fs
         .stat(folderPath)
         .then(() => true)
         .catch(() => false);
      if (!folderExists) {
         await fs.mkdir(folderPath, { recursive: true });
         log.log(`[📦] Created folder: ${folderPath}`);
      }
   }
   catch (err) {
      log.error(`[❌] Error handling folder: ${folderPath}`, err);
   }
});

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

// Log settings
// ============
const time = new Date().toISOString().replace(/:/g, "-").slice(0, 19);
log.transports.file.level = "info";
log.transports.file.fileName = `patent-${platform}-${architucture}-${time}.log`;

// Initialize app window
// =====================
function createWindow() {
   log.info("[💻] System info", { isProduction, platform, architucture });

   // Create the browser window.
   const mainWindow = new BrowserWindow({
      width: 1440,
      height: 1024,
      minWidth: 1024,
      minHeight: 676,
      roundedCorners: true,
      webPreferences: {
         devTools: true,
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
   mainWindow.webContents.on("render-process-gone", (event, details) => {
      log.error("[❌] Renderer crashed:", details);
   });

   mainWindow.webContents.on("preload-error", (event, preloadPath, error) => {
      log.error("[❌] Preload error:", preloadPath, error);
   });
   dynamicRenderer(mainWindow);
   // Initialize modules
   log.log("[⏳] Loading modules...");
   modules.forEach((module) => {
      try {
         module(mainWindow);
      }
      catch (err: any) {
         log.log("[❌] Module error: ", err.message || err);
      }
   });

   log.log("[⌛] Loading modules: Done.");

   app.on("activate", function () {
      mainWindow.show();
   });
});

app.on("window-all-closed", () => {
   if (process.platform !== "darwin") {
      app.quit();
   }
});

process.on("uncaughtException", (err) => {
   log.error("[❌] Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
   log.error("[❌] Unhandled Rejection at:", promise, "reason:", reason);
});
