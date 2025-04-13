import { router } from "../../trpc";
import note from "./note";
import country from "./country";
import patent from "./patent";
import college from "./college";
import inventor from "./inventor";
import agency from "./agency";
import contactInfo from "./contactInfo";
import patentRecord from "./patentRecord";
import patentStatus from "./patentStatus";
import fundingUnit from "./fundingUnit";
import fundingPlan from "./fundingPlan";
import patentOwner from "./patentOwner";
export default router({
   country: country,
   patent: patent,
   college: college,
   inventor: inventor,
   agency: agency,
   contactInfo: contactInfo,
   note: note,
   patentStatus: patentStatus,
   patentRecord: patentRecord,
   patentOwner: patentOwner,
   fundingUnit: fundingUnit,
   fundingPlan: fundingPlan,
});
