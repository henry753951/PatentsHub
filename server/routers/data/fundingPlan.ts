import { z } from "zod";
import { procedure, router } from "../../trpc";
import { dbZ, prisma } from "../..";

export default router({
   getAllFundingPlans: procedure
      .input(z.object({}).nullish())
      .query(({ input }) => {
         return prisma.fundingPlan.findMany({
            include: {
               planAllocations: {
                  include: {
                     target: true,
                  },
               },
            },
         });
      }),
   createFundingPlan: procedure
      .input(
         z.object({
            name: z.string(),
            allocation: z.array(
               z.object({
                  targetID: z.number(),
                  percentage: z.number(),
               }),
            ),
         }),
      )
      .mutation(({ input }) => {
         return prisma.fundingPlan.create({
            data: {
               Name: input.name,
            },
         });
      }),

   updateFundingPlan: procedure

      .input(
         z.object({
            fundingPlanID: z.number(),
            name: z.string(),
            allocation: z.array(
               z.object({
                  targetID: z.number(),
                  percentage: z.number(),
               }),
            ),
         }),
      )
      .mutation(({ input }) => {
         return prisma.fundingPlan.update({
            where: {
               FundingPlanID: input.fundingPlanID,
            },
            data: {
               Name: input.name,
               planAllocations: {
                  deleteMany: {},
                  createMany: {
                     data: input.allocation.map((allocation) => ({
                        TargetID: allocation.targetID,
                        Percentage: allocation.percentage,
                     })),
                  },
               },
            },
         });
      }),
   deleteFundingPlan: procedure
      .input(
         z.object({
            fundingPlanID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.fundingPlan.delete({
            where: {
               FundingPlanID: input.fundingPlanID,
            },
         });
      }),

   getAllFundingPlanTarget: procedure
      .input(z.object({}).nullish())
      .query(({ input }) => {
         return prisma.fundingPlanTarget.findMany({});
      }),
   createFundingPlanTarget: procedure

      .input(
         z.object({
            name: z.string(),
         }),
      )
      .mutation(({ input }) => {
         return prisma.fundingPlanTarget.create({
            data: {
               Name: input.name,
            },
         });
      }),
   updateFundingPlanTarget: procedure

      .input(
         z.object({
            fundingPlanTargetID: z.number(),
            name: z.string(),
         }),
      )
      .mutation(({ input }) => {
         return prisma.fundingPlanTarget.update({
            where: {
               TargetID: input.fundingPlanTargetID,
            },
            data: {
               Name: input.name,
            },
         });
      }),
   deleteFundingPlanTarget: procedure

      .input(
         z.object({
            fundingPlanTargetID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.fundingPlanTarget.delete({
            where: {
               TargetID: input.fundingPlanTargetID,
            },
         });
      }),
});
