<template>
   <div class="flex flex-col h-full">
      <!-- 標題和新增事務所按鈕 -->
      <div
         v-if="!props.noHeader"
         class="flex items-center justify-between pt-6 pb-2 px-6"
      >
         <h1 class="text-2xl font-bold">
            事務所管理
         </h1>
         <div class="flex items-center gap-2">
            <Button
               v-if="mergeMode && selectedForMerge.length > 0"
               variant="destructive"
               size="sm"
               @click="executeMerge"
            >
               合併所選事務所
            </Button>
            <Button
               v-if="selectedAgencyUnit"
               :variant="mergeMode ? 'ghost' : 'outline'"
               size="sm"
               @click="toggleMergeMode"
            >
               {{ mergeMode ? "取消合併" : "啟動合併模式" }}
            </Button>
         </div>
      </div>

      <!-- 事務所列表 -->
      <overlay-scrollbars-component>
         <div
            class="w-full space-y-2"
            :class="{ 'px-6 py-4': !props.noHeader }"
         >
            <div
               v-for="agency in agencies"
               :key="agency.AgencyUnitID"
               class="flex items-center justify-between border border-[2px] cursor-pointer rounded-lg shadow-sm transition-all py-3 px-2"
               :class="[
                  isSelected(agency)
                     ? 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700'
                     : selectedForMerge.includes(agency.AgencyUnitID)
                        ? 'bg-orange-100 border-orange-300 dark:bg-orange-900 dark:border-orange-700'
                        : 'bg-white dark:bg-zinc-800 border-zinc-100',
                  { 'drag-over': isDragOver(agency.AgencyUnitID) },
               ]"
               draggable="false"
               @dragover.prevent="onDragOver($event, agency.AgencyUnitID)"
               @dragleave="onDragLeave($event, agency.AgencyUnitID)"
               @drop="onDrop($event, agency.AgencyUnitID)"
               @click="handleAgencyClick(agency)"
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
               draggable="false"
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
               <div class="font-medium py-3 flex items-center gap-2">
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

const agenciesStore = useAgenciesStore();
const { agencies } = storeToRefs(agenciesStore);

const props = defineProps<{
   noHeader?: boolean
}>();

const selectedAgencyUnit = defineModel({
   type: Object as PropType<AgencyUnit | null>,
   default: null,
});

const { openAutoModal } = useModals();
const mergeMode = ref(false);
const selectedForMerge = ref<number[]>([]);
const dragOverAgencyId = ref<number | null>(null);

onMounted(async () => {
   await agenciesStore.refresh();
});

const isSelected = (agency: AgencyUnit) => {
   return selectedAgencyUnit.value?.AgencyUnitID === agency.AgencyUnitID;
};

const isDragOver = (agencyUnitID: number) => {
   return dragOverAgencyId.value === agencyUnitID;
};

const toggleMergeMode = () => {
   mergeMode.value = !mergeMode.value;
   if (!mergeMode.value) {
      selectedForMerge.value = [];
   }
};

const handleAgencyClick = (agency: AgencyUnit) => {
   if (
      mergeMode.value
      && selectedAgencyUnit.value
      && agency.AgencyUnitID !== selectedAgencyUnit.value.AgencyUnitID
   ) {
      const index = selectedForMerge.value.indexOf(agency.AgencyUnitID);
      if (index === -1) {
         selectedForMerge.value.push(agency.AgencyUnitID);
      }
      else {
         selectedForMerge.value.splice(index, 1);
      }
   }
   else {
      if (isSelected(agency)) {
         selectedAgencyUnit.value = null;
      }
      else {
         selectedAgencyUnit.value = agency;
         selectedForMerge.value = [];
         mergeMode.value = false;
      }
   }
};

const executeMerge = async () => {
   if (selectedAgencyUnit.value && selectedForMerge.value.length > 0) {
      try {
         await mergeAgency(
            selectedForMerge.value,
            selectedAgencyUnit.value.AgencyUnitID,
         );
         console.log(
            `Merged agencies ${selectedForMerge.value} into ${selectedAgencyUnit.value.AgencyUnitID}`,
         );
         await agenciesStore.refresh();
         selectedForMerge.value = [];
         mergeMode.value = false;
      }
      catch (error) {
         console.error("Failed to merge agencies:", error);
      }
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
};

const editAgency = async (
   agencyUnitID: number,
   data: z.infer<typeof schemas.agency>,
) => {
   await agenciesStore.update(agencyUnitID, data.name, data.description);
};

const deleteAgency = async (agencyUnitID: number) => {
   await agenciesStore.delete(agencyUnitID);
};

const mergeAgency = async (
   agencyUnitIDs: number[],
   targetAgencyUnitID: number,
) => {
   await agenciesStore.mergeAgencies(targetAgencyUnitID, agencyUnitIDs);
};

const moveContactToAgency = async (
   contactInfoID: number,
   targetAgencyUnitID: number,
) => {
   await agenciesStore.moveContact(contactInfoID, targetAgencyUnitID);
};

const onDragOver = (event: DragEvent, agencyUnitID: number) => {
   if (event.dataTransfer?.types.includes("application/contact-id")) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      dragOverAgencyId.value = agencyUnitID;
   }
   else {
      event.dataTransfer!.dropEffect = "none";
   }
};

const onDragLeave = (event: DragEvent, agencyUnitID: number) => {
   event.preventDefault();
   if (dragOverAgencyId.value === agencyUnitID) {
      dragOverAgencyId.value = null;
   }
};

const onDrop = async (event: DragEvent, targetAgencyUnitID: number) => {
   event.preventDefault();
   if (dragOverAgencyId.value === targetAgencyUnitID) {
      dragOverAgencyId.value = null;
   }
   if (event.dataTransfer) {
      const contactInfoID = event.dataTransfer.getData(
         "application/contact-id",
      );
      if (contactInfoID) {
         try {
            await moveContactToAgency(
               parseInt(contactInfoID),
               targetAgencyUnitID,
            );
            console.log(
               `Moved contact ${contactInfoID} to agency ${targetAgencyUnitID}`,
            );
            await agenciesStore.refresh();
         }
         catch (error) {
            console.error("Failed to move contact:", error);
         }
      }
      else {
         console.warn("Invalid drag data: No contactInfoID found");
      }
   }
};

const onDragEnd = (event: DragEvent) => {
   dragOverAgencyId.value = null;
};
</script>

<style scoped>
li {
   padding: 0.5rem 0;
}

li.flex {
   transition: none;
}

li {
   position: relative;
   z-index: 0;
}

.overlay-scrollbars-host {
   height: 100% !important;
}

.drag-over {
   background-color: #e6f3ff;
   border: 2px dashed #3b82f6;
   transition:
      background-color 0.2s ease,
      border 0.2s ease;
}

.dark .drag-over {
   background-color: #1e293b;
   border-color: #60a5fa;
}

tr[data-contact-id] {
   cursor: move;
}

*[draggable="false"],
*:not([data-contact-id]) {
   cursor: default !important;
}

.bg-orange-100 {
   background-color: #ffe4b5;
}

.border-orange-300 {
   border-color: #ff8c00;
}

.dark .bg-orange-900 {
   background-color: #e65100;
}

.dark .border-orange-700 {
   border-color: #f97316;
}
</style>
