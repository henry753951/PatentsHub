<template>
   <div class="container mx-auto py-3">
      <h2 class="text-2xl font-bold">
         置頂專利
      </h2>

      <div class="grid grid-cols-1 gap-4">
         <BlockPatentRow
            v-for="patent in pinnedPatents"
            :key="patent.PatentID"
            :patent="patent"
            class="rounded-lg"
            @click="open('PatentModal', { props: { patentId: patent.PatentID } })"
         />
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
