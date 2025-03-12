import { defineStore } from "pinia";

export const useAgenciesStore = defineStore("agenciesStore", {
   state: () => {
      const initialState = {
         agencies: [] as RouterOutput["data"]["agency"]["getAgencies"],
         isInitialized: false,
         isLoading: false,
         error: null as string | null,
      };

      if (!initialState.isInitialized) {
         (async () => {
            try {
               const { $trpc } = useNuxtApp();
               const data = await $trpc.data.agency.getAgencies.query();
               initialState.agencies = data;
               initialState.isInitialized = true;
            }
            catch (error) {
               console.error("Failed to initialize agencies:", error);
               initialState.error = (error as Error).message || "初始化失敗";
            }
         })();
      }

      return initialState;
   },

   actions: {
      async refresh() {
         const { $trpc } = useNuxtApp();
         try {
            this.isLoading = true;
            this.error = null;
            this.agencies = await $trpc.data.agency.getAgencies.query();
            return this.agencies;
         }
         catch (error) {
            this.error = (error as Error).message || "刷新失敗";
            throw error;
         }
         finally {
            this.isLoading = false;
         }
      },

      async insert(agencyName: string, description?: string) {
         // 添加 description
         const { $trpc } = useNuxtApp();
         try {
            this.isLoading = true;
            this.error = null;
            await $trpc.data.agency.createAgency.mutate({
               name: agencyName,
               description,
            });
            await this.refresh(); // 刷新以保持數據一致
         }
         catch (error) {
            this.error = (error as Error).message || "新增失敗";
            throw error;
         }
         finally {
            this.isLoading = false;
         }
      },

      async update(agencyID: number, name: string, description?: string) {
         // 添加 description
         const { $trpc } = useNuxtApp();
         try {
            this.isLoading = true;
            this.error = null;
            await $trpc.data.agency.updateAgency.mutate({
               agencyID,
               name,
               description,
            });
            await this.refresh();
         }
         catch (error) {
            this.error = (error as Error).message || "更新失敗";
            throw error;
         }
         finally {
            this.isLoading = false;
         }
      },

      async delete(agencyID: number) {
         const { $trpc } = useNuxtApp();
         try {
            this.isLoading = true;
            this.error = null;
            await $trpc.data.agency.deleteAgency.mutate({ agencyID });
            await this.refresh();
         }
         catch (error) {
            this.error = (error as Error).message || "刪除失敗";
            throw error;
         }
         finally {
            this.isLoading = false;
         }
      },

      async insertContact(
         agencyID: number,
         contactInfo: {
            Name: string
            Email?: string
            OfficeNumber?: string
            PhoneNumber?: string
            Position?: string
            Note?: string
         },
      ) {
         const { $trpc } = useNuxtApp();
         try {
            this.isLoading = true;
            this.error = null;
            await $trpc.data.agency.createAgencyContactPerson.mutate({
               agencyID,
               contactInfo,
            });
            await this.refresh();
         }
         catch (error) {
            this.error = (error as Error).message || "新增聯絡人失敗";
            throw error;
         }
         finally {
            this.isLoading = false;
         }
      },

      async updateContact(
         contactPersonID: number,
         agencyID?: number,
         contactInfo?: {
            Name?: string
            Email?: string
            OfficeNumber?: string
            PhoneNumber?: string
            Position?: string
            Note?: string
         },
      ) {
         const { $trpc } = useNuxtApp();
         try {
            this.isLoading = true;
            this.error = null;
            await $trpc.data.agency.updateAgencyContactPerson.mutate({
               contactPersonID,
               agencyID,
               contactInfo,
            });
            await this.refresh();
         }
         catch (error) {
            this.error = (error as Error).message || "更新聯絡人失敗";
            throw error;
         }
         finally {
            this.isLoading = false;
         }
      },

      async deleteContact(contactPersonID: number) {
         const { $trpc } = useNuxtApp();
         try {
            this.isLoading = true;
            this.error = null;
            await $trpc.data.agency.deleteAgencyContactPerson.mutate({
               contactPersonID,
            });
            await this.refresh();
         }
         catch (error) {
            this.error = (error as Error).message || "刪除聯絡人失敗";
            throw error;
         }
         finally {
            this.isLoading = false;
         }
      },

      async assignContactToPatent(contactPersonID: number, patentID: number) {
         const { $trpc } = useNuxtApp();
         try {
            this.isLoading = true;
            this.error = null;
            await $trpc.data.agency.assignContactToPatent.mutate({
               contactPersonID,
               patentID,
            });
            await this.refresh();
         }
         catch (error) {
            this.error = (error as Error).message || "分配聯絡人失敗";
            throw error;
         }
         finally {
            this.isLoading = false;
         }
      },

      async removeContactFromPatent(contactPersonID: number, patentID: number) {
         const { $trpc } = useNuxtApp();
         try {
            this.isLoading = true;
            this.error = null;
            await $trpc.data.agency.removeContactFromPatent.mutate({
               contactPersonID,
               patentID,
            });
            await this.refresh();
         }
         catch (error) {
            this.error = (error as Error).message || "移除聯絡人失敗";
            throw error;
         }
         finally {
            this.isLoading = false;
         }
      },
   },
});
