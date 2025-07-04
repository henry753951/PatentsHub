<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent
            class="w-[90%] h-[90%] max-w-none flex flex-col p-0 overflow-hidden"
            @interact-outside.prevent
         >
            <DialogHeader class="hidden">
               <DialogTitle>專利資訊</DialogTitle>
               <DialogDescription></DialogDescription>
            </DialogHeader>
            <OverlayScrollbarsComponent
               :options="{ scrollbars: { autoHide: 'leave' } }"
            >
               <BlockPatentView
                  :patent-id="props.patentId"
                  :default-page="props.defaultPage"
               />
            </OverlayScrollbarsComponent>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup>
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const props = defineProps<{
   patentId: number
   defaultPage?: "basic" | "maintenance" | "finance" | "record"
}>();

onMounted(() => {});
</script>

<style scoped></style>
