import type { Client } from "discord.js";
import { ActionEvent } from "../baseActionEvent";
import { z } from "zod";
import { deleteBackup } from "../utils/database";

const inputSchema = z.object({
   backupId: z.string(),
});

export class DeleteBackupAction extends ActionEvent<
   typeof inputSchema,
   Awaited<ReturnType<typeof deleteBackup>>
> {
   constructor() {
      super("deleteBackup", inputSchema);
   }

   public override async execute(input: { backupId: string }, client: Client) {
      return await deleteBackup(input.backupId);
   }
}
