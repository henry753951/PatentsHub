<template>
   <div class="p-6 max-w-4xl mx-auto">
      <!-- 標題和新增學院按鈕 -->
      <div class="flex items-center justify-between mb-6">
         <h1 class="text-2xl font-bold">
            學院管理
         </h1>
         <Button
            @click="
               openAutoModal(
                  '新增學院',
                  '新增學院至清單',
                  schemas.college,
                  addCollege,
                  fields.college,
               )
            "
         >
            <PlusIcon class="mr-2 h-4 w-4" />
            新增學院
         </Button>
      </div>

      <!-- 學院列表 -->
      <Accordion
         type="single"
         collapsible
         class="w-full"
      >
         <AccordionItem
            v-for="college in collages"
            :key="college.CollegeID"
            :value="college.CollegeID.toString()"
         >
            <ContextMenu>
               <ContextMenuTrigger as-child>
                  <AccordionTrigger class="flex items-center justify-between">
                     <span
                        class="text-gray-700 hover:text-gray-900 cursor-pointer"
                     >
                        {{ college.Name }}
                     </span>
                  </AccordionTrigger>
               </ContextMenuTrigger>
               <ContextMenuContent>
                  <ContextMenuItem
                     @click="
                        openAutoModal(
                           '新增系所',
                           '新增系所至清單',
                           schemas.department,
                           addDepartment,
                           fields.department,
                           { collegeID: college.CollegeID },
                        )
                     "
                  >
                     新增系所
                  </ContextMenuItem>
                  <ContextMenuItem
                     class="text-red-600"
                     @click="deleteCollege(college.CollegeID)"
                  >
                     刪除學院
                  </ContextMenuItem>
               </ContextMenuContent>
            </ContextMenu>

            <AccordionContent>
               <div
                  v-if="college.departments?.length"
                  class="space-y-1"
               >
                  <div
                     v-for="department in college.departments"
                     :key="department.DepartmentID"
                     class="flex items-center justify-between py-1"
                  >
                     <ContextMenu>
                        <ContextMenuTrigger as-child>
                           <span
                              class="text-gray-700 hover:text-gray-900 cursor-pointer"
                           >
                              {{ department.Name }}
                           </span>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                           <ContextMenuItem
                              class="text-red-600"
                              @click="
                                 deleteDepartment(
                                    college.CollegeID,
                                    department.DepartmentID,
                                 )
                              "
                           >
                              刪除系所
                           </ContextMenuItem>
                        </ContextMenuContent>
                     </ContextMenu>
                  </div>
               </div>
               <div
                  v-else
                  class="text-muted-foreground text-sm"
               >
                  尚無系所
               </div>
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   </div>
</template>

<script setup lang="ts">
import {
   Accordion,
   AccordionItem,
   AccordionTrigger,
   AccordionContent,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
   ContextMenu,
   ContextMenuTrigger,
   ContextMenuContent,
   ContextMenuItem,
} from "~/components/ui/context-menu";
import { PlusIcon } from "lucide-vue-next";
import type { Config } from "~/components/ui/auto-form/interface";
import { z } from "zod";
const { openAutoModal } = useModals();
// Pinia store
const collagesStore = useCollagesStore();
const { collages } = storeToRefs(collagesStore);

// 載入初始資料
onMounted(async () => {
   await collagesStore.refresh();
});

const schemas = {
   college: z.object({
      name: z
         .string({ required_error: "學院名稱不可為空" })
         .nonempty("學院名稱不可為空"),
   }),
   department: z.object({
      name: z
         .string({ required_error: "系所名稱不可為空" })
         .nonempty("系所名稱不可為空"),
   }),
};
const fields = {
   college: {
      name: {
         label: "學院名稱",
      },
   } as Config<z.infer<typeof schemas.college>>,
   department: {
      name: {
         label: "系所名稱",
      },
   } as Config<z.infer<typeof schemas.department>>,
};

// 新增學院
const addCollege = async (
   data: z.infer<typeof schemas.college>,
   passthrough: any,
) => {
   await collagesStore.insert(data.name);
};

// 新增系所
const addDepartment = async (
   data: z.infer<typeof schemas.department>,
   passthrough: { collegeID: number },
) => {
   await collagesStore.insertWithDepartment(passthrough.collegeID, data.name);
};

// 刪除系所
const deleteDepartment = async (collegeID: number, departmentID: number) => {
   await collagesStore.deleteDepartment(collegeID, departmentID);
};

// 刪除學院
const deleteCollege = async (collegeID: number) => {
   await collagesStore.delete(collegeID);
};
</script>

<style scoped>
/* 移除自訂邊框，完全依賴 shadcn 預設樣式 */
</style>
