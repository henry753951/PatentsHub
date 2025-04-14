/*
  Warnings:

  - You are about to alter the column `Percentage` on the `FundingPlanAllocation` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `Amount` on the `PatentFundingExportContribution` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - You are about to alter the column `Amount` on the `PatentFundingExportInternalAllocation` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `Amount` on the `PatentFundingRecord` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FundingPlanAllocation" (
    "FundingPlanAllocationID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Percentage" INTEGER NOT NULL,
    "TargetID" INTEGER NOT NULL,
    "FundingPlanID" INTEGER NOT NULL,
    CONSTRAINT "FundingPlanAllocation_TargetID_fkey" FOREIGN KEY ("TargetID") REFERENCES "FundingPlanTarget" ("TargetID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FundingPlanAllocation_FundingPlanID_fkey" FOREIGN KEY ("FundingPlanID") REFERENCES "FundingPlan" ("FundingPlanID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FundingPlanAllocation" ("FundingPlanAllocationID", "FundingPlanID", "Percentage", "TargetID") SELECT "FundingPlanAllocationID", "FundingPlanID", "Percentage", "TargetID" FROM "FundingPlanAllocation";
DROP TABLE "FundingPlanAllocation";
ALTER TABLE "new_FundingPlanAllocation" RENAME TO "FundingPlanAllocation";
CREATE TABLE "new_PatentFundingExportContribution" (
    "ContributionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ExportID" INTEGER NOT NULL,
    "FundingUnitID" INTEGER,
    "Amount" INTEGER NOT NULL,
    CONSTRAINT "PatentFundingExportContribution_ExportID_fkey" FOREIGN KEY ("ExportID") REFERENCES "PatentFundingExport" ("ExportID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PatentFundingExportContribution_FundingUnitID_fkey" FOREIGN KEY ("FundingUnitID") REFERENCES "FundingUnit" ("FundingUnitID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentFundingExportContribution" ("Amount", "ContributionID", "ExportID", "FundingUnitID") SELECT "Amount", "ContributionID", "ExportID", "FundingUnitID" FROM "PatentFundingExportContribution";
DROP TABLE "PatentFundingExportContribution";
ALTER TABLE "new_PatentFundingExportContribution" RENAME TO "PatentFundingExportContribution";
CREATE INDEX "PatentFundingExportContribution_ExportID_idx" ON "PatentFundingExportContribution"("ExportID");
CREATE TABLE "new_PatentFundingExportInternalAllocation" (
    "InternalContributionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Amount" INTEGER NOT NULL,
    "PlanTargetID" INTEGER NOT NULL,
    "ExportID" INTEGER NOT NULL,
    CONSTRAINT "PatentFundingExportInternalAllocation_PlanTargetID_fkey" FOREIGN KEY ("PlanTargetID") REFERENCES "FundingPlanTarget" ("TargetID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentFundingExportInternalAllocation_ExportID_fkey" FOREIGN KEY ("ExportID") REFERENCES "PatentFundingExport" ("ExportID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentFundingExportInternalAllocation" ("Amount", "ExportID", "InternalContributionID", "PlanTargetID") SELECT "Amount", "ExportID", "InternalContributionID", "PlanTargetID" FROM "PatentFundingExportInternalAllocation";
DROP TABLE "PatentFundingExportInternalAllocation";
ALTER TABLE "new_PatentFundingExportInternalAllocation" RENAME TO "PatentFundingExportInternalAllocation";
CREATE INDEX "PatentFundingExportInternalAllocation_ExportID_idx" ON "PatentFundingExportInternalAllocation"("ExportID");
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
