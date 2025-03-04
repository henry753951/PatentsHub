<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent class="w-[90%] h-[90%] max-w-none p-1 flex flex-col">
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup>
import type { FormPatentCreate } from "#components";
import {
   Dialog,
   DialogContent,
} from "@/components/ui/dialog";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const { props } = defineProps<{
   props: Record<string, any>
}>();

</script>

<style scoped></style>
