/*
  Warnings:

  - You are about to alter the column `InitialReviewNumber` on the `PatentInternal` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentInternal" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "InternalID" TEXT NOT NULL,
    "InitialReviewDate" DATETIME,
    "InitialReviewNumber" INTEGER,
    CONSTRAINT "PatentInternal_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentInternal" ("InitialReviewDate", "InitialReviewNumber", "InternalID", "PatentID") SELECT "InitialReviewDate", "InitialReviewNumber", "InternalID", "PatentID" FROM "PatentInternal";
DROP TABLE "PatentInternal";
ALTER TABLE "new_PatentInternal" RENAME TO "PatentInternal";
CREATE UNIQUE INDEX "PatentInternal_InternalID_key" ON "PatentInternal"("InternalID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
