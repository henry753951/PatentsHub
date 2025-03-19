import { z } from "zod";
import { procedure, router } from "../../trpc";
import { CustomZodType } from "~/zod.dto";
import { dbZ } from "~/server";
export default router({
   // Create
   createInventor: procedure
      .input(dbZ.InventorCreateInputSchema)
      .mutation(async ({ input }) => {
         return await prisma.$transaction(async (prisma) => {
            return await prisma.inventor.create({
               data: input,
            });
         });
      }),

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

   // Update
   updateInventor: procedure
      .input(
         z.object({
            where: dbZ.InventorWhereUniqueInputSchema,
            data: dbZ.InventorUpdateInputSchema,
         }),
      )
      .mutation(async ({ input }) => {
         console.log("Received input:", input);
         console.log("Department", input.data.department);
         console.log("ContactInfo", input.data.contactInfo);
         return await prisma.inventor.update({
            where: input.where,
            data: input.data,
         });
      }),

   // Delete
   deleteInventor: procedure
      .input(
         z.object({
            where: dbZ.InventorWhereUniqueInputSchema,
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.$transaction(async (prisma) => {
            // 先查詢 Inventor，拿到 ContactInfoID
            const inventor = await prisma.inventor.findUnique({
               where: { InventorID: input.where.InventorID },
               select: { ContactInfoID: true },
            });

            if (!inventor || !inventor.ContactInfoID) {
               throw new Error("Inventor 或 ContactInfoID 不存在");
            }
            // 刪除 Inventor
            await prisma.inventor.delete({
               where: { InventorID: input.where.InventorID },
            });
            // 刪除 ContactInfo
            await prisma.contactInfo.delete({
               where: { ContactInfoID: inventor.ContactInfoID },
            });
         });
      }),
});
