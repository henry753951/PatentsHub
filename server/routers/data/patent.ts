import { z } from "zod";
import { procedure, router } from "../../trpc";
import { CustomZodType } from "~/zod.dto";
import { dbZ, prisma } from "../../";
import type { Prisma } from "@prisma/client";
import Logger from "electron-log";

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
         const offset = 3;
         const lastPatent = await prisma.patent.findFirst({
            where: {
               Year: input.year,
            },
            orderBy: {
               InternalID: "desc",
            },
         });
         if (!lastPatent?.InternalID) {
            return `${input.year}${(1).toString().padStart(offset, "0")}`;
         }
         const nextInteralId = `${input.year}${(parseInt(lastPatent.InternalID.slice(-offset)) + 1).toString().padStart(offset, "0")}`;
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
               InternalID: input.internalID,
               InitialReviewDate: input.initialReviewDate,
               InitialReviewNumber: input.initialReviewNumber,
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
                  create: {},
               },
               external: {
                  create: {},
               },
               funding: {
                  create: {},
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
               application: {
                  create: {},
               },
               owners: {
                  create: [
                     {
                        Name: "高雄大學", // 預設所有權人
                        OwnershipPercentage: 100, // 預設 100%
                     },
                  ],
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
               owners: true,
               manualStatus: true,
               maintenances: true,
               patentRecords: true,
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
                     plan: {
                        include: {
                           planAllocations: {
                              include: {
                                 target: true,
                              },
                           },
                        },
                     },
                     fundingUnits: {
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
                     fundingUnits: {
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

   getPatentFunding: procedure
      .input(dbZ.PatentWhereUniqueInputSchema)
      .query(async ({ input }) => {
         return await prisma.patentFunding.findUnique({
            where: input as Prisma.PatentFundingWhereUniqueInput,
            include: {
               plan: {
                  include: {
                     planAllocations: {
                        include: {
                           target: true,
                        },
                     },
                  },
               },
               fundingRecords: {
                  include: {
                     canFundingBy: true,
                  },
               },
               fundingUnits: {
                  include: {
                     fundingUnit: true,
                  },
               },
               fundingExports: {
                  include: {
                     contributions: {
                        include: {
                           fundingUnit: true,
                        },
                     },
                     exportRecords: {
                        include: {
                           canFundingBy: true,
                        },
                     },
                     internalAllocations: {
                        include: {
                           planTarget: true,
                        },
                     },
                  },
               },
            },
         });
      }),
   getFullPatents: procedure
      .input(dbZ.PatentWhereInputSchema)
      .query(async ({ input }) => {
         return await prisma.patent.findMany({
            where: input as Prisma.PatentWhereInput,
            include: {
               patentRecords: true,
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
                     fundingUnits: {
                        include: {
                           fundingUnit: true,
                        },
                     },
                     fundingExports: {
                        include: {
                           exportRecords: true,
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
