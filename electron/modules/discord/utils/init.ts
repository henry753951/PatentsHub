import type { Client } from "discord.js";
import { REST, Routes } from "discord.js";
import type { SlashCommand } from "../baseCommandEvent";
import { events } from "../index";
import { router } from "../../../../server/trpc";
import type { ActionEvent } from "../baseActionEvent";
import type { Procedure } from "@trpc/server";

type InferProcedure<T> = T extends { getProcedure: () => infer P } ? P : never;
type ActionEventKeys = keyof typeof events.actionEvents;

type ActionMap = {
   [K in ActionEventKeys]: InferProcedure<
      InstanceType<(typeof events.actionEvents)[K]>
   >;
};

export async function loadCommands(): Promise<SlashCommand<string>[]> {
   const commands: SlashCommand<string>[] = [];
   const commandsList = events.commandEvents;

   for (const CommandClass of commandsList) {
      const commandInstance = new CommandClass();
      commands.push(commandInstance);
   }
   return commands;
}
export function loadActions() {
   const actionMap = Object.fromEntries(
      Object.entries(events.actionEvents).map(([name, ActionClass]) => {
         const actionInstance = new ActionClass();
         return [name, actionInstance.getProcedure()];
      }),
   );
   const actionRouter = router(actionMap as ActionMap);
   return actionRouter;
}

export async function registerSlashCommands(
   commands: SlashCommand<string>[],
   client: Client,
   guildId: string,
) {
   const rest = new REST({ version: "10" }).setToken(client.token || "");

   const commandData = commands.map((command) => command.cmd.toJSON());

   try {
      await rest.put(
         Routes.applicationGuildCommands(client.user?.id || "", guildId),
         {
            body: commandData,
         },
      );
      console.log("Slash Commands successfully registered:", commandData);
   }
   catch (error) {
      console.error("Error registering slash commands:", error);
   }
}
