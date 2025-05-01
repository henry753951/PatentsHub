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
               {{ chooseText ? chooseText : "新增發明人" }}
            </div>
         </div>
      </PopoverTrigger>

      <PopoverContent
         class="max-w-[var(--radix-popper-anchor-width)] rounded-xl min-w-[350px]"
      >
         <div class="pb-4 font-bold">
            選擇發明人
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
               tabindex="0"
               class="h-[88px] mb-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-700"
               :name="inventor.contactInfo?.Name ?? ''"
               :job="inventor.contactInfo?.Role ?? ''"
               :belong="{
                  college: inventor.department?.college?.Name ?? '',
                  department: inventor.department?.Name ?? '',
               }"
               @click="selectInventor(inventor)"
               @keydown.enter="selectInventor(inventor)"
            />
         </OverlayScrollbarsComponent>
      </PopoverContent>
   </Popover>
</template>
<script setup lang="ts">
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
const { chooseText } = defineProps<{
   chooseText?: string
}>();

// 型別符合資料庫格式
interface College {
   Name: string
}
interface Department {
   Name: string
   college: College
}
interface ContactInfo {
   Name: string
   Role: string
}
interface Inventor {
   InventorID: number
   department: Department
   contactInfo: ContactInfo
}

const emits = defineEmits<{
   (e: "select", inventor: Inventor): void
}>();

const selectInventor = (inventor: any) => {
   emits("select", inventor as Inventor);
};

const search = ref("");

const { data: inventors, refresh } = await useAsyncData(async () => {
   const { $trpc } = useNuxtApp();
   return await $trpc.data.inventor.getInventors.query({
      contactInfo: {
         Name: {
            contains: search.value,
         },
      },
   });
});

watchThrottled(
   search,
   () => {
      refresh();
   },
   { throttle: 500 },
);
</script>
