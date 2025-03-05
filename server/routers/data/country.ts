import { z } from "zod";
import { procedure, router } from "../../trpc";
import { dbZ, prisma } from "../..";

// 定義並導出一個路由器，包含多個操作
export default router({
   // 獲取所有國家
   getAllContries: procedure
      .input(z.object({}).nullish())
      .query(({ input }) => {
         return prisma.country.findMany();
      }),
   // 創建一個新國家
   createCountry: procedure
      .input(
         z.object({
            countryName: z.string(),
            isoCode: z.string(),
         }),
      )
      .mutation(({ input }) => {
         return prisma.country.create({
            data: {
               CountryName: input.countryName,
               ISOCode: input.isoCode,
            },
         });
      }),
   // 清空所有國家
   clearCountries: procedure.mutation(() => {
      return prisma.country.deleteMany();
   }),
   // 刪除一個國家
   deleteCountry: procedure
      .input(
         z.object({
            countryID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.country.delete({
            where: {
               CountryID: input.countryID,
            },
         });
      }),
   // 更新一個國家
   updateCountry: procedure
      .input(
         z.object({
            countryID: z.number(),
            countryName: z.string(),
            isoCode: z.string(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.country.update({
            where: {
               CountryID: input.countryID,
            },
            data: {
               CountryID: input.countryID,
               CountryName: input.countryName,
               ISOCode: input.isoCode,
            },
         });
      }),
});
