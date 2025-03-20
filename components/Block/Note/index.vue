<template>
   <TooltipProvider :delay-duration="100">
      <Tooltip disable-hoverable-content>
         <TooltipTrigger as-child>
            <div
               class="py-1 px-1 rounded-full flex items-center justify-centercursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300 gap-1 select-none cursor-pointer"
               :class="{
                  'dark:text-zinc-200 text-gray-700': note,
                  'dark:text-zinc-500 text-zinc-400': !note,
               }"
               @click="openDialog()"
            >
               <Icon
                  name="mdi:note"
                  size="12px"
               />
               <Dialog v-model:open="dialogVisible">
                  <DialogContent
                     blur
                     @close-auto-focus.prevent
                     @open-auto-focus.prevent
                  >
                     <DialogHeader>
                        <DialogTitle>備註</DialogTitle>
                        <DialogDescription>
                           {{ note ? "編輯備註" : "新增備註" }}
                           <Badge
                              v-if="note"
                              severity="secondary"
                              class="ml-2"
                           >
                              {{ format(note.Date, "yyyy-MM-dd HH:mm") }}
                           </Badge>
                        </DialogDescription>
                     </DialogHeader>
                     <Input
                        v-model="dialogData.Title"
                        label="標題"
                        placeholder="輸入標題"
                     />
                     <Textarea
                        v-model="dialogData.Body"
                        label="內容"
                        placeholder="輸入內容"
                     />

                     <DialogFooter>
                        <Button
                           v-if="note"
                           variant="outline"
                           @click="noteService.deleteNote(props.noteKey)"
                        >
                           移除備註
                        </Button>
                        <Button
                           :disabled="!canSave"
                           @click="save"
                        >
                           {{ note ? "更新" : "新增" }}備註
                        </Button>
                     </DialogFooter>
                  </DialogContent>
               </Dialog>
            </div>
         </TooltipTrigger>
         <TooltipContent side="right">
            <div
               v-if="note"
               class="flex flex-col gap-1 py-1"
            >
               <div class="text-sm">
                  {{ note.Title }} - {{ format(note.Date, "yyyy-MM-dd") }}
               </div>
               <div class="rounded px-1 py-2 dark:bg-zinc-100 bg-zinc-700">
                  {{ note.Body ? note.Body : "無內容" }}
               </div>
            </div>
            <div v-else>
               新增備註
            </div>
         </TooltipContent>
      </Tooltip>
   </TooltipProvider>
</template>

<script lang="ts" setup>
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { toast } from "vue-sonner";
import Badge from "primevue/badge";
const props = defineProps<{
   noteKey: string
}>();

const dialogVisible = ref(false);
const noteService = useNoteService();
const note = noteService.getNoteRef(props.noteKey);
const dialogData = ref({ Title: "", Body: "" });
const canSave = computed(() => dialogData.value.Title);
const openDialog = () => {
   dialogVisible.value = true;
   if (note.value)
      dialogData.value = { Title: note.value.Title, Body: note.value.Body };
   else dialogData.value = { Title: "", Body: "" };
};
const save = () => {
   noteService.upsertNote(props.noteKey, dialogData.value);
   toast.success("備註已儲存");
};
</script>

<style scoped></style>
