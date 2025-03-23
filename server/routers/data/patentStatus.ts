import { z } from "zod";
import { procedure, router } from "../../trpc";
import { dbZ } from "~/server";

export default router({
   getExpiringPatents: procedure
      .input(
         z.object({
            startDate: z.date(),
            endDate: z.date(),
         }),
      )
      .query(async ({ input }) => {
         const patents = await prisma.patent.findMany({
            where: {
               maintenances: {
                  some: {
                     ExpireDate: {
                        gte: input.startDate,
                        lte: input.endDate,
                     },
                  },
               },
            },
            include: {
               maintenances: true,
               manualStatus: true,
               country: true,
               department: {
                  include: {
                     college: true,
                  },
               },
               internal: {
                  include: {
                     InitialReviewAgencies: {
                        include: {
                           agencyUnit: true,
                        },
                     },
                     TakerAgencies: {
                        include: {
                           agencyUnit: true,
                        },
                     },
                  },
               },
               external: true,
               technical: {
                  include: {
                     keywords: true,
                  },
               },
               application: true,
               funding: {
                  include: {
                     plan: true,
                     fundingRecords: true,
                     fundingUnits: true,
                  },
               },
               inventors: {
                  include: {
                     inventor: {
                        include: {
                           contactInfo: true,
                           department: {
                              include: {
                                 college: true,
                              },
                           },
                        },
                     },
                  },
               },
            },
         });

         type patentStatus = {
            patentID: number
            patent: (typeof patents)[number]
            expireDates: Date[]
         };
         const result: patentStatus[] = [];
         for (const patent of patents) {
            const expireDates = patent.maintenances
               .map((maintenance) => maintenance.ExpireDate)
               .sort((a, b) => a.getTime() - b.getTime());
            result.push({
               patentID: patent.PatentID,
               patent,
               expireDates,
            });
         }
         return result;
      }),
});
