<template>
   <div>
      <template
         v-for="(step, index) in steps"
         :key="index"
      >
         <div
            v-show="currentStep === step.step"
            class="flex flex-col"
         >
            <div class="font-bold select-none text-lg">
               {{ step.name }}
            </div>
            <div class="opacity-65 text-sm">
               {{ step.description }}
            </div>

            <component
               :is="step.component"
               ref="steps"
            />
         </div>
      </template>
   </div>
</template>
<script lang="ts" setup generic="T extends ZodObjectOrWrapped">
import { useTemplateRef, type DefineComponent } from "vue";
import type { ZodObjectOrWrapped } from "../ui/auto-form/utils";
import type { z } from "zod";

const stepsRefs
   = useTemplateRef<InstanceType<DefineComponent<{ data: any }>>[]>("steps");

const stepsDataRead = defineModel("stepsDataReadonly", {
   type: Object as () => z.infer<T>,
});

const stepsData = computed(() => {
   const datas
      = stepsRefs.value?.map((ref) => {
         return {
            data: ref.data,
         };
      }) ?? [];
   return Object.assign(
      {},
      ...datas.map((item, index) => ({ [index + 1]: item.data })),
   ) as z.infer<T>;
});

watch(
   stepsData,
   (value) => {
      stepsDataRead.value = value;
   },
   { immediate: true },
);

const { steps } = defineProps<{
   schema: T
   steps: IFormStep[]
}>();

const currentStep = defineModel("currentStep", {
   type: Number,
   default: 0,
});
</script>
