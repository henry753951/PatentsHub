import { defineStore } from "pinia";

export const useInventorsStore = defineStore("inventorsStore", {
   state: () => ({
      currentDepartmentID: null as number | null,
   }),

   actions: {
      // 設置當前系所過濾條件
      setDepartmentFilter(departmentID: number) {
         this.currentDepartmentID = departmentID;
      },

      // 查詢發明人資料
      async fetchInventors(departmentID: number) {
         const { $trpc } = useNuxtApp();
         return await $trpc.data.inventor.getInventors.query({
            departmentID: departmentID,
         });
      },

      // 新增 Inventor
      async insert(name: string, email: string, departmentID: number) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.inventor.createInventor.mutate({
            name,
            email,
            departmentID,
         });
      },

      // 更新 Inventor 資料
      async update(
         id: number,
         name: string,
         email: string,
         departmentID: number,
      ) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.inventor.updateInventor.mutate({
            id,
            name,
            email,
            departmentID,
         });
      },

      // 刪除 Inventor
      async delete(inventorID: number) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.inventor.deleteInventor.mutate({
            inventorID,
         });
      },
   },
});
