<template>
   <Stepper
      v-model:model-value="currentStep"
      orientation="vertical"
      class="flex flex-col justify-start gap-4 select-none"
   >
      <StepperItem
         v-for="step in steps"
         :key="step.step"
         v-slot="{ state }"
         class="relative flex items-start"
         :step="step.step"
      >
         <StepperTrigger
            as-child
            class="items-start cursor-pointer"
         >
            <div
               class="flex flex-col gap-1 w-full px-3"
               :class="{
                  '': state === 'completed',
                  'bg-zinc-100 dark:bg-zinc-900': state === 'active',
               }"
            >
               <StepperTitle
                  :class="[state === 'completed' && 'opacity-50']"
                  class="text-sm font-semibold transition"
               >
                  {{ step.name }}
               </StepperTitle>
               <StepperDescription
                  :class="[state === 'completed' && 'opacity-50']"
                  class="text-muted-foreground transition text-left"
               >
                  {{ step.description }}
               </StepperDescription>
            </div>
         </StepperTrigger>
      </StepperItem>
   </Stepper>
</template>

<script setup lang="ts">
import {
   Stepper,
   StepperDescription,
   StepperItem,
   StepperTitle,
   StepperTrigger,
} from "@/components/ui/stepper";

const { steps = [] } = defineProps<{
   steps?: IFormStep[]
}>();

const currentStep = defineModel("currentStep", {
   type: Number,
   default: 1,
});
</script>
