import { z } from "zod";

const PatentCreate = z.object({
   internalID: z
      .string({
         required_error: "專利編號不得為空",
      })
      .min(1, "專利編號不得為空")
      .default(""),
   year: z.string().default((new Date().getFullYear() - 1911).toString()),
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
      .required(),
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

export default { PatentCreate, PatentInventor };
