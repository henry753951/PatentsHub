<template>
   <div>
      <Sheet v-model:open="isOpen">
         <SheetContent :side="props.side">
            <SheetHeader>
               <SheetTitle>新增專利</SheetTitle>
               <SheetDescription> 請填寫專利資訊 </SheetDescription>
            </SheetHeader>
            {{ count }}
            <Button @click="count++">
               +1
            </Button>
            <Button @click="open('Example2Modal')">
               +1
            </Button>
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

const count = ref(0);
</script>

<style scoped></style>
