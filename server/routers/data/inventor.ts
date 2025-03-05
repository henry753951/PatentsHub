import { z } from "zod";
import { procedure, router } from "../../trpc";
import CustomZodType from "~/zod.dto";
export default router({
   // Create
   createInventor: procedure
      .input(
         z.object({
            name: z.string().nonempty("發明人姓名不可為空"),
            email: z.string().email("請輸入有效的 Email").optional(),
            departmentID: z.number().int(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.inventor.create({
            data: {
               Name: input.name,
               Email: input.email,
               Department: input.departmentID,
            },
         });
      }),
   // Read
   getInventors: procedure
      .input(
         z.object({
            departmentID: z.number().int(),
         }),
      )
      .query(async ({ input }) => {
         return await prisma.inventor.findMany({
            where: {
               Department: input?.departmentID,
            },
            select: {
               InventorID: true,
               Name: true,
               Email: true,
               Department: true,
               department: {
                  // 添加關聯查詢，返回系所名稱
                  select: {
                     DepartmentID: true,
                     Name: true,
                  },
               },
            },
         });
      }),
   // Update
   updateInventor: procedure
      .input(
         z.object({
            id: z.number(),
            name: z.string().nonempty("發明人姓名不可為空"),
            email: z.string().email("請輸入有效的 Email").optional(),
            departmentID: z.number().int(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.inventor.update({
            where: {
               InventorID: input.id,
            },
            data: {
               Name: input.name,
               Email: input.email,
               Department: input.departmentID,
            },
         });
      }),
   // Delete
   deleteInventor: procedure
      .input(
         z.object({
            inventorID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.inventor.delete({
            where: {
               InventorID: input.inventorID,
            },
         });
      }),
});
