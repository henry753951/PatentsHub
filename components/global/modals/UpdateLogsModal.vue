<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent class="max-w-[800px]">
            <DialogHeader class="select-none">
               <DialogTitle>版本日誌 v{{ updateInfo.version }}</DialogTitle>
               <DialogDescription>
                  <div class="flex justify-between">
                     <div>
                        最新版本: v{{ updateInfo.version }} ({{
                           format(updateInfo.releaseDate, "yy/MM/dd HH:mm:ss")
                        }})
                     </div>
                     <div>當前版本: v{{ currentVersion }}</div>
                  </div>
               </DialogDescription>
            </DialogHeader>
            <div
               class="max-h-[60vh] overflow-y-auto bg-zinc-100 dark:bg-zinc-800 border rounded-md"
            >
               <div class="p-4">
                  <div class="text-sm text-muted-foreground">
                     <div
                        class="prose dark:prose-invert"
                        v-html="updateLogsHtml"
                     ></div>
                  </div>
               </div>
            </div>
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
import { format } from "date-fns";
import type { UpdateInfo } from "electron-updater";
import DOMPurify from "dompurify";

const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});
const { updateInfo } = defineProps({
   updateInfo: {
      type: Object as PropType<UpdateInfo>,
      required: true,
   },
});
const { currentVersion } = useUpdater();

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
   if (node.tagName === "A" && node.hasAttribute("href")) {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
   }
});
const updateLogsHtml = computed(() => {
   if (!updateInfo.releaseNotes) return "";

   const notes = Array.isArray(updateInfo.releaseNotes)
      ? updateInfo.releaseNotes.join("<br>")
      : updateInfo.releaseNotes;

   return DOMPurify.sanitize(notes, {
      ALLOWED_TAGS: [
         "b",
         "i",
         "em",
         "strong",
         "p",
         "br",
         "a",
         "ul",
         "li",
         "h3",
         "h2",
      ],
      ALLOWED_ATTR: ["href"], // Allow href for <a> tags
   });
});
</script>

<style scoped>

</style>
