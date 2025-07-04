import type { Client } from "discord.js";
import { ActionEvent } from "../baseActionEvent";
import { z } from "zod";
import {
   createDatabaseBackup,
   downloadAndReplaceDatabase,
   replaceDatabase,
} from "../utils/database";

const inputSchema = z.object({
   url: z.string().url("請提供有效的 URL"),
});

export class UseBackupUrlAction extends ActionEvent<typeof inputSchema, void> {
   constructor() {
      super("useBackupUrl", inputSchema);
   }

   public override async execute(input: { url: string }, client: Client) {
      const { url } = input;
      await createDatabaseBackup(true);
      await downloadAndReplaceDatabase(url);
      return;
   }
}
