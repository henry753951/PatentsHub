/*
  Warnings:

  - You are about to drop the column `Name` on the `Inventor` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inventor" (
    "InventorID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DepartmentID" INTEGER NOT NULL,
    "ContactInfoID" INTEGER NOT NULL,
    CONSTRAINT "Inventor_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventor_ContactInfoID_fkey" FOREIGN KEY ("ContactInfoID") REFERENCES "ContactInfo" ("ContactInfoID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inventor" ("ContactInfoID", "DepartmentID", "InventorID") SELECT "ContactInfoID", "DepartmentID", "InventorID" FROM "Inventor";
DROP TABLE "Inventor";
ALTER TABLE "new_Inventor" RENAME TO "Inventor";
CREATE UNIQUE INDEX "Inventor_ContactInfoID_key" ON "Inventor"("ContactInfoID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
