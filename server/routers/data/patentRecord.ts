import { z } from "zod";
import { procedure, router } from "../../trpc";
import { dbZ } from "~/server";

export default router({
   // 1. 創建 PatentRecord
   createPatentRecord: procedure
      .input(
         z.object({
            patentID: z.number(), // 專利 ID
            record: z.string(),
            date: z.date(), // 日期
         }),
      )
      .mutation(async ({ input }) => {
         // 檢查 PatentID 是否存在
         return await prisma.patentRecord.create({
            data: {
               PatentID: input.patentID,
               Record: input.record,
               Date: input.date,
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
            record: z.string(),
            date: z.date(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.patentRecord.update({
            where: { id: input.id },
            data: {
               Record: input.record,
               Date: input.date,
            },
         });
      }),

   // 4. 刪除 PatentRecord（根據紀錄 ID）
   deletePatentRecord: procedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
         return await prisma.patentRecord.delete({
            where: { id: input.id },
         });
      }),
});
