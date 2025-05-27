import { ChannelType, type Client } from "discord.js";
import { ActionEvent } from "../baseActionEvent";
import { z } from "zod";
import { createDatabaseBackup } from "../utils/database";

const inputSchema = z.object({});

export class CreateBackupAction extends ActionEvent<typeof inputSchema, void> {
   constructor() {
      super("createBackup", inputSchema);
   }

   public override async execute(input: object, client: Client): Promise<void> {
      await createDatabaseBackup();
      return;
   }
}
