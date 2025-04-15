import { z } from "zod";

const PatentCreate = z.object({
   internalID: z
      .string({
         required_error: "專利編號不得為空",
      })
      .min(1, "專利編號不得為空")
      .default(""),
   initialReviewDate: z
      .union([z.date(), z.string().transform((val) => new Date(val))])
      .nullable()
      .optional(),

   initialReviewNumber: z.number().nullable().optional(),
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
export const ConfigFile = z
   .object({
      appName: z.string(),
      funding: z.object({
         templates: z.object({
            patentFeeNotice: z.string(),
            patentCostSharingAgreement: z.string(),
            departmentCostMemo: z.string(),
            unitCostAllocationTable: z.string(),
            internalCostAllocationTable: z.string(),
         }),
      }),
   })
   .optional()
   .default({
      appName: "專利管理系統",
      funding: {
         templates: {
            patentFeeNotice: "專利費用繳款通知單.docx",
            patentCostSharingAgreement: "費用分攤協議書.docx",
            departmentCostMemo: "系所分擔便函.docx",
            unitCostAllocationTable: "支出機關分攤表.docx",
            internalCostAllocationTable: "支出科目分攤表.docx",
         },
      },
   });
