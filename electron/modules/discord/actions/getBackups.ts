import { ChannelType, type Client } from "discord.js";
import { ActionEvent } from "../baseActionEvent";
import { z } from "zod";
import { listDatabaseBackups } from "../utils/database";

const inputSchema = z.object({});

export class GetBackupsAction extends ActionEvent<
   typeof inputSchema,
   Awaited<ReturnType<typeof listDatabaseBackups>>
> {
   constructor() {
      super("getBackups", inputSchema);
   }

   public override async execute(
      input: object,
      client: Client,
   ): Promise<Awaited<ReturnType<typeof listDatabaseBackups>>> {
      return await listDatabaseBackups();
   }
}
