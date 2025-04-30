import window from "./window";
import config from "./config";
import update from "./update";
import discord from "./discord";
import { procedure, router } from "../../trpc";
import { z } from "zod";
import { app } from "electron";
export default router({
   window: window,
   config: config,
   version: procedure.input(z.object({}).nullish()).query(() => {
      return app.getVersion();
   }),
   update: update,
   discord: discord,
});
