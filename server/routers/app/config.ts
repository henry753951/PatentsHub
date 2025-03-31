import { z } from "zod";
import { procedure, router } from "../../trpc";
import { app } from "electron";
import path from "path";
import fs from "fs/promises";
import { ConfigFile } from "../../../zod.dto";
import { dir } from "console";

const configPath = `${path.join(app.getPath("userData"), "config.json")}`;
export default router({
   readConfig: procedure
      .input(z.object({}).nullish())
      .query(async ({ input }) => {
         try {
            const data = await fs.readFile(configPath, "utf-8");

            const config = ConfigFile.parse(JSON.parse(data));
            return config;
         }
         catch (error) {
            console.error("Error reading config file:", error);
            //  Generate default config if file doesn't exist or is invalid
            const defaultConfig = ConfigFile.parse({});
            await fs.writeFile(
               configPath,
               JSON.stringify(defaultConfig, null, 2),
               "utf-8",
            );
            return defaultConfig;
         }
      }),

   writeConfig: procedure.input(ConfigFile).mutation(async ({ input }) => {
      try {
         await fs.writeFile(
            configPath,
            JSON.stringify(input, null, 2),
            "utf-8",
         );
         return true;
      }
      catch (error) {
         console.error("Error writing config file:", error);
         return false;
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
         let userDataDir = app.getPath("userData");
         if (directory) {
            userDataDir = path.join(userDataDir, directory);
         }
         const files = await fs.readdir(userDataDir, {
            withFileTypes: true,
         });
         const fileList = files.map((file) => {
            return {
               name: file.name,
               isDirectory: file.isDirectory(),
            };
         });
         return fileList;
      }),
});
