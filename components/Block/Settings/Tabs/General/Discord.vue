<template>
   <template v-if="configData?.discord">
      <BlockSettingsRow
         title="Discord 連線設定"
         collapsible
      >
         <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
               <label class="block text-sm mb-1">Discord Token</label>
               <InputText
                  v-model="configData.discord.token"
                  class="w-full"
                  placeholder="輸入 Discord Token"
               />
            </div>
            <div>
               <label class="block text-sm mb-1">Guild ID</label>
               <InputText
                  v-model="configData.discord.guildId"
                  class="w-full"
                  placeholder="輸入 Guild ID"
               />
            </div>
            <div>
               <label class="block text-sm mb-1">Log Channel ID</label>
               <InputText
                  v-model="configData.discord.channelIds.log"
                  class="w-full"
                  placeholder="輸入 Log Channel ID"
               />
            </div>
            <div>
               <label class="block text-sm mb-1"
                  >Database Backup Channel ID</label
               >
               <InputText
                  v-model="configData.discord.channelIds.databaseBackup"
                  class="w-full"
                  placeholder="輸入 Database Backup Channel ID"
               />
            </div>
         </div>
         <div class="flex justify-end">
            <UiThingButton
               variant="secondary"
               :disabled="isSaving"
               :loading="isSaving"
               @click="saveConfig"
            >
               儲存設定
            </UiThingButton>
         </div>
      </BlockSettingsRow>
   </template>
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
   } finally {
      isSaving.value = false;
   }
};
</script>

<style scoped>
.CollapsibleContent {
   overflow: hidden;
}
.CollapsibleContent[data-state="open"] {
   animation: slideDown 300ms ease-out;
}
.CollapsibleContent[data-state="closed"] {
   animation: slideUp 300ms ease-out;
}

@keyframes slideDown {
   from {
      height: 0;
   }
   to {
      height: var(--reka-collapsible-content-height);
   }
}

@keyframes slideUp {
   from {
      height: var(--reka-collapsible-content-height);
   }
   to {
      height: 0;
   }
}
</style>
