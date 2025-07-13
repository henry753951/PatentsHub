<template>
   <Popover>
      <PopoverTrigger as-child>
         <div
            class="flex gap-2 items-center py-4 px-5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 justify-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 h-[88px]"
         >
            <Icon
               name="ic:round-plus"
               class="w-8 h-8 text-zinc-500"
            />
            <div class="text-zinc-500">
               {{ chooseText ? chooseText : "新增發明人" }}
            </div>
         </div>
      </PopoverTrigger>
      <PopoverContent
         class="max-w-[var(--radix-popper-anchor-width)] rounded-xl min-w-[350px]"
      >
         <div class="flex items-center justify-between pb-4">
            <div class="font-bold">
               選擇發明人
            </div>
            <Button
               variant="ghost"
               @click="showAddModal = true"
            >
               <Icon name="ic:round-add" />
            </Button>
         </div>
         <Input
            v-model="search"
            placeholder="搜尋發明人"
            class="w-full mb-4"
         />
         <OverlayScrollbarsComponent class="max-h-[300px]">
            <BlockPatentInventorRow
               v-for="inventor in inventors"
               :key="inventor.InventorID"
               :contact-info-id="inventor.contactInfo.ContactInfoID"
               tabindex="0"
               class="h-[88px] mb-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-700"
               :name="inventor.contactInfo?.Name ?? ''"
               :job="inventor.contactInfo?.Role ?? ''"
               :belong="{
                  college: inventor.department?.college.Name ?? '',
                  department: inventor.department?.Name ?? '',
               }"
               @click.enter="
                  isOpen = false;
                  emits('select', {
                     id: inventor.InventorID,
                     name: inventor.contactInfo?.Name ?? '',
                     job: inventor.contactInfo?.Role ?? '',
                     belong: {
                        college: inventor.department?.college.Name ?? '',
                        department: inventor.department?.Name ?? '',
                     },
                  });
               "
            />
         </OverlayScrollbarsComponent>
      </PopoverContent>
   </Popover>
   <FormInventorEdit
      :is-open="showAddModal"
      title="新增發明人"
      description="新增發明人至清單"
      @submit="handleAddSubmit"
      @close="showAddModal = false"
   />
</template>

<script lang="ts" setup>
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

const { open } = useModals();
const { chooseText } = defineProps<{
   chooseText?: string
}>();
const isOpen = inject("popoverState", ref(false));
const showAddModal = ref(false);

interface Inventor {
   id: number
   name: string
   job: string
   belong: {
      college: string
      department: string
   }
}

const search = ref<string>("");
const {
   data: inventors,
   filter,
   status,
   crud,
   forceRefresh,
} = useDatabaseInventor({});

const handleAddSubmit = async (data: {
   name: string
   email?: string
   officeNumber?: string
   phoneNumber?: string
   role: string
   departmentID: number
   note?: string
}) => {
   if (data.departmentID === undefined) {
      throw new Error("請選擇系所");
   }
   await crud.createInventor({
      department: {
         connect: { DepartmentID: data.departmentID },
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
};
watchThrottled(
   search,
   () => {
      filter.value = {
         contactInfo: {
            Name: {
               contains: search.value,
            },
         },
      };
   },
   {
      throttle: 500,
   },
);
onMounted(() => {
   // 強制觸發查詢全部發明人
   filter.value = {};
});

const emits = defineEmits<{
   (e: "select", inventor: Inventor): void
}>();
</script>

<style scoped></style>
