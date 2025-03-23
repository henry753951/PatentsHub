<template>
   <div>
      <!-- 新增紀錄對話框 -->
      <Dialog v-model:open="isOpen">
         <DialogContent @pointer-down-outside.prevent>
            <DialogHeader>
               <DialogTitle>新增帳務款項</DialogTitle>
               <DialogDescription>
                  新增款項與設定款項可受資助等資訊
               </DialogDescription>
               <hr class="my-4" />
            </DialogHeader>

            <div class="grid grid-cols-1 gap-3">
               <div class="flex flex-col gap-2">
                  <label for="record-name">帳款名稱</label>
                  <InputText
                     id="record-name"
                     v-model="newRecord.name"
                     placeholder="輸入帳款名稱"
                  />
               </div>

               <div class="flex gap-4">
                  <div class="flex flex-col gap-2 w-1/2">
                     <label for="record-amount">金額</label>
                     <InputNumber
                        id="record-amount"
                        v-model="newRecord.amount"
                        type="number"
                        placeholder="輸入金額"
                        prefix="NT$ "
                     />
                  </div>

                  <div class="flex flex-col gap-2 w-1/2">
                     <label for="record-date">日期</label>
                     <FormDatePicker
                        v-model="newRecord.date"
                        size="medium"
                     />
                  </div>
               </div>

               <div class="flex flex-col gap-2">
                  <label for="record-description">描述（選填）</label>
                  <Textarea
                     id="record-description"
                     v-model="newRecord.description"
                     placeholder="輸入詳細描述"
                  />
               </div>

               <div class="space-y-2">
                  <label>可資助單位</label>
                  <div
                     class="border border-gray-200 dark:border-gray-700 rounded-md p-3 space-y-2"
                  >
                     <div
                        v-for="unit in fundingUnits"
                        :key="unit.FundingUnitID"
                        class="flex items-center"
                     >
                        <Checkbox
                           :id="`unit-${unit.FundingUnitID}`"
                           v-model="newRecord.canFundingBy"
                           :value="`${unit.FundingUnitID}`"
                           class="mr-2"
                        />
                        <label
                           :for="`unit-${unit.FundingUnitID}`"
                           class="cursor-pointer"
                        >
                           {{ unit.fundingUnit.Name }}
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
               </Button>
               <Button
                  variant="default"
                  :disabled="!isNewRecordValid"
                  @click="addRecord"
               >
                  新增
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

const { fundingService } = defineProps<{
   fundingService: UsePatentFundings
}>();

onMounted(() => {
   consola.info("NewRecordModal mounted");
   console.log(fundingService);
});

// 新增紀錄
const newRecord = ref({
   name: "",
   amount: 0,
   date: new Date(),
   description: "",
   canFundingBy: [] as number[],
});

const isNewRecordValid = computed(
   () => newRecord.value.name && newRecord.value.amount > 0,
);

const addRecord = async () => {
   await fundingService.records.actions.addFundingRecord({
      name: newRecord.value.name,
      amount: newRecord.value.amount,
      description: newRecord.value.description || undefined,
      date: new Date(newRecord.value.date),
      canFundingBy: newRecord.value.canFundingBy,
   });
   isOpen.value = false;
};

const fundingUnits = fundingService.fundingUnits;
</script>

<style scoped></style>
