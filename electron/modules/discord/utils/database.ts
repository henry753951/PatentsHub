import {
   type CommandInteraction,
   type MessageComponentInteraction,
   type CommandInteractionOption,
   ChannelType,
} from "discord.js";
import { app } from "electron";
import path from "path";
import fs from "fs/promises";
import { readConfig } from "../../../utils/config";
import { client } from "../../discord";
import { hashing } from "./hashing";
const ephemeral = true;

async function replaceDB(
   interaction: CommandInteraction,
   interactionOption: CommandInteractionOption,
) {
   try {
      const attachment = interactionOption.attachment;

      // 驗證上傳的檔案是否為有效的 .db 檔案
      if (!attachment?.name.endsWith(".db") || !attachment.url) {
         await interaction.reply({
            content: "請上傳有效的 .db 檔案！",
            ephemeral: true,
         });
         return;
      }
      // 使用 backupDB 進行備份並上傳到 Discord
      const backupMessage = await backupDB(true);
      // 下載上傳的檔案並取代資料庫
      await useBackup(attachment.url);

      // 將備份訊息轉發到目前頻道並回覆
      if (interaction.channel?.type === ChannelType.GuildText) {
         await backupMessage?.forward(interaction.channel);
         await interaction.reply({
            content: "資料庫已成功取代並備份！ \n新資料庫:",
            files: [
               {
                  attachment: attachment.url,
                  name: attachment.name,
               },
            ],
            ephemeral: true,
         });
      }
   }
   catch (error) {
      console.error("取代資料庫錯誤:", error);
      await interaction.reply({
         content: "取代資料庫時發生錯誤，請檢查檔案並重試。",
         ephemeral: true,
      });
   }
}

async function useBackup(url: string) {
   const userData = app.getPath("userData");
   const dbPath = path.join(userData, "app.db");
   const response = await fetch(url);
   const buffer = await response.arrayBuffer();
   await fs.writeFile(dbPath, Buffer.from(buffer));
}

async function exportDB(interaction: MessageComponentInteraction) {
   backupDB()
      .then(async (message) => {
         if (interaction.channel?.type !== ChannelType.GuildText) return;
         await message?.forward(interaction.channel);
         interaction.reply({
            content: "資料庫備份成功！",
         });
      })
      .catch(async (error) => {
         await interaction.reply({
            content: error,
         });
      });
}

async function backupDB(replace = false) {
   const userData = app.getPath("userData");
   const dbPath = path.join(userData, "app.db");
   const config = await readConfig();
   const backupChannel = client.channels.cache.get(
      config.discord.channelIds.databaseBackup,
   );
   try {
      // 檢查資料庫檔案是否存在
      await fs.access(dbPath);
      const hash = await hashing.hashFile(dbPath, "sha256");
      const fileName = !replace
         ? `backup_${Date.now()}.db`
         : `replace_backup_${Date.now()}.db`;
      // 上傳資料庫檔案到 Discord
      if (backupChannel?.type === ChannelType.GuildText) {
         const message = await backupChannel.send({
            content: "hash: " + hash,
            files: [
               {
                  attachment: dbPath,
                  name: fileName,
               },
            ],
            embeds: [
               {
                  title: "資料庫備份",
                  description: `資料庫已備份至：\`${fileName}\``,
                  color: 0x00ff00,
                  timestamp: new Date().toISOString(),
               },
            ],
         });
         return message;
      }
   }
   catch (error) {
      console.error("匯出資料庫錯誤:", error);
      if (backupChannel?.type === ChannelType.GuildText) {
         await backupChannel.send({
            embeds: [
               {
                  title: "資料庫備份失敗",
                  description:
                     "匯出資料庫時發生錯誤，請確認資料庫檔案存在並重試。",
                  color: 0xff0000,
                  timestamp: new Date().toISOString(),
               },
            ],
         });
      }
      throw new Error("匯出資料庫時發生錯誤，請確認資料庫檔案存在並重試。");
   }
}

async function getBackups(): Promise<
   {
      id: string
      hash: string
      name: string
      url: string
      timestamp: Date
   }[]
> {
   const config = await readConfig();
   const backupChannel = client.channels.cache.get(
      config.discord.channelIds.databaseBackup,
   );
   if (backupChannel?.type !== ChannelType.GuildText) return [];
   const messages = await backupChannel.messages.fetch({ limit: 100 });
   const backupMessages = messages.filter((message) => {
      return message.attachments.some((attachment) => {
         return attachment.name?.endsWith(".db") && attachment.url;
      });
   });
   return backupMessages
      .map((message) => {
         const attachment = message.attachments.find((attachment) =>
            attachment.name?.endsWith(".db"),
         );
         if (!attachment) return null;
         return {
            id: message.id,
            hash: message.content.split("hash: ")[1] || "",
            name: attachment.name,
            url: attachment.url,
            timestamp: message.createdAt,
         };
      })
      .filter((backup) => backup !== null);
}

async function deleteBackup(backupId: string) {
   const config = await readConfig();
   const backupChannel = client.channels.cache.get(
      config.discord.channelIds.databaseBackup,
   );
   if (backupChannel?.type !== ChannelType.GuildText) return;
   const backupMessage = await backupChannel.messages
      .fetch(backupId)
      .catch(() => null);

   if (backupMessage) {
      await backupMessage.delete();
      return true;
   }
   return false;
}

const getCurrentInfo = async () => {
   const userData = app.getPath("userData");
   const dbPath = path.join(userData, "app.db");
   try {
      await fs.access(dbPath);
      const hash = await hashing.hashFile(dbPath, "sha256");
      const lastModified = await fs.stat(dbPath);
      const lastModifiedDate = new Date(lastModified.mtime).toISOString();
      return {
         hash,
         lastModified: lastModifiedDate,
      };
   }
   catch (error) {
      console.error("取得資料庫資訊錯誤:", error);
   }
};

export {
   replaceDB,
   exportDB,
   backupDB,
   getBackups,
   deleteBackup,
   getCurrentInfo,
   useBackup,
};
