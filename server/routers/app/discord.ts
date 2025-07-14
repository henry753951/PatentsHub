import { procedure, router } from "../../trpc";
import { z } from "zod";
import { observable } from "@trpc/server/observable";
import { app, shell } from "electron";
import EventEmitter from "events";
import type { events } from "../../../electron/modules/discord/index";
import { loadActions } from "../../../electron/modules/discord/utils/init";
export const slashCommandEmitter = new EventEmitter();

export default router({
   onSlashCommand: procedure.subscription(() => {
      return observable<CommandExecuteReturnTypes>((emit) => {
         const handler = (type: string, data?: any) => {
            emit.next({ type, data } as CommandExecuteReturnTypes);
         };
         slashCommandEmitter.on("command", handler);
         return () => slashCommandEmitter.off("command", handler);
      });
   }),
   actions: loadActions(),
});

type CommandConstructors = (typeof events.commandEvents)[number];
type CommandExecuteReturnTypes = Awaited<
   ReturnType<InstanceType<CommandConstructors>["execute"]>
>;
