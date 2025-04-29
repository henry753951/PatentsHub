// electron/modules/discord/commands/database.ts
import { SlashCommand } from "../baseCommandEvent";
import {
   type CommandInteraction,
   type MessageComponentInteraction,
   ButtonBuilder,
   ButtonStyle,
} from "discord.js";
import type { BrowserWindow } from "electron";
import { replaceDB, exportDB } from "../utils/database";
const ephemeral = true;

export class DatabaseCommand extends SlashCommand<"database"> {
   constructor() {
      super("database" as const, "資料庫操作指令");
      this.cmd.addAttachmentOption((option) =>
         option
            .setName("db")
            .setDescription("上傳的資料庫檔案（.db 格式）")
            .setRequired(false),
      );
   }

   override async execute(
      interaction: CommandInteraction,
      mainWindow: BrowserWindow,
   ) {
      // 檢查是否有提供 db 附件
      const dbAttachment = interaction.options.get("db");

      if (dbAttachment) {
         // 如果提供了 db 附件，直接執行備份和取代
         await replaceDB(interaction, dbAttachment);
         return this.returnEvent({
            type: "replace_db" as const,
         });
      }
      else {
         // 否則顯示匯出按鈕
         const buttons = [
            new ButtonBuilder()
               .setCustomId("export_db")
               .setLabel("匯出資料庫")
               .setStyle(ButtonStyle.Primary),
         ];

         await interaction.reply({
            content: "資料庫操作選項：",
            components: [
               {
                  type: 1,
                  components: buttons,
               },
            ],
         });

         // 創建按鈕交互收集器
         const filter = (i: MessageComponentInteraction) =>
            i.customId === "export_db";
         const collector = interaction.channel?.createMessageComponentCollector(
            {
               filter,
               time: 60000,
            },
         );

         collector?.on("collect", async (i: MessageComponentInteraction) => {
            await exportDB(i);
         });

         collector?.on("end", async () => {
            await interaction.editReply({
               content: "選單已超時，請重新執行指令。",
               components: [],
            });
         });
         return this.returnEvent({
            type: "export_db" as const,
         });
      }
   }
}

export type DatabaseCommandEvent = typeof DatabaseCommand.prototype.execute;
