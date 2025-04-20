import type { PrismaClient, Prisma } from "@prisma/client";
import type { PatentTransformed } from "../../types/patent";
import consola from "consola";

/**
 * 插入發明人數據並創建發明人名稱到 ID 的映射。
 * @param data - 轉換後的專利數據數組
 * @param prisma - Prisma 客戶端實例
 * @param departmentIdMap - 部門名稱到 ID 的映射
 * @param contactInfoIdMap - 聯絡資訊名稱到 ID 的映射
 * @returns 發明人名稱到其 ID 的映射
 */
export const insertInventor = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
   departmentIdMap: Map<string, number>,
   contactInfoIdMap: Map<string, number>,
) => {
   consola.info("開始插入發明人數據...");
   const uniqueInventors = new Set<string>();
   const inventorMapToDepartment = new Map<string, number>();

   // 收集所有唯一的發明人並映射到部門
   for (const patent of data) {
      if (patent.發明人) {
         uniqueInventors.add(patent.發明人);
         inventorMapToDepartment.set(
            patent.發明人,
            departmentIdMap.get(patent.單位系所) || 0,
         );
      }
      patent.共同發明人.forEach((coInventor) => uniqueInventors.add(coInventor.name));
   }
   uniqueInventors.delete("");

   const query: Prisma.PrismaPromise<any>[] = [];
   uniqueInventors.forEach((inventorName) => {
      query.push(
         prisma.inventor.create({
            data: {
               department: {
                  connect: { DepartmentID: inventorMapToDepartment.get(inventorName) || 0 },
               },
               contactInfo: {
                  connect: { ContactInfoID: contactInfoIdMap.get(inventorName) },
               },
            },
         }),
      );
   });

   await prisma.$transaction(query);

   // 構建發明人 ID 映射
   const idMap = new Map<string, number>();
   const inventors = await prisma.inventor.findMany({ include: { contactInfo: true } });
   for (const inventor of inventors) {
      idMap.set(inventor.contactInfo.Name, inventor.InventorID);
   }
   consola.success("發明人數據插入成功。");
   return idMap;
};
