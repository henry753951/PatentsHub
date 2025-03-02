import { z } from "zod";
import { procedure, router } from "../../trpc";
import CustomZodType from "~/customZod";
export default router({
   // Create
   createCollage: procedure
      .input(
         z.object({
            name: z.string(),
            description: z.string(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.college.create({
            data: {
               Name: input.name,
               Description: input.description,
            },
         });
      }),
   createDepartment: procedure
      .input(
         z.object({
            name: z.string(),
            description: z.string(),
            collageID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.department.create({
            data: {
               Name: input.name,
               Description: input.description,
               CollegeID: input.collageID,
            },
         });
      }),

   // Read
   getCollages: procedure.query(async () => {
      return await prisma.college.findMany({
         select: {
            Name: true,
            Description: true,
            CollegeID: true,
            departments: true,
         },
      });
   }),

   // Update
   updateCollage: procedure
      .input(
         z.object({
            ID: z.number(),
            name: z.string(),
            description: z.string(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.college.update({
            where: {
               CollegeID: input.ID,
            },
            data: {
               Name: input.name,
               Description: input.description,
            },
         });
      }),
   updateDepartment: procedure
      .input(
         z.object({
            ID: z.number(),
            collageID: z.number(),
            name: z.string(),
            description: z.string(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.department.update({
            where: {
               DepartmentID: input.ID,
            },
            data: {
               CollegeID: input.collageID,
               Name: input.name,
               Description: input.description,
            },
         });
      }),

   // Delete
   deleteCollage: procedure
      .input(
         z.object({
            collageID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.college.delete({
            where: {
               CollegeID: input.collageID,
            },
         });
      }),
   deleteDepartment: procedure
      .input(
         z.object({
            departmentID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.department.delete({
            where: {
               DepartmentID: input.departmentID,
            },
         });
      }),
});
