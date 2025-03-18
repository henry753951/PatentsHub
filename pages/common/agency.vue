<template>
   <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4 container mx-auto p-6 h-full"
   >
      <!-- 左側：代理機構管理 -->
      <div
         class="h-full w-full bg-white rounded-lg shadow-md dark:bg-zinc-900 min-h-0 overflow-hidden px-6"
      >
         <FormAgencyManage v-model="selectedAgencyUnit" />
      </div>

      <!-- 右側：聯絡人列表或其他內容 -->
      <div
         class="h-full w-full bg-white rounded-lg shadow-md dark:bg-zinc-900 min-h-0 overflow-hidden"
      >
         <FormAgencyContactList
            v-if="selectedAgencyUnit"
            :selected-agency="selectedAgencyUnit"
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
definePageMeta({
   name: "common-agencyManage",
});

type AgencyUnit = RouterOutput["data"]["agency"]["getAgencies"][0];
const selectedAgencyUnit = ref<AgencyUnit>();
</script>

<style scoped></style>
