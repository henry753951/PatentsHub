-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patent" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DepartmentID" INTEGER NOT NULL,
    "Year" INTEGER NOT NULL,
    "DraftTitle" TEXT NOT NULL DEFAULT '',
    "Title" TEXT NOT NULL DEFAULT '',
    "TitleEnglish" TEXT NOT NULL DEFAULT '',
    "CountryID" INTEGER,
    "PatentType" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Patent_CountryID_fkey" FOREIGN KEY ("CountryID") REFERENCES "Country" ("CountryID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Patent_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patent" ("CountryID", "DepartmentID", "DraftTitle", "PatentID", "PatentType", "Title", "TitleEnglish", "Year", "createdAt") SELECT "CountryID", "DepartmentID", "DraftTitle", "PatentID", "PatentType", "Title", "TitleEnglish", "Year", "createdAt" FROM "Patent";
DROP TABLE "Patent";
ALTER TABLE "new_Patent" RENAME TO "Patent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
