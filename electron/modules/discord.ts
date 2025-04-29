import type { BrowserWindow } from "electron";
import logger from "../logger";
import { readConfig } from "../utils/config";
import { app, ipcMain } from "electron";
import { Client, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest";
import { ActivityType, Routes } from "discord-api-types/v10";
import { loadCommands, registerSlashCommands } from "./discord/utils/init";
import { slashCommandEmitter } from "~/server/routers/app/discord";

declare global {
   // eslint-disable-next-line no-var
   var discordClient: Client;
}

export default async (mainWindow: BrowserWindow) => {
   const config = await readConfig();
   global.discordClient = client;
   const commands = await loadCommands();

   // 當機器人準備好時註冊指令
   client.once("ready", async () => {
      if (!client.user) {
         logger.error("[❌] Discord Bot not ready");
         return;
      }
      logger.info("[⭐] Discord Bot Initialized");
      client.user.setPresence({
         status: "online",
         activities: [
            {
               name: "版本: " + app.getVersion(),
               type: ActivityType.Custom,
            },
         ],
      });
      registerSlashCommands(commands, client, config.discord.guildId);
   });

   client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;
      const command = commands.find(
         (command) => command.cmd.name === interaction.commandName,
      );
      if (command) {
         const returnData = await command.execute(interaction, mainWindow);
         slashCommandEmitter.emit("command", command.cmd.name, returnData.data);
      }
   });

   client.login(config.discord.token);
   logger.info("[⭐] MODULE::Discord Bot Initialized");
};

export const client
   = global.discordClient || new Client({ intents: [GatewayIntentBits.Guilds] });
