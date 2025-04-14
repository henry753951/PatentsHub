/*
  Warnings:

  - You are about to drop the column `FundingPlanAllocationID` on the `FundingUnit` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FundingUnit" (
    "FundingUnitID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL
);
INSERT INTO "new_FundingUnit" ("FundingUnitID", "Name") SELECT "FundingUnitID", "Name" FROM "FundingUnit";
DROP TABLE "FundingUnit";
ALTER TABLE "new_FundingUnit" RENAME TO "FundingUnit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
