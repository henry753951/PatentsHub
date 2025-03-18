<template>
   <div>
      <Dialog
         v-model:open="isOpen"
      >
         <DialogContent class="w-fit min-w-[300px]">
            <DialogHeader class="select-none">
               <DialogTitle>確認操作</DialogTitle>
               <DialogDescription>
                  <div class="flex items-center">
                     請輸入
                     <Tag class="mx-1">
                        {{ comfirmText }}
                     </Tag>
                     來確認{{ comfirmText }}操作
                  </div>
                  <div class="flex items-center gap-2 flex-col mt-4">
                     <InputText
                        v-model="typedText"
                        class="w-full"
                        type="text"
                        placeholder="請輸入確認文字"
                     />
                     <Button
                        class="w-full"
                        label="確認"
                        severity="danger"
                        :disabled="typedText !== comfirmText"
                        @click="comfirm"
                     />
                  </div>
               </DialogDescription>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup>
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogDescription,
   DialogFooter,
   DialogTitle,
} from "@/components/ui/dialog";
import Tag from "primevue/tag";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const props = defineProps<{
   comfirmText: string
   comfirmCallback?: () => void
}>();

const comfirm = () => {
   if (props.comfirmCallback) {
      props.comfirmCallback();
   }
   isOpen.value = false;
};
const typedText = ref("");
</script>

<style scoped></style>
