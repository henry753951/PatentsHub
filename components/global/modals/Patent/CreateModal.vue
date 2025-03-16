<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent class="w-[80%] h-[80%] max-w-none p-1 flex flex-col">
            <div class="flex gap-3 w-full h-full max-h-full">
               <div class="flex flex-col w-[30%] gap-6 p-5">
                  <DialogHeader class="select-none">
                     <DialogTitle>新增專利</DialogTitle>
                     <DialogDescription>請填寫專利資訊</DialogDescription>
                  </DialogHeader>
                  <CustomBoxStepper
                     v-if="patentCreateFormRef"
                     v-model:current-step="
                        patentCreateFormRef!.patentCreation.currentStep.value
                     "
                     :steps="patentCreateFormRef.patentCreation.steps"
                  />
               </div>
               <div
                  class="flex flex-col flex-1  bg-zinc-100 dark:bg-[#0e0e12] rounded gap-2 max-h-full"
               >
                  <OverlayScrollbarsComponent
                     class="flex-1 min-h-0 px-8 py-5 "
                     :options="{ scrollbars: { autoHide: 'leave' } }"
                  >
                     <FormPatentCreate
                        ref="patentCreateFormRef"
                     />
                  </OverlayScrollbarsComponent>
                  <div class="flex justify-end gap-2">
                     <Button
                        v-if="patentCreateFormRef"
                        @click="patentCreateFormRef!.patentCreation.nextStep"
                     >
                        {{
                           patentCreateFormRef.patentCreation.currentStep
                              .value ===
                              patentCreateFormRef.patentCreation.steps.length - 1
                              ? "新增專利"
                              : "下一步"
                        }}
                     </Button>
                  </div>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup>
import type { FormPatentCreate } from "#components";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const patentCreateFormRef = useTemplateRef<
   ComponentExposed<typeof FormPatentCreate>
>("patentCreateFormRef");
</script>

<style scoped></style>
