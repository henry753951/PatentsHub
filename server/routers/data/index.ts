import { router } from "../../trpc";
import country from "./country";
import patent from "./patent";
import college from "./college";
import inventor from "./inventor";
import agency from "./agency";
import contactInfo from "./contactInfo";
import note from "./note";
export default router({
   country: country,
   patent: patent,
   college: college,
   inventor: inventor,
   agency: agency,
   contactInfo: contactInfo,
   note: note,
});
