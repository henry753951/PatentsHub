<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent class="w-[90%] h-[90%] max-w-none p-1 flex flex-col">
            <OverlayScrollbarsComponent
               :options="{ scrollbars: { autoHide: 'leave' } }"
            >
               <BlockPatentView :patent-id="props.patentId" />
            </OverlayScrollbarsComponent>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup>
import {
   Dialog,
   DialogContent,
} from "@/components/ui/dialog";

const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const { props } = defineProps<{
   props: {
      patentId?: string
   }
}>();

</script>

<style scoped></style>
