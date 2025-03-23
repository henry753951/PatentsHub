import { z } from 'zod';
import { Prisma } from '../../../node_modules/@prisma/client/node_modules/.prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const AgencyUnitScalarFieldEnumSchema = z.enum(['AgencyUnitID','Name','Description']);

export const PatentTakerAgencyUnitScalarFieldEnumSchema = z.enum(['PatentID','AgencyUnitID','FileCode','agencyUnitPersonIds']);

export const PatentInitiatorAgencyUnitScalarFieldEnumSchema = z.enum(['PatentID','AgencyUnitID','agencyUnitPersonIds']);

export const AgencyUnitPersonScalarFieldEnumSchema = z.enum(['AgencyUnitID','ContactInfoID']);

export const FundingPlanScalarFieldEnumSchema = z.enum(['PlanID','PlanType','Name']);

export const FundingUnitScalarFieldEnumSchema = z.enum(['FundingUnitID','Name']);

export const PatentFundingScalarFieldEnumSchema = z.enum(['PatentID','fundingPlanPlanID']);

export const FundingRecordScalarFieldEnumSchema = z.enum(['FundingRecordID','PatentFundingPatentID','Amount']);

export const PatentFundingUnitScalarFieldEnumSchema = z.enum(['PatentID','FundingUnitID','ProjectCode']);

export const InventorScalarFieldEnumSchema = z.enum(['InventorID','DepartmentID','ContactInfoID']);

export const PatentInventorScalarFieldEnumSchema = z.enum(['PatentID','InventorID','Main','Contribution']);

export const NoteScalarFieldEnumSchema = z.enum(['NoteID','Key','Title','Body','Date']);

export const PatentScalarFieldEnumSchema = z.enum(['PatentID','DepartmentID','Year','DraftTitle','Title','TitleEnglish','CountryID','PatentType','createdAt']);

export const PatentApplicationDataScalarFieldEnumSchema = z.enum(['PatentID','ApplicationNumber','FilingDate','RDResultNumber','NSCNumber']);

export const PatentTechnicalAttributesScalarFieldEnumSchema = z.enum(['PatentID','MaturityLevel']);

export const TechnicalKeywordScalarFieldEnumSchema = z.enum(['KeywordID','Keyword']);

export const PatentInternalScalarFieldEnumSchema = z.enum(['PatentID','InternalID','InitialReviewDate','InitialReviewNumber']);

export const PatentExternalScalarFieldEnumSchema = z.enum(['PatentID','PatentNumber','PublicationDate','StartDate','EndDate','IPCNumber','PatentScope']);

export const PatentManualStatusScalarFieldEnumSchema = z.enum(['ManualStatusID','PatentID','Reason','Date','Active']);

export const PatentMaintenanceScalarFieldEnumSchema = z.enum(['MaintenanceID','PatentID','MaintenanceDate','ExpireDate']);

export const PatentRecordScalarFieldEnumSchema = z.enum(['id','PatentID','Record','Date']);

export const CollegeScalarFieldEnumSchema = z.enum(['CollegeID','Name','Description']);

export const DepartmentScalarFieldEnumSchema = z.enum(['DepartmentID','Name','CollegeID','Description']);

export const CountryScalarFieldEnumSchema = z.enum(['CountryID','CountryName','ISOCode']);

export const ContactInfoScalarFieldEnumSchema = z.enum(['ContactInfoID','Name','Email','OfficeNumber','PhoneNumber','Role','Note']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const EnumPatentTypeSchema = z.enum(['INVENTION','UTILITY_MODEL','DESIGN','PLANT']);

export type EnumPatentTypeType = `${z.infer<typeof EnumPatentTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// AGENCY UNIT SCHEMA
/////////////////////////////////////////

export const AgencyUnitSchema = z.object({
  AgencyUnitID: z.number().int(),
  Name: z.string(),
  Description: z.string().nullish(),
})

export type AgencyUnit = z.infer<typeof AgencyUnitSchema>

/////////////////////////////////////////
// PATENT TAKER AGENCY UNIT SCHEMA
/////////////////////////////////////////

export const PatentTakerAgencyUnitSchema = z.object({
  PatentID: z.number().int(),
  AgencyUnitID: z.number().int(),
  FileCode: z.string(),
  agencyUnitPersonIds: JsonValueSchema.nullable(),
})

export type PatentTakerAgencyUnit = z.infer<typeof PatentTakerAgencyUnitSchema>

/////////////////////////////////////////
// PATENT INITIATOR AGENCY UNIT SCHEMA
/////////////////////////////////////////

export const PatentInitiatorAgencyUnitSchema = z.object({
  PatentID: z.number().int(),
  AgencyUnitID: z.number().int(),
  agencyUnitPersonIds: JsonValueSchema.nullable(),
})

export type PatentInitiatorAgencyUnit = z.infer<typeof PatentInitiatorAgencyUnitSchema>

/////////////////////////////////////////
// AGENCY UNIT PERSON SCHEMA
/////////////////////////////////////////

export const AgencyUnitPersonSchema = z.object({
  AgencyUnitID: z.number().int(),
  ContactInfoID: z.number().int(),
})

export type AgencyUnitPerson = z.infer<typeof AgencyUnitPersonSchema>

/////////////////////////////////////////
// FUNDING PLAN SCHEMA
/////////////////////////////////////////

export const FundingPlanSchema = z.object({
  PlanID: z.number().int(),
  PlanType: z.number().int(),
  Name: z.string(),
})

export type FundingPlan = z.infer<typeof FundingPlanSchema>

/////////////////////////////////////////
// FUNDING UNIT SCHEMA
/////////////////////////////////////////

export const FundingUnitSchema = z.object({
  FundingUnitID: z.number().int(),
  Name: z.string(),
})

export type FundingUnit = z.infer<typeof FundingUnitSchema>

/////////////////////////////////////////
// PATENT FUNDING SCHEMA
/////////////////////////////////////////

export const PatentFundingSchema = z.object({
  PatentID: z.number().int(),
  fundingPlanPlanID: z.number().int(),
})

export type PatentFunding = z.infer<typeof PatentFundingSchema>

/////////////////////////////////////////
// FUNDING RECORD SCHEMA
/////////////////////////////////////////

export const FundingRecordSchema = z.object({
  FundingRecordID: z.number().int(),
  PatentFundingPatentID: z.number().int(),
  Amount: z.number(),
})

export type FundingRecord = z.infer<typeof FundingRecordSchema>

/////////////////////////////////////////
// PATENT FUNDING UNIT SCHEMA
/////////////////////////////////////////

export const PatentFundingUnitSchema = z.object({
  PatentID: z.number().int(),
  FundingUnitID: z.number().int(),
  ProjectCode: z.string(),
})

export type PatentFundingUnit = z.infer<typeof PatentFundingUnitSchema>

/////////////////////////////////////////
// INVENTOR SCHEMA
/////////////////////////////////////////

export const InventorSchema = z.object({
  InventorID: z.number().int(),
  DepartmentID: z.number().int(),
  ContactInfoID: z.number().int(),
})

export type Inventor = z.infer<typeof InventorSchema>

/////////////////////////////////////////
// PATENT INVENTOR SCHEMA
/////////////////////////////////////////

export const PatentInventorSchema = z.object({
  PatentID: z.number().int(),
  InventorID: z.number().int(),
  Main: z.boolean(),
  Contribution: z.number().nullish(),
})

export type PatentInventor = z.infer<typeof PatentInventorSchema>

/////////////////////////////////////////
// NOTE SCHEMA
/////////////////////////////////////////

export const NoteSchema = z.object({
  NoteID: z.number().int(),
  Key: z.string(),
  Title: z.string(),
  Body: z.string(),
  Date: z.coerce.date(),
})

export type Note = z.infer<typeof NoteSchema>

/////////////////////////////////////////
// PATENT SCHEMA
/////////////////////////////////////////

export const PatentSchema = z.object({
  PatentType: EnumPatentTypeSchema.nullish(),
  PatentID: z.number().int(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string(),
  Title: z.string(),
  TitleEnglish: z.string(),
  CountryID: z.number().int().nullish(),
  createdAt: z.coerce.date(),
})

export type Patent = z.infer<typeof PatentSchema>

/////////////////////////////////////////
// PATENT APPLICATION DATA SCHEMA
/////////////////////////////////////////

export const PatentApplicationDataSchema = z.object({
  PatentID: z.number().int(),
  ApplicationNumber: z.string().nullish(),
  FilingDate: z.coerce.date().nullish(),
  RDResultNumber: z.string().nullish(),
  NSCNumber: z.string().nullish(),
})

export type PatentApplicationData = z.infer<typeof PatentApplicationDataSchema>

/////////////////////////////////////////
// PATENT TECHNICAL ATTRIBUTES SCHEMA
/////////////////////////////////////////

export const PatentTechnicalAttributesSchema = z.object({
  PatentID: z.number().int(),
  MaturityLevel: z.string().nullish(),
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
// PATENT INTERNAL SCHEMA
/////////////////////////////////////////

export const PatentInternalSchema = z.object({
  PatentID: z.number().int(),
  InternalID: z.string(),
  InitialReviewDate: z.coerce.date().nullish(),
  InitialReviewNumber: z.number().int().nullish(),
})

export type PatentInternal = z.infer<typeof PatentInternalSchema>

/////////////////////////////////////////
// PATENT EXTERNAL SCHEMA
/////////////////////////////////////////

export const PatentExternalSchema = z.object({
  PatentID: z.number().int(),
  PatentNumber: z.string().nullish(),
  PublicationDate: z.coerce.date().nullish(),
  StartDate: z.coerce.date().nullish(),
  EndDate: z.coerce.date().nullish(),
  IPCNumber: z.string().nullish(),
  PatentScope: z.string().nullish(),
})

export type PatentExternal = z.infer<typeof PatentExternalSchema>

/////////////////////////////////////////
// PATENT MANUAL STATUS SCHEMA
/////////////////////////////////////////

export const PatentManualStatusSchema = z.object({
  ManualStatusID: z.number().int(),
  PatentID: z.number().int(),
  Reason: z.string(),
  Date: z.coerce.date().nullish(),
  Active: z.boolean(),
})

export type PatentManualStatus = z.infer<typeof PatentManualStatusSchema>

/////////////////////////////////////////
// PATENT MAINTENANCE SCHEMA
/////////////////////////////////////////

export const PatentMaintenanceSchema = z.object({
  MaintenanceID: z.number().int(),
  PatentID: z.number().int(),
  MaintenanceDate: z.coerce.date(),
  ExpireDate: z.coerce.date(),
})

export type PatentMaintenance = z.infer<typeof PatentMaintenanceSchema>

/////////////////////////////////////////
// PATENT RECORD SCHEMA
/////////////////////////////////////////

export const PatentRecordSchema = z.object({
  id: z.number().int(),
  PatentID: z.number().int(),
  Record: z.string().nullish(),
  Date: z.coerce.date().nullish(),
})

export type PatentRecord = z.infer<typeof PatentRecordSchema>

/////////////////////////////////////////
// COLLEGE SCHEMA
/////////////////////////////////////////

export const CollegeSchema = z.object({
  CollegeID: z.number().int(),
  Name: z.string(),
  Description: z.string().nullish(),
})

export type College = z.infer<typeof CollegeSchema>

/////////////////////////////////////////
// DEPARTMENT SCHEMA
/////////////////////////////////////////

export const DepartmentSchema = z.object({
  DepartmentID: z.number().int(),
  Name: z.string(),
  CollegeID: z.number().int(),
  Description: z.string().nullish(),
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
  Name: z.string(),
  Email: z.string().nullish(),
  OfficeNumber: z.string().nullish(),
  PhoneNumber: z.string().nullish(),
  Role: z.string().nullish(),
  Note: z.string().nullish(),
})

export type ContactInfo = z.infer<typeof ContactInfoSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// AGENCY UNIT
//------------------------------------------------------

export const AgencyUnitIncludeSchema: z.ZodType<Prisma.AgencyUnitInclude> = z.object({
  Persons: z.union([z.boolean(),z.lazy(() => AgencyUnitPersonFindManyArgsSchema)]).optional(),
  InitialReviewPatents: z.union([z.boolean(),z.lazy(() => PatentInitiatorAgencyUnitFindManyArgsSchema)]).optional(),
  TakerPatents: z.union([z.boolean(),z.lazy(() => PatentTakerAgencyUnitFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AgencyUnitCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AgencyUnitArgsSchema: z.ZodType<Prisma.AgencyUnitDefaultArgs> = z.object({
  select: z.lazy(() => AgencyUnitSelectSchema).optional(),
  include: z.lazy(() => AgencyUnitIncludeSchema).optional(),
}).strict();

export const AgencyUnitCountOutputTypeArgsSchema: z.ZodType<Prisma.AgencyUnitCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AgencyUnitCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AgencyUnitCountOutputTypeSelectSchema: z.ZodType<Prisma.AgencyUnitCountOutputTypeSelect> = z.object({
  Persons: z.boolean().optional(),
  InitialReviewPatents: z.boolean().optional(),
  TakerPatents: z.boolean().optional(),
}).strict();

export const AgencyUnitSelectSchema: z.ZodType<Prisma.AgencyUnitSelect> = z.object({
  AgencyUnitID: z.boolean().optional(),
  Name: z.boolean().optional(),
  Description: z.boolean().optional(),
  Persons: z.union([z.boolean(),z.lazy(() => AgencyUnitPersonFindManyArgsSchema)]).optional(),
  InitialReviewPatents: z.union([z.boolean(),z.lazy(() => PatentInitiatorAgencyUnitFindManyArgsSchema)]).optional(),
  TakerPatents: z.union([z.boolean(),z.lazy(() => PatentTakerAgencyUnitFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AgencyUnitCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PATENT TAKER AGENCY UNIT
//------------------------------------------------------

export const PatentTakerAgencyUnitIncludeSchema: z.ZodType<Prisma.PatentTakerAgencyUnitInclude> = z.object({
  agencyUnit: z.union([z.boolean(),z.lazy(() => AgencyUnitArgsSchema)]).optional(),
  patentInternal: z.union([z.boolean(),z.lazy(() => PatentInternalArgsSchema)]).optional(),
}).strict()

export const PatentTakerAgencyUnitArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitDefaultArgs> = z.object({
  select: z.lazy(() => PatentTakerAgencyUnitSelectSchema).optional(),
  include: z.lazy(() => PatentTakerAgencyUnitIncludeSchema).optional(),
}).strict();

export const PatentTakerAgencyUnitSelectSchema: z.ZodType<Prisma.PatentTakerAgencyUnitSelect> = z.object({
  PatentID: z.boolean().optional(),
  AgencyUnitID: z.boolean().optional(),
  FileCode: z.boolean().optional(),
  agencyUnitPersonIds: z.boolean().optional(),
  agencyUnit: z.union([z.boolean(),z.lazy(() => AgencyUnitArgsSchema)]).optional(),
  patentInternal: z.union([z.boolean(),z.lazy(() => PatentInternalArgsSchema)]).optional(),
}).strict()

// PATENT INITIATOR AGENCY UNIT
//------------------------------------------------------

export const PatentInitiatorAgencyUnitIncludeSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitInclude> = z.object({
  agencyUnit: z.union([z.boolean(),z.lazy(() => AgencyUnitArgsSchema)]).optional(),
  patentInternal: z.union([z.boolean(),z.lazy(() => PatentInternalArgsSchema)]).optional(),
}).strict()

export const PatentInitiatorAgencyUnitArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitDefaultArgs> = z.object({
  select: z.lazy(() => PatentInitiatorAgencyUnitSelectSchema).optional(),
  include: z.lazy(() => PatentInitiatorAgencyUnitIncludeSchema).optional(),
}).strict();

export const PatentInitiatorAgencyUnitSelectSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitSelect> = z.object({
  PatentID: z.boolean().optional(),
  AgencyUnitID: z.boolean().optional(),
  agencyUnitPersonIds: z.boolean().optional(),
  agencyUnit: z.union([z.boolean(),z.lazy(() => AgencyUnitArgsSchema)]).optional(),
  patentInternal: z.union([z.boolean(),z.lazy(() => PatentInternalArgsSchema)]).optional(),
}).strict()

// AGENCY UNIT PERSON
//------------------------------------------------------

export const AgencyUnitPersonIncludeSchema: z.ZodType<Prisma.AgencyUnitPersonInclude> = z.object({
  agencyUnit: z.union([z.boolean(),z.lazy(() => AgencyUnitArgsSchema)]).optional(),
  contactInfo: z.union([z.boolean(),z.lazy(() => ContactInfoArgsSchema)]).optional(),
}).strict()

export const AgencyUnitPersonArgsSchema: z.ZodType<Prisma.AgencyUnitPersonDefaultArgs> = z.object({
  select: z.lazy(() => AgencyUnitPersonSelectSchema).optional(),
  include: z.lazy(() => AgencyUnitPersonIncludeSchema).optional(),
}).strict();

export const AgencyUnitPersonSelectSchema: z.ZodType<Prisma.AgencyUnitPersonSelect> = z.object({
  AgencyUnitID: z.boolean().optional(),
  ContactInfoID: z.boolean().optional(),
  agencyUnit: z.union([z.boolean(),z.lazy(() => AgencyUnitArgsSchema)]).optional(),
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
  Name: z.boolean().optional(),
  fundings: z.union([z.boolean(),z.lazy(() => PatentFundingFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FundingPlanCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FUNDING UNIT
//------------------------------------------------------

export const FundingUnitIncludeSchema: z.ZodType<Prisma.FundingUnitInclude> = z.object({
  PatentFundingUnit: z.union([z.boolean(),z.lazy(() => PatentFundingUnitFindManyArgsSchema)]).optional(),
  FundingRecord: z.union([z.boolean(),z.lazy(() => FundingRecordFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FundingUnitCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FundingUnitArgsSchema: z.ZodType<Prisma.FundingUnitDefaultArgs> = z.object({
  select: z.lazy(() => FundingUnitSelectSchema).optional(),
  include: z.lazy(() => FundingUnitIncludeSchema).optional(),
}).strict();

export const FundingUnitCountOutputTypeArgsSchema: z.ZodType<Prisma.FundingUnitCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FundingUnitCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FundingUnitCountOutputTypeSelectSchema: z.ZodType<Prisma.FundingUnitCountOutputTypeSelect> = z.object({
  PatentFundingUnit: z.boolean().optional(),
  FundingRecord: z.boolean().optional(),
}).strict();

export const FundingUnitSelectSchema: z.ZodType<Prisma.FundingUnitSelect> = z.object({
  FundingUnitID: z.boolean().optional(),
  Name: z.boolean().optional(),
  PatentFundingUnit: z.union([z.boolean(),z.lazy(() => PatentFundingUnitFindManyArgsSchema)]).optional(),
  FundingRecord: z.union([z.boolean(),z.lazy(() => FundingRecordFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FundingUnitCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PATENT FUNDING
//------------------------------------------------------

export const PatentFundingIncludeSchema: z.ZodType<Prisma.PatentFundingInclude> = z.object({
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
  plan: z.union([z.boolean(),z.lazy(() => FundingPlanArgsSchema)]).optional(),
  fundingRecords: z.union([z.boolean(),z.lazy(() => FundingRecordFindManyArgsSchema)]).optional(),
  patentFundingUnits: z.union([z.boolean(),z.lazy(() => PatentFundingUnitFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatentFundingCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PatentFundingArgsSchema: z.ZodType<Prisma.PatentFundingDefaultArgs> = z.object({
  select: z.lazy(() => PatentFundingSelectSchema).optional(),
  include: z.lazy(() => PatentFundingIncludeSchema).optional(),
}).strict();

export const PatentFundingCountOutputTypeArgsSchema: z.ZodType<Prisma.PatentFundingCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PatentFundingCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PatentFundingCountOutputTypeSelectSchema: z.ZodType<Prisma.PatentFundingCountOutputTypeSelect> = z.object({
  fundingRecords: z.boolean().optional(),
  patentFundingUnits: z.boolean().optional(),
}).strict();

export const PatentFundingSelectSchema: z.ZodType<Prisma.PatentFundingSelect> = z.object({
  PatentID: z.boolean().optional(),
  fundingPlanPlanID: z.boolean().optional(),
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
  plan: z.union([z.boolean(),z.lazy(() => FundingPlanArgsSchema)]).optional(),
  fundingRecords: z.union([z.boolean(),z.lazy(() => FundingRecordFindManyArgsSchema)]).optional(),
  patentFundingUnits: z.union([z.boolean(),z.lazy(() => PatentFundingUnitFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatentFundingCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FUNDING RECORD
//------------------------------------------------------

export const FundingRecordIncludeSchema: z.ZodType<Prisma.FundingRecordInclude> = z.object({
  patentFunding: z.union([z.boolean(),z.lazy(() => PatentFundingArgsSchema)]).optional(),
  canFundingBy: z.union([z.boolean(),z.lazy(() => FundingUnitFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FundingRecordCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FundingRecordArgsSchema: z.ZodType<Prisma.FundingRecordDefaultArgs> = z.object({
  select: z.lazy(() => FundingRecordSelectSchema).optional(),
  include: z.lazy(() => FundingRecordIncludeSchema).optional(),
}).strict();

export const FundingRecordCountOutputTypeArgsSchema: z.ZodType<Prisma.FundingRecordCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FundingRecordCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FundingRecordCountOutputTypeSelectSchema: z.ZodType<Prisma.FundingRecordCountOutputTypeSelect> = z.object({
  canFundingBy: z.boolean().optional(),
}).strict();

export const FundingRecordSelectSchema: z.ZodType<Prisma.FundingRecordSelect> = z.object({
  FundingRecordID: z.boolean().optional(),
  PatentFundingPatentID: z.boolean().optional(),
  Amount: z.boolean().optional(),
  patentFunding: z.union([z.boolean(),z.lazy(() => PatentFundingArgsSchema)]).optional(),
  canFundingBy: z.union([z.boolean(),z.lazy(() => FundingUnitFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FundingRecordCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PATENT FUNDING UNIT
//------------------------------------------------------

export const PatentFundingUnitIncludeSchema: z.ZodType<Prisma.PatentFundingUnitInclude> = z.object({
  fundingUnit: z.union([z.boolean(),z.lazy(() => FundingUnitArgsSchema)]).optional(),
  patentFunding: z.union([z.boolean(),z.lazy(() => PatentFundingArgsSchema)]).optional(),
}).strict()

export const PatentFundingUnitArgsSchema: z.ZodType<Prisma.PatentFundingUnitDefaultArgs> = z.object({
  select: z.lazy(() => PatentFundingUnitSelectSchema).optional(),
  include: z.lazy(() => PatentFundingUnitIncludeSchema).optional(),
}).strict();

export const PatentFundingUnitSelectSchema: z.ZodType<Prisma.PatentFundingUnitSelect> = z.object({
  PatentID: z.boolean().optional(),
  FundingUnitID: z.boolean().optional(),
  ProjectCode: z.boolean().optional(),
  fundingUnit: z.union([z.boolean(),z.lazy(() => FundingUnitArgsSchema)]).optional(),
  patentFunding: z.union([z.boolean(),z.lazy(() => PatentFundingArgsSchema)]).optional(),
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

// NOTE
//------------------------------------------------------

export const NoteSelectSchema: z.ZodType<Prisma.NoteSelect> = z.object({
  NoteID: z.boolean().optional(),
  Key: z.boolean().optional(),
  Title: z.boolean().optional(),
  Body: z.boolean().optional(),
  Date: z.boolean().optional(),
}).strict()

// PATENT
//------------------------------------------------------

export const PatentIncludeSchema: z.ZodType<Prisma.PatentInclude> = z.object({
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
  department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
  inventors: z.union([z.boolean(),z.lazy(() => PatentInventorFindManyArgsSchema)]).optional(),
  application: z.union([z.boolean(),z.lazy(() => PatentApplicationDataArgsSchema)]).optional(),
  funding: z.union([z.boolean(),z.lazy(() => PatentFundingArgsSchema)]).optional(),
  manualStatus: z.union([z.boolean(),z.lazy(() => PatentManualStatusFindManyArgsSchema)]).optional(),
  maintenances: z.union([z.boolean(),z.lazy(() => PatentMaintenanceFindManyArgsSchema)]).optional(),
  technical: z.union([z.boolean(),z.lazy(() => PatentTechnicalAttributesArgsSchema)]).optional(),
  internal: z.union([z.boolean(),z.lazy(() => PatentInternalArgsSchema)]).optional(),
  external: z.union([z.boolean(),z.lazy(() => PatentExternalArgsSchema)]).optional(),
  patentRecords: z.union([z.boolean(),z.lazy(() => PatentRecordFindManyArgsSchema)]).optional(),
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
  inventors: z.boolean().optional(),
  manualStatus: z.boolean().optional(),
  maintenances: z.boolean().optional(),
  patentRecords: z.boolean().optional(),
}).strict();

export const PatentSelectSchema: z.ZodType<Prisma.PatentSelect> = z.object({
  PatentID: z.boolean().optional(),
  DepartmentID: z.boolean().optional(),
  Year: z.boolean().optional(),
  DraftTitle: z.boolean().optional(),
  Title: z.boolean().optional(),
  TitleEnglish: z.boolean().optional(),
  CountryID: z.boolean().optional(),
  PatentType: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
  department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
  inventors: z.union([z.boolean(),z.lazy(() => PatentInventorFindManyArgsSchema)]).optional(),
  application: z.union([z.boolean(),z.lazy(() => PatentApplicationDataArgsSchema)]).optional(),
  funding: z.union([z.boolean(),z.lazy(() => PatentFundingArgsSchema)]).optional(),
  manualStatus: z.union([z.boolean(),z.lazy(() => PatentManualStatusFindManyArgsSchema)]).optional(),
  maintenances: z.union([z.boolean(),z.lazy(() => PatentMaintenanceFindManyArgsSchema)]).optional(),
  technical: z.union([z.boolean(),z.lazy(() => PatentTechnicalAttributesArgsSchema)]).optional(),
  internal: z.union([z.boolean(),z.lazy(() => PatentInternalArgsSchema)]).optional(),
  external: z.union([z.boolean(),z.lazy(() => PatentExternalArgsSchema)]).optional(),
  patentRecords: z.union([z.boolean(),z.lazy(() => PatentRecordFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PATENT APPLICATION DATA
//------------------------------------------------------

export const PatentApplicationDataIncludeSchema: z.ZodType<Prisma.PatentApplicationDataInclude> = z.object({
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
}).strict()

export const PatentApplicationDataArgsSchema: z.ZodType<Prisma.PatentApplicationDataDefaultArgs> = z.object({
  select: z.lazy(() => PatentApplicationDataSelectSchema).optional(),
  include: z.lazy(() => PatentApplicationDataIncludeSchema).optional(),
}).strict();

export const PatentApplicationDataSelectSchema: z.ZodType<Prisma.PatentApplicationDataSelect> = z.object({
  PatentID: z.boolean().optional(),
  ApplicationNumber: z.boolean().optional(),
  FilingDate: z.boolean().optional(),
  RDResultNumber: z.boolean().optional(),
  NSCNumber: z.boolean().optional(),
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

// PATENT INTERNAL
//------------------------------------------------------

export const PatentInternalIncludeSchema: z.ZodType<Prisma.PatentInternalInclude> = z.object({
  InitialReviewAgencies: z.union([z.boolean(),z.lazy(() => PatentInitiatorAgencyUnitFindManyArgsSchema)]).optional(),
  TakerAgencies: z.union([z.boolean(),z.lazy(() => PatentTakerAgencyUnitFindManyArgsSchema)]).optional(),
  Patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatentInternalCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PatentInternalArgsSchema: z.ZodType<Prisma.PatentInternalDefaultArgs> = z.object({
  select: z.lazy(() => PatentInternalSelectSchema).optional(),
  include: z.lazy(() => PatentInternalIncludeSchema).optional(),
}).strict();

export const PatentInternalCountOutputTypeArgsSchema: z.ZodType<Prisma.PatentInternalCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PatentInternalCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PatentInternalCountOutputTypeSelectSchema: z.ZodType<Prisma.PatentInternalCountOutputTypeSelect> = z.object({
  InitialReviewAgencies: z.boolean().optional(),
  TakerAgencies: z.boolean().optional(),
}).strict();

export const PatentInternalSelectSchema: z.ZodType<Prisma.PatentInternalSelect> = z.object({
  PatentID: z.boolean().optional(),
  InternalID: z.boolean().optional(),
  InitialReviewDate: z.boolean().optional(),
  InitialReviewNumber: z.boolean().optional(),
  InitialReviewAgencies: z.union([z.boolean(),z.lazy(() => PatentInitiatorAgencyUnitFindManyArgsSchema)]).optional(),
  TakerAgencies: z.union([z.boolean(),z.lazy(() => PatentTakerAgencyUnitFindManyArgsSchema)]).optional(),
  Patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatentInternalCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PATENT EXTERNAL
//------------------------------------------------------

export const PatentExternalIncludeSchema: z.ZodType<Prisma.PatentExternalInclude> = z.object({
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
}).strict()

export const PatentExternalArgsSchema: z.ZodType<Prisma.PatentExternalDefaultArgs> = z.object({
  select: z.lazy(() => PatentExternalSelectSchema).optional(),
  include: z.lazy(() => PatentExternalIncludeSchema).optional(),
}).strict();

export const PatentExternalSelectSchema: z.ZodType<Prisma.PatentExternalSelect> = z.object({
  PatentID: z.boolean().optional(),
  PatentNumber: z.boolean().optional(),
  PublicationDate: z.boolean().optional(),
  StartDate: z.boolean().optional(),
  EndDate: z.boolean().optional(),
  IPCNumber: z.boolean().optional(),
  PatentScope: z.boolean().optional(),
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
}).strict()

// PATENT MANUAL STATUS
//------------------------------------------------------

export const PatentManualStatusIncludeSchema: z.ZodType<Prisma.PatentManualStatusInclude> = z.object({
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
}).strict()

export const PatentManualStatusArgsSchema: z.ZodType<Prisma.PatentManualStatusDefaultArgs> = z.object({
  select: z.lazy(() => PatentManualStatusSelectSchema).optional(),
  include: z.lazy(() => PatentManualStatusIncludeSchema).optional(),
}).strict();

export const PatentManualStatusSelectSchema: z.ZodType<Prisma.PatentManualStatusSelect> = z.object({
  ManualStatusID: z.boolean().optional(),
  PatentID: z.boolean().optional(),
  Reason: z.boolean().optional(),
  Date: z.boolean().optional(),
  Active: z.boolean().optional(),
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
}).strict()

// PATENT MAINTENANCE
//------------------------------------------------------

export const PatentMaintenanceIncludeSchema: z.ZodType<Prisma.PatentMaintenanceInclude> = z.object({
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
}).strict()

export const PatentMaintenanceArgsSchema: z.ZodType<Prisma.PatentMaintenanceDefaultArgs> = z.object({
  select: z.lazy(() => PatentMaintenanceSelectSchema).optional(),
  include: z.lazy(() => PatentMaintenanceIncludeSchema).optional(),
}).strict();

export const PatentMaintenanceSelectSchema: z.ZodType<Prisma.PatentMaintenanceSelect> = z.object({
  MaintenanceID: z.boolean().optional(),
  PatentID: z.boolean().optional(),
  MaintenanceDate: z.boolean().optional(),
  ExpireDate: z.boolean().optional(),
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
}).strict()

// PATENT RECORD
//------------------------------------------------------

export const PatentRecordIncludeSchema: z.ZodType<Prisma.PatentRecordInclude> = z.object({
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
}).strict()

export const PatentRecordArgsSchema: z.ZodType<Prisma.PatentRecordDefaultArgs> = z.object({
  select: z.lazy(() => PatentRecordSelectSchema).optional(),
  include: z.lazy(() => PatentRecordIncludeSchema).optional(),
}).strict();

export const PatentRecordSelectSchema: z.ZodType<Prisma.PatentRecordSelect> = z.object({
  id: z.boolean().optional(),
  PatentID: z.boolean().optional(),
  Record: z.boolean().optional(),
  Date: z.boolean().optional(),
  patent: z.union([z.boolean(),z.lazy(() => PatentArgsSchema)]).optional(),
}).strict()

// COLLEGE
//------------------------------------------------------

export const CollegeIncludeSchema: z.ZodType<Prisma.CollegeInclude> = z.object({
  departments: z.union([z.boolean(),z.lazy(() => DepartmentFindManyArgsSchema)]).optional(),
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
}).strict();

export const CollegeSelectSchema: z.ZodType<Prisma.CollegeSelect> = z.object({
  CollegeID: z.boolean().optional(),
  Name: z.boolean().optional(),
  Description: z.boolean().optional(),
  departments: z.union([z.boolean(),z.lazy(() => DepartmentFindManyArgsSchema)]).optional(),
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
  patents: z.union([z.boolean(),z.lazy(() => PatentFindManyArgsSchema)]).optional(),
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
  patents: z.boolean().optional(),
}).strict();

export const CountrySelectSchema: z.ZodType<Prisma.CountrySelect> = z.object({
  CountryID: z.boolean().optional(),
  CountryName: z.boolean().optional(),
  ISOCode: z.boolean().optional(),
  patents: z.union([z.boolean(),z.lazy(() => PatentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CountryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CONTACT INFO
//------------------------------------------------------

export const ContactInfoIncludeSchema: z.ZodType<Prisma.ContactInfoInclude> = z.object({
  AgencyUnitPerson: z.union([z.boolean(),z.lazy(() => AgencyUnitPersonFindManyArgsSchema)]).optional(),
  Inventor: z.union([z.boolean(),z.lazy(() => InventorFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ContactInfoCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ContactInfoArgsSchema: z.ZodType<Prisma.ContactInfoDefaultArgs> = z.object({
  select: z.lazy(() => ContactInfoSelectSchema).optional(),
  include: z.lazy(() => ContactInfoIncludeSchema).optional(),
}).strict();

export const ContactInfoCountOutputTypeArgsSchema: z.ZodType<Prisma.ContactInfoCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ContactInfoCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ContactInfoCountOutputTypeSelectSchema: z.ZodType<Prisma.ContactInfoCountOutputTypeSelect> = z.object({
  AgencyUnitPerson: z.boolean().optional(),
  Inventor: z.boolean().optional(),
}).strict();

export const ContactInfoSelectSchema: z.ZodType<Prisma.ContactInfoSelect> = z.object({
  ContactInfoID: z.boolean().optional(),
  Name: z.boolean().optional(),
  Email: z.boolean().optional(),
  OfficeNumber: z.boolean().optional(),
  PhoneNumber: z.boolean().optional(),
  Role: z.boolean().optional(),
  Note: z.boolean().optional(),
  AgencyUnitPerson: z.union([z.boolean(),z.lazy(() => AgencyUnitPersonFindManyArgsSchema)]).optional(),
  Inventor: z.union([z.boolean(),z.lazy(() => InventorFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ContactInfoCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AgencyUnitWhereInputSchema: z.ZodType<Prisma.AgencyUnitWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AgencyUnitWhereInputSchema),z.lazy(() => AgencyUnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyUnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyUnitWhereInputSchema),z.lazy(() => AgencyUnitWhereInputSchema).array() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonListRelationFilterSchema).optional(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitListRelationFilterSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitListRelationFilterSchema).optional()
}).strict();

export const AgencyUnitOrderByWithRelationInputSchema: z.ZodType<Prisma.AgencyUnitOrderByWithRelationInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Persons: z.lazy(() => AgencyUnitPersonOrderByRelationAggregateInputSchema).optional(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitOrderByRelationAggregateInputSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AgencyUnitWhereUniqueInputSchema: z.ZodType<Prisma.AgencyUnitWhereUniqueInput> = z.object({
  AgencyUnitID: z.number().int()
})
.and(z.object({
  AgencyUnitID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AgencyUnitWhereInputSchema),z.lazy(() => AgencyUnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyUnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyUnitWhereInputSchema),z.lazy(() => AgencyUnitWhereInputSchema).array() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonListRelationFilterSchema).optional(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitListRelationFilterSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitListRelationFilterSchema).optional()
}).strict());

export const AgencyUnitOrderByWithAggregationInputSchema: z.ZodType<Prisma.AgencyUnitOrderByWithAggregationInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AgencyUnitCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AgencyUnitAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AgencyUnitMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AgencyUnitMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AgencyUnitSumOrderByAggregateInputSchema).optional()
}).strict();

export const AgencyUnitScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AgencyUnitScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AgencyUnitScalarWhereWithAggregatesInputSchema),z.lazy(() => AgencyUnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyUnitScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyUnitScalarWhereWithAggregatesInputSchema),z.lazy(() => AgencyUnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  Description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PatentTakerAgencyUnitWhereInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentTakerAgencyUnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  FileCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  agencyUnitPersonIds: z.lazy(() => JsonNullableFilterSchema).optional(),
  agencyUnit: z.union([ z.lazy(() => AgencyUnitScalarRelationFilterSchema),z.lazy(() => AgencyUnitWhereInputSchema) ]).optional(),
  patentInternal: z.union([ z.lazy(() => PatentInternalScalarRelationFilterSchema),z.lazy(() => PatentInternalWhereInputSchema) ]).optional(),
}).strict();

export const PatentTakerAgencyUnitOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  FileCode: z.lazy(() => SortOrderSchema).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  agencyUnit: z.lazy(() => AgencyUnitOrderByWithRelationInputSchema).optional(),
  patentInternal: z.lazy(() => PatentInternalOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentTakerAgencyUnitWhereUniqueInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitWhereUniqueInput> = z.object({
  PatentID_AgencyUnitID: z.lazy(() => PatentTakerAgencyUnitPatentIDAgencyUnitIDCompoundUniqueInputSchema)
})
.and(z.object({
  PatentID_AgencyUnitID: z.lazy(() => PatentTakerAgencyUnitPatentIDAgencyUnitIDCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentTakerAgencyUnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  FileCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  agencyUnitPersonIds: z.lazy(() => JsonNullableFilterSchema).optional(),
  agencyUnit: z.union([ z.lazy(() => AgencyUnitScalarRelationFilterSchema),z.lazy(() => AgencyUnitWhereInputSchema) ]).optional(),
  patentInternal: z.union([ z.lazy(() => PatentInternalScalarRelationFilterSchema),z.lazy(() => PatentInternalWhereInputSchema) ]).optional(),
}).strict());

export const PatentTakerAgencyUnitOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  FileCode: z.lazy(() => SortOrderSchema).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PatentTakerAgencyUnitCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentTakerAgencyUnitAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentTakerAgencyUnitMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentTakerAgencyUnitMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentTakerAgencyUnitSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentTakerAgencyUnitScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentTakerAgencyUnitScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentTakerAgencyUnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentTakerAgencyUnitScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentTakerAgencyUnitScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentTakerAgencyUnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  FileCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  agencyUnitPersonIds: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitWhereInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentInitiatorAgencyUnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  agencyUnitPersonIds: z.lazy(() => JsonNullableFilterSchema).optional(),
  agencyUnit: z.union([ z.lazy(() => AgencyUnitScalarRelationFilterSchema),z.lazy(() => AgencyUnitWhereInputSchema) ]).optional(),
  patentInternal: z.union([ z.lazy(() => PatentInternalScalarRelationFilterSchema),z.lazy(() => PatentInternalWhereInputSchema) ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  agencyUnit: z.lazy(() => AgencyUnitOrderByWithRelationInputSchema).optional(),
  patentInternal: z.lazy(() => PatentInternalOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitWhereUniqueInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitWhereUniqueInput> = z.object({
  PatentID_AgencyUnitID: z.lazy(() => PatentInitiatorAgencyUnitPatentIDAgencyUnitIDCompoundUniqueInputSchema)
})
.and(z.object({
  PatentID_AgencyUnitID: z.lazy(() => PatentInitiatorAgencyUnitPatentIDAgencyUnitIDCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentInitiatorAgencyUnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  agencyUnitPersonIds: z.lazy(() => JsonNullableFilterSchema).optional(),
  agencyUnit: z.union([ z.lazy(() => AgencyUnitScalarRelationFilterSchema),z.lazy(() => AgencyUnitWhereInputSchema) ]).optional(),
  patentInternal: z.union([ z.lazy(() => PatentInternalScalarRelationFilterSchema),z.lazy(() => PatentInternalWhereInputSchema) ]).optional(),
}).strict());

export const PatentInitiatorAgencyUnitOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PatentInitiatorAgencyUnitCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentInitiatorAgencyUnitAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentInitiatorAgencyUnitMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentInitiatorAgencyUnitMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentInitiatorAgencyUnitSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentInitiatorAgencyUnitScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentInitiatorAgencyUnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentInitiatorAgencyUnitScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentInitiatorAgencyUnitScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentInitiatorAgencyUnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  agencyUnitPersonIds: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional()
}).strict();

export const AgencyUnitPersonWhereInputSchema: z.ZodType<Prisma.AgencyUnitPersonWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AgencyUnitPersonWhereInputSchema),z.lazy(() => AgencyUnitPersonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyUnitPersonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyUnitPersonWhereInputSchema),z.lazy(() => AgencyUnitPersonWhereInputSchema).array() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  agencyUnit: z.union([ z.lazy(() => AgencyUnitScalarRelationFilterSchema),z.lazy(() => AgencyUnitWhereInputSchema) ]).optional(),
  contactInfo: z.union([ z.lazy(() => ContactInfoScalarRelationFilterSchema),z.lazy(() => ContactInfoWhereInputSchema) ]).optional(),
}).strict();

export const AgencyUnitPersonOrderByWithRelationInputSchema: z.ZodType<Prisma.AgencyUnitPersonOrderByWithRelationInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional(),
  agencyUnit: z.lazy(() => AgencyUnitOrderByWithRelationInputSchema).optional(),
  contactInfo: z.lazy(() => ContactInfoOrderByWithRelationInputSchema).optional()
}).strict();

export const AgencyUnitPersonWhereUniqueInputSchema: z.ZodType<Prisma.AgencyUnitPersonWhereUniqueInput> = z.union([
  z.object({
    AgencyUnitID_ContactInfoID: z.lazy(() => AgencyUnitPersonAgencyUnitIDContactInfoIDCompoundUniqueInputSchema),
    ContactInfoID: z.number().int()
  }),
  z.object({
    AgencyUnitID_ContactInfoID: z.lazy(() => AgencyUnitPersonAgencyUnitIDContactInfoIDCompoundUniqueInputSchema),
  }),
  z.object({
    ContactInfoID: z.number().int(),
  }),
])
.and(z.object({
  ContactInfoID: z.number().int().optional(),
  AgencyUnitID_ContactInfoID: z.lazy(() => AgencyUnitPersonAgencyUnitIDContactInfoIDCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AgencyUnitPersonWhereInputSchema),z.lazy(() => AgencyUnitPersonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyUnitPersonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyUnitPersonWhereInputSchema),z.lazy(() => AgencyUnitPersonWhereInputSchema).array() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  agencyUnit: z.union([ z.lazy(() => AgencyUnitScalarRelationFilterSchema),z.lazy(() => AgencyUnitWhereInputSchema) ]).optional(),
  contactInfo: z.union([ z.lazy(() => ContactInfoScalarRelationFilterSchema),z.lazy(() => ContactInfoWhereInputSchema) ]).optional(),
}).strict());

export const AgencyUnitPersonOrderByWithAggregationInputSchema: z.ZodType<Prisma.AgencyUnitPersonOrderByWithAggregationInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AgencyUnitPersonCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AgencyUnitPersonAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AgencyUnitPersonMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AgencyUnitPersonMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AgencyUnitPersonSumOrderByAggregateInputSchema).optional()
}).strict();

export const AgencyUnitPersonScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AgencyUnitPersonScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AgencyUnitPersonScalarWhereWithAggregatesInputSchema),z.lazy(() => AgencyUnitPersonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyUnitPersonScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyUnitPersonScalarWhereWithAggregatesInputSchema),z.lazy(() => AgencyUnitPersonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const FundingPlanWhereInputSchema: z.ZodType<Prisma.FundingPlanWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FundingPlanWhereInputSchema),z.lazy(() => FundingPlanWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundingPlanWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundingPlanWhereInputSchema),z.lazy(() => FundingPlanWhereInputSchema).array() ]).optional(),
  PlanID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  PlanType: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fundings: z.lazy(() => PatentFundingListRelationFilterSchema).optional()
}).strict();

export const FundingPlanOrderByWithRelationInputSchema: z.ZodType<Prisma.FundingPlanOrderByWithRelationInput> = z.object({
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  PlanType: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
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
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fundings: z.lazy(() => PatentFundingListRelationFilterSchema).optional()
}).strict());

export const FundingPlanOrderByWithAggregationInputSchema: z.ZodType<Prisma.FundingPlanOrderByWithAggregationInput> = z.object({
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  PlanType: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
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
  Name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const FundingUnitWhereInputSchema: z.ZodType<Prisma.FundingUnitWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FundingUnitWhereInputSchema),z.lazy(() => FundingUnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundingUnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundingUnitWhereInputSchema),z.lazy(() => FundingUnitWhereInputSchema).array() ]).optional(),
  FundingUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  PatentFundingUnit: z.lazy(() => PatentFundingUnitListRelationFilterSchema).optional(),
  FundingRecord: z.lazy(() => FundingRecordListRelationFilterSchema).optional()
}).strict();

export const FundingUnitOrderByWithRelationInputSchema: z.ZodType<Prisma.FundingUnitOrderByWithRelationInput> = z.object({
  FundingUnitID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  PatentFundingUnit: z.lazy(() => PatentFundingUnitOrderByRelationAggregateInputSchema).optional(),
  FundingRecord: z.lazy(() => FundingRecordOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FundingUnitWhereUniqueInputSchema: z.ZodType<Prisma.FundingUnitWhereUniqueInput> = z.object({
  FundingUnitID: z.number().int()
})
.and(z.object({
  FundingUnitID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FundingUnitWhereInputSchema),z.lazy(() => FundingUnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundingUnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundingUnitWhereInputSchema),z.lazy(() => FundingUnitWhereInputSchema).array() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  PatentFundingUnit: z.lazy(() => PatentFundingUnitListRelationFilterSchema).optional(),
  FundingRecord: z.lazy(() => FundingRecordListRelationFilterSchema).optional()
}).strict());

export const FundingUnitOrderByWithAggregationInputSchema: z.ZodType<Prisma.FundingUnitOrderByWithAggregationInput> = z.object({
  FundingUnitID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FundingUnitCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FundingUnitAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FundingUnitMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FundingUnitMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FundingUnitSumOrderByAggregateInputSchema).optional()
}).strict();

export const FundingUnitScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FundingUnitScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FundingUnitScalarWhereWithAggregatesInputSchema),z.lazy(() => FundingUnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundingUnitScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundingUnitScalarWhereWithAggregatesInputSchema),z.lazy(() => FundingUnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  FundingUnitID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PatentFundingWhereInputSchema: z.ZodType<Prisma.PatentFundingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentFundingWhereInputSchema),z.lazy(() => PatentFundingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentFundingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentFundingWhereInputSchema),z.lazy(() => PatentFundingWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fundingPlanPlanID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
  plan: z.union([ z.lazy(() => FundingPlanScalarRelationFilterSchema),z.lazy(() => FundingPlanWhereInputSchema) ]).optional(),
  fundingRecords: z.lazy(() => FundingRecordListRelationFilterSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitListRelationFilterSchema).optional()
}).strict();

export const PatentFundingOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentFundingOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  fundingPlanPlanID: z.lazy(() => SortOrderSchema).optional(),
  patent: z.lazy(() => PatentOrderByWithRelationInputSchema).optional(),
  plan: z.lazy(() => FundingPlanOrderByWithRelationInputSchema).optional(),
  fundingRecords: z.lazy(() => FundingRecordOrderByRelationAggregateInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PatentFundingWhereUniqueInputSchema: z.ZodType<Prisma.PatentFundingWhereUniqueInput> = z.object({
  PatentID: z.number().int()
})
.and(z.object({
  PatentID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PatentFundingWhereInputSchema),z.lazy(() => PatentFundingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentFundingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentFundingWhereInputSchema),z.lazy(() => PatentFundingWhereInputSchema).array() ]).optional(),
  fundingPlanPlanID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
  plan: z.union([ z.lazy(() => FundingPlanScalarRelationFilterSchema),z.lazy(() => FundingPlanWhereInputSchema) ]).optional(),
  fundingRecords: z.lazy(() => FundingRecordListRelationFilterSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitListRelationFilterSchema).optional()
}).strict());

export const PatentFundingOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentFundingOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  fundingPlanPlanID: z.lazy(() => SortOrderSchema).optional(),
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
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  fundingPlanPlanID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const FundingRecordWhereInputSchema: z.ZodType<Prisma.FundingRecordWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FundingRecordWhereInputSchema),z.lazy(() => FundingRecordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundingRecordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundingRecordWhereInputSchema),z.lazy(() => FundingRecordWhereInputSchema).array() ]).optional(),
  FundingRecordID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  PatentFundingPatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  patentFunding: z.union([ z.lazy(() => PatentFundingScalarRelationFilterSchema),z.lazy(() => PatentFundingWhereInputSchema) ]).optional(),
  canFundingBy: z.lazy(() => FundingUnitListRelationFilterSchema).optional()
}).strict();

export const FundingRecordOrderByWithRelationInputSchema: z.ZodType<Prisma.FundingRecordOrderByWithRelationInput> = z.object({
  FundingRecordID: z.lazy(() => SortOrderSchema).optional(),
  PatentFundingPatentID: z.lazy(() => SortOrderSchema).optional(),
  Amount: z.lazy(() => SortOrderSchema).optional(),
  patentFunding: z.lazy(() => PatentFundingOrderByWithRelationInputSchema).optional(),
  canFundingBy: z.lazy(() => FundingUnitOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FundingRecordWhereUniqueInputSchema: z.ZodType<Prisma.FundingRecordWhereUniqueInput> = z.object({
  FundingRecordID: z.number().int()
})
.and(z.object({
  FundingRecordID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FundingRecordWhereInputSchema),z.lazy(() => FundingRecordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundingRecordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundingRecordWhereInputSchema),z.lazy(() => FundingRecordWhereInputSchema).array() ]).optional(),
  PatentFundingPatentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  Amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  patentFunding: z.union([ z.lazy(() => PatentFundingScalarRelationFilterSchema),z.lazy(() => PatentFundingWhereInputSchema) ]).optional(),
  canFundingBy: z.lazy(() => FundingUnitListRelationFilterSchema).optional()
}).strict());

export const FundingRecordOrderByWithAggregationInputSchema: z.ZodType<Prisma.FundingRecordOrderByWithAggregationInput> = z.object({
  FundingRecordID: z.lazy(() => SortOrderSchema).optional(),
  PatentFundingPatentID: z.lazy(() => SortOrderSchema).optional(),
  Amount: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FundingRecordCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FundingRecordAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FundingRecordMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FundingRecordMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FundingRecordSumOrderByAggregateInputSchema).optional()
}).strict();

export const FundingRecordScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FundingRecordScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FundingRecordScalarWhereWithAggregatesInputSchema),z.lazy(() => FundingRecordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundingRecordScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundingRecordScalarWhereWithAggregatesInputSchema),z.lazy(() => FundingRecordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  FundingRecordID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  PatentFundingPatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Amount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const PatentFundingUnitWhereInputSchema: z.ZodType<Prisma.PatentFundingUnitWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentFundingUnitWhereInputSchema),z.lazy(() => PatentFundingUnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentFundingUnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentFundingUnitWhereInputSchema),z.lazy(() => PatentFundingUnitWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  FundingUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ProjectCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fundingUnit: z.union([ z.lazy(() => FundingUnitScalarRelationFilterSchema),z.lazy(() => FundingUnitWhereInputSchema) ]).optional(),
  patentFunding: z.union([ z.lazy(() => PatentFundingScalarRelationFilterSchema),z.lazy(() => PatentFundingWhereInputSchema) ]).optional(),
}).strict();

export const PatentFundingUnitOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentFundingUnitOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  FundingUnitID: z.lazy(() => SortOrderSchema).optional(),
  ProjectCode: z.lazy(() => SortOrderSchema).optional(),
  fundingUnit: z.lazy(() => FundingUnitOrderByWithRelationInputSchema).optional(),
  patentFunding: z.lazy(() => PatentFundingOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentFundingUnitWhereUniqueInputSchema: z.ZodType<Prisma.PatentFundingUnitWhereUniqueInput> = z.object({
  PatentID_FundingUnitID: z.lazy(() => PatentFundingUnitPatentIDFundingUnitIDCompoundUniqueInputSchema)
})
.and(z.object({
  PatentID_FundingUnitID: z.lazy(() => PatentFundingUnitPatentIDFundingUnitIDCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PatentFundingUnitWhereInputSchema),z.lazy(() => PatentFundingUnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentFundingUnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentFundingUnitWhereInputSchema),z.lazy(() => PatentFundingUnitWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  FundingUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  ProjectCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fundingUnit: z.union([ z.lazy(() => FundingUnitScalarRelationFilterSchema),z.lazy(() => FundingUnitWhereInputSchema) ]).optional(),
  patentFunding: z.union([ z.lazy(() => PatentFundingScalarRelationFilterSchema),z.lazy(() => PatentFundingWhereInputSchema) ]).optional(),
}).strict());

export const PatentFundingUnitOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentFundingUnitOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  FundingUnitID: z.lazy(() => SortOrderSchema).optional(),
  ProjectCode: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PatentFundingUnitCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentFundingUnitAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentFundingUnitMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentFundingUnitMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentFundingUnitSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentFundingUnitScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentFundingUnitScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentFundingUnitScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentFundingUnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentFundingUnitScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentFundingUnitScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentFundingUnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  FundingUnitID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ProjectCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const InventorWhereInputSchema: z.ZodType<Prisma.InventorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InventorWhereInputSchema),z.lazy(() => InventorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InventorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InventorWhereInputSchema),z.lazy(() => InventorWhereInputSchema).array() ]).optional(),
  InventorID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  contactInfo: z.union([ z.lazy(() => ContactInfoScalarRelationFilterSchema),z.lazy(() => ContactInfoWhereInputSchema) ]).optional(),
  patents: z.lazy(() => PatentInventorListRelationFilterSchema).optional()
}).strict();

export const InventorOrderByWithRelationInputSchema: z.ZodType<Prisma.InventorOrderByWithRelationInput> = z.object({
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional(),
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
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  contactInfo: z.union([ z.lazy(() => ContactInfoScalarRelationFilterSchema),z.lazy(() => ContactInfoWhereInputSchema) ]).optional(),
  patents: z.lazy(() => PatentInventorListRelationFilterSchema).optional()
}).strict());

export const InventorOrderByWithAggregationInputSchema: z.ZodType<Prisma.InventorOrderByWithAggregationInput> = z.object({
  InventorID: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional(),
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
  DepartmentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
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

export const NoteWhereInputSchema: z.ZodType<Prisma.NoteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  NoteID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const NoteOrderByWithRelationInputSchema: z.ZodType<Prisma.NoteOrderByWithRelationInput> = z.object({
  NoteID: z.lazy(() => SortOrderSchema).optional(),
  Key: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  Body: z.lazy(() => SortOrderSchema).optional(),
  Date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteWhereUniqueInputSchema: z.ZodType<Prisma.NoteWhereUniqueInput> = z.union([
  z.object({
    NoteID: z.number().int(),
    Key: z.string()
  }),
  z.object({
    NoteID: z.number().int(),
  }),
  z.object({
    Key: z.string(),
  }),
])
.and(z.object({
  NoteID: z.number().int().optional(),
  Key: z.string().optional(),
  AND: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  Title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const NoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.NoteOrderByWithAggregationInput> = z.object({
  NoteID: z.lazy(() => SortOrderSchema).optional(),
  Key: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  Body: z.lazy(() => SortOrderSchema).optional(),
  Date: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NoteCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => NoteAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NoteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NoteMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => NoteSumOrderByAggregateInputSchema).optional()
}).strict();

export const NoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NoteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NoteScalarWhereWithAggregatesInputSchema),z.lazy(() => NoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteScalarWhereWithAggregatesInputSchema),z.lazy(() => NoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  NoteID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Key: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  Title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  Body: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  Date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PatentWhereInputSchema: z.ZodType<Prisma.PatentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentWhereInputSchema),z.lazy(() => PatentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentWhereInputSchema),z.lazy(() => PatentWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Year: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  DraftTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  TitleEnglish: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  CountryID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumEnumPatentTypeNullableFilterSchema),z.lazy(() => EnumPatentTypeSchema) ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  country: z.union([ z.lazy(() => CountryNullableScalarRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional().nullable(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  inventors: z.lazy(() => PatentInventorListRelationFilterSchema).optional(),
  application: z.union([ z.lazy(() => PatentApplicationDataNullableScalarRelationFilterSchema),z.lazy(() => PatentApplicationDataWhereInputSchema) ]).optional().nullable(),
  funding: z.union([ z.lazy(() => PatentFundingNullableScalarRelationFilterSchema),z.lazy(() => PatentFundingWhereInputSchema) ]).optional().nullable(),
  manualStatus: z.lazy(() => PatentManualStatusListRelationFilterSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceListRelationFilterSchema).optional(),
  technical: z.union([ z.lazy(() => PatentTechnicalAttributesNullableScalarRelationFilterSchema),z.lazy(() => PatentTechnicalAttributesWhereInputSchema) ]).optional().nullable(),
  internal: z.union([ z.lazy(() => PatentInternalNullableScalarRelationFilterSchema),z.lazy(() => PatentInternalWhereInputSchema) ]).optional().nullable(),
  external: z.union([ z.lazy(() => PatentExternalNullableScalarRelationFilterSchema),z.lazy(() => PatentExternalWhereInputSchema) ]).optional().nullable(),
  patentRecords: z.lazy(() => PatentRecordListRelationFilterSchema).optional()
}).strict();

export const PatentOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  Year: z.lazy(() => SortOrderSchema).optional(),
  DraftTitle: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  TitleEnglish: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => CountryOrderByWithRelationInputSchema).optional(),
  department: z.lazy(() => DepartmentOrderByWithRelationInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorOrderByRelationAggregateInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataOrderByWithRelationInputSchema).optional(),
  funding: z.lazy(() => PatentFundingOrderByWithRelationInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusOrderByRelationAggregateInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceOrderByRelationAggregateInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesOrderByWithRelationInputSchema).optional(),
  internal: z.lazy(() => PatentInternalOrderByWithRelationInputSchema).optional(),
  external: z.lazy(() => PatentExternalOrderByWithRelationInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PatentWhereUniqueInputSchema: z.ZodType<Prisma.PatentWhereUniqueInput> = z.object({
  PatentID: z.number().int()
})
.and(z.object({
  PatentID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PatentWhereInputSchema),z.lazy(() => PatentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentWhereInputSchema),z.lazy(() => PatentWhereInputSchema).array() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  Year: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  DraftTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  TitleEnglish: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  CountryID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumEnumPatentTypeNullableFilterSchema),z.lazy(() => EnumPatentTypeSchema) ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  country: z.union([ z.lazy(() => CountryNullableScalarRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional().nullable(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  inventors: z.lazy(() => PatentInventorListRelationFilterSchema).optional(),
  application: z.union([ z.lazy(() => PatentApplicationDataNullableScalarRelationFilterSchema),z.lazy(() => PatentApplicationDataWhereInputSchema) ]).optional().nullable(),
  funding: z.union([ z.lazy(() => PatentFundingNullableScalarRelationFilterSchema),z.lazy(() => PatentFundingWhereInputSchema) ]).optional().nullable(),
  manualStatus: z.lazy(() => PatentManualStatusListRelationFilterSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceListRelationFilterSchema).optional(),
  technical: z.union([ z.lazy(() => PatentTechnicalAttributesNullableScalarRelationFilterSchema),z.lazy(() => PatentTechnicalAttributesWhereInputSchema) ]).optional().nullable(),
  internal: z.union([ z.lazy(() => PatentInternalNullableScalarRelationFilterSchema),z.lazy(() => PatentInternalWhereInputSchema) ]).optional().nullable(),
  external: z.union([ z.lazy(() => PatentExternalNullableScalarRelationFilterSchema),z.lazy(() => PatentExternalWhereInputSchema) ]).optional().nullable(),
  patentRecords: z.lazy(() => PatentRecordListRelationFilterSchema).optional()
}).strict());

export const PatentOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  Year: z.lazy(() => SortOrderSchema).optional(),
  DraftTitle: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  TitleEnglish: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
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
  DepartmentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Year: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  DraftTitle: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  Title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  TitleEnglish: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  CountryID: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumEnumPatentTypeNullableWithAggregatesFilterSchema),z.lazy(() => EnumPatentTypeSchema) ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PatentApplicationDataWhereInputSchema: z.ZodType<Prisma.PatentApplicationDataWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentApplicationDataWhereInputSchema),z.lazy(() => PatentApplicationDataWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentApplicationDataWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentApplicationDataWhereInputSchema),z.lazy(() => PatentApplicationDataWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ApplicationNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  FilingDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  RDResultNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  NSCNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict();

export const PatentApplicationDataOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentApplicationDataOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  ApplicationNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  FilingDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  RDResultNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  NSCNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  ApplicationNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  FilingDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  RDResultNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  NSCNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict());

export const PatentApplicationDataOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentApplicationDataOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  ApplicationNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  FilingDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  RDResultNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  NSCNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  ApplicationNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  FilingDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  RDResultNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  NSCNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
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

export const PatentInternalWhereInputSchema: z.ZodType<Prisma.PatentInternalWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentInternalWhereInputSchema),z.lazy(() => PatentInternalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentInternalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentInternalWhereInputSchema),z.lazy(() => PatentInternalWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  InternalID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  InitialReviewDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  InitialReviewNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitListRelationFilterSchema).optional(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitListRelationFilterSchema).optional(),
  Patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict();

export const PatentInternalOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentInternalOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InternalID: z.lazy(() => SortOrderSchema).optional(),
  InitialReviewDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  InitialReviewNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitOrderByRelationAggregateInputSchema).optional(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitOrderByRelationAggregateInputSchema).optional(),
  Patent: z.lazy(() => PatentOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentInternalWhereUniqueInputSchema: z.ZodType<Prisma.PatentInternalWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => PatentInternalWhereInputSchema),z.lazy(() => PatentInternalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentInternalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentInternalWhereInputSchema),z.lazy(() => PatentInternalWhereInputSchema).array() ]).optional(),
  InitialReviewDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  InitialReviewNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitListRelationFilterSchema).optional(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitListRelationFilterSchema).optional(),
  Patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict());

export const PatentInternalOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentInternalOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InternalID: z.lazy(() => SortOrderSchema).optional(),
  InitialReviewDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  InitialReviewNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PatentInternalCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentInternalAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentInternalMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentInternalMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentInternalSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentInternalScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentInternalScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentInternalScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentInternalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentInternalScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentInternalScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentInternalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  InternalID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  InitialReviewDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  InitialReviewNumber: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const PatentExternalWhereInputSchema: z.ZodType<Prisma.PatentExternalWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentExternalWhereInputSchema),z.lazy(() => PatentExternalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentExternalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentExternalWhereInputSchema),z.lazy(() => PatentExternalWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  PatentNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  PublicationDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  StartDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  EndDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  IPCNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  PatentScope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict();

export const PatentExternalOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentExternalOrderByWithRelationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  PatentNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PublicationDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  StartDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  EndDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  IPCNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PatentScope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  patent: z.lazy(() => PatentOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentExternalWhereUniqueInputSchema: z.ZodType<Prisma.PatentExternalWhereUniqueInput> = z.object({
  PatentID: z.number().int()
})
.and(z.object({
  PatentID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PatentExternalWhereInputSchema),z.lazy(() => PatentExternalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentExternalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentExternalWhereInputSchema),z.lazy(() => PatentExternalWhereInputSchema).array() ]).optional(),
  PatentNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  PublicationDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  StartDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  EndDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  IPCNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  PatentScope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict());

export const PatentExternalOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentExternalOrderByWithAggregationInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  PatentNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PublicationDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  StartDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  EndDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  IPCNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PatentScope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PatentExternalCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentExternalAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentExternalMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentExternalMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentExternalSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentExternalScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentExternalScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentExternalScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentExternalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentExternalScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentExternalScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentExternalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  PatentNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  PublicationDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  StartDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  EndDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  IPCNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  PatentScope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PatentManualStatusWhereInputSchema: z.ZodType<Prisma.PatentManualStatusWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentManualStatusWhereInputSchema),z.lazy(() => PatentManualStatusWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentManualStatusWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentManualStatusWhereInputSchema),z.lazy(() => PatentManualStatusWhereInputSchema).array() ]).optional(),
  ManualStatusID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Reason: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict();

export const PatentManualStatusOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentManualStatusOrderByWithRelationInput> = z.object({
  ManualStatusID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Reason: z.lazy(() => SortOrderSchema).optional(),
  Date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Active: z.lazy(() => SortOrderSchema).optional(),
  patent: z.lazy(() => PatentOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentManualStatusWhereUniqueInputSchema: z.ZodType<Prisma.PatentManualStatusWhereUniqueInput> = z.object({
  ManualStatusID: z.number().int()
})
.and(z.object({
  ManualStatusID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PatentManualStatusWhereInputSchema),z.lazy(() => PatentManualStatusWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentManualStatusWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentManualStatusWhereInputSchema),z.lazy(() => PatentManualStatusWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  Reason: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict());

export const PatentManualStatusOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentManualStatusOrderByWithAggregationInput> = z.object({
  ManualStatusID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Reason: z.lazy(() => SortOrderSchema).optional(),
  Date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Active: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PatentManualStatusCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentManualStatusAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentManualStatusMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentManualStatusMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentManualStatusSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentManualStatusScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentManualStatusScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentManualStatusScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentManualStatusScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentManualStatusScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentManualStatusScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentManualStatusScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  ManualStatusID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Reason: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  Date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  Active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const PatentMaintenanceWhereInputSchema: z.ZodType<Prisma.PatentMaintenanceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentMaintenanceWhereInputSchema),z.lazy(() => PatentMaintenanceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentMaintenanceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentMaintenanceWhereInputSchema),z.lazy(() => PatentMaintenanceWhereInputSchema).array() ]).optional(),
  MaintenanceID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  MaintenanceDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ExpireDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict();

export const PatentMaintenanceOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentMaintenanceOrderByWithRelationInput> = z.object({
  MaintenanceID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceDate: z.lazy(() => SortOrderSchema).optional(),
  ExpireDate: z.lazy(() => SortOrderSchema).optional(),
  patent: z.lazy(() => PatentOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentMaintenanceWhereUniqueInputSchema: z.ZodType<Prisma.PatentMaintenanceWhereUniqueInput> = z.object({
  MaintenanceID: z.number().int()
})
.and(z.object({
  MaintenanceID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PatentMaintenanceWhereInputSchema),z.lazy(() => PatentMaintenanceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentMaintenanceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentMaintenanceWhereInputSchema),z.lazy(() => PatentMaintenanceWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  MaintenanceDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ExpireDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict());

export const PatentMaintenanceOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentMaintenanceOrderByWithAggregationInput> = z.object({
  MaintenanceID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceDate: z.lazy(() => SortOrderSchema).optional(),
  ExpireDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PatentMaintenanceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentMaintenanceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentMaintenanceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentMaintenanceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentMaintenanceSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentMaintenanceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentMaintenanceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentMaintenanceScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentMaintenanceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentMaintenanceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentMaintenanceScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentMaintenanceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  MaintenanceID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  MaintenanceDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  ExpireDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PatentRecordWhereInputSchema: z.ZodType<Prisma.PatentRecordWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentRecordWhereInputSchema),z.lazy(() => PatentRecordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentRecordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentRecordWhereInputSchema),z.lazy(() => PatentRecordWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Record: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict();

export const PatentRecordOrderByWithRelationInputSchema: z.ZodType<Prisma.PatentRecordOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Record: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  patent: z.lazy(() => PatentOrderByWithRelationInputSchema).optional()
}).strict();

export const PatentRecordWhereUniqueInputSchema: z.ZodType<Prisma.PatentRecordWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PatentRecordWhereInputSchema),z.lazy(() => PatentRecordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentRecordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentRecordWhereInputSchema),z.lazy(() => PatentRecordWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  Record: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  patent: z.union([ z.lazy(() => PatentScalarRelationFilterSchema),z.lazy(() => PatentWhereInputSchema) ]).optional(),
}).strict());

export const PatentRecordOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatentRecordOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Record: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PatentRecordCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatentRecordAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatentRecordMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatentRecordMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatentRecordSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatentRecordScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatentRecordScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatentRecordScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentRecordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentRecordScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentRecordScalarWhereWithAggregatesInputSchema),z.lazy(() => PatentRecordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  Record: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  Date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const CollegeWhereInputSchema: z.ZodType<Prisma.CollegeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CollegeWhereInputSchema),z.lazy(() => CollegeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CollegeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CollegeWhereInputSchema),z.lazy(() => CollegeWhereInputSchema).array() ]).optional(),
  CollegeID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  departments: z.lazy(() => DepartmentListRelationFilterSchema).optional()
}).strict();

export const CollegeOrderByWithRelationInputSchema: z.ZodType<Prisma.CollegeOrderByWithRelationInput> = z.object({
  CollegeID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  departments: z.lazy(() => DepartmentOrderByRelationAggregateInputSchema).optional()
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
  departments: z.lazy(() => DepartmentListRelationFilterSchema).optional()
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
  patents: z.lazy(() => PatentListRelationFilterSchema).optional()
}).strict();

export const CountryOrderByWithRelationInputSchema: z.ZodType<Prisma.CountryOrderByWithRelationInput> = z.object({
  CountryID: z.lazy(() => SortOrderSchema).optional(),
  CountryName: z.lazy(() => SortOrderSchema).optional(),
  ISOCode: z.lazy(() => SortOrderSchema).optional(),
  patents: z.lazy(() => PatentOrderByRelationAggregateInputSchema).optional()
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
  patents: z.lazy(() => PatentListRelationFilterSchema).optional()
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
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  OfficeNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  PhoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  AgencyUnitPerson: z.lazy(() => AgencyUnitPersonListRelationFilterSchema).optional(),
  Inventor: z.lazy(() => InventorListRelationFilterSchema).optional()
}).strict();

export const ContactInfoOrderByWithRelationInputSchema: z.ZodType<Prisma.ContactInfoOrderByWithRelationInput> = z.object({
  ContactInfoID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  OfficeNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PhoneNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Role: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Note: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  AgencyUnitPerson: z.lazy(() => AgencyUnitPersonOrderByRelationAggregateInputSchema).optional(),
  Inventor: z.lazy(() => InventorOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ContactInfoWhereUniqueInputSchema: z.ZodType<Prisma.ContactInfoWhereUniqueInput> = z.object({
  ContactInfoID: z.number().int()
})
.and(z.object({
  ContactInfoID: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ContactInfoWhereInputSchema),z.lazy(() => ContactInfoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactInfoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactInfoWhereInputSchema),z.lazy(() => ContactInfoWhereInputSchema).array() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  OfficeNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  PhoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  AgencyUnitPerson: z.lazy(() => AgencyUnitPersonListRelationFilterSchema).optional(),
  Inventor: z.lazy(() => InventorListRelationFilterSchema).optional()
}).strict());

export const ContactInfoOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContactInfoOrderByWithAggregationInput> = z.object({
  ContactInfoID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  OfficeNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  PhoneNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Role: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  Name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  Email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  OfficeNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  PhoneNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  Role: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  Note: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AgencyUnitCreateInputSchema: z.ZodType<Prisma.AgencyUnitCreateInput> = z.object({
  Name: z.string(),
  Description: z.string().optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonCreateNestedManyWithoutAgencyUnitInputSchema).optional(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitCreateNestedManyWithoutAgencyUnitInputSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitCreateNestedManyWithoutAgencyUnitInputSchema).optional()
}).strict();

export const AgencyUnitUncheckedCreateInputSchema: z.ZodType<Prisma.AgencyUnitUncheckedCreateInput> = z.object({
  AgencyUnitID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonUncheckedCreateNestedManyWithoutAgencyUnitInputSchema).optional(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateNestedManyWithoutAgencyUnitInputSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitUncheckedCreateNestedManyWithoutAgencyUnitInputSchema).optional()
}).strict();

export const AgencyUnitUpdateInputSchema: z.ZodType<Prisma.AgencyUnitUpdateInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonUpdateManyWithoutAgencyUnitNestedInputSchema).optional(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithoutAgencyUnitNestedInputSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitUpdateManyWithoutAgencyUnitNestedInputSchema).optional()
}).strict();

export const AgencyUnitUncheckedUpdateInputSchema: z.ZodType<Prisma.AgencyUnitUncheckedUpdateInput> = z.object({
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonUncheckedUpdateManyWithoutAgencyUnitNestedInputSchema).optional(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutAgencyUnitNestedInputSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitUncheckedUpdateManyWithoutAgencyUnitNestedInputSchema).optional()
}).strict();

export const AgencyUnitCreateManyInputSchema: z.ZodType<Prisma.AgencyUnitCreateManyInput> = z.object({
  AgencyUnitID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable()
}).strict();

export const AgencyUnitUpdateManyMutationInputSchema: z.ZodType<Prisma.AgencyUnitUpdateManyMutationInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AgencyUnitUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AgencyUnitUncheckedUpdateManyInput> = z.object({
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentTakerAgencyUnitCreateInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateInput> = z.object({
  FileCode: z.string(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  agencyUnit: z.lazy(() => AgencyUnitCreateNestedOneWithoutTakerPatentsInputSchema),
  patentInternal: z.lazy(() => PatentInternalCreateNestedOneWithoutTakerAgenciesInputSchema)
}).strict();

export const PatentTakerAgencyUnitUncheckedCreateInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUncheckedCreateInput> = z.object({
  PatentID: z.number().int(),
  AgencyUnitID: z.number().int(),
  FileCode: z.string(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentTakerAgencyUnitUpdateInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpdateInput> = z.object({
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  agencyUnit: z.lazy(() => AgencyUnitUpdateOneRequiredWithoutTakerPatentsNestedInputSchema).optional(),
  patentInternal: z.lazy(() => PatentInternalUpdateOneRequiredWithoutTakerAgenciesNestedInputSchema).optional()
}).strict();

export const PatentTakerAgencyUnitUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentTakerAgencyUnitCreateManyInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateManyInput> = z.object({
  PatentID: z.number().int(),
  AgencyUnitID: z.number().int(),
  FileCode: z.string(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentTakerAgencyUnitUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpdateManyMutationInput> = z.object({
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentTakerAgencyUnitUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitCreateInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateInput> = z.object({
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  agencyUnit: z.lazy(() => AgencyUnitCreateNestedOneWithoutInitialReviewPatentsInputSchema),
  patentInternal: z.lazy(() => PatentInternalCreateNestedOneWithoutInitialReviewAgenciesInputSchema)
}).strict();

export const PatentInitiatorAgencyUnitUncheckedCreateInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUncheckedCreateInput> = z.object({
  PatentID: z.number().int(),
  AgencyUnitID: z.number().int(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitUpdateInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpdateInput> = z.object({
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  agencyUnit: z.lazy(() => AgencyUnitUpdateOneRequiredWithoutInitialReviewPatentsNestedInputSchema).optional(),
  patentInternal: z.lazy(() => PatentInternalUpdateOneRequiredWithoutInitialReviewAgenciesNestedInputSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitCreateManyInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateManyInput> = z.object({
  PatentID: z.number().int(),
  AgencyUnitID: z.number().int(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpdateManyMutationInput> = z.object({
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const AgencyUnitPersonCreateInputSchema: z.ZodType<Prisma.AgencyUnitPersonCreateInput> = z.object({
  agencyUnit: z.lazy(() => AgencyUnitCreateNestedOneWithoutPersonsInputSchema),
  contactInfo: z.lazy(() => ContactInfoCreateNestedOneWithoutAgencyUnitPersonInputSchema)
}).strict();

export const AgencyUnitPersonUncheckedCreateInputSchema: z.ZodType<Prisma.AgencyUnitPersonUncheckedCreateInput> = z.object({
  AgencyUnitID: z.number().int(),
  ContactInfoID: z.number().int()
}).strict();

export const AgencyUnitPersonUpdateInputSchema: z.ZodType<Prisma.AgencyUnitPersonUpdateInput> = z.object({
  agencyUnit: z.lazy(() => AgencyUnitUpdateOneRequiredWithoutPersonsNestedInputSchema).optional(),
  contactInfo: z.lazy(() => ContactInfoUpdateOneRequiredWithoutAgencyUnitPersonNestedInputSchema).optional()
}).strict();

export const AgencyUnitPersonUncheckedUpdateInputSchema: z.ZodType<Prisma.AgencyUnitPersonUncheckedUpdateInput> = z.object({
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AgencyUnitPersonCreateManyInputSchema: z.ZodType<Prisma.AgencyUnitPersonCreateManyInput> = z.object({
  AgencyUnitID: z.number().int(),
  ContactInfoID: z.number().int()
}).strict();

export const AgencyUnitPersonUpdateManyMutationInputSchema: z.ZodType<Prisma.AgencyUnitPersonUpdateManyMutationInput> = z.object({
}).strict();

export const AgencyUnitPersonUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AgencyUnitPersonUncheckedUpdateManyInput> = z.object({
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingPlanCreateInputSchema: z.ZodType<Prisma.FundingPlanCreateInput> = z.object({
  PlanType: z.number().int(),
  Name: z.string(),
  fundings: z.lazy(() => PatentFundingCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const FundingPlanUncheckedCreateInputSchema: z.ZodType<Prisma.FundingPlanUncheckedCreateInput> = z.object({
  PlanID: z.number().int().optional(),
  PlanType: z.number().int(),
  Name: z.string(),
  fundings: z.lazy(() => PatentFundingUncheckedCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const FundingPlanUpdateInputSchema: z.ZodType<Prisma.FundingPlanUpdateInput> = z.object({
  PlanType: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fundings: z.lazy(() => PatentFundingUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const FundingPlanUncheckedUpdateInputSchema: z.ZodType<Prisma.FundingPlanUncheckedUpdateInput> = z.object({
  PlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PlanType: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fundings: z.lazy(() => PatentFundingUncheckedUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const FundingPlanCreateManyInputSchema: z.ZodType<Prisma.FundingPlanCreateManyInput> = z.object({
  PlanID: z.number().int().optional(),
  PlanType: z.number().int(),
  Name: z.string()
}).strict();

export const FundingPlanUpdateManyMutationInputSchema: z.ZodType<Prisma.FundingPlanUpdateManyMutationInput> = z.object({
  PlanType: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingPlanUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FundingPlanUncheckedUpdateManyInput> = z.object({
  PlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PlanType: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingUnitCreateInputSchema: z.ZodType<Prisma.FundingUnitCreateInput> = z.object({
  Name: z.string(),
  PatentFundingUnit: z.lazy(() => PatentFundingUnitCreateNestedManyWithoutFundingUnitInputSchema).optional(),
  FundingRecord: z.lazy(() => FundingRecordCreateNestedManyWithoutCanFundingByInputSchema).optional()
}).strict();

export const FundingUnitUncheckedCreateInputSchema: z.ZodType<Prisma.FundingUnitUncheckedCreateInput> = z.object({
  FundingUnitID: z.number().int().optional(),
  Name: z.string(),
  PatentFundingUnit: z.lazy(() => PatentFundingUnitUncheckedCreateNestedManyWithoutFundingUnitInputSchema).optional(),
  FundingRecord: z.lazy(() => FundingRecordUncheckedCreateNestedManyWithoutCanFundingByInputSchema).optional()
}).strict();

export const FundingUnitUpdateInputSchema: z.ZodType<Prisma.FundingUnitUpdateInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentFundingUnit: z.lazy(() => PatentFundingUnitUpdateManyWithoutFundingUnitNestedInputSchema).optional(),
  FundingRecord: z.lazy(() => FundingRecordUpdateManyWithoutCanFundingByNestedInputSchema).optional()
}).strict();

export const FundingUnitUncheckedUpdateInputSchema: z.ZodType<Prisma.FundingUnitUncheckedUpdateInput> = z.object({
  FundingUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentFundingUnit: z.lazy(() => PatentFundingUnitUncheckedUpdateManyWithoutFundingUnitNestedInputSchema).optional(),
  FundingRecord: z.lazy(() => FundingRecordUncheckedUpdateManyWithoutCanFundingByNestedInputSchema).optional()
}).strict();

export const FundingUnitCreateManyInputSchema: z.ZodType<Prisma.FundingUnitCreateManyInput> = z.object({
  FundingUnitID: z.number().int().optional(),
  Name: z.string()
}).strict();

export const FundingUnitUpdateManyMutationInputSchema: z.ZodType<Prisma.FundingUnitUpdateManyMutationInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingUnitUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FundingUnitUncheckedUpdateManyInput> = z.object({
  FundingUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentFundingCreateInputSchema: z.ZodType<Prisma.PatentFundingCreateInput> = z.object({
  patent: z.lazy(() => PatentCreateNestedOneWithoutFundingInputSchema),
  plan: z.lazy(() => FundingPlanCreateNestedOneWithoutFundingsInputSchema),
  fundingRecords: z.lazy(() => FundingRecordCreateNestedManyWithoutPatentFundingInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitCreateNestedManyWithoutPatentFundingInputSchema).optional()
}).strict();

export const PatentFundingUncheckedCreateInputSchema: z.ZodType<Prisma.PatentFundingUncheckedCreateInput> = z.object({
  PatentID: z.number().int(),
  fundingPlanPlanID: z.number().int(),
  fundingRecords: z.lazy(() => FundingRecordUncheckedCreateNestedManyWithoutPatentFundingInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitUncheckedCreateNestedManyWithoutPatentFundingInputSchema).optional()
}).strict();

export const PatentFundingUpdateInputSchema: z.ZodType<Prisma.PatentFundingUpdateInput> = z.object({
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutFundingNestedInputSchema).optional(),
  plan: z.lazy(() => FundingPlanUpdateOneRequiredWithoutFundingsNestedInputSchema).optional(),
  fundingRecords: z.lazy(() => FundingRecordUpdateManyWithoutPatentFundingNestedInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitUpdateManyWithoutPatentFundingNestedInputSchema).optional()
}).strict();

export const PatentFundingUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundingPlanPlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundingRecords: z.lazy(() => FundingRecordUncheckedUpdateManyWithoutPatentFundingNestedInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitUncheckedUpdateManyWithoutPatentFundingNestedInputSchema).optional()
}).strict();

export const PatentFundingCreateManyInputSchema: z.ZodType<Prisma.PatentFundingCreateManyInput> = z.object({
  PatentID: z.number().int(),
  fundingPlanPlanID: z.number().int()
}).strict();

export const PatentFundingUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentFundingUpdateManyMutationInput> = z.object({
}).strict();

export const PatentFundingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundingPlanPlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingRecordCreateInputSchema: z.ZodType<Prisma.FundingRecordCreateInput> = z.object({
  Amount: z.number(),
  patentFunding: z.lazy(() => PatentFundingCreateNestedOneWithoutFundingRecordsInputSchema),
  canFundingBy: z.lazy(() => FundingUnitCreateNestedManyWithoutFundingRecordInputSchema).optional()
}).strict();

export const FundingRecordUncheckedCreateInputSchema: z.ZodType<Prisma.FundingRecordUncheckedCreateInput> = z.object({
  FundingRecordID: z.number().int().optional(),
  PatentFundingPatentID: z.number().int(),
  Amount: z.number(),
  canFundingBy: z.lazy(() => FundingUnitUncheckedCreateNestedManyWithoutFundingRecordInputSchema).optional()
}).strict();

export const FundingRecordUpdateInputSchema: z.ZodType<Prisma.FundingRecordUpdateInput> = z.object({
  Amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  patentFunding: z.lazy(() => PatentFundingUpdateOneRequiredWithoutFundingRecordsNestedInputSchema).optional(),
  canFundingBy: z.lazy(() => FundingUnitUpdateManyWithoutFundingRecordNestedInputSchema).optional()
}).strict();

export const FundingRecordUncheckedUpdateInputSchema: z.ZodType<Prisma.FundingRecordUncheckedUpdateInput> = z.object({
  FundingRecordID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentFundingPatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  canFundingBy: z.lazy(() => FundingUnitUncheckedUpdateManyWithoutFundingRecordNestedInputSchema).optional()
}).strict();

export const FundingRecordCreateManyInputSchema: z.ZodType<Prisma.FundingRecordCreateManyInput> = z.object({
  FundingRecordID: z.number().int().optional(),
  PatentFundingPatentID: z.number().int(),
  Amount: z.number()
}).strict();

export const FundingRecordUpdateManyMutationInputSchema: z.ZodType<Prisma.FundingRecordUpdateManyMutationInput> = z.object({
  Amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingRecordUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FundingRecordUncheckedUpdateManyInput> = z.object({
  FundingRecordID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentFundingPatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentFundingUnitCreateInputSchema: z.ZodType<Prisma.PatentFundingUnitCreateInput> = z.object({
  ProjectCode: z.string(),
  fundingUnit: z.lazy(() => FundingUnitCreateNestedOneWithoutPatentFundingUnitInputSchema),
  patentFunding: z.lazy(() => PatentFundingCreateNestedOneWithoutPatentFundingUnitsInputSchema)
}).strict();

export const PatentFundingUnitUncheckedCreateInputSchema: z.ZodType<Prisma.PatentFundingUnitUncheckedCreateInput> = z.object({
  PatentID: z.number().int(),
  FundingUnitID: z.number().int(),
  ProjectCode: z.string()
}).strict();

export const PatentFundingUnitUpdateInputSchema: z.ZodType<Prisma.PatentFundingUnitUpdateInput> = z.object({
  ProjectCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fundingUnit: z.lazy(() => FundingUnitUpdateOneRequiredWithoutPatentFundingUnitNestedInputSchema).optional(),
  patentFunding: z.lazy(() => PatentFundingUpdateOneRequiredWithoutPatentFundingUnitsNestedInputSchema).optional()
}).strict();

export const PatentFundingUnitUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentFundingUnitUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FundingUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentFundingUnitCreateManyInputSchema: z.ZodType<Prisma.PatentFundingUnitCreateManyInput> = z.object({
  PatentID: z.number().int(),
  FundingUnitID: z.number().int(),
  ProjectCode: z.string()
}).strict();

export const PatentFundingUnitUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentFundingUnitUpdateManyMutationInput> = z.object({
  ProjectCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentFundingUnitUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentFundingUnitUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FundingUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InventorCreateInputSchema: z.ZodType<Prisma.InventorCreateInput> = z.object({
  department: z.lazy(() => DepartmentCreateNestedOneWithoutInventorsInputSchema),
  contactInfo: z.lazy(() => ContactInfoCreateNestedOneWithoutInventorInputSchema),
  patents: z.lazy(() => PatentInventorCreateNestedManyWithoutInventorInputSchema).optional()
}).strict();

export const InventorUncheckedCreateInputSchema: z.ZodType<Prisma.InventorUncheckedCreateInput> = z.object({
  InventorID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  ContactInfoID: z.number().int(),
  patents: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutInventorInputSchema).optional()
}).strict();

export const InventorUpdateInputSchema: z.ZodType<Prisma.InventorUpdateInput> = z.object({
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutInventorsNestedInputSchema).optional(),
  contactInfo: z.lazy(() => ContactInfoUpdateOneRequiredWithoutInventorNestedInputSchema).optional(),
  patents: z.lazy(() => PatentInventorUpdateManyWithoutInventorNestedInputSchema).optional()
}).strict();

export const InventorUncheckedUpdateInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patents: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutInventorNestedInputSchema).optional()
}).strict();

export const InventorCreateManyInputSchema: z.ZodType<Prisma.InventorCreateManyInput> = z.object({
  InventorID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  ContactInfoID: z.number().int()
}).strict();

export const InventorUpdateManyMutationInputSchema: z.ZodType<Prisma.InventorUpdateManyMutationInput> = z.object({
}).strict();

export const InventorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateManyInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
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

export const NoteCreateInputSchema: z.ZodType<Prisma.NoteCreateInput> = z.object({
  Key: z.string(),
  Title: z.string(),
  Body: z.string(),
  Date: z.coerce.date().optional()
}).strict();

export const NoteUncheckedCreateInputSchema: z.ZodType<Prisma.NoteUncheckedCreateInput> = z.object({
  NoteID: z.number().int().optional(),
  Key: z.string(),
  Title: z.string(),
  Body: z.string(),
  Date: z.coerce.date().optional()
}).strict();

export const NoteUpdateInputSchema: z.ZodType<Prisma.NoteUpdateInput> = z.object({
  Key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteUncheckedUpdateInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateInput> = z.object({
  NoteID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteCreateManyInputSchema: z.ZodType<Prisma.NoteCreateManyInput> = z.object({
  NoteID: z.number().int().optional(),
  Key: z.string(),
  Title: z.string(),
  Body: z.string(),
  Date: z.coerce.date().optional()
}).strict();

export const NoteUpdateManyMutationInputSchema: z.ZodType<Prisma.NoteUpdateManyMutationInput> = z.object({
  Key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateManyInput> = z.object({
  NoteID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentCreateInputSchema: z.ZodType<Prisma.PatentCreateInput> = z.object({
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutPatentsInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateInputSchema: z.ZodType<Prisma.PatentUncheckedCreateInput> = z.object({
  PatentID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentUpdateInputSchema: z.ZodType<Prisma.PatentUpdateInput> = z.object({
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneWithoutPatentsNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentCreateManyInputSchema: z.ZodType<Prisma.PatentCreateManyInput> = z.object({
  PatentID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PatentUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentUpdateManyMutationInput> = z.object({
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentApplicationDataCreateInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateInput> = z.object({
  ApplicationNumber: z.string().optional().nullable(),
  FilingDate: z.coerce.date().optional().nullable(),
  RDResultNumber: z.string().optional().nullable(),
  NSCNumber: z.string().optional().nullable(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutApplicationInputSchema).optional()
}).strict();

export const PatentApplicationDataUncheckedCreateInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedCreateInput> = z.object({
  PatentID: z.number().int().optional(),
  ApplicationNumber: z.string().optional().nullable(),
  FilingDate: z.coerce.date().optional().nullable(),
  RDResultNumber: z.string().optional().nullable(),
  NSCNumber: z.string().optional().nullable()
}).strict();

export const PatentApplicationDataUpdateInputSchema: z.ZodType<Prisma.PatentApplicationDataUpdateInput> = z.object({
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  RDResultNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  NSCNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutApplicationNestedInputSchema).optional()
}).strict();

export const PatentApplicationDataUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  RDResultNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  NSCNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentApplicationDataCreateManyInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateManyInput> = z.object({
  PatentID: z.number().int().optional(),
  ApplicationNumber: z.string().optional().nullable(),
  FilingDate: z.coerce.date().optional().nullable(),
  RDResultNumber: z.string().optional().nullable(),
  NSCNumber: z.string().optional().nullable()
}).strict();

export const PatentApplicationDataUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentApplicationDataUpdateManyMutationInput> = z.object({
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  RDResultNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  NSCNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentApplicationDataUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  RDResultNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  NSCNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const PatentInternalCreateInputSchema: z.ZodType<Prisma.PatentInternalCreateInput> = z.object({
  InternalID: z.string(),
  InitialReviewDate: z.coerce.date().optional().nullable(),
  InitialReviewNumber: z.number().int().optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitCreateNestedManyWithoutPatentInternalInputSchema).optional(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitCreateNestedManyWithoutPatentInternalInputSchema).optional(),
  Patent: z.lazy(() => PatentCreateNestedOneWithoutInternalInputSchema)
}).strict();

export const PatentInternalUncheckedCreateInputSchema: z.ZodType<Prisma.PatentInternalUncheckedCreateInput> = z.object({
  PatentID: z.number().int(),
  InternalID: z.string(),
  InitialReviewDate: z.coerce.date().optional().nullable(),
  InitialReviewNumber: z.number().int().optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateNestedManyWithoutPatentInternalInputSchema).optional(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitUncheckedCreateNestedManyWithoutPatentInternalInputSchema).optional()
}).strict();

export const PatentInternalUpdateInputSchema: z.ZodType<Prisma.PatentInternalUpdateInput> = z.object({
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InitialReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithoutPatentInternalNestedInputSchema).optional(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitUpdateManyWithoutPatentInternalNestedInputSchema).optional(),
  Patent: z.lazy(() => PatentUpdateOneRequiredWithoutInternalNestedInputSchema).optional()
}).strict();

export const PatentInternalUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentInternalUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InitialReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutPatentInternalNestedInputSchema).optional(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitUncheckedUpdateManyWithoutPatentInternalNestedInputSchema).optional()
}).strict();

export const PatentInternalCreateManyInputSchema: z.ZodType<Prisma.PatentInternalCreateManyInput> = z.object({
  PatentID: z.number().int(),
  InternalID: z.string(),
  InitialReviewDate: z.coerce.date().optional().nullable(),
  InitialReviewNumber: z.number().int().optional().nullable()
}).strict();

export const PatentInternalUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentInternalUpdateManyMutationInput> = z.object({
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InitialReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentInternalUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentInternalUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InitialReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentExternalCreateInputSchema: z.ZodType<Prisma.PatentExternalCreateInput> = z.object({
  PatentNumber: z.string().optional().nullable(),
  PublicationDate: z.coerce.date().optional().nullable(),
  StartDate: z.coerce.date().optional().nullable(),
  EndDate: z.coerce.date().optional().nullable(),
  IPCNumber: z.string().optional().nullable(),
  PatentScope: z.string().optional().nullable(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutExternalInputSchema)
}).strict();

export const PatentExternalUncheckedCreateInputSchema: z.ZodType<Prisma.PatentExternalUncheckedCreateInput> = z.object({
  PatentID: z.number().int(),
  PatentNumber: z.string().optional().nullable(),
  PublicationDate: z.coerce.date().optional().nullable(),
  StartDate: z.coerce.date().optional().nullable(),
  EndDate: z.coerce.date().optional().nullable(),
  IPCNumber: z.string().optional().nullable(),
  PatentScope: z.string().optional().nullable()
}).strict();

export const PatentExternalUpdateInputSchema: z.ZodType<Prisma.PatentExternalUpdateInput> = z.object({
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  StartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  EndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  IPCNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentScope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutExternalNestedInputSchema).optional()
}).strict();

export const PatentExternalUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentExternalUncheckedUpdateInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  StartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  EndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  IPCNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentScope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentExternalCreateManyInputSchema: z.ZodType<Prisma.PatentExternalCreateManyInput> = z.object({
  PatentID: z.number().int(),
  PatentNumber: z.string().optional().nullable(),
  PublicationDate: z.coerce.date().optional().nullable(),
  StartDate: z.coerce.date().optional().nullable(),
  EndDate: z.coerce.date().optional().nullable(),
  IPCNumber: z.string().optional().nullable(),
  PatentScope: z.string().optional().nullable()
}).strict();

export const PatentExternalUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentExternalUpdateManyMutationInput> = z.object({
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  StartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  EndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  IPCNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentScope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentExternalUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentExternalUncheckedUpdateManyInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  StartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  EndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  IPCNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentScope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentManualStatusCreateInputSchema: z.ZodType<Prisma.PatentManualStatusCreateInput> = z.object({
  Reason: z.string(),
  Date: z.coerce.date().optional().nullable(),
  Active: z.boolean(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutManualStatusInputSchema)
}).strict();

export const PatentManualStatusUncheckedCreateInputSchema: z.ZodType<Prisma.PatentManualStatusUncheckedCreateInput> = z.object({
  ManualStatusID: z.number().int().optional(),
  PatentID: z.number().int(),
  Reason: z.string(),
  Date: z.coerce.date().optional().nullable(),
  Active: z.boolean()
}).strict();

export const PatentManualStatusUpdateInputSchema: z.ZodType<Prisma.PatentManualStatusUpdateInput> = z.object({
  Reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutManualStatusNestedInputSchema).optional()
}).strict();

export const PatentManualStatusUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentManualStatusUncheckedUpdateInput> = z.object({
  ManualStatusID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentManualStatusCreateManyInputSchema: z.ZodType<Prisma.PatentManualStatusCreateManyInput> = z.object({
  ManualStatusID: z.number().int().optional(),
  PatentID: z.number().int(),
  Reason: z.string(),
  Date: z.coerce.date().optional().nullable(),
  Active: z.boolean()
}).strict();

export const PatentManualStatusUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentManualStatusUpdateManyMutationInput> = z.object({
  Reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentManualStatusUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentManualStatusUncheckedUpdateManyInput> = z.object({
  ManualStatusID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentMaintenanceCreateInputSchema: z.ZodType<Prisma.PatentMaintenanceCreateInput> = z.object({
  MaintenanceDate: z.coerce.date(),
  ExpireDate: z.coerce.date(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutMaintenancesInputSchema)
}).strict();

export const PatentMaintenanceUncheckedCreateInputSchema: z.ZodType<Prisma.PatentMaintenanceUncheckedCreateInput> = z.object({
  MaintenanceID: z.number().int().optional(),
  PatentID: z.number().int(),
  MaintenanceDate: z.coerce.date(),
  ExpireDate: z.coerce.date()
}).strict();

export const PatentMaintenanceUpdateInputSchema: z.ZodType<Prisma.PatentMaintenanceUpdateInput> = z.object({
  MaintenanceDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ExpireDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutMaintenancesNestedInputSchema).optional()
}).strict();

export const PatentMaintenanceUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentMaintenanceUncheckedUpdateInput> = z.object({
  MaintenanceID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  MaintenanceDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ExpireDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentMaintenanceCreateManyInputSchema: z.ZodType<Prisma.PatentMaintenanceCreateManyInput> = z.object({
  MaintenanceID: z.number().int().optional(),
  PatentID: z.number().int(),
  MaintenanceDate: z.coerce.date(),
  ExpireDate: z.coerce.date()
}).strict();

export const PatentMaintenanceUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentMaintenanceUpdateManyMutationInput> = z.object({
  MaintenanceDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ExpireDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentMaintenanceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentMaintenanceUncheckedUpdateManyInput> = z.object({
  MaintenanceID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  MaintenanceDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ExpireDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentRecordCreateInputSchema: z.ZodType<Prisma.PatentRecordCreateInput> = z.object({
  Record: z.string().optional().nullable(),
  Date: z.coerce.date().optional().nullable(),
  patent: z.lazy(() => PatentCreateNestedOneWithoutPatentRecordsInputSchema)
}).strict();

export const PatentRecordUncheckedCreateInputSchema: z.ZodType<Prisma.PatentRecordUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  PatentID: z.number().int(),
  Record: z.string().optional().nullable(),
  Date: z.coerce.date().optional().nullable()
}).strict();

export const PatentRecordUpdateInputSchema: z.ZodType<Prisma.PatentRecordUpdateInput> = z.object({
  Record: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutPatentRecordsNestedInputSchema).optional()
}).strict();

export const PatentRecordUncheckedUpdateInputSchema: z.ZodType<Prisma.PatentRecordUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Record: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentRecordCreateManyInputSchema: z.ZodType<Prisma.PatentRecordCreateManyInput> = z.object({
  id: z.number().int().optional(),
  PatentID: z.number().int(),
  Record: z.string().optional().nullable(),
  Date: z.coerce.date().optional().nullable()
}).strict();

export const PatentRecordUpdateManyMutationInputSchema: z.ZodType<Prisma.PatentRecordUpdateManyMutationInput> = z.object({
  Record: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentRecordUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatentRecordUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Record: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CollegeCreateInputSchema: z.ZodType<Prisma.CollegeCreateInput> = z.object({
  Name: z.string(),
  Description: z.string().optional().nullable(),
  departments: z.lazy(() => DepartmentCreateNestedManyWithoutCollegeInputSchema).optional()
}).strict();

export const CollegeUncheckedCreateInputSchema: z.ZodType<Prisma.CollegeUncheckedCreateInput> = z.object({
  CollegeID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable(),
  departments: z.lazy(() => DepartmentUncheckedCreateNestedManyWithoutCollegeInputSchema).optional()
}).strict();

export const CollegeUpdateInputSchema: z.ZodType<Prisma.CollegeUpdateInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departments: z.lazy(() => DepartmentUpdateManyWithoutCollegeNestedInputSchema).optional()
}).strict();

export const CollegeUncheckedUpdateInputSchema: z.ZodType<Prisma.CollegeUncheckedUpdateInput> = z.object({
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departments: z.lazy(() => DepartmentUncheckedUpdateManyWithoutCollegeNestedInputSchema).optional()
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
  patents: z.lazy(() => PatentCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateInputSchema: z.ZodType<Prisma.CountryUncheckedCreateInput> = z.object({
  CountryID: z.number().int().optional(),
  CountryName: z.string(),
  ISOCode: z.string(),
  patents: z.lazy(() => PatentUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUpdateInputSchema: z.ZodType<Prisma.CountryUpdateInput> = z.object({
  CountryName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ISOCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patents: z.lazy(() => PatentUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateInput> = z.object({
  CountryID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CountryName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ISOCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patents: z.lazy(() => PatentUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
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
  Name: z.string(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Role: z.string().optional().nullable(),
  Note: z.string().optional().nullable(),
  AgencyUnitPerson: z.lazy(() => AgencyUnitPersonCreateNestedManyWithoutContactInfoInputSchema).optional(),
  Inventor: z.lazy(() => InventorCreateNestedManyWithoutContactInfoInputSchema).optional()
}).strict();

export const ContactInfoUncheckedCreateInputSchema: z.ZodType<Prisma.ContactInfoUncheckedCreateInput> = z.object({
  ContactInfoID: z.number().int().optional(),
  Name: z.string(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Role: z.string().optional().nullable(),
  Note: z.string().optional().nullable(),
  AgencyUnitPerson: z.lazy(() => AgencyUnitPersonUncheckedCreateNestedManyWithoutContactInfoInputSchema).optional(),
  Inventor: z.lazy(() => InventorUncheckedCreateNestedManyWithoutContactInfoInputSchema).optional()
}).strict();

export const ContactInfoUpdateInputSchema: z.ZodType<Prisma.ContactInfoUpdateInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  AgencyUnitPerson: z.lazy(() => AgencyUnitPersonUpdateManyWithoutContactInfoNestedInputSchema).optional(),
  Inventor: z.lazy(() => InventorUpdateManyWithoutContactInfoNestedInputSchema).optional()
}).strict();

export const ContactInfoUncheckedUpdateInputSchema: z.ZodType<Prisma.ContactInfoUncheckedUpdateInput> = z.object({
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  AgencyUnitPerson: z.lazy(() => AgencyUnitPersonUncheckedUpdateManyWithoutContactInfoNestedInputSchema).optional(),
  Inventor: z.lazy(() => InventorUncheckedUpdateManyWithoutContactInfoNestedInputSchema).optional()
}).strict();

export const ContactInfoCreateManyInputSchema: z.ZodType<Prisma.ContactInfoCreateManyInput> = z.object({
  ContactInfoID: z.number().int().optional(),
  Name: z.string(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Role: z.string().optional().nullable(),
  Note: z.string().optional().nullable()
}).strict();

export const ContactInfoUpdateManyMutationInputSchema: z.ZodType<Prisma.ContactInfoUpdateManyMutationInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ContactInfoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContactInfoUncheckedUpdateManyInput> = z.object({
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const AgencyUnitPersonListRelationFilterSchema: z.ZodType<Prisma.AgencyUnitPersonListRelationFilter> = z.object({
  every: z.lazy(() => AgencyUnitPersonWhereInputSchema).optional(),
  some: z.lazy(() => AgencyUnitPersonWhereInputSchema).optional(),
  none: z.lazy(() => AgencyUnitPersonWhereInputSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitListRelationFilterSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitListRelationFilter> = z.object({
  every: z.lazy(() => PatentInitiatorAgencyUnitWhereInputSchema).optional(),
  some: z.lazy(() => PatentInitiatorAgencyUnitWhereInputSchema).optional(),
  none: z.lazy(() => PatentInitiatorAgencyUnitWhereInputSchema).optional()
}).strict();

export const PatentTakerAgencyUnitListRelationFilterSchema: z.ZodType<Prisma.PatentTakerAgencyUnitListRelationFilter> = z.object({
  every: z.lazy(() => PatentTakerAgencyUnitWhereInputSchema).optional(),
  some: z.lazy(() => PatentTakerAgencyUnitWhereInputSchema).optional(),
  none: z.lazy(() => PatentTakerAgencyUnitWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AgencyUnitPersonOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AgencyUnitPersonOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentTakerAgencyUnitOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyUnitCountOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyUnitCountOrderByAggregateInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyUnitAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyUnitAvgOrderByAggregateInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyUnitMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyUnitMaxOrderByAggregateInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyUnitMinOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyUnitMinOrderByAggregateInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyUnitSumOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyUnitSumOrderByAggregateInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional()
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

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  not: InputJsonValueSchema.optional()
}).strict();

export const AgencyUnitScalarRelationFilterSchema: z.ZodType<Prisma.AgencyUnitScalarRelationFilter> = z.object({
  is: z.lazy(() => AgencyUnitWhereInputSchema).optional(),
  isNot: z.lazy(() => AgencyUnitWhereInputSchema).optional()
}).strict();

export const PatentInternalScalarRelationFilterSchema: z.ZodType<Prisma.PatentInternalScalarRelationFilter> = z.object({
  is: z.lazy(() => PatentInternalWhereInputSchema).optional(),
  isNot: z.lazy(() => PatentInternalWhereInputSchema).optional()
}).strict();

export const PatentTakerAgencyUnitPatentIDAgencyUnitIDCompoundUniqueInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitPatentIDAgencyUnitIDCompoundUniqueInput> = z.object({
  PatentID: z.number(),
  AgencyUnitID: z.number()
}).strict();

export const PatentTakerAgencyUnitCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  FileCode: z.lazy(() => SortOrderSchema).optional(),
  agencyUnitPersonIds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentTakerAgencyUnitAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentTakerAgencyUnitMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  FileCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentTakerAgencyUnitMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  FileCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentTakerAgencyUnitSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitPatentIDAgencyUnitIDCompoundUniqueInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitPatentIDAgencyUnitIDCompoundUniqueInput> = z.object({
  PatentID: z.number(),
  AgencyUnitID: z.number()
}).strict();

export const PatentInitiatorAgencyUnitCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  agencyUnitPersonIds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactInfoScalarRelationFilterSchema: z.ZodType<Prisma.ContactInfoScalarRelationFilter> = z.object({
  is: z.lazy(() => ContactInfoWhereInputSchema).optional(),
  isNot: z.lazy(() => ContactInfoWhereInputSchema).optional()
}).strict();

export const AgencyUnitPersonAgencyUnitIDContactInfoIDCompoundUniqueInputSchema: z.ZodType<Prisma.AgencyUnitPersonAgencyUnitIDContactInfoIDCompoundUniqueInput> = z.object({
  AgencyUnitID: z.number(),
  ContactInfoID: z.number()
}).strict();

export const AgencyUnitPersonCountOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyUnitPersonCountOrderByAggregateInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyUnitPersonAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyUnitPersonAvgOrderByAggregateInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyUnitPersonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyUnitPersonMaxOrderByAggregateInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyUnitPersonMinOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyUnitPersonMinOrderByAggregateInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyUnitPersonSumOrderByAggregateInputSchema: z.ZodType<Prisma.AgencyUnitPersonSumOrderByAggregateInput> = z.object({
  AgencyUnitID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
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
  PlanType: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingPlanAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FundingPlanAvgOrderByAggregateInput> = z.object({
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  PlanType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingPlanMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FundingPlanMaxOrderByAggregateInput> = z.object({
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  PlanType: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingPlanMinOrderByAggregateInputSchema: z.ZodType<Prisma.FundingPlanMinOrderByAggregateInput> = z.object({
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  PlanType: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingPlanSumOrderByAggregateInputSchema: z.ZodType<Prisma.FundingPlanSumOrderByAggregateInput> = z.object({
  PlanID: z.lazy(() => SortOrderSchema).optional(),
  PlanType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentFundingUnitListRelationFilterSchema: z.ZodType<Prisma.PatentFundingUnitListRelationFilter> = z.object({
  every: z.lazy(() => PatentFundingUnitWhereInputSchema).optional(),
  some: z.lazy(() => PatentFundingUnitWhereInputSchema).optional(),
  none: z.lazy(() => PatentFundingUnitWhereInputSchema).optional()
}).strict();

export const FundingRecordListRelationFilterSchema: z.ZodType<Prisma.FundingRecordListRelationFilter> = z.object({
  every: z.lazy(() => FundingRecordWhereInputSchema).optional(),
  some: z.lazy(() => FundingRecordWhereInputSchema).optional(),
  none: z.lazy(() => FundingRecordWhereInputSchema).optional()
}).strict();

export const PatentFundingUnitOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatentFundingUnitOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingRecordOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FundingRecordOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingUnitCountOrderByAggregateInputSchema: z.ZodType<Prisma.FundingUnitCountOrderByAggregateInput> = z.object({
  FundingUnitID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingUnitAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FundingUnitAvgOrderByAggregateInput> = z.object({
  FundingUnitID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingUnitMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FundingUnitMaxOrderByAggregateInput> = z.object({
  FundingUnitID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingUnitMinOrderByAggregateInputSchema: z.ZodType<Prisma.FundingUnitMinOrderByAggregateInput> = z.object({
  FundingUnitID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingUnitSumOrderByAggregateInputSchema: z.ZodType<Prisma.FundingUnitSumOrderByAggregateInput> = z.object({
  FundingUnitID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentScalarRelationFilterSchema: z.ZodType<Prisma.PatentScalarRelationFilter> = z.object({
  is: z.lazy(() => PatentWhereInputSchema).optional(),
  isNot: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const FundingPlanScalarRelationFilterSchema: z.ZodType<Prisma.FundingPlanScalarRelationFilter> = z.object({
  is: z.lazy(() => FundingPlanWhereInputSchema).optional(),
  isNot: z.lazy(() => FundingPlanWhereInputSchema).optional()
}).strict();

export const PatentFundingCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  fundingPlanPlanID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentFundingAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  fundingPlanPlanID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentFundingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  fundingPlanPlanID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentFundingMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  fundingPlanPlanID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentFundingSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  fundingPlanPlanID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const PatentFundingScalarRelationFilterSchema: z.ZodType<Prisma.PatentFundingScalarRelationFilter> = z.object({
  is: z.lazy(() => PatentFundingWhereInputSchema).optional(),
  isNot: z.lazy(() => PatentFundingWhereInputSchema).optional()
}).strict();

export const FundingUnitListRelationFilterSchema: z.ZodType<Prisma.FundingUnitListRelationFilter> = z.object({
  every: z.lazy(() => FundingUnitWhereInputSchema).optional(),
  some: z.lazy(() => FundingUnitWhereInputSchema).optional(),
  none: z.lazy(() => FundingUnitWhereInputSchema).optional()
}).strict();

export const FundingUnitOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FundingUnitOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingRecordCountOrderByAggregateInputSchema: z.ZodType<Prisma.FundingRecordCountOrderByAggregateInput> = z.object({
  FundingRecordID: z.lazy(() => SortOrderSchema).optional(),
  PatentFundingPatentID: z.lazy(() => SortOrderSchema).optional(),
  Amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingRecordAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FundingRecordAvgOrderByAggregateInput> = z.object({
  FundingRecordID: z.lazy(() => SortOrderSchema).optional(),
  PatentFundingPatentID: z.lazy(() => SortOrderSchema).optional(),
  Amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingRecordMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FundingRecordMaxOrderByAggregateInput> = z.object({
  FundingRecordID: z.lazy(() => SortOrderSchema).optional(),
  PatentFundingPatentID: z.lazy(() => SortOrderSchema).optional(),
  Amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingRecordMinOrderByAggregateInputSchema: z.ZodType<Prisma.FundingRecordMinOrderByAggregateInput> = z.object({
  FundingRecordID: z.lazy(() => SortOrderSchema).optional(),
  PatentFundingPatentID: z.lazy(() => SortOrderSchema).optional(),
  Amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundingRecordSumOrderByAggregateInputSchema: z.ZodType<Prisma.FundingRecordSumOrderByAggregateInput> = z.object({
  FundingRecordID: z.lazy(() => SortOrderSchema).optional(),
  PatentFundingPatentID: z.lazy(() => SortOrderSchema).optional(),
  Amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const FundingUnitScalarRelationFilterSchema: z.ZodType<Prisma.FundingUnitScalarRelationFilter> = z.object({
  is: z.lazy(() => FundingUnitWhereInputSchema).optional(),
  isNot: z.lazy(() => FundingUnitWhereInputSchema).optional()
}).strict();

export const PatentFundingUnitPatentIDFundingUnitIDCompoundUniqueInputSchema: z.ZodType<Prisma.PatentFundingUnitPatentIDFundingUnitIDCompoundUniqueInput> = z.object({
  PatentID: z.number(),
  FundingUnitID: z.number()
}).strict();

export const PatentFundingUnitCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingUnitCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  FundingUnitID: z.lazy(() => SortOrderSchema).optional(),
  ProjectCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentFundingUnitAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingUnitAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  FundingUnitID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentFundingUnitMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingUnitMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  FundingUnitID: z.lazy(() => SortOrderSchema).optional(),
  ProjectCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentFundingUnitMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingUnitMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  FundingUnitID: z.lazy(() => SortOrderSchema).optional(),
  ProjectCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentFundingUnitSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentFundingUnitSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  FundingUnitID: z.lazy(() => SortOrderSchema).optional()
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
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventorMinOrderByAggregateInputSchema: z.ZodType<Prisma.InventorMinOrderByAggregateInput> = z.object({
  InventorID: z.lazy(() => SortOrderSchema).optional(),
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

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.NoteCountOrderByAggregateInput> = z.object({
  NoteID: z.lazy(() => SortOrderSchema).optional(),
  Key: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  Body: z.lazy(() => SortOrderSchema).optional(),
  Date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NoteAvgOrderByAggregateInput> = z.object({
  NoteID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NoteMaxOrderByAggregateInput> = z.object({
  NoteID: z.lazy(() => SortOrderSchema).optional(),
  Key: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  Body: z.lazy(() => SortOrderSchema).optional(),
  Date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.NoteMinOrderByAggregateInput> = z.object({
  NoteID: z.lazy(() => SortOrderSchema).optional(),
  Key: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  Body: z.lazy(() => SortOrderSchema).optional(),
  Date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteSumOrderByAggregateInputSchema: z.ZodType<Prisma.NoteSumOrderByAggregateInput> = z.object({
  NoteID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
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

export const PatentApplicationDataNullableScalarRelationFilterSchema: z.ZodType<Prisma.PatentApplicationDataNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PatentApplicationDataWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PatentApplicationDataWhereInputSchema).optional().nullable()
}).strict();

export const PatentFundingNullableScalarRelationFilterSchema: z.ZodType<Prisma.PatentFundingNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PatentFundingWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PatentFundingWhereInputSchema).optional().nullable()
}).strict();

export const PatentManualStatusListRelationFilterSchema: z.ZodType<Prisma.PatentManualStatusListRelationFilter> = z.object({
  every: z.lazy(() => PatentManualStatusWhereInputSchema).optional(),
  some: z.lazy(() => PatentManualStatusWhereInputSchema).optional(),
  none: z.lazy(() => PatentManualStatusWhereInputSchema).optional()
}).strict();

export const PatentMaintenanceListRelationFilterSchema: z.ZodType<Prisma.PatentMaintenanceListRelationFilter> = z.object({
  every: z.lazy(() => PatentMaintenanceWhereInputSchema).optional(),
  some: z.lazy(() => PatentMaintenanceWhereInputSchema).optional(),
  none: z.lazy(() => PatentMaintenanceWhereInputSchema).optional()
}).strict();

export const PatentTechnicalAttributesNullableScalarRelationFilterSchema: z.ZodType<Prisma.PatentTechnicalAttributesNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PatentTechnicalAttributesWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PatentTechnicalAttributesWhereInputSchema).optional().nullable()
}).strict();

export const PatentInternalNullableScalarRelationFilterSchema: z.ZodType<Prisma.PatentInternalNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PatentInternalWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PatentInternalWhereInputSchema).optional().nullable()
}).strict();

export const PatentExternalNullableScalarRelationFilterSchema: z.ZodType<Prisma.PatentExternalNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PatentExternalWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PatentExternalWhereInputSchema).optional().nullable()
}).strict();

export const PatentRecordListRelationFilterSchema: z.ZodType<Prisma.PatentRecordListRelationFilter> = z.object({
  every: z.lazy(() => PatentRecordWhereInputSchema).optional(),
  some: z.lazy(() => PatentRecordWhereInputSchema).optional(),
  none: z.lazy(() => PatentRecordWhereInputSchema).optional()
}).strict();

export const PatentManualStatusOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatentManualStatusOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentMaintenanceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatentMaintenanceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentRecordOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatentRecordOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  Year: z.lazy(() => SortOrderSchema).optional(),
  DraftTitle: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  TitleEnglish: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.lazy(() => SortOrderSchema).optional(),
  PatentType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  Year: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  Year: z.lazy(() => SortOrderSchema).optional(),
  DraftTitle: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  TitleEnglish: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.lazy(() => SortOrderSchema).optional(),
  PatentType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  Year: z.lazy(() => SortOrderSchema).optional(),
  DraftTitle: z.lazy(() => SortOrderSchema).optional(),
  Title: z.lazy(() => SortOrderSchema).optional(),
  TitleEnglish: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.lazy(() => SortOrderSchema).optional(),
  PatentType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  DepartmentID: z.lazy(() => SortOrderSchema).optional(),
  Year: z.lazy(() => SortOrderSchema).optional(),
  CountryID: z.lazy(() => SortOrderSchema).optional()
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

export const EnumEnumPatentTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEnumPatentTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  in: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NestedEnumEnumPatentTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEnumPatentTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEnumPatentTypeNullableFilterSchema).optional()
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

export const PatentApplicationDataCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentApplicationDataCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  ApplicationNumber: z.lazy(() => SortOrderSchema).optional(),
  FilingDate: z.lazy(() => SortOrderSchema).optional(),
  RDResultNumber: z.lazy(() => SortOrderSchema).optional(),
  NSCNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentApplicationDataAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentApplicationDataAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentApplicationDataMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentApplicationDataMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  ApplicationNumber: z.lazy(() => SortOrderSchema).optional(),
  FilingDate: z.lazy(() => SortOrderSchema).optional(),
  RDResultNumber: z.lazy(() => SortOrderSchema).optional(),
  NSCNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentApplicationDataMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentApplicationDataMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  ApplicationNumber: z.lazy(() => SortOrderSchema).optional(),
  FilingDate: z.lazy(() => SortOrderSchema).optional(),
  RDResultNumber: z.lazy(() => SortOrderSchema).optional(),
  NSCNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentApplicationDataSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentApplicationDataSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional()
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

export const PatentInternalCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInternalCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InternalID: z.lazy(() => SortOrderSchema).optional(),
  InitialReviewDate: z.lazy(() => SortOrderSchema).optional(),
  InitialReviewNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentInternalAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInternalAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InitialReviewNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentInternalMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInternalMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InternalID: z.lazy(() => SortOrderSchema).optional(),
  InitialReviewDate: z.lazy(() => SortOrderSchema).optional(),
  InitialReviewNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentInternalMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInternalMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InternalID: z.lazy(() => SortOrderSchema).optional(),
  InitialReviewDate: z.lazy(() => SortOrderSchema).optional(),
  InitialReviewNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentInternalSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentInternalSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  InitialReviewNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentExternalCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentExternalCountOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  PatentNumber: z.lazy(() => SortOrderSchema).optional(),
  PublicationDate: z.lazy(() => SortOrderSchema).optional(),
  StartDate: z.lazy(() => SortOrderSchema).optional(),
  EndDate: z.lazy(() => SortOrderSchema).optional(),
  IPCNumber: z.lazy(() => SortOrderSchema).optional(),
  PatentScope: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentExternalAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentExternalAvgOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentExternalMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentExternalMaxOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  PatentNumber: z.lazy(() => SortOrderSchema).optional(),
  PublicationDate: z.lazy(() => SortOrderSchema).optional(),
  StartDate: z.lazy(() => SortOrderSchema).optional(),
  EndDate: z.lazy(() => SortOrderSchema).optional(),
  IPCNumber: z.lazy(() => SortOrderSchema).optional(),
  PatentScope: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentExternalMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentExternalMinOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  PatentNumber: z.lazy(() => SortOrderSchema).optional(),
  PublicationDate: z.lazy(() => SortOrderSchema).optional(),
  StartDate: z.lazy(() => SortOrderSchema).optional(),
  EndDate: z.lazy(() => SortOrderSchema).optional(),
  IPCNumber: z.lazy(() => SortOrderSchema).optional(),
  PatentScope: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentExternalSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentExternalSumOrderByAggregateInput> = z.object({
  PatentID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentManualStatusCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentManualStatusCountOrderByAggregateInput> = z.object({
  ManualStatusID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Reason: z.lazy(() => SortOrderSchema).optional(),
  Date: z.lazy(() => SortOrderSchema).optional(),
  Active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentManualStatusAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentManualStatusAvgOrderByAggregateInput> = z.object({
  ManualStatusID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentManualStatusMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentManualStatusMaxOrderByAggregateInput> = z.object({
  ManualStatusID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Reason: z.lazy(() => SortOrderSchema).optional(),
  Date: z.lazy(() => SortOrderSchema).optional(),
  Active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentManualStatusMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentManualStatusMinOrderByAggregateInput> = z.object({
  ManualStatusID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Reason: z.lazy(() => SortOrderSchema).optional(),
  Date: z.lazy(() => SortOrderSchema).optional(),
  Active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentManualStatusSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentManualStatusSumOrderByAggregateInput> = z.object({
  ManualStatusID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentMaintenanceCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentMaintenanceCountOrderByAggregateInput> = z.object({
  MaintenanceID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceDate: z.lazy(() => SortOrderSchema).optional(),
  ExpireDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentMaintenanceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentMaintenanceAvgOrderByAggregateInput> = z.object({
  MaintenanceID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentMaintenanceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentMaintenanceMaxOrderByAggregateInput> = z.object({
  MaintenanceID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceDate: z.lazy(() => SortOrderSchema).optional(),
  ExpireDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentMaintenanceMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentMaintenanceMinOrderByAggregateInput> = z.object({
  MaintenanceID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  MaintenanceDate: z.lazy(() => SortOrderSchema).optional(),
  ExpireDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentMaintenanceSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentMaintenanceSumOrderByAggregateInput> = z.object({
  MaintenanceID: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentRecordCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatentRecordCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Record: z.lazy(() => SortOrderSchema).optional(),
  Date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentRecordAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatentRecordAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentRecordMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatentRecordMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Record: z.lazy(() => SortOrderSchema).optional(),
  Date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentRecordMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatentRecordMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional(),
  Record: z.lazy(() => SortOrderSchema).optional(),
  Date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentRecordSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatentRecordSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  PatentID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentListRelationFilterSchema: z.ZodType<Prisma.DepartmentListRelationFilter> = z.object({
  every: z.lazy(() => DepartmentWhereInputSchema).optional(),
  some: z.lazy(() => DepartmentWhereInputSchema).optional(),
  none: z.lazy(() => DepartmentWhereInputSchema).optional()
}).strict();

export const DepartmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DepartmentOrderByRelationAggregateInput> = z.object({
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

export const CollegeScalarRelationFilterSchema: z.ZodType<Prisma.CollegeScalarRelationFilter> = z.object({
  is: z.lazy(() => CollegeWhereInputSchema).optional(),
  isNot: z.lazy(() => CollegeWhereInputSchema).optional()
}).strict();

export const InventorListRelationFilterSchema: z.ZodType<Prisma.InventorListRelationFilter> = z.object({
  every: z.lazy(() => InventorWhereInputSchema).optional(),
  some: z.lazy(() => InventorWhereInputSchema).optional(),
  none: z.lazy(() => InventorWhereInputSchema).optional()
}).strict();

export const PatentListRelationFilterSchema: z.ZodType<Prisma.PatentListRelationFilter> = z.object({
  every: z.lazy(() => PatentWhereInputSchema).optional(),
  some: z.lazy(() => PatentWhereInputSchema).optional(),
  none: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const InventorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InventorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatentOrderByRelationAggregateInput> = z.object({
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

export const ContactInfoCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContactInfoCountOrderByAggregateInput> = z.object({
  ContactInfoID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Email: z.lazy(() => SortOrderSchema).optional(),
  OfficeNumber: z.lazy(() => SortOrderSchema).optional(),
  PhoneNumber: z.lazy(() => SortOrderSchema).optional(),
  Role: z.lazy(() => SortOrderSchema).optional(),
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
  Role: z.lazy(() => SortOrderSchema).optional(),
  Note: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactInfoMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContactInfoMinOrderByAggregateInput> = z.object({
  ContactInfoID: z.lazy(() => SortOrderSchema).optional(),
  Name: z.lazy(() => SortOrderSchema).optional(),
  Email: z.lazy(() => SortOrderSchema).optional(),
  OfficeNumber: z.lazy(() => SortOrderSchema).optional(),
  PhoneNumber: z.lazy(() => SortOrderSchema).optional(),
  Role: z.lazy(() => SortOrderSchema).optional(),
  Note: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactInfoSumOrderByAggregateInputSchema: z.ZodType<Prisma.ContactInfoSumOrderByAggregateInput> = z.object({
  ContactInfoID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AgencyUnitPersonCreateNestedManyWithoutAgencyUnitInputSchema: z.ZodType<Prisma.AgencyUnitPersonCreateNestedManyWithoutAgencyUnitInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitPersonCreateWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonCreateWithoutAgencyUnitInputSchema).array(),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutAgencyUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutAgencyUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyUnitPersonCreateManyAgencyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitCreateNestedManyWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateNestedManyWithoutAgencyUnitInput> = z.object({
  create: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutAgencyUnitInputSchema).array(),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInitiatorAgencyUnitCreateManyAgencyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentTakerAgencyUnitCreateNestedManyWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateNestedManyWithoutAgencyUnitInput> = z.object({
  create: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateWithoutAgencyUnitInputSchema).array(),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentTakerAgencyUnitCreateManyAgencyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AgencyUnitPersonUncheckedCreateNestedManyWithoutAgencyUnitInputSchema: z.ZodType<Prisma.AgencyUnitPersonUncheckedCreateNestedManyWithoutAgencyUnitInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitPersonCreateWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonCreateWithoutAgencyUnitInputSchema).array(),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutAgencyUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutAgencyUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyUnitPersonCreateManyAgencyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitUncheckedCreateNestedManyWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUncheckedCreateNestedManyWithoutAgencyUnitInput> = z.object({
  create: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutAgencyUnitInputSchema).array(),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInitiatorAgencyUnitCreateManyAgencyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentTakerAgencyUnitUncheckedCreateNestedManyWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUncheckedCreateNestedManyWithoutAgencyUnitInput> = z.object({
  create: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateWithoutAgencyUnitInputSchema).array(),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentTakerAgencyUnitCreateManyAgencyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const AgencyUnitPersonUpdateManyWithoutAgencyUnitNestedInputSchema: z.ZodType<Prisma.AgencyUnitPersonUpdateManyWithoutAgencyUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitPersonCreateWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonCreateWithoutAgencyUnitInputSchema).array(),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutAgencyUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutAgencyUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AgencyUnitPersonUpsertWithWhereUniqueWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUpsertWithWhereUniqueWithoutAgencyUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyUnitPersonCreateManyAgencyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AgencyUnitPersonUpdateWithWhereUniqueWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUpdateWithWhereUniqueWithoutAgencyUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AgencyUnitPersonUpdateManyWithWhereWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUpdateManyWithWhereWithoutAgencyUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AgencyUnitPersonScalarWhereInputSchema),z.lazy(() => AgencyUnitPersonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitUpdateManyWithoutAgencyUnitNestedInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpdateManyWithoutAgencyUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutAgencyUnitInputSchema).array(),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpsertWithWhereUniqueWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUpsertWithWhereUniqueWithoutAgencyUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInitiatorAgencyUnitCreateManyAgencyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateWithWhereUniqueWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUpdateWithWhereUniqueWithoutAgencyUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithWhereWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithWhereWithoutAgencyUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema),z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentTakerAgencyUnitUpdateManyWithoutAgencyUnitNestedInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpdateManyWithoutAgencyUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateWithoutAgencyUnitInputSchema).array(),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentTakerAgencyUnitUpsertWithWhereUniqueWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUpsertWithWhereUniqueWithoutAgencyUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentTakerAgencyUnitCreateManyAgencyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateWithWhereUniqueWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUpdateWithWhereUniqueWithoutAgencyUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateManyWithWhereWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUpdateManyWithWhereWithoutAgencyUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema),z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const AgencyUnitPersonUncheckedUpdateManyWithoutAgencyUnitNestedInputSchema: z.ZodType<Prisma.AgencyUnitPersonUncheckedUpdateManyWithoutAgencyUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitPersonCreateWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonCreateWithoutAgencyUnitInputSchema).array(),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutAgencyUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutAgencyUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AgencyUnitPersonUpsertWithWhereUniqueWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUpsertWithWhereUniqueWithoutAgencyUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyUnitPersonCreateManyAgencyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AgencyUnitPersonUpdateWithWhereUniqueWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUpdateWithWhereUniqueWithoutAgencyUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AgencyUnitPersonUpdateManyWithWhereWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUpdateManyWithWhereWithoutAgencyUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AgencyUnitPersonScalarWhereInputSchema),z.lazy(() => AgencyUnitPersonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutAgencyUnitNestedInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutAgencyUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutAgencyUnitInputSchema).array(),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpsertWithWhereUniqueWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUpsertWithWhereUniqueWithoutAgencyUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInitiatorAgencyUnitCreateManyAgencyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateWithWhereUniqueWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUpdateWithWhereUniqueWithoutAgencyUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithWhereWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithWhereWithoutAgencyUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema),z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentTakerAgencyUnitUncheckedUpdateManyWithoutAgencyUnitNestedInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUncheckedUpdateManyWithoutAgencyUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateWithoutAgencyUnitInputSchema).array(),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentTakerAgencyUnitUpsertWithWhereUniqueWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUpsertWithWhereUniqueWithoutAgencyUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentTakerAgencyUnitCreateManyAgencyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateWithWhereUniqueWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUpdateWithWhereUniqueWithoutAgencyUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateManyWithWhereWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUpdateManyWithWhereWithoutAgencyUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema),z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AgencyUnitCreateNestedOneWithoutTakerPatentsInputSchema: z.ZodType<Prisma.AgencyUnitCreateNestedOneWithoutTakerPatentsInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitCreateWithoutTakerPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedCreateWithoutTakerPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyUnitCreateOrConnectWithoutTakerPatentsInputSchema).optional(),
  connect: z.lazy(() => AgencyUnitWhereUniqueInputSchema).optional()
}).strict();

export const PatentInternalCreateNestedOneWithoutTakerAgenciesInputSchema: z.ZodType<Prisma.PatentInternalCreateNestedOneWithoutTakerAgenciesInput> = z.object({
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutTakerAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutTakerAgenciesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentInternalCreateOrConnectWithoutTakerAgenciesInputSchema).optional(),
  connect: z.lazy(() => PatentInternalWhereUniqueInputSchema).optional()
}).strict();

export const AgencyUnitUpdateOneRequiredWithoutTakerPatentsNestedInputSchema: z.ZodType<Prisma.AgencyUnitUpdateOneRequiredWithoutTakerPatentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitCreateWithoutTakerPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedCreateWithoutTakerPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyUnitCreateOrConnectWithoutTakerPatentsInputSchema).optional(),
  upsert: z.lazy(() => AgencyUnitUpsertWithoutTakerPatentsInputSchema).optional(),
  connect: z.lazy(() => AgencyUnitWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AgencyUnitUpdateToOneWithWhereWithoutTakerPatentsInputSchema),z.lazy(() => AgencyUnitUpdateWithoutTakerPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedUpdateWithoutTakerPatentsInputSchema) ]).optional(),
}).strict();

export const PatentInternalUpdateOneRequiredWithoutTakerAgenciesNestedInputSchema: z.ZodType<Prisma.PatentInternalUpdateOneRequiredWithoutTakerAgenciesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutTakerAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutTakerAgenciesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentInternalCreateOrConnectWithoutTakerAgenciesInputSchema).optional(),
  upsert: z.lazy(() => PatentInternalUpsertWithoutTakerAgenciesInputSchema).optional(),
  connect: z.lazy(() => PatentInternalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentInternalUpdateToOneWithWhereWithoutTakerAgenciesInputSchema),z.lazy(() => PatentInternalUpdateWithoutTakerAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedUpdateWithoutTakerAgenciesInputSchema) ]).optional(),
}).strict();

export const AgencyUnitCreateNestedOneWithoutInitialReviewPatentsInputSchema: z.ZodType<Prisma.AgencyUnitCreateNestedOneWithoutInitialReviewPatentsInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitCreateWithoutInitialReviewPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedCreateWithoutInitialReviewPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyUnitCreateOrConnectWithoutInitialReviewPatentsInputSchema).optional(),
  connect: z.lazy(() => AgencyUnitWhereUniqueInputSchema).optional()
}).strict();

export const PatentInternalCreateNestedOneWithoutInitialReviewAgenciesInputSchema: z.ZodType<Prisma.PatentInternalCreateNestedOneWithoutInitialReviewAgenciesInput> = z.object({
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutInitialReviewAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutInitialReviewAgenciesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentInternalCreateOrConnectWithoutInitialReviewAgenciesInputSchema).optional(),
  connect: z.lazy(() => PatentInternalWhereUniqueInputSchema).optional()
}).strict();

export const AgencyUnitUpdateOneRequiredWithoutInitialReviewPatentsNestedInputSchema: z.ZodType<Prisma.AgencyUnitUpdateOneRequiredWithoutInitialReviewPatentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitCreateWithoutInitialReviewPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedCreateWithoutInitialReviewPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyUnitCreateOrConnectWithoutInitialReviewPatentsInputSchema).optional(),
  upsert: z.lazy(() => AgencyUnitUpsertWithoutInitialReviewPatentsInputSchema).optional(),
  connect: z.lazy(() => AgencyUnitWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AgencyUnitUpdateToOneWithWhereWithoutInitialReviewPatentsInputSchema),z.lazy(() => AgencyUnitUpdateWithoutInitialReviewPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedUpdateWithoutInitialReviewPatentsInputSchema) ]).optional(),
}).strict();

export const PatentInternalUpdateOneRequiredWithoutInitialReviewAgenciesNestedInputSchema: z.ZodType<Prisma.PatentInternalUpdateOneRequiredWithoutInitialReviewAgenciesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutInitialReviewAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutInitialReviewAgenciesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentInternalCreateOrConnectWithoutInitialReviewAgenciesInputSchema).optional(),
  upsert: z.lazy(() => PatentInternalUpsertWithoutInitialReviewAgenciesInputSchema).optional(),
  connect: z.lazy(() => PatentInternalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentInternalUpdateToOneWithWhereWithoutInitialReviewAgenciesInputSchema),z.lazy(() => PatentInternalUpdateWithoutInitialReviewAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedUpdateWithoutInitialReviewAgenciesInputSchema) ]).optional(),
}).strict();

export const AgencyUnitCreateNestedOneWithoutPersonsInputSchema: z.ZodType<Prisma.AgencyUnitCreateNestedOneWithoutPersonsInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitCreateWithoutPersonsInputSchema),z.lazy(() => AgencyUnitUncheckedCreateWithoutPersonsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyUnitCreateOrConnectWithoutPersonsInputSchema).optional(),
  connect: z.lazy(() => AgencyUnitWhereUniqueInputSchema).optional()
}).strict();

export const ContactInfoCreateNestedOneWithoutAgencyUnitPersonInputSchema: z.ZodType<Prisma.ContactInfoCreateNestedOneWithoutAgencyUnitPersonInput> = z.object({
  create: z.union([ z.lazy(() => ContactInfoCreateWithoutAgencyUnitPersonInputSchema),z.lazy(() => ContactInfoUncheckedCreateWithoutAgencyUnitPersonInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContactInfoCreateOrConnectWithoutAgencyUnitPersonInputSchema).optional(),
  connect: z.lazy(() => ContactInfoWhereUniqueInputSchema).optional()
}).strict();

export const AgencyUnitUpdateOneRequiredWithoutPersonsNestedInputSchema: z.ZodType<Prisma.AgencyUnitUpdateOneRequiredWithoutPersonsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitCreateWithoutPersonsInputSchema),z.lazy(() => AgencyUnitUncheckedCreateWithoutPersonsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AgencyUnitCreateOrConnectWithoutPersonsInputSchema).optional(),
  upsert: z.lazy(() => AgencyUnitUpsertWithoutPersonsInputSchema).optional(),
  connect: z.lazy(() => AgencyUnitWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AgencyUnitUpdateToOneWithWhereWithoutPersonsInputSchema),z.lazy(() => AgencyUnitUpdateWithoutPersonsInputSchema),z.lazy(() => AgencyUnitUncheckedUpdateWithoutPersonsInputSchema) ]).optional(),
}).strict();

export const ContactInfoUpdateOneRequiredWithoutAgencyUnitPersonNestedInputSchema: z.ZodType<Prisma.ContactInfoUpdateOneRequiredWithoutAgencyUnitPersonNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactInfoCreateWithoutAgencyUnitPersonInputSchema),z.lazy(() => ContactInfoUncheckedCreateWithoutAgencyUnitPersonInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContactInfoCreateOrConnectWithoutAgencyUnitPersonInputSchema).optional(),
  upsert: z.lazy(() => ContactInfoUpsertWithoutAgencyUnitPersonInputSchema).optional(),
  connect: z.lazy(() => ContactInfoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ContactInfoUpdateToOneWithWhereWithoutAgencyUnitPersonInputSchema),z.lazy(() => ContactInfoUpdateWithoutAgencyUnitPersonInputSchema),z.lazy(() => ContactInfoUncheckedUpdateWithoutAgencyUnitPersonInputSchema) ]).optional(),
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

export const PatentFundingUnitCreateNestedManyWithoutFundingUnitInputSchema: z.ZodType<Prisma.PatentFundingUnitCreateNestedManyWithoutFundingUnitInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingUnitCreateWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitCreateWithoutFundingUnitInputSchema).array(),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutFundingUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingUnitCreateOrConnectWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitCreateOrConnectWithoutFundingUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingUnitCreateManyFundingUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FundingRecordCreateNestedManyWithoutCanFundingByInputSchema: z.ZodType<Prisma.FundingRecordCreateNestedManyWithoutCanFundingByInput> = z.object({
  create: z.union([ z.lazy(() => FundingRecordCreateWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordCreateWithoutCanFundingByInputSchema).array(),z.lazy(() => FundingRecordUncheckedCreateWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUncheckedCreateWithoutCanFundingByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundingRecordCreateOrConnectWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordCreateOrConnectWithoutCanFundingByInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentFundingUnitUncheckedCreateNestedManyWithoutFundingUnitInputSchema: z.ZodType<Prisma.PatentFundingUnitUncheckedCreateNestedManyWithoutFundingUnitInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingUnitCreateWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitCreateWithoutFundingUnitInputSchema).array(),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutFundingUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingUnitCreateOrConnectWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitCreateOrConnectWithoutFundingUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingUnitCreateManyFundingUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FundingRecordUncheckedCreateNestedManyWithoutCanFundingByInputSchema: z.ZodType<Prisma.FundingRecordUncheckedCreateNestedManyWithoutCanFundingByInput> = z.object({
  create: z.union([ z.lazy(() => FundingRecordCreateWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordCreateWithoutCanFundingByInputSchema).array(),z.lazy(() => FundingRecordUncheckedCreateWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUncheckedCreateWithoutCanFundingByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundingRecordCreateOrConnectWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordCreateOrConnectWithoutCanFundingByInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentFundingUnitUpdateManyWithoutFundingUnitNestedInputSchema: z.ZodType<Prisma.PatentFundingUnitUpdateManyWithoutFundingUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingUnitCreateWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitCreateWithoutFundingUnitInputSchema).array(),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutFundingUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingUnitCreateOrConnectWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitCreateOrConnectWithoutFundingUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentFundingUnitUpsertWithWhereUniqueWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUpsertWithWhereUniqueWithoutFundingUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingUnitCreateManyFundingUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentFundingUnitUpdateWithWhereUniqueWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUpdateWithWhereUniqueWithoutFundingUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentFundingUnitUpdateManyWithWhereWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUpdateManyWithWhereWithoutFundingUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentFundingUnitScalarWhereInputSchema),z.lazy(() => PatentFundingUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FundingRecordUpdateManyWithoutCanFundingByNestedInputSchema: z.ZodType<Prisma.FundingRecordUpdateManyWithoutCanFundingByNestedInput> = z.object({
  create: z.union([ z.lazy(() => FundingRecordCreateWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordCreateWithoutCanFundingByInputSchema).array(),z.lazy(() => FundingRecordUncheckedCreateWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUncheckedCreateWithoutCanFundingByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundingRecordCreateOrConnectWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordCreateOrConnectWithoutCanFundingByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FundingRecordUpsertWithWhereUniqueWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUpsertWithWhereUniqueWithoutCanFundingByInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FundingRecordUpdateWithWhereUniqueWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUpdateWithWhereUniqueWithoutCanFundingByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FundingRecordUpdateManyWithWhereWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUpdateManyWithWhereWithoutCanFundingByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FundingRecordScalarWhereInputSchema),z.lazy(() => FundingRecordScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentFundingUnitUncheckedUpdateManyWithoutFundingUnitNestedInputSchema: z.ZodType<Prisma.PatentFundingUnitUncheckedUpdateManyWithoutFundingUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingUnitCreateWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitCreateWithoutFundingUnitInputSchema).array(),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutFundingUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingUnitCreateOrConnectWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitCreateOrConnectWithoutFundingUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentFundingUnitUpsertWithWhereUniqueWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUpsertWithWhereUniqueWithoutFundingUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingUnitCreateManyFundingUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentFundingUnitUpdateWithWhereUniqueWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUpdateWithWhereUniqueWithoutFundingUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentFundingUnitUpdateManyWithWhereWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUpdateManyWithWhereWithoutFundingUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentFundingUnitScalarWhereInputSchema),z.lazy(() => PatentFundingUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FundingRecordUncheckedUpdateManyWithoutCanFundingByNestedInputSchema: z.ZodType<Prisma.FundingRecordUncheckedUpdateManyWithoutCanFundingByNestedInput> = z.object({
  create: z.union([ z.lazy(() => FundingRecordCreateWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordCreateWithoutCanFundingByInputSchema).array(),z.lazy(() => FundingRecordUncheckedCreateWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUncheckedCreateWithoutCanFundingByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundingRecordCreateOrConnectWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordCreateOrConnectWithoutCanFundingByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FundingRecordUpsertWithWhereUniqueWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUpsertWithWhereUniqueWithoutCanFundingByInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FundingRecordUpdateWithWhereUniqueWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUpdateWithWhereUniqueWithoutCanFundingByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FundingRecordUpdateManyWithWhereWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUpdateManyWithWhereWithoutCanFundingByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FundingRecordScalarWhereInputSchema),z.lazy(() => FundingRecordScalarWhereInputSchema).array() ]).optional(),
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

export const FundingRecordCreateNestedManyWithoutPatentFundingInputSchema: z.ZodType<Prisma.FundingRecordCreateNestedManyWithoutPatentFundingInput> = z.object({
  create: z.union([ z.lazy(() => FundingRecordCreateWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordCreateWithoutPatentFundingInputSchema).array(),z.lazy(() => FundingRecordUncheckedCreateWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUncheckedCreateWithoutPatentFundingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundingRecordCreateOrConnectWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordCreateOrConnectWithoutPatentFundingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FundingRecordCreateManyPatentFundingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentFundingUnitCreateNestedManyWithoutPatentFundingInputSchema: z.ZodType<Prisma.PatentFundingUnitCreateNestedManyWithoutPatentFundingInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingUnitCreateWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitCreateWithoutPatentFundingInputSchema).array(),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutPatentFundingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingUnitCreateOrConnectWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitCreateOrConnectWithoutPatentFundingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingUnitCreateManyPatentFundingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FundingRecordUncheckedCreateNestedManyWithoutPatentFundingInputSchema: z.ZodType<Prisma.FundingRecordUncheckedCreateNestedManyWithoutPatentFundingInput> = z.object({
  create: z.union([ z.lazy(() => FundingRecordCreateWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordCreateWithoutPatentFundingInputSchema).array(),z.lazy(() => FundingRecordUncheckedCreateWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUncheckedCreateWithoutPatentFundingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundingRecordCreateOrConnectWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordCreateOrConnectWithoutPatentFundingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FundingRecordCreateManyPatentFundingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentFundingUnitUncheckedCreateNestedManyWithoutPatentFundingInputSchema: z.ZodType<Prisma.PatentFundingUnitUncheckedCreateNestedManyWithoutPatentFundingInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingUnitCreateWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitCreateWithoutPatentFundingInputSchema).array(),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutPatentFundingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingUnitCreateOrConnectWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitCreateOrConnectWithoutPatentFundingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingUnitCreateManyPatentFundingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
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

export const FundingRecordUpdateManyWithoutPatentFundingNestedInputSchema: z.ZodType<Prisma.FundingRecordUpdateManyWithoutPatentFundingNestedInput> = z.object({
  create: z.union([ z.lazy(() => FundingRecordCreateWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordCreateWithoutPatentFundingInputSchema).array(),z.lazy(() => FundingRecordUncheckedCreateWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUncheckedCreateWithoutPatentFundingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundingRecordCreateOrConnectWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordCreateOrConnectWithoutPatentFundingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FundingRecordUpsertWithWhereUniqueWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUpsertWithWhereUniqueWithoutPatentFundingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FundingRecordCreateManyPatentFundingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FundingRecordUpdateWithWhereUniqueWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUpdateWithWhereUniqueWithoutPatentFundingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FundingRecordUpdateManyWithWhereWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUpdateManyWithWhereWithoutPatentFundingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FundingRecordScalarWhereInputSchema),z.lazy(() => FundingRecordScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentFundingUnitUpdateManyWithoutPatentFundingNestedInputSchema: z.ZodType<Prisma.PatentFundingUnitUpdateManyWithoutPatentFundingNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingUnitCreateWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitCreateWithoutPatentFundingInputSchema).array(),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutPatentFundingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingUnitCreateOrConnectWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitCreateOrConnectWithoutPatentFundingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentFundingUnitUpsertWithWhereUniqueWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUpsertWithWhereUniqueWithoutPatentFundingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingUnitCreateManyPatentFundingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentFundingUnitUpdateWithWhereUniqueWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUpdateWithWhereUniqueWithoutPatentFundingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentFundingUnitUpdateManyWithWhereWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUpdateManyWithWhereWithoutPatentFundingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentFundingUnitScalarWhereInputSchema),z.lazy(() => PatentFundingUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FundingRecordUncheckedUpdateManyWithoutPatentFundingNestedInputSchema: z.ZodType<Prisma.FundingRecordUncheckedUpdateManyWithoutPatentFundingNestedInput> = z.object({
  create: z.union([ z.lazy(() => FundingRecordCreateWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordCreateWithoutPatentFundingInputSchema).array(),z.lazy(() => FundingRecordUncheckedCreateWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUncheckedCreateWithoutPatentFundingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundingRecordCreateOrConnectWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordCreateOrConnectWithoutPatentFundingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FundingRecordUpsertWithWhereUniqueWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUpsertWithWhereUniqueWithoutPatentFundingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FundingRecordCreateManyPatentFundingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundingRecordWhereUniqueInputSchema),z.lazy(() => FundingRecordWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FundingRecordUpdateWithWhereUniqueWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUpdateWithWhereUniqueWithoutPatentFundingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FundingRecordUpdateManyWithWhereWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUpdateManyWithWhereWithoutPatentFundingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FundingRecordScalarWhereInputSchema),z.lazy(() => FundingRecordScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentFundingUnitUncheckedUpdateManyWithoutPatentFundingNestedInputSchema: z.ZodType<Prisma.PatentFundingUnitUncheckedUpdateManyWithoutPatentFundingNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingUnitCreateWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitCreateWithoutPatentFundingInputSchema).array(),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutPatentFundingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentFundingUnitCreateOrConnectWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitCreateOrConnectWithoutPatentFundingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentFundingUnitUpsertWithWhereUniqueWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUpsertWithWhereUniqueWithoutPatentFundingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentFundingUnitCreateManyPatentFundingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),z.lazy(() => PatentFundingUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentFundingUnitUpdateWithWhereUniqueWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUpdateWithWhereUniqueWithoutPatentFundingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentFundingUnitUpdateManyWithWhereWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUpdateManyWithWhereWithoutPatentFundingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentFundingUnitScalarWhereInputSchema),z.lazy(() => PatentFundingUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentFundingCreateNestedOneWithoutFundingRecordsInputSchema: z.ZodType<Prisma.PatentFundingCreateNestedOneWithoutFundingRecordsInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutFundingRecordsInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutFundingRecordsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentFundingCreateOrConnectWithoutFundingRecordsInputSchema).optional(),
  connect: z.lazy(() => PatentFundingWhereUniqueInputSchema).optional()
}).strict();

export const FundingUnitCreateNestedManyWithoutFundingRecordInputSchema: z.ZodType<Prisma.FundingUnitCreateNestedManyWithoutFundingRecordInput> = z.object({
  create: z.union([ z.lazy(() => FundingUnitCreateWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitCreateWithoutFundingRecordInputSchema).array(),z.lazy(() => FundingUnitUncheckedCreateWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUncheckedCreateWithoutFundingRecordInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundingUnitCreateOrConnectWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitCreateOrConnectWithoutFundingRecordInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundingUnitWhereUniqueInputSchema),z.lazy(() => FundingUnitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FundingUnitUncheckedCreateNestedManyWithoutFundingRecordInputSchema: z.ZodType<Prisma.FundingUnitUncheckedCreateNestedManyWithoutFundingRecordInput> = z.object({
  create: z.union([ z.lazy(() => FundingUnitCreateWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitCreateWithoutFundingRecordInputSchema).array(),z.lazy(() => FundingUnitUncheckedCreateWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUncheckedCreateWithoutFundingRecordInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundingUnitCreateOrConnectWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitCreateOrConnectWithoutFundingRecordInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundingUnitWhereUniqueInputSchema),z.lazy(() => FundingUnitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const PatentFundingUpdateOneRequiredWithoutFundingRecordsNestedInputSchema: z.ZodType<Prisma.PatentFundingUpdateOneRequiredWithoutFundingRecordsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutFundingRecordsInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutFundingRecordsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentFundingCreateOrConnectWithoutFundingRecordsInputSchema).optional(),
  upsert: z.lazy(() => PatentFundingUpsertWithoutFundingRecordsInputSchema).optional(),
  connect: z.lazy(() => PatentFundingWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentFundingUpdateToOneWithWhereWithoutFundingRecordsInputSchema),z.lazy(() => PatentFundingUpdateWithoutFundingRecordsInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutFundingRecordsInputSchema) ]).optional(),
}).strict();

export const FundingUnitUpdateManyWithoutFundingRecordNestedInputSchema: z.ZodType<Prisma.FundingUnitUpdateManyWithoutFundingRecordNestedInput> = z.object({
  create: z.union([ z.lazy(() => FundingUnitCreateWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitCreateWithoutFundingRecordInputSchema).array(),z.lazy(() => FundingUnitUncheckedCreateWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUncheckedCreateWithoutFundingRecordInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundingUnitCreateOrConnectWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitCreateOrConnectWithoutFundingRecordInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FundingUnitUpsertWithWhereUniqueWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUpsertWithWhereUniqueWithoutFundingRecordInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => FundingUnitWhereUniqueInputSchema),z.lazy(() => FundingUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FundingUnitWhereUniqueInputSchema),z.lazy(() => FundingUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FundingUnitWhereUniqueInputSchema),z.lazy(() => FundingUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundingUnitWhereUniqueInputSchema),z.lazy(() => FundingUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FundingUnitUpdateWithWhereUniqueWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUpdateWithWhereUniqueWithoutFundingRecordInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FundingUnitUpdateManyWithWhereWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUpdateManyWithWhereWithoutFundingRecordInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FundingUnitScalarWhereInputSchema),z.lazy(() => FundingUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FundingUnitUncheckedUpdateManyWithoutFundingRecordNestedInputSchema: z.ZodType<Prisma.FundingUnitUncheckedUpdateManyWithoutFundingRecordNestedInput> = z.object({
  create: z.union([ z.lazy(() => FundingUnitCreateWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitCreateWithoutFundingRecordInputSchema).array(),z.lazy(() => FundingUnitUncheckedCreateWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUncheckedCreateWithoutFundingRecordInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundingUnitCreateOrConnectWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitCreateOrConnectWithoutFundingRecordInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FundingUnitUpsertWithWhereUniqueWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUpsertWithWhereUniqueWithoutFundingRecordInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => FundingUnitWhereUniqueInputSchema),z.lazy(() => FundingUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FundingUnitWhereUniqueInputSchema),z.lazy(() => FundingUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FundingUnitWhereUniqueInputSchema),z.lazy(() => FundingUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundingUnitWhereUniqueInputSchema),z.lazy(() => FundingUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FundingUnitUpdateWithWhereUniqueWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUpdateWithWhereUniqueWithoutFundingRecordInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FundingUnitUpdateManyWithWhereWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUpdateManyWithWhereWithoutFundingRecordInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FundingUnitScalarWhereInputSchema),z.lazy(() => FundingUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FundingUnitCreateNestedOneWithoutPatentFundingUnitInputSchema: z.ZodType<Prisma.FundingUnitCreateNestedOneWithoutPatentFundingUnitInput> = z.object({
  create: z.union([ z.lazy(() => FundingUnitCreateWithoutPatentFundingUnitInputSchema),z.lazy(() => FundingUnitUncheckedCreateWithoutPatentFundingUnitInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FundingUnitCreateOrConnectWithoutPatentFundingUnitInputSchema).optional(),
  connect: z.lazy(() => FundingUnitWhereUniqueInputSchema).optional()
}).strict();

export const PatentFundingCreateNestedOneWithoutPatentFundingUnitsInputSchema: z.ZodType<Prisma.PatentFundingCreateNestedOneWithoutPatentFundingUnitsInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentFundingUnitsInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentFundingUnitsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentFundingCreateOrConnectWithoutPatentFundingUnitsInputSchema).optional(),
  connect: z.lazy(() => PatentFundingWhereUniqueInputSchema).optional()
}).strict();

export const FundingUnitUpdateOneRequiredWithoutPatentFundingUnitNestedInputSchema: z.ZodType<Prisma.FundingUnitUpdateOneRequiredWithoutPatentFundingUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => FundingUnitCreateWithoutPatentFundingUnitInputSchema),z.lazy(() => FundingUnitUncheckedCreateWithoutPatentFundingUnitInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FundingUnitCreateOrConnectWithoutPatentFundingUnitInputSchema).optional(),
  upsert: z.lazy(() => FundingUnitUpsertWithoutPatentFundingUnitInputSchema).optional(),
  connect: z.lazy(() => FundingUnitWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FundingUnitUpdateToOneWithWhereWithoutPatentFundingUnitInputSchema),z.lazy(() => FundingUnitUpdateWithoutPatentFundingUnitInputSchema),z.lazy(() => FundingUnitUncheckedUpdateWithoutPatentFundingUnitInputSchema) ]).optional(),
}).strict();

export const PatentFundingUpdateOneRequiredWithoutPatentFundingUnitsNestedInputSchema: z.ZodType<Prisma.PatentFundingUpdateOneRequiredWithoutPatentFundingUnitsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentFundingUnitsInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentFundingUnitsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentFundingCreateOrConnectWithoutPatentFundingUnitsInputSchema).optional(),
  upsert: z.lazy(() => PatentFundingUpsertWithoutPatentFundingUnitsInputSchema).optional(),
  connect: z.lazy(() => PatentFundingWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentFundingUpdateToOneWithWhereWithoutPatentFundingUnitsInputSchema),z.lazy(() => PatentFundingUpdateWithoutPatentFundingUnitsInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutPatentFundingUnitsInputSchema) ]).optional(),
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

export const ContactInfoUpdateOneRequiredWithoutInventorNestedInputSchema: z.ZodType<Prisma.ContactInfoUpdateOneRequiredWithoutInventorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactInfoCreateWithoutInventorInputSchema),z.lazy(() => ContactInfoUncheckedCreateWithoutInventorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContactInfoCreateOrConnectWithoutInventorInputSchema).optional(),
  upsert: z.lazy(() => ContactInfoUpsertWithoutInventorInputSchema).optional(),
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

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const CountryCreateNestedOneWithoutPatentsInputSchema: z.ZodType<Prisma.CountryCreateNestedOneWithoutPatentsInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutPatentsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutPatentsInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional()
}).strict();

export const DepartmentCreateNestedOneWithoutPatentsInputSchema: z.ZodType<Prisma.DepartmentCreateNestedOneWithoutPatentsInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutPatentsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutPatentsInputSchema).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional()
}).strict();

export const PatentInventorCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentInventorCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInventorCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentInventorCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInventorCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentApplicationDataCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentApplicationDataCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).optional()
}).strict();

export const PatentFundingCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentFundingCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentFundingWhereUniqueInputSchema).optional()
}).strict();

export const PatentManualStatusCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentManualStatusCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentManualStatusCreateWithoutPatentInputSchema),z.lazy(() => PatentManualStatusCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentManualStatusUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentManualStatusCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentManualStatusCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentManualStatusCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentManualStatusWhereUniqueInputSchema),z.lazy(() => PatentManualStatusWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentMaintenanceCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentMaintenanceCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentMaintenanceCreateWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentMaintenanceUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentMaintenanceCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentMaintenanceCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentMaintenanceWhereUniqueInputSchema),z.lazy(() => PatentMaintenanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).optional()
}).strict();

export const PatentInternalCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentInternalCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutPatentInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentInternalCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentInternalWhereUniqueInputSchema).optional()
}).strict();

export const PatentExternalCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentExternalCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentExternalCreateWithoutPatentInputSchema),z.lazy(() => PatentExternalUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentExternalCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentExternalWhereUniqueInputSchema).optional()
}).strict();

export const PatentRecordCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentRecordCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentRecordCreateWithoutPatentInputSchema),z.lazy(() => PatentRecordCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentRecordUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentRecordUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentRecordCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentRecordCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentRecordCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentRecordWhereUniqueInputSchema),z.lazy(() => PatentRecordWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentInventorUncheckedCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentInventorCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentInventorUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInventorCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentInventorCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInventorCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentInventorWhereUniqueInputSchema),z.lazy(() => PatentInventorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentApplicationDataCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).optional()
}).strict();

export const PatentFundingUncheckedCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUncheckedCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentFundingCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentFundingWhereUniqueInputSchema).optional()
}).strict();

export const PatentManualStatusUncheckedCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentManualStatusUncheckedCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentManualStatusCreateWithoutPatentInputSchema),z.lazy(() => PatentManualStatusCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentManualStatusUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentManualStatusCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentManualStatusCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentManualStatusCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentManualStatusWhereUniqueInputSchema),z.lazy(() => PatentManualStatusWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentMaintenanceUncheckedCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentMaintenanceUncheckedCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentMaintenanceCreateWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentMaintenanceUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentMaintenanceCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentMaintenanceCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentMaintenanceWhereUniqueInputSchema),z.lazy(() => PatentMaintenanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentTechnicalAttributesCreateWithoutPatentInputSchema),z.lazy(() => PatentTechnicalAttributesUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentTechnicalAttributesCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentTechnicalAttributesWhereUniqueInputSchema).optional()
}).strict();

export const PatentInternalUncheckedCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentInternalUncheckedCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutPatentInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentInternalCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentInternalWhereUniqueInputSchema).optional()
}).strict();

export const PatentExternalUncheckedCreateNestedOneWithoutPatentInputSchema: z.ZodType<Prisma.PatentExternalUncheckedCreateNestedOneWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentExternalCreateWithoutPatentInputSchema),z.lazy(() => PatentExternalUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentExternalCreateOrConnectWithoutPatentInputSchema).optional(),
  connect: z.lazy(() => PatentExternalWhereUniqueInputSchema).optional()
}).strict();

export const PatentRecordUncheckedCreateNestedManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentRecordUncheckedCreateNestedManyWithoutPatentInput> = z.object({
  create: z.union([ z.lazy(() => PatentRecordCreateWithoutPatentInputSchema),z.lazy(() => PatentRecordCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentRecordUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentRecordUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentRecordCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentRecordCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentRecordCreateManyPatentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentRecordWhereUniqueInputSchema),z.lazy(() => PatentRecordWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumEnumPatentTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EnumPatentTypeSchema).optional().nullable()
}).strict();

export const CountryUpdateOneWithoutPatentsNestedInputSchema: z.ZodType<Prisma.CountryUpdateOneWithoutPatentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutPatentsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutPatentsInputSchema).optional(),
  upsert: z.lazy(() => CountryUpsertWithoutPatentsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CountryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CountryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CountryUpdateToOneWithWhereWithoutPatentsInputSchema),z.lazy(() => CountryUpdateWithoutPatentsInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutPatentsInputSchema) ]).optional(),
}).strict();

export const DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema: z.ZodType<Prisma.DepartmentUpdateOneRequiredWithoutPatentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutPatentsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutPatentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutPatentsInputSchema).optional(),
  upsert: z.lazy(() => DepartmentUpsertWithoutPatentsInputSchema).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DepartmentUpdateToOneWithWhereWithoutPatentsInputSchema),z.lazy(() => DepartmentUpdateWithoutPatentsInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutPatentsInputSchema) ]).optional(),
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

export const PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentApplicationDataUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentApplicationDataCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentApplicationDataUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentApplicationDataWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentApplicationDataWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentApplicationDataUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUpdateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const PatentFundingUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentFundingUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentFundingCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentFundingUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentFundingWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentFundingWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentFundingWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentFundingUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentFundingUpdateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const PatentManualStatusUpdateManyWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentManualStatusUpdateManyWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentManualStatusCreateWithoutPatentInputSchema),z.lazy(() => PatentManualStatusCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentManualStatusUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentManualStatusCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentManualStatusCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentManualStatusUpsertWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUpsertWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentManualStatusCreateManyPatentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentManualStatusWhereUniqueInputSchema),z.lazy(() => PatentManualStatusWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentManualStatusWhereUniqueInputSchema),z.lazy(() => PatentManualStatusWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentManualStatusWhereUniqueInputSchema),z.lazy(() => PatentManualStatusWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentManualStatusWhereUniqueInputSchema),z.lazy(() => PatentManualStatusWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentManualStatusUpdateWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUpdateWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentManualStatusUpdateManyWithWhereWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUpdateManyWithWhereWithoutPatentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentManualStatusScalarWhereInputSchema),z.lazy(() => PatentManualStatusScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentMaintenanceUpdateManyWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentMaintenanceUpdateManyWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentMaintenanceCreateWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentMaintenanceUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentMaintenanceCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentMaintenanceUpsertWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUpsertWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentMaintenanceCreateManyPatentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentMaintenanceWhereUniqueInputSchema),z.lazy(() => PatentMaintenanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentMaintenanceWhereUniqueInputSchema),z.lazy(() => PatentMaintenanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentMaintenanceWhereUniqueInputSchema),z.lazy(() => PatentMaintenanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentMaintenanceWhereUniqueInputSchema),z.lazy(() => PatentMaintenanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentMaintenanceUpdateWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUpdateWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentMaintenanceUpdateManyWithWhereWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUpdateManyWithWhereWithoutPatentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentMaintenanceScalarWhereInputSchema),z.lazy(() => PatentMaintenanceScalarWhereInputSchema).array() ]).optional(),
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

export const PatentInternalUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentInternalUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutPatentInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentInternalCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentInternalUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentInternalWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentInternalWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentInternalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentInternalUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentInternalUpdateWithoutPatentInputSchema),z.lazy(() => PatentInternalUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const PatentExternalUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentExternalUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentExternalCreateWithoutPatentInputSchema),z.lazy(() => PatentExternalUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentExternalCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentExternalUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentExternalWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentExternalWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentExternalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentExternalUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentExternalUpdateWithoutPatentInputSchema),z.lazy(() => PatentExternalUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const PatentRecordUpdateManyWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentRecordUpdateManyWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentRecordCreateWithoutPatentInputSchema),z.lazy(() => PatentRecordCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentRecordUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentRecordUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentRecordCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentRecordCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentRecordUpsertWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentRecordUpsertWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentRecordCreateManyPatentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentRecordWhereUniqueInputSchema),z.lazy(() => PatentRecordWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentRecordWhereUniqueInputSchema),z.lazy(() => PatentRecordWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentRecordWhereUniqueInputSchema),z.lazy(() => PatentRecordWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentRecordWhereUniqueInputSchema),z.lazy(() => PatentRecordWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentRecordUpdateWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentRecordUpdateWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentRecordUpdateManyWithWhereWithoutPatentInputSchema),z.lazy(() => PatentRecordUpdateManyWithWhereWithoutPatentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentRecordScalarWhereInputSchema),z.lazy(() => PatentRecordScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
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

export const PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentApplicationDataCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentApplicationDataUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentApplicationDataWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentApplicationDataWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentApplicationDataWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentApplicationDataUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUpdateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const PatentFundingUncheckedUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentFundingCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentFundingUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentFundingWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentFundingWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentFundingWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentFundingUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentFundingUpdateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const PatentManualStatusUncheckedUpdateManyWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentManualStatusUncheckedUpdateManyWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentManualStatusCreateWithoutPatentInputSchema),z.lazy(() => PatentManualStatusCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentManualStatusUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentManualStatusCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentManualStatusCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentManualStatusUpsertWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUpsertWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentManualStatusCreateManyPatentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentManualStatusWhereUniqueInputSchema),z.lazy(() => PatentManualStatusWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentManualStatusWhereUniqueInputSchema),z.lazy(() => PatentManualStatusWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentManualStatusWhereUniqueInputSchema),z.lazy(() => PatentManualStatusWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentManualStatusWhereUniqueInputSchema),z.lazy(() => PatentManualStatusWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentManualStatusUpdateWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUpdateWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentManualStatusUpdateManyWithWhereWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUpdateManyWithWhereWithoutPatentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentManualStatusScalarWhereInputSchema),z.lazy(() => PatentManualStatusScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentMaintenanceUncheckedUpdateManyWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentMaintenanceUncheckedUpdateManyWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentMaintenanceCreateWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentMaintenanceUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentMaintenanceCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentMaintenanceUpsertWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUpsertWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentMaintenanceCreateManyPatentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentMaintenanceWhereUniqueInputSchema),z.lazy(() => PatentMaintenanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentMaintenanceWhereUniqueInputSchema),z.lazy(() => PatentMaintenanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentMaintenanceWhereUniqueInputSchema),z.lazy(() => PatentMaintenanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentMaintenanceWhereUniqueInputSchema),z.lazy(() => PatentMaintenanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentMaintenanceUpdateWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUpdateWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentMaintenanceUpdateManyWithWhereWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUpdateManyWithWhereWithoutPatentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentMaintenanceScalarWhereInputSchema),z.lazy(() => PatentMaintenanceScalarWhereInputSchema).array() ]).optional(),
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

export const PatentInternalUncheckedUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentInternalUncheckedUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutPatentInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentInternalCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentInternalUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentInternalWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentInternalWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentInternalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentInternalUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentInternalUpdateWithoutPatentInputSchema),z.lazy(() => PatentInternalUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const PatentExternalUncheckedUpdateOneWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentExternalUncheckedUpdateOneWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentExternalCreateWithoutPatentInputSchema),z.lazy(() => PatentExternalUncheckedCreateWithoutPatentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentExternalCreateOrConnectWithoutPatentInputSchema).optional(),
  upsert: z.lazy(() => PatentExternalUpsertWithoutPatentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatentExternalWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatentExternalWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatentExternalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentExternalUpdateToOneWithWhereWithoutPatentInputSchema),z.lazy(() => PatentExternalUpdateWithoutPatentInputSchema),z.lazy(() => PatentExternalUncheckedUpdateWithoutPatentInputSchema) ]).optional(),
}).strict();

export const PatentRecordUncheckedUpdateManyWithoutPatentNestedInputSchema: z.ZodType<Prisma.PatentRecordUncheckedUpdateManyWithoutPatentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentRecordCreateWithoutPatentInputSchema),z.lazy(() => PatentRecordCreateWithoutPatentInputSchema).array(),z.lazy(() => PatentRecordUncheckedCreateWithoutPatentInputSchema),z.lazy(() => PatentRecordUncheckedCreateWithoutPatentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentRecordCreateOrConnectWithoutPatentInputSchema),z.lazy(() => PatentRecordCreateOrConnectWithoutPatentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentRecordUpsertWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentRecordUpsertWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentRecordCreateManyPatentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentRecordWhereUniqueInputSchema),z.lazy(() => PatentRecordWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentRecordWhereUniqueInputSchema),z.lazy(() => PatentRecordWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentRecordWhereUniqueInputSchema),z.lazy(() => PatentRecordWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentRecordWhereUniqueInputSchema),z.lazy(() => PatentRecordWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentRecordUpdateWithWhereUniqueWithoutPatentInputSchema),z.lazy(() => PatentRecordUpdateWithWhereUniqueWithoutPatentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentRecordUpdateManyWithWhereWithoutPatentInputSchema),z.lazy(() => PatentRecordUpdateManyWithWhereWithoutPatentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentRecordScalarWhereInputSchema),z.lazy(() => PatentRecordScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentCreateNestedOneWithoutApplicationInputSchema: z.ZodType<Prisma.PatentCreateNestedOneWithoutApplicationInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutApplicationInputSchema),z.lazy(() => PatentUncheckedCreateWithoutApplicationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutApplicationInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
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

export const PatentInitiatorAgencyUnitCreateNestedManyWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateNestedManyWithoutPatentInternalInput> = z.object({
  create: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutPatentInternalInputSchema).array(),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInitiatorAgencyUnitCreateManyPatentInternalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentTakerAgencyUnitCreateNestedManyWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateNestedManyWithoutPatentInternalInput> = z.object({
  create: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateWithoutPatentInternalInputSchema).array(),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentTakerAgencyUnitCreateManyPatentInternalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentCreateNestedOneWithoutInternalInputSchema: z.ZodType<Prisma.PatentCreateNestedOneWithoutInternalInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutInternalInputSchema),z.lazy(() => PatentUncheckedCreateWithoutInternalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutInternalInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitUncheckedCreateNestedManyWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUncheckedCreateNestedManyWithoutPatentInternalInput> = z.object({
  create: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutPatentInternalInputSchema).array(),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInitiatorAgencyUnitCreateManyPatentInternalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentTakerAgencyUnitUncheckedCreateNestedManyWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUncheckedCreateNestedManyWithoutPatentInternalInput> = z.object({
  create: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateWithoutPatentInternalInputSchema).array(),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentTakerAgencyUnitCreateManyPatentInternalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitUpdateManyWithoutPatentInternalNestedInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpdateManyWithoutPatentInternalNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutPatentInternalInputSchema).array(),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpsertWithWhereUniqueWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUpsertWithWhereUniqueWithoutPatentInternalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInitiatorAgencyUnitCreateManyPatentInternalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateWithWhereUniqueWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUpdateWithWhereUniqueWithoutPatentInternalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithWhereWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithWhereWithoutPatentInternalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema),z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentTakerAgencyUnitUpdateManyWithoutPatentInternalNestedInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpdateManyWithoutPatentInternalNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateWithoutPatentInternalInputSchema).array(),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentTakerAgencyUnitUpsertWithWhereUniqueWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUpsertWithWhereUniqueWithoutPatentInternalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentTakerAgencyUnitCreateManyPatentInternalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateWithWhereUniqueWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUpdateWithWhereUniqueWithoutPatentInternalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateManyWithWhereWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUpdateManyWithWhereWithoutPatentInternalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema),z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentUpdateOneRequiredWithoutInternalNestedInputSchema: z.ZodType<Prisma.PatentUpdateOneRequiredWithoutInternalNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutInternalInputSchema),z.lazy(() => PatentUncheckedCreateWithoutInternalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutInternalInputSchema).optional(),
  upsert: z.lazy(() => PatentUpsertWithoutInternalInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentUpdateToOneWithWhereWithoutInternalInputSchema),z.lazy(() => PatentUpdateWithoutInternalInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutInternalInputSchema) ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutPatentInternalNestedInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutPatentInternalNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutPatentInternalInputSchema).array(),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpsertWithWhereUniqueWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUpsertWithWhereUniqueWithoutPatentInternalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentInitiatorAgencyUnitCreateManyPatentInternalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateWithWhereUniqueWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUpdateWithWhereUniqueWithoutPatentInternalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithWhereWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithWhereWithoutPatentInternalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema),z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentTakerAgencyUnitUncheckedUpdateManyWithoutPatentInternalNestedInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUncheckedUpdateManyWithoutPatentInternalNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateWithoutPatentInternalInputSchema).array(),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentTakerAgencyUnitUpsertWithWhereUniqueWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUpsertWithWhereUniqueWithoutPatentInternalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentTakerAgencyUnitCreateManyPatentInternalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateWithWhereUniqueWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUpdateWithWhereUniqueWithoutPatentInternalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateManyWithWhereWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUpdateManyWithWhereWithoutPatentInternalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema),z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentCreateNestedOneWithoutExternalInputSchema: z.ZodType<Prisma.PatentCreateNestedOneWithoutExternalInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutExternalInputSchema),z.lazy(() => PatentUncheckedCreateWithoutExternalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutExternalInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional()
}).strict();

export const PatentUpdateOneRequiredWithoutExternalNestedInputSchema: z.ZodType<Prisma.PatentUpdateOneRequiredWithoutExternalNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutExternalInputSchema),z.lazy(() => PatentUncheckedCreateWithoutExternalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutExternalInputSchema).optional(),
  upsert: z.lazy(() => PatentUpsertWithoutExternalInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentUpdateToOneWithWhereWithoutExternalInputSchema),z.lazy(() => PatentUpdateWithoutExternalInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutExternalInputSchema) ]).optional(),
}).strict();

export const PatentCreateNestedOneWithoutManualStatusInputSchema: z.ZodType<Prisma.PatentCreateNestedOneWithoutManualStatusInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutManualStatusInputSchema),z.lazy(() => PatentUncheckedCreateWithoutManualStatusInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutManualStatusInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional()
}).strict();

export const PatentUpdateOneRequiredWithoutManualStatusNestedInputSchema: z.ZodType<Prisma.PatentUpdateOneRequiredWithoutManualStatusNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutManualStatusInputSchema),z.lazy(() => PatentUncheckedCreateWithoutManualStatusInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutManualStatusInputSchema).optional(),
  upsert: z.lazy(() => PatentUpsertWithoutManualStatusInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentUpdateToOneWithWhereWithoutManualStatusInputSchema),z.lazy(() => PatentUpdateWithoutManualStatusInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutManualStatusInputSchema) ]).optional(),
}).strict();

export const PatentCreateNestedOneWithoutMaintenancesInputSchema: z.ZodType<Prisma.PatentCreateNestedOneWithoutMaintenancesInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutMaintenancesInputSchema),z.lazy(() => PatentUncheckedCreateWithoutMaintenancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutMaintenancesInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional()
}).strict();

export const PatentUpdateOneRequiredWithoutMaintenancesNestedInputSchema: z.ZodType<Prisma.PatentUpdateOneRequiredWithoutMaintenancesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutMaintenancesInputSchema),z.lazy(() => PatentUncheckedCreateWithoutMaintenancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutMaintenancesInputSchema).optional(),
  upsert: z.lazy(() => PatentUpsertWithoutMaintenancesInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentUpdateToOneWithWhereWithoutMaintenancesInputSchema),z.lazy(() => PatentUpdateWithoutMaintenancesInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutMaintenancesInputSchema) ]).optional(),
}).strict();

export const PatentCreateNestedOneWithoutPatentRecordsInputSchema: z.ZodType<Prisma.PatentCreateNestedOneWithoutPatentRecordsInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutPatentRecordsInputSchema),z.lazy(() => PatentUncheckedCreateWithoutPatentRecordsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutPatentRecordsInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional()
}).strict();

export const PatentUpdateOneRequiredWithoutPatentRecordsNestedInputSchema: z.ZodType<Prisma.PatentUpdateOneRequiredWithoutPatentRecordsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutPatentRecordsInputSchema),z.lazy(() => PatentUncheckedCreateWithoutPatentRecordsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatentCreateOrConnectWithoutPatentRecordsInputSchema).optional(),
  upsert: z.lazy(() => PatentUpsertWithoutPatentRecordsInputSchema).optional(),
  connect: z.lazy(() => PatentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatentUpdateToOneWithWhereWithoutPatentRecordsInputSchema),z.lazy(() => PatentUpdateWithoutPatentRecordsInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutPatentRecordsInputSchema) ]).optional(),
}).strict();

export const DepartmentCreateNestedManyWithoutCollegeInputSchema: z.ZodType<Prisma.DepartmentCreateNestedManyWithoutCollegeInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentCreateWithoutCollegeInputSchema).array(),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentCreateOrConnectWithoutCollegeInputSchema),z.lazy(() => DepartmentCreateOrConnectWithoutCollegeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentCreateManyCollegeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DepartmentWhereUniqueInputSchema),z.lazy(() => DepartmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DepartmentUncheckedCreateNestedManyWithoutCollegeInputSchema: z.ZodType<Prisma.DepartmentUncheckedCreateNestedManyWithoutCollegeInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentCreateWithoutCollegeInputSchema).array(),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutCollegeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DepartmentCreateOrConnectWithoutCollegeInputSchema),z.lazy(() => DepartmentCreateOrConnectWithoutCollegeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DepartmentCreateManyCollegeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DepartmentWhereUniqueInputSchema),z.lazy(() => DepartmentWhereUniqueInputSchema).array() ]).optional(),
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

export const PatentCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.PatentCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutCountryInputSchema),z.lazy(() => PatentCreateWithoutCountryInputSchema).array(),z.lazy(() => PatentUncheckedCreateWithoutCountryInputSchema),z.lazy(() => PatentUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentCreateOrConnectWithoutCountryInputSchema),z.lazy(() => PatentCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentUncheckedCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.PatentUncheckedCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutCountryInputSchema),z.lazy(() => PatentCreateWithoutCountryInputSchema).array(),z.lazy(() => PatentUncheckedCreateWithoutCountryInputSchema),z.lazy(() => PatentUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentCreateOrConnectWithoutCountryInputSchema),z.lazy(() => PatentCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatentUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.PatentUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutCountryInputSchema),z.lazy(() => PatentCreateWithoutCountryInputSchema).array(),z.lazy(() => PatentUncheckedCreateWithoutCountryInputSchema),z.lazy(() => PatentUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentCreateOrConnectWithoutCountryInputSchema),z.lazy(() => PatentCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => PatentUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => PatentUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => PatentUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentScalarWhereInputSchema),z.lazy(() => PatentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatentUncheckedUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatentCreateWithoutCountryInputSchema),z.lazy(() => PatentCreateWithoutCountryInputSchema).array(),z.lazy(() => PatentUncheckedCreateWithoutCountryInputSchema),z.lazy(() => PatentUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatentCreateOrConnectWithoutCountryInputSchema),z.lazy(() => PatentCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatentUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => PatentUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatentCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatentWhereUniqueInputSchema),z.lazy(() => PatentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatentUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => PatentUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatentUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => PatentUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatentScalarWhereInputSchema),z.lazy(() => PatentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AgencyUnitPersonCreateNestedManyWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyUnitPersonCreateNestedManyWithoutContactInfoInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitPersonCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonCreateWithoutContactInfoInputSchema).array(),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutContactInfoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutContactInfoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyUnitPersonCreateManyContactInfoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InventorCreateNestedManyWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorCreateNestedManyWithoutContactInfoInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutContactInfoInputSchema),z.lazy(() => InventorCreateWithoutContactInfoInputSchema).array(),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InventorCreateOrConnectWithoutContactInfoInputSchema),z.lazy(() => InventorCreateOrConnectWithoutContactInfoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InventorCreateManyContactInfoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AgencyUnitPersonUncheckedCreateNestedManyWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyUnitPersonUncheckedCreateNestedManyWithoutContactInfoInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitPersonCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonCreateWithoutContactInfoInputSchema).array(),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutContactInfoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutContactInfoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyUnitPersonCreateManyContactInfoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InventorUncheckedCreateNestedManyWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUncheckedCreateNestedManyWithoutContactInfoInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutContactInfoInputSchema),z.lazy(() => InventorCreateWithoutContactInfoInputSchema).array(),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InventorCreateOrConnectWithoutContactInfoInputSchema),z.lazy(() => InventorCreateOrConnectWithoutContactInfoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InventorCreateManyContactInfoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AgencyUnitPersonUpdateManyWithoutContactInfoNestedInputSchema: z.ZodType<Prisma.AgencyUnitPersonUpdateManyWithoutContactInfoNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitPersonCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonCreateWithoutContactInfoInputSchema).array(),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutContactInfoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutContactInfoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AgencyUnitPersonUpsertWithWhereUniqueWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUpsertWithWhereUniqueWithoutContactInfoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyUnitPersonCreateManyContactInfoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AgencyUnitPersonUpdateWithWhereUniqueWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUpdateWithWhereUniqueWithoutContactInfoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AgencyUnitPersonUpdateManyWithWhereWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUpdateManyWithWhereWithoutContactInfoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AgencyUnitPersonScalarWhereInputSchema),z.lazy(() => AgencyUnitPersonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InventorUpdateManyWithoutContactInfoNestedInputSchema: z.ZodType<Prisma.InventorUpdateManyWithoutContactInfoNestedInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutContactInfoInputSchema),z.lazy(() => InventorCreateWithoutContactInfoInputSchema).array(),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InventorCreateOrConnectWithoutContactInfoInputSchema),z.lazy(() => InventorCreateOrConnectWithoutContactInfoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InventorUpsertWithWhereUniqueWithoutContactInfoInputSchema),z.lazy(() => InventorUpsertWithWhereUniqueWithoutContactInfoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InventorCreateManyContactInfoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InventorUpdateWithWhereUniqueWithoutContactInfoInputSchema),z.lazy(() => InventorUpdateWithWhereUniqueWithoutContactInfoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InventorUpdateManyWithWhereWithoutContactInfoInputSchema),z.lazy(() => InventorUpdateManyWithWhereWithoutContactInfoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InventorScalarWhereInputSchema),z.lazy(() => InventorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AgencyUnitPersonUncheckedUpdateManyWithoutContactInfoNestedInputSchema: z.ZodType<Prisma.AgencyUnitPersonUncheckedUpdateManyWithoutContactInfoNestedInput> = z.object({
  create: z.union([ z.lazy(() => AgencyUnitPersonCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonCreateWithoutContactInfoInputSchema).array(),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutContactInfoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonCreateOrConnectWithoutContactInfoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AgencyUnitPersonUpsertWithWhereUniqueWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUpsertWithWhereUniqueWithoutContactInfoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AgencyUnitPersonCreateManyContactInfoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AgencyUnitPersonUpdateWithWhereUniqueWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUpdateWithWhereUniqueWithoutContactInfoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AgencyUnitPersonUpdateManyWithWhereWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUpdateManyWithWhereWithoutContactInfoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AgencyUnitPersonScalarWhereInputSchema),z.lazy(() => AgencyUnitPersonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InventorUncheckedUpdateManyWithoutContactInfoNestedInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateManyWithoutContactInfoNestedInput> = z.object({
  create: z.union([ z.lazy(() => InventorCreateWithoutContactInfoInputSchema),z.lazy(() => InventorCreateWithoutContactInfoInputSchema).array(),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InventorCreateOrConnectWithoutContactInfoInputSchema),z.lazy(() => InventorCreateOrConnectWithoutContactInfoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InventorUpsertWithWhereUniqueWithoutContactInfoInputSchema),z.lazy(() => InventorUpsertWithWhereUniqueWithoutContactInfoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InventorCreateManyContactInfoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InventorWhereUniqueInputSchema),z.lazy(() => InventorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InventorUpdateWithWhereUniqueWithoutContactInfoInputSchema),z.lazy(() => InventorUpdateWithWhereUniqueWithoutContactInfoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InventorUpdateManyWithWhereWithoutContactInfoInputSchema),z.lazy(() => InventorUpdateManyWithWhereWithoutContactInfoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InventorScalarWhereInputSchema),z.lazy(() => InventorScalarWhereInputSchema).array() ]).optional(),
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

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
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

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumEnumPatentTypeNullableFilterSchema: z.ZodType<Prisma.NestedEnumEnumPatentTypeNullableFilter> = z.object({
  equals: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  in: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NestedEnumEnumPatentTypeNullableFilterSchema) ]).optional().nullable(),
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

export const NestedEnumEnumPatentTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEnumPatentTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  in: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => EnumPatentTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NestedEnumEnumPatentTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEnumPatentTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEnumPatentTypeNullableFilterSchema).optional()
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

export const AgencyUnitPersonCreateWithoutAgencyUnitInputSchema: z.ZodType<Prisma.AgencyUnitPersonCreateWithoutAgencyUnitInput> = z.object({
  contactInfo: z.lazy(() => ContactInfoCreateNestedOneWithoutAgencyUnitPersonInputSchema)
}).strict();

export const AgencyUnitPersonUncheckedCreateWithoutAgencyUnitInputSchema: z.ZodType<Prisma.AgencyUnitPersonUncheckedCreateWithoutAgencyUnitInput> = z.object({
  ContactInfoID: z.number().int()
}).strict();

export const AgencyUnitPersonCreateOrConnectWithoutAgencyUnitInputSchema: z.ZodType<Prisma.AgencyUnitPersonCreateOrConnectWithoutAgencyUnitInput> = z.object({
  where: z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AgencyUnitPersonCreateWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutAgencyUnitInputSchema) ]),
}).strict();

export const AgencyUnitPersonCreateManyAgencyUnitInputEnvelopeSchema: z.ZodType<Prisma.AgencyUnitPersonCreateManyAgencyUnitInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AgencyUnitPersonCreateManyAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonCreateManyAgencyUnitInputSchema).array() ]),
}).strict();

export const PatentInitiatorAgencyUnitCreateWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateWithoutAgencyUnitInput> = z.object({
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  patentInternal: z.lazy(() => PatentInternalCreateNestedOneWithoutInitialReviewAgenciesInputSchema)
}).strict();

export const PatentInitiatorAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUncheckedCreateWithoutAgencyUnitInput> = z.object({
  PatentID: z.number().int(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateOrConnectWithoutAgencyUnitInput> = z.object({
  where: z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema) ]),
}).strict();

export const PatentInitiatorAgencyUnitCreateManyAgencyUnitInputEnvelopeSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateManyAgencyUnitInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateManyAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateManyAgencyUnitInputSchema).array() ]),
}).strict();

export const PatentTakerAgencyUnitCreateWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateWithoutAgencyUnitInput> = z.object({
  FileCode: z.string(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  patentInternal: z.lazy(() => PatentInternalCreateNestedOneWithoutTakerAgenciesInputSchema)
}).strict();

export const PatentTakerAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUncheckedCreateWithoutAgencyUnitInput> = z.object({
  PatentID: z.number().int(),
  FileCode: z.string(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentTakerAgencyUnitCreateOrConnectWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateOrConnectWithoutAgencyUnitInput> = z.object({
  where: z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema) ]),
}).strict();

export const PatentTakerAgencyUnitCreateManyAgencyUnitInputEnvelopeSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateManyAgencyUnitInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateManyAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateManyAgencyUnitInputSchema).array() ]),
}).strict();

export const AgencyUnitPersonUpsertWithWhereUniqueWithoutAgencyUnitInputSchema: z.ZodType<Prisma.AgencyUnitPersonUpsertWithWhereUniqueWithoutAgencyUnitInput> = z.object({
  where: z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AgencyUnitPersonUpdateWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUncheckedUpdateWithoutAgencyUnitInputSchema) ]),
  create: z.union([ z.lazy(() => AgencyUnitPersonCreateWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutAgencyUnitInputSchema) ]),
}).strict();

export const AgencyUnitPersonUpdateWithWhereUniqueWithoutAgencyUnitInputSchema: z.ZodType<Prisma.AgencyUnitPersonUpdateWithWhereUniqueWithoutAgencyUnitInput> = z.object({
  where: z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AgencyUnitPersonUpdateWithoutAgencyUnitInputSchema),z.lazy(() => AgencyUnitPersonUncheckedUpdateWithoutAgencyUnitInputSchema) ]),
}).strict();

export const AgencyUnitPersonUpdateManyWithWhereWithoutAgencyUnitInputSchema: z.ZodType<Prisma.AgencyUnitPersonUpdateManyWithWhereWithoutAgencyUnitInput> = z.object({
  where: z.lazy(() => AgencyUnitPersonScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AgencyUnitPersonUpdateManyMutationInputSchema),z.lazy(() => AgencyUnitPersonUncheckedUpdateManyWithoutAgencyUnitInputSchema) ]),
}).strict();

export const AgencyUnitPersonScalarWhereInputSchema: z.ZodType<Prisma.AgencyUnitPersonScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AgencyUnitPersonScalarWhereInputSchema),z.lazy(() => AgencyUnitPersonScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AgencyUnitPersonScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AgencyUnitPersonScalarWhereInputSchema),z.lazy(() => AgencyUnitPersonScalarWhereInputSchema).array() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitUpsertWithWhereUniqueWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpsertWithWhereUniqueWithoutAgencyUnitInput> = z.object({
  where: z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedUpdateWithoutAgencyUnitInputSchema) ]),
  create: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema) ]),
}).strict();

export const PatentInitiatorAgencyUnitUpdateWithWhereUniqueWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpdateWithWhereUniqueWithoutAgencyUnitInput> = z.object({
  where: z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateWithoutAgencyUnitInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedUpdateWithoutAgencyUnitInputSchema) ]),
}).strict();

export const PatentInitiatorAgencyUnitUpdateManyWithWhereWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpdateManyWithWhereWithoutAgencyUnitInput> = z.object({
  where: z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateManyMutationInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutAgencyUnitInputSchema) ]),
}).strict();

export const PatentInitiatorAgencyUnitScalarWhereInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema),z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema),z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  agencyUnitPersonIds: z.lazy(() => JsonNullableFilterSchema).optional()
}).strict();

export const PatentTakerAgencyUnitUpsertWithWhereUniqueWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpsertWithWhereUniqueWithoutAgencyUnitInput> = z.object({
  where: z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedUpdateWithoutAgencyUnitInputSchema) ]),
  create: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutAgencyUnitInputSchema) ]),
}).strict();

export const PatentTakerAgencyUnitUpdateWithWhereUniqueWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpdateWithWhereUniqueWithoutAgencyUnitInput> = z.object({
  where: z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateWithoutAgencyUnitInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedUpdateWithoutAgencyUnitInputSchema) ]),
}).strict();

export const PatentTakerAgencyUnitUpdateManyWithWhereWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpdateManyWithWhereWithoutAgencyUnitInput> = z.object({
  where: z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateManyMutationInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedUpdateManyWithoutAgencyUnitInputSchema) ]),
}).strict();

export const PatentTakerAgencyUnitScalarWhereInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema),z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema),z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  AgencyUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  FileCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  agencyUnitPersonIds: z.lazy(() => JsonNullableFilterSchema).optional()
}).strict();

export const AgencyUnitCreateWithoutTakerPatentsInputSchema: z.ZodType<Prisma.AgencyUnitCreateWithoutTakerPatentsInput> = z.object({
  Name: z.string(),
  Description: z.string().optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonCreateNestedManyWithoutAgencyUnitInputSchema).optional(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitCreateNestedManyWithoutAgencyUnitInputSchema).optional()
}).strict();

export const AgencyUnitUncheckedCreateWithoutTakerPatentsInputSchema: z.ZodType<Prisma.AgencyUnitUncheckedCreateWithoutTakerPatentsInput> = z.object({
  AgencyUnitID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonUncheckedCreateNestedManyWithoutAgencyUnitInputSchema).optional(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateNestedManyWithoutAgencyUnitInputSchema).optional()
}).strict();

export const AgencyUnitCreateOrConnectWithoutTakerPatentsInputSchema: z.ZodType<Prisma.AgencyUnitCreateOrConnectWithoutTakerPatentsInput> = z.object({
  where: z.lazy(() => AgencyUnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AgencyUnitCreateWithoutTakerPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedCreateWithoutTakerPatentsInputSchema) ]),
}).strict();

export const PatentInternalCreateWithoutTakerAgenciesInputSchema: z.ZodType<Prisma.PatentInternalCreateWithoutTakerAgenciesInput> = z.object({
  InternalID: z.string(),
  InitialReviewDate: z.coerce.date().optional().nullable(),
  InitialReviewNumber: z.number().int().optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitCreateNestedManyWithoutPatentInternalInputSchema).optional(),
  Patent: z.lazy(() => PatentCreateNestedOneWithoutInternalInputSchema)
}).strict();

export const PatentInternalUncheckedCreateWithoutTakerAgenciesInputSchema: z.ZodType<Prisma.PatentInternalUncheckedCreateWithoutTakerAgenciesInput> = z.object({
  PatentID: z.number().int(),
  InternalID: z.string(),
  InitialReviewDate: z.coerce.date().optional().nullable(),
  InitialReviewNumber: z.number().int().optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateNestedManyWithoutPatentInternalInputSchema).optional()
}).strict();

export const PatentInternalCreateOrConnectWithoutTakerAgenciesInputSchema: z.ZodType<Prisma.PatentInternalCreateOrConnectWithoutTakerAgenciesInput> = z.object({
  where: z.lazy(() => PatentInternalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutTakerAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutTakerAgenciesInputSchema) ]),
}).strict();

export const AgencyUnitUpsertWithoutTakerPatentsInputSchema: z.ZodType<Prisma.AgencyUnitUpsertWithoutTakerPatentsInput> = z.object({
  update: z.union([ z.lazy(() => AgencyUnitUpdateWithoutTakerPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedUpdateWithoutTakerPatentsInputSchema) ]),
  create: z.union([ z.lazy(() => AgencyUnitCreateWithoutTakerPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedCreateWithoutTakerPatentsInputSchema) ]),
  where: z.lazy(() => AgencyUnitWhereInputSchema).optional()
}).strict();

export const AgencyUnitUpdateToOneWithWhereWithoutTakerPatentsInputSchema: z.ZodType<Prisma.AgencyUnitUpdateToOneWithWhereWithoutTakerPatentsInput> = z.object({
  where: z.lazy(() => AgencyUnitWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AgencyUnitUpdateWithoutTakerPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedUpdateWithoutTakerPatentsInputSchema) ]),
}).strict();

export const AgencyUnitUpdateWithoutTakerPatentsInputSchema: z.ZodType<Prisma.AgencyUnitUpdateWithoutTakerPatentsInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonUpdateManyWithoutAgencyUnitNestedInputSchema).optional(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithoutAgencyUnitNestedInputSchema).optional()
}).strict();

export const AgencyUnitUncheckedUpdateWithoutTakerPatentsInputSchema: z.ZodType<Prisma.AgencyUnitUncheckedUpdateWithoutTakerPatentsInput> = z.object({
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonUncheckedUpdateManyWithoutAgencyUnitNestedInputSchema).optional(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutAgencyUnitNestedInputSchema).optional()
}).strict();

export const PatentInternalUpsertWithoutTakerAgenciesInputSchema: z.ZodType<Prisma.PatentInternalUpsertWithoutTakerAgenciesInput> = z.object({
  update: z.union([ z.lazy(() => PatentInternalUpdateWithoutTakerAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedUpdateWithoutTakerAgenciesInputSchema) ]),
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutTakerAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutTakerAgenciesInputSchema) ]),
  where: z.lazy(() => PatentInternalWhereInputSchema).optional()
}).strict();

export const PatentInternalUpdateToOneWithWhereWithoutTakerAgenciesInputSchema: z.ZodType<Prisma.PatentInternalUpdateToOneWithWhereWithoutTakerAgenciesInput> = z.object({
  where: z.lazy(() => PatentInternalWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentInternalUpdateWithoutTakerAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedUpdateWithoutTakerAgenciesInputSchema) ]),
}).strict();

export const PatentInternalUpdateWithoutTakerAgenciesInputSchema: z.ZodType<Prisma.PatentInternalUpdateWithoutTakerAgenciesInput> = z.object({
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InitialReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithoutPatentInternalNestedInputSchema).optional(),
  Patent: z.lazy(() => PatentUpdateOneRequiredWithoutInternalNestedInputSchema).optional()
}).strict();

export const PatentInternalUncheckedUpdateWithoutTakerAgenciesInputSchema: z.ZodType<Prisma.PatentInternalUncheckedUpdateWithoutTakerAgenciesInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InitialReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutPatentInternalNestedInputSchema).optional()
}).strict();

export const AgencyUnitCreateWithoutInitialReviewPatentsInputSchema: z.ZodType<Prisma.AgencyUnitCreateWithoutInitialReviewPatentsInput> = z.object({
  Name: z.string(),
  Description: z.string().optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonCreateNestedManyWithoutAgencyUnitInputSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitCreateNestedManyWithoutAgencyUnitInputSchema).optional()
}).strict();

export const AgencyUnitUncheckedCreateWithoutInitialReviewPatentsInputSchema: z.ZodType<Prisma.AgencyUnitUncheckedCreateWithoutInitialReviewPatentsInput> = z.object({
  AgencyUnitID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonUncheckedCreateNestedManyWithoutAgencyUnitInputSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitUncheckedCreateNestedManyWithoutAgencyUnitInputSchema).optional()
}).strict();

export const AgencyUnitCreateOrConnectWithoutInitialReviewPatentsInputSchema: z.ZodType<Prisma.AgencyUnitCreateOrConnectWithoutInitialReviewPatentsInput> = z.object({
  where: z.lazy(() => AgencyUnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AgencyUnitCreateWithoutInitialReviewPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedCreateWithoutInitialReviewPatentsInputSchema) ]),
}).strict();

export const PatentInternalCreateWithoutInitialReviewAgenciesInputSchema: z.ZodType<Prisma.PatentInternalCreateWithoutInitialReviewAgenciesInput> = z.object({
  InternalID: z.string(),
  InitialReviewDate: z.coerce.date().optional().nullable(),
  InitialReviewNumber: z.number().int().optional().nullable(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitCreateNestedManyWithoutPatentInternalInputSchema).optional(),
  Patent: z.lazy(() => PatentCreateNestedOneWithoutInternalInputSchema)
}).strict();

export const PatentInternalUncheckedCreateWithoutInitialReviewAgenciesInputSchema: z.ZodType<Prisma.PatentInternalUncheckedCreateWithoutInitialReviewAgenciesInput> = z.object({
  PatentID: z.number().int(),
  InternalID: z.string(),
  InitialReviewDate: z.coerce.date().optional().nullable(),
  InitialReviewNumber: z.number().int().optional().nullable(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitUncheckedCreateNestedManyWithoutPatentInternalInputSchema).optional()
}).strict();

export const PatentInternalCreateOrConnectWithoutInitialReviewAgenciesInputSchema: z.ZodType<Prisma.PatentInternalCreateOrConnectWithoutInitialReviewAgenciesInput> = z.object({
  where: z.lazy(() => PatentInternalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutInitialReviewAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutInitialReviewAgenciesInputSchema) ]),
}).strict();

export const AgencyUnitUpsertWithoutInitialReviewPatentsInputSchema: z.ZodType<Prisma.AgencyUnitUpsertWithoutInitialReviewPatentsInput> = z.object({
  update: z.union([ z.lazy(() => AgencyUnitUpdateWithoutInitialReviewPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedUpdateWithoutInitialReviewPatentsInputSchema) ]),
  create: z.union([ z.lazy(() => AgencyUnitCreateWithoutInitialReviewPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedCreateWithoutInitialReviewPatentsInputSchema) ]),
  where: z.lazy(() => AgencyUnitWhereInputSchema).optional()
}).strict();

export const AgencyUnitUpdateToOneWithWhereWithoutInitialReviewPatentsInputSchema: z.ZodType<Prisma.AgencyUnitUpdateToOneWithWhereWithoutInitialReviewPatentsInput> = z.object({
  where: z.lazy(() => AgencyUnitWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AgencyUnitUpdateWithoutInitialReviewPatentsInputSchema),z.lazy(() => AgencyUnitUncheckedUpdateWithoutInitialReviewPatentsInputSchema) ]),
}).strict();

export const AgencyUnitUpdateWithoutInitialReviewPatentsInputSchema: z.ZodType<Prisma.AgencyUnitUpdateWithoutInitialReviewPatentsInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonUpdateManyWithoutAgencyUnitNestedInputSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitUpdateManyWithoutAgencyUnitNestedInputSchema).optional()
}).strict();

export const AgencyUnitUncheckedUpdateWithoutInitialReviewPatentsInputSchema: z.ZodType<Prisma.AgencyUnitUncheckedUpdateWithoutInitialReviewPatentsInput> = z.object({
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Persons: z.lazy(() => AgencyUnitPersonUncheckedUpdateManyWithoutAgencyUnitNestedInputSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitUncheckedUpdateManyWithoutAgencyUnitNestedInputSchema).optional()
}).strict();

export const PatentInternalUpsertWithoutInitialReviewAgenciesInputSchema: z.ZodType<Prisma.PatentInternalUpsertWithoutInitialReviewAgenciesInput> = z.object({
  update: z.union([ z.lazy(() => PatentInternalUpdateWithoutInitialReviewAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedUpdateWithoutInitialReviewAgenciesInputSchema) ]),
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutInitialReviewAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutInitialReviewAgenciesInputSchema) ]),
  where: z.lazy(() => PatentInternalWhereInputSchema).optional()
}).strict();

export const PatentInternalUpdateToOneWithWhereWithoutInitialReviewAgenciesInputSchema: z.ZodType<Prisma.PatentInternalUpdateToOneWithWhereWithoutInitialReviewAgenciesInput> = z.object({
  where: z.lazy(() => PatentInternalWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentInternalUpdateWithoutInitialReviewAgenciesInputSchema),z.lazy(() => PatentInternalUncheckedUpdateWithoutInitialReviewAgenciesInputSchema) ]),
}).strict();

export const PatentInternalUpdateWithoutInitialReviewAgenciesInputSchema: z.ZodType<Prisma.PatentInternalUpdateWithoutInitialReviewAgenciesInput> = z.object({
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InitialReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitUpdateManyWithoutPatentInternalNestedInputSchema).optional(),
  Patent: z.lazy(() => PatentUpdateOneRequiredWithoutInternalNestedInputSchema).optional()
}).strict();

export const PatentInternalUncheckedUpdateWithoutInitialReviewAgenciesInputSchema: z.ZodType<Prisma.PatentInternalUncheckedUpdateWithoutInitialReviewAgenciesInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InitialReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitUncheckedUpdateManyWithoutPatentInternalNestedInputSchema).optional()
}).strict();

export const AgencyUnitCreateWithoutPersonsInputSchema: z.ZodType<Prisma.AgencyUnitCreateWithoutPersonsInput> = z.object({
  Name: z.string(),
  Description: z.string().optional().nullable(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitCreateNestedManyWithoutAgencyUnitInputSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitCreateNestedManyWithoutAgencyUnitInputSchema).optional()
}).strict();

export const AgencyUnitUncheckedCreateWithoutPersonsInputSchema: z.ZodType<Prisma.AgencyUnitUncheckedCreateWithoutPersonsInput> = z.object({
  AgencyUnitID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateNestedManyWithoutAgencyUnitInputSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitUncheckedCreateNestedManyWithoutAgencyUnitInputSchema).optional()
}).strict();

export const AgencyUnitCreateOrConnectWithoutPersonsInputSchema: z.ZodType<Prisma.AgencyUnitCreateOrConnectWithoutPersonsInput> = z.object({
  where: z.lazy(() => AgencyUnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AgencyUnitCreateWithoutPersonsInputSchema),z.lazy(() => AgencyUnitUncheckedCreateWithoutPersonsInputSchema) ]),
}).strict();

export const ContactInfoCreateWithoutAgencyUnitPersonInputSchema: z.ZodType<Prisma.ContactInfoCreateWithoutAgencyUnitPersonInput> = z.object({
  Name: z.string(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Role: z.string().optional().nullable(),
  Note: z.string().optional().nullable(),
  Inventor: z.lazy(() => InventorCreateNestedManyWithoutContactInfoInputSchema).optional()
}).strict();

export const ContactInfoUncheckedCreateWithoutAgencyUnitPersonInputSchema: z.ZodType<Prisma.ContactInfoUncheckedCreateWithoutAgencyUnitPersonInput> = z.object({
  ContactInfoID: z.number().int().optional(),
  Name: z.string(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Role: z.string().optional().nullable(),
  Note: z.string().optional().nullable(),
  Inventor: z.lazy(() => InventorUncheckedCreateNestedManyWithoutContactInfoInputSchema).optional()
}).strict();

export const ContactInfoCreateOrConnectWithoutAgencyUnitPersonInputSchema: z.ZodType<Prisma.ContactInfoCreateOrConnectWithoutAgencyUnitPersonInput> = z.object({
  where: z.lazy(() => ContactInfoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContactInfoCreateWithoutAgencyUnitPersonInputSchema),z.lazy(() => ContactInfoUncheckedCreateWithoutAgencyUnitPersonInputSchema) ]),
}).strict();

export const AgencyUnitUpsertWithoutPersonsInputSchema: z.ZodType<Prisma.AgencyUnitUpsertWithoutPersonsInput> = z.object({
  update: z.union([ z.lazy(() => AgencyUnitUpdateWithoutPersonsInputSchema),z.lazy(() => AgencyUnitUncheckedUpdateWithoutPersonsInputSchema) ]),
  create: z.union([ z.lazy(() => AgencyUnitCreateWithoutPersonsInputSchema),z.lazy(() => AgencyUnitUncheckedCreateWithoutPersonsInputSchema) ]),
  where: z.lazy(() => AgencyUnitWhereInputSchema).optional()
}).strict();

export const AgencyUnitUpdateToOneWithWhereWithoutPersonsInputSchema: z.ZodType<Prisma.AgencyUnitUpdateToOneWithWhereWithoutPersonsInput> = z.object({
  where: z.lazy(() => AgencyUnitWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AgencyUnitUpdateWithoutPersonsInputSchema),z.lazy(() => AgencyUnitUncheckedUpdateWithoutPersonsInputSchema) ]),
}).strict();

export const AgencyUnitUpdateWithoutPersonsInputSchema: z.ZodType<Prisma.AgencyUnitUpdateWithoutPersonsInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithoutAgencyUnitNestedInputSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitUpdateManyWithoutAgencyUnitNestedInputSchema).optional()
}).strict();

export const AgencyUnitUncheckedUpdateWithoutPersonsInputSchema: z.ZodType<Prisma.AgencyUnitUncheckedUpdateWithoutPersonsInput> = z.object({
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewPatents: z.lazy(() => PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutAgencyUnitNestedInputSchema).optional(),
  TakerPatents: z.lazy(() => PatentTakerAgencyUnitUncheckedUpdateManyWithoutAgencyUnitNestedInputSchema).optional()
}).strict();

export const ContactInfoUpsertWithoutAgencyUnitPersonInputSchema: z.ZodType<Prisma.ContactInfoUpsertWithoutAgencyUnitPersonInput> = z.object({
  update: z.union([ z.lazy(() => ContactInfoUpdateWithoutAgencyUnitPersonInputSchema),z.lazy(() => ContactInfoUncheckedUpdateWithoutAgencyUnitPersonInputSchema) ]),
  create: z.union([ z.lazy(() => ContactInfoCreateWithoutAgencyUnitPersonInputSchema),z.lazy(() => ContactInfoUncheckedCreateWithoutAgencyUnitPersonInputSchema) ]),
  where: z.lazy(() => ContactInfoWhereInputSchema).optional()
}).strict();

export const ContactInfoUpdateToOneWithWhereWithoutAgencyUnitPersonInputSchema: z.ZodType<Prisma.ContactInfoUpdateToOneWithWhereWithoutAgencyUnitPersonInput> = z.object({
  where: z.lazy(() => ContactInfoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ContactInfoUpdateWithoutAgencyUnitPersonInputSchema),z.lazy(() => ContactInfoUncheckedUpdateWithoutAgencyUnitPersonInputSchema) ]),
}).strict();

export const ContactInfoUpdateWithoutAgencyUnitPersonInputSchema: z.ZodType<Prisma.ContactInfoUpdateWithoutAgencyUnitPersonInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Inventor: z.lazy(() => InventorUpdateManyWithoutContactInfoNestedInputSchema).optional()
}).strict();

export const ContactInfoUncheckedUpdateWithoutAgencyUnitPersonInputSchema: z.ZodType<Prisma.ContactInfoUncheckedUpdateWithoutAgencyUnitPersonInput> = z.object({
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Inventor: z.lazy(() => InventorUncheckedUpdateManyWithoutContactInfoNestedInputSchema).optional()
}).strict();

export const PatentFundingCreateWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingCreateWithoutPlanInput> = z.object({
  patent: z.lazy(() => PatentCreateNestedOneWithoutFundingInputSchema),
  fundingRecords: z.lazy(() => FundingRecordCreateNestedManyWithoutPatentFundingInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitCreateNestedManyWithoutPatentFundingInputSchema).optional()
}).strict();

export const PatentFundingUncheckedCreateWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingUncheckedCreateWithoutPlanInput> = z.object({
  PatentID: z.number().int(),
  fundingRecords: z.lazy(() => FundingRecordUncheckedCreateNestedManyWithoutPatentFundingInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitUncheckedCreateNestedManyWithoutPatentFundingInputSchema).optional()
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
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fundingPlanPlanID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const PatentFundingUnitCreateWithoutFundingUnitInputSchema: z.ZodType<Prisma.PatentFundingUnitCreateWithoutFundingUnitInput> = z.object({
  ProjectCode: z.string(),
  patentFunding: z.lazy(() => PatentFundingCreateNestedOneWithoutPatentFundingUnitsInputSchema)
}).strict();

export const PatentFundingUnitUncheckedCreateWithoutFundingUnitInputSchema: z.ZodType<Prisma.PatentFundingUnitUncheckedCreateWithoutFundingUnitInput> = z.object({
  PatentID: z.number().int(),
  ProjectCode: z.string()
}).strict();

export const PatentFundingUnitCreateOrConnectWithoutFundingUnitInputSchema: z.ZodType<Prisma.PatentFundingUnitCreateOrConnectWithoutFundingUnitInput> = z.object({
  where: z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentFundingUnitCreateWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutFundingUnitInputSchema) ]),
}).strict();

export const PatentFundingUnitCreateManyFundingUnitInputEnvelopeSchema: z.ZodType<Prisma.PatentFundingUnitCreateManyFundingUnitInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentFundingUnitCreateManyFundingUnitInputSchema),z.lazy(() => PatentFundingUnitCreateManyFundingUnitInputSchema).array() ]),
}).strict();

export const FundingRecordCreateWithoutCanFundingByInputSchema: z.ZodType<Prisma.FundingRecordCreateWithoutCanFundingByInput> = z.object({
  Amount: z.number(),
  patentFunding: z.lazy(() => PatentFundingCreateNestedOneWithoutFundingRecordsInputSchema)
}).strict();

export const FundingRecordUncheckedCreateWithoutCanFundingByInputSchema: z.ZodType<Prisma.FundingRecordUncheckedCreateWithoutCanFundingByInput> = z.object({
  FundingRecordID: z.number().int().optional(),
  PatentFundingPatentID: z.number().int(),
  Amount: z.number()
}).strict();

export const FundingRecordCreateOrConnectWithoutCanFundingByInputSchema: z.ZodType<Prisma.FundingRecordCreateOrConnectWithoutCanFundingByInput> = z.object({
  where: z.lazy(() => FundingRecordWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FundingRecordCreateWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUncheckedCreateWithoutCanFundingByInputSchema) ]),
}).strict();

export const PatentFundingUnitUpsertWithWhereUniqueWithoutFundingUnitInputSchema: z.ZodType<Prisma.PatentFundingUnitUpsertWithWhereUniqueWithoutFundingUnitInput> = z.object({
  where: z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentFundingUnitUpdateWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUncheckedUpdateWithoutFundingUnitInputSchema) ]),
  create: z.union([ z.lazy(() => PatentFundingUnitCreateWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutFundingUnitInputSchema) ]),
}).strict();

export const PatentFundingUnitUpdateWithWhereUniqueWithoutFundingUnitInputSchema: z.ZodType<Prisma.PatentFundingUnitUpdateWithWhereUniqueWithoutFundingUnitInput> = z.object({
  where: z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentFundingUnitUpdateWithoutFundingUnitInputSchema),z.lazy(() => PatentFundingUnitUncheckedUpdateWithoutFundingUnitInputSchema) ]),
}).strict();

export const PatentFundingUnitUpdateManyWithWhereWithoutFundingUnitInputSchema: z.ZodType<Prisma.PatentFundingUnitUpdateManyWithWhereWithoutFundingUnitInput> = z.object({
  where: z.lazy(() => PatentFundingUnitScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentFundingUnitUpdateManyMutationInputSchema),z.lazy(() => PatentFundingUnitUncheckedUpdateManyWithoutFundingUnitInputSchema) ]),
}).strict();

export const PatentFundingUnitScalarWhereInputSchema: z.ZodType<Prisma.PatentFundingUnitScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentFundingUnitScalarWhereInputSchema),z.lazy(() => PatentFundingUnitScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentFundingUnitScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentFundingUnitScalarWhereInputSchema),z.lazy(() => PatentFundingUnitScalarWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  FundingUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ProjectCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const FundingRecordUpsertWithWhereUniqueWithoutCanFundingByInputSchema: z.ZodType<Prisma.FundingRecordUpsertWithWhereUniqueWithoutCanFundingByInput> = z.object({
  where: z.lazy(() => FundingRecordWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FundingRecordUpdateWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUncheckedUpdateWithoutCanFundingByInputSchema) ]),
  create: z.union([ z.lazy(() => FundingRecordCreateWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUncheckedCreateWithoutCanFundingByInputSchema) ]),
}).strict();

export const FundingRecordUpdateWithWhereUniqueWithoutCanFundingByInputSchema: z.ZodType<Prisma.FundingRecordUpdateWithWhereUniqueWithoutCanFundingByInput> = z.object({
  where: z.lazy(() => FundingRecordWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FundingRecordUpdateWithoutCanFundingByInputSchema),z.lazy(() => FundingRecordUncheckedUpdateWithoutCanFundingByInputSchema) ]),
}).strict();

export const FundingRecordUpdateManyWithWhereWithoutCanFundingByInputSchema: z.ZodType<Prisma.FundingRecordUpdateManyWithWhereWithoutCanFundingByInput> = z.object({
  where: z.lazy(() => FundingRecordScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FundingRecordUpdateManyMutationInputSchema),z.lazy(() => FundingRecordUncheckedUpdateManyWithoutCanFundingByInputSchema) ]),
}).strict();

export const FundingRecordScalarWhereInputSchema: z.ZodType<Prisma.FundingRecordScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FundingRecordScalarWhereInputSchema),z.lazy(() => FundingRecordScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundingRecordScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundingRecordScalarWhereInputSchema),z.lazy(() => FundingRecordScalarWhereInputSchema).array() ]).optional(),
  FundingRecordID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  PatentFundingPatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict();

export const PatentCreateWithoutFundingInputSchema: z.ZodType<Prisma.PatentCreateWithoutFundingInput> = z.object({
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutPatentsInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutFundingInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutFundingInput> = z.object({
  PatentID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutFundingInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutFundingInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutFundingInputSchema),z.lazy(() => PatentUncheckedCreateWithoutFundingInputSchema) ]),
}).strict();

export const FundingPlanCreateWithoutFundingsInputSchema: z.ZodType<Prisma.FundingPlanCreateWithoutFundingsInput> = z.object({
  PlanType: z.number().int(),
  Name: z.string()
}).strict();

export const FundingPlanUncheckedCreateWithoutFundingsInputSchema: z.ZodType<Prisma.FundingPlanUncheckedCreateWithoutFundingsInput> = z.object({
  PlanID: z.number().int().optional(),
  PlanType: z.number().int(),
  Name: z.string()
}).strict();

export const FundingPlanCreateOrConnectWithoutFundingsInputSchema: z.ZodType<Prisma.FundingPlanCreateOrConnectWithoutFundingsInput> = z.object({
  where: z.lazy(() => FundingPlanWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FundingPlanCreateWithoutFundingsInputSchema),z.lazy(() => FundingPlanUncheckedCreateWithoutFundingsInputSchema) ]),
}).strict();

export const FundingRecordCreateWithoutPatentFundingInputSchema: z.ZodType<Prisma.FundingRecordCreateWithoutPatentFundingInput> = z.object({
  Amount: z.number(),
  canFundingBy: z.lazy(() => FundingUnitCreateNestedManyWithoutFundingRecordInputSchema).optional()
}).strict();

export const FundingRecordUncheckedCreateWithoutPatentFundingInputSchema: z.ZodType<Prisma.FundingRecordUncheckedCreateWithoutPatentFundingInput> = z.object({
  FundingRecordID: z.number().int().optional(),
  Amount: z.number(),
  canFundingBy: z.lazy(() => FundingUnitUncheckedCreateNestedManyWithoutFundingRecordInputSchema).optional()
}).strict();

export const FundingRecordCreateOrConnectWithoutPatentFundingInputSchema: z.ZodType<Prisma.FundingRecordCreateOrConnectWithoutPatentFundingInput> = z.object({
  where: z.lazy(() => FundingRecordWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FundingRecordCreateWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUncheckedCreateWithoutPatentFundingInputSchema) ]),
}).strict();

export const FundingRecordCreateManyPatentFundingInputEnvelopeSchema: z.ZodType<Prisma.FundingRecordCreateManyPatentFundingInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FundingRecordCreateManyPatentFundingInputSchema),z.lazy(() => FundingRecordCreateManyPatentFundingInputSchema).array() ]),
}).strict();

export const PatentFundingUnitCreateWithoutPatentFundingInputSchema: z.ZodType<Prisma.PatentFundingUnitCreateWithoutPatentFundingInput> = z.object({
  ProjectCode: z.string(),
  fundingUnit: z.lazy(() => FundingUnitCreateNestedOneWithoutPatentFundingUnitInputSchema)
}).strict();

export const PatentFundingUnitUncheckedCreateWithoutPatentFundingInputSchema: z.ZodType<Prisma.PatentFundingUnitUncheckedCreateWithoutPatentFundingInput> = z.object({
  FundingUnitID: z.number().int(),
  ProjectCode: z.string()
}).strict();

export const PatentFundingUnitCreateOrConnectWithoutPatentFundingInputSchema: z.ZodType<Prisma.PatentFundingUnitCreateOrConnectWithoutPatentFundingInput> = z.object({
  where: z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentFundingUnitCreateWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutPatentFundingInputSchema) ]),
}).strict();

export const PatentFundingUnitCreateManyPatentFundingInputEnvelopeSchema: z.ZodType<Prisma.PatentFundingUnitCreateManyPatentFundingInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentFundingUnitCreateManyPatentFundingInputSchema),z.lazy(() => PatentFundingUnitCreateManyPatentFundingInputSchema).array() ]),
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
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneWithoutPatentsNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutFundingInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutFundingInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedUpdateManyWithoutPatentNestedInputSchema).optional()
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
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingPlanUncheckedUpdateWithoutFundingsInputSchema: z.ZodType<Prisma.FundingPlanUncheckedUpdateWithoutFundingsInput> = z.object({
  PlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PlanType: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingRecordUpsertWithWhereUniqueWithoutPatentFundingInputSchema: z.ZodType<Prisma.FundingRecordUpsertWithWhereUniqueWithoutPatentFundingInput> = z.object({
  where: z.lazy(() => FundingRecordWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FundingRecordUpdateWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUncheckedUpdateWithoutPatentFundingInputSchema) ]),
  create: z.union([ z.lazy(() => FundingRecordCreateWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUncheckedCreateWithoutPatentFundingInputSchema) ]),
}).strict();

export const FundingRecordUpdateWithWhereUniqueWithoutPatentFundingInputSchema: z.ZodType<Prisma.FundingRecordUpdateWithWhereUniqueWithoutPatentFundingInput> = z.object({
  where: z.lazy(() => FundingRecordWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FundingRecordUpdateWithoutPatentFundingInputSchema),z.lazy(() => FundingRecordUncheckedUpdateWithoutPatentFundingInputSchema) ]),
}).strict();

export const FundingRecordUpdateManyWithWhereWithoutPatentFundingInputSchema: z.ZodType<Prisma.FundingRecordUpdateManyWithWhereWithoutPatentFundingInput> = z.object({
  where: z.lazy(() => FundingRecordScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FundingRecordUpdateManyMutationInputSchema),z.lazy(() => FundingRecordUncheckedUpdateManyWithoutPatentFundingInputSchema) ]),
}).strict();

export const PatentFundingUnitUpsertWithWhereUniqueWithoutPatentFundingInputSchema: z.ZodType<Prisma.PatentFundingUnitUpsertWithWhereUniqueWithoutPatentFundingInput> = z.object({
  where: z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentFundingUnitUpdateWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUncheckedUpdateWithoutPatentFundingInputSchema) ]),
  create: z.union([ z.lazy(() => PatentFundingUnitCreateWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUncheckedCreateWithoutPatentFundingInputSchema) ]),
}).strict();

export const PatentFundingUnitUpdateWithWhereUniqueWithoutPatentFundingInputSchema: z.ZodType<Prisma.PatentFundingUnitUpdateWithWhereUniqueWithoutPatentFundingInput> = z.object({
  where: z.lazy(() => PatentFundingUnitWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentFundingUnitUpdateWithoutPatentFundingInputSchema),z.lazy(() => PatentFundingUnitUncheckedUpdateWithoutPatentFundingInputSchema) ]),
}).strict();

export const PatentFundingUnitUpdateManyWithWhereWithoutPatentFundingInputSchema: z.ZodType<Prisma.PatentFundingUnitUpdateManyWithWhereWithoutPatentFundingInput> = z.object({
  where: z.lazy(() => PatentFundingUnitScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentFundingUnitUpdateManyMutationInputSchema),z.lazy(() => PatentFundingUnitUncheckedUpdateManyWithoutPatentFundingInputSchema) ]),
}).strict();

export const PatentFundingCreateWithoutFundingRecordsInputSchema: z.ZodType<Prisma.PatentFundingCreateWithoutFundingRecordsInput> = z.object({
  patent: z.lazy(() => PatentCreateNestedOneWithoutFundingInputSchema),
  plan: z.lazy(() => FundingPlanCreateNestedOneWithoutFundingsInputSchema),
  patentFundingUnits: z.lazy(() => PatentFundingUnitCreateNestedManyWithoutPatentFundingInputSchema).optional()
}).strict();

export const PatentFundingUncheckedCreateWithoutFundingRecordsInputSchema: z.ZodType<Prisma.PatentFundingUncheckedCreateWithoutFundingRecordsInput> = z.object({
  PatentID: z.number().int(),
  fundingPlanPlanID: z.number().int(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitUncheckedCreateNestedManyWithoutPatentFundingInputSchema).optional()
}).strict();

export const PatentFundingCreateOrConnectWithoutFundingRecordsInputSchema: z.ZodType<Prisma.PatentFundingCreateOrConnectWithoutFundingRecordsInput> = z.object({
  where: z.lazy(() => PatentFundingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutFundingRecordsInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutFundingRecordsInputSchema) ]),
}).strict();

export const FundingUnitCreateWithoutFundingRecordInputSchema: z.ZodType<Prisma.FundingUnitCreateWithoutFundingRecordInput> = z.object({
  Name: z.string(),
  PatentFundingUnit: z.lazy(() => PatentFundingUnitCreateNestedManyWithoutFundingUnitInputSchema).optional()
}).strict();

export const FundingUnitUncheckedCreateWithoutFundingRecordInputSchema: z.ZodType<Prisma.FundingUnitUncheckedCreateWithoutFundingRecordInput> = z.object({
  FundingUnitID: z.number().int().optional(),
  Name: z.string(),
  PatentFundingUnit: z.lazy(() => PatentFundingUnitUncheckedCreateNestedManyWithoutFundingUnitInputSchema).optional()
}).strict();

export const FundingUnitCreateOrConnectWithoutFundingRecordInputSchema: z.ZodType<Prisma.FundingUnitCreateOrConnectWithoutFundingRecordInput> = z.object({
  where: z.lazy(() => FundingUnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FundingUnitCreateWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUncheckedCreateWithoutFundingRecordInputSchema) ]),
}).strict();

export const PatentFundingUpsertWithoutFundingRecordsInputSchema: z.ZodType<Prisma.PatentFundingUpsertWithoutFundingRecordsInput> = z.object({
  update: z.union([ z.lazy(() => PatentFundingUpdateWithoutFundingRecordsInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutFundingRecordsInputSchema) ]),
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutFundingRecordsInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutFundingRecordsInputSchema) ]),
  where: z.lazy(() => PatentFundingWhereInputSchema).optional()
}).strict();

export const PatentFundingUpdateToOneWithWhereWithoutFundingRecordsInputSchema: z.ZodType<Prisma.PatentFundingUpdateToOneWithWhereWithoutFundingRecordsInput> = z.object({
  where: z.lazy(() => PatentFundingWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentFundingUpdateWithoutFundingRecordsInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutFundingRecordsInputSchema) ]),
}).strict();

export const PatentFundingUpdateWithoutFundingRecordsInputSchema: z.ZodType<Prisma.PatentFundingUpdateWithoutFundingRecordsInput> = z.object({
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutFundingNestedInputSchema).optional(),
  plan: z.lazy(() => FundingPlanUpdateOneRequiredWithoutFundingsNestedInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitUpdateManyWithoutPatentFundingNestedInputSchema).optional()
}).strict();

export const PatentFundingUncheckedUpdateWithoutFundingRecordsInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateWithoutFundingRecordsInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundingPlanPlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitUncheckedUpdateManyWithoutPatentFundingNestedInputSchema).optional()
}).strict();

export const FundingUnitUpsertWithWhereUniqueWithoutFundingRecordInputSchema: z.ZodType<Prisma.FundingUnitUpsertWithWhereUniqueWithoutFundingRecordInput> = z.object({
  where: z.lazy(() => FundingUnitWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FundingUnitUpdateWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUncheckedUpdateWithoutFundingRecordInputSchema) ]),
  create: z.union([ z.lazy(() => FundingUnitCreateWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUncheckedCreateWithoutFundingRecordInputSchema) ]),
}).strict();

export const FundingUnitUpdateWithWhereUniqueWithoutFundingRecordInputSchema: z.ZodType<Prisma.FundingUnitUpdateWithWhereUniqueWithoutFundingRecordInput> = z.object({
  where: z.lazy(() => FundingUnitWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FundingUnitUpdateWithoutFundingRecordInputSchema),z.lazy(() => FundingUnitUncheckedUpdateWithoutFundingRecordInputSchema) ]),
}).strict();

export const FundingUnitUpdateManyWithWhereWithoutFundingRecordInputSchema: z.ZodType<Prisma.FundingUnitUpdateManyWithWhereWithoutFundingRecordInput> = z.object({
  where: z.lazy(() => FundingUnitScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FundingUnitUpdateManyMutationInputSchema),z.lazy(() => FundingUnitUncheckedUpdateManyWithoutFundingRecordInputSchema) ]),
}).strict();

export const FundingUnitScalarWhereInputSchema: z.ZodType<Prisma.FundingUnitScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FundingUnitScalarWhereInputSchema),z.lazy(() => FundingUnitScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundingUnitScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundingUnitScalarWhereInputSchema),z.lazy(() => FundingUnitScalarWhereInputSchema).array() ]).optional(),
  FundingUnitID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const FundingUnitCreateWithoutPatentFundingUnitInputSchema: z.ZodType<Prisma.FundingUnitCreateWithoutPatentFundingUnitInput> = z.object({
  Name: z.string(),
  FundingRecord: z.lazy(() => FundingRecordCreateNestedManyWithoutCanFundingByInputSchema).optional()
}).strict();

export const FundingUnitUncheckedCreateWithoutPatentFundingUnitInputSchema: z.ZodType<Prisma.FundingUnitUncheckedCreateWithoutPatentFundingUnitInput> = z.object({
  FundingUnitID: z.number().int().optional(),
  Name: z.string(),
  FundingRecord: z.lazy(() => FundingRecordUncheckedCreateNestedManyWithoutCanFundingByInputSchema).optional()
}).strict();

export const FundingUnitCreateOrConnectWithoutPatentFundingUnitInputSchema: z.ZodType<Prisma.FundingUnitCreateOrConnectWithoutPatentFundingUnitInput> = z.object({
  where: z.lazy(() => FundingUnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FundingUnitCreateWithoutPatentFundingUnitInputSchema),z.lazy(() => FundingUnitUncheckedCreateWithoutPatentFundingUnitInputSchema) ]),
}).strict();

export const PatentFundingCreateWithoutPatentFundingUnitsInputSchema: z.ZodType<Prisma.PatentFundingCreateWithoutPatentFundingUnitsInput> = z.object({
  patent: z.lazy(() => PatentCreateNestedOneWithoutFundingInputSchema),
  plan: z.lazy(() => FundingPlanCreateNestedOneWithoutFundingsInputSchema),
  fundingRecords: z.lazy(() => FundingRecordCreateNestedManyWithoutPatentFundingInputSchema).optional()
}).strict();

export const PatentFundingUncheckedCreateWithoutPatentFundingUnitsInputSchema: z.ZodType<Prisma.PatentFundingUncheckedCreateWithoutPatentFundingUnitsInput> = z.object({
  PatentID: z.number().int(),
  fundingPlanPlanID: z.number().int(),
  fundingRecords: z.lazy(() => FundingRecordUncheckedCreateNestedManyWithoutPatentFundingInputSchema).optional()
}).strict();

export const PatentFundingCreateOrConnectWithoutPatentFundingUnitsInputSchema: z.ZodType<Prisma.PatentFundingCreateOrConnectWithoutPatentFundingUnitsInput> = z.object({
  where: z.lazy(() => PatentFundingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentFundingUnitsInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentFundingUnitsInputSchema) ]),
}).strict();

export const FundingUnitUpsertWithoutPatentFundingUnitInputSchema: z.ZodType<Prisma.FundingUnitUpsertWithoutPatentFundingUnitInput> = z.object({
  update: z.union([ z.lazy(() => FundingUnitUpdateWithoutPatentFundingUnitInputSchema),z.lazy(() => FundingUnitUncheckedUpdateWithoutPatentFundingUnitInputSchema) ]),
  create: z.union([ z.lazy(() => FundingUnitCreateWithoutPatentFundingUnitInputSchema),z.lazy(() => FundingUnitUncheckedCreateWithoutPatentFundingUnitInputSchema) ]),
  where: z.lazy(() => FundingUnitWhereInputSchema).optional()
}).strict();

export const FundingUnitUpdateToOneWithWhereWithoutPatentFundingUnitInputSchema: z.ZodType<Prisma.FundingUnitUpdateToOneWithWhereWithoutPatentFundingUnitInput> = z.object({
  where: z.lazy(() => FundingUnitWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FundingUnitUpdateWithoutPatentFundingUnitInputSchema),z.lazy(() => FundingUnitUncheckedUpdateWithoutPatentFundingUnitInputSchema) ]),
}).strict();

export const FundingUnitUpdateWithoutPatentFundingUnitInputSchema: z.ZodType<Prisma.FundingUnitUpdateWithoutPatentFundingUnitInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  FundingRecord: z.lazy(() => FundingRecordUpdateManyWithoutCanFundingByNestedInputSchema).optional()
}).strict();

export const FundingUnitUncheckedUpdateWithoutPatentFundingUnitInputSchema: z.ZodType<Prisma.FundingUnitUncheckedUpdateWithoutPatentFundingUnitInput> = z.object({
  FundingUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  FundingRecord: z.lazy(() => FundingRecordUncheckedUpdateManyWithoutCanFundingByNestedInputSchema).optional()
}).strict();

export const PatentFundingUpsertWithoutPatentFundingUnitsInputSchema: z.ZodType<Prisma.PatentFundingUpsertWithoutPatentFundingUnitsInput> = z.object({
  update: z.union([ z.lazy(() => PatentFundingUpdateWithoutPatentFundingUnitsInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutPatentFundingUnitsInputSchema) ]),
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentFundingUnitsInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentFundingUnitsInputSchema) ]),
  where: z.lazy(() => PatentFundingWhereInputSchema).optional()
}).strict();

export const PatentFundingUpdateToOneWithWhereWithoutPatentFundingUnitsInputSchema: z.ZodType<Prisma.PatentFundingUpdateToOneWithWhereWithoutPatentFundingUnitsInput> = z.object({
  where: z.lazy(() => PatentFundingWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentFundingUpdateWithoutPatentFundingUnitsInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutPatentFundingUnitsInputSchema) ]),
}).strict();

export const PatentFundingUpdateWithoutPatentFundingUnitsInputSchema: z.ZodType<Prisma.PatentFundingUpdateWithoutPatentFundingUnitsInput> = z.object({
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutFundingNestedInputSchema).optional(),
  plan: z.lazy(() => FundingPlanUpdateOneRequiredWithoutFundingsNestedInputSchema).optional(),
  fundingRecords: z.lazy(() => FundingRecordUpdateManyWithoutPatentFundingNestedInputSchema).optional()
}).strict();

export const PatentFundingUncheckedUpdateWithoutPatentFundingUnitsInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateWithoutPatentFundingUnitsInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundingPlanPlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundingRecords: z.lazy(() => FundingRecordUncheckedUpdateManyWithoutPatentFundingNestedInputSchema).optional()
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
  Name: z.string(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Role: z.string().optional().nullable(),
  Note: z.string().optional().nullable(),
  AgencyUnitPerson: z.lazy(() => AgencyUnitPersonCreateNestedManyWithoutContactInfoInputSchema).optional()
}).strict();

export const ContactInfoUncheckedCreateWithoutInventorInputSchema: z.ZodType<Prisma.ContactInfoUncheckedCreateWithoutInventorInput> = z.object({
  ContactInfoID: z.number().int().optional(),
  Name: z.string(),
  Email: z.string().optional().nullable(),
  OfficeNumber: z.string().optional().nullable(),
  PhoneNumber: z.string().optional().nullable(),
  Role: z.string().optional().nullable(),
  Note: z.string().optional().nullable(),
  AgencyUnitPerson: z.lazy(() => AgencyUnitPersonUncheckedCreateNestedManyWithoutContactInfoInputSchema).optional()
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
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  AgencyUnitPerson: z.lazy(() => AgencyUnitPersonUpdateManyWithoutContactInfoNestedInputSchema).optional()
}).strict();

export const ContactInfoUncheckedUpdateWithoutInventorInputSchema: z.ZodType<Prisma.ContactInfoUncheckedUpdateWithoutInventorInput> = z.object({
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  OfficeNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PhoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  AgencyUnitPerson: z.lazy(() => AgencyUnitPersonUncheckedUpdateManyWithoutContactInfoNestedInputSchema).optional()
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
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutPatentsInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutInventorsInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutInventorsInput> = z.object({
  PatentID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutInventorsInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutInventorsInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutInventorsInputSchema),z.lazy(() => PatentUncheckedCreateWithoutInventorsInputSchema) ]),
}).strict();

export const InventorCreateWithoutPatentsInputSchema: z.ZodType<Prisma.InventorCreateWithoutPatentsInput> = z.object({
  department: z.lazy(() => DepartmentCreateNestedOneWithoutInventorsInputSchema),
  contactInfo: z.lazy(() => ContactInfoCreateNestedOneWithoutInventorInputSchema)
}).strict();

export const InventorUncheckedCreateWithoutPatentsInputSchema: z.ZodType<Prisma.InventorUncheckedCreateWithoutPatentsInput> = z.object({
  InventorID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  ContactInfoID: z.number().int()
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
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneWithoutPatentsNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutInventorsInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutInventorsInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedUpdateManyWithoutPatentNestedInputSchema).optional()
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
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutInventorsNestedInputSchema).optional(),
  contactInfo: z.lazy(() => ContactInfoUpdateOneRequiredWithoutInventorNestedInputSchema).optional()
}).strict();

export const InventorUncheckedUpdateWithoutPatentsInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateWithoutPatentsInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CountryCreateWithoutPatentsInputSchema: z.ZodType<Prisma.CountryCreateWithoutPatentsInput> = z.object({
  CountryName: z.string(),
  ISOCode: z.string()
}).strict();

export const CountryUncheckedCreateWithoutPatentsInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutPatentsInput> = z.object({
  CountryID: z.number().int().optional(),
  CountryName: z.string(),
  ISOCode: z.string()
}).strict();

export const CountryCreateOrConnectWithoutPatentsInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutPatentsInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutPatentsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPatentsInputSchema) ]),
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

export const PatentApplicationDataCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateWithoutPatentInput> = z.object({
  ApplicationNumber: z.string().optional().nullable(),
  FilingDate: z.coerce.date().optional().nullable(),
  RDResultNumber: z.string().optional().nullable(),
  NSCNumber: z.string().optional().nullable()
}).strict();

export const PatentApplicationDataUncheckedCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedCreateWithoutPatentInput> = z.object({
  ApplicationNumber: z.string().optional().nullable(),
  FilingDate: z.coerce.date().optional().nullable(),
  RDResultNumber: z.string().optional().nullable(),
  NSCNumber: z.string().optional().nullable()
}).strict();

export const PatentApplicationDataCreateOrConnectWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataCreateOrConnectWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentApplicationDataWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentApplicationDataCreateWithoutPatentInputSchema),z.lazy(() => PatentApplicationDataUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentFundingCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingCreateWithoutPatentInput> = z.object({
  plan: z.lazy(() => FundingPlanCreateNestedOneWithoutFundingsInputSchema),
  fundingRecords: z.lazy(() => FundingRecordCreateNestedManyWithoutPatentFundingInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitCreateNestedManyWithoutPatentFundingInputSchema).optional()
}).strict();

export const PatentFundingUncheckedCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUncheckedCreateWithoutPatentInput> = z.object({
  fundingPlanPlanID: z.number().int(),
  fundingRecords: z.lazy(() => FundingRecordUncheckedCreateNestedManyWithoutPatentFundingInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitUncheckedCreateNestedManyWithoutPatentFundingInputSchema).optional()
}).strict();

export const PatentFundingCreateOrConnectWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingCreateOrConnectWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentFundingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentManualStatusCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentManualStatusCreateWithoutPatentInput> = z.object({
  Reason: z.string(),
  Date: z.coerce.date().optional().nullable(),
  Active: z.boolean()
}).strict();

export const PatentManualStatusUncheckedCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentManualStatusUncheckedCreateWithoutPatentInput> = z.object({
  ManualStatusID: z.number().int().optional(),
  Reason: z.string(),
  Date: z.coerce.date().optional().nullable(),
  Active: z.boolean()
}).strict();

export const PatentManualStatusCreateOrConnectWithoutPatentInputSchema: z.ZodType<Prisma.PatentManualStatusCreateOrConnectWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentManualStatusWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentManualStatusCreateWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentManualStatusCreateManyPatentInputEnvelopeSchema: z.ZodType<Prisma.PatentManualStatusCreateManyPatentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentManualStatusCreateManyPatentInputSchema),z.lazy(() => PatentManualStatusCreateManyPatentInputSchema).array() ]),
}).strict();

export const PatentMaintenanceCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentMaintenanceCreateWithoutPatentInput> = z.object({
  MaintenanceDate: z.coerce.date(),
  ExpireDate: z.coerce.date()
}).strict();

export const PatentMaintenanceUncheckedCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentMaintenanceUncheckedCreateWithoutPatentInput> = z.object({
  MaintenanceID: z.number().int().optional(),
  MaintenanceDate: z.coerce.date(),
  ExpireDate: z.coerce.date()
}).strict();

export const PatentMaintenanceCreateOrConnectWithoutPatentInputSchema: z.ZodType<Prisma.PatentMaintenanceCreateOrConnectWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentMaintenanceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentMaintenanceCreateWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentMaintenanceCreateManyPatentInputEnvelopeSchema: z.ZodType<Prisma.PatentMaintenanceCreateManyPatentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentMaintenanceCreateManyPatentInputSchema),z.lazy(() => PatentMaintenanceCreateManyPatentInputSchema).array() ]),
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

export const PatentInternalCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentInternalCreateWithoutPatentInput> = z.object({
  InternalID: z.string(),
  InitialReviewDate: z.coerce.date().optional().nullable(),
  InitialReviewNumber: z.number().int().optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitCreateNestedManyWithoutPatentInternalInputSchema).optional(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitCreateNestedManyWithoutPatentInternalInputSchema).optional()
}).strict();

export const PatentInternalUncheckedCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentInternalUncheckedCreateWithoutPatentInput> = z.object({
  InternalID: z.string(),
  InitialReviewDate: z.coerce.date().optional().nullable(),
  InitialReviewNumber: z.number().int().optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateNestedManyWithoutPatentInternalInputSchema).optional(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitUncheckedCreateNestedManyWithoutPatentInternalInputSchema).optional()
}).strict();

export const PatentInternalCreateOrConnectWithoutPatentInputSchema: z.ZodType<Prisma.PatentInternalCreateOrConnectWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentInternalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutPatentInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentExternalCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentExternalCreateWithoutPatentInput> = z.object({
  PatentNumber: z.string().optional().nullable(),
  PublicationDate: z.coerce.date().optional().nullable(),
  StartDate: z.coerce.date().optional().nullable(),
  EndDate: z.coerce.date().optional().nullable(),
  IPCNumber: z.string().optional().nullable(),
  PatentScope: z.string().optional().nullable()
}).strict();

export const PatentExternalUncheckedCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentExternalUncheckedCreateWithoutPatentInput> = z.object({
  PatentNumber: z.string().optional().nullable(),
  PublicationDate: z.coerce.date().optional().nullable(),
  StartDate: z.coerce.date().optional().nullable(),
  EndDate: z.coerce.date().optional().nullable(),
  IPCNumber: z.string().optional().nullable(),
  PatentScope: z.string().optional().nullable()
}).strict();

export const PatentExternalCreateOrConnectWithoutPatentInputSchema: z.ZodType<Prisma.PatentExternalCreateOrConnectWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentExternalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentExternalCreateWithoutPatentInputSchema),z.lazy(() => PatentExternalUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentRecordCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentRecordCreateWithoutPatentInput> = z.object({
  Record: z.string().optional().nullable(),
  Date: z.coerce.date().optional().nullable()
}).strict();

export const PatentRecordUncheckedCreateWithoutPatentInputSchema: z.ZodType<Prisma.PatentRecordUncheckedCreateWithoutPatentInput> = z.object({
  id: z.number().int().optional(),
  Record: z.string().optional().nullable(),
  Date: z.coerce.date().optional().nullable()
}).strict();

export const PatentRecordCreateOrConnectWithoutPatentInputSchema: z.ZodType<Prisma.PatentRecordCreateOrConnectWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentRecordWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentRecordCreateWithoutPatentInputSchema),z.lazy(() => PatentRecordUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentRecordCreateManyPatentInputEnvelopeSchema: z.ZodType<Prisma.PatentRecordCreateManyPatentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentRecordCreateManyPatentInputSchema),z.lazy(() => PatentRecordCreateManyPatentInputSchema).array() ]),
}).strict();

export const CountryUpsertWithoutPatentsInputSchema: z.ZodType<Prisma.CountryUpsertWithoutPatentsInput> = z.object({
  update: z.union([ z.lazy(() => CountryUpdateWithoutPatentsInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutPatentsInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutPatentsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPatentsInputSchema) ]),
  where: z.lazy(() => CountryWhereInputSchema).optional()
}).strict();

export const CountryUpdateToOneWithWhereWithoutPatentsInputSchema: z.ZodType<Prisma.CountryUpdateToOneWithWhereWithoutPatentsInput> = z.object({
  where: z.lazy(() => CountryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CountryUpdateWithoutPatentsInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutPatentsInputSchema) ]),
}).strict();

export const CountryUpdateWithoutPatentsInputSchema: z.ZodType<Prisma.CountryUpdateWithoutPatentsInput> = z.object({
  CountryName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ISOCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CountryUncheckedUpdateWithoutPatentsInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutPatentsInput> = z.object({
  CountryID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  CountryName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ISOCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  RDResultNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  NSCNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentApplicationDataUncheckedUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentApplicationDataUncheckedUpdateWithoutPatentInput> = z.object({
  ApplicationNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  FilingDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  RDResultNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  NSCNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentFundingUpsertWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUpsertWithoutPatentInput> = z.object({
  update: z.union([ z.lazy(() => PatentFundingUpdateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutPatentInputSchema) ]),
  create: z.union([ z.lazy(() => PatentFundingCreateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedCreateWithoutPatentInputSchema) ]),
  where: z.lazy(() => PatentFundingWhereInputSchema).optional()
}).strict();

export const PatentFundingUpdateToOneWithWhereWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUpdateToOneWithWhereWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentFundingWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentFundingUpdateWithoutPatentInputSchema),z.lazy(() => PatentFundingUncheckedUpdateWithoutPatentInputSchema) ]),
}).strict();

export const PatentFundingUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUpdateWithoutPatentInput> = z.object({
  plan: z.lazy(() => FundingPlanUpdateOneRequiredWithoutFundingsNestedInputSchema).optional(),
  fundingRecords: z.lazy(() => FundingRecordUpdateManyWithoutPatentFundingNestedInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitUpdateManyWithoutPatentFundingNestedInputSchema).optional()
}).strict();

export const PatentFundingUncheckedUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateWithoutPatentInput> = z.object({
  fundingPlanPlanID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundingRecords: z.lazy(() => FundingRecordUncheckedUpdateManyWithoutPatentFundingNestedInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitUncheckedUpdateManyWithoutPatentFundingNestedInputSchema).optional()
}).strict();

export const PatentManualStatusUpsertWithWhereUniqueWithoutPatentInputSchema: z.ZodType<Prisma.PatentManualStatusUpsertWithWhereUniqueWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentManualStatusWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentManualStatusUpdateWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUncheckedUpdateWithoutPatentInputSchema) ]),
  create: z.union([ z.lazy(() => PatentManualStatusCreateWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentManualStatusUpdateWithWhereUniqueWithoutPatentInputSchema: z.ZodType<Prisma.PatentManualStatusUpdateWithWhereUniqueWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentManualStatusWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentManualStatusUpdateWithoutPatentInputSchema),z.lazy(() => PatentManualStatusUncheckedUpdateWithoutPatentInputSchema) ]),
}).strict();

export const PatentManualStatusUpdateManyWithWhereWithoutPatentInputSchema: z.ZodType<Prisma.PatentManualStatusUpdateManyWithWhereWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentManualStatusScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentManualStatusUpdateManyMutationInputSchema),z.lazy(() => PatentManualStatusUncheckedUpdateManyWithoutPatentInputSchema) ]),
}).strict();

export const PatentManualStatusScalarWhereInputSchema: z.ZodType<Prisma.PatentManualStatusScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentManualStatusScalarWhereInputSchema),z.lazy(() => PatentManualStatusScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentManualStatusScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentManualStatusScalarWhereInputSchema),z.lazy(() => PatentManualStatusScalarWhereInputSchema).array() ]).optional(),
  ManualStatusID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Reason: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const PatentMaintenanceUpsertWithWhereUniqueWithoutPatentInputSchema: z.ZodType<Prisma.PatentMaintenanceUpsertWithWhereUniqueWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentMaintenanceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentMaintenanceUpdateWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUncheckedUpdateWithoutPatentInputSchema) ]),
  create: z.union([ z.lazy(() => PatentMaintenanceCreateWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentMaintenanceUpdateWithWhereUniqueWithoutPatentInputSchema: z.ZodType<Prisma.PatentMaintenanceUpdateWithWhereUniqueWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentMaintenanceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentMaintenanceUpdateWithoutPatentInputSchema),z.lazy(() => PatentMaintenanceUncheckedUpdateWithoutPatentInputSchema) ]),
}).strict();

export const PatentMaintenanceUpdateManyWithWhereWithoutPatentInputSchema: z.ZodType<Prisma.PatentMaintenanceUpdateManyWithWhereWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentMaintenanceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentMaintenanceUpdateManyMutationInputSchema),z.lazy(() => PatentMaintenanceUncheckedUpdateManyWithoutPatentInputSchema) ]),
}).strict();

export const PatentMaintenanceScalarWhereInputSchema: z.ZodType<Prisma.PatentMaintenanceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentMaintenanceScalarWhereInputSchema),z.lazy(() => PatentMaintenanceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentMaintenanceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentMaintenanceScalarWhereInputSchema),z.lazy(() => PatentMaintenanceScalarWhereInputSchema).array() ]).optional(),
  MaintenanceID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  MaintenanceDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ExpireDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
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

export const PatentInternalUpsertWithoutPatentInputSchema: z.ZodType<Prisma.PatentInternalUpsertWithoutPatentInput> = z.object({
  update: z.union([ z.lazy(() => PatentInternalUpdateWithoutPatentInputSchema),z.lazy(() => PatentInternalUncheckedUpdateWithoutPatentInputSchema) ]),
  create: z.union([ z.lazy(() => PatentInternalCreateWithoutPatentInputSchema),z.lazy(() => PatentInternalUncheckedCreateWithoutPatentInputSchema) ]),
  where: z.lazy(() => PatentInternalWhereInputSchema).optional()
}).strict();

export const PatentInternalUpdateToOneWithWhereWithoutPatentInputSchema: z.ZodType<Prisma.PatentInternalUpdateToOneWithWhereWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentInternalWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentInternalUpdateWithoutPatentInputSchema),z.lazy(() => PatentInternalUncheckedUpdateWithoutPatentInputSchema) ]),
}).strict();

export const PatentInternalUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentInternalUpdateWithoutPatentInput> = z.object({
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InitialReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitUpdateManyWithoutPatentInternalNestedInputSchema).optional(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitUpdateManyWithoutPatentInternalNestedInputSchema).optional()
}).strict();

export const PatentInternalUncheckedUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentInternalUncheckedUpdateWithoutPatentInput> = z.object({
  InternalID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  InitialReviewDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InitialReviewAgencies: z.lazy(() => PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutPatentInternalNestedInputSchema).optional(),
  TakerAgencies: z.lazy(() => PatentTakerAgencyUnitUncheckedUpdateManyWithoutPatentInternalNestedInputSchema).optional()
}).strict();

export const PatentExternalUpsertWithoutPatentInputSchema: z.ZodType<Prisma.PatentExternalUpsertWithoutPatentInput> = z.object({
  update: z.union([ z.lazy(() => PatentExternalUpdateWithoutPatentInputSchema),z.lazy(() => PatentExternalUncheckedUpdateWithoutPatentInputSchema) ]),
  create: z.union([ z.lazy(() => PatentExternalCreateWithoutPatentInputSchema),z.lazy(() => PatentExternalUncheckedCreateWithoutPatentInputSchema) ]),
  where: z.lazy(() => PatentExternalWhereInputSchema).optional()
}).strict();

export const PatentExternalUpdateToOneWithWhereWithoutPatentInputSchema: z.ZodType<Prisma.PatentExternalUpdateToOneWithWhereWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentExternalWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentExternalUpdateWithoutPatentInputSchema),z.lazy(() => PatentExternalUncheckedUpdateWithoutPatentInputSchema) ]),
}).strict();

export const PatentExternalUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentExternalUpdateWithoutPatentInput> = z.object({
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  StartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  EndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  IPCNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentScope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentExternalUncheckedUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentExternalUncheckedUpdateWithoutPatentInput> = z.object({
  PatentNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PublicationDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  StartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  EndDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  IPCNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentScope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentRecordUpsertWithWhereUniqueWithoutPatentInputSchema: z.ZodType<Prisma.PatentRecordUpsertWithWhereUniqueWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentRecordWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentRecordUpdateWithoutPatentInputSchema),z.lazy(() => PatentRecordUncheckedUpdateWithoutPatentInputSchema) ]),
  create: z.union([ z.lazy(() => PatentRecordCreateWithoutPatentInputSchema),z.lazy(() => PatentRecordUncheckedCreateWithoutPatentInputSchema) ]),
}).strict();

export const PatentRecordUpdateWithWhereUniqueWithoutPatentInputSchema: z.ZodType<Prisma.PatentRecordUpdateWithWhereUniqueWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentRecordWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentRecordUpdateWithoutPatentInputSchema),z.lazy(() => PatentRecordUncheckedUpdateWithoutPatentInputSchema) ]),
}).strict();

export const PatentRecordUpdateManyWithWhereWithoutPatentInputSchema: z.ZodType<Prisma.PatentRecordUpdateManyWithWhereWithoutPatentInput> = z.object({
  where: z.lazy(() => PatentRecordScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentRecordUpdateManyMutationInputSchema),z.lazy(() => PatentRecordUncheckedUpdateManyWithoutPatentInputSchema) ]),
}).strict();

export const PatentRecordScalarWhereInputSchema: z.ZodType<Prisma.PatentRecordScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentRecordScalarWhereInputSchema),z.lazy(() => PatentRecordScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentRecordScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentRecordScalarWhereInputSchema),z.lazy(() => PatentRecordScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Record: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const PatentCreateWithoutApplicationInputSchema: z.ZodType<Prisma.PatentCreateWithoutApplicationInput> = z.object({
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutPatentsInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutApplicationInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutApplicationInput> = z.object({
  PatentID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutApplicationInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutApplicationInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutApplicationInputSchema),z.lazy(() => PatentUncheckedCreateWithoutApplicationInputSchema) ]),
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
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneWithoutPatentsNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutApplicationInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutApplicationInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedUpdateManyWithoutPatentNestedInputSchema).optional()
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
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutPatentsInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceCreateNestedManyWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutTechnicalInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutTechnicalInput> = z.object({
  PatentID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedCreateNestedManyWithoutPatentInputSchema).optional()
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
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneWithoutPatentsNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUpdateManyWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutTechnicalInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutTechnicalInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedUpdateManyWithoutPatentNestedInputSchema).optional()
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

export const PatentInitiatorAgencyUnitCreateWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateWithoutPatentInternalInput> = z.object({
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  agencyUnit: z.lazy(() => AgencyUnitCreateNestedOneWithoutInitialReviewPatentsInputSchema)
}).strict();

export const PatentInitiatorAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUncheckedCreateWithoutPatentInternalInput> = z.object({
  AgencyUnitID: z.number().int(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateOrConnectWithoutPatentInternalInput> = z.object({
  where: z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema) ]),
}).strict();

export const PatentInitiatorAgencyUnitCreateManyPatentInternalInputEnvelopeSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateManyPatentInternalInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateManyPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitCreateManyPatentInternalInputSchema).array() ]),
}).strict();

export const PatentTakerAgencyUnitCreateWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateWithoutPatentInternalInput> = z.object({
  FileCode: z.string(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  agencyUnit: z.lazy(() => AgencyUnitCreateNestedOneWithoutTakerPatentsInputSchema)
}).strict();

export const PatentTakerAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUncheckedCreateWithoutPatentInternalInput> = z.object({
  AgencyUnitID: z.number().int(),
  FileCode: z.string(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentTakerAgencyUnitCreateOrConnectWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateOrConnectWithoutPatentInternalInput> = z.object({
  where: z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema) ]),
}).strict();

export const PatentTakerAgencyUnitCreateManyPatentInternalInputEnvelopeSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateManyPatentInternalInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateManyPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitCreateManyPatentInternalInputSchema).array() ]),
}).strict();

export const PatentCreateWithoutInternalInputSchema: z.ZodType<Prisma.PatentCreateWithoutInternalInput> = z.object({
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutPatentsInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutInternalInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutInternalInput> = z.object({
  PatentID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutInternalInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutInternalInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutInternalInputSchema),z.lazy(() => PatentUncheckedCreateWithoutInternalInputSchema) ]),
}).strict();

export const PatentInitiatorAgencyUnitUpsertWithWhereUniqueWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpsertWithWhereUniqueWithoutPatentInternalInput> = z.object({
  where: z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedUpdateWithoutPatentInternalInputSchema) ]),
  create: z.union([ z.lazy(() => PatentInitiatorAgencyUnitCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema) ]),
}).strict();

export const PatentInitiatorAgencyUnitUpdateWithWhereUniqueWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpdateWithWhereUniqueWithoutPatentInternalInput> = z.object({
  where: z.lazy(() => PatentInitiatorAgencyUnitWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateWithoutPatentInternalInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedUpdateWithoutPatentInternalInputSchema) ]),
}).strict();

export const PatentInitiatorAgencyUnitUpdateManyWithWhereWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpdateManyWithWhereWithoutPatentInternalInput> = z.object({
  where: z.lazy(() => PatentInitiatorAgencyUnitScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentInitiatorAgencyUnitUpdateManyMutationInputSchema),z.lazy(() => PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutPatentInternalInputSchema) ]),
}).strict();

export const PatentTakerAgencyUnitUpsertWithWhereUniqueWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpsertWithWhereUniqueWithoutPatentInternalInput> = z.object({
  where: z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedUpdateWithoutPatentInternalInputSchema) ]),
  create: z.union([ z.lazy(() => PatentTakerAgencyUnitCreateWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedCreateWithoutPatentInternalInputSchema) ]),
}).strict();

export const PatentTakerAgencyUnitUpdateWithWhereUniqueWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpdateWithWhereUniqueWithoutPatentInternalInput> = z.object({
  where: z.lazy(() => PatentTakerAgencyUnitWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateWithoutPatentInternalInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedUpdateWithoutPatentInternalInputSchema) ]),
}).strict();

export const PatentTakerAgencyUnitUpdateManyWithWhereWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpdateManyWithWhereWithoutPatentInternalInput> = z.object({
  where: z.lazy(() => PatentTakerAgencyUnitScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentTakerAgencyUnitUpdateManyMutationInputSchema),z.lazy(() => PatentTakerAgencyUnitUncheckedUpdateManyWithoutPatentInternalInputSchema) ]),
}).strict();

export const PatentUpsertWithoutInternalInputSchema: z.ZodType<Prisma.PatentUpsertWithoutInternalInput> = z.object({
  update: z.union([ z.lazy(() => PatentUpdateWithoutInternalInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutInternalInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutInternalInputSchema),z.lazy(() => PatentUncheckedCreateWithoutInternalInputSchema) ]),
  where: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const PatentUpdateToOneWithWhereWithoutInternalInputSchema: z.ZodType<Prisma.PatentUpdateToOneWithWhereWithoutInternalInput> = z.object({
  where: z.lazy(() => PatentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentUpdateWithoutInternalInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutInternalInputSchema) ]),
}).strict();

export const PatentUpdateWithoutInternalInputSchema: z.ZodType<Prisma.PatentUpdateWithoutInternalInput> = z.object({
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneWithoutPatentsNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutInternalInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutInternalInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentCreateWithoutExternalInputSchema: z.ZodType<Prisma.PatentCreateWithoutExternalInput> = z.object({
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutPatentsInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutExternalInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutExternalInput> = z.object({
  PatentID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutExternalInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutExternalInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutExternalInputSchema),z.lazy(() => PatentUncheckedCreateWithoutExternalInputSchema) ]),
}).strict();

export const PatentUpsertWithoutExternalInputSchema: z.ZodType<Prisma.PatentUpsertWithoutExternalInput> = z.object({
  update: z.union([ z.lazy(() => PatentUpdateWithoutExternalInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutExternalInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutExternalInputSchema),z.lazy(() => PatentUncheckedCreateWithoutExternalInputSchema) ]),
  where: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const PatentUpdateToOneWithWhereWithoutExternalInputSchema: z.ZodType<Prisma.PatentUpdateToOneWithWhereWithoutExternalInput> = z.object({
  where: z.lazy(() => PatentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentUpdateWithoutExternalInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutExternalInputSchema) ]),
}).strict();

export const PatentUpdateWithoutExternalInputSchema: z.ZodType<Prisma.PatentUpdateWithoutExternalInput> = z.object({
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneWithoutPatentsNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutExternalInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutExternalInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentCreateWithoutManualStatusInputSchema: z.ZodType<Prisma.PatentCreateWithoutManualStatusInput> = z.object({
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutPatentsInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedOneWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutManualStatusInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutManualStatusInput> = z.object({
  PatentID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutManualStatusInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutManualStatusInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutManualStatusInputSchema),z.lazy(() => PatentUncheckedCreateWithoutManualStatusInputSchema) ]),
}).strict();

export const PatentUpsertWithoutManualStatusInputSchema: z.ZodType<Prisma.PatentUpsertWithoutManualStatusInput> = z.object({
  update: z.union([ z.lazy(() => PatentUpdateWithoutManualStatusInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutManualStatusInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutManualStatusInputSchema),z.lazy(() => PatentUncheckedCreateWithoutManualStatusInputSchema) ]),
  where: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const PatentUpdateToOneWithWhereWithoutManualStatusInputSchema: z.ZodType<Prisma.PatentUpdateToOneWithWhereWithoutManualStatusInput> = z.object({
  where: z.lazy(() => PatentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentUpdateWithoutManualStatusInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutManualStatusInputSchema) ]),
}).strict();

export const PatentUpdateWithoutManualStatusInputSchema: z.ZodType<Prisma.PatentUpdateWithoutManualStatusInput> = z.object({
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneWithoutPatentsNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateOneWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutManualStatusInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutManualStatusInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentCreateWithoutMaintenancesInputSchema: z.ZodType<Prisma.PatentCreateWithoutMaintenancesInput> = z.object({
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutPatentsInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutMaintenancesInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutMaintenancesInput> = z.object({
  PatentID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutMaintenancesInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutMaintenancesInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutMaintenancesInputSchema),z.lazy(() => PatentUncheckedCreateWithoutMaintenancesInputSchema) ]),
}).strict();

export const PatentUpsertWithoutMaintenancesInputSchema: z.ZodType<Prisma.PatentUpsertWithoutMaintenancesInput> = z.object({
  update: z.union([ z.lazy(() => PatentUpdateWithoutMaintenancesInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutMaintenancesInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutMaintenancesInputSchema),z.lazy(() => PatentUncheckedCreateWithoutMaintenancesInputSchema) ]),
  where: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const PatentUpdateToOneWithWhereWithoutMaintenancesInputSchema: z.ZodType<Prisma.PatentUpdateToOneWithWhereWithoutMaintenancesInput> = z.object({
  where: z.lazy(() => PatentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentUpdateWithoutMaintenancesInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutMaintenancesInputSchema) ]),
}).strict();

export const PatentUpdateWithoutMaintenancesInputSchema: z.ZodType<Prisma.PatentUpdateWithoutMaintenancesInput> = z.object({
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneWithoutPatentsNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutMaintenancesInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutMaintenancesInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentCreateWithoutPatentRecordsInputSchema: z.ZodType<Prisma.PatentCreateWithoutPatentRecordsInput> = z.object({
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutPatentsInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutPatentRecordsInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutPatentRecordsInput> = z.object({
  PatentID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutPatentRecordsInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutPatentRecordsInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutPatentRecordsInputSchema),z.lazy(() => PatentUncheckedCreateWithoutPatentRecordsInputSchema) ]),
}).strict();

export const PatentUpsertWithoutPatentRecordsInputSchema: z.ZodType<Prisma.PatentUpsertWithoutPatentRecordsInput> = z.object({
  update: z.union([ z.lazy(() => PatentUpdateWithoutPatentRecordsInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutPatentRecordsInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutPatentRecordsInputSchema),z.lazy(() => PatentUncheckedCreateWithoutPatentRecordsInputSchema) ]),
  where: z.lazy(() => PatentWhereInputSchema).optional()
}).strict();

export const PatentUpdateToOneWithWhereWithoutPatentRecordsInputSchema: z.ZodType<Prisma.PatentUpdateToOneWithWhereWithoutPatentRecordsInput> = z.object({
  where: z.lazy(() => PatentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatentUpdateWithoutPatentRecordsInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutPatentRecordsInputSchema) ]),
}).strict();

export const PatentUpdateWithoutPatentRecordsInputSchema: z.ZodType<Prisma.PatentUpdateWithoutPatentRecordsInput> = z.object({
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneWithoutPatentsNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUpdateOneWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutPatentRecordsInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutPatentRecordsInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional()
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

export const CollegeCreateWithoutDepartmentsInputSchema: z.ZodType<Prisma.CollegeCreateWithoutDepartmentsInput> = z.object({
  Name: z.string(),
  Description: z.string().optional().nullable()
}).strict();

export const CollegeUncheckedCreateWithoutDepartmentsInputSchema: z.ZodType<Prisma.CollegeUncheckedCreateWithoutDepartmentsInput> = z.object({
  CollegeID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable()
}).strict();

export const CollegeCreateOrConnectWithoutDepartmentsInputSchema: z.ZodType<Prisma.CollegeCreateOrConnectWithoutDepartmentsInput> = z.object({
  where: z.lazy(() => CollegeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CollegeCreateWithoutDepartmentsInputSchema),z.lazy(() => CollegeUncheckedCreateWithoutDepartmentsInputSchema) ]),
}).strict();

export const InventorCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorCreateWithoutDepartmentInput> = z.object({
  contactInfo: z.lazy(() => ContactInfoCreateNestedOneWithoutInventorInputSchema),
  patents: z.lazy(() => PatentInventorCreateNestedManyWithoutInventorInputSchema).optional()
}).strict();

export const InventorUncheckedCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorUncheckedCreateWithoutDepartmentInput> = z.object({
  InventorID: z.number().int().optional(),
  ContactInfoID: z.number().int(),
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
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutPatentsInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutDepartmentInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedCreateNestedManyWithoutPatentInputSchema).optional()
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
}).strict();

export const CollegeUncheckedUpdateWithoutDepartmentsInputSchema: z.ZodType<Prisma.CollegeUncheckedUpdateWithoutDepartmentsInput> = z.object({
  CollegeID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ContactInfoID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
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

export const PatentScalarWhereInputSchema: z.ZodType<Prisma.PatentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatentScalarWhereInputSchema),z.lazy(() => PatentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatentScalarWhereInputSchema),z.lazy(() => PatentScalarWhereInputSchema).array() ]).optional(),
  PatentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  DepartmentID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Year: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  DraftTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  TitleEnglish: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  CountryID: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumEnumPatentTypeNullableFilterSchema),z.lazy(() => EnumPatentTypeSchema) ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PatentCreateWithoutCountryInputSchema: z.ZodType<Prisma.PatentCreateWithoutCountryInput> = z.object({
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPatentsInputSchema),
  inventors: z.lazy(() => PatentInventorCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentUncheckedCreateWithoutCountryInputSchema: z.ZodType<Prisma.PatentUncheckedCreateWithoutCountryInput> = z.object({
  PatentID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  inventors: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedCreateNestedManyWithoutPatentInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedCreateNestedOneWithoutPatentInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedCreateNestedManyWithoutPatentInputSchema).optional()
}).strict();

export const PatentCreateOrConnectWithoutCountryInputSchema: z.ZodType<Prisma.PatentCreateOrConnectWithoutCountryInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatentCreateWithoutCountryInputSchema),z.lazy(() => PatentUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const PatentCreateManyCountryInputEnvelopeSchema: z.ZodType<Prisma.PatentCreateManyCountryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatentCreateManyCountryInputSchema),z.lazy(() => PatentCreateManyCountryInputSchema).array() ]),
}).strict();

export const PatentUpsertWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.PatentUpsertWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatentUpdateWithoutCountryInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutCountryInputSchema) ]),
  create: z.union([ z.lazy(() => PatentCreateWithoutCountryInputSchema),z.lazy(() => PatentUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const PatentUpdateWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.PatentUpdateWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => PatentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatentUpdateWithoutCountryInputSchema),z.lazy(() => PatentUncheckedUpdateWithoutCountryInputSchema) ]),
}).strict();

export const PatentUpdateManyWithWhereWithoutCountryInputSchema: z.ZodType<Prisma.PatentUpdateManyWithWhereWithoutCountryInput> = z.object({
  where: z.lazy(() => PatentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatentUpdateManyMutationInputSchema),z.lazy(() => PatentUncheckedUpdateManyWithoutCountryInputSchema) ]),
}).strict();

export const AgencyUnitPersonCreateWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyUnitPersonCreateWithoutContactInfoInput> = z.object({
  agencyUnit: z.lazy(() => AgencyUnitCreateNestedOneWithoutPersonsInputSchema)
}).strict();

export const AgencyUnitPersonUncheckedCreateWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyUnitPersonUncheckedCreateWithoutContactInfoInput> = z.object({
  AgencyUnitID: z.number().int()
}).strict();

export const AgencyUnitPersonCreateOrConnectWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyUnitPersonCreateOrConnectWithoutContactInfoInput> = z.object({
  where: z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AgencyUnitPersonCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutContactInfoInputSchema) ]),
}).strict();

export const AgencyUnitPersonCreateManyContactInfoInputEnvelopeSchema: z.ZodType<Prisma.AgencyUnitPersonCreateManyContactInfoInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AgencyUnitPersonCreateManyContactInfoInputSchema),z.lazy(() => AgencyUnitPersonCreateManyContactInfoInputSchema).array() ]),
}).strict();

export const InventorCreateWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorCreateWithoutContactInfoInput> = z.object({
  department: z.lazy(() => DepartmentCreateNestedOneWithoutInventorsInputSchema),
  patents: z.lazy(() => PatentInventorCreateNestedManyWithoutInventorInputSchema).optional()
}).strict();

export const InventorUncheckedCreateWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUncheckedCreateWithoutContactInfoInput> = z.object({
  InventorID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  patents: z.lazy(() => PatentInventorUncheckedCreateNestedManyWithoutInventorInputSchema).optional()
}).strict();

export const InventorCreateOrConnectWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorCreateOrConnectWithoutContactInfoInput> = z.object({
  where: z.lazy(() => InventorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InventorCreateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema) ]),
}).strict();

export const InventorCreateManyContactInfoInputEnvelopeSchema: z.ZodType<Prisma.InventorCreateManyContactInfoInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InventorCreateManyContactInfoInputSchema),z.lazy(() => InventorCreateManyContactInfoInputSchema).array() ]),
}).strict();

export const AgencyUnitPersonUpsertWithWhereUniqueWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyUnitPersonUpsertWithWhereUniqueWithoutContactInfoInput> = z.object({
  where: z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AgencyUnitPersonUpdateWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUncheckedUpdateWithoutContactInfoInputSchema) ]),
  create: z.union([ z.lazy(() => AgencyUnitPersonCreateWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUncheckedCreateWithoutContactInfoInputSchema) ]),
}).strict();

export const AgencyUnitPersonUpdateWithWhereUniqueWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyUnitPersonUpdateWithWhereUniqueWithoutContactInfoInput> = z.object({
  where: z.lazy(() => AgencyUnitPersonWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AgencyUnitPersonUpdateWithoutContactInfoInputSchema),z.lazy(() => AgencyUnitPersonUncheckedUpdateWithoutContactInfoInputSchema) ]),
}).strict();

export const AgencyUnitPersonUpdateManyWithWhereWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyUnitPersonUpdateManyWithWhereWithoutContactInfoInput> = z.object({
  where: z.lazy(() => AgencyUnitPersonScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AgencyUnitPersonUpdateManyMutationInputSchema),z.lazy(() => AgencyUnitPersonUncheckedUpdateManyWithoutContactInfoInputSchema) ]),
}).strict();

export const InventorUpsertWithWhereUniqueWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUpsertWithWhereUniqueWithoutContactInfoInput> = z.object({
  where: z.lazy(() => InventorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InventorUpdateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedUpdateWithoutContactInfoInputSchema) ]),
  create: z.union([ z.lazy(() => InventorCreateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedCreateWithoutContactInfoInputSchema) ]),
}).strict();

export const InventorUpdateWithWhereUniqueWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUpdateWithWhereUniqueWithoutContactInfoInput> = z.object({
  where: z.lazy(() => InventorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InventorUpdateWithoutContactInfoInputSchema),z.lazy(() => InventorUncheckedUpdateWithoutContactInfoInputSchema) ]),
}).strict();

export const InventorUpdateManyWithWhereWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUpdateManyWithWhereWithoutContactInfoInput> = z.object({
  where: z.lazy(() => InventorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InventorUpdateManyMutationInputSchema),z.lazy(() => InventorUncheckedUpdateManyWithoutContactInfoInputSchema) ]),
}).strict();

export const AgencyUnitPersonCreateManyAgencyUnitInputSchema: z.ZodType<Prisma.AgencyUnitPersonCreateManyAgencyUnitInput> = z.object({
  ContactInfoID: z.number().int()
}).strict();

export const PatentInitiatorAgencyUnitCreateManyAgencyUnitInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateManyAgencyUnitInput> = z.object({
  PatentID: z.number().int(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentTakerAgencyUnitCreateManyAgencyUnitInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateManyAgencyUnitInput> = z.object({
  PatentID: z.number().int(),
  FileCode: z.string(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const AgencyUnitPersonUpdateWithoutAgencyUnitInputSchema: z.ZodType<Prisma.AgencyUnitPersonUpdateWithoutAgencyUnitInput> = z.object({
  contactInfo: z.lazy(() => ContactInfoUpdateOneRequiredWithoutAgencyUnitPersonNestedInputSchema).optional()
}).strict();

export const AgencyUnitPersonUncheckedUpdateWithoutAgencyUnitInputSchema: z.ZodType<Prisma.AgencyUnitPersonUncheckedUpdateWithoutAgencyUnitInput> = z.object({
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AgencyUnitPersonUncheckedUpdateManyWithoutAgencyUnitInputSchema: z.ZodType<Prisma.AgencyUnitPersonUncheckedUpdateManyWithoutAgencyUnitInput> = z.object({
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitUpdateWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpdateWithoutAgencyUnitInput> = z.object({
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  patentInternal: z.lazy(() => PatentInternalUpdateOneRequiredWithoutInitialReviewAgenciesNestedInputSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitUncheckedUpdateWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUncheckedUpdateWithoutAgencyUnitInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutAgencyUnitInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentTakerAgencyUnitUpdateWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpdateWithoutAgencyUnitInput> = z.object({
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  patentInternal: z.lazy(() => PatentInternalUpdateOneRequiredWithoutTakerAgenciesNestedInputSchema).optional()
}).strict();

export const PatentTakerAgencyUnitUncheckedUpdateWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUncheckedUpdateWithoutAgencyUnitInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentTakerAgencyUnitUncheckedUpdateManyWithoutAgencyUnitInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUncheckedUpdateManyWithoutAgencyUnitInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentFundingCreateManyPlanInputSchema: z.ZodType<Prisma.PatentFundingCreateManyPlanInput> = z.object({
  PatentID: z.number().int()
}).strict();

export const PatentFundingUpdateWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingUpdateWithoutPlanInput> = z.object({
  patent: z.lazy(() => PatentUpdateOneRequiredWithoutFundingNestedInputSchema).optional(),
  fundingRecords: z.lazy(() => FundingRecordUpdateManyWithoutPatentFundingNestedInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitUpdateManyWithoutPatentFundingNestedInputSchema).optional()
}).strict();

export const PatentFundingUncheckedUpdateWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateWithoutPlanInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundingRecords: z.lazy(() => FundingRecordUncheckedUpdateManyWithoutPatentFundingNestedInputSchema).optional(),
  patentFundingUnits: z.lazy(() => PatentFundingUnitUncheckedUpdateManyWithoutPatentFundingNestedInputSchema).optional()
}).strict();

export const PatentFundingUncheckedUpdateManyWithoutPlanInputSchema: z.ZodType<Prisma.PatentFundingUncheckedUpdateManyWithoutPlanInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentFundingUnitCreateManyFundingUnitInputSchema: z.ZodType<Prisma.PatentFundingUnitCreateManyFundingUnitInput> = z.object({
  PatentID: z.number().int(),
  ProjectCode: z.string()
}).strict();

export const PatentFundingUnitUpdateWithoutFundingUnitInputSchema: z.ZodType<Prisma.PatentFundingUnitUpdateWithoutFundingUnitInput> = z.object({
  ProjectCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patentFunding: z.lazy(() => PatentFundingUpdateOneRequiredWithoutPatentFundingUnitsNestedInputSchema).optional()
}).strict();

export const PatentFundingUnitUncheckedUpdateWithoutFundingUnitInputSchema: z.ZodType<Prisma.PatentFundingUnitUncheckedUpdateWithoutFundingUnitInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentFundingUnitUncheckedUpdateManyWithoutFundingUnitInputSchema: z.ZodType<Prisma.PatentFundingUnitUncheckedUpdateManyWithoutFundingUnitInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingRecordUpdateWithoutCanFundingByInputSchema: z.ZodType<Prisma.FundingRecordUpdateWithoutCanFundingByInput> = z.object({
  Amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  patentFunding: z.lazy(() => PatentFundingUpdateOneRequiredWithoutFundingRecordsNestedInputSchema).optional()
}).strict();

export const FundingRecordUncheckedUpdateWithoutCanFundingByInputSchema: z.ZodType<Prisma.FundingRecordUncheckedUpdateWithoutCanFundingByInput> = z.object({
  FundingRecordID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentFundingPatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingRecordUncheckedUpdateManyWithoutCanFundingByInputSchema: z.ZodType<Prisma.FundingRecordUncheckedUpdateManyWithoutCanFundingByInput> = z.object({
  FundingRecordID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  PatentFundingPatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingRecordCreateManyPatentFundingInputSchema: z.ZodType<Prisma.FundingRecordCreateManyPatentFundingInput> = z.object({
  FundingRecordID: z.number().int().optional(),
  Amount: z.number()
}).strict();

export const PatentFundingUnitCreateManyPatentFundingInputSchema: z.ZodType<Prisma.PatentFundingUnitCreateManyPatentFundingInput> = z.object({
  FundingUnitID: z.number().int(),
  ProjectCode: z.string()
}).strict();

export const FundingRecordUpdateWithoutPatentFundingInputSchema: z.ZodType<Prisma.FundingRecordUpdateWithoutPatentFundingInput> = z.object({
  Amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  canFundingBy: z.lazy(() => FundingUnitUpdateManyWithoutFundingRecordNestedInputSchema).optional()
}).strict();

export const FundingRecordUncheckedUpdateWithoutPatentFundingInputSchema: z.ZodType<Prisma.FundingRecordUncheckedUpdateWithoutPatentFundingInput> = z.object({
  FundingRecordID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  canFundingBy: z.lazy(() => FundingUnitUncheckedUpdateManyWithoutFundingRecordNestedInputSchema).optional()
}).strict();

export const FundingRecordUncheckedUpdateManyWithoutPatentFundingInputSchema: z.ZodType<Prisma.FundingRecordUncheckedUpdateManyWithoutPatentFundingInput> = z.object({
  FundingRecordID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentFundingUnitUpdateWithoutPatentFundingInputSchema: z.ZodType<Prisma.PatentFundingUnitUpdateWithoutPatentFundingInput> = z.object({
  ProjectCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fundingUnit: z.lazy(() => FundingUnitUpdateOneRequiredWithoutPatentFundingUnitNestedInputSchema).optional()
}).strict();

export const PatentFundingUnitUncheckedUpdateWithoutPatentFundingInputSchema: z.ZodType<Prisma.PatentFundingUnitUncheckedUpdateWithoutPatentFundingInput> = z.object({
  FundingUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentFundingUnitUncheckedUpdateManyWithoutPatentFundingInputSchema: z.ZodType<Prisma.PatentFundingUnitUncheckedUpdateManyWithoutPatentFundingInput> = z.object({
  FundingUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ProjectCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundingUnitUpdateWithoutFundingRecordInputSchema: z.ZodType<Prisma.FundingUnitUpdateWithoutFundingRecordInput> = z.object({
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentFundingUnit: z.lazy(() => PatentFundingUnitUpdateManyWithoutFundingUnitNestedInputSchema).optional()
}).strict();

export const FundingUnitUncheckedUpdateWithoutFundingRecordInputSchema: z.ZodType<Prisma.FundingUnitUncheckedUpdateWithoutFundingRecordInput> = z.object({
  FundingUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentFundingUnit: z.lazy(() => PatentFundingUnitUncheckedUpdateManyWithoutFundingUnitNestedInputSchema).optional()
}).strict();

export const FundingUnitUncheckedUpdateManyWithoutFundingRecordInputSchema: z.ZodType<Prisma.FundingUnitUncheckedUpdateManyWithoutFundingRecordInput> = z.object({
  FundingUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const PatentInventorCreateManyPatentInputSchema: z.ZodType<Prisma.PatentInventorCreateManyPatentInput> = z.object({
  InventorID: z.number().int(),
  Main: z.boolean(),
  Contribution: z.number().optional().nullable()
}).strict();

export const PatentManualStatusCreateManyPatentInputSchema: z.ZodType<Prisma.PatentManualStatusCreateManyPatentInput> = z.object({
  ManualStatusID: z.number().int().optional(),
  Reason: z.string(),
  Date: z.coerce.date().optional().nullable(),
  Active: z.boolean()
}).strict();

export const PatentMaintenanceCreateManyPatentInputSchema: z.ZodType<Prisma.PatentMaintenanceCreateManyPatentInput> = z.object({
  MaintenanceID: z.number().int().optional(),
  MaintenanceDate: z.coerce.date(),
  ExpireDate: z.coerce.date()
}).strict();

export const PatentRecordCreateManyPatentInputSchema: z.ZodType<Prisma.PatentRecordCreateManyPatentInput> = z.object({
  id: z.number().int().optional(),
  Record: z.string().optional().nullable(),
  Date: z.coerce.date().optional().nullable()
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

export const PatentManualStatusUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentManualStatusUpdateWithoutPatentInput> = z.object({
  Reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentManualStatusUncheckedUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentManualStatusUncheckedUpdateWithoutPatentInput> = z.object({
  ManualStatusID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentManualStatusUncheckedUpdateManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentManualStatusUncheckedUpdateManyWithoutPatentInput> = z.object({
  ManualStatusID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentMaintenanceUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentMaintenanceUpdateWithoutPatentInput> = z.object({
  MaintenanceDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ExpireDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentMaintenanceUncheckedUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentMaintenanceUncheckedUpdateWithoutPatentInput> = z.object({
  MaintenanceID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  MaintenanceDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ExpireDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentMaintenanceUncheckedUpdateManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentMaintenanceUncheckedUpdateManyWithoutPatentInput> = z.object({
  MaintenanceID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  MaintenanceDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ExpireDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentRecordUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentRecordUpdateWithoutPatentInput> = z.object({
  Record: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentRecordUncheckedUpdateWithoutPatentInputSchema: z.ZodType<Prisma.PatentRecordUncheckedUpdateWithoutPatentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Record: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatentRecordUncheckedUpdateManyWithoutPatentInputSchema: z.ZodType<Prisma.PatentRecordUncheckedUpdateManyWithoutPatentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Record: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const PatentInitiatorAgencyUnitCreateManyPatentInternalInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateManyPatentInternalInput> = z.object({
  AgencyUnitID: z.number().int(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentTakerAgencyUnitCreateManyPatentInternalInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateManyPatentInternalInput> = z.object({
  AgencyUnitID: z.number().int(),
  FileCode: z.string(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitUpdateWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpdateWithoutPatentInternalInput> = z.object({
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  agencyUnit: z.lazy(() => AgencyUnitUpdateOneRequiredWithoutInitialReviewPatentsNestedInputSchema).optional()
}).strict();

export const PatentInitiatorAgencyUnitUncheckedUpdateWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUncheckedUpdateWithoutPatentInternalInput> = z.object({
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUncheckedUpdateManyWithoutPatentInternalInput> = z.object({
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentTakerAgencyUnitUpdateWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpdateWithoutPatentInternalInput> = z.object({
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  agencyUnit: z.lazy(() => AgencyUnitUpdateOneRequiredWithoutTakerPatentsNestedInputSchema).optional()
}).strict();

export const PatentTakerAgencyUnitUncheckedUpdateWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUncheckedUpdateWithoutPatentInternalInput> = z.object({
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const PatentTakerAgencyUnitUncheckedUpdateManyWithoutPatentInternalInputSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUncheckedUpdateManyWithoutPatentInternalInput> = z.object({
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  FileCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  agencyUnitPersonIds: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const DepartmentCreateManyCollegeInputSchema: z.ZodType<Prisma.DepartmentCreateManyCollegeInput> = z.object({
  DepartmentID: z.number().int().optional(),
  Name: z.string(),
  Description: z.string().optional().nullable()
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

export const InventorCreateManyDepartmentInputSchema: z.ZodType<Prisma.InventorCreateManyDepartmentInput> = z.object({
  InventorID: z.number().int().optional(),
  ContactInfoID: z.number().int()
}).strict();

export const PatentCreateManyDepartmentInputSchema: z.ZodType<Prisma.PatentCreateManyDepartmentInput> = z.object({
  PatentID: z.number().int().optional(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  CountryID: z.number().int().optional().nullable(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const InventorUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorUpdateWithoutDepartmentInput> = z.object({
  contactInfo: z.lazy(() => ContactInfoUpdateOneRequiredWithoutInventorNestedInputSchema).optional(),
  patents: z.lazy(() => PatentInventorUpdateManyWithoutInventorNestedInputSchema).optional()
}).strict();

export const InventorUncheckedUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateWithoutDepartmentInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patents: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutInventorNestedInputSchema).optional()
}).strict();

export const InventorUncheckedUpdateManyWithoutDepartmentInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateManyWithoutDepartmentInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ContactInfoID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentUpdateWithoutDepartmentInput> = z.object({
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneWithoutPatentsNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutDepartmentInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateManyWithoutDepartmentInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateManyWithoutDepartmentInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CountryID: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatentCreateManyCountryInputSchema: z.ZodType<Prisma.PatentCreateManyCountryInput> = z.object({
  PatentID: z.number().int().optional(),
  DepartmentID: z.number().int(),
  Year: z.number().int(),
  DraftTitle: z.string().optional(),
  Title: z.string().optional(),
  TitleEnglish: z.string().optional(),
  PatentType: z.lazy(() => EnumPatentTypeSchema).optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PatentUpdateWithoutCountryInputSchema: z.ZodType<Prisma.PatentUpdateWithoutCountryInput> = z.object({
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPatentsNestedInputSchema).optional(),
  inventors: z.lazy(() => PatentInventorUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateWithoutCountryInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateWithoutCountryInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventors: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  application: z.lazy(() => PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  funding: z.lazy(() => PatentFundingUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  manualStatus: z.lazy(() => PatentManualStatusUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  maintenances: z.lazy(() => PatentMaintenanceUncheckedUpdateManyWithoutPatentNestedInputSchema).optional(),
  technical: z.lazy(() => PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  internal: z.lazy(() => PatentInternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  external: z.lazy(() => PatentExternalUncheckedUpdateOneWithoutPatentNestedInputSchema).optional(),
  patentRecords: z.lazy(() => PatentRecordUncheckedUpdateManyWithoutPatentNestedInputSchema).optional()
}).strict();

export const PatentUncheckedUpdateManyWithoutCountryInputSchema: z.ZodType<Prisma.PatentUncheckedUpdateManyWithoutCountryInput> = z.object({
  PatentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DraftTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  TitleEnglish: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PatentType: z.union([ z.lazy(() => EnumPatentTypeSchema),z.lazy(() => NullableEnumEnumPatentTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AgencyUnitPersonCreateManyContactInfoInputSchema: z.ZodType<Prisma.AgencyUnitPersonCreateManyContactInfoInput> = z.object({
  AgencyUnitID: z.number().int()
}).strict();

export const InventorCreateManyContactInfoInputSchema: z.ZodType<Prisma.InventorCreateManyContactInfoInput> = z.object({
  InventorID: z.number().int().optional(),
  DepartmentID: z.number().int()
}).strict();

export const AgencyUnitPersonUpdateWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyUnitPersonUpdateWithoutContactInfoInput> = z.object({
  agencyUnit: z.lazy(() => AgencyUnitUpdateOneRequiredWithoutPersonsNestedInputSchema).optional()
}).strict();

export const AgencyUnitPersonUncheckedUpdateWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyUnitPersonUncheckedUpdateWithoutContactInfoInput> = z.object({
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AgencyUnitPersonUncheckedUpdateManyWithoutContactInfoInputSchema: z.ZodType<Prisma.AgencyUnitPersonUncheckedUpdateManyWithoutContactInfoInput> = z.object({
  AgencyUnitID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InventorUpdateWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUpdateWithoutContactInfoInput> = z.object({
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutInventorsNestedInputSchema).optional(),
  patents: z.lazy(() => PatentInventorUpdateManyWithoutInventorNestedInputSchema).optional()
}).strict();

export const InventorUncheckedUpdateWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateWithoutContactInfoInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patents: z.lazy(() => PatentInventorUncheckedUpdateManyWithoutInventorNestedInputSchema).optional()
}).strict();

export const InventorUncheckedUpdateManyWithoutContactInfoInputSchema: z.ZodType<Prisma.InventorUncheckedUpdateManyWithoutContactInfoInput> = z.object({
  InventorID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  DepartmentID: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AgencyUnitFindFirstArgsSchema: z.ZodType<Prisma.AgencyUnitFindFirstArgs> = z.object({
  select: AgencyUnitSelectSchema.optional(),
  include: AgencyUnitIncludeSchema.optional(),
  where: AgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ AgencyUnitOrderByWithRelationInputSchema.array(),AgencyUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyUnitScalarFieldEnumSchema,AgencyUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyUnitFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AgencyUnitFindFirstOrThrowArgs> = z.object({
  select: AgencyUnitSelectSchema.optional(),
  include: AgencyUnitIncludeSchema.optional(),
  where: AgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ AgencyUnitOrderByWithRelationInputSchema.array(),AgencyUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyUnitScalarFieldEnumSchema,AgencyUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyUnitFindManyArgsSchema: z.ZodType<Prisma.AgencyUnitFindManyArgs> = z.object({
  select: AgencyUnitSelectSchema.optional(),
  include: AgencyUnitIncludeSchema.optional(),
  where: AgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ AgencyUnitOrderByWithRelationInputSchema.array(),AgencyUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyUnitScalarFieldEnumSchema,AgencyUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyUnitAggregateArgsSchema: z.ZodType<Prisma.AgencyUnitAggregateArgs> = z.object({
  where: AgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ AgencyUnitOrderByWithRelationInputSchema.array(),AgencyUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AgencyUnitGroupByArgsSchema: z.ZodType<Prisma.AgencyUnitGroupByArgs> = z.object({
  where: AgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ AgencyUnitOrderByWithAggregationInputSchema.array(),AgencyUnitOrderByWithAggregationInputSchema ]).optional(),
  by: AgencyUnitScalarFieldEnumSchema.array(),
  having: AgencyUnitScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AgencyUnitFindUniqueArgsSchema: z.ZodType<Prisma.AgencyUnitFindUniqueArgs> = z.object({
  select: AgencyUnitSelectSchema.optional(),
  include: AgencyUnitIncludeSchema.optional(),
  where: AgencyUnitWhereUniqueInputSchema,
}).strict() ;

export const AgencyUnitFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AgencyUnitFindUniqueOrThrowArgs> = z.object({
  select: AgencyUnitSelectSchema.optional(),
  include: AgencyUnitIncludeSchema.optional(),
  where: AgencyUnitWhereUniqueInputSchema,
}).strict() ;

export const PatentTakerAgencyUnitFindFirstArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitFindFirstArgs> = z.object({
  select: PatentTakerAgencyUnitSelectSchema.optional(),
  include: PatentTakerAgencyUnitIncludeSchema.optional(),
  where: PatentTakerAgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentTakerAgencyUnitOrderByWithRelationInputSchema.array(),PatentTakerAgencyUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentTakerAgencyUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentTakerAgencyUnitScalarFieldEnumSchema,PatentTakerAgencyUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentTakerAgencyUnitFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitFindFirstOrThrowArgs> = z.object({
  select: PatentTakerAgencyUnitSelectSchema.optional(),
  include: PatentTakerAgencyUnitIncludeSchema.optional(),
  where: PatentTakerAgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentTakerAgencyUnitOrderByWithRelationInputSchema.array(),PatentTakerAgencyUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentTakerAgencyUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentTakerAgencyUnitScalarFieldEnumSchema,PatentTakerAgencyUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentTakerAgencyUnitFindManyArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitFindManyArgs> = z.object({
  select: PatentTakerAgencyUnitSelectSchema.optional(),
  include: PatentTakerAgencyUnitIncludeSchema.optional(),
  where: PatentTakerAgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentTakerAgencyUnitOrderByWithRelationInputSchema.array(),PatentTakerAgencyUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentTakerAgencyUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentTakerAgencyUnitScalarFieldEnumSchema,PatentTakerAgencyUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentTakerAgencyUnitAggregateArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitAggregateArgs> = z.object({
  where: PatentTakerAgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentTakerAgencyUnitOrderByWithRelationInputSchema.array(),PatentTakerAgencyUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentTakerAgencyUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentTakerAgencyUnitGroupByArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitGroupByArgs> = z.object({
  where: PatentTakerAgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentTakerAgencyUnitOrderByWithAggregationInputSchema.array(),PatentTakerAgencyUnitOrderByWithAggregationInputSchema ]).optional(),
  by: PatentTakerAgencyUnitScalarFieldEnumSchema.array(),
  having: PatentTakerAgencyUnitScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentTakerAgencyUnitFindUniqueArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitFindUniqueArgs> = z.object({
  select: PatentTakerAgencyUnitSelectSchema.optional(),
  include: PatentTakerAgencyUnitIncludeSchema.optional(),
  where: PatentTakerAgencyUnitWhereUniqueInputSchema,
}).strict() ;

export const PatentTakerAgencyUnitFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitFindUniqueOrThrowArgs> = z.object({
  select: PatentTakerAgencyUnitSelectSchema.optional(),
  include: PatentTakerAgencyUnitIncludeSchema.optional(),
  where: PatentTakerAgencyUnitWhereUniqueInputSchema,
}).strict() ;

export const PatentInitiatorAgencyUnitFindFirstArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitFindFirstArgs> = z.object({
  select: PatentInitiatorAgencyUnitSelectSchema.optional(),
  include: PatentInitiatorAgencyUnitIncludeSchema.optional(),
  where: PatentInitiatorAgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentInitiatorAgencyUnitOrderByWithRelationInputSchema.array(),PatentInitiatorAgencyUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentInitiatorAgencyUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentInitiatorAgencyUnitScalarFieldEnumSchema,PatentInitiatorAgencyUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentInitiatorAgencyUnitFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitFindFirstOrThrowArgs> = z.object({
  select: PatentInitiatorAgencyUnitSelectSchema.optional(),
  include: PatentInitiatorAgencyUnitIncludeSchema.optional(),
  where: PatentInitiatorAgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentInitiatorAgencyUnitOrderByWithRelationInputSchema.array(),PatentInitiatorAgencyUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentInitiatorAgencyUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentInitiatorAgencyUnitScalarFieldEnumSchema,PatentInitiatorAgencyUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentInitiatorAgencyUnitFindManyArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitFindManyArgs> = z.object({
  select: PatentInitiatorAgencyUnitSelectSchema.optional(),
  include: PatentInitiatorAgencyUnitIncludeSchema.optional(),
  where: PatentInitiatorAgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentInitiatorAgencyUnitOrderByWithRelationInputSchema.array(),PatentInitiatorAgencyUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentInitiatorAgencyUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentInitiatorAgencyUnitScalarFieldEnumSchema,PatentInitiatorAgencyUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentInitiatorAgencyUnitAggregateArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitAggregateArgs> = z.object({
  where: PatentInitiatorAgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentInitiatorAgencyUnitOrderByWithRelationInputSchema.array(),PatentInitiatorAgencyUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentInitiatorAgencyUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentInitiatorAgencyUnitGroupByArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitGroupByArgs> = z.object({
  where: PatentInitiatorAgencyUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentInitiatorAgencyUnitOrderByWithAggregationInputSchema.array(),PatentInitiatorAgencyUnitOrderByWithAggregationInputSchema ]).optional(),
  by: PatentInitiatorAgencyUnitScalarFieldEnumSchema.array(),
  having: PatentInitiatorAgencyUnitScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentInitiatorAgencyUnitFindUniqueArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitFindUniqueArgs> = z.object({
  select: PatentInitiatorAgencyUnitSelectSchema.optional(),
  include: PatentInitiatorAgencyUnitIncludeSchema.optional(),
  where: PatentInitiatorAgencyUnitWhereUniqueInputSchema,
}).strict() ;

export const PatentInitiatorAgencyUnitFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitFindUniqueOrThrowArgs> = z.object({
  select: PatentInitiatorAgencyUnitSelectSchema.optional(),
  include: PatentInitiatorAgencyUnitIncludeSchema.optional(),
  where: PatentInitiatorAgencyUnitWhereUniqueInputSchema,
}).strict() ;

export const AgencyUnitPersonFindFirstArgsSchema: z.ZodType<Prisma.AgencyUnitPersonFindFirstArgs> = z.object({
  select: AgencyUnitPersonSelectSchema.optional(),
  include: AgencyUnitPersonIncludeSchema.optional(),
  where: AgencyUnitPersonWhereInputSchema.optional(),
  orderBy: z.union([ AgencyUnitPersonOrderByWithRelationInputSchema.array(),AgencyUnitPersonOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyUnitPersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyUnitPersonScalarFieldEnumSchema,AgencyUnitPersonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyUnitPersonFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AgencyUnitPersonFindFirstOrThrowArgs> = z.object({
  select: AgencyUnitPersonSelectSchema.optional(),
  include: AgencyUnitPersonIncludeSchema.optional(),
  where: AgencyUnitPersonWhereInputSchema.optional(),
  orderBy: z.union([ AgencyUnitPersonOrderByWithRelationInputSchema.array(),AgencyUnitPersonOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyUnitPersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyUnitPersonScalarFieldEnumSchema,AgencyUnitPersonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyUnitPersonFindManyArgsSchema: z.ZodType<Prisma.AgencyUnitPersonFindManyArgs> = z.object({
  select: AgencyUnitPersonSelectSchema.optional(),
  include: AgencyUnitPersonIncludeSchema.optional(),
  where: AgencyUnitPersonWhereInputSchema.optional(),
  orderBy: z.union([ AgencyUnitPersonOrderByWithRelationInputSchema.array(),AgencyUnitPersonOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyUnitPersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AgencyUnitPersonScalarFieldEnumSchema,AgencyUnitPersonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AgencyUnitPersonAggregateArgsSchema: z.ZodType<Prisma.AgencyUnitPersonAggregateArgs> = z.object({
  where: AgencyUnitPersonWhereInputSchema.optional(),
  orderBy: z.union([ AgencyUnitPersonOrderByWithRelationInputSchema.array(),AgencyUnitPersonOrderByWithRelationInputSchema ]).optional(),
  cursor: AgencyUnitPersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AgencyUnitPersonGroupByArgsSchema: z.ZodType<Prisma.AgencyUnitPersonGroupByArgs> = z.object({
  where: AgencyUnitPersonWhereInputSchema.optional(),
  orderBy: z.union([ AgencyUnitPersonOrderByWithAggregationInputSchema.array(),AgencyUnitPersonOrderByWithAggregationInputSchema ]).optional(),
  by: AgencyUnitPersonScalarFieldEnumSchema.array(),
  having: AgencyUnitPersonScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AgencyUnitPersonFindUniqueArgsSchema: z.ZodType<Prisma.AgencyUnitPersonFindUniqueArgs> = z.object({
  select: AgencyUnitPersonSelectSchema.optional(),
  include: AgencyUnitPersonIncludeSchema.optional(),
  where: AgencyUnitPersonWhereUniqueInputSchema,
}).strict() ;

export const AgencyUnitPersonFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AgencyUnitPersonFindUniqueOrThrowArgs> = z.object({
  select: AgencyUnitPersonSelectSchema.optional(),
  include: AgencyUnitPersonIncludeSchema.optional(),
  where: AgencyUnitPersonWhereUniqueInputSchema,
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

export const FundingUnitFindFirstArgsSchema: z.ZodType<Prisma.FundingUnitFindFirstArgs> = z.object({
  select: FundingUnitSelectSchema.optional(),
  include: FundingUnitIncludeSchema.optional(),
  where: FundingUnitWhereInputSchema.optional(),
  orderBy: z.union([ FundingUnitOrderByWithRelationInputSchema.array(),FundingUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: FundingUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FundingUnitScalarFieldEnumSchema,FundingUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FundingUnitFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FundingUnitFindFirstOrThrowArgs> = z.object({
  select: FundingUnitSelectSchema.optional(),
  include: FundingUnitIncludeSchema.optional(),
  where: FundingUnitWhereInputSchema.optional(),
  orderBy: z.union([ FundingUnitOrderByWithRelationInputSchema.array(),FundingUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: FundingUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FundingUnitScalarFieldEnumSchema,FundingUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FundingUnitFindManyArgsSchema: z.ZodType<Prisma.FundingUnitFindManyArgs> = z.object({
  select: FundingUnitSelectSchema.optional(),
  include: FundingUnitIncludeSchema.optional(),
  where: FundingUnitWhereInputSchema.optional(),
  orderBy: z.union([ FundingUnitOrderByWithRelationInputSchema.array(),FundingUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: FundingUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FundingUnitScalarFieldEnumSchema,FundingUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FundingUnitAggregateArgsSchema: z.ZodType<Prisma.FundingUnitAggregateArgs> = z.object({
  where: FundingUnitWhereInputSchema.optional(),
  orderBy: z.union([ FundingUnitOrderByWithRelationInputSchema.array(),FundingUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: FundingUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FundingUnitGroupByArgsSchema: z.ZodType<Prisma.FundingUnitGroupByArgs> = z.object({
  where: FundingUnitWhereInputSchema.optional(),
  orderBy: z.union([ FundingUnitOrderByWithAggregationInputSchema.array(),FundingUnitOrderByWithAggregationInputSchema ]).optional(),
  by: FundingUnitScalarFieldEnumSchema.array(),
  having: FundingUnitScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FundingUnitFindUniqueArgsSchema: z.ZodType<Prisma.FundingUnitFindUniqueArgs> = z.object({
  select: FundingUnitSelectSchema.optional(),
  include: FundingUnitIncludeSchema.optional(),
  where: FundingUnitWhereUniqueInputSchema,
}).strict() ;

export const FundingUnitFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FundingUnitFindUniqueOrThrowArgs> = z.object({
  select: FundingUnitSelectSchema.optional(),
  include: FundingUnitIncludeSchema.optional(),
  where: FundingUnitWhereUniqueInputSchema,
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

export const FundingRecordFindFirstArgsSchema: z.ZodType<Prisma.FundingRecordFindFirstArgs> = z.object({
  select: FundingRecordSelectSchema.optional(),
  include: FundingRecordIncludeSchema.optional(),
  where: FundingRecordWhereInputSchema.optional(),
  orderBy: z.union([ FundingRecordOrderByWithRelationInputSchema.array(),FundingRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: FundingRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FundingRecordScalarFieldEnumSchema,FundingRecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FundingRecordFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FundingRecordFindFirstOrThrowArgs> = z.object({
  select: FundingRecordSelectSchema.optional(),
  include: FundingRecordIncludeSchema.optional(),
  where: FundingRecordWhereInputSchema.optional(),
  orderBy: z.union([ FundingRecordOrderByWithRelationInputSchema.array(),FundingRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: FundingRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FundingRecordScalarFieldEnumSchema,FundingRecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FundingRecordFindManyArgsSchema: z.ZodType<Prisma.FundingRecordFindManyArgs> = z.object({
  select: FundingRecordSelectSchema.optional(),
  include: FundingRecordIncludeSchema.optional(),
  where: FundingRecordWhereInputSchema.optional(),
  orderBy: z.union([ FundingRecordOrderByWithRelationInputSchema.array(),FundingRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: FundingRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FundingRecordScalarFieldEnumSchema,FundingRecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FundingRecordAggregateArgsSchema: z.ZodType<Prisma.FundingRecordAggregateArgs> = z.object({
  where: FundingRecordWhereInputSchema.optional(),
  orderBy: z.union([ FundingRecordOrderByWithRelationInputSchema.array(),FundingRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: FundingRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FundingRecordGroupByArgsSchema: z.ZodType<Prisma.FundingRecordGroupByArgs> = z.object({
  where: FundingRecordWhereInputSchema.optional(),
  orderBy: z.union([ FundingRecordOrderByWithAggregationInputSchema.array(),FundingRecordOrderByWithAggregationInputSchema ]).optional(),
  by: FundingRecordScalarFieldEnumSchema.array(),
  having: FundingRecordScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FundingRecordFindUniqueArgsSchema: z.ZodType<Prisma.FundingRecordFindUniqueArgs> = z.object({
  select: FundingRecordSelectSchema.optional(),
  include: FundingRecordIncludeSchema.optional(),
  where: FundingRecordWhereUniqueInputSchema,
}).strict() ;

export const FundingRecordFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FundingRecordFindUniqueOrThrowArgs> = z.object({
  select: FundingRecordSelectSchema.optional(),
  include: FundingRecordIncludeSchema.optional(),
  where: FundingRecordWhereUniqueInputSchema,
}).strict() ;

export const PatentFundingUnitFindFirstArgsSchema: z.ZodType<Prisma.PatentFundingUnitFindFirstArgs> = z.object({
  select: PatentFundingUnitSelectSchema.optional(),
  include: PatentFundingUnitIncludeSchema.optional(),
  where: PatentFundingUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentFundingUnitOrderByWithRelationInputSchema.array(),PatentFundingUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentFundingUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentFundingUnitScalarFieldEnumSchema,PatentFundingUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentFundingUnitFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentFundingUnitFindFirstOrThrowArgs> = z.object({
  select: PatentFundingUnitSelectSchema.optional(),
  include: PatentFundingUnitIncludeSchema.optional(),
  where: PatentFundingUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentFundingUnitOrderByWithRelationInputSchema.array(),PatentFundingUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentFundingUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentFundingUnitScalarFieldEnumSchema,PatentFundingUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentFundingUnitFindManyArgsSchema: z.ZodType<Prisma.PatentFundingUnitFindManyArgs> = z.object({
  select: PatentFundingUnitSelectSchema.optional(),
  include: PatentFundingUnitIncludeSchema.optional(),
  where: PatentFundingUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentFundingUnitOrderByWithRelationInputSchema.array(),PatentFundingUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentFundingUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentFundingUnitScalarFieldEnumSchema,PatentFundingUnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentFundingUnitAggregateArgsSchema: z.ZodType<Prisma.PatentFundingUnitAggregateArgs> = z.object({
  where: PatentFundingUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentFundingUnitOrderByWithRelationInputSchema.array(),PatentFundingUnitOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentFundingUnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentFundingUnitGroupByArgsSchema: z.ZodType<Prisma.PatentFundingUnitGroupByArgs> = z.object({
  where: PatentFundingUnitWhereInputSchema.optional(),
  orderBy: z.union([ PatentFundingUnitOrderByWithAggregationInputSchema.array(),PatentFundingUnitOrderByWithAggregationInputSchema ]).optional(),
  by: PatentFundingUnitScalarFieldEnumSchema.array(),
  having: PatentFundingUnitScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentFundingUnitFindUniqueArgsSchema: z.ZodType<Prisma.PatentFundingUnitFindUniqueArgs> = z.object({
  select: PatentFundingUnitSelectSchema.optional(),
  include: PatentFundingUnitIncludeSchema.optional(),
  where: PatentFundingUnitWhereUniqueInputSchema,
}).strict() ;

export const PatentFundingUnitFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentFundingUnitFindUniqueOrThrowArgs> = z.object({
  select: PatentFundingUnitSelectSchema.optional(),
  include: PatentFundingUnitIncludeSchema.optional(),
  where: PatentFundingUnitWhereUniqueInputSchema,
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

export const NoteFindFirstArgsSchema: z.ZodType<Prisma.NoteFindFirstArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NoteScalarFieldEnumSchema,NoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NoteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NoteFindFirstOrThrowArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NoteScalarFieldEnumSchema,NoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NoteFindManyArgsSchema: z.ZodType<Prisma.NoteFindManyArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NoteScalarFieldEnumSchema,NoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NoteAggregateArgsSchema: z.ZodType<Prisma.NoteAggregateArgs> = z.object({
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NoteGroupByArgsSchema: z.ZodType<Prisma.NoteGroupByArgs> = z.object({
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithAggregationInputSchema.array(),NoteOrderByWithAggregationInputSchema ]).optional(),
  by: NoteScalarFieldEnumSchema.array(),
  having: NoteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NoteFindUniqueArgsSchema: z.ZodType<Prisma.NoteFindUniqueArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereUniqueInputSchema,
}).strict() ;

export const NoteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NoteFindUniqueOrThrowArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereUniqueInputSchema,
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

export const PatentInternalFindFirstArgsSchema: z.ZodType<Prisma.PatentInternalFindFirstArgs> = z.object({
  select: PatentInternalSelectSchema.optional(),
  include: PatentInternalIncludeSchema.optional(),
  where: PatentInternalWhereInputSchema.optional(),
  orderBy: z.union([ PatentInternalOrderByWithRelationInputSchema.array(),PatentInternalOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentInternalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentInternalScalarFieldEnumSchema,PatentInternalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentInternalFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentInternalFindFirstOrThrowArgs> = z.object({
  select: PatentInternalSelectSchema.optional(),
  include: PatentInternalIncludeSchema.optional(),
  where: PatentInternalWhereInputSchema.optional(),
  orderBy: z.union([ PatentInternalOrderByWithRelationInputSchema.array(),PatentInternalOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentInternalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentInternalScalarFieldEnumSchema,PatentInternalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentInternalFindManyArgsSchema: z.ZodType<Prisma.PatentInternalFindManyArgs> = z.object({
  select: PatentInternalSelectSchema.optional(),
  include: PatentInternalIncludeSchema.optional(),
  where: PatentInternalWhereInputSchema.optional(),
  orderBy: z.union([ PatentInternalOrderByWithRelationInputSchema.array(),PatentInternalOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentInternalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentInternalScalarFieldEnumSchema,PatentInternalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentInternalAggregateArgsSchema: z.ZodType<Prisma.PatentInternalAggregateArgs> = z.object({
  where: PatentInternalWhereInputSchema.optional(),
  orderBy: z.union([ PatentInternalOrderByWithRelationInputSchema.array(),PatentInternalOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentInternalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentInternalGroupByArgsSchema: z.ZodType<Prisma.PatentInternalGroupByArgs> = z.object({
  where: PatentInternalWhereInputSchema.optional(),
  orderBy: z.union([ PatentInternalOrderByWithAggregationInputSchema.array(),PatentInternalOrderByWithAggregationInputSchema ]).optional(),
  by: PatentInternalScalarFieldEnumSchema.array(),
  having: PatentInternalScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentInternalFindUniqueArgsSchema: z.ZodType<Prisma.PatentInternalFindUniqueArgs> = z.object({
  select: PatentInternalSelectSchema.optional(),
  include: PatentInternalIncludeSchema.optional(),
  where: PatentInternalWhereUniqueInputSchema,
}).strict() ;

export const PatentInternalFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentInternalFindUniqueOrThrowArgs> = z.object({
  select: PatentInternalSelectSchema.optional(),
  include: PatentInternalIncludeSchema.optional(),
  where: PatentInternalWhereUniqueInputSchema,
}).strict() ;

export const PatentExternalFindFirstArgsSchema: z.ZodType<Prisma.PatentExternalFindFirstArgs> = z.object({
  select: PatentExternalSelectSchema.optional(),
  include: PatentExternalIncludeSchema.optional(),
  where: PatentExternalWhereInputSchema.optional(),
  orderBy: z.union([ PatentExternalOrderByWithRelationInputSchema.array(),PatentExternalOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentExternalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentExternalScalarFieldEnumSchema,PatentExternalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentExternalFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentExternalFindFirstOrThrowArgs> = z.object({
  select: PatentExternalSelectSchema.optional(),
  include: PatentExternalIncludeSchema.optional(),
  where: PatentExternalWhereInputSchema.optional(),
  orderBy: z.union([ PatentExternalOrderByWithRelationInputSchema.array(),PatentExternalOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentExternalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentExternalScalarFieldEnumSchema,PatentExternalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentExternalFindManyArgsSchema: z.ZodType<Prisma.PatentExternalFindManyArgs> = z.object({
  select: PatentExternalSelectSchema.optional(),
  include: PatentExternalIncludeSchema.optional(),
  where: PatentExternalWhereInputSchema.optional(),
  orderBy: z.union([ PatentExternalOrderByWithRelationInputSchema.array(),PatentExternalOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentExternalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentExternalScalarFieldEnumSchema,PatentExternalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentExternalAggregateArgsSchema: z.ZodType<Prisma.PatentExternalAggregateArgs> = z.object({
  where: PatentExternalWhereInputSchema.optional(),
  orderBy: z.union([ PatentExternalOrderByWithRelationInputSchema.array(),PatentExternalOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentExternalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentExternalGroupByArgsSchema: z.ZodType<Prisma.PatentExternalGroupByArgs> = z.object({
  where: PatentExternalWhereInputSchema.optional(),
  orderBy: z.union([ PatentExternalOrderByWithAggregationInputSchema.array(),PatentExternalOrderByWithAggregationInputSchema ]).optional(),
  by: PatentExternalScalarFieldEnumSchema.array(),
  having: PatentExternalScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentExternalFindUniqueArgsSchema: z.ZodType<Prisma.PatentExternalFindUniqueArgs> = z.object({
  select: PatentExternalSelectSchema.optional(),
  include: PatentExternalIncludeSchema.optional(),
  where: PatentExternalWhereUniqueInputSchema,
}).strict() ;

export const PatentExternalFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentExternalFindUniqueOrThrowArgs> = z.object({
  select: PatentExternalSelectSchema.optional(),
  include: PatentExternalIncludeSchema.optional(),
  where: PatentExternalWhereUniqueInputSchema,
}).strict() ;

export const PatentManualStatusFindFirstArgsSchema: z.ZodType<Prisma.PatentManualStatusFindFirstArgs> = z.object({
  select: PatentManualStatusSelectSchema.optional(),
  include: PatentManualStatusIncludeSchema.optional(),
  where: PatentManualStatusWhereInputSchema.optional(),
  orderBy: z.union([ PatentManualStatusOrderByWithRelationInputSchema.array(),PatentManualStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentManualStatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentManualStatusScalarFieldEnumSchema,PatentManualStatusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentManualStatusFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentManualStatusFindFirstOrThrowArgs> = z.object({
  select: PatentManualStatusSelectSchema.optional(),
  include: PatentManualStatusIncludeSchema.optional(),
  where: PatentManualStatusWhereInputSchema.optional(),
  orderBy: z.union([ PatentManualStatusOrderByWithRelationInputSchema.array(),PatentManualStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentManualStatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentManualStatusScalarFieldEnumSchema,PatentManualStatusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentManualStatusFindManyArgsSchema: z.ZodType<Prisma.PatentManualStatusFindManyArgs> = z.object({
  select: PatentManualStatusSelectSchema.optional(),
  include: PatentManualStatusIncludeSchema.optional(),
  where: PatentManualStatusWhereInputSchema.optional(),
  orderBy: z.union([ PatentManualStatusOrderByWithRelationInputSchema.array(),PatentManualStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentManualStatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentManualStatusScalarFieldEnumSchema,PatentManualStatusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentManualStatusAggregateArgsSchema: z.ZodType<Prisma.PatentManualStatusAggregateArgs> = z.object({
  where: PatentManualStatusWhereInputSchema.optional(),
  orderBy: z.union([ PatentManualStatusOrderByWithRelationInputSchema.array(),PatentManualStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentManualStatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentManualStatusGroupByArgsSchema: z.ZodType<Prisma.PatentManualStatusGroupByArgs> = z.object({
  where: PatentManualStatusWhereInputSchema.optional(),
  orderBy: z.union([ PatentManualStatusOrderByWithAggregationInputSchema.array(),PatentManualStatusOrderByWithAggregationInputSchema ]).optional(),
  by: PatentManualStatusScalarFieldEnumSchema.array(),
  having: PatentManualStatusScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentManualStatusFindUniqueArgsSchema: z.ZodType<Prisma.PatentManualStatusFindUniqueArgs> = z.object({
  select: PatentManualStatusSelectSchema.optional(),
  include: PatentManualStatusIncludeSchema.optional(),
  where: PatentManualStatusWhereUniqueInputSchema,
}).strict() ;

export const PatentManualStatusFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentManualStatusFindUniqueOrThrowArgs> = z.object({
  select: PatentManualStatusSelectSchema.optional(),
  include: PatentManualStatusIncludeSchema.optional(),
  where: PatentManualStatusWhereUniqueInputSchema,
}).strict() ;

export const PatentMaintenanceFindFirstArgsSchema: z.ZodType<Prisma.PatentMaintenanceFindFirstArgs> = z.object({
  select: PatentMaintenanceSelectSchema.optional(),
  include: PatentMaintenanceIncludeSchema.optional(),
  where: PatentMaintenanceWhereInputSchema.optional(),
  orderBy: z.union([ PatentMaintenanceOrderByWithRelationInputSchema.array(),PatentMaintenanceOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentMaintenanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentMaintenanceScalarFieldEnumSchema,PatentMaintenanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentMaintenanceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentMaintenanceFindFirstOrThrowArgs> = z.object({
  select: PatentMaintenanceSelectSchema.optional(),
  include: PatentMaintenanceIncludeSchema.optional(),
  where: PatentMaintenanceWhereInputSchema.optional(),
  orderBy: z.union([ PatentMaintenanceOrderByWithRelationInputSchema.array(),PatentMaintenanceOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentMaintenanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentMaintenanceScalarFieldEnumSchema,PatentMaintenanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentMaintenanceFindManyArgsSchema: z.ZodType<Prisma.PatentMaintenanceFindManyArgs> = z.object({
  select: PatentMaintenanceSelectSchema.optional(),
  include: PatentMaintenanceIncludeSchema.optional(),
  where: PatentMaintenanceWhereInputSchema.optional(),
  orderBy: z.union([ PatentMaintenanceOrderByWithRelationInputSchema.array(),PatentMaintenanceOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentMaintenanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentMaintenanceScalarFieldEnumSchema,PatentMaintenanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentMaintenanceAggregateArgsSchema: z.ZodType<Prisma.PatentMaintenanceAggregateArgs> = z.object({
  where: PatentMaintenanceWhereInputSchema.optional(),
  orderBy: z.union([ PatentMaintenanceOrderByWithRelationInputSchema.array(),PatentMaintenanceOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentMaintenanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentMaintenanceGroupByArgsSchema: z.ZodType<Prisma.PatentMaintenanceGroupByArgs> = z.object({
  where: PatentMaintenanceWhereInputSchema.optional(),
  orderBy: z.union([ PatentMaintenanceOrderByWithAggregationInputSchema.array(),PatentMaintenanceOrderByWithAggregationInputSchema ]).optional(),
  by: PatentMaintenanceScalarFieldEnumSchema.array(),
  having: PatentMaintenanceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentMaintenanceFindUniqueArgsSchema: z.ZodType<Prisma.PatentMaintenanceFindUniqueArgs> = z.object({
  select: PatentMaintenanceSelectSchema.optional(),
  include: PatentMaintenanceIncludeSchema.optional(),
  where: PatentMaintenanceWhereUniqueInputSchema,
}).strict() ;

export const PatentMaintenanceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentMaintenanceFindUniqueOrThrowArgs> = z.object({
  select: PatentMaintenanceSelectSchema.optional(),
  include: PatentMaintenanceIncludeSchema.optional(),
  where: PatentMaintenanceWhereUniqueInputSchema,
}).strict() ;

export const PatentRecordFindFirstArgsSchema: z.ZodType<Prisma.PatentRecordFindFirstArgs> = z.object({
  select: PatentRecordSelectSchema.optional(),
  include: PatentRecordIncludeSchema.optional(),
  where: PatentRecordWhereInputSchema.optional(),
  orderBy: z.union([ PatentRecordOrderByWithRelationInputSchema.array(),PatentRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentRecordScalarFieldEnumSchema,PatentRecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentRecordFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatentRecordFindFirstOrThrowArgs> = z.object({
  select: PatentRecordSelectSchema.optional(),
  include: PatentRecordIncludeSchema.optional(),
  where: PatentRecordWhereInputSchema.optional(),
  orderBy: z.union([ PatentRecordOrderByWithRelationInputSchema.array(),PatentRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentRecordScalarFieldEnumSchema,PatentRecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentRecordFindManyArgsSchema: z.ZodType<Prisma.PatentRecordFindManyArgs> = z.object({
  select: PatentRecordSelectSchema.optional(),
  include: PatentRecordIncludeSchema.optional(),
  where: PatentRecordWhereInputSchema.optional(),
  orderBy: z.union([ PatentRecordOrderByWithRelationInputSchema.array(),PatentRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatentRecordScalarFieldEnumSchema,PatentRecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatentRecordAggregateArgsSchema: z.ZodType<Prisma.PatentRecordAggregateArgs> = z.object({
  where: PatentRecordWhereInputSchema.optional(),
  orderBy: z.union([ PatentRecordOrderByWithRelationInputSchema.array(),PatentRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: PatentRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentRecordGroupByArgsSchema: z.ZodType<Prisma.PatentRecordGroupByArgs> = z.object({
  where: PatentRecordWhereInputSchema.optional(),
  orderBy: z.union([ PatentRecordOrderByWithAggregationInputSchema.array(),PatentRecordOrderByWithAggregationInputSchema ]).optional(),
  by: PatentRecordScalarFieldEnumSchema.array(),
  having: PatentRecordScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatentRecordFindUniqueArgsSchema: z.ZodType<Prisma.PatentRecordFindUniqueArgs> = z.object({
  select: PatentRecordSelectSchema.optional(),
  include: PatentRecordIncludeSchema.optional(),
  where: PatentRecordWhereUniqueInputSchema,
}).strict() ;

export const PatentRecordFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatentRecordFindUniqueOrThrowArgs> = z.object({
  select: PatentRecordSelectSchema.optional(),
  include: PatentRecordIncludeSchema.optional(),
  where: PatentRecordWhereUniqueInputSchema,
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

export const AgencyUnitCreateArgsSchema: z.ZodType<Prisma.AgencyUnitCreateArgs> = z.object({
  select: AgencyUnitSelectSchema.optional(),
  include: AgencyUnitIncludeSchema.optional(),
  data: z.union([ AgencyUnitCreateInputSchema,AgencyUnitUncheckedCreateInputSchema ]),
}).strict() ;

export const AgencyUnitUpsertArgsSchema: z.ZodType<Prisma.AgencyUnitUpsertArgs> = z.object({
  select: AgencyUnitSelectSchema.optional(),
  include: AgencyUnitIncludeSchema.optional(),
  where: AgencyUnitWhereUniqueInputSchema,
  create: z.union([ AgencyUnitCreateInputSchema,AgencyUnitUncheckedCreateInputSchema ]),
  update: z.union([ AgencyUnitUpdateInputSchema,AgencyUnitUncheckedUpdateInputSchema ]),
}).strict() ;

export const AgencyUnitCreateManyArgsSchema: z.ZodType<Prisma.AgencyUnitCreateManyArgs> = z.object({
  data: z.union([ AgencyUnitCreateManyInputSchema,AgencyUnitCreateManyInputSchema.array() ]),
}).strict() ;

export const AgencyUnitCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AgencyUnitCreateManyAndReturnArgs> = z.object({
  data: z.union([ AgencyUnitCreateManyInputSchema,AgencyUnitCreateManyInputSchema.array() ]),
}).strict() ;

export const AgencyUnitDeleteArgsSchema: z.ZodType<Prisma.AgencyUnitDeleteArgs> = z.object({
  select: AgencyUnitSelectSchema.optional(),
  include: AgencyUnitIncludeSchema.optional(),
  where: AgencyUnitWhereUniqueInputSchema,
}).strict() ;

export const AgencyUnitUpdateArgsSchema: z.ZodType<Prisma.AgencyUnitUpdateArgs> = z.object({
  select: AgencyUnitSelectSchema.optional(),
  include: AgencyUnitIncludeSchema.optional(),
  data: z.union([ AgencyUnitUpdateInputSchema,AgencyUnitUncheckedUpdateInputSchema ]),
  where: AgencyUnitWhereUniqueInputSchema,
}).strict() ;

export const AgencyUnitUpdateManyArgsSchema: z.ZodType<Prisma.AgencyUnitUpdateManyArgs> = z.object({
  data: z.union([ AgencyUnitUpdateManyMutationInputSchema,AgencyUnitUncheckedUpdateManyInputSchema ]),
  where: AgencyUnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AgencyUnitUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AgencyUnitUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AgencyUnitUpdateManyMutationInputSchema,AgencyUnitUncheckedUpdateManyInputSchema ]),
  where: AgencyUnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AgencyUnitDeleteManyArgsSchema: z.ZodType<Prisma.AgencyUnitDeleteManyArgs> = z.object({
  where: AgencyUnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentTakerAgencyUnitCreateArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateArgs> = z.object({
  select: PatentTakerAgencyUnitSelectSchema.optional(),
  include: PatentTakerAgencyUnitIncludeSchema.optional(),
  data: z.union([ PatentTakerAgencyUnitCreateInputSchema,PatentTakerAgencyUnitUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentTakerAgencyUnitUpsertArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpsertArgs> = z.object({
  select: PatentTakerAgencyUnitSelectSchema.optional(),
  include: PatentTakerAgencyUnitIncludeSchema.optional(),
  where: PatentTakerAgencyUnitWhereUniqueInputSchema,
  create: z.union([ PatentTakerAgencyUnitCreateInputSchema,PatentTakerAgencyUnitUncheckedCreateInputSchema ]),
  update: z.union([ PatentTakerAgencyUnitUpdateInputSchema,PatentTakerAgencyUnitUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentTakerAgencyUnitCreateManyArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateManyArgs> = z.object({
  data: z.union([ PatentTakerAgencyUnitCreateManyInputSchema,PatentTakerAgencyUnitCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentTakerAgencyUnitCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentTakerAgencyUnitCreateManyInputSchema,PatentTakerAgencyUnitCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentTakerAgencyUnitDeleteArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitDeleteArgs> = z.object({
  select: PatentTakerAgencyUnitSelectSchema.optional(),
  include: PatentTakerAgencyUnitIncludeSchema.optional(),
  where: PatentTakerAgencyUnitWhereUniqueInputSchema,
}).strict() ;

export const PatentTakerAgencyUnitUpdateArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpdateArgs> = z.object({
  select: PatentTakerAgencyUnitSelectSchema.optional(),
  include: PatentTakerAgencyUnitIncludeSchema.optional(),
  data: z.union([ PatentTakerAgencyUnitUpdateInputSchema,PatentTakerAgencyUnitUncheckedUpdateInputSchema ]),
  where: PatentTakerAgencyUnitWhereUniqueInputSchema,
}).strict() ;

export const PatentTakerAgencyUnitUpdateManyArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpdateManyArgs> = z.object({
  data: z.union([ PatentTakerAgencyUnitUpdateManyMutationInputSchema,PatentTakerAgencyUnitUncheckedUpdateManyInputSchema ]),
  where: PatentTakerAgencyUnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentTakerAgencyUnitUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PatentTakerAgencyUnitUpdateManyMutationInputSchema,PatentTakerAgencyUnitUncheckedUpdateManyInputSchema ]),
  where: PatentTakerAgencyUnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentTakerAgencyUnitDeleteManyArgsSchema: z.ZodType<Prisma.PatentTakerAgencyUnitDeleteManyArgs> = z.object({
  where: PatentTakerAgencyUnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentInitiatorAgencyUnitCreateArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateArgs> = z.object({
  select: PatentInitiatorAgencyUnitSelectSchema.optional(),
  include: PatentInitiatorAgencyUnitIncludeSchema.optional(),
  data: z.union([ PatentInitiatorAgencyUnitCreateInputSchema,PatentInitiatorAgencyUnitUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentInitiatorAgencyUnitUpsertArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpsertArgs> = z.object({
  select: PatentInitiatorAgencyUnitSelectSchema.optional(),
  include: PatentInitiatorAgencyUnitIncludeSchema.optional(),
  where: PatentInitiatorAgencyUnitWhereUniqueInputSchema,
  create: z.union([ PatentInitiatorAgencyUnitCreateInputSchema,PatentInitiatorAgencyUnitUncheckedCreateInputSchema ]),
  update: z.union([ PatentInitiatorAgencyUnitUpdateInputSchema,PatentInitiatorAgencyUnitUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentInitiatorAgencyUnitCreateManyArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateManyArgs> = z.object({
  data: z.union([ PatentInitiatorAgencyUnitCreateManyInputSchema,PatentInitiatorAgencyUnitCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentInitiatorAgencyUnitCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentInitiatorAgencyUnitCreateManyInputSchema,PatentInitiatorAgencyUnitCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentInitiatorAgencyUnitDeleteArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitDeleteArgs> = z.object({
  select: PatentInitiatorAgencyUnitSelectSchema.optional(),
  include: PatentInitiatorAgencyUnitIncludeSchema.optional(),
  where: PatentInitiatorAgencyUnitWhereUniqueInputSchema,
}).strict() ;

export const PatentInitiatorAgencyUnitUpdateArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpdateArgs> = z.object({
  select: PatentInitiatorAgencyUnitSelectSchema.optional(),
  include: PatentInitiatorAgencyUnitIncludeSchema.optional(),
  data: z.union([ PatentInitiatorAgencyUnitUpdateInputSchema,PatentInitiatorAgencyUnitUncheckedUpdateInputSchema ]),
  where: PatentInitiatorAgencyUnitWhereUniqueInputSchema,
}).strict() ;

export const PatentInitiatorAgencyUnitUpdateManyArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpdateManyArgs> = z.object({
  data: z.union([ PatentInitiatorAgencyUnitUpdateManyMutationInputSchema,PatentInitiatorAgencyUnitUncheckedUpdateManyInputSchema ]),
  where: PatentInitiatorAgencyUnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentInitiatorAgencyUnitUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PatentInitiatorAgencyUnitUpdateManyMutationInputSchema,PatentInitiatorAgencyUnitUncheckedUpdateManyInputSchema ]),
  where: PatentInitiatorAgencyUnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentInitiatorAgencyUnitDeleteManyArgsSchema: z.ZodType<Prisma.PatentInitiatorAgencyUnitDeleteManyArgs> = z.object({
  where: PatentInitiatorAgencyUnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AgencyUnitPersonCreateArgsSchema: z.ZodType<Prisma.AgencyUnitPersonCreateArgs> = z.object({
  select: AgencyUnitPersonSelectSchema.optional(),
  include: AgencyUnitPersonIncludeSchema.optional(),
  data: z.union([ AgencyUnitPersonCreateInputSchema,AgencyUnitPersonUncheckedCreateInputSchema ]),
}).strict() ;

export const AgencyUnitPersonUpsertArgsSchema: z.ZodType<Prisma.AgencyUnitPersonUpsertArgs> = z.object({
  select: AgencyUnitPersonSelectSchema.optional(),
  include: AgencyUnitPersonIncludeSchema.optional(),
  where: AgencyUnitPersonWhereUniqueInputSchema,
  create: z.union([ AgencyUnitPersonCreateInputSchema,AgencyUnitPersonUncheckedCreateInputSchema ]),
  update: z.union([ AgencyUnitPersonUpdateInputSchema,AgencyUnitPersonUncheckedUpdateInputSchema ]),
}).strict() ;

export const AgencyUnitPersonCreateManyArgsSchema: z.ZodType<Prisma.AgencyUnitPersonCreateManyArgs> = z.object({
  data: z.union([ AgencyUnitPersonCreateManyInputSchema,AgencyUnitPersonCreateManyInputSchema.array() ]),
}).strict() ;

export const AgencyUnitPersonCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AgencyUnitPersonCreateManyAndReturnArgs> = z.object({
  data: z.union([ AgencyUnitPersonCreateManyInputSchema,AgencyUnitPersonCreateManyInputSchema.array() ]),
}).strict() ;

export const AgencyUnitPersonDeleteArgsSchema: z.ZodType<Prisma.AgencyUnitPersonDeleteArgs> = z.object({
  select: AgencyUnitPersonSelectSchema.optional(),
  include: AgencyUnitPersonIncludeSchema.optional(),
  where: AgencyUnitPersonWhereUniqueInputSchema,
}).strict() ;

export const AgencyUnitPersonUpdateArgsSchema: z.ZodType<Prisma.AgencyUnitPersonUpdateArgs> = z.object({
  select: AgencyUnitPersonSelectSchema.optional(),
  include: AgencyUnitPersonIncludeSchema.optional(),
  data: z.union([ AgencyUnitPersonUpdateInputSchema,AgencyUnitPersonUncheckedUpdateInputSchema ]),
  where: AgencyUnitPersonWhereUniqueInputSchema,
}).strict() ;

export const AgencyUnitPersonUpdateManyArgsSchema: z.ZodType<Prisma.AgencyUnitPersonUpdateManyArgs> = z.object({
  data: z.union([ AgencyUnitPersonUpdateManyMutationInputSchema,AgencyUnitPersonUncheckedUpdateManyInputSchema ]),
  where: AgencyUnitPersonWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AgencyUnitPersonUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AgencyUnitPersonUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AgencyUnitPersonUpdateManyMutationInputSchema,AgencyUnitPersonUncheckedUpdateManyInputSchema ]),
  where: AgencyUnitPersonWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AgencyUnitPersonDeleteManyArgsSchema: z.ZodType<Prisma.AgencyUnitPersonDeleteManyArgs> = z.object({
  where: AgencyUnitPersonWhereInputSchema.optional(),
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

export const FundingPlanUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FundingPlanUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FundingPlanUpdateManyMutationInputSchema,FundingPlanUncheckedUpdateManyInputSchema ]),
  where: FundingPlanWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FundingPlanDeleteManyArgsSchema: z.ZodType<Prisma.FundingPlanDeleteManyArgs> = z.object({
  where: FundingPlanWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FundingUnitCreateArgsSchema: z.ZodType<Prisma.FundingUnitCreateArgs> = z.object({
  select: FundingUnitSelectSchema.optional(),
  include: FundingUnitIncludeSchema.optional(),
  data: z.union([ FundingUnitCreateInputSchema,FundingUnitUncheckedCreateInputSchema ]),
}).strict() ;

export const FundingUnitUpsertArgsSchema: z.ZodType<Prisma.FundingUnitUpsertArgs> = z.object({
  select: FundingUnitSelectSchema.optional(),
  include: FundingUnitIncludeSchema.optional(),
  where: FundingUnitWhereUniqueInputSchema,
  create: z.union([ FundingUnitCreateInputSchema,FundingUnitUncheckedCreateInputSchema ]),
  update: z.union([ FundingUnitUpdateInputSchema,FundingUnitUncheckedUpdateInputSchema ]),
}).strict() ;

export const FundingUnitCreateManyArgsSchema: z.ZodType<Prisma.FundingUnitCreateManyArgs> = z.object({
  data: z.union([ FundingUnitCreateManyInputSchema,FundingUnitCreateManyInputSchema.array() ]),
}).strict() ;

export const FundingUnitCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FundingUnitCreateManyAndReturnArgs> = z.object({
  data: z.union([ FundingUnitCreateManyInputSchema,FundingUnitCreateManyInputSchema.array() ]),
}).strict() ;

export const FundingUnitDeleteArgsSchema: z.ZodType<Prisma.FundingUnitDeleteArgs> = z.object({
  select: FundingUnitSelectSchema.optional(),
  include: FundingUnitIncludeSchema.optional(),
  where: FundingUnitWhereUniqueInputSchema,
}).strict() ;

export const FundingUnitUpdateArgsSchema: z.ZodType<Prisma.FundingUnitUpdateArgs> = z.object({
  select: FundingUnitSelectSchema.optional(),
  include: FundingUnitIncludeSchema.optional(),
  data: z.union([ FundingUnitUpdateInputSchema,FundingUnitUncheckedUpdateInputSchema ]),
  where: FundingUnitWhereUniqueInputSchema,
}).strict() ;

export const FundingUnitUpdateManyArgsSchema: z.ZodType<Prisma.FundingUnitUpdateManyArgs> = z.object({
  data: z.union([ FundingUnitUpdateManyMutationInputSchema,FundingUnitUncheckedUpdateManyInputSchema ]),
  where: FundingUnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FundingUnitUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FundingUnitUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FundingUnitUpdateManyMutationInputSchema,FundingUnitUncheckedUpdateManyInputSchema ]),
  where: FundingUnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FundingUnitDeleteManyArgsSchema: z.ZodType<Prisma.FundingUnitDeleteManyArgs> = z.object({
  where: FundingUnitWhereInputSchema.optional(),
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

export const PatentFundingUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentFundingUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PatentFundingUpdateManyMutationInputSchema,PatentFundingUncheckedUpdateManyInputSchema ]),
  where: PatentFundingWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentFundingDeleteManyArgsSchema: z.ZodType<Prisma.PatentFundingDeleteManyArgs> = z.object({
  where: PatentFundingWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FundingRecordCreateArgsSchema: z.ZodType<Prisma.FundingRecordCreateArgs> = z.object({
  select: FundingRecordSelectSchema.optional(),
  include: FundingRecordIncludeSchema.optional(),
  data: z.union([ FundingRecordCreateInputSchema,FundingRecordUncheckedCreateInputSchema ]),
}).strict() ;

export const FundingRecordUpsertArgsSchema: z.ZodType<Prisma.FundingRecordUpsertArgs> = z.object({
  select: FundingRecordSelectSchema.optional(),
  include: FundingRecordIncludeSchema.optional(),
  where: FundingRecordWhereUniqueInputSchema,
  create: z.union([ FundingRecordCreateInputSchema,FundingRecordUncheckedCreateInputSchema ]),
  update: z.union([ FundingRecordUpdateInputSchema,FundingRecordUncheckedUpdateInputSchema ]),
}).strict() ;

export const FundingRecordCreateManyArgsSchema: z.ZodType<Prisma.FundingRecordCreateManyArgs> = z.object({
  data: z.union([ FundingRecordCreateManyInputSchema,FundingRecordCreateManyInputSchema.array() ]),
}).strict() ;

export const FundingRecordCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FundingRecordCreateManyAndReturnArgs> = z.object({
  data: z.union([ FundingRecordCreateManyInputSchema,FundingRecordCreateManyInputSchema.array() ]),
}).strict() ;

export const FundingRecordDeleteArgsSchema: z.ZodType<Prisma.FundingRecordDeleteArgs> = z.object({
  select: FundingRecordSelectSchema.optional(),
  include: FundingRecordIncludeSchema.optional(),
  where: FundingRecordWhereUniqueInputSchema,
}).strict() ;

export const FundingRecordUpdateArgsSchema: z.ZodType<Prisma.FundingRecordUpdateArgs> = z.object({
  select: FundingRecordSelectSchema.optional(),
  include: FundingRecordIncludeSchema.optional(),
  data: z.union([ FundingRecordUpdateInputSchema,FundingRecordUncheckedUpdateInputSchema ]),
  where: FundingRecordWhereUniqueInputSchema,
}).strict() ;

export const FundingRecordUpdateManyArgsSchema: z.ZodType<Prisma.FundingRecordUpdateManyArgs> = z.object({
  data: z.union([ FundingRecordUpdateManyMutationInputSchema,FundingRecordUncheckedUpdateManyInputSchema ]),
  where: FundingRecordWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FundingRecordUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FundingRecordUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FundingRecordUpdateManyMutationInputSchema,FundingRecordUncheckedUpdateManyInputSchema ]),
  where: FundingRecordWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FundingRecordDeleteManyArgsSchema: z.ZodType<Prisma.FundingRecordDeleteManyArgs> = z.object({
  where: FundingRecordWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentFundingUnitCreateArgsSchema: z.ZodType<Prisma.PatentFundingUnitCreateArgs> = z.object({
  select: PatentFundingUnitSelectSchema.optional(),
  include: PatentFundingUnitIncludeSchema.optional(),
  data: z.union([ PatentFundingUnitCreateInputSchema,PatentFundingUnitUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentFundingUnitUpsertArgsSchema: z.ZodType<Prisma.PatentFundingUnitUpsertArgs> = z.object({
  select: PatentFundingUnitSelectSchema.optional(),
  include: PatentFundingUnitIncludeSchema.optional(),
  where: PatentFundingUnitWhereUniqueInputSchema,
  create: z.union([ PatentFundingUnitCreateInputSchema,PatentFundingUnitUncheckedCreateInputSchema ]),
  update: z.union([ PatentFundingUnitUpdateInputSchema,PatentFundingUnitUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentFundingUnitCreateManyArgsSchema: z.ZodType<Prisma.PatentFundingUnitCreateManyArgs> = z.object({
  data: z.union([ PatentFundingUnitCreateManyInputSchema,PatentFundingUnitCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentFundingUnitCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentFundingUnitCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentFundingUnitCreateManyInputSchema,PatentFundingUnitCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentFundingUnitDeleteArgsSchema: z.ZodType<Prisma.PatentFundingUnitDeleteArgs> = z.object({
  select: PatentFundingUnitSelectSchema.optional(),
  include: PatentFundingUnitIncludeSchema.optional(),
  where: PatentFundingUnitWhereUniqueInputSchema,
}).strict() ;

export const PatentFundingUnitUpdateArgsSchema: z.ZodType<Prisma.PatentFundingUnitUpdateArgs> = z.object({
  select: PatentFundingUnitSelectSchema.optional(),
  include: PatentFundingUnitIncludeSchema.optional(),
  data: z.union([ PatentFundingUnitUpdateInputSchema,PatentFundingUnitUncheckedUpdateInputSchema ]),
  where: PatentFundingUnitWhereUniqueInputSchema,
}).strict() ;

export const PatentFundingUnitUpdateManyArgsSchema: z.ZodType<Prisma.PatentFundingUnitUpdateManyArgs> = z.object({
  data: z.union([ PatentFundingUnitUpdateManyMutationInputSchema,PatentFundingUnitUncheckedUpdateManyInputSchema ]),
  where: PatentFundingUnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentFundingUnitUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentFundingUnitUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PatentFundingUnitUpdateManyMutationInputSchema,PatentFundingUnitUncheckedUpdateManyInputSchema ]),
  where: PatentFundingUnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentFundingUnitDeleteManyArgsSchema: z.ZodType<Prisma.PatentFundingUnitDeleteManyArgs> = z.object({
  where: PatentFundingUnitWhereInputSchema.optional(),
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

export const InventorUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.InventorUpdateManyAndReturnArgs> = z.object({
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

export const PatentInventorUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentInventorUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PatentInventorUpdateManyMutationInputSchema,PatentInventorUncheckedUpdateManyInputSchema ]),
  where: PatentInventorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentInventorDeleteManyArgsSchema: z.ZodType<Prisma.PatentInventorDeleteManyArgs> = z.object({
  where: PatentInventorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NoteCreateArgsSchema: z.ZodType<Prisma.NoteCreateArgs> = z.object({
  select: NoteSelectSchema.optional(),
  data: z.union([ NoteCreateInputSchema,NoteUncheckedCreateInputSchema ]),
}).strict() ;

export const NoteUpsertArgsSchema: z.ZodType<Prisma.NoteUpsertArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereUniqueInputSchema,
  create: z.union([ NoteCreateInputSchema,NoteUncheckedCreateInputSchema ]),
  update: z.union([ NoteUpdateInputSchema,NoteUncheckedUpdateInputSchema ]),
}).strict() ;

export const NoteCreateManyArgsSchema: z.ZodType<Prisma.NoteCreateManyArgs> = z.object({
  data: z.union([ NoteCreateManyInputSchema,NoteCreateManyInputSchema.array() ]),
}).strict() ;

export const NoteCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NoteCreateManyAndReturnArgs> = z.object({
  data: z.union([ NoteCreateManyInputSchema,NoteCreateManyInputSchema.array() ]),
}).strict() ;

export const NoteDeleteArgsSchema: z.ZodType<Prisma.NoteDeleteArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereUniqueInputSchema,
}).strict() ;

export const NoteUpdateArgsSchema: z.ZodType<Prisma.NoteUpdateArgs> = z.object({
  select: NoteSelectSchema.optional(),
  data: z.union([ NoteUpdateInputSchema,NoteUncheckedUpdateInputSchema ]),
  where: NoteWhereUniqueInputSchema,
}).strict() ;

export const NoteUpdateManyArgsSchema: z.ZodType<Prisma.NoteUpdateManyArgs> = z.object({
  data: z.union([ NoteUpdateManyMutationInputSchema,NoteUncheckedUpdateManyInputSchema ]),
  where: NoteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NoteUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.NoteUpdateManyAndReturnArgs> = z.object({
  data: z.union([ NoteUpdateManyMutationInputSchema,NoteUncheckedUpdateManyInputSchema ]),
  where: NoteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NoteDeleteManyArgsSchema: z.ZodType<Prisma.NoteDeleteManyArgs> = z.object({
  where: NoteWhereInputSchema.optional(),
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

export const PatentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PatentUpdateManyMutationInputSchema,PatentUncheckedUpdateManyInputSchema ]),
  where: PatentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentDeleteManyArgsSchema: z.ZodType<Prisma.PatentDeleteManyArgs> = z.object({
  where: PatentWhereInputSchema.optional(),
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

export const PatentApplicationDataUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentApplicationDataUpdateManyAndReturnArgs> = z.object({
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

export const PatentTechnicalAttributesUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentTechnicalAttributesUpdateManyAndReturnArgs> = z.object({
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

export const TechnicalKeywordUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TechnicalKeywordUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TechnicalKeywordUpdateManyMutationInputSchema,TechnicalKeywordUncheckedUpdateManyInputSchema ]),
  where: TechnicalKeywordWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TechnicalKeywordDeleteManyArgsSchema: z.ZodType<Prisma.TechnicalKeywordDeleteManyArgs> = z.object({
  where: TechnicalKeywordWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentInternalCreateArgsSchema: z.ZodType<Prisma.PatentInternalCreateArgs> = z.object({
  select: PatentInternalSelectSchema.optional(),
  include: PatentInternalIncludeSchema.optional(),
  data: z.union([ PatentInternalCreateInputSchema,PatentInternalUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentInternalUpsertArgsSchema: z.ZodType<Prisma.PatentInternalUpsertArgs> = z.object({
  select: PatentInternalSelectSchema.optional(),
  include: PatentInternalIncludeSchema.optional(),
  where: PatentInternalWhereUniqueInputSchema,
  create: z.union([ PatentInternalCreateInputSchema,PatentInternalUncheckedCreateInputSchema ]),
  update: z.union([ PatentInternalUpdateInputSchema,PatentInternalUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentInternalCreateManyArgsSchema: z.ZodType<Prisma.PatentInternalCreateManyArgs> = z.object({
  data: z.union([ PatentInternalCreateManyInputSchema,PatentInternalCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentInternalCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentInternalCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentInternalCreateManyInputSchema,PatentInternalCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentInternalDeleteArgsSchema: z.ZodType<Prisma.PatentInternalDeleteArgs> = z.object({
  select: PatentInternalSelectSchema.optional(),
  include: PatentInternalIncludeSchema.optional(),
  where: PatentInternalWhereUniqueInputSchema,
}).strict() ;

export const PatentInternalUpdateArgsSchema: z.ZodType<Prisma.PatentInternalUpdateArgs> = z.object({
  select: PatentInternalSelectSchema.optional(),
  include: PatentInternalIncludeSchema.optional(),
  data: z.union([ PatentInternalUpdateInputSchema,PatentInternalUncheckedUpdateInputSchema ]),
  where: PatentInternalWhereUniqueInputSchema,
}).strict() ;

export const PatentInternalUpdateManyArgsSchema: z.ZodType<Prisma.PatentInternalUpdateManyArgs> = z.object({
  data: z.union([ PatentInternalUpdateManyMutationInputSchema,PatentInternalUncheckedUpdateManyInputSchema ]),
  where: PatentInternalWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentInternalUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentInternalUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PatentInternalUpdateManyMutationInputSchema,PatentInternalUncheckedUpdateManyInputSchema ]),
  where: PatentInternalWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentInternalDeleteManyArgsSchema: z.ZodType<Prisma.PatentInternalDeleteManyArgs> = z.object({
  where: PatentInternalWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentExternalCreateArgsSchema: z.ZodType<Prisma.PatentExternalCreateArgs> = z.object({
  select: PatentExternalSelectSchema.optional(),
  include: PatentExternalIncludeSchema.optional(),
  data: z.union([ PatentExternalCreateInputSchema,PatentExternalUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentExternalUpsertArgsSchema: z.ZodType<Prisma.PatentExternalUpsertArgs> = z.object({
  select: PatentExternalSelectSchema.optional(),
  include: PatentExternalIncludeSchema.optional(),
  where: PatentExternalWhereUniqueInputSchema,
  create: z.union([ PatentExternalCreateInputSchema,PatentExternalUncheckedCreateInputSchema ]),
  update: z.union([ PatentExternalUpdateInputSchema,PatentExternalUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentExternalCreateManyArgsSchema: z.ZodType<Prisma.PatentExternalCreateManyArgs> = z.object({
  data: z.union([ PatentExternalCreateManyInputSchema,PatentExternalCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentExternalCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentExternalCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentExternalCreateManyInputSchema,PatentExternalCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentExternalDeleteArgsSchema: z.ZodType<Prisma.PatentExternalDeleteArgs> = z.object({
  select: PatentExternalSelectSchema.optional(),
  include: PatentExternalIncludeSchema.optional(),
  where: PatentExternalWhereUniqueInputSchema,
}).strict() ;

export const PatentExternalUpdateArgsSchema: z.ZodType<Prisma.PatentExternalUpdateArgs> = z.object({
  select: PatentExternalSelectSchema.optional(),
  include: PatentExternalIncludeSchema.optional(),
  data: z.union([ PatentExternalUpdateInputSchema,PatentExternalUncheckedUpdateInputSchema ]),
  where: PatentExternalWhereUniqueInputSchema,
}).strict() ;

export const PatentExternalUpdateManyArgsSchema: z.ZodType<Prisma.PatentExternalUpdateManyArgs> = z.object({
  data: z.union([ PatentExternalUpdateManyMutationInputSchema,PatentExternalUncheckedUpdateManyInputSchema ]),
  where: PatentExternalWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentExternalUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentExternalUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PatentExternalUpdateManyMutationInputSchema,PatentExternalUncheckedUpdateManyInputSchema ]),
  where: PatentExternalWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentExternalDeleteManyArgsSchema: z.ZodType<Prisma.PatentExternalDeleteManyArgs> = z.object({
  where: PatentExternalWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentManualStatusCreateArgsSchema: z.ZodType<Prisma.PatentManualStatusCreateArgs> = z.object({
  select: PatentManualStatusSelectSchema.optional(),
  include: PatentManualStatusIncludeSchema.optional(),
  data: z.union([ PatentManualStatusCreateInputSchema,PatentManualStatusUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentManualStatusUpsertArgsSchema: z.ZodType<Prisma.PatentManualStatusUpsertArgs> = z.object({
  select: PatentManualStatusSelectSchema.optional(),
  include: PatentManualStatusIncludeSchema.optional(),
  where: PatentManualStatusWhereUniqueInputSchema,
  create: z.union([ PatentManualStatusCreateInputSchema,PatentManualStatusUncheckedCreateInputSchema ]),
  update: z.union([ PatentManualStatusUpdateInputSchema,PatentManualStatusUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentManualStatusCreateManyArgsSchema: z.ZodType<Prisma.PatentManualStatusCreateManyArgs> = z.object({
  data: z.union([ PatentManualStatusCreateManyInputSchema,PatentManualStatusCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentManualStatusCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentManualStatusCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentManualStatusCreateManyInputSchema,PatentManualStatusCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentManualStatusDeleteArgsSchema: z.ZodType<Prisma.PatentManualStatusDeleteArgs> = z.object({
  select: PatentManualStatusSelectSchema.optional(),
  include: PatentManualStatusIncludeSchema.optional(),
  where: PatentManualStatusWhereUniqueInputSchema,
}).strict() ;

export const PatentManualStatusUpdateArgsSchema: z.ZodType<Prisma.PatentManualStatusUpdateArgs> = z.object({
  select: PatentManualStatusSelectSchema.optional(),
  include: PatentManualStatusIncludeSchema.optional(),
  data: z.union([ PatentManualStatusUpdateInputSchema,PatentManualStatusUncheckedUpdateInputSchema ]),
  where: PatentManualStatusWhereUniqueInputSchema,
}).strict() ;

export const PatentManualStatusUpdateManyArgsSchema: z.ZodType<Prisma.PatentManualStatusUpdateManyArgs> = z.object({
  data: z.union([ PatentManualStatusUpdateManyMutationInputSchema,PatentManualStatusUncheckedUpdateManyInputSchema ]),
  where: PatentManualStatusWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentManualStatusUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentManualStatusUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PatentManualStatusUpdateManyMutationInputSchema,PatentManualStatusUncheckedUpdateManyInputSchema ]),
  where: PatentManualStatusWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentManualStatusDeleteManyArgsSchema: z.ZodType<Prisma.PatentManualStatusDeleteManyArgs> = z.object({
  where: PatentManualStatusWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentMaintenanceCreateArgsSchema: z.ZodType<Prisma.PatentMaintenanceCreateArgs> = z.object({
  select: PatentMaintenanceSelectSchema.optional(),
  include: PatentMaintenanceIncludeSchema.optional(),
  data: z.union([ PatentMaintenanceCreateInputSchema,PatentMaintenanceUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentMaintenanceUpsertArgsSchema: z.ZodType<Prisma.PatentMaintenanceUpsertArgs> = z.object({
  select: PatentMaintenanceSelectSchema.optional(),
  include: PatentMaintenanceIncludeSchema.optional(),
  where: PatentMaintenanceWhereUniqueInputSchema,
  create: z.union([ PatentMaintenanceCreateInputSchema,PatentMaintenanceUncheckedCreateInputSchema ]),
  update: z.union([ PatentMaintenanceUpdateInputSchema,PatentMaintenanceUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentMaintenanceCreateManyArgsSchema: z.ZodType<Prisma.PatentMaintenanceCreateManyArgs> = z.object({
  data: z.union([ PatentMaintenanceCreateManyInputSchema,PatentMaintenanceCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentMaintenanceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentMaintenanceCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentMaintenanceCreateManyInputSchema,PatentMaintenanceCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentMaintenanceDeleteArgsSchema: z.ZodType<Prisma.PatentMaintenanceDeleteArgs> = z.object({
  select: PatentMaintenanceSelectSchema.optional(),
  include: PatentMaintenanceIncludeSchema.optional(),
  where: PatentMaintenanceWhereUniqueInputSchema,
}).strict() ;

export const PatentMaintenanceUpdateArgsSchema: z.ZodType<Prisma.PatentMaintenanceUpdateArgs> = z.object({
  select: PatentMaintenanceSelectSchema.optional(),
  include: PatentMaintenanceIncludeSchema.optional(),
  data: z.union([ PatentMaintenanceUpdateInputSchema,PatentMaintenanceUncheckedUpdateInputSchema ]),
  where: PatentMaintenanceWhereUniqueInputSchema,
}).strict() ;

export const PatentMaintenanceUpdateManyArgsSchema: z.ZodType<Prisma.PatentMaintenanceUpdateManyArgs> = z.object({
  data: z.union([ PatentMaintenanceUpdateManyMutationInputSchema,PatentMaintenanceUncheckedUpdateManyInputSchema ]),
  where: PatentMaintenanceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentMaintenanceUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentMaintenanceUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PatentMaintenanceUpdateManyMutationInputSchema,PatentMaintenanceUncheckedUpdateManyInputSchema ]),
  where: PatentMaintenanceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentMaintenanceDeleteManyArgsSchema: z.ZodType<Prisma.PatentMaintenanceDeleteManyArgs> = z.object({
  where: PatentMaintenanceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentRecordCreateArgsSchema: z.ZodType<Prisma.PatentRecordCreateArgs> = z.object({
  select: PatentRecordSelectSchema.optional(),
  include: PatentRecordIncludeSchema.optional(),
  data: z.union([ PatentRecordCreateInputSchema,PatentRecordUncheckedCreateInputSchema ]),
}).strict() ;

export const PatentRecordUpsertArgsSchema: z.ZodType<Prisma.PatentRecordUpsertArgs> = z.object({
  select: PatentRecordSelectSchema.optional(),
  include: PatentRecordIncludeSchema.optional(),
  where: PatentRecordWhereUniqueInputSchema,
  create: z.union([ PatentRecordCreateInputSchema,PatentRecordUncheckedCreateInputSchema ]),
  update: z.union([ PatentRecordUpdateInputSchema,PatentRecordUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatentRecordCreateManyArgsSchema: z.ZodType<Prisma.PatentRecordCreateManyArgs> = z.object({
  data: z.union([ PatentRecordCreateManyInputSchema,PatentRecordCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentRecordCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentRecordCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatentRecordCreateManyInputSchema,PatentRecordCreateManyInputSchema.array() ]),
}).strict() ;

export const PatentRecordDeleteArgsSchema: z.ZodType<Prisma.PatentRecordDeleteArgs> = z.object({
  select: PatentRecordSelectSchema.optional(),
  include: PatentRecordIncludeSchema.optional(),
  where: PatentRecordWhereUniqueInputSchema,
}).strict() ;

export const PatentRecordUpdateArgsSchema: z.ZodType<Prisma.PatentRecordUpdateArgs> = z.object({
  select: PatentRecordSelectSchema.optional(),
  include: PatentRecordIncludeSchema.optional(),
  data: z.union([ PatentRecordUpdateInputSchema,PatentRecordUncheckedUpdateInputSchema ]),
  where: PatentRecordWhereUniqueInputSchema,
}).strict() ;

export const PatentRecordUpdateManyArgsSchema: z.ZodType<Prisma.PatentRecordUpdateManyArgs> = z.object({
  data: z.union([ PatentRecordUpdateManyMutationInputSchema,PatentRecordUncheckedUpdateManyInputSchema ]),
  where: PatentRecordWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentRecordUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatentRecordUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PatentRecordUpdateManyMutationInputSchema,PatentRecordUncheckedUpdateManyInputSchema ]),
  where: PatentRecordWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatentRecordDeleteManyArgsSchema: z.ZodType<Prisma.PatentRecordDeleteManyArgs> = z.object({
  where: PatentRecordWhereInputSchema.optional(),
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

export const CollegeUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CollegeUpdateManyAndReturnArgs> = z.object({
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

export const DepartmentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.DepartmentUpdateManyAndReturnArgs> = z.object({
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

export const CountryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CountryUpdateManyAndReturnArgs> = z.object({
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
  data: z.union([ ContactInfoCreateInputSchema,ContactInfoUncheckedCreateInputSchema ]),
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

export const ContactInfoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ContactInfoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ContactInfoUpdateManyMutationInputSchema,ContactInfoUncheckedUpdateManyInputSchema ]),
  where: ContactInfoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ContactInfoDeleteManyArgsSchema: z.ZodType<Prisma.ContactInfoDeleteManyArgs> = z.object({
  where: ContactInfoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;