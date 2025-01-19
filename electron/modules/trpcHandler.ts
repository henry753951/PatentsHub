import type { BrowserWindow } from "electron";
import { createIPCHandler } from "electron-trpc/main";
import { mainRouter as router } from "../../server/mainRouter";
import { consola } from "consola";

export default (mainWindow: BrowserWindow) => {
   createIPCHandler({ router, windows: [mainWindow] });
   consola.log("[-] MODULE::tRPC Handler initialized");
};
