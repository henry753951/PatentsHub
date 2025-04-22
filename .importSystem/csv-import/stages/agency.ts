import consola from "consola";
import type { PrismaClient, Prisma } from "@prisma/client";
import type { PatentTransformed } from "../../types/patent";
import { remaping } from "../utils";

/**
 * 插入事務所數據並創建事務所名稱到 ID 的映射。
 * @param data - 轉換後的專利數據數組
 * @param prisma - Prisma 客戶端實例
 * @returns 事務所名稱到其 ID 的映射
 */
export const insertAgency = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {
   consola.info("開始插入事務所數據...");

   // 收集所有唯一的事務所名稱
   const nameMapping = { 南一: "南一專利事務所", 世豐: "世豐專利商標事務所" };
   const uniqueAgencies = new Set<string>();
   const uniqueContactNames = new Set<{
      name: string
      agency: string
   }>();
   for (const patent of data) {
      const updated承辦事務所: string[] = [];
      patent.承辦事務所.split("/").forEach((agency) => {
         if (agency && !agency.includes("無")) {
            agency = remaping(agency, nameMapping);
            uniqueAgencies.add(agency);
            updated承辦事務所.push(agency);
         }
      });
      patent.承辦事務所 = updated承辦事務所.join("/");

      const updated初評事務所: string[] = [];
      patent.初評事務所.split("/").forEach((agency) => {
         if (agency && !agency.includes("無")) {
            agency = remaping(agency, nameMapping);
            uniqueAgencies.add(agency);
            updated初評事務所.push(agency);
         }
      });
      patent.初評事務所 = updated初評事務所.join("/");

      // 事務所聯絡人
      if (patent.事務所聯絡人)
         uniqueContactNames.add({
            name: patent.事務所聯絡人,
            agency: patent.承辦事務所,
         });
   }
   uniqueAgencies.delete("");

   // 批量創建事務所記錄
   const query: Prisma.PrismaPromise<any>[] = [];
   uniqueAgencies.forEach((agency) => {
      query.push(prisma.agencyUnit.create({ data: { Name: agency } }));
   });
   await prisma.$transaction(query);

   // 構建事務所 ID 映射
   const idMap = new Map<string, number>();
   const agencyUnits = await prisma.agencyUnit.findMany();
   for (const agencyUnit of agencyUnits) {
      idMap.set(agencyUnit.Name, agencyUnit.AgencyUnitID);
   }

   // 插入聯絡人數據
   const queryContact: Prisma.PrismaPromise<any>[] = [];
   uniqueContactNames.forEach(({ name, agency }) => {
      queryContact.push(
         prisma.contactInfo.create({
            data: {
               Name: name,
               AgencyUnitPerson: {
                  create: {
                     AgencyUnitID: idMap.get(agency),
                  },
               },
            },
         }),
      );
   });
   await prisma.$transaction(queryContact);
   consola.success("事務所數據插入成功。");
   return idMap;
};
