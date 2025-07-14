import type { BrowserWindow } from "electron";
import logger from "../logger";
import { readConfig } from "../utils/config";
import { app } from "electron";
import { Client, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
import { ActivityType } from "discord-api-types/v10";
import { loadCommands, registerSlashCommands } from "./discord/utils/init";
import { slashCommandEmitter } from "~/server/routers/app/discord";

// 全局變數，用於存儲當前 Client 實例
declare global {
   // eslint-disable-next-line no-var
   var discordClient: Client | undefined;
}

export default async (mainWindow: BrowserWindow) => {
   await bootupDiscord(mainWindow);
};

export const bootupDiscord = async (mainWindow: BrowserWindow) => {
   // 創建全新的 Client 實例
   const client = new Client({ intents: [GatewayIntentBits.Guilds] });
   // 更新全局變數和導出的 client
   global.discordClient = client;
   setClient(client); // 更新導出的 client

   const config = await readConfig();
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

   await client.login(config.discord.token);
   logger.info("[⭐] MODULE::Discord Bot Initialized");
};

// 管理導出的 client 實例
let clientInstance: Client | undefined;

// 提供獲取 client 的函數
export const getClient = (): Client => {
   if (!clientInstance) {
      throw new Error("Discord client is not initialized");
   }
   return clientInstance;
};

// 更新 client 實例
export const setClient = (newClient: Client) => {
   clientInstance = newClient;
};
