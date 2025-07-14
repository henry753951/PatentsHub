import type { z } from "zod";
import { procedure, router } from "../../../server/trpc";
import type { Client } from "discord.js";
import { getClient } from "../discord";

export abstract class ActionEvent<T extends z.ZodTypeAny, TOutput> {
   public name: string;
   public inputSchema: T;

   constructor(name: string, inputSchema: T) {
      this.name = name;
      this.inputSchema = inputSchema;
   }

   public abstract execute(input: z.infer<T>, client: Client): Promise<TOutput>;

   public getProcedure() {
      return procedure.input(this.inputSchema).mutation(async ({ input }) => {
         const client = getClient();
         if (!client) {
            throw new Error("Client is not initialized.");
         }
         return this.execute(input, client);
      });
   }
}
