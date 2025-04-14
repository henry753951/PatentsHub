/*
  Warnings:

  - You are about to drop the `PatentStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PatentStatus";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PatentManualStatus" (
    "ManualStatusID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentID" INTEGER NOT NULL,
    "Reason" TEXT NOT NULL,
    "Date" DATETIME,
    "Active" BOOLEAN NOT NULL,
    CONSTRAINT "PatentManualStatus_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
