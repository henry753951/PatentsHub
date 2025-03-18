import { z } from "zod";
import { procedure, router } from "../../trpc";
import { CustomZodType } from "~/zod.dto";
import { dbZ } from "~/server";
import type { Prisma } from "@prisma/client";
export default router({
   // Create
   createInventor: procedure
      .input(dbZ.InventorCreateInputSchema)
      .mutation(async ({ input }) => {
         return await prisma.inventor.create({
            data: input as Prisma.InventorCreateInput,
         });
      }),

   // Read
   getInventors: procedure
      .input(dbZ.InventorWhereInputSchema)
      .query(async ({ input }) => {
         return await prisma.inventor.findMany({
            where: input as Prisma.InventorWhereInput,
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
         return await prisma.inventor.update({
            where: input.where,
            data: input.data as Prisma.InventorUpdateInput,
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
         return await prisma.inventor.delete({
            where: input.where as Prisma.InventorWhereUniqueInput,
         });
      }),
});
