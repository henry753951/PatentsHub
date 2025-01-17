import type { BrowserWindow } from "electron";
import { createIPCHandler } from "electron-trpc/main";
import { appRouter as router } from "../../server/appRouter";
import { consola } from "consola";

// Config

export default (mainWindow: BrowserWindow) => {
   createIPCHandler({ router, windows: [mainWindow] });
   consola.log("[-] MODULE::tRPC Handler initialized");
};
