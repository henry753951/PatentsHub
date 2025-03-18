import { z } from "zod";
import { procedure, router } from "../../trpc";
import { dbZ } from "~/server";

export default router({
   // 1. 創建 PatentRecord
   createPatentRecord: procedure
      .input(
         z.object({
            patentID: z.number(), // 專利 ID
            record: z.string().nullable(), // 紀錄內容
            date: z.string().datetime().optional(), // 日期
         }),
      )
      .mutation(async ({ input }) => {
         // 檢查 PatentID 是否存在
         const patentExists = await prisma.patent.findUnique({
            where: { PatentID: input.patentID },
         });
         if (!patentExists) {
            throw new Error("指定的專利不存在");
         }

         return await prisma.patentRecord.create({
            data: {
               PatentID: input.patentID,
               Record: input.record,
               Date: input.date ? new Date(input.date) : null,
            },
         });
      }),

   // 2. 獲取 PatentRecords（多條紀錄）
   getPatentRecords: procedure
      .input(z.object({ patentID: z.number() }))
      .query(async ({ input }) => {
         return await prisma.patentRecord.findMany({
            where: { PatentID: input.patentID },
            orderBy: { Date: "asc" }, // 按日期排序
         });
      }),

   // 3. 更新 PatentRecord（根據紀錄 ID）
   updatePatentRecord: procedure
      .input(
         z.object({
            id: z.number(), // 紀錄 ID
            record: z.string().nullable(),
            date: z.string().datetime().optional(),
         }),
      )
      .mutation(async ({ input }) => {
         const recordExists = await prisma.patentRecord.findUnique({
            where: { id: input.id },
         });
         if (!recordExists) {
            throw new Error("紀錄不存在");
         }

         return await prisma.patentRecord.update({
            where: { id: input.id },
            data: {
               Record: input.record,
               Date: input.date ? new Date(input.date) : null,
            },
         });
      }),

   // 4. 刪除 PatentRecord（根據紀錄 ID）
   deletePatentRecord: procedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
         const recordExists = await prisma.patentRecord.findUnique({
            where: { id: input.id },
         });
         if (!recordExists) {
            throw new Error("紀錄不存在");
         }

         return await prisma.patentRecord.delete({
            where: { id: input.id },
         });
      }),
});
