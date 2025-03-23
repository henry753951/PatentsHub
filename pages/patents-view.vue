<template>
   <div
      class="w-full text-zinc-800 mx-auto container dark:text-zinc-100 min-h-full py-5"
   >
      <div class="flex gap-6 flex-col">
         <header>
            <div
               class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
               <div>
                  <h1 class="text-2xl font-bold">
                     專利總表
                  </h1>
                  <p class="text-zinc-600 dark:text-zinc-400 mt-1">
                     查看或篩選專利資料
                  </p>
               </div>
               <div class="flex flex-col sm:flex-row gap-4">
                  <div></div>
                  <Button
                     class="bg-gradient-to-r from-blue-500 to-indigo-600 border-0 hover:from-blue-600 hover:to-indigo-700 text-white"
                     @click="
                        open('PatentCreateModal', {
                           props: {},
                        })
                     "
                  >
                     <Plus class="w-4 h-4 mr-2" />
                     添加專利
                  </Button>
               </div>
            </div>
         </header>

         <div class="grid grid-cols-1 gap-4">
            <BlockPatentRow
               v-for="patent in data"
               :key="patent.PatentID"
               :patent="patent"
               class="rounded-lg"
               @click="
                  open('PatentModal', { props: { patentId: patent.PatentID } })
               "
            />
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { Plus } from "lucide-vue-next";
const { open } = useModals();
definePageMeta({
   name: "patents-view",
});

const { data, forceRefresh, fillter } = useDatabasePatents();
</script>

<style scoped></style>
