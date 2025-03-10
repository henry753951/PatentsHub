/*
  Warnings:

  - You are about to drop the column `CollegeID` on the `Patent` table. All the data in the column will be lost.
  - The primary key for the `PatentFunding` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `FundingAgency` on the `PatentFunding` table. All the data in the column will be lost.
  - You are about to drop the column `FundingID` on the `PatentFunding` table. All the data in the column will be lost.
  - You are about to drop the column `PlanID` on the `PatentFunding` table. All the data in the column will be lost.
  - You are about to drop the column `ProjectNumber` on the `PatentFunding` table. All the data in the column will be lost.
  - Added the required column `fundingPlanPlanID` to the `PatentFunding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PatentApplicationData" ADD COLUMN "EndDate" DATETIME;
ALTER TABLE "PatentApplicationData" ADD COLUMN "IPCNumber" TEXT;
ALTER TABLE "PatentApplicationData" ADD COLUMN "PatentScope" TEXT;
ALTER TABLE "PatentApplicationData" ADD COLUMN "StartDate" DATETIME;

-- CreateTable
CREATE TABLE "FundingUnit" (
    "UnitID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FundingUnitData" (
    "FundingUnitID" INTEGER NOT NULL,
    "PatentID" INTEGER NOT NULL,
    "Amount" REAL NOT NULL,
    "patentFundingPatentID" INTEGER,

    PRIMARY KEY ("FundingUnitID", "PatentID"),
    CONSTRAINT "FundingUnitData_FundingUnitID_fkey" FOREIGN KEY ("FundingUnitID") REFERENCES "FundingUnit" ("UnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FundingUnitData_patentFundingPatentID_fkey" FOREIGN KEY ("patentFundingPatentID") REFERENCES "PatentFunding" ("PatentID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patent" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Year" TEXT NOT NULL,
    "InternalID" TEXT NOT NULL,
    "DraftTitle" TEXT NOT NULL DEFAULT '',
    "Title" TEXT NOT NULL DEFAULT '',
    "TitleEnglish" TEXT NOT NULL DEFAULT '',
    "DepartmentID" INTEGER NOT NULL,
    "collegeCollegeID" INTEGER,
    CONSTRAINT "Patent_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Patent_collegeCollegeID_fkey" FOREIGN KEY ("collegeCollegeID") REFERENCES "College" ("CollegeID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Patent" ("DepartmentID", "DraftTitle", "InternalID", "PatentID", "Title", "TitleEnglish", "Year") SELECT "DepartmentID", "DraftTitle", "InternalID", "PatentID", "Title", "TitleEnglish", "Year" FROM "Patent";
DROP TABLE "Patent";
ALTER TABLE "new_Patent" RENAME TO "Patent";
CREATE UNIQUE INDEX "Patent_InternalID_key" ON "Patent"("InternalID");
CREATE INDEX "Patent_InternalID_Year_idx" ON "Patent"("InternalID", "Year");
CREATE TABLE "new_PatentFunding" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fundingPlanPlanID" INTEGER NOT NULL,
    CONSTRAINT "PatentFunding_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentFunding_fundingPlanPlanID_fkey" FOREIGN KEY ("fundingPlanPlanID") REFERENCES "FundingPlan" ("PlanID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentFunding" ("PatentID") SELECT "PatentID" FROM "PatentFunding";
DROP TABLE "PatentFunding";
ALTER TABLE "new_PatentFunding" RENAME TO "PatentFunding";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
