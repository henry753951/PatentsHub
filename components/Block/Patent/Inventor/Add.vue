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
               class="h-[88px] mb-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700"
               :name="inventor.Name"
               :job="inventor.contactInfo?.Position ?? ''"
               :belong="{
                  college: inventor.department?.college.Name ?? '',
                  department: inventor.department?.Name ?? '',
               }"
               @click="
                  emits('select', {
                     id: inventor.InventorID,
                     name: inventor.Name,
                     job: inventor.contactInfo?.Position ?? '',
                     belong: {
                        college: inventor.department?.college.Name ?? '',
                        department: inventor.department?.Name ?? '',
                     },
                  })
               "
            />
         </OverlayScrollbarsComponent>
      </PopoverContent>
   </Popover>
</template>

<script lang="ts" setup>
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

const { chooseText } = defineProps<{
   chooseText?: string
}>();
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
const { data: inventors, refresh } = await useAsyncData(async () => {
   const { $trpc } = useNuxtApp();
   return await $trpc.data.inventor.getInventors.query({
      Name: {
         contains: search.value,
      },
   });
});
watchThrottled(
   search,
   () => {
      refresh();
   },
   {
      throttle: 500,
   },
);

const emits = defineEmits<{
   (e: "select", inventor: Inventor): void
}>();
</script>

<style scoped></style>
