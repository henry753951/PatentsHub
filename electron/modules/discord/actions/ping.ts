import { ChannelType, type Client } from "discord.js";
import { ActionEvent } from "../baseActionEvent";
import { z } from "zod";
import { readConfig } from "~/electron/utils/config";

const inputSchema = z.object({
   ping: z.string().optional(),
});

export class PingAction extends ActionEvent<typeof inputSchema, string> {
   constructor() {
      super("ping", inputSchema);
   }

   private async getIP() {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
   }

   public override async execute(
      input: { ping?: string | undefined },
      client: Client,
   ) {
      const {
         discord: { guildId, channelIds },
      } = await readConfig();
      const channel = client.channels.cache.get(channelIds.log);
      const ip = await this.getIP();
      const latency = client.ws.ping.toString() + "ms";

      if (channel?.type === ChannelType.GuildText) {
         channel.send({
            embeds: [
               {
                  title: "Pong!",
                  description: `\`\`\`
IP: ${ip}
Latency: ${latency}
\`\`\``,
                  color: 0x00ff00,
                  timestamp: new Date().toISOString(),
               },
            ],
         });
      }

      return latency;
   }
}
