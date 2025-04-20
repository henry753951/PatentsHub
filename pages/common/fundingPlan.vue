<template>
   <div
      class="text-zinc-900 dark:text-zinc-100 container mx-auto space-y-8 flex flex-col py-4"
   >
      <!-- Header Section -->
      <div
         class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 min-h-0"
      >
         <div>
            <h1
               class="text-3xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent"
            >
               經費分配管理
            </h1>
            <p class="text-zinc-600 dark:text-zinc-400 mt-1">
               管理校內資金分配方案與目標
            </p>
         </div>
         <div class="flex gap-3">
            <Button
               variant="default"
               class="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md"
               @click="openCreateModal"
            >
               <PlusIcon class="w-4 h-4 mr-2" />
               新增方案
            </Button>
            <Button
               variant="outline"
               class="border border-zinc-300 dark:border-zinc-700 shadow-sm"
               @click="openCreateTargetModal"
            >
               <TargetIcon class="w-4 h-4 mr-2" />
               新增目標
            </Button>
         </div>
      </div>

      <!-- Main Content Area -->
      <div
         class="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow"
      >
         <!-- Funding Plans Section -->
         <div class="lg:col-span-2 space-y-4 h-full">
            <div
               class="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-100 dark:border-zinc-800 p-5 transition-all hover:shadow-xl h-full"
            >
               <h2 class="text-xl font-semibold mb-4 flex items-center">
                  <LayoutGridIcon class="w-5 h-5 mr-2 text-indigo-500" />
                  資金分配方案
               </h2>

               <ScrollArea>
                  <div
                     v-if="!fundingPlans || fundingPlans.length === 0"
                     class="py-8 text-center"
                  >
                     <div class="flex justify-center mb-4">
                        <FileIcon class="h-12 w-12 text-zinc-400" />
                     </div>
                     <h3 class="text-zinc-500 dark:text-zinc-400">
                        尚無資金分配方案
                     </h3>
                     <p class="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
                        點擊上方的「新增方案」按鈕來創建
                     </p>
                  </div>

                  <div
                     v-else
                     class="space-y-4"
                  >
                     <Card
                        v-for="plan in fundingPlans"
                        :key="plan.FundingPlanID"
                        class="overflow-hidden border-zinc-100 dark:border-zinc-800"
                     >
                        <CardHeader
                           class="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                           @click.self="() => openAllocationModal(plan)"
                        >
                           <div class="flex justify-between items-center">
                              <CardTitle
                                 class="text-lg font-medium w-full"
                                 @click="() => openAllocationModal(plan)"
                              >
                                 {{ plan.Name }}
                              </CardTitle>
                              <DropdownMenu>
                                 <DropdownMenuTrigger as="div">
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       class="h-8 w-8 rounded-full"
                                    >
                                       <MoreHorizontalIcon class="h-4 w-4" />
                                    </Button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent
                                    align="end"
                                    class="w-40"
                                 >
                                    <DropdownMenuItem
                                       @click="() => editPlanModal(plan)"
                                    >
                                       <EditIcon class="mr-2 h-4 w-4" />
                                       <span>編輯</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                       class="text-red-500 dark:text-red-400"
                                       @click="
                                          () => deletePlan(plan.FundingPlanID)
                                       "
                                    >
                                       <TrashIcon class="mr-2 h-4 w-4" />
                                       <span>刪除</span>
                                    </DropdownMenuItem>
                                 </DropdownMenuContent>
                              </DropdownMenu>
                           </div>
                        </CardHeader>
                        <CardContent>
                           <div class="space-y-3">
                              <div
                                 v-if="
                                    plan.planAllocations &&
                                       plan.planAllocations.length > 0
                                 "
                              >
                                 <div
                                    v-for="allocation in plan.planAllocations"
                                    :key="allocation.FundingPlanAllocationID"
                                    class="flex justify-between items-center py-1.5"
                                 >
                                    <div class="flex items-center">
                                       <div
                                          class="w-2 h-2 rounded-full bg-indigo-500 mr-2"
                                       ></div>
                                       <span>{{ allocation.target.Name }}</span>
                                    </div>
                                    <Badge
                                       variant="outline"
                                       class="font-mono"
                                    >
                                       {{ allocation.Percentage }}%
                                    </Badge>
                                 </div>
                              </div>
                              <div
                                 v-else
                                 class="text-sm text-zinc-500 dark:text-zinc-400 italic py-2"
                              >
                                 無分配資料
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </ScrollArea>
            </div>
         </div>

         <!-- Targets Section -->
         <div class="space-y-4 h-full">
            <div
               class="bg-white dark:bg-zinc-900 rounded-xl shadow-lg backdrop-blur-sm border border-zinc-100 dark:border-zinc-800 p-5 transition-all hover:shadow-xl h-full"
            >
               <h2 class="text-xl font-semibold mb-4 flex items-center">
                  <TargetIcon class="w-5 h-5 mr-2 text-indigo-500" />
                  分配目標
               </h2>
               <ScrollArea>
                  <div
                     v-if="!targets || targets.length === 0"
                     class="py-8 text-center"
                  >
                     <div class="flex justify-center mb-4">
                        <TargetIcon class="h-12 w-12 text-zinc-400" />
                     </div>
                     <h3 class="text-zinc-500 dark:text-zinc-400">
                        尚無分配目標
                     </h3>
                     <p class="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
                        點擊上方的「新增目標」按鈕來創建
                     </p>
                  </div>

                  <div
                     v-else
                     class="space-y-2"
                  >
                     <div
                        v-for="target in targets"
                        :key="target.TargetID"
                        class="p-3 border border-zinc-100 dark:border-zinc-800 rounded-lg flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                     >
                        <span class="font-medium">{{ target.Name }}</span>
                        <div class="flex space-x-1">
                           <Button
                              variant="ghost"
                              size="icon"
                              class="h-8 w-8 rounded-full text-zinc-500"
                              @click="() => editTargetModal(target)"
                           >
                              <EditIcon class="h-3.5 w-3.5" />
                           </Button>
                           <Button
                              variant="ghost"
                              size="icon"
                              class="h-8 w-8 rounded-full text-red-500"
                              @click="() => deleteTarget(target.TargetID)"
                           >
                              <TrashIcon class="h-3.5 w-3.5" />
                           </Button>
                        </div>
                     </div>
                  </div>
               </ScrollArea>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
   PlusIcon,
   LayoutGridIcon,
   TargetIcon,
   EditIcon,
   TrashIcon,
   MoreHorizontalIcon,
   FileIcon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";
import { $t } from "@primevue/themes";
import { ScrollArea } from "~/components/ui/scroll-area";
definePageMeta({
   name: "common-fundingPlanManage",
});

const { $trpc } = useNuxtApp();
const modalService = useModals();

const { data: fundingPlans, refresh } = await useAsyncData(async () => {
   return await $trpc.data.fundingPlan.getAllFundingPlans.query();
});

const { data: targets, refresh: refreshTargets } = await useAsyncData(
   async () => {
      return await $trpc.data.fundingPlan.getAllFundingPlanTarget.query();
   },
);

// Plan CRUD operations
const openCreateModal = () => {
   modalService.openAutoModalV2({
      title: "建立方案",
      description: "建立校內金額分配方案",
      schema: z.object({
         name: z.string().min(1, "名稱不能為空"),
      }),
      callback: async (data) => {
         try {
            await $trpc.data.fundingPlan.createFundingPlan.mutate({
               name: data.name,
               allocation: [],
            });
            refresh();
            toast.success("方案建立成功");
         }
         catch (error) {
            toast.error("方案建立失敗");
         }
      },
      fieldConfig: {
         name: {
            label: "方案名稱",
         },
      },
   });
};

const editPlanModal = (
   plan: RouterOutput["data"]["fundingPlan"]["getAllFundingPlans"][number],
) => {
   modalService.openAutoModalV2({
      title: "編輯方案",
      description: "修改金額分配方案資訊",
      schema: z.object({
         name: z.string().min(1, "名稱不能為空"),
      }),
      defaultValues: {
         name: plan.Name,
      },
      callback: async (data) => {
         try {
            await editPlan({
               fundingPlanID: plan.FundingPlanID,
               name: data.name,
               allocation:
                  plan.planAllocations.map((allocation) => ({
                     targetID: allocation.TargetID,
                     percentage: allocation.Percentage,
                  })) || [],
            });
            refresh();
            toast.success("方案更新成功");
         }
         catch (error) {
            toast.error("方案更新失敗");
         }
      },
      fieldConfig: {
         name: {
            label: "方案名稱",
         },
      },
   });
};

const editPlan = async (
   plan: RouterInput["data"]["fundingPlan"]["updateFundingPlan"],
) => {
   await $trpc.data.fundingPlan.updateFundingPlan.mutate({
      fundingPlanID: plan.fundingPlanID,
      name: plan.name,
      allocation: plan.allocation,
   });
   refresh();
};

const deletePlan = async (fundingPlanID: number) => {
   try {
      await $trpc.data.fundingPlan.deleteFundingPlan.mutate({
         fundingPlanID,
      });
      refresh();
      toast.success("方案已刪除");
   }
   catch (error) {
      toast.error("刪除方案失敗");
   }
};

// Target CRUD operations
const openCreateTargetModal = () => {
   modalService.openAutoModalV2({
      title: "建立目標",
      description: "建立校內金額分配目標",
      schema: z.object({
         name: z.string().min(1, "名稱不能為空"),
      }),
      callback: async (data) => {
         try {
            await $trpc.data.fundingPlan.createFundingPlanTarget.mutate({
               name: data.name,
            });
            refreshTargets();
            toast.success("目標建立成功");
         }
         catch (error) {
            toast.error("目標建立失敗");
         }
      },
      fieldConfig: {
         name: {
            label: "目標名稱",
         },
      },
   });
};

const editTargetModal = (target: { TargetID: number, Name: string }) => {
   modalService.openAutoModalV2({
      title: "編輯目標",
      description: "修改分配目標資訊",
      schema: z.object({
         name: z.string().min(1, "名稱不能為空"),
      }),
      defaultValues: {
         name: target.Name,
      },
      callback: async (data) => {
         try {
            await editTarget({
               fundingPlanTargetID: target.TargetID,
               name: data.name,
            });
            refreshTargets();
            toast.success("目標更新成功");
         }
         catch (error) {
            toast.error("目標更新失敗");
         }
      },
      fieldConfig: {
         name: {
            label: "目標名稱",
         },
      },
   });
};

const editTarget = async (
   target: RouterInput["data"]["fundingPlan"]["updateFundingPlanTarget"],
) => {
   await $trpc.data.fundingPlan.updateFundingPlanTarget.mutate({
      fundingPlanTargetID: target.fundingPlanTargetID,
      name: target.name,
   });
};

const deleteTarget = async (fundingPlanTargetID: number) => {
   try {
      await $trpc.data.fundingPlan.deleteFundingPlanTarget.mutate({
         fundingPlanTargetID,
      });
      refreshTargets();
      toast.success("目標已刪除");
   }
   catch (error) {
      toast.error("刪除目標失敗");
   }
};

const openAllocationModal = (
   plan: RouterOutput["data"]["fundingPlan"]["getAllFundingPlans"][number],
) => {
   modalService.open("FundingPlanAllocationModal", {
      props: {
         planName: plan.Name,
         fundingPlanId: plan.FundingPlanID,
         callback: async (data) => {
            try {
               editPlan({
                  fundingPlanID: plan.FundingPlanID,
                  name: plan.Name,
                  allocation: data,
               });
               toast.success("方案分配更新成功");
            }
            catch (error) {
               toast.error("方案分配更新失敗");
            }
         },
      },
   });
};
</script>
