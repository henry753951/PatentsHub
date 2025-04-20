import consola from "consola";
import type { PrismaClient, Prisma } from "@prisma/client";
import type { PatentTransformed } from "../../types/patent";

/**
 * 插入資助單位數據並創建單位名稱到 ID 的映射。
 * @param data - 轉換後的專利數據數組
 * @param prisma - Prisma 客戶端實例
 * @returns 資助單位名稱到其 ID 的映射
 */
export const insertFundingUnit = async (data: PatentTransformed[], prisma: PrismaClient) => {
   consola.info("開始插入資助單位數據...");

   // 收集所有唯一的資助單位名稱
   const uniqueFundingUnits = new Set<string>();
   data.forEach((patent) => {
      patent.資助單位.split("\n").forEach((unit) => unit && uniqueFundingUnits.add(unit));
   });
   uniqueFundingUnits.delete("");

   // 批量創建資助單位記錄
   const query: Prisma.PrismaPromise<any>[] = [];
   uniqueFundingUnits.forEach((unit) => {
      query.push(prisma.fundingUnit.create({ data: { Name: unit } }));
   });

   await prisma.$transaction(query);

   // 構建資助單位 ID 映射
   const idMap = new Map<string, number>();
   const fundingUnits = await prisma.fundingUnit.findMany();
   for (const fundingUnit of fundingUnits) {
      idMap.set(fundingUnit.Name, fundingUnit.FundingUnitID);
   }

   consola.success("資助單位數據插入成功。");
   return idMap;
};
