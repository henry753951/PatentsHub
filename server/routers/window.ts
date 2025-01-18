import { z } from "zod";
import { procedure, router } from "../trpc";
import { BrowserWindow } from "electron";

export default router({
   closeCurrent: procedure.input(z.object({}).nullish()).query(({ input }) => {
      const window = BrowserWindow.getFocusedWindow();
      if (window) {
         window.close();
      }
   }),
   maximizeCurrent: procedure
      .input(
         z
            .object({
               maximize: z.boolean().optional(),
            })
            .nullish(),
      )
      .query(({ input }) => {
         const window = BrowserWindow.getFocusedWindow();
         if (window) {
            if (window.isMaximized() && !input?.maximize) {
               window.unmaximize();
            }
            else {
               window.maximize();
            }
         }
      }),
   minimizeCurrent: procedure
      .input(z.object({}).nullish())
      .query(({ input }) => {
         const window = BrowserWindow.getFocusedWindow();
         if (window) {
            window.minimize();
         }
      }),
});
