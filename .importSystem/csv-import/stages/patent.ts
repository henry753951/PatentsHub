import type { PrismaClient, Prisma } from "@prisma/client";
import type { PatentTransformed } from "../../types/patent";
import { formatDate } from "../utils";
import consola from "consola";
import fs from "fs";

/**
 * 插入專利數據。
 * @param data - 轉換後的專利數據數組
 * @param prisma - Prisma 客戶端實例
 * @param maps - 包含所有 ID 映射的對象
 */
export const insertPatent = async (
   data: PatentTransformed[],
   prisma: PrismaClient,
   maps: {
      departmentIdMap: Map<string, number>
      agencyContactInfoIdMap: Map<string, number>
      contactInfoIdMap: Map<string, number>
      inventorIdMap: Map<string, number>
      countryIdMap: Map<string, number>
      agencyIdMap: Map<string, number>
      technicalKeywordIdMap: Map<string, number>
      fundingUnitIdMap: Map<string, number>
      fundingPlanIdMap: Map<string, number>
   },
) => {
   consola.info("開始插入專利數據...");
   const errorPatents: {
      patent: PatentTransformed
      error: unknown
      dataInserted: Prisma.PatentCreateInput
   }[] = [];

   for (const patent of data) {
      let dataInserted: Prisma.PatentCreateInput;
      try {
         consola.info(`正在插入專利: ${patent.發明名稱_稿 || "未命名"}`);
         dataInserted = {
            DraftTitle: patent.發明名稱_稿 || undefined,
            Title: patent.發明名稱 || undefined,
            TitleEnglish: patent.發明名稱_英 || undefined,
            InternalID: patent.校內編號 || undefined,
            Year: patent.年度 ? parseInt(patent.年度) : undefined,
            PatentType: getPatentType(patent.專利類別),
            InitialReviewDate: getReviewData(patent.技推委員會審理日期).date,
            InitialReviewNumber: getReviewData(patent.技推委員會審理日期).count,
            country: {
               connect: { CountryID: maps.countryIdMap.get(patent.專利國家) },
            },
            department: {
               connect: {
                  DepartmentID: maps.departmentIdMap.get(patent.單位系所) || 0,
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
                                      (acc, co) => acc + co.contribution,
                                      0,
                                   ),
                              Main: true,
                              InventorID: maps.inventorIdMap.get(
                                 patent.發明人,
                              ),
                           },
                        ]
                        : []),
                     ...patent.共同發明人.map((coInventor) => ({
                        Contribution: coInventor.contribution,
                        Main: false,
                        InventorID: maps.inventorIdMap.get(coInventor.name),
                     })),
                  ],
               },
            },
            technical: {
               create: {
                  MaturityLevel: patent.技術成熟度_TRL || undefined,
                  keywords: patent.技術關鍵字
                     ? {
                        connect: patent.技術關鍵字
                           .split("、")
                           .map((keyword) => ({
                              KeywordID:
                                   maps.technicalKeywordIdMap.get(keyword),
                           })),
                     }
                     : undefined,
               },
            },
            funding: {
               create: {
                  plan: patent.方案
                     ? {
                        connect: {
                           FundingPlanID: maps.fundingPlanIdMap.get(
                              patent.方案,
                           ),
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
                  StartDate: patent.專利權期間.includes("-")
                     ? formatDate(patent.專利權期間.split("-")[0])
                     : undefined,
                  EndDate: patent.專利權期間.includes("-")
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
               create: {
                  InitialReviewAgencies:
                     patent.初評事務所 && !patent.初評事務所.includes("無")
                        ? {
                           createMany: {
                              data: patent.初評事務所
                                 .split("/")
                                 .map((agency) => ({
                                    AgencyUnitID:
                                         maps.agencyIdMap.get(agency),
                                    agencyUnitPersonIds: patent.事務所聯絡人
                                       ? [
                                          maps.agencyContactInfoIdMap.get(
                                             "agency-"
                                             + patent.事務所聯絡人,
                                          ),
                                       ]
                                       : undefined,
                                 })),
                           },
                        }
                        : undefined,
                  TakerAgencies:
                     patent.承辦事務所 && !patent.初評事務所.includes("無")
                        ? {
                           createMany: {
                              data: patent.承辦事務所
                                 .split("、")
                                 .map((agency) => ({
                                    AgencyUnitID:
                                         maps.agencyIdMap.get(agency),
                                    FileCode: patent.事務所檔號 || "",
                                    agencyUnitPersonIds: patent.事務所聯絡人
                                       ? [
                                          maps.agencyContactInfoIdMap.get(
                                             "agency-"
                                             + patent.事務所聯絡人,
                                          ),
                                       ]
                                       : undefined,
                                 })),
                           },
                        }
                        : undefined,
               },
            },
            patentRecords: {
               createMany: {
                  data: parseRecord(patent.進度).map((record) => ({
                     Date: record.data,
                     Record: record.content,
                  })),
               },
            },
            maintenances: {
               createMany: {
                  data:
                     patent.公告_獲證時間_西元 && patent.維護期程_西元
                        ? [
                           {
                              MaintenanceDate: formatDate(
                                 patent.公告_獲證時間_西元,
                              ),
                              ExpireDate: formatDate(patent.維護期程_西元),
                           },
                        ]
                        : [],
               },
            },
         };

         const patentDb = await prisma.patent.create({ data: dataInserted });

         const fundingUnits = patent.資助單位.split("\n");
         for (const unit of fundingUnits) {
            if (patent.資助單位 !== "無") {
               const fundingUnitId = maps.fundingUnitIdMap.get(unit);
               if (fundingUnitId) {
                  await prisma.patentFundingUnit.create({
                     data: {
                        PatentID: patentDb.PatentID,
                        ProjectCode: patent.計畫編號,
                        FundingUnitID: fundingUnitId,
                     },
                  });
                  consola.log("\t\t" + unit);
               }
               else {
                  consola.warn(`資助單位 ${unit} 無對應的 ID。`);
               }
            }
         }

         consola.success(`專利 ${patent.發明名稱_稿 || "未命名"} 插入成功。`);
      }
      catch (error) {
         const lastError = error.message.split("\n").pop() || "未知錯誤";
         consola.error(
            `插入專利 ${patent.發明名稱_稿 || "未命名"} 時出錯:`,
            lastError,
         );
         errorPatents.push({
            patent,
            dataInserted,
            error: error.message.split("\n"),
         });
      }
   }

   if (errorPatents.length > 0) {
      fs.writeFileSync(
         "./.importSystem/errorPatents.json",
         JSON.stringify(errorPatents, null, 2),
      );
      consola.warn(`${errorPatents.length} 個專利插入失敗。錯誤已記錄。`);
   }
   consola.success("專利插入完成。");
};

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

function parseRecord(input: string): { data: Date, content: string }[] {
   const result: { data: Date, content: string }[] = [];
   const dateRegex = /(\d{2,4})[./-](\d{1,2})(?:[./-](\d{1,2}))?/g;
   if (!input.includes("◎")) {
      let currentRecord: { data: Date, content: string } | null = null;
      let lastIndex = 0;
      const cleanInput = input.replace(/◎/g, "");

      // 遍歷所有匹配的日期模式
      let match;
      while ((match = dateRegex.exec(cleanInput)) !== null) {
         const dateStart = match.index;
         const dateEnd = dateRegex.lastIndex;

         // 檢查日期前一個字符是否為「：」或「:」
         const prevChar = dateStart > 0 ? cleanInput[dateStart - 1] : null;
         const isColonBefore = prevChar === "：" || prevChar === ":";

         // 提取日期部分
         let year = parseInt(match[1]);
         const month = parseInt(match[2]);
         const day = match[3] ? parseInt(match[3]) : 1;

         // 處理民國年（2-3位年份）
         if (year < 1000) {
            year += 1911; // 轉換為西元年
         }

         // 創建日期物件
         const date = new Date(year, month - 1, day);

         // 判斷是否為合理日期且無「：」或「:」在前
         if (!isColonBefore && date.getFullYear() >= 2000) {
            // 如果有前一個記錄，設置其內容並加入結果
            if (currentRecord) {
               currentRecord.content = cleanInput
                  .slice(lastIndex, dateStart)
                  .trim();
               result.push(currentRecord);
            }
            // 創建新的記錄
            currentRecord = { data: date, content: "" };
            lastIndex = dateEnd;
         }
         else {
            // 如果日期前有「：」或「:」，或日期不合理，視為前一個記錄的內容
            if (currentRecord) {
               currentRecord.content += cleanInput.slice(lastIndex, dateEnd);
               lastIndex = dateEnd;
            }
         }
      }
      // 處理最後的內容
      if (currentRecord) {
         currentRecord.content += cleanInput.slice(lastIndex).trim();
         result.push(currentRecord);
      }
   }
   else {
      // 如果有「◎」，則將其視為分隔符號，並處理每個部分
      const parts = input
         .split("◎")
         .map((part) => part.trim())
         .filter(Boolean);
      for (const part of parts) {
         const dateMatch = dateRegex.exec(part);
         if (dateMatch) {
            // 同樣判斷民國年
            let year = parseInt(dateMatch[1]);
            const month = parseInt(dateMatch[2]);
            const day = dateMatch[3] ? parseInt(dateMatch[3]) : 1;
            if (year < 1000) {
               year += 1911; // 轉換為西元年
            }
            const date = new Date(year, month - 1, day);

            result.push({
               data: date,
               content: part.replace(dateRegex, "").trim(),
            });
         }
         else {
            if (result.length > 0) {
               result[result.length - 1].content += part.trim();
            }
            else {
               const date = new Date();
               result.push({ data: date, content: part.trim() });
            }
         }
      }
   }

   // 按日期排序
   result.sort((a, b) => a.data.getTime() - b.data.getTime());

   return result;
}
