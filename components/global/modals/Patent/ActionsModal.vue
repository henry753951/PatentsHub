<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent>
            <DialogHeader class="select-none">
               <DialogTitle>更多動作</DialogTitle>
               <DialogDescription>{{ patent.title }}</DialogDescription>
               <Divider />
               <div class="space-y-4">
                  <div
                     v-for="item in actionItems"
                     :key="item.title"
                     class="flex items-center justify-between"
                  >
                     <div class="space-y-1">
                        <div class="text-sm font-semibold">
                           {{ item.title }}
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                           {{ item.description }}
                        </div>
                     </div>
                     <div class="space-x-2">
                        <Button
                           v-for="action in item.actions"
                           :key="action.title"
                           :variant="
                              action.type === 'danger' ? 'outlined' : undefined
                           "
                           :severity="action.type"
                           @click="action.onClick"
                        >
                           {{ action.title }}
                        </Button>
                     </div>
                  </div>
               </div>
            </DialogHeader>
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
   DialogFooter,
   DialogTitle,
} from "@/components/ui/dialog";
import Divider from "primevue/divider";
import Button from "primevue/button";
const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const { open } = useModals();

const props = defineProps<{
   patent: {
      PatentId: number
      title: string
   }
   refreshCallback?: () => void
}>();

const actionItems = ref([
   {
      title: "移除專利",
      description: "此動作將永久刪除此專利，並無法復原。",
      actions: [
         {
            title: "移除",
            type: "danger",
            onClick: () => {
               open("CommonTypeToConfirmModal", {
                  props: {
                     comfirmText: "移除",
                     comfirmCallback: async () => {
                        await removePatent(props.patent.PatentId);
                        props.refreshCallback?.();
                     },
                  },
               });
            },
         },
      ],
   },
]);

const removePatent = async (patentId: number) => {
   // await api.patent.remove(patentId);
};
</script>

<style scoped></style>
