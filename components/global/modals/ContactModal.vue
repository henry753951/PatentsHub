<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent
            class="sm:max-w-lg p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg"
         >
            <DialogHeader>
               <div class="flex justify-between items-center">
                  <DialogTitle class="text-3xl font-bold text-gray-800">
                     {{ data?.Name || "未知聯絡人" }}
                  </DialogTitle>
                  <UiThingButton
                     variant="ghost"
                     @click="toggleEditMode"
                  >
                     {{ isEditing ? "完成編輯" : "編輯" }}
                  </UiThingButton>
               </div>
               <DialogDescription class="text-base text-gray-500 mt-1">
                  {{ data?.Role || "未指定角色" }}
               </DialogDescription>
            </DialogHeader>
            <div
               v-if="data"
               class="mt-6 space-y-5"
            >
               <!-- Contact Information Card -->
               <div
                  class="bg-white rounded-lg p-5 border border-gray-100 shadow-sm"
               >
                  <div class="space-y-4">
                     <!-- Name -->
                     <div class="flex items-center space-x-3">
                        <span class="w-24 text-gray-700 font-medium">姓名：</span>
                        <Input
                           v-if="isEditing"
                           v-model="data.Name"
                           class="flex-1"
                           placeholder="請輸入姓名"
                        />
                        <span
                           v-else
                           class="text-gray-800"
                        >{{ data?.Name || "無" }}</span>
                     </div>
                     <!-- Email -->
                     <div class="flex items-center space-x-3">
                        <span class="w-24 text-gray-700 font-medium">電子郵件：</span>
                        <Input
                           v-if="isEditing"
                           v-model="data.Email"
                           type="email"
                           class="flex-1"
                           placeholder="請輸入電子郵件"
                        />
                        <a
                           v-else-if="data?.Email"
                           :href="`mailto:${data.Email}`"
                           class="text-blue-600 hover:underline truncate"
                        >
                           {{ data.Email }}
                        </a>
                        <span
                           v-else
                           class="text-gray-800"
                        >無</span>
                     </div>
                     <!-- Office Number -->
                     <div class="flex items-center space-x-3">
                        <span class="w-24 text-gray-700 font-medium">辦公室電話：</span>
                        <Input
                           v-if="isEditing"
                           v-model="data.OfficeNumber"
                           class="flex-1"
                           placeholder="請輸入辦公室電話"
                        />
                        <a
                           v-else-if="data?.OfficeNumber"
                           :href="`tel:${data.OfficeNumber}`"
                           class="text-blue-600 hover:underline"
                        >
                           {{ data.OfficeNumber }}
                        </a>
                        <span
                           v-else
                           class="text-gray-800"
                        >無</span>
                     </div>
                     <!-- Phone Number -->
                     <div class="flex items-center space-x-3">
                        <span class="w-24 text-gray-700 font-medium">手機號碼：</span>
                        <Input
                           v-if="isEditing"
                           v-model="data.PhoneNumber"
                           class="flex-1"
                           placeholder="請輸入手機號碼"
                        />
                        <a
                           v-else-if="data?.PhoneNumber"
                           :href="`tel:${data.PhoneNumber}`"
                           class="text-blue-600 hover:underline"
                        >
                           {{ data.PhoneNumber }}
                        </a>
                        <span
                           v-else
                           class="text-gray-800"
                        >無</span>
                     </div>
                     <!-- Role -->
                     <div class="flex items-center space-x-3">
                        <span class="w-24 text-gray-700 font-medium">角色：</span>
                        <Input
                           v-if="isEditing"
                           v-model="data.Role"
                           class="flex-1"
                           placeholder="請輸入角色"
                        />
                        <span
                           v-else
                           class="text-gray-800"
                        >{{ data?.Role || "無" }}</span>
                     </div>
                     <!-- Note -->
                     <div class="flex flex-col space-y-2">
                        <span class="w-24 text-gray-700 font-medium">備註：</span>
                        <Textarea
                           v-if="isEditing"
                           v-model="data.Note as string"
                           class="flex-1"
                           placeholder="請輸入備註"
                           rows="4"
                        />
                        <p
                           v-else-if="data?.Note"
                           class="text-gray-800 bg-gray-50 p-3 rounded-md"
                        >
                           {{ data.Note }}
                        </p>
                        <span
                           v-else
                           class="text-gray-800"
                        >無</span>
                     </div>
                  </div>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog";
import Textarea from "~/components/ui/textarea/Textarea.vue";

const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const props = defineProps<{
   contactInfoId: number
}>();

const { data, status, forceRefresh, updateContactInfo } = useContactInfo(
   props.contactInfoId,
);

// 編輯模式狀態
const isEditing = ref(false);
const isSaving = ref(false);

// 切換編輯模式
const toggleEditMode = () => {
   if (isEditing.value) {
      // 如果正在編輯，先儲存更改
      save();
   }
   isEditing.value = !isEditing.value;
};

// 儲存更改
const save = async () => {
   if (!data.value) return;
   isSaving.value = true;
   try {
      await updateContactInfo({
         contactInfoID: data.value.ContactInfoID,
         Name: data.value.Name,
         Email: data.value.Email,
         OfficeNumber: data.value.OfficeNumber,
         PhoneNumber: data.value.PhoneNumber,
         Role: data.value.Role,
         Note: data.value.Note,
      });
      await forceRefresh(); // 重新載入資料
      isEditing.value = false; // 退出編輯模式
   }
   catch (error) {
      console.error("儲存失敗:", error);
   }
   finally {
      isSaving.value = false;
   }
};
</script>
