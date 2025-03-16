import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({ isServer: true, transformer: superjson });

const { router, middleware, procedure } = t;

export { router, middleware, procedure };
