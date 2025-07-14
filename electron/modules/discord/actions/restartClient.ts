import type { Client } from "discord.js";
import { ChannelType, GatewayIntentBits } from "discord.js";
import { ActionEvent } from "../baseActionEvent";
import { z } from "zod";
import { readConfig } from "~/electron/utils/config";
import { bootupDiscord, getClient } from "../../discord";
import { BrowserWindow } from "electron";

const inputSchema = z.object({});

export class RestartClientAction extends ActionEvent<
   typeof inputSchema,
   { success: boolean, message: string }
> {
   constructor() {
      super("RestartClient", inputSchema);
   }

   public override async execute(input: object, client_: Client) {
      const client = getClient();
      const mainWindow = BrowserWindow.getAllWindows()[0];
      await client.destroy();
      try {
         await bootupDiscord(mainWindow);
      }
      catch (error) {
         console.error("Failed to restart Discord client:", error);
         return {
            success: false,
            message: "Failed to restart Discord client",
         };
      }
      return {
         success: true,
         message: "Client is restarting...",
      };
   }
}
