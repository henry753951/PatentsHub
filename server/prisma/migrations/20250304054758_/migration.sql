/*
  Warnings:

  - You are about to drop the column `Email` on the `Inventor` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inventor" (
    "InventorID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "DepartmentID" INTEGER NOT NULL,
    "ContactInfoID" INTEGER,
    CONSTRAINT "Inventor_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventor_ContactInfoID_fkey" FOREIGN KEY ("ContactInfoID") REFERENCES "ContactInfo" ("ContactInfoID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Inventor" ("ContactInfoID", "DepartmentID", "InventorID", "Name") SELECT "ContactInfoID", "DepartmentID", "InventorID", "Name" FROM "Inventor";
DROP TABLE "Inventor";
ALTER TABLE "new_Inventor" RENAME TO "Inventor";
CREATE UNIQUE INDEX "Inventor_ContactInfoID_key" ON "Inventor"("ContactInfoID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
