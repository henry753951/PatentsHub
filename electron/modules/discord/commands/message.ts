// electron/modules/discord/commands/ping.ts
import { SlashCommand } from "../baseCommandEvent";
import type { CommandInteraction } from "discord.js";
import type { BrowserWindow } from "electron";

export class MessageCommand extends SlashCommand<"message"> {
   constructor() {
      super("message", "顯示訊息");
      this.cmd.addStringOption((option) =>
         option
            .setName("content")
            .setDescription("要顯示的訊息內容")
            .setRequired(true),
      );
   }

   override async execute(
      interaction: CommandInteraction,
      mainWindow: BrowserWindow,
   ) {
      await interaction.reply({
         content: `已送出訊息: \`${interaction.options.get("content")?.value}\``,
         ephemeral: true,
      });
      return this.returnEvent({
         message: interaction.options.get("content")?.value,
      });
   }
}
