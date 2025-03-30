<template>
   <Dialog v-model:open="isOpen">
      <DialogContent class="max-w-[80vw]">
         <DialogHeader>
            <DialogTitle
               class="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent"
            >
               查看匯出紀錄
            </DialogTitle>
            <DialogDescription class="text-gray-600 text-lg">
               查看匯出紀錄的詳細資訊
            </DialogDescription>
         </DialogHeader>
         <div></div>
         <DialogFooter>
            <div class="flex justify-end">
               <Button
                  variant="secondary"
                  class="mr-2"
                  @click="isOpen = false"
               >
                  關閉
               </Button>
            </div>
         </DialogFooter>
      </DialogContent>
   </Dialog>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, defineModel, defineProps } from "vue";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogFooter,
} from "@/components/ui/dialog";

// Props 和 Model
const isOpen = defineModel("open", { type: Boolean, default: false });
const { fundingService, exportId } = defineProps<{
   fundingService: UsePatentFundings
   exportId: number
}>();

// Reactive Data
const dataExported = ref<{
   name: string
   description: string | null
   records: PatentFundingRecord[]
   fundingUnitAccounting: FundingUnitAccounting[]
   internalAccounting: InternalAccountingAdjustment[]
   date: Date
} | null>(null);
const fundingPlan = ref<FundingPlan | null>(null);
const patent = ref<RouterOutput["data"]["patent"]["getPatent"]>(null);

// 獨立的彈性欄位 Ref
const pdf1PaymentDate = ref(new Date());
const pdf2CoOwners = ref<string[]>([]);
const pdf3PaymentDeadline = ref(new Date());
const pdf4FundingUnitNotes = ref<{ notes: string, description: string }[]>([]);
const pdf4UniversityNotes = ref("");
const pdf4UniversityDescription = ref("");
const pdf5SubjectDetails = ref<
   { subjectCode: string, projectName: string, subjectName: string }[]
>([]);

// 加載資料
onMounted(() => {
   dataExported.value = fundingService.exports.actions.getExport(exportId);
   fundingPlan.value = fundingService.fundingData.value!.plan;
   patent.value = fundingService.patentData.value;
   if (dataExported.value?.date) {
      pdf1PaymentDate.value = dataExported.value.date;
      pdf3PaymentDeadline.value = dataExported.value.date;
   }
});

// Helper Functions
function formatTaiwanDate(date?: Date) {
   if (!date) return "未設定";
   const year = date.getFullYear() - 1911; // Republic of China year
   const month = date.getMonth() + 1;
   const day = date.getDate();
   return `${year}年${month}月${day}日`;
}

// PDF 1: 專利費用繳款通知單
const pdf1 = {
   computedData: computed(() => {
      const mainInventor = patent.value?.inventors.find((inv) => inv.Main);
      const totalAmount
         = dataExported.value?.records.reduce(
            (sum, rec) => sum + rec.Amount,
            0,
         ) || 0;
      const inventorShare
         = dataExported.value?.internalAccounting.find((adj) =>
            adj.targetName.includes("發明人"),
         )?.amount || 0;
      return {
         internalId: patent.value?.internal?.InternalID,
         title: patent.value?.Title,
         country: patent.value?.country?.CountryName,
         expenseItem: `${dataExported.value?.name} (${formatTaiwanDate(dataExported.value?.date)})`,
         totalAmount,
         inventorShare,
         inventor: `${mainInventor?.inventor.contactInfo.Name} ${mainInventor?.inventor.contactInfo.Role}`,
         department: `${patent.value?.department.college.Name} ${patent.value?.department.Name}`,
         date: formatTaiwanDate(pdf1PaymentDate.value),
      };
   }),
   refData: pdf1PaymentDate, // 直接使用獨立的 ref
};

// PDF 2: 國立高雄大學研發成果申請專利費用分攤協議書
const pdf2 = {
   computedData: computed(() => {
      const mainInventor = patent.value?.inventors.find((inv) => inv.Main);
      return {
         internalId: patent.value?.internal?.InternalID,
         title: patent.value?.Title,
         country: patent.value?.country?.CountryName,
         applicant: mainInventor?.inventor.contactInfo.Name,
         fundingUnits: patent.value?.funding?.fundingUnits.map((unit) => ({
            name: unit.fundingUnit.Name,
            projectCode: unit.ProjectCode,
         })),
         hasCoOwners: pdf2CoOwners.value.length > 0,
         coOwners: pdf2CoOwners.value,
         scheme: "C",
      };
   }),
   refData: pdf2CoOwners,
};

// PDF 3: 便函 MEMORANDUM
const pdf3 = {
   computedData: computed(() => {
      const mainInventor = patent.value?.inventors.find((inv) => inv.Main);
      const departmentShare
         = dataExported.value?.internalAccounting.find((adj) =>
            adj.targetName.includes("系所"),
         )?.amount || 0;
      const patentType
         = patent.value?.PatentType === "INVENTION"
            ? "發明專利"
            : patent.value?.PatentType === "UTILITY_MODEL"
               ? "新型專利"
               : "設計專利";
      return {
         recipient: patent.value?.department.Name,
         date: formatTaiwanDate(pdf3PaymentDeadline.value),
         subject: `有關貴系分攤 ${mainInventor?.inventor.contactInfo.Name} 老師 ${patent.value?.country?.CountryName} ${patentType} 申請及實審費用 新臺幣 ${departmentShare} 元整`,
         title: `${patent.value?.Title} (校內編號: ${patent.value?.internal?.InternalID})`,
         expenseItem: dataExported.value?.name,
         totalAmount:
            dataExported.value?.records.reduce(
               (sum, rec) => sum + rec.Amount,
               0,
            ) || 0,
         departmentShare,
      };
   }),
   refData: pdf3PaymentDeadline,
};

// PDF 4: 支出機關分攤表
const pdf4 = {
   computedData: computed(() => {
      const totalAmount
         = dataExported.value?.records.reduce(
            (sum, rec) => sum + rec.Amount,
            0,
         ) || 0;
      const fundingUnitsContributions
         = dataExported.value?.fundingUnitAccounting.flatMap((fua) =>
            fua.unitContributions.map((uc) => {
               const unit = patent.value?.funding?.fundingUnits.find(
                  (u) => u.fundingUnit.FundingUnitID === uc.unitId,
               );
               return { name: unit?.fundingUnit.Name, amount: uc.amount };
            }),
         ) || [];
      const totalInternalAmount
         = dataExported.value?.internalAccounting.reduce(
            (sum, adj) => sum + adj.amount,
            0,
         ) || 0;
      return {
         totalAmount,
         host: patent.value?.inventors.find((inv) => inv.Main)?.inventor
            .contactInfo.Name,
         projectCodes: patent.value?.funding?.fundingUnits.map(
            (unit) => unit.ProjectCode,
         ),
         date: formatTaiwanDate(dataExported.value?.date),
         title: `${patent.value?.Title} [${patent.value?.internal?.InternalID}]`,
         contributions: fundingUnitsContributions,
         universityAmount: totalInternalAmount,
      };
   }),
   refData: ref({
      fundingUnitNotes: pdf4FundingUnitNotes.value,
      universityNotes: pdf4UniversityNotes.value,
      universityDescription: pdf4UniversityDescription.value,
   }),
};

// PDF 5: 高雄大學支出分攤表
const pdf5 = {
   computedData: computed(() => {
      const totalAmount
         = dataExported.value?.records.reduce(
            (sum, rec) => sum + rec.Amount,
            0,
         ) || 0;
      const adjustments = dataExported.value?.internalAccounting.map(
         (adj, index) => ({
            targetName: adj.targetName,
            subjectCode: pdf5SubjectDetails.value[index]?.subjectCode || "",
            projectName: pdf5SubjectDetails.value[index]?.projectName || "",
            subjectName: pdf5SubjectDetails.value[index]?.subjectName || "",
            amount: adj.amount,
            allocationMethod: adj.targetName.includes("發明人")
               ? `${totalAmount} × 40% × 95% = ${adj.amount}元（發明人自行負擔）`
               : `${totalAmount} × 40% × 5% = ${adj.amount}元`,
         }),
      );
      return {
         fullDate: formatTaiwanDate(dataExported.value?.date),
         yearMonth: dataExported.value
            ? `${dataExported.value?.date.getFullYear() - 1911}年度 ${dataExported.value?.date.getMonth() + 1}月份`
            : "",
         totalAmount:
            dataExported.value?.internalAccounting.reduce(
               (sum, adj) => sum + adj.amount,
               0,
            ) || 0,
         adjustments,
         scheme: scheme.value,
      };
   }),
   refData: pdf5SubjectDetails,
};

// Computed Properties
const scheme = computed(() => {
   const plan = fundingPlan.value;
   const allocations = plan?.planAllocations
      .map((allocation) => {
         return `${allocation?.target.Name} (${allocation?.Percentage}%)`;
      })
      .join(", ");
   return `${plan?.Name} (${allocations})`;
});

</script>

<style scoped></style>
