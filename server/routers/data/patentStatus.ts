import { z } from "zod";
import { procedure, router } from "../../trpc";
import { dbZ, prisma } from "../..";

export default router({
   addManualStatus: procedure
      .input(
         z.object({
            patentID: z.number(),
            reason: z.string().min(1, "狀態名稱不可為空"),
            date: z.date().optional(),
            active: z.boolean().default(true),
            override: z.boolean().default(false),
         }),
      )
      .mutation(async ({ input }) => {
         const { patentID, reason, date, active, override } = input;

         return await prisma.patentManualStatus.create({
            data: {
               PatentID: patentID,
               Reason: reason,
               Date: date ?? null,
               Active: active,
               Override: override,
            },
         });
      }),

   updateManualStatus: procedure
      .input(
         z.object({
            manualStatusID: z.number(),
            reason: z.string().min(1),
            date: z.date().optional(),
            override: z.boolean().optional(),
         }),
      )
      .mutation(async ({ input }) => {
         const { manualStatusID, reason, date, override } = input;

         return await prisma.patentManualStatus.update({
            where: {
               ManualStatusID: manualStatusID,
            },
            data: {
               Reason: reason,
               Date: date ?? null,
               ...(override !== undefined && { Override: override }),
            },
         });
      }),

   removeManualStatus: procedure
      .input(
         z.object({
            manualStatusID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         const manualStatus = await prisma.patentManualStatus.findUnique({
            where: { ManualStatusID: input.manualStatusID },
         });

         if (!manualStatus) throw new Error("Status not found");

         await prisma.patentManualStatus.delete({
            where: { ManualStatusID: input.manualStatusID },
         });

         // 如果是「國科會同意終止」，同步更新 Patent.CaseNotFound = false
         if (manualStatus.Reason === "國科會同意終止") {
            await prisma.patent.update({
               where: { PatentID: manualStatus.PatentID },
               data: { CaseNotFound: false },
            });
         }

         return manualStatus;
      }),

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
