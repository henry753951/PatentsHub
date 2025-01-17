import * as path from "path";
import type { BrowserWindow } from "electron";
import express, { static as serveStatic } from "express";
import { consola } from "consola";

// Internals
// =========
const isProduction = process.env.NODE_ENV !== "development";

// Dynamic Renderer
// ================
export default function (mainWindow: BrowserWindow) {
   if (!isProduction) return mainWindow.loadURL("http://127.0.0.1:3000/");
   const app = express();
   app.use("/", serveStatic(path.join(__dirname, "../public")));
   const listener = app.listen(8079, "localhost", () => {
      const port = (listener.address() as any).port;
      consola.log("Dynamic-Renderer Listening on", port);
      mainWindow.loadURL(`http://localhost:${port}`);
   });
}
