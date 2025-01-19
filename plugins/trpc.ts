import { createTRPCProxyClient } from "@trpc/client";
import type { MainRouter } from "~/server/mainRouter";
import { ipcLink } from "electron-trpc/renderer";

export default defineNuxtPlugin(() => {
   try {
      const trpc = createTRPCProxyClient<MainRouter>({
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
