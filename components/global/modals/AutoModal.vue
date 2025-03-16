<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent>
            <DialogHeader class="select-none">
               <DialogTitle>{{ props.title }}</DialogTitle>
               <DialogDescription>{{ props.description }}</DialogDescription>
            </DialogHeader>
            <AutoForm
               class="space-y-6"
               :schema="props.schema"
               :field-config="props.fieldConfig"
               :form="form"
               @submit="handleSubmit"
            >
               <DialogFooter>
                  <Button
                     variant="outlined"
                     type="button"
                     @click="isOpen = false"
                  >
                     取消
                  </Button>
                  <Button type="submit">
                     確認
                  </Button>
               </DialogFooter>
            </AutoForm>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup generic="T extends ZodObjectOrWrapped">
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogDescription,
   DialogFooter,
   DialogTitle,
} from "@/components/ui/dialog";
import type { ZodObjectOrWrapped } from "~/components/ui/auto-form/utils";
import type { Config } from "~/components/ui/auto-form";
import type { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const props = defineProps<{
   title: string
   description: string
   schema: T
   fieldConfig?: Config<z.infer<T>>
   callback: (data: z.infer<T>, passthrough?: any) => void
   passthrough?: any
   defaultValues?: z.infer<T>
}>();

const form = useForm({
   validationSchema: toTypedSchema(props.schema),
});

const handleSubmit = (data: z.infer<T>) => {
   props.callback(data, props.passthrough);
   isOpen.value = false;
};

onMounted(() => {
   if (props.defaultValues) {
      form.setValues(props.defaultValues);
   }
});
</script>

<style scoped></style>
