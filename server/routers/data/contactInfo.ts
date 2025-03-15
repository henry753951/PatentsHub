import { z } from "zod";
import { procedure, router } from "../../trpc";
import { dbZ } from "~/server";

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
                  Position: input.Position,
                  Note: input.Note,
               },
            });

            // 再建立聯絡人與事務所的關聯
            await prisma.agencyContactPerson.create({
               data: {
                  AgencyID: input.agencyID,
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
            Position: z.string().optional(),
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
               Position: input.Position,
               Note: input.Note,
            },
         });
      }),

   // 3️⃣ 刪除聯絡人（同時移除 `AgencyContactPerson` 關聯）
   deleteContactInfo: procedure
      .input(z.object({ contactInfoID: z.number() }))
      .mutation(async ({ input }) => {
         return await prisma.$transaction(async (prisma) => {
            await prisma.agencyContactPerson.deleteMany({
               where: { ContactInfoID: input.contactInfoID },
            });

            return await prisma.contactInfo.delete({
               where: { ContactInfoID: input.contactInfoID },
            });
         });
      }),
});
