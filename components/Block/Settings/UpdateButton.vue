<template>
   <div
      v-if="!rounded"
      class="flex flex-col gap-2 justify-between p-4 bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-300/50 dark:border-zinc-700/50 rounded-md"
   >
      <div class="flex items-center justify-between gap-2">
         <div class="flex flex-col gap-4 flex-1">
            <h3 class="text-md font-semibold">
               版本更新
               <span class="text-xs text-muted-foreground">
                  (當前版本: v{{ currentVersion }})
               </span>
            </h3>
            <div
               v-if="
                  updateStatus?.type === 'checking-for-update' ||
                     updateStatus?.type === 'update-available'
               "
               class="flex items-center gap-2"
            >
               <div class="text-sm text-muted-foreground">
                  v{{ updateInfo?.version }} 版本可用
               </div>
               <span
                  class="cursor-pointer text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  @click="openUpdateLog"
               >
                  更新日誌
               </span>
            </div>

            <div
               v-else-if="updateStatus?.type === 'update-downloaded'"
               class="flex items-center gap-2"
            >
               <span class="text-sm text-muted-foreground">
                  v{{ updateInfo?.version }} 版本已經下載完成
               </span>
               <span
                  class="cursor-pointer text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  @click="openUpdateLog"
               >
                  更新日誌
               </span>
            </div>
            <div
               v-else-if="updateStatus?.type === 'update-not-available'"
               class="text-sm text-muted-foreground"
            >
               <span class="text-sm text-muted-foreground">
                  當前 v{{ updateInfo?.version }} 已為最新版本
               </span>
               <span
                  class="cursor-pointer text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  @click="openUpdateLog"
               >
                  更新日誌
               </span>
            </div>
         </div>
         <div class="flex flex-col items-end gap-2 justify-between">
            <button
               class="text-sm"
               :disabled="updateStatus?.type === 'download-progress'"
               @click="checkForUpdates"
            >
               <Icon
                  :name="
                     updateStatus?.type !== 'checking-for-update'
                        ? 'material-symbols:refresh-rounded'
                        : 'line-md:loading-loop'
                  "
                  size="16"
               />
            </button>
            <Button
               v-if="updateStatus?.type === 'update-downloaded'"
               size="sm"
               class="w-full flex gap-2 items-center"
               @click="quitAndInstall"
            >
               <Icon :name="statusIcon" />
               退出並安裝更新
            </Button>
         </div>
      </div>
      <div
         v-if="updateStatus?.type === 'download-progress'"
         class="flex w-full items-center gap-2"
      >
         <ProgressBar
            style="--p-progressbar-value-background: #3b82f6"
            :value="Math.round(updateStatus?.data.percent)"
            class="flex-1"
         />
         <Badge class="text-sm w-[100px] flex justify-center">
            {{
               Math.round(
                  (updateStatus?.data.bytesPerSecond / 1024 ** 2) * 100,
               ) / 100
            }}
            MB/s
         </Badge>
      </div>
      <div
         v-else-if="updateStatus?.type === 'error'"
         class="text-sm text-red-500"
      >
         {{ updateStatus?.data || "更新檢查失敗" }}
      </div>

      <div
         v-else-if="!updateStatus"
         class="text-sm text-muted-foreground flex items-center gap-2"
      >
         <span>無更新資訊</span>
         <Badge
            v-if="!isProduction"
            severity="contrast"
            size="small"
         >
            DEV
         </Badge>
      </div>
   </div>

   <TooltipProvider
      v-else
      :delay-duration="0"
   >
      <Tooltip>
         <TooltipTrigger as-child>
            <button
               class="flex items-center justify-between gap-2 p-1.5 rounded-full"
               :class="
                  updateStatus?.type === 'update-downloaded'
                     ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/80 dark:text-emerald-200 dark:hover:bg-emerald-900 border border-emerald-400 dark:border-emerald-600'
                     : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700' "
               @click="quitAndInstall"
            >
               <Icon
                  :name="statusIcon"
                  size="20"
               />
            </button>
         </TooltipTrigger>
         <TooltipContent>
            <div
               v-if="updateStatus?.type === 'update-available'"
               class="flex gap-2"
            >
               <span class="text-sm font-semibold">
                  v{{ updateInfo?.version }} 版本可用
               </span>
               <button
                  class="text-sm text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300"
                  @click="openUpdateLog"
               >
                  更新日誌
               </button>
            </div>
            <div
               v-else-if="updateStatus?.type === 'download-progress'"
               class="text-sm"
            >
               <div class="space-y-2 pb-1">
                  <div class="flex justify-between text-sm">
                     <div>下載中...</div>
                     <div>
                        {{
                           Math.round(
                              (updateStatus?.data.bytesPerSecond / 1024 ** 2) *
                                 100,
                           ) / 100
                        }}
                        MB/s
                     </div>
                  </div>
                  <ProgressBar
                     :value="Math.round(updateStatus?.data.percent)"
                     class="w-[200px]"
                     style="--p-progressbar-value-background: #3b82f6"
                  />
               </div>
            </div>
            <div
               v-else-if="updateStatus?.type === 'update-downloaded'"
               class="text-sm"
            >
               v{{ updateInfo?.version }} 版本已經下載完成
               <button
                  class="text-sm text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300"
                  @click="openUpdateLog"
               >
                  更新日誌
               </button>
            </div>
            <div v-else-if="updateStatus?.type === 'checking-for-update'">
               <span class="text-sm"> 檢查更新中... </span>
            </div>
            <div
               v-else-if="updateStatus?.type === 'update-not-available'"
               class="text-sm"
            >
               <span class="text-sm">
                  當前 v{{ updateInfo?.version }} 已為最新版本
               </span>
               <button
                  class="text-sm text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300"
                  @click="openUpdateLog"
               >
                  更新日誌
               </button>
            </div>
            <div
               v-else-if="updateStatus?.type === 'error'"
               class="text-sm"
            >
               {{ updateStatus?.data || "更新檢查失敗" }}
            </div>
            <div
               v-else
               class="text-sm flex items-center justify-center gap-2"
            >
               <span>無更新資訊</span>
               <Badge
                  v-if="!isProduction"
                  severity="secondary"
               >
                  開發環境
               </Badge>
            </div>
         </TooltipContent>
      </Tooltip>
   </TooltipProvider>
</template>

<script lang="ts" setup>
import { Button } from "~/components/ui/button";
import Badge from "primevue/badge";
import { ProgressBar } from "primevue";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import type { UpdateInfo } from "electron-updater";
interface Props {
   rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
   rounded: false,
});

const { isProduction } = useDebug();

const updaterService = useUpdater();
const { open } = useModals();

// Computed properties for cleaner template
const updateStatus = computed(() => updaterService.updateStatus.value);
const updateInfo = computed(() => updaterService.updateInfo.value);
const currentVersion = computed(() => updaterService.currentVersion.value);

const statusIcon = computed(() => {
   if (!updateStatus.value) return "mage:box-3d-question-mark-fill";
   switch (updateStatus.value.type) {
      case "checking-for-update":
         return "line-md:loading-loop";
      case "update-available":
         return "mage:box-3d-download-fill";
      case "update-downloaded":
         return "mage:box-3d-check-fill";
      case "update-not-available":
         return "mage:box-3d-question-mark";
      case "error":
         return "mage:box-3d-cross-fill";
      default:
         return "mage:box-3d-question-mark-fill";
   }
});

// Methods
const checkForUpdates = () => updaterService.checkForUpdates();
const quitAndInstall = () => updaterService.quitAndInstall();

const openUpdateLog = () => {
   if (!updateInfo.value) return;
   open("UpdateLogsModal", {
      props: {
         updateInfo: updateInfo.value as UpdateInfo,
      },
   });
};
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
