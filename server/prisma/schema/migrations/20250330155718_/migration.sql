-- CreateTable
CREATE TABLE "PatentFundingExport" (
    "ExportID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentFundingRecord" (
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
INSERT INTO "new_PatentFundingRecord" ("Amount", "Date", "Description", "ExportID", "FundingRecordID", "Name", "PatentFundingPatentID") SELECT "Amount", "Date", "Description", "ExportID", "FundingRecordID", "Name", "PatentFundingPatentID" FROM "PatentFundingRecord";
DROP TABLE "PatentFundingRecord";
ALTER TABLE "new_PatentFundingRecord" RENAME TO "PatentFundingRecord";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "PatentFundingExportContribution_ExportID_idx" ON "PatentFundingExportContribution"("ExportID");

-- CreateIndex
CREATE INDEX "PatentFundingExportInternalAllocation_ExportID_idx" ON "PatentFundingExportInternalAllocation"("ExportID");
