-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactInfo" (
    "ContactInfoID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT,
    "Email" TEXT,
    "OfficeNumber" TEXT,
    "PhoneNumber" TEXT,
    "Position" TEXT,
    "Note" TEXT
);
INSERT INTO "new_ContactInfo" ("ContactInfoID", "Email", "Name", "Note", "OfficeNumber", "PhoneNumber", "Position") SELECT "ContactInfoID", "Email", "Name", "Note", "OfficeNumber", "PhoneNumber", "Position" FROM "ContactInfo";
DROP TABLE "ContactInfo";
ALTER TABLE "new_ContactInfo" RENAME TO "ContactInfo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
