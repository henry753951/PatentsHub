import type { Client, WebSocketManager } from "discord.js";

import { ActionEvent } from "../baseActionEvent";
import { z } from "zod";

const inputSchema = z.object({});

export class GetClientInfoAction extends ActionEvent<
   typeof inputSchema,
   {
      success: boolean
      data: {
         userId?: string
         userName?: string
         userAvatar?: string
         health: { status: WebSocketManager["status"], uptime: number | null }
      }
   }
> {
   constructor() {
      super("GetClientInfo", inputSchema);
   }

   public override async execute(input: object, client: Client) {
      const data = {
         userId: client.user?.id,
         userName: client.user?.username
            ? `${client.user.username}#${client.user.discriminator}`
            : undefined,
         userAvatar: client.user?.displayAvatarURL(),
         health: {
            status: client.ws.status,
            uptime: client.uptime,
         },
      };

      const success = client.ws.status !== 5 && client.user !== null && client.isReady();
      console.log("Discord client isReady:", client.isReady());
      return {
         success,
         data,
      };
   }
}
