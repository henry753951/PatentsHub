/*
  Warnings:

  - You are about to drop the column `InternalID` on the `Patent` table. All the data in the column will be lost.
  - Added the required column `InternalID` to the `PatentInternal` table without a default value. This is not possible if the table is not empty.

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
    CONSTRAINT "Patent_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patent" ("DepartmentID", "DraftTitle", "PatentID", "Title", "TitleEnglish", "Year") SELECT "DepartmentID", "DraftTitle", "PatentID", "Title", "TitleEnglish", "Year" FROM "Patent";
DROP TABLE "Patent";
ALTER TABLE "new_Patent" RENAME TO "Patent";
CREATE TABLE "new_PatentInternal" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "InternalID" TEXT NOT NULL,
    "InitialReviewDate" DATETIME,
    "InitialReviewNumber" TEXT,
    CONSTRAINT "PatentInternal_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentInternal" ("InitialReviewDate", "InitialReviewNumber", "PatentID") SELECT "InitialReviewDate", "InitialReviewNumber", "PatentID" FROM "PatentInternal";
DROP TABLE "PatentInternal";
ALTER TABLE "new_PatentInternal" RENAME TO "PatentInternal";
CREATE UNIQUE INDEX "PatentInternal_InternalID_key" ON "PatentInternal"("InternalID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
