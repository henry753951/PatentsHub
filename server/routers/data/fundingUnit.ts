import { z } from "zod";
import { procedure, router } from "../../trpc";
import { dbZ, prisma } from "../..";

export default router({
   // 獲取所有資助單位
   getFundingUnits: procedure
      .input(z.object({}).nullish())
      .query(({ input }) => {
         return prisma.fundingUnit.findMany();
      }),
   // 創建一個新資助單位
   createFundingUnit: procedure
      .input(
         z.object({
            name: z.string(),
         }),
      )
      .mutation(({ input }) => {
         return prisma.fundingUnit.create({
            data: {
               Name: input.name,
            },
         });
      }),
   // 刪除一個資助單位
   deleteFundingUnit: procedure
      .input(
         z.object({
            fundingUnitID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.fundingUnit.delete({
            where: {
               FundingUnitID: input.fundingUnitID,
            },
         });
      }),
   // 更新一個資助單位
   updateFundingUnit: procedure
      .input(
         z.object({
            fundingUnitID: z.number(),
            name: z.string(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.fundingUnit.update({
            where: {
               FundingUnitID: input.fundingUnitID,
            },
            data: {
               Name: input.name,
            },
         });
      }),
});
