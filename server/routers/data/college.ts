import { z } from "zod";
import { procedure, router } from "../../trpc";
import { CustomZodType } from "~/zod.dto";
import { dbZ, prisma } from "../..";

export default router({
   // Create
   createCollege: procedure
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
            collegeID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.department.create({
            data: {
               Name: input.name,
               Description: input.description,
               CollegeID: input.collegeID,
            },
         });
      }),

   // Read
   getColleges: procedure.query(async () => {
      return await prisma.college.findMany({
         select: {
            Name: true,
            Description: true,
            CollegeID: true,
            departments: {
               include: {
                  college: true,
               },
            },
         },
      });
   }),

   // Update
   updateCollege: procedure
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
            collegeID: z.number(),
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
               CollegeID: input.collegeID,
               Name: input.name,
               Description: input.description,
            },
         });
      }),

   // Delete
   deleteCollege: procedure
      .input(
         z.object({
            collegeID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.college.delete({
            where: {
               CollegeID: input.collegeID,
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
