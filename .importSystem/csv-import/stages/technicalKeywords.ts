import consola from "consola";
import type { PrismaClient, Prisma } from "@prisma/client";
import type { PatentTransformed } from "../../types/patent";

/**
 * 插入技術關鍵字數據並創建關鍵字到 ID 的映射。
 * @param data - 轉換後的專利數據數組
 * @param prisma - Prisma 客戶端實例
 * @returns 技術關鍵字到其 ID 的映射
 */
export const insertTechnicalKeywords = async (data: PatentTransformed[], prisma: PrismaClient) => {
   consola.info("開始插入技術關鍵字數據...");

   // 收集所有唯一的技術關鍵字
   const uniqueKeywords = new Set<string>();
   data.forEach((patent) => {
      patent.技術關鍵字.split("、").forEach((keyword) => keyword && uniqueKeywords.add(keyword));
   });
   uniqueKeywords.delete("");

   // 批量創建技術關鍵字記錄
   const query: Prisma.PrismaPromise<any>[] = [];
   uniqueKeywords.forEach((keyword) => {
      query.push(prisma.technicalKeyword.create({ data: { Keyword: keyword } }));
   });

   await prisma.$transaction(query);

   // 構建技術關鍵字 ID 映射
   const idMap = new Map<string, number>();
   const keywords = await prisma.technicalKeyword.findMany();
   for (const keyword of keywords) {
      idMap.set(keyword.Keyword, keyword.KeywordID);
   }

   consola.success("技術關鍵字數據插入成功。");
   return idMap;
};
