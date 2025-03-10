<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 container mx-auto p-6 h-full">
    <!-- 左側：代理機構管理 -->
    <div
      class="h-full w-full bg-white rounded-lg shadow-md dark:bg-zinc-900 min-h-0 overflow-hidden"
    >
      <FormAgencyManage @selectAgency="handleAgencySelect" />
    </div>

    <!-- 右側：聯絡人列表或其他內容 -->
    <div
      class="h-full w-full bg-white rounded-lg shadow-md dark:bg-zinc-900 min-h-0 overflow-hidden"
    >
      <FormAgencyContactList
        v-if="selectedAgencyId"
        :agency-i-d="selectedAgencyId"
      />
      <div
        v-else
        class="p-6 text-center text-gray-500 dark:text-gray-400"
      >
        請選擇或新增事務所
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta } from "#imports";
import { storeToRefs } from "pinia";
import { useAgenciesStore } from "~/stores/agencies";
import { ref, onMounted } from "vue";

definePageMeta({
  name: "common-agencyManage",
});

// Pinia store
const agenciesStore = useAgenciesStore();
const { agencies, isInitialized } = storeToRefs(agenciesStore);

// 跟踪選中的事務所 ID
const selectedAgencyId = ref<number | null>(null);

// 載入初始資料
onMounted(async () => {
  if (!isInitialized.value) {
    try {
      await agenciesStore.refresh(); // 使用 refresh 加載數據
      if (agencies.value.length > 0) {
        selectedAgencyId.value = agencies.value[0].AgencyID;
      }
    } catch (error) {
      console.error("Failed to load agencies:", error);
    }
  }
});

// 處理事務所選擇事件
const handleAgencySelect = (agencyID: number) => {
  selectedAgencyId.value = agencyID;
};
</script>

<style scoped></style>