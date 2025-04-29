<template>
   <div class="p-4">
      <template v-if="configData?.discord">
         <h1 class="text-xl font-semibold mb-4 text-gray-800">
            連線設定
         </h1>
         <div class="space-y-4">
            <div>
               <label class="block text-sm text-gray-600 mb-1">Discord Token</label>
               <InputText
                  v-model="configData.discord.token"
                  class="w-full"
                  placeholder="輸入 Discord Token"
               />
            </div>
            <div>
               <label class="block text-sm text-gray-600 mb-1">Guild ID</label>
               <InputText
                  v-model="configData.discord.guildId"
                  class="w-full"
                  placeholder="輸入 Guild ID"
               />
            </div>
            <div>
               <label class="block text-sm text-gray-600 mb-1">Log Channel ID</label>
               <InputText
                  v-model="configData.discord.channelIds.log"
                  class="w-full"
                  placeholder="輸入 Log Channel ID"
               />
            </div>
            <div>
               <label class="block text-sm text-gray-600 mb-1">Database Backup Channel ID</label>
               <InputText
                  v-model="configData.discord.channelIds.databaseBackup"
                  class="w-full"
                  placeholder="輸入 Database Backup Channel ID"
               />
            </div>
            <Button
               label="儲存"
               class="w-full"
               :disabled="isSaving"
               :loading="isSaving"
               @click="saveConfig"
            />
         </div>
      </template>
   </div>
</template>

<script lang="ts" setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { reactive, ref } from "vue";
import { useAsyncData, useNuxtApp } from "nuxt/app";

const { $trpc } = useNuxtApp();

// 從伺服器獲取配置
const { data: configData } = useAsyncData(
   "config",
   async () => await $trpc.app.config.readConfig.query(),
);

// 儲存狀態
const isSaving = ref(false);

// 儲存配置
const saveConfig = async () => {
   if (!configData.value) return;
   isSaving.value = true;
   try {
      await $trpc.app.config.writeConfig.mutate(configData.value);
   }
   finally {
      isSaving.value = false;
   }
};
</script>
