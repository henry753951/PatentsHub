import { defineStore } from "pinia";
import type { z } from "zod";

export const useCollegesStore = defineStore("collegesStore", {
   state: () => {
      const initialState = {
         colleges: [] as RouterOutput["data"]["college"]["getColleges"],
         isInitialized: false,
      };
      if (!initialState.isInitialized) {
         (async () => {
            try {
               const { $trpc } = useNuxtApp();
               const data = await $trpc.data.college.getColleges.query();
               initialState.colleges = data;
               initialState.isInitialized = true;
            }
            catch (error) {
               console.error("Failed to initialize colleges:", error);
            }
         })();
      }
      return initialState;
   },

   actions: {
      // 刷新所有 Colleges 資料
      async refresh() {
         const { $trpc } = useNuxtApp();
         this.colleges = await $trpc.data.college.getColleges.query();
         return this.colleges;
      },

      // 新增 College
      async insert(collegeName: string, description: string) {
         const { $trpc } = useNuxtApp();
         const newCollege = await $trpc.data.college.createCollege.mutate({
            name: collegeName,
            description: description,
         });
         await this.refresh();
      },

      // 新增 Department 並關聯到指定 College
      async insertWithDepartment(
         collegeID: number,
         departmentName: string,
         description: string,
      ) {
         const { $trpc } = useNuxtApp();
         const newDepartment = await $trpc.data.college.createDepartment.mutate(
            {
               name: departmentName,
               description: description,
               collegeID: collegeID,
            },
         );
         await this.refresh();
      },

      // 刪除 College（由於已設定級聯刪除，相關 Department 會自動刪除）
      async delete(collegeID: number) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.college.deleteCollege.mutate({
            collegeID: collegeID,
         });
         await this.refresh();
      },

      // 刪除特定 Department
      async deleteDepartment(collegeID: number, departmentID: number) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.college.deleteDepartment.mutate({
            departmentID: departmentID,
         });
         await this.refresh();
      },

      // 更新 College 資料
      async updateCollege(
         collegeID: number,
         name: string,
         description: string,
      ) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.college.updateCollege.mutate({
            ID: collegeID,
            name: name,
            description: description,
         });
         await this.refresh();
      },

      // 更新 Department 資料
      async updateDepartment(
         departmentID: number,
         collegeID: number,
         name: string,
         description: string,
      ) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.college.updateDepartment.mutate({
            ID: departmentID,
            collegeID: collegeID,
            name: name,
            description: description,
         });
         await this.refresh();
      },
   },
});
