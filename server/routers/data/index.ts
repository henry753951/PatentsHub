import { router } from "../../trpc";
import country from "./country";
import patent from "./patent";
import collage from "./collage";
export default router({
   country: country,
   patent: patent,
   collage: collage,
});
