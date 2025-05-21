import { defineStore } from "pinia";

export const useFundingPlansStore = defineStore("fundingPlansStore", {
   state: () => {
      return {
         plans: [] as RouterOutput["data"]["fundingPlan"]["getAllFundingPlans"],
         targets:
            [] as RouterOutput["data"]["fundingPlan"]["getAllFundingPlanTarget"],
      };
   },

   actions: {
      async refresh() {
         const { $trpc } = useNuxtApp();
         this.plans = await $trpc.data.fundingPlan.getAllFundingPlans.query();
         this.targets
            = await $trpc.data.fundingPlan.getAllFundingPlanTarget.query();
      },

      async insert(
         name: string,
         allocation: { targetID: number, percentage: number }[],
      ) {
         const { $trpc } = useNuxtApp();

         await $trpc.data.fundingPlan.createFundingPlan.mutate({
            name,
            allocation,
         });
         await this.refresh();
      },

      async update(
         fundingPlanID: number,
         name: string,
         allocation: { targetID: number, percentage: number }[],
      ) {
         const { $trpc } = useNuxtApp();

         await $trpc.data.fundingPlan.updateFundingPlan.mutate({
            fundingPlanID,
            name,
            allocation,
         });
         await this.refresh();
      },

      async delete(fundingPlanID: number) {
         const { $trpc } = useNuxtApp();

         await $trpc.data.fundingPlan.deleteFundingPlan.mutate({
            fundingPlanID,
         });
         await this.refresh();
      },

      async insertTarget(name: string) {
         const { $trpc } = useNuxtApp();

         await $trpc.data.fundingPlan.createFundingPlanTarget.mutate({
            name,
         });
         await this.refresh();
      },

      async deleteTarget(fundingPlanTargetID: number) {
         const { $trpc } = useNuxtApp();

         await $trpc.data.fundingPlan.deleteFundingPlanTarget.mutate({
            fundingPlanTargetID,
         });
         await this.refresh();
      },

      async updateTarget(fundingPlanTargetID: number, name: string) {
         const { $trpc } = useNuxtApp();

         await $trpc.data.fundingPlan.updateFundingPlanTarget.mutate({
            fundingPlanTargetID,
            name,
         });
         await this.refresh();
      },
   },
});
