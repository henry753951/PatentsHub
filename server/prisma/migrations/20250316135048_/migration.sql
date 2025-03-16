-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentApplicationData" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ApplicationNumber" TEXT,
    "FilingDate" DATETIME,
    "RDResultNumber" TEXT,
    "NSCNumber" TEXT,
    CONSTRAINT "PatentApplicationData_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentApplicationData" ("ApplicationNumber", "FilingDate", "NSCNumber", "PatentID", "RDResultNumber") SELECT "ApplicationNumber", "FilingDate", "NSCNumber", "PatentID", "RDResultNumber" FROM "PatentApplicationData";
DROP TABLE "PatentApplicationData";
ALTER TABLE "new_PatentApplicationData" RENAME TO "PatentApplicationData";
CREATE TABLE "new_PatentExternal" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentNumber" TEXT,
    "PublicationDate" DATETIME,
    "StartDate" DATETIME,
    "EndDate" DATETIME,
    "IPCNumber" TEXT,
    "PatentScope" TEXT,
    CONSTRAINT "PatentExternal_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentExternal" ("EndDate", "IPCNumber", "PatentID", "PatentNumber", "PatentScope", "PublicationDate", "StartDate") SELECT "EndDate", "IPCNumber", "PatentID", "PatentNumber", "PatentScope", "PublicationDate", "StartDate" FROM "PatentExternal";
DROP TABLE "PatentExternal";
ALTER TABLE "new_PatentExternal" RENAME TO "PatentExternal";
CREATE TABLE "new_PatentFunding" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fundingPlanPlanID" INTEGER NOT NULL,
    CONSTRAINT "PatentFunding_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PatentFunding_fundingPlanPlanID_fkey" FOREIGN KEY ("fundingPlanPlanID") REFERENCES "FundingPlan" ("PlanID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentFunding" ("PatentID", "fundingPlanPlanID") SELECT "PatentID", "fundingPlanPlanID" FROM "PatentFunding";
DROP TABLE "PatentFunding";
ALTER TABLE "new_PatentFunding" RENAME TO "PatentFunding";
CREATE TABLE "new_PatentInitiatorAgencyUnit" (
    "PatentID" INTEGER NOT NULL,
    "AgencyUnitID" INTEGER NOT NULL,

    PRIMARY KEY ("PatentID", "AgencyUnitID"),
    CONSTRAINT "PatentInitiatorAgencyUnit_AgencyUnitID_fkey" FOREIGN KEY ("AgencyUnitID") REFERENCES "AgencyUnit" ("AgencyUnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentInitiatorAgencyUnit_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "PatentInternal" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentInitiatorAgencyUnit" ("AgencyUnitID", "PatentID") SELECT "AgencyUnitID", "PatentID" FROM "PatentInitiatorAgencyUnit";
DROP TABLE "PatentInitiatorAgencyUnit";
ALTER TABLE "new_PatentInitiatorAgencyUnit" RENAME TO "PatentInitiatorAgencyUnit";
CREATE TABLE "new_PatentInternal" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "InternalID" TEXT NOT NULL,
    "InitialReviewDate" DATETIME,
    "InitialReviewNumber" TEXT,
    CONSTRAINT "PatentInternal_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentInternal" ("InitialReviewDate", "InitialReviewNumber", "InternalID", "PatentID") SELECT "InitialReviewDate", "InitialReviewNumber", "InternalID", "PatentID" FROM "PatentInternal";
DROP TABLE "PatentInternal";
ALTER TABLE "new_PatentInternal" RENAME TO "PatentInternal";
CREATE UNIQUE INDEX "PatentInternal_InternalID_key" ON "PatentInternal"("InternalID");
CREATE TABLE "new_PatentInventor" (
    "PatentID" INTEGER NOT NULL,
    "InventorID" INTEGER NOT NULL,
    "Main" BOOLEAN NOT NULL,
    "Contribution" REAL,

    PRIMARY KEY ("PatentID", "InventorID"),
    CONSTRAINT "PatentInventor_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PatentInventor_InventorID_fkey" FOREIGN KEY ("InventorID") REFERENCES "Inventor" ("InventorID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentInventor" ("Contribution", "InventorID", "Main", "PatentID") SELECT "Contribution", "InventorID", "Main", "PatentID" FROM "PatentInventor";
DROP TABLE "PatentInventor";
ALTER TABLE "new_PatentInventor" RENAME TO "PatentInventor";
CREATE TABLE "new_PatentStatus" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ExpiryDate" DATETIME,
    "Status" TEXT NOT NULL,
    "TechnicalCommitteeReviewDate" DATETIME,
    "MaintenanceYear" INTEGER,
    "MaintenanceStartDate" DATETIME,
    "MaintenanceEndDate" DATETIME,
    CONSTRAINT "PatentStatus_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentStatus" ("ExpiryDate", "MaintenanceEndDate", "MaintenanceStartDate", "MaintenanceYear", "PatentID", "Status", "TechnicalCommitteeReviewDate") SELECT "ExpiryDate", "MaintenanceEndDate", "MaintenanceStartDate", "MaintenanceYear", "PatentID", "Status", "TechnicalCommitteeReviewDate" FROM "PatentStatus";
DROP TABLE "PatentStatus";
ALTER TABLE "new_PatentStatus" RENAME TO "PatentStatus";
CREATE TABLE "new_PatentTakerAgencyUnit" (
    "PatentID" INTEGER NOT NULL,
    "AgencyUnitID" INTEGER NOT NULL,
    "FileCode" TEXT NOT NULL,

    PRIMARY KEY ("PatentID", "AgencyUnitID"),
    CONSTRAINT "PatentTakerAgencyUnit_AgencyUnitID_fkey" FOREIGN KEY ("AgencyUnitID") REFERENCES "AgencyUnit" ("AgencyUnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentTakerAgencyUnit_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "PatentInternal" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentTakerAgencyUnit" ("AgencyUnitID", "FileCode", "PatentID") SELECT "AgencyUnitID", "FileCode", "PatentID" FROM "PatentTakerAgencyUnit";
DROP TABLE "PatentTakerAgencyUnit";
ALTER TABLE "new_PatentTakerAgencyUnit" RENAME TO "PatentTakerAgencyUnit";
CREATE TABLE "new_PatentTechnicalAttributes" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "MaturityLevel" TEXT,
    CONSTRAINT "PatentTechnicalAttributes_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatentTechnicalAttributes" ("MaturityLevel", "PatentID") SELECT "MaturityLevel", "PatentID" FROM "PatentTechnicalAttributes";
DROP TABLE "PatentTechnicalAttributes";
ALTER TABLE "new_PatentTechnicalAttributes" RENAME TO "PatentTechnicalAttributes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
