<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent class="w-[80%] h-[80%] max-w-none p-1">
            <div class="flex gap-3 w-full h-full">
               <div class="flex flex-col w-[30%] gap-6 p-5">
                  <DialogHeader>
                     <DialogTitle>新增專利</DialogTitle>
                     <DialogDescription>請填寫專利資訊</DialogDescription>
                  </DialogHeader>
                  <CustomBoxStepper />
               </div>
               <div
                  class="flex-1 px-8 py-4 bg-zinc-100 dark:bg-[#0e0e12] rounded"
               >
                  <div class="font-bold">
                     專利資訊
                  </div>
                  <AutoForm
                     class="py-4 space-y-3"
                     :form="form"
                     :schema="schema"
                     @submit="onSubmit"
                  >
                     <div class="flex justify-end">
                        <Button type="submit">
                           新增
                        </Button>
                     </div>
                  </AutoForm>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup>
import { z } from "zod";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog";
import { AutoForm } from "@/components/ui/auto-form";
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
