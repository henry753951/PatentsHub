import { z } from "zod";
import { procedure, router } from "../../trpc";
import { app, shell } from "electron";
import path from "path";

import { ConfigFile } from "../../../zod.dto";
import { readConfig, writeConfig } from "../../../electron/utils/config";
import { getUserDataFiles } from "~/electron/utils/userFile";

export default router({
   readConfig: procedure
      .input(z.object({}).nullish())
      .query(async ({ input }) => {
         return readConfig();
      }),

   writeConfig: procedure.input(ConfigFile).mutation(async ({ input }) => {
      return writeConfig(input);
   }),

   openDirectory: procedure
      .input(
         z.object({
            directory: z.string(),
            selectedFile: z.string().optional(),
         }),
      )
      .mutation(async ({ input }) => {
         const { directory } = input;
         const userDataDir = app.getPath("userData");
         const dirPath = path.join(userDataDir, directory);

         if (input.selectedFile) {
            const filePath = path.join(dirPath, input.selectedFile);
            await shell.showItemInFolder(filePath);
         }
         else {
            await shell.openPath(dirPath);
         }
      }),

   getUserDataFiles: procedure
      .input(
         z.object({
            directory: z.string().default(""),
         }),
      )
      .query(async ({ input }) => {
         const { directory } = input;
         return getUserDataFiles(directory);
      }),
});
