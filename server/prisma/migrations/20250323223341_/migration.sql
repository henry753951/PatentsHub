-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentFunding" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FundingPlanPlanID" INTEGER,
    CONSTRAINT "PatentFunding_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PatentFunding_FundingPlanPlanID_fkey" FOREIGN KEY ("FundingPlanPlanID") REFERENCES "FundingPlan" ("FundingPlanID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PatentFunding" ("FundingPlanPlanID", "PatentID") SELECT "FundingPlanPlanID", "PatentID" FROM "PatentFunding";
DROP TABLE "PatentFunding";
ALTER TABLE "new_PatentFunding" RENAME TO "PatentFunding";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
