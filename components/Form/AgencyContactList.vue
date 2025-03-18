<template>
   <div class="p-6 h-full">
      <div v-if="currentAgency">
         <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold">
               聯絡人管理
            </h2>
            <Button @click="openAddContactModal">
               <PlusIcon class="mr-2 h-4 w-4" /> 新增聯絡人
            </Button>
         </div>

         <!-- 聯絡人列表 -->
         <OverlayScrollbarsComponent
            :options="{ scrollbars: { autoHide: 'leave' } }"
            class="h-full min-h-0 max-h-[calc(100vh-120px)]"
         >
            <table class="w-full border-collapse rounded-lg bg-gray-100 dark:bg-zinc-900">
               <thead>
                  <tr class="bg-gray-100 dark:bg-zinc-900">
                     <th class="p-2 text-left">
                        姓名
                     </th>
                     <th class="p-2 text-left">
                        電話
                     </th>
                     <th class="p-2 text-left">
                        操作
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr
                     v-for="contact in currentAgency?.Persons"
                     :key="contact.ContactInfoID"
                     class="border-b bg-white dark:bg-zinc-800"
                  >
                     <td class="p-2">
                        {{ contact.contactInfo?.Name || "未提供" }}
                     </td>
                     <td class="p-2">
                        {{ contact.contactInfo?.PhoneNumber || "未提供" }}
                     </td>
                     <td class="p-2">
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
                              <DropdownMenuItem @click="openEditContactModal(contact)">
                                 編輯
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                 class="text-red-600"
                                 @click="deleteContact(contact.ContactInfoID)"
                              >
                                 刪除
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </td>
                  </tr>
                  <tr v-if="currentAgency?.Persons.length === 0">
                     <td
                        colspan="3"
                        class="p-2 text-center text-gray-500 bg-white dark:bg-zinc-800"
                     >
                        尚無聯絡人
                     </td>
                  </tr>
               </tbody>
            </table>
         </OverlayScrollbarsComponent>
      </div>
      <div
         v-else
         class="text-gray-500 text-center h-full flex items-center justify-center"
      >
         請選擇一個事務所以查看聯絡人
      </div>
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
import { ref, computed, watch } from "vue";
type AgencyUnit = RouterOutput["data"]["agency"]["getAgencies"][0];

const props = defineProps<{
   selectedAgency: AgencyUnit | null
}>();

const agenciesStore = useAgenciesStore();
const { agencies } = storeToRefs(agenciesStore);
const { openAutoModal } = useModals();

const currentAgency = computed(() => {
   return agencies.value.find(
      (a) => a.AgencyUnitID === props.selectedAgency?.AgencyUnitID,
   );
});

const schemas = {
   agencyContact: z.object({
      name: z.string({ required_error: "姓名不可為空" }).nonempty("姓名不可為空"),
      email: z.string().email("請輸入有效的電子郵件").optional(),
      officeNumber: z.string().optional(),
      phoneNumber: z.string().optional(),
      role: z.string().optional(),
      note: z.string().optional(),
   }),
};

const fields = {
   agencyContact: {
      name: { label: "姓名" },
      phoneNumber: { label: "電話" },
      officeNumber: { label: "辦公室電話" },
      role: { label: "職位" },
      note: { label: "備註" },
   } as Config<z.infer<typeof schemas.agencyContact>>,
};

const openAddContactModal = () => {
   if (!currentAgency.value) return;
   openAutoModal(
      "新增聯絡人",
      "新增聯絡人至事務所",
      schemas.agencyContact,
      addContact,
      fields.agencyContact,
      undefined,
      undefined,
   );
};

const openEditContactModal = (person: AgencyUnit["Persons"][0]) => {
   openAutoModal(
      "編輯聯絡人",
      "更新聯絡人資訊",
      schemas.agencyContact,
      (data) => editContact(person.ContactInfoID, data),
      fields.agencyContact,
      undefined,
      {
         name: person.contactInfo?.Name || "",
         email: person.contactInfo?.Email || "",
         phoneNumber: person.contactInfo?.PhoneNumber || "",
         officeNumber: person.contactInfo?.OfficeNumber || "",
         role: person.contactInfo?.Role || "",
         note: person.contactInfo?.Note || "",
      },
   );
};

const addContact = async (data: z.infer<typeof schemas.agencyContact>) => {
   if (!currentAgency.value) throw new Error("未選擇事務所");
   await agenciesStore.insertContact(currentAgency.value.AgencyUnitID, {
      Name: data.name,
      Email: data.email,
      OfficeNumber: data.officeNumber,
      PhoneNumber: data.phoneNumber,
      Role: data.role,
      Note: data.note,
   });
};

const editContact = async (
   contactInfoID: number,
   data: z.infer<typeof schemas.agencyContact>,
) => {
   if (!currentAgency.value) throw new Error("未選擇事務所");
   await agenciesStore.updateContact(contactInfoID, currentAgency.value.AgencyUnitID, {
      Name: data.name,
      Email: data.email,
      OfficeNumber: data.officeNumber,
      PhoneNumber: data.phoneNumber,
      Role: data.role,
      Note: data.note,
   });
};

const deleteContact = async (contactPersonID: number) => {
   if (!currentAgency.value) throw new Error("未選擇事務所");
   await agenciesStore.deleteContact(currentAgency.value.AgencyUnitID, contactPersonID);
};
</script>

<style scoped>
/* 調整表格頭部和按鈕對齊 */
th,
td {
  vertical-align: middle;
}

/* 確保滾動容器高度 */
.overlay-scrollbars-host {
  height: 100% !important;
}
</style>
