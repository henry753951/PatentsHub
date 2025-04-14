/*
  Warnings:

  - You are about to drop the `FundingUnitData` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `FundingUnit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `UnitID` on the `FundingUnit` table. All the data in the column will be lost.
  - Added the required column `FundingUnitID` to the `FundingUnit` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FundingUnitData";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FundingRecord" (
    "FundingRecordID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentFundingPatentID" INTEGER NOT NULL,
    "Amount" REAL NOT NULL,
    CONSTRAINT "FundingRecord_PatentFundingPatentID_fkey" FOREIGN KEY ("PatentFundingPatentID") REFERENCES "PatentFunding" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentFundingUnit" (
    "PatentID" INTEGER NOT NULL,
    "FundingUnitID" INTEGER NOT NULL,
    "ProjectCode" TEXT NOT NULL,

    PRIMARY KEY ("PatentID", "FundingUnitID"),
    CONSTRAINT "PatentFundingUnit_FundingUnitID_fkey" FOREIGN KEY ("FundingUnitID") REFERENCES "FundingUnit" ("FundingUnitID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PatentFundingUnit_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "PatentFunding" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FundingRecordToFundingUnit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FundingRecordToFundingUnit_A_fkey" FOREIGN KEY ("A") REFERENCES "FundingRecord" ("FundingRecordID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FundingRecordToFundingUnit_B_fkey" FOREIGN KEY ("B") REFERENCES "FundingUnit" ("FundingUnitID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FundingUnit" (
    "FundingUnitID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL
);
INSERT INTO "new_FundingUnit" ("Name") SELECT "Name" FROM "FundingUnit";
DROP TABLE "FundingUnit";
ALTER TABLE "new_FundingUnit" RENAME TO "FundingUnit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_FundingRecordToFundingUnit_AB_unique" ON "_FundingRecordToFundingUnit"("A", "B");

-- CreateIndex
CREATE INDEX "_FundingRecordToFundingUnit_B_index" ON "_FundingRecordToFundingUnit"("B");
