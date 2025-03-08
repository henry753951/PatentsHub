import { defineStore } from "pinia";
import type { z } from "zod";

export const useAgenciesStore = defineStore("agenciesStore", {
   state: () => {
      const initialState = {
         agencies: [] as RouterOutput["data"]["agency"]["getAgencies"],
         isInitialized: false,
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
            }
         })();
      }
      return initialState;
   },

   actions: {
      // 刷新所有 Agencies 資料
      async refresh() {
         const { $trpc } = useNuxtApp();
         this.agencies = await $trpc.data.agency.getAgencies.query();
         return this.agencies;
      },

      // 新增 Agency
      async insert(agencyName: string) {
         const { $trpc } = useNuxtApp();
         const newAgency = await $trpc.data.agency.createAgency.mutate({
            name: agencyName,
         });
         await this.refresh();
      },

      // 更新 Agency 資料
      async update(agencyID: number, name: string) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.agency.updateAgency.mutate({
            agencyID,
            name,
         });
         await this.refresh();
      },

      // 刪除 Agency
      async delete(agencyID: number) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.agency.deleteAgency.mutate({
            agencyID,
         });
         await this.refresh();
      },

      // 新增 AgencyPatent
      async insertPatent(
         patentID: number,
         agencyID: number,
         fileCode: string,
         role: string,
         details?: string,
      ) {
         const { $trpc } = useNuxtApp();
         const newPatent = await $trpc.data.agency.createAgencyPatent.mutate({
            patentID,
            agencyID,
            fileCode,
            role,
            details,
         });
         await this.refresh();
      },

      // 更新 AgencyPatent 資料
      async updatePatent(
         patentID: number,
         agencyID: number,
         fileCode: string,
         role: string,
         details?: string,
      ) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.agency.updateAgencyPatent.mutate({
            patentID,
            agencyID,
            fileCode,
            role,
            details,
         });
         await this.refresh();
      },

      // 刪除 AgencyPatent
      async deletePatent(patentID: number, agencyID: number) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.agency.deleteAgencyPatent.mutate({
            patentID,
            agencyID,
         });
         await this.refresh();
      },

      // 新增 AgencyContactPerson
      async insertContact(
         agencyID: number,
         position: string,
         contactInfoID?: number,
      ) {
         const { $trpc } = useNuxtApp();
         const newContact = await $trpc.data.agency.createAgencyContactPerson.mutate(
            {
               agencyID,
               position,
               contactInfoID,
            },
         );
         await this.refresh();
      },

      // 更新 AgencyContactPerson 資料
      async updateContact(
         contactPersonID: number,
         agencyID: number,
         position: string,
         contactInfoID?: number,
      ) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.agency.updateAgencyContactPerson.mutate({
            contactPersonID,
            agencyID,
            position,
            contactInfoID,
         });
         await this.refresh();
      },

      // 刪除 AgencyContactPerson
      async deleteContact(contactPersonID: number) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.agency.deleteAgencyContactPerson.mutate({
            contactPersonID,
         });
         await this.refresh();
      },
   },
});
