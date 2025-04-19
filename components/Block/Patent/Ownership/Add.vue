<!-- components/AddPatentOwner.vue -->
<template>
   <Popover>
      <PopoverTrigger as-child>
         <div
            class="flex gap-2 items-center py-4 px-5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 justify-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 select-none h-[88px]"
         >
            <Icon
               name="ic:round-plus"
               class="w-8 h-8 text-zinc-500"
            />
            <div class="text-zinc-500">
               {{ chooseText ? chooseText : "新增所有權人" }}
            </div>
         </div>
      </PopoverTrigger>

      <PopoverContent
         class="max-w-[var(--radix-popper-anchor-width)] rounded-xl min-w-[350px]"
      >
         <div class="pb-4 font-bold">
            新增所有權人
         </div>
         <form
            class="mb-4 space-y-4"
            @submit.prevent="submitOwner"
         >
            <div>
               <label class="block text-sm font-medium mb-1">所有權人名字</label>
               <InputText
                  v-model="newOwnerName"
                  placeholder="輸入名字"
                  required
                  class="w-full"
                  autocomplete="off"
               />
            </div>
            <button
               type="submit"
               class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
               確認新增
            </button>
         </form>
      </PopoverContent>
   </Popover>
</template>

<script setup lang="ts">
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import InputText from "primevue/inputtext"; // 引入 PrimeVue 的 InputText 組件

// Props
const { chooseText, patentID } = defineProps<{
   chooseText?: string
   patentID: number
}>();

// 型別定義，與 BlockPatentOwnershipEditList 和 Prisma 模型對齊
interface Owner {
   OwnerID: number
   Name: string
   OwnershipPercentage: number
}

// Emits
const emits = defineEmits<{
   (e: "select", owner: Owner): void
}>();

// 新所有權人名字
const newOwnerName = ref("");

// 提交新增
const submitOwner = () => {
   if (!newOwnerName.value.trim()) {
      alert("名字不能為空");
      return;
   }
   emits("select", {
      OwnerID: 0, // 表示新增
      Name: newOwnerName.value.trim(),
      OwnershipPercentage: 0, // 預設為 0
   });
   newOwnerName.value = ""; // 重置輸入框
};
</script>

<style scoped></style>
