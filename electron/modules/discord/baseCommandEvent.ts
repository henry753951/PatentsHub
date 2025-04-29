import { SlashCommandBuilder } from "@discordjs/builders";
import type { CommandInteraction } from "discord.js";
import type { BrowserWindow } from "electron";

export abstract class SlashCommand<T extends string> {
   public cmd: SlashCommandBuilder;
   public name: T;

   constructor(name: T, description: string) {
      this.name = name;
      this.cmd = new SlashCommandBuilder()
         .setName(name as string)
         .setDescription(description);
   }

   public abstract execute(
      interaction: CommandInteraction,
      mainWindow: BrowserWindow,
   ): Promise<ReturnType<typeof this.returnEvent>>;

   returnEvent<T>(data: T) {
      return {
         type: this.name,
         data: data,
      };
   }
}
