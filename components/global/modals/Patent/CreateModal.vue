<template>
   <div>
      <Sheet v-model:open="isOpen">
         <SheetContent :side="props.side">
            <SheetHeader>
               <SheetTitle>新增專利</SheetTitle>
               <SheetDescription>
                  請填寫專利資訊
               </SheetDescription>
            </SheetHeader>
         </SheetContent>
      </Sheet>
   </div>
</template>

<script lang="ts" setup>
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet";

const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const { props } = defineProps<{
   props: Record<string, any>
}>();
</script>

<style scoped></style>
