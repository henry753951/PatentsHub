import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import type { dbZ, z } from "#imports";
export const useSettingsStore = defineStore("settingsStore", {
   state: () => {
      return {
         reminderSettings: {
            dateRange: { daysBefore: 7, daysAfter: 180 },
            period: "weeks",
         } as {
            dateRange: { daysBefore: number, daysAfter: number }
            period: "days" | "weeks" | "months" | "years"
         },
      };
   },
   persist: true,
});
