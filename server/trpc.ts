import { initTRPC } from "@trpc/server";

const t = initTRPC.create({ isServer: true });

const { router, middleware, procedure } = t;

export { router, middleware, procedure };
