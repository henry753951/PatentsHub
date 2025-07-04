import { z } from "zod";
import { procedure, router } from "../../trpc";
import { dbZ, prisma } from "../..";
import type { Prisma } from "@prisma/client";

export default router({
   // 1️⃣ 新增聯絡人並關聯事務所
   createContactInfo: procedure
      .input(
         z.object({
            agencyID: z.number(),
            Name: z.string(),
            Email: z.string().optional(),
            OfficeNumber: z.string().optional(),
            PhoneNumber: z.string().optional(),
            Position: z.string().optional(),
            Note: z.string().optional(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.$transaction(async (prisma) => {
            // 先新增聯絡人
            const contact = await prisma.contactInfo.create({
               data: {
                  Name: input.Name,
                  Email: input.Email,
                  OfficeNumber: input.OfficeNumber,
                  PhoneNumber: input.PhoneNumber,
                  Role: input.Position,
                  Note: input.Note,
               },
            });

            // 再建立聯絡人與事務所的關聯
            await prisma.agencyUnitPerson.create({
               data: {
                  AgencyUnitID: input.agencyID,
                  ContactInfoID: contact.ContactInfoID,
               },
            });

            return contact;
         });
      }),

   // 2️⃣ 更新聯絡人資訊
   updateContactInfo: procedure
      .input(
         z.object({
            contactInfoID: z.number(),
            Name: z.string().optional(),
            Email: z.string().optional(),
            OfficeNumber: z.string().optional(),
            PhoneNumber: z.string().optional(),
            Role: z.string().optional(),
            Note: z.string().optional(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.contactInfo.update({
            where: { ContactInfoID: input.contactInfoID },
            data: {
               Name: input.Name,
               Email: input.Email,
               OfficeNumber: input.OfficeNumber,
               PhoneNumber: input.PhoneNumber,
               Role: input.Role,
               Note: input.Note,
            },
         });
      }),

   // 3️⃣ 刪除聯絡人（同時移除 `AgencyContactPerson` 關聯）
   deleteContactInfo: procedure
      .input(z.object({ contactInfoID: z.number() }))
      .mutation(async ({ input }) => {
         return await prisma.$transaction(async (prisma) => {
            await prisma.agencyUnitPerson.deleteMany({
               where: { ContactInfoID: input.contactInfoID },
            });

            return await prisma.contactInfo.delete({
               where: { ContactInfoID: input.contactInfoID },
            });
         });
      }),

   // 4️⃣ 查詢聯絡人列表
   getContactInfos: procedure
      .input(
         z.object({
            where: dbZ.ContactInfoWhereInputSchema,
         }),
      )
      .query(async ({ input }) => {
         return await prisma.contactInfo.findMany({
            where: input.where as Prisma.ContactInfoWhereInput,
            orderBy: { Name: "asc" },
         });
      }),
});
