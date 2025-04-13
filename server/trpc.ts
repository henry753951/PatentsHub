import { initTRPC } from "@trpc/server";
// import transformer from "trpc-transformer";
const t = initTRPC.create({
   isServer: true,
   // transformer
});

const { router, middleware, procedure } = t;

export { router, middleware, procedure };
