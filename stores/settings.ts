import { defineStore } from "pinia";
import { toast } from "vue-sonner";
export const useSettingsStore = defineStore("settingsStore", {
   state: () => {
      return {
         reminderSettings: {
            dateRange: { daysBefore: 7, daysAfter: 180 },
            period: "months",
            displayEmptyPeriods: false,
         } as {
            dateRange: { daysBefore: number, daysAfter: number }
            period: "days" | "weeks" | "months" | "years"
            displayEmptyPeriods: boolean
         },
      };
   },
   persist: true,
});
