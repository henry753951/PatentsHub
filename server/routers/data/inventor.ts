import { z } from "zod";
import { procedure, router } from "../../trpc";
import CustomZodType from "~/zod.dto";
export default router({
   // Create
   // TODO
   // ... implement createInventor procedure

   // Read
   getInventors: procedure.query(async () => {
      return await prisma.inventor.findMany();
   }),
});
