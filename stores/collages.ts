import { defineStore } from "pinia";
import type { z } from "zod";

export const useCollagesStore = defineStore("collagesStore", {
   state: () => ({
      collages: [] as RouterOutput["data"]["collage"]["getCollages"],
   }),
   actions: {
      // 刷新所有 Colleges 資料
      async refresh() {
         const { $trpc } = useNuxtApp();
         this.collages = await $trpc.data.collage.getCollages.query();
      },

      // 新增 College
      async insert(collageName: string, description: string) {
         const { $trpc } = useNuxtApp();
         const newCollage = await $trpc.data.collage.createCollage.mutate({
            name: collageName,
            description: description,
         });
         await this.refresh();
      },

      // 新增 Department 並關聯到指定 College
      async insertWithDepartment(
         collageID: number,
         departmentName: string,
         description: string,
      ) {
         const { $trpc } = useNuxtApp();
         const newDepartment = await $trpc.data.collage.createDepartment.mutate(
            {
               name: departmentName,
               description: description,
               collageID: collageID,
            },
         );
         await this.refresh();
      },

      // 刪除 College（由於已設定級聯刪除，相關 Department 會自動刪除）
      async delete(collageID: number) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.collage.deleteCollage.mutate({
            collageID: collageID,
         });
         await this.refresh();
      },

      // 刪除特定 Department
      async deleteDepartment(collageID: number, departmentID: number) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.collage.deleteDepartment.mutate({
            departmentID: departmentID,
         });
         await this.refresh();
      },

      // 更新 College 資料
      async updateCollege(
         collageID: number,
         name: string,
         description: string,
      ) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.collage.updateCollage.mutate({
            ID: collageID,
            name: name,
            description: description,
         });
         await this.refresh();
      },

      // 更新 Department 資料
      async updateDepartment(
         departmentID: number,
         collageID: number,
         name: string,
         description: string,
      ) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.collage.updateDepartment.mutate({
            ID: departmentID,
            collageID: collageID,
            name: name,
            description: description,
         });
         await this.refresh();
      },
   },
});
