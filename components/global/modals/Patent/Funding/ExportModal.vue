<template>
   <Dialog v-model:open="isOpen">
      <DialogContent class="w-[600px]">
         <DialogHeader>
            <DialogTitle
               class="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent"
            >
               出帳作業
            </DialogTitle>
            <DialogDescription class="text-gray-600 text-lg">
               請依序完成以下步驟執行出帳作業
            </DialogDescription>
         </DialogHeader>

         <!--  TODO: 步驟進度指示器  -->

         <!-- 步驟內容 -->
         <div class="space-y-4">
            <!-- 步驟 1: 確認匯出紀錄 -->
            <div
               v-if="currentStep === 1"
               class="space-y-4"
            >
               <h3 class="text-lg font-semibold text-gray-800">
                  步驟 1: 確認匯出紀錄
               </h3>
               <div class="bg-gray-100/50 rounded-lg p-1">
                  <ScrollArea class="h-72 p-3">
                     <div
                        v-for="record in selectedRecords"
                        :key="record.FundingRecordID"
                        class="flex flex-col p-2 hover:bg-white/60 rounded-md transition-all gap-2"
                     >
                        <div class="flex justify-between gap-2">
                           <span class="text-gray-700 font-semibold">{{ record.Name }}</span>
                           <span>
                              NT$ {{ record.Amount.toLocaleString() }}
                           </span>
                        </div>
                        <div
                           class="text-gray-500 flex gap-2 items-center justify-between"
                        >
                           <div>
                              {{
                                 record.canFundingBy.length
                                    ? "可資助單位"
                                    : "無資助單位"
                              }}
                           </div>
                           <div class="flex gap-2">
                              <Badge
                                 v-for="unit in record.canFundingBy"
                                 :key="unit.FundingUnitID"
                              >
                                 {{ unit.Name }}
                              </Badge>
                           </div>
                        </div>
                     </div>
                  </ScrollArea>
               </div>
            </div>

            <!-- 步驟 2: 調整資助單位金額 -->
            <div
               v-if="currentStep === 2"
               class="space-y-4"
            >
               <h3 class="text-lg font-semibold text-gray-800">
                  步驟 2: 調整資助單位金額
               </h3>
               <div class="space-y-2">
                  <div
                     v-for="item in unitContribution.contributions.value"
                     :key="item.fundingUnitId"
                     class="flex items-center justify-between bg-gray-100/50 p-3 rounded-lg"
                  >
                     <label class="text-gray-700">{{ item.name }}</label>
                     <input
                        v-model="item.amount"
                        type="number"
                        class="w-24 px-2 py-1 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                     />
                  </div>
               </div>
            </div>

            <!-- 步驟 3: 調整資助金額 -->
            <div
               v-if="currentStep === 3"
               class="space-y-4"
            >
               <h3 class="text-lg font-semibold text-gray-800">
                  步驟 3: 調整資助金額
               </h3>
               <div class="bg-gray-100/50 p-4 rounded-lg">
                  <div
                     v-for="account in fundingUnitAccounting"
                     :key="account.record.FundingRecordID"
                     class="space-y-2 mb-4"
                  >
                     <div class="font-medium text-gray-800">
                        {{ account.record.Name }} - 剩餘金額:
                        {{ account.remainingAmount }}
                     </div>
                     <div
                        v-for="contrib in account.unitContributions"
                        :key="contrib.unitId"
                        class="flex items-center justify-between"
                     >
                        <label class="text-gray-700">
                           {{ getUnit(contrib.unitId)?.name }}
                        </label>
                        <input
                           v-model="contrib.amount"
                           type="number"
                           :max="
                              (getRemaining(contrib.unitId)?.amount ?? 0) +
                                 contrib.amount
                           "
                           :min="0"
                           class="w-24 px-2 py-1 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                     </div>
                  </div>
               </div>
            </div>

            <!-- 步驟 4: 調整校內帳務 -->
            <div
               v-if="currentStep === 4"
               class="space-y-4"
            >
               <h3 class="text-lg font-semibold text-gray-800">
                  步驟 4: 調整校內帳務
               </h3>
               <div class="space-y-2">
                  <div
                     v-for="adj in internalAccountingAdjustmentRef"
                     :key="adj.targetId"
                     class="flex items-center justify-between bg-gray-100/50 p-3 rounded-lg"
                  >
                     <label class="text-gray-700">{{ adj.targetName }}</label>
                     <input
                        v-model="adj.amount"
                        type="number"
                        class="w-24 px-2 py-1 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                     />
                  </div>
               </div>
            </div>

            <!-- 步驟 5: 確認出帳 -->
            <div
               v-if="currentStep === 5"
               class="space-y-4 bg-gray-100/50 p-6 rounded-lg"
            >
               <h3 class="text-lg font-semibold text-gray-800">
                  步驟 5: 確認出帳
               </h3>
               <div class="space-y-2">
                  <p class="flex justify-between">
                     <span class="text-gray-700">總剩餘金額:</span>
                     <span class="font-bold text-blue-600">{{
                        totalRemaining
                     }}</span>
                  </p>
                  <p class="flex justify-between">
                     <span class="text-gray-700">總校內分配金額:</span>
                     <span class="font-bold text-green-600">{{
                        totalInternalAllocated
                     }}</span>
                  </p>
               </div>
               <p class="text-sm text-gray-500 text-center">
                  請確認以上資訊無誤後，點擊「確認」執行出帳。
               </p>
            </div>
         </div>

         <!-- 導航按鈕 -->
         <DialogFooter class="flex justify-between mt-6">
            <Button
               variant="outline"
               :disabled="currentStep === 1"
               class="w-24 bg-transparent border-zinc-300 hover:bg-zinc-100 transition-all"
               @click="prevStep"
            >
               上一步
            </Button>
            <Button
               class="w-24 bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-900 transition-all"
               @click="nextStep"
            >
               {{ nextButtonText }}
            </Button>
         </DialogFooter>
      </DialogContent>
   </Dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import {
   usePatentFundings,
   type UsePatentFundings,
   type PatentFundingRecord,
} from "~/composables/database/patent/funding";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Props 和 Model
const isOpen = defineModel("open", { type: Boolean, default: false });
const { fundingService, selectedRecords } = defineProps<{
   fundingService: UsePatentFundings
   selectedRecords: PatentFundingRecord[]
}>();

// Export Modal Composable
const {
   unitContribution,
   calculateDefaultFundingUnitAccounting,
   fundingUnitAccounting,
   fundingUnitAccountingRef,
   calculateDefaultInternalAccounting,
   internalAccountingAdjustmentRef,
} = fundingService.useExportModal(selectedRecords);

// 步驟管理
const currentStep = ref(1);

// 計算屬性（步驟 4 使用）
const totalRemaining = computed(() => {
   return fundingUnitAccountingRef.value.reduce((sum, account) => {
      const contributed = account.unitContributions.reduce(
         (s, c) => s + c.amount,
         0,
      );
      return sum + Math.max(account.originalAmount - contributed, 0);
   }, 0);
});

const totalInternalAllocated = computed(() => {
   return internalAccountingAdjustmentRef.value.reduce(
      (sum, adj) => sum + adj.amount,
      0,
   );
});

const getUnit = (id: number) => {
   return unitContribution.contributions.value.find(
      (unit) => unit.fundingUnitId === id,
   );
};

const getRemaining = (id: number) => {
   return unitContribution.remains.value.find((unit) => unit.unitId === id);
};
// 導航邏輯
const nextButtonText = computed(() =>
   currentStep.value < 4 ? "下一步" : "確認",
);

const nextStep = () => {
   if (currentStep.value === 1) {
      currentStep.value = 2;
   }
   else if (currentStep.value === 2) {
      calculateDefaultFundingUnitAccounting();
      currentStep.value = 3;
   }
   else if (currentStep.value === 3) {
      calculateDefaultInternalAccounting();
      currentStep.value = 4;
   }
   else if (currentStep.value === 4) {
      currentStep.value = 5;
   }
   else if (currentStep.value === 5) {
      fundingService.exports.actions.performExport(
         fundingUnitAccountingRef.value,
         internalAccountingAdjustmentRef.value,
      );
      isOpen.value = false;
   }
};

const prevStep = () => {
   if (currentStep.value > 1) {
      currentStep.value--;
   }
};
</script>

<style scoped></style>
