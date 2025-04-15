/*
  Warnings:

  - You are about to drop the column `InitialReviewDate` on the `PatentInternal` table. All the data in the column will be lost.
  - You are about to drop the column `InitialReviewNumber` on the `PatentInternal` table. All the data in the column will be lost.
  - You are about to drop the column `InternalID` on the `PatentInternal` table. All the data in the column will be lost.
  - Added the required column `InternalID` to the `Patent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patent" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DepartmentID" INTEGER NOT NULL,
    "Year" INTEGER NOT NULL,
    "DraftTitle" TEXT NOT NULL DEFAULT '',
    "Title" TEXT NOT NULL DEFAULT '',
    "TitleEnglish" TEXT NOT NULL DEFAULT '',
    "CountryID" INTEGER,
    "PatentType" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "InternalID" TEXT NOT NULL,
    "InitialReviewDate" DATETIME,
    "InitialReviewNumber" INTEGER,
    CONSTRAINT "Patent_CountryID_fkey" FOREIGN KEY ("CountryID") REFERENCES "Country" ("CountryID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Patent_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patent" ("CountryID", "DepartmentID", "DraftTitle", "PatentID", "PatentType", "Title", "TitleEnglish", "Year", "createdAt", "pinned") SELECT "CountryID", "DepartmentID", "DraftTitle", "PatentID", "PatentType", "Title", "TitleEnglish", "Year", "createdAt", "pinned" FROM "Patent";
DROP TABLE "Patent";
ALTER TABLE "new_Patent" RENAME TO "Patent";
CREATE UNIQUE INDEX "Patent_InternalID_key" ON "Patent"("InternalID");
CREATE TABLE "new_PatentInternal" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "PatentInternal_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentInternal" ("PatentID") SELECT "PatentID" FROM "PatentInternal";
DROP TABLE "PatentInternal";
ALTER TABLE "new_PatentInternal" RENAME TO "PatentInternal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
