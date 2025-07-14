import path from "path";
import fs from "fs/promises";
import { ConfigFile } from "../../zod.dto";
import type { z } from "zod";
import { app } from "electron";
const configPath = `${path.join(app.getPath("userData"), "config.json")}`;

export const readConfig = async () => {
   try {
      const data = await fs.readFile(configPath, "utf-8");

      const config = ConfigFile.parse(JSON.parse(data));
      return config;
   }
   catch (error) {
      const oldConfigExists = await fs.stat(configPath);
      if (oldConfigExists) {
         const oldConfigData = await fs.readFile(configPath, "utf-8");
         const oldConfig = JSON.parse(oldConfigData);
         const defaultConfig = ConfigFile.parse(undefined);
         const mergedConfig = { ...defaultConfig, ...oldConfig };
         const validatedConfig = ConfigFile.parse(mergedConfig);
         await fs.writeFile(
            configPath,
            JSON.stringify(validatedConfig, null, 2),
            "utf-8",
         );
         return validatedConfig;
      }
      else {
         const defaultConfig = ConfigFile.parse(undefined);
         await fs.writeFile(
            configPath,
            JSON.stringify(defaultConfig, null, 2),
            "utf-8",
         );
         return defaultConfig;
      }
   }
};
export const writeConfig = async (config: z.infer<typeof ConfigFile>) => {
   try {
      await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf-8");
      return true;
   }
   catch (error) {
      console.error("Error writing config file:", error);
      return false;
   }
};
