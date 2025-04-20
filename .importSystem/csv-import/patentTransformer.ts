import type { PatentTransformed, PatentRaw } from "../types/patent";
const PatentTransformer = {
   transform(raw: PatentRaw): PatentTransformed {
      return {
         ...raw,
         共同發明人: PatentTransformer.parseCoInventors(raw.共同發明人),
      };
   },

   parseCoInventors(
      coInventors: string,
   ): { name: string, contribution: number }[] {
      if (!coInventors || coInventors.trim() === "") {
         return [];
      }
      const regex = /([^、\d]+?)(\d+)(?:、|$)/g;
      const result: { name: string, contribution: number }[] = [];
      let match;
      while ((match = regex.exec(coInventors)) !== null) {
         const name = match[1].trim();
         const contribution = parseInt(match[2], 10);
         const existing = result.find((item) => item.name === name);
         if (!existing) {
            result.push({ name, contribution });
         }
      }
      return result;
   },
};

export { PatentTransformer };
