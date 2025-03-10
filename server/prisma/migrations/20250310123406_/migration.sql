/*
  Warnings:

  - The primary key for the `AgencyPatentContact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AgencyID` on the `AgencyPatentContact` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AgencyPatentContact" (
    "ContactPersonID" INTEGER NOT NULL,
    "PatentID" INTEGER NOT NULL,

    PRIMARY KEY ("ContactPersonID", "PatentID"),
    CONSTRAINT "AgencyPatentContact_ContactPersonID_fkey" FOREIGN KEY ("ContactPersonID") REFERENCES "AgencyContactPerson" ("ContactPersonID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AgencyPatentContact_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AgencyPatentContact" ("ContactPersonID", "PatentID") SELECT "ContactPersonID", "PatentID" FROM "AgencyPatentContact";
DROP TABLE "AgencyPatentContact";
ALTER TABLE "new_AgencyPatentContact" RENAME TO "AgencyPatentContact";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
