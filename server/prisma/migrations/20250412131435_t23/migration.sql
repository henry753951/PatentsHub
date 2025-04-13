/*
  Warnings:

  - You are about to alter the column `OwnershipPercentage` on the `PatentOwner` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentOwner" (
    "OwnerID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "OwnershipPercentage" REAL NOT NULL DEFAULT 0.0,
    CONSTRAINT "PatentOwner_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentOwner" ("Name", "OwnerID", "OwnershipPercentage", "PatentID") SELECT "Name", "OwnerID", "OwnershipPercentage", "PatentID" FROM "PatentOwner";
DROP TABLE "PatentOwner";
ALTER TABLE "new_PatentOwner" RENAME TO "PatentOwner";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
