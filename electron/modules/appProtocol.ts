import type { BrowserWindow } from "electron";
import { app, protocol } from "electron";
import fs from "fs/promises";
import * as path from "path";
import logger from "../logger";
export default (mainWindow: BrowserWindow) => {
   const userData = app.getPath("userData");
   protocol.handle("app", async (req) => {
      const url = new URL(req.url);
      try {
         switch (url.hostname) {
            case "file": {
               const filePath = url.pathname;
               const fullPath = path.join(userData, filePath);
               // decode the path to handle spaces and special characters
               const decodedPath = decodeURIComponent(fullPath);
               await fs.access(decodedPath);
               const fileContent = await fs.readFile(decodedPath);

               const ext = path.extname(decodedPath).toLowerCase();
               const mimeTypes: { [key: string]: string } = {
                  ".docx":
                     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  ".pdf": "application/pdf",
                  ".txt": "text/plain",
               };
               const mimeType = mimeTypes[ext] || "application/octet-stream";

               return new Response(fileContent as BodyInit, {
                  status: 200,
                  headers: { "Content-Type": mimeType },
               });
            }
            case "db": {
               const isProduction = app.isPackaged;
               const dbPathWithPrefix = isProduction
                  ? `file:${path.join(app.getPath("userData"), "app.db")}`
                  : process.env.DATABASE_URL || "app.db";
               const dbPath = dbPathWithPrefix.replace(/^file:/, "");
               await fs.access(dbPath);
               const fileContent = await fs.readFile(dbPath);
               const mimeType = "application/octet-stream";
               return new Response(fileContent as BodyInit, {
                  status: 200,
                  headers: { "Content-Type": mimeType },
               });
            }

            default: {
               return new Response("Invalid request", {
                  status: 400,
                  headers: { "Content-Type": "text/plain" },
               });
            }
         }
      }
      catch (error) {
         logger.error("[❌] Error handling request:", error);
         return new Response("Error", {
            status: 404,
            headers: { "Content-Type": "text/plain" },
         });
      }
   });
   logger.log("[⭐] MODULE::AppProtocol Initialized");
};
