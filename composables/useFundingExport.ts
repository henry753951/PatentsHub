import { ref, computed, type Ref, type ComputedRef } from "vue";

interface PdfData<T> {
   computedData: ComputedRef<T>
   refData: Map<string, Ref<string>>
}

interface UseFundingExportParams {
   dataExported: Ref<{
      name: string
      description: string | null
      records: PatentFundingRecord[]
      fundingUnitAccounting: FundingUnitAccounting[]
      internalAccounting: InternalAccountingAdjustment[]
      date: Date
   } | null>
   patent: Ref<RouterOutput["data"]["patent"]["getPatent"] | null>
   fundingPlan: Ref<FundingPlan | null>
}

export const useFundingExport = (params: UseFundingExportParams) => {
   const { dataExported, patent, fundingPlan } = params;

   // PDF 1: 專利費用繳款通知單
   const patentFeeNotice = () => {
      const computedData = computed(() => {
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
         };
      });

      const refData = ref<Record<string, string>>({
         paymentDate: formatTaiwanDate(new Date()), // 預設為當前日期
      });

      return { computedData, refData };
   };

   // PDF 2: 國立高雄大學研發成果申請專利費用分攤協議書
   const patentCostSharingAgreement = () => {
      const computedData = computed(() => {
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
            scheme: "C",
         };
      });

      // 彈性欄位 Map，預設值
      const refData = ref<Record<string, string>>({
         coOwners: "無共同所有人", // 預設為空共同所有人
      });

      return { computedData, refData };
   };

   // PDF 3: 便函 MEMORANDUM
   const departmentCostMemo = () => {
      const computedData = computed(() => {
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
      });

      const refData = ref<Record<string, string>>({
         paymentDeadline: formatTaiwanDate(new Date()), // 預設為當前日期
      });

      return { computedData, refData };
   };

   // PDF 4: 支出機關分攤表
   const unitCostAllocationTable = () => {
      const computedData = computed(() => {
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
      });

      // 彈性欄位 Map，預設值
      const refData = ref<Record<string, string>>({
         fundingUnitNotes: "無備註", // 預設無備註
         universityNotes: "無大學備註", // 預設無大學備註
         universityDescription: "無大學描述", // 預設無大學描述
      });

      return { computedData, refData };
   };

   // PDF 5: 高雄大學支出分攤表
   const internalCostAllocationTable = () => {
      const computedData = computed(() => {
         const totalAmount
            = dataExported.value?.records.reduce(
               (sum, rec) => sum + rec.Amount,
               0,
            ) || 0;
         const adjustments = dataExported.value?.internalAccounting.map(
            (adj) => ({
               targetName: adj.targetName,
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
            scheme: fundingPlan.value
               ? `${fundingPlan.value.Name} (${fundingPlan.value.planAllocations.map((a) => `${a.target.Name} (${a.Percentage}%)`).join(", ")})`
               : "",
         };
      });

      const refData = ref<Record<string, string>>({
         subjectDetails: "無備註",
      });

      return { computedData, refData };
   };

   return {
      patentFeeNotice,
      patentCostSharingAgreement,
      departmentCostMemo,
      unitCostAllocationTable,
      internalCostAllocationTable,
   };
};
