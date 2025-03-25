<template>
   <div class="flex flex-col h-full">
      <!-- 標題和新增資助單位按鈕 -->
      <div
         v-if="!props.noHeader"
         class="flex items-center justify-between pt-6 pb-2 px-6"
      >
         <h1 class="text-2xl font-bold">
            資助單位管理
         </h1>
      </div>

      <!-- 資助單位列表 -->
      <overlay-scrollbars-component>
         <div
            class="w-full space-y-2"
            :class="{ 'px-6 py-4': !props.noHeader }"
         >
            <div
               v-for="unit in fundingUnits"
               :key="unit.FundingUnitID"
               class="flex items-center justify-between border cursor-pointer rounded-lg shadow-sm transition-all py-3 px-2"
               :class="[
                  isSelected(unit)
                     ? 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700'
                     : 'bg-white dark:bg-zinc-800 border-zinc-100',
               ]"
               @click="selectFundingUnit(unit)"
            >
               <span class="text-lg font-medium flex-1">
                  {{ unit.Name }}
               </span>
               <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                     <Button
                        variant="ghost"
                        size="sm"
                     >
                        <MoreHorizontalIcon class="h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem @click="openEditFundingUnitModal(unit)">
                        編輯
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        class="text-red-600"
                        @click="deleteFundingUnit(unit.FundingUnitID)"
                     >
                        刪除資助單位
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
            <li
               class="flex justify-center cursor-pointer rounded-lg shadow-sm bg-zinc-100 dark:bg-zinc-800 border-zinc-300 border-dashed border"
               @click="
                  openAutoModal(
                     '新增資助單位',
                     '新增資助單位至清單',
                     schemas.fundingUnit,
                     addFundingUnit,
                     fields.fundingUnit,
                  )
               "
            >
               <div class="font-medium py-3 flex items-center gap-2">
                  <Icon name="ic:baseline-add" />
                  新增資助單位
               </div>
            </li>
         </div>
      </overlay-scrollbars-component>
   </div>
</template>

<script setup lang="ts">
import { Button } from "~/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-vue-next";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import { useModals } from "~/composables/useModals";
import { z } from "zod";
import type { Config } from "~/components/ui/auto-form/interface";
import { ref, onMounted } from "vue";

type FundingUnit = {
   FundingUnitID: number
   Name: string
};

// Props
const props = defineProps<{
   noHeader?: boolean
}>();

// 管理選中的資助單位
const selectedFundingUnit = defineModel({
   type: Object as PropType<FundingUnit | null>,
   default: null,
});

const { openAutoModal } = useModals();
const { data: fundingUnits, crud, forceRefresh } = useDatabaseFundingUnits();

// 載入初始資料
onMounted(async () => {
   await forceRefresh();
});

// 檢查資助單位是否被選中
const isSelected = (unit: FundingUnit) => {
   return selectedFundingUnit.value?.FundingUnitID === unit.FundingUnitID;
};

// 選擇資助單位
const selectFundingUnit = (unit: FundingUnit) => {
   if (isSelected(unit)) {
      selectedFundingUnit.value = null; // 取消選擇
   }
   else {
      selectedFundingUnit.value = unit; // 選擇
   }
};

const schemas = {
   fundingUnit: z.object({
      name: z
         .string({ required_error: "資助單位名稱不可為空" })
         .nonempty("資助單位名稱不可為空"),
   }),
};

const fields = {
   fundingUnit: {
      name: { label: "資助單位名稱" },
   } as Config<z.infer<typeof schemas.fundingUnit>>,
};

// CRUD Modal Methods
const openEditFundingUnitModal = (unit: FundingUnit) => {
   const defaultValues = {
      name: unit.Name,
   };
   openAutoModal(
      "編輯資助單位",
      "更新資助單位名稱",
      schemas.fundingUnit,
      (data, passthrough) => editFundingUnit(passthrough.fundingUnitID, data),
      fields.fundingUnit,
      { fundingUnitID: unit.FundingUnitID },
      defaultValues,
   );
};

const addFundingUnit = async (data: z.infer<typeof schemas.fundingUnit>) => {
   await crud.create({ name: data.name });
};

const editFundingUnit = async (
   fundingUnitID: number,
   data: z.infer<typeof schemas.fundingUnit>,
) => {
   await crud.update({ fundingUnitID, name: data.name });
};

const deleteFundingUnit = async (fundingUnitID: number) => {
   await crud.delete({ fundingUnitID });
};
</script>

<style scoped>
li {
   padding: 0.5rem 0;
}

/* 移除懸浮時的背景色變化 */
li.flex {
   transition: none; /* 移除所有懸浮過渡效果 */
}

/* 確保層次不遮擋 */
li {
   position: relative;
   z-index: 0;
}

/* 確保滾動容器高度 */
.overlay-scrollbars-host {
   height: 100% !important;
}
</style>
