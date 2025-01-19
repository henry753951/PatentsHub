import { z } from "zod";
import { procedure, router } from "../trpc";
import { dbZ, prisma } from "../prisma";

export default router({
   getAllContries: procedure
      .input(z.object({}).nullish())
      .query(({ input }) => {
         return prisma.country.findMany();
      }),
   insertCountry: procedure
      .input(dbZ.CountryCreateInputSchema)
      .mutation(({ input }) => {
         return prisma.country.create({
            data: input,
         });
      }),
   clearCountries: procedure
      .mutation(() => {
         return prisma.country.deleteMany();
      }),
});
