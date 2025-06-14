import path from "path";
import { PrismaClient } from "@prisma/client";
import { app } from "electron";
import * as dbZod from "./prisma/zod";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { MainRouter } from "./mainRouter";
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
console.log("DB Path:", dbPath, process.env.PRISMA_LOG);
export const prisma
   = global.prisma
     || new PrismaClient({
        log: (() => {
           if (isProduction) {
              return [{ emit: "event", level: "error" }];
           }
           if (JSON.parse(process.env.PRISMA_LOG || "false")) {
              return [
                 { emit: "event", level: "query" },
                 { emit: "stdout", level: "error" },
                 { emit: "stdout", level: "info" },
                 { emit: "stdout", level: "warn" },
              ];
           }
           return [];
        })(),
        datasources: {
           db: { url: dbPath },
        },
     });

if (!isProduction) global.prisma = prisma;

prisma.$on(
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   // @ts-expect-error
   "query",
   (e: { query: string, params: string, duration: number }) => {
      console.log("Query:", e.query);
      console.log("Params:", e.params);
      console.log("Duration:", e.duration);
   },
);

export const dbZ = dbZod;

export type RouterInput = inferRouterInputs<MainRouter>;
export type RouterOutput = inferRouterOutputs<MainRouter>;
