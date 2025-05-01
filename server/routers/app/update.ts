import { procedure, router } from "../../trpc";
import { z } from "zod";
import { observable } from "@trpc/server/observable";
import type { UpdateInfo } from "electron-updater";
import { autoUpdater } from "electron-updater";
import { app, shell } from "electron";

let readyToInstall = false;
export default router({
   checkForUpdates: procedure.mutation(async () => {
      await autoUpdater.checkForUpdates();
   }),

   quitAndInstall: procedure.mutation(() => {
      if (readyToInstall) {
         autoUpdater.quitAndInstall();
      }
   }),

   onStatusChange: procedure.subscription(() => {
      return observable<UpdaterStatus>((emit) => {
         const send = (status: UpdaterStatus) => emit.next(status);
         autoUpdater.on("checking-for-update", () => {
            send({ type: "checking-for-update" });
         });
         autoUpdater.on("update-available", (info) => {
            send({ type: "update-available", data: info });
         });
         autoUpdater.on("update-not-available", (info) => {
            send({ type: "update-not-available", data: info });
         });
         autoUpdater.on("error", (error) => {
            send({ type: "error", data: error?.message || "unknown" });
         });
         autoUpdater.on("download-progress", (progress) => {
            send({
               type: "download-progress",
               data: {
                  percent: progress.percent,
                  bytesPerSecond: progress.bytesPerSecond,
                  transferred: progress.transferred,
                  total: progress.total,
               },
            });
         });
         autoUpdater.on("update-downloaded", (data) => {
            readyToInstall = true;
            send({ type: "update-downloaded", data: data });
         });
      });
   }),
});

export type UpdaterStatus =
  | { type: "checking-for-update" }
  | { type: "update-available", data: UpdateInfo }
  | { type: "update-not-available", data: UpdateInfo }
  | { type: "error", data: string }
  | {
     type: "download-progress"
     data: {
        percent: number
        bytesPerSecond: number
        transferred: number
        total: number
     }
  }
  | { type: "update-downloaded", data: UpdateInfo };
