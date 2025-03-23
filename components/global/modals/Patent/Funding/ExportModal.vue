<template>
   <Dialog v-model:open="isOpen">
      <DialogContent>
         <DialogHeader>
            <DialogTitle>出帳作業</DialogTitle>
            <DialogDescription>請完成以下步驟以執行出帳</DialogDescription>
            <hr class="my-4" />
         </DialogHeader>

         <!-- 步驟導航 -->
         <div class="flex items-center mb-6">
            <div class="flex items-center">
               <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  1
               </div>
               <span class="ml-2">選擇記錄</span>
            </div>
            <div class="flex items-center ml-4">
               <div class="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center">
                  2
               </div>
               <span class="ml-2">設定資助</span>
            </div>
            <div class="flex items-center ml-4">
               <div class="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center">
                  3
               </div>
               <span class="ml-2">校內分配</span>
            </div>
            <div class="flex items-center ml-4">
               <div class="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center">
                  4
               </div>
               <span class="ml-2">確認</span>
            </div>
         </div>

         <!-- 步驟內容：例如選擇記錄 -->
         <div
            v-if="currentStep === 0"
            class="space-y-4"
         >
            <h3 class="text-lg font-medium">
               可出帳記錄
            </h3>
            <div
               v-for="record in exportableRecords"
               :key="record.FundingRecordID"
               class="flex items-center"
            >
               <Checkbox
                  v-model="selectedRecords"
                  :value="`${record.FundingRecordID}`"
                  class="mr-2"
               />
               <span>{{ record.Name }} - $ {{ formatNumber(record.Amount) }}</span>
            </div>
         </div>

         <!-- 其他步驟內容可根據業務邏輯添加 -->

         <DialogFooter>
            <Button
               variant="outline"
               @click="isOpen = false"
            >
               取消
            </Button>
            <Button
               variant="default"
               @click="nextStep"
            >
               下一步
            </Button>
         </DialogFooter>
      </DialogContent>
   </Dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { usePatentFundings, type UsePatentFundings } from "~/composables/database/patent/funding";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const isOpen = defineModel("open", { type: Boolean, default: false });

const { fundingService } = defineProps<{
   fundingService: UsePatentFundings
}>();

const currentStep = ref(0);
const selectedRecords = ref<number[]>([]);
const exportableRecords = computed(() => fundingService.exports.exportableRecords.value);
const formatNumber = (num: number) => num.toLocaleString("zh-TW");
const nextStep = () => {
   if (currentStep.value < 3) currentStep.value++;
};

</script>
