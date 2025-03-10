import { defineStore } from "pinia";

export const useCountriesStore = defineStore("countriesStore", {
   state: () => {
      const initialState = {
         countries: [] as RouterOutput["data"]["country"]["getAllContries"],
         isInitialized: false,
      };
      if (!initialState.isInitialized) {
         (async () => {
            try {
               const { $trpc } = useNuxtApp();
               const data = await $trpc.data.country.getAllContries.query();
               initialState.countries = data;
               initialState.isInitialized = true;
            }
            catch (error) {
               console.error("Failed to initialize countries:", error);
            }
         })();
      }
      return initialState;
   },

   actions: {
      // 刷新所有 Countries 資料
      async refresh() {
         const { $trpc } = useNuxtApp();
         this.countries = await $trpc.data.country.getAllContries.query();
         return this.countries;
      },

      // 新增 Country
      async insert(countryName: string, isoCode: string) {
         const { $trpc } = useNuxtApp();
         const newCountry = await $trpc.data.country.createCountry.mutate({
            countryName: countryName,
            isoCode: isoCode,
         });
         await this.refresh();
      },

      // 刪除 Country
      async delete(id: number) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.country.deleteCountry.mutate({
            countryID: id,
         });
         await this.refresh();
      },

      // 更新 Country 資料
      async updateCountry(id: number, countryname: string, isocode: string) {
         const { $trpc } = useNuxtApp();
         await $trpc.data.country.updateCountry.mutate({
            countryID: id,
            countryName: countryname,
            isoCode: isocode,
         });
         await this.refresh();
      },
      // 清空所有 Country
      async clearCountries() {
         const { $trpc } = useNuxtApp();
         await $trpc.data.country.clearCountries.mutate();
         await this.refresh();
      },
   },
});
