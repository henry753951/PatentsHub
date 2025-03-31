import { router } from "../../trpc";
import window from "./window";
import config from "./config";

export default router({
   window: window,
   config: config,
});
