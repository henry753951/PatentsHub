/*
  Warnings:

  - The primary key for the `PatentStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ExpiryDate` on the `PatentStatus` table. All the data in the column will be lost.
  - You are about to drop the column `MaintenanceEndDate` on the `PatentStatus` table. All the data in the column will be lost.
  - You are about to drop the column `MaintenanceStartDate` on the `PatentStatus` table. All the data in the column will be lost.
  - You are about to drop the column `MaintenanceYear` on the `PatentStatus` table. All the data in the column will be lost.
  - You are about to drop the column `TechnicalCommitteeReviewDate` on the `PatentStatus` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PatentMaintenance" (
    "MaintenanceID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentID" INTEGER NOT NULL,
    "MaintenanceDate" DATETIME NOT NULL,
    "ExpireDate" DATETIME NOT NULL,
    CONSTRAINT "PatentMaintenance_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentStatus" (
    "PatentID" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,
    "Reason" TEXT,
    "Date" DATETIME,

    PRIMARY KEY ("PatentID", "Status"),
    CONSTRAINT "PatentStatus_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentStatus" ("PatentID", "Status") SELECT "PatentID", "Status" FROM "PatentStatus";
DROP TABLE "PatentStatus";
ALTER TABLE "new_PatentStatus" RENAME TO "PatentStatus";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
