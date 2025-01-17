import { createTRPCProxyClient } from "@trpc/client";
import type { AppRouter } from "~/server/appRouter";
import { ipcLink } from "electron-trpc/renderer";

export default defineNuxtPlugin(() => {
   try {
      const trpc = createTRPCProxyClient<AppRouter>({
         links: [ipcLink()],
      });
      return {
         provide: {
            trpc,
         },
      };
   }
   catch {
      console.error("Failed to load electron");
   }
});
