import { z } from "zod";
import { procedure, router } from "./trpc";
import windowRouter from "./routers/window";

export const appRouter = router({
   greeting: procedure
      .input(z.object({ name: z.string() }).nullish())
      .query(({ input }) => {
         return `hello ${input?.name ?? "world"}!`;
      }),
   // 在此底下添加新的 trpc router (位於 server/routers/ 目錄下)
   window: windowRouter,
});

export type AppRouter = typeof appRouter;
