<template>
   <UiThingTabs
      default-value="專利費用繳款通知單"
      orientation="vertical"
      class="flex w-full justify-center gap-2 flex-1"
   >
      <div class="overflow-hidden w-fit">
         <UiThingTabsList
            :pill="false"
            class="relative flex-col gap-1 rounded-none bg-transparent px-1 py-0 text-foreground border-l border-border items-start justify-start w-fit h-fit"
         >
            <UiThingTabsTrigger
               v-for="t in tabs"
               :key="t.title"
               :pill="false"
               :value="t.title"
               class="relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
            >
               <Icon
                  v-if="t.icon"
                  :name="t.icon"
                  class="-ms-0.5 me-1.5 size-4 opacity-60"
               />
               {{ t.title }}
            </UiThingTabsTrigger>
         </UiThingTabsList>
      </div>
      <UiThingTabsContent
         v-for="t in tabs"
         :key="t.title"
         class="flex-1"
         :value="t.title"
      >
         <UiThingTabs default-value="自動欄位">
            <UiThingTabsList>
               <UiThingTabsTrigger
                  value="自動欄位"
                  class="flex items-center gap-2"
               >
                  <Icon
                     name="ic:round-hdr-auto"
                     class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60"
                  />
                  自動欄位
               </UiThingTabsTrigger>
               <UiThingTabsTrigger
                  value="手動欄位"
                  class="flex items-center gap-2"
               >
                  <Icon
                     name="ic:round-dashboard-customize"
                     class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60"
                  />
                  彈性欄位
               </UiThingTabsTrigger>
            </UiThingTabsList>

            <UiThingTabsContent value="自動欄位">
               <div
                  class="grow rounded border border-border text-start bg-zinc-50 dark:bg-zinc-800"
               >
                  <ScrollArea class="w-full p-4 h-[300px]">
                     <UiThingDescriptionList>
                        <template
                           v-for="(value, key) in t.service.computedData"
                           :key="key"
                        >
                           <UiThingDescriptionListTerm>
                              {{ key }}
                           </UiThingDescriptionListTerm>
                           <UiThingDescriptionListDetails>
                              {{ value }}
                           </UiThingDescriptionListDetails>
                        </template>
                     </UiThingDescriptionList>
                  </ScrollArea>
               </div>
            </UiThingTabsContent>
            <UiThingTabsContent value="手動欄位">
               <div
                  class="grow rounded border border-border text-start bg-zinc-50 dark:bg-zinc-800"
               >
                  <ScrollArea class="w-full p-4 h-[300px]">
                     <div class="space-y-4">
                        <template
                           v-for="(value, key) in t.service.refData"
                           :key="key"
                        >
                           <CustomContentBlockRow
                              v-model="t.service.refData[key]"
                              :title="key"
                              :disabled="false"
                           />
                        </template>
                     </div>
                  </ScrollArea>
               </div>
            </UiThingTabsContent>
         </UiThingTabs>
      </UiThingTabsContent>
   </UiThingTabs>
</template>

<script lang="ts" setup>
import { ScrollArea } from "~/components/ui/scroll-area";
const props = defineProps<{
   dataExported: {
      name: string
      description: string | null
      records: PatentFundingRecord[]
      fundingUnitAccounting: FundingUnitAccounting[]
      internalAccounting: InternalAccountingAdjustment[]
      date: Date
   } | null
   fundingService: UsePatentFundings
}>();
const fundingService = props.fundingService;
const dataExported = toRef(() => props.dataExported);
const { patentData: patent, fundingData } = toRefs(fundingService);
const fundingPlan = computed(() => {
   return fundingData.value?.plan ?? null;
});

const exportService = useFundingExport({
   dataExported,
   patent,
   fundingPlan,
});

const tabs = ref([
   {
      title: "專利費用繳款通知單",
      service: exportService.patentFeeNotice(),
   },
   {
      title: "費用分攤協議書",
      service: exportService.patentCostSharingAgreement(),
   },
   {
      title: "系所分攤便函",
      service: exportService.departmentCostMemo(),
   },
   {
      title: "支出機關分攤表",
      service: exportService.unitCostAllocationTable(),
   },
   {
      title: "支出科目分攤表",
      service: exportService.internalCostAllocationTable(),
   },
] as {
   title: string
   service: {
      computedData: ComputedRef<Record<string, any>>
      refData: Ref<Record<string, any>>
   }
   icon?: string
}[]);
</script>
