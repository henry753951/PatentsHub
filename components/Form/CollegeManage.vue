<template>
   <div class="flex flex-col h-full">
      <!-- 標題和新增學院按鈕 -->
      <div class="flex items-center justify-between pt-6 pb-2 px-6">
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
      <OverlayScrollbarsComponent
         :options="{ scrollbars: { autoHide: 'leave' } }"
         class="h-full min-h-0 px-6"
      >
         <Accordion
            collapsible
            class="w-full"
            type="single"
         >
            <AccordionItem
               v-for="college in colleges"
               :key="college.CollegeID"
               :value="college.CollegeID.toString()"
            >
               <ContextMenu>
                  <ContextMenuTrigger as-child>
                     <AccordionTrigger
                        class="flex items-center justify-between"
                     >
                        <span class="text-lg font-medium">
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
                        @click="collegesStore.delete(college.CollegeID)"
                     >
                        刪除學院
                     </ContextMenuItem>
                  </ContextMenuContent>
               </ContextMenu>

               <AccordionContent>
                  <div
                     v-if="college.departments?.length"
                     class="space-y-2 rounded-lg bg-gray-100 dark:bg-zinc-900 p-3"
                  >
                     <div
                        v-for="department in college.departments"
                        :key="department.DepartmentID"
                        :class="[
                           'rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow flex items-center justify-between',
                           selectable && isSelected(department)
                              ? 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700'
                              : 'bg-white dark:bg-zinc-800',
                        ]"
                        @click="
                           selectable ? selectDepartment(department) : null
                        "
                     >
                        <span class="font-medium">
                           {{ department.Name }}
                        </span>
                        <DropdownMenu>
                           <DropdownMenuTrigger as-child>
                              <Button
                                 variant="ghost"
                                 size="sm"
                              >
                                 <MoreHorizontalIcon class="h-4 w-4" />
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent>
                              <DropdownMenuItem
                                 class="text-red-600"
                                 @click="
                                    collegesStore.deleteDepartment(
                                       college.CollegeID,
                                       department.DepartmentID,
                                    )
                                 "
                              >
                                 刪除系所
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                 @click="
                                    openAutoModal(
                                       '編輯系所',
                                       '更新系所資料',
                                       schemas.department,
                                       updateDepartment,
                                       fields.department,
                                       {
                                          collegeID: department.CollegeID,
                                          departmentID: department.DepartmentID,
                                       },
                                       {
                                          name: department.Name,
                                          description:
                                             department.Description || '',
                                       },
                                    )
                                 "
                              >
                                 編輯系所
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                  </div>
                  <div
                     v-else
                     class="text-muted-foreground text-sm p-4"
                  >
                     尚無系所
                  </div>
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </OverlayScrollbarsComponent>
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
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { Checkbox } from "~/components/ui/checkbox";
import { PlusIcon, MoreHorizontalIcon } from "lucide-vue-next";
import type { Config } from "~/components/ui/auto-form/interface";
import { z } from "zod";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

type Department = RouterOutput["data"]["college"]["getColleges"][0]["departments"][0];
// Props 定義
const props = defineProps<{
   selectable?: boolean
   modelValue?: Department | null // 單選，允許 null
}>();

const emits = defineEmits<{
   (e: "update:modelValue", value: Department | null): void
}>();

// Pinia store
const collegesStore = useCollegesStore();
const { colleges } = storeToRefs(collegesStore);

// 管理選中的系所（單選）
const selectedDepartment = ref<Department | null>(props.modelValue || null);

const { openAutoModal } = useModals();

// 載入初始資料
onMounted(async () => {
   await collegesStore.refresh();
});

// 同步 v-model
watch(
   () => props.modelValue,
   (newValue) => {
      selectedDepartment.value = newValue || null;
   },
);

watch(selectedDepartment, (newValue) => {
   emits("update:modelValue", newValue);
});

// 檢查系所是否被選中
const isSelected = (department: Department) => {
   return selectedDepartment.value?.DepartmentID === department.DepartmentID;
};

// 選擇系所（單選）
const selectDepartment = (department: Department) => {
   if (isSelected(department)) {
      selectedDepartment.value = null; // 取消選擇
   }
   else {
      selectedDepartment.value = department; // 選擇新系所
   }
};

const schemas = {
   college: z.object({
      name: z
         .string({ required_error: "學院名稱不可為空" })
         .nonempty("學院名稱不可為空"),
      description: z.string().optional(),
   }),
   department: z.object({
      name: z
         .string({ required_error: "系所名稱不可為空" })
         .nonempty("系所名稱不可為空"),
      description: z.string().optional(),
   }),
};

const fields = {
   college: {
      name: {
         label: "學院名稱",
      },
      description: {
         label: "學院描述",
      },
   } as Config<z.infer<typeof schemas.college>>,
   department: {
      name: {
         label: "系所名稱",
      },
      description: {
         label: "系所描述",
      },
   } as Config<z.infer<typeof schemas.department>>,
};

// 新增學院
const addCollege = async (
   data: z.infer<typeof schemas.college>,
   passthrough: any,
) => {
   await collegesStore.insert(data.name, data.description || "");
};

// 新增系所
const addDepartment = async (
   data: z.infer<typeof schemas.department>,
   passthrough: { collegeID: number },
) => {
   await collegesStore.insertWithDepartment(
      passthrough.collegeID,
      data.name,
      data.description || "",
   );
};

// 更新系所
const updateDepartment = async (
   data: z.infer<typeof schemas.department>,
   passthrough: { collegeID: number, departmentID: number },
) => {
   await collegesStore.updateDepartment(
      passthrough.departmentID,
      passthrough.collegeID,
      data.name,
      data.description || "",
   );
};
</script>
