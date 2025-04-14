/*
  Warnings:

  - You are about to drop the `PatentFundingExport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatentFundingExportContribution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatentFundingExportInternalAllocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "PatentFundingExportContribution_ExportID_idx";

-- DropIndex
DROP INDEX "PatentFundingExportInternalAllocation_ExportID_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PatentFundingExport";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PatentFundingExportContribution";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PatentFundingExportInternalAllocation";
PRAGMA foreign_keys=on;

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
    CONSTRAINT "PatentFundingRecord_PatentFundingPatentID_fkey" FOREIGN KEY ("PatentFundingPatentID") REFERENCES "PatentFunding" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentFundingRecord" ("Amount", "Date", "Description", "ExportID", "FundingRecordID", "Name", "PatentFundingPatentID") SELECT "Amount", "Date", "Description", "ExportID", "FundingRecordID", "Name", "PatentFundingPatentID" FROM "PatentFundingRecord";
DROP TABLE "PatentFundingRecord";
ALTER TABLE "new_PatentFundingRecord" RENAME TO "PatentFundingRecord";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
