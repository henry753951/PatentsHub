import window from "./window";
import config from "./config";
import update from "./update";
import discord from "./discord";
import { procedure, router } from "../../trpc";
import { z } from "zod";
import { app } from "electron";
import { reloadBackupService } from "~/electron/modules/autoBackup";
export default router({
   window: window,
   config: config,
   version: procedure.input(z.object({}).nullish()).query(() => {
      const currentVersion = app.getVersion();
      return currentVersion;
   }),
   update: update,
   discord: discord,
   backup: router({
      reloadBackupService: procedure
         .input(z.object({}).nullish())
         .mutation(async () => {
            await reloadBackupService();
         }),
   }),
});
