<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent>
            <DialogHeader class="select-none">
               <DialogTitle>方案分配資訊</DialogTitle>
               <DialogDescription>
                  方案 : {{ props.planName }}
               </DialogDescription>
            </DialogHeader>
            <div class="flex flex-col gap-3 py-2">
               <div
                  v-for="allocation in data?.planAllocations"
                  :key="allocation.TargetID"
                  class="border rounded-lg p-4 space-y-2"
               >
                  <div class="flex justify-between items-center">
                     <div>{{ allocation.target.Name }}</div>
                     <div class="text-sm text-gray-500">
                        {{ allocation.Percentage }}%
                     </div>
                  </div>
                  <CustomProgressSlider
                     v-model="allocation.Percentage"
                     :max="remainingPercentage + allocation.Percentage"
                     :min="0"
                  />
               </div>
               <Popover>
                  <PopoverTrigger>
                     <div
                        class="border border-dashed rounded-lg p-4 cursor-pointer"
                     >
                        新增其他目標
                     </div>
                  </PopoverTrigger>
                  <PopoverContent>
                     <div
                        class="flex flex-col gap-2 w-[var(--reka-popover-trigger-width)]"
                     >
                        <div
                           v-for="target in canChooseTargets"
                           :key="target.TargetID"
                           class="hover:bg-gray-100 cursor-pointer py-2 px-3 rounded-lg dark:hover:bg-zinc-700"
                           @click="selectTarget(target)"
                        >
                           <div>{{ target.Name }}</div>
                        </div>
                        <div
                           v-if="canChooseTargets?.length === 0"
                           class="text-sm text-gray-500"
                        >
                           目前沒有可選擇的目標
                        </div>
                     </div>
                  </PopoverContent>
               </Popover>
            </div>
            <DialogFooter>
               <Button
                  variant="outlined"
                  type="button"
                  @click="isOpen = false"
               >
                  取消
               </Button>
               <Button
                  type="submit"
                  @click="confirm"
               >
                  確認
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup>
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogDescription,
   DialogFooter,
   DialogTitle,
} from "@/components/ui/dialog";
const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const props = defineProps<{
   planName: string
   fundingPlanId: number
   callback: (
      allocations: {
         targetID: number
         percentage: number
      }[],
   ) => void
}>();

const { $trpc } = useNuxtApp();
const { data } = await useAsyncData(
   "fundingPlanAllocation-" + props.planName,
   () => {
      return $trpc.data.fundingPlan.getFundingPlanByID.query({
         fundingPlanID: props.fundingPlanId,
      });
   },
);
const remainingPercentage = computed(() => {
   return (
      100
      - (data.value?.planAllocations?.reduce((acc, allocation) => {
         return acc + allocation.Percentage;
      }, 0) ?? 0)
   );
});

const { data: allTargets } = await useAsyncData(
   "fundingPlanAllocation-targets",
   async () => {
      return await $trpc.data.fundingPlan.getAllFundingPlanTarget.query();
   },
);

const canChooseTargets = computed(() => {
   return allTargets.value?.filter((target) => {
      return !data.value?.planAllocations.some(
         (allocation) => allocation.TargetID === target.TargetID,
      );
   });
});

const selectTarget = (
   target: RouterOutput["data"]["fundingPlan"]["getAllFundingPlanTarget"][0],
) => {
   data.value?.planAllocations.push({
      TargetID: target.TargetID,
      target: {
         Name: target.Name,
         TargetID: target.TargetID,
      },
      FundingPlanID: props.fundingPlanId,
      FundingPlanAllocationID: -1,
      Percentage: 0,
   });
};
const confirm = () => {
   const allocations = data.value?.planAllocations.map((allocation) => {
      return {
         targetID: allocation.TargetID,
         percentage: allocation.Percentage,
      };
   });
   props.callback(allocations ?? []);
   isOpen.value = false;
};
</script>

<style scoped></style>
