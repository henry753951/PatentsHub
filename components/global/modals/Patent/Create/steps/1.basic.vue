<template>
   <AutoForm
      class="py-4 space-y-3"
      :form="form"
      :schema="schema"
      :field-config="{}"
      @submit="onSubmit"
   >
      <div class="flex justify-end">
         <Button type="submit">
            新增
         </Button>
      </div>
   </AutoForm>
</template>

<script lang="ts">
import { z } from "zod";
import { AutoForm } from "@/components/ui/auto-form";
import { toTypedSchema } from "@vee-validate/zod";
import { useField } from "vee-validate";
enum PatentType {
   Invention = "Invention",
   UtilityModel = "UtilityModel",
   Design = "Design",
}

export const schema = z.object({
   name: z
      .string({
         required_error: "Name is required.",
      })
      .min(2, {
         message: "Name must be at least 2 characters.",
      })
      .describe("專利名稱"),
   expiryDate: z
      .string({
         required_error: "Expiry date is required.",
      })
      .nonempty()
      .describe("到期日")
      .regex(/^\d{4}\/\d{2}\/\d{2}$/, {
         message: "Expiry date must be in the format YYYY/MM/DD.",
      }),

   patentNumber: z
      .string({
         required_error: "Patent number is required.",
      })
      .nonempty("Patent number is required.")
      .describe("專利編號"),
   patentType: z.nativeEnum(PatentType).describe("專利類型"),
});
</script>

<script lang="ts" setup>
const { open } = useModals();

const form = useForm({
   validationSchema: toTypedSchema(schema),
});

const onSubmit = async (data: typeof form.values) => {
   open("DebugModal", {
      props: {
         data,
      },
   });
};

const data = computed(() => {
   return form.values;
});

defineExpose({
   data,
   schema,
});
</script>

<style scoped></style>
