<template>
   <div
      class="w-full text-zinc-800 mx-auto container dark:text-zinc-100 min-h-full py-5"
   >
      <div class="flex gap-6 flex-col">
         <BlockHeader
            title="專利總表"
            description="查看或篩選專利資料"
         >
            <div class="flex gap-6 items-center justify-between">
               <div class="flex gap-1 items-center">
                  <Select v-model="orderBy.key">
                     <SelectTrigger class="mr-2 p-2 border rounded">
                        <SelectValue placeholder="排序依據" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectItem
                              v-for="option in orderOptions"
                              :key="option.key"
                              :value="option.key"
                           >
                              {{ option.label }}
                           </SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  <Button
                     @click="toggleSortDirection"
                  >
                     {{ orderBy.direction === "asc" ? "↑" : "↓" }}
                  </Button>
               </div>
               <Button
                  class="bg-gradient-to-r from-blue-500 to-indigo-600 border-0 hover:from-blue-600 hover:to-indigo-700 text-white"
                  @click="
                     open('PatentCreateModal', {
                        props: {},
                     })
                  "
               >
                  <Plus class="w-4 h-4 mr-1" />
                  添加專利
               </Button>
            </div>
         </BlockHeader>

         <div class="grid grid-cols-1 gap-4">
            <BlockPatentRow
               v-for="patent in data"
               :key="patent.PatentID"
               :patent="patent"
               :flex-prop="patent.flexProp"
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
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
const { open } = useModals();
definePageMeta({
   name: "patents-view",
});

const { data, forceRefresh, fillter, order } = useDatabasePatents();
const { toggleSortDirection, orderBy, orderOptions } = order;
</script>

<style scoped></style>
