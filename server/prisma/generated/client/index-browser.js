
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.2.1
 * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
 */
Prisma.prismaVersion = {
  client: "6.2.1",
  engine: "4123509d24aa4dede1e864b46351bf2790323b69"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.AgencyScalarFieldEnum = {
  AgencyID: 'AgencyID',
  Name: 'Name'
};

exports.Prisma.AgencyPatentScalarFieldEnum = {
  PatentID: 'PatentID',
  AgencyID: 'AgencyID',
  FileCode: 'FileCode',
  Role: 'Role',
  Details: 'Details'
};

exports.Prisma.AgencyContactPersonScalarFieldEnum = {
  ContactPersonID: 'ContactPersonID',
  AgencyID: 'AgencyID',
  Position: 'Position',
  ContactInfoID: 'ContactInfoID'
};

exports.Prisma.FundingPlanScalarFieldEnum = {
  PlanID: 'PlanID',
  PlanType: 'PlanType'
};

exports.Prisma.PatentFundingScalarFieldEnum = {
  FundingID: 'FundingID',
  PatentID: 'PatentID',
  FundingAgency: 'FundingAgency',
  ProjectNumber: 'ProjectNumber',
  PlanID: 'PlanID'
};

exports.Prisma.InventorScalarFieldEnum = {
  InventorID: 'InventorID',
  Name: 'Name',
  Department: 'Department',
  Email: 'Email',
  ContactInfoID: 'ContactInfoID'
};

exports.Prisma.PatentInventorScalarFieldEnum = {
  PatentID: 'PatentID',
  InventorID: 'InventorID',
  Main: 'Main'
};

exports.Prisma.PatentScalarFieldEnum = {
  PatentID: 'PatentID',
  Year: 'Year',
  InternalID: 'InternalID',
  Title: 'Title',
  DepartmentID: 'DepartmentID',
  CollegeID: 'CollegeID',
  TitleEnglish: 'TitleEnglish'
};

exports.Prisma.PatentStatusScalarFieldEnum = {
  PatentID: 'PatentID',
  ExpiryDate: 'ExpiryDate',
  Status: 'Status',
  TechnicalCommitteeReviewDate: 'TechnicalCommitteeReviewDate',
  MaintenanceYear: 'MaintenanceYear',
  MaintenanceStartDate: 'MaintenanceStartDate',
  MaintenanceEndDate: 'MaintenanceEndDate'
};

exports.Prisma.PatentApplicationDataScalarFieldEnum = {
  PatentID: 'PatentID',
  CountryID: 'CountryID',
  PatentNumber: 'PatentNumber',
  FilingDate: 'FilingDate',
  GrantDate: 'GrantDate',
  PatentType: 'PatentType',
  ApplicationNumber: 'ApplicationNumber'
};

exports.Prisma.PatentTechnicalAttributesScalarFieldEnum = {
  PatentID: 'PatentID',
  IPC: 'IPC',
  Scope: 'Scope',
  MaturityLevel: 'MaturityLevel',
  Keywords: 'Keywords'
};

exports.Prisma.CollegeScalarFieldEnum = {
  CollegeID: 'CollegeID',
  Name: 'Name',
  Description: 'Description'
};

exports.Prisma.DepartmentScalarFieldEnum = {
  DepartmentID: 'DepartmentID',
  Name: 'Name',
  CollegeID: 'CollegeID',
  Description: 'Description'
};

exports.Prisma.CountryScalarFieldEnum = {
  CountryID: 'CountryID',
  CountryName: 'CountryName',
  ISOCode: 'ISOCode'
};

exports.Prisma.ContactInfoScalarFieldEnum = {
  ContactInfoID: 'ContactInfoID',
  Name: 'Name',
  Email: 'Email',
  OfficeNumber: 'OfficeNumber',
  PhoneNumber: 'PhoneNumber',
  Position: 'Position',
  Note: 'Note'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Agency: 'Agency',
  AgencyPatent: 'AgencyPatent',
  AgencyContactPerson: 'AgencyContactPerson',
  FundingPlan: 'FundingPlan',
  PatentFunding: 'PatentFunding',
  Inventor: 'Inventor',
  PatentInventor: 'PatentInventor',
  Patent: 'Patent',
  PatentStatus: 'PatentStatus',
  PatentApplicationData: 'PatentApplicationData',
  PatentTechnicalAttributes: 'PatentTechnicalAttributes',
  College: 'College',
  Department: 'Department',
  Country: 'Country',
  ContactInfo: 'ContactInfo'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
