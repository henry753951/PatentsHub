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
      async insert(collageName: string) {
         const { $trpc } = useNuxtApp();
         const newCollage = await $trpc.data.collage.createCollage.mutate({
            name: collageName,
            description: "", // 提供預設描述，或根據需求修改
         });
         await this.refresh();
      },

      // 新增 Department 並關聯到指定 College
      async insertWithDepartment(collageID: number, departmentName: string) {
         const { $trpc } = useNuxtApp();
         const newDepartment = await $trpc.data.collage.createDepartment.mutate(
            {
               name: departmentName,
               description: "", // 提供預設描述，或根據需求修改
               collageID: collageID, // 注意這裡使用了 "collageID"，與你的 TRPC 輸入一致
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
         // 從本地狀態移除被刪除的 College
         this.collages = this.collages.filter((c) => c.CollegeID !== collageID);
      },

      // 刪除特定 Department
      async deleteDepartment(collageID: number, departmentID: number) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.collage.deleteDepartment.mutate({
            departmentID: departmentID,
         });
         await this.refresh();
      },
   },
});
