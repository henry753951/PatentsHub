import consola from "consola";
import type { PrismaClient, Prisma } from "@prisma/client";
import type { PatentTransformed } from "../../types/patent";

/**
 * 插入事務所數據並創建事務所名稱到 ID 的映射。
 * @param data - 轉換後的專利數據數組
 * @param prisma - Prisma 客戶端實例
 * @returns 事務所名稱到其 ID 的映射
 */
export const insertAgency = async (data: PatentTransformed[], prisma: PrismaClient) => {
   consola.info("開始插入事務所數據...");

   // 收集所有唯一的事務所名稱
   const uniqueAgencies = new Set<string>();
   for (const patent of data) {
      patent.承辦事務所.split("/").forEach((agency) => agency && uniqueAgencies.add(agency));
      patent.初評事務所.split("/").forEach((agency) => agency && uniqueAgencies.add(agency));
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

   consola.success("事務所數據插入成功。");
   return idMap;
};
