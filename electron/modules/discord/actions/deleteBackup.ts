import type { Client } from "discord.js";
import { ActionEvent } from "../baseActionEvent";
import { z } from "zod";
import { deleteDatabaseBackup } from "../utils/database";

const inputSchema = z.object({
   backupId: z.string(),
});

export class DeleteBackupAction extends ActionEvent<
   typeof inputSchema,
   Awaited<ReturnType<typeof deleteDatabaseBackup>>
> {
   constructor() {
      super("deleteBackup", inputSchema);
   }

   public override async execute(input: { backupId: string }, client: Client) {
      return await deleteDatabaseBackup(input.backupId);
   }
}
