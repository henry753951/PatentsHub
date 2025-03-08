import { z } from "zod";
import { procedure, router } from "../../trpc";

export default router({
   // === Agency CRUD ===

   // Create Agency
   createAgency: procedure
      .input(
         z.object({
            name: z.string(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.agency.create({
            data: {
               Name: input.name,
            },
         });
      }),

   // Read Agencies
   getAgencies: procedure.query(async () => {
      return await prisma.agency.findMany({
         select: {
            AgencyID: true,
            Name: true,
            contacts: true, // 包含關聯的聯絡人
            patents: true, // 包含關聯的專利
         },
      });
   }),

   // Update Agency
   updateAgency: procedure
      .input(
         z.object({
            agencyID: z.number(),
            name: z.string(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.agency.update({
            where: {
               AgencyID: input.agencyID,
            },
            data: {
               Name: input.name,
            },
         });
      }),

   // Delete Agency
   deleteAgency: procedure
      .input(
         z.object({
            agencyID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.agency.delete({
            where: {
               AgencyID: input.agencyID,
            },
         });
      }),

   // === AgencyPatent CRUD ===

   // Create AgencyPatent
   createAgencyPatent: procedure
      .input(
         z.object({
            patentID: z.number(),
            agencyID: z.number(),
            fileCode: z.string(),
            role: z.string(),
            details: z.string().optional(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.agencyPatent.create({
            data: {
               PatentID: input.patentID,
               AgencyID: input.agencyID,
               FileCode: input.fileCode,
               Role: input.role,
               Details: input.details,
            },
         });
      }),

   // Update AgencyPatent
   updateAgencyPatent: procedure
      .input(
         z.object({
            patentID: z.number(),
            agencyID: z.number(),
            fileCode: z.string(),
            role: z.string(),
            details: z.string().optional(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.agencyPatent.update({
            where: {
               PatentID_AgencyID: {
                  PatentID: input.patentID,
                  AgencyID: input.agencyID,
               },
            },
            data: {
               FileCode: input.fileCode,
               Role: input.role,
               Details: input.details,
            },
         });
      }),

   // Delete AgencyPatent
   deleteAgencyPatent: procedure
      .input(
         z.object({
            patentID: z.number(),
            agencyID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.agencyPatent.delete({
            where: {
               PatentID_AgencyID: {
                  PatentID: input.patentID,
                  AgencyID: input.agencyID,
               },
            },
         });
      }),

   // === AgencyContactPerson CRUD ===

   // Create AgencyContactPerson
   createAgencyContactPerson: procedure
      .input(
         z.object({
            agencyID: z.number(),
            position: z.string(),
            contactInfoID: z.number().optional(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.agencyContactPerson.create({
            data: {
               AgencyID: input.agencyID,
               Position: input.position,
               ContactInfoID: input.contactInfoID,
            },
         });
      }),

   // Update AgencyContactPerson
   updateAgencyContactPerson: procedure
      .input(
         z.object({
            contactPersonID: z.number(),
            agencyID: z.number(),
            position: z.string(),
            contactInfoID: z.number().optional(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.agencyContactPerson.update({
            where: {
               ContactPersonID: input.contactPersonID,
            },
            data: {
               AgencyID: input.agencyID,
               Position: input.position,
               ContactInfoID: input.contactInfoID,
            },
         });
      }),

   // Delete AgencyContactPerson
   deleteAgencyContactPerson: procedure
      .input(
         z.object({
            contactPersonID: z.number(),
         }),
      )
      .mutation(async ({ input }) => {
         return await prisma.agencyContactPerson.delete({
            where: {
               ContactPersonID: input.contactPersonID,
            },
         });
      }),
});
