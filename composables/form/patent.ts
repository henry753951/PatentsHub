import { toTypedSchema } from "@vee-validate/zod";
import type { z } from "zod";
import { CustomZodType } from "~/zod.dto";
export const patent = {
   useCreation: (onCreate?: (patentID: number) => void) => {
      const { $trpc } = useNuxtApp();
      // ========= 修改這裡 =========
      // 多步骤表单 ZOD 格式
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
      const submitForm = async (values: z.infer<typeof schemas>) => {
         const data = await $trpc.data.patent.createPatent.mutate(values);
         await refreshNuxtData(["patents"]);
         if (onCreate) onCreate(data.PatentID);
      };
      // ===========================
      const {
         values,
         handleSubmit,
         validateField,
         defineField,
         errorBag,
         errors,
         resetForm,
      } = useForm({
         keepValuesOnUnmount: true,
         validationSchema: toTypedSchema(schemas),
      });

      // ===========================

      const currentStep = ref(0);
      const currentSchema = computed(() => {
         return steps[currentStep.value].schema;
      });

      const nextStep = async () => {
         let isValidate = true;
         let keys = [] as (keyof z.infer<typeof schemas>)[];
         for (let i: number = 0; i <= currentStep.value; i++) {
            console.log(steps[i].schema.shape);
            keys = keys.concat(
               Object.keys(steps[i].schema.shape) as (keyof z.infer<
                  typeof schemas
               >)[],
            );
         }
         for (const key of keys) {
            const { valid } = await validateField(key);
            if (!valid) isValidate = false;
         }
         if (currentStep.value === steps.length - 1 && isValidate) {
            submitForm(values as z.infer<typeof schemas>);
            return;
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
   },
};
