<template>
   <div class="flex flex-col h-full">
      <!-- 標題和新增事務所按鈕 -->
      <div
         v-if="!props.noHeader"
         class="flex items-center justify-between pt-6 pb-2"
      >
         <h1 class="text-2xl font-bold">
            事務所管理
         </h1>
      </div>

      <!-- 事務所列表 -->
      <overlay-scrollbars-component
         :options="{ scrollbars: { autoHide: 'leave' } }"
         class="h-full min-h-0"
      >
         <div class="w-full space-y-2 py-2">
            <div
               v-for="agency in agencies"
               :key="agency.AgencyUnitID"
               class="flex items-center justify-between border cursor-pointer rounded-lg shadow-sm transition-all py-3 px-2"
               :class="[
                  isSelected(agency)
                     ? 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700'
                     : 'bg-white dark:bg-zinc-800 border-zinc-100',
               ]"
               @click="selectAgency(agency)"
            >
               <span class="text-lg font-medium flex-1">
                  {{ agency.Name }}
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
                     <DropdownMenuItem @click="openEditAgencyModal(agency)">
                        編輯
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        class="text-red-600"
                        @click="deleteAgency(agency.AgencyUnitID)"
                     >
                        刪除事務所
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
            <li
               class="flex justify-center cursor-pointer rounded-lg shadow-sm bg-zinc-100 dark:bg-zinc-800 border-zinc-300 border-dashed border"
            >
               <div
                  class="font-medium py-3 flex items-center gap-2"
                  @click="
                     openAutoModal(
                        '新增事務所',
                        '新增事務所至清單',
                        schemas.agency,
                        addAgency,
                        fields.agency,
                     )
                  "
               >
                  <Icon name="ic:baseline-add" />
                  新增事務所
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
import { PlusIcon, MoreHorizontalIcon } from "lucide-vue-next";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import { storeToRefs } from "pinia";
import { useAgenciesStore } from "~/stores/agencies";
import { useModals } from "~/composables/useModals";
import { z } from "zod";
import type { Config } from "~/components/ui/auto-form/interface";
import { ref, onMounted } from "vue";

type AgencyUnit = RouterOutput["data"]["agency"]["getAgencies"][0];

// Pinia store
const agenciesStore = useAgenciesStore();
const { agencies } = storeToRefs(agenciesStore);

// Props
const props = defineProps<{
   noHeader?: boolean
}>();

// 管理選中的系所（單選）
const selectedAgencyUnit = defineModel({
   type: Object as PropType<AgencyUnit | null>,
   default: null,
});

const { openAutoModal } = useModals();

// 載入初始資料
onMounted(async () => {
   await agenciesStore.refresh();
});

// 檢查事務所是否被選中
const isSelected = (agency: AgencyUnit) => {
   return selectedAgencyUnit.value?.AgencyUnitID === agency.AgencyUnitID;
};

// 選擇事務所
const selectAgency = (agencyUnit: AgencyUnit) => {
   if (isSelected(agencyUnit)) {
      selectedAgencyUnit.value = null; // 取消選擇
   }
   else {
      selectedAgencyUnit.value = agencyUnit; // 選擇
   }
};

const schemas = {
   agency: z.object({
      name: z
         .string({ required_error: "事務所名稱不可為空" })
         .nonempty("事務所名稱不可為空"),
      description: z.string().optional(),
   }),
};

const fields = {
   agency: {
      name: { label: "事務所名稱" },
      description: { label: "備註", type: "textarea" },
   } as Config<z.infer<typeof schemas.agency>>,
};

// CRUD Modal Methods

const openEditAgencyModal = (agency: AgencyUnit) => {
   const defaultValues = {
      name: agency.Name,
      description: agency.Description || "",
   };
   openAutoModal(
      "編輯事務所",
      "更新事務所名稱和備註",
      schemas.agency,
      (data, passthrough) => editAgency(passthrough.agencyUnitID, data),
      fields.agency,
      { agencyUnitID: agency.AgencyUnitID },
      defaultValues,
   );
};

const addAgency = async (data: z.infer<typeof schemas.agency>) => {
   await agenciesStore.insert(data.name, data.description);
   await refreshNuxtData();
};

const editAgency = async (
   agencyUnitID: number,
   data: z.infer<typeof schemas.agency>,
) => {
   await agenciesStore.update(agencyUnitID, data.name, data.description);
   await refreshNuxtData();
};

const deleteAgency = async (agencyUnitID: number) => {
   await agenciesStore.delete(agencyUnitID);
   await refreshNuxtData();
};
</script>

<style scoped>
li {
   padding: 0.5rem 0;
}
.flex-1 {
   padding: 0.5rem;
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
</style>
