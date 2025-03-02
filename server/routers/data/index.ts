import { router } from "../../trpc";
import country from "./country";
import patent from "./patent";
import college from "./college";
export default router({
   country: country,
   patent: patent,
   college: college,
});
