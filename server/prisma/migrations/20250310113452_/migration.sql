/*
  Warnings:

  - You are about to drop the `Agency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgencyContactPerson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgencyPatent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `Position` on the `ContactInfo` table. All the data in the column will be lost.
  - You are about to drop the column `collegeCollegeID` on the `Patent` table. All the data in the column will be lost.
  - Made the column `ContactInfoID` on table `Inventor` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "AgencyContactPerson_ContactInfoID_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Agency";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AgencyContactPerson";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AgencyPatent";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AgencyUnit" (
    "AgencyUnitID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT
);

-- CreateTable
CREATE TABLE "PatentTakerAgencyUnit" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "AgencyUnitID" INTEGER NOT NULL,
    "FileCode" TEXT NOT NULL,
    CONSTRAINT "PatentTakerAgencyUnit_AgencyUnitID_fkey" FOREIGN KEY ("AgencyUnitID") REFERENCES "AgencyUnit" ("AgencyUnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentTakerAgencyUnit_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentInitiatorAgencyUnit" (
    "PatentID" INTEGER NOT NULL,
    "AgencyUnitID" INTEGER NOT NULL,

    PRIMARY KEY ("PatentID", "AgencyUnitID"),
    CONSTRAINT "PatentInitiatorAgencyUnit_AgencyUnitID_fkey" FOREIGN KEY ("AgencyUnitID") REFERENCES "AgencyUnit" ("AgencyUnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentInitiatorAgencyUnit_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "PatentInternal" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AgencyUnitPerson" (
    "AgencyUnitID" INTEGER NOT NULL,
    "ContactInfoID" INTEGER NOT NULL,

    PRIMARY KEY ("AgencyUnitID", "ContactInfoID"),
    CONSTRAINT "AgencyUnitPerson_AgencyUnitID_fkey" FOREIGN KEY ("AgencyUnitID") REFERENCES "AgencyUnit" ("AgencyUnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AgencyUnitPerson_ContactInfoID_fkey" FOREIGN KEY ("ContactInfoID") REFERENCES "ContactInfo" ("ContactInfoID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentInternal" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "InitialReviewDate" DATETIME,
    "InitialReviewNumber" TEXT,
    CONSTRAINT "PatentInternal_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactInfo" (
    "ContactInfoID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Email" TEXT,
    "OfficeNumber" TEXT,
    "PhoneNumber" TEXT,
    "Role" TEXT,
    "Note" TEXT
);
INSERT INTO "new_ContactInfo" ("ContactInfoID", "Email", "Name", "Note", "OfficeNumber", "PhoneNumber") SELECT "ContactInfoID", "Email", "Name", "Note", "OfficeNumber", "PhoneNumber" FROM "ContactInfo";
DROP TABLE "ContactInfo";
ALTER TABLE "new_ContactInfo" RENAME TO "ContactInfo";
CREATE TABLE "new_Inventor" (
    "InventorID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "DepartmentID" INTEGER NOT NULL,
    "ContactInfoID" INTEGER NOT NULL,
    CONSTRAINT "Inventor_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventor_ContactInfoID_fkey" FOREIGN KEY ("ContactInfoID") REFERENCES "ContactInfo" ("ContactInfoID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inventor" ("ContactInfoID", "DepartmentID", "InventorID", "Name") SELECT "ContactInfoID", "DepartmentID", "InventorID", "Name" FROM "Inventor";
DROP TABLE "Inventor";
ALTER TABLE "new_Inventor" RENAME TO "Inventor";
CREATE UNIQUE INDEX "Inventor_ContactInfoID_key" ON "Inventor"("ContactInfoID");
CREATE TABLE "new_Patent" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DepartmentID" INTEGER NOT NULL,
    "InternalID" TEXT NOT NULL,
    "Year" TEXT NOT NULL,
    "DraftTitle" TEXT NOT NULL DEFAULT '',
    "Title" TEXT NOT NULL DEFAULT '',
    "TitleEnglish" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Patent_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patent" ("DepartmentID", "DraftTitle", "InternalID", "PatentID", "Title", "TitleEnglish", "Year") SELECT "DepartmentID", "DraftTitle", "InternalID", "PatentID", "Title", "TitleEnglish", "Year" FROM "Patent";
DROP TABLE "Patent";
ALTER TABLE "new_Patent" RENAME TO "Patent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AgencyUnitPerson_ContactInfoID_key" ON "AgencyUnitPerson"("ContactInfoID");
