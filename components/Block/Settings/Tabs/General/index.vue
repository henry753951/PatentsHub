<template>
   <div class="space-y-4">
      <BlockSettingsRow title="常用檔案位置">
         <div class="flex gap-4 items-center">
            <UiThingButton
               variant="secondary"
               @click="$trpc.app.config.openDirectory.mutate({ directory: '' })"
            >
               開啟資料目錄
            </UiThingButton>
            <UiThingButton
               variant="secondary"
               @click="
                  $trpc.app.config.openDirectory.mutate({
                     directory: 'templates',
                  })
               "
            >
               開啟出帳模板目錄
            </UiThingButton>
            <UiThingButton
               variant="secondary"
               @click="
                  $trpc.app.config.openDirectory.mutate({
                     directory: 'config.json',
                  })
               "
            >
               開啟設定檔案
            </UiThingButton>
         </div>
      </BlockSettingsRow>
      <BlockSettingsRow title="一般設定">
         <div
            class="flex gap-4 items-center justify-between"
            v-tippy="'切換主題'"
         >
            <div>主題</div>
            <Select v-model="currentTheme">
               <SelectTrigger class="w-[10rem] border">
                  <SelectValue placeholder="選擇主題" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem
                     v-for="option in options"
                     :key="option.value"
                     :value="option.value"
                  >
                     {{ option.label }}
                  </SelectItem>
               </SelectContent>
            </Select>
         </div>
         <div
            class="flex gap-4 items-center justify-between"
            :class="{
               'text-gray-500 cursor-not-allowed': isDebugMode,
            }"
            v-tippy="'強制開啟開發者模式' + (isDebugMode ? ' (當前為鎖定開發模式)' : '')"
         >
            <div>開發者模式</div>
            <Switch
               v-model="isDebugMode"
               :disabled="isDebugMode"
            />
         </div>
      </BlockSettingsRow>
      <BlockSettingsTabsGeneralDiscord />
   </div>
</template>

<script lang="ts" setup>
const { options, loopSwitchTheme, currentTheme } = useTheme();
const { isForceDebugMode, isDebugMode } = useDebug();
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
</script>

<style scoped></style>
