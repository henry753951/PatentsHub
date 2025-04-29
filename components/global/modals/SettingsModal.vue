<template>
   <div>
      <Dialog
         v-model:open="isOpen"
      >
         <DialogContent class="!max-w-screen-md overflow-hidden flex flex-col">
            <DialogHeader class="select-none">
               <DialogTitle>設定</DialogTitle>
               <DialogDescription></DialogDescription>
            </DialogHeader>
            <BlockSettingsPanel />
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

</script>

<style scoped></style>
