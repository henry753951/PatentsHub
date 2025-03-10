import { z } from "zod";
import { procedure, router } from "../../trpc";
import { CustomZodType } from "~/zod.dto";
export default router({
   createPatent: procedure
      .input(CustomZodType.PatentCreate.merge(CustomZodType.PatentInventor))
      .mutation(async ({ input }) => {
         return await prisma.patent.create({
            data: {
               DraftTitle: input.draftTitle,
               Year: input.year,
               DepartmentID: input.belongs.departmentID,
               technical: {
                  create: {
                     MaturityLevel: input.technical.maturityLevel,
                     keywords: {
                        connectOrCreate: input.technical.keywords.map(
                           (keyword) => ({
                              create: { Keyword: keyword },
                              where: { Keyword: keyword },
                           }),
                        ),
                     },
                  },
               },
               application: {
                  create: {
                     PatentType: input.type,
                  },
               },
               inventors: {
                  create: input.inventors.map((inventor) => ({
                     Main: inventor.isMain,
                     Contribution: inventor.contribution,
                     inventor: {
                        connect: {
                           InventorID: inventor.inventorID,
                        },
                     },
                  })),
               },
            },
         });
      }),
   getPatent: procedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
         return await prisma.patent.findUnique({
            where: {
               PatentID: input.id,
            },
            include: {
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
                     fundingUnitsDatas: {
                        include: {
                           fundingUnit: true,
                        },
                     },
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
      }),
});
