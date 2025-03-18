import { z } from "zod";
import { procedure, router } from "../../trpc";
import { dbZ, prisma } from "../..";

export default router({
   getNotes: procedure.input(z.object({})).query(() => {
      return prisma.note.findMany();
   }),
   upsertNote: procedure
      .input(
         z.object({
            Key: z.string(),
            Title: z.string(),
            Body: z.string(),
            Date: z.date(),
         }),
      )
      .mutation(({ input }) => {
         return prisma.note.upsert({
            where: {
               Key: input.Key,
            },
            update: {
               Title: input.Title,
               Body: input.Body,
               Date: input.Date,
            },
            create: {
               Key: input.Key,
               Title: input.Title,
               Body: input.Body,
               Date: input.Date,
            },
         });
      }),
   deleteNote: procedure
      .input(
         z.object({
            Key: z.string(),
         }),
      )
      .mutation(({ input }) => {
         return prisma.note.delete({
            where: {
               Key: input.Key,
            },
         });
      }),
});
