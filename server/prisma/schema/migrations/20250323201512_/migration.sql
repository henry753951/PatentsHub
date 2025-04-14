/*
  Warnings:

  - Added the required column `Name` to the `PatentFundingRecord` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentFundingRecord" (
    "FundingRecordID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "Amount" REAL NOT NULL,
    "Date" DATETIME NOT NULL,
    "PatentFundingPatentID" INTEGER NOT NULL,
    "ExportID" INTEGER,
    CONSTRAINT "PatentFundingRecord_PatentFundingPatentID_fkey" FOREIGN KEY ("PatentFundingPatentID") REFERENCES "PatentFunding" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentFundingRecord_ExportID_fkey" FOREIGN KEY ("ExportID") REFERENCES "PatentFundingExport" ("ExportID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PatentFundingRecord" ("Amount", "Date", "ExportID", "FundingRecordID", "PatentFundingPatentID") SELECT "Amount", "Date", "ExportID", "FundingRecordID", "PatentFundingPatentID" FROM "PatentFundingRecord";
DROP TABLE "PatentFundingRecord";
ALTER TABLE "new_PatentFundingRecord" RENAME TO "PatentFundingRecord";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
