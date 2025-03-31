<template>
   <Dialog
      :open="props.isOpen"
      @update:open="closeModal"
   >
      <DialogContent
         class="w-full max-w-lg rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 h-fit"
      >
         <DialogHeader>
            <DialogTitle
               class="text-xl font-bold text-slate-800 dark:text-zinc-100"
            >
               {{ props.title }}
            </DialogTitle>
            <DialogDescription class="text-slate-600 dark:text-zinc-400">
               {{ props.description }}
            </DialogDescription>
         </DialogHeader>

         <form
            class="space-y-2"
            @submit.prevent="submitForm"
         >
            <OverlayScrollbarsComponent
               :options="{ scrollbars: { autoHide: 'leave' } }"
               class="max-h-96 overflow-auto px-4 py-4"
            >
               <div>
                  <div class="flex justify-between items-center">
                     <Label
                        for="name"
                        class="text-sm font-bold text-slate-700 dark:text-zinc-300"
                     >
                        <div v-if="!formData.name.trim() && showValidation">
                           <span class="text-red-500">發明人姓名 *</span>
                        </div>
                        <div v-else>
                           <span>發明人姓名</span>
                           <span class="text-red-500"> *</span>
                        </div>

                     </Label>
                     <p
                        v-if="!formData.name.trim() && showValidation"
                        class="text-red-500 text-sm"
                     >
                        姓名不可為空
                     </p>
                  </div>

                  <!-- Input 輸入框 -->
                  <Input
                     id="name"
                     ref="nameInputRef"
                     v-model="formData.name"
                     @blur="showValidation = true"
                  />
               </div>

               <div>
                  <Label
                     for="email"
                     class="text-sm font-bold text-slate-700 dark:text-zinc-300"
                  >
                     電子信箱
                  </Label>
                  <Input
                     id="email"
                     v-model="formData.email"
                  />
               </div>
               <div>
                  <Label
                     for="officeNumber"
                     class="text-sm font-bold text-slate-700 dark:text-zinc-300"
                  >
                     辦公室電話
                  </Label>
                  <Input
                     id="officeNumber"
                     v-model="formData.officeNumber"
                  />
               </div>
               <div>
                  <Label
                     for="phoneNumber"
                     class="text-sm font-bold text-slate-700 dark:text-zinc-300"
                  >
                     手機號碼
                  </Label>
                  <Input
                     id="phoneNumber"
                     v-model="formData.phoneNumber"
                  />
               </div>
               <div>
                  <Label
                     for="role"
                     class="text-sm font-bold text-slate-700 dark:text-zinc-300"
                  >
                     職位
                  </Label>
                  <Input
                     id="role"
                     v-model="formData.role"
                  />
               </div>
               <div>
                  <Label
                     for="belongs"
                     class="text-sm font-bold text-slate-700 dark:text-zinc-300"
                  >
                     所屬系所
                  </Label>
                  <DepartmentSelect
                     v-model="formData.belongs"
                     class="mb-2"
                  />
               </div>
               <div>
                  <Label
                     for="note"
                     class="text-sm font-bold text-slate-700 dark:text-zinc-300"
                  >
                     備註
                  </Label>
                  <Input
                     id="note"
                     v-model="formData.note"
                  />
               </div>
            </OverlayScrollbarsComponent>
            <DialogFooter>
               <Button
                  type="button"
                  variant="outline"
                  @click="closeModal"
               >
                  取消
               </Button>
               <Button
                  type="submit"
               >
                  確認
               </Button>
            </DialogFooter>
         </form>
      </DialogContent>
   </Dialog>
</template>

<script lang="ts" setup>
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import DepartmentSelect from "~/components/Form/DepartmentSelect.vue";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

const props = defineProps<{
   isOpen: boolean
   title: string
   description: string
   initialData?: {
      name: string
      email?: string
      officeNumber?: string
      phoneNumber?: string
      role?: string
      note?: string
      departmentID: number
      collegeID: number
   }
}>();

const emit = defineEmits(["submit", "close"]);

const showValidation = ref(false);
const nameInputRef = ref<InstanceType<typeof Input> | null>(null);

// 監聽 Dialog 是否打開，然後自動對焦
watch(
   () => props.isOpen,
   async (isOpen) => {
      if (isOpen) {
         showValidation.value = false;
         await nextTick();
         nameInputRef.value?.$el?.focus();
      }
   },
);
const formData = ref({
   name: "",
   email: "",
   officeNumber: "",
   phoneNumber: "",
   role: "",
   note: "",
   belongs: null as {
      departmentID: number
      collegeID: number
   } | null,
});

watch(
   () => props.isOpen,
   (isOpen) => {
      if (isOpen && props.initialData) {
         formData.value = {
            name: props.initialData.name,
            email: props.initialData.email ?? "",
            officeNumber: props.initialData.officeNumber ?? "",
            phoneNumber: props.initialData.phoneNumber ?? "",
            role: props.initialData.role ?? "",
            note: props.initialData.note ?? "",
            belongs: {
               departmentID: props.initialData.departmentID,
               collegeID: props.initialData.collegeID,
            },
         };
      }
   },
);

const submitForm = () => {
   if (!formData.value.name) {
      return;
   }
   emit("submit", {
      name: formData.value.name,
      email: formData.value.email,
      officeNumber: formData.value.officeNumber,
      phoneNumber: formData.value.phoneNumber,
      role: formData.value.role,
      departmentID: formData.value.belongs?.departmentID ?? null,
      collegeID: formData.value.belongs?.collegeID ?? null,
      note: formData.value.note,
   });
};

const closeModal = () => {
   emit("close");
};
</script>

<style scoped></style>
