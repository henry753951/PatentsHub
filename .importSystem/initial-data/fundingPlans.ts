import type { PrismaClient } from "@prisma/client";
import consola from "consola";

const fundingPlans = [
   {
      Name: "A",
      allocations: new Map<string, number>([
         ["校方", 55],
         ["發明人", 40],
         ["院系所", 5],
      ]),
   },
   {
      Name: "B",
      allocations: new Map<string, number>([
         ["校方", 30],
         ["發明人", 60],
         ["院系所", 5],
      ]),
   },
   {
      Name: "C",
      allocations: new Map<string, number>([
         ["校方", 0],
         ["發明人", 95],
         ["院系所", 5],
      ]),
   },
   {
      Name: "D",
      allocations: new Map<string, number>([
         ["校方", 0],
         ["發明人", 100],
         ["院系所", 0],
      ]),
   },
];

export default async (prisma: PrismaClient) => {
   // funding plans
   const plans = await prisma.fundingPlan.createManyAndReturn({
      data: fundingPlans.map((plan) => ({
         Name: plan.Name,
      })),
   });

   // targets
   const targets = await prisma.fundingPlanTarget.createManyAndReturn({
      data: [
         {
            Name: "校方",
         },
         {
            Name: "發明人",
         },
         {
            Name: "院系所",
         },
      ],
   });

   // allocations
   await prisma.fundingPlanAllocation.createMany({
      data: fundingPlans.flatMap((plan) => {
         return targets.map((target) => ({
            FundingPlanID: plans.find((p) => p.Name === plan.Name)
               ?.FundingPlanID,
            Percentage: plan.allocations.get(target.Name) ?? 0,
            TargetID: target.TargetID,
         }));
      }),
   });
};
