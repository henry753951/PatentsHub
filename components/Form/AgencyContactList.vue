<template>
   <div class="p-6 h-full">
      <div v-if="agencyID">
         <h2 class="text-xl font-bold mb-4">
            聯絡人管理
         </h2>
         <Button
            class="mb-4"
            @click="openAddContactModal"
         >
            <PlusIcon class="mr-2 h-4 w-4" /> 新增聯絡人
         </Button>

         <!-- 錯誤或成功訊息 -->
         <div
            v-if="error || successMessage"
            class="mb-4"
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

         <!-- 聯絡人列表 -->
         <OverlayScrollbarsComponent
            :options="{ scrollbars: { autoHide: 'leave' } }"
            class="h-full min-h-0"
         >
            <table class="w-full border-collapse">
               <thead>
                  <tr class="bg-gray-100">
                     <th class="p-2 text-left">
                        姓名
                     </th>
                     <th class="p-2 text-left">
                        電子郵件
                     </th>
                     <th class="p-2 text-left">
                        操作
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr
                     v-for="contact in contacts"
                     :key="contact.ContactPersonID"
                     class="border-b"
                  >
                     <td class="p-2">
                        {{ contact.contactInfo?.Name || "未提供" }}
                     </td>
                     <td class="p-2">
                        {{ contact.contactInfo?.Email || "未提供" }}
                     </td>
                     <td class="p-2">
                        <Button
                           variant="outline"
                           size="sm"
                           @click="openEditContactModal(contact)"
                        >
                           編輯
                        </Button>
                        <Button
                           variant="destructive"
                           size="sm"
                           class="ml-2"
                           @click="deleteContact(contact.ContactPersonID)"
                        >
                           刪除
                        </Button>
                     </td>
                  </tr>
                  <tr v-if="contacts.length === 0">
                     <td
                        colspan="3"
                        class="p-2 text-center text-gray-500"
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
import { PlusIcon } from "lucide-vue-next";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import { storeToRefs } from "pinia";
import { useAgenciesStore } from "~/stores/agencies";
import { useModals } from "~/composables/useModals";
import { z } from "zod";
import type { Config } from "~/components/ui/auto-form/interface";
import { ref, computed, watch } from "vue";

const props = defineProps<{
   agencyID: number | null
}>();

const agenciesStore = useAgenciesStore();
const { agencies, error } = storeToRefs(agenciesStore);
const { openAutoModal } = useModals();
const successMessage = ref<string | null>(null);

const schemas = {
   agencyContact: z.object({
      name: z.string({ required_error: "姓名不可為空" }).nonempty("姓名不可為空"),
      email: z.string().email("請輸入有效的電子郵件").optional(),
      officeNumber: z.string().optional(),
      phoneNumber: z.string().optional(),
      position: z.string().optional(),
      note: z.string().optional(),
   }),
};

const fields = {
   agencyContact: {
      name: { label: "姓名" },
      email: { label: "電子郵件" },
      officeNumber: { label: "辦公室電話" },
      phoneNumber: { label: "手機號碼" },
      position: { label: "職位" },
      note: { label: "備註" },
   } as Config<z.infer<typeof schemas.agencyContact>>,
};

// 計算當前事務所的聯絡人
const contacts = computed(() => {
   const agency = agencies.value.find((a) => a.AgencyID === props.agencyID);
   return agency?.contacts || [];
});

// 監聽 agencyID 變化
watch(
   () => props.agencyID,
   (newAgencyID) => {
      successMessage.value = null; // 切換事務所時清除訊息
      if (newAgencyID && !agencies.value.some((a) => a.AgencyID === newAgencyID)) {
      // 如果切換到的 agencyID 不存在，觸發刷新
         agenciesStore.refresh().catch((err) => {
            console.error("刷新聯絡人數據失敗:", err);
         });
      }
   },
);

const openAddContactModal = () => {
   if (!props.agencyID) return;
   openAutoModal(
      "新增聯絡人",
      "新增聯絡人至事務所",
      schemas.agencyContact,
      addContact,
      fields.agencyContact,
   );
};

const openEditContactModal = (contact: typeof contacts.value[number]) => {
   if (!props.agencyID) return;
   openAutoModal(
      "編輯聯絡人",
      "更新聯絡人資訊",
      schemas.agencyContact,
      (data) => editContact(contact.ContactPersonID, data),
      fields.agencyContact,
      {
         name: contact.contactInfo?.Name || "",
         email: contact.contactInfo?.Email || "",
         officeNumber: contact.contactInfo?.OfficeNumber || "",
         phoneNumber: contact.contactInfo?.PhoneNumber || "",
         position: contact.contactInfo?.Position || "",
         note: contact.contactInfo?.Note || "",
      },
   );
};

const addContact = async (data: z.infer<typeof schemas.agencyContact>) => {
   try {
      if (!props.agencyID) throw new Error("未選擇事務所");
      await agenciesStore.insertContact(props.agencyID, {
         Name: data.name,
         Email: data.email,
         OfficeNumber: data.officeNumber,
         PhoneNumber: data.phoneNumber,
         Position: data.position,
         Note: data.note,
      });
      successMessage.value = "聯絡人新增成功";
      setTimeout(() => (successMessage.value = null), 3000);
   }
   catch (err) {
      console.error("新增聯絡人失敗:", err);
   }
};

const editContact = async (
   contactPersonID: number,
   data: z.infer<typeof schemas.agencyContact>,
) => {
   try {
      if (!props.agencyID) throw new Error("未選擇事務所");
      await agenciesStore.updateContact(contactPersonID, props.agencyID, {
         Name: data.name,
         Email: data.email,
         OfficeNumber: data.officeNumber,
         PhoneNumber: data.phoneNumber,
         Position: data.position,
         Note: data.note,
      });
      successMessage.value = "聯絡人更新成功";
      setTimeout(() => (successMessage.value = null), 3000);
   }
   catch (err) {
      console.error("更新聯絡人失敗:", err);
   }
};

const deleteContact = async (contactPersonID: number) => {
   try {
      await agenciesStore.deleteContact(contactPersonID);
      successMessage.value = "聯絡人刪除成功";
      setTimeout(() => (successMessage.value = null), 3000);
   }
   catch (err) {
      console.error("刪除聯絡人失敗:", err);
   }
};
</script>

<style scoped></style>
