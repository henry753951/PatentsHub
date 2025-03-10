/*
  Warnings:

  - Added the required column `Name` to the `FundingPlan` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FundingPlan" (
    "PlanID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PlanType" INTEGER NOT NULL,
    "Name" TEXT NOT NULL
);
INSERT INTO "new_FundingPlan" ("PlanID", "PlanType") SELECT "PlanID", "PlanType" FROM "FundingPlan";
DROP TABLE "FundingPlan";
ALTER TABLE "new_FundingPlan" RENAME TO "FundingPlan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
