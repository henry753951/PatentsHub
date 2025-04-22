import type { PrismaClient } from "@prisma/client";
import type { PatentRaw } from "../types/patent";
import consola from "consola";

const departments = {
   人文社會科學院: [
      "西洋語文學系",
      "運動健康與休閒學系",
      "工藝與創意設計學系",
      "東亞語文學系",
      "運動競技學系",
      "建築學系",
   ],
   法學院: ["法律學系", "政治法律學系", "財經法律學系"],
   理學院: [
      "應用數學系",
      "生命科學系",
      "應用物理學系",
      "應用化學系",
      "統計學研究所",
   ],
   管理學院: [
      "應用經濟學系",
      "亞太工商管理學系",
      "財務金融學系",
      "資訊管理學系",
   ],
   工學院: [
      "電機工程學系",
      "土木與環境工程學系",
      "資訊工程學系",
      "化學工程及材料工程學系",
   ],
};

const columnMapping: { [key: string]: keyof PatentRaw } = {
   "狀態": "狀態",
   "年度": "年度",
   "校內編號": "校內編號",
   "學院": "學院",
   "單位系所": "單位系所",
   "發明人": "發明人",
   "共同發明人": "共同發明人",
   "發明名稱": "發明名稱",
   "發明名稱（英）": "發明名稱_英",
   "專利號碼": "專利號碼",
   "專利權期間": "專利權期間",
   "公告/獲證日期": "公告_獲證日期",
   "維護期程": "維護期程",
   "公告/獲證時間（西元）": "公告_獲證時間_西元",
   "維護期程（西元）": "維護期程_西元",
   "維護年度計": "維護年度計",
   "領證年度": "領證年度",
   "到期月份": "到期月份",
   "申請日期": "申請日期",
   "申請年度": "申請年度",
   "申請案號": "申請案號",
   "專利類別": "專利類別",
   "專利國家": "專利國家",
   "方案": "方案",
   "資助單位": "資助單位",
   "計畫編號": "計畫編號",
   "承辦事務所": "承辦事務所",
   "事務所聯絡人": "事務所聯絡人",
   "事務所檔號": "事務所檔號",
   "研發成果編號（STRIKE）": "研發成果編號_STRIKE",
   "國科會編號（STRIKE）": "國科會編號_STRIKE",
   "專利已登錄": "專利已登錄",
   "國際專利分類號IPC": "國際專利分類號_IPC",
   "專利範圍": "專利範圍",
   "技術成熟度TRL": "技術成熟度_TRL",
   "技推委員會審理日期": "技推委員會審理日期",
   "發明名稱(稿)": "發明名稱_稿",
   "初評事務所": "初評事務所",
   "申請專利範圍": "申請專利範圍",
   "技術關鍵字": "技術關鍵字",
   "進度": "進度",
   "費用": "費用",
};

const getFundingPlanIdMap = async (prisma: PrismaClient) => {
   const fundingPlanIdMap = new Map<string, number>();
   const fundingPlans = await prisma.fundingPlan.findMany();
   fundingPlans.forEach((fundingPlan) => {
      fundingPlanIdMap.set(fundingPlan.Name, fundingPlan.FundingPlanID);
   });
   return fundingPlanIdMap;
};

const formatDate = (date: string): Date => {
   // can be YYYY-MM-DD or YYYY/MM/DD or YYYY.MM.DD
   // if have multiple date 匹配上方格式的 選擇最新的
   const dateRegex = /(\d{2,4})[-/.](\d{1,2})[-/.](\d{1,2})/g;
   const matches = date.match(dateRegex);
   if (matches) {
      const dates = matches.map((match) => {
         // eslint-disable-next-line prefer-const
         let [year, month, day] = match.split(/[-/.]/).map(Number);
         // 如果年份是三位數，視為民國年，轉換為西元年
         if (year < 1000) {
            year += 1911;
         }
         return new Date(year, month - 1, day);
      });
      return new Date(Math.max(...dates.map((d) => d.getTime())));
   }
   consola.warn(`Invalid date format: ${date}`);
   return undefined;
};

const remaping = (data: string, mapping: { [key: string]: string }): string => {
   for (const key in mapping) {
      if (data.includes(key)) {
         return mapping[key];
      }
   }
   return data;
};
export {
   columnMapping,
   departments,
   getFundingPlanIdMap,
   formatDate,
   remaping,
};
