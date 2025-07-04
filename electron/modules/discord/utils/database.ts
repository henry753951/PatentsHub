import {
   type CommandInteraction,
   type MessageComponentInteraction,
   type CommandInteractionOption,
   ChannelType,
   type TextChannel,
   type Message,
} from "discord.js";
import { app } from "electron";
import path from "path";
import fs from "fs/promises";
import { readConfig } from "../../../utils/config";
import { client } from "../../discord";
import { hashing } from "./hashing";

// 常量
const EPHEMERAL_REPLY = false;

// 型別介面以確保型別安全
interface DatabaseInfo {
   hash: string;
   lastModified: string;
}

interface BackupMessage {
   id: string;
   hash: string;
   name: string;
   url: string;
   timestamp: Date;
}

/**
 * 根據環境構建資料庫路徑。
 * @returns 資料庫的檔案系統路徑（不含 'file:' 前綴）。
 */
function getDatabasePath(): string {
   const isProduction = app.isPackaged;
   const dbPath = isProduction
      ? path.join(app.getPath("userData"), "app.db")
      : process.env.DATABASE_URL ||
        path.join(__dirname, "server", "prisma", "db", "app.db");
   return dbPath.replace(/^file:/, "").replace(/\\/g, "/");
}

/**
 * 使用透過 Discord 上傳的檔案替換當前資料庫。
 * @param interaction - Discord 命令互動。
 * @param option - 包含附件的互動選項。
 */
async function replaceDatabaseFromDiscord(
   interaction: CommandInteraction,
   option: CommandInteractionOption,
): Promise<void> {
   try {
      const attachment = option.attachment;
      if (!attachment?.name.endsWith(".db") || !attachment.url) {
         await interaction.reply({
            content: "請上傳有效的 .db 檔案！",
            ephemeral: EPHEMERAL_REPLY,
         });
         return;
      }

      const backupMessage = await createDatabaseBackup(true);
      await downloadAndReplaceDatabase(attachment.url);

      const channel = interaction.channel;
      if (!channel || channel.type !== ChannelType.GuildText) {
         await interaction.reply({
            content: "此命令只能在文字頻道中使用。",
            ephemeral: EPHEMERAL_REPLY,
         });
         return;
      }
      if (channel && backupMessage) {
         await backupMessage.forward(channel);
         await interaction.reply({
            content: "資料庫已成功替換並備份！\n新資料庫：",
            files: [{ attachment: attachment.url, name: attachment.name }],
            ephemeral: EPHEMERAL_REPLY,
         });
      }
   } catch (error) {
      console.error("替換資料庫時發生錯誤：", error);
      await interaction.reply({
         content: "替換資料庫時發生錯誤，請檢查檔案並重試。",
         ephemeral: EPHEMERAL_REPLY,
      });
   }
}

/**
 * 從指定 URL 下載資料庫檔案並替換當前資料庫。
 * @param url - 要下載的資料庫檔案 URL。
 */
async function downloadAndReplaceDatabase(url: string): Promise<void> {
   const dbPath = getDatabasePath();
   const response = await fetch(url);
   if (!response.ok) {
      throw new Error(`從 ${url} 下載資料庫失敗`);
   }
   const buffer = await response.arrayBuffer();
   await fs.writeFile(dbPath, Buffer.from(buffer));
}

/**
 * 替換當前資料庫。
 * @param file - 要替換的資料庫檔案。
 */
async function replaceDatabase(file: File): Promise<void> {
   const dbPath = getDatabasePath();
   if (file.type !== "application/octet-stream") {
      throw new Error("無效的檔案類型，請上傳 .db 檔案。");
   }
   const buffer = await file.arrayBuffer();
   await fs.writeFile(dbPath, Buffer.from(buffer));
}

/**
 * 匯出當前資料庫並上傳至 Discord。
 * @param interaction - Discord 訊息元件互動。
 */
async function exportDatabase(
   interaction: MessageComponentInteraction,
): Promise<void> {
   try {
      const message = await createDatabaseBackup();
      if (
         !interaction.channel ||
         interaction.channel.type !== ChannelType.GuildText
      ) {
         await interaction.reply({
            content: "此命令只能在文字頻道中使用。",
            ephemeral: EPHEMERAL_REPLY,
         });
         return;
      }
      const channel = interaction.channel;
      if (channel && message) {
         await message.forward(channel);
         await interaction.reply({ content: "資料庫備份成功！" });
      }
   } catch (error) {
      console.error("匯出資料庫時發生錯誤：", error);
      await interaction.reply({
         content: "資料庫備份時發生錯誤，請重試。",
         ephemeral: EPHEMERAL_REPLY,
      });
   }
}

/**
 * 建立資料庫備份並上傳至 Discord。
 * @param isReplacement - 是否為替換操作的備份。
 * @returns 已發送的 Discord 訊息，若失敗則返回 null。
 */
async function createDatabaseBackup(
   isReplacement = false,
): Promise<Message | null> {
   const dbPath = getDatabasePath();
   const config = await readConfig();
   const backupChannel = client.channels.cache.get(
      config.discord.channelIds.databaseBackup,
   );

   if (!backupChannel || backupChannel.type !== ChannelType.GuildText) {
      throw new Error(
         "備份頻道未找到或無效。" + config.discord.channelIds.databaseBackup,
      );
   }

   try {
      await fs.access(dbPath);
      const hash = await hashing.hashFile(dbPath, "sha256");

      // compare with existing backups
      const existingBackups = await listDatabaseBackups();
      const existingBackup = existingBackups.find(
         (backup) => backup.hash === hash,
      );
      if (existingBackup) {
         const existingBackupMessage = await backupChannel.messages
            .fetch(existingBackup.id)
            .catch(() => null);
         return existingBackupMessage || null;
      }

      const fileName = isReplacement
         ? `replace_backup_${Date.now()}.db`
         : `backup_${Date.now()}.db`;

      const message = await backupChannel.send({
         content: `hash: ${hash}`,
         files: [{ attachment: dbPath, name: fileName }],
         embeds: [
            {
               title: "資料庫備份",
               description: `資料庫已備份為：\`${fileName}\``,
               color: 0x00ff00,
               timestamp: new Date().toISOString(),
            },
         ],
      });
      return message;
   } catch (error) {
      console.error("建立資料庫備份時發生錯誤：", error);
      await backupChannel.send({
         embeds: [
            {
               title: "資料庫備份失敗",
               description: "備份資料庫時發生錯誤，請確認資料庫檔案存在。",
               color: 0xff0000,
               timestamp: new Date().toISOString(),
            },
         ],
      });
      throw new Error("備份資料庫失敗，請確認資料庫檔案存在。");
   }
}

/**
 * 從 Discord 頻道取得資料庫備份清單。
 * @returns 備份元資料陣列。
 */
async function listDatabaseBackups(): Promise<BackupMessage[]> {
   const config = await readConfig();
   const backupChannel = client.channels.cache.get(
      config.discord.channelIds.databaseBackup,
   );

   if (!backupChannel || backupChannel.type !== ChannelType.GuildText) {
      return [];
   }

   const messages = await backupChannel.messages.fetch({ limit: 100 });
   const backupMessages = messages.filter(
      (message) =>
         message.attachments.some(
            (attachment) => attachment.name?.endsWith(".db") && attachment.url,
         ) && message.author.id === client.user?.id,
   );

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
      .filter((backup): backup is BackupMessage => backup !== null);
}

/**
 * 從 Discord 頻道刪除資料庫備份。
 * @param backupId - 要刪除的備份訊息 ID。
 * @returns 若刪除成功返回 true，否則返回 false。
 */
async function deleteDatabaseBackup(backupId: string): Promise<boolean> {
   const config = await readConfig();
   const backupChannel = client.channels.cache.get(
      config.discord.channelIds.databaseBackup,
   );

   if (!backupChannel || backupChannel.type !== ChannelType.GuildText) {
      return false;
   }

   const backupMessage = await backupChannel.messages
      .fetch(backupId)
      .catch(() => null);
   if (backupMessage) {
      await backupMessage.delete();
      return true;
   }
   return false;
}

/**
 * 取得當前資料庫的資訊。
 * @returns 資料庫資訊，若發生錯誤則返回 null。
 */
async function getDatabaseInfo(): Promise<DatabaseInfo | null> {
   const dbPath = getDatabasePath();
   try {
      await fs.access(dbPath);
      const hash = await hashing.hashFile(dbPath, "sha256");
      const stats = await fs.stat(dbPath);
      return {
         hash,
         lastModified: stats.mtime.toISOString(),
      };
   } catch (error) {
      console.error("取得資料庫資訊時發生錯誤：", error);
      return null;
   }
}

export {
   replaceDatabaseFromDiscord,
   exportDatabase,
   createDatabaseBackup,
   listDatabaseBackups,
   deleteDatabaseBackup,
   getDatabaseInfo,
   downloadAndReplaceDatabase,
   replaceDatabase,
};
