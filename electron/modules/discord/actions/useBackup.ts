import type { Client } from "discord.js";
import { ActionEvent } from "../baseActionEvent";
import { z } from "zod";
import { backupDB, useBackup } from "../utils/database";

const inputSchema = z.object({
   url: z.string(),
});

export class UseBackupAction extends ActionEvent<typeof inputSchema, void> {
   constructor() {
      super("useBackup", inputSchema);
   }

   public override async execute(input: { url: string }, client: Client) {
      const { url } = input;
      await backupDB(true);
      await useBackup(url);
      return;
   }
}
