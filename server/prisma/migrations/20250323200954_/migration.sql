/*
  Warnings:

  - You are about to drop the column `PlaneTargetID` on the `PatentFundingExportInternalAllocation` table. All the data in the column will be lost.
  - Added the required column `PlanTargetID` to the `PatentFundingExportInternalAllocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OnTop` to the `PatentManualStatus` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentFundingExportInternalAllocation" (
    "InternalContributionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Amount" DECIMAL NOT NULL,
    "PlanTargetID" INTEGER NOT NULL,
    "ExportID" INTEGER NOT NULL,
    CONSTRAINT "PatentFundingExportInternalAllocation_PlanTargetID_fkey" FOREIGN KEY ("PlanTargetID") REFERENCES "FundingPlanTarget" ("TargetID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentFundingExportInternalAllocation_ExportID_fkey" FOREIGN KEY ("ExportID") REFERENCES "PatentFundingExport" ("ExportID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentFundingExportInternalAllocation" ("Amount", "ExportID", "InternalContributionID") SELECT "Amount", "ExportID", "InternalContributionID" FROM "PatentFundingExportInternalAllocation";
DROP TABLE "PatentFundingExportInternalAllocation";
ALTER TABLE "new_PatentFundingExportInternalAllocation" RENAME TO "PatentFundingExportInternalAllocation";
CREATE INDEX "PatentFundingExportInternalAllocation_ExportID_idx" ON "PatentFundingExportInternalAllocation"("ExportID");
CREATE TABLE "new_PatentManualStatus" (
    "ManualStatusID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentID" INTEGER NOT NULL,
    "Reason" TEXT NOT NULL,
    "Date" DATETIME,
    "Active" BOOLEAN NOT NULL,
    "OnTop" BOOLEAN NOT NULL,
    CONSTRAINT "PatentManualStatus_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentManualStatus" ("Active", "Date", "ManualStatusID", "PatentID", "Reason") SELECT "Active", "Date", "ManualStatusID", "PatentID", "Reason" FROM "PatentManualStatus";
DROP TABLE "PatentManualStatus";
ALTER TABLE "new_PatentManualStatus" RENAME TO "PatentManualStatus";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
