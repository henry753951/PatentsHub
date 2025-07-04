<template>
   <Dialog v-model:open="isOpen">
      <DialogContent class="max-w-[80vw]">
         <DialogHeader>
            <DialogTitle
               class="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent"
            >
               出帳作業
            </DialogTitle>
            <DialogDescription class="text-gray-600 text-lg">
               {{
                  currentStep === 1
                     ? "請確認匯出紀錄"
                     : currentStep === 2
                       ? "請調整資助單位金額"
                       : currentStep === 3
                         ? "請調整資助金額"
                         : currentStep === 4
                           ? "請調整校內分配"
                           : "請確認出帳"
               }}
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
               <h3 class="text-lg font-semibold text-gray-800">確認匯出紀錄</h3>
               <div class="bg-gray-100/50 rounded-lg p-1">
                  <ScrollArea class="h-72 p-3">
                     <div
                        v-for="record in selectedRecords"
                        :key="record.FundingRecordID"
                        class="flex flex-col p-2 hover:bg-white/60 rounded-md transition-all gap-2"
                     >
                        <div class="flex justify-between gap-2">
                           <span class="text-gray-700 font-semibold">{{
                              record.Name
                           }}</span>
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
               <h3 class="text-lg font-semibold text-gray-800">資助單位金額</h3>
               <div class="space-y-2">
                  <div
                     v-for="item in unitContribution"
                     :key="item.unitId"
                     class="flex items-center justify-between bg-gray-100/50 p-3 rounded-lg"
                  >
                     <label class="text-gray-700">{{ item.name }}</label>

                     <InputNumber
                        v-model="item.amount"
                        suffix="元"
                        :min="0"
                        show-buttons
                     />
                  </div>
               </div>
            </div>

            <!-- 步驟 3: 調整資助金額 -->
            <div
               v-if="currentStep === 3"
               class="space-y-4"
            >
               <div class="space-y-2">
                  <div class="text-lg font-semibold text-gray-800">
                     各單位配比
                  </div>
                  <MeterGroup :value="meterGroup.units" />
               </div>
               <div class="grid grid-cols-3 gap-4">
                  <div class="col-span-2 flex flex-col gap-2">
                     <div class="text-gray-700 font-semibold">調整資助金額</div>
                     <ScrollArea class="h-72 pr-4">
                        <div class="space-y-3">
                           <div
                              v-for="account in fundingUnitAccounting"
                              :key="account.record.FundingRecordID"
                              class="space-y-2 mb-4 bg-gray-100/50 p-4 rounded-lg"
                           >
                              <div class="flex justify-between items-center">
                                 <div class="font-bold text-gray-700">
                                    {{ account.record.Name }}
                                 </div>
                                 <div>
                                    剩餘金額:
                                    {{ account.remainingAmount }}
                                 </div>
                              </div>
                              <Divider class="my-2" />
                              <div class="space-y-2">
                                 <div
                                    v-for="contrib in account.unitContributions"
                                    :key="contrib.unitId"
                                    class="flex flex-col"
                                 >
                                    <div class="flex gap-5 items-center">
                                       <div class="w-full flex flex-col gap-2">
                                          <div class="flex justify-between">
                                             <label class="text-gray-700">
                                                {{ contrib.name }}
                                                {{
                                                   unitContributionMap[
                                                      contrib.unitId
                                                   ].remainingAmount +
                                                   contrib.amount
                                                }}
                                             </label>
                                             <span class="text-gray-500">
                                                {{ contrib.percent }} %
                                             </span>
                                          </div>
                                          <CustomProgressSlider
                                             v-model="contrib.amount"
                                             class="w-full"
                                             :min="0"
                                             :max="
                                                Math.min(
                                                   unitContributionMap[
                                                      contrib.unitId
                                                   ].remainingAmount +
                                                      contrib.amount,
                                                   account.remainingAmount +
                                                      contrib.amount,
                                                )
                                             "
                                             :range="[
                                                0,
                                                account.originalAmount,
                                             ]"
                                          />
                                       </div>
                                       <InputNumber
                                          v-model="contrib.amount"
                                          :max="
                                             contrib.amount +
                                             unitContributionMap[contrib.unitId]
                                                .remainingAmount
                                          "
                                          suffix="元"
                                          :min="0"
                                          show-buttons
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </ScrollArea>
                  </div>
                  <div class="col-span-1 flex flex-col gap-2">
                     <div class="text-gray-700 font-semibold">剩餘資助金額</div>
                     <div
                        class="flex-1 bg-gray-100/50 rounded-lg p-4 flex flex-col gap-3"
                     >
                        <div
                           v-for="unit in unitContribution"
                           :key="unit.unitId"
                        >
                           <div class="flex flex-col">
                              <div class="flex justify-between items-center">
                                 <label class="text-gray-700">
                                    {{ unit.name }}
                                 </label>
                                 <div
                                    class="text-gray-500 flex flex-col gap-1 items-end text-xs"
                                 >
                                    <div>
                                       已使用
                                       {{ unit.amount - unit.remainingAmount }}
                                       元
                                    </div>
                                    <div>總共{{ unit.amount }} 元</div>
                                 </div>
                              </div>
                              <div
                                 class="h-2 flex-1 bg-gray-200 rounded-full mt-1"
                              >
                                 <div
                                    :style="{
                                       width: `${Math.round(
                                          ((unit.amount -
                                             unit.remainingAmount) /
                                             unit.amount) *
                                             100,
                                       )}%`,
                                    }"
                                    class="!h-[5px] bg-gray-500 rounded-full"
                                 ></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <!-- 步驟 4: 調整內部會計 -->
            <div
               v-if="currentStep === 4"
               class="space-y-4"
            >
               <div class="space-y-2">
                  <div class="text-lg font-semibold text-gray-800">
                     校內分配
                  </div>
                  <MeterGroup :value="meterGroup.internal" />
               </div>
               <div class="space-y-2">
                  <div
                     v-for="(target, index) in internalAccountingAdjustment"
                     :key="target.targetId"
                     class="flex items-center justify-between bg-gray-100/50 p-3 rounded-lg"
                  >
                     <label class="text-gray-700">
                        {{ target.targetName }}
                     </label>
                     <div class="flex gap-2">
                        <UiThingButton
                           variant="secondary"
                           icon-placement="right"
                           icon="mdi:instant-transfer"
                           @click="transferToThis(index)"
                        >
                           轉移小數點
                        </UiThingButton>
                        <InputNumber
                           v-model="target.amount"
                           suffix="元"
                           :min="0"
                           :max="
                              target.amount +
                              remainingForInternal -
                              internalTotal
                           "
                           show-buttons
                        >
                           <template #decrementbutton="slotProps"></template>
                        </InputNumber>
                     </div>
                  </div>
                  <div
                     v-if="!isInternalValid"
                     class="text-sm text-red-500"
                  >
                     還有金額未分配完畢或是小數點尚未處理
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
                  <div class="text-gray-700 font-semibold">
                     資助單位金額分配
                  </div>
                  <MeterGroup :value="meterGroup.units" />
               </div>
               <div class="space-y-2">
                  <div class="text-gray-700 font-semibold">校內分配金額</div>
                  <MeterGroup :value="meterGroup.internal" />
               </div>
               <div class="space-y-2">
                  <div class="text-gray-700 font-semibold">總計金額</div>
                  <div class="flex justify-between">
                     <span>資助單位總計</span>
                     <span>
                        NT$
                        {{
                           fundingUnitAccounting
                              .reduce(
                                 (sum, item) =>
                                    sum +
                                    item.unitContributions.reduce(
                                       (subSum, subItem) =>
                                          subSum + subItem.amount,
                                       0,
                                    ),
                                 0,
                              )
                              .toLocaleString()
                        }}
                     </span>
                  </div>
                  <div class="flex justify-between">
                     <span>校內分配總計</span>
                     <span>
                        NT$
                        {{
                           internalAccountingAdjustment
                              .reduce((sum, item) => sum + item.amount, 0)
                              .toLocaleString()
                        }}
                     </span>
                  </div>
                  <div class="flex justify-between font-bold">
                     <span>總計</span>
                     <span>
                        NT$
                        {{
                           fundingUnitAccounting.reduce(
                              (sum, item) =>
                                 sum +
                                 item.unitContributions.reduce(
                                    (subSum, subItem) =>
                                       subSum + subItem.amount,
                                    0,
                                 ),
                              0,
                           ) +
                           internalAccountingAdjustment.reduce(
                              (sum, item) => sum + item.amount,
                              0,
                           )
                        }}
                     </span>
                  </div>
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
               :disabled="
                  (currentStep === 4 && !isInternalValid) ||
                  (currentStep === 5 && !isInternalValid)
               "
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
import MeterGroup from "primevue/metergroup";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputNumber from "primevue/inputnumber";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogFooter,
} from "@/components/ui/dialog";
import ProgressBar from "primevue/progressbar";
import Divider from "primevue/divider";
import { Button } from "@/components/ui/button";
import { UiThingButton } from "#components";

// Props 和 Model
const isOpen = defineModel("open", { type: Boolean, default: false });
const { fundingService, selectedRecords } = defineProps<{
   fundingService: UsePatentFundings;
   selectedRecords: PatentFundingRecord[];
}>();

// Export Modal Composable
const {
   unitContribution,
   calculateDefaultFundingUnitAccounting,
   calculateDefaultInternalAccounting,
   fundingUnitAccounting,
   internalAccountingAdjustment,
} = fundingService.useExportModal(selectedRecords);

// 步驟管理
const currentStep = ref(1);

// 導航邏輯
const nextButtonText = computed(() =>
   currentStep.value < 4 ? "下一步" : "確認",
);
const unitContributionMap = computed(() => {
   return unitContribution.value.reduce(
      (map, item) => {
         map[item.unitId] = item;
         return map;
      },
      {} as Record<number, (typeof unitContribution.value)[0]>,
   );
});

// 帳務分布
const remainingForInternal = computed(() => {
   const total = fundingUnitAccounting.value.reduce(
      (sum, item) => sum + item.originalAmount,
      0,
   );
   return (
      total -
      unitContribution.value.reduce(
         (sum, item) => sum + (item.amount - item.remainingAmount),
         0,
      )
   );
});
const internalTotal = computed(() => {
   return internalAccountingAdjustment.value.reduce(
      (sum, item) => sum + item.amount,
      0,
   );
});
const meterGroupData = computed(() => {
   const total = fundingUnitAccounting.value.reduce(
      (sum, item) => sum + item.originalAmount,
      0,
   );
   const units = unitContribution.value.map((item) => ({
      name: item.name,
      amount: item.amount - item.remainingAmount,
      percent: Math.round(((item.amount - item.remainingAmount) / total) * 100),
   }));

   const internal = internalAccountingAdjustment.value.map((item) => ({
      name: item.targetName,
      amount: item.amount,
      percent: Math.round((item.amount / remainingForInternal.value) * 100),
   }));

   return {
      units,
      internal,
   };
});
const meterGroup = computed(() => {
   return {
      internal: meterGroupData.value.internal.map((item) => ({
         label: item.name,
         color: useStringToColor(item.name).value,
         value: item.percent,
      })),
      units: meterGroupData.value.units.map((item) => ({
         label: item.name,
         color: useStringToColor(item.name).value,
         value: item.percent,
      })),
   };
});
const isInternalValid = computed(() => {
   if (!internalAccountingAdjustment.value || !remainingForInternal.value) {
      return false;
   }
   const total = internalAccountingAdjustment.value.reduce(
      (sum, item) => sum + item.amount,
      0,
   );
   const tolerance = 0.01; // Allow small floating-point errors
   const isValid = Math.abs(total - remainingForInternal.value) < tolerance;
   const hasDecimal = internalAccountingAdjustment.value.some(
      (item) => item.amount % 1 !== 0,
   );
   return isValid && !hasDecimal;
});

const transferToThis = (targetIndex: number) => {
   //   將全部小數點無條件捨棄 並將剩餘小數點加到目標項目上

   // 先捨棄所有
   internalAccountingAdjustment.value.forEach((item) => {
      item.amount = parseInt(Math.floor(item.amount).toString(), 10);
   });
   // 計算剩餘未分配金額
   const total = internalAccountingAdjustment.value.reduce(
      (sum, item) => sum + item.amount,
      0,
   );
   const remainingDecimal = remainingForInternal.value - total;

   internalAccountingAdjustment.value[targetIndex].amount += remainingDecimal;
};

const nextStep = () => {
   if (currentStep.value === 1) {
      currentStep.value = 2;
   } else if (currentStep.value === 2) {
      calculateDefaultFundingUnitAccounting();
      currentStep.value = 3;
   } else if (currentStep.value === 3) {
      calculateDefaultInternalAccounting();
      currentStep.value = 4;
   } else if (currentStep.value === 4) {
      currentStep.value = 5;
   } else if (currentStep.value === 5) {
      fundingService.exports.actions.performExport(
         fundingUnitAccounting.value,
         internalAccountingAdjustment.value,
         "",
         "",
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
