import { toTypedSchema } from "@vee-validate/zod";
import type { GenericObject } from "vee-validate";
import type { z } from "zod";
import CustomZodType from "~/customZod";
export const usePatent = () => {
   const { $trpc } = useNuxtApp();

   const useCreation = () => {
      // ========= 修改這裡 =========
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
      // 組合所有步驟的ZOD格式
      const schemas = CustomZodType.PatentCreate.merge(
         CustomZodType.PatentInventor,
      );

      // ===========================
      const {
         values,
         handleSubmit,
         validateField,
         defineField,
         errorBag,
         errors,
      } = useForm({
         keepValuesOnUnmount: true,
         validationSchema: toTypedSchema(schemas),
      });

      handleSubmit(async (values) => {
         await $trpc.data.patent.createPatent.mutate(values);
      });

      const currentStep = ref(0);
      const currentSchema = computed(() => {
         return steps[currentStep.value].schema;
      });

      const nextStep = async () => {
         const keys = Object.keys(currentSchema.value.shape) as (keyof z.infer<
            typeof schemas
         >)[];
         let isValidate = true;
         for (const key of keys) {
            const { valid } = await validateField(key);
            if (!valid) isValidate = false;
            consola.info("驗證", key, valid);
         }
         if (currentStep.value < steps.length - 1 && isValidate) {
            currentStep.value++;
         }
      };
      const prevStep = () => {
         if (currentStep.value > 0) currentStep.value--;
      };

      return {
         defineField,
         nextStep,
         prevStep,
         currentStep,
         currentSchema,
         values,
         errorBag,
         errors,
         steps,
      };
   };

   return {
      useCreation,
   };
};
