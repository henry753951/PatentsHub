/*
  Warnings:

  - The primary key for the `PatentRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `PatentRecord` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentID" INTEGER NOT NULL,
    "Record" TEXT,
    "Date" DATETIME,
    CONSTRAINT "PatentRecord_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentRecord" ("Date", "PatentID", "Record") SELECT "Date", "PatentID", "Record" FROM "PatentRecord";
DROP TABLE "PatentRecord";
ALTER TABLE "new_PatentRecord" RENAME TO "PatentRecord";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
