import consola from "consola";
import csv from "csv-parser";
import fs from "fs";
import * as dbZ from "../../server/prisma/zod";
import { PatentRaw, PatentTransformed } from "../types/patent";
import { PatentTransformer } from "./patentTransformer";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import { departments } from "./utils";

const insertData = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {};

const insertDepartment = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {
   const query: Prisma.PrismaPromise<any>[] = [];
   // 新增其他.未分類系所
   query.push(
      prisma.college.create({
         data: {
            Name: "其他",
            departments: {
               createMany: {
                  data: [
                     {
                        DepartmentID: 0,
                        Name: "未分類系所",
                     },
                  ],
               },
            },
         },
      }),
   );

   for (const [college, departmentList] of Object.entries(departments)) {
      const q = prisma.college.create({
         data: {
            Name: college,
            departments: {
               createMany: {
                  data: [
                     ...departmentList.map((department) => ({
                        Name: department,
                     })),
                  ],
               },
            },
         },
      });
      query.push(q);
   }
   await prisma.$transaction(query);
};

const insertInventor = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {
   const query: Prisma.PrismaPromise<any>[] = [];

   for (const patent of data) {
      const main_q = prisma.inventor.create({
         data: {
            department: {
               connect: {
                  Name: patent.單位系所,
               },
            },
            contactInfo: {
               connectOrCreate: {
                  where: {
                     ContactInfoID: (
                        await prisma.contactInfo.findFirst({
                           where: {
                              Name: patent.發明人,
                           },
                        })
                     )?.ContactInfoID,
                  },
                  create: {
                     Name: patent.發明人,
                  },
               },
            },
         },
      }) as Prisma.PrismaPromise<any>;
      query.push(main_q);

      const cp_q = patent.共同發明人.map(async (coInventor) => {
         return prisma.inventor.create({
            data: {
               department: {
                  connect: {
                     DepartmentID: 0,
                  },
               },
               contactInfo: {
                  connectOrCreate: {
                     where: {
                        ContactInfoID: (
                           await prisma.contactInfo.findFirst({
                              where: {
                                 Name: coInventor.name,
                              },
                           })
                        )?.ContactInfoID,
                     },
                     create: {
                        Name: coInventor.name,
                     },
                  },
               },
            },
         });
      }) as Prisma.PrismaPromise<any>[];
      query.push(...cp_q);
   }
   await prisma.$transaction(query);
};

const insertCountry = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {
   const query: Prisma.PrismaPromise<any>[] = [];
   for (const patent of data) {
      const q = prisma.country.create({
         data: {
            CountryName: patent.專利國家,
            ISOCode:
               patent.專利國家 === "中華民國"
                  ? "TW"
                  : patent.專利國家 === "美國"
                    ? "US"
                    : patent.專利國家 + "_iso",
         },
      }) as Prisma.PrismaPromise<any>;
      query.push(q);
   }
   await prisma.$transaction(query);
};

const insertAgency = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {

}

export { insertData };
