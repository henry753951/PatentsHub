import consola from "consola";
import type { PrismaClient, Prisma } from "@prisma/client";
import type { PatentTransformed } from "../../types/patent";

/**
 * 插入國家數據並創建國家名稱到 ID 的映射。
 * @param data - 轉換後的專利數據數組
 * @param prisma - Prisma 客戶端實例
 * @returns 國家名稱到其 ID 的映射
 */
export const insertCountry = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {
   consola.info("開始插入國家數據...");

   // 收集所有唯一的國家名稱
   const uniqueCountries = new Set<string>();
   data.forEach(
      (patent) => patent.專利國家 && uniqueCountries.add(patent.專利國家),
   );
   uniqueCountries.delete("");

   // 批量創建國家記錄
   const query: Prisma.PrismaPromise<any>[] = [];
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

   // 構建國家 ID 映射
   const idMap = new Map<string, number>();
   const countries = await prisma.country.findMany();
   for (const country of countries) {
      idMap.set(country.CountryName, country.CountryID);
   }

   consola.success("國家數據插入成功。");
   return idMap;
};
