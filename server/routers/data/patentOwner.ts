import { z } from "zod";
import { procedure, router } from "../../trpc";
import { prisma } from "~/server"; // 假設這是你的 Prisma 實例

export default router({
   // 獲取 PatentOwners（某專利的所有權人）
   getPatentOwners: procedure
      .input(z.object({ patentID: z.number() }))
      .query(async ({ input }) => {
         return await prisma.patentOwner.findMany({
            where: { PatentID: input.patentID },
            orderBy: { OwnerID: "asc" }, // 按 OwnerID 排序
         });
      }),

   // 新增或更新 PatentOwner
   upsertPatentOwner: procedure
      .input(
         z.object({
            patentID: z.number(),
            ownerID: z.number().optional(), // 如果有 ownerID 則更新，否則新增
            name: z.string().min(1, "所有權人名字不能為空"),
            ownershipPercentage: z
               .number()
               .min(0, "持有度不能為負")
               .max(100, "持有度不能超過 100%"),
         }),
      )
      .mutation(async ({ input }) => {
         // 驗證總持有度（可選，根據需求決定是否啟用）
         const owners = await prisma.patentOwner.findMany({
            where: { PatentID: input.patentID },
         });
         const currentTotal = owners
            .filter((owner) => owner.OwnerID !== input.ownerID) // 排除當前正在更新的記錄
            .reduce((sum, owner) => sum + owner.OwnershipPercentage, 0);
         const newTotal = currentTotal + input.ownershipPercentage;
         if (newTotal > 100) {
            throw new Error("總持有度超過 100%");
         }

         return await prisma.patentOwner.upsert({
            where: { OwnerID: input.ownerID ?? -1 }, // 如果 ownerID 不存在，用 -1 避免錯誤
            update: {
               Name: input.name,
               OwnershipPercentage: input.ownershipPercentage,
            },
            create: {
               PatentID: input.patentID,
               Name: input.name,
               OwnershipPercentage: input.ownershipPercentage,
            },
         });
      }),

   // 刪除 PatentOwner（根據 OwnerID）
   deletePatentOwner: procedure
      .input(z.object({ ownerID: z.number() }))
      .mutation(async ({ input }) => {
         return await prisma.patentOwner.delete({
            where: { OwnerID: input.ownerID },
         });
      }),
});
