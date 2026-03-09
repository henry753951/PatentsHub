import * as path from "path";
import * as os from "os";
import * as url from "url";
import { app, BrowserWindow, protocol, shell } from "electron";
import fs from "fs/promises";
import singleInstance from "./singleInstance";
import dynamicRenderer from "./dynamicRenderer";
import titleBarActionsModule from "./modules/titleBarActions";
import updaterModule from "./modules/updater";
import appProtocolModule from "./modules/appProtocol";
import trpcHandlerModule from "./modules/trpcHandler";
import discord from "./modules/discord";
import autoBackup from "./modules/autoBackup";
import logger from "./logger";
import { readConfig } from "./utils/config";
import { PrismaClient } from "@prisma/client";

// Initilize
// =========
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
const isProduction = process.env.NODE_ENV !== "development";
const platform = process.platform as "darwin" | "win32" | "linux";
const architucture: "64" | "32" = os.arch() === "x64" ? "64" : "32";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appName = app.getName();
const appVersion = app.getVersion();
const appPath = app.getAppPath();

const modules = [
   titleBarActionsModule,
   updaterModule,
   trpcHandlerModule,
   appProtocolModule,
   discord,
   autoBackup,
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
         logger.log(`[📦] Created folder: ${folderPath}`);
      }
   }
   catch (err) {
      logger.error(`[❌] Error handling folder: ${folderPath}`, err);
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

// Initialize app window
// =====================
function createWindow() {
   logger.info(
      "[💻] System info",
      JSON.stringify(
         {
            isProduction,
            platform,
            architucture,
            appName,
            appPath,
            appVersion,
         },
         null,
         2,
      ),
   );

   // Create the browser window.
   const mainWindow = new BrowserWindow({
      width: 1440,
      height: 1024,
      minWidth: 1024,
      minHeight: 676,
      icon: isProduction
         ? path.join(__dirname, "../assets/icon-32x32.png")
         : path.join(__dirname, "../assets/electron/,icon-32x32.png"),
      roundedCorners: true,
      webPreferences: {
         devTools: true,
         webSecurity: false,
         contextIsolation: true,
         preload: path.join(__dirname, "preload.js"),
      },
      frame: false,
      maximizable: true,
      // backgroundMaterial: "acrylic",
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
   await readConfig();
   await initializeDatabase();
   const mainWindow = createWindow();
   if (!mainWindow) return;
   mainWindow.webContents.on("render-process-gone", (event, details) => {
      logger.error("[❌] Renderer crashed:", details);
   });

   mainWindow.webContents.on("preload-error", (event, preloadPath, error) => {
      logger.error("[❌] Preload error:", preloadPath, error);
   });

   mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith("http:") || url.startsWith("https:")) {
         shell.openExternal(url);
         return { action: "deny" };
      }
      return { action: "allow" };
   });

   dynamicRenderer(mainWindow);
   // Initialize modules
   logger.log("[⏳] Loading modules...");
   modules.forEach((module) => {
      try {
         module(mainWindow);
      }
      catch (err: any) {
         logger.log("[❌] Module error: ", err.message || err);
      }
   });

   logger.log("[⌛] Loading modules: Done.");

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
   logger.error("[❌] Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
   logger.error("[❌] Unhandled Rejection at:", promise, "reason:", reason);
});

// 動態解析 app.db 的路徑
function getSourceDbPath() {
   const isPackaged = app.isPackaged;
   if (isPackaged) {
      // 打包後，app.db 在 resources 目錄
      return path.join(process.resourcesPath, "app.db");
   }
   else {
      // 開發環境，app.db 在 .importSystem 目錄
      return path.join(__dirname, "../.importSystem/app.db");
   }
}

async function initializeDatabase() {
   const userDataPath = app.getPath("userData");
   const dbFilePath = path.join(userDataPath, "app.db");
   await fs.mkdir(path.dirname(dbFilePath), { recursive: true });

   try {
      // 檢查 dbFilePath 是否存在
      await fs.stat(dbFilePath);
      logger.log(`[📦] Database file already exists: ${dbFilePath}`);
   }
   catch (err) {
      // 如果檔案不存在，複製 app.db
      try {
         const sourceDbPath = getSourceDbPath();
         await fs.copyFile(sourceDbPath, dbFilePath);
         logger.log(`[📦] Created database file: ${dbFilePath}`);
      }
      catch (copyErr) {
         logger.warn(`[⚠️] Could not copy template DB, initializing from migrations: ${dbFilePath}`, copyErr);
         await initializeDatabaseFromMigrations(dbFilePath);
      }
   }
}

function splitSqlStatements(sql: string) {
   return sql
      .split(";")
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0)
      .map(stmt => `${stmt};`);
}

async function resolveMigrationsDir() {
   const candidates = [
      path.join(app.getAppPath(), "server", "prisma", "schema", "migrations"),
      path.join(process.resourcesPath, "server", "prisma", "schema", "migrations"),
      path.join(__dirname, "../server/prisma/schema/migrations"),
   ];

   for (const migrationsPath of candidates) {
      const exists = await fs
         .stat(migrationsPath)
         .then(stat => stat.isDirectory())
         .catch(() => false);
      if (exists) return migrationsPath;
   }

   throw new Error("Prisma migrations directory not found.");
}

async function initializeDatabaseFromMigrations(dbFilePath: string) {
   const migrationsDir = await resolveMigrationsDir();
   const migrationFolders = (await fs.readdir(migrationsDir, { withFileTypes: true }))
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort((a, b) => a.localeCompare(b));

   const prisma = new PrismaClient({
      datasources: {
         db: { url: `file:${dbFilePath}` },
      },
   });

   try {
      for (const folder of migrationFolders) {
         const migrationFile = path.join(migrationsDir, folder, "migration.sql");
         const sql = await fs.readFile(migrationFile, "utf-8");
         const statements = splitSqlStatements(sql);
         for (const statement of statements) {
            await prisma.$executeRawUnsafe(statement);
         }
      }
      logger.log(`[📦] Initialized database from migrations: ${dbFilePath}`);
   }
   catch (error) {
      logger.error(`[❌] Failed to initialize database from migrations: ${dbFilePath}`, error);
      throw error;
   }
   finally {
      await prisma.$disconnect();
   }
}
