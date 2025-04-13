import type { BrowserWindow } from "electron";
import { createIPCHandler } from "electron-trpc/main";
import { mainRouter as router } from "../../server/mainRouter";
import log from "electron-log";

export default (mainWindow: BrowserWindow) => {
   createIPCHandler({ router, windows: [mainWindow] });
   log.log("[-] MODULE::tRPC Handler initialized");
};
