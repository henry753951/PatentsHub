/*
  Warnings:

  - You are about to drop the column `EndDate` on the `PatentApplicationData` table. All the data in the column will be lost.
  - You are about to drop the column `IPCNumber` on the `PatentApplicationData` table. All the data in the column will be lost.
  - You are about to drop the column `PatentNumber` on the `PatentApplicationData` table. All the data in the column will be lost.
  - You are about to drop the column `PatentScope` on the `PatentApplicationData` table. All the data in the column will be lost.
  - You are about to drop the column `PublicationDate` on the `PatentApplicationData` table. All the data in the column will be lost.
  - You are about to drop the column `StartDate` on the `PatentApplicationData` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PatentExternal" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentNumber" TEXT,
    "PublicationDate" DATETIME,
    "StartDate" DATETIME,
    "EndDate" DATETIME,
    "IPCNumber" TEXT,
    "PatentScope" TEXT,
    CONSTRAINT "PatentExternal_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentApplicationData" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CountryID" INTEGER,
    "PatentType" TEXT,
    "ApplicationNumber" TEXT,
    "FilingDate" DATETIME,
    "RDResultNumber" TEXT,
    "NSCNumber" TEXT,
    CONSTRAINT "PatentApplicationData_CountryID_fkey" FOREIGN KEY ("CountryID") REFERENCES "Country" ("CountryID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PatentApplicationData_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentApplicationData" ("ApplicationNumber", "CountryID", "FilingDate", "PatentID", "PatentType") SELECT "ApplicationNumber", "CountryID", "FilingDate", "PatentID", "PatentType" FROM "PatentApplicationData";
DROP TABLE "PatentApplicationData";
ALTER TABLE "new_PatentApplicationData" RENAME TO "PatentApplicationData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
