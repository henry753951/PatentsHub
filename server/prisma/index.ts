import path from "path";
import { PrismaClient } from "./generated/client";
import { app } from "electron";
import * as dbZod from "./zod";

// Prevent multiple instances of Prisma Client in development
// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
// Add prisma to the global type
declare global {
   // eslint-disable-next-line no-var
   var prisma: PrismaClient;
}

const isProduction = app.isPackaged;
const dbPath = isProduction
   ? `file:${path.join(app.getPath("userData"), "app.db")}`
   : process.env.DATABASE_URL;

export const prisma
   = global.prisma
     ?? new PrismaClient({
        log: isProduction ? ["error"] : ["query", "info", "error", "warn"],
        datasources: {
           db: {
              url: dbPath,
           },
        },
     });

export const dbZ = dbZod;
if (!isProduction) global.prisma = prisma;
