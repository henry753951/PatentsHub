import { app } from "electron";
import path from "path";
import fs from "fs/promises";

export const getUserDataFiles = async (directory: string) => {
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
};
