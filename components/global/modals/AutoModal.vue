<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{{ props.title }}</DialogTitle>
               <DialogDescription>{{ props.description }}</DialogDescription>
            </DialogHeader>
            <AutoForm
               class="space-y-6"
               :schema="props.schema"
               :field-config="props.fieldConfig"
               @submit="onSubmit"
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
const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const { props } = defineProps<{
   props: {
      title: string
      description: string
      schema: T
      fieldConfig?: Config<z.infer<T>>
      callback: (data: z.infer<T>, passthrough?: any) => void
      passthrough?: any
   }
}>();

const onSubmit = async (data: z.infer<T>) => {
   props.callback(data, props.passthrough);
   console.log(data);
   isOpen.value = false;
};
</script>

<style scoped></style>
