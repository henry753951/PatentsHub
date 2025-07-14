<template>
   <template v-if="configData?.discord">
      <BlockSettingsRow
         title="Discord 連線設定"
         collapsible
      >
         <template #title-tail>
            <div
               v-if="discordClientInfo"
               class="flex items-center gap-1"
            >
               <Badge
                  v-tippy="
                     discordClientInfo?.success
                        ? 'Discord 客戶端已連線 ' +
                           `(連線時長: ${discordClientInfo?.data?.health?.uptime ? Math.round(discordClientInfo.data.health.uptime / 1000) : '未知'} 秒)`
                        : 'Discord 客戶端未連線'
                  "
                  severity="secondary"
               >
                  <div class="flex items-center gap-1">
                     <div
                        class="rounded-full w-3 h-3"
                        :class="{
                           'bg-green-500': discordClientInfo?.success,
                           'bg-gray-500': !discordClientInfo?.success,
                        }"
                     ></div>
                     <span>
                        {{ discordClientInfo?.data.userName }}
                     </span>
                  </div>
               </Badge>
            </div>
         </template>
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
               <label class="block text-sm mb-1">Database Backup Channel ID</label>
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
               @click="saveDiscordConfig"
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
import Badge from "primevue/badge";
import { reactive, ref } from "vue";
import { useAsyncData, useNuxtApp } from "nuxt/app";

const { $trpc } = useNuxtApp();
const { readConfig } = useConfig();
// 從伺服器獲取配置
const configData = ref(await readConfig());

// 儲存狀態
const isSaving = ref(false);
const discordClientInfo = useState<
   RouterOutput["app"]["discord"]["actions"]["getClientInfo"] | null
>("discordClientInfo", () => null);

// 儲存配置
const saveDiscordConfig = async () => {
   if (!configData.value) return;
   isSaving.value = true;
   try {
      await $trpc.app.config.writeConfig.mutate(configData.value);
      await $trpc.app.discord.actions.restartClient.mutate({});
      setTimeout(async () => {
         discordClientInfo.value
            = await $trpc.app.discord.actions.getClientInfo.mutate({});
      }, 1000);
   }
   finally {
      isSaving.value = false;
   }
};

onMounted(async () => {
   discordClientInfo.value
      = await $trpc.app.discord.actions.getClientInfo.mutate({});
});
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
