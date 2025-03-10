/*
  Warnings:

  - You are about to drop the column `CountryID` on the `PatentApplicationData` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patent" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DepartmentID" INTEGER NOT NULL,
    "Year" TEXT NOT NULL,
    "DraftTitle" TEXT NOT NULL DEFAULT '',
    "Title" TEXT NOT NULL DEFAULT '',
    "TitleEnglish" TEXT NOT NULL DEFAULT '',
    "CountryID" INTEGER,
    CONSTRAINT "Patent_CountryID_fkey" FOREIGN KEY ("CountryID") REFERENCES "Country" ("CountryID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Patent_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patent" ("DepartmentID", "DraftTitle", "PatentID", "Title", "TitleEnglish", "Year") SELECT "DepartmentID", "DraftTitle", "PatentID", "Title", "TitleEnglish", "Year" FROM "Patent";
DROP TABLE "Patent";
ALTER TABLE "new_Patent" RENAME TO "Patent";
CREATE TABLE "new_PatentApplicationData" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentType" TEXT,
    "ApplicationNumber" TEXT,
    "FilingDate" DATETIME,
    "RDResultNumber" TEXT,
    "NSCNumber" TEXT,
    CONSTRAINT "PatentApplicationData_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentApplicationData" ("ApplicationNumber", "FilingDate", "NSCNumber", "PatentID", "PatentType", "RDResultNumber") SELECT "ApplicationNumber", "FilingDate", "NSCNumber", "PatentID", "PatentType", "RDResultNumber" FROM "PatentApplicationData";
DROP TABLE "PatentApplicationData";
ALTER TABLE "new_PatentApplicationData" RENAME TO "PatentApplicationData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
