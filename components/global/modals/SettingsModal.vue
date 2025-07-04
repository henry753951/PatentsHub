<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent
            :blur="true"
            class="!max-w-screen-lg overflow-hidden flex flex-col py-2 px-2"
         >
            <DialogHeader class="select-none pt-2 px-2">
               <DialogTitle class="text-2xl">設定</DialogTitle>
               <DialogDescription></DialogDescription>
            </DialogHeader>
            <BlockSettingsPanel :default-page="props.defaultPage" />
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup>
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogDescription,
   DialogTitle,
} from "@/components/ui/dialog";
const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const props = defineProps({
   defaultPage: {
      type: String,
      default: "一般",
   },
});
</script>

<style scoped></style>
