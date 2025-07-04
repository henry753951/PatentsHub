<template>
   <div class="flex flex-col h-full">
      <div class="flex items-center justify-between pt-6 pb-2 px-6">
         <h1 class="text-2xl font-bold">發明人列表</h1>
         <Button
            :disabled="!props.department"
            @click="openAddModal"
         >
            <PlusIcon class="mr-2 h-4 w-4" />
            新增發明人
         </Button>
      </div>
      <div class="flex items-center mb-4 px-6">
         <input
            v-model="search"
            type="text"
            placeholder="搜尋發明人..."
            class="w-full p-2 border rounded-md focus:outline-none"
         />
      </div>
      <OverlayScrollbarsComponent
         :options="{ scrollbars: { autoHide: 'leave' } }"
         class="flex-1 min-h-0 px-6"
      >
         <div
            v-if="status == 'pending'"
            class="text-muted-foreground text-sm p-4"
         >
            載入中...
         </div>
         <div
            v-else-if="inventors?.length"
            class="space-y-2"
         >
            <div
               v-for="inventor in inventors"
               :key="inventor.InventorID"
               class="rounded-lg shadow-sm p-4 bg-white dark:bg-zinc-800 hover:shadow-md transition-shadow flex items-center justify-between"
            >
               <span class="font-medium">{{ inventor.contactInfo?.Name }}</span>
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
                     <DropdownMenuItem @click="openEditModal(inventor)">
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

      <FormInventorEdit
         :is-open="showAddModal"
         title="新增發明人"
         description="新增發明人至清單"
         :initial-data="editData"
         @submit="handleAddSubmit"
         @close="showAddModal = false"
      />
      <FormInventorEdit
         :is-open="showEditModal"
         title="編輯發明人"
         description="更新發明人資料"
         :initial-data="editData"
         @submit="handleEditSubmit"
         @close="showEditModal = false"
      />
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
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
type Department =
   RouterOutput["data"]["college"]["getColleges"][0]["departments"][0];

const props = defineProps<{
   department?: Department;
}>();

const { data, filter, status, crud } = useDatabaseInventor({
   DepartmentID: props.department?.DepartmentID,
});
const search = ref("");
const inventors = computed(() => {
   const filteredData = (data.value || []).filter((inventor) => {
      const name = inventor.contactInfo?.Name || "";
      return name.includes(search.value);
   });
   return filteredData.slice().sort((a, b) => {
      const nameA = a.contactInfo?.Name || "";
      const nameB = b.contactInfo?.Name || "";
      return nameA.localeCompare(nameB, "zh-Hant-u-co-stroke");
   });
});

// watch(
//    () => props.department,
//    (department) => {
//       filter.value = { DepartmentID: department?.DepartmentID };
//    },
//    { immediate: true },
// );

watch(
   () => props.department,
   (department) => {
      if (department) {
         filter.value = { DepartmentID: department.DepartmentID };
      } else {
         filter.value = {};
      }
   },
   { immediate: true, deep: true },
);

const showAddModal = ref(false);
const showEditModal = ref(false);
const editData = ref<{
   name: string;
   email?: string;
   officeNumber?: string;
   phoneNumber?: string;
   role: string;
   note?: string;
   departmentID: number;
   collegeID: number;
}>();
const editInventorID = ref<number>();

const openAddModal = () => {
   if (!props.department) return;
   editData.value = {
      name: "",
      email: "",
      officeNumber: "",
      phoneNumber: "",
      role: "",
      note: "",
      departmentID: props.department.DepartmentID,
      collegeID: props.department.CollegeID,
   };
   showAddModal.value = true;
};

const openEditModal = (
   inventor: RouterOutput["data"]["inventor"]["getInventors"][0],
) => {
   editData.value = {
      name: inventor.contactInfo?.Name || "",
      email: inventor.contactInfo?.Email || "",
      officeNumber: inventor.contactInfo?.OfficeNumber || "",
      phoneNumber: inventor.contactInfo?.PhoneNumber || "",
      role: inventor.contactInfo?.Role || "",
      note: inventor.contactInfo?.Note || "",
      departmentID: inventor.department.DepartmentID,
      collegeID: inventor.department.CollegeID,
   };
   editInventorID.value = inventor.InventorID;
   showEditModal.value = true;
};

const handleAddSubmit = async (data: {
   name: string;
   email?: string;
   officeNumber?: string;
   phoneNumber?: string;
   role: string;
   departmentID: number;
   note?: string;
}) => {
   const departmentID = data.departmentID || props.department?.DepartmentID;
   if (!departmentID) throw new Error("系所 ID 未提供");
   await crud.createInventor({
      department: {
         connect: { DepartmentID: departmentID },
      },
      contactInfo: {
         create: {
            Name: data.name,
            Email: data.email,
            OfficeNumber: data.officeNumber,
            PhoneNumber: data.phoneNumber,
            Role: data.role,
            Note: data.note,
         },
      },
   });
   showAddModal.value = false;
   console.log("submit", data);
};

const handleEditSubmit = async (data: {
   departmentID: number;
   name: string;
   email?: string;
   officeNumber?: string;
   phoneNumber?: string;
   role: string;
   note?: string;
}) => {
   if (!editInventorID.value) return;
   await crud.updateInventor({
      where: { InventorID: editInventorID.value },
      data: {
         contactInfo: {
            upsert: {
               create: {
                  Name: data.name,
                  Email: data.email,
                  OfficeNumber: data.officeNumber,
                  PhoneNumber: data.phoneNumber,
                  Role: data.role,
                  Note: data.note,
               },
               update: {
                  Name: data.name,
                  Email: data.email,
                  OfficeNumber: data.officeNumber,
                  PhoneNumber: data.phoneNumber,
                  Role: data.role,
                  Note: data.note,
               },
            },
         },
         department: { connect: { DepartmentID: data.departmentID } },
      },
   });
   showEditModal.value = false;
};

const deleteInventor = async (inventorID: number) => {
   await crud.deleteInventor({ where: { InventorID: inventorID } });
};
</script>

<style scoped></style>
