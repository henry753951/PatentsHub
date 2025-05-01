import type { PatentTransformed, PatentRaw } from "../types/patent";
const PatentTransformer = {
   transform(raw: PatentRaw): PatentTransformed {
      return {
         ...raw,
         校內編號: formatSchoolId(raw.校內編號),
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

function formatSchoolId(schoolId) {
   // 確保輸入是字串，並移除可能的空白
   const id = String(schoolId).trim();

   // 檢查輸入長度
   if (id.length === 4) {
      // YYNN -> YYYNNN (補 0 至 6 位)
      const year = id.slice(0, 2).padStart(3, "0"); // 99 -> 099
      const number = id.slice(2).padStart(3, "0"); // 13 -> 013
      return year + number; // 099013
   }
   else if (id.length === 5) {
      // YYYNN -> YYYNNN (補 0 至 6 位)
      const year = id.slice(0, 3); // 108
      const number = id.slice(3).padStart(3, "0"); // 01 -> 001
      return year + number; // 108001
   }
   else {
      // 如果長度不符合預期，記錄警告並返回原始值
      console.warn(`[⚠️] Invalid school ID length: ${id}`);
      return id; // 或者根據需求拋出錯誤
   }
}

export { PatentTransformer };
