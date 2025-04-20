import type { PrismaClient } from "@prisma/client";
import type { PatentTransformed } from "../types/patent";
import { insertDepartment } from "./stages/department";
import { insertPatent } from "./stages/patent";
import { insertContactInfo } from "./stages/contactInfo";
import { insertInventor } from "./stages/inventor";
import { insertCountry } from "./stages/country";
import { insertAgency } from "./stages/agency";
import { insertTechnicalKeywords } from "./stages/technicalKeywords";
import { insertFundingUnit } from "./stages/fundingUnit";

import { getFundingPlanIdMap } from "./utils";
import consola from "consola";

/**
 * 將所有轉換後的專利數據插入到數據庫中。
 * @param data - 轉換後的專利數據數組
 * @param prisma - Prisma 客戶端實例
 */
export const insertData = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
) => {
   try {
      // 按依賴順序插入數據
      const departmentIdMap = await insertDepartment(data, prisma);
      const contactInfoIdMap = await insertContactInfo(data, prisma);
      const inventorIdMap = await insertInventor(
         data,
         prisma,
         departmentIdMap,
         contactInfoIdMap,
      );
      const countryIdMap = await insertCountry(data, prisma);
      const agencyIdMap = await insertAgency(data, prisma);
      const technicalKeywordIdMap = await insertTechnicalKeywords(data, prisma);
      const fundingUnitIdMap = await insertFundingUnit(data, prisma);
      const fundingPlanIdMap = await getFundingPlanIdMap(prisma);

      // 插入專利數據，使用所有映射表
      await insertPatent(data, prisma, {
         departmentIdMap,
         contactInfoIdMap,
         inventorIdMap,
         countryIdMap,
         agencyIdMap,
         technicalKeywordIdMap,
         fundingUnitIdMap,
         fundingPlanIdMap,
      });
   }
   catch (error) {
      consola.error("插入數據失敗:", error);
      throw error;
   }
};
