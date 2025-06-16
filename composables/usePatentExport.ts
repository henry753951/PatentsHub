import ExcelJS from "exceljs";
const EXPORT_COLUMNS = [
   //
   { header: "狀態", key: "status", width: 10 },
   // Patent.Year
   { header: "年度", key: "year", width: 10 },
   // Patent.InternalID
   { header: "校內編號", key: "internalId", width: 20 },
   // Patent.department.college.Name  Patent.department.Name
   { header: "學院", key: "college", width: 20 },
   { header: "單位系所", key: "department", width: 20 },
   // Patent.inventors[] Main==true
   { header: "發明人", key: "inventor", width: 20 },
   // Patent.inventors[] Main==false
   { header: "共同發明人", key: "coInventor", width: 20 },
   // Patent.Title Patent.TitleEnglish
   { header: "專利名稱", key: "title", width: 30 },
   { header: "發明名稱（英）", key: "englishTitle", width: 30 },
   // Patent.external.PatentNumber
   { header: "專利號碼", key: "patentNumber", width: 20 },
   // Patent.external.StartDate  Patent.external.EndDate
   { header: "專利權期間", key: "patentPeriod", width: 20 },
   // 領證日期 Patent.external.PublicationDate
   { header: "公告/獲證日期", key: "publicationDate", width: 20 },
   { header: "領證年度", key: "certificationYear", width: 20 },
   // 維護期程 Patent.maintenance[].ExpireDate (newliest)
   { header: "維護期程", key: "maintenanceDate", width: 20 },
   { header: "維護年度計", key: "maintenanceYear", width: 20 },
   { header: "到期月份", key: "expirationMonth", width: 20 },
   // 申請日期 Patent.application.FilingDate
   { header: "申請日期", key: "applicationDate", width: 20 },
   { header: "申請年度", key: "applicationYear", width: 20 },
   // 申請案號 Patent.application.ApplicationNumber
   { header: "申請案號", key: "applicationNumber", width: 20 },
   // 專利類別 Patent.PatentType Map to INVENTION // 發明專利 UTILITY_MODEL // 新型專利 DESIGN // 設計專利 PLANT // 植物專利 (US only)
   { header: "專利類別", key: "patentType", width: 20 },
   // 專利國家 Patent.country.CountryName
   { header: "專利國家", key: "country", width: 20 },
   // 方案 Patent.funding.plan.Name
   { header: "方案", key: "fundingPlan", width: 20 },
   // 資助單位 Patent.funding.fundingUnits[].fundingUnit.Name
   { header: "資助單位", key: "fundingUnit", width: 20 },
   // 計畫編號  Patent.funding.fundingUnits[].ProjectCode
   { header: "計畫編號", key: "projectCode", width: 20 },
   // 承辦事務所 Patent.internal.TakerAgencies[].agencyUnit.Name
   { header: "承辦事務所", key: "takerAgency", width: 20 },
   // 事務所聯絡人 Patent.internal.TakerAgencies[].agencyUnitPersonIds from AgencyUnitPerson[]
   { header: "事務所聯絡人", key: "takerAgencyContact", width: 20 },
   // 事務所檔號 Patent.internal.TakerAgencies[].FileCode
   { header: "事務所檔號", key: "takerAgencyFileCode", width: 20 },
   // 研發成果編號（STRIKE）Patent.application.RDResultNumber
   { header: "研發成果編號（STRIKE）", key: "rdResultNumber", width: 20 },
   // 國科會編號（STRIKE） Patent.application.NSCNumber
   { header: "國科會編號（STRIKE）", key: "nscNumber", width: 20 },
   // 專利已登錄 (Not Implemented)
   { header: "專利已登錄", key: "isRegistered", width: 20 },
   // 國際專利分類號IPC Patent.external.IPCNumber
   { header: "國際專利分類號IPC", key: "ipcCode", width: 20 },
   // 專利範圍 Patent.external.PatentScope
   { header: "專利範圍", key: "patentScope", width: 30 },
   // 技術成熟度TRL Patent.technical.MaturityLevel
   { header: "技術成熟度TRL", key: "maturityLevel", width: 20 },
   // 技推委員會日期 Patent.InitialReviewDate
   { header: "技推委員會日期", key: "reviewDate", width: 20 },
   // 技推委員會次數 Patent.InitialReviewNumber
   { header: "技推委員會次數", key: "initialReviewNumber", width: 20 },
   // 發明名稱(稿) Patent.DraftTitle
   { header: "發明名稱(稿)", key: "draftTitle", width: 30 },
   // 初評事務所 Patent.internal.InitialReviewAgencies[].agencyUnit.Name
   { header: "初評事務所", key: "initialReviewAgency", width: 20 },
   // 技術關鍵字 Patent.technical.Keywords[].Keyword
   { header: "技術關鍵字", key: "keywords", width: 30 },
   // 進度 (Not Implemented)
   { header: "進度", key: "records", width: 20 },
   // 費用 (Not Implemented)
   { header: "費用", key: "costs", width: 20 },
];

export const usePatentExport = () => {
   const { $trpc } = useNuxtApp();

   const exportPatent = async (patentIds: Set<number>) => {
      // Fetch patent data
      const contactInfos = await $trpc.data.contactInfo.getContactInfos.query(
         {},
      );
      consola.log("Contact Infos:", contactInfos);
      const patents = await $trpc.data.patent.getFullPatents.query({
         PatentID: {
            in: Array.from(patentIds),
         },
      });

      // Initialize workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("資料表", {
         views: [{ xSplit: 1 }],
         pageSetup: { paperSize: 9, orientation: "landscape" },
      });
      sheet.columns = EXPORT_COLUMNS;

      // Style header row
      const headerRow = sheet.getRow(1);
      headerRow.font = { bold: true };
      headerRow.alignment = { horizontal: "center" };
      headerRow.height = 20;
      headerRow.eachCell((cell) => {
         cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFCCCCCC" },
         };
      });

      // Process and add patent data
      patents.forEach((patent) => {
         const rowData = {
            status: () => {
               const current = getPatentStatus(patent);
               if (current === "國科會同意終止" && patent.CaseNotFound) {
                  return "智慧局查無案件";
               }
               return current;
            },
            year: () => patent.Year?.toString() || "",
            internalId: () => patent.InternalID || "",
            college: () => patent.department?.college?.Name || "",
            department: () => patent.department?.Name || "",
            inventor: () =>
               patent.inventors.find((i) => i.Main)?.inventor.contactInfo
                  .Name || "",
            coInventor: () =>
               joinArray(
                  patent.inventors
                     .filter((i) => !i.Main)
                     .map((i) => i.inventor.contactInfo.Name),
               ),
            title: () => patent.Title || "",
            englishTitle: () => patent.TitleEnglish || "",
            patentNumber: () => patent.external?.PatentNumber || "",
            patentPeriod: () => {
               if (!patent.external?.StartDate || !patent.external?.EndDate)
                  return "";
               return `${formatDate(patent.external?.StartDate)} - ${formatDate(patent.external?.EndDate)}`;
            },
            publicationDate: () => formatDate(patent.external?.PublicationDate),
            certificationYear: () =>
               getROCYear(patent.external?.PublicationDate),
            maintenanceDate: () => {
               const latest = patent.maintenances?.[0];
               return latest ? formatDate(latest.ExpireDate) : "";
            },
            maintenanceYear: () => {
               const latest = patent.maintenances?.[0];
               return latest ? latest.ExpireDate.getFullYear().toString() : "";
            },
            expirationMonth: () => {
               const latest = patent.maintenances?.[0];
               return latest
                  ? (latest.ExpireDate.getMonth() + 1).toString()
                  : "";
            },
            applicationDate: () => formatDate(patent.application?.FilingDate),
            applicationYear: () => getROCYear(patent.application?.FilingDate),
            applicationNumber: () =>
               patent.application?.ApplicationNumber || "",
            patentType: () => {
               const typeMap: Record<string, string> = {
                  INVENTION: "發明專利",
                  UTILITY_MODEL: "新型專利",
                  DESIGN: "設計專利",
                  PLANT: "植物專利",
               };
               return patent.PatentType ? typeMap[patent.PatentType] : "";
            },
            country: () => patent.country?.CountryName || "",
            fundingPlan: () => patent.funding?.plan?.Name || "",
            fundingUnit: () =>
               joinArray(
                  patent.funding?.fundingUnits.map(
                     (fu) => fu.fundingUnit.Name,
                  ) || [],
               ),
            projectCode: () =>
               joinArray(
                  patent.funding?.fundingUnits.map((fu) => fu.ProjectCode)
                  || [],
               ),
            takerAgency: () =>
               joinArray(
                  patent.internal?.TakerAgencies.map(
                     (ta) => ta.agencyUnit.Name,
                  ) || [],
               ),
            takerAgencyContact: () =>
               joinArray(
                  patent.internal?.TakerAgencies.flatMap((ta) =>
                     (ta.agencyUnitPersonIds as Array<number>).map((id) =>
                        contactInfos.find((c) => c.ContactInfoID === id),
                     ),
                  ).map((c) => c?.Name) || [],
               ),
            takerAgencyFileCode: () =>
               joinArray(
                  patent.internal?.TakerAgencies.map((ta) => ta.FileCode) || [],
               ),
            rdResultNumber: () => patent.application?.RDResultNumber || "",
            nscNumber: () => patent.application?.NSCNumber || "",
            isRegistered: () => {
               return patent.external?.PatentNumber
                 && patent.external?.StartDate
                  ? "是"
                  : "否";
            },
            ipcCode: () => patent.external?.IPCNumber || "",
            patentScope: () => patent.external?.PatentScope || "",
            maturityLevel: () => patent.technical?.MaturityLevel || "",
            reviewDate: () => formatDate(patent.InitialReviewDate),
            initialReviewNumber: () =>
               patent.InitialReviewNumber?.toString() || "",
            draftTitle: () => patent.DraftTitle || "",
            initialReviewAgency: () =>
               joinArray(
                  patent.internal?.InitialReviewAgencies.map(
                     (ira) => ira.agencyUnit.Name,
                  ) || [],
               ),
            keywords: () =>
               joinArray(
                  patent.technical?.keywords.map((k) => k.Keyword) || [],
               ),
            records: () => {
               const records = patent.patentRecords || [];
               return joinArray(
                  records.map((r) => `◎${r.Date}: ${r.Record}`),
                  "\n",
               );
            },
            costs: () => {
               const costs = patent.funding?.fundingExports || [];
               return joinArray(
                  costs.map(
                     (c) =>
                        `◎${c.ExportDate} ${c.Description} : ${c.exportRecords.map((er) => `${er.Name}-$${er.Amount}`).join(", ")}`,
                  ),
                  "\n",
               );
            },
         };

         // Evaluate anonymous functions to get final row data
         const evaluatedRowData = Object.fromEntries(
            Object.entries(rowData).map(([key, fn]) => [key, fn()]),
         );

         const row = sheet.addRow(evaluatedRowData);
         row.eachCell((cell) => {
            cell.alignment = { vertical: "middle", horizontal: "left" };
         });
         row.commit();
      });

      // Download the workbook as an Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      window
         .showSaveFilePicker({
            suggestedName: "專利資料.xlsx",
            types: [
               {
                  description: "Excel 文件",
                  accept: {
                     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        [".xlsx"],
                  },
               },
            ],
         })
         .then((fileHandle) => {
            return fileHandle.createWritable().then((fileStream) => {
               return fileStream.write(blob).then(() => {
                  return fileStream.close();
               });
            });
         })
         .catch((error) => {
            console.error("Error saving file:", error);
            throw new Error("Failed to save the Excel file.");
         });
   };

   return {
      exportPatent,
   };
};

// Helper function to format date safely
const formatDate = (date?: Date | null): string => {
   return date ? date.toISOString().split("T")[0] : "";
};

// Helper function to get year adjusted for ROC calendar
const getROCYear = (date?: Date | null): string => {
   return date ? (date.getFullYear() - 1911).toString() : "";
};

// Helper function to format array data with join
const joinArray = (
   items: Array<string | undefined>,
   separator = ", ",
): string => {
   return items.filter((item): item is string => !!item).join(separator);
};
