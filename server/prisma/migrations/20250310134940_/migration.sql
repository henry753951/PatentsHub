/*
  Warnings:

  - You are about to drop the column `PatentType` on the `PatentApplicationData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patent" ADD COLUMN "PatentType" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentApplicationData" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ApplicationNumber" TEXT,
    "FilingDate" DATETIME,
    "RDResultNumber" TEXT,
    "NSCNumber" TEXT,
    CONSTRAINT "PatentApplicationData_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentApplicationData" ("ApplicationNumber", "FilingDate", "NSCNumber", "PatentID", "RDResultNumber") SELECT "ApplicationNumber", "FilingDate", "NSCNumber", "PatentID", "RDResultNumber" FROM "PatentApplicationData";
DROP TABLE "PatentApplicationData";
ALTER TABLE "new_PatentApplicationData" RENAME TO "PatentApplicationData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
