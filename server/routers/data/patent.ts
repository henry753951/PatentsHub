import { z } from "zod";
import { procedure, router } from "../../trpc";
import { CustomZodType } from "~/zod.dto";
import { dbZ } from "~/server";

export default router({
   createPatent: procedure
      .input(CustomZodType.PatentCreate.merge(CustomZodType.PatentInventor))
      .mutation(async ({ input }) => {
         return await prisma.patent.create({
            data: {
               DraftTitle: input.draftTitle,
               Year: input.year,
               DepartmentID: input.belongs.departmentID,
               PatentType: input.type,
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
      .input(dbZ.PatentWhereUniqueInputSchema)
      .query(async ({ input }) => {
         return await prisma.patent.findUnique({
            where: input,
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
   updatePatent: procedure
      .input(
         z.object({
            patentID: z.number(),
            data: dbZ.PatentUpdateInputSchema,
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.patent.update({
            where: {
               PatentID: input.patentID,
            },
            data: input.data,
         });
      }),
});
