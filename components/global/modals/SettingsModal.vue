<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent>
            <DialogHeader class="select-none">
               <DialogTitle>設定</DialogTitle>
               <DialogDescription>專利管理系統的設定</DialogDescription>
            </DialogHeader>
            <BlockSettings />
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
