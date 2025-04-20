/*
  Warnings:

  - You are about to drop the column `pinned` on the `Patent` table. All the data in the column will be lost.

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
    "Pinned" BOOLEAN NOT NULL DEFAULT false,
    "InternalID" TEXT NOT NULL,
    "InitialReviewDate" DATETIME,
    "InitialReviewNumber" INTEGER,
    CONSTRAINT "Patent_CountryID_fkey" FOREIGN KEY ("CountryID") REFERENCES "Country" ("CountryID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Patent_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patent" ("CountryID", "DepartmentID", "DraftTitle", "InitialReviewDate", "InitialReviewNumber", "InternalID", "PatentID", "PatentType", "Title", "TitleEnglish", "Year", "createdAt") SELECT "CountryID", "DepartmentID", "DraftTitle", "InitialReviewDate", "InitialReviewNumber", "InternalID", "PatentID", "PatentType", "Title", "TitleEnglish", "Year", "createdAt" FROM "Patent";
DROP TABLE "Patent";
ALTER TABLE "new_Patent" RENAME TO "Patent";
CREATE UNIQUE INDEX "Patent_InternalID_key" ON "Patent"("InternalID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
