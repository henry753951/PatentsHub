import type { BrowserWindow } from "electron";
import { createIPCHandler } from "electron-trpc/main";
import { mainRouter as router } from "../../server/mainRouter";
import logger from "../logger";

export default (mainWindow: BrowserWindow) => {
   createIPCHandler({ router, windows: [mainWindow] });
   logger.log("[⭐] MODULE::tRPC Handler initialized");
};
