<template>
   <div class="flex flex-col h-full">
      <!-- 標題和新增學院按鈕 -->
      <div class="flex items-center justify-between mb-6 p-6">
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
         class="h-full min-h-0 p-6"
      >
         <Accordion
            collapsible
            class="w-full"
            type="single"
         >
            <AccordionItem
               v-for="college in collages"
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
                        @click="collagesStore.delete(college.CollegeID)"
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
                        class="border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow flex items-center justify-between"
                     >
                        <div class="flex items-center space-x-3">
                           <!-- 選擇功能 -->
                           <Checkbox
                              v-if="selectable"
                              :id="`dept-${department.DepartmentID}`"
                              :checked="isSelected(department)"
                              @update:checked="toggleSelection(department)"
                           />
                           <span class="font-medium">
                              {{ department.Name }}
                           </span>
                        </div>
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
                                    collagesStore.deleteDepartment(
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

interface Department {
   DepartmentID: number
   Name: string
   CollegeID: number
}

// Props 定義
const props = defineProps<{
   selectable?: boolean
   modelValue?: Department[]
}>();

const emits = defineEmits<{
   (e: "update:modelValue", value: Department[]): void
}>();

// Pinia store
const collagesStore = useCollagesStore();
const { collages } = storeToRefs(collagesStore);

// 管理選中的系所
const selectedDepartments = ref<Department[]>(props.modelValue || []);

const { openAutoModal } = useModals();

// 載入初始資料
onMounted(async () => {
   await collagesStore.refresh();
});

// 同步 v-model
watch(
   () => props.modelValue,
   (newValue) => {
      selectedDepartments.value = newValue || [];
   },
   { deep: true },
);

watch(
   selectedDepartments,
   (newValue) => {
      emits("update:modelValue", newValue);
   },
   { deep: true },
);

// 檢查系所是否被選中
const isSelected = (department: Department) => {
   return selectedDepartments.value.some(
      (d) => d.DepartmentID === department.DepartmentID,
   );
};

// 切換系所選擇狀態
const toggleSelection = (department: Department) => {
   if (isSelected(department)) {
      selectedDepartments.value = selectedDepartments.value.filter(
         (d) => d.DepartmentID !== department.DepartmentID,
      );
   }
   else {
      selectedDepartments.value.push(department);
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
   await collagesStore.insert(data.name, data.description || "");
};

// 新增系所
const addDepartment = async (
   data: z.infer<typeof schemas.department>,
   passthrough: { collegeID: number },
) => {
   await collagesStore.insertWithDepartment(
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
   await collagesStore.updateDepartment(
      passthrough.departmentID,
      passthrough.collegeID,
      data.name,
      data.description || "",
   );
};
</script>
