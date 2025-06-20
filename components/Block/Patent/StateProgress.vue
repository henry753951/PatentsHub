<template>
   <div
      class="bg-white rounded-lg p-4 space-y-2 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800"
   >
      <div class="flex justify-between">
         <div class="font-bold">
            狀態
         </div>
         <div
            class="font-extrabold transition"
            :class="{
               'text-success text-lg': currentState?.type === 'success',
               'text-warning text-lg': currentState?.type === 'warning',
               'text-none text-lg': currentState?.type === 'none',
               'text-pending text-lg': currentState?.type === 'pending',
               'text-ended text-lg': currentState?.type === 'ended',
            }"
         >
            {{ currentState?.title }}
         </div>
      </div>

      <div class="w-full flex gap-1">
         <!-- 狀態項目 -->
         <div class="flex flex-1 gap-1 pt-7">
            <TooltipProvider
               v-for="(item, index) in stateProgress"
               :key="item.status + '-' + index"
               :delay-duration="50"
            >
               <Tooltip>
                  <TooltipTrigger
                     class="status-block flex flex-col gap-2 cursor-pointer"
                     :class="{
                        success: item.type === 'success',
                        none: item.type === 'none',
                        warning: item.type === 'warning',
                        pending: item.type === 'pending',
                        ended: item.type === 'ended',
                        'opacity-50': item.raw !== currentState?.raw,
                     }"
                     @click="
                        item.status === 'MANUAL' && openEditDialog(item.raw)
                     "
                  >
                     <span
                        class="font-bold text-sm"
                        :title="item.title"
                     >{{ item.title }}</span>
                  </TooltipTrigger>
                  <TooltipContent v-if="item.date">
                     <p>{{ format(item.date, "yyyy-MM-dd") }}</p>
                     <CustomTimeAgo :time="item.date" />
                     <div
                        v-if="item.status === 'MANUAL'"
                        class="mt-2 flex gap-2 text-xs"
                     >
                        <button
                           class="px-2 py-0.5 rounded-md transition shadow-sm hover:shadow-md bg-white text-gray-800 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-100 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
                           @click.stop="openEditDialog(item.raw)"
                        >
                           編輯
                        </button>
                        <button
                           class="px-2 py-0.5 rounded-md transition shadow-sm hover:shadow-md bg-white text-red-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-red-400 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700"
                           @click.stop="openDeleteDialog(item.raw)"
                        >
                           刪除
                        </button>
                     </div>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>
         <!-- + 按鈕 -->
         <TooltipProvider :delay-duration="50">
            <Tooltip>
               <TooltipTrigger
                  class="flex items-center justify-center px-1"
                  @click.stop="openAddDialog"
               >
                  <Button
                     variant="ghost"
                     size="icon"
                     class="w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md dark:bg-zinc-800 dark:border-zinc-700"
                  >
                     <Icon
                        name="material-symbols:add-2-rounded"
                        class="text-[24px] text-gray-400 dark:text-zinc-500"
                     />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  <p>新增自訂狀態</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>

         <Dialog
            :open="showAddDialog || editStatusData !== null"
            @update:open="
               (val) => {
                  if (!val) closeDialog();
               }
            "
         >
            <DialogContent
               class="sm:max-w-md"
               @pointer-down-outside.prevent
            >
               <DialogHeader>
                  <DialogTitle>
                     {{ editStatusData ? "編輯自訂狀態" : "新增自訂狀態" }}
                  </DialogTitle>
                  <DialogDescription>填寫狀態名稱與日期</DialogDescription>
               </DialogHeader>

               <form
                  class="space-y-4"
                  @submit.prevent="handleSubmitStatus"
               >
                  <div class="space-y-1">
                     <div class="flex justify-between items-baseline">
                        <Label
                           for="reason"
                           class="text-sm font-bold"
                           :class="{ 'text-red-500': formErrors.reason }"
                        >
                           狀態名稱<span class="text-red-500"> *</span>
                        </Label>
                        <span
                           v-if="formErrors.reason"
                           class="text-sm text-red-500"
                        >
                           {{ formErrors.reason }}
                        </span>
                     </div>

                     <Input
                        id="reason"
                        v-model="form.reason"
                        :class="{
                           'border-red-500 focus-visible:ring-red-500':
                              formErrors.reason,
                        }"
                        placeholder="請輸入狀態名稱"
                     />
                     <div class="flex flex-wrap gap-2">
                        <span
                           v-for="preset in presetStatus"
                           :key="preset.reason"
                           class="px-2 py-0.5 text-sm rounded-full cursor-pointer transition border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"
                           @click="
                              () => {
                                 form.reason = preset.reason;
                                 form.override = preset.override;
                              }
                           "
                        >
                           {{ preset.reason }}
                        </span>
                     </div>
                  </div>

                  <FormDatePicker
                     v-model="form.date"
                     label="日期"
                  />
                  <div class="flex items-center space-x-2">
                     <Checkbox
                        id="override"
                        v-model="form.override"
                     />
                     <Label for="override">結尾狀態</Label>
                  </div>
                  <div
                     v-if="form.reason === '國科會同意終止'"
                     class="flex items-center space-x-2"
                  >
                     <Checkbox
                        id="caseNotFound"
                        v-model="form.caseNotFound"
                     />
                     <Label for="caseNotFound">智慧局查無案件</Label>
                  </div>
                  <DialogFooter>
                     <Button type="submit">
                        儲存
                     </Button>
                  </DialogFooter>
               </form>
            </DialogContent>
         </Dialog>

         <Dialog
            :open="deleteTarget !== null"
            @update:open="
               (val) => {
                  if (!val) deleteTarget = null;
               }
            "
         >
            <DialogContent
               class="sm:max-w-sm"
               @pointer-down-outside.prevent
            >
               <DialogHeader>
                  <DialogTitle>刪除確認</DialogTitle>
                  <DialogDescription>
                     確定要刪除這個狀態嗎？此操作無法復原。
                  </DialogDescription>
               </DialogHeader>
               <DialogFooter>
                  <Button
                     variant="outline"
                     @click="deleteTarget = null"
                  >
                     取消
                  </Button>
                  <Button
                     variant="destructive"
                     @click="handleDeleteStatus"
                  >
                     刪除
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import type { usePatentStatus } from "@/composables/database/patent/status";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { over } from "lodash-es";

const { statusService, patent, updateCaseNotFound } = defineProps<{
   statusService: ReturnType<typeof usePatentStatus>
   patent: RouterOutput["data"]["patent"]["getPatent"]
   updateCaseNotFound: (id: number, flag: boolean) => Promise<void>
}>();

type Patent = RouterOutput["data"]["patent"]["getPatent"];
const getStatusType = (
   reason: string,
   status: string,
   override: boolean,
   patent: Patent,
): "success" | "pending" | "warning" | "none" | "ended" => {
   if (status === "MANUAL" && reason === "申請終止中") return "pending";

   if (status === "EXPIRED") {
      const isNSC = patent?.funding?.fundingUnits?.some(
         (unit) =>
            unit.fundingUnit?.Name?.includes("國科會")
            || unit.fundingUnit?.Name?.includes("科技部"),
      );
      return isNSC ? "warning" : "ended";
   }

   const finalReasons = [
      "國科會同意終止",
      "已讓與",
      "已放棄",
      "已撤案",
      "期滿終止",
   ];

   if (finalReasons.includes(reason) || override) return "ended";

   return "success";
};

const stateProgress = computed(() => {
   return statusService.status.value.map((s) => {
      const type = s.active
         ? getStatusType(s.reason, s.status, s.override, patent)
         : "none";

      const title
      = s.status === "EXPIRED" && type === "ended"
         ? "期滿終止"
         : s.reason || s.status;

      return {
         status: s.status,
         date: s.date,
         type,
         title,
         active: s.active,
         override: s.override,
         raw: s,
      };
   });
});

const currentState = computed(() => {
   const reversed = [...stateProgress.value].reverse();
   return reversed.find((item) => item.active) || null;
}); // 最後一個 active 的狀態

// 快捷狀態
const presetStatus = [
   { reason: "申請終止中", override: true },
   { reason: "國科會同意終止", override: true },
   { reason: "已讓與", override: true },
   { reason: "已放棄", override: true },
   { reason: "已撤案", override: true },
];

const customStatusSchema = z.object({
   reason: z.string().min(1, "狀態名稱不可為空"),
   date: z.date().optional(),
   override: z.boolean().default(false),
});

const showAddDialog = ref(false);
const editStatusData = ref<any | null>(null);
const deleteTarget = ref<any | null>(null);

const form = reactive({
   reason: "",
   date: new Date(),
   override: false,
   caseNotFound: patent?.CaseNotFound ?? false,
});

const openAddDialog = () => {
   resetForm();
   showAddDialog.value = true;
};

const openEditDialog = (manual: any) => {
   form.reason = manual.reason;
   form.date = new Date(manual.date);
   form.override = manual.override ?? false;
   form.caseNotFound = patent?.CaseNotFound ?? false;
   editStatusData.value = manual;
};

const openDeleteDialog = (manual: any) => {
   deleteTarget.value = manual;
};

const closeDialog = () => {
   showAddDialog.value = false;
   editStatusData.value = null;
   resetForm();
};

const resetForm = () => {
   form.reason = "";
   form.date = new Date();
   form.override = false;
   form.caseNotFound = patent?.CaseNotFound ?? false;
};

const formErrors = reactive<{ reason?: string }>({});

const handleSubmitStatus = async () => {
   const result = customStatusSchema.safeParse(form);

   if (!result.success) {
      formErrors.reason = result.error.formErrors.fieldErrors.reason?.[0] ?? "";
      return;
   }

   formErrors.reason = "";

   const payload = {
      reason: form.reason,
      date: form.date,
      override: form.override,
   };

   if (editStatusData.value) {
      await statusService.updateManualStatus?.({
         ManualStatusID: editStatusData.value.ManualStatusID,
         ...payload,
      });
   }
   else {
      await statusService.addManualStatus?.(payload);
   }

   if (
      form.caseNotFound !== patent?.CaseNotFound
      && patent?.PatentID !== undefined
   ) {
      await updateCaseNotFound(patent.PatentID, form.caseNotFound);
   }

   await statusService.refreshCallback?.();
   closeDialog();
};

const handleDeleteStatus = async () => {
   if (deleteTarget.value) {
      await statusService.removeManualStatus?.(
         deleteTarget.value.ManualStatusID,
      );
      await statusService.refreshCallback?.();
   }
   deleteTarget.value = null;
};
</script>

<style scoped>
.status-block {
   flex: 1 1 0%;
   min-width: 0;
}

.status-block > span {
   font-size: 0.9rem;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   max-width: 100%;
}

.status-block::before {
   content: "";
   display: block;
   width: 100%;
   height: 10px;
   border-radius: 4px;
}
.status-block:hover::before {
   box-shadow: 0px 0px 5px var(--progress-color);
}

.status-block.success::before {
   --progress-color: #34d399;
   background-color: var(--progress-color);
}
.status-block.none::before {
   --progress-color: #d1d5db;
   background-color: var(--progress-color);
}
.status-block.warning::before {
   --progress-color: #ef4444;
   background-color: var(--progress-color);
}
.status-block.pending::before {
   --progress-color: #f59e0b;
   background-color: var(--progress-color);
}
.status-block.ended::before {
   --progress-color: #64748b;
   background-color: var(--progress-color);
}

.text-success {
   color: #29b17f;
}
.text-none {
   color: #d1d5db;
}
.text-warning {
   color: #f87171;
}
.text-pending {
   color: #f59e0b;
}
.text-ended {
   color: #64748b;
}
</style>
