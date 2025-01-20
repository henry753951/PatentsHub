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
                     v-model:current-step="currentStep"
                     :steps="steps"
                  />
               </div>
               <OverlayScrollbarsComponent
                  :options="{ scrollbars: { autoHide: 'leave' } }"
                  class="flex-1 px-8 py-4 bg-zinc-100 dark:bg-[#0e0e12] rounded min-h-0"
               >
                  <CustomStepperView
                     ref="stepView"
                     v-model:current-step="currentStep"
                     v-model:steps-data-readonly="stepsDataRead"
                     :schema="combinedSchema"
                     :steps="steps"
                  />
                  {{ stepsDataRead }}
               </OverlayScrollbarsComponent>
            </div>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup>
import { CustomStepperView } from "#components";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import steps, { combinedSchema } from "./steps";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog";
import type { z } from "zod";

const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const { props } = defineProps<{
   props: Record<string, any>
}>();

const currentStep = ref(1);
const stepsDataRead = ref({} as z.infer<typeof combinedSchema>);
</script>

<style scoped></style>
