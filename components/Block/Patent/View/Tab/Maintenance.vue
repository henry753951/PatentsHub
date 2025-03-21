<template>
   <div class="space-y-6">
      <!-- Header Section -->
      <div class="flex items-center justify-between">
         <div>
            <h2 class="text-2xl font-bold tracking-tight">
               專利維護管理
            </h2>
            <p class="text-muted-foreground">
               查看和管理專利維護期程
            </p>
         </div>
         <Button
            variant="default"
            class="gap-2"
            @click="showAddDialog = true"
         >
            <PlusIcon class="h-4 w-4" />
            新增維護記錄
         </Button>
      </div>

      <!-- Status Card -->
      <Card
         v-if="maintenanceStatus"
         class="overflow-hidden"
      >
         <CardContent class="p-0">
            <div
               class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x"
            >
               <div
                  class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/30"
               >
                  <h3 class="text-sm font-medium text-muted-foreground mb-1">
                     維護起始日期
                  </h3>
                  <p class="text-lg font-semibold">
                     {{ formatDate(maintenanceStatus.maintenanceStartDate) }}
                  </p>
               </div>
               <div
                  class="p-6 flex items-center space-x-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/30"
               >
                  <div
                     class="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10"
                  >
                     <CalendarIcon class="h-6 w-6 text-primary" />
                  </div>
                  <div>
                     <h3 class="text-sm font-medium text-muted-foreground mb-1">
                        {{ maintenanceStatus.nextMaintenanceLabel }}
                     </h3>
                     <p class="text-lg font-semibold">
                        {{ formatDate(maintenanceStatus.nextMaintenanceDate) }}
                     </p>
                     <Badge
                        :variant="
                           isExpired(maintenanceStatus.nextMaintenanceDate)
                              ? 'destructive'
                              : 'default'
                        "
                        class="mt-1"
                     >
                        {{
                           isExpired(maintenanceStatus.nextMaintenanceDate)
                              ? "已過期"
                              : getRemainingDays(
                                 maintenanceStatus.nextMaintenanceDate,
                              ) + " 天後到期"
                        }}
                     </Badge>
                  </div>
               </div>
               <div
                  class="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/30"
               >
                  <h3 class="text-sm font-medium text-muted-foreground mb-1">
                     維護年期
                  </h3>
                  <p class="text-lg font-semibold">
                     {{ maintenanceStatus.maintenanceYears }} 年
                  </p>
               </div>
            </div>
         </CardContent>
      </Card>

      <!-- Timeline -->
      <Card v-if="maintenances.length > 0">
         <CardHeader>
            <CardTitle>維護期程時間軸</CardTitle>
         </CardHeader>
         <CardContent>
            <div class="relative">
               <div class="absolute top-0 bottom-0 left-6 w-px bg-border">
               </div>
               <div class="space-y-8">
                  <div
                     v-for="(maintenance, index) in maintenances"
                     :key="maintenance.MaintenanceID"
                     class="relative pl-10 transition-all"
                  >
                     <div
                        class="absolute left-[24.6px] top-1 h-3 w-3 rounded-full border border-primary"
                        :class="{
                           'bg-primary':
                              new Date(maintenance.MaintenanceDate) <=
                              new Date(),
                           'bg-background':
                              new Date(maintenance.MaintenanceDate) >
                              new Date(),
                        }"
                        style="transform: translateX(-50%)"
                     ></div>
                     <div
                        class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 group"
                     >
                        <div>
                           <h4
                              class="text-base font-semibold flex items-center"
                           >
                              第 {{ index + 1 }} 次維護
                              <Badge
                                 :variant="
                                    isExpired(maintenance.ExpireDate)
                                       ? 'destructive'
                                       : new Date(
                                          maintenance.MaintenanceDate,
                                       ) <= new Date()
                                          ? 'default'
                                          : 'outline'
                                 "
                                 class="ml-2"
                              >
                                 {{ getMaintenanceStatus(maintenance) }}
                              </Badge>
                           </h4>
                           <div
                              class="flex flex-col sm:flex-row sm:items-center gap-x-4 text-muted-foreground text-sm mt-1"
                           >
                              <div class="flex items-center gap-1">
                                 <CalendarIcon class="h-4 w-4" />
                                 <span>維護日期:
                                    {{
                                       formatDate(maintenance.MaintenanceDate)
                                    }}</span>
                              </div>
                              <div class="flex items-center gap-1">
                                 <ClockIcon class="h-4 w-4" />
                                 <span>到期日期:
                                    {{
                                       formatDate(maintenance.ExpireDate)
                                    }}</span>
                              </div>
                           </div>
                        </div>
                        <div
                           class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity sm:self-start"
                        >
                           <Button
                              variant="ghost"
                              size="icon"
                              @click="() => editMaintenanceRecord(maintenance)"
                           >
                              <PencilIcon class="h-4 w-4" />
                           </Button>
                           <Button
                              variant="ghost"
                              size="icon"
                              class="text-destructive"
                              @click="
                                 () =>
                                    deleteMaintenanceRecord(
                                       maintenance.MaintenanceID,
                                    )
                              "
                           >
                              <TrashIcon class="h-4 w-4" />
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>

      <!-- Empty State -->
      <Card
         v-else
         class="border border-dashed"
      >
         <CardContent
            class="flex flex-col items-center justify-center p-10 text-center"
         >
            <div
               class="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4"
            >
               <CalendarIcon class="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 class="text-lg font-medium mb-1">
               尚無維護記錄
            </h3>
            <p class="text-muted-foreground mb-4">
               添加第一個維護期程來開始管理您的專利維護
            </p>
            <Button
               variant="default"
               class="gap-2"
               @click="showAddDialog = true"
            >
               <PlusIcon class="h-4 w-4" />
               新增維護記錄
            </Button>
         </CardContent>
      </Card>

      <!-- Add/Edit Dialog -->
      <Dialog
         :open="showAddDialog || editMaintenanceData !== null"
         @update:open="closeDialog"
      >
         <DialogContent
            class="sm:max-w-md"
            @pointer-down-outside.prevent
            @open-auto-focus.prevent
         >
            <DialogHeader>
               <DialogTitle>
                  {{ editMaintenanceData ? "編輯維護記錄" : "新增維護記錄" }}
               </DialogTitle>
               <DialogDescription>
                  設定專利維護的日期和到期日期
               </DialogDescription>
            </DialogHeader>
            <form
               class="space-y-4"
               @submit.prevent="handleSubmit"
            >
               <FormDatePicker
                  v-model="form.maintenanceDate"
                  label="維護日期"
                  :min-date="maintenanceStatus?.latestMaintenanceDate"
               />
               <FormDatePicker
                  v-model="form.expireDate"
                  label="到期日期"
                  :min-date="minExpireDate"
               />
               <DialogFooter>
                  <Button
                     type="submit"
                     :disabled="isSubmitDisabled"
                  >
                     儲存
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { ref, computed, defineModel, defineProps } from "vue";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
   PlusIcon,
   CalendarIcon,
   ClockIcon,
   PencilIcon,
   TrashIcon,
} from "lucide-vue-next";

const patent = defineModel({
   type: Object as PropType<RouterOutput["data"]["patent"]["getPatent"]>,
   required: true,
});

const { patentMaintainancesService } = defineProps<{
   patentMaintainancesService: ReturnType<typeof usePatentMaintenances>
}>();

const {
   addMaintenance,
   editMaintenance,
   deleteMaintenance,
   maintenances,
   maintenanceStatus,
} = patentMaintainancesService;

// Form state
const showAddDialog = ref(false);
const editMaintenanceData = ref<{
   MaintenanceID: number
   MaintenanceDate: string | number | Date
   ExpireDate: string | number | Date
} | null>(null);

const form = ref({
   maintenanceDate: new Date() as Date,
   expireDate: null as Date | null,
});

// Computed properties
const isSubmitDisabled = computed(() => {
   return !form.value.maintenanceDate || !form.value.expireDate;
});
const minExpireDate = computed(() => {
   if (
      form.value.maintenanceDate
      && maintenanceStatus.value?.nextMaintenanceDate
      && form.value.maintenanceDate > maintenanceStatus.value.nextMaintenanceDate
   )
      return form.value.maintenanceDate;
   return maintenanceStatus.value?.nextMaintenanceDate;
});

// Methods
const formatDate = (date: string | number | Date) => {
   if (!date) return "";
   return new Date(date).toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
   });
};

const getRemainingDays = (date: string | number | Date) => {
   const today = new Date();
   const targetDate = new Date(date);
   const diffTime = targetDate.getTime() - today.getTime();
   return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const isExpired = (date: string | number | Date) => {
   return new Date(date) < new Date();
};

const getMaintenanceStatus = (
   maintenance: {
      ExpireDate: string | number | Date
      MaintenanceDate: string | number | Date
   } | null,
) => {
   if (!maintenance) return "";
   if (isExpired(maintenance.ExpireDate)) {
      return "已過期";
   }
   else if (new Date(maintenance.MaintenanceDate) <= new Date()) {
      return "進行中";
   }
   else {
      return "即將進行";
   }
};

const editMaintenanceRecord = (maintenance: {
   MaintenanceID: number
   MaintenanceDate: string | number | Date
   ExpireDate: string | number | Date
}) => {
   editMaintenanceData.value = maintenance;
   form.value.maintenanceDate = new Date(maintenance.MaintenanceDate);
   form.value.expireDate = new Date(maintenance.ExpireDate);
};

const deleteMaintenanceRecord = async (maintenanceId: number) => {
   if (confirm("確定要刪除此維護記錄？")) {
      await deleteMaintenance(maintenanceId);
   }
};

const closeDialog = () => {
   showAddDialog.value = false;
   editMaintenanceData.value = null;
   form.value = {
      maintenanceDate: new Date(),
      expireDate: null,
   };
};

const handleSubmit = async () => {
   if (!form.value.maintenanceDate || !form.value.expireDate) return;

   const maintenanceData = {
      MaintenanceDate: form.value.maintenanceDate,
      ExpireDate: form.value.expireDate,
   };

   if (editMaintenanceData.value) {
      await editMaintenance(
         editMaintenanceData.value.MaintenanceID,
         maintenanceData,
      );
   }
   else {
      await addMaintenance(maintenanceData);
   }

   closeDialog();
};
</script>
