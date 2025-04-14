import { createTRPCProxyClient } from "@trpc/client";
import type { MainRouter } from "~/server/mainRouter";
import { ipcLink } from "electron-trpc/renderer";
import supejson from "superjson";
export default defineNuxtPlugin(() => {
   try {
      const trpc = createTRPCProxyClient<MainRouter>({
         links: [ipcLink()],
         transformer: supejson,
      });
      return {
         provide: {
            trpc,
         },
      };
   }
   catch (err) {
      console.error("Failed to load electron");
      consola.error(err);
   }
});
