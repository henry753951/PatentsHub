<template>
   <div>
      <Sheet v-model:open="isOpen">
         <SheetContent :side="props.side">
            <SheetHeader>
               <SheetTitle>新增專利</SheetTitle>
               <SheetDescription> 請填寫專利資訊 </SheetDescription>
            </SheetHeader>
            {{ form.values }}
            <AutoForm
               :form="form"
               :schema="schema"
               @submit="onSubmit"
            >
               <Button type="submit">
                  Send now
               </Button>
            </AutoForm>
         </SheetContent>
      </Sheet>
   </div>
</template>

<script lang="ts" setup>
import { z } from "zod";
import { AutoForm, AutoFormField } from "@/components/ui/auto-form";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
const { open } = useModals();

const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const { props } = defineProps<{
   props: Record<string, any>
}>();

const schema = z.object({
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
      .describe("到期日"),
});

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
</script>

<style scoped></style>
