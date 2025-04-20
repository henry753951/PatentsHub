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
import { computed } from "vue";

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
   deleteCallback?: () => void
}>();

const {
   data: patentInfo,
   patentStatus,
   patentRecords,
   patentMaintainances,
   refresh,
   crud,
   status,
} = useDatabasePatent(props.patent.PatentId);

// 動態設置「置頂/取消置頂」按鈕的屬性
const pinAction = computed(() => {
   const isPinned = patentInfo.value?.Pinned ?? false;
   return {
      title: isPinned ? "取消置頂" : "置頂",
      description: isPinned ? "此動作將取消此專利的置頂狀態。" : "此動作將把此專利置頂。",
      actions: [
         {
            title: isPinned ? "取消置頂" : "置頂",
            type: "secondary",
            onClick: async () => {
               try {
                  // 根據當前狀態切換 pinned 值
                  await crud.updatePatent([{ Pinned: !isPinned }]);
                  console.log(`專利已${isPinned ? "取消置頂" : "置頂"}，pinned: ${!isPinned}`);
                  isOpen.value = false; // 關閉對話框
               }
               catch (error) {
                  console.error("切換置頂狀態失敗:", error);
               }
            },
         },
      ],
   };
});

// 動態生成 actionItems
const actionItems = computed(() => [
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
                        isOpen.value = false;
                        props.deleteCallback?.();
                     },
                  },
               });
            },
         },
      ],
   },
   {
      title: "刷新專利",
      description: "此動作將重新抓取此專利的資料。",
      actions: [
         {
            title: "刷新",
            type: "secondary",
            onClick: () => {
               refreshNuxtData(["patents", `patent-${props.patent.PatentId}`]);
               isOpen.value = false;
            },
         },
      ],
   },
   pinAction.value, // 動態添加置頂/取消置頂選項
]);
</script>

<style scoped></style>
