import { z } from "zod";
import { procedure, router } from "../../trpc";
import { Prisma } from "@prisma/client";
import type { dbZ } from "../..";
import { prisma } from "../..";

export default router({
   // === Agency CRUD ===

   // Create Agency
   createAgency: procedure
      .input(
         z.object({
            name: z.string().min(1, "事務所名稱不可為空"),
            description: z.string().optional(),
         }),
      )
      .mutation(async ({ input }) => {
         try {
            const newAgency = await prisma.agencyUnit.create({
               data: {
                  Name: input.name,
                  Description: input.description,
               },
               include: {
                  Persons: {
                     include: {
                        contactInfo: true,
                     },
                  },
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
      return await prisma.agencyUnit.findMany({
         include: {
            Persons: {
               include: {
                  contactInfo: true,
               },
            },
            InitialReviewPatents: true,
            TakerPatents: true,
         },
      });
   }),

   // Read Agency by ID (查詢單個事務所)
   getAgencyById: procedure
      .input(z.object({ agencyUnitID: z.number() }))
      .query(async ({ input }) => {
         const agency = await prisma.agencyUnit.findUnique({
            where: { AgencyUnitID: input.agencyUnitID },
            include: {
               Persons: {
                  include: {
                     contactInfo: true,
                  },
               },
               InitialReviewPatents: true,
               TakerPatents: true,
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
            AgencyUnitID: z.number(),
            name: z.string().min(1, "事務所名稱不可為空").optional(),
            description: z.string().optional(), // 新增 description
         }),
      )
      .mutation(async ({ input }) => {
         try {
            const updatedAgency = await prisma.agencyUnit.update({
               where: { AgencyUnitID: input.AgencyUnitID },
               data: {
                  Name: input.name,
                  Description: input.description, // 新增 Description
               },
               include: {
                  Persons: {
                     include: {
                        contactInfo: true,
                     },
                  },
                  InitialReviewPatents: true,
                  TakerPatents: true,
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
      .input(z.object({ agencyUnitID: z.number() }))
      .mutation(async ({ input }) => {
         try {
            await prisma.agencyUnit.delete({
               where: { AgencyUnitID: input.agencyUnitID },
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
            agencyUnitID: z.number(),
            contactInfo: z.object({
               Name: z.string().min(1, "姓名不可為空"),
               Email: z
                  .string()
                  .max(0, "請輸入有效的電子郵件")
                  .or(z.string().email("請輸入有效的電子郵件")),
               OfficeNumber: z.string().optional(),
               PhoneNumber: z.string().optional(),
               Role: z.string().optional(),
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
                  Role: input.contactInfo.Role,
                  Note: input.contactInfo.Note,
               },
            });

            // 使用 ContactInfoID 創建 AgencyContactPerson
            const newContact = await prisma.agencyUnitPerson.create({
               data: {
                  AgencyUnitID: input.agencyUnitID,
                  ContactInfoID: newContactInfo.ContactInfoID,
               },
               include: {
                  contactInfo: true,
                  agencyUnit: true,
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
      .input(z.object({ agencyUnitID: z.number() }))
      .query(async ({ input }) => {
         return await prisma.agencyUnitPerson.findMany({
            where: { AgencyUnitID: input.agencyUnitID },
            include: {
               contactInfo: true,
               agencyUnit: true,
            },
         });
      }),

   // Read AgencyContactPerson by ID (查詢單個聯絡人)
   getAgencyContactPersonById: procedure
      .input(z.object({ agencyUnitID: z.number(), contactInfoID: z.number() }))
      .query(async ({ input }) => {
         const contact = await prisma.agencyUnitPerson.findUnique({
            where: {
               AgencyUnitID: input.agencyUnitID,
               ContactInfoID: input.contactInfoID,
            },
            include: {
               contactInfo: true,
               agencyUnit: true,
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
            contactInfoID: z.number(),
            agencyUnitID: z.number(), // 新增 agencyID
            contactInfo: z
               .object({
                  Name: z.string().min(1, "姓名不可為空").optional(),
                  Email: z
                     .string()
                     .email("請輸入有效的電子郵件")
                     .optional()
                     .or(z.literal("")),
                  OfficeNumber: z.string().optional(),
                  PhoneNumber: z.string().optional(),
                  Role: z.string().optional(),
                  Note: z.string().optional(),
               })
               .optional(),
         }),
      )
      .mutation(async ({ input }) => {
         try {
            const contact = await prisma.agencyUnitPerson.findUnique({
               where: {
                  ContactInfoID: input.contactInfoID,
                  AgencyUnitID: input.agencyUnitID,
               },
               include: { contactInfo: true },
            });
            if (!contact) {
               throw new Error("聯絡人不存在");
            }

            return await prisma.contactInfo.update({
               where: { ContactInfoID: contact.ContactInfoID },
               data: {
                  Name: input.contactInfo?.Name ?? undefined,
                  Email: input.contactInfo?.Email ?? undefined,
                  OfficeNumber: input.contactInfo?.OfficeNumber ?? undefined,
                  PhoneNumber: input.contactInfo?.PhoneNumber ?? undefined,
                  Role: input.contactInfo?.Role ?? undefined,
                  Note: input.contactInfo?.Note ?? undefined,
               },
            });
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
      .input(
         z.object({
            agencyUnitID: z.number(),
            contactInfoID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         try {
            // 查詢聯絡人以獲取 ContactInfoID
            const contact = await prisma.agencyUnitPerson.findUnique({
               where: {
                  ContactInfoID: input.contactInfoID,
                  AgencyUnitID: input.agencyUnitID,
               },
            });
            if (!contact) {
               throw new Error("聯絡人不存在");
            }

            // 刪除 AgencyContactPerson
            await prisma.agencyUnitPerson.delete({
               where: {
                  AgencyUnitID: input.agencyUnitID,
                  ContactInfoID: input.contactInfoID,
               },
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

   mergeAgencies: procedure
      .input(
         z.object({
            sourceAgencyUnitIDs: z.array(z.number()),
            targetAgencyUnitID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         //
         // Step 1:
         // 1. 有這些事務所初評的案件
         // 2. 有這些事務所的承辦的案件
         //
         const patentIds = {
            beReviewed: [] as number[],
            beHandled: [] as number[],
         };
         patentIds.beReviewed = await prisma.patent
            .findMany({
               where: {
                  internal: {
                     InitialReviewAgencies: {
                        some: {
                           AgencyUnitID: {
                              in: input.sourceAgencyUnitIDs,
                           },
                        },
                     },
                  },
               },
               select: { PatentID: true },
            })
            .then((p) => p.map((p) => p.PatentID));

         patentIds.beHandled = await prisma.patent
            .findMany({
               where: {
                  internal: {
                     TakerAgencies: {
                        some: {
                           AgencyUnitID: {
                              in: input.sourceAgencyUnitIDs,
                           },
                        },
                     },
                  },
               },
               select: { PatentID: true },
            })
            .then((p) => p.map((p) => p.PatentID));

         //
         // Step 2:
         // 獲取所有擁有該事務所的案件
         //
         await prisma.patentTakerAgencyUnit.updateMany({
            where: {
               AND: [
                  { PatentID: { in: patentIds.beHandled } },

                  {
                     AgencyUnitID: { in: input.sourceAgencyUnitIDs },
                  },
               ],
            },
            data: {
               AgencyUnitID: input.targetAgencyUnitID,
            },
         });

         await prisma.patentInitiatorAgencyUnit.updateMany({
            where: {
               AND: [
                  { PatentID: { in: patentIds.beReviewed } },

                  {
                     AgencyUnitID: { in: input.sourceAgencyUnitIDs },
                  },
               ],
            },
            data: {
               AgencyUnitID: input.targetAgencyUnitID,
            },
         });

         //
         // Step 3:
         // 合併人員
         //
         await prisma.agencyUnitPerson.updateMany({
            where: {
               AgencyUnitID: { in: input.sourceAgencyUnitIDs },
            },
            data: {
               AgencyUnitID: input.targetAgencyUnitID,
            },
         });

         // Step 4:
         // 刪除源事務所
         //
         await prisma.agencyUnit.deleteMany({
            where: {
               AgencyUnitID: { in: input.sourceAgencyUnitIDs },
            },
         });
      }),

   mergeContacts: procedure
      .input(
         z.object({
            sourceContactInfoIDs: z.array(z.number()),
            targetContactInfoID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         const { sourceContactInfoIDs, targetContactInfoID } = input;

         // Step 1: 獲取目標聯絡人和來源聯絡人的資訊
         const targetContact = await prisma.contactInfo.findUnique({
            where: { ContactInfoID: targetContactInfoID },
         });

         if (!targetContact) {
            throw new Error(
               `Target contact with ID ${targetContactInfoID} not found`,
            );
         }

         const sourceContacts = await prisma.contactInfo.findMany({
            where: { ContactInfoID: { in: sourceContactInfoIDs } },
         });

         // Step 2: 合併聯絡人資訊（優先取目標值，若目標值為空則取來源第一個非空值）
         const mergedData: Partial<z.infer<typeof dbZ.ContactInfoSchema>> = {
            Name: targetContact.Name,
            Email: targetContact.Email || undefined,
            OfficeNumber: targetContact.OfficeNumber || undefined,
            PhoneNumber: targetContact.PhoneNumber || undefined,
            Role: targetContact.Role || undefined,
            Note: targetContact.Note || undefined,
         };

         for (const sourceContact of sourceContacts) {
            if (!mergedData.Email && sourceContact.Email) {
               mergedData.Email = sourceContact.Email;
            }
            if (!mergedData.OfficeNumber && sourceContact.OfficeNumber) {
               mergedData.OfficeNumber = sourceContact.OfficeNumber;
            }
            if (!mergedData.PhoneNumber && sourceContact.PhoneNumber) {
               mergedData.PhoneNumber = sourceContact.PhoneNumber;
            }
            if (!mergedData.Role && sourceContact.Role) {
               mergedData.Role = sourceContact.Role;
            }
            if (!mergedData.Note && sourceContact.Note) {
               mergedData.Note = sourceContact.Note;
            }
         }

         // 更新目標聯絡人資訊
         await prisma.contactInfo.update({
            where: { ContactInfoID: targetContactInfoID },
            data: mergedData,
         });

         // Step 3: 更新 AgencyUnitPerson 表，將來源聯絡人指向目標聯絡人
         await prisma.agencyUnitPerson.deleteMany({
            where: {
               ContactInfoID: { in: sourceContactInfoIDs },
            },
         });

         // Step 4: 更新 PatentTakerAgencyUnit 和 PatentInitiatorAgencyUnit 的 agencyUnitPersonIds
         // 4.1: 處理 PatentTakerAgencyUnit
         const takerRecords = await prisma.patentTakerAgencyUnit.findMany({
            where: {
               agencyUnitPersonIds: {
                  not: "[]", // 只處理非空的 JSON 陣列
               },
            },
         });

         for (const record of takerRecords) {
            const personIds = record.agencyUnitPersonIds as number[];
            if (personIds instanceof Array && personIds.length > 0) {
               if (personIds.some((id) => sourceContactInfoIDs.includes(id))) {
                  // 將 sourceContactInfoIDs 替換為 targetContactInfoID，並移除重複
                  const updatedPersonIds = Array.from(
                     new Set(
                        personIds
                           .filter((id) => !sourceContactInfoIDs.includes(id))
                           .concat(targetContactInfoID),
                     ),
                  );
                  await prisma.patentTakerAgencyUnit.update({
                     where: {
                        PatentID_AgencyUnitID: {
                           PatentID: record.PatentID,
                           AgencyUnitID: record.AgencyUnitID,
                        },
                     },
                     data: {
                        agencyUnitPersonIds: JSON.stringify(updatedPersonIds),
                     },
                  });
               }
            }
         }

         // 4.2: 處理 PatentInitiatorAgencyUnit
         const initiatorRecords
            = await prisma.patentInitiatorAgencyUnit.findMany({
               where: {
                  agencyUnitPersonIds: {
                     not: "[]", // 只處理非空的 JSON 陣列
                  },
               },
            });

         for (const record of initiatorRecords) {
            const personIds = record.agencyUnitPersonIds as number[];
            if (personIds.some((id) => sourceContactInfoIDs.includes(id))) {
               // 將 sourceContactInfoIDs 替換為 targetContactInfoID，並移除重複
               const updatedPersonIds = Array.from(
                  new Set(
                     personIds
                        .filter((id) => !sourceContactInfoIDs.includes(id))
                        .concat(targetContactInfoID),
                  ),
               );
               await prisma.patentInitiatorAgencyUnit.update({
                  where: {
                     PatentID_AgencyUnitID: {
                        PatentID: record.PatentID,
                        AgencyUnitID: record.AgencyUnitID,
                     },
                  },
                  data: {
                     agencyUnitPersonIds: JSON.stringify(updatedPersonIds),
                  },
               });
            }
         }

         // Step 5: 刪除來源聯絡人
         await prisma.contactInfo.deleteMany({
            where: {
               ContactInfoID: { in: sourceContactInfoIDs },
            },
         });
      }),

   moveContact: procedure
      .input(
         z.object({
            contactInfoID: z.number(),
            targetAgencyUnitID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         const { contactInfoID, targetAgencyUnitID } = input;
         await prisma.agencyUnitPerson.updateMany({
            where: { ContactInfoID: contactInfoID },
            data: { AgencyUnitID: targetAgencyUnitID },
         });
      }),
});
