-- CreateTable
CREATE TABLE "Agency" (
    "AgencyID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AgencyPatent" (
    "PatentID" INTEGER NOT NULL,
    "AgencyID" INTEGER NOT NULL,
    "FileCode" TEXT NOT NULL,
    "Role" TEXT NOT NULL,
    "Details" TEXT,

    PRIMARY KEY ("PatentID", "AgencyID"),
    CONSTRAINT "AgencyPatent_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AgencyPatent_AgencyID_fkey" FOREIGN KEY ("AgencyID") REFERENCES "Agency" ("AgencyID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AgencyContactPerson" (
    "ContactPersonID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "AgencyID" INTEGER NOT NULL,
    "Position" TEXT NOT NULL,
    "ContactInfoID" INTEGER,
    CONSTRAINT "AgencyContactPerson_AgencyID_fkey" FOREIGN KEY ("AgencyID") REFERENCES "Agency" ("AgencyID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AgencyContactPerson_ContactInfoID_fkey" FOREIGN KEY ("ContactInfoID") REFERENCES "ContactInfo" ("ContactInfoID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FundingPlan" (
    "PlanID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PlanType" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PatentFunding" (
    "FundingID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PatentID" INTEGER NOT NULL,
    "FundingAgency" TEXT NOT NULL,
    "ProjectNumber" TEXT NOT NULL,
    "PlanID" INTEGER NOT NULL,
    CONSTRAINT "PatentFunding_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentFunding_PlanID_fkey" FOREIGN KEY ("PlanID") REFERENCES "FundingPlan" ("PlanID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inventor" (
    "InventorID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Department" INTEGER NOT NULL,
    "Email" TEXT,
    "ContactInfoID" INTEGER,
    CONSTRAINT "Inventor_Department_fkey" FOREIGN KEY ("Department") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventor_ContactInfoID_fkey" FOREIGN KEY ("ContactInfoID") REFERENCES "ContactInfo" ("ContactInfoID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentInventor" (
    "PatentID" INTEGER NOT NULL,
    "InventorID" INTEGER NOT NULL,
    "Main" BOOLEAN NOT NULL,

    PRIMARY KEY ("PatentID", "InventorID"),
    CONSTRAINT "PatentInventor_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentInventor_InventorID_fkey" FOREIGN KEY ("InventorID") REFERENCES "Inventor" ("InventorID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Patent" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Year" TEXT NOT NULL,
    "InternalID" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "DepartmentID" INTEGER NOT NULL,
    "CollegeID" INTEGER NOT NULL,
    "TitleEnglish" TEXT,
    CONSTRAINT "Patent_DepartmentID_fkey" FOREIGN KEY ("DepartmentID") REFERENCES "Department" ("DepartmentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Patent_CollegeID_fkey" FOREIGN KEY ("CollegeID") REFERENCES "College" ("CollegeID") ON DELETE RESTRICT ON UPDATE CASCADE
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
CREATE TABLE "PatentApplicationData" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CountryID" INTEGER NOT NULL,
    "PatentNumber" TEXT NOT NULL,
    "FilingDate" DATETIME,
    "GrantDate" DATETIME,
    "PatentType" TEXT NOT NULL,
    "ApplicationNumber" TEXT NOT NULL,
    CONSTRAINT "PatentApplicationData_CountryID_fkey" FOREIGN KEY ("CountryID") REFERENCES "Country" ("CountryID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatentApplicationData_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PatentTechnicalAttributes" (
    "PatentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "IPC" TEXT NOT NULL,
    "Scope" TEXT NOT NULL,
    "MaturityLevel" TEXT NOT NULL,
    "Keywords" TEXT NOT NULL,
    CONSTRAINT "PatentTechnicalAttributes_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE RESTRICT ON UPDATE CASCADE
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
    CONSTRAINT "Department_CollegeID_fkey" FOREIGN KEY ("CollegeID") REFERENCES "College" ("CollegeID") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "Email" TEXT NOT NULL,
    "OfficeNumber" TEXT,
    "PhoneNumber" TEXT,
    "Position" TEXT,
    "Note" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "AgencyContactPerson_ContactInfoID_key" ON "AgencyContactPerson"("ContactInfoID");

-- CreateIndex
CREATE UNIQUE INDEX "Inventor_ContactInfoID_key" ON "Inventor"("ContactInfoID");
