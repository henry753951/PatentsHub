// import { useNow } from "@vueuse/core";

// export const usePatentFuddings = (patentService: {
//    data: Ref<RouterOutput["data"]["patent"]["getPatent"]>
//    refreshCallback?: () => Promise<void>
// }) => {
//    const now = useNow();
//    const { $trpc } = useNuxtApp();
//    const { data: patent, refreshCallback } = patentService;
//    const DbFundingRecords = computed(() => {
//       {
//          FundingRecordID: number
//          Name: string,
//          Description: string,
//          Amount: number, Decimal in db

//       }
//       return patent.value?.funding.fundingRecords ?? [];
//    });
//    const DbFunding = computed(() => {
//       if (!patent.value?.funding) return;
//       return {
//          plan: {
//             Name: patent.value.funding.plan.Name,
//             PlanType: patent.value.funding.plan.PlanType,
//             PlanID: patent.value.funding.plan.PlanID,
//          },
//          fuddingUnits: [{
//             Name: str
//             FunddingUnitID: number
//          }]
//       };
//    });

//    // ==================================================
//    // [Actions]
//    // ==================================================

//    // ==================================================
//    // [Computed Properties]
//    // ==================================================

//    return {};
// };
