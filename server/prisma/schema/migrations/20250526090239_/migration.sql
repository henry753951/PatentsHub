-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patent" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DepartmentID" INTEGER NOT NULL,
    "Year" INTEGER,
    "DraftTitle" TEXT NOT NULL DEFAULT '',
    "Title" TEXT NOT NULL DEFAULT '',
    "TitleEnglish" TEXT NOT NULL DEFAULT '',
    "CountryID" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Pinned" BOOLEAN NOT NULL DEFAULT false,
    "CaseNotFound" BOOLEAN NOT NULL DEFAULT false,
    "PatentType" TEXT,
    "InternalID" TEXT NOT NULL,
    "InitialReviewDate" DATETIME,
    "InitialReviewNumber" INTEGER,
    CONSTRAINT "Patent_CountryID_fkey" FOREIGN KEY ("CountryID") REFERENCES "Country" ("CountryID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Patent_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patent" ("CountryID", "DepartmentID", "DraftTitle", "InitialReviewDate", "InitialReviewNumber", "InternalID", "PatentID", "PatentType", "Pinned", "Title", "TitleEnglish", "Year", "createdAt") SELECT "CountryID", "DepartmentID", "DraftTitle", "InitialReviewDate", "InitialReviewNumber", "InternalID", "PatentID", "PatentType", "Pinned", "Title", "TitleEnglish", "Year", "createdAt" FROM "Patent";
DROP TABLE "Patent";
ALTER TABLE "new_Patent" RENAME TO "Patent";
CREATE UNIQUE INDEX "Patent_InternalID_key" ON "Patent"("InternalID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
