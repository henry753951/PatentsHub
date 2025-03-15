import { defineStore } from "pinia";

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
      async refresh() {
         const { $trpc } = useNuxtApp();
         this.agencies = await $trpc.data.agency.getAgencies.query();
         console.log("refresh", this.agencies);
         return this.agencies;
      },

      async insert(agencyName: string, description?: string) {
         const { $trpc } = useNuxtApp();

         await $trpc.data.agency.createAgency.mutate({
            name: agencyName,
            description,
         });
         await this.refresh(); // 刷新以保持數據一致
      },

      async update(agencyUnitID: number, name: string, description?: string) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.agency.updateAgency.mutate({
            AgencyUnitID: agencyUnitID,
            name,
            description,
         });
         await this.refresh();
      },

      async delete(agencyUnitID: number) {
         const { $trpc } = useNuxtApp();

         await $trpc.data.agency.deleteAgency.mutate({ agencyUnitID });
         await this.refresh();
      },

      async insertContact(
         agencyUnitID: number,
         contactInfo: {
            Name: string
            Email?: string
            OfficeNumber?: string
            PhoneNumber?: string
            Role?: string
            Note?: string
         },
      ) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.agency.createAgencyContactPerson.mutate({
            agencyUnitID,
            contactInfo,
         });
         console.log("insertContact", agencyUnitID, contactInfo);
         await this.refresh();
      },

      async updateContact(
         contactInfoID: number,
         agencyUnitID: number,
         contactInfo?: {
            Name?: string
            Email?: string
            OfficeNumber?: string
            PhoneNumber?: string
            Role?: string
            Note?: string
         },
      ) {
         const { $trpc } = useNuxtApp();

         await $trpc.data.agency.updateAgencyContactPerson.mutate({
            contactInfoID,
            agencyUnitID,
            contactInfo,
         });
         await this.refresh();
      },

      async deleteContact(agencyUnitID: number, contactInfoID: number) {
         const { $trpc } = useNuxtApp();

         await $trpc.data.agency.deleteAgencyContactPerson.mutate({
            agencyUnitID,
            contactInfoID,
         });
         await this.refresh();
      },
   },
});
