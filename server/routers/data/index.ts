import { router } from "../../trpc";
import country from "./country";
import patent from "./patent";
import college from "./college";
import inventor from "./inventor";
import agency from "./agency";
export default router({
   country: country,
   patent: patent,
   college: college,
   inventor: inventor,
   agency: agency,
});
