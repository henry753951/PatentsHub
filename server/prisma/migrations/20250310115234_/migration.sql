/*
  Warnings:

  - The primary key for the `PatentTakerAgencyUnit` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentTakerAgencyUnit" (
    "PatentID" INTEGER NOT NULL,
    "AgencyUnitID" INTEGER NOT NULL,
    "FileCode" TEXT NOT NULL,

    PRIMARY KEY ("PatentID", "AgencyUnitID"),
    CONSTRAINT "PatentTakerAgencyUnit_AgencyUnitID_fkey" FOREIGN KEY ("AgencyUnitID") REFERENCES "AgencyUnit" ("AgencyUnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentTakerAgencyUnit_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "PatentInternal" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentTakerAgencyUnit" ("AgencyUnitID", "FileCode", "PatentID") SELECT "AgencyUnitID", "FileCode", "PatentID" FROM "PatentTakerAgencyUnit";
DROP TABLE "PatentTakerAgencyUnit";
ALTER TABLE "new_PatentTakerAgencyUnit" RENAME TO "PatentTakerAgencyUnit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
