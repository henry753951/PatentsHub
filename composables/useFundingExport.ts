import { TemplateHandler } from "easy-template-x";
import { ref, computed, type Ref, type ComputedRef } from "vue";

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
   const { $trpc } = useNuxtApp();

   const templateList = ref<{ name: string }[]>([]);

   const loadTemplates = async () => {
      const files = await getTemplates();
      templateList.value = files
         .filter((file) => !file.isDirectory)
         .map((file) => ({
            name: file.name,
         }));
   };
   const openTemplateDirectory = async () => {
      await $trpc.app.config.openDirectory.mutate({
         directory: "templates",
      });
   };

   const getTemplates = async () => {
      const files = await $trpc.app.config.getUserDataFiles.query({
         directory: "templates",
      });
      return files.filter((file) => file.isDirectory === false);
   };

   const getTemplate = async (
      documentName: keyof RouterOutput["app"]["config"]["readConfig"]["funding"]["templates"],
   ) => {
      const config = await $trpc.app.config.readConfig.query();
      const templates = config.funding.templates;
      if (!(documentName in templates)) {
         throw new Error(`Template ${documentName} not found`);
      }
      return templates[documentName];
   };

   const updateTemplate = async (
      documentName: keyof RouterOutput["app"]["config"]["readConfig"]["funding"]["templates"],
      template: string,
   ) => {
      const config = await $trpc.app.config.readConfig.query();
      const templates = config.funding.templates;
      if (!(documentName in templates)) {
         throw new Error(`Template ${documentName} not found`);
      }
      templates[documentName] = template;
      await $trpc.app.config.writeConfig.mutate(config);
   };

   const exportDocument = async (
      data: {
         computedData: Record<string, any>
         refData: Record<string, string>
      },
      template: string,
      name: string = "Test",
   ) => {
      const response = await fetch("app://file/templates/" + template);
      if (!response.ok) {
         throw new Error(`找不到模板檔案: ${template}`);
      }
      const templateFile = await response.blob();
      const mergedData = {
         ...data.computedData,
         ...data.refData,
      };

      const handler = new TemplateHandler();
      const doc = await handler.process(templateFile, mergedData);

      const downloadHandle = await window.showSaveFilePicker({
         suggestedName: name + ".docx",
         types: [
            {
               description: "Word 文件",
            },
         ],
      });
      const writable = await downloadHandle.createWritable();
      await writable.write(doc);
      await writable.close();

      console.log("檔案下載成功");
   };

   // [Share Data] ----------------------------------
   const mainInventor = computed(() =>
      patent.value?.inventors.find((inv) => inv.Main),
   );
   const totalAmount = computed(
      () =>
         dataExported.value?.records.reduce(
            (sum, rec) => sum + rec.Amount,
            0,
         ) || 0,
   );
   const unitContribution = computed(() => {
      if (!dataExported.value || !patent.value) return [];
      const fundingUnits = patent.value.funding?.fundingUnits || [];
      return fundingUnits.map((unit) => {
         const totalContribution = dataExported
            .value!.fundingUnitAccounting.filter((fua) =>
            fua.unitContributions.some(
               (uc) => uc.unitId === unit.fundingUnit.FundingUnitID,
            ),
         )
            .reduce((sum, fua) => {
               return (
                  sum
                  + fua.unitContributions
                     .filter(
                        (uc) => uc.unitId === unit.fundingUnit.FundingUnitID,
                     )
                     .reduce((subSum, uc) => subSum + uc.amount, 0)
               );
            }, 0);

         return {
            name: unit.fundingUnit.Name,
            amount: totalContribution || 0,
         };
      });
   });

   const unitTotal = computed(() => {
      if (!unitContribution.value) return 0;
      return unitContribution.value.reduce((sum, item) => sum + item.amount, 0);
   });
   const getShare = (targetName: string) =>
      computed(
         () =>
            dataExported.value?.internalAccounting.find((adj) =>
               adj.targetName.includes(targetName),
            )?.amount || 0,
      );
   const getSharePercent = (targetName: string) =>
      computed(
         () =>
            fundingPlan.value?.planAllocations.find(
               (a) => a.target.Name === targetName,
            )?.Percentage || 0,
      );

   // PDF 1: 專利費用繳款通知單
   const patentFeeNotice = async () => {
      const computedData = computed(() => {
         const inventorShare = getShare("發明人").value;
         const inventorSharePercent = getSharePercent("發明人").value;

         return {
            本校編號: patent.value?.InternalID,
            專利名稱: patent.value?.Title,
            國家: patent.value?.country?.CountryName,
            費用項目: `${dataExported.value?.name} (${formatTaiwanDate(dataExported.value?.date, "YY.MM")})`,
            費用總額: formatNumber(totalAmount.value),
            發明人分攤費用: formatNumber(inventorShare),
            發明人: `${mainInventor.value?.inventor.contactInfo.Name}`,
            發明人職位: `${mainInventor.value?.inventor.contactInfo.Role}`,
            單位: `${patent.value?.department.college.Name}${patent.value?.department.Name}`,
            方案名稱: `${fundingPlan.value?.Name}`,
            發明人分攤算式: `${formatNumber(totalAmount.value)} × ${Math.round((1 - unitTotal.value / totalAmount.value) * 100)}% × ${inventorSharePercent}% = ${formatNumber(inventorShare)}`,
            資助單位補助: `${Math.round((unitTotal.value / totalAmount.value) * 100)}%`,
         };
      });

      const refData = ref<Record<string, string>>({
         paymentDate: formatTaiwanDate(new Date()),
      });

      return {
         computedData,
         refData,
         template: ref(await getTemplate("patentFeeNotice")),
      };
   };

   // PDF 2: 國立高雄大學研發成果申請專利費用分攤協議書
   const patentCostSharingAgreement = async () => {
      const computedData = computed(() => {
         return {
            本校編號: patent.value?.InternalID,
            專利名稱: patent.value?.Title,
            專利國別: patent.value?.country?.CountryName,
            申請人: mainInventor.value?.inventor.contactInfo.Name,
            補助機關: patent.value?.funding?.fundingUnits.map((unit) => ({
               名稱: unit.fundingUnit.Name,
               計畫編號: unit.ProjectCode,
            })),
            方案名稱: fundingPlan.value?.Name,
         };
      });

      const refData = ref<Record<string, string>>({
         coOwners: "無共同所有人",
      });

      return {
         computedData,
         refData,
         template: ref(await getTemplate("patentCostSharingAgreement")),
      };
   };

   // PDF 3: 便函 MEMORANDUM
   const departmentCostMemo = async () => {
      const computedData = computed(() => {
         const departmentShare = getShare("院系所").value;
         const departmentSharePercent = getSharePercent("院系所").value;
         const patentType
            = patent.value?.PatentType === "INVENTION"
               ? "發明"
               : patent.value?.PatentType === "UTILITY_MODEL"
                  ? "新型"
                  : patent.value?.PatentType === "DESIGN"
                     ? "設計"
                     : patent.value?.PatentType === "PLANT"
                        ? "植物"
                        : "其他";

         return {
            受文者: patent.value?.department.Name,
            發明人: `${mainInventor.value?.inventor.contactInfo.Name} ${mainInventor.value?.inventor.contactInfo.Role}`,
            完整項目名稱: `${patent.value?.country?.CountryName}${patentType}${dataExported.value?.name}`,
            專利名稱: `${patent.value?.Title}`,
            校內編號: `${patent.value?.InternalID}`,
            國別: `${patent.value?.country?.CountryName}`,
            方案: `${fundingPlan.value?.Name}`,
            分攤: fundingPlan.value?.planAllocations.map((a, index) => ({
               名稱: a.target.Name,
               百分比: `${a.Percentage}%`,
               end:
                  index
                  === (fundingPlan.value?.planAllocations?.length ?? 0) - 1
                     ? ""
                     : "、",
            })),
            專利類型: `${patentType}`,
            費用項目: dataExported.value?.name,
            費用總額: formatNumber(totalAmount.value),
            系所分攤費用: `${formatNumber(departmentShare)}`,
            系所分攤算式: `${formatNumber(totalAmount.value)} × ${Math.round(((totalAmount.value - unitTotal.value) / totalAmount.value) * 100)}% × ${departmentSharePercent}% = ${formatNumber(departmentShare)}`,
         };
      });

      const refData = ref<Record<string, string>>({
         日期: formatTaiwanDate(new Date(), "YY.MM.DD"),
         期限: formatTaiwanDate(new Date(), "YY年MM月DD日"),
         當天日期2: formatTaiwanDate(new Date(), "YY 年 MM 月 DD 日"),
      });

      return {
         computedData,
         refData,
         template: ref(await getTemplate("departmentCostMemo")),
      };
   };

   // PDF 4: 支出機關分攤表 TODO:鍾秉翰
   const unitCostAllocationTable = async () => {
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
            title: `${patent.value?.Title} [${patent.value?.InternalID}]`,
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

      return {
         computedData,
         refData,
         template: ref(await getTemplate("unitCostAllocationTable")),
      };
   };

   // PDF 5: 高雄大學支出分攤表 TODO:鍾秉翰
   const internalCostAllocationTable = async () => {
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

      return {
         computedData,
         refData,
         template: ref(await getTemplate("internalCostAllocationTable")),
      };
   };

   onMounted(() => {
      loadTemplates();
   });

   return {
      docs: {
         patentFeeNotice,
         patentCostSharingAgreement,
         departmentCostMemo,
         unitCostAllocationTable,
         internalCostAllocationTable,
      },
      templateList,
      openTemplateDirectory,
      loadTemplates,
      updateTemplate,
      exportDocument,
   };
};
