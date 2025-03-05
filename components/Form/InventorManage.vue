<template>
   <div class="flex flex-col h-full">
      <!-- 標題和新增發明人按鈕 -->
      <div class="flex items-center justify-between pt-6 pb-2 px-6">
         <h1 class="text-2xl font-bold">
            發明人列表
         </h1>
         <Button
            :disabled="!props.department"
            @click="
               openAutoModal(
                  '新增發明人',
                  '新增發明人至清單',
                  schemas.inventor,
                  addInventor,
                  fields.inventor,
                  { departmentID: props.department?.DepartmentID },
               )
            "
         >
            <PlusIcon class="mr-2 h-4 w-4" />
            新增發明人
         </Button>
      </div>
      <!-- 發明人列表 -->
      <OverlayScrollbarsComponent
         :options="{ scrollbars: { autoHide: 'leave' } }"
         class="h-full min-h-0 px-6"
      >
         <div
            v-if="status == 'pending'"
            class="text-muted-foreground text-sm p-4"
         >
            載入中...
         </div>
         <div
            v-else-if="inventors"
            class="space-y-2"
         >
            <div
               v-for="inventor in inventors"
               :key="inventor.InventorID"
               class="rounded-lg shadow-sm p-4 bg-white dark:bg-zinc-800 hover:shadow-md transition-shadow flex items-center justify-between"
            >
               <span class="font-medium">{{ inventor.Name }}</span>
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
                        @click="deleteInventor(inventor.InventorID)"
                     >
                        刪除發明人
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        @click="
                           openAutoModal(
                              '編輯發明人',
                              '更新發明人資料',
                              schemas.inventor,
                              updateInventor,
                              fields.inventor,
                              {
                                 inventorID: inventor.InventorID,
                              },
                              {
                                 name: inventor.Name,
                                 email: inventor.contactInfo?.Email || '',
                              },
                           )
                        "
                     >
                        編輯發明人
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
         <div
            v-else
            class="text-muted-foreground text-sm p-4"
         >
            請選擇系所
         </div>
      </OverlayScrollbarsComponent>
   </div>
</template>

<script lang="ts" setup>
import { Button } from "~/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { PlusIcon, MoreHorizontalIcon } from "lucide-vue-next";
import type { Config } from "~/components/ui/auto-form/interface";
import { z } from "zod";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

// 型態定義
type Department =
   RouterOutput["data"]["college"]["getColleges"][0]["departments"][0];

// Props 定義
const props = defineProps<{
   department?: Department
}>();

// Modal 管理
const { openAutoModal } = useModals();

// 發明人資料
const {
   data: inventors,
   fillter,
   crud,
   status,
   forceRefresh,
} = useDatabase().useInventor();

watch(
   () => props.department,
   async (department) => {
      fillter.value = { DepartmentID: department?.DepartmentID ?? undefined };
   },
);

// Schema 定義
const schemas = {
   inventor: z.object({
      name: z.string().nonempty("發明人姓名不可為空"),
      email: z.string().optional(),
   }),
};

const fields = computed(() => ({
   inventor: {
      name: { label: "發明人姓名" },
      email: { label: "電子信箱" },
   } as Config<z.infer<typeof schemas.inventor>>,
}));

const addInventor = async (
   data: z.infer<typeof schemas.inventor>,
   passthrough: { departmentID: number },
) => {
   if (!passthrough.departmentID) {
      throw new Error("系所 ID 未提供");
   }
   await crud.createInventor({
      Name: data.name,
      contactInfo: {
         create: {
            Email: data.email,
         },
      },
      department: {
         connect: {
            DepartmentID: passthrough.departmentID,
         },
      },
   });
   await forceRefresh();
};

const updateInventor = async (
   data: z.infer<typeof schemas.inventor>,
   passthrough: { inventorID: number, departmentID: number },
) => {
   if (!passthrough.inventorID) {
      throw new Error("發明人 ID 未提供");
   }
   await crud.updateInventor({
      where: { InventorID: passthrough.inventorID },
      data: {
         Name: data.name,
         contactInfo: {
            upsert: {
               create: {
                  Email: data.email,
               },
               update: {
                  Email: data.email,
               },
            },
         },
      },
   });
   await forceRefresh();
};

const deleteInventor = async (inventorID: number) => {
   await crud.deleteInventor({
      where: { InventorID: inventorID },
   });
   await forceRefresh();
};
</script>

<style scoped></style>
