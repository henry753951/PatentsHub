-- CreateTable
CREATE TABLE "AgencyUnit" (
    "AgencyUnitID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT
);

-- CreateTable
CREATE TABLE "PatentTakerAgencyUnit" (
    "PatentID" INTEGER NOT NULL,
    "AgencyUnitID" INTEGER NOT NULL,
    "FileCode" TEXT NOT NULL,
    "agencyUnitPersonIds" JSONB DEFAULT [],

    PRIMARY KEY ("PatentID", "AgencyUnitID"),
    CONSTRAINT "PatentTakerAgencyUnit_AgencyUnitID_fkey" FOREIGN KEY ("AgencyUnitID") REFERENCES "AgencyUnit" ("AgencyUnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentTakerAgencyUnit_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "PatentInternal" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentInitiatorAgencyUnit" (
    "PatentID" INTEGER NOT NULL,
    "AgencyUnitID" INTEGER NOT NULL,
    "agencyUnitPersonIds" JSONB DEFAULT [],

    PRIMARY KEY ("PatentID", "AgencyUnitID"),
    CONSTRAINT "PatentInitiatorAgencyUnit_AgencyUnitID_fkey" FOREIGN KEY ("AgencyUnitID") REFERENCES "AgencyUnit" ("AgencyUnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentInitiatorAgencyUnit_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "PatentInternal" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AgencyUnitPerson" (
    "AgencyUnitID" INTEGER NOT NULL,
    "ContactInfoID" INTEGER NOT NULL,

    PRIMARY KEY ("AgencyUnitID", "ContactInfoID"),
    CONSTRAINT "AgencyUnitPerson_AgencyUnitID_fkey" FOREIGN KEY ("AgencyUnitID") REFERENCES "AgencyUnit" ("AgencyUnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AgencyUnitPerson_ContactInfoID_fkey" FOREIGN KEY ("ContactInfoID") REFERENCES "ContactInfo" ("ContactInfoID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FundingUnit" (
    "FundingUnitID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FundingPlan" (
    "FundingPlanID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FundingPlanAllocation" (
    "FundingPlanAllocationID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Percentage" INTEGER NOT NULL,
    "TargetID" INTEGER NOT NULL,
    "FundingPlanID" INTEGER NOT NULL,
    CONSTRAINT "FundingPlanAllocation_TargetID_fkey" FOREIGN KEY ("TargetID") REFERENCES "FundingPlanTarget" ("TargetID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FundingPlanAllocation_FundingPlanID_fkey" FOREIGN KEY ("FundingPlanID") REFERENCES "FundingPlan" ("FundingPlanID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FundingPlanTarget" (
    "TargetID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PatentFunding" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FundingPlanPlanID" INTEGER,
    CONSTRAINT "PatentFunding_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PatentFunding_FundingPlanPlanID_fkey" FOREIGN KEY ("FundingPlanPlanID") REFERENCES "FundingPlan" ("FundingPlanID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentFundingUnit" (
    "ProjectCode" TEXT NOT NULL,
    "FundingUnitID" INTEGER NOT NULL,
    "PatentID" INTEGER NOT NULL,

    PRIMARY KEY ("PatentID", "FundingUnitID"),
    CONSTRAINT "PatentFundingUnit_FundingUnitID_fkey" FOREIGN KEY ("FundingUnitID") REFERENCES "FundingUnit" ("FundingUnitID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PatentFundingUnit_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "PatentFunding" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentFundingRecord" (
    "FundingRecordID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "Amount" INTEGER NOT NULL,
    "Date" DATETIME NOT NULL,
    "PatentFundingPatentID" INTEGER NOT NULL,
    "ExportID" INTEGER,
    CONSTRAINT "PatentFundingRecord_PatentFundingPatentID_fkey" FOREIGN KEY ("PatentFundingPatentID") REFERENCES "PatentFunding" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentFundingRecord_ExportID_fkey" FOREIGN KEY ("ExportID") REFERENCES "PatentFundingExport" ("ExportID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentFundingExport" (
    "ExportID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "ExportDate" DATETIME NOT NULL,
    "PatentID" INTEGER NOT NULL,
    CONSTRAINT "PatentFundingExport_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "PatentFunding" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentFundingExportContribution" (
    "ContributionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ExportID" INTEGER NOT NULL,
    "FundingUnitID" INTEGER NOT NULL,
    "RecordID" INTEGER NOT NULL,
    "Amount" INTEGER NOT NULL,
    CONSTRAINT "PatentFundingExportContribution_RecordID_fkey" FOREIGN KEY ("RecordID") REFERENCES "PatentFundingRecord" ("FundingRecordID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentFundingExportContribution_ExportID_fkey" FOREIGN KEY ("ExportID") REFERENCES "PatentFundingExport" ("ExportID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PatentFundingExportContribution_FundingUnitID_fkey" FOREIGN KEY ("FundingUnitID") REFERENCES "FundingUnit" ("FundingUnitID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentFundingExportInternalAllocation" (
    "InternalContributionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Amount" INTEGER NOT NULL,
    "PlanTargetID" INTEGER NOT NULL,
    "ExportID" INTEGER NOT NULL,
    CONSTRAINT "PatentFundingExportInternalAllocation_PlanTargetID_fkey" FOREIGN KEY ("PlanTargetID") REFERENCES "FundingPlanTarget" ("TargetID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentFundingExportInternalAllocation_ExportID_fkey" FOREIGN KEY ("ExportID") REFERENCES "PatentFundingExport" ("ExportID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inventor" (
    "InventorID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DepartmentID" INTEGER NOT NULL,
    "ContactInfoID" INTEGER NOT NULL,
    CONSTRAINT "Inventor_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventor_ContactInfoID_fkey" FOREIGN KEY ("ContactInfoID") REFERENCES "ContactInfo" ("ContactInfoID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentInventor" (
    "PatentID" INTEGER NOT NULL,
    "InventorID" INTEGER NOT NULL,
    "Main" BOOLEAN NOT NULL,
    "Contribution" REAL NOT NULL DEFAULT 0,

    PRIMARY KEY ("PatentID", "InventorID"),
    CONSTRAINT "PatentInventor_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PatentInventor_InventorID_fkey" FOREIGN KEY ("InventorID") REFERENCES "Inventor" ("InventorID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Note" (
    "NoteID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Key" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Body" TEXT NOT NULL,
    "Date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Patent" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DepartmentID" INTEGER NOT NULL,
    "Year" INTEGER,
    "DraftTitle" TEXT NOT NULL DEFAULT '',
    "Title" TEXT NOT NULL DEFAULT '',
    "TitleEnglish" TEXT NOT NULL DEFAULT '',
    "CountryID" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Pinned" BOOLEAN NOT NULL DEFAULT false,
    "PatentType" TEXT,
    "InternalID" TEXT NOT NULL,
    "InitialReviewDate" DATETIME,
    "InitialReviewNumber" INTEGER,
    CONSTRAINT "Patent_CountryID_fkey" FOREIGN KEY ("CountryID") REFERENCES "Country" ("CountryID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Patent_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentApplicationData" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ApplicationNumber" TEXT,
    "FilingDate" DATETIME,
    "RDResultNumber" TEXT,
    "NSCNumber" TEXT,
    CONSTRAINT "PatentApplicationData_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentTechnicalAttributes" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "MaturityLevel" TEXT,
    CONSTRAINT "PatentTechnicalAttributes_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TechnicalKeyword" (
    "KeywordID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Keyword" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PatentInternal" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "PatentInternal_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentExternal" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentNumber" TEXT,
    "PublicationDate" DATETIME,
    "StartDate" DATETIME,
    "EndDate" DATETIME,
    "IPCNumber" TEXT,
    "PatentScope" TEXT,
    CONSTRAINT "PatentExternal_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentManualStatus" (
    "ManualStatusID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentID" INTEGER NOT NULL,
    "Reason" TEXT NOT NULL,
    "Date" DATETIME,
    "Active" BOOLEAN NOT NULL,
    "Override" BOOLEAN NOT NULL,
    CONSTRAINT "PatentManualStatus_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentMaintenance" (
    "MaintenanceID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentID" INTEGER NOT NULL,
    "MaintenanceDate" DATETIME NOT NULL,
    "ExpireDate" DATETIME NOT NULL,
    "Title" TEXT,
    CONSTRAINT "PatentMaintenance_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentID" INTEGER NOT NULL,
    "Record" TEXT,
    "Date" DATETIME,
    CONSTRAINT "PatentRecord_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentOwner" (
    "OwnerID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "OwnershipPercentage" REAL NOT NULL DEFAULT 0.0,
    CONSTRAINT "PatentOwner_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "College" (
    "CollegeID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT
);

-- CreateTable
CREATE TABLE "Department" (
    "DepartmentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "CollegeID" INTEGER NOT NULL,
    "Description" TEXT,
    CONSTRAINT "Department_CollegeID_fkey" FOREIGN KEY ("CollegeID") REFERENCES "College" ("CollegeID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Country" (
    "CountryID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CountryName" TEXT NOT NULL,
    "ISOCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "ContactInfoID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Email" TEXT,
    "OfficeNumber" TEXT,
    "PhoneNumber" TEXT,
    "Role" TEXT,
    "Note" TEXT
);

-- CreateTable
CREATE TABLE "_FundingUnitToPatentFundingRecord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FundingUnitToPatentFundingRecord_A_fkey" FOREIGN KEY ("A") REFERENCES "FundingUnit" ("FundingUnitID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FundingUnitToPatentFundingRecord_B_fkey" FOREIGN KEY ("B") REFERENCES "PatentFundingRecord" ("FundingRecordID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PatentTechnicalAttributesToTechnicalKeyword" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PatentTechnicalAttributesToTechnicalKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "PatentTechnicalAttributes" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PatentTechnicalAttributesToTechnicalKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "TechnicalKeyword" ("KeywordID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AgencyUnitPerson_ContactInfoID_key" ON "AgencyUnitPerson"("ContactInfoID");

-- CreateIndex
CREATE INDEX "PatentFundingExportContribution_ExportID_idx" ON "PatentFundingExportContribution"("ExportID");

-- CreateIndex
CREATE INDEX "PatentFundingExportInternalAllocation_ExportID_idx" ON "PatentFundingExportInternalAllocation"("ExportID");

-- CreateIndex
CREATE UNIQUE INDEX "Inventor_ContactInfoID_key" ON "Inventor"("ContactInfoID");

-- CreateIndex
CREATE UNIQUE INDEX "Note_Key_key" ON "Note"("Key");

-- CreateIndex
CREATE INDEX "KeyIndex" ON "Note"("Key");

-- CreateIndex
CREATE UNIQUE INDEX "Patent_InternalID_key" ON "Patent"("InternalID");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalKeyword_Keyword_key" ON "TechnicalKeyword"("Keyword");

-- CreateIndex
CREATE UNIQUE INDEX "College_Name_key" ON "College"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_Name_key" ON "Department"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_CountryName_key" ON "Country"("CountryName");

-- CreateIndex
CREATE UNIQUE INDEX "Country_ISOCode_key" ON "Country"("ISOCode");

-- CreateIndex
CREATE UNIQUE INDEX "_FundingUnitToPatentFundingRecord_AB_unique" ON "_FundingUnitToPatentFundingRecord"("A", "B");

-- CreateIndex
CREATE INDEX "_FundingUnitToPatentFundingRecord_B_index" ON "_FundingUnitToPatentFundingRecord"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PatentTechnicalAttributesToTechnicalKeyword_AB_unique" ON "_PatentTechnicalAttributesToTechnicalKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_PatentTechnicalAttributesToTechnicalKeyword_B_index" ON "_PatentTechnicalAttributesToTechnicalKeyword"("B");
