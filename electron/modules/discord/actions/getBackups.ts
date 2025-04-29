import { ChannelType, type Client } from "discord.js";
import { ActionEvent } from "../baseActionEvent";
import { z } from "zod";
import { getBackups } from "../utils/database";

const inputSchema = z.object({});

export class GetBackupsAction extends ActionEvent<
   typeof inputSchema,
   Awaited<ReturnType<typeof getBackups>>
> {
   constructor() {
      super("getBackups", inputSchema);
   }

   public override async execute(
      input: object,
      client: Client,
   ): Promise<Awaited<ReturnType<typeof getBackups>>> {
      return await getBackups();
   }
}
