import { z } from "zod";
import { procedure, router } from "./trpc";
import appRouter from "./routers/app";
import testDB from "./routers/test";

export const mainRouter = router({
   test: router({
      hello: procedure.input(z.object({}).nullish()).query(({ input }) => {
         return "Hello World!";
      }),
      testDB: testDB,
   }),
   // 在此底下添加新的 trpc router (位於 server/routers/ 目錄下)
   app: appRouter,
});

export type MainRouter = typeof mainRouter;
