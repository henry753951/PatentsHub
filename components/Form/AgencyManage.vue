<template>
   <div class="flex flex-col h-full">
      <!-- 標題和新增事務所按鈕 -->
      <div class="flex items-center justify-between pt-6 pb-2 px-6">
         <h1 class="text-2xl font-bold">
            事務所管理
         </h1>
         <Button @click="openAddAgencyModal">
            <PlusIcon class="mr-2 h-4 w-4" /> 新增事務所
         </Button>
      </div>

      <!-- 錯誤或成功訊息 -->
      <div
         v-if="error || successMessage"
         class="px-6 mb-4"
      >
         <p
            v-if="error"
            class="text-red-600"
         >
            {{ error }}
         </p>
         <p
            v-if="successMessage"
            class="text-green-600"
         >
            {{ successMessage }}
         </p>
      </div>

      <!-- 事務所列表 -->
      <overlay-scrollbars-component
         :options="{ scrollbars: { autoHide: 'leave' } }"
         class="h-full min-h-0 px-6"
      >
         <ul class="w-full space-y-2 rounded-lg bg-gray-100 dark:bg-zinc-900 p-3">
            <li
               v-for="agency in agencies"
               :key="agency.AgencyID"
               class="flex items-center justify-between py-2 border-b cursor-pointer rounded-lg shadow-sm p-4"
               :class="[
                  selectedAgencyId === agency.AgencyID
                     ? 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700'
                     : 'bg-white dark:bg-zinc-800',
               ]"
               @click="selectAgency(agency.AgencyID)"
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
                        @click="deleteAgency(agency.AgencyID)"
                     >
                        刪除事務所
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </li>
         </ul>
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

const agenciesStore = useAgenciesStore();
const { agencies, isInitialized, isLoading, error } = storeToRefs(agenciesStore);
const { openAutoModal } = useModals();
const successMessage = ref<string | null>(null);

// 跟踪當前選中的事務所
const selectedAgencyId = ref<number | null>(null);

// 定義選擇事務所的事件
const emit = defineEmits<{
   (e: "selectAgency", agencyID: number): void
}>();

onMounted(async () => {
   if (!isInitialized.value) {
      try {
         await agenciesStore.refresh();
         console.log("Agencies 數據:", agencies.value);
         if (agencies.value.length > 0 && selectedAgencyId.value === null) {
            selectedAgencyId.value = agencies.value[0].AgencyID;
            emit("selectAgency", selectedAgencyId.value);
         }
      }
      catch (err) {
         console.error("加載數據失敗:", err);
      }
   }
});

const schemas = {
   agency: z.object({
      name: z.string({ required_error: "事務所名稱不可為空" }).nonempty("事務所名稱不可為空"),
      description: z.string().optional(),
   }),
};

const fields = {
   agency: {
      name: { label: "事務所名稱" },
      description: { label: "備註", type: "textarea" },
   } as Config<z.infer<typeof schemas.agency>>,
};

const openAddAgencyModal = () =>
   openAutoModal(
      "新增事務所",
      "新增事務所至清單",
      schemas.agency,
      addAgency,
      fields.agency,
      undefined,
      undefined,
   );

const openEditAgencyModal = (agency: typeof agencies.value[number]) => {
   const defaultValues = { name: agency.Name, description: agency.Description || "" };
   console.log("預填資料:", defaultValues);
   openAutoModal(
      "編輯事務所",
      "更新事務所名稱和備註",
      schemas.agency,
      (data, passthrough) => editAgency(passthrough.agencyID, data),
      fields.agency,
      { agencyID: agency.AgencyID },
      defaultValues,
   );
};

const addAgency = async (data: z.infer<typeof schemas.agency>) => {
   try {
      await agenciesStore.insert(data.name, data.description);
      successMessage.value = "事務所新增成功";
      setTimeout(() => (successMessage.value = null), 3000);
   }
   catch (err) {
      console.error("新增失敗:", err);
      error.value = "新增失敗";
      setTimeout(() => (error.value = null), 3000);
   }
};

const editAgency = async (agencyID: number, data: z.infer<typeof schemas.agency>) => {
   try {
      await agenciesStore.update(agencyID, data.name, data.description);
      successMessage.value = "事務所更新成功";
      setTimeout(() => (successMessage.value = null), 3000);
   }
   catch (err) {
      console.error("更新失敗:", err);
      error.value = "更新失敗";
      setTimeout(() => (error.value = null), 3000);
   }
};

const deleteAgency = async (agencyID: number) => {
   try {
      await agenciesStore.delete(agencyID);
      successMessage.value = "事務所刪除成功";
      if (selectedAgencyId.value === agencyID) {
         selectedAgencyId.value = agencies.value.length > 0 ? agencies.value[0].AgencyID : null;
         if (selectedAgencyId.value) emit("selectAgency", selectedAgencyId.value);
      }
      setTimeout(() => (successMessage.value = null), 3000);
   }
   catch (err) {
      console.error("刪除失敗:", err);
      error.value = "刪除失敗";
      setTimeout(() => (error.value = null), 3000);
   }
};

const selectAgency = (agencyID: number) => {
   selectedAgencyId.value = agencyID;
   emit("selectAgency", agencyID);
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
