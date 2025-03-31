import { z } from "zod";
import { procedure, router } from "./trpc";
import appRouter from "./routers/app";
import data from "./routers/data";

export const mainRouter = router({
   test: router({
      hello: procedure.input(z.object({}).nullish()).query(({ input }) => {
         return "Hello World!";
      }),
   }),
   // 在此底下添加新的 trpc router (位於 server/routers/ 目錄下)
   app: appRouter,
   data: data,
});

export type MainRouter = typeof mainRouter;
