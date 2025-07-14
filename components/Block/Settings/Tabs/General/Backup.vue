<template>
   <BlockSettingsRow
      title="自動備份設定"
      :disabled="!discordClientInfo?.success"
      disabled-text="請先連接 Discord 才可以使用自動備份功能"
   >
      <div class="flex gap-4 items-center justify-between">
         <div>離開時自動備份</div>
         <Switch v-model="config.backup.backupTrigger.onExit" />
      </div>
      <div
         v-auto-animate
         class="flex flex-col gap-2 justify-between"
      >
         <div class="flex gap-4 items-center justify-between">
            <div>週期自動備份</div>
            <div class="flex gap-4 items-center">
               <Switch
                  v-model="config.backup.backupTrigger.onTimer"
                  @update:model-value="reloadBackupService"
               />
            </div>
         </div>

         <div
            v-if="config.backup.backupTrigger.onTimer"
            class="flex gap-4 items-center justify-between"
         >
            <div>
               備份週期
               <span class="text-xs text-muted-foreground">(分鐘)</span>
            </div>
            <div class="flex gap-4 items-center">
               <NumberField
                  v-model="config.backup.interval"
                  :min="0"
                  class="w-32"
                  @update:model-value="reloadBackupService"
               >
                  <NumberFieldContent>
                     <NumberFieldDecrement />
                     <NumberFieldInput />
                     <NumberFieldIncrement />
                  </NumberFieldContent>
               </NumberField>
            </div>
         </div>
      </div>
   </BlockSettingsRow>
</template>

<script lang="ts" setup>
import {
   NumberField,
   NumberFieldContent,
   NumberFieldDecrement,
   NumberFieldIncrement,
   NumberFieldInput,
} from "@/components/ui/number-field";
import { Switch } from "@/components/ui/switch";

const discordClientInfo = useState<
   RouterOutput["app"]["discord"]["actions"]["getClientInfo"] | null
>("discordClientInfo", () => null);
const { $trpc } = useNuxtApp();
const { config } = useConfig();

const reloadBackupService = async () => {
   setTimeout(async () => {
      await $trpc.app.backup.reloadBackupService.mutate({});
   }, 1000);
};
</script>

<style scoped></style>
