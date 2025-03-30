/*
  Warnings:

  - You are about to drop the column `PlanType` on the `FundingPlan` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FundingPlan" (
    "FundingPlanID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL
);
INSERT INTO "new_FundingPlan" ("FundingPlanID", "Name") SELECT "FundingPlanID", "Name" FROM "FundingPlan";
DROP TABLE "FundingPlan";
ALTER TABLE "new_FundingPlan" RENAME TO "FundingPlan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
