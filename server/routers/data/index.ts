import { router } from "../../trpc";
import country from "./country";
import patent from "./patent";
export default router({
   country: country,
   patent: patent,
});
