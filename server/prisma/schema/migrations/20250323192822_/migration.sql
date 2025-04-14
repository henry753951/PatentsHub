/*
  Warnings:

  - You are about to drop the `FundingRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FundingRecordToFundingUnit` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `FundingPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `PlanID` on the `FundingPlan` table. All the data in the column will be lost.
  - You are about to drop the column `fundingPlanPlanID` on the `PatentFunding` table. All the data in the column will be lost.
  - Added the required column `FundingPlanID` to the `FundingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FundingPlanPlanID` to the `PatentFunding` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_FundingRecordToFundingUnit_B_index";

-- DropIndex
DROP INDEX "_FundingRecordToFundingUnit_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FundingRecord";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_FundingRecordToFundingUnit";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FundingPlanAllocation" (
    "FundingPlanAllocationID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Percentage" DECIMAL NOT NULL,
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
CREATE TABLE "PatentFundingRecord" (
    "FundingRecordID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Amount" REAL NOT NULL,
    "Date" DATETIME NOT NULL,
    "PatentFundingPatentID" INTEGER NOT NULL,
    "ExportID" INTEGER,
    CONSTRAINT "PatentFundingRecord_PatentFundingPatentID_fkey" FOREIGN KEY ("PatentFundingPatentID") REFERENCES "PatentFunding" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentFundingRecord_ExportID_fkey" FOREIGN KEY ("ExportID") REFERENCES "PatentFundingExport" ("ExportID") ON DELETE SET NULL ON UPDATE CASCADE
);

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
    "FundingUnitID" INTEGER,
    "Amount" REAL NOT NULL,
    CONSTRAINT "PatentFundingExportContribution_ExportID_fkey" FOREIGN KEY ("ExportID") REFERENCES "PatentFundingExport" ("ExportID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PatentFundingExportContribution_FundingUnitID_fkey" FOREIGN KEY ("FundingUnitID") REFERENCES "FundingUnit" ("FundingUnitID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentFundingExportInternalAllocation" (
    "InternalContributionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Amount" DECIMAL NOT NULL,
    "PlaneTargetID" INTEGER NOT NULL,
    "ExportID" INTEGER NOT NULL,
    CONSTRAINT "PatentFundingExportInternalAllocation_PlaneTargetID_fkey" FOREIGN KEY ("PlaneTargetID") REFERENCES "FundingPlanTarget" ("TargetID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentFundingExportInternalAllocation_ExportID_fkey" FOREIGN KEY ("ExportID") REFERENCES "PatentFundingExport" ("ExportID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FundingUnitToPatentFundingRecord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FundingUnitToPatentFundingRecord_A_fkey" FOREIGN KEY ("A") REFERENCES "FundingUnit" ("FundingUnitID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FundingUnitToPatentFundingRecord_B_fkey" FOREIGN KEY ("B") REFERENCES "PatentFundingRecord" ("FundingRecordID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FundingPlan" (
    "FundingPlanID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PlanType" INTEGER NOT NULL,
    "Name" TEXT NOT NULL
);
INSERT INTO "new_FundingPlan" ("Name", "PlanType") SELECT "Name", "PlanType" FROM "FundingPlan";
DROP TABLE "FundingPlan";
ALTER TABLE "new_FundingPlan" RENAME TO "FundingPlan";
CREATE TABLE "new_FundingUnit" (
    "FundingUnitID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "FundingPlanAllocationID" INTEGER,
    CONSTRAINT "FundingUnit_FundingPlanAllocationID_fkey" FOREIGN KEY ("FundingPlanAllocationID") REFERENCES "FundingPlanAllocation" ("FundingPlanAllocationID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FundingUnit" ("FundingUnitID", "Name") SELECT "FundingUnitID", "Name" FROM "FundingUnit";
DROP TABLE "FundingUnit";
ALTER TABLE "new_FundingUnit" RENAME TO "FundingUnit";
CREATE TABLE "new_PatentFunding" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FundingPlanPlanID" INTEGER NOT NULL,
    CONSTRAINT "PatentFunding_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PatentFunding_FundingPlanPlanID_fkey" FOREIGN KEY ("FundingPlanPlanID") REFERENCES "FundingPlan" ("FundingPlanID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentFunding" ("PatentID") SELECT "PatentID" FROM "PatentFunding";
DROP TABLE "PatentFunding";
ALTER TABLE "new_PatentFunding" RENAME TO "PatentFunding";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "PatentFundingExportContribution_ExportID_idx" ON "PatentFundingExportContribution"("ExportID");

-- CreateIndex
CREATE INDEX "PatentFundingExportInternalAllocation_ExportID_idx" ON "PatentFundingExportInternalAllocation"("ExportID");

-- CreateIndex
CREATE UNIQUE INDEX "_FundingUnitToPatentFundingRecord_AB_unique" ON "_FundingUnitToPatentFundingRecord"("A", "B");

-- CreateIndex
CREATE INDEX "_FundingUnitToPatentFundingRecord_B_index" ON "_FundingUnitToPatentFundingRecord"("B");
