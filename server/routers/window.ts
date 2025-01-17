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
   minimizeCurrent: procedure.input(z.object({}).nullish()).query(({ input }) => {
      const window = BrowserWindow.getFocusedWindow();
      if (window) {
         window.minimize();
      }
   }),
});
