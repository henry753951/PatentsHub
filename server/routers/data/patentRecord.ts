import { z } from "zod";
import { procedure, router } from "../../trpc";
import { dbZ, prisma } from "../..";

export default router({
   // 獲取 PatentRecords（多條紀錄）
   getPatentRecords: procedure
      .input(z.object({ patentID: z.number() }))
      .query(async ({ input }) => {
         return await prisma.patentRecord.findMany({
            where: { PatentID: input.patentID },
            orderBy: { Date: "asc" }, // 按日期排序
         });
      }),

   // 更新 PatentRecord（根據紀錄 ID）
   upsertPatentRecord: procedure
      .input(
         z.object({
            patentID: z.number(),
            id: z.number().optional(),
            record: z.string(),
            date: z.date(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.patentRecord.upsert({
            where: { id: input.id ?? -1 },
            update: {
               Record: input.record,
               Date: input.date,
            },
            create: {
               PatentID: input.patentID,
               Record: input.record,
               Date: input.date,
            },
         });
      }),

   // 刪除 PatentRecord（根據紀錄 ID）
   deletePatentRecord: procedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
         return await prisma.patentRecord.delete({
            where: { id: input.id },
         });
      }),
});
