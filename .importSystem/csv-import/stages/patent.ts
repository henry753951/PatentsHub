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
                     patent.初評事務所 && patent.初評事務所 !== "無"
                        ? {
                           createMany: {
                              data: patent.初評事務所
                                 .split("/")
                                 .map((agency) => ({
                                    AgencyUnitID:
                                         maps.agencyIdMap.get(agency),
                                    agencyUnitPersonIds: patent.事務所聯絡人
                                       ? {
                                          toJSON: [
                                             "agency-"
                                             + patent.事務所聯絡人,
                                          ],
                                       }
                                       : undefined,
                                 })),
                           },
                        }
                        : undefined,
                  TakerAgencies:
                     patent.承辦事務所 && patent.承辦事務所 !== "無"
                        ? {
                           createMany: {
                              data: patent.承辦事務所
                                 .split("、")
                                 .map((agency) => ({
                                    AgencyUnitID:
                                         maps.agencyIdMap.get(agency),
                                    FileCode: patent.事務所檔號 || "",
                                    agencyUnitPersonIds: patent.事務所聯絡人
                                       ? {
                                          toJSON: [
                                             "agency-"
                                             + patent.事務所聯絡人,
                                          ],
                                       }
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
   // 定義日期格式的正規表達式
   // 匹配：YY.MM, YYYY.MM, YY.MM.DD, YYYY.MM.DD, 以及分隔符 . 或 - 或 /
   const dateRegex = /(\d{2,4})[./-](\d{1,2})(?:[./-](\d{1,2}))?/g;

   // 移除所有 ◎
   const cleanInput = input.replace(/◎/g, "");

   // 使用正規表達式分割資料
   const parts = [];
   let lastIndex = 0;
   let match;

   // 手動迭代正規表達式，保留日期和內容
   while ((match = dateRegex.exec(cleanInput)) !== null) {
      // 提取日期前的內容（如果有）
      if (match.index > lastIndex) {
         parts.push(cleanInput.slice(lastIndex, match.index).trim());
      }
      // 加入日期部分
      parts.push(match[1], match[2], match[3] || null);
      lastIndex = dateRegex.lastIndex;
   }
   // 加入最後的內容（如果有）
   if (lastIndex < cleanInput.length) {
      parts.push(cleanInput.slice(lastIndex).trim());
   }

   // 過濾空字符串並整理成 { data, content } 物件陣列
   const result = [];
   let i = 0;

   while (i < parts.length) {
      // 跳過空字符串
      if (!parts[i] || parts[i] === "null") {
         i++;
         continue;
      }

      // 檢查是否為日期（年份）
      if (/^\d{2,4}$/.test(parts[i])) {
         let year = parseInt(parts[i]);
         const month = parseInt(parts[i + 1]);
         const day
            = parts[i + 2] && parts[i + 2] !== "null"
               ? parseInt(parts[i + 2])
               : null;

         // 處理民國年（2-3位年份）
         if (year < 1000) {
            year += 1911; // 轉換為西元年
         }

         // 建立日期物件
         const date = day
            ? new Date(year, month - 1, day) // 完整日期
            : new Date(year, month - 1, 1); // 只有年月，日期設為1

         // 提取內容（下一個非日期部分）
         let content = "";
         let j = i + (day ? 3 : 2);
         while (j < parts.length && !/^\d{2,4}$/.test(parts[j])) {
            content += (content ? " " : "") + (parts[j] || "");
            j++;
         }

         // 加入結果陣列
         result.push({
            data: date,
            content: content.trim(),
         });

         // 移動到下一個日期
         i = j;
      }
      else {
         i++;
      }
   }

   return result;
}
