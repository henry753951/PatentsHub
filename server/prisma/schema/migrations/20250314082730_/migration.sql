-- CreateTable
CREATE TABLE "AgencyUnit" (
    "AgencyUnitID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT
);

-- CreateTable
CREATE TABLE "PatentTakerAgencyUnit" (
    "PatentID" INTEGER NOT NULL,
    "AgencyUnitID" INTEGER NOT NULL,
    "FileCode" TEXT NOT NULL,

    PRIMARY KEY ("PatentID", "AgencyUnitID"),
    CONSTRAINT "PatentTakerAgencyUnit_AgencyUnitID_fkey" FOREIGN KEY ("AgencyUnitID") REFERENCES "AgencyUnit" ("AgencyUnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentTakerAgencyUnit_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "PatentInternal" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
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
CREATE TABLE "FundingPlan" (
    "PlanID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PlanType" INTEGER NOT NULL,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FundingUnit" (
    "UnitID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FundingUnitData" (
    "FundingUnitID" INTEGER NOT NULL,
    "PatentID" INTEGER NOT NULL,
    "ProjectCode" TEXT,
    "Amount" REAL NOT NULL,
    "patentFundingPatentID" INTEGER,

    PRIMARY KEY ("FundingUnitID", "PatentID"),
    CONSTRAINT "FundingUnitData_FundingUnitID_fkey" FOREIGN KEY ("FundingUnitID") REFERENCES "FundingUnit" ("UnitID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FundingUnitData_patentFundingPatentID_fkey" FOREIGN KEY ("patentFundingPatentID") REFERENCES "PatentFunding" ("PatentID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentFunding" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fundingPlanPlanID" INTEGER NOT NULL,
    CONSTRAINT "PatentFunding_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentFunding_fundingPlanPlanID_fkey" FOREIGN KEY ("fundingPlanPlanID") REFERENCES "FundingPlan" ("PlanID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inventor" (
    "InventorID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DepartmentID" INTEGER NOT NULL,
    "ContactInfoID" INTEGER NOT NULL,
    CONSTRAINT "Inventor_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventor_ContactInfoID_fkey" FOREIGN KEY ("ContactInfoID") REFERENCES "ContactInfo" ("ContactInfoID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentInventor" (
    "PatentID" INTEGER NOT NULL,
    "InventorID" INTEGER NOT NULL,
    "Main" BOOLEAN NOT NULL,
    "Contribution" REAL,

    PRIMARY KEY ("PatentID", "InventorID"),
    CONSTRAINT "PatentInventor_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentInventor_InventorID_fkey" FOREIGN KEY ("InventorID") REFERENCES "Inventor" ("InventorID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Patent" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DepartmentID" INTEGER NOT NULL,
    "Year" TEXT NOT NULL,
    "DraftTitle" TEXT NOT NULL DEFAULT '',
    "Title" TEXT NOT NULL DEFAULT '',
    "TitleEnglish" TEXT NOT NULL DEFAULT '',
    "CountryID" INTEGER,
    "PatentType" TEXT,
    CONSTRAINT "Patent_CountryID_fkey" FOREIGN KEY ("CountryID") REFERENCES "Country" ("CountryID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Patent_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentApplicationData" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ApplicationNumber" TEXT,
    "FilingDate" DATETIME,
    "RDResultNumber" TEXT,
    "NSCNumber" TEXT,
    CONSTRAINT "PatentApplicationData_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentTechnicalAttributes" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "MaturityLevel" TEXT,
    CONSTRAINT "PatentTechnicalAttributes_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TechnicalKeyword" (
    "KeywordID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Keyword" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PatentInternal" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "InternalID" TEXT NOT NULL,
    "InitialReviewDate" DATETIME,
    "InitialReviewNumber" TEXT,
    CONSTRAINT "PatentInternal_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentExternal" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentNumber" TEXT,
    "PublicationDate" DATETIME,
    "StartDate" DATETIME,
    "EndDate" DATETIME,
    "IPCNumber" TEXT,
    "PatentScope" TEXT,
    CONSTRAINT "PatentExternal_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentStatus" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ExpiryDate" DATETIME,
    "Status" TEXT NOT NULL,
    "TechnicalCommitteeReviewDate" DATETIME,
    "MaintenanceYear" INTEGER,
    "MaintenanceStartDate" DATETIME,
    "MaintenanceEndDate" DATETIME,
    CONSTRAINT "PatentStatus_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "College" (
    "CollegeID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT
);

-- CreateTable
CREATE TABLE "Department" (
    "DepartmentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "CollegeID" INTEGER NOT NULL,
    "Description" TEXT,
    CONSTRAINT "Department_CollegeID_fkey" FOREIGN KEY ("CollegeID") REFERENCES "College" ("CollegeID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Country" (
    "CountryID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CountryName" TEXT NOT NULL,
    "ISOCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "ContactInfoID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Email" TEXT,
    "OfficeNumber" TEXT,
    "PhoneNumber" TEXT,
    "Role" TEXT,
    "Note" TEXT
);

-- CreateTable
CREATE TABLE "_PatentTechnicalAttributesToTechnicalKeyword" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PatentTechnicalAttributesToTechnicalKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "PatentTechnicalAttributes" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PatentTechnicalAttributesToTechnicalKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "TechnicalKeyword" ("KeywordID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AgencyUnitPerson_ContactInfoID_key" ON "AgencyUnitPerson"("ContactInfoID");

-- CreateIndex
CREATE UNIQUE INDEX "Inventor_ContactInfoID_key" ON "Inventor"("ContactInfoID");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalKeyword_Keyword_key" ON "TechnicalKeyword"("Keyword");

-- CreateIndex
CREATE UNIQUE INDEX "PatentInternal_InternalID_key" ON "PatentInternal"("InternalID");

-- CreateIndex
CREATE UNIQUE INDEX "College_Name_key" ON "College"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_Name_key" ON "Department"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_CountryName_key" ON "Country"("CountryName");

-- CreateIndex
CREATE UNIQUE INDEX "Country_ISOCode_key" ON "Country"("ISOCode");

-- CreateIndex
CREATE UNIQUE INDEX "_PatentTechnicalAttributesToTechnicalKeyword_AB_unique" ON "_PatentTechnicalAttributesToTechnicalKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_PatentTechnicalAttributesToTechnicalKeyword_B_index" ON "_PatentTechnicalAttributesToTechnicalKeyword"("B");
