<template>
   <Dialog
      :open="props.isOpen"
      @update:open="closeModal"
   >
      <DialogContent class="sm:max-w-[425px] rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
         <DialogHeader>
            <DialogTitle class="text-xl font-bold text-slate-800 dark:text-zinc-100">
               {{ props.title }}
            </DialogTitle>
            <DialogDescription class="text-slate-600 dark:text-zinc-400">
               {{ props.description }}
            </DialogDescription>
         </DialogHeader>
         <form
            class="space-y-4"
            @submit.prevent="submitForm"
         >
            <div>
               <Label
                  for="name"
                  class="text-sm font-medium text-slate-700 dark:text-zinc-300"
               >發明人姓名</Label>
               <Input
                  id="name"
                  v-model="formData.name"
                  class="mt-1 w-full rounded-lg border border-slate-200 dark:border-zinc-600 bg-slate-50 dark:bg-zinc-900 text-slate-800 dark:text-zinc-100"
                  placeholder="請輸入姓名"
                  required
               />
            </div>
            <div>
               <Label
                  for="email"
                  class="text-sm font-medium text-slate-700 dark:text-zinc-300"
               >電子信箱</Label>
               <Input
                  id="email"
                  v-model="formData.email"
                  class="mt-1 w-full rounded-lg border border-slate-200 dark:border-zinc-600 bg-slate-50 dark:bg-zinc-900 text-slate-800 dark:text-zinc-100"
                  placeholder="請輸入 Email（選填）"
               />
            </div>
            <div>
               <Label
                  for="department"
                  class="text-sm font-medium text-slate-700 dark:text-zinc-300"
               >所屬系所</Label>
               <DepartmentSelect
                  v-model="formData.belongs"
                  class="mt-1"
               />
            </div>
            <DialogFooter>
               <Button
                  type="button"
                  variant="outline"
                  @click="closeModal"
               >
                  取消
               </Button>
               <Button type="submit">
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

const props = defineProps<{
   isOpen: boolean
   title: string
   description: string
   initialData?: { name: string, email?: string, departmentID: number }
}>();

const emit = defineEmits(["submit", "close"]);

const formData = ref({
   name: "",
   email: "",
   belongs: {
      departmentID: 0,
   },
});

// 初始化表單數據
watch(
   () => props.initialData,
   (data) => {
      if (data) {
         formData.value = {
            name: data.name,
            email: data.email || "",
            belongs: {
               departmentID: data.departmentID,
            },
         };
      }
   },
   { immediate: true },
);

const submitForm = () => {
   emit("submit", {
      name: formData.value.name,
      email: formData.value.email,
      departmentID: formData.value.belongs.departmentID,
   });
};

const closeModal = () => {
   emit("close");
};
</script>

<style scoped>
</style>
