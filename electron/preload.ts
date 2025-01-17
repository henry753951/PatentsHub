import { contextBridge } from "electron";
import { exposeElectronTRPC } from "electron-trpc/main";
process.once("loaded", () => {
   contextBridge.exposeInMainWorld("versions", process.env);
   exposeElectronTRPC();
});
