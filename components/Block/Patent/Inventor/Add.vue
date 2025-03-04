<template>
   <Popover>
      <PopoverTrigger as-child>
         <div
            class="flex gap-2 items-center py-4 px-5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 justify-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 select-none"
         >
            <Icon
               name="ic:round-plus"
               class="w-8 h-8 text-zinc-500"
            />
            <div class="text-zinc-500">
               選擇主要發明人
            </div>
         </div>
      </PopoverTrigger>
      <PopoverContent class="w-[var(--radix-popper-anchor-width)] rounded-xl">
         <OverlayScrollbarsComponent>
         </OverlayScrollbarsComponent>
      </PopoverContent>
   </Popover>
</template>

<script lang="ts" setup>
interface Inventor {
   id: number
   name: string
   job: string
   belong: {
      college: string
      department: string
   }
}

const emits = defineEmits<{
   (e: "select", inventor: Inventor): void
}>();
</script>

<style scoped></style>
