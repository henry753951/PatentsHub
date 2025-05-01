import type { PrismaClient, Prisma } from "@prisma/client";
import type { PatentTransformed } from "../../types/patent";
import { departments as DEPARTMENTS } from "../utils";
import consola from "consola";

/**
 * 插入部門數據並創建部門名稱到 ID 的映射。
 * @param data - 轉換後的專利數據數組
 * @param prisma - Prisma 客戶端實例
 * @returns 部門名稱到其 ID 的映射
 */
export const insertDepartment = async (data: PatentTransformed[], prisma: PrismaClient) => {
   consola.info("開始插入部門數據...");
   const query: Prisma.PrismaPromise<any>[] = [];

   // 新增“其他”學院及其“未分類系所”
   query.push(
      prisma.college.create({
         data: {
            Name: "其他",
            departments: {
               createMany: {
                  data: [{ DepartmentID: 0, Name: "未分類系所" }],
               },
            },
         },
      }),
   );

   // 插入 DEPARTMENTS 中的學院和系所
   for (const [college, departmentList] of Object.entries(DEPARTMENTS)) {
      query.push(
         prisma.college.create({
            data: {
               Name: college,
               departments: {
                  createMany: {
                     data: departmentList.map((department) => ({ Name: department })),
                  },
               },
            },
         }),
      );
   }

   await prisma.$transaction(query);

   // 構建部門 ID 映射
   const idMap = new Map<string, number>();
   const departments = await prisma.department.findMany();
   for (const department of departments) {
      idMap.set(department.Name, department.DepartmentID);
   }
   consola.success("部門數據插入成功。");
   return idMap;
};
