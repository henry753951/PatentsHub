<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent class="w-[80%] h-[80%] max-w-none p-1">
            <div class="flex gap-3 w-full flex-1">
               <div class="flex flex-col w-[30%] gap-6 p-5">
                  <DialogHeader class="select-none">
                     <DialogTitle>新增專利</DialogTitle>
                     <DialogDescription>請填寫專利資訊</DialogDescription>
                  </DialogHeader>
                  <CustomBoxStepper
                     v-if="patentCreateFormRef"
                     v-model:current-step="patentCreateFormRef.patentCreation.currentStep.value"
                     :steps="patentCreateFormRef.patentCreation.steps"
                  />
               </div>
               <OverlayScrollbarsComponent
                  :options="{ scrollbars: { autoHide: 'leave' } }"
                  class="flex-1 px-8 py-4 bg-zinc-100 dark:bg-[#0e0e12] rounded min-h-0"
               >
                  <PatentCreateForm ref="patentCreateFormRef" />
               </OverlayScrollbarsComponent>
            </div>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup>
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog";
import PatentCreateForm from "./Form.vue";

const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const { props } = defineProps<{
   props: Record<string, any>
}>();

const patentCreateFormRef = useTemplateRef<ComponentExposed<typeof PatentCreateForm>>("patentCreateFormRef");

</script>

<style scoped></style>
