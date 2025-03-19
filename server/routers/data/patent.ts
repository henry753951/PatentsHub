import { z } from "zod";
import { procedure, router } from "../../trpc";
import { CustomZodType } from "~/zod.dto";
import { dbZ } from "~/server";
import type { Prisma } from "@prisma/client";

export default router({
   // [Other]
   getLastInternalID: procedure
      .input(
         z
            .object({
               year: z.number(),
            })
            .default({ year: new Date().getFullYear() - 1911 }),
      )
      .query(async ({ input }) => {
         const offset = 4;
         const lastPatent = await prisma.patent.findFirst({
            where: {
               Year: input.year,
            },
            orderBy: {
               internal: {
                  InternalID: "desc",
               },
            },
            include: {
               internal: true,
            },
         });
         if (!(lastPatent && lastPatent.internal)) {
            return `${input.year}${(1).toString().padStart(offset, "0")}`;
         }
         const nextInteralId = `${input.year}${(parseInt(lastPatent.internal.InternalID.slice(-offset)) + 1).toString().padStart(offset, "0")}`;
         return nextInteralId;
      }),
   getKeywords: procedure.input(z.object({})).query(async () => {
      return await prisma.technicalKeyword.findMany({
         select: {
            KeywordID: true,
            Keyword: true,
            _count: {
               select: {
                  patentTechnicalAttributes: true,
               },
            },
         },
      });
   }),
   createKeyword: procedure
      .input(z.object({ keyword: z.string() }))
      .mutation(async ({ input }) => {
         return await prisma.technicalKeyword.create({
            data: {
               Keyword: input.keyword,
            },
         });
      }),
   deleteKeyword: procedure
      .input(z.object({ keywordID: z.number() }))
      .mutation(async ({ input }) => {
         return await prisma.technicalKeyword.delete({
            where: {
               KeywordID: input.keywordID,
            },
         });
      }),
   // [Patent]
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
               internal: {
                  create: {
                     InternalID: input.internalID,
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
            where: input as Prisma.PatentWhereUniqueInput,
            include: {
               patentRecord: true,
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
   getPatents: procedure
      .input(dbZ.PatentWhereInputSchema)
      .query(async ({ input }) => {
         return await prisma.patent.findMany({
            where: input as Prisma.PatentWhereInput,
            include: {
               patentRecord: true,
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
         z.array(
            z.object({
               patentID: z.number(),
               data: dbZ.PatentUpdateInputSchema,
            }),
         ),
      )
      .mutation(async ({ input }) => {
         await prisma.$transaction(
            input.map((data) => {
               return prisma.patent.update({
                  where: {
                     PatentID: data.patentID,
                  },
                  data: data.data as Prisma.PatentUpdateInput,
               });
            }),
         );
      }),
   deletePatent: procedure
      .input(dbZ.PatentWhereUniqueInputSchema)
      .mutation(async ({ input }) => {
         return await prisma.patent.delete({
            where: input as Prisma.PatentWhereUniqueInput,
         });
      }),
});
