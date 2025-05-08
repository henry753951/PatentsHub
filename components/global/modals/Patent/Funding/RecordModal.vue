<template>
   <div>
      <!-- 新增紀錄對話框 -->
      <Dialog v-model:open="isOpen">
         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  {{ recordID ? "編輯" : "新增" }}帳務款項
               </DialogTitle>
               <DialogDescription>
                  {{ recordID ? "編輯" : "新增" }}款項與設定款項可受資助等資訊
               </DialogDescription>
               <hr class="my-4" />
            </DialogHeader>

            <div
               v-if="tempRecord"
               class="grid grid-cols-1 gap-3"
            >
               <div class="flex flex-col gap-2">
                  <label for="record-name">費用名稱</label>
                  <InputText
                     id="record-name"
                     v-model="tempRecord.name"
                     placeholder="輸入費用名稱"
                  />
               </div>

               <div class="flex gap-4">
                  <div class="flex flex-col gap-2 w-1/2">
                     <label for="record-amount">金額</label>
                     <InputNumber
                        id="record-amount"
                        v-model="tempRecord.amount"
                        type="number"
                        placeholder="輸入金額"
                        prefix="NT$ "
                     />
                  </div>

                  <div class="flex flex-col gap-2 w-1/2">
                     <label for="record-date">日期</label>
                     <FormDatePicker
                        v-model="tempRecord.date"
                        size="medium"
                     />
                  </div>
               </div>

               <div class="flex flex-col gap-2">
                  <label for="record-description">描述（選填）</label>
                  <Textarea
                     id="record-description"
                     v-model="tempRecord.description"
                     placeholder="輸入詳細描述"
                  />
               </div>

               <div class="space-y-2">
                  <label>可資助單位</label>
                  <div
                     class="border border-gray-200 dark:border-gray-700 rounded-md p-3 grid grid-cols-2"
                  >
                     <div
                        v-for="unit in fundingUnitsCanFunding"
                        :key="unit.fundingUnit.FundingUnitID"
                        class="flex items-center gap-2"
                     >
                        <ToggleSwitch v-model="unit.canFunding" />
                        <label
                           :for="`unit-${unit.fundingUnit.FundingUnitID}`"
                           class="cursor-pointer"
                        >
                           {{ unit.fundingUnit.fundingUnit.Name }}
                        </label>
                     </div>
                  </div>
               </div>
            </div>

            <DialogFooter>
               <Button
                  variant="outline"
                  @click="isOpen = false"
               >
                  取消
                  <template #header>
                  </template>
               </Button>
               <Button
                  variant="default"
                  :disabled="!isNewRecordValid"
                  @click="addRecord"
               >
                  {{ recordID ? "儲存" : "新增" }}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import ToggleSwitch from "primevue/toggleswitch";
import {
   usePatentFundings,
   type UsePatentFundings,
} from "~/composables/database/patent/funding";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogFooter,
} from "@/components/ui/dialog";
import { InputText, InputNumber, Textarea } from "primevue";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const isOpen = defineModel("open", { type: Boolean, default: false });

const { fundingService, recordID } = defineProps<{
   fundingService: UsePatentFundings
   recordID?: number
}>();

const { fundingUnits } = toRefs(fundingService);
const tempRecord = ref({
   name: "",
   amount: 0,
   description: "",
   date: format(new Date(), "yyyy-MM-dd", { locale: zhTW }),
   canFundingBy: [] as number[],
});

onMounted(async () => {
   if (recordID) {
      const data
         = await fundingService.records.actions.getFundingRecord(recordID);
      if (data) {
         tempRecord.value = {
            name: data.Name,
            amount: data.Amount,
            description: data.Description || "",
            date: format(new Date(data.Date), "yyyy-MM-dd", { locale: zhTW }),
            canFundingBy: data.canFundingBy.map((unit) => unit.FundingUnitID),
         };
         fundingUnitsCanFunding.value = fundingUnits.value.map((unit) => ({
            fundingUnit: unit,
            canFunding: data.canFundingBy.some(
               (canFundingBy) =>
                  canFundingBy.FundingUnitID === unit.FundingUnitID,
            ),
         }));
      }
   }
});

const fundingUnitsCanFunding = ref(
   fundingUnits.value.map((unit) => ({
      fundingUnit: unit,
      canFunding: false,
   })),
);

watch(
   fundingUnitsCanFunding,
   () => {
      tempRecord.value!.canFundingBy = fundingUnitsCanFunding.value
         .filter((unit) => unit.canFunding)
         .map((unit) => unit.fundingUnit.fundingUnit.FundingUnitID);
   },
   { deep: true },
);

const isNewRecordValid = computed(
   () => tempRecord.value.name && tempRecord.value.amount > 0,
);

const addRecord = async () => {
   if (recordID) {
      await fundingService.records.actions.updateFundingRecord(recordID, {
         name: tempRecord.value!.name,
         amount: tempRecord.value!.amount,
         description: tempRecord.value!.description || undefined,
         date: new Date(tempRecord.value!.date),
         canFundingBy: tempRecord.value!.canFundingBy,
      });
   }
   else {
      await fundingService.records.actions.addFundingRecord({
         name: tempRecord.value!.name,
         amount: tempRecord.value!.amount,
         description: tempRecord.value!.description || undefined,
         date: new Date(tempRecord.value!.date),
         canFundingBy: tempRecord.value!.canFundingBy,
      });
   }
   isOpen.value = false;
};
</script>

<style scoped></style>
