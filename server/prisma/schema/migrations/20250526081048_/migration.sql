-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentManualStatus" (
    "ManualStatusID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentID" INTEGER NOT NULL,
    "Reason" TEXT NOT NULL,
    "Date" DATETIME,
    "Active" BOOLEAN NOT NULL,
    "Override" BOOLEAN NOT NULL,
    "isCaseNotFound" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "PatentManualStatus_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentManualStatus" ("Active", "Date", "ManualStatusID", "Override", "PatentID", "Reason") SELECT "Active", "Date", "ManualStatusID", "Override", "PatentID", "Reason" FROM "PatentManualStatus";
DROP TABLE "PatentManualStatus";
ALTER TABLE "new_PatentManualStatus" RENAME TO "PatentManualStatus";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
