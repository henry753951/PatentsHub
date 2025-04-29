import { PrismaClient } from "@prisma/client";
import consola from "consola";

export class BaseScript {
   name: string;
   description: string;
   prismaClients: Map<string, PrismaClient>;

   constructor() {
      this.name = "BaseScript";
      this.description = "Base class for all scripts";
   }

   public initializePrismaClient(key: string, dbPath: string) {
      consola.info(`Initializing PrismaClient(${key})...`);
      const prisma = new PrismaClient({
         datasources: {
            db: {
               url: dbPath,
            },
         },
      });
      consola.success(`PrismaClient(${key}) initialized.`);
      this.prismaClients.set(key, prisma);
      return prisma;
   }

   public run() {
      console.log("Running base script...");
   }
}
