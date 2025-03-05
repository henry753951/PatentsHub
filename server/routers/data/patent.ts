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
               InternalID: input.internalID,
               DepartmentID: input.belongs.departmentID,
               CollegeID: input.belongs.collegeID,
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
});
