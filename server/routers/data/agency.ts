import { z } from "zod";
import { procedure, router } from "../../trpc";
import { Prisma } from "@prisma/client";

export default router({
   // === Agency CRUD ===

   // Create Agency
   createAgency: procedure
      .input(
         z.object({
            name: z.string().min(1, "事務所名稱不可為空"),
            description: z.string().optional(), // 新增 description
         }),
      )
      .mutation(async ({ input }) => {
         try {
            const newAgency = await prisma.agency.create({
               data: {
                  Name: input.name,
                  Description: input.description, // 新增 Description
               },
               include: {
                  contacts: {
                     include: {
                        contactInfo: true,
                        patentContacts: { include: { patent: true } },
                     },
                  },
                  patents: true,
               },
            });
            return newAgency;
         }
         catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
               if (error.code === "P2002") {
                  throw new Error("事務所名稱已存在");
               }
            }
            throw new Error("無法創建事務所：");
         }
      }),

   // Read Agencies (查詢所有事務所)
   getAgencies: procedure.query(async () => {
      return await prisma.agency.findMany({
         include: {
            contacts: {
               include: {
                  contactInfo: true,
                  patentContacts: { include: { patent: true } },
               },
            },
            patents: true,
         },
      });
   }),

   // Read Agency by ID (查詢單個事務所)
   getAgencyById: procedure
      .input(z.object({ agencyID: z.number() }))
      .query(async ({ input }) => {
         const agency = await prisma.agency.findUnique({
            where: { AgencyID: input.agencyID },
            include: {
               contacts: {
                  include: {
                     contactInfo: true,
                     patentContacts: { include: { patent: true } },
                  },
               },
               patents: true,
            },
         });
         if (!agency) {
            throw new Error("事務所不存在");
         }
         return agency;
      }),

   // Update Agency
   updateAgency: procedure
      .input(
         z.object({
            agencyID: z.number(),
            name: z.string().min(1, "事務所名稱不可為空").optional(),
            description: z.string().optional(), // 新增 description
         }),
      )
      .mutation(async ({ input }) => {
         try {
            const updatedAgency = await prisma.agency.update({
               where: { AgencyID: input.agencyID },
               data: {
                  Name: input.name,
                  Description: input.description, // 新增 Description
               },
               include: {
                  contacts: {
                     include: {
                        contactInfo: true,
                        patentContacts: { include: { patent: true } },
                     },
                  },
                  patents: true,
               },
            });
            return updatedAgency;
         }
         catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
               if (error.code === "P2002") {
                  throw new Error("事務所名稱已存在");
               }
               if (error.code === "P2025") {
                  throw new Error("事務所不存在");
               }
            }
            throw new Error("無法更新事務所：");
         }
      }),

   // Delete Agency
   deleteAgency: procedure
      .input(z.object({ agencyID: z.number() }))
      .mutation(async ({ input }) => {
         try {
            await prisma.agency.delete({
               where: { AgencyID: input.agencyID },
            });
            return { success: true };
         }
         catch (error) {
            if (
               error instanceof Prisma.PrismaClientKnownRequestError
               && error.code === "P2025"
            ) {
               throw new Error("事務所不存在");
            }
            throw new Error("無法刪除事務所：");
         }
      }),

   // === AgencyContactPerson CRUD ===
   // === AgencyContactPerson CRUD ===

   // Create AgencyContactPerson (創建聯絡人並關聯 ContactInfo)
   createAgencyContactPerson: procedure
      .input(
         z.object({
            agencyID: z.number(),
            contactInfo: z.object({
               Name: z.string().min(1, "姓名不可為空"),
               Email: z.string().email("請輸入有效的電子郵件").optional(),
               OfficeNumber: z.string().optional(),
               PhoneNumber: z.string().optional(),
               Position: z.string().optional(),
               Note: z.string().optional(),
            }),
         }),
      )
      .mutation(async ({ input }) => {
         try {
            // 先創建 ContactInfo
            const newContactInfo = await prisma.contactInfo.create({
               data: {
                  Name: input.contactInfo.Name,
                  Email: input.contactInfo.Email,
                  OfficeNumber: input.contactInfo.OfficeNumber,
                  PhoneNumber: input.contactInfo.PhoneNumber,
                  Position: input.contactInfo.Position,
                  Note: input.contactInfo.Note,
               },
            });

            // 使用 ContactInfoID 創建 AgencyContactPerson
            const newContact = await prisma.agencyContactPerson.create({
               data: {
                  AgencyID: input.agencyID,
                  ContactInfoID: newContactInfo.ContactInfoID,
               },
               include: {
                  contactInfo: true,
                  patentContacts: { include: { patent: true } },
               },
            });
            return newContact;
         }
         catch (error) {
            throw new Error("無法創建聯絡人：");
         }
      }),

   // Read AgencyContactPersons (查詢某事務所的所有聯絡人)
   getAgencyContactPersons: procedure
      .input(z.object({ agencyID: z.number() }))
      .query(async ({ input }) => {
         return await prisma.agencyContactPerson.findMany({
            where: { AgencyID: input.agencyID },
            include: {
               contactInfo: true,
               patentContacts: { include: { patent: true } },
            },
         });
      }),

   // Read AgencyContactPerson by ID (查詢單個聯絡人)
   getAgencyContactPersonById: procedure
      .input(z.object({ contactPersonID: z.number() }))
      .query(async ({ input }) => {
         const contact = await prisma.agencyContactPerson.findUnique({
            where: { ContactPersonID: input.contactPersonID },
            include: {
               contactInfo: true,
               patentContacts: { include: { patent: true } },
            },
         });
         if (!contact) {
            throw new Error("聯絡人不存在");
         }
         return contact;
      }),

   // Update AgencyContactPerson (更新聯絡人及其 ContactInfo)
   updateAgencyContactPerson: procedure
      .input(
         z.object({
            contactPersonID: z.number(),
            agencyID: z.number().optional(), // 可選更新所屬事務所
            contactInfo: z
               .object({
                  Name: z.string().min(1, "姓名不可為空").optional(),
                  Email: z.string().email("請輸入有效的電子郵件").optional(),
                  OfficeNumber: z.string().optional(),
                  PhoneNumber: z.string().optional(),
                  Position: z.string().optional(),
                  Note: z.string().optional(),
               })
               .optional(),
         }),
      )
      .mutation(async ({ input }) => {
         try {
            const contact = await prisma.agencyContactPerson.findUnique({
               where: { ContactPersonID: input.contactPersonID },
               include: { contactInfo: true },
            });
            if (!contact) {
               throw new Error("聯絡人不存在");
            }

            // 如果提供了 contactInfo 更新
            if (input.contactInfo && contact.ContactInfoID) {
               await prisma.contactInfo.update({
                  where: { ContactInfoID: contact.ContactInfoID },
                  data: {
                     Name: input.contactInfo.Name,
                     Email: input.contactInfo.Email,
                     OfficeNumber: input.contactInfo.OfficeNumber,
                     PhoneNumber: input.contactInfo.PhoneNumber,
                     Position: input.contactInfo.Position,
                     Note: input.contactInfo.Note,
                  },
               });
            }

            // 更新 AgencyContactPerson
            const updatedContact = await prisma.agencyContactPerson.update({
               where: { ContactPersonID: input.contactPersonID },
               data: {
                  AgencyID: input.agencyID, // 如果提供了新的 agencyID
               },
               include: {
                  contactInfo: true,
                  patentContacts: { include: { patent: true } },
               },
            });
            return updatedContact;
         }
         catch (error) {
            if (
               error instanceof Prisma.PrismaClientKnownRequestError
               && error.code === "P2025"
            ) {
               throw new Error("聯絡人不存在");
            }
            throw new Error("無法更新聯絡人：");
         }
      }),

   // Delete AgencyContactPerson
   deleteAgencyContactPerson: procedure
      .input(z.object({ contactPersonID: z.number() }))
      .mutation(async ({ input }) => {
         try {
            // 查詢聯絡人以獲取 ContactInfoID
            const contact = await prisma.agencyContactPerson.findUnique({
               where: { ContactPersonID: input.contactPersonID },
            });
            if (!contact) {
               throw new Error("聯絡人不存在");
            }

            // 刪除 AgencyContactPerson
            await prisma.agencyContactPerson.delete({
               where: { ContactPersonID: input.contactPersonID },
            });

            // 可選：如果 ContactInfo 不再被其他實體使用，也可以刪除
            // await prisma.contactInfo.delete({ where: { ContactInfoID: contact.ContactInfoID } });

            return { success: true };
         }
         catch (error) {
            if (
               error instanceof Prisma.PrismaClientKnownRequestError
               && error.code === "P2025"
            ) {
               throw new Error("聯絡人不存在");
            }
            throw new Error("無法刪除聯絡人：");
         }
      }),

   // === AgencyPatentContact Operations (保留原有功能) ===

   assignContactToPatent: procedure
      .input(z.object({ contactPersonID: z.number(), patentID: z.number() }))
      .mutation(async ({ input }) => {
         try {
            const existing = await prisma.agencyPatentContact.findUnique({
               where: {
                  ContactPersonID_PatentID: {
                     ContactPersonID: input.contactPersonID,
                     PatentID: input.patentID,
                  },
               },
            });
            if (existing) {
               throw new Error("該聯絡人已負責該專利");
            }
            return await prisma.agencyPatentContact.create({
               data: {
                  ContactPersonID: input.contactPersonID,
                  PatentID: input.patentID,
               },
               include: {
                  AgencyContactPerson: true,
                  patent: true,
               },
            });
         }
         catch (error) {
            throw new Error("無法分配專利：");
         }
      }),

   removeContactFromPatent: procedure
      .input(z.object({ contactPersonID: z.number(), patentID: z.number() }))
      .mutation(async ({ input }) => {
         try {
            return await prisma.agencyPatentContact.delete({
               where: {
                  ContactPersonID_PatentID: {
                     ContactPersonID: input.contactPersonID,
                     PatentID: input.patentID,
                  },
               },
            });
         }
         catch (error) {
            throw new Error("無法移除專利關聯：");
         }
      }),
});
