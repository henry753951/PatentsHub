/*
  Warnings:

  - Added the required column `Name` to the `PatentFundingExport` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentFundingExport" (
    "ExportID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "ExportDate" DATETIME NOT NULL,
    "PatentID" INTEGER NOT NULL,
    CONSTRAINT "PatentFundingExport_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "PatentFunding" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentFundingExport" ("ExportDate", "ExportID", "PatentID") SELECT "ExportDate", "ExportID", "PatentID" FROM "PatentFundingExport";
DROP TABLE "PatentFundingExport";
ALTER TABLE "new_PatentFundingExport" RENAME TO "PatentFundingExport";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
