import * as path from "path";
import type { BrowserWindow } from "electron";
import express, { static as serveStatic } from "express";

// Internals
// =========
const isProduction = process.env.NODE_ENV !== "development";

// Dynamic Renderer
// ================
export default function (mainWindow: BrowserWindow) {
   if (!isProduction) {
      let url = "http://127.0.0.1:3000";
      if (process.env.__NUXT_DEV__) {
         const nuxtDevConfig = JSON.parse(process.env.__NUXT_DEV__);
         url = nuxtDevConfig.proxy.url.replace("localhost", "127.0.0.1");
      }
      return mainWindow.loadURL(url);
   }
   const app = express();
   app.use("/", serveStatic(path.join(__dirname, "../public")));
   const listener = app.listen(8079, "127.0.0.1", () => {
      const port = (listener.address() as any).port;
      console.log("Dynamic-Renderer Listening on", port);
      mainWindow.loadURL(`http://127.0.0.1:${port}`);
   });
}
