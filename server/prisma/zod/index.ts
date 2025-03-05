import { z } from 'zod';
import type { Prisma } from '../../../node_modules/@prisma/client/node_modules/.prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const AgencyScalarFieldEnumSchema = z.enum(['AgencyID','Name']);

export const AgencyPatentScalarFieldEnumSchema = z.enum(['PatentID','AgencyID','FileCode','Role','Details']);

export const AgencyContactPersonScalarFieldEnumSchema = z.enum(['ContactPersonID','AgencyID','Position','ContactInfoID']);

export const FundingPlanScalarFieldEnumSchema = z.enum(['PlanID','PlanType']);

export const PatentFundingScalarFieldEnumSchema = z.enum(['FundingID','PatentID','FundingAgency','ProjectNumber','PlanID']);

export const InventorScalarFieldEnumSchema = z.enum(['InventorID','Name','DepartmentID','ContactInfoID']);

export const PatentInventorScalarFieldEnumSchema = z.enum(['PatentID','InventorID','Main','Contribution']);

export const PatentScalarFieldEnumSchema = z.enum(['PatentID','Year','InternalID','DraftTitle','Title','TitleEnglish','DepartmentID','CollegeID']);

export const PatentStatusScalarFieldEnumSchema = z.enum(['PatentID','ExpiryDate','Status','TechnicalCommitteeReviewDate','MaintenanceYear','MaintenanceStartDate','MaintenanceEndDate']);

export const PatentApplicationDataScalarFieldEnumSchema = z.enum(['PatentID','CountryID','PatentType','PatentNumber','ApplicationNumber','FilingDate','PublicationDate']);

export const PatentTechnicalAttributesScalarFieldEnumSchema = z.enum(['PatentID','MaturityLevel']);

export const TechnicalKeywordScalarFieldEnumSchema = z.enum(['KeywordID','Keyword']);

export const CollegeScalarFieldEnumSchema = z.enum(['CollegeID','Name','Description']);

export const DepartmentScalarFieldEnumSchema = z.enum(['DepartmentID','Name','CollegeID','Description']);

export const CountryScalarFieldEnumSchema = z.enum(['CountryID','CountryName','ISOCode']);

export const ContactInfoScalarFieldEnumSchema = z.enum(['ContactInfoID','Name','Email','OfficeNumber','PhoneNumber','Position','Note']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const EnumPatentTypeSchema = z.enum(['INVENTION','UTILITY_MODEL','DESIGN','PLANT']);

export type EnumPatentTypeType = `${z.infer<typeof EnumPatentTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// AGENCY SCHEMA
/////////////////////////////////////////

export const AgencySchema = z.object({
  AgencyID: z.number().int(),
  Name: z.string(),
})

export type Agency = z.infer<typeof AgencySchema>

/////////////////////////////////////////
// AGENCY PATENT SCHEMA
/////////////////////////////////////////

export const AgencyPatentSchema = z.object({
  PatentID: z.number().int(),
  AgencyID: z.number().int(),
  FileCode: z.string(),
  Role: z.string(),
  Details: z.string().nullable(),
})

export type AgencyPatent = z.infer<typeof AgencyPatentSchema>

/////////////////////////////////////////
// AGENCY CONTACT PERSON SCHEMA
/////////////////////////////////////////

export const AgencyContactPersonSchema = z.object({
  ContactPersonID: z.number().int(),
  AgencyID: z.number().int(),
  Position: z.string(),
  ContactInfoID: z.number().int().nullable(),
})

export type AgencyContactPerson = z.infer<typeof AgencyContactPersonSchema>

/////////////////////////////////////////
// FUNDING PLAN SCHEMA
/////////////////////////////////////////

export const FundingPlanSchema = z.object({
  PlanID: z.number().int(),
  PlanType: z.number().int(),
})

export type FundingPlan = z.infer<typeof FundingPlanSchema>

/////////////////////////////////////////
// PATENT FUNDING SCHEMA
/////////////////////////////////////////

export const PatentFundingSchema = z.object({
  FundingID: z.number().int(),
  PatentID: z.number().int(),
  FundingAgency: z.string(),
  ProjectNumber: z.string(),
  PlanID: z.number().int(),
})

export type PatentFunding = z.infer<typeof PatentFundingSchema>

/////////////////////////////////////////
// INVENTOR SCHEMA
/////////////////////////////////////////

export const InventorSchema = z.object({
  InventorID: z.number().int(),
  Name: z.string(),
  DepartmentID: z.number().int(),
  ContactInfoID: z.number().int().nullable(),
})

export type Inventor = z.infer<typeof InventorSchema>

/////////////////////////////////////////
// PATENT INVENTOR SCHEMA
/////////////////////////////////////////

export const PatentInventorSchema = z.object({
  PatentID: z.number().int(),
  InventorID: z.number().int(),
  Main: z.boolean(),
  Contribution: z.number().nullable(),
})

export type PatentInventor = z.infer<typeof PatentInventorSchema>

/////////////////////////////////////////
// PATENT SCHEMA
/////////////////////////////////////////

export const PatentSchema = z.object({
  PatentID: z.number().int(),
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string(),
  Title: z.string(),
  TitleEnglish: z.string(),
  DepartmentID: z.number().int(),
  CollegeID: z.number().int(),
})

export type Patent = z.infer<typeof PatentSchema>

/////////////////////////////////////////
// PATENT STATUS SCHEMA
/////////////////////////////////////////

export const PatentStatusSchema = z.object({
  PatentID: z.number().int(),
  ExpiryDate: z.coerce.date().nullable(),
  Status: z.string(),
  TechnicalCommitteeReviewDate: z.coerce.date().nullable(),
  MaintenanceYear: z.number().int().nullable(),
  MaintenanceStartDate: z.coerce.date().nullable(),
  MaintenanceEndDate: z.coerce.date().nullable(),
})

export type PatentStatus = z.infer<typeof PatentStatusSchema>

/////////////////////////////////////////
// PATENT APPLICATION DATA SCHEMA
/////////////////////////////////////////

export const PatentApplicationDataSchema = z.object({
  PatentType: EnumPatentTypeSchema.nullable(),
  PatentID: z.number().int(),
  CountryID: z.number().int().nullable(),
  PatentNumber: z.string().nullable(),
  ApplicationNumber: z.string().nullable(),
  FilingDate: z.coerce.date().nullable(),
  PublicationDate: z.coerce.date().nullable(),
})

export type PatentApplicationData = z.infer<typeof PatentApplicationDataSchema>

/////////////////////////////////////////
// PATENT TECHNICAL ATTRIBUTES SCHEMA
/////////////////////////////////////////

export const PatentTechnicalAttributesSchema = z.object({
  PatentID: z.number().int(),
  MaturityLevel: z.string().nullable(),
})

export type PatentTechnicalAttributes = z.infer<typeof PatentTechnicalAttributesSchema>

/////////////////////////////////////////
// TECHNICAL KEYWORD SCHEMA
/////////////////////////////////////////

export const TechnicalKeywordSchema = z.object({
  KeywordID: z.number().int(),
  Keyword: z.string(),
})

export type TechnicalKeyword = z.infer<typeof TechnicalKeywordSchema>

/////////////////////////////////////////
// COLLEGE SCHEMA
/////////////////////////////////////////

export const CollegeSchema = z.object({
  CollegeID: z.number().int(),
  Name: z.string(),
  Description: z.string().nullable(),
})

export type College = z.infer<typeof CollegeSchema>

/////////////////////////////////////////
// DEPARTMENT SCHEMA
/////////////////////////////////////////

export const DepartmentSchema = z.object({
  DepartmentID: z.number().int(),
  Name: z.string(),
  CollegeID: z.number().int(),
  Description: z.string().nullable(),
})

export type Department = z.infer<typeof DepartmentSchema>

/////////////////////////////////////////
// COUNTRY SCHEMA
/////////////////////////////////////////

export const CountrySchema = z.object({
  CountryID: z.number().int(),
  CountryName: z.string(),
  ISOCode: z.string(),
})

export type Country = z.infer<typeof CountrySchema>

/////////////////////////////////////////
// CONTACT INFO SCHEMA
/////////////////////////////////////////

export const ContactInfoSchema = z.object({
  ContactInfoID: z.number().int(),
  Name: z.string().nullable(),
  Email: z.string().nullable(),
  OfficeNumber: z.string().nullable(),
  PhoneNumber: z.string().nullable(),
  Position: z.string().nullable(),
  Note: z.string().nullable(),
})

export type ContactInfo = z.infer<typeof ContactInfoSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// AGENCY
//------------------------------------------------------

export const AgencyIncludeSchema: z.ZodType<Prisma.AgencyInclude> = z.object({
  contacts: z.union([z.boolean(),z.lazy(() => AgencyContactPersonFindManyArgsSchema)]).optional(),
  patents: z.union([z.boolean(),z.lazy(() => AgencyPatentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AgencyCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AgencyArgsSchema: z.ZodType<Prisma.AgencyDefaultArgs> = z.object({
  select: z.lazy(() => AgencySelectSchema).optional(),
  include: z.lazy(() => AgencyIncludeSchema).optional(),
}).strict();

export const AgencyCountOutputTypeArgsSchema: z.ZodType<Prisma.AgencyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AgencyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AgencyCountOutputTypeSelectSchema: z.ZodType<Prisma.AgencyCountOutputTypeSelect> = z.object({
  contacts: z.boolean().optional(),
  patents: z.boolean().optional(),
}).strict();

export const AgencySelectSchema: z.ZodType<Prisma.AgencySelect> = z.object({
  AgencyID: z.boolean().optional(),
  Name: z.boolean().optional(),
  contacts: z.union([z.boolean(),z.lazy(() => AgencyContactPersonFindManyArgsSchema)]).optional(),
  patents: z.union([z.boolean(),z.lazy(() => AgencyPatentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AgencyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// AGENCY PATENT
//------------------------------------------------------

export const AgencyPatentIncludeSchema: z.ZodType<Prisma.AgencyPatentInclude> = z.object({
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
  agency: z.union([z.boolean(),z.lazy(() => AgencyArgsSchema)]).optional(),
}).strict()

export const AgencyPatentArgsSchema: z.ZodType<Prisma.AgencyPatentDefaultArgs> = z.object({
  select: z.lazy(() => AgencyPatentSelectSchema).optional(),
  include: z.lazy(() => AgencyPatentIncludeSchema).optional(),
}).strict();

export const AgencyPatentSelectSchema: z.ZodType<Prisma.AgencyPatentSelect> = z.object({
  PatentID: z.boolean().optional(),
  AgencyID: z.boolean().optional(),
  FileCode: z.boolean().optional(),
  Role: z.boolean().optional(),
  Details: z.boolean().optional(),
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
  agency: z.union([z.boolean(),z.lazy(() => AgencyArgsSchema)]).optional(),
}).strict()

// AGENCY CONTACT PERSON
//------------------------------------------------------

export const AgencyContactPersonIncludeSchema: z.ZodType<Prisma.AgencyContactPersonInclude> = z.object({
  agency: z.union([z.boolean(),z.lazy(() => AgencyArgsSchema)]).optional(),
  contactInfo: z.union([z.boolean(),z.lazy(() => ContactInfoArgsSchema)]).optional(),
}).strict()

export const AgencyContactPersonArgsSchema: z.ZodType<Prisma.AgencyContactPersonDefaultArgs> = z.object({
  select: z.lazy(() => AgencyContactPersonSelectSchema).optional(),
  include: z.lazy(() => AgencyContactPersonIncludeSchema).optional(),
}).strict();

export const AgencyContactPersonSelectSchema: z.ZodType<Prisma.AgencyContactPersonSelect> = z.object({
  ContactPersonID: z.boolean().optional(),
  AgencyID: z.boolean().optional(),
  Position: z.boolean().optional(),
  ContactInfoID: z.boolean().optional(),
  agency: z.union([z.boolean(),z.lazy(() => AgencyArgsSchema)]).optional(),
  contactInfo: z.union([z.boolean(),z.lazy(() => ContactInfoArgsSchema)]).optional(),
}).strict()

// FUNDING PLAN
//------------------------------------------------------

export const FundingPlanIncludeSchema: z.ZodType<Prisma.FundingPlanInclude> = z.object({
  fundings: z.union([z.boolean(),z.lazy(() => PatentFundingFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FundingPlanCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FundingPlanArgsSchema: z.ZodType<Prisma.FundingPlanDefaultArgs> = z.object({
  select: z.lazy(() => FundingPlanSelectSchema).optional(),
  include: z.lazy(() => FundingPlanIncludeSchema).optional(),
}).strict();

export const FundingPlanCountOutputTypeArgsSchema: z.ZodType<Prisma.FundingPlanCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FundingPlanCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FundingPlanCountOutputTypeSelectSchema: z.ZodType<Prisma.FundingPlanCountOutputTypeSelect> = z.object({
  fundings: z.boolean().optional(),
}).strict();

export const FundingPlanSelectSchema: z.ZodType<Prisma.FundingPlanSelect> = z.object({
  PlanID: z.boolean().optional(),
  PlanType: z.boolean().optional(),
  fundings: z.union([z.boolean(),z.lazy(() => PatentFundingFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FundingPlanCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PATENT FUNDING
//------------------------------------------------------

export const PatentFundingIncludeSchema: z.ZodType<Prisma.PatentFundingInclude> = z.object({
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
  plan: z.union([z.boolean(),z.lazy(() => FundingPlanArgsSchema)]).optional(),
}).strict()

export const PatentFundingArgsSchema: z.ZodType<Prisma.PatentFundingDefaultArgs> = z.object({
  select: z.lazy(() => PatentFundingSelectSchema).optional(),
  include: z.lazy(() => PatentFundingIncludeSchema).optional(),
}).strict();

export const PatentFundingSelectSchema: z.ZodType<Prisma.PatentFundingSelect> = z.object({
  FundingID: z.boolean().optional(),
  PatentID: z.boolean().optional(),
  FundingAgency: z.boolean().optional(),
  ProjectNumber: z.boolean().optional(),
  PlanID: z.boolean().optional(),
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
  plan: z.union([z.boolean(),z.lazy(() => FundingPlanArgsSchema)]).optional(),
}).strict()

// INVENTOR
//------------------------------------------------------

export const InventorIncludeSchema: z.ZodType<Prisma.InventorInclude> = z.object({
  department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
  contactInfo: z.union([z.boolean(),z.lazy(() => ContactInfoArgsSchema)]).optional(),
  patents: z.union([z.boolean(),z.lazy(() => PatentInventorFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InventorCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const InventorArgsSchema: z.ZodType<Prisma.InventorDefaultArgs> = z.object({
  select: z.lazy(() => InventorSelectSchema).optional(),
  include: z.lazy(() => InventorIncludeSchema).optional(),
}).strict();

export const InventorCountOutputTypeArgsSchema: z.ZodType<Prisma.InventorCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => InventorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const InventorCountOutputTypeSelectSchema: z.ZodType<Prisma.InventorCountOutputTypeSelect> = z.object({
  patents: z.boolean().optional(),
}).strict();

export const InventorSelectSchema: z.ZodType<Prisma.InventorSelect> = z.object({
  InventorID: z.boolean().optional(),
  Name: z.boolean().optional(),
  DepartmentID: z.boolean().optional(),
  ContactInfoID: z.boolean().optional(),
  department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
  contactInfo: z.union([z.boolean(),z.lazy(() => ContactInfoArgsSchema)]).optional(),
  patents: z.union([z.boolean(),z.lazy(() => PatentInventorFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InventorCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PATENT INVENTOR
//------------------------------------------------------

export const PatentInventorIncludeSchema: z.ZodType<Prisma.PatentInventorInclude> = z.object({
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
  inventor: z.union([z.boolean(),z.lazy(() => InventorArgsSchema)]).optional(),
}).strict()

export const PatentInventorArgsSchema: z.ZodType<Prisma.PatentInventorDefaultArgs> = z.object({
  select: z.lazy(() => PatentInventorSelectSchema).optional(),
  include: z.lazy(() => PatentInventorIncludeSchema).optional(),
}).strict();

export const PatentInventorSelectSchema: z.ZodType<Prisma.PatentInventorSelect> = z.object({
  PatentID: z.boolean().optional(),
  InventorID: z.boolean().optional(),
  Main: z.boolean().optional(),
  Contribution: z.boolean().optional(),
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
  inventor: z.union([z.boolean(),z.lazy(() => InventorArgsSchema)]).optional(),
}).strict()

// PATENT
//------------------------------------------------------

export const PatentIncludeSchema: z.ZodType<Prisma.PatentInclude> = z.object({
  agencies: z.union([z.boolean(),z.lazy(() => AgencyPatentFindManyArgsSchema)]).optional(),
  department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
  college: z.union([z.boolean(),z.lazy(() => CollegeArgsSchema)]).optional(),
  application: z.union([z.boolean(),z.lazy(() => PatentApplicationDataArgsSchema)]).optional(),
  funding: z.union([z.boolean(),z.lazy(() => PatentFundingFindManyArgsSchema)]).optional(),
  inventors: z.union([z.boolean(),z.lazy(() => PatentInventorFindManyArgsSchema)]).optional(),
  status: z.union([z.boolean(),z.lazy(() => PatentStatusArgsSchema)]).optional(),
  technical: z.union([z.boolean(),z.lazy(() => PatentTechnicalAttributesArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PatentArgsSchema: z.ZodType<Prisma.PatentDefaultArgs> = z.object({
  select: z.lazy(() => PatentSelectSchema).optional(),
  include: z.lazy(() => PatentIncludeSchema).optional(),
}).strict();

export const PatentCountOutputTypeArgsSchema: z.ZodType<Prisma.PatentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PatentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PatentCountOutputTypeSelectSchema: z.ZodType<Prisma.PatentCountOutputTypeSelect> = z.object({
  agencies: z.boolean().optional(),
  funding: z.boolean().optional(),
  inventors: z.boolean().optional(),
}).strict();

export const PatentSelectSchema: z.ZodType<Prisma.PatentSelect> = z.object({
  PatentID: z.boolean().optional(),
  Year: z.boolean().optional(),
  InternalID: z.boolean().optional(),
  DraftTitle: z.boolean().optional(),
  Title: z.boolean().optional(),
  TitleEnglish: z.boolean().optional(),
  DepartmentID: z.boolean().optional(),
  CollegeID: z.boolean().optional(),
  agencies: z.union([z.boolean(),z.lazy(() => AgencyPatentFindManyArgsSchema)]).optional(),
  department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
  college: z.union([z.boolean(),z.lazy(() => CollegeArgsSchema)]).optional(),
  application: z.union([z.boolean(),z.lazy(() => PatentApplicationDataArgsSchema)]).optional(),
  funding: z.union([z.boolean(),z.lazy(() => PatentFundingFindManyArgsSchema)]).optional(),
  inventors: z.union([z.boolean(),z.lazy(() => PatentInventorFindManyArgsSchema)]).optional(),
  status: z.union([z.boolean(),z.lazy(() => PatentStatusArgsSchema)]).optional(),
  technical: z.union([z.boolean(),z.lazy(() => PatentTechnicalAttributesArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PATENT STATUS
//------------------------------------------------------

export const PatentStatusIncludeSchema: z.ZodType<Prisma.PatentStatusInclude> = z.object({
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
}).strict()

export const PatentStatusArgsSchema: z.ZodType<Prisma.PatentStatusDefaultArgs> = z.object({
  select: z.lazy(() => PatentStatusSelectSchema).optional(),
  include: z.lazy(() => PatentStatusIncludeSchema).optional(),
}).strict();

export const PatentStatusSelectSchema: z.ZodType<Prisma.PatentStatusSelect> = z.object({
  PatentID: z.boolean().optional(),
  ExpiryDate: z.boolean().optional(),
  Status: z.boolean().optional(),
  TechnicalCommitteeReviewDate: z.boolean().optional(),
  MaintenanceYear: z.boolean().optional(),
  MaintenanceStartDate: z.boolean().optional(),
  MaintenanceEndDate: z.boolean().optional(),
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
}).strict()

// PATENT APPLICATION DATA
//------------------------------------------------------

export const PatentApplicationDataIncludeSchema: z.ZodType<Prisma.PatentApplicationDataInclude> = z.object({
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
}).strict()

export const PatentApplicationDataArgsSchema: z.ZodType<Prisma.PatentApplicationDataDefaultArgs> = z.object({
  select: z.lazy(() => PatentApplicationDataSelectSchema).optional(),
  include: z.lazy(() => PatentApplicationDataIncludeSchema).optional(),
}).strict();

export const PatentApplicationDataSelectSchema: z.ZodType<Prisma.PatentApplicationDataSelect> = z.object({
  PatentID: z.boolean().optional(),
  CountryID: z.boolean().optional(),
  PatentType: z.boolean().optional(),
  PatentNumber: z.boolean().optional(),
  ApplicationNumber: z.boolean().optional(),
  FilingDate: z.boolean().optional(),
  PublicationDate: z.boolean().optional(),
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
}).strict()

// PATENT TECHNICAL ATTRIBUTES
//------------------------------------------------------

export const PatentTechnicalAttributesIncludeSchema: z.ZodType<Prisma.PatentTechnicalAttributesInclude> = z.object({
  keywords: z.union([z.boolean(),z.lazy(() => TechnicalKeywordFindManyArgsSchema)]).optional(),
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatentTechnicalAttributesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PatentTechnicalAttributesArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesDefaultArgs> = z.object({
  select: z.lazy(() => PatentTechnicalAttributesSelectSchema).optional(),
  include: z.lazy(() => PatentTechnicalAttributesIncludeSchema).optional(),
}).strict();

export const PatentTechnicalAttributesCountOutputTypeArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PatentTechnicalAttributesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PatentTechnicalAttributesCountOutputTypeSelectSchema: z.ZodType<Prisma.PatentTechnicalAttributesCountOutputTypeSelect> = z.object({
  keywords: z.boolean().optional(),
}).strict();

export const PatentTechnicalAttributesSelectSchema: z.ZodType<Prisma.PatentTechnicalAttributesSelect> = z.object({
  PatentID: z.boolean().optional(),
  MaturityLevel: z.boolean().optional(),
  keywords: z.union([z.boolean(),z.lazy(() => TechnicalKeywordFindManyArgsSchema)]).optional(),
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatentTechnicalAttributesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TECHNICAL KEYWORD
//------------------------------------------------------

export const TechnicalKeywordIncludeSchema: z.ZodType<Prisma.TechnicalKeywordInclude> = z.object({
  patentTechnicalAttributes: z.union([z.boolean(),z.lazy(() => PatentTechnicalAttributesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TechnicalKeywordCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TechnicalKeywordArgsSchema: z.ZodType<Prisma.TechnicalKeywordDefaultArgs> = z.object({
  select: z.lazy(() => TechnicalKeywordSelectSchema).optional(),
  include: z.lazy(() => TechnicalKeywordIncludeSchema).optional(),
}).strict();

export const TechnicalKeywordCountOutputTypeArgsSchema: z.ZodType<Prisma.TechnicalKeywordCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TechnicalKeywordCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TechnicalKeywordCountOutputTypeSelectSchema: z.ZodType<Prisma.TechnicalKeywordCountOutputTypeSelect> = z.object({
  patentTechnicalAttributes: z.boolean().optional(),
}).strict();

export const TechnicalKeywordSelectSchema: z.ZodType<Prisma.TechnicalKeywordSelect> = z.object({
  KeywordID: z.boolean().optional(),
  Keyword: z.boolean().optional(),
  patentTechnicalAttributes: z.union([z.boolean(),z.lazy(() => PatentTechnicalAttributesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TechnicalKeywordCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COLLEGE
//------------------------------------------------------

export const CollegeIncludeSchema: z.ZodType<Prisma.CollegeInclude> = z.object({
  departments: z.union([z.boolean(),z.lazy(() => DepartmentFindManyArgsSchema)]).optional(),
  patents: z.union([z.boolean(),z.lazy(() => PatentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CollegeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CollegeArgsSchema: z.ZodType<Prisma.CollegeDefaultArgs> = z.object({
  select: z.lazy(() => CollegeSelectSchema).optional(),
  include: z.lazy(() => CollegeIncludeSchema).optional(),
}).strict();

export const CollegeCountOutputTypeArgsSchema: z.ZodType<Prisma.CollegeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CollegeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CollegeCountOutputTypeSelectSchema: z.ZodType<Prisma.CollegeCountOutputTypeSelect> = z.object({
  departments: z.boolean().optional(),
  patents: z.boolean().optional(),
}).strict();

export const CollegeSelectSchema: z.ZodType<Prisma.CollegeSelect> = z.object({
  CollegeID: z.boolean().optional(),
  Name: z.boolean().optional(),
  Description: z.boolean().optional(),
  departments: z.union([z.boolean(),z.lazy(() => DepartmentFindManyArgsSchema)]).optional(),
  patents: z.union([z.boolean(),z.lazy(() => PatentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CollegeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DEPARTMENT
//------------------------------------------------------

export const DepartmentIncludeSchema: z.ZodType<Prisma.DepartmentInclude> = z.object({
  college: z.union([z.boolean(),z.lazy(() => CollegeArgsSchema)]).optional(),
  inventors: z.union([z.boolean(),z.lazy(() => InventorFindManyArgsSchema)]).optional(),
  patents: z.union([z.boolean(),z.lazy(() => PatentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DepartmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DepartmentArgsSchema: z.ZodType<Prisma.DepartmentDefaultArgs> = z.object({
  select: z.lazy(() => DepartmentSelectSchema).optional(),
  include: z.lazy(() => DepartmentIncludeSchema).optional(),
}).strict();

export const DepartmentCountOutputTypeArgsSchema: z.ZodType<Prisma.DepartmentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DepartmentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DepartmentCountOutputTypeSelectSchema: z.ZodType<Prisma.DepartmentCountOutputTypeSelect> = z.object({
  inventors: z.boolean().optional(),
  patents: z.boolean().optional(),
}).strict();

export const DepartmentSelectSchema: z.ZodType<Prisma.DepartmentSelect> = z.object({
  DepartmentID: z.boolean().optional(),
  Name: z.boolean().optional(),
  CollegeID: z.boolean().optional(),
  Description: z.boolean().optional(),
  college: z.union([z.boolean(),z.lazy(() => CollegeArgsSchema)]).optional(),
  inventors: z.union([z.boolean(),z.lazy(() => InventorFindManyArgsSchema)]).optional(),
  patents: z.union([z.boolean(),z.lazy(() => PatentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DepartmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COUNTRY
//------------------------------------------------------

export const CountryIncludeSchema: z.ZodType<Prisma.CountryInclude> = z.object({
  applications: z.union([z.boolean(),z.lazy(() => PatentApplicationDataFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CountryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CountryArgsSchema: z.ZodType<Prisma.CountryDefaultArgs> = z.object({
  select: z.lazy(() => CountrySelectSchema).optional(),
  include: z.lazy(() => CountryIncludeSchema).optional(),
}).strict();

export const CountryCountOutputTypeArgsSchema: z.ZodType<Prisma.CountryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CountryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CountryCountOutputTypeSelectSchema: z.ZodType<Prisma.CountryCountOutputTypeSelect> = z.object({
  applications: z.boolean().optional(),
}).strict();

export const CountrySelectSchema: z.ZodType<Prisma.CountrySelect> = z.object({
  CountryID: z.boolean().optional(),
  CountryName: z.boolean().optional(),
  ISOCode: z.boolean().optional(),
  applications: z.union([z.boolean(),z.lazy(() => PatentApplicationDataFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CountryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CONTACT INFO
//------------------------------------------------------

export const ContactInfoIncludeSchema: z.ZodType<Prisma.ContactInfoInclude> = z.object({
  agencyContact: z.union([z.boolean(),z.lazy(() => AgencyContactPersonArgsSchema)]).optional(),
  inventor: z.union([z.boolean(),z.lazy(() => InventorArgsSchema)]).optional(),
}).strict()

export const ContactInfoArgsSchema: z.ZodType<Prisma.ContactInfoDefaultArgs> = z.object({
  select: z.lazy(() => ContactInfoSelectSchema).optional(),
  include: z.lazy(() => ContactInfoIncludeSchema).optional(),
}).strict();

export const ContactInfoSelectSchema: z.ZodType<Prisma.ContactInfoSelect> = z.object({
  ContactInfoID: z.boolean().optional(),
  Name: z.boolean().optional(),
  Email: z.boolean().optional(),
  OfficeNumber: z.boolean().optional(),
  PhoneNumber: z.boolean().optional(),
  Position: z.boolean().optional(),
  Note: z.boolean().optional(),
  agencyContact: z.union([z.boolean(),z.lazy(() => AgencyContactPersonArgsSchema)]).optional(),
  inventor: z.union([z.boolean(),z.lazy(() => InventorArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AgencyWhereInputSchema: z.ZodType<Prisma.AgencyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AgencyWhereInputSchema),z.lazy(() => AgencyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyWhereInputSchema),z.lazy(() => AgencyWhereInputSchema).array() ]).optional(),
  AgencyID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contacts: z.lazy(() => AgencyContactPersonListRelationFilterSchema).optional(),
  patents: z.lazy(() => AgencyPatentListRelationFilterSchema).optional()
}).strict();

export const AgencyOrderByWithRelationInputSchema: z.ZodType<Prisma.AgencyOrderByWithRelationInput> = z.object({
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => AgencyContactPersonOrderByRelationAggregateInputSchema).optional(),
  patents: z.lazy(() => AgencyPatentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AgencyWhereUniqueInputSchema: z.ZodType<Prisma.AgencyWhereUniqueInput> = z.object({
  AgencyID: z.number().int()
})
.and(z.object({
  AgencyID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AgencyWhereInputSchema),z.lazy(() => AgencyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyWhereInputSchema),z.lazy(() => AgencyWhereInputSchema).array() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contacts: z.lazy(() => AgencyContactPersonListRelationFilterSchema).optional(),
  patents: z.lazy(() => AgencyPatentListRelationFilterSchema).optional()
}).strict());

export const AgencyOrderByWithAggregationInputSchema: z.ZodType<Prisma.AgencyOrderByWithAggregationInput> = z.object({
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AgencyCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AgencyAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AgencyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AgencyMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AgencySumOrderByAggregateInputSchema).optional()
}).strict();

export const AgencyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AgencyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AgencyScalarWhereWithAggregatesInputSchema),z.lazy(() => AgencyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyScalarWhereWithAggregatesInputSchema),z.lazy(() => AgencyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  AgencyID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AgencyPatentWhereInputSchema: z.ZodType<Prisma.AgencyPatentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AgencyPatentWhereInputSchema),z.lazy(() => AgencyPatentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyPatentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyPatentWhereInputSchema),z.lazy(() => AgencyPatentWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  AgencyID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  FileCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Details: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
  agency: z.union([ z.lazy(() => AgencyScalarRelationFilterSchema),z.lazy(() => AgencyWhereInputSchema) ]).optional(),
}).strict();

export const AgencyPatentOrderByWithRelationInputSchema: z.ZodType<Prisma.AgencyPatentOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  FileCode: z.lazy(() => SortOrderSchema).optional(),
  Role: z.lazy(() => SortOrderSchema).optional(),
  Details: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  patent: z.lazy(() => PatentOrderByWithRelationInputSchema).optional(),
  agency: z.lazy(() => AgencyOrderByWithRelationInputSchema).optional()
}).strict();

export const AgencyPatentWhereUniqueInputSchema: z.ZodType<Prisma.AgencyPatentWhereUniqueInput> = z.object({
  PatentID_AgencyID: z.lazy(() => AgencyPatentPatentIDAgencyIDCompoundUniqueInputSchema)
})
.and(z.object({
  PatentID_AgencyID: z.lazy(() => AgencyPatentPatentIDAgencyIDCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AgencyPatentWhereInputSchema),z.lazy(() => AgencyPatentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyPatentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyPatentWhereInputSchema),z.lazy(() => AgencyPatentWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  AgencyID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  FileCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Details: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
  agency: z.union([ z.lazy(() => AgencyScalarRelationFilterSchema),z.lazy(() => AgencyWhereInputSchema) ]).optional(),
}).strict());

export const AgencyPatentOrderByWithAggregationInputSchema: z.ZodType<Prisma.AgencyPatentOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  FileCode: z.lazy(() => SortOrderSchema).optional(),
  Role: z.lazy(() => SortOrderSchema).optional(),
  Details: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AgencyPatentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AgencyPatentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AgencyPatentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AgencyPatentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AgencyPatentSumOrderByAggregateInputSchema).optional()
}).strict();

export const AgencyPatentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AgencyPatentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AgencyPatentScalarWhereWithAggregatesInputSchema),z.lazy(() => AgencyPatentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyPatentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyPatentScalarWhereWithAggregatesInputSchema),z.lazy(() => AgencyPatentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  AgencyID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  FileCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  Role: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  Details: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AgencyContactPersonWhereInputSchema: z.ZodType<Prisma.AgencyContactPersonWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AgencyContactPersonWhereInputSchema),z.lazy(() => AgencyContactPersonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyContactPersonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyContactPersonWhereInputSchema),z.lazy(() => AgencyContactPersonWhereInputSchema).array() ]).optional(),
  ContactPersonID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  AgencyID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Position: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  agency: z.union([ z.lazy(() => AgencyScalarRelationFilterSchema),z.lazy(() => AgencyWhereInputSchema) ]).optional(),
  contactInfo: z.union([ z.lazy(() => ContactInfoNullableScalarRelationFilterSchema),z.lazy(() => ContactInfoWhereInputSchema) ]).optional().nullable(),
}).strict();

export const AgencyContactPersonOrderByWithRelationInputSchema: z.ZodType<Prisma.AgencyContactPersonOrderByWithRelationInput> = z.object({
  ContactPersonID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  Position: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  agency: z.lazy(() => AgencyOrderByWithRelationInputSchema).optional(),
  contactInfo: z.lazy(() => ContactInfoOrderByWithRelationInputSchema).optional()
}).strict();

export const AgencyContactPersonWhereUniqueInputSchema: z.ZodType<Prisma.AgencyContactPersonWhereUniqueInput> = z.union([
  z.object({
    ContactPersonID: z.number().int(),
    ContactInfoID: z.number().int()
  }),
  z.object({
    ContactPersonID: z.number().int(),
  }),
  z.object({
    ContactInfoID: z.number().int(),
  }),
])
.and(z.object({
  ContactPersonID: z.number().int().optional(),
  ContactInfoID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AgencyContactPersonWhereInputSchema),z.lazy(() => AgencyContactPersonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyContactPersonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyContactPersonWhereInputSchema),z.lazy(() => AgencyContactPersonWhereInputSchema).array() ]).optional(),
  AgencyID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  Position: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  agency: z.union([ z.lazy(() => AgencyScalarRelationFilterSchema),z.lazy(() => AgencyWhereInputSchema) ]).optional(),
  contactInfo: z.union([ z.lazy(() => ContactInfoNullableScalarRelationFilterSchema),z.lazy(() => ContactInfoWhereInputSchema) ]).optional().nullable(),
}).strict());

export const AgencyContactPersonOrderByWithAggregationInputSchema: z.ZodType<Prisma.AgencyContactPersonOrderByWithAggregationInput> = z.object({
  ContactPersonID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  Position: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AgencyContactPersonCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AgencyContactPersonAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AgencyContactPersonMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AgencyContactPersonMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AgencyContactPersonSumOrderByAggregateInputSchema).optional()
}).strict();

export const AgencyContactPersonScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AgencyContactPersonScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AgencyContactPersonScalarWhereWithAggregatesInputSchema),z.lazy(() => AgencyContactPersonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyContactPersonScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyContactPersonScalarWhereWithAggregatesInputSchema),z.lazy(() => AgencyContactPersonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  ContactPersonID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  AgencyID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Position: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const FundingPlanWhereInputSchema: z.ZodType<Prisma.FundingPlanWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FundingPlanWhereInputSchema),z.lazy(() => FundingPlanWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundingPlanWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundingPlanWhereInputSchema),z.lazy(() => FundingPlanWhereInputSchema).array() ]).optional(),
  PlanID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  PlanType: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fundings: z.lazy(() => PatentFundingListRelationFilterSchema).optional()
}).strict();

export const FundingPlanOrderByWithRelationInputSchema: z.ZodType<Prisma.FundingPlanOrderByWithRelationInput> = z.object({
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  PlanType: z.lazy(() => SortOrderSchema).optional(),
  fundings: z.lazy(() => PatentFundingOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FundingPlanWhereUniqueInputSchema: z.ZodType<Prisma.FundingPlanWhereUniqueInput> = z.object({
  PlanID: z.number().int()
})
.and(z.object({
  PlanID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FundingPlanWhereInputSchema),z.lazy(() => FundingPlanWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundingPlanWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundingPlanWhereInputSchema),z.lazy(() => FundingPlanWhereInputSchema).array() ]).optional(),
  PlanType: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  fundings: z.lazy(() => PatentFundingListRelationFilterSchema).optional()
}).strict());

export const FundingPlanOrderByWithAggregationInputSchema: z.ZodType<Prisma.FundingPlanOrderByWithAggregationInput> = z.object({
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  PlanType: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FundingPlanCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FundingPlanAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FundingPlanMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FundingPlanMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FundingPlanSumOrderByAggregateInputSchema).optional()
}).strict();

export const FundingPlanScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FundingPlanScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FundingPlanScalarWhereWithAggregatesInputSchema),z.lazy(() => FundingPlanScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundingPlanScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundingPlanScalarWhereWithAggregatesInputSchema),z.lazy(() => FundingPlanScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PlanID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  PlanType: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const PatentFundingWhereInputSchema: z.ZodType<Prisma.PatentFundingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentFundingWhereInputSchema),z.lazy(() => PatentFundingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentFundingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentFundingWhereInputSchema),z.lazy(() => PatentFundingWhereInputSchema).array() ]).optional(),
  FundingID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  FundingAgency: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ProjectNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  PlanID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
  plan: z.union([ z.lazy(() => FundingPlanScalarRelationFilterSchema),z.lazy(() => FundingPlanWhereInputSchema) ]).optional(),
}).strict();

export const PatentFundingOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentFundingOrderByWithRelationInput> = z.object({
  FundingID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  FundingAgency: z.lazy(() => SortOrderSchema).optional(),
  ProjectNumber: z.lazy(() => SortOrderSchema).optional(),
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  patent: z.lazy(() => PatentOrderByWithRelationInputSchema).optional(),
  plan: z.lazy(() => FundingPlanOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentFundingWhereUniqueInputSchema: z.ZodType<Prisma.PatentFundingWhereUniqueInput> = z.object({
  FundingID: z.number().int()
})
.and(z.object({
  FundingID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PatentFundingWhereInputSchema),z.lazy(() => PatentFundingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentFundingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentFundingWhereInputSchema),z.lazy(() => PatentFundingWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  FundingAgency: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ProjectNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  PlanID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
  plan: z.union([ z.lazy(() => FundingPlanScalarRelationFilterSchema),z.lazy(() => FundingPlanWhereInputSchema) ]).optional(),
}).strict());

export const PatentFundingOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentFundingOrderByWithAggregationInput> = z.object({
  FundingID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  FundingAgency: z.lazy(() => SortOrderSchema).optional(),
  ProjectNumber: z.lazy(() => SortOrderSchema).optional(),
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PatentFundingCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentFundingAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentFundingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentFundingMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentFundingSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentFundingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentFundingScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentFundingScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentFundingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentFundingScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentFundingScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentFundingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  FundingID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  FundingAgency: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ProjectNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  PlanID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const InventorWhereInputSchema: z.ZodType<Prisma.InventorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InventorWhereInputSchema),z.lazy(() => InventorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InventorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InventorWhereInputSchema),z.lazy(() => InventorWhereInputSchema).array() ]).optional(),
  InventorID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  contactInfo: z.union([ z.lazy(() => ContactInfoNullableScalarRelationFilterSchema),z.lazy(() => ContactInfoWhereInputSchema) ]).optional().nullable(),
  patents: z.lazy(() => PatentInventorListRelationFilterSchema).optional()
}).strict();

export const InventorOrderByWithRelationInputSchema: z.ZodType<Prisma.InventorOrderByWithRelationInput> = z.object({
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  department: z.lazy(() => DepartmentOrderByWithRelationInputSchema).optional(),
  contactInfo: z.lazy(() => ContactInfoOrderByWithRelationInputSchema).optional(),
  patents: z.lazy(() => PatentInventorOrderByRelationAggregateInputSchema).optional()
}).strict();

export const InventorWhereUniqueInputSchema: z.ZodType<Prisma.InventorWhereUniqueInput> = z.union([
  z.object({
    InventorID: z.number().int(),
    ContactInfoID: z.number().int()
  }),
  z.object({
    InventorID: z.number().int(),
  }),
  z.object({
    ContactInfoID: z.number().int(),
  }),
])
.and(z.object({
  InventorID: z.number().int().optional(),
  ContactInfoID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => InventorWhereInputSchema),z.lazy(() => InventorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InventorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InventorWhereInputSchema),z.lazy(() => InventorWhereInputSchema).array() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  contactInfo: z.union([ z.lazy(() => ContactInfoNullableScalarRelationFilterSchema),z.lazy(() => ContactInfoWhereInputSchema) ]).optional().nullable(),
  patents: z.lazy(() => PatentInventorListRelationFilterSchema).optional()
}).strict());

export const InventorOrderByWithAggregationInputSchema: z.ZodType<Prisma.InventorOrderByWithAggregationInput> = z.object({
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => InventorCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => InventorAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InventorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InventorMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => InventorSumOrderByAggregateInputSchema).optional()
}).strict();

export const InventorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InventorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InventorScalarWhereWithAggregatesInputSchema),z.lazy(() => InventorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InventorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InventorScalarWhereWithAggregatesInputSchema),z.lazy(() => InventorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  InventorID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const PatentInventorWhereInputSchema: z.ZodType<Prisma.PatentInventorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentInventorWhereInputSchema),z.lazy(() => PatentInventorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentInventorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentInventorWhereInputSchema),z.lazy(() => PatentInventorWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  InventorID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Main: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  Contribution: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
  inventor: z.union([ z.lazy(() => InventorScalarRelationFilterSchema),z.lazy(() => InventorWhereInputSchema) ]).optional(),
}).strict();

export const PatentInventorOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentInventorOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  Main: z.lazy(() => SortOrderSchema).optional(),
  Contribution: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  patent: z.lazy(() => PatentOrderByWithRelationInputSchema).optional(),
  inventor: z.lazy(() => InventorOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentInventorWhereUniqueInputSchema: z.ZodType<Prisma.PatentInventorWhereUniqueInput> = z.object({
  PatentID_InventorID: z.lazy(() => PatentInventorPatentIDInventorIDCompoundUniqueInputSchema)
})
.and(z.object({
  PatentID_InventorID: z.lazy(() => PatentInventorPatentIDInventorIDCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PatentInventorWhereInputSchema),z.lazy(() => PatentInventorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentInventorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentInventorWhereInputSchema),z.lazy(() => PatentInventorWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  InventorID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  Main: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  Contribution: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
  inventor: z.union([ z.lazy(() => InventorScalarRelationFilterSchema),z.lazy(() => InventorWhereInputSchema) ]).optional(),
}).strict());

export const PatentInventorOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentInventorOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  Main: z.lazy(() => SortOrderSchema).optional(),
  Contribution: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PatentInventorCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentInventorAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentInventorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentInventorMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentInventorSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentInventorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentInventorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentInventorScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentInventorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentInventorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentInventorScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentInventorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  InventorID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Main: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  Contribution: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const PatentWhereInputSchema: z.ZodType<Prisma.PatentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentWhereInputSchema),z.lazy(() => PatentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentWhereInputSchema),z.lazy(() => PatentWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Year: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  InternalID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DraftTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  TitleEnglish: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  CollegeID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  agencies: z.lazy(() => AgencyPatentListRelationFilterSchema).optional(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  college: z.union([ z.lazy(() => CollegeScalarRelationFilterSchema),z.lazy(() => CollegeWhereInputSchema) ]).optional(),
  application: z.union([ z.lazy(() => PatentApplicationDataNullableScalarRelationFilterSchema),z.lazy(() => PatentApplicationDataWhereInputSchema) ]).optional().nullable(),
  funding: z.lazy(() => PatentFundingListRelationFilterSchema).optional(),
  inventors: z.lazy(() => PatentInventorListRelationFilterSchema).optional(),
  status: z.union([ z.lazy(() => PatentStatusNullableScalarRelationFilterSchema),z.lazy(() => PatentStatusWhereInputSchema) ]).optional().nullable(),
  technical: z.union([ z.lazy(() => PatentTechnicalAttributesNullableScalarRelationFilterSchema),z.lazy(() => PatentTechnicalAttributesWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PatentOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Year: z.lazy(() => SortOrderSchema).optional(),
  InternalID: z.lazy(() => SortOrderSchema).optional(),
  DraftTitle: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  TitleEnglish: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional(),
  agencies: z.lazy(() => AgencyPatentOrderByRelationAggregateInputSchema).optional(),
  department: z.lazy(() => DepartmentOrderByWithRelationInputSchema).optional(),
  college: z.lazy(() => CollegeOrderByWithRelationInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataOrderByWithRelationInputSchema).optional(),
  funding: z.lazy(() => PatentFundingOrderByRelationAggregateInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorOrderByRelationAggregateInputSchema).optional(),
  status: z.lazy(() => PatentStatusOrderByWithRelationInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentWhereUniqueInputSchema: z.ZodType<Prisma.PatentWhereUniqueInput> = z.union([
  z.object({
    PatentID: z.number().int(),
    InternalID: z.string()
  }),
  z.object({
    PatentID: z.number().int(),
  }),
  z.object({
    InternalID: z.string(),
  }),
])
.and(z.object({
  PatentID: z.number().int().optional(),
  InternalID: z.string().optional(),
  AND: z.union([ z.lazy(() => PatentWhereInputSchema),z.lazy(() => PatentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentWhereInputSchema),z.lazy(() => PatentWhereInputSchema).array() ]).optional(),
  Year: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DraftTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  TitleEnglish: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  CollegeID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  agencies: z.lazy(() => AgencyPatentListRelationFilterSchema).optional(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  college: z.union([ z.lazy(() => CollegeScalarRelationFilterSchema),z.lazy(() => CollegeWhereInputSchema) ]).optional(),
  application: z.union([ z.lazy(() => PatentApplicationDataNullableScalarRelationFilterSchema),z.lazy(() => PatentApplicationDataWhereInputSchema) ]).optional().nullable(),
  funding: z.lazy(() => PatentFundingListRelationFilterSchema).optional(),
  inventors: z.lazy(() => PatentInventorListRelationFilterSchema).optional(),
  status: z.union([ z.lazy(() => PatentStatusNullableScalarRelationFilterSchema),z.lazy(() => PatentStatusWhereInputSchema) ]).optional().nullable(),
  technical: z.union([ z.lazy(() => PatentTechnicalAttributesNullableScalarRelationFilterSchema),z.lazy(() => PatentTechnicalAttributesWhereInputSchema) ]).optional().nullable(),
}).strict());

export const PatentOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Year: z.lazy(() => SortOrderSchema).optional(),
  InternalID: z.lazy(() => SortOrderSchema).optional(),
  DraftTitle: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  TitleEnglish: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PatentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Year: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  InternalID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  DraftTitle: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  Title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  TitleEnglish: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  CollegeID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const PatentStatusWhereInputSchema: z.ZodType<Prisma.PatentStatusWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentStatusWhereInputSchema),z.lazy(() => PatentStatusWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentStatusWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentStatusWhereInputSchema),z.lazy(() => PatentStatusWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ExpiryDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  TechnicalCommitteeReviewDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  MaintenanceYear: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  MaintenanceStartDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  MaintenanceEndDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict();

export const PatentStatusOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentStatusOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  ExpiryDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Status: z.lazy(() => SortOrderSchema).optional(),
  TechnicalCommitteeReviewDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  MaintenanceYear: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  MaintenanceStartDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  MaintenanceEndDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  patent: z.lazy(() => PatentOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentStatusWhereUniqueInputSchema: z.ZodType<Prisma.PatentStatusWhereUniqueInput> = z.object({
  PatentID: z.number().int()
})
.and(z.object({
  PatentID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PatentStatusWhereInputSchema),z.lazy(() => PatentStatusWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentStatusWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentStatusWhereInputSchema),z.lazy(() => PatentStatusWhereInputSchema).array() ]).optional(),
  ExpiryDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  TechnicalCommitteeReviewDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  MaintenanceYear: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  MaintenanceStartDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  MaintenanceEndDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict());

export const PatentStatusOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentStatusOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  ExpiryDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Status: z.lazy(() => SortOrderSchema).optional(),
  TechnicalCommitteeReviewDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  MaintenanceYear: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  MaintenanceStartDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  MaintenanceEndDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PatentStatusCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentStatusAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentStatusMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentStatusMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentStatusSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentStatusScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentStatusScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentStatusScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentStatusScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentStatusScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentStatusScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentStatusScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ExpiryDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  Status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  TechnicalCommitteeReviewDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  MaintenanceYear: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  MaintenanceStartDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  MaintenanceEndDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const PatentApplicationDataWhereInputSchema: z.ZodType<Prisma.PatentApplicationDataWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentApplicationDataWhereInputSchema),z.lazy(() => PatentApplicationDataWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentApplicationDataWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentApplicationDataWhereInputSchema),z.lazy(() => PatentApplicationDataWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  CountryID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumEnumPatentTypeNullableFilterSchema),z.lazy(() => EnumPatentTypeSchema) ]).optional().nullable(),
  PatentNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ApplicationNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  FilingDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  PublicationDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  country: z.union([ z.lazy(() => CountryNullableScalarRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict();

export const PatentApplicationDataOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentApplicationDataOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PatentNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ApplicationNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  FilingDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PublicationDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  country: z.lazy(() => CountryOrderByWithRelationInputSchema).optional(),
  patent: z.lazy(() => PatentOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentApplicationDataWhereUniqueInputSchema: z.ZodType<Prisma.PatentApplicationDataWhereUniqueInput> = z.object({
  PatentID: z.number().int()
})
.and(z.object({
  PatentID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PatentApplicationDataWhereInputSchema),z.lazy(() => PatentApplicationDataWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentApplicationDataWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentApplicationDataWhereInputSchema),z.lazy(() => PatentApplicationDataWhereInputSchema).array() ]).optional(),
  CountryID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumEnumPatentTypeNullableFilterSchema),z.lazy(() => EnumPatentTypeSchema) ]).optional().nullable(),
  PatentNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ApplicationNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  FilingDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  PublicationDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  country: z.union([ z.lazy(() => CountryNullableScalarRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict());

export const PatentApplicationDataOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentApplicationDataOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PatentNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ApplicationNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  FilingDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PublicationDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PatentApplicationDataCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentApplicationDataAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentApplicationDataMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentApplicationDataMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentApplicationDataSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentApplicationDataScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentApplicationDataScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentApplicationDataScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentApplicationDataScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentApplicationDataScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentApplicationDataScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentApplicationDataScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  CountryID: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumEnumPatentTypeNullableWithAggregatesFilterSchema),z.lazy(() => EnumPatentTypeSchema) ]).optional().nullable(),
  PatentNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ApplicationNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  FilingDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  PublicationDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const PatentTechnicalAttributesWhereInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentTechnicalAttributesWhereInputSchema),z.lazy(() => PatentTechnicalAttributesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentTechnicalAttributesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentTechnicalAttributesWhereInputSchema),z.lazy(() => PatentTechnicalAttributesWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  MaturityLevel: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  keywords: z.lazy(() => TechnicalKeywordListRelationFilterSchema).optional(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict();

export const PatentTechnicalAttributesOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  MaturityLevel: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  keywords: z.lazy(() => TechnicalKeywordOrderByRelationAggregateInputSchema).optional(),
  patent: z.lazy(() => PatentOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesWhereUniqueInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesWhereUniqueInput> = z.object({
  PatentID: z.number().int()
})
.and(z.object({
  PatentID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PatentTechnicalAttributesWhereInputSchema),z.lazy(() => PatentTechnicalAttributesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentTechnicalAttributesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentTechnicalAttributesWhereInputSchema),z.lazy(() => PatentTechnicalAttributesWhereInputSchema).array() ]).optional(),
  MaturityLevel: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  keywords: z.lazy(() => TechnicalKeywordListRelationFilterSchema).optional(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict());

export const PatentTechnicalAttributesOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  MaturityLevel: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PatentTechnicalAttributesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentTechnicalAttributesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentTechnicalAttributesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentTechnicalAttributesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentTechnicalAttributesSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentTechnicalAttributesScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentTechnicalAttributesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentTechnicalAttributesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentTechnicalAttributesScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentTechnicalAttributesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  MaturityLevel: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TechnicalKeywordWhereInputSchema: z.ZodType<Prisma.TechnicalKeywordWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TechnicalKeywordWhereInputSchema),z.lazy(() => TechnicalKeywordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechnicalKeywordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechnicalKeywordWhereInputSchema),z.lazy(() => TechnicalKeywordWhereInputSchema).array() ]).optional(),
  KeywordID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Keyword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patentTechnicalAttributes: z.lazy(() => PatentTechnicalAttributesListRelationFilterSchema).optional()
}).strict();

export const TechnicalKeywordOrderByWithRelationInputSchema: z.ZodType<Prisma.TechnicalKeywordOrderByWithRelationInput> = z.object({
  KeywordID: z.lazy(() => SortOrderSchema).optional(),
  Keyword: z.lazy(() => SortOrderSchema).optional(),
  patentTechnicalAttributes: z.lazy(() => PatentTechnicalAttributesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TechnicalKeywordWhereUniqueInputSchema: z.ZodType<Prisma.TechnicalKeywordWhereUniqueInput> = z.union([
  z.object({
    KeywordID: z.number().int(),
    Keyword: z.string()
  }),
  z.object({
    KeywordID: z.number().int(),
  }),
  z.object({
    Keyword: z.string(),
  }),
])
.and(z.object({
  KeywordID: z.number().int().optional(),
  Keyword: z.string().optional(),
  AND: z.union([ z.lazy(() => TechnicalKeywordWhereInputSchema),z.lazy(() => TechnicalKeywordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechnicalKeywordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechnicalKeywordWhereInputSchema),z.lazy(() => TechnicalKeywordWhereInputSchema).array() ]).optional(),
  patentTechnicalAttributes: z.lazy(() => PatentTechnicalAttributesListRelationFilterSchema).optional()
}).strict());

export const TechnicalKeywordOrderByWithAggregationInputSchema: z.ZodType<Prisma.TechnicalKeywordOrderByWithAggregationInput> = z.object({
  KeywordID: z.lazy(() => SortOrderSchema).optional(),
  Keyword: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TechnicalKeywordCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TechnicalKeywordAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TechnicalKeywordMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TechnicalKeywordMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TechnicalKeywordSumOrderByAggregateInputSchema).optional()
}).strict();

export const TechnicalKeywordScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TechnicalKeywordScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TechnicalKeywordScalarWhereWithAggregatesInputSchema),z.lazy(() => TechnicalKeywordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechnicalKeywordScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechnicalKeywordScalarWhereWithAggregatesInputSchema),z.lazy(() => TechnicalKeywordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  KeywordID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Keyword: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CollegeWhereInputSchema: z.ZodType<Prisma.CollegeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CollegeWhereInputSchema),z.lazy(() => CollegeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CollegeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CollegeWhereInputSchema),z.lazy(() => CollegeWhereInputSchema).array() ]).optional(),
  CollegeID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  departments: z.lazy(() => DepartmentListRelationFilterSchema).optional(),
  patents: z.lazy(() => PatentListRelationFilterSchema).optional()
}).strict();

export const CollegeOrderByWithRelationInputSchema: z.ZodType<Prisma.CollegeOrderByWithRelationInput> = z.object({
  CollegeID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  departments: z.lazy(() => DepartmentOrderByRelationAggregateInputSchema).optional(),
  patents: z.lazy(() => PatentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CollegeWhereUniqueInputSchema: z.ZodType<Prisma.CollegeWhereUniqueInput> = z.union([
  z.object({
    CollegeID: z.number().int(),
    Name: z.string()
  }),
  z.object({
    CollegeID: z.number().int(),
  }),
  z.object({
    Name: z.string(),
  }),
])
.and(z.object({
  CollegeID: z.number().int().optional(),
  Name: z.string().optional(),
  AND: z.union([ z.lazy(() => CollegeWhereInputSchema),z.lazy(() => CollegeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CollegeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CollegeWhereInputSchema),z.lazy(() => CollegeWhereInputSchema).array() ]).optional(),
  Description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  departments: z.lazy(() => DepartmentListRelationFilterSchema).optional(),
  patents: z.lazy(() => PatentListRelationFilterSchema).optional()
}).strict());

export const CollegeOrderByWithAggregationInputSchema: z.ZodType<Prisma.CollegeOrderByWithAggregationInput> = z.object({
  CollegeID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CollegeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CollegeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CollegeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CollegeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CollegeSumOrderByAggregateInputSchema).optional()
}).strict();

export const CollegeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CollegeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CollegeScalarWhereWithAggregatesInputSchema),z.lazy(() => CollegeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CollegeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CollegeScalarWhereWithAggregatesInputSchema),z.lazy(() => CollegeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  CollegeID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  Description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const DepartmentWhereInputSchema: z.ZodType<Prisma.DepartmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DepartmentWhereInputSchema),z.lazy(() => DepartmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentWhereInputSchema),z.lazy(() => DepartmentWhereInputSchema).array() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  CollegeID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  college: z.union([ z.lazy(() => CollegeScalarRelationFilterSchema),z.lazy(() => CollegeWhereInputSchema) ]).optional(),
  inventors: z.lazy(() => InventorListRelationFilterSchema).optional(),
  patents: z.lazy(() => PatentListRelationFilterSchema).optional()
}).strict();

export const DepartmentOrderByWithRelationInputSchema: z.ZodType<Prisma.DepartmentOrderByWithRelationInput> = z.object({
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional(),
  Description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  college: z.lazy(() => CollegeOrderByWithRelationInputSchema).optional(),
  inventors: z.lazy(() => InventorOrderByRelationAggregateInputSchema).optional(),
  patents: z.lazy(() => PatentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const DepartmentWhereUniqueInputSchema: z.ZodType<Prisma.DepartmentWhereUniqueInput> = z.union([
  z.object({
    DepartmentID: z.number().int(),
    Name: z.string()
  }),
  z.object({
    DepartmentID: z.number().int(),
  }),
  z.object({
    Name: z.string(),
  }),
])
.and(z.object({
  DepartmentID: z.number().int().optional(),
  Name: z.string().optional(),
  AND: z.union([ z.lazy(() => DepartmentWhereInputSchema),z.lazy(() => DepartmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentWhereInputSchema),z.lazy(() => DepartmentWhereInputSchema).array() ]).optional(),
  CollegeID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  Description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  college: z.union([ z.lazy(() => CollegeScalarRelationFilterSchema),z.lazy(() => CollegeWhereInputSchema) ]).optional(),
  inventors: z.lazy(() => InventorListRelationFilterSchema).optional(),
  patents: z.lazy(() => PatentListRelationFilterSchema).optional()
}).strict());

export const DepartmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.DepartmentOrderByWithAggregationInput> = z.object({
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional(),
  Description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => DepartmentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DepartmentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DepartmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DepartmentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DepartmentSumOrderByAggregateInputSchema).optional()
}).strict();

export const DepartmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DepartmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema),z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema),z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  CollegeID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CountryWhereInputSchema: z.ZodType<Prisma.CountryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  CountryID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  CountryName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ISOCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  applications: z.lazy(() => PatentApplicationDataListRelationFilterSchema).optional()
}).strict();

export const CountryOrderByWithRelationInputSchema: z.ZodType<Prisma.CountryOrderByWithRelationInput> = z.object({
  CountryID: z.lazy(() => SortOrderSchema).optional(),
  CountryName: z.lazy(() => SortOrderSchema).optional(),
  ISOCode: z.lazy(() => SortOrderSchema).optional(),
  applications: z.lazy(() => PatentApplicationDataOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CountryWhereUniqueInputSchema: z.ZodType<Prisma.CountryWhereUniqueInput> = z.union([
  z.object({
    CountryID: z.number().int(),
    CountryName: z.string(),
    ISOCode: z.string()
  }),
  z.object({
    CountryID: z.number().int(),
    CountryName: z.string(),
  }),
  z.object({
    CountryID: z.number().int(),
    ISOCode: z.string(),
  }),
  z.object({
    CountryID: z.number().int(),
  }),
  z.object({
    CountryName: z.string(),
    ISOCode: z.string(),
  }),
  z.object({
    CountryName: z.string(),
  }),
  z.object({
    ISOCode: z.string(),
  }),
])
.and(z.object({
  CountryID: z.number().int().optional(),
  CountryName: z.string().optional(),
  ISOCode: z.string().optional(),
  AND: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  applications: z.lazy(() => PatentApplicationDataListRelationFilterSchema).optional()
}).strict());

export const CountryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CountryOrderByWithAggregationInput> = z.object({
  CountryID: z.lazy(() => SortOrderSchema).optional(),
  CountryName: z.lazy(() => SortOrderSchema).optional(),
  ISOCode: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CountryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CountryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CountryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CountryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CountrySumOrderByAggregateInputSchema).optional()
}).strict();

export const CountryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CountryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CountryScalarWhereWithAggregatesInputSchema),z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryScalarWhereWithAggregatesInputSchema),z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  CountryID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  CountryName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ISOCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ContactInfoWhereInputSchema: z.ZodType<Prisma.ContactInfoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContactInfoWhereInputSchema),z.lazy(() => ContactInfoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactInfoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactInfoWhereInputSchema),z.lazy(() => ContactInfoWhereInputSchema).array() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  OfficeNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  PhoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Position: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  agencyContact: z.union([ z.lazy(() => AgencyContactPersonNullableScalarRelationFilterSchema),z.lazy(() => AgencyContactPersonWhereInputSchema) ]).optional().nullable(),
  inventor: z.union([ z.lazy(() => InventorNullableScalarRelationFilterSchema),z.lazy(() => InventorWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ContactInfoOrderByWithRelationInputSchema: z.ZodType<Prisma.ContactInfoOrderByWithRelationInput> = z.object({
  ContactInfoID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  OfficeNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PhoneNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Position: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Note: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  agencyContact: z.lazy(() => AgencyContactPersonOrderByWithRelationInputSchema).optional(),
  inventor: z.lazy(() => InventorOrderByWithRelationInputSchema).optional()
}).strict();

export const ContactInfoWhereUniqueInputSchema: z.ZodType<Prisma.ContactInfoWhereUniqueInput> = z.object({
  ContactInfoID: z.number().int()
})
.and(z.object({
  ContactInfoID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ContactInfoWhereInputSchema),z.lazy(() => ContactInfoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactInfoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactInfoWhereInputSchema),z.lazy(() => ContactInfoWhereInputSchema).array() ]).optional(),
  Name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  OfficeNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  PhoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Position: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  agencyContact: z.union([ z.lazy(() => AgencyContactPersonNullableScalarRelationFilterSchema),z.lazy(() => AgencyContactPersonWhereInputSchema) ]).optional().nullable(),
  inventor: z.union([ z.lazy(() => InventorNullableScalarRelationFilterSchema),z.lazy(() => InventorWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ContactInfoOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContactInfoOrderByWithAggregationInput> = z.object({
  ContactInfoID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  OfficeNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PhoneNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Position: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Note: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ContactInfoCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ContactInfoAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ContactInfoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ContactInfoMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ContactInfoSumOrderByAggregateInputSchema).optional()
}).strict();

export const ContactInfoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContactInfoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ContactInfoScalarWhereWithAggregatesInputSchema),z.lazy(() => ContactInfoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactInfoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactInfoScalarWhereWithAggregatesInputSchema),z.lazy(() => ContactInfoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  Email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  OfficeNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  PhoneNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  Position: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  Note: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AgencyCreateInputSchema: z.ZodType<Prisma.AgencyCreateInput> = z.object({
  Name: z.string(),
  contacts: z.lazy(() => AgencyContactPersonCreateNestedManyWithoutAgencyInputSchema).optional(),
  patents: z.lazy(() => AgencyPatentCreateNestedManyWithoutAgencyInputSchema).optional()
}).strict();

export const AgencyUncheckedCreateInputSchema: z.ZodType<Prisma.AgencyUncheckedCreateInput> = z.object({
  AgencyID: z.number().int().optional(),
  Name: z.string(),
  contacts: z.lazy(() => AgencyContactPersonUncheckedCreateNestedManyWithoutAgencyInputSchema).optional(),
  patents: z.lazy(() => AgencyPatentUncheckedCreateNestedManyWithoutAgencyInputSchema).optional()
}).strict();

export const AgencyUpdateInputSchema: z.ZodType<Prisma.AgencyUpdateInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.lazy(() => AgencyContactPersonUpdateManyWithoutAgencyNestedInputSchema).optional(),
  patents: z.lazy(() => AgencyPatentUpdateManyWithoutAgencyNestedInputSchema).optional()
}).strict();

export const AgencyUncheckedUpdateInputSchema: z.ZodType<Prisma.AgencyUncheckedUpdateInput> = z.object({
  AgencyID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.lazy(() => AgencyContactPersonUncheckedUpdateManyWithoutAgencyNestedInputSchema).optional(),
  patents: z.lazy(() => AgencyPatentUncheckedUpdateManyWithoutAgencyNestedInputSchema).optional()
}).strict();

export const AgencyCreateManyInputSchema: z.ZodType<Prisma.AgencyCreateManyInput> = z.object({
  AgencyID: z.number().int().optional(),
  Name: z.string()
}).strict();

export const AgencyUpdateManyMutationInputSchema: z.ZodType<Prisma.AgencyUpdateManyMutationInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AgencyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AgencyUncheckedUpdateManyInput> = z.object({
  AgencyID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AgencyPatentCreateInputSchema: z.ZodType<Prisma.AgencyPatentCreateInput> = z.object({
  FileCode: z.string(),
  Role: z.string(),
  Details: z.string().optional().nullable(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutAgenciesInputSchema),
  agency: z.lazy(() => AgencyCreateNestedOneWithoutPatentsInputSchema)
}).strict();

export const AgencyPatentUncheckedCreateInputSchema: z.ZodType<Prisma.AgencyPatentUncheckedCreateInput> = z.object({
  PatentID: z.number().int(),
  AgencyID: z.number().int(),
  FileCode: z.string(),
  Role: z.string(),
  Details: z.string().optional().nullable()
}).strict();

export const AgencyPatentUpdateInputSchema: z.ZodType<Prisma.AgencyPatentUpdateInput> = z.object({
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Details: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutAgenciesNestedInputSchema).optional(),
  agency: z.lazy(() => AgencyUpdateOneRequiredWithoutPatentsNestedInputSchema).optional()
}).strict();

export const AgencyPatentUncheckedUpdateInputSchema: z.ZodType<Prisma.AgencyPatentUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AgencyID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Details: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgencyPatentCreateManyInputSchema: z.ZodType<Prisma.AgencyPatentCreateManyInput> = z.object({
  PatentID: z.number().int(),
  AgencyID: z.number().int(),
  FileCode: z.string(),
  Role: z.string(),
  Details: z.string().optional().nullable()
}).strict();

export const AgencyPatentUpdateManyMutationInputSchema: z.ZodType<Prisma.AgencyPatentUpdateManyMutationInput> = z.object({
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Details: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgencyPatentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AgencyPatentUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AgencyID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Details: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgencyContactPersonCreateInputSchema: z.ZodType<Prisma.AgencyContactPersonCreateInput> = z.object({
  Position: z.string(),
  agency: z.lazy(() => AgencyCreateNestedOneWithoutContactsInputSchema),
  contactInfo: z.lazy(() => ContactInfoCreateNestedOneWithoutAgencyContactInputSchema).optional()
}).strict();

export const AgencyContactPersonUncheckedCreateInputSchema: z.ZodType<Prisma.AgencyContactPersonUncheckedCreateInput> = z.object({
  ContactPersonID: z.number().int().optional(),
  AgencyID: z.number().int(),
  Position: z.string(),
  ContactInfoID: z.number().int().optional().nullable()
}).strict();

export const AgencyContactPersonUpdateInputSchema: z.ZodType<Prisma.AgencyContactPersonUpdateInput> = z.object({
  Position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agency: z.lazy(() => AgencyUpdateOneRequiredWithoutContactsNestedInputSchema).optional(),
  contactInfo: z.lazy(() => ContactInfoUpdateOneWithoutAgencyContactNestedInputSchema).optional()
}).strict();

export const AgencyContactPersonUncheckedUpdateInputSchema: z.ZodType<Prisma.AgencyContactPersonUncheckedUpdateInput> = z.object({
  ContactPersonID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AgencyID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgencyContactPersonCreateManyInputSchema: z.ZodType<Prisma.AgencyContactPersonCreateManyInput> = z.object({
  ContactPersonID: z.number().int().optional(),
  AgencyID: z.number().int(),
  Position: z.string(),
  ContactInfoID: z.number().int().optional().nullable()
}).strict();

export const AgencyContactPersonUpdateManyMutationInputSchema: z.ZodType<Prisma.AgencyContactPersonUpdateManyMutationInput> = z.object({
  Position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AgencyContactPersonUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AgencyContactPersonUncheckedUpdateManyInput> = z.object({
  ContactPersonID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AgencyID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FundingPlanCreateInputSchema: z.ZodType<Prisma.FundingPlanCreateInput> = z.object({
  PlanType: z.number().int(),
  fundings: z.lazy(() => PatentFundingCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const FundingPlanUncheckedCreateInputSchema: z.ZodType<Prisma.FundingPlanUncheckedCreateInput> = z.object({
  PlanID: z.number().int().optional(),
  PlanType: z.number().int(),
  fundings: z.lazy(() => PatentFundingUncheckedCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const FundingPlanUpdateInputSchema: z.ZodType<Prisma.FundingPlanUpdateInput> = z.object({
  PlanType: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundings: z.lazy(() => PatentFundingUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const FundingPlanUncheckedUpdateInputSchema: z.ZodType<Prisma.FundingPlanUncheckedUpdateInput> = z.object({
  PlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PlanType: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundings: z.lazy(() => PatentFundingUncheckedUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const FundingPlanCreateManyInputSchema: z.ZodType<Prisma.FundingPlanCreateManyInput> = z.object({
  PlanID: z.number().int().optional(),
  PlanType: z.number().int()
}).strict();

export const FundingPlanUpdateManyMutationInputSchema: z.ZodType<Prisma.FundingPlanUpdateManyMutationInput> = z.object({
  PlanType: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingPlanUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FundingPlanUncheckedUpdateManyInput> = z.object({
  PlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PlanType: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentFundingCreateInputSchema: z.ZodType<Prisma.PatentFundingCreateInput> = z.object({
  FundingAgency: z.string(),
  ProjectNumber: z.string(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutFundingInputSchema),
  plan: z.lazy(() => FundingPlanCreateNestedOneWithoutFundingsInputSchema)
}).strict();

export const PatentFundingUncheckedCreateInputSchema: z.ZodType<Prisma.PatentFundingUncheckedCreateInput> = z.object({
  FundingID: z.number().int().optional(),
  PatentID: z.number().int(),
  FundingAgency: z.string(),
  ProjectNumber: z.string(),
  PlanID: z.number().int()
}).strict();

export const PatentFundingUpdateInputSchema: z.ZodType<Prisma.PatentFundingUpdateInput> = z.object({
  FundingAgency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutFundingNestedInputSchema).optional(),
  plan: z.lazy(() => FundingPlanUpdateOneRequiredWithoutFundingsNestedInputSchema).optional()
}).strict();

export const PatentFundingUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateInput> = z.object({
  FundingID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FundingAgency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentFundingCreateManyInputSchema: z.ZodType<Prisma.PatentFundingCreateManyInput> = z.object({
  FundingID: z.number().int().optional(),
  PatentID: z.number().int(),
  FundingAgency: z.string(),
  ProjectNumber: z.string(),
  PlanID: z.number().int()
}).strict();

export const PatentFundingUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentFundingUpdateManyMutationInput> = z.object({
  FundingAgency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentFundingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateManyInput> = z.object({
  FundingID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FundingAgency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InventorCreateInputSchema: z.ZodType<Prisma.InventorCreateInput> = z.object({
  Name: z.string(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutInventorsInputSchema),
  contactInfo: z.lazy(() => ContactInfoCreateNestedOneWithoutInventorInputSchema).optional(),
  patents: z.lazy(() => PatentInventorCreateNestedManyWithoutInventorInputSchema).optional()
}).strict();

export const InventorUncheckedCreateInputSchema: z.ZodType<Prisma.InventorUncheckedCreateInput> = z.object({
  InventorID: z.number().int().optional(),
  Name: z.string(),
  DepartmentID: z.number().int(),
  ContactInfoID: z.number().int().optional().nullable(),
  patents: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutInventorInputSchema).optional()
}).strict();

export const InventorUpdateInputSchema: z.ZodType<Prisma.InventorUpdateInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutInventorsNestedInputSchema).optional(),
  contactInfo: z.lazy(() => ContactInfoUpdateOneWithoutInventorNestedInputSchema).optional(),
  patents: z.lazy(() => PatentInventorUpdateManyWithoutInventorNestedInputSchema).optional()
}).strict();

export const InventorUncheckedUpdateInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patents: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutInventorNestedInputSchema).optional()
}).strict();

export const InventorCreateManyInputSchema: z.ZodType<Prisma.InventorCreateManyInput> = z.object({
  InventorID: z.number().int().optional(),
  Name: z.string(),
  DepartmentID: z.number().int(),
  ContactInfoID: z.number().int().optional().nullable()
}).strict();

export const InventorUpdateManyMutationInputSchema: z.ZodType<Prisma.InventorUpdateManyMutationInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InventorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateManyInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentInventorCreateInputSchema: z.ZodType<Prisma.PatentInventorCreateInput> = z.object({
  Main: z.boolean(),
  Contribution: z.number().optional().nullable(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutInventorsInputSchema),
  inventor: z.lazy(() => InventorCreateNestedOneWithoutPatentsInputSchema)
}).strict();

export const PatentInventorUncheckedCreateInputSchema: z.ZodType<Prisma.PatentInventorUncheckedCreateInput> = z.object({
  PatentID: z.number().int(),
  InventorID: z.number().int(),
  Main: z.boolean(),
  Contribution: z.number().optional().nullable()
}).strict();

export const PatentInventorUpdateInputSchema: z.ZodType<Prisma.PatentInventorUpdateInput> = z.object({
  Main: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Contribution: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutInventorsNestedInputSchema).optional(),
  inventor: z.lazy(() => InventorUpdateOneRequiredWithoutPatentsNestedInputSchema).optional()
}).strict();

export const PatentInventorUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentInventorUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Main: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Contribution: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentInventorCreateManyInputSchema: z.ZodType<Prisma.PatentInventorCreateManyInput> = z.object({
  PatentID: z.number().int(),
  InventorID: z.number().int(),
  Main: z.boolean(),
  Contribution: z.number().optional().nullable()
}).strict();

export const PatentInventorUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentInventorUpdateManyMutationInput> = z.object({
  Main: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Contribution: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentInventorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentInventorUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Main: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Contribution: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentCreateInputSchema: z.ZodType<Prisma.PatentCreateInput> = z.object({
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  agencies: z.lazy(() => AgencyPatentCreateNestedManyWithoutPatentInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  college: z.lazy(() => CollegeCreateNestedOneWithoutPatentsInputSchema),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateInputSchema: z.ZodType<Prisma.PatentUncheckedCreateInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  DepartmentID: z.number().int(),
  CollegeID: z.number().int(),
  agencies: z.lazy(() => AgencyPatentUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentUpdateInputSchema: z.ZodType<Prisma.PatentUpdateInput> = z.object({
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUpdateManyWithoutPatentNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  college: z.lazy(() => CollegeUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentCreateManyInputSchema: z.ZodType<Prisma.PatentCreateManyInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  DepartmentID: z.number().int(),
  CollegeID: z.number().int()
}).strict();

export const PatentUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentUpdateManyMutationInput> = z.object({
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentStatusCreateInputSchema: z.ZodType<Prisma.PatentStatusCreateInput> = z.object({
  ExpiryDate: z.coerce.date().optional().nullable(),
  Status: z.string(),
  TechnicalCommitteeReviewDate: z.coerce.date().optional().nullable(),
  MaintenanceYear: z.number().int().optional().nullable(),
  MaintenanceStartDate: z.coerce.date().optional().nullable(),
  MaintenanceEndDate: z.coerce.date().optional().nullable(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutStatusInputSchema).optional()
}).strict();

export const PatentStatusUncheckedCreateInputSchema: z.ZodType<Prisma.PatentStatusUncheckedCreateInput> = z.object({
  PatentID: z.number().int().optional(),
  ExpiryDate: z.coerce.date().optional().nullable(),
  Status: z.string(),
  TechnicalCommitteeReviewDate: z.coerce.date().optional().nullable(),
  MaintenanceYear: z.number().int().optional().nullable(),
  MaintenanceStartDate: z.coerce.date().optional().nullable(),
  MaintenanceEndDate: z.coerce.date().optional().nullable()
}).strict();

export const PatentStatusUpdateInputSchema: z.ZodType<Prisma.PatentStatusUpdateInput> = z.object({
  ExpiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TechnicalCommitteeReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceEndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutStatusNestedInputSchema).optional()
}).strict();

export const PatentStatusUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentStatusUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ExpiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TechnicalCommitteeReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceEndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentStatusCreateManyInputSchema: z.ZodType<Prisma.PatentStatusCreateManyInput> = z.object({
  PatentID: z.number().int().optional(),
  ExpiryDate: z.coerce.date().optional().nullable(),
  Status: z.string(),
  TechnicalCommitteeReviewDate: z.coerce.date().optional().nullable(),
  MaintenanceYear: z.number().int().optional().nullable(),
  MaintenanceStartDate: z.coerce.date().optional().nullable(),
  MaintenanceEndDate: z.coerce.date().optional().nullable()
}).strict();

export const PatentStatusUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentStatusUpdateManyMutationInput> = z.object({
  ExpiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TechnicalCommitteeReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceEndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentStatusUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentStatusUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ExpiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TechnicalCommitteeReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceEndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentApplicationDataCreateInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateInput> = z.object({
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  PatentNumber: z.string().optional().nullable(),
  ApplicationNumber: z.string().optional().nullable(),
  FilingDate: z.coerce.date().optional().nullable(),
  PublicationDate: z.coerce.date().optional().nullable(),
  country: z.lazy(() => CountryCreateNestedOneWithoutApplicationsInputSchema).optional(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutApplicationInputSchema).optional()
}).strict();

export const PatentApplicationDataUncheckedCreateInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedCreateInput> = z.object({
  PatentID: z.number().int().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  PatentNumber: z.string().optional().nullable(),
  ApplicationNumber: z.string().optional().nullable(),
  FilingDate: z.coerce.date().optional().nullable(),
  PublicationDate: z.coerce.date().optional().nullable()
}).strict();

export const PatentApplicationDataUpdateInputSchema: z.ZodType<Prisma.PatentApplicationDataUpdateInput> = z.object({
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.lazy(() => CountryUpdateOneWithoutApplicationsNestedInputSchema).optional(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutApplicationNestedInputSchema).optional()
}).strict();

export const PatentApplicationDataUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentApplicationDataCreateManyInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateManyInput> = z.object({
  PatentID: z.number().int().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  PatentNumber: z.string().optional().nullable(),
  ApplicationNumber: z.string().optional().nullable(),
  FilingDate: z.coerce.date().optional().nullable(),
  PublicationDate: z.coerce.date().optional().nullable()
}).strict();

export const PatentApplicationDataUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentApplicationDataUpdateManyMutationInput> = z.object({
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentApplicationDataUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentTechnicalAttributesCreateInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesCreateInput> = z.object({
  MaturityLevel: z.string().optional().nullable(),
  keywords: z.lazy(() => TechnicalKeywordCreateNestedManyWithoutPatentTechnicalAttributesInputSchema).optional(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutTechnicalInputSchema)
}).strict();

export const PatentTechnicalAttributesUncheckedCreateInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUncheckedCreateInput> = z.object({
  PatentID: z.number().int(),
  MaturityLevel: z.string().optional().nullable(),
  keywords: z.lazy(() => TechnicalKeywordUncheckedCreateNestedManyWithoutPatentTechnicalAttributesInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesUpdateInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpdateInput> = z.object({
  MaturityLevel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  keywords: z.lazy(() => TechnicalKeywordUpdateManyWithoutPatentTechnicalAttributesNestedInputSchema).optional(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutTechnicalNestedInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  MaturityLevel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  keywords: z.lazy(() => TechnicalKeywordUncheckedUpdateManyWithoutPatentTechnicalAttributesNestedInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesCreateManyInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesCreateManyInput> = z.object({
  PatentID: z.number().int(),
  MaturityLevel: z.string().optional().nullable()
}).strict();

export const PatentTechnicalAttributesUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpdateManyMutationInput> = z.object({
  MaturityLevel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentTechnicalAttributesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  MaturityLevel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TechnicalKeywordCreateInputSchema: z.ZodType<Prisma.TechnicalKeywordCreateInput> = z.object({
  Keyword: z.string(),
  patentTechnicalAttributes: z.lazy(() => PatentTechnicalAttributesCreateNestedManyWithoutKeywordsInputSchema).optional()
}).strict();

export const TechnicalKeywordUncheckedCreateInputSchema: z.ZodType<Prisma.TechnicalKeywordUncheckedCreateInput> = z.object({
  KeywordID: z.number().int().optional(),
  Keyword: z.string(),
  patentTechnicalAttributes: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedManyWithoutKeywordsInputSchema).optional()
}).strict();

export const TechnicalKeywordUpdateInputSchema: z.ZodType<Prisma.TechnicalKeywordUpdateInput> = z.object({
  Keyword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patentTechnicalAttributes: z.lazy(() => PatentTechnicalAttributesUpdateManyWithoutKeywordsNestedInputSchema).optional()
}).strict();

export const TechnicalKeywordUncheckedUpdateInputSchema: z.ZodType<Prisma.TechnicalKeywordUncheckedUpdateInput> = z.object({
  KeywordID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Keyword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patentTechnicalAttributes: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateManyWithoutKeywordsNestedInputSchema).optional()
}).strict();

export const TechnicalKeywordCreateManyInputSchema: z.ZodType<Prisma.TechnicalKeywordCreateManyInput> = z.object({
  KeywordID: z.number().int().optional(),
  Keyword: z.string()
}).strict();

export const TechnicalKeywordUpdateManyMutationInputSchema: z.ZodType<Prisma.TechnicalKeywordUpdateManyMutationInput> = z.object({
  Keyword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TechnicalKeywordUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TechnicalKeywordUncheckedUpdateManyInput> = z.object({
  KeywordID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Keyword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CollegeCreateInputSchema: z.ZodType<Prisma.CollegeCreateInput> = z.object({
  Name: z.string(),
  Description: z.string().optional().nullable(),
  departments: z.lazy(() => DepartmentCreateNestedManyWithoutCollegeInputSchema).optional(),
  patents: z.lazy(() => PatentCreateNestedManyWithoutCollegeInputSchema).optional()
}).strict();

export const CollegeUncheckedCreateInputSchema: z.ZodType<Prisma.CollegeUncheckedCreateInput> = z.object({
  CollegeID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable(),
  departments: z.lazy(() => DepartmentUncheckedCreateNestedManyWithoutCollegeInputSchema).optional(),
  patents: z.lazy(() => PatentUncheckedCreateNestedManyWithoutCollegeInputSchema).optional()
}).strict();

export const CollegeUpdateInputSchema: z.ZodType<Prisma.CollegeUpdateInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departments: z.lazy(() => DepartmentUpdateManyWithoutCollegeNestedInputSchema).optional(),
  patents: z.lazy(() => PatentUpdateManyWithoutCollegeNestedInputSchema).optional()
}).strict();

export const CollegeUncheckedUpdateInputSchema: z.ZodType<Prisma.CollegeUncheckedUpdateInput> = z.object({
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departments: z.lazy(() => DepartmentUncheckedUpdateManyWithoutCollegeNestedInputSchema).optional(),
  patents: z.lazy(() => PatentUncheckedUpdateManyWithoutCollegeNestedInputSchema).optional()
}).strict();

export const CollegeCreateManyInputSchema: z.ZodType<Prisma.CollegeCreateManyInput> = z.object({
  CollegeID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable()
}).strict();

export const CollegeUpdateManyMutationInputSchema: z.ZodType<Prisma.CollegeUpdateManyMutationInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CollegeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CollegeUncheckedUpdateManyInput> = z.object({
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DepartmentCreateInputSchema: z.ZodType<Prisma.DepartmentCreateInput> = z.object({
  Name: z.string(),
  Description: z.string().optional().nullable(),
  college: z.lazy(() => CollegeCreateNestedOneWithoutDepartmentsInputSchema),
  inventors: z.lazy(() => InventorCreateNestedManyWithoutDepartmentInputSchema).optional(),
  patents: z.lazy(() => PatentCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentUncheckedCreateInputSchema: z.ZodType<Prisma.DepartmentUncheckedCreateInput> = z.object({
  DepartmentID: z.number().int().optional(),
  Name: z.string(),
  CollegeID: z.number().int(),
  Description: z.string().optional().nullable(),
  inventors: z.lazy(() => InventorUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional(),
  patents: z.lazy(() => PatentUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentUpdateInputSchema: z.ZodType<Prisma.DepartmentUpdateInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  college: z.lazy(() => CollegeUpdateOneRequiredWithoutDepartmentsNestedInputSchema).optional(),
  inventors: z.lazy(() => InventorUpdateManyWithoutDepartmentNestedInputSchema).optional(),
  patents: z.lazy(() => PatentUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentUncheckedUpdateInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateInput> = z.object({
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventors: z.lazy(() => InventorUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional(),
  patents: z.lazy(() => PatentUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentCreateManyInputSchema: z.ZodType<Prisma.DepartmentCreateManyInput> = z.object({
  DepartmentID: z.number().int().optional(),
  Name: z.string(),
  CollegeID: z.number().int(),
  Description: z.string().optional().nullable()
}).strict();

export const DepartmentUpdateManyMutationInputSchema: z.ZodType<Prisma.DepartmentUpdateManyMutationInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DepartmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateManyInput> = z.object({
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CountryCreateInputSchema: z.ZodType<Prisma.CountryCreateInput> = z.object({
  CountryName: z.string(),
  ISOCode: z.string(),
  applications: z.lazy(() => PatentApplicationDataCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateInputSchema: z.ZodType<Prisma.CountryUncheckedCreateInput> = z.object({
  CountryID: z.number().int().optional(),
  CountryName: z.string(),
  ISOCode: z.string(),
  applications: z.lazy(() => PatentApplicationDataUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUpdateInputSchema: z.ZodType<Prisma.CountryUpdateInput> = z.object({
  CountryName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ISOCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applications: z.lazy(() => PatentApplicationDataUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateInput> = z.object({
  CountryID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CountryName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ISOCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applications: z.lazy(() => PatentApplicationDataUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryCreateManyInputSchema: z.ZodType<Prisma.CountryCreateManyInput> = z.object({
  CountryID: z.number().int().optional(),
  CountryName: z.string(),
  ISOCode: z.string()
}).strict();

export const CountryUpdateManyMutationInputSchema: z.ZodType<Prisma.CountryUpdateManyMutationInput> = z.object({
  CountryName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ISOCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CountryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyInput> = z.object({
  CountryID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CountryName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ISOCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactInfoCreateInputSchema: z.ZodType<Prisma.ContactInfoCreateInput> = z.object({
  Name: z.string().optional().nullable(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Position: z.string().optional().nullable(),
  Note: z.string().optional().nullable(),
  agencyContact: z.lazy(() => AgencyContactPersonCreateNestedOneWithoutContactInfoInputSchema).optional(),
  inventor: z.lazy(() => InventorCreateNestedOneWithoutContactInfoInputSchema).optional()
}).strict();

export const ContactInfoUncheckedCreateInputSchema: z.ZodType<Prisma.ContactInfoUncheckedCreateInput> = z.object({
  ContactInfoID: z.number().int().optional(),
  Name: z.string().optional().nullable(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Position: z.string().optional().nullable(),
  Note: z.string().optional().nullable(),
  agencyContact: z.lazy(() => AgencyContactPersonUncheckedCreateNestedOneWithoutContactInfoInputSchema).optional(),
  inventor: z.lazy(() => InventorUncheckedCreateNestedOneWithoutContactInfoInputSchema).optional()
}).strict();

export const ContactInfoUpdateInputSchema: z.ZodType<Prisma.ContactInfoUpdateInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  agencyContact: z.lazy(() => AgencyContactPersonUpdateOneWithoutContactInfoNestedInputSchema).optional(),
  inventor: z.lazy(() => InventorUpdateOneWithoutContactInfoNestedInputSchema).optional()
}).strict();

export const ContactInfoUncheckedUpdateInputSchema: z.ZodType<Prisma.ContactInfoUncheckedUpdateInput> = z.object({
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  agencyContact: z.lazy(() => AgencyContactPersonUncheckedUpdateOneWithoutContactInfoNestedInputSchema).optional(),
  inventor: z.lazy(() => InventorUncheckedUpdateOneWithoutContactInfoNestedInputSchema).optional()
}).strict();

export const ContactInfoCreateManyInputSchema: z.ZodType<Prisma.ContactInfoCreateManyInput> = z.object({
  ContactInfoID: z.number().int().optional(),
  Name: z.string().optional().nullable(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Position: z.string().optional().nullable(),
  Note: z.string().optional().nullable()
}).strict();

export const ContactInfoUpdateManyMutationInputSchema: z.ZodType<Prisma.ContactInfoUpdateManyMutationInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ContactInfoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContactInfoUncheckedUpdateManyInput> = z.object({
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const AgencyContactPersonListRelationFilterSchema: z.ZodType<Prisma.AgencyContactPersonListRelationFilter> = z.object({
  every: z.lazy(() => AgencyContactPersonWhereInputSchema).optional(),
  some: z.lazy(() => AgencyContactPersonWhereInputSchema).optional(),
  none: z.lazy(() => AgencyContactPersonWhereInputSchema).optional()
}).strict();

export const AgencyPatentListRelationFilterSchema: z.ZodType<Prisma.AgencyPatentListRelationFilter> = z.object({
  every: z.lazy(() => AgencyPatentWhereInputSchema).optional(),
  some: z.lazy(() => AgencyPatentWhereInputSchema).optional(),
  none: z.lazy(() => AgencyPatentWhereInputSchema).optional()
}).strict();

export const AgencyContactPersonOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AgencyContactPersonOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyPatentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AgencyPatentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyCountOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyCountOrderByAggregateInput> = z.object({
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyAvgOrderByAggregateInput> = z.object({
  AgencyID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyMaxOrderByAggregateInput> = z.object({
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyMinOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyMinOrderByAggregateInput> = z.object({
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencySumOrderByAggregateInputSchema: z.ZodType<Prisma.AgencySumOrderByAggregateInput> = z.object({
  AgencyID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PatentScalarRelationFilterSchema: z.ZodType<Prisma.PatentScalarRelationFilter> = z.object({
  is: z.lazy(() => PatentWhereInputSchema).optional(),
  isNot: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const AgencyScalarRelationFilterSchema: z.ZodType<Prisma.AgencyScalarRelationFilter> = z.object({
  is: z.lazy(() => AgencyWhereInputSchema).optional(),
  isNot: z.lazy(() => AgencyWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AgencyPatentPatentIDAgencyIDCompoundUniqueInputSchema: z.ZodType<Prisma.AgencyPatentPatentIDAgencyIDCompoundUniqueInput> = z.object({
  PatentID: z.number(),
  AgencyID: z.number()
}).strict();

export const AgencyPatentCountOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyPatentCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  FileCode: z.lazy(() => SortOrderSchema).optional(),
  Role: z.lazy(() => SortOrderSchema).optional(),
  Details: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyPatentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyPatentAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyPatentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyPatentMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  FileCode: z.lazy(() => SortOrderSchema).optional(),
  Role: z.lazy(() => SortOrderSchema).optional(),
  Details: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyPatentMinOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyPatentMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  FileCode: z.lazy(() => SortOrderSchema).optional(),
  Role: z.lazy(() => SortOrderSchema).optional(),
  Details: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyPatentSumOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyPatentSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ContactInfoNullableScalarRelationFilterSchema: z.ZodType<Prisma.ContactInfoNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ContactInfoWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ContactInfoWhereInputSchema).optional().nullable()
}).strict();

export const AgencyContactPersonCountOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyContactPersonCountOrderByAggregateInput> = z.object({
  ContactPersonID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  Position: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyContactPersonAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyContactPersonAvgOrderByAggregateInput> = z.object({
  ContactPersonID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyContactPersonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyContactPersonMaxOrderByAggregateInput> = z.object({
  ContactPersonID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  Position: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyContactPersonMinOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyContactPersonMinOrderByAggregateInput> = z.object({
  ContactPersonID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  Position: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyContactPersonSumOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyContactPersonSumOrderByAggregateInput> = z.object({
  ContactPersonID: z.lazy(() => SortOrderSchema).optional(),
  AgencyID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const PatentFundingListRelationFilterSchema: z.ZodType<Prisma.PatentFundingListRelationFilter> = z.object({
  every: z.lazy(() => PatentFundingWhereInputSchema).optional(),
  some: z.lazy(() => PatentFundingWhereInputSchema).optional(),
  none: z.lazy(() => PatentFundingWhereInputSchema).optional()
}).strict();

export const PatentFundingOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatentFundingOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingPlanCountOrderByAggregateInputSchema: z.ZodType<Prisma.FundingPlanCountOrderByAggregateInput> = z.object({
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  PlanType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingPlanAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FundingPlanAvgOrderByAggregateInput> = z.object({
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  PlanType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingPlanMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FundingPlanMaxOrderByAggregateInput> = z.object({
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  PlanType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingPlanMinOrderByAggregateInputSchema: z.ZodType<Prisma.FundingPlanMinOrderByAggregateInput> = z.object({
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  PlanType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingPlanSumOrderByAggregateInputSchema: z.ZodType<Prisma.FundingPlanSumOrderByAggregateInput> = z.object({
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  PlanType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingPlanScalarRelationFilterSchema: z.ZodType<Prisma.FundingPlanScalarRelationFilter> = z.object({
  is: z.lazy(() => FundingPlanWhereInputSchema).optional(),
  isNot: z.lazy(() => FundingPlanWhereInputSchema).optional()
}).strict();

export const PatentFundingCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingCountOrderByAggregateInput> = z.object({
  FundingID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  FundingAgency: z.lazy(() => SortOrderSchema).optional(),
  ProjectNumber: z.lazy(() => SortOrderSchema).optional(),
  PlanID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentFundingAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingAvgOrderByAggregateInput> = z.object({
  FundingID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  PlanID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentFundingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingMaxOrderByAggregateInput> = z.object({
  FundingID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  FundingAgency: z.lazy(() => SortOrderSchema).optional(),
  ProjectNumber: z.lazy(() => SortOrderSchema).optional(),
  PlanID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentFundingMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingMinOrderByAggregateInput> = z.object({
  FundingID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  FundingAgency: z.lazy(() => SortOrderSchema).optional(),
  ProjectNumber: z.lazy(() => SortOrderSchema).optional(),
  PlanID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentFundingSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingSumOrderByAggregateInput> = z.object({
  FundingID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  PlanID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentScalarRelationFilterSchema: z.ZodType<Prisma.DepartmentScalarRelationFilter> = z.object({
  is: z.lazy(() => DepartmentWhereInputSchema).optional(),
  isNot: z.lazy(() => DepartmentWhereInputSchema).optional()
}).strict();

export const PatentInventorListRelationFilterSchema: z.ZodType<Prisma.PatentInventorListRelationFilter> = z.object({
  every: z.lazy(() => PatentInventorWhereInputSchema).optional(),
  some: z.lazy(() => PatentInventorWhereInputSchema).optional(),
  none: z.lazy(() => PatentInventorWhereInputSchema).optional()
}).strict();

export const PatentInventorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatentInventorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventorCountOrderByAggregateInputSchema: z.ZodType<Prisma.InventorCountOrderByAggregateInput> = z.object({
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.InventorAvgOrderByAggregateInput> = z.object({
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InventorMaxOrderByAggregateInput> = z.object({
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventorMinOrderByAggregateInputSchema: z.ZodType<Prisma.InventorMinOrderByAggregateInput> = z.object({
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventorSumOrderByAggregateInputSchema: z.ZodType<Prisma.InventorSumOrderByAggregateInput> = z.object({
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const InventorScalarRelationFilterSchema: z.ZodType<Prisma.InventorScalarRelationFilter> = z.object({
  is: z.lazy(() => InventorWhereInputSchema).optional(),
  isNot: z.lazy(() => InventorWhereInputSchema).optional()
}).strict();

export const PatentInventorPatentIDInventorIDCompoundUniqueInputSchema: z.ZodType<Prisma.PatentInventorPatentIDInventorIDCompoundUniqueInput> = z.object({
  PatentID: z.number(),
  InventorID: z.number()
}).strict();

export const PatentInventorCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInventorCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  Main: z.lazy(() => SortOrderSchema).optional(),
  Contribution: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentInventorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInventorAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  Contribution: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentInventorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInventorMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  Main: z.lazy(() => SortOrderSchema).optional(),
  Contribution: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentInventorMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInventorMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  Main: z.lazy(() => SortOrderSchema).optional(),
  Contribution: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentInventorSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInventorSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  Contribution: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const CollegeScalarRelationFilterSchema: z.ZodType<Prisma.CollegeScalarRelationFilter> = z.object({
  is: z.lazy(() => CollegeWhereInputSchema).optional(),
  isNot: z.lazy(() => CollegeWhereInputSchema).optional()
}).strict();

export const PatentApplicationDataNullableScalarRelationFilterSchema: z.ZodType<Prisma.PatentApplicationDataNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PatentApplicationDataWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PatentApplicationDataWhereInputSchema).optional().nullable()
}).strict();

export const PatentStatusNullableScalarRelationFilterSchema: z.ZodType<Prisma.PatentStatusNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PatentStatusWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PatentStatusWhereInputSchema).optional().nullable()
}).strict();

export const PatentTechnicalAttributesNullableScalarRelationFilterSchema: z.ZodType<Prisma.PatentTechnicalAttributesNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PatentTechnicalAttributesWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PatentTechnicalAttributesWhereInputSchema).optional().nullable()
}).strict();

export const PatentCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Year: z.lazy(() => SortOrderSchema).optional(),
  InternalID: z.lazy(() => SortOrderSchema).optional(),
  DraftTitle: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  TitleEnglish: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Year: z.lazy(() => SortOrderSchema).optional(),
  InternalID: z.lazy(() => SortOrderSchema).optional(),
  DraftTitle: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  TitleEnglish: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Year: z.lazy(() => SortOrderSchema).optional(),
  InternalID: z.lazy(() => SortOrderSchema).optional(),
  DraftTitle: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  TitleEnglish: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PatentStatusCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentStatusCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  ExpiryDate: z.lazy(() => SortOrderSchema).optional(),
  Status: z.lazy(() => SortOrderSchema).optional(),
  TechnicalCommitteeReviewDate: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceYear: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceStartDate: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceEndDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentStatusAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentStatusAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceYear: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentStatusMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentStatusMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  ExpiryDate: z.lazy(() => SortOrderSchema).optional(),
  Status: z.lazy(() => SortOrderSchema).optional(),
  TechnicalCommitteeReviewDate: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceYear: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceStartDate: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceEndDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentStatusMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentStatusMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  ExpiryDate: z.lazy(() => SortOrderSchema).optional(),
  Status: z.lazy(() => SortOrderSchema).optional(),
  TechnicalCommitteeReviewDate: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceYear: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceStartDate: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceEndDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentStatusSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentStatusSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceYear: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const EnumEnumPatentTypeNullableFilterSchema: z.ZodType<Prisma.EnumEnumPatentTypeNullableFilter> = z.object({
  equals: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  in: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NestedEnumEnumPatentTypeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const CountryNullableScalarRelationFilterSchema: z.ZodType<Prisma.CountryNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => CountryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CountryWhereInputSchema).optional().nullable()
}).strict();

export const PatentApplicationDataCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentApplicationDataCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.lazy(() => SortOrderSchema).optional(),
  PatentType: z.lazy(() => SortOrderSchema).optional(),
  PatentNumber: z.lazy(() => SortOrderSchema).optional(),
  ApplicationNumber: z.lazy(() => SortOrderSchema).optional(),
  FilingDate: z.lazy(() => SortOrderSchema).optional(),
  PublicationDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentApplicationDataAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentApplicationDataAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentApplicationDataMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentApplicationDataMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.lazy(() => SortOrderSchema).optional(),
  PatentType: z.lazy(() => SortOrderSchema).optional(),
  PatentNumber: z.lazy(() => SortOrderSchema).optional(),
  ApplicationNumber: z.lazy(() => SortOrderSchema).optional(),
  FilingDate: z.lazy(() => SortOrderSchema).optional(),
  PublicationDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentApplicationDataMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentApplicationDataMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.lazy(() => SortOrderSchema).optional(),
  PatentType: z.lazy(() => SortOrderSchema).optional(),
  PatentNumber: z.lazy(() => SortOrderSchema).optional(),
  ApplicationNumber: z.lazy(() => SortOrderSchema).optional(),
  FilingDate: z.lazy(() => SortOrderSchema).optional(),
  PublicationDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentApplicationDataSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentApplicationDataSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumEnumPatentTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEnumPatentTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  in: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NestedEnumEnumPatentTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEnumPatentTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEnumPatentTypeNullableFilterSchema).optional()
}).strict();

export const TechnicalKeywordListRelationFilterSchema: z.ZodType<Prisma.TechnicalKeywordListRelationFilter> = z.object({
  every: z.lazy(() => TechnicalKeywordWhereInputSchema).optional(),
  some: z.lazy(() => TechnicalKeywordWhereInputSchema).optional(),
  none: z.lazy(() => TechnicalKeywordWhereInputSchema).optional()
}).strict();

export const TechnicalKeywordOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TechnicalKeywordOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentTechnicalAttributesCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  MaturityLevel: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentTechnicalAttributesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentTechnicalAttributesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  MaturityLevel: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentTechnicalAttributesMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  MaturityLevel: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentTechnicalAttributesSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentTechnicalAttributesListRelationFilterSchema: z.ZodType<Prisma.PatentTechnicalAttributesListRelationFilter> = z.object({
  every: z.lazy(() => PatentTechnicalAttributesWhereInputSchema).optional(),
  some: z.lazy(() => PatentTechnicalAttributesWhereInputSchema).optional(),
  none: z.lazy(() => PatentTechnicalAttributesWhereInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechnicalKeywordCountOrderByAggregateInputSchema: z.ZodType<Prisma.TechnicalKeywordCountOrderByAggregateInput> = z.object({
  KeywordID: z.lazy(() => SortOrderSchema).optional(),
  Keyword: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechnicalKeywordAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TechnicalKeywordAvgOrderByAggregateInput> = z.object({
  KeywordID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechnicalKeywordMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TechnicalKeywordMaxOrderByAggregateInput> = z.object({
  KeywordID: z.lazy(() => SortOrderSchema).optional(),
  Keyword: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechnicalKeywordMinOrderByAggregateInputSchema: z.ZodType<Prisma.TechnicalKeywordMinOrderByAggregateInput> = z.object({
  KeywordID: z.lazy(() => SortOrderSchema).optional(),
  Keyword: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechnicalKeywordSumOrderByAggregateInputSchema: z.ZodType<Prisma.TechnicalKeywordSumOrderByAggregateInput> = z.object({
  KeywordID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentListRelationFilterSchema: z.ZodType<Prisma.DepartmentListRelationFilter> = z.object({
  every: z.lazy(() => DepartmentWhereInputSchema).optional(),
  some: z.lazy(() => DepartmentWhereInputSchema).optional(),
  none: z.lazy(() => DepartmentWhereInputSchema).optional()
}).strict();

export const PatentListRelationFilterSchema: z.ZodType<Prisma.PatentListRelationFilter> = z.object({
  every: z.lazy(() => PatentWhereInputSchema).optional(),
  some: z.lazy(() => PatentWhereInputSchema).optional(),
  none: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const DepartmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DepartmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CollegeCountOrderByAggregateInputSchema: z.ZodType<Prisma.CollegeCountOrderByAggregateInput> = z.object({
  CollegeID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CollegeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CollegeAvgOrderByAggregateInput> = z.object({
  CollegeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CollegeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CollegeMaxOrderByAggregateInput> = z.object({
  CollegeID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CollegeMinOrderByAggregateInputSchema: z.ZodType<Prisma.CollegeMinOrderByAggregateInput> = z.object({
  CollegeID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CollegeSumOrderByAggregateInputSchema: z.ZodType<Prisma.CollegeSumOrderByAggregateInput> = z.object({
  CollegeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventorListRelationFilterSchema: z.ZodType<Prisma.InventorListRelationFilter> = z.object({
  every: z.lazy(() => InventorWhereInputSchema).optional(),
  some: z.lazy(() => InventorWhereInputSchema).optional(),
  none: z.lazy(() => InventorWhereInputSchema).optional()
}).strict();

export const InventorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InventorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentCountOrderByAggregateInput> = z.object({
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentAvgOrderByAggregateInput> = z.object({
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentMaxOrderByAggregateInput> = z.object({
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentMinOrderByAggregateInput> = z.object({
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentSumOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentSumOrderByAggregateInput> = z.object({
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  CollegeID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentApplicationDataListRelationFilterSchema: z.ZodType<Prisma.PatentApplicationDataListRelationFilter> = z.object({
  every: z.lazy(() => PatentApplicationDataWhereInputSchema).optional(),
  some: z.lazy(() => PatentApplicationDataWhereInputSchema).optional(),
  none: z.lazy(() => PatentApplicationDataWhereInputSchema).optional()
}).strict();

export const PatentApplicationDataOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatentApplicationDataOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CountryCountOrderByAggregateInput> = z.object({
  CountryID: z.lazy(() => SortOrderSchema).optional(),
  CountryName: z.lazy(() => SortOrderSchema).optional(),
  ISOCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CountryAvgOrderByAggregateInput> = z.object({
  CountryID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CountryMaxOrderByAggregateInput> = z.object({
  CountryID: z.lazy(() => SortOrderSchema).optional(),
  CountryName: z.lazy(() => SortOrderSchema).optional(),
  ISOCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CountryMinOrderByAggregateInput> = z.object({
  CountryID: z.lazy(() => SortOrderSchema).optional(),
  CountryName: z.lazy(() => SortOrderSchema).optional(),
  ISOCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountrySumOrderByAggregateInputSchema: z.ZodType<Prisma.CountrySumOrderByAggregateInput> = z.object({
  CountryID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyContactPersonNullableScalarRelationFilterSchema: z.ZodType<Prisma.AgencyContactPersonNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => AgencyContactPersonWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AgencyContactPersonWhereInputSchema).optional().nullable()
}).strict();

export const InventorNullableScalarRelationFilterSchema: z.ZodType<Prisma.InventorNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => InventorWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => InventorWhereInputSchema).optional().nullable()
}).strict();

export const ContactInfoCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContactInfoCountOrderByAggregateInput> = z.object({
  ContactInfoID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Email: z.lazy(() => SortOrderSchema).optional(),
  OfficeNumber: z.lazy(() => SortOrderSchema).optional(),
  PhoneNumber: z.lazy(() => SortOrderSchema).optional(),
  Position: z.lazy(() => SortOrderSchema).optional(),
  Note: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactInfoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ContactInfoAvgOrderByAggregateInput> = z.object({
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactInfoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContactInfoMaxOrderByAggregateInput> = z.object({
  ContactInfoID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Email: z.lazy(() => SortOrderSchema).optional(),
  OfficeNumber: z.lazy(() => SortOrderSchema).optional(),
  PhoneNumber: z.lazy(() => SortOrderSchema).optional(),
  Position: z.lazy(() => SortOrderSchema).optional(),
  Note: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactInfoMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContactInfoMinOrderByAggregateInput> = z.object({
  ContactInfoID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Email: z.lazy(() => SortOrderSchema).optional(),
  OfficeNumber: z.lazy(() => SortOrderSchema).optional(),
  PhoneNumber: z.lazy(() => SortOrderSchema).optional(),
  Position: z.lazy(() => SortOrderSchema).optional(),
  Note: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactInfoSumOrderByAggregateInputSchema: z.ZodType<Prisma.ContactInfoSumOrderByAggregateInput> = z.object({
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyContactPersonCreateNestedManyWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyContactPersonCreateNestedManyWithoutAgencyInput> = z.object({
  create: z.union([ z.lazy(() => AgencyContactPersonCreateWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonCreateWithoutAgencyInputSchema).array(),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutAgencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyContactPersonCreateOrConnectWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonCreateOrConnectWithoutAgencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyContactPersonCreateManyAgencyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AgencyPatentCreateNestedManyWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyPatentCreateNestedManyWithoutAgencyInput> = z.object({
  create: z.union([ z.lazy(() => AgencyPatentCreateWithoutAgencyInputSchema),z.lazy(() => AgencyPatentCreateWithoutAgencyInputSchema).array(),z.lazy(() => AgencyPatentUncheckedCreateWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUncheckedCreateWithoutAgencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyPatentCreateOrConnectWithoutAgencyInputSchema),z.lazy(() => AgencyPatentCreateOrConnectWithoutAgencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyPatentCreateManyAgencyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AgencyContactPersonUncheckedCreateNestedManyWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyContactPersonUncheckedCreateNestedManyWithoutAgencyInput> = z.object({
  create: z.union([ z.lazy(() => AgencyContactPersonCreateWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonCreateWithoutAgencyInputSchema).array(),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutAgencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyContactPersonCreateOrConnectWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonCreateOrConnectWithoutAgencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyContactPersonCreateManyAgencyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AgencyPatentUncheckedCreateNestedManyWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyPatentUncheckedCreateNestedManyWithoutAgencyInput> = z.object({
  create: z.union([ z.lazy(() => AgencyPatentCreateWithoutAgencyInputSchema),z.lazy(() => AgencyPatentCreateWithoutAgencyInputSchema).array(),z.lazy(() => AgencyPatentUncheckedCreateWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUncheckedCreateWithoutAgencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyPatentCreateOrConnectWithoutAgencyInputSchema),z.lazy(() => AgencyPatentCreateOrConnectWithoutAgencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyPatentCreateManyAgencyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const AgencyContactPersonUpdateManyWithoutAgencyNestedInputSchema: z.ZodType<Prisma.AgencyContactPersonUpdateManyWithoutAgencyNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyContactPersonCreateWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonCreateWithoutAgencyInputSchema).array(),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutAgencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyContactPersonCreateOrConnectWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonCreateOrConnectWithoutAgencyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AgencyContactPersonUpsertWithWhereUniqueWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUpsertWithWhereUniqueWithoutAgencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyContactPersonCreateManyAgencyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AgencyContactPersonUpdateWithWhereUniqueWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUpdateWithWhereUniqueWithoutAgencyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AgencyContactPersonUpdateManyWithWhereWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUpdateManyWithWhereWithoutAgencyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AgencyContactPersonScalarWhereInputSchema),z.lazy(() => AgencyContactPersonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AgencyPatentUpdateManyWithoutAgencyNestedInputSchema: z.ZodType<Prisma.AgencyPatentUpdateManyWithoutAgencyNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyPatentCreateWithoutAgencyInputSchema),z.lazy(() => AgencyPatentCreateWithoutAgencyInputSchema).array(),z.lazy(() => AgencyPatentUncheckedCreateWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUncheckedCreateWithoutAgencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyPatentCreateOrConnectWithoutAgencyInputSchema),z.lazy(() => AgencyPatentCreateOrConnectWithoutAgencyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AgencyPatentUpsertWithWhereUniqueWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUpsertWithWhereUniqueWithoutAgencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyPatentCreateManyAgencyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AgencyPatentUpdateWithWhereUniqueWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUpdateWithWhereUniqueWithoutAgencyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AgencyPatentUpdateManyWithWhereWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUpdateManyWithWhereWithoutAgencyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AgencyPatentScalarWhereInputSchema),z.lazy(() => AgencyPatentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const AgencyContactPersonUncheckedUpdateManyWithoutAgencyNestedInputSchema: z.ZodType<Prisma.AgencyContactPersonUncheckedUpdateManyWithoutAgencyNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyContactPersonCreateWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonCreateWithoutAgencyInputSchema).array(),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutAgencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyContactPersonCreateOrConnectWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonCreateOrConnectWithoutAgencyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AgencyContactPersonUpsertWithWhereUniqueWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUpsertWithWhereUniqueWithoutAgencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyContactPersonCreateManyAgencyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AgencyContactPersonUpdateWithWhereUniqueWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUpdateWithWhereUniqueWithoutAgencyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AgencyContactPersonUpdateManyWithWhereWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUpdateManyWithWhereWithoutAgencyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AgencyContactPersonScalarWhereInputSchema),z.lazy(() => AgencyContactPersonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AgencyPatentUncheckedUpdateManyWithoutAgencyNestedInputSchema: z.ZodType<Prisma.AgencyPatentUncheckedUpdateManyWithoutAgencyNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyPatentCreateWithoutAgencyInputSchema),z.lazy(() => AgencyPatentCreateWithoutAgencyInputSchema).array(),z.lazy(() => AgencyPatentUncheckedCreateWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUncheckedCreateWithoutAgencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyPatentCreateOrConnectWithoutAgencyInputSchema),z.lazy(() => AgencyPatentCreateOrConnectWithoutAgencyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AgencyPatentUpsertWithWhereUniqueWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUpsertWithWhereUniqueWithoutAgencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyPatentCreateManyAgencyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AgencyPatentUpdateWithWhereUniqueWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUpdateWithWhereUniqueWithoutAgencyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AgencyPatentUpdateManyWithWhereWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUpdateManyWithWhereWithoutAgencyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AgencyPatentScalarWhereInputSchema),z.lazy(() => AgencyPatentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentCreateNestedOneWithoutAgenciesInputSchema: z.ZodType<Prisma.PatentCreateNestedOneWithoutAgenciesInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutAgenciesInputSchema),z.lazy(() => PatentUncheckedCreateWithoutAgenciesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutAgenciesInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional()
}).strict();

export const AgencyCreateNestedOneWithoutPatentsInputSchema: z.ZodType<Prisma.AgencyCreateNestedOneWithoutPatentsInput> = z.object({
  create: z.union([ z.lazy(() => AgencyCreateWithoutPatentsInputSchema),z.lazy(() => AgencyUncheckedCreateWithoutPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyCreateOrConnectWithoutPatentsInputSchema).optional(),
  connect: z.lazy(() => AgencyWhereUniqueInputSchema).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const PatentUpdateOneRequiredWithoutAgenciesNestedInputSchema: z.ZodType<Prisma.PatentUpdateOneRequiredWithoutAgenciesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutAgenciesInputSchema),z.lazy(() => PatentUncheckedCreateWithoutAgenciesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutAgenciesInputSchema).optional(),
  upsert: z.lazy(() => PatentUpsertWithoutAgenciesInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentUpdateToOneWithWhereWithoutAgenciesInputSchema),z.lazy(() => PatentUpdateWithoutAgenciesInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutAgenciesInputSchema) ]).optional(),
}).strict();

export const AgencyUpdateOneRequiredWithoutPatentsNestedInputSchema: z.ZodType<Prisma.AgencyUpdateOneRequiredWithoutPatentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyCreateWithoutPatentsInputSchema),z.lazy(() => AgencyUncheckedCreateWithoutPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyCreateOrConnectWithoutPatentsInputSchema).optional(),
  upsert: z.lazy(() => AgencyUpsertWithoutPatentsInputSchema).optional(),
  connect: z.lazy(() => AgencyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AgencyUpdateToOneWithWhereWithoutPatentsInputSchema),z.lazy(() => AgencyUpdateWithoutPatentsInputSchema),z.lazy(() => AgencyUncheckedUpdateWithoutPatentsInputSchema) ]).optional(),
}).strict();

export const AgencyCreateNestedOneWithoutContactsInputSchema: z.ZodType<Prisma.AgencyCreateNestedOneWithoutContactsInput> = z.object({
  create: z.union([ z.lazy(() => AgencyCreateWithoutContactsInputSchema),z.lazy(() => AgencyUncheckedCreateWithoutContactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyCreateOrConnectWithoutContactsInputSchema).optional(),
  connect: z.lazy(() => AgencyWhereUniqueInputSchema).optional()
}).strict();

export const ContactInfoCreateNestedOneWithoutAgencyContactInputSchema: z.ZodType<Prisma.ContactInfoCreateNestedOneWithoutAgencyContactInput> = z.object({
  create: z.union([ z.lazy(() => ContactInfoCreateWithoutAgencyContactInputSchema),z.lazy(() => ContactInfoUncheckedCreateWithoutAgencyContactInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContactInfoCreateOrConnectWithoutAgencyContactInputSchema).optional(),
  connect: z.lazy(() => ContactInfoWhereUniqueInputSchema).optional()
}).strict();

export const AgencyUpdateOneRequiredWithoutContactsNestedInputSchema: z.ZodType<Prisma.AgencyUpdateOneRequiredWithoutContactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyCreateWithoutContactsInputSchema),z.lazy(() => AgencyUncheckedCreateWithoutContactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyCreateOrConnectWithoutContactsInputSchema).optional(),
  upsert: z.lazy(() => AgencyUpsertWithoutContactsInputSchema).optional(),
  connect: z.lazy(() => AgencyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AgencyUpdateToOneWithWhereWithoutContactsInputSchema),z.lazy(() => AgencyUpdateWithoutContactsInputSchema),z.lazy(() => AgencyUncheckedUpdateWithoutContactsInputSchema) ]).optional(),
}).strict();

export const ContactInfoUpdateOneWithoutAgencyContactNestedInputSchema: z.ZodType<Prisma.ContactInfoUpdateOneWithoutAgencyContactNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactInfoCreateWithoutAgencyContactInputSchema),z.lazy(() => ContactInfoUncheckedCreateWithoutAgencyContactInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContactInfoCreateOrConnectWithoutAgencyContactInputSchema).optional(),
  upsert: z.lazy(() => ContactInfoUpsertWithoutAgencyContactInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ContactInfoWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ContactInfoWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ContactInfoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ContactInfoUpdateToOneWithWhereWithoutAgencyContactInputSchema),z.lazy(() => ContactInfoUpdateWithoutAgencyContactInputSchema),z.lazy(() => ContactInfoUncheckedUpdateWithoutAgencyContactInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const PatentFundingCreateNestedManyWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingCreateNestedManyWithoutPlanInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPlanInputSchema),z.lazy(() => PatentFundingCreateWithoutPlanInputSchema).array(),z.lazy(() => PatentFundingUncheckedCreateWithoutPlanInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingCreateOrConnectWithoutPlanInputSchema),z.lazy(() => PatentFundingCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingCreateManyPlanInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentFundingUncheckedCreateNestedManyWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingUncheckedCreateNestedManyWithoutPlanInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPlanInputSchema),z.lazy(() => PatentFundingCreateWithoutPlanInputSchema).array(),z.lazy(() => PatentFundingUncheckedCreateWithoutPlanInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingCreateOrConnectWithoutPlanInputSchema),z.lazy(() => PatentFundingCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingCreateManyPlanInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentFundingUpdateManyWithoutPlanNestedInputSchema: z.ZodType<Prisma.PatentFundingUpdateManyWithoutPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPlanInputSchema),z.lazy(() => PatentFundingCreateWithoutPlanInputSchema).array(),z.lazy(() => PatentFundingUncheckedCreateWithoutPlanInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingCreateOrConnectWithoutPlanInputSchema),z.lazy(() => PatentFundingCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentFundingUpsertWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => PatentFundingUpsertWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingCreateManyPlanInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentFundingUpdateWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => PatentFundingUpdateWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentFundingUpdateManyWithWhereWithoutPlanInputSchema),z.lazy(() => PatentFundingUpdateManyWithWhereWithoutPlanInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentFundingScalarWhereInputSchema),z.lazy(() => PatentFundingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentFundingUncheckedUpdateManyWithoutPlanNestedInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateManyWithoutPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPlanInputSchema),z.lazy(() => PatentFundingCreateWithoutPlanInputSchema).array(),z.lazy(() => PatentFundingUncheckedCreateWithoutPlanInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingCreateOrConnectWithoutPlanInputSchema),z.lazy(() => PatentFundingCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentFundingUpsertWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => PatentFundingUpsertWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingCreateManyPlanInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentFundingUpdateWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => PatentFundingUpdateWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentFundingUpdateManyWithWhereWithoutPlanInputSchema),z.lazy(() => PatentFundingUpdateManyWithWhereWithoutPlanInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentFundingScalarWhereInputSchema),z.lazy(() => PatentFundingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentCreateNestedOneWithoutFundingInputSchema: z.ZodType<Prisma.PatentCreateNestedOneWithoutFundingInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutFundingInputSchema),z.lazy(() => PatentUncheckedCreateWithoutFundingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutFundingInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional()
}).strict();

export const FundingPlanCreateNestedOneWithoutFundingsInputSchema: z.ZodType<Prisma.FundingPlanCreateNestedOneWithoutFundingsInput> = z.object({
  create: z.union([ z.lazy(() => FundingPlanCreateWithoutFundingsInputSchema),z.lazy(() => FundingPlanUncheckedCreateWithoutFundingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FundingPlanCreateOrConnectWithoutFundingsInputSchema).optional(),
  connect: z.lazy(() => FundingPlanWhereUniqueInputSchema).optional()
}).strict();

export const PatentUpdateOneRequiredWithoutFundingNestedInputSchema: z.ZodType<Prisma.PatentUpdateOneRequiredWithoutFundingNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutFundingInputSchema),z.lazy(() => PatentUncheckedCreateWithoutFundingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutFundingInputSchema).optional(),
  upsert: z.lazy(() => PatentUpsertWithoutFundingInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentUpdateToOneWithWhereWithoutFundingInputSchema),z.lazy(() => PatentUpdateWithoutFundingInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutFundingInputSchema) ]).optional(),
}).strict();

export const FundingPlanUpdateOneRequiredWithoutFundingsNestedInputSchema: z.ZodType<Prisma.FundingPlanUpdateOneRequiredWithoutFundingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FundingPlanCreateWithoutFundingsInputSchema),z.lazy(() => FundingPlanUncheckedCreateWithoutFundingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FundingPlanCreateOrConnectWithoutFundingsInputSchema).optional(),
  upsert: z.lazy(() => FundingPlanUpsertWithoutFundingsInputSchema).optional(),
  connect: z.lazy(() => FundingPlanWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FundingPlanUpdateToOneWithWhereWithoutFundingsInputSchema),z.lazy(() => FundingPlanUpdateWithoutFundingsInputSchema),z.lazy(() => FundingPlanUncheckedUpdateWithoutFundingsInputSchema) ]).optional(),
}).strict();

export const DepartmentCreateNestedOneWithoutInventorsInputSchema: z.ZodType<Prisma.DepartmentCreateNestedOneWithoutInventorsInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutInventorsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutInventorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutInventorsInputSchema).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional()
}).strict();

export const ContactInfoCreateNestedOneWithoutInventorInputSchema: z.ZodType<Prisma.ContactInfoCreateNestedOneWithoutInventorInput> = z.object({
  create: z.union([ z.lazy(() => ContactInfoCreateWithoutInventorInputSchema),z.lazy(() => ContactInfoUncheckedCreateWithoutInventorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContactInfoCreateOrConnectWithoutInventorInputSchema).optional(),
  connect: z.lazy(() => ContactInfoWhereUniqueInputSchema).optional()
}).strict();

export const PatentInventorCreateNestedManyWithoutInventorInputSchema: z.ZodType<Prisma.PatentInventorCreateNestedManyWithoutInventorInput> = z.object({
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutInventorInputSchema),z.lazy(() => PatentInventorCreateWithoutInventorInputSchema).array(),z.lazy(() => PatentInventorUncheckedCreateWithoutInventorInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutInventorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInventorCreateOrConnectWithoutInventorInputSchema),z.lazy(() => PatentInventorCreateOrConnectWithoutInventorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInventorCreateManyInventorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentInventorUncheckedCreateNestedManyWithoutInventorInputSchema: z.ZodType<Prisma.PatentInventorUncheckedCreateNestedManyWithoutInventorInput> = z.object({
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutInventorInputSchema),z.lazy(() => PatentInventorCreateWithoutInventorInputSchema).array(),z.lazy(() => PatentInventorUncheckedCreateWithoutInventorInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutInventorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInventorCreateOrConnectWithoutInventorInputSchema),z.lazy(() => PatentInventorCreateOrConnectWithoutInventorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInventorCreateManyInventorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DepartmentUpdateOneRequiredWithoutInventorsNestedInputSchema: z.ZodType<Prisma.DepartmentUpdateOneRequiredWithoutInventorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutInventorsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutInventorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutInventorsInputSchema).optional(),
  upsert: z.lazy(() => DepartmentUpsertWithoutInventorsInputSchema).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DepartmentUpdateToOneWithWhereWithoutInventorsInputSchema),z.lazy(() => DepartmentUpdateWithoutInventorsInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutInventorsInputSchema) ]).optional(),
}).strict();

export const ContactInfoUpdateOneWithoutInventorNestedInputSchema: z.ZodType<Prisma.ContactInfoUpdateOneWithoutInventorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactInfoCreateWithoutInventorInputSchema),z.lazy(() => ContactInfoUncheckedCreateWithoutInventorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContactInfoCreateOrConnectWithoutInventorInputSchema).optional(),
  upsert: z.lazy(() => ContactInfoUpsertWithoutInventorInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ContactInfoWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ContactInfoWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ContactInfoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ContactInfoUpdateToOneWithWhereWithoutInventorInputSchema),z.lazy(() => ContactInfoUpdateWithoutInventorInputSchema),z.lazy(() => ContactInfoUncheckedUpdateWithoutInventorInputSchema) ]).optional(),
}).strict();

export const PatentInventorUpdateManyWithoutInventorNestedInputSchema: z.ZodType<Prisma.PatentInventorUpdateManyWithoutInventorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutInventorInputSchema),z.lazy(() => PatentInventorCreateWithoutInventorInputSchema).array(),z.lazy(() => PatentInventorUncheckedCreateWithoutInventorInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutInventorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInventorCreateOrConnectWithoutInventorInputSchema),z.lazy(() => PatentInventorCreateOrConnectWithoutInventorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentInventorUpsertWithWhereUniqueWithoutInventorInputSchema),z.lazy(() => PatentInventorUpsertWithWhereUniqueWithoutInventorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInventorCreateManyInventorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentInventorUpdateWithWhereUniqueWithoutInventorInputSchema),z.lazy(() => PatentInventorUpdateWithWhereUniqueWithoutInventorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentInventorUpdateManyWithWhereWithoutInventorInputSchema),z.lazy(() => PatentInventorUpdateManyWithWhereWithoutInventorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentInventorScalarWhereInputSchema),z.lazy(() => PatentInventorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentInventorUncheckedUpdateManyWithoutInventorNestedInputSchema: z.ZodType<Prisma.PatentInventorUncheckedUpdateManyWithoutInventorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutInventorInputSchema),z.lazy(() => PatentInventorCreateWithoutInventorInputSchema).array(),z.lazy(() => PatentInventorUncheckedCreateWithoutInventorInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutInventorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInventorCreateOrConnectWithoutInventorInputSchema),z.lazy(() => PatentInventorCreateOrConnectWithoutInventorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentInventorUpsertWithWhereUniqueWithoutInventorInputSchema),z.lazy(() => PatentInventorUpsertWithWhereUniqueWithoutInventorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInventorCreateManyInventorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentInventorUpdateWithWhereUniqueWithoutInventorInputSchema),z.lazy(() => PatentInventorUpdateWithWhereUniqueWithoutInventorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentInventorUpdateManyWithWhereWithoutInventorInputSchema),z.lazy(() => PatentInventorUpdateManyWithWhereWithoutInventorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentInventorScalarWhereInputSchema),z.lazy(() => PatentInventorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentCreateNestedOneWithoutInventorsInputSchema: z.ZodType<Prisma.PatentCreateNestedOneWithoutInventorsInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutInventorsInputSchema),z.lazy(() => PatentUncheckedCreateWithoutInventorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutInventorsInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional()
}).strict();

export const InventorCreateNestedOneWithoutPatentsInputSchema: z.ZodType<Prisma.InventorCreateNestedOneWithoutPatentsInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutPatentsInputSchema),z.lazy(() => InventorUncheckedCreateWithoutPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventorCreateOrConnectWithoutPatentsInputSchema).optional(),
  connect: z.lazy(() => InventorWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const PatentUpdateOneRequiredWithoutInventorsNestedInputSchema: z.ZodType<Prisma.PatentUpdateOneRequiredWithoutInventorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutInventorsInputSchema),z.lazy(() => PatentUncheckedCreateWithoutInventorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutInventorsInputSchema).optional(),
  upsert: z.lazy(() => PatentUpsertWithoutInventorsInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentUpdateToOneWithWhereWithoutInventorsInputSchema),z.lazy(() => PatentUpdateWithoutInventorsInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutInventorsInputSchema) ]).optional(),
}).strict();

export const InventorUpdateOneRequiredWithoutPatentsNestedInputSchema: z.ZodType<Prisma.InventorUpdateOneRequiredWithoutPatentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutPatentsInputSchema),z.lazy(() => InventorUncheckedCreateWithoutPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventorCreateOrConnectWithoutPatentsInputSchema).optional(),
  upsert: z.lazy(() => InventorUpsertWithoutPatentsInputSchema).optional(),
  connect: z.lazy(() => InventorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InventorUpdateToOneWithWhereWithoutPatentsInputSchema),z.lazy(() => InventorUpdateWithoutPatentsInputSchema),z.lazy(() => InventorUncheckedUpdateWithoutPatentsInputSchema) ]).optional(),
}).strict();

export const AgencyPatentCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.AgencyPatentCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => AgencyPatentCreateWithoutPatentInputSchema),z.lazy(() => AgencyPatentCreateWithoutPatentInputSchema).array(),z.lazy(() => AgencyPatentUncheckedCreateWithoutPatentInputSchema),z.lazy(() => AgencyPatentUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyPatentCreateOrConnectWithoutPatentInputSchema),z.lazy(() => AgencyPatentCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyPatentCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DepartmentCreateNestedOneWithoutPatentsInputSchema: z.ZodType<Prisma.DepartmentCreateNestedOneWithoutPatentsInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutPatentsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutPatentsInputSchema).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional()
}).strict();

export const CollegeCreateNestedOneWithoutPatentsInputSchema: z.ZodType<Prisma.CollegeCreateNestedOneWithoutPatentsInput> = z.object({
  create: z.union([ z.lazy(() => CollegeCreateWithoutPatentsInputSchema),z.lazy(() => CollegeUncheckedCreateWithoutPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CollegeCreateOrConnectWithoutPatentsInputSchema).optional(),
  connect: z.lazy(() => CollegeWhereUniqueInputSchema).optional()
}).strict();

export const PatentApplicationDataCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentApplicationDataCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).optional()
}).strict();

export const PatentFundingCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentFundingCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentInventorCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentInventorCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInventorCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentInventorCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInventorCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentStatusCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentStatusCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentStatusCreateWithoutPatentInputSchema),z.lazy(() => PatentStatusUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentStatusCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentStatusWhereUniqueInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).optional()
}).strict();

export const AgencyPatentUncheckedCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.AgencyPatentUncheckedCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => AgencyPatentCreateWithoutPatentInputSchema),z.lazy(() => AgencyPatentCreateWithoutPatentInputSchema).array(),z.lazy(() => AgencyPatentUncheckedCreateWithoutPatentInputSchema),z.lazy(() => AgencyPatentUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyPatentCreateOrConnectWithoutPatentInputSchema),z.lazy(() => AgencyPatentCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyPatentCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentApplicationDataCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).optional()
}).strict();

export const PatentFundingUncheckedCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUncheckedCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentFundingCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentInventorUncheckedCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInventorCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentInventorCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInventorCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentStatusUncheckedCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentStatusUncheckedCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentStatusCreateWithoutPatentInputSchema),z.lazy(() => PatentStatusUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentStatusCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentStatusWhereUniqueInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).optional()
}).strict();

export const AgencyPatentUpdateManyWithoutPatentNestedInputSchema: z.ZodType<Prisma.AgencyPatentUpdateManyWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyPatentCreateWithoutPatentInputSchema),z.lazy(() => AgencyPatentCreateWithoutPatentInputSchema).array(),z.lazy(() => AgencyPatentUncheckedCreateWithoutPatentInputSchema),z.lazy(() => AgencyPatentUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyPatentCreateOrConnectWithoutPatentInputSchema),z.lazy(() => AgencyPatentCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AgencyPatentUpsertWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => AgencyPatentUpsertWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyPatentCreateManyPatentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AgencyPatentUpdateWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => AgencyPatentUpdateWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AgencyPatentUpdateManyWithWhereWithoutPatentInputSchema),z.lazy(() => AgencyPatentUpdateManyWithWhereWithoutPatentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AgencyPatentScalarWhereInputSchema),z.lazy(() => AgencyPatentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema: z.ZodType<Prisma.DepartmentUpdateOneRequiredWithoutPatentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutPatentsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutPatentsInputSchema).optional(),
  upsert: z.lazy(() => DepartmentUpsertWithoutPatentsInputSchema).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DepartmentUpdateToOneWithWhereWithoutPatentsInputSchema),z.lazy(() => DepartmentUpdateWithoutPatentsInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutPatentsInputSchema) ]).optional(),
}).strict();

export const CollegeUpdateOneRequiredWithoutPatentsNestedInputSchema: z.ZodType<Prisma.CollegeUpdateOneRequiredWithoutPatentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CollegeCreateWithoutPatentsInputSchema),z.lazy(() => CollegeUncheckedCreateWithoutPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CollegeCreateOrConnectWithoutPatentsInputSchema).optional(),
  upsert: z.lazy(() => CollegeUpsertWithoutPatentsInputSchema).optional(),
  connect: z.lazy(() => CollegeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CollegeUpdateToOneWithWhereWithoutPatentsInputSchema),z.lazy(() => CollegeUpdateWithoutPatentsInputSchema),z.lazy(() => CollegeUncheckedUpdateWithoutPatentsInputSchema) ]).optional(),
}).strict();

export const PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentApplicationDataUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentApplicationDataCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentApplicationDataUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentApplicationDataWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentApplicationDataWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentApplicationDataUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUpdateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const PatentFundingUpdateManyWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentFundingUpdateManyWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentFundingCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentFundingUpsertWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentFundingUpsertWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingCreateManyPatentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentFundingUpdateWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentFundingUpdateWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentFundingUpdateManyWithWhereWithoutPatentInputSchema),z.lazy(() => PatentFundingUpdateManyWithWhereWithoutPatentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentFundingScalarWhereInputSchema),z.lazy(() => PatentFundingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentInventorUpdateManyWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentInventorUpdateManyWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInventorCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentInventorCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentInventorUpsertWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentInventorUpsertWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInventorCreateManyPatentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentInventorUpdateWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentInventorUpdateWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentInventorUpdateManyWithWhereWithoutPatentInputSchema),z.lazy(() => PatentInventorUpdateManyWithWhereWithoutPatentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentInventorScalarWhereInputSchema),z.lazy(() => PatentInventorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentStatusUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentStatusUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentStatusCreateWithoutPatentInputSchema),z.lazy(() => PatentStatusUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentStatusCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentStatusUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentStatusWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentStatusWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentStatusWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentStatusUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentStatusUpdateWithoutPatentInputSchema),z.lazy(() => PatentStatusUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentTechnicalAttributesUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentTechnicalAttributesWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentTechnicalAttributesWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentTechnicalAttributesUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUpdateWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const AgencyPatentUncheckedUpdateManyWithoutPatentNestedInputSchema: z.ZodType<Prisma.AgencyPatentUncheckedUpdateManyWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyPatentCreateWithoutPatentInputSchema),z.lazy(() => AgencyPatentCreateWithoutPatentInputSchema).array(),z.lazy(() => AgencyPatentUncheckedCreateWithoutPatentInputSchema),z.lazy(() => AgencyPatentUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyPatentCreateOrConnectWithoutPatentInputSchema),z.lazy(() => AgencyPatentCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AgencyPatentUpsertWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => AgencyPatentUpsertWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyPatentCreateManyPatentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AgencyPatentWhereUniqueInputSchema),z.lazy(() => AgencyPatentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AgencyPatentUpdateWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => AgencyPatentUpdateWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AgencyPatentUpdateManyWithWhereWithoutPatentInputSchema),z.lazy(() => AgencyPatentUpdateManyWithWhereWithoutPatentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AgencyPatentScalarWhereInputSchema),z.lazy(() => AgencyPatentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentApplicationDataCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentApplicationDataUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentApplicationDataWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentApplicationDataWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentApplicationDataUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUpdateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const PatentFundingUncheckedUpdateManyWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateManyWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentFundingCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentFundingUpsertWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentFundingUpsertWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingCreateManyPatentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentFundingWhereUniqueInputSchema),z.lazy(() => PatentFundingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentFundingUpdateWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentFundingUpdateWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentFundingUpdateManyWithWhereWithoutPatentInputSchema),z.lazy(() => PatentFundingUpdateManyWithWhereWithoutPatentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentFundingScalarWhereInputSchema),z.lazy(() => PatentFundingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentInventorUncheckedUpdateManyWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInventorCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentInventorCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentInventorUpsertWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentInventorUpsertWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInventorCreateManyPatentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentInventorUpdateWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentInventorUpdateWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentInventorUpdateManyWithWhereWithoutPatentInputSchema),z.lazy(() => PatentInventorUpdateManyWithWhereWithoutPatentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentInventorScalarWhereInputSchema),z.lazy(() => PatentInventorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentStatusUncheckedUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentStatusUncheckedUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentStatusCreateWithoutPatentInputSchema),z.lazy(() => PatentStatusUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentStatusCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentStatusUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentStatusWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentStatusWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentStatusWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentStatusUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentStatusUpdateWithoutPatentInputSchema),z.lazy(() => PatentStatusUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentTechnicalAttributesUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentTechnicalAttributesWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentTechnicalAttributesWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentTechnicalAttributesUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUpdateWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const PatentCreateNestedOneWithoutStatusInputSchema: z.ZodType<Prisma.PatentCreateNestedOneWithoutStatusInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutStatusInputSchema),z.lazy(() => PatentUncheckedCreateWithoutStatusInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutStatusInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const PatentUpdateOneRequiredWithoutStatusNestedInputSchema: z.ZodType<Prisma.PatentUpdateOneRequiredWithoutStatusNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutStatusInputSchema),z.lazy(() => PatentUncheckedCreateWithoutStatusInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutStatusInputSchema).optional(),
  upsert: z.lazy(() => PatentUpsertWithoutStatusInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentUpdateToOneWithWhereWithoutStatusInputSchema),z.lazy(() => PatentUpdateWithoutStatusInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutStatusInputSchema) ]).optional(),
}).strict();

export const CountryCreateNestedOneWithoutApplicationsInputSchema: z.ZodType<Prisma.CountryCreateNestedOneWithoutApplicationsInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutApplicationsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutApplicationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutApplicationsInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional()
}).strict();

export const PatentCreateNestedOneWithoutApplicationInputSchema: z.ZodType<Prisma.PatentCreateNestedOneWithoutApplicationInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutApplicationInputSchema),z.lazy(() => PatentUncheckedCreateWithoutApplicationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutApplicationInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional()
}).strict();

export const NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumEnumPatentTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EnumPatentTypeSchema).optional().nullable()
}).strict();

export const CountryUpdateOneWithoutApplicationsNestedInputSchema: z.ZodType<Prisma.CountryUpdateOneWithoutApplicationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutApplicationsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutApplicationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutApplicationsInputSchema).optional(),
  upsert: z.lazy(() => CountryUpsertWithoutApplicationsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CountryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CountryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CountryUpdateToOneWithWhereWithoutApplicationsInputSchema),z.lazy(() => CountryUpdateWithoutApplicationsInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutApplicationsInputSchema) ]).optional(),
}).strict();

export const PatentUpdateOneRequiredWithoutApplicationNestedInputSchema: z.ZodType<Prisma.PatentUpdateOneRequiredWithoutApplicationNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutApplicationInputSchema),z.lazy(() => PatentUncheckedCreateWithoutApplicationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutApplicationInputSchema).optional(),
  upsert: z.lazy(() => PatentUpsertWithoutApplicationInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentUpdateToOneWithWhereWithoutApplicationInputSchema),z.lazy(() => PatentUpdateWithoutApplicationInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutApplicationInputSchema) ]).optional(),
}).strict();

export const TechnicalKeywordCreateNestedManyWithoutPatentTechnicalAttributesInputSchema: z.ZodType<Prisma.TechnicalKeywordCreateNestedManyWithoutPatentTechnicalAttributesInput> = z.object({
  create: z.union([ z.lazy(() => TechnicalKeywordCreateWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordCreateWithoutPatentTechnicalAttributesInputSchema).array(),z.lazy(() => TechnicalKeywordUncheckedCreateWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUncheckedCreateWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechnicalKeywordCreateOrConnectWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordCreateOrConnectWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechnicalKeywordWhereUniqueInputSchema),z.lazy(() => TechnicalKeywordWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentCreateNestedOneWithoutTechnicalInputSchema: z.ZodType<Prisma.PatentCreateNestedOneWithoutTechnicalInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutTechnicalInputSchema),z.lazy(() => PatentUncheckedCreateWithoutTechnicalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutTechnicalInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional()
}).strict();

export const TechnicalKeywordUncheckedCreateNestedManyWithoutPatentTechnicalAttributesInputSchema: z.ZodType<Prisma.TechnicalKeywordUncheckedCreateNestedManyWithoutPatentTechnicalAttributesInput> = z.object({
  create: z.union([ z.lazy(() => TechnicalKeywordCreateWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordCreateWithoutPatentTechnicalAttributesInputSchema).array(),z.lazy(() => TechnicalKeywordUncheckedCreateWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUncheckedCreateWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechnicalKeywordCreateOrConnectWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordCreateOrConnectWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechnicalKeywordWhereUniqueInputSchema),z.lazy(() => TechnicalKeywordWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TechnicalKeywordUpdateManyWithoutPatentTechnicalAttributesNestedInputSchema: z.ZodType<Prisma.TechnicalKeywordUpdateManyWithoutPatentTechnicalAttributesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TechnicalKeywordCreateWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordCreateWithoutPatentTechnicalAttributesInputSchema).array(),z.lazy(() => TechnicalKeywordUncheckedCreateWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUncheckedCreateWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechnicalKeywordCreateOrConnectWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordCreateOrConnectWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TechnicalKeywordUpsertWithWhereUniqueWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUpsertWithWhereUniqueWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TechnicalKeywordWhereUniqueInputSchema),z.lazy(() => TechnicalKeywordWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TechnicalKeywordWhereUniqueInputSchema),z.lazy(() => TechnicalKeywordWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TechnicalKeywordWhereUniqueInputSchema),z.lazy(() => TechnicalKeywordWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechnicalKeywordWhereUniqueInputSchema),z.lazy(() => TechnicalKeywordWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TechnicalKeywordUpdateWithWhereUniqueWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUpdateWithWhereUniqueWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TechnicalKeywordUpdateManyWithWhereWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUpdateManyWithWhereWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TechnicalKeywordScalarWhereInputSchema),z.lazy(() => TechnicalKeywordScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentUpdateOneRequiredWithoutTechnicalNestedInputSchema: z.ZodType<Prisma.PatentUpdateOneRequiredWithoutTechnicalNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutTechnicalInputSchema),z.lazy(() => PatentUncheckedCreateWithoutTechnicalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutTechnicalInputSchema).optional(),
  upsert: z.lazy(() => PatentUpsertWithoutTechnicalInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentUpdateToOneWithWhereWithoutTechnicalInputSchema),z.lazy(() => PatentUpdateWithoutTechnicalInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutTechnicalInputSchema) ]).optional(),
}).strict();

export const TechnicalKeywordUncheckedUpdateManyWithoutPatentTechnicalAttributesNestedInputSchema: z.ZodType<Prisma.TechnicalKeywordUncheckedUpdateManyWithoutPatentTechnicalAttributesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TechnicalKeywordCreateWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordCreateWithoutPatentTechnicalAttributesInputSchema).array(),z.lazy(() => TechnicalKeywordUncheckedCreateWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUncheckedCreateWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechnicalKeywordCreateOrConnectWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordCreateOrConnectWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TechnicalKeywordUpsertWithWhereUniqueWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUpsertWithWhereUniqueWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TechnicalKeywordWhereUniqueInputSchema),z.lazy(() => TechnicalKeywordWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TechnicalKeywordWhereUniqueInputSchema),z.lazy(() => TechnicalKeywordWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TechnicalKeywordWhereUniqueInputSchema),z.lazy(() => TechnicalKeywordWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechnicalKeywordWhereUniqueInputSchema),z.lazy(() => TechnicalKeywordWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TechnicalKeywordUpdateWithWhereUniqueWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUpdateWithWhereUniqueWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TechnicalKeywordUpdateManyWithWhereWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUpdateManyWithWhereWithoutPatentTechnicalAttributesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TechnicalKeywordScalarWhereInputSchema),z.lazy(() => TechnicalKeywordScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentTechnicalAttributesCreateNestedManyWithoutKeywordsInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesCreateNestedManyWithoutKeywordsInput> = z.object({
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesCreateWithoutKeywordsInputSchema).array(),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutKeywordsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutKeywordsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentTechnicalAttributesUncheckedCreateNestedManyWithoutKeywordsInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUncheckedCreateNestedManyWithoutKeywordsInput> = z.object({
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesCreateWithoutKeywordsInputSchema).array(),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutKeywordsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutKeywordsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentTechnicalAttributesUpdateManyWithoutKeywordsNestedInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpdateManyWithoutKeywordsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesCreateWithoutKeywordsInputSchema).array(),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutKeywordsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutKeywordsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentTechnicalAttributesUpsertWithWhereUniqueWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUpsertWithWhereUniqueWithoutKeywordsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentTechnicalAttributesUpdateWithWhereUniqueWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUpdateWithWhereUniqueWithoutKeywordsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentTechnicalAttributesUpdateManyWithWhereWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUpdateManyWithWhereWithoutKeywordsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentTechnicalAttributesScalarWhereInputSchema),z.lazy(() => PatentTechnicalAttributesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentTechnicalAttributesUncheckedUpdateManyWithoutKeywordsNestedInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUncheckedUpdateManyWithoutKeywordsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesCreateWithoutKeywordsInputSchema).array(),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutKeywordsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutKeywordsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentTechnicalAttributesUpsertWithWhereUniqueWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUpsertWithWhereUniqueWithoutKeywordsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentTechnicalAttributesUpdateWithWhereUniqueWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUpdateWithWhereUniqueWithoutKeywordsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentTechnicalAttributesUpdateManyWithWhereWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUpdateManyWithWhereWithoutKeywordsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentTechnicalAttributesScalarWhereInputSchema),z.lazy(() => PatentTechnicalAttributesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DepartmentCreateNestedManyWithoutCollegeInputSchema: z.ZodType<Prisma.DepartmentCreateNestedManyWithoutCollegeInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentCreateWithoutCollegeInputSchema).array(),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentCreateOrConnectWithoutCollegeInputSchema),z.lazy(() => DepartmentCreateOrConnectWithoutCollegeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentCreateManyCollegeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DepartmentWhereUniqueInputSchema),z.lazy(() => DepartmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentCreateNestedManyWithoutCollegeInputSchema: z.ZodType<Prisma.PatentCreateNestedManyWithoutCollegeInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutCollegeInputSchema),z.lazy(() => PatentCreateWithoutCollegeInputSchema).array(),z.lazy(() => PatentUncheckedCreateWithoutCollegeInputSchema),z.lazy(() => PatentUncheckedCreateWithoutCollegeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentCreateOrConnectWithoutCollegeInputSchema),z.lazy(() => PatentCreateOrConnectWithoutCollegeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentCreateManyCollegeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DepartmentUncheckedCreateNestedManyWithoutCollegeInputSchema: z.ZodType<Prisma.DepartmentUncheckedCreateNestedManyWithoutCollegeInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentCreateWithoutCollegeInputSchema).array(),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentCreateOrConnectWithoutCollegeInputSchema),z.lazy(() => DepartmentCreateOrConnectWithoutCollegeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentCreateManyCollegeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DepartmentWhereUniqueInputSchema),z.lazy(() => DepartmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentUncheckedCreateNestedManyWithoutCollegeInputSchema: z.ZodType<Prisma.PatentUncheckedCreateNestedManyWithoutCollegeInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutCollegeInputSchema),z.lazy(() => PatentCreateWithoutCollegeInputSchema).array(),z.lazy(() => PatentUncheckedCreateWithoutCollegeInputSchema),z.lazy(() => PatentUncheckedCreateWithoutCollegeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentCreateOrConnectWithoutCollegeInputSchema),z.lazy(() => PatentCreateOrConnectWithoutCollegeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentCreateManyCollegeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DepartmentUpdateManyWithoutCollegeNestedInputSchema: z.ZodType<Prisma.DepartmentUpdateManyWithoutCollegeNestedInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentCreateWithoutCollegeInputSchema).array(),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentCreateOrConnectWithoutCollegeInputSchema),z.lazy(() => DepartmentCreateOrConnectWithoutCollegeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DepartmentUpsertWithWhereUniqueWithoutCollegeInputSchema),z.lazy(() => DepartmentUpsertWithWhereUniqueWithoutCollegeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentCreateManyCollegeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DepartmentWhereUniqueInputSchema),z.lazy(() => DepartmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DepartmentWhereUniqueInputSchema),z.lazy(() => DepartmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DepartmentWhereUniqueInputSchema),z.lazy(() => DepartmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DepartmentWhereUniqueInputSchema),z.lazy(() => DepartmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DepartmentUpdateWithWhereUniqueWithoutCollegeInputSchema),z.lazy(() => DepartmentUpdateWithWhereUniqueWithoutCollegeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DepartmentUpdateManyWithWhereWithoutCollegeInputSchema),z.lazy(() => DepartmentUpdateManyWithWhereWithoutCollegeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DepartmentScalarWhereInputSchema),z.lazy(() => DepartmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentUpdateManyWithoutCollegeNestedInputSchema: z.ZodType<Prisma.PatentUpdateManyWithoutCollegeNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutCollegeInputSchema),z.lazy(() => PatentCreateWithoutCollegeInputSchema).array(),z.lazy(() => PatentUncheckedCreateWithoutCollegeInputSchema),z.lazy(() => PatentUncheckedCreateWithoutCollegeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentCreateOrConnectWithoutCollegeInputSchema),z.lazy(() => PatentCreateOrConnectWithoutCollegeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentUpsertWithWhereUniqueWithoutCollegeInputSchema),z.lazy(() => PatentUpsertWithWhereUniqueWithoutCollegeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentCreateManyCollegeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentUpdateWithWhereUniqueWithoutCollegeInputSchema),z.lazy(() => PatentUpdateWithWhereUniqueWithoutCollegeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentUpdateManyWithWhereWithoutCollegeInputSchema),z.lazy(() => PatentUpdateManyWithWhereWithoutCollegeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentScalarWhereInputSchema),z.lazy(() => PatentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DepartmentUncheckedUpdateManyWithoutCollegeNestedInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateManyWithoutCollegeNestedInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentCreateWithoutCollegeInputSchema).array(),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentCreateOrConnectWithoutCollegeInputSchema),z.lazy(() => DepartmentCreateOrConnectWithoutCollegeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DepartmentUpsertWithWhereUniqueWithoutCollegeInputSchema),z.lazy(() => DepartmentUpsertWithWhereUniqueWithoutCollegeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentCreateManyCollegeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DepartmentWhereUniqueInputSchema),z.lazy(() => DepartmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DepartmentWhereUniqueInputSchema),z.lazy(() => DepartmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DepartmentWhereUniqueInputSchema),z.lazy(() => DepartmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DepartmentWhereUniqueInputSchema),z.lazy(() => DepartmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DepartmentUpdateWithWhereUniqueWithoutCollegeInputSchema),z.lazy(() => DepartmentUpdateWithWhereUniqueWithoutCollegeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DepartmentUpdateManyWithWhereWithoutCollegeInputSchema),z.lazy(() => DepartmentUpdateManyWithWhereWithoutCollegeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DepartmentScalarWhereInputSchema),z.lazy(() => DepartmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentUncheckedUpdateManyWithoutCollegeNestedInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateManyWithoutCollegeNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutCollegeInputSchema),z.lazy(() => PatentCreateWithoutCollegeInputSchema).array(),z.lazy(() => PatentUncheckedCreateWithoutCollegeInputSchema),z.lazy(() => PatentUncheckedCreateWithoutCollegeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentCreateOrConnectWithoutCollegeInputSchema),z.lazy(() => PatentCreateOrConnectWithoutCollegeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentUpsertWithWhereUniqueWithoutCollegeInputSchema),z.lazy(() => PatentUpsertWithWhereUniqueWithoutCollegeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentCreateManyCollegeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentUpdateWithWhereUniqueWithoutCollegeInputSchema),z.lazy(() => PatentUpdateWithWhereUniqueWithoutCollegeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentUpdateManyWithWhereWithoutCollegeInputSchema),z.lazy(() => PatentUpdateManyWithWhereWithoutCollegeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentScalarWhereInputSchema),z.lazy(() => PatentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CollegeCreateNestedOneWithoutDepartmentsInputSchema: z.ZodType<Prisma.CollegeCreateNestedOneWithoutDepartmentsInput> = z.object({
  create: z.union([ z.lazy(() => CollegeCreateWithoutDepartmentsInputSchema),z.lazy(() => CollegeUncheckedCreateWithoutDepartmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CollegeCreateOrConnectWithoutDepartmentsInputSchema).optional(),
  connect: z.lazy(() => CollegeWhereUniqueInputSchema).optional()
}).strict();

export const InventorCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutDepartmentInputSchema),z.lazy(() => InventorCreateWithoutDepartmentInputSchema).array(),z.lazy(() => InventorUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => InventorUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InventorCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => InventorCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InventorCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutDepartmentInputSchema),z.lazy(() => PatentCreateWithoutDepartmentInputSchema).array(),z.lazy(() => PatentUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => PatentUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => PatentCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InventorUncheckedCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorUncheckedCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutDepartmentInputSchema),z.lazy(() => InventorCreateWithoutDepartmentInputSchema).array(),z.lazy(() => InventorUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => InventorUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InventorCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => InventorCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InventorCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentUncheckedCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentUncheckedCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutDepartmentInputSchema),z.lazy(() => PatentCreateWithoutDepartmentInputSchema).array(),z.lazy(() => PatentUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => PatentUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => PatentCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CollegeUpdateOneRequiredWithoutDepartmentsNestedInputSchema: z.ZodType<Prisma.CollegeUpdateOneRequiredWithoutDepartmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CollegeCreateWithoutDepartmentsInputSchema),z.lazy(() => CollegeUncheckedCreateWithoutDepartmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CollegeCreateOrConnectWithoutDepartmentsInputSchema).optional(),
  upsert: z.lazy(() => CollegeUpsertWithoutDepartmentsInputSchema).optional(),
  connect: z.lazy(() => CollegeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CollegeUpdateToOneWithWhereWithoutDepartmentsInputSchema),z.lazy(() => CollegeUpdateWithoutDepartmentsInputSchema),z.lazy(() => CollegeUncheckedUpdateWithoutDepartmentsInputSchema) ]).optional(),
}).strict();

export const InventorUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.InventorUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutDepartmentInputSchema),z.lazy(() => InventorCreateWithoutDepartmentInputSchema).array(),z.lazy(() => InventorUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => InventorUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InventorCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => InventorCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InventorUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => InventorUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InventorCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InventorUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => InventorUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InventorUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => InventorUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InventorScalarWhereInputSchema),z.lazy(() => InventorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.PatentUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutDepartmentInputSchema),z.lazy(() => PatentCreateWithoutDepartmentInputSchema).array(),z.lazy(() => PatentUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => PatentUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => PatentCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => PatentUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => PatentUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => PatentUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentScalarWhereInputSchema),z.lazy(() => PatentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InventorUncheckedUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutDepartmentInputSchema),z.lazy(() => InventorCreateWithoutDepartmentInputSchema).array(),z.lazy(() => InventorUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => InventorUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InventorCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => InventorCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InventorUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => InventorUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InventorCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InventorUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => InventorUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InventorUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => InventorUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InventorScalarWhereInputSchema),z.lazy(() => InventorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentUncheckedUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutDepartmentInputSchema),z.lazy(() => PatentCreateWithoutDepartmentInputSchema).array(),z.lazy(() => PatentUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => PatentUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => PatentCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => PatentUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => PatentUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => PatentUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentScalarWhereInputSchema),z.lazy(() => PatentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentApplicationDataCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataCreateWithoutCountryInputSchema).array(),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentApplicationDataCreateOrConnectWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentApplicationDataCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentApplicationDataUncheckedCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataCreateWithoutCountryInputSchema).array(),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentApplicationDataCreateOrConnectWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentApplicationDataCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentApplicationDataUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.PatentApplicationDataUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataCreateWithoutCountryInputSchema).array(),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentApplicationDataCreateOrConnectWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentApplicationDataUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentApplicationDataCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentApplicationDataUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentApplicationDataUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentApplicationDataScalarWhereInputSchema),z.lazy(() => PatentApplicationDataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentApplicationDataUncheckedUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataCreateWithoutCountryInputSchema).array(),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentApplicationDataCreateOrConnectWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentApplicationDataUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentApplicationDataCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentApplicationDataUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentApplicationDataUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentApplicationDataScalarWhereInputSchema),z.lazy(() => PatentApplicationDataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AgencyContactPersonCreateNestedOneWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyContactPersonCreateNestedOneWithoutContactInfoInput> = z.object({
  create: z.union([ z.lazy(() => AgencyContactPersonCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutContactInfoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyContactPersonCreateOrConnectWithoutContactInfoInputSchema).optional(),
  connect: z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).optional()
}).strict();

export const InventorCreateNestedOneWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorCreateNestedOneWithoutContactInfoInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventorCreateOrConnectWithoutContactInfoInputSchema).optional(),
  connect: z.lazy(() => InventorWhereUniqueInputSchema).optional()
}).strict();

export const AgencyContactPersonUncheckedCreateNestedOneWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyContactPersonUncheckedCreateNestedOneWithoutContactInfoInput> = z.object({
  create: z.union([ z.lazy(() => AgencyContactPersonCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutContactInfoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyContactPersonCreateOrConnectWithoutContactInfoInputSchema).optional(),
  connect: z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).optional()
}).strict();

export const InventorUncheckedCreateNestedOneWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUncheckedCreateNestedOneWithoutContactInfoInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventorCreateOrConnectWithoutContactInfoInputSchema).optional(),
  connect: z.lazy(() => InventorWhereUniqueInputSchema).optional()
}).strict();

export const AgencyContactPersonUpdateOneWithoutContactInfoNestedInputSchema: z.ZodType<Prisma.AgencyContactPersonUpdateOneWithoutContactInfoNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyContactPersonCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutContactInfoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyContactPersonCreateOrConnectWithoutContactInfoInputSchema).optional(),
  upsert: z.lazy(() => AgencyContactPersonUpsertWithoutContactInfoInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AgencyContactPersonWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AgencyContactPersonWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AgencyContactPersonUpdateToOneWithWhereWithoutContactInfoInputSchema),z.lazy(() => AgencyContactPersonUpdateWithoutContactInfoInputSchema),z.lazy(() => AgencyContactPersonUncheckedUpdateWithoutContactInfoInputSchema) ]).optional(),
}).strict();

export const InventorUpdateOneWithoutContactInfoNestedInputSchema: z.ZodType<Prisma.InventorUpdateOneWithoutContactInfoNestedInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventorCreateOrConnectWithoutContactInfoInputSchema).optional(),
  upsert: z.lazy(() => InventorUpsertWithoutContactInfoInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => InventorWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => InventorWhereInputSchema) ]).optional(),
  connect: z.lazy(() => InventorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InventorUpdateToOneWithWhereWithoutContactInfoInputSchema),z.lazy(() => InventorUpdateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedUpdateWithoutContactInfoInputSchema) ]).optional(),
}).strict();

export const AgencyContactPersonUncheckedUpdateOneWithoutContactInfoNestedInputSchema: z.ZodType<Prisma.AgencyContactPersonUncheckedUpdateOneWithoutContactInfoNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyContactPersonCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutContactInfoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyContactPersonCreateOrConnectWithoutContactInfoInputSchema).optional(),
  upsert: z.lazy(() => AgencyContactPersonUpsertWithoutContactInfoInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AgencyContactPersonWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AgencyContactPersonWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AgencyContactPersonWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AgencyContactPersonUpdateToOneWithWhereWithoutContactInfoInputSchema),z.lazy(() => AgencyContactPersonUpdateWithoutContactInfoInputSchema),z.lazy(() => AgencyContactPersonUncheckedUpdateWithoutContactInfoInputSchema) ]).optional(),
}).strict();

export const InventorUncheckedUpdateOneWithoutContactInfoNestedInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateOneWithoutContactInfoNestedInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventorCreateOrConnectWithoutContactInfoInputSchema).optional(),
  upsert: z.lazy(() => InventorUpsertWithoutContactInfoInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => InventorWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => InventorWhereInputSchema) ]).optional(),
  connect: z.lazy(() => InventorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InventorUpdateToOneWithWhereWithoutContactInfoInputSchema),z.lazy(() => InventorUpdateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedUpdateWithoutContactInfoInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumEnumPatentTypeNullableFilterSchema: z.ZodType<Prisma.NestedEnumEnumPatentTypeNullableFilter> = z.object({
  equals: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  in: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NestedEnumEnumPatentTypeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumEnumPatentTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEnumPatentTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  in: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NestedEnumEnumPatentTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEnumPatentTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEnumPatentTypeNullableFilterSchema).optional()
}).strict();

export const AgencyContactPersonCreateWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyContactPersonCreateWithoutAgencyInput> = z.object({
  Position: z.string(),
  contactInfo: z.lazy(() => ContactInfoCreateNestedOneWithoutAgencyContactInputSchema).optional()
}).strict();

export const AgencyContactPersonUncheckedCreateWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyContactPersonUncheckedCreateWithoutAgencyInput> = z.object({
  ContactPersonID: z.number().int().optional(),
  Position: z.string(),
  ContactInfoID: z.number().int().optional().nullable()
}).strict();

export const AgencyContactPersonCreateOrConnectWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyContactPersonCreateOrConnectWithoutAgencyInput> = z.object({
  where: z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AgencyContactPersonCreateWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutAgencyInputSchema) ]),
}).strict();

export const AgencyContactPersonCreateManyAgencyInputEnvelopeSchema: z.ZodType<Prisma.AgencyContactPersonCreateManyAgencyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AgencyContactPersonCreateManyAgencyInputSchema),z.lazy(() => AgencyContactPersonCreateManyAgencyInputSchema).array() ]),
}).strict();

export const AgencyPatentCreateWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyPatentCreateWithoutAgencyInput> = z.object({
  FileCode: z.string(),
  Role: z.string(),
  Details: z.string().optional().nullable(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutAgenciesInputSchema)
}).strict();

export const AgencyPatentUncheckedCreateWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyPatentUncheckedCreateWithoutAgencyInput> = z.object({
  PatentID: z.number().int(),
  FileCode: z.string(),
  Role: z.string(),
  Details: z.string().optional().nullable()
}).strict();

export const AgencyPatentCreateOrConnectWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyPatentCreateOrConnectWithoutAgencyInput> = z.object({
  where: z.lazy(() => AgencyPatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AgencyPatentCreateWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUncheckedCreateWithoutAgencyInputSchema) ]),
}).strict();

export const AgencyPatentCreateManyAgencyInputEnvelopeSchema: z.ZodType<Prisma.AgencyPatentCreateManyAgencyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AgencyPatentCreateManyAgencyInputSchema),z.lazy(() => AgencyPatentCreateManyAgencyInputSchema).array() ]),
}).strict();

export const AgencyContactPersonUpsertWithWhereUniqueWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyContactPersonUpsertWithWhereUniqueWithoutAgencyInput> = z.object({
  where: z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AgencyContactPersonUpdateWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUncheckedUpdateWithoutAgencyInputSchema) ]),
  create: z.union([ z.lazy(() => AgencyContactPersonCreateWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutAgencyInputSchema) ]),
}).strict();

export const AgencyContactPersonUpdateWithWhereUniqueWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyContactPersonUpdateWithWhereUniqueWithoutAgencyInput> = z.object({
  where: z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AgencyContactPersonUpdateWithoutAgencyInputSchema),z.lazy(() => AgencyContactPersonUncheckedUpdateWithoutAgencyInputSchema) ]),
}).strict();

export const AgencyContactPersonUpdateManyWithWhereWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyContactPersonUpdateManyWithWhereWithoutAgencyInput> = z.object({
  where: z.lazy(() => AgencyContactPersonScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AgencyContactPersonUpdateManyMutationInputSchema),z.lazy(() => AgencyContactPersonUncheckedUpdateManyWithoutAgencyInputSchema) ]),
}).strict();

export const AgencyContactPersonScalarWhereInputSchema: z.ZodType<Prisma.AgencyContactPersonScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AgencyContactPersonScalarWhereInputSchema),z.lazy(() => AgencyContactPersonScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyContactPersonScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyContactPersonScalarWhereInputSchema),z.lazy(() => AgencyContactPersonScalarWhereInputSchema).array() ]).optional(),
  ContactPersonID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  AgencyID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Position: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const AgencyPatentUpsertWithWhereUniqueWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyPatentUpsertWithWhereUniqueWithoutAgencyInput> = z.object({
  where: z.lazy(() => AgencyPatentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AgencyPatentUpdateWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUncheckedUpdateWithoutAgencyInputSchema) ]),
  create: z.union([ z.lazy(() => AgencyPatentCreateWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUncheckedCreateWithoutAgencyInputSchema) ]),
}).strict();

export const AgencyPatentUpdateWithWhereUniqueWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyPatentUpdateWithWhereUniqueWithoutAgencyInput> = z.object({
  where: z.lazy(() => AgencyPatentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AgencyPatentUpdateWithoutAgencyInputSchema),z.lazy(() => AgencyPatentUncheckedUpdateWithoutAgencyInputSchema) ]),
}).strict();

export const AgencyPatentUpdateManyWithWhereWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyPatentUpdateManyWithWhereWithoutAgencyInput> = z.object({
  where: z.lazy(() => AgencyPatentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AgencyPatentUpdateManyMutationInputSchema),z.lazy(() => AgencyPatentUncheckedUpdateManyWithoutAgencyInputSchema) ]),
}).strict();

export const AgencyPatentScalarWhereInputSchema: z.ZodType<Prisma.AgencyPatentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AgencyPatentScalarWhereInputSchema),z.lazy(() => AgencyPatentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyPatentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyPatentScalarWhereInputSchema),z.lazy(() => AgencyPatentScalarWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  AgencyID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  FileCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Details: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PatentCreateWithoutAgenciesInputSchema: z.ZodType<Prisma.PatentCreateWithoutAgenciesInput> = z.object({
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  college: z.lazy(() => CollegeCreateNestedOneWithoutPatentsInputSchema),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutAgenciesInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutAgenciesInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  DepartmentID: z.number().int(),
  CollegeID: z.number().int(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutAgenciesInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutAgenciesInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutAgenciesInputSchema),z.lazy(() => PatentUncheckedCreateWithoutAgenciesInputSchema) ]),
}).strict();

export const AgencyCreateWithoutPatentsInputSchema: z.ZodType<Prisma.AgencyCreateWithoutPatentsInput> = z.object({
  Name: z.string(),
  contacts: z.lazy(() => AgencyContactPersonCreateNestedManyWithoutAgencyInputSchema).optional()
}).strict();

export const AgencyUncheckedCreateWithoutPatentsInputSchema: z.ZodType<Prisma.AgencyUncheckedCreateWithoutPatentsInput> = z.object({
  AgencyID: z.number().int().optional(),
  Name: z.string(),
  contacts: z.lazy(() => AgencyContactPersonUncheckedCreateNestedManyWithoutAgencyInputSchema).optional()
}).strict();

export const AgencyCreateOrConnectWithoutPatentsInputSchema: z.ZodType<Prisma.AgencyCreateOrConnectWithoutPatentsInput> = z.object({
  where: z.lazy(() => AgencyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AgencyCreateWithoutPatentsInputSchema),z.lazy(() => AgencyUncheckedCreateWithoutPatentsInputSchema) ]),
}).strict();

export const PatentUpsertWithoutAgenciesInputSchema: z.ZodType<Prisma.PatentUpsertWithoutAgenciesInput> = z.object({
  update: z.union([ z.lazy(() => PatentUpdateWithoutAgenciesInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutAgenciesInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutAgenciesInputSchema),z.lazy(() => PatentUncheckedCreateWithoutAgenciesInputSchema) ]),
  where: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const PatentUpdateToOneWithWhereWithoutAgenciesInputSchema: z.ZodType<Prisma.PatentUpdateToOneWithWhereWithoutAgenciesInput> = z.object({
  where: z.lazy(() => PatentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentUpdateWithoutAgenciesInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutAgenciesInputSchema) ]),
}).strict();

export const PatentUpdateWithoutAgenciesInputSchema: z.ZodType<Prisma.PatentUpdateWithoutAgenciesInput> = z.object({
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  college: z.lazy(() => CollegeUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutAgenciesInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutAgenciesInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const AgencyUpsertWithoutPatentsInputSchema: z.ZodType<Prisma.AgencyUpsertWithoutPatentsInput> = z.object({
  update: z.union([ z.lazy(() => AgencyUpdateWithoutPatentsInputSchema),z.lazy(() => AgencyUncheckedUpdateWithoutPatentsInputSchema) ]),
  create: z.union([ z.lazy(() => AgencyCreateWithoutPatentsInputSchema),z.lazy(() => AgencyUncheckedCreateWithoutPatentsInputSchema) ]),
  where: z.lazy(() => AgencyWhereInputSchema).optional()
}).strict();

export const AgencyUpdateToOneWithWhereWithoutPatentsInputSchema: z.ZodType<Prisma.AgencyUpdateToOneWithWhereWithoutPatentsInput> = z.object({
  where: z.lazy(() => AgencyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AgencyUpdateWithoutPatentsInputSchema),z.lazy(() => AgencyUncheckedUpdateWithoutPatentsInputSchema) ]),
}).strict();

export const AgencyUpdateWithoutPatentsInputSchema: z.ZodType<Prisma.AgencyUpdateWithoutPatentsInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.lazy(() => AgencyContactPersonUpdateManyWithoutAgencyNestedInputSchema).optional()
}).strict();

export const AgencyUncheckedUpdateWithoutPatentsInputSchema: z.ZodType<Prisma.AgencyUncheckedUpdateWithoutPatentsInput> = z.object({
  AgencyID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.lazy(() => AgencyContactPersonUncheckedUpdateManyWithoutAgencyNestedInputSchema).optional()
}).strict();

export const AgencyCreateWithoutContactsInputSchema: z.ZodType<Prisma.AgencyCreateWithoutContactsInput> = z.object({
  Name: z.string(),
  patents: z.lazy(() => AgencyPatentCreateNestedManyWithoutAgencyInputSchema).optional()
}).strict();

export const AgencyUncheckedCreateWithoutContactsInputSchema: z.ZodType<Prisma.AgencyUncheckedCreateWithoutContactsInput> = z.object({
  AgencyID: z.number().int().optional(),
  Name: z.string(),
  patents: z.lazy(() => AgencyPatentUncheckedCreateNestedManyWithoutAgencyInputSchema).optional()
}).strict();

export const AgencyCreateOrConnectWithoutContactsInputSchema: z.ZodType<Prisma.AgencyCreateOrConnectWithoutContactsInput> = z.object({
  where: z.lazy(() => AgencyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AgencyCreateWithoutContactsInputSchema),z.lazy(() => AgencyUncheckedCreateWithoutContactsInputSchema) ]),
}).strict();

export const ContactInfoCreateWithoutAgencyContactInputSchema: z.ZodType<Prisma.ContactInfoCreateWithoutAgencyContactInput> = z.object({
  Name: z.string().optional().nullable(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Position: z.string().optional().nullable(),
  Note: z.string().optional().nullable(),
  inventor: z.lazy(() => InventorCreateNestedOneWithoutContactInfoInputSchema).optional()
}).strict();

export const ContactInfoUncheckedCreateWithoutAgencyContactInputSchema: z.ZodType<Prisma.ContactInfoUncheckedCreateWithoutAgencyContactInput> = z.object({
  ContactInfoID: z.number().int().optional(),
  Name: z.string().optional().nullable(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Position: z.string().optional().nullable(),
  Note: z.string().optional().nullable(),
  inventor: z.lazy(() => InventorUncheckedCreateNestedOneWithoutContactInfoInputSchema).optional()
}).strict();

export const ContactInfoCreateOrConnectWithoutAgencyContactInputSchema: z.ZodType<Prisma.ContactInfoCreateOrConnectWithoutAgencyContactInput> = z.object({
  where: z.lazy(() => ContactInfoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContactInfoCreateWithoutAgencyContactInputSchema),z.lazy(() => ContactInfoUncheckedCreateWithoutAgencyContactInputSchema) ]),
}).strict();

export const AgencyUpsertWithoutContactsInputSchema: z.ZodType<Prisma.AgencyUpsertWithoutContactsInput> = z.object({
  update: z.union([ z.lazy(() => AgencyUpdateWithoutContactsInputSchema),z.lazy(() => AgencyUncheckedUpdateWithoutContactsInputSchema) ]),
  create: z.union([ z.lazy(() => AgencyCreateWithoutContactsInputSchema),z.lazy(() => AgencyUncheckedCreateWithoutContactsInputSchema) ]),
  where: z.lazy(() => AgencyWhereInputSchema).optional()
}).strict();

export const AgencyUpdateToOneWithWhereWithoutContactsInputSchema: z.ZodType<Prisma.AgencyUpdateToOneWithWhereWithoutContactsInput> = z.object({
  where: z.lazy(() => AgencyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AgencyUpdateWithoutContactsInputSchema),z.lazy(() => AgencyUncheckedUpdateWithoutContactsInputSchema) ]),
}).strict();

export const AgencyUpdateWithoutContactsInputSchema: z.ZodType<Prisma.AgencyUpdateWithoutContactsInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patents: z.lazy(() => AgencyPatentUpdateManyWithoutAgencyNestedInputSchema).optional()
}).strict();

export const AgencyUncheckedUpdateWithoutContactsInputSchema: z.ZodType<Prisma.AgencyUncheckedUpdateWithoutContactsInput> = z.object({
  AgencyID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patents: z.lazy(() => AgencyPatentUncheckedUpdateManyWithoutAgencyNestedInputSchema).optional()
}).strict();

export const ContactInfoUpsertWithoutAgencyContactInputSchema: z.ZodType<Prisma.ContactInfoUpsertWithoutAgencyContactInput> = z.object({
  update: z.union([ z.lazy(() => ContactInfoUpdateWithoutAgencyContactInputSchema),z.lazy(() => ContactInfoUncheckedUpdateWithoutAgencyContactInputSchema) ]),
  create: z.union([ z.lazy(() => ContactInfoCreateWithoutAgencyContactInputSchema),z.lazy(() => ContactInfoUncheckedCreateWithoutAgencyContactInputSchema) ]),
  where: z.lazy(() => ContactInfoWhereInputSchema).optional()
}).strict();

export const ContactInfoUpdateToOneWithWhereWithoutAgencyContactInputSchema: z.ZodType<Prisma.ContactInfoUpdateToOneWithWhereWithoutAgencyContactInput> = z.object({
  where: z.lazy(() => ContactInfoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ContactInfoUpdateWithoutAgencyContactInputSchema),z.lazy(() => ContactInfoUncheckedUpdateWithoutAgencyContactInputSchema) ]),
}).strict();

export const ContactInfoUpdateWithoutAgencyContactInputSchema: z.ZodType<Prisma.ContactInfoUpdateWithoutAgencyContactInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventor: z.lazy(() => InventorUpdateOneWithoutContactInfoNestedInputSchema).optional()
}).strict();

export const ContactInfoUncheckedUpdateWithoutAgencyContactInputSchema: z.ZodType<Prisma.ContactInfoUncheckedUpdateWithoutAgencyContactInput> = z.object({
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventor: z.lazy(() => InventorUncheckedUpdateOneWithoutContactInfoNestedInputSchema).optional()
}).strict();

export const PatentFundingCreateWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingCreateWithoutPlanInput> = z.object({
  FundingAgency: z.string(),
  ProjectNumber: z.string(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutFundingInputSchema)
}).strict();

export const PatentFundingUncheckedCreateWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingUncheckedCreateWithoutPlanInput> = z.object({
  FundingID: z.number().int().optional(),
  PatentID: z.number().int(),
  FundingAgency: z.string(),
  ProjectNumber: z.string()
}).strict();

export const PatentFundingCreateOrConnectWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingCreateOrConnectWithoutPlanInput> = z.object({
  where: z.lazy(() => PatentFundingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPlanInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPlanInputSchema) ]),
}).strict();

export const PatentFundingCreateManyPlanInputEnvelopeSchema: z.ZodType<Prisma.PatentFundingCreateManyPlanInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentFundingCreateManyPlanInputSchema),z.lazy(() => PatentFundingCreateManyPlanInputSchema).array() ]),
}).strict();

export const PatentFundingUpsertWithWhereUniqueWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingUpsertWithWhereUniqueWithoutPlanInput> = z.object({
  where: z.lazy(() => PatentFundingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentFundingUpdateWithoutPlanInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutPlanInputSchema) ]),
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPlanInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPlanInputSchema) ]),
}).strict();

export const PatentFundingUpdateWithWhereUniqueWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingUpdateWithWhereUniqueWithoutPlanInput> = z.object({
  where: z.lazy(() => PatentFundingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentFundingUpdateWithoutPlanInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutPlanInputSchema) ]),
}).strict();

export const PatentFundingUpdateManyWithWhereWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingUpdateManyWithWhereWithoutPlanInput> = z.object({
  where: z.lazy(() => PatentFundingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentFundingUpdateManyMutationInputSchema),z.lazy(() => PatentFundingUncheckedUpdateManyWithoutPlanInputSchema) ]),
}).strict();

export const PatentFundingScalarWhereInputSchema: z.ZodType<Prisma.PatentFundingScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentFundingScalarWhereInputSchema),z.lazy(() => PatentFundingScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentFundingScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentFundingScalarWhereInputSchema),z.lazy(() => PatentFundingScalarWhereInputSchema).array() ]).optional(),
  FundingID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  FundingAgency: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ProjectNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  PlanID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const PatentCreateWithoutFundingInputSchema: z.ZodType<Prisma.PatentCreateWithoutFundingInput> = z.object({
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  agencies: z.lazy(() => AgencyPatentCreateNestedManyWithoutPatentInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  college: z.lazy(() => CollegeCreateNestedOneWithoutPatentsInputSchema),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutFundingInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutFundingInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  DepartmentID: z.number().int(),
  CollegeID: z.number().int(),
  agencies: z.lazy(() => AgencyPatentUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutFundingInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutFundingInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutFundingInputSchema),z.lazy(() => PatentUncheckedCreateWithoutFundingInputSchema) ]),
}).strict();

export const FundingPlanCreateWithoutFundingsInputSchema: z.ZodType<Prisma.FundingPlanCreateWithoutFundingsInput> = z.object({
  PlanType: z.number().int()
}).strict();

export const FundingPlanUncheckedCreateWithoutFundingsInputSchema: z.ZodType<Prisma.FundingPlanUncheckedCreateWithoutFundingsInput> = z.object({
  PlanID: z.number().int().optional(),
  PlanType: z.number().int()
}).strict();

export const FundingPlanCreateOrConnectWithoutFundingsInputSchema: z.ZodType<Prisma.FundingPlanCreateOrConnectWithoutFundingsInput> = z.object({
  where: z.lazy(() => FundingPlanWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FundingPlanCreateWithoutFundingsInputSchema),z.lazy(() => FundingPlanUncheckedCreateWithoutFundingsInputSchema) ]),
}).strict();

export const PatentUpsertWithoutFundingInputSchema: z.ZodType<Prisma.PatentUpsertWithoutFundingInput> = z.object({
  update: z.union([ z.lazy(() => PatentUpdateWithoutFundingInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutFundingInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutFundingInputSchema),z.lazy(() => PatentUncheckedCreateWithoutFundingInputSchema) ]),
  where: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const PatentUpdateToOneWithWhereWithoutFundingInputSchema: z.ZodType<Prisma.PatentUpdateToOneWithWhereWithoutFundingInput> = z.object({
  where: z.lazy(() => PatentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentUpdateWithoutFundingInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutFundingInputSchema) ]),
}).strict();

export const PatentUpdateWithoutFundingInputSchema: z.ZodType<Prisma.PatentUpdateWithoutFundingInput> = z.object({
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUpdateManyWithoutPatentNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  college: z.lazy(() => CollegeUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutFundingInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutFundingInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const FundingPlanUpsertWithoutFundingsInputSchema: z.ZodType<Prisma.FundingPlanUpsertWithoutFundingsInput> = z.object({
  update: z.union([ z.lazy(() => FundingPlanUpdateWithoutFundingsInputSchema),z.lazy(() => FundingPlanUncheckedUpdateWithoutFundingsInputSchema) ]),
  create: z.union([ z.lazy(() => FundingPlanCreateWithoutFundingsInputSchema),z.lazy(() => FundingPlanUncheckedCreateWithoutFundingsInputSchema) ]),
  where: z.lazy(() => FundingPlanWhereInputSchema).optional()
}).strict();

export const FundingPlanUpdateToOneWithWhereWithoutFundingsInputSchema: z.ZodType<Prisma.FundingPlanUpdateToOneWithWhereWithoutFundingsInput> = z.object({
  where: z.lazy(() => FundingPlanWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FundingPlanUpdateWithoutFundingsInputSchema),z.lazy(() => FundingPlanUncheckedUpdateWithoutFundingsInputSchema) ]),
}).strict();

export const FundingPlanUpdateWithoutFundingsInputSchema: z.ZodType<Prisma.FundingPlanUpdateWithoutFundingsInput> = z.object({
  PlanType: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingPlanUncheckedUpdateWithoutFundingsInputSchema: z.ZodType<Prisma.FundingPlanUncheckedUpdateWithoutFundingsInput> = z.object({
  PlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PlanType: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DepartmentCreateWithoutInventorsInputSchema: z.ZodType<Prisma.DepartmentCreateWithoutInventorsInput> = z.object({
  Name: z.string(),
  Description: z.string().optional().nullable(),
  college: z.lazy(() => CollegeCreateNestedOneWithoutDepartmentsInputSchema),
  patents: z.lazy(() => PatentCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentUncheckedCreateWithoutInventorsInputSchema: z.ZodType<Prisma.DepartmentUncheckedCreateWithoutInventorsInput> = z.object({
  DepartmentID: z.number().int().optional(),
  Name: z.string(),
  CollegeID: z.number().int(),
  Description: z.string().optional().nullable(),
  patents: z.lazy(() => PatentUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentCreateOrConnectWithoutInventorsInputSchema: z.ZodType<Prisma.DepartmentCreateOrConnectWithoutInventorsInput> = z.object({
  where: z.lazy(() => DepartmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutInventorsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutInventorsInputSchema) ]),
}).strict();

export const ContactInfoCreateWithoutInventorInputSchema: z.ZodType<Prisma.ContactInfoCreateWithoutInventorInput> = z.object({
  Name: z.string().optional().nullable(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Position: z.string().optional().nullable(),
  Note: z.string().optional().nullable(),
  agencyContact: z.lazy(() => AgencyContactPersonCreateNestedOneWithoutContactInfoInputSchema).optional()
}).strict();

export const ContactInfoUncheckedCreateWithoutInventorInputSchema: z.ZodType<Prisma.ContactInfoUncheckedCreateWithoutInventorInput> = z.object({
  ContactInfoID: z.number().int().optional(),
  Name: z.string().optional().nullable(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Position: z.string().optional().nullable(),
  Note: z.string().optional().nullable(),
  agencyContact: z.lazy(() => AgencyContactPersonUncheckedCreateNestedOneWithoutContactInfoInputSchema).optional()
}).strict();

export const ContactInfoCreateOrConnectWithoutInventorInputSchema: z.ZodType<Prisma.ContactInfoCreateOrConnectWithoutInventorInput> = z.object({
  where: z.lazy(() => ContactInfoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContactInfoCreateWithoutInventorInputSchema),z.lazy(() => ContactInfoUncheckedCreateWithoutInventorInputSchema) ]),
}).strict();

export const PatentInventorCreateWithoutInventorInputSchema: z.ZodType<Prisma.PatentInventorCreateWithoutInventorInput> = z.object({
  Main: z.boolean(),
  Contribution: z.number().optional().nullable(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutInventorsInputSchema)
}).strict();

export const PatentInventorUncheckedCreateWithoutInventorInputSchema: z.ZodType<Prisma.PatentInventorUncheckedCreateWithoutInventorInput> = z.object({
  PatentID: z.number().int(),
  Main: z.boolean(),
  Contribution: z.number().optional().nullable()
}).strict();

export const PatentInventorCreateOrConnectWithoutInventorInputSchema: z.ZodType<Prisma.PatentInventorCreateOrConnectWithoutInventorInput> = z.object({
  where: z.lazy(() => PatentInventorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutInventorInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutInventorInputSchema) ]),
}).strict();

export const PatentInventorCreateManyInventorInputEnvelopeSchema: z.ZodType<Prisma.PatentInventorCreateManyInventorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentInventorCreateManyInventorInputSchema),z.lazy(() => PatentInventorCreateManyInventorInputSchema).array() ]),
}).strict();

export const DepartmentUpsertWithoutInventorsInputSchema: z.ZodType<Prisma.DepartmentUpsertWithoutInventorsInput> = z.object({
  update: z.union([ z.lazy(() => DepartmentUpdateWithoutInventorsInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutInventorsInputSchema) ]),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutInventorsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutInventorsInputSchema) ]),
  where: z.lazy(() => DepartmentWhereInputSchema).optional()
}).strict();

export const DepartmentUpdateToOneWithWhereWithoutInventorsInputSchema: z.ZodType<Prisma.DepartmentUpdateToOneWithWhereWithoutInventorsInput> = z.object({
  where: z.lazy(() => DepartmentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DepartmentUpdateWithoutInventorsInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutInventorsInputSchema) ]),
}).strict();

export const DepartmentUpdateWithoutInventorsInputSchema: z.ZodType<Prisma.DepartmentUpdateWithoutInventorsInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  college: z.lazy(() => CollegeUpdateOneRequiredWithoutDepartmentsNestedInputSchema).optional(),
  patents: z.lazy(() => PatentUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentUncheckedUpdateWithoutInventorsInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateWithoutInventorsInput> = z.object({
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patents: z.lazy(() => PatentUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const ContactInfoUpsertWithoutInventorInputSchema: z.ZodType<Prisma.ContactInfoUpsertWithoutInventorInput> = z.object({
  update: z.union([ z.lazy(() => ContactInfoUpdateWithoutInventorInputSchema),z.lazy(() => ContactInfoUncheckedUpdateWithoutInventorInputSchema) ]),
  create: z.union([ z.lazy(() => ContactInfoCreateWithoutInventorInputSchema),z.lazy(() => ContactInfoUncheckedCreateWithoutInventorInputSchema) ]),
  where: z.lazy(() => ContactInfoWhereInputSchema).optional()
}).strict();

export const ContactInfoUpdateToOneWithWhereWithoutInventorInputSchema: z.ZodType<Prisma.ContactInfoUpdateToOneWithWhereWithoutInventorInput> = z.object({
  where: z.lazy(() => ContactInfoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ContactInfoUpdateWithoutInventorInputSchema),z.lazy(() => ContactInfoUncheckedUpdateWithoutInventorInputSchema) ]),
}).strict();

export const ContactInfoUpdateWithoutInventorInputSchema: z.ZodType<Prisma.ContactInfoUpdateWithoutInventorInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  agencyContact: z.lazy(() => AgencyContactPersonUpdateOneWithoutContactInfoNestedInputSchema).optional()
}).strict();

export const ContactInfoUncheckedUpdateWithoutInventorInputSchema: z.ZodType<Prisma.ContactInfoUncheckedUpdateWithoutInventorInput> = z.object({
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  agencyContact: z.lazy(() => AgencyContactPersonUncheckedUpdateOneWithoutContactInfoNestedInputSchema).optional()
}).strict();

export const PatentInventorUpsertWithWhereUniqueWithoutInventorInputSchema: z.ZodType<Prisma.PatentInventorUpsertWithWhereUniqueWithoutInventorInput> = z.object({
  where: z.lazy(() => PatentInventorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentInventorUpdateWithoutInventorInputSchema),z.lazy(() => PatentInventorUncheckedUpdateWithoutInventorInputSchema) ]),
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutInventorInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutInventorInputSchema) ]),
}).strict();

export const PatentInventorUpdateWithWhereUniqueWithoutInventorInputSchema: z.ZodType<Prisma.PatentInventorUpdateWithWhereUniqueWithoutInventorInput> = z.object({
  where: z.lazy(() => PatentInventorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentInventorUpdateWithoutInventorInputSchema),z.lazy(() => PatentInventorUncheckedUpdateWithoutInventorInputSchema) ]),
}).strict();

export const PatentInventorUpdateManyWithWhereWithoutInventorInputSchema: z.ZodType<Prisma.PatentInventorUpdateManyWithWhereWithoutInventorInput> = z.object({
  where: z.lazy(() => PatentInventorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentInventorUpdateManyMutationInputSchema),z.lazy(() => PatentInventorUncheckedUpdateManyWithoutInventorInputSchema) ]),
}).strict();

export const PatentInventorScalarWhereInputSchema: z.ZodType<Prisma.PatentInventorScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentInventorScalarWhereInputSchema),z.lazy(() => PatentInventorScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentInventorScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentInventorScalarWhereInputSchema),z.lazy(() => PatentInventorScalarWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  InventorID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Main: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  Contribution: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const PatentCreateWithoutInventorsInputSchema: z.ZodType<Prisma.PatentCreateWithoutInventorsInput> = z.object({
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  agencies: z.lazy(() => AgencyPatentCreateNestedManyWithoutPatentInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  college: z.lazy(() => CollegeCreateNestedOneWithoutPatentsInputSchema),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutInventorsInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutInventorsInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  DepartmentID: z.number().int(),
  CollegeID: z.number().int(),
  agencies: z.lazy(() => AgencyPatentUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutInventorsInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutInventorsInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutInventorsInputSchema),z.lazy(() => PatentUncheckedCreateWithoutInventorsInputSchema) ]),
}).strict();

export const InventorCreateWithoutPatentsInputSchema: z.ZodType<Prisma.InventorCreateWithoutPatentsInput> = z.object({
  Name: z.string(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutInventorsInputSchema),
  contactInfo: z.lazy(() => ContactInfoCreateNestedOneWithoutInventorInputSchema).optional()
}).strict();

export const InventorUncheckedCreateWithoutPatentsInputSchema: z.ZodType<Prisma.InventorUncheckedCreateWithoutPatentsInput> = z.object({
  InventorID: z.number().int().optional(),
  Name: z.string(),
  DepartmentID: z.number().int(),
  ContactInfoID: z.number().int().optional().nullable()
}).strict();

export const InventorCreateOrConnectWithoutPatentsInputSchema: z.ZodType<Prisma.InventorCreateOrConnectWithoutPatentsInput> = z.object({
  where: z.lazy(() => InventorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InventorCreateWithoutPatentsInputSchema),z.lazy(() => InventorUncheckedCreateWithoutPatentsInputSchema) ]),
}).strict();

export const PatentUpsertWithoutInventorsInputSchema: z.ZodType<Prisma.PatentUpsertWithoutInventorsInput> = z.object({
  update: z.union([ z.lazy(() => PatentUpdateWithoutInventorsInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutInventorsInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutInventorsInputSchema),z.lazy(() => PatentUncheckedCreateWithoutInventorsInputSchema) ]),
  where: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const PatentUpdateToOneWithWhereWithoutInventorsInputSchema: z.ZodType<Prisma.PatentUpdateToOneWithWhereWithoutInventorsInput> = z.object({
  where: z.lazy(() => PatentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentUpdateWithoutInventorsInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutInventorsInputSchema) ]),
}).strict();

export const PatentUpdateWithoutInventorsInputSchema: z.ZodType<Prisma.PatentUpdateWithoutInventorsInput> = z.object({
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUpdateManyWithoutPatentNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  college: z.lazy(() => CollegeUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutInventorsInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutInventorsInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const InventorUpsertWithoutPatentsInputSchema: z.ZodType<Prisma.InventorUpsertWithoutPatentsInput> = z.object({
  update: z.union([ z.lazy(() => InventorUpdateWithoutPatentsInputSchema),z.lazy(() => InventorUncheckedUpdateWithoutPatentsInputSchema) ]),
  create: z.union([ z.lazy(() => InventorCreateWithoutPatentsInputSchema),z.lazy(() => InventorUncheckedCreateWithoutPatentsInputSchema) ]),
  where: z.lazy(() => InventorWhereInputSchema).optional()
}).strict();

export const InventorUpdateToOneWithWhereWithoutPatentsInputSchema: z.ZodType<Prisma.InventorUpdateToOneWithWhereWithoutPatentsInput> = z.object({
  where: z.lazy(() => InventorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InventorUpdateWithoutPatentsInputSchema),z.lazy(() => InventorUncheckedUpdateWithoutPatentsInputSchema) ]),
}).strict();

export const InventorUpdateWithoutPatentsInputSchema: z.ZodType<Prisma.InventorUpdateWithoutPatentsInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutInventorsNestedInputSchema).optional(),
  contactInfo: z.lazy(() => ContactInfoUpdateOneWithoutInventorNestedInputSchema).optional()
}).strict();

export const InventorUncheckedUpdateWithoutPatentsInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateWithoutPatentsInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgencyPatentCreateWithoutPatentInputSchema: z.ZodType<Prisma.AgencyPatentCreateWithoutPatentInput> = z.object({
  FileCode: z.string(),
  Role: z.string(),
  Details: z.string().optional().nullable(),
  agency: z.lazy(() => AgencyCreateNestedOneWithoutPatentsInputSchema)
}).strict();

export const AgencyPatentUncheckedCreateWithoutPatentInputSchema: z.ZodType<Prisma.AgencyPatentUncheckedCreateWithoutPatentInput> = z.object({
  AgencyID: z.number().int(),
  FileCode: z.string(),
  Role: z.string(),
  Details: z.string().optional().nullable()
}).strict();

export const AgencyPatentCreateOrConnectWithoutPatentInputSchema: z.ZodType<Prisma.AgencyPatentCreateOrConnectWithoutPatentInput> = z.object({
  where: z.lazy(() => AgencyPatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AgencyPatentCreateWithoutPatentInputSchema),z.lazy(() => AgencyPatentUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const AgencyPatentCreateManyPatentInputEnvelopeSchema: z.ZodType<Prisma.AgencyPatentCreateManyPatentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AgencyPatentCreateManyPatentInputSchema),z.lazy(() => AgencyPatentCreateManyPatentInputSchema).array() ]),
}).strict();

export const DepartmentCreateWithoutPatentsInputSchema: z.ZodType<Prisma.DepartmentCreateWithoutPatentsInput> = z.object({
  Name: z.string(),
  Description: z.string().optional().nullable(),
  college: z.lazy(() => CollegeCreateNestedOneWithoutDepartmentsInputSchema),
  inventors: z.lazy(() => InventorCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentUncheckedCreateWithoutPatentsInputSchema: z.ZodType<Prisma.DepartmentUncheckedCreateWithoutPatentsInput> = z.object({
  DepartmentID: z.number().int().optional(),
  Name: z.string(),
  CollegeID: z.number().int(),
  Description: z.string().optional().nullable(),
  inventors: z.lazy(() => InventorUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentCreateOrConnectWithoutPatentsInputSchema: z.ZodType<Prisma.DepartmentCreateOrConnectWithoutPatentsInput> = z.object({
  where: z.lazy(() => DepartmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutPatentsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutPatentsInputSchema) ]),
}).strict();

export const CollegeCreateWithoutPatentsInputSchema: z.ZodType<Prisma.CollegeCreateWithoutPatentsInput> = z.object({
  Name: z.string(),
  Description: z.string().optional().nullable(),
  departments: z.lazy(() => DepartmentCreateNestedManyWithoutCollegeInputSchema).optional()
}).strict();

export const CollegeUncheckedCreateWithoutPatentsInputSchema: z.ZodType<Prisma.CollegeUncheckedCreateWithoutPatentsInput> = z.object({
  CollegeID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable(),
  departments: z.lazy(() => DepartmentUncheckedCreateNestedManyWithoutCollegeInputSchema).optional()
}).strict();

export const CollegeCreateOrConnectWithoutPatentsInputSchema: z.ZodType<Prisma.CollegeCreateOrConnectWithoutPatentsInput> = z.object({
  where: z.lazy(() => CollegeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CollegeCreateWithoutPatentsInputSchema),z.lazy(() => CollegeUncheckedCreateWithoutPatentsInputSchema) ]),
}).strict();

export const PatentApplicationDataCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateWithoutPatentInput> = z.object({
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  PatentNumber: z.string().optional().nullable(),
  ApplicationNumber: z.string().optional().nullable(),
  FilingDate: z.coerce.date().optional().nullable(),
  PublicationDate: z.coerce.date().optional().nullable(),
  country: z.lazy(() => CountryCreateNestedOneWithoutApplicationsInputSchema).optional()
}).strict();

export const PatentApplicationDataUncheckedCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedCreateWithoutPatentInput> = z.object({
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  PatentNumber: z.string().optional().nullable(),
  ApplicationNumber: z.string().optional().nullable(),
  FilingDate: z.coerce.date().optional().nullable(),
  PublicationDate: z.coerce.date().optional().nullable()
}).strict();

export const PatentApplicationDataCreateOrConnectWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateOrConnectWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentFundingCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingCreateWithoutPatentInput> = z.object({
  FundingAgency: z.string(),
  ProjectNumber: z.string(),
  plan: z.lazy(() => FundingPlanCreateNestedOneWithoutFundingsInputSchema)
}).strict();

export const PatentFundingUncheckedCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUncheckedCreateWithoutPatentInput> = z.object({
  FundingID: z.number().int().optional(),
  FundingAgency: z.string(),
  ProjectNumber: z.string(),
  PlanID: z.number().int()
}).strict();

export const PatentFundingCreateOrConnectWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingCreateOrConnectWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentFundingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentFundingCreateManyPatentInputEnvelopeSchema: z.ZodType<Prisma.PatentFundingCreateManyPatentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentFundingCreateManyPatentInputSchema),z.lazy(() => PatentFundingCreateManyPatentInputSchema).array() ]),
}).strict();

export const PatentInventorCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentInventorCreateWithoutPatentInput> = z.object({
  Main: z.boolean(),
  Contribution: z.number().optional().nullable(),
  inventor: z.lazy(() => InventorCreateNestedOneWithoutPatentsInputSchema)
}).strict();

export const PatentInventorUncheckedCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentInventorUncheckedCreateWithoutPatentInput> = z.object({
  InventorID: z.number().int(),
  Main: z.boolean(),
  Contribution: z.number().optional().nullable()
}).strict();

export const PatentInventorCreateOrConnectWithoutPatentInputSchema: z.ZodType<Prisma.PatentInventorCreateOrConnectWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentInventorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentInventorCreateManyPatentInputEnvelopeSchema: z.ZodType<Prisma.PatentInventorCreateManyPatentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentInventorCreateManyPatentInputSchema),z.lazy(() => PatentInventorCreateManyPatentInputSchema).array() ]),
}).strict();

export const PatentStatusCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentStatusCreateWithoutPatentInput> = z.object({
  ExpiryDate: z.coerce.date().optional().nullable(),
  Status: z.string(),
  TechnicalCommitteeReviewDate: z.coerce.date().optional().nullable(),
  MaintenanceYear: z.number().int().optional().nullable(),
  MaintenanceStartDate: z.coerce.date().optional().nullable(),
  MaintenanceEndDate: z.coerce.date().optional().nullable()
}).strict();

export const PatentStatusUncheckedCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentStatusUncheckedCreateWithoutPatentInput> = z.object({
  ExpiryDate: z.coerce.date().optional().nullable(),
  Status: z.string(),
  TechnicalCommitteeReviewDate: z.coerce.date().optional().nullable(),
  MaintenanceYear: z.number().int().optional().nullable(),
  MaintenanceStartDate: z.coerce.date().optional().nullable(),
  MaintenanceEndDate: z.coerce.date().optional().nullable()
}).strict();

export const PatentStatusCreateOrConnectWithoutPatentInputSchema: z.ZodType<Prisma.PatentStatusCreateOrConnectWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentStatusWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentStatusCreateWithoutPatentInputSchema),z.lazy(() => PatentStatusUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentTechnicalAttributesCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesCreateWithoutPatentInput> = z.object({
  MaturityLevel: z.string().optional().nullable(),
  keywords: z.lazy(() => TechnicalKeywordCreateNestedManyWithoutPatentTechnicalAttributesInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesUncheckedCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUncheckedCreateWithoutPatentInput> = z.object({
  MaturityLevel: z.string().optional().nullable(),
  keywords: z.lazy(() => TechnicalKeywordUncheckedCreateNestedManyWithoutPatentTechnicalAttributesInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesCreateOrConnectWithoutPatentInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesCreateOrConnectWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const AgencyPatentUpsertWithWhereUniqueWithoutPatentInputSchema: z.ZodType<Prisma.AgencyPatentUpsertWithWhereUniqueWithoutPatentInput> = z.object({
  where: z.lazy(() => AgencyPatentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AgencyPatentUpdateWithoutPatentInputSchema),z.lazy(() => AgencyPatentUncheckedUpdateWithoutPatentInputSchema) ]),
  create: z.union([ z.lazy(() => AgencyPatentCreateWithoutPatentInputSchema),z.lazy(() => AgencyPatentUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const AgencyPatentUpdateWithWhereUniqueWithoutPatentInputSchema: z.ZodType<Prisma.AgencyPatentUpdateWithWhereUniqueWithoutPatentInput> = z.object({
  where: z.lazy(() => AgencyPatentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AgencyPatentUpdateWithoutPatentInputSchema),z.lazy(() => AgencyPatentUncheckedUpdateWithoutPatentInputSchema) ]),
}).strict();

export const AgencyPatentUpdateManyWithWhereWithoutPatentInputSchema: z.ZodType<Prisma.AgencyPatentUpdateManyWithWhereWithoutPatentInput> = z.object({
  where: z.lazy(() => AgencyPatentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AgencyPatentUpdateManyMutationInputSchema),z.lazy(() => AgencyPatentUncheckedUpdateManyWithoutPatentInputSchema) ]),
}).strict();

export const DepartmentUpsertWithoutPatentsInputSchema: z.ZodType<Prisma.DepartmentUpsertWithoutPatentsInput> = z.object({
  update: z.union([ z.lazy(() => DepartmentUpdateWithoutPatentsInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutPatentsInputSchema) ]),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutPatentsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutPatentsInputSchema) ]),
  where: z.lazy(() => DepartmentWhereInputSchema).optional()
}).strict();

export const DepartmentUpdateToOneWithWhereWithoutPatentsInputSchema: z.ZodType<Prisma.DepartmentUpdateToOneWithWhereWithoutPatentsInput> = z.object({
  where: z.lazy(() => DepartmentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DepartmentUpdateWithoutPatentsInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutPatentsInputSchema) ]),
}).strict();

export const DepartmentUpdateWithoutPatentsInputSchema: z.ZodType<Prisma.DepartmentUpdateWithoutPatentsInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  college: z.lazy(() => CollegeUpdateOneRequiredWithoutDepartmentsNestedInputSchema).optional(),
  inventors: z.lazy(() => InventorUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentUncheckedUpdateWithoutPatentsInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateWithoutPatentsInput> = z.object({
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventors: z.lazy(() => InventorUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const CollegeUpsertWithoutPatentsInputSchema: z.ZodType<Prisma.CollegeUpsertWithoutPatentsInput> = z.object({
  update: z.union([ z.lazy(() => CollegeUpdateWithoutPatentsInputSchema),z.lazy(() => CollegeUncheckedUpdateWithoutPatentsInputSchema) ]),
  create: z.union([ z.lazy(() => CollegeCreateWithoutPatentsInputSchema),z.lazy(() => CollegeUncheckedCreateWithoutPatentsInputSchema) ]),
  where: z.lazy(() => CollegeWhereInputSchema).optional()
}).strict();

export const CollegeUpdateToOneWithWhereWithoutPatentsInputSchema: z.ZodType<Prisma.CollegeUpdateToOneWithWhereWithoutPatentsInput> = z.object({
  where: z.lazy(() => CollegeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CollegeUpdateWithoutPatentsInputSchema),z.lazy(() => CollegeUncheckedUpdateWithoutPatentsInputSchema) ]),
}).strict();

export const CollegeUpdateWithoutPatentsInputSchema: z.ZodType<Prisma.CollegeUpdateWithoutPatentsInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departments: z.lazy(() => DepartmentUpdateManyWithoutCollegeNestedInputSchema).optional()
}).strict();

export const CollegeUncheckedUpdateWithoutPatentsInputSchema: z.ZodType<Prisma.CollegeUncheckedUpdateWithoutPatentsInput> = z.object({
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departments: z.lazy(() => DepartmentUncheckedUpdateManyWithoutCollegeNestedInputSchema).optional()
}).strict();

export const PatentApplicationDataUpsertWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataUpsertWithoutPatentInput> = z.object({
  update: z.union([ z.lazy(() => PatentApplicationDataUpdateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedUpdateWithoutPatentInputSchema) ]),
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutPatentInputSchema) ]),
  where: z.lazy(() => PatentApplicationDataWhereInputSchema).optional()
}).strict();

export const PatentApplicationDataUpdateToOneWithWhereWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataUpdateToOneWithWhereWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentApplicationDataWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentApplicationDataUpdateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedUpdateWithoutPatentInputSchema) ]),
}).strict();

export const PatentApplicationDataUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataUpdateWithoutPatentInput> = z.object({
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.lazy(() => CountryUpdateOneWithoutApplicationsNestedInputSchema).optional()
}).strict();

export const PatentApplicationDataUncheckedUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedUpdateWithoutPatentInput> = z.object({
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentFundingUpsertWithWhereUniqueWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUpsertWithWhereUniqueWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentFundingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentFundingUpdateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutPatentInputSchema) ]),
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentFundingUpdateWithWhereUniqueWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUpdateWithWhereUniqueWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentFundingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentFundingUpdateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutPatentInputSchema) ]),
}).strict();

export const PatentFundingUpdateManyWithWhereWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUpdateManyWithWhereWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentFundingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentFundingUpdateManyMutationInputSchema),z.lazy(() => PatentFundingUncheckedUpdateManyWithoutPatentInputSchema) ]),
}).strict();

export const PatentInventorUpsertWithWhereUniqueWithoutPatentInputSchema: z.ZodType<Prisma.PatentInventorUpsertWithWhereUniqueWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentInventorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentInventorUpdateWithoutPatentInputSchema),z.lazy(() => PatentInventorUncheckedUpdateWithoutPatentInputSchema) ]),
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentInventorUpdateWithWhereUniqueWithoutPatentInputSchema: z.ZodType<Prisma.PatentInventorUpdateWithWhereUniqueWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentInventorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentInventorUpdateWithoutPatentInputSchema),z.lazy(() => PatentInventorUncheckedUpdateWithoutPatentInputSchema) ]),
}).strict();

export const PatentInventorUpdateManyWithWhereWithoutPatentInputSchema: z.ZodType<Prisma.PatentInventorUpdateManyWithWhereWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentInventorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentInventorUpdateManyMutationInputSchema),z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentInputSchema) ]),
}).strict();

export const PatentStatusUpsertWithoutPatentInputSchema: z.ZodType<Prisma.PatentStatusUpsertWithoutPatentInput> = z.object({
  update: z.union([ z.lazy(() => PatentStatusUpdateWithoutPatentInputSchema),z.lazy(() => PatentStatusUncheckedUpdateWithoutPatentInputSchema) ]),
  create: z.union([ z.lazy(() => PatentStatusCreateWithoutPatentInputSchema),z.lazy(() => PatentStatusUncheckedCreateWithoutPatentInputSchema) ]),
  where: z.lazy(() => PatentStatusWhereInputSchema).optional()
}).strict();

export const PatentStatusUpdateToOneWithWhereWithoutPatentInputSchema: z.ZodType<Prisma.PatentStatusUpdateToOneWithWhereWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentStatusWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentStatusUpdateWithoutPatentInputSchema),z.lazy(() => PatentStatusUncheckedUpdateWithoutPatentInputSchema) ]),
}).strict();

export const PatentStatusUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentStatusUpdateWithoutPatentInput> = z.object({
  ExpiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TechnicalCommitteeReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceEndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentStatusUncheckedUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentStatusUncheckedUpdateWithoutPatentInput> = z.object({
  ExpiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TechnicalCommitteeReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MaintenanceEndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentTechnicalAttributesUpsertWithoutPatentInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpsertWithoutPatentInput> = z.object({
  update: z.union([ z.lazy(() => PatentTechnicalAttributesUpdateWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedUpdateWithoutPatentInputSchema) ]),
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutPatentInputSchema) ]),
  where: z.lazy(() => PatentTechnicalAttributesWhereInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesUpdateToOneWithWhereWithoutPatentInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpdateToOneWithWhereWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentTechnicalAttributesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentTechnicalAttributesUpdateWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedUpdateWithoutPatentInputSchema) ]),
}).strict();

export const PatentTechnicalAttributesUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpdateWithoutPatentInput> = z.object({
  MaturityLevel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  keywords: z.lazy(() => TechnicalKeywordUpdateManyWithoutPatentTechnicalAttributesNestedInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesUncheckedUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUncheckedUpdateWithoutPatentInput> = z.object({
  MaturityLevel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  keywords: z.lazy(() => TechnicalKeywordUncheckedUpdateManyWithoutPatentTechnicalAttributesNestedInputSchema).optional()
}).strict();

export const PatentCreateWithoutStatusInputSchema: z.ZodType<Prisma.PatentCreateWithoutStatusInput> = z.object({
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  agencies: z.lazy(() => AgencyPatentCreateNestedManyWithoutPatentInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  college: z.lazy(() => CollegeCreateNestedOneWithoutPatentsInputSchema),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutStatusInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutStatusInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  DepartmentID: z.number().int(),
  CollegeID: z.number().int(),
  agencies: z.lazy(() => AgencyPatentUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutStatusInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutStatusInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutStatusInputSchema),z.lazy(() => PatentUncheckedCreateWithoutStatusInputSchema) ]),
}).strict();

export const PatentUpsertWithoutStatusInputSchema: z.ZodType<Prisma.PatentUpsertWithoutStatusInput> = z.object({
  update: z.union([ z.lazy(() => PatentUpdateWithoutStatusInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutStatusInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutStatusInputSchema),z.lazy(() => PatentUncheckedCreateWithoutStatusInputSchema) ]),
  where: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const PatentUpdateToOneWithWhereWithoutStatusInputSchema: z.ZodType<Prisma.PatentUpdateToOneWithWhereWithoutStatusInput> = z.object({
  where: z.lazy(() => PatentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentUpdateWithoutStatusInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutStatusInputSchema) ]),
}).strict();

export const PatentUpdateWithoutStatusInputSchema: z.ZodType<Prisma.PatentUpdateWithoutStatusInput> = z.object({
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUpdateManyWithoutPatentNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  college: z.lazy(() => CollegeUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutStatusInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutStatusInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const CountryCreateWithoutApplicationsInputSchema: z.ZodType<Prisma.CountryCreateWithoutApplicationsInput> = z.object({
  CountryName: z.string(),
  ISOCode: z.string()
}).strict();

export const CountryUncheckedCreateWithoutApplicationsInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutApplicationsInput> = z.object({
  CountryID: z.number().int().optional(),
  CountryName: z.string(),
  ISOCode: z.string()
}).strict();

export const CountryCreateOrConnectWithoutApplicationsInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutApplicationsInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutApplicationsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutApplicationsInputSchema) ]),
}).strict();

export const PatentCreateWithoutApplicationInputSchema: z.ZodType<Prisma.PatentCreateWithoutApplicationInput> = z.object({
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  agencies: z.lazy(() => AgencyPatentCreateNestedManyWithoutPatentInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  college: z.lazy(() => CollegeCreateNestedOneWithoutPatentsInputSchema),
  funding: z.lazy(() => PatentFundingCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutApplicationInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutApplicationInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  DepartmentID: z.number().int(),
  CollegeID: z.number().int(),
  agencies: z.lazy(() => AgencyPatentUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutApplicationInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutApplicationInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutApplicationInputSchema),z.lazy(() => PatentUncheckedCreateWithoutApplicationInputSchema) ]),
}).strict();

export const CountryUpsertWithoutApplicationsInputSchema: z.ZodType<Prisma.CountryUpsertWithoutApplicationsInput> = z.object({
  update: z.union([ z.lazy(() => CountryUpdateWithoutApplicationsInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutApplicationsInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutApplicationsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutApplicationsInputSchema) ]),
  where: z.lazy(() => CountryWhereInputSchema).optional()
}).strict();

export const CountryUpdateToOneWithWhereWithoutApplicationsInputSchema: z.ZodType<Prisma.CountryUpdateToOneWithWhereWithoutApplicationsInput> = z.object({
  where: z.lazy(() => CountryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CountryUpdateWithoutApplicationsInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutApplicationsInputSchema) ]),
}).strict();

export const CountryUpdateWithoutApplicationsInputSchema: z.ZodType<Prisma.CountryUpdateWithoutApplicationsInput> = z.object({
  CountryName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ISOCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CountryUncheckedUpdateWithoutApplicationsInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutApplicationsInput> = z.object({
  CountryID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CountryName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ISOCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentUpsertWithoutApplicationInputSchema: z.ZodType<Prisma.PatentUpsertWithoutApplicationInput> = z.object({
  update: z.union([ z.lazy(() => PatentUpdateWithoutApplicationInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutApplicationInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutApplicationInputSchema),z.lazy(() => PatentUncheckedCreateWithoutApplicationInputSchema) ]),
  where: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const PatentUpdateToOneWithWhereWithoutApplicationInputSchema: z.ZodType<Prisma.PatentUpdateToOneWithWhereWithoutApplicationInput> = z.object({
  where: z.lazy(() => PatentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentUpdateWithoutApplicationInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutApplicationInputSchema) ]),
}).strict();

export const PatentUpdateWithoutApplicationInputSchema: z.ZodType<Prisma.PatentUpdateWithoutApplicationInput> = z.object({
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUpdateManyWithoutPatentNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  college: z.lazy(() => CollegeUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutApplicationInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutApplicationInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const TechnicalKeywordCreateWithoutPatentTechnicalAttributesInputSchema: z.ZodType<Prisma.TechnicalKeywordCreateWithoutPatentTechnicalAttributesInput> = z.object({
  Keyword: z.string()
}).strict();

export const TechnicalKeywordUncheckedCreateWithoutPatentTechnicalAttributesInputSchema: z.ZodType<Prisma.TechnicalKeywordUncheckedCreateWithoutPatentTechnicalAttributesInput> = z.object({
  KeywordID: z.number().int().optional(),
  Keyword: z.string()
}).strict();

export const TechnicalKeywordCreateOrConnectWithoutPatentTechnicalAttributesInputSchema: z.ZodType<Prisma.TechnicalKeywordCreateOrConnectWithoutPatentTechnicalAttributesInput> = z.object({
  where: z.lazy(() => TechnicalKeywordWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TechnicalKeywordCreateWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUncheckedCreateWithoutPatentTechnicalAttributesInputSchema) ]),
}).strict();

export const PatentCreateWithoutTechnicalInputSchema: z.ZodType<Prisma.PatentCreateWithoutTechnicalInput> = z.object({
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  agencies: z.lazy(() => AgencyPatentCreateNestedManyWithoutPatentInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  college: z.lazy(() => CollegeCreateNestedOneWithoutPatentsInputSchema),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutTechnicalInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutTechnicalInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  DepartmentID: z.number().int(),
  CollegeID: z.number().int(),
  agencies: z.lazy(() => AgencyPatentUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutTechnicalInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutTechnicalInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutTechnicalInputSchema),z.lazy(() => PatentUncheckedCreateWithoutTechnicalInputSchema) ]),
}).strict();

export const TechnicalKeywordUpsertWithWhereUniqueWithoutPatentTechnicalAttributesInputSchema: z.ZodType<Prisma.TechnicalKeywordUpsertWithWhereUniqueWithoutPatentTechnicalAttributesInput> = z.object({
  where: z.lazy(() => TechnicalKeywordWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TechnicalKeywordUpdateWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUncheckedUpdateWithoutPatentTechnicalAttributesInputSchema) ]),
  create: z.union([ z.lazy(() => TechnicalKeywordCreateWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUncheckedCreateWithoutPatentTechnicalAttributesInputSchema) ]),
}).strict();

export const TechnicalKeywordUpdateWithWhereUniqueWithoutPatentTechnicalAttributesInputSchema: z.ZodType<Prisma.TechnicalKeywordUpdateWithWhereUniqueWithoutPatentTechnicalAttributesInput> = z.object({
  where: z.lazy(() => TechnicalKeywordWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TechnicalKeywordUpdateWithoutPatentTechnicalAttributesInputSchema),z.lazy(() => TechnicalKeywordUncheckedUpdateWithoutPatentTechnicalAttributesInputSchema) ]),
}).strict();

export const TechnicalKeywordUpdateManyWithWhereWithoutPatentTechnicalAttributesInputSchema: z.ZodType<Prisma.TechnicalKeywordUpdateManyWithWhereWithoutPatentTechnicalAttributesInput> = z.object({
  where: z.lazy(() => TechnicalKeywordScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TechnicalKeywordUpdateManyMutationInputSchema),z.lazy(() => TechnicalKeywordUncheckedUpdateManyWithoutPatentTechnicalAttributesInputSchema) ]),
}).strict();

export const TechnicalKeywordScalarWhereInputSchema: z.ZodType<Prisma.TechnicalKeywordScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TechnicalKeywordScalarWhereInputSchema),z.lazy(() => TechnicalKeywordScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechnicalKeywordScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechnicalKeywordScalarWhereInputSchema),z.lazy(() => TechnicalKeywordScalarWhereInputSchema).array() ]).optional(),
  KeywordID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Keyword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PatentUpsertWithoutTechnicalInputSchema: z.ZodType<Prisma.PatentUpsertWithoutTechnicalInput> = z.object({
  update: z.union([ z.lazy(() => PatentUpdateWithoutTechnicalInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutTechnicalInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutTechnicalInputSchema),z.lazy(() => PatentUncheckedCreateWithoutTechnicalInputSchema) ]),
  where: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const PatentUpdateToOneWithWhereWithoutTechnicalInputSchema: z.ZodType<Prisma.PatentUpdateToOneWithWhereWithoutTechnicalInput> = z.object({
  where: z.lazy(() => PatentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentUpdateWithoutTechnicalInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutTechnicalInputSchema) ]),
}).strict();

export const PatentUpdateWithoutTechnicalInputSchema: z.ZodType<Prisma.PatentUpdateWithoutTechnicalInput> = z.object({
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUpdateManyWithoutPatentNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  college: z.lazy(() => CollegeUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutTechnicalInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutTechnicalInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesCreateWithoutKeywordsInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesCreateWithoutKeywordsInput> = z.object({
  MaturityLevel: z.string().optional().nullable(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutTechnicalInputSchema)
}).strict();

export const PatentTechnicalAttributesUncheckedCreateWithoutKeywordsInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUncheckedCreateWithoutKeywordsInput> = z.object({
  PatentID: z.number().int(),
  MaturityLevel: z.string().optional().nullable()
}).strict();

export const PatentTechnicalAttributesCreateOrConnectWithoutKeywordsInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesCreateOrConnectWithoutKeywordsInput> = z.object({
  where: z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutKeywordsInputSchema) ]),
}).strict();

export const PatentTechnicalAttributesUpsertWithWhereUniqueWithoutKeywordsInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpsertWithWhereUniqueWithoutKeywordsInput> = z.object({
  where: z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentTechnicalAttributesUpdateWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedUpdateWithoutKeywordsInputSchema) ]),
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutKeywordsInputSchema) ]),
}).strict();

export const PatentTechnicalAttributesUpdateWithWhereUniqueWithoutKeywordsInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpdateWithWhereUniqueWithoutKeywordsInput> = z.object({
  where: z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentTechnicalAttributesUpdateWithoutKeywordsInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedUpdateWithoutKeywordsInputSchema) ]),
}).strict();

export const PatentTechnicalAttributesUpdateManyWithWhereWithoutKeywordsInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpdateManyWithWhereWithoutKeywordsInput> = z.object({
  where: z.lazy(() => PatentTechnicalAttributesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentTechnicalAttributesUpdateManyMutationInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedUpdateManyWithoutKeywordsInputSchema) ]),
}).strict();

export const PatentTechnicalAttributesScalarWhereInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentTechnicalAttributesScalarWhereInputSchema),z.lazy(() => PatentTechnicalAttributesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentTechnicalAttributesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentTechnicalAttributesScalarWhereInputSchema),z.lazy(() => PatentTechnicalAttributesScalarWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  MaturityLevel: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const DepartmentCreateWithoutCollegeInputSchema: z.ZodType<Prisma.DepartmentCreateWithoutCollegeInput> = z.object({
  Name: z.string(),
  Description: z.string().optional().nullable(),
  inventors: z.lazy(() => InventorCreateNestedManyWithoutDepartmentInputSchema).optional(),
  patents: z.lazy(() => PatentCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentUncheckedCreateWithoutCollegeInputSchema: z.ZodType<Prisma.DepartmentUncheckedCreateWithoutCollegeInput> = z.object({
  DepartmentID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable(),
  inventors: z.lazy(() => InventorUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional(),
  patents: z.lazy(() => PatentUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentCreateOrConnectWithoutCollegeInputSchema: z.ZodType<Prisma.DepartmentCreateOrConnectWithoutCollegeInput> = z.object({
  where: z.lazy(() => DepartmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema) ]),
}).strict();

export const DepartmentCreateManyCollegeInputEnvelopeSchema: z.ZodType<Prisma.DepartmentCreateManyCollegeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DepartmentCreateManyCollegeInputSchema),z.lazy(() => DepartmentCreateManyCollegeInputSchema).array() ]),
}).strict();

export const PatentCreateWithoutCollegeInputSchema: z.ZodType<Prisma.PatentCreateWithoutCollegeInput> = z.object({
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  agencies: z.lazy(() => AgencyPatentCreateNestedManyWithoutPatentInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutCollegeInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutCollegeInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  DepartmentID: z.number().int(),
  agencies: z.lazy(() => AgencyPatentUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutCollegeInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutCollegeInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutCollegeInputSchema),z.lazy(() => PatentUncheckedCreateWithoutCollegeInputSchema) ]),
}).strict();

export const PatentCreateManyCollegeInputEnvelopeSchema: z.ZodType<Prisma.PatentCreateManyCollegeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentCreateManyCollegeInputSchema),z.lazy(() => PatentCreateManyCollegeInputSchema).array() ]),
}).strict();

export const DepartmentUpsertWithWhereUniqueWithoutCollegeInputSchema: z.ZodType<Prisma.DepartmentUpsertWithWhereUniqueWithoutCollegeInput> = z.object({
  where: z.lazy(() => DepartmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DepartmentUpdateWithoutCollegeInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutCollegeInputSchema) ]),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema) ]),
}).strict();

export const DepartmentUpdateWithWhereUniqueWithoutCollegeInputSchema: z.ZodType<Prisma.DepartmentUpdateWithWhereUniqueWithoutCollegeInput> = z.object({
  where: z.lazy(() => DepartmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DepartmentUpdateWithoutCollegeInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutCollegeInputSchema) ]),
}).strict();

export const DepartmentUpdateManyWithWhereWithoutCollegeInputSchema: z.ZodType<Prisma.DepartmentUpdateManyWithWhereWithoutCollegeInput> = z.object({
  where: z.lazy(() => DepartmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DepartmentUpdateManyMutationInputSchema),z.lazy(() => DepartmentUncheckedUpdateManyWithoutCollegeInputSchema) ]),
}).strict();

export const DepartmentScalarWhereInputSchema: z.ZodType<Prisma.DepartmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DepartmentScalarWhereInputSchema),z.lazy(() => DepartmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentScalarWhereInputSchema),z.lazy(() => DepartmentScalarWhereInputSchema).array() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  CollegeID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PatentUpsertWithWhereUniqueWithoutCollegeInputSchema: z.ZodType<Prisma.PatentUpsertWithWhereUniqueWithoutCollegeInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentUpdateWithoutCollegeInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutCollegeInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutCollegeInputSchema),z.lazy(() => PatentUncheckedCreateWithoutCollegeInputSchema) ]),
}).strict();

export const PatentUpdateWithWhereUniqueWithoutCollegeInputSchema: z.ZodType<Prisma.PatentUpdateWithWhereUniqueWithoutCollegeInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentUpdateWithoutCollegeInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutCollegeInputSchema) ]),
}).strict();

export const PatentUpdateManyWithWhereWithoutCollegeInputSchema: z.ZodType<Prisma.PatentUpdateManyWithWhereWithoutCollegeInput> = z.object({
  where: z.lazy(() => PatentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentUpdateManyMutationInputSchema),z.lazy(() => PatentUncheckedUpdateManyWithoutCollegeInputSchema) ]),
}).strict();

export const PatentScalarWhereInputSchema: z.ZodType<Prisma.PatentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentScalarWhereInputSchema),z.lazy(() => PatentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentScalarWhereInputSchema),z.lazy(() => PatentScalarWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Year: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  InternalID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DraftTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  TitleEnglish: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  CollegeID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const CollegeCreateWithoutDepartmentsInputSchema: z.ZodType<Prisma.CollegeCreateWithoutDepartmentsInput> = z.object({
  Name: z.string(),
  Description: z.string().optional().nullable(),
  patents: z.lazy(() => PatentCreateNestedManyWithoutCollegeInputSchema).optional()
}).strict();

export const CollegeUncheckedCreateWithoutDepartmentsInputSchema: z.ZodType<Prisma.CollegeUncheckedCreateWithoutDepartmentsInput> = z.object({
  CollegeID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable(),
  patents: z.lazy(() => PatentUncheckedCreateNestedManyWithoutCollegeInputSchema).optional()
}).strict();

export const CollegeCreateOrConnectWithoutDepartmentsInputSchema: z.ZodType<Prisma.CollegeCreateOrConnectWithoutDepartmentsInput> = z.object({
  where: z.lazy(() => CollegeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CollegeCreateWithoutDepartmentsInputSchema),z.lazy(() => CollegeUncheckedCreateWithoutDepartmentsInputSchema) ]),
}).strict();

export const InventorCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorCreateWithoutDepartmentInput> = z.object({
  Name: z.string(),
  contactInfo: z.lazy(() => ContactInfoCreateNestedOneWithoutInventorInputSchema).optional(),
  patents: z.lazy(() => PatentInventorCreateNestedManyWithoutInventorInputSchema).optional()
}).strict();

export const InventorUncheckedCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorUncheckedCreateWithoutDepartmentInput> = z.object({
  InventorID: z.number().int().optional(),
  Name: z.string(),
  ContactInfoID: z.number().int().optional().nullable(),
  patents: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutInventorInputSchema).optional()
}).strict();

export const InventorCreateOrConnectWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorCreateOrConnectWithoutDepartmentInput> = z.object({
  where: z.lazy(() => InventorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InventorCreateWithoutDepartmentInputSchema),z.lazy(() => InventorUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const InventorCreateManyDepartmentInputEnvelopeSchema: z.ZodType<Prisma.InventorCreateManyDepartmentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InventorCreateManyDepartmentInputSchema),z.lazy(() => InventorCreateManyDepartmentInputSchema).array() ]),
}).strict();

export const PatentCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentCreateWithoutDepartmentInput> = z.object({
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  agencies: z.lazy(() => AgencyPatentCreateNestedManyWithoutPatentInputSchema).optional(),
  college: z.lazy(() => CollegeCreateNestedOneWithoutPatentsInputSchema),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutDepartmentInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CollegeID: z.number().int(),
  agencies: z.lazy(() => AgencyPatentUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutDepartmentInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutDepartmentInputSchema),z.lazy(() => PatentUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const PatentCreateManyDepartmentInputEnvelopeSchema: z.ZodType<Prisma.PatentCreateManyDepartmentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentCreateManyDepartmentInputSchema),z.lazy(() => PatentCreateManyDepartmentInputSchema).array() ]),
}).strict();

export const CollegeUpsertWithoutDepartmentsInputSchema: z.ZodType<Prisma.CollegeUpsertWithoutDepartmentsInput> = z.object({
  update: z.union([ z.lazy(() => CollegeUpdateWithoutDepartmentsInputSchema),z.lazy(() => CollegeUncheckedUpdateWithoutDepartmentsInputSchema) ]),
  create: z.union([ z.lazy(() => CollegeCreateWithoutDepartmentsInputSchema),z.lazy(() => CollegeUncheckedCreateWithoutDepartmentsInputSchema) ]),
  where: z.lazy(() => CollegeWhereInputSchema).optional()
}).strict();

export const CollegeUpdateToOneWithWhereWithoutDepartmentsInputSchema: z.ZodType<Prisma.CollegeUpdateToOneWithWhereWithoutDepartmentsInput> = z.object({
  where: z.lazy(() => CollegeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CollegeUpdateWithoutDepartmentsInputSchema),z.lazy(() => CollegeUncheckedUpdateWithoutDepartmentsInputSchema) ]),
}).strict();

export const CollegeUpdateWithoutDepartmentsInputSchema: z.ZodType<Prisma.CollegeUpdateWithoutDepartmentsInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patents: z.lazy(() => PatentUpdateManyWithoutCollegeNestedInputSchema).optional()
}).strict();

export const CollegeUncheckedUpdateWithoutDepartmentsInputSchema: z.ZodType<Prisma.CollegeUncheckedUpdateWithoutDepartmentsInput> = z.object({
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patents: z.lazy(() => PatentUncheckedUpdateManyWithoutCollegeNestedInputSchema).optional()
}).strict();

export const InventorUpsertWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorUpsertWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => InventorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InventorUpdateWithoutDepartmentInputSchema),z.lazy(() => InventorUncheckedUpdateWithoutDepartmentInputSchema) ]),
  create: z.union([ z.lazy(() => InventorCreateWithoutDepartmentInputSchema),z.lazy(() => InventorUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const InventorUpdateWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorUpdateWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => InventorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InventorUpdateWithoutDepartmentInputSchema),z.lazy(() => InventorUncheckedUpdateWithoutDepartmentInputSchema) ]),
}).strict();

export const InventorUpdateManyWithWhereWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorUpdateManyWithWhereWithoutDepartmentInput> = z.object({
  where: z.lazy(() => InventorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InventorUpdateManyMutationInputSchema),z.lazy(() => InventorUncheckedUpdateManyWithoutDepartmentInputSchema) ]),
}).strict();

export const InventorScalarWhereInputSchema: z.ZodType<Prisma.InventorScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InventorScalarWhereInputSchema),z.lazy(() => InventorScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InventorScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InventorScalarWhereInputSchema),z.lazy(() => InventorScalarWhereInputSchema).array() ]).optional(),
  InventorID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const PatentUpsertWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentUpsertWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentUpdateWithoutDepartmentInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutDepartmentInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutDepartmentInputSchema),z.lazy(() => PatentUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const PatentUpdateWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentUpdateWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentUpdateWithoutDepartmentInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutDepartmentInputSchema) ]),
}).strict();

export const PatentUpdateManyWithWhereWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentUpdateManyWithWhereWithoutDepartmentInput> = z.object({
  where: z.lazy(() => PatentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentUpdateManyMutationInputSchema),z.lazy(() => PatentUncheckedUpdateManyWithoutDepartmentInputSchema) ]),
}).strict();

export const PatentApplicationDataCreateWithoutCountryInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateWithoutCountryInput> = z.object({
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  PatentNumber: z.string().optional().nullable(),
  ApplicationNumber: z.string().optional().nullable(),
  FilingDate: z.coerce.date().optional().nullable(),
  PublicationDate: z.coerce.date().optional().nullable(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutApplicationInputSchema).optional()
}).strict();

export const PatentApplicationDataUncheckedCreateWithoutCountryInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedCreateWithoutCountryInput> = z.object({
  PatentID: z.number().int().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  PatentNumber: z.string().optional().nullable(),
  ApplicationNumber: z.string().optional().nullable(),
  FilingDate: z.coerce.date().optional().nullable(),
  PublicationDate: z.coerce.date().optional().nullable()
}).strict();

export const PatentApplicationDataCreateOrConnectWithoutCountryInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateOrConnectWithoutCountryInput> = z.object({
  where: z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const PatentApplicationDataCreateManyCountryInputEnvelopeSchema: z.ZodType<Prisma.PatentApplicationDataCreateManyCountryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentApplicationDataCreateManyCountryInputSchema),z.lazy(() => PatentApplicationDataCreateManyCountryInputSchema).array() ]),
}).strict();

export const PatentApplicationDataUpsertWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.PatentApplicationDataUpsertWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentApplicationDataUpdateWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUncheckedUpdateWithoutCountryInputSchema) ]),
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const PatentApplicationDataUpdateWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.PatentApplicationDataUpdateWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentApplicationDataUpdateWithoutCountryInputSchema),z.lazy(() => PatentApplicationDataUncheckedUpdateWithoutCountryInputSchema) ]),
}).strict();

export const PatentApplicationDataUpdateManyWithWhereWithoutCountryInputSchema: z.ZodType<Prisma.PatentApplicationDataUpdateManyWithWhereWithoutCountryInput> = z.object({
  where: z.lazy(() => PatentApplicationDataScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentApplicationDataUpdateManyMutationInputSchema),z.lazy(() => PatentApplicationDataUncheckedUpdateManyWithoutCountryInputSchema) ]),
}).strict();

export const PatentApplicationDataScalarWhereInputSchema: z.ZodType<Prisma.PatentApplicationDataScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentApplicationDataScalarWhereInputSchema),z.lazy(() => PatentApplicationDataScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentApplicationDataScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentApplicationDataScalarWhereInputSchema),z.lazy(() => PatentApplicationDataScalarWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  CountryID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumEnumPatentTypeNullableFilterSchema),z.lazy(() => EnumPatentTypeSchema) ]).optional().nullable(),
  PatentNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ApplicationNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  FilingDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  PublicationDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const AgencyContactPersonCreateWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyContactPersonCreateWithoutContactInfoInput> = z.object({
  Position: z.string(),
  agency: z.lazy(() => AgencyCreateNestedOneWithoutContactsInputSchema)
}).strict();

export const AgencyContactPersonUncheckedCreateWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyContactPersonUncheckedCreateWithoutContactInfoInput> = z.object({
  ContactPersonID: z.number().int().optional(),
  AgencyID: z.number().int(),
  Position: z.string()
}).strict();

export const AgencyContactPersonCreateOrConnectWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyContactPersonCreateOrConnectWithoutContactInfoInput> = z.object({
  where: z.lazy(() => AgencyContactPersonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AgencyContactPersonCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutContactInfoInputSchema) ]),
}).strict();

export const InventorCreateWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorCreateWithoutContactInfoInput> = z.object({
  Name: z.string(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutInventorsInputSchema),
  patents: z.lazy(() => PatentInventorCreateNestedManyWithoutInventorInputSchema).optional()
}).strict();

export const InventorUncheckedCreateWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUncheckedCreateWithoutContactInfoInput> = z.object({
  InventorID: z.number().int().optional(),
  Name: z.string(),
  DepartmentID: z.number().int(),
  patents: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutInventorInputSchema).optional()
}).strict();

export const InventorCreateOrConnectWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorCreateOrConnectWithoutContactInfoInput> = z.object({
  where: z.lazy(() => InventorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InventorCreateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema) ]),
}).strict();

export const AgencyContactPersonUpsertWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyContactPersonUpsertWithoutContactInfoInput> = z.object({
  update: z.union([ z.lazy(() => AgencyContactPersonUpdateWithoutContactInfoInputSchema),z.lazy(() => AgencyContactPersonUncheckedUpdateWithoutContactInfoInputSchema) ]),
  create: z.union([ z.lazy(() => AgencyContactPersonCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyContactPersonUncheckedCreateWithoutContactInfoInputSchema) ]),
  where: z.lazy(() => AgencyContactPersonWhereInputSchema).optional()
}).strict();

export const AgencyContactPersonUpdateToOneWithWhereWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyContactPersonUpdateToOneWithWhereWithoutContactInfoInput> = z.object({
  where: z.lazy(() => AgencyContactPersonWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AgencyContactPersonUpdateWithoutContactInfoInputSchema),z.lazy(() => AgencyContactPersonUncheckedUpdateWithoutContactInfoInputSchema) ]),
}).strict();

export const AgencyContactPersonUpdateWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyContactPersonUpdateWithoutContactInfoInput> = z.object({
  Position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agency: z.lazy(() => AgencyUpdateOneRequiredWithoutContactsNestedInputSchema).optional()
}).strict();

export const AgencyContactPersonUncheckedUpdateWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyContactPersonUncheckedUpdateWithoutContactInfoInput> = z.object({
  ContactPersonID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AgencyID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InventorUpsertWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUpsertWithoutContactInfoInput> = z.object({
  update: z.union([ z.lazy(() => InventorUpdateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedUpdateWithoutContactInfoInputSchema) ]),
  create: z.union([ z.lazy(() => InventorCreateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema) ]),
  where: z.lazy(() => InventorWhereInputSchema).optional()
}).strict();

export const InventorUpdateToOneWithWhereWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUpdateToOneWithWhereWithoutContactInfoInput> = z.object({
  where: z.lazy(() => InventorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InventorUpdateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedUpdateWithoutContactInfoInputSchema) ]),
}).strict();

export const InventorUpdateWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUpdateWithoutContactInfoInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutInventorsNestedInputSchema).optional(),
  patents: z.lazy(() => PatentInventorUpdateManyWithoutInventorNestedInputSchema).optional()
}).strict();

export const InventorUncheckedUpdateWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateWithoutContactInfoInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patents: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutInventorNestedInputSchema).optional()
}).strict();

export const AgencyContactPersonCreateManyAgencyInputSchema: z.ZodType<Prisma.AgencyContactPersonCreateManyAgencyInput> = z.object({
  ContactPersonID: z.number().int().optional(),
  Position: z.string(),
  ContactInfoID: z.number().int().optional().nullable()
}).strict();

export const AgencyPatentCreateManyAgencyInputSchema: z.ZodType<Prisma.AgencyPatentCreateManyAgencyInput> = z.object({
  PatentID: z.number().int(),
  FileCode: z.string(),
  Role: z.string(),
  Details: z.string().optional().nullable()
}).strict();

export const AgencyContactPersonUpdateWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyContactPersonUpdateWithoutAgencyInput> = z.object({
  Position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contactInfo: z.lazy(() => ContactInfoUpdateOneWithoutAgencyContactNestedInputSchema).optional()
}).strict();

export const AgencyContactPersonUncheckedUpdateWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyContactPersonUncheckedUpdateWithoutAgencyInput> = z.object({
  ContactPersonID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgencyContactPersonUncheckedUpdateManyWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyContactPersonUncheckedUpdateManyWithoutAgencyInput> = z.object({
  ContactPersonID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgencyPatentUpdateWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyPatentUpdateWithoutAgencyInput> = z.object({
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Details: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutAgenciesNestedInputSchema).optional()
}).strict();

export const AgencyPatentUncheckedUpdateWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyPatentUncheckedUpdateWithoutAgencyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Details: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgencyPatentUncheckedUpdateManyWithoutAgencyInputSchema: z.ZodType<Prisma.AgencyPatentUncheckedUpdateManyWithoutAgencyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Details: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentFundingCreateManyPlanInputSchema: z.ZodType<Prisma.PatentFundingCreateManyPlanInput> = z.object({
  FundingID: z.number().int().optional(),
  PatentID: z.number().int(),
  FundingAgency: z.string(),
  ProjectNumber: z.string()
}).strict();

export const PatentFundingUpdateWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingUpdateWithoutPlanInput> = z.object({
  FundingAgency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutFundingNestedInputSchema).optional()
}).strict();

export const PatentFundingUncheckedUpdateWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateWithoutPlanInput> = z.object({
  FundingID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FundingAgency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentFundingUncheckedUpdateManyWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateManyWithoutPlanInput> = z.object({
  FundingID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FundingAgency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentInventorCreateManyInventorInputSchema: z.ZodType<Prisma.PatentInventorCreateManyInventorInput> = z.object({
  PatentID: z.number().int(),
  Main: z.boolean(),
  Contribution: z.number().optional().nullable()
}).strict();

export const PatentInventorUpdateWithoutInventorInputSchema: z.ZodType<Prisma.PatentInventorUpdateWithoutInventorInput> = z.object({
  Main: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Contribution: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutInventorsNestedInputSchema).optional()
}).strict();

export const PatentInventorUncheckedUpdateWithoutInventorInputSchema: z.ZodType<Prisma.PatentInventorUncheckedUpdateWithoutInventorInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Main: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Contribution: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentInventorUncheckedUpdateManyWithoutInventorInputSchema: z.ZodType<Prisma.PatentInventorUncheckedUpdateManyWithoutInventorInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Main: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Contribution: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgencyPatentCreateManyPatentInputSchema: z.ZodType<Prisma.AgencyPatentCreateManyPatentInput> = z.object({
  AgencyID: z.number().int(),
  FileCode: z.string(),
  Role: z.string(),
  Details: z.string().optional().nullable()
}).strict();

export const PatentFundingCreateManyPatentInputSchema: z.ZodType<Prisma.PatentFundingCreateManyPatentInput> = z.object({
  FundingID: z.number().int().optional(),
  FundingAgency: z.string(),
  ProjectNumber: z.string(),
  PlanID: z.number().int()
}).strict();

export const PatentInventorCreateManyPatentInputSchema: z.ZodType<Prisma.PatentInventorCreateManyPatentInput> = z.object({
  InventorID: z.number().int(),
  Main: z.boolean(),
  Contribution: z.number().optional().nullable()
}).strict();

export const AgencyPatentUpdateWithoutPatentInputSchema: z.ZodType<Prisma.AgencyPatentUpdateWithoutPatentInput> = z.object({
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Details: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  agency: z.lazy(() => AgencyUpdateOneRequiredWithoutPatentsNestedInputSchema).optional()
}).strict();

export const AgencyPatentUncheckedUpdateWithoutPatentInputSchema: z.ZodType<Prisma.AgencyPatentUncheckedUpdateWithoutPatentInput> = z.object({
  AgencyID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Details: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgencyPatentUncheckedUpdateManyWithoutPatentInputSchema: z.ZodType<Prisma.AgencyPatentUncheckedUpdateManyWithoutPatentInput> = z.object({
  AgencyID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Details: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentFundingUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUpdateWithoutPatentInput> = z.object({
  FundingAgency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plan: z.lazy(() => FundingPlanUpdateOneRequiredWithoutFundingsNestedInputSchema).optional()
}).strict();

export const PatentFundingUncheckedUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateWithoutPatentInput> = z.object({
  FundingID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FundingAgency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentFundingUncheckedUpdateManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateManyWithoutPatentInput> = z.object({
  FundingID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FundingAgency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentInventorUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentInventorUpdateWithoutPatentInput> = z.object({
  Main: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Contribution: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventor: z.lazy(() => InventorUpdateOneRequiredWithoutPatentsNestedInputSchema).optional()
}).strict();

export const PatentInventorUncheckedUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentInventorUncheckedUpdateWithoutPatentInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Main: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Contribution: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentInventorUncheckedUpdateManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentInventorUncheckedUpdateManyWithoutPatentInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Main: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Contribution: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TechnicalKeywordUpdateWithoutPatentTechnicalAttributesInputSchema: z.ZodType<Prisma.TechnicalKeywordUpdateWithoutPatentTechnicalAttributesInput> = z.object({
  Keyword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TechnicalKeywordUncheckedUpdateWithoutPatentTechnicalAttributesInputSchema: z.ZodType<Prisma.TechnicalKeywordUncheckedUpdateWithoutPatentTechnicalAttributesInput> = z.object({
  KeywordID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Keyword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TechnicalKeywordUncheckedUpdateManyWithoutPatentTechnicalAttributesInputSchema: z.ZodType<Prisma.TechnicalKeywordUncheckedUpdateManyWithoutPatentTechnicalAttributesInput> = z.object({
  KeywordID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Keyword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentTechnicalAttributesUpdateWithoutKeywordsInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpdateWithoutKeywordsInput> = z.object({
  MaturityLevel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutTechnicalNestedInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesUncheckedUpdateWithoutKeywordsInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUncheckedUpdateWithoutKeywordsInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  MaturityLevel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentTechnicalAttributesUncheckedUpdateManyWithoutKeywordsInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUncheckedUpdateManyWithoutKeywordsInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  MaturityLevel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DepartmentCreateManyCollegeInputSchema: z.ZodType<Prisma.DepartmentCreateManyCollegeInput> = z.object({
  DepartmentID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable()
}).strict();

export const PatentCreateManyCollegeInputSchema: z.ZodType<Prisma.PatentCreateManyCollegeInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  DepartmentID: z.number().int()
}).strict();

export const DepartmentUpdateWithoutCollegeInputSchema: z.ZodType<Prisma.DepartmentUpdateWithoutCollegeInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventors: z.lazy(() => InventorUpdateManyWithoutDepartmentNestedInputSchema).optional(),
  patents: z.lazy(() => PatentUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentUncheckedUpdateWithoutCollegeInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateWithoutCollegeInput> = z.object({
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventors: z.lazy(() => InventorUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional(),
  patents: z.lazy(() => PatentUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentUncheckedUpdateManyWithoutCollegeInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateManyWithoutCollegeInput> = z.object({
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentUpdateWithoutCollegeInputSchema: z.ZodType<Prisma.PatentUpdateWithoutCollegeInput> = z.object({
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUpdateManyWithoutPatentNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutCollegeInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutCollegeInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateManyWithoutCollegeInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateManyWithoutCollegeInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InventorCreateManyDepartmentInputSchema: z.ZodType<Prisma.InventorCreateManyDepartmentInput> = z.object({
  InventorID: z.number().int().optional(),
  Name: z.string(),
  ContactInfoID: z.number().int().optional().nullable()
}).strict();

export const PatentCreateManyDepartmentInputSchema: z.ZodType<Prisma.PatentCreateManyDepartmentInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.string(),
  InternalID: z.string(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CollegeID: z.number().int()
}).strict();

export const InventorUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorUpdateWithoutDepartmentInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contactInfo: z.lazy(() => ContactInfoUpdateOneWithoutInventorNestedInputSchema).optional(),
  patents: z.lazy(() => PatentInventorUpdateManyWithoutInventorNestedInputSchema).optional()
}).strict();

export const InventorUncheckedUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateWithoutDepartmentInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patents: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutInventorNestedInputSchema).optional()
}).strict();

export const InventorUncheckedUpdateManyWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateManyWithoutDepartmentInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentUpdateWithoutDepartmentInput> = z.object({
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUpdateManyWithoutPatentNestedInputSchema).optional(),
  college: z.lazy(() => CollegeUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutDepartmentInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencies: z.lazy(() => AgencyPatentUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  status: z.lazy(() => PatentStatusUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateManyWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateManyWithoutDepartmentInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentApplicationDataCreateManyCountryInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateManyCountryInput> = z.object({
  PatentID: z.number().int().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  PatentNumber: z.string().optional().nullable(),
  ApplicationNumber: z.string().optional().nullable(),
  FilingDate: z.coerce.date().optional().nullable(),
  PublicationDate: z.coerce.date().optional().nullable()
}).strict();

export const PatentApplicationDataUpdateWithoutCountryInputSchema: z.ZodType<Prisma.PatentApplicationDataUpdateWithoutCountryInput> = z.object({
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutApplicationNestedInputSchema).optional()
}).strict();

export const PatentApplicationDataUncheckedUpdateWithoutCountryInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedUpdateWithoutCountryInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentApplicationDataUncheckedUpdateManyWithoutCountryInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedUpdateManyWithoutCountryInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AgencyFindFirstArgsSchema: z.ZodType<Prisma.AgencyFindFirstArgs> = z.object({
  select: AgencySelectSchema.optional(),
  include: AgencyIncludeSchema.optional(),
  where: AgencyWhereInputSchema.optional(),
  orderBy: z.union([ AgencyOrderByWithRelationInputSchema.array(),AgencyOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyScalarFieldEnumSchema,AgencyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AgencyFindFirstOrThrowArgs> = z.object({
  select: AgencySelectSchema.optional(),
  include: AgencyIncludeSchema.optional(),
  where: AgencyWhereInputSchema.optional(),
  orderBy: z.union([ AgencyOrderByWithRelationInputSchema.array(),AgencyOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyScalarFieldEnumSchema,AgencyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyFindManyArgsSchema: z.ZodType<Prisma.AgencyFindManyArgs> = z.object({
  select: AgencySelectSchema.optional(),
  include: AgencyIncludeSchema.optional(),
  where: AgencyWhereInputSchema.optional(),
  orderBy: z.union([ AgencyOrderByWithRelationInputSchema.array(),AgencyOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyScalarFieldEnumSchema,AgencyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyAggregateArgsSchema: z.ZodType<Prisma.AgencyAggregateArgs> = z.object({
  where: AgencyWhereInputSchema.optional(),
  orderBy: z.union([ AgencyOrderByWithRelationInputSchema.array(),AgencyOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AgencyGroupByArgsSchema: z.ZodType<Prisma.AgencyGroupByArgs> = z.object({
  where: AgencyWhereInputSchema.optional(),
  orderBy: z.union([ AgencyOrderByWithAggregationInputSchema.array(),AgencyOrderByWithAggregationInputSchema ]).optional(),
  by: AgencyScalarFieldEnumSchema.array(),
  having: AgencyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AgencyFindUniqueArgsSchema: z.ZodType<Prisma.AgencyFindUniqueArgs> = z.object({
  select: AgencySelectSchema.optional(),
  include: AgencyIncludeSchema.optional(),
  where: AgencyWhereUniqueInputSchema,
}).strict() ;

export const AgencyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AgencyFindUniqueOrThrowArgs> = z.object({
  select: AgencySelectSchema.optional(),
  include: AgencyIncludeSchema.optional(),
  where: AgencyWhereUniqueInputSchema,
}).strict() ;

export const AgencyPatentFindFirstArgsSchema: z.ZodType<Prisma.AgencyPatentFindFirstArgs> = z.object({
  select: AgencyPatentSelectSchema.optional(),
  include: AgencyPatentIncludeSchema.optional(),
  where: AgencyPatentWhereInputSchema.optional(),
  orderBy: z.union([ AgencyPatentOrderByWithRelationInputSchema.array(),AgencyPatentOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyPatentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyPatentScalarFieldEnumSchema,AgencyPatentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyPatentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AgencyPatentFindFirstOrThrowArgs> = z.object({
  select: AgencyPatentSelectSchema.optional(),
  include: AgencyPatentIncludeSchema.optional(),
  where: AgencyPatentWhereInputSchema.optional(),
  orderBy: z.union([ AgencyPatentOrderByWithRelationInputSchema.array(),AgencyPatentOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyPatentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyPatentScalarFieldEnumSchema,AgencyPatentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyPatentFindManyArgsSchema: z.ZodType<Prisma.AgencyPatentFindManyArgs> = z.object({
  select: AgencyPatentSelectSchema.optional(),
  include: AgencyPatentIncludeSchema.optional(),
  where: AgencyPatentWhereInputSchema.optional(),
  orderBy: z.union([ AgencyPatentOrderByWithRelationInputSchema.array(),AgencyPatentOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyPatentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyPatentScalarFieldEnumSchema,AgencyPatentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyPatentAggregateArgsSchema: z.ZodType<Prisma.AgencyPatentAggregateArgs> = z.object({
  where: AgencyPatentWhereInputSchema.optional(),
  orderBy: z.union([ AgencyPatentOrderByWithRelationInputSchema.array(),AgencyPatentOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyPatentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AgencyPatentGroupByArgsSchema: z.ZodType<Prisma.AgencyPatentGroupByArgs> = z.object({
  where: AgencyPatentWhereInputSchema.optional(),
  orderBy: z.union([ AgencyPatentOrderByWithAggregationInputSchema.array(),AgencyPatentOrderByWithAggregationInputSchema ]).optional(),
  by: AgencyPatentScalarFieldEnumSchema.array(),
  having: AgencyPatentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AgencyPatentFindUniqueArgsSchema: z.ZodType<Prisma.AgencyPatentFindUniqueArgs> = z.object({
  select: AgencyPatentSelectSchema.optional(),
  include: AgencyPatentIncludeSchema.optional(),
  where: AgencyPatentWhereUniqueInputSchema,
}).strict() ;

export const AgencyPatentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AgencyPatentFindUniqueOrThrowArgs> = z.object({
  select: AgencyPatentSelectSchema.optional(),
  include: AgencyPatentIncludeSchema.optional(),
  where: AgencyPatentWhereUniqueInputSchema,
}).strict() ;

export const AgencyContactPersonFindFirstArgsSchema: z.ZodType<Prisma.AgencyContactPersonFindFirstArgs> = z.object({
  select: AgencyContactPersonSelectSchema.optional(),
  include: AgencyContactPersonIncludeSchema.optional(),
  where: AgencyContactPersonWhereInputSchema.optional(),
  orderBy: z.union([ AgencyContactPersonOrderByWithRelationInputSchema.array(),AgencyContactPersonOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyContactPersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyContactPersonScalarFieldEnumSchema,AgencyContactPersonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyContactPersonFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AgencyContactPersonFindFirstOrThrowArgs> = z.object({
  select: AgencyContactPersonSelectSchema.optional(),
  include: AgencyContactPersonIncludeSchema.optional(),
  where: AgencyContactPersonWhereInputSchema.optional(),
  orderBy: z.union([ AgencyContactPersonOrderByWithRelationInputSchema.array(),AgencyContactPersonOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyContactPersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyContactPersonScalarFieldEnumSchema,AgencyContactPersonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyContactPersonFindManyArgsSchema: z.ZodType<Prisma.AgencyContactPersonFindManyArgs> = z.object({
  select: AgencyContactPersonSelectSchema.optional(),
  include: AgencyContactPersonIncludeSchema.optional(),
  where: AgencyContactPersonWhereInputSchema.optional(),
  orderBy: z.union([ AgencyContactPersonOrderByWithRelationInputSchema.array(),AgencyContactPersonOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyContactPersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyContactPersonScalarFieldEnumSchema,AgencyContactPersonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyContactPersonAggregateArgsSchema: z.ZodType<Prisma.AgencyContactPersonAggregateArgs> = z.object({
  where: AgencyContactPersonWhereInputSchema.optional(),
  orderBy: z.union([ AgencyContactPersonOrderByWithRelationInputSchema.array(),AgencyContactPersonOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyContactPersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AgencyContactPersonGroupByArgsSchema: z.ZodType<Prisma.AgencyContactPersonGroupByArgs> = z.object({
  where: AgencyContactPersonWhereInputSchema.optional(),
  orderBy: z.union([ AgencyContactPersonOrderByWithAggregationInputSchema.array(),AgencyContactPersonOrderByWithAggregationInputSchema ]).optional(),
  by: AgencyContactPersonScalarFieldEnumSchema.array(),
  having: AgencyContactPersonScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AgencyContactPersonFindUniqueArgsSchema: z.ZodType<Prisma.AgencyContactPersonFindUniqueArgs> = z.object({
  select: AgencyContactPersonSelectSchema.optional(),
  include: AgencyContactPersonIncludeSchema.optional(),
  where: AgencyContactPersonWhereUniqueInputSchema,
}).strict() ;

export const AgencyContactPersonFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AgencyContactPersonFindUniqueOrThrowArgs> = z.object({
  select: AgencyContactPersonSelectSchema.optional(),
  include: AgencyContactPersonIncludeSchema.optional(),
  where: AgencyContactPersonWhereUniqueInputSchema,
}).strict() ;

export const FundingPlanFindFirstArgsSchema: z.ZodType<Prisma.FundingPlanFindFirstArgs> = z.object({
  select: FundingPlanSelectSchema.optional(),
  include: FundingPlanIncludeSchema.optional(),
  where: FundingPlanWhereInputSchema.optional(),
  orderBy: z.union([ FundingPlanOrderByWithRelationInputSchema.array(),FundingPlanOrderByWithRelationInputSchema ]).optional(),
  cursor: FundingPlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FundingPlanScalarFieldEnumSchema,FundingPlanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FundingPlanFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FundingPlanFindFirstOrThrowArgs> = z.object({
  select: FundingPlanSelectSchema.optional(),
  include: FundingPlanIncludeSchema.optional(),
  where: FundingPlanWhereInputSchema.optional(),
  orderBy: z.union([ FundingPlanOrderByWithRelationInputSchema.array(),FundingPlanOrderByWithRelationInputSchema ]).optional(),
  cursor: FundingPlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FundingPlanScalarFieldEnumSchema,FundingPlanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FundingPlanFindManyArgsSchema: z.ZodType<Prisma.FundingPlanFindManyArgs> = z.object({
  select: FundingPlanSelectSchema.optional(),
  include: FundingPlanIncludeSchema.optional(),
  where: FundingPlanWhereInputSchema.optional(),
  orderBy: z.union([ FundingPlanOrderByWithRelationInputSchema.array(),FundingPlanOrderByWithRelationInputSchema ]).optional(),
  cursor: FundingPlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FundingPlanScalarFieldEnumSchema,FundingPlanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FundingPlanAggregateArgsSchema: z.ZodType<Prisma.FundingPlanAggregateArgs> = z.object({
  where: FundingPlanWhereInputSchema.optional(),
  orderBy: z.union([ FundingPlanOrderByWithRelationInputSchema.array(),FundingPlanOrderByWithRelationInputSchema ]).optional(),
  cursor: FundingPlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FundingPlanGroupByArgsSchema: z.ZodType<Prisma.FundingPlanGroupByArgs> = z.object({
  where: FundingPlanWhereInputSchema.optional(),
  orderBy: z.union([ FundingPlanOrderByWithAggregationInputSchema.array(),FundingPlanOrderByWithAggregationInputSchema ]).optional(),
  by: FundingPlanScalarFieldEnumSchema.array(),
  having: FundingPlanScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FundingPlanFindUniqueArgsSchema: z.ZodType<Prisma.FundingPlanFindUniqueArgs> = z.object({
  select: FundingPlanSelectSchema.optional(),
  include: FundingPlanIncludeSchema.optional(),
  where: FundingPlanWhereUniqueInputSchema,
}).strict() ;

export const FundingPlanFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FundingPlanFindUniqueOrThrowArgs> = z.object({
  select: FundingPlanSelectSchema.optional(),
  include: FundingPlanIncludeSchema.optional(),
  where: FundingPlanWhereUniqueInputSchema,
}).strict() ;

export const PatentFundingFindFirstArgsSchema: z.ZodType<Prisma.PatentFundingFindFirstArgs> = z.object({
  select: PatentFundingSelectSchema.optional(),
  include: PatentFundingIncludeSchema.optional(),
  where: PatentFundingWhereInputSchema.optional(),
  orderBy: z.union([ PatentFundingOrderByWithRelationInputSchema.array(),PatentFundingOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentFundingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentFundingScalarFieldEnumSchema,PatentFundingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentFundingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentFundingFindFirstOrThrowArgs> = z.object({
  select: PatentFundingSelectSchema.optional(),
  include: PatentFundingIncludeSchema.optional(),
  where: PatentFundingWhereInputSchema.optional(),
  orderBy: z.union([ PatentFundingOrderByWithRelationInputSchema.array(),PatentFundingOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentFundingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentFundingScalarFieldEnumSchema,PatentFundingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentFundingFindManyArgsSchema: z.ZodType<Prisma.PatentFundingFindManyArgs> = z.object({
  select: PatentFundingSelectSchema.optional(),
  include: PatentFundingIncludeSchema.optional(),
  where: PatentFundingWhereInputSchema.optional(),
  orderBy: z.union([ PatentFundingOrderByWithRelationInputSchema.array(),PatentFundingOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentFundingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentFundingScalarFieldEnumSchema,PatentFundingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentFundingAggregateArgsSchema: z.ZodType<Prisma.PatentFundingAggregateArgs> = z.object({
  where: PatentFundingWhereInputSchema.optional(),
  orderBy: z.union([ PatentFundingOrderByWithRelationInputSchema.array(),PatentFundingOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentFundingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentFundingGroupByArgsSchema: z.ZodType<Prisma.PatentFundingGroupByArgs> = z.object({
  where: PatentFundingWhereInputSchema.optional(),
  orderBy: z.union([ PatentFundingOrderByWithAggregationInputSchema.array(),PatentFundingOrderByWithAggregationInputSchema ]).optional(),
  by: PatentFundingScalarFieldEnumSchema.array(),
  having: PatentFundingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentFundingFindUniqueArgsSchema: z.ZodType<Prisma.PatentFundingFindUniqueArgs> = z.object({
  select: PatentFundingSelectSchema.optional(),
  include: PatentFundingIncludeSchema.optional(),
  where: PatentFundingWhereUniqueInputSchema,
}).strict() ;

export const PatentFundingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentFundingFindUniqueOrThrowArgs> = z.object({
  select: PatentFundingSelectSchema.optional(),
  include: PatentFundingIncludeSchema.optional(),
  where: PatentFundingWhereUniqueInputSchema,
}).strict() ;

export const InventorFindFirstArgsSchema: z.ZodType<Prisma.InventorFindFirstArgs> = z.object({
  select: InventorSelectSchema.optional(),
  include: InventorIncludeSchema.optional(),
  where: InventorWhereInputSchema.optional(),
  orderBy: z.union([ InventorOrderByWithRelationInputSchema.array(),InventorOrderByWithRelationInputSchema ]).optional(),
  cursor: InventorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InventorScalarFieldEnumSchema,InventorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InventorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InventorFindFirstOrThrowArgs> = z.object({
  select: InventorSelectSchema.optional(),
  include: InventorIncludeSchema.optional(),
  where: InventorWhereInputSchema.optional(),
  orderBy: z.union([ InventorOrderByWithRelationInputSchema.array(),InventorOrderByWithRelationInputSchema ]).optional(),
  cursor: InventorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InventorScalarFieldEnumSchema,InventorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InventorFindManyArgsSchema: z.ZodType<Prisma.InventorFindManyArgs> = z.object({
  select: InventorSelectSchema.optional(),
  include: InventorIncludeSchema.optional(),
  where: InventorWhereInputSchema.optional(),
  orderBy: z.union([ InventorOrderByWithRelationInputSchema.array(),InventorOrderByWithRelationInputSchema ]).optional(),
  cursor: InventorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InventorScalarFieldEnumSchema,InventorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InventorAggregateArgsSchema: z.ZodType<Prisma.InventorAggregateArgs> = z.object({
  where: InventorWhereInputSchema.optional(),
  orderBy: z.union([ InventorOrderByWithRelationInputSchema.array(),InventorOrderByWithRelationInputSchema ]).optional(),
  cursor: InventorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InventorGroupByArgsSchema: z.ZodType<Prisma.InventorGroupByArgs> = z.object({
  where: InventorWhereInputSchema.optional(),
  orderBy: z.union([ InventorOrderByWithAggregationInputSchema.array(),InventorOrderByWithAggregationInputSchema ]).optional(),
  by: InventorScalarFieldEnumSchema.array(),
  having: InventorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InventorFindUniqueArgsSchema: z.ZodType<Prisma.InventorFindUniqueArgs> = z.object({
  select: InventorSelectSchema.optional(),
  include: InventorIncludeSchema.optional(),
  where: InventorWhereUniqueInputSchema,
}).strict() ;

export const InventorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InventorFindUniqueOrThrowArgs> = z.object({
  select: InventorSelectSchema.optional(),
  include: InventorIncludeSchema.optional(),
  where: InventorWhereUniqueInputSchema,
}).strict() ;

export const PatentInventorFindFirstArgsSchema: z.ZodType<Prisma.PatentInventorFindFirstArgs> = z.object({
  select: PatentInventorSelectSchema.optional(),
  include: PatentInventorIncludeSchema.optional(),
  where: PatentInventorWhereInputSchema.optional(),
  orderBy: z.union([ PatentInventorOrderByWithRelationInputSchema.array(),PatentInventorOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentInventorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentInventorScalarFieldEnumSchema,PatentInventorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentInventorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentInventorFindFirstOrThrowArgs> = z.object({
  select: PatentInventorSelectSchema.optional(),
  include: PatentInventorIncludeSchema.optional(),
  where: PatentInventorWhereInputSchema.optional(),
  orderBy: z.union([ PatentInventorOrderByWithRelationInputSchema.array(),PatentInventorOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentInventorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentInventorScalarFieldEnumSchema,PatentInventorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentInventorFindManyArgsSchema: z.ZodType<Prisma.PatentInventorFindManyArgs> = z.object({
  select: PatentInventorSelectSchema.optional(),
  include: PatentInventorIncludeSchema.optional(),
  where: PatentInventorWhereInputSchema.optional(),
  orderBy: z.union([ PatentInventorOrderByWithRelationInputSchema.array(),PatentInventorOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentInventorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentInventorScalarFieldEnumSchema,PatentInventorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentInventorAggregateArgsSchema: z.ZodType<Prisma.PatentInventorAggregateArgs> = z.object({
  where: PatentInventorWhereInputSchema.optional(),
  orderBy: z.union([ PatentInventorOrderByWithRelationInputSchema.array(),PatentInventorOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentInventorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentInventorGroupByArgsSchema: z.ZodType<Prisma.PatentInventorGroupByArgs> = z.object({
  where: PatentInventorWhereInputSchema.optional(),
  orderBy: z.union([ PatentInventorOrderByWithAggregationInputSchema.array(),PatentInventorOrderByWithAggregationInputSchema ]).optional(),
  by: PatentInventorScalarFieldEnumSchema.array(),
  having: PatentInventorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentInventorFindUniqueArgsSchema: z.ZodType<Prisma.PatentInventorFindUniqueArgs> = z.object({
  select: PatentInventorSelectSchema.optional(),
  include: PatentInventorIncludeSchema.optional(),
  where: PatentInventorWhereUniqueInputSchema,
}).strict() ;

export const PatentInventorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentInventorFindUniqueOrThrowArgs> = z.object({
  select: PatentInventorSelectSchema.optional(),
  include: PatentInventorIncludeSchema.optional(),
  where: PatentInventorWhereUniqueInputSchema,
}).strict() ;

export const PatentFindFirstArgsSchema: z.ZodType<Prisma.PatentFindFirstArgs> = z.object({
  select: PatentSelectSchema.optional(),
  include: PatentIncludeSchema.optional(),
  where: PatentWhereInputSchema.optional(),
  orderBy: z.union([ PatentOrderByWithRelationInputSchema.array(),PatentOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentScalarFieldEnumSchema,PatentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentFindFirstOrThrowArgs> = z.object({
  select: PatentSelectSchema.optional(),
  include: PatentIncludeSchema.optional(),
  where: PatentWhereInputSchema.optional(),
  orderBy: z.union([ PatentOrderByWithRelationInputSchema.array(),PatentOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentScalarFieldEnumSchema,PatentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentFindManyArgsSchema: z.ZodType<Prisma.PatentFindManyArgs> = z.object({
  select: PatentSelectSchema.optional(),
  include: PatentIncludeSchema.optional(),
  where: PatentWhereInputSchema.optional(),
  orderBy: z.union([ PatentOrderByWithRelationInputSchema.array(),PatentOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentScalarFieldEnumSchema,PatentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentAggregateArgsSchema: z.ZodType<Prisma.PatentAggregateArgs> = z.object({
  where: PatentWhereInputSchema.optional(),
  orderBy: z.union([ PatentOrderByWithRelationInputSchema.array(),PatentOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentGroupByArgsSchema: z.ZodType<Prisma.PatentGroupByArgs> = z.object({
  where: PatentWhereInputSchema.optional(),
  orderBy: z.union([ PatentOrderByWithAggregationInputSchema.array(),PatentOrderByWithAggregationInputSchema ]).optional(),
  by: PatentScalarFieldEnumSchema.array(),
  having: PatentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentFindUniqueArgsSchema: z.ZodType<Prisma.PatentFindUniqueArgs> = z.object({
  select: PatentSelectSchema.optional(),
  include: PatentIncludeSchema.optional(),
  where: PatentWhereUniqueInputSchema,
}).strict() ;

export const PatentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentFindUniqueOrThrowArgs> = z.object({
  select: PatentSelectSchema.optional(),
  include: PatentIncludeSchema.optional(),
  where: PatentWhereUniqueInputSchema,
}).strict() ;

export const PatentStatusFindFirstArgsSchema: z.ZodType<Prisma.PatentStatusFindFirstArgs> = z.object({
  select: PatentStatusSelectSchema.optional(),
  include: PatentStatusIncludeSchema.optional(),
  where: PatentStatusWhereInputSchema.optional(),
  orderBy: z.union([ PatentStatusOrderByWithRelationInputSchema.array(),PatentStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentStatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentStatusScalarFieldEnumSchema,PatentStatusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentStatusFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentStatusFindFirstOrThrowArgs> = z.object({
  select: PatentStatusSelectSchema.optional(),
  include: PatentStatusIncludeSchema.optional(),
  where: PatentStatusWhereInputSchema.optional(),
  orderBy: z.union([ PatentStatusOrderByWithRelationInputSchema.array(),PatentStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentStatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentStatusScalarFieldEnumSchema,PatentStatusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentStatusFindManyArgsSchema: z.ZodType<Prisma.PatentStatusFindManyArgs> = z.object({
  select: PatentStatusSelectSchema.optional(),
  include: PatentStatusIncludeSchema.optional(),
  where: PatentStatusWhereInputSchema.optional(),
  orderBy: z.union([ PatentStatusOrderByWithRelationInputSchema.array(),PatentStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentStatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentStatusScalarFieldEnumSchema,PatentStatusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentStatusAggregateArgsSchema: z.ZodType<Prisma.PatentStatusAggregateArgs> = z.object({
  where: PatentStatusWhereInputSchema.optional(),
  orderBy: z.union([ PatentStatusOrderByWithRelationInputSchema.array(),PatentStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentStatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentStatusGroupByArgsSchema: z.ZodType<Prisma.PatentStatusGroupByArgs> = z.object({
  where: PatentStatusWhereInputSchema.optional(),
  orderBy: z.union([ PatentStatusOrderByWithAggregationInputSchema.array(),PatentStatusOrderByWithAggregationInputSchema ]).optional(),
  by: PatentStatusScalarFieldEnumSchema.array(),
  having: PatentStatusScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentStatusFindUniqueArgsSchema: z.ZodType<Prisma.PatentStatusFindUniqueArgs> = z.object({
  select: PatentStatusSelectSchema.optional(),
  include: PatentStatusIncludeSchema.optional(),
  where: PatentStatusWhereUniqueInputSchema,
}).strict() ;

export const PatentStatusFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentStatusFindUniqueOrThrowArgs> = z.object({
  select: PatentStatusSelectSchema.optional(),
  include: PatentStatusIncludeSchema.optional(),
  where: PatentStatusWhereUniqueInputSchema,
}).strict() ;

export const PatentApplicationDataFindFirstArgsSchema: z.ZodType<Prisma.PatentApplicationDataFindFirstArgs> = z.object({
  select: PatentApplicationDataSelectSchema.optional(),
  include: PatentApplicationDataIncludeSchema.optional(),
  where: PatentApplicationDataWhereInputSchema.optional(),
  orderBy: z.union([ PatentApplicationDataOrderByWithRelationInputSchema.array(),PatentApplicationDataOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentApplicationDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentApplicationDataScalarFieldEnumSchema,PatentApplicationDataScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentApplicationDataFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentApplicationDataFindFirstOrThrowArgs> = z.object({
  select: PatentApplicationDataSelectSchema.optional(),
  include: PatentApplicationDataIncludeSchema.optional(),
  where: PatentApplicationDataWhereInputSchema.optional(),
  orderBy: z.union([ PatentApplicationDataOrderByWithRelationInputSchema.array(),PatentApplicationDataOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentApplicationDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentApplicationDataScalarFieldEnumSchema,PatentApplicationDataScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentApplicationDataFindManyArgsSchema: z.ZodType<Prisma.PatentApplicationDataFindManyArgs> = z.object({
  select: PatentApplicationDataSelectSchema.optional(),
  include: PatentApplicationDataIncludeSchema.optional(),
  where: PatentApplicationDataWhereInputSchema.optional(),
  orderBy: z.union([ PatentApplicationDataOrderByWithRelationInputSchema.array(),PatentApplicationDataOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentApplicationDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentApplicationDataScalarFieldEnumSchema,PatentApplicationDataScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentApplicationDataAggregateArgsSchema: z.ZodType<Prisma.PatentApplicationDataAggregateArgs> = z.object({
  where: PatentApplicationDataWhereInputSchema.optional(),
  orderBy: z.union([ PatentApplicationDataOrderByWithRelationInputSchema.array(),PatentApplicationDataOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentApplicationDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentApplicationDataGroupByArgsSchema: z.ZodType<Prisma.PatentApplicationDataGroupByArgs> = z.object({
  where: PatentApplicationDataWhereInputSchema.optional(),
  orderBy: z.union([ PatentApplicationDataOrderByWithAggregationInputSchema.array(),PatentApplicationDataOrderByWithAggregationInputSchema ]).optional(),
  by: PatentApplicationDataScalarFieldEnumSchema.array(),
  having: PatentApplicationDataScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentApplicationDataFindUniqueArgsSchema: z.ZodType<Prisma.PatentApplicationDataFindUniqueArgs> = z.object({
  select: PatentApplicationDataSelectSchema.optional(),
  include: PatentApplicationDataIncludeSchema.optional(),
  where: PatentApplicationDataWhereUniqueInputSchema,
}).strict() ;

export const PatentApplicationDataFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentApplicationDataFindUniqueOrThrowArgs> = z.object({
  select: PatentApplicationDataSelectSchema.optional(),
  include: PatentApplicationDataIncludeSchema.optional(),
  where: PatentApplicationDataWhereUniqueInputSchema,
}).strict() ;

export const PatentTechnicalAttributesFindFirstArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesFindFirstArgs> = z.object({
  select: PatentTechnicalAttributesSelectSchema.optional(),
  include: PatentTechnicalAttributesIncludeSchema.optional(),
  where: PatentTechnicalAttributesWhereInputSchema.optional(),
  orderBy: z.union([ PatentTechnicalAttributesOrderByWithRelationInputSchema.array(),PatentTechnicalAttributesOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentTechnicalAttributesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentTechnicalAttributesScalarFieldEnumSchema,PatentTechnicalAttributesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentTechnicalAttributesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesFindFirstOrThrowArgs> = z.object({
  select: PatentTechnicalAttributesSelectSchema.optional(),
  include: PatentTechnicalAttributesIncludeSchema.optional(),
  where: PatentTechnicalAttributesWhereInputSchema.optional(),
  orderBy: z.union([ PatentTechnicalAttributesOrderByWithRelationInputSchema.array(),PatentTechnicalAttributesOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentTechnicalAttributesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentTechnicalAttributesScalarFieldEnumSchema,PatentTechnicalAttributesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentTechnicalAttributesFindManyArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesFindManyArgs> = z.object({
  select: PatentTechnicalAttributesSelectSchema.optional(),
  include: PatentTechnicalAttributesIncludeSchema.optional(),
  where: PatentTechnicalAttributesWhereInputSchema.optional(),
  orderBy: z.union([ PatentTechnicalAttributesOrderByWithRelationInputSchema.array(),PatentTechnicalAttributesOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentTechnicalAttributesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentTechnicalAttributesScalarFieldEnumSchema,PatentTechnicalAttributesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentTechnicalAttributesAggregateArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesAggregateArgs> = z.object({
  where: PatentTechnicalAttributesWhereInputSchema.optional(),
  orderBy: z.union([ PatentTechnicalAttributesOrderByWithRelationInputSchema.array(),PatentTechnicalAttributesOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentTechnicalAttributesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentTechnicalAttributesGroupByArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesGroupByArgs> = z.object({
  where: PatentTechnicalAttributesWhereInputSchema.optional(),
  orderBy: z.union([ PatentTechnicalAttributesOrderByWithAggregationInputSchema.array(),PatentTechnicalAttributesOrderByWithAggregationInputSchema ]).optional(),
  by: PatentTechnicalAttributesScalarFieldEnumSchema.array(),
  having: PatentTechnicalAttributesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentTechnicalAttributesFindUniqueArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesFindUniqueArgs> = z.object({
  select: PatentTechnicalAttributesSelectSchema.optional(),
  include: PatentTechnicalAttributesIncludeSchema.optional(),
  where: PatentTechnicalAttributesWhereUniqueInputSchema,
}).strict() ;

export const PatentTechnicalAttributesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesFindUniqueOrThrowArgs> = z.object({
  select: PatentTechnicalAttributesSelectSchema.optional(),
  include: PatentTechnicalAttributesIncludeSchema.optional(),
  where: PatentTechnicalAttributesWhereUniqueInputSchema,
}).strict() ;

export const TechnicalKeywordFindFirstArgsSchema: z.ZodType<Prisma.TechnicalKeywordFindFirstArgs> = z.object({
  select: TechnicalKeywordSelectSchema.optional(),
  include: TechnicalKeywordIncludeSchema.optional(),
  where: TechnicalKeywordWhereInputSchema.optional(),
  orderBy: z.union([ TechnicalKeywordOrderByWithRelationInputSchema.array(),TechnicalKeywordOrderByWithRelationInputSchema ]).optional(),
  cursor: TechnicalKeywordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TechnicalKeywordScalarFieldEnumSchema,TechnicalKeywordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TechnicalKeywordFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TechnicalKeywordFindFirstOrThrowArgs> = z.object({
  select: TechnicalKeywordSelectSchema.optional(),
  include: TechnicalKeywordIncludeSchema.optional(),
  where: TechnicalKeywordWhereInputSchema.optional(),
  orderBy: z.union([ TechnicalKeywordOrderByWithRelationInputSchema.array(),TechnicalKeywordOrderByWithRelationInputSchema ]).optional(),
  cursor: TechnicalKeywordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TechnicalKeywordScalarFieldEnumSchema,TechnicalKeywordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TechnicalKeywordFindManyArgsSchema: z.ZodType<Prisma.TechnicalKeywordFindManyArgs> = z.object({
  select: TechnicalKeywordSelectSchema.optional(),
  include: TechnicalKeywordIncludeSchema.optional(),
  where: TechnicalKeywordWhereInputSchema.optional(),
  orderBy: z.union([ TechnicalKeywordOrderByWithRelationInputSchema.array(),TechnicalKeywordOrderByWithRelationInputSchema ]).optional(),
  cursor: TechnicalKeywordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TechnicalKeywordScalarFieldEnumSchema,TechnicalKeywordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TechnicalKeywordAggregateArgsSchema: z.ZodType<Prisma.TechnicalKeywordAggregateArgs> = z.object({
  where: TechnicalKeywordWhereInputSchema.optional(),
  orderBy: z.union([ TechnicalKeywordOrderByWithRelationInputSchema.array(),TechnicalKeywordOrderByWithRelationInputSchema ]).optional(),
  cursor: TechnicalKeywordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TechnicalKeywordGroupByArgsSchema: z.ZodType<Prisma.TechnicalKeywordGroupByArgs> = z.object({
  where: TechnicalKeywordWhereInputSchema.optional(),
  orderBy: z.union([ TechnicalKeywordOrderByWithAggregationInputSchema.array(),TechnicalKeywordOrderByWithAggregationInputSchema ]).optional(),
  by: TechnicalKeywordScalarFieldEnumSchema.array(),
  having: TechnicalKeywordScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TechnicalKeywordFindUniqueArgsSchema: z.ZodType<Prisma.TechnicalKeywordFindUniqueArgs> = z.object({
  select: TechnicalKeywordSelectSchema.optional(),
  include: TechnicalKeywordIncludeSchema.optional(),
  where: TechnicalKeywordWhereUniqueInputSchema,
}).strict() ;

export const TechnicalKeywordFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TechnicalKeywordFindUniqueOrThrowArgs> = z.object({
  select: TechnicalKeywordSelectSchema.optional(),
  include: TechnicalKeywordIncludeSchema.optional(),
  where: TechnicalKeywordWhereUniqueInputSchema,
}).strict() ;

export const CollegeFindFirstArgsSchema: z.ZodType<Prisma.CollegeFindFirstArgs> = z.object({
  select: CollegeSelectSchema.optional(),
  include: CollegeIncludeSchema.optional(),
  where: CollegeWhereInputSchema.optional(),
  orderBy: z.union([ CollegeOrderByWithRelationInputSchema.array(),CollegeOrderByWithRelationInputSchema ]).optional(),
  cursor: CollegeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CollegeScalarFieldEnumSchema,CollegeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CollegeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CollegeFindFirstOrThrowArgs> = z.object({
  select: CollegeSelectSchema.optional(),
  include: CollegeIncludeSchema.optional(),
  where: CollegeWhereInputSchema.optional(),
  orderBy: z.union([ CollegeOrderByWithRelationInputSchema.array(),CollegeOrderByWithRelationInputSchema ]).optional(),
  cursor: CollegeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CollegeScalarFieldEnumSchema,CollegeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CollegeFindManyArgsSchema: z.ZodType<Prisma.CollegeFindManyArgs> = z.object({
  select: CollegeSelectSchema.optional(),
  include: CollegeIncludeSchema.optional(),
  where: CollegeWhereInputSchema.optional(),
  orderBy: z.union([ CollegeOrderByWithRelationInputSchema.array(),CollegeOrderByWithRelationInputSchema ]).optional(),
  cursor: CollegeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CollegeScalarFieldEnumSchema,CollegeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CollegeAggregateArgsSchema: z.ZodType<Prisma.CollegeAggregateArgs> = z.object({
  where: CollegeWhereInputSchema.optional(),
  orderBy: z.union([ CollegeOrderByWithRelationInputSchema.array(),CollegeOrderByWithRelationInputSchema ]).optional(),
  cursor: CollegeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CollegeGroupByArgsSchema: z.ZodType<Prisma.CollegeGroupByArgs> = z.object({
  where: CollegeWhereInputSchema.optional(),
  orderBy: z.union([ CollegeOrderByWithAggregationInputSchema.array(),CollegeOrderByWithAggregationInputSchema ]).optional(),
  by: CollegeScalarFieldEnumSchema.array(),
  having: CollegeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CollegeFindUniqueArgsSchema: z.ZodType<Prisma.CollegeFindUniqueArgs> = z.object({
  select: CollegeSelectSchema.optional(),
  include: CollegeIncludeSchema.optional(),
  where: CollegeWhereUniqueInputSchema,
}).strict() ;

export const CollegeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CollegeFindUniqueOrThrowArgs> = z.object({
  select: CollegeSelectSchema.optional(),
  include: CollegeIncludeSchema.optional(),
  where: CollegeWhereUniqueInputSchema,
}).strict() ;

export const DepartmentFindFirstArgsSchema: z.ZodType<Prisma.DepartmentFindFirstArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithRelationInputSchema.array(),DepartmentOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentScalarFieldEnumSchema,DepartmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DepartmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DepartmentFindFirstOrThrowArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithRelationInputSchema.array(),DepartmentOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentScalarFieldEnumSchema,DepartmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DepartmentFindManyArgsSchema: z.ZodType<Prisma.DepartmentFindManyArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithRelationInputSchema.array(),DepartmentOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentScalarFieldEnumSchema,DepartmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DepartmentAggregateArgsSchema: z.ZodType<Prisma.DepartmentAggregateArgs> = z.object({
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithRelationInputSchema.array(),DepartmentOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DepartmentGroupByArgsSchema: z.ZodType<Prisma.DepartmentGroupByArgs> = z.object({
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithAggregationInputSchema.array(),DepartmentOrderByWithAggregationInputSchema ]).optional(),
  by: DepartmentScalarFieldEnumSchema.array(),
  having: DepartmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DepartmentFindUniqueArgsSchema: z.ZodType<Prisma.DepartmentFindUniqueArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereUniqueInputSchema,
}).strict() ;

export const DepartmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DepartmentFindUniqueOrThrowArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereUniqueInputSchema,
}).strict() ;

export const CountryFindFirstArgsSchema: z.ZodType<Prisma.CountryFindFirstArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema,CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CountryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CountryFindFirstOrThrowArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema,CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CountryFindManyArgsSchema: z.ZodType<Prisma.CountryFindManyArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema,CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CountryAggregateArgsSchema: z.ZodType<Prisma.CountryAggregateArgs> = z.object({
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CountryGroupByArgsSchema: z.ZodType<Prisma.CountryGroupByArgs> = z.object({
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithAggregationInputSchema.array(),CountryOrderByWithAggregationInputSchema ]).optional(),
  by: CountryScalarFieldEnumSchema.array(),
  having: CountryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CountryFindUniqueArgsSchema: z.ZodType<Prisma.CountryFindUniqueArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
}).strict() ;

export const CountryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CountryFindUniqueOrThrowArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
}).strict() ;

export const ContactInfoFindFirstArgsSchema: z.ZodType<Prisma.ContactInfoFindFirstArgs> = z.object({
  select: ContactInfoSelectSchema.optional(),
  include: ContactInfoIncludeSchema.optional(),
  where: ContactInfoWhereInputSchema.optional(),
  orderBy: z.union([ ContactInfoOrderByWithRelationInputSchema.array(),ContactInfoOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactInfoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContactInfoScalarFieldEnumSchema,ContactInfoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ContactInfoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContactInfoFindFirstOrThrowArgs> = z.object({
  select: ContactInfoSelectSchema.optional(),
  include: ContactInfoIncludeSchema.optional(),
  where: ContactInfoWhereInputSchema.optional(),
  orderBy: z.union([ ContactInfoOrderByWithRelationInputSchema.array(),ContactInfoOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactInfoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContactInfoScalarFieldEnumSchema,ContactInfoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ContactInfoFindManyArgsSchema: z.ZodType<Prisma.ContactInfoFindManyArgs> = z.object({
  select: ContactInfoSelectSchema.optional(),
  include: ContactInfoIncludeSchema.optional(),
  where: ContactInfoWhereInputSchema.optional(),
  orderBy: z.union([ ContactInfoOrderByWithRelationInputSchema.array(),ContactInfoOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactInfoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContactInfoScalarFieldEnumSchema,ContactInfoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ContactInfoAggregateArgsSchema: z.ZodType<Prisma.ContactInfoAggregateArgs> = z.object({
  where: ContactInfoWhereInputSchema.optional(),
  orderBy: z.union([ ContactInfoOrderByWithRelationInputSchema.array(),ContactInfoOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactInfoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ContactInfoGroupByArgsSchema: z.ZodType<Prisma.ContactInfoGroupByArgs> = z.object({
  where: ContactInfoWhereInputSchema.optional(),
  orderBy: z.union([ ContactInfoOrderByWithAggregationInputSchema.array(),ContactInfoOrderByWithAggregationInputSchema ]).optional(),
  by: ContactInfoScalarFieldEnumSchema.array(),
  having: ContactInfoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ContactInfoFindUniqueArgsSchema: z.ZodType<Prisma.ContactInfoFindUniqueArgs> = z.object({
  select: ContactInfoSelectSchema.optional(),
  include: ContactInfoIncludeSchema.optional(),
  where: ContactInfoWhereUniqueInputSchema,
}).strict() ;

export const ContactInfoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContactInfoFindUniqueOrThrowArgs> = z.object({
  select: ContactInfoSelectSchema.optional(),
  include: ContactInfoIncludeSchema.optional(),
  where: ContactInfoWhereUniqueInputSchema,
}).strict() ;

export const AgencyCreateArgsSchema: z.ZodType<Prisma.AgencyCreateArgs> = z.object({
  select: AgencySelectSchema.optional(),
  include: AgencyIncludeSchema.optional(),
  data: z.union([ AgencyCreateInputSchema,AgencyUncheckedCreateInputSchema ]),
}).strict() ;

export const AgencyUpsertArgsSchema: z.ZodType<Prisma.AgencyUpsertArgs> = z.object({
  select: AgencySelectSchema.optional(),
  include: AgencyIncludeSchema.optional(),
  where: AgencyWhereUniqueInputSchema,
  create: z.union([ AgencyCreateInputSchema,AgencyUncheckedCreateInputSchema ]),
  update: z.union([ AgencyUpdateInputSchema,AgencyUncheckedUpdateInputSchema ]),
}).strict() ;

export const AgencyCreateManyArgsSchema: z.ZodType<Prisma.AgencyCreateManyArgs> = z.object({
  data: z.union([ AgencyCreateManyInputSchema,AgencyCreateManyInputSchema.array() ]),
}).strict() ;

export const AgencyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AgencyCreateManyAndReturnArgs> = z.object({
  data: z.union([ AgencyCreateManyInputSchema,AgencyCreateManyInputSchema.array() ]),
}).strict() ;

export const AgencyDeleteArgsSchema: z.ZodType<Prisma.AgencyDeleteArgs> = z.object({
  select: AgencySelectSchema.optional(),
  include: AgencyIncludeSchema.optional(),
  where: AgencyWhereUniqueInputSchema,
}).strict() ;

export const AgencyUpdateArgsSchema: z.ZodType<Prisma.AgencyUpdateArgs> = z.object({
  select: AgencySelectSchema.optional(),
  include: AgencyIncludeSchema.optional(),
  data: z.union([ AgencyUpdateInputSchema,AgencyUncheckedUpdateInputSchema ]),
  where: AgencyWhereUniqueInputSchema,
}).strict() ;

export const AgencyUpdateManyArgsSchema: z.ZodType<Prisma.AgencyUpdateManyArgs> = z.object({
  data: z.union([ AgencyUpdateManyMutationInputSchema,AgencyUncheckedUpdateManyInputSchema ]),
  where: AgencyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyAgencyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyAgencyCreateManyAndReturnArgs> = z.object({
  data: z.union([ AgencyUpdateManyMutationInputSchema,AgencyUncheckedUpdateManyInputSchema ]),
  where: AgencyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AgencyDeleteManyArgsSchema: z.ZodType<Prisma.AgencyDeleteManyArgs> = z.object({
  where: AgencyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AgencyPatentCreateArgsSchema: z.ZodType<Prisma.AgencyPatentCreateArgs> = z.object({
  select: AgencyPatentSelectSchema.optional(),
  include: AgencyPatentIncludeSchema.optional(),
  data: z.union([ AgencyPatentCreateInputSchema,AgencyPatentUncheckedCreateInputSchema ]),
}).strict() ;

export const AgencyPatentUpsertArgsSchema: z.ZodType<Prisma.AgencyPatentUpsertArgs> = z.object({
  select: AgencyPatentSelectSchema.optional(),
  include: AgencyPatentIncludeSchema.optional(),
  where: AgencyPatentWhereUniqueInputSchema,
  create: z.union([ AgencyPatentCreateInputSchema,AgencyPatentUncheckedCreateInputSchema ]),
  update: z.union([ AgencyPatentUpdateInputSchema,AgencyPatentUncheckedUpdateInputSchema ]),
}).strict() ;

export const AgencyPatentCreateManyArgsSchema: z.ZodType<Prisma.AgencyPatentCreateManyArgs> = z.object({
  data: z.union([ AgencyPatentCreateManyInputSchema,AgencyPatentCreateManyInputSchema.array() ]),
}).strict() ;

export const AgencyPatentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AgencyPatentCreateManyAndReturnArgs> = z.object({
  data: z.union([ AgencyPatentCreateManyInputSchema,AgencyPatentCreateManyInputSchema.array() ]),
}).strict() ;

export const AgencyPatentDeleteArgsSchema: z.ZodType<Prisma.AgencyPatentDeleteArgs> = z.object({
  select: AgencyPatentSelectSchema.optional(),
  include: AgencyPatentIncludeSchema.optional(),
  where: AgencyPatentWhereUniqueInputSchema,
}).strict() ;

export const AgencyPatentUpdateArgsSchema: z.ZodType<Prisma.AgencyPatentUpdateArgs> = z.object({
  select: AgencyPatentSelectSchema.optional(),
  include: AgencyPatentIncludeSchema.optional(),
  data: z.union([ AgencyPatentUpdateInputSchema,AgencyPatentUncheckedUpdateInputSchema ]),
  where: AgencyPatentWhereUniqueInputSchema,
}).strict() ;

export const AgencyPatentUpdateManyArgsSchema: z.ZodType<Prisma.AgencyPatentUpdateManyArgs> = z.object({
  data: z.union([ AgencyPatentUpdateManyMutationInputSchema,AgencyPatentUncheckedUpdateManyInputSchema ]),
  where: AgencyPatentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyAgencyPatentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyAgencyPatentCreateManyAndReturnArgs> = z.object({
  data: z.union([ AgencyPatentUpdateManyMutationInputSchema,AgencyPatentUncheckedUpdateManyInputSchema ]),
  where: AgencyPatentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AgencyPatentDeleteManyArgsSchema: z.ZodType<Prisma.AgencyPatentDeleteManyArgs> = z.object({
  where: AgencyPatentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AgencyContactPersonCreateArgsSchema: z.ZodType<Prisma.AgencyContactPersonCreateArgs> = z.object({
  select: AgencyContactPersonSelectSchema.optional(),
  include: AgencyContactPersonIncludeSchema.optional(),
  data: z.union([ AgencyContactPersonCreateInputSchema,AgencyContactPersonUncheckedCreateInputSchema ]),
}).strict() ;

export const AgencyContactPersonUpsertArgsSchema: z.ZodType<Prisma.AgencyContactPersonUpsertArgs> = z.object({
  select: AgencyContactPersonSelectSchema.optional(),
  include: AgencyContactPersonIncludeSchema.optional(),
  where: AgencyContactPersonWhereUniqueInputSchema,
  create: z.union([ AgencyContactPersonCreateInputSchema,AgencyContactPersonUncheckedCreateInputSchema ]),
  update: z.union([ AgencyContactPersonUpdateInputSchema,AgencyContactPersonUncheckedUpdateInputSchema ]),
}).strict() ;

export const AgencyContactPersonCreateManyArgsSchema: z.ZodType<Prisma.AgencyContactPersonCreateManyArgs> = z.object({
  data: z.union([ AgencyContactPersonCreateManyInputSchema,AgencyContactPersonCreateManyInputSchema.array() ]),
}).strict() ;

export const AgencyContactPersonCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AgencyContactPersonCreateManyAndReturnArgs> = z.object({
  data: z.union([ AgencyContactPersonCreateManyInputSchema,AgencyContactPersonCreateManyInputSchema.array() ]),
}).strict() ;

export const AgencyContactPersonDeleteArgsSchema: z.ZodType<Prisma.AgencyContactPersonDeleteArgs> = z.object({
  select: AgencyContactPersonSelectSchema.optional(),
  include: AgencyContactPersonIncludeSchema.optional(),
  where: AgencyContactPersonWhereUniqueInputSchema,
}).strict() ;

export const AgencyContactPersonUpdateArgsSchema: z.ZodType<Prisma.AgencyContactPersonUpdateArgs> = z.object({
  select: AgencyContactPersonSelectSchema.optional(),
  include: AgencyContactPersonIncludeSchema.optional(),
  data: z.union([ AgencyContactPersonUpdateInputSchema,AgencyContactPersonUncheckedUpdateInputSchema ]),
  where: AgencyContactPersonWhereUniqueInputSchema,
}).strict() ;

export const AgencyContactPersonUpdateManyArgsSchema: z.ZodType<Prisma.AgencyContactPersonUpdateManyArgs> = z.object({
  data: z.union([ AgencyContactPersonUpdateManyMutationInputSchema,AgencyContactPersonUncheckedUpdateManyInputSchema ]),
  where: AgencyContactPersonWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyAgencyContactPersonCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyAgencyContactPersonCreateManyAndReturnArgs> = z.object({
  data: z.union([ AgencyContactPersonUpdateManyMutationInputSchema,AgencyContactPersonUncheckedUpdateManyInputSchema ]),
  where: AgencyContactPersonWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AgencyContactPersonDeleteManyArgsSchema: z.ZodType<Prisma.AgencyContactPersonDeleteManyArgs> = z.object({
  where: AgencyContactPersonWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FundingPlanCreateArgsSchema: z.ZodType<Prisma.FundingPlanCreateArgs> = z.object({
  select: FundingPlanSelectSchema.optional(),
  include: FundingPlanIncludeSchema.optional(),
  data: z.union([ FundingPlanCreateInputSchema,FundingPlanUncheckedCreateInputSchema ]),
}).strict() ;

export const FundingPlanUpsertArgsSchema: z.ZodType<Prisma.FundingPlanUpsertArgs> = z.object({
  select: FundingPlanSelectSchema.optional(),
  include: FundingPlanIncludeSchema.optional(),
  where: FundingPlanWhereUniqueInputSchema,
  create: z.union([ FundingPlanCreateInputSchema,FundingPlanUncheckedCreateInputSchema ]),
  update: z.union([ FundingPlanUpdateInputSchema,FundingPlanUncheckedUpdateInputSchema ]),
}).strict() ;

export const FundingPlanCreateManyArgsSchema: z.ZodType<Prisma.FundingPlanCreateManyArgs> = z.object({
  data: z.union([ FundingPlanCreateManyInputSchema,FundingPlanCreateManyInputSchema.array() ]),
}).strict() ;

export const FundingPlanCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FundingPlanCreateManyAndReturnArgs> = z.object({
  data: z.union([ FundingPlanCreateManyInputSchema,FundingPlanCreateManyInputSchema.array() ]),
}).strict() ;

export const FundingPlanDeleteArgsSchema: z.ZodType<Prisma.FundingPlanDeleteArgs> = z.object({
  select: FundingPlanSelectSchema.optional(),
  include: FundingPlanIncludeSchema.optional(),
  where: FundingPlanWhereUniqueInputSchema,
}).strict() ;

export const FundingPlanUpdateArgsSchema: z.ZodType<Prisma.FundingPlanUpdateArgs> = z.object({
  select: FundingPlanSelectSchema.optional(),
  include: FundingPlanIncludeSchema.optional(),
  data: z.union([ FundingPlanUpdateInputSchema,FundingPlanUncheckedUpdateInputSchema ]),
  where: FundingPlanWhereUniqueInputSchema,
}).strict() ;

export const FundingPlanUpdateManyArgsSchema: z.ZodType<Prisma.FundingPlanUpdateManyArgs> = z.object({
  data: z.union([ FundingPlanUpdateManyMutationInputSchema,FundingPlanUncheckedUpdateManyInputSchema ]),
  where: FundingPlanWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyFundingPlanCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyFundingPlanCreateManyAndReturnArgs> = z.object({
  data: z.union([ FundingPlanUpdateManyMutationInputSchema,FundingPlanUncheckedUpdateManyInputSchema ]),
  where: FundingPlanWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FundingPlanDeleteManyArgsSchema: z.ZodType<Prisma.FundingPlanDeleteManyArgs> = z.object({
  where: FundingPlanWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentFundingCreateArgsSchema: z.ZodType<Prisma.PatentFundingCreateArgs> = z.object({
  select: PatentFundingSelectSchema.optional(),
  include: PatentFundingIncludeSchema.optional(),
  data: z.union([ PatentFundingCreateInputSchema,PatentFundingUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentFundingUpsertArgsSchema: z.ZodType<Prisma.PatentFundingUpsertArgs> = z.object({
  select: PatentFundingSelectSchema.optional(),
  include: PatentFundingIncludeSchema.optional(),
  where: PatentFundingWhereUniqueInputSchema,
  create: z.union([ PatentFundingCreateInputSchema,PatentFundingUncheckedCreateInputSchema ]),
  update: z.union([ PatentFundingUpdateInputSchema,PatentFundingUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentFundingCreateManyArgsSchema: z.ZodType<Prisma.PatentFundingCreateManyArgs> = z.object({
  data: z.union([ PatentFundingCreateManyInputSchema,PatentFundingCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentFundingCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentFundingCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentFundingCreateManyInputSchema,PatentFundingCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentFundingDeleteArgsSchema: z.ZodType<Prisma.PatentFundingDeleteArgs> = z.object({
  select: PatentFundingSelectSchema.optional(),
  include: PatentFundingIncludeSchema.optional(),
  where: PatentFundingWhereUniqueInputSchema,
}).strict() ;

export const PatentFundingUpdateArgsSchema: z.ZodType<Prisma.PatentFundingUpdateArgs> = z.object({
  select: PatentFundingSelectSchema.optional(),
  include: PatentFundingIncludeSchema.optional(),
  data: z.union([ PatentFundingUpdateInputSchema,PatentFundingUncheckedUpdateInputSchema ]),
  where: PatentFundingWhereUniqueInputSchema,
}).strict() ;

export const PatentFundingUpdateManyArgsSchema: z.ZodType<Prisma.PatentFundingUpdateManyArgs> = z.object({
  data: z.union([ PatentFundingUpdateManyMutationInputSchema,PatentFundingUncheckedUpdateManyInputSchema ]),
  where: PatentFundingWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyPatentFundingCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyPatentFundingCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentFundingUpdateManyMutationInputSchema,PatentFundingUncheckedUpdateManyInputSchema ]),
  where: PatentFundingWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentFundingDeleteManyArgsSchema: z.ZodType<Prisma.PatentFundingDeleteManyArgs> = z.object({
  where: PatentFundingWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const InventorCreateArgsSchema: z.ZodType<Prisma.InventorCreateArgs> = z.object({
  select: InventorSelectSchema.optional(),
  include: InventorIncludeSchema.optional(),
  data: z.union([ InventorCreateInputSchema,InventorUncheckedCreateInputSchema ]),
}).strict() ;

export const InventorUpsertArgsSchema: z.ZodType<Prisma.InventorUpsertArgs> = z.object({
  select: InventorSelectSchema.optional(),
  include: InventorIncludeSchema.optional(),
  where: InventorWhereUniqueInputSchema,
  create: z.union([ InventorCreateInputSchema,InventorUncheckedCreateInputSchema ]),
  update: z.union([ InventorUpdateInputSchema,InventorUncheckedUpdateInputSchema ]),
}).strict() ;

export const InventorCreateManyArgsSchema: z.ZodType<Prisma.InventorCreateManyArgs> = z.object({
  data: z.union([ InventorCreateManyInputSchema,InventorCreateManyInputSchema.array() ]),
}).strict() ;

export const InventorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InventorCreateManyAndReturnArgs> = z.object({
  data: z.union([ InventorCreateManyInputSchema,InventorCreateManyInputSchema.array() ]),
}).strict() ;

export const InventorDeleteArgsSchema: z.ZodType<Prisma.InventorDeleteArgs> = z.object({
  select: InventorSelectSchema.optional(),
  include: InventorIncludeSchema.optional(),
  where: InventorWhereUniqueInputSchema,
}).strict() ;

export const InventorUpdateArgsSchema: z.ZodType<Prisma.InventorUpdateArgs> = z.object({
  select: InventorSelectSchema.optional(),
  include: InventorIncludeSchema.optional(),
  data: z.union([ InventorUpdateInputSchema,InventorUncheckedUpdateInputSchema ]),
  where: InventorWhereUniqueInputSchema,
}).strict() ;

export const InventorUpdateManyArgsSchema: z.ZodType<Prisma.InventorUpdateManyArgs> = z.object({
  data: z.union([ InventorUpdateManyMutationInputSchema,InventorUncheckedUpdateManyInputSchema ]),
  where: InventorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyInventorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyInventorCreateManyAndReturnArgs> = z.object({
  data: z.union([ InventorUpdateManyMutationInputSchema,InventorUncheckedUpdateManyInputSchema ]),
  where: InventorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const InventorDeleteManyArgsSchema: z.ZodType<Prisma.InventorDeleteManyArgs> = z.object({
  where: InventorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentInventorCreateArgsSchema: z.ZodType<Prisma.PatentInventorCreateArgs> = z.object({
  select: PatentInventorSelectSchema.optional(),
  include: PatentInventorIncludeSchema.optional(),
  data: z.union([ PatentInventorCreateInputSchema,PatentInventorUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentInventorUpsertArgsSchema: z.ZodType<Prisma.PatentInventorUpsertArgs> = z.object({
  select: PatentInventorSelectSchema.optional(),
  include: PatentInventorIncludeSchema.optional(),
  where: PatentInventorWhereUniqueInputSchema,
  create: z.union([ PatentInventorCreateInputSchema,PatentInventorUncheckedCreateInputSchema ]),
  update: z.union([ PatentInventorUpdateInputSchema,PatentInventorUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentInventorCreateManyArgsSchema: z.ZodType<Prisma.PatentInventorCreateManyArgs> = z.object({
  data: z.union([ PatentInventorCreateManyInputSchema,PatentInventorCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentInventorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentInventorCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentInventorCreateManyInputSchema,PatentInventorCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentInventorDeleteArgsSchema: z.ZodType<Prisma.PatentInventorDeleteArgs> = z.object({
  select: PatentInventorSelectSchema.optional(),
  include: PatentInventorIncludeSchema.optional(),
  where: PatentInventorWhereUniqueInputSchema,
}).strict() ;

export const PatentInventorUpdateArgsSchema: z.ZodType<Prisma.PatentInventorUpdateArgs> = z.object({
  select: PatentInventorSelectSchema.optional(),
  include: PatentInventorIncludeSchema.optional(),
  data: z.union([ PatentInventorUpdateInputSchema,PatentInventorUncheckedUpdateInputSchema ]),
  where: PatentInventorWhereUniqueInputSchema,
}).strict() ;

export const PatentInventorUpdateManyArgsSchema: z.ZodType<Prisma.PatentInventorUpdateManyArgs> = z.object({
  data: z.union([ PatentInventorUpdateManyMutationInputSchema,PatentInventorUncheckedUpdateManyInputSchema ]),
  where: PatentInventorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyPatentInventorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyPatentInventorCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentInventorUpdateManyMutationInputSchema,PatentInventorUncheckedUpdateManyInputSchema ]),
  where: PatentInventorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentInventorDeleteManyArgsSchema: z.ZodType<Prisma.PatentInventorDeleteManyArgs> = z.object({
  where: PatentInventorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentCreateArgsSchema: z.ZodType<Prisma.PatentCreateArgs> = z.object({
  select: PatentSelectSchema.optional(),
  include: PatentIncludeSchema.optional(),
  data: z.union([ PatentCreateInputSchema,PatentUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentUpsertArgsSchema: z.ZodType<Prisma.PatentUpsertArgs> = z.object({
  select: PatentSelectSchema.optional(),
  include: PatentIncludeSchema.optional(),
  where: PatentWhereUniqueInputSchema,
  create: z.union([ PatentCreateInputSchema,PatentUncheckedCreateInputSchema ]),
  update: z.union([ PatentUpdateInputSchema,PatentUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentCreateManyArgsSchema: z.ZodType<Prisma.PatentCreateManyArgs> = z.object({
  data: z.union([ PatentCreateManyInputSchema,PatentCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentCreateManyInputSchema,PatentCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentDeleteArgsSchema: z.ZodType<Prisma.PatentDeleteArgs> = z.object({
  select: PatentSelectSchema.optional(),
  include: PatentIncludeSchema.optional(),
  where: PatentWhereUniqueInputSchema,
}).strict() ;

export const PatentUpdateArgsSchema: z.ZodType<Prisma.PatentUpdateArgs> = z.object({
  select: PatentSelectSchema.optional(),
  include: PatentIncludeSchema.optional(),
  data: z.union([ PatentUpdateInputSchema,PatentUncheckedUpdateInputSchema ]),
  where: PatentWhereUniqueInputSchema,
}).strict() ;

export const PatentUpdateManyArgsSchema: z.ZodType<Prisma.PatentUpdateManyArgs> = z.object({
  data: z.union([ PatentUpdateManyMutationInputSchema,PatentUncheckedUpdateManyInputSchema ]),
  where: PatentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyPatentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyPatentCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentUpdateManyMutationInputSchema,PatentUncheckedUpdateManyInputSchema ]),
  where: PatentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentDeleteManyArgsSchema: z.ZodType<Prisma.PatentDeleteManyArgs> = z.object({
  where: PatentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentStatusCreateArgsSchema: z.ZodType<Prisma.PatentStatusCreateArgs> = z.object({
  select: PatentStatusSelectSchema.optional(),
  include: PatentStatusIncludeSchema.optional(),
  data: z.union([ PatentStatusCreateInputSchema,PatentStatusUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentStatusUpsertArgsSchema: z.ZodType<Prisma.PatentStatusUpsertArgs> = z.object({
  select: PatentStatusSelectSchema.optional(),
  include: PatentStatusIncludeSchema.optional(),
  where: PatentStatusWhereUniqueInputSchema,
  create: z.union([ PatentStatusCreateInputSchema,PatentStatusUncheckedCreateInputSchema ]),
  update: z.union([ PatentStatusUpdateInputSchema,PatentStatusUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentStatusCreateManyArgsSchema: z.ZodType<Prisma.PatentStatusCreateManyArgs> = z.object({
  data: z.union([ PatentStatusCreateManyInputSchema,PatentStatusCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentStatusCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentStatusCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentStatusCreateManyInputSchema,PatentStatusCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentStatusDeleteArgsSchema: z.ZodType<Prisma.PatentStatusDeleteArgs> = z.object({
  select: PatentStatusSelectSchema.optional(),
  include: PatentStatusIncludeSchema.optional(),
  where: PatentStatusWhereUniqueInputSchema,
}).strict() ;

export const PatentStatusUpdateArgsSchema: z.ZodType<Prisma.PatentStatusUpdateArgs> = z.object({
  select: PatentStatusSelectSchema.optional(),
  include: PatentStatusIncludeSchema.optional(),
  data: z.union([ PatentStatusUpdateInputSchema,PatentStatusUncheckedUpdateInputSchema ]),
  where: PatentStatusWhereUniqueInputSchema,
}).strict() ;

export const PatentStatusUpdateManyArgsSchema: z.ZodType<Prisma.PatentStatusUpdateManyArgs> = z.object({
  data: z.union([ PatentStatusUpdateManyMutationInputSchema,PatentStatusUncheckedUpdateManyInputSchema ]),
  where: PatentStatusWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyPatentStatusCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyPatentStatusCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentStatusUpdateManyMutationInputSchema,PatentStatusUncheckedUpdateManyInputSchema ]),
  where: PatentStatusWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentStatusDeleteManyArgsSchema: z.ZodType<Prisma.PatentStatusDeleteManyArgs> = z.object({
  where: PatentStatusWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentApplicationDataCreateArgsSchema: z.ZodType<Prisma.PatentApplicationDataCreateArgs> = z.object({
  select: PatentApplicationDataSelectSchema.optional(),
  include: PatentApplicationDataIncludeSchema.optional(),
  data: z.union([ PatentApplicationDataCreateInputSchema,PatentApplicationDataUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentApplicationDataUpsertArgsSchema: z.ZodType<Prisma.PatentApplicationDataUpsertArgs> = z.object({
  select: PatentApplicationDataSelectSchema.optional(),
  include: PatentApplicationDataIncludeSchema.optional(),
  where: PatentApplicationDataWhereUniqueInputSchema,
  create: z.union([ PatentApplicationDataCreateInputSchema,PatentApplicationDataUncheckedCreateInputSchema ]),
  update: z.union([ PatentApplicationDataUpdateInputSchema,PatentApplicationDataUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentApplicationDataCreateManyArgsSchema: z.ZodType<Prisma.PatentApplicationDataCreateManyArgs> = z.object({
  data: z.union([ PatentApplicationDataCreateManyInputSchema,PatentApplicationDataCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentApplicationDataCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentApplicationDataCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentApplicationDataCreateManyInputSchema,PatentApplicationDataCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentApplicationDataDeleteArgsSchema: z.ZodType<Prisma.PatentApplicationDataDeleteArgs> = z.object({
  select: PatentApplicationDataSelectSchema.optional(),
  include: PatentApplicationDataIncludeSchema.optional(),
  where: PatentApplicationDataWhereUniqueInputSchema,
}).strict() ;

export const PatentApplicationDataUpdateArgsSchema: z.ZodType<Prisma.PatentApplicationDataUpdateArgs> = z.object({
  select: PatentApplicationDataSelectSchema.optional(),
  include: PatentApplicationDataIncludeSchema.optional(),
  data: z.union([ PatentApplicationDataUpdateInputSchema,PatentApplicationDataUncheckedUpdateInputSchema ]),
  where: PatentApplicationDataWhereUniqueInputSchema,
}).strict() ;

export const PatentApplicationDataUpdateManyArgsSchema: z.ZodType<Prisma.PatentApplicationDataUpdateManyArgs> = z.object({
  data: z.union([ PatentApplicationDataUpdateManyMutationInputSchema,PatentApplicationDataUncheckedUpdateManyInputSchema ]),
  where: PatentApplicationDataWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyPatentApplicationDataCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyPatentApplicationDataCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentApplicationDataUpdateManyMutationInputSchema,PatentApplicationDataUncheckedUpdateManyInputSchema ]),
  where: PatentApplicationDataWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentApplicationDataDeleteManyArgsSchema: z.ZodType<Prisma.PatentApplicationDataDeleteManyArgs> = z.object({
  where: PatentApplicationDataWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentTechnicalAttributesCreateArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesCreateArgs> = z.object({
  select: PatentTechnicalAttributesSelectSchema.optional(),
  include: PatentTechnicalAttributesIncludeSchema.optional(),
  data: z.union([ PatentTechnicalAttributesCreateInputSchema,PatentTechnicalAttributesUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentTechnicalAttributesUpsertArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpsertArgs> = z.object({
  select: PatentTechnicalAttributesSelectSchema.optional(),
  include: PatentTechnicalAttributesIncludeSchema.optional(),
  where: PatentTechnicalAttributesWhereUniqueInputSchema,
  create: z.union([ PatentTechnicalAttributesCreateInputSchema,PatentTechnicalAttributesUncheckedCreateInputSchema ]),
  update: z.union([ PatentTechnicalAttributesUpdateInputSchema,PatentTechnicalAttributesUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentTechnicalAttributesCreateManyArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesCreateManyArgs> = z.object({
  data: z.union([ PatentTechnicalAttributesCreateManyInputSchema,PatentTechnicalAttributesCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentTechnicalAttributesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentTechnicalAttributesCreateManyInputSchema,PatentTechnicalAttributesCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentTechnicalAttributesDeleteArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesDeleteArgs> = z.object({
  select: PatentTechnicalAttributesSelectSchema.optional(),
  include: PatentTechnicalAttributesIncludeSchema.optional(),
  where: PatentTechnicalAttributesWhereUniqueInputSchema,
}).strict() ;

export const PatentTechnicalAttributesUpdateArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpdateArgs> = z.object({
  select: PatentTechnicalAttributesSelectSchema.optional(),
  include: PatentTechnicalAttributesIncludeSchema.optional(),
  data: z.union([ PatentTechnicalAttributesUpdateInputSchema,PatentTechnicalAttributesUncheckedUpdateInputSchema ]),
  where: PatentTechnicalAttributesWhereUniqueInputSchema,
}).strict() ;

export const PatentTechnicalAttributesUpdateManyArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpdateManyArgs> = z.object({
  data: z.union([ PatentTechnicalAttributesUpdateManyMutationInputSchema,PatentTechnicalAttributesUncheckedUpdateManyInputSchema ]),
  where: PatentTechnicalAttributesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyPatentTechnicalAttributesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyPatentTechnicalAttributesCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentTechnicalAttributesUpdateManyMutationInputSchema,PatentTechnicalAttributesUncheckedUpdateManyInputSchema ]),
  where: PatentTechnicalAttributesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentTechnicalAttributesDeleteManyArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesDeleteManyArgs> = z.object({
  where: PatentTechnicalAttributesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TechnicalKeywordCreateArgsSchema: z.ZodType<Prisma.TechnicalKeywordCreateArgs> = z.object({
  select: TechnicalKeywordSelectSchema.optional(),
  include: TechnicalKeywordIncludeSchema.optional(),
  data: z.union([ TechnicalKeywordCreateInputSchema,TechnicalKeywordUncheckedCreateInputSchema ]),
}).strict() ;

export const TechnicalKeywordUpsertArgsSchema: z.ZodType<Prisma.TechnicalKeywordUpsertArgs> = z.object({
  select: TechnicalKeywordSelectSchema.optional(),
  include: TechnicalKeywordIncludeSchema.optional(),
  where: TechnicalKeywordWhereUniqueInputSchema,
  create: z.union([ TechnicalKeywordCreateInputSchema,TechnicalKeywordUncheckedCreateInputSchema ]),
  update: z.union([ TechnicalKeywordUpdateInputSchema,TechnicalKeywordUncheckedUpdateInputSchema ]),
}).strict() ;

export const TechnicalKeywordCreateManyArgsSchema: z.ZodType<Prisma.TechnicalKeywordCreateManyArgs> = z.object({
  data: z.union([ TechnicalKeywordCreateManyInputSchema,TechnicalKeywordCreateManyInputSchema.array() ]),
}).strict() ;

export const TechnicalKeywordCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TechnicalKeywordCreateManyAndReturnArgs> = z.object({
  data: z.union([ TechnicalKeywordCreateManyInputSchema,TechnicalKeywordCreateManyInputSchema.array() ]),
}).strict() ;

export const TechnicalKeywordDeleteArgsSchema: z.ZodType<Prisma.TechnicalKeywordDeleteArgs> = z.object({
  select: TechnicalKeywordSelectSchema.optional(),
  include: TechnicalKeywordIncludeSchema.optional(),
  where: TechnicalKeywordWhereUniqueInputSchema,
}).strict() ;

export const TechnicalKeywordUpdateArgsSchema: z.ZodType<Prisma.TechnicalKeywordUpdateArgs> = z.object({
  select: TechnicalKeywordSelectSchema.optional(),
  include: TechnicalKeywordIncludeSchema.optional(),
  data: z.union([ TechnicalKeywordUpdateInputSchema,TechnicalKeywordUncheckedUpdateInputSchema ]),
  where: TechnicalKeywordWhereUniqueInputSchema,
}).strict() ;

export const TechnicalKeywordUpdateManyArgsSchema: z.ZodType<Prisma.TechnicalKeywordUpdateManyArgs> = z.object({
  data: z.union([ TechnicalKeywordUpdateManyMutationInputSchema,TechnicalKeywordUncheckedUpdateManyInputSchema ]),
  where: TechnicalKeywordWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyTechnicalKeywordCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyTechnicalKeywordCreateManyAndReturnArgs> = z.object({
  data: z.union([ TechnicalKeywordUpdateManyMutationInputSchema,TechnicalKeywordUncheckedUpdateManyInputSchema ]),
  where: TechnicalKeywordWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TechnicalKeywordDeleteManyArgsSchema: z.ZodType<Prisma.TechnicalKeywordDeleteManyArgs> = z.object({
  where: TechnicalKeywordWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CollegeCreateArgsSchema: z.ZodType<Prisma.CollegeCreateArgs> = z.object({
  select: CollegeSelectSchema.optional(),
  include: CollegeIncludeSchema.optional(),
  data: z.union([ CollegeCreateInputSchema,CollegeUncheckedCreateInputSchema ]),
}).strict() ;

export const CollegeUpsertArgsSchema: z.ZodType<Prisma.CollegeUpsertArgs> = z.object({
  select: CollegeSelectSchema.optional(),
  include: CollegeIncludeSchema.optional(),
  where: CollegeWhereUniqueInputSchema,
  create: z.union([ CollegeCreateInputSchema,CollegeUncheckedCreateInputSchema ]),
  update: z.union([ CollegeUpdateInputSchema,CollegeUncheckedUpdateInputSchema ]),
}).strict() ;

export const CollegeCreateManyArgsSchema: z.ZodType<Prisma.CollegeCreateManyArgs> = z.object({
  data: z.union([ CollegeCreateManyInputSchema,CollegeCreateManyInputSchema.array() ]),
}).strict() ;

export const CollegeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CollegeCreateManyAndReturnArgs> = z.object({
  data: z.union([ CollegeCreateManyInputSchema,CollegeCreateManyInputSchema.array() ]),
}).strict() ;

export const CollegeDeleteArgsSchema: z.ZodType<Prisma.CollegeDeleteArgs> = z.object({
  select: CollegeSelectSchema.optional(),
  include: CollegeIncludeSchema.optional(),
  where: CollegeWhereUniqueInputSchema,
}).strict() ;

export const CollegeUpdateArgsSchema: z.ZodType<Prisma.CollegeUpdateArgs> = z.object({
  select: CollegeSelectSchema.optional(),
  include: CollegeIncludeSchema.optional(),
  data: z.union([ CollegeUpdateInputSchema,CollegeUncheckedUpdateInputSchema ]),
  where: CollegeWhereUniqueInputSchema,
}).strict() ;

export const CollegeUpdateManyArgsSchema: z.ZodType<Prisma.CollegeUpdateManyArgs> = z.object({
  data: z.union([ CollegeUpdateManyMutationInputSchema,CollegeUncheckedUpdateManyInputSchema ]),
  where: CollegeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyCollegeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyCollegeCreateManyAndReturnArgs> = z.object({
  data: z.union([ CollegeUpdateManyMutationInputSchema,CollegeUncheckedUpdateManyInputSchema ]),
  where: CollegeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CollegeDeleteManyArgsSchema: z.ZodType<Prisma.CollegeDeleteManyArgs> = z.object({
  where: CollegeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DepartmentCreateArgsSchema: z.ZodType<Prisma.DepartmentCreateArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  data: z.union([ DepartmentCreateInputSchema,DepartmentUncheckedCreateInputSchema ]),
}).strict() ;

export const DepartmentUpsertArgsSchema: z.ZodType<Prisma.DepartmentUpsertArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereUniqueInputSchema,
  create: z.union([ DepartmentCreateInputSchema,DepartmentUncheckedCreateInputSchema ]),
  update: z.union([ DepartmentUpdateInputSchema,DepartmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const DepartmentCreateManyArgsSchema: z.ZodType<Prisma.DepartmentCreateManyArgs> = z.object({
  data: z.union([ DepartmentCreateManyInputSchema,DepartmentCreateManyInputSchema.array() ]),
}).strict() ;

export const DepartmentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DepartmentCreateManyAndReturnArgs> = z.object({
  data: z.union([ DepartmentCreateManyInputSchema,DepartmentCreateManyInputSchema.array() ]),
}).strict() ;

export const DepartmentDeleteArgsSchema: z.ZodType<Prisma.DepartmentDeleteArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereUniqueInputSchema,
}).strict() ;

export const DepartmentUpdateArgsSchema: z.ZodType<Prisma.DepartmentUpdateArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  data: z.union([ DepartmentUpdateInputSchema,DepartmentUncheckedUpdateInputSchema ]),
  where: DepartmentWhereUniqueInputSchema,
}).strict() ;

export const DepartmentUpdateManyArgsSchema: z.ZodType<Prisma.DepartmentUpdateManyArgs> = z.object({
  data: z.union([ DepartmentUpdateManyMutationInputSchema,DepartmentUncheckedUpdateManyInputSchema ]),
  where: DepartmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyDepartmentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyDepartmentCreateManyAndReturnArgs> = z.object({
  data: z.union([ DepartmentUpdateManyMutationInputSchema,DepartmentUncheckedUpdateManyInputSchema ]),
  where: DepartmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DepartmentDeleteManyArgsSchema: z.ZodType<Prisma.DepartmentDeleteManyArgs> = z.object({
  where: DepartmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CountryCreateArgsSchema: z.ZodType<Prisma.CountryCreateArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  data: z.union([ CountryCreateInputSchema,CountryUncheckedCreateInputSchema ]),
}).strict() ;

export const CountryUpsertArgsSchema: z.ZodType<Prisma.CountryUpsertArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
  create: z.union([ CountryCreateInputSchema,CountryUncheckedCreateInputSchema ]),
  update: z.union([ CountryUpdateInputSchema,CountryUncheckedUpdateInputSchema ]),
}).strict() ;

export const CountryCreateManyArgsSchema: z.ZodType<Prisma.CountryCreateManyArgs> = z.object({
  data: z.union([ CountryCreateManyInputSchema,CountryCreateManyInputSchema.array() ]),
}).strict() ;

export const CountryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CountryCreateManyAndReturnArgs> = z.object({
  data: z.union([ CountryCreateManyInputSchema,CountryCreateManyInputSchema.array() ]),
}).strict() ;

export const CountryDeleteArgsSchema: z.ZodType<Prisma.CountryDeleteArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
}).strict() ;

export const CountryUpdateArgsSchema: z.ZodType<Prisma.CountryUpdateArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  data: z.union([ CountryUpdateInputSchema,CountryUncheckedUpdateInputSchema ]),
  where: CountryWhereUniqueInputSchema,
}).strict() ;

export const CountryUpdateManyArgsSchema: z.ZodType<Prisma.CountryUpdateManyArgs> = z.object({
  data: z.union([ CountryUpdateManyMutationInputSchema,CountryUncheckedUpdateManyInputSchema ]),
  where: CountryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyCountryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyCountryCreateManyAndReturnArgs> = z.object({
  data: z.union([ CountryUpdateManyMutationInputSchema,CountryUncheckedUpdateManyInputSchema ]),
  where: CountryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CountryDeleteManyArgsSchema: z.ZodType<Prisma.CountryDeleteManyArgs> = z.object({
  where: CountryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ContactInfoCreateArgsSchema: z.ZodType<Prisma.ContactInfoCreateArgs> = z.object({
  select: ContactInfoSelectSchema.optional(),
  include: ContactInfoIncludeSchema.optional(),
  data: z.union([ ContactInfoCreateInputSchema,ContactInfoUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const ContactInfoUpsertArgsSchema: z.ZodType<Prisma.ContactInfoUpsertArgs> = z.object({
  select: ContactInfoSelectSchema.optional(),
  include: ContactInfoIncludeSchema.optional(),
  where: ContactInfoWhereUniqueInputSchema,
  create: z.union([ ContactInfoCreateInputSchema,ContactInfoUncheckedCreateInputSchema ]),
  update: z.union([ ContactInfoUpdateInputSchema,ContactInfoUncheckedUpdateInputSchema ]),
}).strict() ;

export const ContactInfoCreateManyArgsSchema: z.ZodType<Prisma.ContactInfoCreateManyArgs> = z.object({
  data: z.union([ ContactInfoCreateManyInputSchema,ContactInfoCreateManyInputSchema.array() ]),
}).strict() ;

export const ContactInfoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ContactInfoCreateManyAndReturnArgs> = z.object({
  data: z.union([ ContactInfoCreateManyInputSchema,ContactInfoCreateManyInputSchema.array() ]),
}).strict() ;

export const ContactInfoDeleteArgsSchema: z.ZodType<Prisma.ContactInfoDeleteArgs> = z.object({
  select: ContactInfoSelectSchema.optional(),
  include: ContactInfoIncludeSchema.optional(),
  where: ContactInfoWhereUniqueInputSchema,
}).strict() ;

export const ContactInfoUpdateArgsSchema: z.ZodType<Prisma.ContactInfoUpdateArgs> = z.object({
  select: ContactInfoSelectSchema.optional(),
  include: ContactInfoIncludeSchema.optional(),
  data: z.union([ ContactInfoUpdateInputSchema,ContactInfoUncheckedUpdateInputSchema ]),
  where: ContactInfoWhereUniqueInputSchema,
}).strict() ;

export const ContactInfoUpdateManyArgsSchema: z.ZodType<Prisma.ContactInfoUpdateManyArgs> = z.object({
  data: z.union([ ContactInfoUpdateManyMutationInputSchema,ContactInfoUncheckedUpdateManyInputSchema ]),
  where: ContactInfoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const updateManyContactInfoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyContactInfoCreateManyAndReturnArgs> = z.object({
  data: z.union([ ContactInfoUpdateManyMutationInputSchema,ContactInfoUncheckedUpdateManyInputSchema ]),
  where: ContactInfoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ContactInfoDeleteManyArgsSchema: z.ZodType<Prisma.ContactInfoDeleteManyArgs> = z.object({
  where: ContactInfoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;