import type { Client } from "discord.js";
import { ActionEvent } from "../baseActionEvent";
import { z } from "zod";
import { getDatabaseInfo } from "../utils/database";

const inputSchema = z.object({});

export class GetCurrentDBInfoAction extends ActionEvent<
   typeof inputSchema,
   Awaited<ReturnType<typeof getDatabaseInfo>>
> {
   constructor() {
      super("getCurrentDBInfo", inputSchema);
   }

   public override async execute(input: object, client: Client) {
      return await getDatabaseInfo();
   }
}
