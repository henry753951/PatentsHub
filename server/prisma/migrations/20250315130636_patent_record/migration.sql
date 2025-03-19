-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentRecord" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Record" TEXT,
    "Date" DATETIME,
    CONSTRAINT "PatentRecord_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentRecord" ("PatentID", "Record") SELECT "PatentID", "Record" FROM "PatentRecord";
DROP TABLE "PatentRecord";
ALTER TABLE "new_PatentRecord" RENAME TO "PatentRecord";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
