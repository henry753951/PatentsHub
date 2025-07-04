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
   onMounted(() => {
      loadTemplates();
   });
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

   const numberToChineseCurrency = (num: number): string => {
      if (isNaN(num) || num === 0) return "零元整";

      const units = ["", "拾", "佰", "仟"];
      const bigUnits = ["", "萬", "億", "兆"];
      const digits = "零壹貳參肆伍陸柒捌玖";

      const integerPart = Math.floor(num);

      const numStr = integerPart.toString();
      let result = "";
      let zeroFlag = false;

      for (let i = 0; i < numStr.length; i++) {
         const digit = +numStr[numStr.length - 1 - i];
         const unitIndex = i % 4;
         const bigUnitIndex = Math.floor(i / 4);

         if (digit === 0) {
            if (!zeroFlag && i !== 0) {
               result = digits[0] + result;
               zeroFlag = true;
            }
         }
         else {
            result
               = digits[digit]
                 + units[unitIndex]
                 + (unitIndex === 0 ? bigUnits[bigUnitIndex] : "")
                 + result;
            zeroFlag = false;
         }
      }

      // 清理掉多餘的零
      result = result.replace(/零+/g, "零");
      result = result.replace(/零(萬|億|兆)/g, "$1");
      result = result.replace(/億萬/, "億");
      result = result.replace(/零$/, "");

      return result + "元整";
   };

   // PDF 1: 專利費用繳款通知單
   const patentFeeNotice = async () => {
      const computedData = computed(() => {
         const inventorShare = getShare("發明人").value;
         const inventorSharePercent = getSharePercent("發明人").value;

         return {
            校內編號: patent.value?.InternalID,
            專利名稱: patent.value?.Title,
            國家: patent.value?.country?.CountryName,
            費用項目: `${dataExported.value?.name} (${formatTaiwanDate(dataExported.value?.date, "YY.MM")})`,
            費用總額: formatNumber(totalAmount.value),
            發明人分攤費用: formatNumber(inventorShare),
            發明人: `${mainInventor.value?.inventor.contactInfo.Name}`,
            發明人職位: `${mainInventor.value?.inventor.contactInfo.Role ? mainInventor.value?.inventor.contactInfo.Role : ""}`,
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
            校內編號: patent.value?.InternalID,
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
            發明人: `${mainInventor.value ? `${mainInventor.value.inventor.contactInfo.Name}${mainInventor.value.inventor.contactInfo.Role ? " " + mainInventor.value.inventor.contactInfo.Role : ""}` : ""}`,
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

   // PDF 4: 支出機關分攤表
   const unitCostAllocationTable = async () => {
      const computedData = computed(() => {
         const totalAmount
            = dataExported.value?.records.reduce(
               (sum, rec) => sum + rec.Amount,
               0,
            ) || 0;

         const fundingUnitsContributions
            = dataExported.value?.fundingUnitAccounting.flatMap((fua, fuaIndex) =>
               fua.unitContributions.map((uc, ucIndex) => {
                  const unit = patent.value?.funding?.fundingUnits.find(
                     (u) => u.fundingUnit.FundingUnitID === uc.unitId,
                  );
                  const result = {
                     name: unit?.fundingUnit.Name,
                     amount: uc.amount,
                  };
                  return result;
               }),
            ) || [];
         let totalInternalAmount = 0;
         dataExported.value?.internalAccounting.forEach((adj, i) => {
            totalInternalAmount += adj.amount;
         });

         const externalAmount = fundingUnitsContributions.reduce(
            (sum, item) => sum + item.amount,
            0,
         );

         const externalNames = fundingUnitsContributions
            .map((item) => item.name ?? "")
            .join("\n");

         const externalPercents = fundingUnitsContributions
            .map((item) => {
               const raw = (item.amount / totalAmount) * 100;
               return Number.isInteger(raw) ? `${raw}%` : `${raw.toFixed(1)}%`;
            })
            .join("\n");

         const externalAmounts = fundingUnitsContributions
            .map((item) => item.amount.toLocaleString())
            .join("\n");

         const internalAmount = totalInternalAmount;

         const externalPercent
            = totalAmount > 0 ? (externalAmount / totalAmount) * 100 : 0;
         const internalPercent
            = totalAmount > 0 ? (internalAmount / totalAmount) * 100 : 0;

         return {
            費用總額: totalAmount.toLocaleString(),
            國字費用總額: numberToChineseCurrency(totalAmount),
            主持人: patent.value?.inventors.find((inv) => inv.Main)?.inventor
               .contactInfo.Name,
            日期: formatTaiwanDate(dataExported.value?.date),
            所屬年度: dataExported.value?.date
               ? `${dataExported.value.date.getFullYear() - 1911}`
               : "",
            所屬月份: dataExported.value?.date
               ? `${dataExported.value.date.getMonth() + 1}`
               : "",
            專利名稱: `${patent.value?.Title} [${patent.value?.InternalID}]`,
            校外分攤機關名稱: externalNames,
            校外分攤金額: externalAmounts,
            校外分攤百分比: externalPercents,
            校內分攤金額: internalAmount.toLocaleString(),
            校內占比: internalPercent,
            占比合計: externalPercent + internalPercent,
         };
      });

      // 彈性欄位 Map，預設值
      const refData = ref<Record<string, string>>({
         說明: [
            "(1)支出憑證由主辦機關另行保存或彙總附入支出憑證簿送審者，應加具本分攤表。",
            "(2)各分攤機關以主辦機關出具之收據，附本分攤表。",
            "(3)原始憑證   張，粘附於           月份113年度研發處統籌獎勵及補助經費計畫（科目）支出憑證簿第      冊第            號。",
            "(4)因國科會補助額度已滿，該費用依簽呈1101400001奉鈞長同意由校務發展統籌款支應。",
            "(5)申請及實審費",
         ].join("\n"),
      });

      return {
         computedData,
         refData,
         template: ref(await getTemplate("unitCostAllocationTable")),
      };
   };

   // PDF 5: 高雄大學支出分攤表
   const internalCostAllocationTable = async () => {
      const computedData = computed(() => {
         const totalAmount
            = dataExported.value?.records.reduce(
               (sum, rec) => sum + rec.Amount,
               0,
            ) || 0;
         const percentMap = Object.fromEntries(
            fundingPlan.value?.planAllocations.map((a) => [
               a.TargetID,
               a.Percentage,
            ]) ?? [],
         );

         const adjustments = dataExported.value?.internalAccounting.map(
            (adj) => {
               const percent = percentMap[adj.targetId] ?? 0;
               const isInventor = adj.targetName.includes("發明人");
               const totalStr = totalAmount.toLocaleString();
               const amountStr = adj.amount.toLocaleString();

               return {
                  targetName: adj.targetName,
                  amount: adj.amount,
                  allocationMethod: `${totalStr} × 40% × ${percent}% = ${amountStr}元${isInventor ? "（發明人自行負擔）" : ""}`,
               };
            },
         );

         return {
            日期: formatTaiwanDate(dataExported.value?.date),
            年月日期: dataExported.value
               ? `${dataExported.value?.date.getFullYear() - 1911}年度 ${dataExported.value?.date.getMonth() + 1}月份`
               : "",
            總金額: (
               dataExported.value?.internalAccounting.reduce(
                  (sum, adj) => sum + adj.amount,
                  0,
               ) || 0
            ).toLocaleString(),
            國字總金額: numberToChineseCurrency(
               dataExported.value?.internalAccounting.reduce(
                  (sum, adj) => sum + adj.amount,
                  0,
               ) || 0,
            ),
            校方支出說明:
               (adjustments ?? []).find((a) => a.targetName === "校方")
                  ?.allocationMethod ?? "",
            發明人支出說明:
               (adjustments ?? []).find((a) => a.targetName === "發明人")
                  ?.allocationMethod ?? "",
            院系所支出說明:
               (adjustments ?? []).find((a) => a.targetName === "院系所")
                  ?.allocationMethod ?? "",
            校方支出金額:
               adjustments
                  ?.find((a) => a.targetName === "校方")
                  ?.amount.toLocaleString() ?? "",
            發明人支出金額:
               adjustments
                  ?.find((a) => a.targetName === "發明人")
                  ?.amount.toLocaleString() ?? "",
            院系所支出金額:
               adjustments
                  ?.find((a) => a.targetName === "院系所")
                  ?.amount.toLocaleString() ?? "",
            附註1: fundingPlan.value
               ? `本專利${fundingPlan.value.Name}方案（${fundingPlan.value.planAllocations.map((a) => `${a.Percentage}%`).join("、")}）。`
               : "",
            專利名稱: patent.value?.Title,
            校內編號: patent.value?.InternalID,
            發明人: patent.value?.inventors.find((inv) => inv.Main)?.inventor
               .contactInfo.Name,
         };
      });

      const refData = ref<Record<string, string>>({
         校方支出計畫編號: "無校方支出計畫編號",
         系所支出計畫編號: "無系所支出計畫編號",
         校方支出計畫名稱: "無校方計畫名稱",
         校方用途別科目名稱: "無校方用途別科目名稱",
         發明人支出項目名稱: "無發明人支出項目名稱",
      });

      return {
         computedData,
         refData,
         template: ref(await getTemplate("internalCostAllocationTable")),
      };
   };

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
