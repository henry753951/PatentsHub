-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentID" INTEGER NOT NULL,
    "Record" TEXT,
    "Date" DATETIME
);
INSERT INTO "new_PatentRecord" ("Date", "PatentID", "Record", "id") SELECT "Date", "PatentID", "Record", "id" FROM "PatentRecord";
DROP TABLE "PatentRecord";
ALTER TABLE "new_PatentRecord" RENAME TO "PatentRecord";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
