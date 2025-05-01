// electron/modules/discord/commands/ping.ts
import { SlashCommand } from "../baseCommandEvent";
import type { CommandInteraction } from "discord.js";
import type { BrowserWindow } from "electron";

export class PingCommand extends SlashCommand<"ping"> {
   constructor() {
      super("ping", "觸發前端顯示 pong");
   }

   override async execute(
      interaction: CommandInteraction,
      mainWindow: BrowserWindow,
   ) {
      await interaction.reply({
         content: "已送出 Pong!",
         ephemeral: true,
      });
      return this.returnEvent({
         ping: "pong",
      });
   }
}
