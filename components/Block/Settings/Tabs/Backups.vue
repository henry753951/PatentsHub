<template>
   <div class="flex flex-col gap-6 flex-1">
      <div
         v-if="currentDBInfo"
         class="flex flex-col gap-2"
      >
         <h1 class="text-2xl font-bold">
            當前資料庫資訊
         </h1>
         <div
            class="flex flex-col text-pretty text-xs text-muted-foreground p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
         >
            <div>HASH: {{ currentDBInfo?.hash }}</div>
            <div>
               最後更改時間:
               {{
                  format(
                     new Date(currentDBInfo?.lastModified),
                     "yyyy/MM/dd HH:mm:ss",
                  )
               }}
            </div>
         </div>
      </div>

      <div>
         <div class="flex">
            <h1 class="text-2xl font-bold mr-auto">
               雲端備份
            </h1>
            <Button
               size="sm"
               :disabled="isBackuping"
               @click="backups.createBackup()"
            >
               {{ isBackuping ? "備份中..." : "立即備份" }}
            </Button>
         </div>
         <p class="text-pretty text-sm text-muted-foreground">
            目前有 {{ backups.cloudBackups.value?.length || 0 }} 筆備份
         </p>
         <ScrollArea>
            <div class="flex flex-col gap-2 py-4">
               <div
                  v-for="(backup, index) in backups.cloudBackups.value"
                  :key="index"
                  class="flex flex-col justify-center p-4 border rounded-lg gap-2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 group"
               >
                  <div class="flex justify-between items-center">
                     <div class="flex flex-col">
                        <span>{{ backup.name }}</span>
                        <span class="text-[8px]">{{ backup.hash }}</span>
                     </div>
                     <span
                        v-if="backup.hash === currentDBInfo?.hash"
                        class="ml-2 text-xs text-green-500"
                     >
                        (目前使用中)
                     </span>
                     <span
                        v-else-if="currentDBInfo"
                        class="ml-2 text-xs"
                        :class="{
                           'text-red-500':
                              new Date(currentDBInfo.lastModified) >
                              backup.timestamp,
                           'text-green-500':
                              new Date(currentDBInfo.lastModified) <
                              backup.timestamp,
                        }"
                     >
                        {{
                           new Date(currentDBInfo.lastModified) >
                              backup.timestamp
                              ? "(較舊)"
                              : "(較新)"
                        }}
                     </span>
                  </div>
                  <div class="flex items-center justify-between gap-2">
                     <p class="text-xs text-gray-500 dark:text-gray-400">
                        {{ format(backup.timestamp, "yyyy/MM/dd HH:mm:ss") }}
                     </p>
                     <div
                        class="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                     >
                        <Button
                           size="sm"
                           :disabled="isRestoring"
                           @click="useBackupUrl(backup.url)"
                        >
                           {{ isRestoring ? "還原中..." : "還原" }}
                        </Button>
                        <Button
                           size="sm"
                           variant="destructive"
                           @click="
                              () => {
                                 backups.deleteBackup(backup.id);
                              }
                           "
                        >
                           刪除備份
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </ScrollArea>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
const { backups, currentDBInfo, isBackuping, isRestoring, useBackupUrl }
   = useBackup();
</script>

<style scoped></style>
