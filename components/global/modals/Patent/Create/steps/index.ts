import { z } from "zod";
import BasicStep, { schema as schema1 } from "./1.basic.vue";

const steps = [
   {
      component: BasicStep,
      name: "Basic 1",
      description: "Basic information",
      step: 1,
   },
   {
      component: BasicStep,
      name: "Basic 2",
      description: "Basic information",
      step: 2,
   },
] as IFormStep[];

export default steps;
export const combinedSchema = z.object({
   1: schema1,
   2: schema1,
});
