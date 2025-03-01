import { toTypedSchema } from "@vee-validate/zod";
import type { GenericObject } from "vee-validate";
import type { z } from "zod";
import CustomZodType from "~/server/prisma/customZod";
export const usePatent = () => {
   const { $trpc } = useNuxtApp();

   const useCreation = (
      currentStepRef: Ref<number> | undefined = undefined,
   ) => {
      // ========= 修改這裡 =========
      // 定義 ValuesType
      type ValuesType = z.infer<typeof CustomZodType.PatentCreate> &
        z.infer<typeof CustomZodType.PatentInventor>;

      // 多步骤表单ZOD格式
      const steps = [
         {
            schema: CustomZodType.PatentCreate,
            title: "基本資料",
            description: "專利基本資料",
         },
         {
            schema: CustomZodType.PatentInventor,
            title: "發明人",
            description: "發明人資料與貢獻度",
         },
      ];

      // 表單提交處理
      const handleSubmit = async (values: ValuesType) => {
         await $trpc.data.patent.createPatent.mutate(values);
      };

      // ===========================

      const currentStep = currentStepRef || ref(0);
      const currentSchema = computed(() => {
         return toTypedSchema(steps[currentStep.value].schema);
      });
      const nextStep = (values: GenericObject) => {
         if (currentStep.value < steps.length - 1) currentStep.value++;
         else handleSubmit(values as ValuesType);
      };
      const prevStep = () => {
         if (currentStep.value > 0) currentStep.value--;
      };

      return {
         nextStep,
         prevStep,
         currentStep,
         currentSchema,
         steps,
      };
   };

   return {
      useCreation,
   };
};
