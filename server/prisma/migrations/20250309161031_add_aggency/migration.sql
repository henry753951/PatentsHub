/*
  Warnings:

  - You are about to drop the column `Position` on the `AgencyContactPerson` table. All the data in the column will be lost.
  - You are about to drop the column `Details` on the `AgencyPatent` table. All the data in the column will be lost.
  - You are about to drop the column `Role` on the `AgencyPatent` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "AgencyPatentContact" (
    "ContactPersonID" INTEGER NOT NULL,
    "PatentID" INTEGER NOT NULL,
    "AgencyID" INTEGER NOT NULL,

    PRIMARY KEY ("ContactPersonID", "PatentID", "AgencyID"),
    CONSTRAINT "AgencyPatentContact_PatentID_AgencyID_fkey" FOREIGN KEY ("PatentID", "AgencyID") REFERENCES "AgencyPatent" ("PatentID", "AgencyID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AgencyPatentContact_ContactPersonID_fkey" FOREIGN KEY ("ContactPersonID") REFERENCES "AgencyContactPerson" ("ContactPersonID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AgencyContactPerson" (
    "ContactPersonID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "AgencyID" INTEGER NOT NULL,
    "ContactInfoID" INTEGER,
    CONSTRAINT "AgencyContactPerson_AgencyID_fkey" FOREIGN KEY ("AgencyID") REFERENCES "Agency" ("AgencyID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AgencyContactPerson_ContactInfoID_fkey" FOREIGN KEY ("ContactInfoID") REFERENCES "ContactInfo" ("ContactInfoID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AgencyContactPerson" ("AgencyID", "ContactInfoID", "ContactPersonID") SELECT "AgencyID", "ContactInfoID", "ContactPersonID" FROM "AgencyContactPerson";
DROP TABLE "AgencyContactPerson";
ALTER TABLE "new_AgencyContactPerson" RENAME TO "AgencyContactPerson";
CREATE UNIQUE INDEX "AgencyContactPerson_ContactInfoID_key" ON "AgencyContactPerson"("ContactInfoID");
CREATE TABLE "new_AgencyPatent" (
    "PatentID" INTEGER NOT NULL,
    "AgencyID" INTEGER NOT NULL,
    "FileCode" TEXT NOT NULL,

    PRIMARY KEY ("PatentID", "AgencyID"),
    CONSTRAINT "AgencyPatent_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AgencyPatent_AgencyID_fkey" FOREIGN KEY ("AgencyID") REFERENCES "Agency" ("AgencyID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AgencyPatent" ("AgencyID", "FileCode", "PatentID") SELECT "AgencyID", "FileCode", "PatentID" FROM "AgencyPatent";
DROP TABLE "AgencyPatent";
ALTER TABLE "new_AgencyPatent" RENAME TO "AgencyPatent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
