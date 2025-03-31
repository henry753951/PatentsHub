import { z } from "zod";

const PatentCreate = z.object({
   internalID: z
      .string({
         required_error: "專利編號不得為空",
      })
      .min(1, "專利編號不得為空")
      .default(""),
   year: z.number().default(new Date().getFullYear() - 1911),
   draftTitle: z
      .string({
         required_error: "專利編號不得為空",
      })
      .min(1, "專利名稱不得為空"),
   type: z.enum(["INVENTION", "UTILITY_MODEL", "DESIGN", "PLANT"]).optional(),
   countryId: z.number().optional(),
   belongs: z
      .object({
         collegeID: z.number(),
         departmentID: z.number(),
      })
      .required(),
   technical: z
      .object({
         keywords: z.array(z.string()),
         maturityLevel: z.string(),
      })
      .default({
         keywords: [],
         maturityLevel: "",
      }),
});

const PatentInventor = z.object({
   inventors: z.array(
      z
         .object({
            isMain: z.boolean(),
            inventorID: z.number(),
            contribution: z.number(),
         })
         .required(),
   ),
});

export const CustomZodType = {
   PatentCreate,
   PatentInventor,
};

// [ConfigFile]
export const ConfigFile = z.object({
   appName: z.string().default("專利管理系統"),
   funding: z.object({
      templates: z.object({
         patentFeeNotice: z.string().default("專利費用繳款通知單.docx"),
         patentCostSharingAgreement: z.string().default("費用分攤協議書.docx"),
         departmentCostMemo: z.string().default("系所分擔便函.docx"),
         unitCostAllocationTable: z.string().default("支出機關分攤表.docx"),
         internalCostAllocationTable: z.string().default("支出科目分攤表.docx"),
      }),
   }),
});
