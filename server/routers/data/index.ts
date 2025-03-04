import { router } from "../../trpc";
import country from "./country";
import patent from "./patent";
import college from "./college";
import inventor from "./inventor";
export default router({
   country: country,
   patent: patent,
   college: college,
   inventor: inventor,
});
