import consola from "consola";
import csv from "csv-parser";
import fs from "fs";
import * as dbZ from "../../server/prisma/zod";
import type { PatentTransformed } from "../types/patent";
import { z } from "zod";
import readline from "readline";
import type { PrismaClient, Prisma } from "@prisma/client";
import {
   departments as DEPARTMENTS,
   formatDate,
   getFundingPlanIdMap,
} from "./utils";
const inventorMapToDepartment = new Map<string, number>();
let departmentIdMap = new Map<string, number>();
let contactInfoIdMap = new Map<string, number>();
let countryIdMap = new Map<string, number>();
let agencyIdMap = new Map<string, number>();
let fundingUnitIdMap = new Map<string, number>();
let technicalKeywordIdMap = new Map<string, number>();
let inventorIdMap = new Map<string, number>();
let fundingPlanIdMap = new Map<string, number>();

const insertData = async (data: PatentTransformed[], prisma: PrismaClient) => {
   departmentIdMap = await insertDepartment(data, prisma);
   contactInfoIdMap = await insertContactInfo(data, prisma);
   inventorIdMap = await insertInventor(data, prisma);
   countryIdMap = await insertCountry(data, prisma);
   agencyIdMap = await insertAgency(data, prisma);
   technicalKeywordIdMap = await insertTechnicalKeywords(data, prisma);
   fundingUnitIdMap = await insertFundingUnit(data, prisma);
   fundingPlanIdMap = await getFundingPlanIdMap(prisma);
   await insertPatent(data, prisma);
};

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

   for (const [college, departmentList] of Object.entries(DEPARTMENTS)) {
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

   // HashMap
   const idMap = new Map<string, number>();
   const departments = await prisma.department.findMany();
   for (const department of departments) {
      idMap.set(department.Name, department.DepartmentID);
   }
   return idMap;
};

const insertContactInfo = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {
   const uniqueNames = new Set<string>();

   for (const patent of data) {
      uniqueNames.add(patent.發明人);
      patent.共同發明人.forEach((coInventor) => {
         uniqueNames.add(coInventor.name);
      });
      uniqueNames.add("agency-" + patent.事務所聯絡人);
   }
   uniqueNames.delete("agency-");

   const query: Prisma.PrismaPromise<any>[] = [];
   uniqueNames.forEach((name) => {
      query.push(
         prisma.contactInfo.create({
            data: {
               Name: name,
            },
         }),
      );
   });

   await prisma.$transaction(query);

   // HashMap
   const idMap = new Map<string, number>();
   const contactInfos = await prisma.contactInfo.findMany({});
   for (const contactInfo of contactInfos) {
      idMap.set(contactInfo.Name, contactInfo.ContactInfoID);
   }
   return idMap;
};

const insertInventor = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {
   const uniqueInventors = new Set<string>();
   for (const patent of data) {
      uniqueInventors.add(patent.發明人);
      inventorMapToDepartment.set(
         patent.發明人,
         departmentIdMap.get(patent.單位系所) || 0,
      );
      patent.共同發明人.forEach((coInventor) => {
         uniqueInventors.add(coInventor.name);
      });
   }
   uniqueInventors.delete("");

   const query: Prisma.PrismaPromise<any>[] = [];
   uniqueInventors.forEach((inventorName) => {
      query.push(
         prisma.inventor.create({
            data: {
               department: {
                  connect: {
                     DepartmentID:
                        inventorMapToDepartment.get(inventorName) || 0,
                  },
               },
               contactInfo: {
                  connect: {
                     ContactInfoID: contactInfoIdMap.get(inventorName),
                  },
               },
            },
         }),
      );
   });

   await prisma.$transaction(query);

   // HashMap
   const idMap = new Map<string, number>();
   const inventors = await prisma.inventor.findMany({
      include: {
         contactInfo: true,
         department: true,
      },
   });
   for (const inventor of inventors) {
      idMap.set(inventor.contactInfo.Name, inventor.InventorID);
   }
   return idMap;
};

const insertCountry = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {
   const query: Prisma.PrismaPromise<any>[] = [];
   const uniqueCountries = new Set<string>();
   data.forEach((patent) => {
      uniqueCountries.add(patent.專利國家);
   });
   uniqueCountries.delete("");

   uniqueCountries.forEach((country) => {
      query.push(
         prisma.country.create({
            data: {
               CountryName: country,
               ISOCode:
                  country === "中華民國"
                     ? "TW"
                     : country === "美國"
                        ? "US"
                        : country + "_iso",
            },
         }),
      );
   });

   await prisma.$transaction(query);

   // HashMap
   const idMap = new Map<string, number>();
   const countries = await prisma.country.findMany({});
   for (const country of countries) {
      idMap.set(country.CountryName, country.CountryID);
   }
   return idMap;
};

const insertAgency = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {
   // 承辦事務所,初評事務所 (用/分隔多個事務所)
   const uniqueAgencies = new Set<string>();
   for (const patent of data) {
      patent.承辦事務所
         .split("/")
         .forEach((agency) => uniqueAgencies.add(agency));
      patent.初評事務所
         .split("/")
         .forEach((agency) => uniqueAgencies.add(agency));
   }
   uniqueAgencies.delete("");

   const query: Prisma.PrismaPromise<any>[] = [];
   uniqueAgencies.forEach((agency) => {
      query.push(
         prisma.agencyUnit.create({
            data: {
               Name: agency,
            },
         }),
      );
   });

   await prisma.$transaction(query);

   // HashMap
   const idMap = new Map<string, number>();
   const agencyUnits = await prisma.agencyUnit.findMany({});
   for (const agencyUnit of agencyUnits) {
      idMap.set(agencyUnit.Name, agencyUnit.AgencyUnitID);
   }
   return idMap;
};

const insertTechnicalKeywords = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {
   const uniqueKeywords = new Set<string>();
   data.forEach((patent) => {
      patent.技術關鍵字
         .split("、")
         .forEach((keyword) => uniqueKeywords.add(keyword));
   });
   uniqueKeywords.delete("");

   const query: Prisma.PrismaPromise<any>[] = [];
   uniqueKeywords.forEach((keyword) => {
      query.push(
         prisma.technicalKeyword.create({
            data: {
               Keyword: keyword,
            },
         }),
      );
   });

   await prisma.$transaction(query);

   // HashMap
   const idMap = new Map<string, number>();
   const keywords = await prisma.technicalKeyword.findMany({});
   for (const keyword of keywords) {
      idMap.set(keyword.Keyword, keyword.KeywordID);
   }
   return idMap;
};

const insertFundingUnit = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {
   const uniqueFundingUnits = new Set<string>();
   data.forEach((patent) => {
      patent.資助單位
         .split("\n")
         .forEach((unit) => uniqueFundingUnits.add(unit));
   });
   uniqueFundingUnits.delete("");

   const query: Prisma.PrismaPromise<any>[] = [];
   uniqueFundingUnits.forEach((unit) => {
      query.push(
         prisma.fundingUnit.create({
            data: {
               Name: unit,
            },
         }),
      );
   });

   await prisma.$transaction(query);

   // HashMap
   const idMap = new Map<string, number>();
   const fundingUnits = await prisma.fundingUnit.findMany({});
   for (const fundingUnit of fundingUnits) {
      idMap.set(fundingUnit.Name, fundingUnit.FundingUnitID);
   }
   return idMap;
};

const insertPatent = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {
   const getPatentType = (
      type: string,
   ): "INVENTION" | "UTILITY_MODEL" | "DESIGN" | "PLANT" | null => {
      switch (type) {
         case "發明":
            return "INVENTION";
         case "新型":
            return "UTILITY_MODEL";
         case "設計":
            return "DESIGN";
         case "植物":
            return "PLANT";
         default:
            consola.warn(`Unknown patent type: ${type}`);
            return undefined;
      }
   };
   const getReviewData = (str: string) => {
      const regx = /(.*)\((\d+)\)$/; // 任意字串，後接 (數字)
      const match = str.match(regx);
      if (match) {
         const [_, text, countStr] = match;
         return {
            date: formatDate(text), // 提取日期部分
            count: parseInt(countStr, 10), // 提取數字部分
         };
      }
      return {
         date: undefined,
         count: undefined,
      };
   };

   const errorPatents = [];
   for (const patent of data) {
      consola.info(`Inserting patent: ${patent.發明名稱_稿}`);
      const dataInserted: Prisma.PatentCreateInput = {
         DraftTitle: patent.發明名稱_稿 || undefined,
         Title: patent.發明名稱 || undefined,
         TitleEnglish: patent.發明名稱_英 || undefined,
         InternalID: patent.校內編號 || undefined,
         Year: parseInt(patent.年度) || undefined,
         PatentType: getPatentType(patent.專利類別) || undefined,
         InitialReviewDate: getReviewData(patent.技推委員會審理日期).date,
         InitialReviewNumber: getReviewData(patent.技推委員會審理日期).count,
         country: {
            connect: {
               CountryID: countryIdMap.get(patent.專利國家) || undefined,
            },
         },
         department: {
            connect: {
               DepartmentID: departmentIdMap.get(patent.單位系所) || 0,
            },
         },
         inventors: {
            createMany: {
               data: [
                  ...(patent.發明人
                     ? [
                        {
                           Contribution:
                                100
                                - patent.共同發明人.reduce(
                                   (acc, coInventor) =>
                                      acc + coInventor.contribution,
                                   0,
                                ),
                           Main: true,
                           InventorID:
                                inventorIdMap.get(patent.發明人) || undefined,
                        },
                     ]
                     : []),
                  ...patent.共同發明人.map((coInventor) => ({
                     Contribution: coInventor.contribution,
                     Main: false,
                     InventorID:
                        inventorIdMap.get(coInventor.name) || undefined,
                  })),
               ],
            },
         },
         technical: {
            create: {
               MaturityLevel: patent.技術成熟度_TRL || undefined,
               keywords: patent.技術關鍵字
                  ? {
                     connect: [
                        ...patent.技術關鍵字.split("、").map((keyword) => ({
                           KeywordID:
                                technicalKeywordIdMap.get(keyword) || undefined,
                        })),
                     ],
                  }
                  : undefined,
            },
         },
         funding: {
            create: {
               plan: patent.方案
                  ? {
                     connect: {
                        FundingPlanID: fundingPlanIdMap.get(patent.方案),
                     },
                  }
                  : undefined,
            },
         },
         application: {
            create: {
               ApplicationNumber: patent.申請案號 || undefined,
               FilingDate: patent.申請日期
                  ? formatDate(patent.申請日期)
                  : undefined,
               RDResultNumber: patent.研發成果編號_STRIKE || undefined,
               NSCNumber: patent.國科會編號_STRIKE || undefined,
            },
         },
         external: {
            create: {
               PatentNumber: patent.專利號碼 || undefined,
               StartDate:
                  patent.專利權期間.split("-").length > 1
                     ? formatDate(patent.專利權期間.split("-")[0])
                     : undefined,
               EndDate:
                  patent.專利權期間.split("-").length > 1
                     ? formatDate(patent.專利權期間.split("-")[1])
                     : undefined,
               PublicationDate: patent.公告_獲證時間_西元
                  ? formatDate(patent.公告_獲證時間_西元)
                  : undefined,
               IPCNumber: patent.國際專利分類號_IPC || undefined,
               PatentScope: patent.專利範圍 || undefined,
            },
         },
         internal: {
            create: {},
         },
      };
      try {
         const patentDb = await prisma.patent.create({
            data: dataInserted,
         });

         await prisma.patentFundingUnit.create({
            data: {
               PatentID: patentDb.PatentID,
               ProjectCode: patent.計畫編號,
               FundingUnitID: fundingUnitIdMap.get(patent.資助單位),
            },
         });
      }
      catch (error) {
         consola.error(
            `Error inserting patent ${patent.發明名稱_稿}: ${error}`,
         );
         consola.error(JSON.stringify(dataInserted, null, 2));
         errorPatents.push({
            patent: patent,
            error: error,
         });
      }
   }
   consola.success("All patents inserted successfully.");
   fs.writeFileSync(
      "./.importSystem/errorPatents.json",
      JSON.stringify(errorPatents, null, 2),
   );
};

export { insertData };
