-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentInitiatorAgencyUnit" (
    "PatentID" INTEGER NOT NULL,
    "AgencyUnitID" INTEGER NOT NULL,
    "agencyUnitPersonIds" JSONB DEFAULT [],

    PRIMARY KEY ("PatentID", "AgencyUnitID"),
    CONSTRAINT "PatentInitiatorAgencyUnit_AgencyUnitID_fkey" FOREIGN KEY ("AgencyUnitID") REFERENCES "AgencyUnit" ("AgencyUnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentInitiatorAgencyUnit_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "PatentInternal" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentInitiatorAgencyUnit" ("AgencyUnitID", "PatentID", "agencyUnitPersonIds") SELECT "AgencyUnitID", "PatentID", "agencyUnitPersonIds" FROM "PatentInitiatorAgencyUnit";
DROP TABLE "PatentInitiatorAgencyUnit";
ALTER TABLE "new_PatentInitiatorAgencyUnit" RENAME TO "PatentInitiatorAgencyUnit";
CREATE TABLE "new_PatentTakerAgencyUnit" (
    "PatentID" INTEGER NOT NULL,
    "AgencyUnitID" INTEGER NOT NULL,
    "FileCode" TEXT NOT NULL,
    "agencyUnitPersonIds" JSONB DEFAULT [],

    PRIMARY KEY ("PatentID", "AgencyUnitID"),
    CONSTRAINT "PatentTakerAgencyUnit_AgencyUnitID_fkey" FOREIGN KEY ("AgencyUnitID") REFERENCES "AgencyUnit" ("AgencyUnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentTakerAgencyUnit_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "PatentInternal" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentTakerAgencyUnit" ("AgencyUnitID", "FileCode", "PatentID", "agencyUnitPersonIds") SELECT "AgencyUnitID", "FileCode", "PatentID", "agencyUnitPersonIds" FROM "PatentTakerAgencyUnit";
DROP TABLE "PatentTakerAgencyUnit";
ALTER TABLE "new_PatentTakerAgencyUnit" RENAME TO "PatentTakerAgencyUnit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
