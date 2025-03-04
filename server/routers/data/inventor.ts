import { z } from "zod";
import { procedure, router } from "../../trpc";
import { CustomZodType } from "~/zod.dto";
import { dbZ } from "~/server";
export default router({
   // Create
   // TODO
   // ... implement createInventor procedure

   // Read
   getInventors: procedure
      .input(dbZ.InventorWhereInputSchema)
      .query(async ({ input }) => {
         return await prisma.inventor.findMany({
            where: input,
            include: {
               contactInfo: true,
               department: {
                  include: {
                     college: true,
                  },
               },
            },
         });
      }),
});
