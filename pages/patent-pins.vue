<template>
   <div class="w-full text-zinc-800 mx-auto container dark:text-zinc-100 min-h-full py-5">
      <div class="flex gap-6 flex-col">
         <BlockHeader
            title="至頂專利"
            description="查看釘選的專利資料"
         />

         <div class="grid grid-cols-1 gap-4">
            <BlockPatentRow
               v-for="patent in pinnedPatents"
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
import { computed } from "vue";
const { open } = useModals();

// 定義頁面元數據
definePageMeta({
   name: "pins",
});

// 獲取所有專利資料
const { data: allPatents, forceRefresh } = useDatabasePatents();

// 篩選出 pinned 為 true 的專利
const pinnedPatents = computed(() => {
   return allPatents.value?.filter((patent) => patent.Pinned) || [];
});
</script>

<style scoped></style>
