/*
  Warnings:

  - You are about to drop the column `Department` on the `Inventor` table. All the data in the column will be lost.
  - You are about to drop the column `GrantDate` on the `PatentApplicationData` table. All the data in the column will be lost.
  - You are about to drop the column `IPC` on the `PatentTechnicalAttributes` table. All the data in the column will be lost.
  - You are about to drop the column `Keywords` on the `PatentTechnicalAttributes` table. All the data in the column will be lost.
  - You are about to drop the column `Scope` on the `PatentTechnicalAttributes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Name]` on the table `College` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CountryName]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ISOCode]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `DepartmentID` to the `Inventor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PatentInventor" ADD COLUMN "Contribution" REAL;

-- CreateTable
CREATE TABLE "TechnicalKeyword" (
    "KeywordID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Keyword" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PatentTechnicalAttributesToTechnicalKeyword" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PatentTechnicalAttributesToTechnicalKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "PatentTechnicalAttributes" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PatentTechnicalAttributesToTechnicalKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "TechnicalKeyword" ("KeywordID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Department" (
    "DepartmentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "CollegeID" INTEGER NOT NULL,
    "Description" TEXT,
    CONSTRAINT "Department_CollegeID_fkey" FOREIGN KEY ("CollegeID") REFERENCES "College" ("CollegeID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Department" ("CollegeID", "DepartmentID", "Description", "Name") SELECT "CollegeID", "DepartmentID", "Description", "Name" FROM "Department";
DROP TABLE "Department";
ALTER TABLE "new_Department" RENAME TO "Department";
CREATE UNIQUE INDEX "Department_Name_key" ON "Department"("Name");
CREATE TABLE "new_Inventor" (
    "InventorID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "DepartmentID" INTEGER NOT NULL,
    "Email" TEXT,
    "ContactInfoID" INTEGER,
    CONSTRAINT "Inventor_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventor_ContactInfoID_fkey" FOREIGN KEY ("ContactInfoID") REFERENCES "ContactInfo" ("ContactInfoID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Inventor" ("ContactInfoID", "Email", "InventorID", "Name") SELECT "ContactInfoID", "Email", "InventorID", "Name" FROM "Inventor";
DROP TABLE "Inventor";
ALTER TABLE "new_Inventor" RENAME TO "Inventor";
CREATE UNIQUE INDEX "Inventor_ContactInfoID_key" ON "Inventor"("ContactInfoID");
CREATE TABLE "new_Patent" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Year" TEXT NOT NULL,
    "InternalID" TEXT NOT NULL,
    "DraftTitle" TEXT NOT NULL DEFAULT '',
    "Title" TEXT NOT NULL DEFAULT '',
    "TitleEnglish" TEXT NOT NULL DEFAULT '',
    "DepartmentID" INTEGER NOT NULL,
    "CollegeID" INTEGER NOT NULL,
    CONSTRAINT "Patent_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Patent_CollegeID_fkey" FOREIGN KEY ("CollegeID") REFERENCES "College" ("CollegeID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patent" ("CollegeID", "DepartmentID", "InternalID", "PatentID", "Title", "TitleEnglish", "Year") SELECT "CollegeID", "DepartmentID", "InternalID", "PatentID", "Title", coalesce("TitleEnglish", '') AS "TitleEnglish", "Year" FROM "Patent";
DROP TABLE "Patent";
ALTER TABLE "new_Patent" RENAME TO "Patent";
CREATE UNIQUE INDEX "Patent_InternalID_key" ON "Patent"("InternalID");
CREATE INDEX "Patent_InternalID_Year_idx" ON "Patent"("InternalID", "Year");
CREATE TABLE "new_PatentApplicationData" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CountryID" INTEGER,
    "PatentType" TEXT,
    "PatentNumber" TEXT,
    "ApplicationNumber" TEXT,
    "FilingDate" DATETIME,
    "PublicationDate" DATETIME,
    CONSTRAINT "PatentApplicationData_CountryID_fkey" FOREIGN KEY ("CountryID") REFERENCES "Country" ("CountryID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PatentApplicationData_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentApplicationData" ("ApplicationNumber", "CountryID", "FilingDate", "PatentID", "PatentNumber", "PatentType") SELECT "ApplicationNumber", "CountryID", "FilingDate", "PatentID", "PatentNumber", "PatentType" FROM "PatentApplicationData";
DROP TABLE "PatentApplicationData";
ALTER TABLE "new_PatentApplicationData" RENAME TO "PatentApplicationData";
CREATE TABLE "new_PatentTechnicalAttributes" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "MaturityLevel" TEXT,
    CONSTRAINT "PatentTechnicalAttributes_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentTechnicalAttributes" ("MaturityLevel", "PatentID") SELECT "MaturityLevel", "PatentID" FROM "PatentTechnicalAttributes";
DROP TABLE "PatentTechnicalAttributes";
ALTER TABLE "new_PatentTechnicalAttributes" RENAME TO "PatentTechnicalAttributes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalKeyword_Keyword_key" ON "TechnicalKeyword"("Keyword");

-- CreateIndex
CREATE UNIQUE INDEX "_PatentTechnicalAttributesToTechnicalKeyword_AB_unique" ON "_PatentTechnicalAttributesToTechnicalKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_PatentTechnicalAttributesToTechnicalKeyword_B_index" ON "_PatentTechnicalAttributesToTechnicalKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "College_Name_key" ON "College"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_CountryName_key" ON "Country"("CountryName");

-- CreateIndex
CREATE UNIQUE INDEX "Country_ISOCode_key" ON "Country"("ISOCode");
