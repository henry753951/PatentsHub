import consola from "consola";
import type { PrismaClient, Prisma } from "@prisma/client";
import type { PatentTransformed } from "../../types/patent";

/**
 * 插入聯絡資訊數據並創建名稱到 ID 的映射。
 * @param data - 轉換後的專利數據數組
 * @param prisma - Prisma 客戶端實例
 * @returns 聯絡資訊名稱到其 ID 的映射
 */
export const insertContactInfo = async (data: PatentTransformed[], prisma: PrismaClient) => {
   consola.info("開始插入聯絡資訊數據...");

   // 收集所有唯一的聯絡人名稱
   const uniqueNames = new Set<string>();
   for (const patent of data) {
      if (patent.發明人) uniqueNames.add(patent.發明人);
      patent.共同發明人.forEach((coInventor) => uniqueNames.add(coInventor.name));
      if (patent.事務所聯絡人) uniqueNames.add("agency-" + patent.事務所聯絡人);
   }
   uniqueNames.delete("agency-");

   // 批量創建聯絡資訊記錄
   const query: Prisma.PrismaPromise<any>[] = [];
   uniqueNames.forEach((name) => {
      query.push(prisma.contactInfo.create({ data: { Name: name } }));
   });

   await prisma.$transaction(query);

   // 構建聯絡資訊 ID 映射
   const idMap = new Map<string, number>();
   const contactInfos = await prisma.contactInfo.findMany();
   for (const contactInfo of contactInfos) {
      idMap.set(contactInfo.Name, contactInfo.ContactInfoID);
   }

   consola.success("聯絡資訊數據插入成功。");
   return idMap;
};
