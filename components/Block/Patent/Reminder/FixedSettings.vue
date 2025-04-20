<template>
   <div
      class="group rounded-[100%] bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/50 p-4 shadow-xl flex flex-col gap-4 fixed right-5 bottom-5 transition-all duration-300 ease-in-out overflow-hidden w-[60px] h-[60px] hover:w-64 hover:h-32 focus:w-64 focus:h-32 hover:rounded-lg"
      role="region"
      aria-label="Patents Reminder Settings"
      tabindex="0"
   >
      <!-- Gear Icon (visible when not hovered or focused) -->
      <div
         class="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 group-focus:opacity-0 transition-opacity duration-200 z-10"
      >
         <Icon
            name="ic:round-settings"
            class="w-5 h-5 text-zinc-700 dark:text-zinc-300"
            aria-hidden="true"
         />
      </div>

      <!-- Settings Components (visible when hovered or focused) -->
      <div
         class="flex flex-col gap-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 z-20"
      >
         <Tabs
            v-model="patentsReminder.settings.value.period"
            class="w-full"
         >
            <TabsList
               class="bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-300/50 dark:border-zinc-700/50"
            >
               <TabsTrigger
                  value="days"
                  class="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-800 dark:data-[state=active]:text-zinc-100"
               >
                  每日
               </TabsTrigger>
               <TabsTrigger
                  value="weeks"
                  class="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-800 dark:data-[state=active]:text-zinc-100"
               >
                  每週
               </TabsTrigger>
               <TabsTrigger
                  value="months"
                  class="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-800 dark:data-[state=active]:text-zinc-100"
               >
                  每月
               </TabsTrigger>
               <TabsTrigger
                  value="years"
                  class="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-800 dark:data-[state=active]:text-zinc-100"
               >
                  每年
               </TabsTrigger>
            </TabsList>
         </Tabs>
         <Button
            variant="outline"
            class="w-full"
            @click="patentsReminder.settings.value.displayEmptyPeriods = !patentsReminder.settings.value.displayEmptyPeriods"
         >
            {{ patentsReminder.settings.value.displayEmptyPeriods ? '隱藏' : '顯示' }}空白區間
         </Button>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Inject the patentsReminder from the parent context
const patentsReminder = inject("patentsReminder") as ReturnType<
  typeof useDatabasePatentsReminder
>;
</script>
