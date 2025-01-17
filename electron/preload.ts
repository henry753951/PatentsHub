import { contextBridge } from "electron";

process.once("loaded", () => {
   contextBridge.exposeInMainWorld("versions", process.env);
});
