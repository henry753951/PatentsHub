import { ChannelType, type Client } from "discord.js";
import { ActionEvent } from "../baseActionEvent";
import { z } from "zod";
import { readConfig } from "~/electron/utils/config";
import { bootupDiscord } from "../../discord";
import { BrowserWindow } from "electron";

const inputSchema = z.object({});

export class RestartClientAction extends ActionEvent<
   typeof inputSchema,
   { success: boolean, message: string }
> {
   constructor() {
      super("RestartClient", inputSchema);
   }

   public override async execute(
      input: { ping?: string | undefined },
      client: Client,
   ) {
      const mainWindow = BrowserWindow.getAllWindows()[0];
      await client.destroy();
      await bootupDiscord(mainWindow);
      return {
         success: true,
         message: "Client is restarting...",
      };
   }
}
