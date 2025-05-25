<template>
   <div
      class="w-full text-zinc-800 mx-auto container dark:text-zinc-100 min-h-full py-5 relative"
   >
      <div class="flex gap-2 flex-col mb-[4rem]">
         <BlockHeader
            title="專利總表"
            description="查看或篩選專利資料"
         >
            <div
               class="flex gap-6 items-center justify-between w-full max-w-[700px]"
            >
               <BlockPatentFilter
                  v-model:patent-filter="filter"
                  class="flex-1"
               />

               <Button
                  class="bg-gradient-to-r from-blue-500 to-indigo-600 border-0 hover:from-blue-600 hover:to-indigo-700 text-white"
                  @click="
                     open('PatentCreateModal', {
                        props: {},
                     })
                  "
               >
                  <Plus class="w-4 h-4 mr-1" />
                  新增專利
               </Button>
            </div>
         </BlockHeader>
         <div>
            <div class="flex py-2 justify-between select-none">
               <div class="flex gap-2 items-center">
                  <div
                     class="text-sm cursor-pointer px-2 py-1 rounded-md"
                     :class="{
                        'bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-blue-800 dark:text-blue-100 border border-blue-300 dark:border-blue-600':
                           selecte.enabled,
                        'bg-zinc-50 dark:bg-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-500':
                           !selecte.enabled,
                     }"
                     @click="
                        selecte.enabled = !selecte.enabled;
                        selecte.selectedPatents.clear();
                     "
                  >
                     {{ selecte.enabled ? "退出選取模式" : "選取模式" }}
                  </div>

                  <div
                     v-if="selecte.enabled"
                     class="text-sm cursor-pointer px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-blue-800 dark:text-blue-100"
                     @click="
                        data.forEach((item) => {
                           selecte.selectedPatents.add(item.PatentID);
                        })
                     "
                  >
                     全選
                  </div>
               </div>
               <div class="flex gap-2 items-center">
                  <Select v-model="orderBy.key">
                     <SelectTrigger class="!py-0 !px-0 bg-none!">
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
                  <button
                     class="flex items-center"
                     @click="toggleSortDirection"
                  >
                     <Icon
                        :name="
                           orderBy.direction === 'asc'
                              ? 'mdi:arrow-up'
                              : 'mdi:arrow-down'
                        "
                     />
                  </button>
               </div>
            </div>

            <Virtualizer
               v-slot="{ index }"
               :data="data"
               :scroll-ref="viewportRef"
               :overscan="1"
               :start-margin="100"
            >
               <BlockPatentRow
                  :patent="data[index]"
                  :flex-prop="data[index].flexProp"
                  class="rounded-lg mb-3 shadow-md hover:shadow-lg"
                  :style="{
                     boxShadow: selecte.enabled
                        ? selecte.selectedPatents.has(data[index].PatentID)
                           ? '0 0 0 2px rgba(59, 130, 246, 0.5)'
                           : undefined
                        : undefined,
                  }"
                  @click="
                     selecte.enabled
                        ? toggleSelect(data[index].PatentID)
                        : open('PatentModal', {
                           props: { patentId: data[index].PatentID },
                        })
                  "
               />
            </Virtualizer>
         </div>
      </div>
      <div
         v-if="selecte.enabled"
         class="fixed bottom-5 py-2 px-4 bg-blue-700/70 text-white rounded-lg shadow-lg backdrop-blur-md z-50"
      >
         <div class="flex gap-2 items-center justify-between">
            <div class="flex items-center gap-2">
               <Icon name="mdi:check" />
               已選取了 {{ selecte.selectedPatents.size }} 個專利
            </div>

            <div class="w-px bg-white/20 h-6 mx-2">
            </div>

            <div class="flex items-center gap-3 font-semibold">
               <div
                  v-if="selecte.selectedPatents.size > 0"
                  class="cursor-pointer hover:underline"
               >
                  匯出
               </div>
               <div
                  class="cursor-pointer hover:underline text-gray-300"
                  @click="
                     selecte.enabled = false;
                     selecte.selectedPatents.clear();
                  "
               >
                  取消
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { Plus } from "lucide-vue-next";
import { Virtualizer } from "virtua/vue";
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

const viewportRef = inject<Ref<HTMLElement>>("viewportRef");
const { data, forceRefresh, filter, order } = useDatabasePatents();
const { toggleSortDirection, orderBy, orderOptions } = order;

const selecte = ref({
   enabled: true,
   selectedPatents: new Set<number>(),
});
const toggleSelect = (patentId: number) => {
   if (selecte.value.selectedPatents.has(patentId)) {
      selecte.value.selectedPatents.delete(patentId);
   }
   else {
      selecte.value.selectedPatents.add(patentId);
   }
};
</script>

<style scoped></style>
