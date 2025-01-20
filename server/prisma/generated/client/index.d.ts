
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Agency
 * 
 */
export type Agency = $Result.DefaultSelection<Prisma.$AgencyPayload>
/**
 * Model AgencyPatent
 * 
 */
export type AgencyPatent = $Result.DefaultSelection<Prisma.$AgencyPatentPayload>
/**
 * Model AgencyContactPerson
 * 
 */
export type AgencyContactPerson = $Result.DefaultSelection<Prisma.$AgencyContactPersonPayload>
/**
 * Model FundingPlan
 * 
 */
export type FundingPlan = $Result.DefaultSelection<Prisma.$FundingPlanPayload>
/**
 * Model PatentFunding
 * 
 */
export type PatentFunding = $Result.DefaultSelection<Prisma.$PatentFundingPayload>
/**
 * Model Inventor
 * 
 */
export type Inventor = $Result.DefaultSelection<Prisma.$InventorPayload>
/**
 * Model PatentInventor
 * 
 */
export type PatentInventor = $Result.DefaultSelection<Prisma.$PatentInventorPayload>
/**
 * Model Patent
 * 
 */
export type Patent = $Result.DefaultSelection<Prisma.$PatentPayload>
/**
 * Model PatentStatus
 * 
 */
export type PatentStatus = $Result.DefaultSelection<Prisma.$PatentStatusPayload>
/**
 * Model PatentApplicationData
 * 
 */
export type PatentApplicationData = $Result.DefaultSelection<Prisma.$PatentApplicationDataPayload>
/**
 * Model PatentTechnicalAttributes
 * 
 */
export type PatentTechnicalAttributes = $Result.DefaultSelection<Prisma.$PatentTechnicalAttributesPayload>
/**
 * Model College
 * 
 */
export type College = $Result.DefaultSelection<Prisma.$CollegePayload>
/**
 * Model Department
 * 
 */
export type Department = $Result.DefaultSelection<Prisma.$DepartmentPayload>
/**
 * Model Country
 * 
 */
export type Country = $Result.DefaultSelection<Prisma.$CountryPayload>
/**
 * Model ContactInfo
 * 
 */
export type ContactInfo = $Result.DefaultSelection<Prisma.$ContactInfoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Agencies
 * const agencies = await prisma.agency.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Agencies
   * const agencies = await prisma.agency.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.agency`: Exposes CRUD operations for the **Agency** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agencies
    * const agencies = await prisma.agency.findMany()
    * ```
    */
  get agency(): Prisma.AgencyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agencyPatent`: Exposes CRUD operations for the **AgencyPatent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgencyPatents
    * const agencyPatents = await prisma.agencyPatent.findMany()
    * ```
    */
  get agencyPatent(): Prisma.AgencyPatentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agencyContactPerson`: Exposes CRUD operations for the **AgencyContactPerson** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgencyContactPeople
    * const agencyContactPeople = await prisma.agencyContactPerson.findMany()
    * ```
    */
  get agencyContactPerson(): Prisma.AgencyContactPersonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fundingPlan`: Exposes CRUD operations for the **FundingPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FundingPlans
    * const fundingPlans = await prisma.fundingPlan.findMany()
    * ```
    */
  get fundingPlan(): Prisma.FundingPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patentFunding`: Exposes CRUD operations for the **PatentFunding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatentFundings
    * const patentFundings = await prisma.patentFunding.findMany()
    * ```
    */
  get patentFunding(): Prisma.PatentFundingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inventor`: Exposes CRUD operations for the **Inventor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inventors
    * const inventors = await prisma.inventor.findMany()
    * ```
    */
  get inventor(): Prisma.InventorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patentInventor`: Exposes CRUD operations for the **PatentInventor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatentInventors
    * const patentInventors = await prisma.patentInventor.findMany()
    * ```
    */
  get patentInventor(): Prisma.PatentInventorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patent`: Exposes CRUD operations for the **Patent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patents
    * const patents = await prisma.patent.findMany()
    * ```
    */
  get patent(): Prisma.PatentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patentStatus`: Exposes CRUD operations for the **PatentStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatentStatuses
    * const patentStatuses = await prisma.patentStatus.findMany()
    * ```
    */
  get patentStatus(): Prisma.PatentStatusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patentApplicationData`: Exposes CRUD operations for the **PatentApplicationData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatentApplicationData
    * const patentApplicationData = await prisma.patentApplicationData.findMany()
    * ```
    */
  get patentApplicationData(): Prisma.PatentApplicationDataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patentTechnicalAttributes`: Exposes CRUD operations for the **PatentTechnicalAttributes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatentTechnicalAttributes
    * const patentTechnicalAttributes = await prisma.patentTechnicalAttributes.findMany()
    * ```
    */
  get patentTechnicalAttributes(): Prisma.PatentTechnicalAttributesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.college`: Exposes CRUD operations for the **College** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Colleges
    * const colleges = await prisma.college.findMany()
    * ```
    */
  get college(): Prisma.CollegeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.country`: Exposes CRUD operations for the **Country** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Countries
    * const countries = await prisma.country.findMany()
    * ```
    */
  get country(): Prisma.CountryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contactInfo`: Exposes CRUD operations for the **ContactInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactInfos
    * const contactInfos = await prisma.contactInfo.findMany()
    * ```
    */
  get contactInfo(): Prisma.ContactInfoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.2.1
   * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "agency" | "agencyPatent" | "agencyContactPerson" | "fundingPlan" | "patentFunding" | "inventor" | "patentInventor" | "patent" | "patentStatus" | "patentApplicationData" | "patentTechnicalAttributes" | "college" | "department" | "country" | "contactInfo"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Agency: {
        payload: Prisma.$AgencyPayload<ExtArgs>
        fields: Prisma.AgencyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgencyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgencyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPayload>
          }
          findFirst: {
            args: Prisma.AgencyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgencyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPayload>
          }
          findMany: {
            args: Prisma.AgencyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPayload>[]
          }
          create: {
            args: Prisma.AgencyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPayload>
          }
          createMany: {
            args: Prisma.AgencyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgencyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPayload>[]
          }
          delete: {
            args: Prisma.AgencyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPayload>
          }
          update: {
            args: Prisma.AgencyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPayload>
          }
          deleteMany: {
            args: Prisma.AgencyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgencyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgencyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPayload>[]
          }
          upsert: {
            args: Prisma.AgencyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPayload>
          }
          aggregate: {
            args: Prisma.AgencyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgency>
          }
          groupBy: {
            args: Prisma.AgencyGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgencyGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgencyCountArgs<ExtArgs>
            result: $Utils.Optional<AgencyCountAggregateOutputType> | number
          }
        }
      }
      AgencyPatent: {
        payload: Prisma.$AgencyPatentPayload<ExtArgs>
        fields: Prisma.AgencyPatentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgencyPatentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPatentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgencyPatentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPatentPayload>
          }
          findFirst: {
            args: Prisma.AgencyPatentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPatentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgencyPatentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPatentPayload>
          }
          findMany: {
            args: Prisma.AgencyPatentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPatentPayload>[]
          }
          create: {
            args: Prisma.AgencyPatentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPatentPayload>
          }
          createMany: {
            args: Prisma.AgencyPatentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgencyPatentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPatentPayload>[]
          }
          delete: {
            args: Prisma.AgencyPatentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPatentPayload>
          }
          update: {
            args: Prisma.AgencyPatentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPatentPayload>
          }
          deleteMany: {
            args: Prisma.AgencyPatentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgencyPatentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgencyPatentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPatentPayload>[]
          }
          upsert: {
            args: Prisma.AgencyPatentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyPatentPayload>
          }
          aggregate: {
            args: Prisma.AgencyPatentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgencyPatent>
          }
          groupBy: {
            args: Prisma.AgencyPatentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgencyPatentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgencyPatentCountArgs<ExtArgs>
            result: $Utils.Optional<AgencyPatentCountAggregateOutputType> | number
          }
        }
      }
      AgencyContactPerson: {
        payload: Prisma.$AgencyContactPersonPayload<ExtArgs>
        fields: Prisma.AgencyContactPersonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgencyContactPersonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyContactPersonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgencyContactPersonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyContactPersonPayload>
          }
          findFirst: {
            args: Prisma.AgencyContactPersonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyContactPersonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgencyContactPersonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyContactPersonPayload>
          }
          findMany: {
            args: Prisma.AgencyContactPersonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyContactPersonPayload>[]
          }
          create: {
            args: Prisma.AgencyContactPersonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyContactPersonPayload>
          }
          createMany: {
            args: Prisma.AgencyContactPersonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgencyContactPersonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyContactPersonPayload>[]
          }
          delete: {
            args: Prisma.AgencyContactPersonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyContactPersonPayload>
          }
          update: {
            args: Prisma.AgencyContactPersonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyContactPersonPayload>
          }
          deleteMany: {
            args: Prisma.AgencyContactPersonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgencyContactPersonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgencyContactPersonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyContactPersonPayload>[]
          }
          upsert: {
            args: Prisma.AgencyContactPersonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgencyContactPersonPayload>
          }
          aggregate: {
            args: Prisma.AgencyContactPersonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgencyContactPerson>
          }
          groupBy: {
            args: Prisma.AgencyContactPersonGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgencyContactPersonGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgencyContactPersonCountArgs<ExtArgs>
            result: $Utils.Optional<AgencyContactPersonCountAggregateOutputType> | number
          }
        }
      }
      FundingPlan: {
        payload: Prisma.$FundingPlanPayload<ExtArgs>
        fields: Prisma.FundingPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FundingPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FundingPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPlanPayload>
          }
          findFirst: {
            args: Prisma.FundingPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FundingPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPlanPayload>
          }
          findMany: {
            args: Prisma.FundingPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPlanPayload>[]
          }
          create: {
            args: Prisma.FundingPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPlanPayload>
          }
          createMany: {
            args: Prisma.FundingPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FundingPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPlanPayload>[]
          }
          delete: {
            args: Prisma.FundingPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPlanPayload>
          }
          update: {
            args: Prisma.FundingPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPlanPayload>
          }
          deleteMany: {
            args: Prisma.FundingPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FundingPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FundingPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPlanPayload>[]
          }
          upsert: {
            args: Prisma.FundingPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPlanPayload>
          }
          aggregate: {
            args: Prisma.FundingPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFundingPlan>
          }
          groupBy: {
            args: Prisma.FundingPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<FundingPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.FundingPlanCountArgs<ExtArgs>
            result: $Utils.Optional<FundingPlanCountAggregateOutputType> | number
          }
        }
      }
      PatentFunding: {
        payload: Prisma.$PatentFundingPayload<ExtArgs>
        fields: Prisma.PatentFundingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatentFundingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentFundingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatentFundingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentFundingPayload>
          }
          findFirst: {
            args: Prisma.PatentFundingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentFundingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatentFundingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentFundingPayload>
          }
          findMany: {
            args: Prisma.PatentFundingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentFundingPayload>[]
          }
          create: {
            args: Prisma.PatentFundingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentFundingPayload>
          }
          createMany: {
            args: Prisma.PatentFundingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatentFundingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentFundingPayload>[]
          }
          delete: {
            args: Prisma.PatentFundingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentFundingPayload>
          }
          update: {
            args: Prisma.PatentFundingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentFundingPayload>
          }
          deleteMany: {
            args: Prisma.PatentFundingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatentFundingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatentFundingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentFundingPayload>[]
          }
          upsert: {
            args: Prisma.PatentFundingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentFundingPayload>
          }
          aggregate: {
            args: Prisma.PatentFundingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatentFunding>
          }
          groupBy: {
            args: Prisma.PatentFundingGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatentFundingGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatentFundingCountArgs<ExtArgs>
            result: $Utils.Optional<PatentFundingCountAggregateOutputType> | number
          }
        }
      }
      Inventor: {
        payload: Prisma.$InventorPayload<ExtArgs>
        fields: Prisma.InventorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InventorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InventorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventorPayload>
          }
          findFirst: {
            args: Prisma.InventorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InventorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventorPayload>
          }
          findMany: {
            args: Prisma.InventorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventorPayload>[]
          }
          create: {
            args: Prisma.InventorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventorPayload>
          }
          createMany: {
            args: Prisma.InventorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InventorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventorPayload>[]
          }
          delete: {
            args: Prisma.InventorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventorPayload>
          }
          update: {
            args: Prisma.InventorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventorPayload>
          }
          deleteMany: {
            args: Prisma.InventorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InventorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InventorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventorPayload>[]
          }
          upsert: {
            args: Prisma.InventorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventorPayload>
          }
          aggregate: {
            args: Prisma.InventorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInventor>
          }
          groupBy: {
            args: Prisma.InventorGroupByArgs<ExtArgs>
            result: $Utils.Optional<InventorGroupByOutputType>[]
          }
          count: {
            args: Prisma.InventorCountArgs<ExtArgs>
            result: $Utils.Optional<InventorCountAggregateOutputType> | number
          }
        }
      }
      PatentInventor: {
        payload: Prisma.$PatentInventorPayload<ExtArgs>
        fields: Prisma.PatentInventorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatentInventorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentInventorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatentInventorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentInventorPayload>
          }
          findFirst: {
            args: Prisma.PatentInventorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentInventorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatentInventorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentInventorPayload>
          }
          findMany: {
            args: Prisma.PatentInventorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentInventorPayload>[]
          }
          create: {
            args: Prisma.PatentInventorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentInventorPayload>
          }
          createMany: {
            args: Prisma.PatentInventorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatentInventorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentInventorPayload>[]
          }
          delete: {
            args: Prisma.PatentInventorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentInventorPayload>
          }
          update: {
            args: Prisma.PatentInventorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentInventorPayload>
          }
          deleteMany: {
            args: Prisma.PatentInventorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatentInventorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatentInventorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentInventorPayload>[]
          }
          upsert: {
            args: Prisma.PatentInventorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentInventorPayload>
          }
          aggregate: {
            args: Prisma.PatentInventorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatentInventor>
          }
          groupBy: {
            args: Prisma.PatentInventorGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatentInventorGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatentInventorCountArgs<ExtArgs>
            result: $Utils.Optional<PatentInventorCountAggregateOutputType> | number
          }
        }
      }
      Patent: {
        payload: Prisma.$PatentPayload<ExtArgs>
        fields: Prisma.PatentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentPayload>
          }
          findFirst: {
            args: Prisma.PatentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentPayload>
          }
          findMany: {
            args: Prisma.PatentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentPayload>[]
          }
          create: {
            args: Prisma.PatentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentPayload>
          }
          createMany: {
            args: Prisma.PatentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentPayload>[]
          }
          delete: {
            args: Prisma.PatentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentPayload>
          }
          update: {
            args: Prisma.PatentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentPayload>
          }
          deleteMany: {
            args: Prisma.PatentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentPayload>[]
          }
          upsert: {
            args: Prisma.PatentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentPayload>
          }
          aggregate: {
            args: Prisma.PatentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatent>
          }
          groupBy: {
            args: Prisma.PatentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatentCountArgs<ExtArgs>
            result: $Utils.Optional<PatentCountAggregateOutputType> | number
          }
        }
      }
      PatentStatus: {
        payload: Prisma.$PatentStatusPayload<ExtArgs>
        fields: Prisma.PatentStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatentStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatentStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentStatusPayload>
          }
          findFirst: {
            args: Prisma.PatentStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatentStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentStatusPayload>
          }
          findMany: {
            args: Prisma.PatentStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentStatusPayload>[]
          }
          create: {
            args: Prisma.PatentStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentStatusPayload>
          }
          createMany: {
            args: Prisma.PatentStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatentStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentStatusPayload>[]
          }
          delete: {
            args: Prisma.PatentStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentStatusPayload>
          }
          update: {
            args: Prisma.PatentStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentStatusPayload>
          }
          deleteMany: {
            args: Prisma.PatentStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatentStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatentStatusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentStatusPayload>[]
          }
          upsert: {
            args: Prisma.PatentStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentStatusPayload>
          }
          aggregate: {
            args: Prisma.PatentStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatentStatus>
          }
          groupBy: {
            args: Prisma.PatentStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatentStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatentStatusCountArgs<ExtArgs>
            result: $Utils.Optional<PatentStatusCountAggregateOutputType> | number
          }
        }
      }
      PatentApplicationData: {
        payload: Prisma.$PatentApplicationDataPayload<ExtArgs>
        fields: Prisma.PatentApplicationDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatentApplicationDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentApplicationDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatentApplicationDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentApplicationDataPayload>
          }
          findFirst: {
            args: Prisma.PatentApplicationDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentApplicationDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatentApplicationDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentApplicationDataPayload>
          }
          findMany: {
            args: Prisma.PatentApplicationDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentApplicationDataPayload>[]
          }
          create: {
            args: Prisma.PatentApplicationDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentApplicationDataPayload>
          }
          createMany: {
            args: Prisma.PatentApplicationDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatentApplicationDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentApplicationDataPayload>[]
          }
          delete: {
            args: Prisma.PatentApplicationDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentApplicationDataPayload>
          }
          update: {
            args: Prisma.PatentApplicationDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentApplicationDataPayload>
          }
          deleteMany: {
            args: Prisma.PatentApplicationDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatentApplicationDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatentApplicationDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentApplicationDataPayload>[]
          }
          upsert: {
            args: Prisma.PatentApplicationDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentApplicationDataPayload>
          }
          aggregate: {
            args: Prisma.PatentApplicationDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatentApplicationData>
          }
          groupBy: {
            args: Prisma.PatentApplicationDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatentApplicationDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatentApplicationDataCountArgs<ExtArgs>
            result: $Utils.Optional<PatentApplicationDataCountAggregateOutputType> | number
          }
        }
      }
      PatentTechnicalAttributes: {
        payload: Prisma.$PatentTechnicalAttributesPayload<ExtArgs>
        fields: Prisma.PatentTechnicalAttributesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatentTechnicalAttributesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentTechnicalAttributesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatentTechnicalAttributesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentTechnicalAttributesPayload>
          }
          findFirst: {
            args: Prisma.PatentTechnicalAttributesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentTechnicalAttributesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatentTechnicalAttributesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentTechnicalAttributesPayload>
          }
          findMany: {
            args: Prisma.PatentTechnicalAttributesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentTechnicalAttributesPayload>[]
          }
          create: {
            args: Prisma.PatentTechnicalAttributesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentTechnicalAttributesPayload>
          }
          createMany: {
            args: Prisma.PatentTechnicalAttributesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatentTechnicalAttributesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentTechnicalAttributesPayload>[]
          }
          delete: {
            args: Prisma.PatentTechnicalAttributesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentTechnicalAttributesPayload>
          }
          update: {
            args: Prisma.PatentTechnicalAttributesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentTechnicalAttributesPayload>
          }
          deleteMany: {
            args: Prisma.PatentTechnicalAttributesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatentTechnicalAttributesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatentTechnicalAttributesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentTechnicalAttributesPayload>[]
          }
          upsert: {
            args: Prisma.PatentTechnicalAttributesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatentTechnicalAttributesPayload>
          }
          aggregate: {
            args: Prisma.PatentTechnicalAttributesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatentTechnicalAttributes>
          }
          groupBy: {
            args: Prisma.PatentTechnicalAttributesGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatentTechnicalAttributesGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatentTechnicalAttributesCountArgs<ExtArgs>
            result: $Utils.Optional<PatentTechnicalAttributesCountAggregateOutputType> | number
          }
        }
      }
      College: {
        payload: Prisma.$CollegePayload<ExtArgs>
        fields: Prisma.CollegeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CollegeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CollegeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>
          }
          findFirst: {
            args: Prisma.CollegeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CollegeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>
          }
          findMany: {
            args: Prisma.CollegeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>[]
          }
          create: {
            args: Prisma.CollegeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>
          }
          createMany: {
            args: Prisma.CollegeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CollegeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>[]
          }
          delete: {
            args: Prisma.CollegeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>
          }
          update: {
            args: Prisma.CollegeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>
          }
          deleteMany: {
            args: Prisma.CollegeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CollegeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CollegeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>[]
          }
          upsert: {
            args: Prisma.CollegeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>
          }
          aggregate: {
            args: Prisma.CollegeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCollege>
          }
          groupBy: {
            args: Prisma.CollegeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CollegeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CollegeCountArgs<ExtArgs>
            result: $Utils.Optional<CollegeCountAggregateOutputType> | number
          }
        }
      }
      Department: {
        payload: Prisma.$DepartmentPayload<ExtArgs>
        fields: Prisma.DepartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DepartmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findFirst: {
            args: Prisma.DepartmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findMany: {
            args: Prisma.DepartmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          create: {
            args: Prisma.DepartmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          createMany: {
            args: Prisma.DepartmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DepartmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          delete: {
            args: Prisma.DepartmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          update: {
            args: Prisma.DepartmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          deleteMany: {
            args: Prisma.DepartmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DepartmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DepartmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          upsert: {
            args: Prisma.DepartmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.DepartmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DepartmentCountArgs<ExtArgs>
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      Country: {
        payload: Prisma.$CountryPayload<ExtArgs>
        fields: Prisma.CountryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CountryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CountryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          findFirst: {
            args: Prisma.CountryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CountryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          findMany: {
            args: Prisma.CountryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>[]
          }
          create: {
            args: Prisma.CountryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          createMany: {
            args: Prisma.CountryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CountryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>[]
          }
          delete: {
            args: Prisma.CountryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          update: {
            args: Prisma.CountryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          deleteMany: {
            args: Prisma.CountryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CountryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CountryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>[]
          }
          upsert: {
            args: Prisma.CountryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          aggregate: {
            args: Prisma.CountryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCountry>
          }
          groupBy: {
            args: Prisma.CountryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CountryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CountryCountArgs<ExtArgs>
            result: $Utils.Optional<CountryCountAggregateOutputType> | number
          }
        }
      }
      ContactInfo: {
        payload: Prisma.$ContactInfoPayload<ExtArgs>
        fields: Prisma.ContactInfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactInfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactInfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactInfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactInfoPayload>
          }
          findFirst: {
            args: Prisma.ContactInfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactInfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactInfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactInfoPayload>
          }
          findMany: {
            args: Prisma.ContactInfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactInfoPayload>[]
          }
          create: {
            args: Prisma.ContactInfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactInfoPayload>
          }
          createMany: {
            args: Prisma.ContactInfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactInfoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactInfoPayload>[]
          }
          delete: {
            args: Prisma.ContactInfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactInfoPayload>
          }
          update: {
            args: Prisma.ContactInfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactInfoPayload>
          }
          deleteMany: {
            args: Prisma.ContactInfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactInfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactInfoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactInfoPayload>[]
          }
          upsert: {
            args: Prisma.ContactInfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactInfoPayload>
          }
          aggregate: {
            args: Prisma.ContactInfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactInfo>
          }
          groupBy: {
            args: Prisma.ContactInfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactInfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactInfoCountArgs<ExtArgs>
            result: $Utils.Optional<ContactInfoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    agency?: AgencyOmit
    agencyPatent?: AgencyPatentOmit
    agencyContactPerson?: AgencyContactPersonOmit
    fundingPlan?: FundingPlanOmit
    patentFunding?: PatentFundingOmit
    inventor?: InventorOmit
    patentInventor?: PatentInventorOmit
    patent?: PatentOmit
    patentStatus?: PatentStatusOmit
    patentApplicationData?: PatentApplicationDataOmit
    patentTechnicalAttributes?: PatentTechnicalAttributesOmit
    college?: CollegeOmit
    department?: DepartmentOmit
    country?: CountryOmit
    contactInfo?: ContactInfoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AgencyCountOutputType
   */

  export type AgencyCountOutputType = {
    contacts: number
    patents: number
  }

  export type AgencyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contacts?: boolean | AgencyCountOutputTypeCountContactsArgs
    patents?: boolean | AgencyCountOutputTypeCountPatentsArgs
  }

  // Custom InputTypes
  /**
   * AgencyCountOutputType without action
   */
  export type AgencyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyCountOutputType
     */
    select?: AgencyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgencyCountOutputType without action
   */
  export type AgencyCountOutputTypeCountContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgencyContactPersonWhereInput
  }

  /**
   * AgencyCountOutputType without action
   */
  export type AgencyCountOutputTypeCountPatentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgencyPatentWhereInput
  }


  /**
   * Count Type FundingPlanCountOutputType
   */

  export type FundingPlanCountOutputType = {
    fundings: number
  }

  export type FundingPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fundings?: boolean | FundingPlanCountOutputTypeCountFundingsArgs
  }

  // Custom InputTypes
  /**
   * FundingPlanCountOutputType without action
   */
  export type FundingPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPlanCountOutputType
     */
    select?: FundingPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FundingPlanCountOutputType without action
   */
  export type FundingPlanCountOutputTypeCountFundingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatentFundingWhereInput
  }


  /**
   * Count Type InventorCountOutputType
   */

  export type InventorCountOutputType = {
    patents: number
  }

  export type InventorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patents?: boolean | InventorCountOutputTypeCountPatentsArgs
  }

  // Custom InputTypes
  /**
   * InventorCountOutputType without action
   */
  export type InventorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventorCountOutputType
     */
    select?: InventorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InventorCountOutputType without action
   */
  export type InventorCountOutputTypeCountPatentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatentInventorWhereInput
  }


  /**
   * Count Type PatentCountOutputType
   */

  export type PatentCountOutputType = {
    agencies: number
    funding: number
    inventors: number
  }

  export type PatentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agencies?: boolean | PatentCountOutputTypeCountAgenciesArgs
    funding?: boolean | PatentCountOutputTypeCountFundingArgs
    inventors?: boolean | PatentCountOutputTypeCountInventorsArgs
  }

  // Custom InputTypes
  /**
   * PatentCountOutputType without action
   */
  export type PatentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentCountOutputType
     */
    select?: PatentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatentCountOutputType without action
   */
  export type PatentCountOutputTypeCountAgenciesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgencyPatentWhereInput
  }

  /**
   * PatentCountOutputType without action
   */
  export type PatentCountOutputTypeCountFundingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatentFundingWhereInput
  }

  /**
   * PatentCountOutputType without action
   */
  export type PatentCountOutputTypeCountInventorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatentInventorWhereInput
  }


  /**
   * Count Type CollegeCountOutputType
   */

  export type CollegeCountOutputType = {
    departments: number
    patents: number
  }

  export type CollegeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departments?: boolean | CollegeCountOutputTypeCountDepartmentsArgs
    patents?: boolean | CollegeCountOutputTypeCountPatentsArgs
  }

  // Custom InputTypes
  /**
   * CollegeCountOutputType without action
   */
  export type CollegeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollegeCountOutputType
     */
    select?: CollegeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CollegeCountOutputType without action
   */
  export type CollegeCountOutputTypeCountDepartmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
  }

  /**
   * CollegeCountOutputType without action
   */
  export type CollegeCountOutputTypeCountPatentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatentWhereInput
  }


  /**
   * Count Type DepartmentCountOutputType
   */

  export type DepartmentCountOutputType = {
    inventors: number
    patents: number
  }

  export type DepartmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventors?: boolean | DepartmentCountOutputTypeCountInventorsArgs
    patents?: boolean | DepartmentCountOutputTypeCountPatentsArgs
  }

  // Custom InputTypes
  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     */
    select?: DepartmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountInventorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventorWhereInput
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountPatentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatentWhereInput
  }


  /**
   * Count Type CountryCountOutputType
   */

  export type CountryCountOutputType = {
    applications: number
  }

  export type CountryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | CountryCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountryCountOutputType
     */
    select?: CountryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatentApplicationDataWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Agency
   */

  export type AggregateAgency = {
    _count: AgencyCountAggregateOutputType | null
    _avg: AgencyAvgAggregateOutputType | null
    _sum: AgencySumAggregateOutputType | null
    _min: AgencyMinAggregateOutputType | null
    _max: AgencyMaxAggregateOutputType | null
  }

  export type AgencyAvgAggregateOutputType = {
    AgencyID: number | null
  }

  export type AgencySumAggregateOutputType = {
    AgencyID: number | null
  }

  export type AgencyMinAggregateOutputType = {
    AgencyID: number | null
    Name: string | null
  }

  export type AgencyMaxAggregateOutputType = {
    AgencyID: number | null
    Name: string | null
  }

  export type AgencyCountAggregateOutputType = {
    AgencyID: number
    Name: number
    _all: number
  }


  export type AgencyAvgAggregateInputType = {
    AgencyID?: true
  }

  export type AgencySumAggregateInputType = {
    AgencyID?: true
  }

  export type AgencyMinAggregateInputType = {
    AgencyID?: true
    Name?: true
  }

  export type AgencyMaxAggregateInputType = {
    AgencyID?: true
    Name?: true
  }

  export type AgencyCountAggregateInputType = {
    AgencyID?: true
    Name?: true
    _all?: true
  }

  export type AgencyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agency to aggregate.
     */
    where?: AgencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agencies to fetch.
     */
    orderBy?: AgencyOrderByWithRelationInput | AgencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agencies
    **/
    _count?: true | AgencyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgencyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgencySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgencyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgencyMaxAggregateInputType
  }

  export type GetAgencyAggregateType<T extends AgencyAggregateArgs> = {
        [P in keyof T & keyof AggregateAgency]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgency[P]>
      : GetScalarType<T[P], AggregateAgency[P]>
  }




  export type AgencyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgencyWhereInput
    orderBy?: AgencyOrderByWithAggregationInput | AgencyOrderByWithAggregationInput[]
    by: AgencyScalarFieldEnum[] | AgencyScalarFieldEnum
    having?: AgencyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgencyCountAggregateInputType | true
    _avg?: AgencyAvgAggregateInputType
    _sum?: AgencySumAggregateInputType
    _min?: AgencyMinAggregateInputType
    _max?: AgencyMaxAggregateInputType
  }

  export type AgencyGroupByOutputType = {
    AgencyID: number
    Name: string
    _count: AgencyCountAggregateOutputType | null
    _avg: AgencyAvgAggregateOutputType | null
    _sum: AgencySumAggregateOutputType | null
    _min: AgencyMinAggregateOutputType | null
    _max: AgencyMaxAggregateOutputType | null
  }

  type GetAgencyGroupByPayload<T extends AgencyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgencyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgencyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgencyGroupByOutputType[P]>
            : GetScalarType<T[P], AgencyGroupByOutputType[P]>
        }
      >
    >


  export type AgencySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    AgencyID?: boolean
    Name?: boolean
    contacts?: boolean | Agency$contactsArgs<ExtArgs>
    patents?: boolean | Agency$patentsArgs<ExtArgs>
    _count?: boolean | AgencyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agency"]>

  export type AgencySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    AgencyID?: boolean
    Name?: boolean
  }, ExtArgs["result"]["agency"]>

  export type AgencySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    AgencyID?: boolean
    Name?: boolean
  }, ExtArgs["result"]["agency"]>

  export type AgencySelectScalar = {
    AgencyID?: boolean
    Name?: boolean
  }

  export type AgencyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"AgencyID" | "Name", ExtArgs["result"]["agency"]>
  export type AgencyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contacts?: boolean | Agency$contactsArgs<ExtArgs>
    patents?: boolean | Agency$patentsArgs<ExtArgs>
    _count?: boolean | AgencyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AgencyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AgencyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AgencyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agency"
    objects: {
      contacts: Prisma.$AgencyContactPersonPayload<ExtArgs>[]
      patents: Prisma.$AgencyPatentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      AgencyID: number
      Name: string
    }, ExtArgs["result"]["agency"]>
    composites: {}
  }

  type AgencyGetPayload<S extends boolean | null | undefined | AgencyDefaultArgs> = $Result.GetResult<Prisma.$AgencyPayload, S>

  type AgencyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgencyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgencyCountAggregateInputType | true
    }

  export interface AgencyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agency'], meta: { name: 'Agency' } }
    /**
     * Find zero or one Agency that matches the filter.
     * @param {AgencyFindUniqueArgs} args - Arguments to find a Agency
     * @example
     * // Get one Agency
     * const agency = await prisma.agency.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgencyFindUniqueArgs>(args: SelectSubset<T, AgencyFindUniqueArgs<ExtArgs>>): Prisma__AgencyClient<$Result.GetResult<Prisma.$AgencyPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Agency that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgencyFindUniqueOrThrowArgs} args - Arguments to find a Agency
     * @example
     * // Get one Agency
     * const agency = await prisma.agency.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgencyFindUniqueOrThrowArgs>(args: SelectSubset<T, AgencyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgencyClient<$Result.GetResult<Prisma.$AgencyPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Agency that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyFindFirstArgs} args - Arguments to find a Agency
     * @example
     * // Get one Agency
     * const agency = await prisma.agency.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgencyFindFirstArgs>(args?: SelectSubset<T, AgencyFindFirstArgs<ExtArgs>>): Prisma__AgencyClient<$Result.GetResult<Prisma.$AgencyPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Agency that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyFindFirstOrThrowArgs} args - Arguments to find a Agency
     * @example
     * // Get one Agency
     * const agency = await prisma.agency.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgencyFindFirstOrThrowArgs>(args?: SelectSubset<T, AgencyFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgencyClient<$Result.GetResult<Prisma.$AgencyPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Agencies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agencies
     * const agencies = await prisma.agency.findMany()
     * 
     * // Get first 10 Agencies
     * const agencies = await prisma.agency.findMany({ take: 10 })
     * 
     * // Only select the `AgencyID`
     * const agencyWithAgencyIDOnly = await prisma.agency.findMany({ select: { AgencyID: true } })
     * 
     */
    findMany<T extends AgencyFindManyArgs>(args?: SelectSubset<T, AgencyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgencyPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Agency.
     * @param {AgencyCreateArgs} args - Arguments to create a Agency.
     * @example
     * // Create one Agency
     * const Agency = await prisma.agency.create({
     *   data: {
     *     // ... data to create a Agency
     *   }
     * })
     * 
     */
    create<T extends AgencyCreateArgs>(args: SelectSubset<T, AgencyCreateArgs<ExtArgs>>): Prisma__AgencyClient<$Result.GetResult<Prisma.$AgencyPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Agencies.
     * @param {AgencyCreateManyArgs} args - Arguments to create many Agencies.
     * @example
     * // Create many Agencies
     * const agency = await prisma.agency.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgencyCreateManyArgs>(args?: SelectSubset<T, AgencyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agencies and returns the data saved in the database.
     * @param {AgencyCreateManyAndReturnArgs} args - Arguments to create many Agencies.
     * @example
     * // Create many Agencies
     * const agency = await prisma.agency.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agencies and only return the `AgencyID`
     * const agencyWithAgencyIDOnly = await prisma.agency.createManyAndReturn({
     *   select: { AgencyID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgencyCreateManyAndReturnArgs>(args?: SelectSubset<T, AgencyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgencyPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Agency.
     * @param {AgencyDeleteArgs} args - Arguments to delete one Agency.
     * @example
     * // Delete one Agency
     * const Agency = await prisma.agency.delete({
     *   where: {
     *     // ... filter to delete one Agency
     *   }
     * })
     * 
     */
    delete<T extends AgencyDeleteArgs>(args: SelectSubset<T, AgencyDeleteArgs<ExtArgs>>): Prisma__AgencyClient<$Result.GetResult<Prisma.$AgencyPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Agency.
     * @param {AgencyUpdateArgs} args - Arguments to update one Agency.
     * @example
     * // Update one Agency
     * const agency = await prisma.agency.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgencyUpdateArgs>(args: SelectSubset<T, AgencyUpdateArgs<ExtArgs>>): Prisma__AgencyClient<$Result.GetResult<Prisma.$AgencyPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Agencies.
     * @param {AgencyDeleteManyArgs} args - Arguments to filter Agencies to delete.
     * @example
     * // Delete a few Agencies
     * const { count } = await prisma.agency.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgencyDeleteManyArgs>(args?: SelectSubset<T, AgencyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agencies
     * const agency = await prisma.agency.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgencyUpdateManyArgs>(args: SelectSubset<T, AgencyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agencies and returns the data updated in the database.
     * @param {AgencyUpdateManyAndReturnArgs} args - Arguments to update many Agencies.
     * @example
     * // Update many Agencies
     * const agency = await prisma.agency.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agencies and only return the `AgencyID`
     * const agencyWithAgencyIDOnly = await prisma.agency.updateManyAndReturn({
     *   select: { AgencyID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgencyUpdateManyAndReturnArgs>(args: SelectSubset<T, AgencyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgencyPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Agency.
     * @param {AgencyUpsertArgs} args - Arguments to update or create a Agency.
     * @example
     * // Update or create a Agency
     * const agency = await prisma.agency.upsert({
     *   create: {
     *     // ... data to create a Agency
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agency we want to update
     *   }
     * })
     */
    upsert<T extends AgencyUpsertArgs>(args: SelectSubset<T, AgencyUpsertArgs<ExtArgs>>): Prisma__AgencyClient<$Result.GetResult<Prisma.$AgencyPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Agencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyCountArgs} args - Arguments to filter Agencies to count.
     * @example
     * // Count the number of Agencies
     * const count = await prisma.agency.count({
     *   where: {
     *     // ... the filter for the Agencies we want to count
     *   }
     * })
    **/
    count<T extends AgencyCountArgs>(
      args?: Subset<T, AgencyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgencyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgencyAggregateArgs>(args: Subset<T, AgencyAggregateArgs>): Prisma.PrismaPromise<GetAgencyAggregateType<T>>

    /**
     * Group by Agency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgencyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgencyGroupByArgs['orderBy'] }
        : { orderBy?: AgencyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgencyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgencyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agency model
   */
  readonly fields: AgencyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agency.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgencyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contacts<T extends Agency$contactsArgs<ExtArgs> = {}>(args?: Subset<T, Agency$contactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgencyContactPersonPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    patents<T extends Agency$patentsArgs<ExtArgs> = {}>(args?: Subset<T, Agency$patentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgencyPatentPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Agency model
   */ 
  interface AgencyFieldRefs {
    readonly AgencyID: FieldRef<"Agency", 'Int'>
    readonly Name: FieldRef<"Agency", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Agency findUnique
   */
  export type AgencyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agency
     */
    select?: AgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agency
     */
    omit?: AgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyInclude<ExtArgs> | null
    /**
     * Filter, which Agency to fetch.
     */
    where: AgencyWhereUniqueInput
  }

  /**
   * Agency findUniqueOrThrow
   */
  export type AgencyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agency
     */
    select?: AgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agency
     */
    omit?: AgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyInclude<ExtArgs> | null
    /**
     * Filter, which Agency to fetch.
     */
    where: AgencyWhereUniqueInput
  }

  /**
   * Agency findFirst
   */
  export type AgencyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agency
     */
    select?: AgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agency
     */
    omit?: AgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyInclude<ExtArgs> | null
    /**
     * Filter, which Agency to fetch.
     */
    where?: AgencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agencies to fetch.
     */
    orderBy?: AgencyOrderByWithRelationInput | AgencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agencies.
     */
    cursor?: AgencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agencies.
     */
    distinct?: AgencyScalarFieldEnum | AgencyScalarFieldEnum[]
  }

  /**
   * Agency findFirstOrThrow
   */
  export type AgencyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agency
     */
    select?: AgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agency
     */
    omit?: AgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyInclude<ExtArgs> | null
    /**
     * Filter, which Agency to fetch.
     */
    where?: AgencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agencies to fetch.
     */
    orderBy?: AgencyOrderByWithRelationInput | AgencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agencies.
     */
    cursor?: AgencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agencies.
     */
    distinct?: AgencyScalarFieldEnum | AgencyScalarFieldEnum[]
  }

  /**
   * Agency findMany
   */
  export type AgencyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agency
     */
    select?: AgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agency
     */
    omit?: AgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyInclude<ExtArgs> | null
    /**
     * Filter, which Agencies to fetch.
     */
    where?: AgencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agencies to fetch.
     */
    orderBy?: AgencyOrderByWithRelationInput | AgencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agencies.
     */
    cursor?: AgencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agencies.
     */
    skip?: number
    distinct?: AgencyScalarFieldEnum | AgencyScalarFieldEnum[]
  }

  /**
   * Agency create
   */
  export type AgencyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agency
     */
    select?: AgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agency
     */
    omit?: AgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyInclude<ExtArgs> | null
    /**
     * The data needed to create a Agency.
     */
    data: XOR<AgencyCreateInput, AgencyUncheckedCreateInput>
  }

  /**
   * Agency createMany
   */
  export type AgencyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agencies.
     */
    data: AgencyCreateManyInput | AgencyCreateManyInput[]
  }

  /**
   * Agency createManyAndReturn
   */
  export type AgencyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agency
     */
    select?: AgencySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agency
     */
    omit?: AgencyOmit<ExtArgs> | null
    /**
     * The data used to create many Agencies.
     */
    data: AgencyCreateManyInput | AgencyCreateManyInput[]
  }

  /**
   * Agency update
   */
  export type AgencyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agency
     */
    select?: AgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agency
     */
    omit?: AgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyInclude<ExtArgs> | null
    /**
     * The data needed to update a Agency.
     */
    data: XOR<AgencyUpdateInput, AgencyUncheckedUpdateInput>
    /**
     * Choose, which Agency to update.
     */
    where: AgencyWhereUniqueInput
  }

  /**
   * Agency updateMany
   */
  export type AgencyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agencies.
     */
    data: XOR<AgencyUpdateManyMutationInput, AgencyUncheckedUpdateManyInput>
    /**
     * Filter which Agencies to update
     */
    where?: AgencyWhereInput
  }

  /**
   * Agency updateManyAndReturn
   */
  export type AgencyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agency
     */
    select?: AgencySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agency
     */
    omit?: AgencyOmit<ExtArgs> | null
    /**
     * The data used to update Agencies.
     */
    data: XOR<AgencyUpdateManyMutationInput, AgencyUncheckedUpdateManyInput>
    /**
     * Filter which Agencies to update
     */
    where?: AgencyWhereInput
  }

  /**
   * Agency upsert
   */
  export type AgencyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agency
     */
    select?: AgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agency
     */
    omit?: AgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyInclude<ExtArgs> | null
    /**
     * The filter to search for the Agency to update in case it exists.
     */
    where: AgencyWhereUniqueInput
    /**
     * In case the Agency found by the `where` argument doesn't exist, create a new Agency with this data.
     */
    create: XOR<AgencyCreateInput, AgencyUncheckedCreateInput>
    /**
     * In case the Agency was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgencyUpdateInput, AgencyUncheckedUpdateInput>
  }

  /**
   * Agency delete
   */
  export type AgencyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agency
     */
    select?: AgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agency
     */
    omit?: AgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyInclude<ExtArgs> | null
    /**
     * Filter which Agency to delete.
     */
    where: AgencyWhereUniqueInput
  }

  /**
   * Agency deleteMany
   */
  export type AgencyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agencies to delete
     */
    where?: AgencyWhereInput
  }

  /**
   * Agency.contacts
   */
  export type Agency$contactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonInclude<ExtArgs> | null
    where?: AgencyContactPersonWhereInput
    orderBy?: AgencyContactPersonOrderByWithRelationInput | AgencyContactPersonOrderByWithRelationInput[]
    cursor?: AgencyContactPersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgencyContactPersonScalarFieldEnum | AgencyContactPersonScalarFieldEnum[]
  }

  /**
   * Agency.patents
   */
  export type Agency$patentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentInclude<ExtArgs> | null
    where?: AgencyPatentWhereInput
    orderBy?: AgencyPatentOrderByWithRelationInput | AgencyPatentOrderByWithRelationInput[]
    cursor?: AgencyPatentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgencyPatentScalarFieldEnum | AgencyPatentScalarFieldEnum[]
  }

  /**
   * Agency without action
   */
  export type AgencyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agency
     */
    select?: AgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agency
     */
    omit?: AgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyInclude<ExtArgs> | null
  }


  /**
   * Model AgencyPatent
   */

  export type AggregateAgencyPatent = {
    _count: AgencyPatentCountAggregateOutputType | null
    _avg: AgencyPatentAvgAggregateOutputType | null
    _sum: AgencyPatentSumAggregateOutputType | null
    _min: AgencyPatentMinAggregateOutputType | null
    _max: AgencyPatentMaxAggregateOutputType | null
  }

  export type AgencyPatentAvgAggregateOutputType = {
    PatentID: number | null
    AgencyID: number | null
  }

  export type AgencyPatentSumAggregateOutputType = {
    PatentID: number | null
    AgencyID: number | null
  }

  export type AgencyPatentMinAggregateOutputType = {
    PatentID: number | null
    AgencyID: number | null
    FileCode: string | null
    Role: string | null
    Details: string | null
  }

  export type AgencyPatentMaxAggregateOutputType = {
    PatentID: number | null
    AgencyID: number | null
    FileCode: string | null
    Role: string | null
    Details: string | null
  }

  export type AgencyPatentCountAggregateOutputType = {
    PatentID: number
    AgencyID: number
    FileCode: number
    Role: number
    Details: number
    _all: number
  }


  export type AgencyPatentAvgAggregateInputType = {
    PatentID?: true
    AgencyID?: true
  }

  export type AgencyPatentSumAggregateInputType = {
    PatentID?: true
    AgencyID?: true
  }

  export type AgencyPatentMinAggregateInputType = {
    PatentID?: true
    AgencyID?: true
    FileCode?: true
    Role?: true
    Details?: true
  }

  export type AgencyPatentMaxAggregateInputType = {
    PatentID?: true
    AgencyID?: true
    FileCode?: true
    Role?: true
    Details?: true
  }

  export type AgencyPatentCountAggregateInputType = {
    PatentID?: true
    AgencyID?: true
    FileCode?: true
    Role?: true
    Details?: true
    _all?: true
  }

  export type AgencyPatentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgencyPatent to aggregate.
     */
    where?: AgencyPatentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgencyPatents to fetch.
     */
    orderBy?: AgencyPatentOrderByWithRelationInput | AgencyPatentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgencyPatentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgencyPatents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgencyPatents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgencyPatents
    **/
    _count?: true | AgencyPatentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgencyPatentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgencyPatentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgencyPatentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgencyPatentMaxAggregateInputType
  }

  export type GetAgencyPatentAggregateType<T extends AgencyPatentAggregateArgs> = {
        [P in keyof T & keyof AggregateAgencyPatent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgencyPatent[P]>
      : GetScalarType<T[P], AggregateAgencyPatent[P]>
  }




  export type AgencyPatentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgencyPatentWhereInput
    orderBy?: AgencyPatentOrderByWithAggregationInput | AgencyPatentOrderByWithAggregationInput[]
    by: AgencyPatentScalarFieldEnum[] | AgencyPatentScalarFieldEnum
    having?: AgencyPatentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgencyPatentCountAggregateInputType | true
    _avg?: AgencyPatentAvgAggregateInputType
    _sum?: AgencyPatentSumAggregateInputType
    _min?: AgencyPatentMinAggregateInputType
    _max?: AgencyPatentMaxAggregateInputType
  }

  export type AgencyPatentGroupByOutputType = {
    PatentID: number
    AgencyID: number
    FileCode: string
    Role: string
    Details: string | null
    _count: AgencyPatentCountAggregateOutputType | null
    _avg: AgencyPatentAvgAggregateOutputType | null
    _sum: AgencyPatentSumAggregateOutputType | null
    _min: AgencyPatentMinAggregateOutputType | null
    _max: AgencyPatentMaxAggregateOutputType | null
  }

  type GetAgencyPatentGroupByPayload<T extends AgencyPatentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgencyPatentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgencyPatentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgencyPatentGroupByOutputType[P]>
            : GetScalarType<T[P], AgencyPatentGroupByOutputType[P]>
        }
      >
    >


  export type AgencyPatentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    AgencyID?: boolean
    FileCode?: boolean
    Role?: boolean
    Details?: boolean
    agency?: boolean | AgencyDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agencyPatent"]>

  export type AgencyPatentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    AgencyID?: boolean
    FileCode?: boolean
    Role?: boolean
    Details?: boolean
    agency?: boolean | AgencyDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agencyPatent"]>

  export type AgencyPatentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    AgencyID?: boolean
    FileCode?: boolean
    Role?: boolean
    Details?: boolean
    agency?: boolean | AgencyDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agencyPatent"]>

  export type AgencyPatentSelectScalar = {
    PatentID?: boolean
    AgencyID?: boolean
    FileCode?: boolean
    Role?: boolean
    Details?: boolean
  }

  export type AgencyPatentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"PatentID" | "AgencyID" | "FileCode" | "Role" | "Details", ExtArgs["result"]["agencyPatent"]>
  export type AgencyPatentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agency?: boolean | AgencyDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }
  export type AgencyPatentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agency?: boolean | AgencyDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }
  export type AgencyPatentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agency?: boolean | AgencyDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }

  export type $AgencyPatentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgencyPatent"
    objects: {
      agency: Prisma.$AgencyPayload<ExtArgs>
      patent: Prisma.$PatentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      PatentID: number
      AgencyID: number
      FileCode: string
      Role: string
      Details: string | null
    }, ExtArgs["result"]["agencyPatent"]>
    composites: {}
  }

  type AgencyPatentGetPayload<S extends boolean | null | undefined | AgencyPatentDefaultArgs> = $Result.GetResult<Prisma.$AgencyPatentPayload, S>

  type AgencyPatentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgencyPatentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgencyPatentCountAggregateInputType | true
    }

  export interface AgencyPatentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgencyPatent'], meta: { name: 'AgencyPatent' } }
    /**
     * Find zero or one AgencyPatent that matches the filter.
     * @param {AgencyPatentFindUniqueArgs} args - Arguments to find a AgencyPatent
     * @example
     * // Get one AgencyPatent
     * const agencyPatent = await prisma.agencyPatent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgencyPatentFindUniqueArgs>(args: SelectSubset<T, AgencyPatentFindUniqueArgs<ExtArgs>>): Prisma__AgencyPatentClient<$Result.GetResult<Prisma.$AgencyPatentPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one AgencyPatent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgencyPatentFindUniqueOrThrowArgs} args - Arguments to find a AgencyPatent
     * @example
     * // Get one AgencyPatent
     * const agencyPatent = await prisma.agencyPatent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgencyPatentFindUniqueOrThrowArgs>(args: SelectSubset<T, AgencyPatentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgencyPatentClient<$Result.GetResult<Prisma.$AgencyPatentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first AgencyPatent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyPatentFindFirstArgs} args - Arguments to find a AgencyPatent
     * @example
     * // Get one AgencyPatent
     * const agencyPatent = await prisma.agencyPatent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgencyPatentFindFirstArgs>(args?: SelectSubset<T, AgencyPatentFindFirstArgs<ExtArgs>>): Prisma__AgencyPatentClient<$Result.GetResult<Prisma.$AgencyPatentPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first AgencyPatent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyPatentFindFirstOrThrowArgs} args - Arguments to find a AgencyPatent
     * @example
     * // Get one AgencyPatent
     * const agencyPatent = await prisma.agencyPatent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgencyPatentFindFirstOrThrowArgs>(args?: SelectSubset<T, AgencyPatentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgencyPatentClient<$Result.GetResult<Prisma.$AgencyPatentPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more AgencyPatents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyPatentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgencyPatents
     * const agencyPatents = await prisma.agencyPatent.findMany()
     * 
     * // Get first 10 AgencyPatents
     * const agencyPatents = await prisma.agencyPatent.findMany({ take: 10 })
     * 
     * // Only select the `PatentID`
     * const agencyPatentWithPatentIDOnly = await prisma.agencyPatent.findMany({ select: { PatentID: true } })
     * 
     */
    findMany<T extends AgencyPatentFindManyArgs>(args?: SelectSubset<T, AgencyPatentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgencyPatentPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a AgencyPatent.
     * @param {AgencyPatentCreateArgs} args - Arguments to create a AgencyPatent.
     * @example
     * // Create one AgencyPatent
     * const AgencyPatent = await prisma.agencyPatent.create({
     *   data: {
     *     // ... data to create a AgencyPatent
     *   }
     * })
     * 
     */
    create<T extends AgencyPatentCreateArgs>(args: SelectSubset<T, AgencyPatentCreateArgs<ExtArgs>>): Prisma__AgencyPatentClient<$Result.GetResult<Prisma.$AgencyPatentPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many AgencyPatents.
     * @param {AgencyPatentCreateManyArgs} args - Arguments to create many AgencyPatents.
     * @example
     * // Create many AgencyPatents
     * const agencyPatent = await prisma.agencyPatent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgencyPatentCreateManyArgs>(args?: SelectSubset<T, AgencyPatentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgencyPatents and returns the data saved in the database.
     * @param {AgencyPatentCreateManyAndReturnArgs} args - Arguments to create many AgencyPatents.
     * @example
     * // Create many AgencyPatents
     * const agencyPatent = await prisma.agencyPatent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgencyPatents and only return the `PatentID`
     * const agencyPatentWithPatentIDOnly = await prisma.agencyPatent.createManyAndReturn({
     *   select: { PatentID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgencyPatentCreateManyAndReturnArgs>(args?: SelectSubset<T, AgencyPatentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgencyPatentPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a AgencyPatent.
     * @param {AgencyPatentDeleteArgs} args - Arguments to delete one AgencyPatent.
     * @example
     * // Delete one AgencyPatent
     * const AgencyPatent = await prisma.agencyPatent.delete({
     *   where: {
     *     // ... filter to delete one AgencyPatent
     *   }
     * })
     * 
     */
    delete<T extends AgencyPatentDeleteArgs>(args: SelectSubset<T, AgencyPatentDeleteArgs<ExtArgs>>): Prisma__AgencyPatentClient<$Result.GetResult<Prisma.$AgencyPatentPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one AgencyPatent.
     * @param {AgencyPatentUpdateArgs} args - Arguments to update one AgencyPatent.
     * @example
     * // Update one AgencyPatent
     * const agencyPatent = await prisma.agencyPatent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgencyPatentUpdateArgs>(args: SelectSubset<T, AgencyPatentUpdateArgs<ExtArgs>>): Prisma__AgencyPatentClient<$Result.GetResult<Prisma.$AgencyPatentPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more AgencyPatents.
     * @param {AgencyPatentDeleteManyArgs} args - Arguments to filter AgencyPatents to delete.
     * @example
     * // Delete a few AgencyPatents
     * const { count } = await prisma.agencyPatent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgencyPatentDeleteManyArgs>(args?: SelectSubset<T, AgencyPatentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgencyPatents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyPatentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgencyPatents
     * const agencyPatent = await prisma.agencyPatent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgencyPatentUpdateManyArgs>(args: SelectSubset<T, AgencyPatentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgencyPatents and returns the data updated in the database.
     * @param {AgencyPatentUpdateManyAndReturnArgs} args - Arguments to update many AgencyPatents.
     * @example
     * // Update many AgencyPatents
     * const agencyPatent = await prisma.agencyPatent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgencyPatents and only return the `PatentID`
     * const agencyPatentWithPatentIDOnly = await prisma.agencyPatent.updateManyAndReturn({
     *   select: { PatentID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgencyPatentUpdateManyAndReturnArgs>(args: SelectSubset<T, AgencyPatentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgencyPatentPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one AgencyPatent.
     * @param {AgencyPatentUpsertArgs} args - Arguments to update or create a AgencyPatent.
     * @example
     * // Update or create a AgencyPatent
     * const agencyPatent = await prisma.agencyPatent.upsert({
     *   create: {
     *     // ... data to create a AgencyPatent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgencyPatent we want to update
     *   }
     * })
     */
    upsert<T extends AgencyPatentUpsertArgs>(args: SelectSubset<T, AgencyPatentUpsertArgs<ExtArgs>>): Prisma__AgencyPatentClient<$Result.GetResult<Prisma.$AgencyPatentPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of AgencyPatents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyPatentCountArgs} args - Arguments to filter AgencyPatents to count.
     * @example
     * // Count the number of AgencyPatents
     * const count = await prisma.agencyPatent.count({
     *   where: {
     *     // ... the filter for the AgencyPatents we want to count
     *   }
     * })
    **/
    count<T extends AgencyPatentCountArgs>(
      args?: Subset<T, AgencyPatentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgencyPatentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgencyPatent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyPatentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgencyPatentAggregateArgs>(args: Subset<T, AgencyPatentAggregateArgs>): Prisma.PrismaPromise<GetAgencyPatentAggregateType<T>>

    /**
     * Group by AgencyPatent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyPatentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgencyPatentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgencyPatentGroupByArgs['orderBy'] }
        : { orderBy?: AgencyPatentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgencyPatentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgencyPatentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgencyPatent model
   */
  readonly fields: AgencyPatentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgencyPatent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgencyPatentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agency<T extends AgencyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgencyDefaultArgs<ExtArgs>>): Prisma__AgencyClient<$Result.GetResult<Prisma.$AgencyPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    patent<T extends PatentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatentDefaultArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgencyPatent model
   */ 
  interface AgencyPatentFieldRefs {
    readonly PatentID: FieldRef<"AgencyPatent", 'Int'>
    readonly AgencyID: FieldRef<"AgencyPatent", 'Int'>
    readonly FileCode: FieldRef<"AgencyPatent", 'String'>
    readonly Role: FieldRef<"AgencyPatent", 'String'>
    readonly Details: FieldRef<"AgencyPatent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AgencyPatent findUnique
   */
  export type AgencyPatentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentInclude<ExtArgs> | null
    /**
     * Filter, which AgencyPatent to fetch.
     */
    where: AgencyPatentWhereUniqueInput
  }

  /**
   * AgencyPatent findUniqueOrThrow
   */
  export type AgencyPatentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentInclude<ExtArgs> | null
    /**
     * Filter, which AgencyPatent to fetch.
     */
    where: AgencyPatentWhereUniqueInput
  }

  /**
   * AgencyPatent findFirst
   */
  export type AgencyPatentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentInclude<ExtArgs> | null
    /**
     * Filter, which AgencyPatent to fetch.
     */
    where?: AgencyPatentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgencyPatents to fetch.
     */
    orderBy?: AgencyPatentOrderByWithRelationInput | AgencyPatentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgencyPatents.
     */
    cursor?: AgencyPatentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgencyPatents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgencyPatents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgencyPatents.
     */
    distinct?: AgencyPatentScalarFieldEnum | AgencyPatentScalarFieldEnum[]
  }

  /**
   * AgencyPatent findFirstOrThrow
   */
  export type AgencyPatentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentInclude<ExtArgs> | null
    /**
     * Filter, which AgencyPatent to fetch.
     */
    where?: AgencyPatentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgencyPatents to fetch.
     */
    orderBy?: AgencyPatentOrderByWithRelationInput | AgencyPatentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgencyPatents.
     */
    cursor?: AgencyPatentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgencyPatents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgencyPatents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgencyPatents.
     */
    distinct?: AgencyPatentScalarFieldEnum | AgencyPatentScalarFieldEnum[]
  }

  /**
   * AgencyPatent findMany
   */
  export type AgencyPatentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentInclude<ExtArgs> | null
    /**
     * Filter, which AgencyPatents to fetch.
     */
    where?: AgencyPatentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgencyPatents to fetch.
     */
    orderBy?: AgencyPatentOrderByWithRelationInput | AgencyPatentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgencyPatents.
     */
    cursor?: AgencyPatentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgencyPatents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgencyPatents.
     */
    skip?: number
    distinct?: AgencyPatentScalarFieldEnum | AgencyPatentScalarFieldEnum[]
  }

  /**
   * AgencyPatent create
   */
  export type AgencyPatentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentInclude<ExtArgs> | null
    /**
     * The data needed to create a AgencyPatent.
     */
    data: XOR<AgencyPatentCreateInput, AgencyPatentUncheckedCreateInput>
  }

  /**
   * AgencyPatent createMany
   */
  export type AgencyPatentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgencyPatents.
     */
    data: AgencyPatentCreateManyInput | AgencyPatentCreateManyInput[]
  }

  /**
   * AgencyPatent createManyAndReturn
   */
  export type AgencyPatentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * The data used to create many AgencyPatents.
     */
    data: AgencyPatentCreateManyInput | AgencyPatentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgencyPatent update
   */
  export type AgencyPatentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentInclude<ExtArgs> | null
    /**
     * The data needed to update a AgencyPatent.
     */
    data: XOR<AgencyPatentUpdateInput, AgencyPatentUncheckedUpdateInput>
    /**
     * Choose, which AgencyPatent to update.
     */
    where: AgencyPatentWhereUniqueInput
  }

  /**
   * AgencyPatent updateMany
   */
  export type AgencyPatentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgencyPatents.
     */
    data: XOR<AgencyPatentUpdateManyMutationInput, AgencyPatentUncheckedUpdateManyInput>
    /**
     * Filter which AgencyPatents to update
     */
    where?: AgencyPatentWhereInput
  }

  /**
   * AgencyPatent updateManyAndReturn
   */
  export type AgencyPatentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * The data used to update AgencyPatents.
     */
    data: XOR<AgencyPatentUpdateManyMutationInput, AgencyPatentUncheckedUpdateManyInput>
    /**
     * Filter which AgencyPatents to update
     */
    where?: AgencyPatentWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgencyPatent upsert
   */
  export type AgencyPatentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentInclude<ExtArgs> | null
    /**
     * The filter to search for the AgencyPatent to update in case it exists.
     */
    where: AgencyPatentWhereUniqueInput
    /**
     * In case the AgencyPatent found by the `where` argument doesn't exist, create a new AgencyPatent with this data.
     */
    create: XOR<AgencyPatentCreateInput, AgencyPatentUncheckedCreateInput>
    /**
     * In case the AgencyPatent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgencyPatentUpdateInput, AgencyPatentUncheckedUpdateInput>
  }

  /**
   * AgencyPatent delete
   */
  export type AgencyPatentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentInclude<ExtArgs> | null
    /**
     * Filter which AgencyPatent to delete.
     */
    where: AgencyPatentWhereUniqueInput
  }

  /**
   * AgencyPatent deleteMany
   */
  export type AgencyPatentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgencyPatents to delete
     */
    where?: AgencyPatentWhereInput
  }

  /**
   * AgencyPatent without action
   */
  export type AgencyPatentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentInclude<ExtArgs> | null
  }


  /**
   * Model AgencyContactPerson
   */

  export type AggregateAgencyContactPerson = {
    _count: AgencyContactPersonCountAggregateOutputType | null
    _avg: AgencyContactPersonAvgAggregateOutputType | null
    _sum: AgencyContactPersonSumAggregateOutputType | null
    _min: AgencyContactPersonMinAggregateOutputType | null
    _max: AgencyContactPersonMaxAggregateOutputType | null
  }

  export type AgencyContactPersonAvgAggregateOutputType = {
    ContactPersonID: number | null
    AgencyID: number | null
    ContactInfoID: number | null
  }

  export type AgencyContactPersonSumAggregateOutputType = {
    ContactPersonID: number | null
    AgencyID: number | null
    ContactInfoID: number | null
  }

  export type AgencyContactPersonMinAggregateOutputType = {
    ContactPersonID: number | null
    AgencyID: number | null
    Position: string | null
    ContactInfoID: number | null
  }

  export type AgencyContactPersonMaxAggregateOutputType = {
    ContactPersonID: number | null
    AgencyID: number | null
    Position: string | null
    ContactInfoID: number | null
  }

  export type AgencyContactPersonCountAggregateOutputType = {
    ContactPersonID: number
    AgencyID: number
    Position: number
    ContactInfoID: number
    _all: number
  }


  export type AgencyContactPersonAvgAggregateInputType = {
    ContactPersonID?: true
    AgencyID?: true
    ContactInfoID?: true
  }

  export type AgencyContactPersonSumAggregateInputType = {
    ContactPersonID?: true
    AgencyID?: true
    ContactInfoID?: true
  }

  export type AgencyContactPersonMinAggregateInputType = {
    ContactPersonID?: true
    AgencyID?: true
    Position?: true
    ContactInfoID?: true
  }

  export type AgencyContactPersonMaxAggregateInputType = {
    ContactPersonID?: true
    AgencyID?: true
    Position?: true
    ContactInfoID?: true
  }

  export type AgencyContactPersonCountAggregateInputType = {
    ContactPersonID?: true
    AgencyID?: true
    Position?: true
    ContactInfoID?: true
    _all?: true
  }

  export type AgencyContactPersonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgencyContactPerson to aggregate.
     */
    where?: AgencyContactPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgencyContactPeople to fetch.
     */
    orderBy?: AgencyContactPersonOrderByWithRelationInput | AgencyContactPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgencyContactPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgencyContactPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgencyContactPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgencyContactPeople
    **/
    _count?: true | AgencyContactPersonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgencyContactPersonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgencyContactPersonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgencyContactPersonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgencyContactPersonMaxAggregateInputType
  }

  export type GetAgencyContactPersonAggregateType<T extends AgencyContactPersonAggregateArgs> = {
        [P in keyof T & keyof AggregateAgencyContactPerson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgencyContactPerson[P]>
      : GetScalarType<T[P], AggregateAgencyContactPerson[P]>
  }




  export type AgencyContactPersonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgencyContactPersonWhereInput
    orderBy?: AgencyContactPersonOrderByWithAggregationInput | AgencyContactPersonOrderByWithAggregationInput[]
    by: AgencyContactPersonScalarFieldEnum[] | AgencyContactPersonScalarFieldEnum
    having?: AgencyContactPersonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgencyContactPersonCountAggregateInputType | true
    _avg?: AgencyContactPersonAvgAggregateInputType
    _sum?: AgencyContactPersonSumAggregateInputType
    _min?: AgencyContactPersonMinAggregateInputType
    _max?: AgencyContactPersonMaxAggregateInputType
  }

  export type AgencyContactPersonGroupByOutputType = {
    ContactPersonID: number
    AgencyID: number
    Position: string
    ContactInfoID: number | null
    _count: AgencyContactPersonCountAggregateOutputType | null
    _avg: AgencyContactPersonAvgAggregateOutputType | null
    _sum: AgencyContactPersonSumAggregateOutputType | null
    _min: AgencyContactPersonMinAggregateOutputType | null
    _max: AgencyContactPersonMaxAggregateOutputType | null
  }

  type GetAgencyContactPersonGroupByPayload<T extends AgencyContactPersonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgencyContactPersonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgencyContactPersonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgencyContactPersonGroupByOutputType[P]>
            : GetScalarType<T[P], AgencyContactPersonGroupByOutputType[P]>
        }
      >
    >


  export type AgencyContactPersonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ContactPersonID?: boolean
    AgencyID?: boolean
    Position?: boolean
    ContactInfoID?: boolean
    contactInfo?: boolean | AgencyContactPerson$contactInfoArgs<ExtArgs>
    agency?: boolean | AgencyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agencyContactPerson"]>

  export type AgencyContactPersonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ContactPersonID?: boolean
    AgencyID?: boolean
    Position?: boolean
    ContactInfoID?: boolean
    contactInfo?: boolean | AgencyContactPerson$contactInfoArgs<ExtArgs>
    agency?: boolean | AgencyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agencyContactPerson"]>

  export type AgencyContactPersonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ContactPersonID?: boolean
    AgencyID?: boolean
    Position?: boolean
    ContactInfoID?: boolean
    contactInfo?: boolean | AgencyContactPerson$contactInfoArgs<ExtArgs>
    agency?: boolean | AgencyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agencyContactPerson"]>

  export type AgencyContactPersonSelectScalar = {
    ContactPersonID?: boolean
    AgencyID?: boolean
    Position?: boolean
    ContactInfoID?: boolean
  }

  export type AgencyContactPersonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ContactPersonID" | "AgencyID" | "Position" | "ContactInfoID", ExtArgs["result"]["agencyContactPerson"]>
  export type AgencyContactPersonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contactInfo?: boolean | AgencyContactPerson$contactInfoArgs<ExtArgs>
    agency?: boolean | AgencyDefaultArgs<ExtArgs>
  }
  export type AgencyContactPersonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contactInfo?: boolean | AgencyContactPerson$contactInfoArgs<ExtArgs>
    agency?: boolean | AgencyDefaultArgs<ExtArgs>
  }
  export type AgencyContactPersonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contactInfo?: boolean | AgencyContactPerson$contactInfoArgs<ExtArgs>
    agency?: boolean | AgencyDefaultArgs<ExtArgs>
  }

  export type $AgencyContactPersonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgencyContactPerson"
    objects: {
      contactInfo: Prisma.$ContactInfoPayload<ExtArgs> | null
      agency: Prisma.$AgencyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      ContactPersonID: number
      AgencyID: number
      Position: string
      ContactInfoID: number | null
    }, ExtArgs["result"]["agencyContactPerson"]>
    composites: {}
  }

  type AgencyContactPersonGetPayload<S extends boolean | null | undefined | AgencyContactPersonDefaultArgs> = $Result.GetResult<Prisma.$AgencyContactPersonPayload, S>

  type AgencyContactPersonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgencyContactPersonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgencyContactPersonCountAggregateInputType | true
    }

  export interface AgencyContactPersonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgencyContactPerson'], meta: { name: 'AgencyContactPerson' } }
    /**
     * Find zero or one AgencyContactPerson that matches the filter.
     * @param {AgencyContactPersonFindUniqueArgs} args - Arguments to find a AgencyContactPerson
     * @example
     * // Get one AgencyContactPerson
     * const agencyContactPerson = await prisma.agencyContactPerson.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgencyContactPersonFindUniqueArgs>(args: SelectSubset<T, AgencyContactPersonFindUniqueArgs<ExtArgs>>): Prisma__AgencyContactPersonClient<$Result.GetResult<Prisma.$AgencyContactPersonPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one AgencyContactPerson that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgencyContactPersonFindUniqueOrThrowArgs} args - Arguments to find a AgencyContactPerson
     * @example
     * // Get one AgencyContactPerson
     * const agencyContactPerson = await prisma.agencyContactPerson.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgencyContactPersonFindUniqueOrThrowArgs>(args: SelectSubset<T, AgencyContactPersonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgencyContactPersonClient<$Result.GetResult<Prisma.$AgencyContactPersonPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first AgencyContactPerson that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyContactPersonFindFirstArgs} args - Arguments to find a AgencyContactPerson
     * @example
     * // Get one AgencyContactPerson
     * const agencyContactPerson = await prisma.agencyContactPerson.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgencyContactPersonFindFirstArgs>(args?: SelectSubset<T, AgencyContactPersonFindFirstArgs<ExtArgs>>): Prisma__AgencyContactPersonClient<$Result.GetResult<Prisma.$AgencyContactPersonPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first AgencyContactPerson that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyContactPersonFindFirstOrThrowArgs} args - Arguments to find a AgencyContactPerson
     * @example
     * // Get one AgencyContactPerson
     * const agencyContactPerson = await prisma.agencyContactPerson.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgencyContactPersonFindFirstOrThrowArgs>(args?: SelectSubset<T, AgencyContactPersonFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgencyContactPersonClient<$Result.GetResult<Prisma.$AgencyContactPersonPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more AgencyContactPeople that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyContactPersonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgencyContactPeople
     * const agencyContactPeople = await prisma.agencyContactPerson.findMany()
     * 
     * // Get first 10 AgencyContactPeople
     * const agencyContactPeople = await prisma.agencyContactPerson.findMany({ take: 10 })
     * 
     * // Only select the `ContactPersonID`
     * const agencyContactPersonWithContactPersonIDOnly = await prisma.agencyContactPerson.findMany({ select: { ContactPersonID: true } })
     * 
     */
    findMany<T extends AgencyContactPersonFindManyArgs>(args?: SelectSubset<T, AgencyContactPersonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgencyContactPersonPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a AgencyContactPerson.
     * @param {AgencyContactPersonCreateArgs} args - Arguments to create a AgencyContactPerson.
     * @example
     * // Create one AgencyContactPerson
     * const AgencyContactPerson = await prisma.agencyContactPerson.create({
     *   data: {
     *     // ... data to create a AgencyContactPerson
     *   }
     * })
     * 
     */
    create<T extends AgencyContactPersonCreateArgs>(args: SelectSubset<T, AgencyContactPersonCreateArgs<ExtArgs>>): Prisma__AgencyContactPersonClient<$Result.GetResult<Prisma.$AgencyContactPersonPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many AgencyContactPeople.
     * @param {AgencyContactPersonCreateManyArgs} args - Arguments to create many AgencyContactPeople.
     * @example
     * // Create many AgencyContactPeople
     * const agencyContactPerson = await prisma.agencyContactPerson.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgencyContactPersonCreateManyArgs>(args?: SelectSubset<T, AgencyContactPersonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgencyContactPeople and returns the data saved in the database.
     * @param {AgencyContactPersonCreateManyAndReturnArgs} args - Arguments to create many AgencyContactPeople.
     * @example
     * // Create many AgencyContactPeople
     * const agencyContactPerson = await prisma.agencyContactPerson.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgencyContactPeople and only return the `ContactPersonID`
     * const agencyContactPersonWithContactPersonIDOnly = await prisma.agencyContactPerson.createManyAndReturn({
     *   select: { ContactPersonID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgencyContactPersonCreateManyAndReturnArgs>(args?: SelectSubset<T, AgencyContactPersonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgencyContactPersonPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a AgencyContactPerson.
     * @param {AgencyContactPersonDeleteArgs} args - Arguments to delete one AgencyContactPerson.
     * @example
     * // Delete one AgencyContactPerson
     * const AgencyContactPerson = await prisma.agencyContactPerson.delete({
     *   where: {
     *     // ... filter to delete one AgencyContactPerson
     *   }
     * })
     * 
     */
    delete<T extends AgencyContactPersonDeleteArgs>(args: SelectSubset<T, AgencyContactPersonDeleteArgs<ExtArgs>>): Prisma__AgencyContactPersonClient<$Result.GetResult<Prisma.$AgencyContactPersonPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one AgencyContactPerson.
     * @param {AgencyContactPersonUpdateArgs} args - Arguments to update one AgencyContactPerson.
     * @example
     * // Update one AgencyContactPerson
     * const agencyContactPerson = await prisma.agencyContactPerson.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgencyContactPersonUpdateArgs>(args: SelectSubset<T, AgencyContactPersonUpdateArgs<ExtArgs>>): Prisma__AgencyContactPersonClient<$Result.GetResult<Prisma.$AgencyContactPersonPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more AgencyContactPeople.
     * @param {AgencyContactPersonDeleteManyArgs} args - Arguments to filter AgencyContactPeople to delete.
     * @example
     * // Delete a few AgencyContactPeople
     * const { count } = await prisma.agencyContactPerson.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgencyContactPersonDeleteManyArgs>(args?: SelectSubset<T, AgencyContactPersonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgencyContactPeople.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyContactPersonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgencyContactPeople
     * const agencyContactPerson = await prisma.agencyContactPerson.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgencyContactPersonUpdateManyArgs>(args: SelectSubset<T, AgencyContactPersonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgencyContactPeople and returns the data updated in the database.
     * @param {AgencyContactPersonUpdateManyAndReturnArgs} args - Arguments to update many AgencyContactPeople.
     * @example
     * // Update many AgencyContactPeople
     * const agencyContactPerson = await prisma.agencyContactPerson.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgencyContactPeople and only return the `ContactPersonID`
     * const agencyContactPersonWithContactPersonIDOnly = await prisma.agencyContactPerson.updateManyAndReturn({
     *   select: { ContactPersonID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgencyContactPersonUpdateManyAndReturnArgs>(args: SelectSubset<T, AgencyContactPersonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgencyContactPersonPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one AgencyContactPerson.
     * @param {AgencyContactPersonUpsertArgs} args - Arguments to update or create a AgencyContactPerson.
     * @example
     * // Update or create a AgencyContactPerson
     * const agencyContactPerson = await prisma.agencyContactPerson.upsert({
     *   create: {
     *     // ... data to create a AgencyContactPerson
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgencyContactPerson we want to update
     *   }
     * })
     */
    upsert<T extends AgencyContactPersonUpsertArgs>(args: SelectSubset<T, AgencyContactPersonUpsertArgs<ExtArgs>>): Prisma__AgencyContactPersonClient<$Result.GetResult<Prisma.$AgencyContactPersonPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of AgencyContactPeople.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyContactPersonCountArgs} args - Arguments to filter AgencyContactPeople to count.
     * @example
     * // Count the number of AgencyContactPeople
     * const count = await prisma.agencyContactPerson.count({
     *   where: {
     *     // ... the filter for the AgencyContactPeople we want to count
     *   }
     * })
    **/
    count<T extends AgencyContactPersonCountArgs>(
      args?: Subset<T, AgencyContactPersonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgencyContactPersonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgencyContactPerson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyContactPersonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgencyContactPersonAggregateArgs>(args: Subset<T, AgencyContactPersonAggregateArgs>): Prisma.PrismaPromise<GetAgencyContactPersonAggregateType<T>>

    /**
     * Group by AgencyContactPerson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgencyContactPersonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgencyContactPersonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgencyContactPersonGroupByArgs['orderBy'] }
        : { orderBy?: AgencyContactPersonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgencyContactPersonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgencyContactPersonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgencyContactPerson model
   */
  readonly fields: AgencyContactPersonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgencyContactPerson.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgencyContactPersonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contactInfo<T extends AgencyContactPerson$contactInfoArgs<ExtArgs> = {}>(args?: Subset<T, AgencyContactPerson$contactInfoArgs<ExtArgs>>): Prisma__ContactInfoClient<$Result.GetResult<Prisma.$ContactInfoPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    agency<T extends AgencyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgencyDefaultArgs<ExtArgs>>): Prisma__AgencyClient<$Result.GetResult<Prisma.$AgencyPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgencyContactPerson model
   */ 
  interface AgencyContactPersonFieldRefs {
    readonly ContactPersonID: FieldRef<"AgencyContactPerson", 'Int'>
    readonly AgencyID: FieldRef<"AgencyContactPerson", 'Int'>
    readonly Position: FieldRef<"AgencyContactPerson", 'String'>
    readonly ContactInfoID: FieldRef<"AgencyContactPerson", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AgencyContactPerson findUnique
   */
  export type AgencyContactPersonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which AgencyContactPerson to fetch.
     */
    where: AgencyContactPersonWhereUniqueInput
  }

  /**
   * AgencyContactPerson findUniqueOrThrow
   */
  export type AgencyContactPersonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which AgencyContactPerson to fetch.
     */
    where: AgencyContactPersonWhereUniqueInput
  }

  /**
   * AgencyContactPerson findFirst
   */
  export type AgencyContactPersonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which AgencyContactPerson to fetch.
     */
    where?: AgencyContactPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgencyContactPeople to fetch.
     */
    orderBy?: AgencyContactPersonOrderByWithRelationInput | AgencyContactPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgencyContactPeople.
     */
    cursor?: AgencyContactPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgencyContactPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgencyContactPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgencyContactPeople.
     */
    distinct?: AgencyContactPersonScalarFieldEnum | AgencyContactPersonScalarFieldEnum[]
  }

  /**
   * AgencyContactPerson findFirstOrThrow
   */
  export type AgencyContactPersonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which AgencyContactPerson to fetch.
     */
    where?: AgencyContactPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgencyContactPeople to fetch.
     */
    orderBy?: AgencyContactPersonOrderByWithRelationInput | AgencyContactPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgencyContactPeople.
     */
    cursor?: AgencyContactPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgencyContactPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgencyContactPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgencyContactPeople.
     */
    distinct?: AgencyContactPersonScalarFieldEnum | AgencyContactPersonScalarFieldEnum[]
  }

  /**
   * AgencyContactPerson findMany
   */
  export type AgencyContactPersonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonInclude<ExtArgs> | null
    /**
     * Filter, which AgencyContactPeople to fetch.
     */
    where?: AgencyContactPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgencyContactPeople to fetch.
     */
    orderBy?: AgencyContactPersonOrderByWithRelationInput | AgencyContactPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgencyContactPeople.
     */
    cursor?: AgencyContactPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgencyContactPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgencyContactPeople.
     */
    skip?: number
    distinct?: AgencyContactPersonScalarFieldEnum | AgencyContactPersonScalarFieldEnum[]
  }

  /**
   * AgencyContactPerson create
   */
  export type AgencyContactPersonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonInclude<ExtArgs> | null
    /**
     * The data needed to create a AgencyContactPerson.
     */
    data: XOR<AgencyContactPersonCreateInput, AgencyContactPersonUncheckedCreateInput>
  }

  /**
   * AgencyContactPerson createMany
   */
  export type AgencyContactPersonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgencyContactPeople.
     */
    data: AgencyContactPersonCreateManyInput | AgencyContactPersonCreateManyInput[]
  }

  /**
   * AgencyContactPerson createManyAndReturn
   */
  export type AgencyContactPersonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * The data used to create many AgencyContactPeople.
     */
    data: AgencyContactPersonCreateManyInput | AgencyContactPersonCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgencyContactPerson update
   */
  export type AgencyContactPersonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonInclude<ExtArgs> | null
    /**
     * The data needed to update a AgencyContactPerson.
     */
    data: XOR<AgencyContactPersonUpdateInput, AgencyContactPersonUncheckedUpdateInput>
    /**
     * Choose, which AgencyContactPerson to update.
     */
    where: AgencyContactPersonWhereUniqueInput
  }

  /**
   * AgencyContactPerson updateMany
   */
  export type AgencyContactPersonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgencyContactPeople.
     */
    data: XOR<AgencyContactPersonUpdateManyMutationInput, AgencyContactPersonUncheckedUpdateManyInput>
    /**
     * Filter which AgencyContactPeople to update
     */
    where?: AgencyContactPersonWhereInput
  }

  /**
   * AgencyContactPerson updateManyAndReturn
   */
  export type AgencyContactPersonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * The data used to update AgencyContactPeople.
     */
    data: XOR<AgencyContactPersonUpdateManyMutationInput, AgencyContactPersonUncheckedUpdateManyInput>
    /**
     * Filter which AgencyContactPeople to update
     */
    where?: AgencyContactPersonWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgencyContactPerson upsert
   */
  export type AgencyContactPersonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonInclude<ExtArgs> | null
    /**
     * The filter to search for the AgencyContactPerson to update in case it exists.
     */
    where: AgencyContactPersonWhereUniqueInput
    /**
     * In case the AgencyContactPerson found by the `where` argument doesn't exist, create a new AgencyContactPerson with this data.
     */
    create: XOR<AgencyContactPersonCreateInput, AgencyContactPersonUncheckedCreateInput>
    /**
     * In case the AgencyContactPerson was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgencyContactPersonUpdateInput, AgencyContactPersonUncheckedUpdateInput>
  }

  /**
   * AgencyContactPerson delete
   */
  export type AgencyContactPersonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonInclude<ExtArgs> | null
    /**
     * Filter which AgencyContactPerson to delete.
     */
    where: AgencyContactPersonWhereUniqueInput
  }

  /**
   * AgencyContactPerson deleteMany
   */
  export type AgencyContactPersonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgencyContactPeople to delete
     */
    where?: AgencyContactPersonWhereInput
  }

  /**
   * AgencyContactPerson.contactInfo
   */
  export type AgencyContactPerson$contactInfoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInfoInclude<ExtArgs> | null
    where?: ContactInfoWhereInput
  }

  /**
   * AgencyContactPerson without action
   */
  export type AgencyContactPersonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonInclude<ExtArgs> | null
  }


  /**
   * Model FundingPlan
   */

  export type AggregateFundingPlan = {
    _count: FundingPlanCountAggregateOutputType | null
    _avg: FundingPlanAvgAggregateOutputType | null
    _sum: FundingPlanSumAggregateOutputType | null
    _min: FundingPlanMinAggregateOutputType | null
    _max: FundingPlanMaxAggregateOutputType | null
  }

  export type FundingPlanAvgAggregateOutputType = {
    PlanID: number | null
    PlanType: number | null
  }

  export type FundingPlanSumAggregateOutputType = {
    PlanID: number | null
    PlanType: number | null
  }

  export type FundingPlanMinAggregateOutputType = {
    PlanID: number | null
    PlanType: number | null
  }

  export type FundingPlanMaxAggregateOutputType = {
    PlanID: number | null
    PlanType: number | null
  }

  export type FundingPlanCountAggregateOutputType = {
    PlanID: number
    PlanType: number
    _all: number
  }


  export type FundingPlanAvgAggregateInputType = {
    PlanID?: true
    PlanType?: true
  }

  export type FundingPlanSumAggregateInputType = {
    PlanID?: true
    PlanType?: true
  }

  export type FundingPlanMinAggregateInputType = {
    PlanID?: true
    PlanType?: true
  }

  export type FundingPlanMaxAggregateInputType = {
    PlanID?: true
    PlanType?: true
  }

  export type FundingPlanCountAggregateInputType = {
    PlanID?: true
    PlanType?: true
    _all?: true
  }

  export type FundingPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingPlan to aggregate.
     */
    where?: FundingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingPlans to fetch.
     */
    orderBy?: FundingPlanOrderByWithRelationInput | FundingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FundingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FundingPlans
    **/
    _count?: true | FundingPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FundingPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FundingPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FundingPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FundingPlanMaxAggregateInputType
  }

  export type GetFundingPlanAggregateType<T extends FundingPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateFundingPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFundingPlan[P]>
      : GetScalarType<T[P], AggregateFundingPlan[P]>
  }




  export type FundingPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FundingPlanWhereInput
    orderBy?: FundingPlanOrderByWithAggregationInput | FundingPlanOrderByWithAggregationInput[]
    by: FundingPlanScalarFieldEnum[] | FundingPlanScalarFieldEnum
    having?: FundingPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FundingPlanCountAggregateInputType | true
    _avg?: FundingPlanAvgAggregateInputType
    _sum?: FundingPlanSumAggregateInputType
    _min?: FundingPlanMinAggregateInputType
    _max?: FundingPlanMaxAggregateInputType
  }

  export type FundingPlanGroupByOutputType = {
    PlanID: number
    PlanType: number
    _count: FundingPlanCountAggregateOutputType | null
    _avg: FundingPlanAvgAggregateOutputType | null
    _sum: FundingPlanSumAggregateOutputType | null
    _min: FundingPlanMinAggregateOutputType | null
    _max: FundingPlanMaxAggregateOutputType | null
  }

  type GetFundingPlanGroupByPayload<T extends FundingPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FundingPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FundingPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FundingPlanGroupByOutputType[P]>
            : GetScalarType<T[P], FundingPlanGroupByOutputType[P]>
        }
      >
    >


  export type FundingPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PlanID?: boolean
    PlanType?: boolean
    fundings?: boolean | FundingPlan$fundingsArgs<ExtArgs>
    _count?: boolean | FundingPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fundingPlan"]>

  export type FundingPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PlanID?: boolean
    PlanType?: boolean
  }, ExtArgs["result"]["fundingPlan"]>

  export type FundingPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PlanID?: boolean
    PlanType?: boolean
  }, ExtArgs["result"]["fundingPlan"]>

  export type FundingPlanSelectScalar = {
    PlanID?: boolean
    PlanType?: boolean
  }

  export type FundingPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"PlanID" | "PlanType", ExtArgs["result"]["fundingPlan"]>
  export type FundingPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fundings?: boolean | FundingPlan$fundingsArgs<ExtArgs>
    _count?: boolean | FundingPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FundingPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FundingPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FundingPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FundingPlan"
    objects: {
      fundings: Prisma.$PatentFundingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      PlanID: number
      PlanType: number
    }, ExtArgs["result"]["fundingPlan"]>
    composites: {}
  }

  type FundingPlanGetPayload<S extends boolean | null | undefined | FundingPlanDefaultArgs> = $Result.GetResult<Prisma.$FundingPlanPayload, S>

  type FundingPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FundingPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FundingPlanCountAggregateInputType | true
    }

  export interface FundingPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FundingPlan'], meta: { name: 'FundingPlan' } }
    /**
     * Find zero or one FundingPlan that matches the filter.
     * @param {FundingPlanFindUniqueArgs} args - Arguments to find a FundingPlan
     * @example
     * // Get one FundingPlan
     * const fundingPlan = await prisma.fundingPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FundingPlanFindUniqueArgs>(args: SelectSubset<T, FundingPlanFindUniqueArgs<ExtArgs>>): Prisma__FundingPlanClient<$Result.GetResult<Prisma.$FundingPlanPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one FundingPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FundingPlanFindUniqueOrThrowArgs} args - Arguments to find a FundingPlan
     * @example
     * // Get one FundingPlan
     * const fundingPlan = await prisma.fundingPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FundingPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, FundingPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FundingPlanClient<$Result.GetResult<Prisma.$FundingPlanPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first FundingPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPlanFindFirstArgs} args - Arguments to find a FundingPlan
     * @example
     * // Get one FundingPlan
     * const fundingPlan = await prisma.fundingPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FundingPlanFindFirstArgs>(args?: SelectSubset<T, FundingPlanFindFirstArgs<ExtArgs>>): Prisma__FundingPlanClient<$Result.GetResult<Prisma.$FundingPlanPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first FundingPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPlanFindFirstOrThrowArgs} args - Arguments to find a FundingPlan
     * @example
     * // Get one FundingPlan
     * const fundingPlan = await prisma.fundingPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FundingPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, FundingPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__FundingPlanClient<$Result.GetResult<Prisma.$FundingPlanPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more FundingPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FundingPlans
     * const fundingPlans = await prisma.fundingPlan.findMany()
     * 
     * // Get first 10 FundingPlans
     * const fundingPlans = await prisma.fundingPlan.findMany({ take: 10 })
     * 
     * // Only select the `PlanID`
     * const fundingPlanWithPlanIDOnly = await prisma.fundingPlan.findMany({ select: { PlanID: true } })
     * 
     */
    findMany<T extends FundingPlanFindManyArgs>(args?: SelectSubset<T, FundingPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingPlanPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a FundingPlan.
     * @param {FundingPlanCreateArgs} args - Arguments to create a FundingPlan.
     * @example
     * // Create one FundingPlan
     * const FundingPlan = await prisma.fundingPlan.create({
     *   data: {
     *     // ... data to create a FundingPlan
     *   }
     * })
     * 
     */
    create<T extends FundingPlanCreateArgs>(args: SelectSubset<T, FundingPlanCreateArgs<ExtArgs>>): Prisma__FundingPlanClient<$Result.GetResult<Prisma.$FundingPlanPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many FundingPlans.
     * @param {FundingPlanCreateManyArgs} args - Arguments to create many FundingPlans.
     * @example
     * // Create many FundingPlans
     * const fundingPlan = await prisma.fundingPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FundingPlanCreateManyArgs>(args?: SelectSubset<T, FundingPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FundingPlans and returns the data saved in the database.
     * @param {FundingPlanCreateManyAndReturnArgs} args - Arguments to create many FundingPlans.
     * @example
     * // Create many FundingPlans
     * const fundingPlan = await prisma.fundingPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FundingPlans and only return the `PlanID`
     * const fundingPlanWithPlanIDOnly = await prisma.fundingPlan.createManyAndReturn({
     *   select: { PlanID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FundingPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, FundingPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingPlanPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a FundingPlan.
     * @param {FundingPlanDeleteArgs} args - Arguments to delete one FundingPlan.
     * @example
     * // Delete one FundingPlan
     * const FundingPlan = await prisma.fundingPlan.delete({
     *   where: {
     *     // ... filter to delete one FundingPlan
     *   }
     * })
     * 
     */
    delete<T extends FundingPlanDeleteArgs>(args: SelectSubset<T, FundingPlanDeleteArgs<ExtArgs>>): Prisma__FundingPlanClient<$Result.GetResult<Prisma.$FundingPlanPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one FundingPlan.
     * @param {FundingPlanUpdateArgs} args - Arguments to update one FundingPlan.
     * @example
     * // Update one FundingPlan
     * const fundingPlan = await prisma.fundingPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FundingPlanUpdateArgs>(args: SelectSubset<T, FundingPlanUpdateArgs<ExtArgs>>): Prisma__FundingPlanClient<$Result.GetResult<Prisma.$FundingPlanPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more FundingPlans.
     * @param {FundingPlanDeleteManyArgs} args - Arguments to filter FundingPlans to delete.
     * @example
     * // Delete a few FundingPlans
     * const { count } = await prisma.fundingPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FundingPlanDeleteManyArgs>(args?: SelectSubset<T, FundingPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FundingPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FundingPlans
     * const fundingPlan = await prisma.fundingPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FundingPlanUpdateManyArgs>(args: SelectSubset<T, FundingPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FundingPlans and returns the data updated in the database.
     * @param {FundingPlanUpdateManyAndReturnArgs} args - Arguments to update many FundingPlans.
     * @example
     * // Update many FundingPlans
     * const fundingPlan = await prisma.fundingPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FundingPlans and only return the `PlanID`
     * const fundingPlanWithPlanIDOnly = await prisma.fundingPlan.updateManyAndReturn({
     *   select: { PlanID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FundingPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, FundingPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingPlanPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one FundingPlan.
     * @param {FundingPlanUpsertArgs} args - Arguments to update or create a FundingPlan.
     * @example
     * // Update or create a FundingPlan
     * const fundingPlan = await prisma.fundingPlan.upsert({
     *   create: {
     *     // ... data to create a FundingPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FundingPlan we want to update
     *   }
     * })
     */
    upsert<T extends FundingPlanUpsertArgs>(args: SelectSubset<T, FundingPlanUpsertArgs<ExtArgs>>): Prisma__FundingPlanClient<$Result.GetResult<Prisma.$FundingPlanPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of FundingPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPlanCountArgs} args - Arguments to filter FundingPlans to count.
     * @example
     * // Count the number of FundingPlans
     * const count = await prisma.fundingPlan.count({
     *   where: {
     *     // ... the filter for the FundingPlans we want to count
     *   }
     * })
    **/
    count<T extends FundingPlanCountArgs>(
      args?: Subset<T, FundingPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FundingPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FundingPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FundingPlanAggregateArgs>(args: Subset<T, FundingPlanAggregateArgs>): Prisma.PrismaPromise<GetFundingPlanAggregateType<T>>

    /**
     * Group by FundingPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FundingPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FundingPlanGroupByArgs['orderBy'] }
        : { orderBy?: FundingPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FundingPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFundingPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FundingPlan model
   */
  readonly fields: FundingPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FundingPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FundingPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fundings<T extends FundingPlan$fundingsArgs<ExtArgs> = {}>(args?: Subset<T, FundingPlan$fundingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentFundingPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FundingPlan model
   */ 
  interface FundingPlanFieldRefs {
    readonly PlanID: FieldRef<"FundingPlan", 'Int'>
    readonly PlanType: FieldRef<"FundingPlan", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * FundingPlan findUnique
   */
  export type FundingPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPlan
     */
    select?: FundingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPlan
     */
    omit?: FundingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPlanInclude<ExtArgs> | null
    /**
     * Filter, which FundingPlan to fetch.
     */
    where: FundingPlanWhereUniqueInput
  }

  /**
   * FundingPlan findUniqueOrThrow
   */
  export type FundingPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPlan
     */
    select?: FundingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPlan
     */
    omit?: FundingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPlanInclude<ExtArgs> | null
    /**
     * Filter, which FundingPlan to fetch.
     */
    where: FundingPlanWhereUniqueInput
  }

  /**
   * FundingPlan findFirst
   */
  export type FundingPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPlan
     */
    select?: FundingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPlan
     */
    omit?: FundingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPlanInclude<ExtArgs> | null
    /**
     * Filter, which FundingPlan to fetch.
     */
    where?: FundingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingPlans to fetch.
     */
    orderBy?: FundingPlanOrderByWithRelationInput | FundingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingPlans.
     */
    cursor?: FundingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingPlans.
     */
    distinct?: FundingPlanScalarFieldEnum | FundingPlanScalarFieldEnum[]
  }

  /**
   * FundingPlan findFirstOrThrow
   */
  export type FundingPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPlan
     */
    select?: FundingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPlan
     */
    omit?: FundingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPlanInclude<ExtArgs> | null
    /**
     * Filter, which FundingPlan to fetch.
     */
    where?: FundingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingPlans to fetch.
     */
    orderBy?: FundingPlanOrderByWithRelationInput | FundingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingPlans.
     */
    cursor?: FundingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingPlans.
     */
    distinct?: FundingPlanScalarFieldEnum | FundingPlanScalarFieldEnum[]
  }

  /**
   * FundingPlan findMany
   */
  export type FundingPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPlan
     */
    select?: FundingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPlan
     */
    omit?: FundingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPlanInclude<ExtArgs> | null
    /**
     * Filter, which FundingPlans to fetch.
     */
    where?: FundingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingPlans to fetch.
     */
    orderBy?: FundingPlanOrderByWithRelationInput | FundingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FundingPlans.
     */
    cursor?: FundingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingPlans.
     */
    skip?: number
    distinct?: FundingPlanScalarFieldEnum | FundingPlanScalarFieldEnum[]
  }

  /**
   * FundingPlan create
   */
  export type FundingPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPlan
     */
    select?: FundingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPlan
     */
    omit?: FundingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a FundingPlan.
     */
    data: XOR<FundingPlanCreateInput, FundingPlanUncheckedCreateInput>
  }

  /**
   * FundingPlan createMany
   */
  export type FundingPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FundingPlans.
     */
    data: FundingPlanCreateManyInput | FundingPlanCreateManyInput[]
  }

  /**
   * FundingPlan createManyAndReturn
   */
  export type FundingPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPlan
     */
    select?: FundingPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPlan
     */
    omit?: FundingPlanOmit<ExtArgs> | null
    /**
     * The data used to create many FundingPlans.
     */
    data: FundingPlanCreateManyInput | FundingPlanCreateManyInput[]
  }

  /**
   * FundingPlan update
   */
  export type FundingPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPlan
     */
    select?: FundingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPlan
     */
    omit?: FundingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a FundingPlan.
     */
    data: XOR<FundingPlanUpdateInput, FundingPlanUncheckedUpdateInput>
    /**
     * Choose, which FundingPlan to update.
     */
    where: FundingPlanWhereUniqueInput
  }

  /**
   * FundingPlan updateMany
   */
  export type FundingPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FundingPlans.
     */
    data: XOR<FundingPlanUpdateManyMutationInput, FundingPlanUncheckedUpdateManyInput>
    /**
     * Filter which FundingPlans to update
     */
    where?: FundingPlanWhereInput
  }

  /**
   * FundingPlan updateManyAndReturn
   */
  export type FundingPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPlan
     */
    select?: FundingPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPlan
     */
    omit?: FundingPlanOmit<ExtArgs> | null
    /**
     * The data used to update FundingPlans.
     */
    data: XOR<FundingPlanUpdateManyMutationInput, FundingPlanUncheckedUpdateManyInput>
    /**
     * Filter which FundingPlans to update
     */
    where?: FundingPlanWhereInput
  }

  /**
   * FundingPlan upsert
   */
  export type FundingPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPlan
     */
    select?: FundingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPlan
     */
    omit?: FundingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the FundingPlan to update in case it exists.
     */
    where: FundingPlanWhereUniqueInput
    /**
     * In case the FundingPlan found by the `where` argument doesn't exist, create a new FundingPlan with this data.
     */
    create: XOR<FundingPlanCreateInput, FundingPlanUncheckedCreateInput>
    /**
     * In case the FundingPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FundingPlanUpdateInput, FundingPlanUncheckedUpdateInput>
  }

  /**
   * FundingPlan delete
   */
  export type FundingPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPlan
     */
    select?: FundingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPlan
     */
    omit?: FundingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPlanInclude<ExtArgs> | null
    /**
     * Filter which FundingPlan to delete.
     */
    where: FundingPlanWhereUniqueInput
  }

  /**
   * FundingPlan deleteMany
   */
  export type FundingPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingPlans to delete
     */
    where?: FundingPlanWhereInput
  }

  /**
   * FundingPlan.fundings
   */
  export type FundingPlan$fundingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingInclude<ExtArgs> | null
    where?: PatentFundingWhereInput
    orderBy?: PatentFundingOrderByWithRelationInput | PatentFundingOrderByWithRelationInput[]
    cursor?: PatentFundingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatentFundingScalarFieldEnum | PatentFundingScalarFieldEnum[]
  }

  /**
   * FundingPlan without action
   */
  export type FundingPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPlan
     */
    select?: FundingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPlan
     */
    omit?: FundingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPlanInclude<ExtArgs> | null
  }


  /**
   * Model PatentFunding
   */

  export type AggregatePatentFunding = {
    _count: PatentFundingCountAggregateOutputType | null
    _avg: PatentFundingAvgAggregateOutputType | null
    _sum: PatentFundingSumAggregateOutputType | null
    _min: PatentFundingMinAggregateOutputType | null
    _max: PatentFundingMaxAggregateOutputType | null
  }

  export type PatentFundingAvgAggregateOutputType = {
    FundingID: number | null
    PatentID: number | null
    PlanID: number | null
  }

  export type PatentFundingSumAggregateOutputType = {
    FundingID: number | null
    PatentID: number | null
    PlanID: number | null
  }

  export type PatentFundingMinAggregateOutputType = {
    FundingID: number | null
    PatentID: number | null
    FundingAgency: string | null
    ProjectNumber: string | null
    PlanID: number | null
  }

  export type PatentFundingMaxAggregateOutputType = {
    FundingID: number | null
    PatentID: number | null
    FundingAgency: string | null
    ProjectNumber: string | null
    PlanID: number | null
  }

  export type PatentFundingCountAggregateOutputType = {
    FundingID: number
    PatentID: number
    FundingAgency: number
    ProjectNumber: number
    PlanID: number
    _all: number
  }


  export type PatentFundingAvgAggregateInputType = {
    FundingID?: true
    PatentID?: true
    PlanID?: true
  }

  export type PatentFundingSumAggregateInputType = {
    FundingID?: true
    PatentID?: true
    PlanID?: true
  }

  export type PatentFundingMinAggregateInputType = {
    FundingID?: true
    PatentID?: true
    FundingAgency?: true
    ProjectNumber?: true
    PlanID?: true
  }

  export type PatentFundingMaxAggregateInputType = {
    FundingID?: true
    PatentID?: true
    FundingAgency?: true
    ProjectNumber?: true
    PlanID?: true
  }

  export type PatentFundingCountAggregateInputType = {
    FundingID?: true
    PatentID?: true
    FundingAgency?: true
    ProjectNumber?: true
    PlanID?: true
    _all?: true
  }

  export type PatentFundingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatentFunding to aggregate.
     */
    where?: PatentFundingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentFundings to fetch.
     */
    orderBy?: PatentFundingOrderByWithRelationInput | PatentFundingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatentFundingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentFundings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentFundings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatentFundings
    **/
    _count?: true | PatentFundingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatentFundingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatentFundingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatentFundingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatentFundingMaxAggregateInputType
  }

  export type GetPatentFundingAggregateType<T extends PatentFundingAggregateArgs> = {
        [P in keyof T & keyof AggregatePatentFunding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatentFunding[P]>
      : GetScalarType<T[P], AggregatePatentFunding[P]>
  }




  export type PatentFundingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatentFundingWhereInput
    orderBy?: PatentFundingOrderByWithAggregationInput | PatentFundingOrderByWithAggregationInput[]
    by: PatentFundingScalarFieldEnum[] | PatentFundingScalarFieldEnum
    having?: PatentFundingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatentFundingCountAggregateInputType | true
    _avg?: PatentFundingAvgAggregateInputType
    _sum?: PatentFundingSumAggregateInputType
    _min?: PatentFundingMinAggregateInputType
    _max?: PatentFundingMaxAggregateInputType
  }

  export type PatentFundingGroupByOutputType = {
    FundingID: number
    PatentID: number
    FundingAgency: string
    ProjectNumber: string
    PlanID: number
    _count: PatentFundingCountAggregateOutputType | null
    _avg: PatentFundingAvgAggregateOutputType | null
    _sum: PatentFundingSumAggregateOutputType | null
    _min: PatentFundingMinAggregateOutputType | null
    _max: PatentFundingMaxAggregateOutputType | null
  }

  type GetPatentFundingGroupByPayload<T extends PatentFundingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatentFundingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatentFundingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatentFundingGroupByOutputType[P]>
            : GetScalarType<T[P], PatentFundingGroupByOutputType[P]>
        }
      >
    >


  export type PatentFundingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    FundingID?: boolean
    PatentID?: boolean
    FundingAgency?: boolean
    ProjectNumber?: boolean
    PlanID?: boolean
    plan?: boolean | FundingPlanDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentFunding"]>

  export type PatentFundingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    FundingID?: boolean
    PatentID?: boolean
    FundingAgency?: boolean
    ProjectNumber?: boolean
    PlanID?: boolean
    plan?: boolean | FundingPlanDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentFunding"]>

  export type PatentFundingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    FundingID?: boolean
    PatentID?: boolean
    FundingAgency?: boolean
    ProjectNumber?: boolean
    PlanID?: boolean
    plan?: boolean | FundingPlanDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentFunding"]>

  export type PatentFundingSelectScalar = {
    FundingID?: boolean
    PatentID?: boolean
    FundingAgency?: boolean
    ProjectNumber?: boolean
    PlanID?: boolean
  }

  export type PatentFundingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"FundingID" | "PatentID" | "FundingAgency" | "ProjectNumber" | "PlanID", ExtArgs["result"]["patentFunding"]>
  export type PatentFundingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | FundingPlanDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }
  export type PatentFundingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | FundingPlanDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }
  export type PatentFundingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | FundingPlanDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }

  export type $PatentFundingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatentFunding"
    objects: {
      plan: Prisma.$FundingPlanPayload<ExtArgs>
      patent: Prisma.$PatentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      FundingID: number
      PatentID: number
      FundingAgency: string
      ProjectNumber: string
      PlanID: number
    }, ExtArgs["result"]["patentFunding"]>
    composites: {}
  }

  type PatentFundingGetPayload<S extends boolean | null | undefined | PatentFundingDefaultArgs> = $Result.GetResult<Prisma.$PatentFundingPayload, S>

  type PatentFundingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatentFundingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatentFundingCountAggregateInputType | true
    }

  export interface PatentFundingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatentFunding'], meta: { name: 'PatentFunding' } }
    /**
     * Find zero or one PatentFunding that matches the filter.
     * @param {PatentFundingFindUniqueArgs} args - Arguments to find a PatentFunding
     * @example
     * // Get one PatentFunding
     * const patentFunding = await prisma.patentFunding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatentFundingFindUniqueArgs>(args: SelectSubset<T, PatentFundingFindUniqueArgs<ExtArgs>>): Prisma__PatentFundingClient<$Result.GetResult<Prisma.$PatentFundingPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one PatentFunding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatentFundingFindUniqueOrThrowArgs} args - Arguments to find a PatentFunding
     * @example
     * // Get one PatentFunding
     * const patentFunding = await prisma.patentFunding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatentFundingFindUniqueOrThrowArgs>(args: SelectSubset<T, PatentFundingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatentFundingClient<$Result.GetResult<Prisma.$PatentFundingPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first PatentFunding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentFundingFindFirstArgs} args - Arguments to find a PatentFunding
     * @example
     * // Get one PatentFunding
     * const patentFunding = await prisma.patentFunding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatentFundingFindFirstArgs>(args?: SelectSubset<T, PatentFundingFindFirstArgs<ExtArgs>>): Prisma__PatentFundingClient<$Result.GetResult<Prisma.$PatentFundingPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first PatentFunding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentFundingFindFirstOrThrowArgs} args - Arguments to find a PatentFunding
     * @example
     * // Get one PatentFunding
     * const patentFunding = await prisma.patentFunding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatentFundingFindFirstOrThrowArgs>(args?: SelectSubset<T, PatentFundingFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatentFundingClient<$Result.GetResult<Prisma.$PatentFundingPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more PatentFundings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentFundingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatentFundings
     * const patentFundings = await prisma.patentFunding.findMany()
     * 
     * // Get first 10 PatentFundings
     * const patentFundings = await prisma.patentFunding.findMany({ take: 10 })
     * 
     * // Only select the `FundingID`
     * const patentFundingWithFundingIDOnly = await prisma.patentFunding.findMany({ select: { FundingID: true } })
     * 
     */
    findMany<T extends PatentFundingFindManyArgs>(args?: SelectSubset<T, PatentFundingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentFundingPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a PatentFunding.
     * @param {PatentFundingCreateArgs} args - Arguments to create a PatentFunding.
     * @example
     * // Create one PatentFunding
     * const PatentFunding = await prisma.patentFunding.create({
     *   data: {
     *     // ... data to create a PatentFunding
     *   }
     * })
     * 
     */
    create<T extends PatentFundingCreateArgs>(args: SelectSubset<T, PatentFundingCreateArgs<ExtArgs>>): Prisma__PatentFundingClient<$Result.GetResult<Prisma.$PatentFundingPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many PatentFundings.
     * @param {PatentFundingCreateManyArgs} args - Arguments to create many PatentFundings.
     * @example
     * // Create many PatentFundings
     * const patentFunding = await prisma.patentFunding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatentFundingCreateManyArgs>(args?: SelectSubset<T, PatentFundingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PatentFundings and returns the data saved in the database.
     * @param {PatentFundingCreateManyAndReturnArgs} args - Arguments to create many PatentFundings.
     * @example
     * // Create many PatentFundings
     * const patentFunding = await prisma.patentFunding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PatentFundings and only return the `FundingID`
     * const patentFundingWithFundingIDOnly = await prisma.patentFunding.createManyAndReturn({
     *   select: { FundingID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatentFundingCreateManyAndReturnArgs>(args?: SelectSubset<T, PatentFundingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentFundingPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a PatentFunding.
     * @param {PatentFundingDeleteArgs} args - Arguments to delete one PatentFunding.
     * @example
     * // Delete one PatentFunding
     * const PatentFunding = await prisma.patentFunding.delete({
     *   where: {
     *     // ... filter to delete one PatentFunding
     *   }
     * })
     * 
     */
    delete<T extends PatentFundingDeleteArgs>(args: SelectSubset<T, PatentFundingDeleteArgs<ExtArgs>>): Prisma__PatentFundingClient<$Result.GetResult<Prisma.$PatentFundingPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one PatentFunding.
     * @param {PatentFundingUpdateArgs} args - Arguments to update one PatentFunding.
     * @example
     * // Update one PatentFunding
     * const patentFunding = await prisma.patentFunding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatentFundingUpdateArgs>(args: SelectSubset<T, PatentFundingUpdateArgs<ExtArgs>>): Prisma__PatentFundingClient<$Result.GetResult<Prisma.$PatentFundingPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more PatentFundings.
     * @param {PatentFundingDeleteManyArgs} args - Arguments to filter PatentFundings to delete.
     * @example
     * // Delete a few PatentFundings
     * const { count } = await prisma.patentFunding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatentFundingDeleteManyArgs>(args?: SelectSubset<T, PatentFundingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatentFundings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentFundingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatentFundings
     * const patentFunding = await prisma.patentFunding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatentFundingUpdateManyArgs>(args: SelectSubset<T, PatentFundingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatentFundings and returns the data updated in the database.
     * @param {PatentFundingUpdateManyAndReturnArgs} args - Arguments to update many PatentFundings.
     * @example
     * // Update many PatentFundings
     * const patentFunding = await prisma.patentFunding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PatentFundings and only return the `FundingID`
     * const patentFundingWithFundingIDOnly = await prisma.patentFunding.updateManyAndReturn({
     *   select: { FundingID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatentFundingUpdateManyAndReturnArgs>(args: SelectSubset<T, PatentFundingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentFundingPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one PatentFunding.
     * @param {PatentFundingUpsertArgs} args - Arguments to update or create a PatentFunding.
     * @example
     * // Update or create a PatentFunding
     * const patentFunding = await prisma.patentFunding.upsert({
     *   create: {
     *     // ... data to create a PatentFunding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatentFunding we want to update
     *   }
     * })
     */
    upsert<T extends PatentFundingUpsertArgs>(args: SelectSubset<T, PatentFundingUpsertArgs<ExtArgs>>): Prisma__PatentFundingClient<$Result.GetResult<Prisma.$PatentFundingPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of PatentFundings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentFundingCountArgs} args - Arguments to filter PatentFundings to count.
     * @example
     * // Count the number of PatentFundings
     * const count = await prisma.patentFunding.count({
     *   where: {
     *     // ... the filter for the PatentFundings we want to count
     *   }
     * })
    **/
    count<T extends PatentFundingCountArgs>(
      args?: Subset<T, PatentFundingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatentFundingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatentFunding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentFundingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatentFundingAggregateArgs>(args: Subset<T, PatentFundingAggregateArgs>): Prisma.PrismaPromise<GetPatentFundingAggregateType<T>>

    /**
     * Group by PatentFunding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentFundingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatentFundingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatentFundingGroupByArgs['orderBy'] }
        : { orderBy?: PatentFundingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatentFundingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatentFundingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatentFunding model
   */
  readonly fields: PatentFundingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatentFunding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatentFundingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends FundingPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FundingPlanDefaultArgs<ExtArgs>>): Prisma__FundingPlanClient<$Result.GetResult<Prisma.$FundingPlanPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    patent<T extends PatentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatentDefaultArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PatentFunding model
   */ 
  interface PatentFundingFieldRefs {
    readonly FundingID: FieldRef<"PatentFunding", 'Int'>
    readonly PatentID: FieldRef<"PatentFunding", 'Int'>
    readonly FundingAgency: FieldRef<"PatentFunding", 'String'>
    readonly ProjectNumber: FieldRef<"PatentFunding", 'String'>
    readonly PlanID: FieldRef<"PatentFunding", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PatentFunding findUnique
   */
  export type PatentFundingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingInclude<ExtArgs> | null
    /**
     * Filter, which PatentFunding to fetch.
     */
    where: PatentFundingWhereUniqueInput
  }

  /**
   * PatentFunding findUniqueOrThrow
   */
  export type PatentFundingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingInclude<ExtArgs> | null
    /**
     * Filter, which PatentFunding to fetch.
     */
    where: PatentFundingWhereUniqueInput
  }

  /**
   * PatentFunding findFirst
   */
  export type PatentFundingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingInclude<ExtArgs> | null
    /**
     * Filter, which PatentFunding to fetch.
     */
    where?: PatentFundingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentFundings to fetch.
     */
    orderBy?: PatentFundingOrderByWithRelationInput | PatentFundingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatentFundings.
     */
    cursor?: PatentFundingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentFundings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentFundings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatentFundings.
     */
    distinct?: PatentFundingScalarFieldEnum | PatentFundingScalarFieldEnum[]
  }

  /**
   * PatentFunding findFirstOrThrow
   */
  export type PatentFundingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingInclude<ExtArgs> | null
    /**
     * Filter, which PatentFunding to fetch.
     */
    where?: PatentFundingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentFundings to fetch.
     */
    orderBy?: PatentFundingOrderByWithRelationInput | PatentFundingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatentFundings.
     */
    cursor?: PatentFundingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentFundings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentFundings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatentFundings.
     */
    distinct?: PatentFundingScalarFieldEnum | PatentFundingScalarFieldEnum[]
  }

  /**
   * PatentFunding findMany
   */
  export type PatentFundingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingInclude<ExtArgs> | null
    /**
     * Filter, which PatentFundings to fetch.
     */
    where?: PatentFundingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentFundings to fetch.
     */
    orderBy?: PatentFundingOrderByWithRelationInput | PatentFundingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatentFundings.
     */
    cursor?: PatentFundingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentFundings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentFundings.
     */
    skip?: number
    distinct?: PatentFundingScalarFieldEnum | PatentFundingScalarFieldEnum[]
  }

  /**
   * PatentFunding create
   */
  export type PatentFundingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingInclude<ExtArgs> | null
    /**
     * The data needed to create a PatentFunding.
     */
    data: XOR<PatentFundingCreateInput, PatentFundingUncheckedCreateInput>
  }

  /**
   * PatentFunding createMany
   */
  export type PatentFundingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatentFundings.
     */
    data: PatentFundingCreateManyInput | PatentFundingCreateManyInput[]
  }

  /**
   * PatentFunding createManyAndReturn
   */
  export type PatentFundingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * The data used to create many PatentFundings.
     */
    data: PatentFundingCreateManyInput | PatentFundingCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatentFunding update
   */
  export type PatentFundingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingInclude<ExtArgs> | null
    /**
     * The data needed to update a PatentFunding.
     */
    data: XOR<PatentFundingUpdateInput, PatentFundingUncheckedUpdateInput>
    /**
     * Choose, which PatentFunding to update.
     */
    where: PatentFundingWhereUniqueInput
  }

  /**
   * PatentFunding updateMany
   */
  export type PatentFundingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatentFundings.
     */
    data: XOR<PatentFundingUpdateManyMutationInput, PatentFundingUncheckedUpdateManyInput>
    /**
     * Filter which PatentFundings to update
     */
    where?: PatentFundingWhereInput
  }

  /**
   * PatentFunding updateManyAndReturn
   */
  export type PatentFundingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * The data used to update PatentFundings.
     */
    data: XOR<PatentFundingUpdateManyMutationInput, PatentFundingUncheckedUpdateManyInput>
    /**
     * Filter which PatentFundings to update
     */
    where?: PatentFundingWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatentFunding upsert
   */
  export type PatentFundingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingInclude<ExtArgs> | null
    /**
     * The filter to search for the PatentFunding to update in case it exists.
     */
    where: PatentFundingWhereUniqueInput
    /**
     * In case the PatentFunding found by the `where` argument doesn't exist, create a new PatentFunding with this data.
     */
    create: XOR<PatentFundingCreateInput, PatentFundingUncheckedCreateInput>
    /**
     * In case the PatentFunding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatentFundingUpdateInput, PatentFundingUncheckedUpdateInput>
  }

  /**
   * PatentFunding delete
   */
  export type PatentFundingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingInclude<ExtArgs> | null
    /**
     * Filter which PatentFunding to delete.
     */
    where: PatentFundingWhereUniqueInput
  }

  /**
   * PatentFunding deleteMany
   */
  export type PatentFundingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatentFundings to delete
     */
    where?: PatentFundingWhereInput
  }

  /**
   * PatentFunding without action
   */
  export type PatentFundingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingInclude<ExtArgs> | null
  }


  /**
   * Model Inventor
   */

  export type AggregateInventor = {
    _count: InventorCountAggregateOutputType | null
    _avg: InventorAvgAggregateOutputType | null
    _sum: InventorSumAggregateOutputType | null
    _min: InventorMinAggregateOutputType | null
    _max: InventorMaxAggregateOutputType | null
  }

  export type InventorAvgAggregateOutputType = {
    InventorID: number | null
    Department: number | null
    ContactInfoID: number | null
  }

  export type InventorSumAggregateOutputType = {
    InventorID: number | null
    Department: number | null
    ContactInfoID: number | null
  }

  export type InventorMinAggregateOutputType = {
    InventorID: number | null
    Name: string | null
    Department: number | null
    Email: string | null
    ContactInfoID: number | null
  }

  export type InventorMaxAggregateOutputType = {
    InventorID: number | null
    Name: string | null
    Department: number | null
    Email: string | null
    ContactInfoID: number | null
  }

  export type InventorCountAggregateOutputType = {
    InventorID: number
    Name: number
    Department: number
    Email: number
    ContactInfoID: number
    _all: number
  }


  export type InventorAvgAggregateInputType = {
    InventorID?: true
    Department?: true
    ContactInfoID?: true
  }

  export type InventorSumAggregateInputType = {
    InventorID?: true
    Department?: true
    ContactInfoID?: true
  }

  export type InventorMinAggregateInputType = {
    InventorID?: true
    Name?: true
    Department?: true
    Email?: true
    ContactInfoID?: true
  }

  export type InventorMaxAggregateInputType = {
    InventorID?: true
    Name?: true
    Department?: true
    Email?: true
    ContactInfoID?: true
  }

  export type InventorCountAggregateInputType = {
    InventorID?: true
    Name?: true
    Department?: true
    Email?: true
    ContactInfoID?: true
    _all?: true
  }

  export type InventorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inventor to aggregate.
     */
    where?: InventorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inventors to fetch.
     */
    orderBy?: InventorOrderByWithRelationInput | InventorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InventorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inventors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inventors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Inventors
    **/
    _count?: true | InventorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InventorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InventorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InventorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InventorMaxAggregateInputType
  }

  export type GetInventorAggregateType<T extends InventorAggregateArgs> = {
        [P in keyof T & keyof AggregateInventor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInventor[P]>
      : GetScalarType<T[P], AggregateInventor[P]>
  }




  export type InventorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventorWhereInput
    orderBy?: InventorOrderByWithAggregationInput | InventorOrderByWithAggregationInput[]
    by: InventorScalarFieldEnum[] | InventorScalarFieldEnum
    having?: InventorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InventorCountAggregateInputType | true
    _avg?: InventorAvgAggregateInputType
    _sum?: InventorSumAggregateInputType
    _min?: InventorMinAggregateInputType
    _max?: InventorMaxAggregateInputType
  }

  export type InventorGroupByOutputType = {
    InventorID: number
    Name: string
    Department: number
    Email: string | null
    ContactInfoID: number | null
    _count: InventorCountAggregateOutputType | null
    _avg: InventorAvgAggregateOutputType | null
    _sum: InventorSumAggregateOutputType | null
    _min: InventorMinAggregateOutputType | null
    _max: InventorMaxAggregateOutputType | null
  }

  type GetInventorGroupByPayload<T extends InventorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InventorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InventorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InventorGroupByOutputType[P]>
            : GetScalarType<T[P], InventorGroupByOutputType[P]>
        }
      >
    >


  export type InventorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    InventorID?: boolean
    Name?: boolean
    Department?: boolean
    Email?: boolean
    ContactInfoID?: boolean
    contactInfo?: boolean | Inventor$contactInfoArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    patents?: boolean | Inventor$patentsArgs<ExtArgs>
    _count?: boolean | InventorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventor"]>

  export type InventorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    InventorID?: boolean
    Name?: boolean
    Department?: boolean
    Email?: boolean
    ContactInfoID?: boolean
    contactInfo?: boolean | Inventor$contactInfoArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventor"]>

  export type InventorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    InventorID?: boolean
    Name?: boolean
    Department?: boolean
    Email?: boolean
    ContactInfoID?: boolean
    contactInfo?: boolean | Inventor$contactInfoArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventor"]>

  export type InventorSelectScalar = {
    InventorID?: boolean
    Name?: boolean
    Department?: boolean
    Email?: boolean
    ContactInfoID?: boolean
  }

  export type InventorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"InventorID" | "Name" | "Department" | "Email" | "ContactInfoID", ExtArgs["result"]["inventor"]>
  export type InventorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contactInfo?: boolean | Inventor$contactInfoArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    patents?: boolean | Inventor$patentsArgs<ExtArgs>
    _count?: boolean | InventorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InventorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contactInfo?: boolean | Inventor$contactInfoArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }
  export type InventorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contactInfo?: boolean | Inventor$contactInfoArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }

  export type $InventorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Inventor"
    objects: {
      contactInfo: Prisma.$ContactInfoPayload<ExtArgs> | null
      department: Prisma.$DepartmentPayload<ExtArgs>
      patents: Prisma.$PatentInventorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      InventorID: number
      Name: string
      Department: number
      Email: string | null
      ContactInfoID: number | null
    }, ExtArgs["result"]["inventor"]>
    composites: {}
  }

  type InventorGetPayload<S extends boolean | null | undefined | InventorDefaultArgs> = $Result.GetResult<Prisma.$InventorPayload, S>

  type InventorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InventorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InventorCountAggregateInputType | true
    }

  export interface InventorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Inventor'], meta: { name: 'Inventor' } }
    /**
     * Find zero or one Inventor that matches the filter.
     * @param {InventorFindUniqueArgs} args - Arguments to find a Inventor
     * @example
     * // Get one Inventor
     * const inventor = await prisma.inventor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InventorFindUniqueArgs>(args: SelectSubset<T, InventorFindUniqueArgs<ExtArgs>>): Prisma__InventorClient<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Inventor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InventorFindUniqueOrThrowArgs} args - Arguments to find a Inventor
     * @example
     * // Get one Inventor
     * const inventor = await prisma.inventor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InventorFindUniqueOrThrowArgs>(args: SelectSubset<T, InventorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InventorClient<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Inventor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventorFindFirstArgs} args - Arguments to find a Inventor
     * @example
     * // Get one Inventor
     * const inventor = await prisma.inventor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InventorFindFirstArgs>(args?: SelectSubset<T, InventorFindFirstArgs<ExtArgs>>): Prisma__InventorClient<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Inventor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventorFindFirstOrThrowArgs} args - Arguments to find a Inventor
     * @example
     * // Get one Inventor
     * const inventor = await prisma.inventor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InventorFindFirstOrThrowArgs>(args?: SelectSubset<T, InventorFindFirstOrThrowArgs<ExtArgs>>): Prisma__InventorClient<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Inventors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inventors
     * const inventors = await prisma.inventor.findMany()
     * 
     * // Get first 10 Inventors
     * const inventors = await prisma.inventor.findMany({ take: 10 })
     * 
     * // Only select the `InventorID`
     * const inventorWithInventorIDOnly = await prisma.inventor.findMany({ select: { InventorID: true } })
     * 
     */
    findMany<T extends InventorFindManyArgs>(args?: SelectSubset<T, InventorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Inventor.
     * @param {InventorCreateArgs} args - Arguments to create a Inventor.
     * @example
     * // Create one Inventor
     * const Inventor = await prisma.inventor.create({
     *   data: {
     *     // ... data to create a Inventor
     *   }
     * })
     * 
     */
    create<T extends InventorCreateArgs>(args: SelectSubset<T, InventorCreateArgs<ExtArgs>>): Prisma__InventorClient<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Inventors.
     * @param {InventorCreateManyArgs} args - Arguments to create many Inventors.
     * @example
     * // Create many Inventors
     * const inventor = await prisma.inventor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InventorCreateManyArgs>(args?: SelectSubset<T, InventorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Inventors and returns the data saved in the database.
     * @param {InventorCreateManyAndReturnArgs} args - Arguments to create many Inventors.
     * @example
     * // Create many Inventors
     * const inventor = await prisma.inventor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Inventors and only return the `InventorID`
     * const inventorWithInventorIDOnly = await prisma.inventor.createManyAndReturn({
     *   select: { InventorID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InventorCreateManyAndReturnArgs>(args?: SelectSubset<T, InventorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Inventor.
     * @param {InventorDeleteArgs} args - Arguments to delete one Inventor.
     * @example
     * // Delete one Inventor
     * const Inventor = await prisma.inventor.delete({
     *   where: {
     *     // ... filter to delete one Inventor
     *   }
     * })
     * 
     */
    delete<T extends InventorDeleteArgs>(args: SelectSubset<T, InventorDeleteArgs<ExtArgs>>): Prisma__InventorClient<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Inventor.
     * @param {InventorUpdateArgs} args - Arguments to update one Inventor.
     * @example
     * // Update one Inventor
     * const inventor = await prisma.inventor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InventorUpdateArgs>(args: SelectSubset<T, InventorUpdateArgs<ExtArgs>>): Prisma__InventorClient<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Inventors.
     * @param {InventorDeleteManyArgs} args - Arguments to filter Inventors to delete.
     * @example
     * // Delete a few Inventors
     * const { count } = await prisma.inventor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InventorDeleteManyArgs>(args?: SelectSubset<T, InventorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inventors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inventors
     * const inventor = await prisma.inventor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InventorUpdateManyArgs>(args: SelectSubset<T, InventorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inventors and returns the data updated in the database.
     * @param {InventorUpdateManyAndReturnArgs} args - Arguments to update many Inventors.
     * @example
     * // Update many Inventors
     * const inventor = await prisma.inventor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Inventors and only return the `InventorID`
     * const inventorWithInventorIDOnly = await prisma.inventor.updateManyAndReturn({
     *   select: { InventorID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InventorUpdateManyAndReturnArgs>(args: SelectSubset<T, InventorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Inventor.
     * @param {InventorUpsertArgs} args - Arguments to update or create a Inventor.
     * @example
     * // Update or create a Inventor
     * const inventor = await prisma.inventor.upsert({
     *   create: {
     *     // ... data to create a Inventor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inventor we want to update
     *   }
     * })
     */
    upsert<T extends InventorUpsertArgs>(args: SelectSubset<T, InventorUpsertArgs<ExtArgs>>): Prisma__InventorClient<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Inventors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventorCountArgs} args - Arguments to filter Inventors to count.
     * @example
     * // Count the number of Inventors
     * const count = await prisma.inventor.count({
     *   where: {
     *     // ... the filter for the Inventors we want to count
     *   }
     * })
    **/
    count<T extends InventorCountArgs>(
      args?: Subset<T, InventorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InventorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inventor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InventorAggregateArgs>(args: Subset<T, InventorAggregateArgs>): Prisma.PrismaPromise<GetInventorAggregateType<T>>

    /**
     * Group by Inventor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InventorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InventorGroupByArgs['orderBy'] }
        : { orderBy?: InventorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InventorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Inventor model
   */
  readonly fields: InventorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Inventor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InventorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contactInfo<T extends Inventor$contactInfoArgs<ExtArgs> = {}>(args?: Subset<T, Inventor$contactInfoArgs<ExtArgs>>): Prisma__ContactInfoClient<$Result.GetResult<Prisma.$ContactInfoPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    department<T extends DepartmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DepartmentDefaultArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    patents<T extends Inventor$patentsArgs<ExtArgs> = {}>(args?: Subset<T, Inventor$patentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentInventorPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Inventor model
   */ 
  interface InventorFieldRefs {
    readonly InventorID: FieldRef<"Inventor", 'Int'>
    readonly Name: FieldRef<"Inventor", 'String'>
    readonly Department: FieldRef<"Inventor", 'Int'>
    readonly Email: FieldRef<"Inventor", 'String'>
    readonly ContactInfoID: FieldRef<"Inventor", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Inventor findUnique
   */
  export type InventorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorInclude<ExtArgs> | null
    /**
     * Filter, which Inventor to fetch.
     */
    where: InventorWhereUniqueInput
  }

  /**
   * Inventor findUniqueOrThrow
   */
  export type InventorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorInclude<ExtArgs> | null
    /**
     * Filter, which Inventor to fetch.
     */
    where: InventorWhereUniqueInput
  }

  /**
   * Inventor findFirst
   */
  export type InventorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorInclude<ExtArgs> | null
    /**
     * Filter, which Inventor to fetch.
     */
    where?: InventorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inventors to fetch.
     */
    orderBy?: InventorOrderByWithRelationInput | InventorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inventors.
     */
    cursor?: InventorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inventors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inventors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inventors.
     */
    distinct?: InventorScalarFieldEnum | InventorScalarFieldEnum[]
  }

  /**
   * Inventor findFirstOrThrow
   */
  export type InventorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorInclude<ExtArgs> | null
    /**
     * Filter, which Inventor to fetch.
     */
    where?: InventorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inventors to fetch.
     */
    orderBy?: InventorOrderByWithRelationInput | InventorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inventors.
     */
    cursor?: InventorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inventors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inventors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inventors.
     */
    distinct?: InventorScalarFieldEnum | InventorScalarFieldEnum[]
  }

  /**
   * Inventor findMany
   */
  export type InventorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorInclude<ExtArgs> | null
    /**
     * Filter, which Inventors to fetch.
     */
    where?: InventorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inventors to fetch.
     */
    orderBy?: InventorOrderByWithRelationInput | InventorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Inventors.
     */
    cursor?: InventorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inventors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inventors.
     */
    skip?: number
    distinct?: InventorScalarFieldEnum | InventorScalarFieldEnum[]
  }

  /**
   * Inventor create
   */
  export type InventorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorInclude<ExtArgs> | null
    /**
     * The data needed to create a Inventor.
     */
    data: XOR<InventorCreateInput, InventorUncheckedCreateInput>
  }

  /**
   * Inventor createMany
   */
  export type InventorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Inventors.
     */
    data: InventorCreateManyInput | InventorCreateManyInput[]
  }

  /**
   * Inventor createManyAndReturn
   */
  export type InventorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * The data used to create many Inventors.
     */
    data: InventorCreateManyInput | InventorCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Inventor update
   */
  export type InventorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorInclude<ExtArgs> | null
    /**
     * The data needed to update a Inventor.
     */
    data: XOR<InventorUpdateInput, InventorUncheckedUpdateInput>
    /**
     * Choose, which Inventor to update.
     */
    where: InventorWhereUniqueInput
  }

  /**
   * Inventor updateMany
   */
  export type InventorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Inventors.
     */
    data: XOR<InventorUpdateManyMutationInput, InventorUncheckedUpdateManyInput>
    /**
     * Filter which Inventors to update
     */
    where?: InventorWhereInput
  }

  /**
   * Inventor updateManyAndReturn
   */
  export type InventorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * The data used to update Inventors.
     */
    data: XOR<InventorUpdateManyMutationInput, InventorUncheckedUpdateManyInput>
    /**
     * Filter which Inventors to update
     */
    where?: InventorWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Inventor upsert
   */
  export type InventorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorInclude<ExtArgs> | null
    /**
     * The filter to search for the Inventor to update in case it exists.
     */
    where: InventorWhereUniqueInput
    /**
     * In case the Inventor found by the `where` argument doesn't exist, create a new Inventor with this data.
     */
    create: XOR<InventorCreateInput, InventorUncheckedCreateInput>
    /**
     * In case the Inventor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InventorUpdateInput, InventorUncheckedUpdateInput>
  }

  /**
   * Inventor delete
   */
  export type InventorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorInclude<ExtArgs> | null
    /**
     * Filter which Inventor to delete.
     */
    where: InventorWhereUniqueInput
  }

  /**
   * Inventor deleteMany
   */
  export type InventorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inventors to delete
     */
    where?: InventorWhereInput
  }

  /**
   * Inventor.contactInfo
   */
  export type Inventor$contactInfoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInfoInclude<ExtArgs> | null
    where?: ContactInfoWhereInput
  }

  /**
   * Inventor.patents
   */
  export type Inventor$patentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorInclude<ExtArgs> | null
    where?: PatentInventorWhereInput
    orderBy?: PatentInventorOrderByWithRelationInput | PatentInventorOrderByWithRelationInput[]
    cursor?: PatentInventorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatentInventorScalarFieldEnum | PatentInventorScalarFieldEnum[]
  }

  /**
   * Inventor without action
   */
  export type InventorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorInclude<ExtArgs> | null
  }


  /**
   * Model PatentInventor
   */

  export type AggregatePatentInventor = {
    _count: PatentInventorCountAggregateOutputType | null
    _avg: PatentInventorAvgAggregateOutputType | null
    _sum: PatentInventorSumAggregateOutputType | null
    _min: PatentInventorMinAggregateOutputType | null
    _max: PatentInventorMaxAggregateOutputType | null
  }

  export type PatentInventorAvgAggregateOutputType = {
    PatentID: number | null
    InventorID: number | null
  }

  export type PatentInventorSumAggregateOutputType = {
    PatentID: number | null
    InventorID: number | null
  }

  export type PatentInventorMinAggregateOutputType = {
    PatentID: number | null
    InventorID: number | null
    Main: boolean | null
  }

  export type PatentInventorMaxAggregateOutputType = {
    PatentID: number | null
    InventorID: number | null
    Main: boolean | null
  }

  export type PatentInventorCountAggregateOutputType = {
    PatentID: number
    InventorID: number
    Main: number
    _all: number
  }


  export type PatentInventorAvgAggregateInputType = {
    PatentID?: true
    InventorID?: true
  }

  export type PatentInventorSumAggregateInputType = {
    PatentID?: true
    InventorID?: true
  }

  export type PatentInventorMinAggregateInputType = {
    PatentID?: true
    InventorID?: true
    Main?: true
  }

  export type PatentInventorMaxAggregateInputType = {
    PatentID?: true
    InventorID?: true
    Main?: true
  }

  export type PatentInventorCountAggregateInputType = {
    PatentID?: true
    InventorID?: true
    Main?: true
    _all?: true
  }

  export type PatentInventorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatentInventor to aggregate.
     */
    where?: PatentInventorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentInventors to fetch.
     */
    orderBy?: PatentInventorOrderByWithRelationInput | PatentInventorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatentInventorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentInventors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentInventors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatentInventors
    **/
    _count?: true | PatentInventorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatentInventorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatentInventorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatentInventorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatentInventorMaxAggregateInputType
  }

  export type GetPatentInventorAggregateType<T extends PatentInventorAggregateArgs> = {
        [P in keyof T & keyof AggregatePatentInventor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatentInventor[P]>
      : GetScalarType<T[P], AggregatePatentInventor[P]>
  }




  export type PatentInventorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatentInventorWhereInput
    orderBy?: PatentInventorOrderByWithAggregationInput | PatentInventorOrderByWithAggregationInput[]
    by: PatentInventorScalarFieldEnum[] | PatentInventorScalarFieldEnum
    having?: PatentInventorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatentInventorCountAggregateInputType | true
    _avg?: PatentInventorAvgAggregateInputType
    _sum?: PatentInventorSumAggregateInputType
    _min?: PatentInventorMinAggregateInputType
    _max?: PatentInventorMaxAggregateInputType
  }

  export type PatentInventorGroupByOutputType = {
    PatentID: number
    InventorID: number
    Main: boolean
    _count: PatentInventorCountAggregateOutputType | null
    _avg: PatentInventorAvgAggregateOutputType | null
    _sum: PatentInventorSumAggregateOutputType | null
    _min: PatentInventorMinAggregateOutputType | null
    _max: PatentInventorMaxAggregateOutputType | null
  }

  type GetPatentInventorGroupByPayload<T extends PatentInventorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatentInventorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatentInventorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatentInventorGroupByOutputType[P]>
            : GetScalarType<T[P], PatentInventorGroupByOutputType[P]>
        }
      >
    >


  export type PatentInventorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    InventorID?: boolean
    Main?: boolean
    inventor?: boolean | InventorDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentInventor"]>

  export type PatentInventorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    InventorID?: boolean
    Main?: boolean
    inventor?: boolean | InventorDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentInventor"]>

  export type PatentInventorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    InventorID?: boolean
    Main?: boolean
    inventor?: boolean | InventorDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentInventor"]>

  export type PatentInventorSelectScalar = {
    PatentID?: boolean
    InventorID?: boolean
    Main?: boolean
  }

  export type PatentInventorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"PatentID" | "InventorID" | "Main", ExtArgs["result"]["patentInventor"]>
  export type PatentInventorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventor?: boolean | InventorDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }
  export type PatentInventorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventor?: boolean | InventorDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }
  export type PatentInventorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventor?: boolean | InventorDefaultArgs<ExtArgs>
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }

  export type $PatentInventorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatentInventor"
    objects: {
      inventor: Prisma.$InventorPayload<ExtArgs>
      patent: Prisma.$PatentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      PatentID: number
      InventorID: number
      Main: boolean
    }, ExtArgs["result"]["patentInventor"]>
    composites: {}
  }

  type PatentInventorGetPayload<S extends boolean | null | undefined | PatentInventorDefaultArgs> = $Result.GetResult<Prisma.$PatentInventorPayload, S>

  type PatentInventorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatentInventorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatentInventorCountAggregateInputType | true
    }

  export interface PatentInventorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatentInventor'], meta: { name: 'PatentInventor' } }
    /**
     * Find zero or one PatentInventor that matches the filter.
     * @param {PatentInventorFindUniqueArgs} args - Arguments to find a PatentInventor
     * @example
     * // Get one PatentInventor
     * const patentInventor = await prisma.patentInventor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatentInventorFindUniqueArgs>(args: SelectSubset<T, PatentInventorFindUniqueArgs<ExtArgs>>): Prisma__PatentInventorClient<$Result.GetResult<Prisma.$PatentInventorPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one PatentInventor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatentInventorFindUniqueOrThrowArgs} args - Arguments to find a PatentInventor
     * @example
     * // Get one PatentInventor
     * const patentInventor = await prisma.patentInventor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatentInventorFindUniqueOrThrowArgs>(args: SelectSubset<T, PatentInventorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatentInventorClient<$Result.GetResult<Prisma.$PatentInventorPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first PatentInventor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentInventorFindFirstArgs} args - Arguments to find a PatentInventor
     * @example
     * // Get one PatentInventor
     * const patentInventor = await prisma.patentInventor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatentInventorFindFirstArgs>(args?: SelectSubset<T, PatentInventorFindFirstArgs<ExtArgs>>): Prisma__PatentInventorClient<$Result.GetResult<Prisma.$PatentInventorPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first PatentInventor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentInventorFindFirstOrThrowArgs} args - Arguments to find a PatentInventor
     * @example
     * // Get one PatentInventor
     * const patentInventor = await prisma.patentInventor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatentInventorFindFirstOrThrowArgs>(args?: SelectSubset<T, PatentInventorFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatentInventorClient<$Result.GetResult<Prisma.$PatentInventorPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more PatentInventors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentInventorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatentInventors
     * const patentInventors = await prisma.patentInventor.findMany()
     * 
     * // Get first 10 PatentInventors
     * const patentInventors = await prisma.patentInventor.findMany({ take: 10 })
     * 
     * // Only select the `PatentID`
     * const patentInventorWithPatentIDOnly = await prisma.patentInventor.findMany({ select: { PatentID: true } })
     * 
     */
    findMany<T extends PatentInventorFindManyArgs>(args?: SelectSubset<T, PatentInventorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentInventorPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a PatentInventor.
     * @param {PatentInventorCreateArgs} args - Arguments to create a PatentInventor.
     * @example
     * // Create one PatentInventor
     * const PatentInventor = await prisma.patentInventor.create({
     *   data: {
     *     // ... data to create a PatentInventor
     *   }
     * })
     * 
     */
    create<T extends PatentInventorCreateArgs>(args: SelectSubset<T, PatentInventorCreateArgs<ExtArgs>>): Prisma__PatentInventorClient<$Result.GetResult<Prisma.$PatentInventorPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many PatentInventors.
     * @param {PatentInventorCreateManyArgs} args - Arguments to create many PatentInventors.
     * @example
     * // Create many PatentInventors
     * const patentInventor = await prisma.patentInventor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatentInventorCreateManyArgs>(args?: SelectSubset<T, PatentInventorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PatentInventors and returns the data saved in the database.
     * @param {PatentInventorCreateManyAndReturnArgs} args - Arguments to create many PatentInventors.
     * @example
     * // Create many PatentInventors
     * const patentInventor = await prisma.patentInventor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PatentInventors and only return the `PatentID`
     * const patentInventorWithPatentIDOnly = await prisma.patentInventor.createManyAndReturn({
     *   select: { PatentID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatentInventorCreateManyAndReturnArgs>(args?: SelectSubset<T, PatentInventorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentInventorPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a PatentInventor.
     * @param {PatentInventorDeleteArgs} args - Arguments to delete one PatentInventor.
     * @example
     * // Delete one PatentInventor
     * const PatentInventor = await prisma.patentInventor.delete({
     *   where: {
     *     // ... filter to delete one PatentInventor
     *   }
     * })
     * 
     */
    delete<T extends PatentInventorDeleteArgs>(args: SelectSubset<T, PatentInventorDeleteArgs<ExtArgs>>): Prisma__PatentInventorClient<$Result.GetResult<Prisma.$PatentInventorPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one PatentInventor.
     * @param {PatentInventorUpdateArgs} args - Arguments to update one PatentInventor.
     * @example
     * // Update one PatentInventor
     * const patentInventor = await prisma.patentInventor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatentInventorUpdateArgs>(args: SelectSubset<T, PatentInventorUpdateArgs<ExtArgs>>): Prisma__PatentInventorClient<$Result.GetResult<Prisma.$PatentInventorPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more PatentInventors.
     * @param {PatentInventorDeleteManyArgs} args - Arguments to filter PatentInventors to delete.
     * @example
     * // Delete a few PatentInventors
     * const { count } = await prisma.patentInventor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatentInventorDeleteManyArgs>(args?: SelectSubset<T, PatentInventorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatentInventors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentInventorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatentInventors
     * const patentInventor = await prisma.patentInventor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatentInventorUpdateManyArgs>(args: SelectSubset<T, PatentInventorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatentInventors and returns the data updated in the database.
     * @param {PatentInventorUpdateManyAndReturnArgs} args - Arguments to update many PatentInventors.
     * @example
     * // Update many PatentInventors
     * const patentInventor = await prisma.patentInventor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PatentInventors and only return the `PatentID`
     * const patentInventorWithPatentIDOnly = await prisma.patentInventor.updateManyAndReturn({
     *   select: { PatentID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatentInventorUpdateManyAndReturnArgs>(args: SelectSubset<T, PatentInventorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentInventorPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one PatentInventor.
     * @param {PatentInventorUpsertArgs} args - Arguments to update or create a PatentInventor.
     * @example
     * // Update or create a PatentInventor
     * const patentInventor = await prisma.patentInventor.upsert({
     *   create: {
     *     // ... data to create a PatentInventor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatentInventor we want to update
     *   }
     * })
     */
    upsert<T extends PatentInventorUpsertArgs>(args: SelectSubset<T, PatentInventorUpsertArgs<ExtArgs>>): Prisma__PatentInventorClient<$Result.GetResult<Prisma.$PatentInventorPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of PatentInventors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentInventorCountArgs} args - Arguments to filter PatentInventors to count.
     * @example
     * // Count the number of PatentInventors
     * const count = await prisma.patentInventor.count({
     *   where: {
     *     // ... the filter for the PatentInventors we want to count
     *   }
     * })
    **/
    count<T extends PatentInventorCountArgs>(
      args?: Subset<T, PatentInventorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatentInventorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatentInventor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentInventorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatentInventorAggregateArgs>(args: Subset<T, PatentInventorAggregateArgs>): Prisma.PrismaPromise<GetPatentInventorAggregateType<T>>

    /**
     * Group by PatentInventor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentInventorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatentInventorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatentInventorGroupByArgs['orderBy'] }
        : { orderBy?: PatentInventorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatentInventorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatentInventorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatentInventor model
   */
  readonly fields: PatentInventorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatentInventor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatentInventorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inventor<T extends InventorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InventorDefaultArgs<ExtArgs>>): Prisma__InventorClient<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    patent<T extends PatentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatentDefaultArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PatentInventor model
   */ 
  interface PatentInventorFieldRefs {
    readonly PatentID: FieldRef<"PatentInventor", 'Int'>
    readonly InventorID: FieldRef<"PatentInventor", 'Int'>
    readonly Main: FieldRef<"PatentInventor", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * PatentInventor findUnique
   */
  export type PatentInventorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorInclude<ExtArgs> | null
    /**
     * Filter, which PatentInventor to fetch.
     */
    where: PatentInventorWhereUniqueInput
  }

  /**
   * PatentInventor findUniqueOrThrow
   */
  export type PatentInventorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorInclude<ExtArgs> | null
    /**
     * Filter, which PatentInventor to fetch.
     */
    where: PatentInventorWhereUniqueInput
  }

  /**
   * PatentInventor findFirst
   */
  export type PatentInventorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorInclude<ExtArgs> | null
    /**
     * Filter, which PatentInventor to fetch.
     */
    where?: PatentInventorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentInventors to fetch.
     */
    orderBy?: PatentInventorOrderByWithRelationInput | PatentInventorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatentInventors.
     */
    cursor?: PatentInventorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentInventors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentInventors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatentInventors.
     */
    distinct?: PatentInventorScalarFieldEnum | PatentInventorScalarFieldEnum[]
  }

  /**
   * PatentInventor findFirstOrThrow
   */
  export type PatentInventorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorInclude<ExtArgs> | null
    /**
     * Filter, which PatentInventor to fetch.
     */
    where?: PatentInventorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentInventors to fetch.
     */
    orderBy?: PatentInventorOrderByWithRelationInput | PatentInventorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatentInventors.
     */
    cursor?: PatentInventorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentInventors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentInventors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatentInventors.
     */
    distinct?: PatentInventorScalarFieldEnum | PatentInventorScalarFieldEnum[]
  }

  /**
   * PatentInventor findMany
   */
  export type PatentInventorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorInclude<ExtArgs> | null
    /**
     * Filter, which PatentInventors to fetch.
     */
    where?: PatentInventorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentInventors to fetch.
     */
    orderBy?: PatentInventorOrderByWithRelationInput | PatentInventorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatentInventors.
     */
    cursor?: PatentInventorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentInventors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentInventors.
     */
    skip?: number
    distinct?: PatentInventorScalarFieldEnum | PatentInventorScalarFieldEnum[]
  }

  /**
   * PatentInventor create
   */
  export type PatentInventorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorInclude<ExtArgs> | null
    /**
     * The data needed to create a PatentInventor.
     */
    data: XOR<PatentInventorCreateInput, PatentInventorUncheckedCreateInput>
  }

  /**
   * PatentInventor createMany
   */
  export type PatentInventorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatentInventors.
     */
    data: PatentInventorCreateManyInput | PatentInventorCreateManyInput[]
  }

  /**
   * PatentInventor createManyAndReturn
   */
  export type PatentInventorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * The data used to create many PatentInventors.
     */
    data: PatentInventorCreateManyInput | PatentInventorCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatentInventor update
   */
  export type PatentInventorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorInclude<ExtArgs> | null
    /**
     * The data needed to update a PatentInventor.
     */
    data: XOR<PatentInventorUpdateInput, PatentInventorUncheckedUpdateInput>
    /**
     * Choose, which PatentInventor to update.
     */
    where: PatentInventorWhereUniqueInput
  }

  /**
   * PatentInventor updateMany
   */
  export type PatentInventorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatentInventors.
     */
    data: XOR<PatentInventorUpdateManyMutationInput, PatentInventorUncheckedUpdateManyInput>
    /**
     * Filter which PatentInventors to update
     */
    where?: PatentInventorWhereInput
  }

  /**
   * PatentInventor updateManyAndReturn
   */
  export type PatentInventorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * The data used to update PatentInventors.
     */
    data: XOR<PatentInventorUpdateManyMutationInput, PatentInventorUncheckedUpdateManyInput>
    /**
     * Filter which PatentInventors to update
     */
    where?: PatentInventorWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatentInventor upsert
   */
  export type PatentInventorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorInclude<ExtArgs> | null
    /**
     * The filter to search for the PatentInventor to update in case it exists.
     */
    where: PatentInventorWhereUniqueInput
    /**
     * In case the PatentInventor found by the `where` argument doesn't exist, create a new PatentInventor with this data.
     */
    create: XOR<PatentInventorCreateInput, PatentInventorUncheckedCreateInput>
    /**
     * In case the PatentInventor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatentInventorUpdateInput, PatentInventorUncheckedUpdateInput>
  }

  /**
   * PatentInventor delete
   */
  export type PatentInventorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorInclude<ExtArgs> | null
    /**
     * Filter which PatentInventor to delete.
     */
    where: PatentInventorWhereUniqueInput
  }

  /**
   * PatentInventor deleteMany
   */
  export type PatentInventorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatentInventors to delete
     */
    where?: PatentInventorWhereInput
  }

  /**
   * PatentInventor without action
   */
  export type PatentInventorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorInclude<ExtArgs> | null
  }


  /**
   * Model Patent
   */

  export type AggregatePatent = {
    _count: PatentCountAggregateOutputType | null
    _avg: PatentAvgAggregateOutputType | null
    _sum: PatentSumAggregateOutputType | null
    _min: PatentMinAggregateOutputType | null
    _max: PatentMaxAggregateOutputType | null
  }

  export type PatentAvgAggregateOutputType = {
    PatentID: number | null
    DepartmentID: number | null
    CollegeID: number | null
  }

  export type PatentSumAggregateOutputType = {
    PatentID: number | null
    DepartmentID: number | null
    CollegeID: number | null
  }

  export type PatentMinAggregateOutputType = {
    PatentID: number | null
    Year: string | null
    InternalID: string | null
    Title: string | null
    DepartmentID: number | null
    CollegeID: number | null
    TitleEnglish: string | null
  }

  export type PatentMaxAggregateOutputType = {
    PatentID: number | null
    Year: string | null
    InternalID: string | null
    Title: string | null
    DepartmentID: number | null
    CollegeID: number | null
    TitleEnglish: string | null
  }

  export type PatentCountAggregateOutputType = {
    PatentID: number
    Year: number
    InternalID: number
    Title: number
    DepartmentID: number
    CollegeID: number
    TitleEnglish: number
    _all: number
  }


  export type PatentAvgAggregateInputType = {
    PatentID?: true
    DepartmentID?: true
    CollegeID?: true
  }

  export type PatentSumAggregateInputType = {
    PatentID?: true
    DepartmentID?: true
    CollegeID?: true
  }

  export type PatentMinAggregateInputType = {
    PatentID?: true
    Year?: true
    InternalID?: true
    Title?: true
    DepartmentID?: true
    CollegeID?: true
    TitleEnglish?: true
  }

  export type PatentMaxAggregateInputType = {
    PatentID?: true
    Year?: true
    InternalID?: true
    Title?: true
    DepartmentID?: true
    CollegeID?: true
    TitleEnglish?: true
  }

  export type PatentCountAggregateInputType = {
    PatentID?: true
    Year?: true
    InternalID?: true
    Title?: true
    DepartmentID?: true
    CollegeID?: true
    TitleEnglish?: true
    _all?: true
  }

  export type PatentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patent to aggregate.
     */
    where?: PatentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patents to fetch.
     */
    orderBy?: PatentOrderByWithRelationInput | PatentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patents
    **/
    _count?: true | PatentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatentMaxAggregateInputType
  }

  export type GetPatentAggregateType<T extends PatentAggregateArgs> = {
        [P in keyof T & keyof AggregatePatent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatent[P]>
      : GetScalarType<T[P], AggregatePatent[P]>
  }




  export type PatentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatentWhereInput
    orderBy?: PatentOrderByWithAggregationInput | PatentOrderByWithAggregationInput[]
    by: PatentScalarFieldEnum[] | PatentScalarFieldEnum
    having?: PatentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatentCountAggregateInputType | true
    _avg?: PatentAvgAggregateInputType
    _sum?: PatentSumAggregateInputType
    _min?: PatentMinAggregateInputType
    _max?: PatentMaxAggregateInputType
  }

  export type PatentGroupByOutputType = {
    PatentID: number
    Year: string
    InternalID: string
    Title: string
    DepartmentID: number
    CollegeID: number
    TitleEnglish: string | null
    _count: PatentCountAggregateOutputType | null
    _avg: PatentAvgAggregateOutputType | null
    _sum: PatentSumAggregateOutputType | null
    _min: PatentMinAggregateOutputType | null
    _max: PatentMaxAggregateOutputType | null
  }

  type GetPatentGroupByPayload<T extends PatentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatentGroupByOutputType[P]>
            : GetScalarType<T[P], PatentGroupByOutputType[P]>
        }
      >
    >


  export type PatentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    Year?: boolean
    InternalID?: boolean
    Title?: boolean
    DepartmentID?: boolean
    CollegeID?: boolean
    TitleEnglish?: boolean
    agencies?: boolean | Patent$agenciesArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    application?: boolean | Patent$applicationArgs<ExtArgs>
    funding?: boolean | Patent$fundingArgs<ExtArgs>
    inventors?: boolean | Patent$inventorsArgs<ExtArgs>
    status?: boolean | Patent$statusArgs<ExtArgs>
    technical?: boolean | Patent$technicalArgs<ExtArgs>
    _count?: boolean | PatentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patent"]>

  export type PatentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    Year?: boolean
    InternalID?: boolean
    Title?: boolean
    DepartmentID?: boolean
    CollegeID?: boolean
    TitleEnglish?: boolean
    college?: boolean | CollegeDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patent"]>

  export type PatentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    Year?: boolean
    InternalID?: boolean
    Title?: boolean
    DepartmentID?: boolean
    CollegeID?: boolean
    TitleEnglish?: boolean
    college?: boolean | CollegeDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patent"]>

  export type PatentSelectScalar = {
    PatentID?: boolean
    Year?: boolean
    InternalID?: boolean
    Title?: boolean
    DepartmentID?: boolean
    CollegeID?: boolean
    TitleEnglish?: boolean
  }

  export type PatentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"PatentID" | "Year" | "InternalID" | "Title" | "DepartmentID" | "CollegeID" | "TitleEnglish", ExtArgs["result"]["patent"]>
  export type PatentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agencies?: boolean | Patent$agenciesArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    application?: boolean | Patent$applicationArgs<ExtArgs>
    funding?: boolean | Patent$fundingArgs<ExtArgs>
    inventors?: boolean | Patent$inventorsArgs<ExtArgs>
    status?: boolean | Patent$statusArgs<ExtArgs>
    technical?: boolean | Patent$technicalArgs<ExtArgs>
    _count?: boolean | PatentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    college?: boolean | CollegeDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }
  export type PatentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    college?: boolean | CollegeDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }

  export type $PatentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patent"
    objects: {
      agencies: Prisma.$AgencyPatentPayload<ExtArgs>[]
      college: Prisma.$CollegePayload<ExtArgs>
      department: Prisma.$DepartmentPayload<ExtArgs>
      application: Prisma.$PatentApplicationDataPayload<ExtArgs> | null
      funding: Prisma.$PatentFundingPayload<ExtArgs>[]
      inventors: Prisma.$PatentInventorPayload<ExtArgs>[]
      status: Prisma.$PatentStatusPayload<ExtArgs> | null
      technical: Prisma.$PatentTechnicalAttributesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      PatentID: number
      Year: string
      InternalID: string
      Title: string
      DepartmentID: number
      CollegeID: number
      TitleEnglish: string | null
    }, ExtArgs["result"]["patent"]>
    composites: {}
  }

  type PatentGetPayload<S extends boolean | null | undefined | PatentDefaultArgs> = $Result.GetResult<Prisma.$PatentPayload, S>

  type PatentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatentCountAggregateInputType | true
    }

  export interface PatentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patent'], meta: { name: 'Patent' } }
    /**
     * Find zero or one Patent that matches the filter.
     * @param {PatentFindUniqueArgs} args - Arguments to find a Patent
     * @example
     * // Get one Patent
     * const patent = await prisma.patent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatentFindUniqueArgs>(args: SelectSubset<T, PatentFindUniqueArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Patent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatentFindUniqueOrThrowArgs} args - Arguments to find a Patent
     * @example
     * // Get one Patent
     * const patent = await prisma.patent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatentFindUniqueOrThrowArgs>(args: SelectSubset<T, PatentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Patent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentFindFirstArgs} args - Arguments to find a Patent
     * @example
     * // Get one Patent
     * const patent = await prisma.patent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatentFindFirstArgs>(args?: SelectSubset<T, PatentFindFirstArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Patent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentFindFirstOrThrowArgs} args - Arguments to find a Patent
     * @example
     * // Get one Patent
     * const patent = await prisma.patent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatentFindFirstOrThrowArgs>(args?: SelectSubset<T, PatentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Patents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patents
     * const patents = await prisma.patent.findMany()
     * 
     * // Get first 10 Patents
     * const patents = await prisma.patent.findMany({ take: 10 })
     * 
     * // Only select the `PatentID`
     * const patentWithPatentIDOnly = await prisma.patent.findMany({ select: { PatentID: true } })
     * 
     */
    findMany<T extends PatentFindManyArgs>(args?: SelectSubset<T, PatentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Patent.
     * @param {PatentCreateArgs} args - Arguments to create a Patent.
     * @example
     * // Create one Patent
     * const Patent = await prisma.patent.create({
     *   data: {
     *     // ... data to create a Patent
     *   }
     * })
     * 
     */
    create<T extends PatentCreateArgs>(args: SelectSubset<T, PatentCreateArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Patents.
     * @param {PatentCreateManyArgs} args - Arguments to create many Patents.
     * @example
     * // Create many Patents
     * const patent = await prisma.patent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatentCreateManyArgs>(args?: SelectSubset<T, PatentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patents and returns the data saved in the database.
     * @param {PatentCreateManyAndReturnArgs} args - Arguments to create many Patents.
     * @example
     * // Create many Patents
     * const patent = await prisma.patent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patents and only return the `PatentID`
     * const patentWithPatentIDOnly = await prisma.patent.createManyAndReturn({
     *   select: { PatentID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatentCreateManyAndReturnArgs>(args?: SelectSubset<T, PatentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Patent.
     * @param {PatentDeleteArgs} args - Arguments to delete one Patent.
     * @example
     * // Delete one Patent
     * const Patent = await prisma.patent.delete({
     *   where: {
     *     // ... filter to delete one Patent
     *   }
     * })
     * 
     */
    delete<T extends PatentDeleteArgs>(args: SelectSubset<T, PatentDeleteArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Patent.
     * @param {PatentUpdateArgs} args - Arguments to update one Patent.
     * @example
     * // Update one Patent
     * const patent = await prisma.patent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatentUpdateArgs>(args: SelectSubset<T, PatentUpdateArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Patents.
     * @param {PatentDeleteManyArgs} args - Arguments to filter Patents to delete.
     * @example
     * // Delete a few Patents
     * const { count } = await prisma.patent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatentDeleteManyArgs>(args?: SelectSubset<T, PatentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patents
     * const patent = await prisma.patent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatentUpdateManyArgs>(args: SelectSubset<T, PatentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patents and returns the data updated in the database.
     * @param {PatentUpdateManyAndReturnArgs} args - Arguments to update many Patents.
     * @example
     * // Update many Patents
     * const patent = await prisma.patent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Patents and only return the `PatentID`
     * const patentWithPatentIDOnly = await prisma.patent.updateManyAndReturn({
     *   select: { PatentID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatentUpdateManyAndReturnArgs>(args: SelectSubset<T, PatentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Patent.
     * @param {PatentUpsertArgs} args - Arguments to update or create a Patent.
     * @example
     * // Update or create a Patent
     * const patent = await prisma.patent.upsert({
     *   create: {
     *     // ... data to create a Patent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patent we want to update
     *   }
     * })
     */
    upsert<T extends PatentUpsertArgs>(args: SelectSubset<T, PatentUpsertArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Patents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentCountArgs} args - Arguments to filter Patents to count.
     * @example
     * // Count the number of Patents
     * const count = await prisma.patent.count({
     *   where: {
     *     // ... the filter for the Patents we want to count
     *   }
     * })
    **/
    count<T extends PatentCountArgs>(
      args?: Subset<T, PatentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatentAggregateArgs>(args: Subset<T, PatentAggregateArgs>): Prisma.PrismaPromise<GetPatentAggregateType<T>>

    /**
     * Group by Patent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatentGroupByArgs['orderBy'] }
        : { orderBy?: PatentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patent model
   */
  readonly fields: PatentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agencies<T extends Patent$agenciesArgs<ExtArgs> = {}>(args?: Subset<T, Patent$agenciesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgencyPatentPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    college<T extends CollegeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollegeDefaultArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    department<T extends DepartmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DepartmentDefaultArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    application<T extends Patent$applicationArgs<ExtArgs> = {}>(args?: Subset<T, Patent$applicationArgs<ExtArgs>>): Prisma__PatentApplicationDataClient<$Result.GetResult<Prisma.$PatentApplicationDataPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    funding<T extends Patent$fundingArgs<ExtArgs> = {}>(args?: Subset<T, Patent$fundingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentFundingPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    inventors<T extends Patent$inventorsArgs<ExtArgs> = {}>(args?: Subset<T, Patent$inventorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentInventorPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    status<T extends Patent$statusArgs<ExtArgs> = {}>(args?: Subset<T, Patent$statusArgs<ExtArgs>>): Prisma__PatentStatusClient<$Result.GetResult<Prisma.$PatentStatusPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    technical<T extends Patent$technicalArgs<ExtArgs> = {}>(args?: Subset<T, Patent$technicalArgs<ExtArgs>>): Prisma__PatentTechnicalAttributesClient<$Result.GetResult<Prisma.$PatentTechnicalAttributesPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Patent model
   */ 
  interface PatentFieldRefs {
    readonly PatentID: FieldRef<"Patent", 'Int'>
    readonly Year: FieldRef<"Patent", 'String'>
    readonly InternalID: FieldRef<"Patent", 'String'>
    readonly Title: FieldRef<"Patent", 'String'>
    readonly DepartmentID: FieldRef<"Patent", 'Int'>
    readonly CollegeID: FieldRef<"Patent", 'Int'>
    readonly TitleEnglish: FieldRef<"Patent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Patent findUnique
   */
  export type PatentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInclude<ExtArgs> | null
    /**
     * Filter, which Patent to fetch.
     */
    where: PatentWhereUniqueInput
  }

  /**
   * Patent findUniqueOrThrow
   */
  export type PatentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInclude<ExtArgs> | null
    /**
     * Filter, which Patent to fetch.
     */
    where: PatentWhereUniqueInput
  }

  /**
   * Patent findFirst
   */
  export type PatentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInclude<ExtArgs> | null
    /**
     * Filter, which Patent to fetch.
     */
    where?: PatentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patents to fetch.
     */
    orderBy?: PatentOrderByWithRelationInput | PatentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patents.
     */
    cursor?: PatentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patents.
     */
    distinct?: PatentScalarFieldEnum | PatentScalarFieldEnum[]
  }

  /**
   * Patent findFirstOrThrow
   */
  export type PatentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInclude<ExtArgs> | null
    /**
     * Filter, which Patent to fetch.
     */
    where?: PatentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patents to fetch.
     */
    orderBy?: PatentOrderByWithRelationInput | PatentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patents.
     */
    cursor?: PatentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patents.
     */
    distinct?: PatentScalarFieldEnum | PatentScalarFieldEnum[]
  }

  /**
   * Patent findMany
   */
  export type PatentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInclude<ExtArgs> | null
    /**
     * Filter, which Patents to fetch.
     */
    where?: PatentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patents to fetch.
     */
    orderBy?: PatentOrderByWithRelationInput | PatentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patents.
     */
    cursor?: PatentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patents.
     */
    skip?: number
    distinct?: PatentScalarFieldEnum | PatentScalarFieldEnum[]
  }

  /**
   * Patent create
   */
  export type PatentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInclude<ExtArgs> | null
    /**
     * The data needed to create a Patent.
     */
    data: XOR<PatentCreateInput, PatentUncheckedCreateInput>
  }

  /**
   * Patent createMany
   */
  export type PatentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patents.
     */
    data: PatentCreateManyInput | PatentCreateManyInput[]
  }

  /**
   * Patent createManyAndReturn
   */
  export type PatentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * The data used to create many Patents.
     */
    data: PatentCreateManyInput | PatentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patent update
   */
  export type PatentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInclude<ExtArgs> | null
    /**
     * The data needed to update a Patent.
     */
    data: XOR<PatentUpdateInput, PatentUncheckedUpdateInput>
    /**
     * Choose, which Patent to update.
     */
    where: PatentWhereUniqueInput
  }

  /**
   * Patent updateMany
   */
  export type PatentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patents.
     */
    data: XOR<PatentUpdateManyMutationInput, PatentUncheckedUpdateManyInput>
    /**
     * Filter which Patents to update
     */
    where?: PatentWhereInput
  }

  /**
   * Patent updateManyAndReturn
   */
  export type PatentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * The data used to update Patents.
     */
    data: XOR<PatentUpdateManyMutationInput, PatentUncheckedUpdateManyInput>
    /**
     * Filter which Patents to update
     */
    where?: PatentWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patent upsert
   */
  export type PatentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInclude<ExtArgs> | null
    /**
     * The filter to search for the Patent to update in case it exists.
     */
    where: PatentWhereUniqueInput
    /**
     * In case the Patent found by the `where` argument doesn't exist, create a new Patent with this data.
     */
    create: XOR<PatentCreateInput, PatentUncheckedCreateInput>
    /**
     * In case the Patent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatentUpdateInput, PatentUncheckedUpdateInput>
  }

  /**
   * Patent delete
   */
  export type PatentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInclude<ExtArgs> | null
    /**
     * Filter which Patent to delete.
     */
    where: PatentWhereUniqueInput
  }

  /**
   * Patent deleteMany
   */
  export type PatentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patents to delete
     */
    where?: PatentWhereInput
  }

  /**
   * Patent.agencies
   */
  export type Patent$agenciesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyPatent
     */
    select?: AgencyPatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyPatent
     */
    omit?: AgencyPatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyPatentInclude<ExtArgs> | null
    where?: AgencyPatentWhereInput
    orderBy?: AgencyPatentOrderByWithRelationInput | AgencyPatentOrderByWithRelationInput[]
    cursor?: AgencyPatentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgencyPatentScalarFieldEnum | AgencyPatentScalarFieldEnum[]
  }

  /**
   * Patent.application
   */
  export type Patent$applicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataInclude<ExtArgs> | null
    where?: PatentApplicationDataWhereInput
  }

  /**
   * Patent.funding
   */
  export type Patent$fundingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentFunding
     */
    select?: PatentFundingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentFunding
     */
    omit?: PatentFundingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentFundingInclude<ExtArgs> | null
    where?: PatentFundingWhereInput
    orderBy?: PatentFundingOrderByWithRelationInput | PatentFundingOrderByWithRelationInput[]
    cursor?: PatentFundingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatentFundingScalarFieldEnum | PatentFundingScalarFieldEnum[]
  }

  /**
   * Patent.inventors
   */
  export type Patent$inventorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentInventor
     */
    select?: PatentInventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentInventor
     */
    omit?: PatentInventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInventorInclude<ExtArgs> | null
    where?: PatentInventorWhereInput
    orderBy?: PatentInventorOrderByWithRelationInput | PatentInventorOrderByWithRelationInput[]
    cursor?: PatentInventorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatentInventorScalarFieldEnum | PatentInventorScalarFieldEnum[]
  }

  /**
   * Patent.status
   */
  export type Patent$statusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentStatus
     */
    select?: PatentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentStatus
     */
    omit?: PatentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentStatusInclude<ExtArgs> | null
    where?: PatentStatusWhereInput
  }

  /**
   * Patent.technical
   */
  export type Patent$technicalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentTechnicalAttributes
     */
    select?: PatentTechnicalAttributesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentTechnicalAttributes
     */
    omit?: PatentTechnicalAttributesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentTechnicalAttributesInclude<ExtArgs> | null
    where?: PatentTechnicalAttributesWhereInput
  }

  /**
   * Patent without action
   */
  export type PatentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInclude<ExtArgs> | null
  }


  /**
   * Model PatentStatus
   */

  export type AggregatePatentStatus = {
    _count: PatentStatusCountAggregateOutputType | null
    _avg: PatentStatusAvgAggregateOutputType | null
    _sum: PatentStatusSumAggregateOutputType | null
    _min: PatentStatusMinAggregateOutputType | null
    _max: PatentStatusMaxAggregateOutputType | null
  }

  export type PatentStatusAvgAggregateOutputType = {
    PatentID: number | null
    MaintenanceYear: number | null
  }

  export type PatentStatusSumAggregateOutputType = {
    PatentID: number | null
    MaintenanceYear: number | null
  }

  export type PatentStatusMinAggregateOutputType = {
    PatentID: number | null
    ExpiryDate: Date | null
    Status: string | null
    TechnicalCommitteeReviewDate: Date | null
    MaintenanceYear: number | null
    MaintenanceStartDate: Date | null
    MaintenanceEndDate: Date | null
  }

  export type PatentStatusMaxAggregateOutputType = {
    PatentID: number | null
    ExpiryDate: Date | null
    Status: string | null
    TechnicalCommitteeReviewDate: Date | null
    MaintenanceYear: number | null
    MaintenanceStartDate: Date | null
    MaintenanceEndDate: Date | null
  }

  export type PatentStatusCountAggregateOutputType = {
    PatentID: number
    ExpiryDate: number
    Status: number
    TechnicalCommitteeReviewDate: number
    MaintenanceYear: number
    MaintenanceStartDate: number
    MaintenanceEndDate: number
    _all: number
  }


  export type PatentStatusAvgAggregateInputType = {
    PatentID?: true
    MaintenanceYear?: true
  }

  export type PatentStatusSumAggregateInputType = {
    PatentID?: true
    MaintenanceYear?: true
  }

  export type PatentStatusMinAggregateInputType = {
    PatentID?: true
    ExpiryDate?: true
    Status?: true
    TechnicalCommitteeReviewDate?: true
    MaintenanceYear?: true
    MaintenanceStartDate?: true
    MaintenanceEndDate?: true
  }

  export type PatentStatusMaxAggregateInputType = {
    PatentID?: true
    ExpiryDate?: true
    Status?: true
    TechnicalCommitteeReviewDate?: true
    MaintenanceYear?: true
    MaintenanceStartDate?: true
    MaintenanceEndDate?: true
  }

  export type PatentStatusCountAggregateInputType = {
    PatentID?: true
    ExpiryDate?: true
    Status?: true
    TechnicalCommitteeReviewDate?: true
    MaintenanceYear?: true
    MaintenanceStartDate?: true
    MaintenanceEndDate?: true
    _all?: true
  }

  export type PatentStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatentStatus to aggregate.
     */
    where?: PatentStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentStatuses to fetch.
     */
    orderBy?: PatentStatusOrderByWithRelationInput | PatentStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatentStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatentStatuses
    **/
    _count?: true | PatentStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatentStatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatentStatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatentStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatentStatusMaxAggregateInputType
  }

  export type GetPatentStatusAggregateType<T extends PatentStatusAggregateArgs> = {
        [P in keyof T & keyof AggregatePatentStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatentStatus[P]>
      : GetScalarType<T[P], AggregatePatentStatus[P]>
  }




  export type PatentStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatentStatusWhereInput
    orderBy?: PatentStatusOrderByWithAggregationInput | PatentStatusOrderByWithAggregationInput[]
    by: PatentStatusScalarFieldEnum[] | PatentStatusScalarFieldEnum
    having?: PatentStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatentStatusCountAggregateInputType | true
    _avg?: PatentStatusAvgAggregateInputType
    _sum?: PatentStatusSumAggregateInputType
    _min?: PatentStatusMinAggregateInputType
    _max?: PatentStatusMaxAggregateInputType
  }

  export type PatentStatusGroupByOutputType = {
    PatentID: number
    ExpiryDate: Date | null
    Status: string
    TechnicalCommitteeReviewDate: Date | null
    MaintenanceYear: number | null
    MaintenanceStartDate: Date | null
    MaintenanceEndDate: Date | null
    _count: PatentStatusCountAggregateOutputType | null
    _avg: PatentStatusAvgAggregateOutputType | null
    _sum: PatentStatusSumAggregateOutputType | null
    _min: PatentStatusMinAggregateOutputType | null
    _max: PatentStatusMaxAggregateOutputType | null
  }

  type GetPatentStatusGroupByPayload<T extends PatentStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatentStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatentStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatentStatusGroupByOutputType[P]>
            : GetScalarType<T[P], PatentStatusGroupByOutputType[P]>
        }
      >
    >


  export type PatentStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    ExpiryDate?: boolean
    Status?: boolean
    TechnicalCommitteeReviewDate?: boolean
    MaintenanceYear?: boolean
    MaintenanceStartDate?: boolean
    MaintenanceEndDate?: boolean
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentStatus"]>

  export type PatentStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    ExpiryDate?: boolean
    Status?: boolean
    TechnicalCommitteeReviewDate?: boolean
    MaintenanceYear?: boolean
    MaintenanceStartDate?: boolean
    MaintenanceEndDate?: boolean
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentStatus"]>

  export type PatentStatusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    ExpiryDate?: boolean
    Status?: boolean
    TechnicalCommitteeReviewDate?: boolean
    MaintenanceYear?: boolean
    MaintenanceStartDate?: boolean
    MaintenanceEndDate?: boolean
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentStatus"]>

  export type PatentStatusSelectScalar = {
    PatentID?: boolean
    ExpiryDate?: boolean
    Status?: boolean
    TechnicalCommitteeReviewDate?: boolean
    MaintenanceYear?: boolean
    MaintenanceStartDate?: boolean
    MaintenanceEndDate?: boolean
  }

  export type PatentStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"PatentID" | "ExpiryDate" | "Status" | "TechnicalCommitteeReviewDate" | "MaintenanceYear" | "MaintenanceStartDate" | "MaintenanceEndDate", ExtArgs["result"]["patentStatus"]>
  export type PatentStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }
  export type PatentStatusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }
  export type PatentStatusIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }

  export type $PatentStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatentStatus"
    objects: {
      patent: Prisma.$PatentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      PatentID: number
      ExpiryDate: Date | null
      Status: string
      TechnicalCommitteeReviewDate: Date | null
      MaintenanceYear: number | null
      MaintenanceStartDate: Date | null
      MaintenanceEndDate: Date | null
    }, ExtArgs["result"]["patentStatus"]>
    composites: {}
  }

  type PatentStatusGetPayload<S extends boolean | null | undefined | PatentStatusDefaultArgs> = $Result.GetResult<Prisma.$PatentStatusPayload, S>

  type PatentStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatentStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatentStatusCountAggregateInputType | true
    }

  export interface PatentStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatentStatus'], meta: { name: 'PatentStatus' } }
    /**
     * Find zero or one PatentStatus that matches the filter.
     * @param {PatentStatusFindUniqueArgs} args - Arguments to find a PatentStatus
     * @example
     * // Get one PatentStatus
     * const patentStatus = await prisma.patentStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatentStatusFindUniqueArgs>(args: SelectSubset<T, PatentStatusFindUniqueArgs<ExtArgs>>): Prisma__PatentStatusClient<$Result.GetResult<Prisma.$PatentStatusPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one PatentStatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatentStatusFindUniqueOrThrowArgs} args - Arguments to find a PatentStatus
     * @example
     * // Get one PatentStatus
     * const patentStatus = await prisma.patentStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatentStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, PatentStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatentStatusClient<$Result.GetResult<Prisma.$PatentStatusPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first PatentStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentStatusFindFirstArgs} args - Arguments to find a PatentStatus
     * @example
     * // Get one PatentStatus
     * const patentStatus = await prisma.patentStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatentStatusFindFirstArgs>(args?: SelectSubset<T, PatentStatusFindFirstArgs<ExtArgs>>): Prisma__PatentStatusClient<$Result.GetResult<Prisma.$PatentStatusPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first PatentStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentStatusFindFirstOrThrowArgs} args - Arguments to find a PatentStatus
     * @example
     * // Get one PatentStatus
     * const patentStatus = await prisma.patentStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatentStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, PatentStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatentStatusClient<$Result.GetResult<Prisma.$PatentStatusPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more PatentStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatentStatuses
     * const patentStatuses = await prisma.patentStatus.findMany()
     * 
     * // Get first 10 PatentStatuses
     * const patentStatuses = await prisma.patentStatus.findMany({ take: 10 })
     * 
     * // Only select the `PatentID`
     * const patentStatusWithPatentIDOnly = await prisma.patentStatus.findMany({ select: { PatentID: true } })
     * 
     */
    findMany<T extends PatentStatusFindManyArgs>(args?: SelectSubset<T, PatentStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentStatusPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a PatentStatus.
     * @param {PatentStatusCreateArgs} args - Arguments to create a PatentStatus.
     * @example
     * // Create one PatentStatus
     * const PatentStatus = await prisma.patentStatus.create({
     *   data: {
     *     // ... data to create a PatentStatus
     *   }
     * })
     * 
     */
    create<T extends PatentStatusCreateArgs>(args: SelectSubset<T, PatentStatusCreateArgs<ExtArgs>>): Prisma__PatentStatusClient<$Result.GetResult<Prisma.$PatentStatusPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many PatentStatuses.
     * @param {PatentStatusCreateManyArgs} args - Arguments to create many PatentStatuses.
     * @example
     * // Create many PatentStatuses
     * const patentStatus = await prisma.patentStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatentStatusCreateManyArgs>(args?: SelectSubset<T, PatentStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PatentStatuses and returns the data saved in the database.
     * @param {PatentStatusCreateManyAndReturnArgs} args - Arguments to create many PatentStatuses.
     * @example
     * // Create many PatentStatuses
     * const patentStatus = await prisma.patentStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PatentStatuses and only return the `PatentID`
     * const patentStatusWithPatentIDOnly = await prisma.patentStatus.createManyAndReturn({
     *   select: { PatentID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatentStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, PatentStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentStatusPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a PatentStatus.
     * @param {PatentStatusDeleteArgs} args - Arguments to delete one PatentStatus.
     * @example
     * // Delete one PatentStatus
     * const PatentStatus = await prisma.patentStatus.delete({
     *   where: {
     *     // ... filter to delete one PatentStatus
     *   }
     * })
     * 
     */
    delete<T extends PatentStatusDeleteArgs>(args: SelectSubset<T, PatentStatusDeleteArgs<ExtArgs>>): Prisma__PatentStatusClient<$Result.GetResult<Prisma.$PatentStatusPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one PatentStatus.
     * @param {PatentStatusUpdateArgs} args - Arguments to update one PatentStatus.
     * @example
     * // Update one PatentStatus
     * const patentStatus = await prisma.patentStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatentStatusUpdateArgs>(args: SelectSubset<T, PatentStatusUpdateArgs<ExtArgs>>): Prisma__PatentStatusClient<$Result.GetResult<Prisma.$PatentStatusPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more PatentStatuses.
     * @param {PatentStatusDeleteManyArgs} args - Arguments to filter PatentStatuses to delete.
     * @example
     * // Delete a few PatentStatuses
     * const { count } = await prisma.patentStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatentStatusDeleteManyArgs>(args?: SelectSubset<T, PatentStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatentStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatentStatuses
     * const patentStatus = await prisma.patentStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatentStatusUpdateManyArgs>(args: SelectSubset<T, PatentStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatentStatuses and returns the data updated in the database.
     * @param {PatentStatusUpdateManyAndReturnArgs} args - Arguments to update many PatentStatuses.
     * @example
     * // Update many PatentStatuses
     * const patentStatus = await prisma.patentStatus.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PatentStatuses and only return the `PatentID`
     * const patentStatusWithPatentIDOnly = await prisma.patentStatus.updateManyAndReturn({
     *   select: { PatentID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatentStatusUpdateManyAndReturnArgs>(args: SelectSubset<T, PatentStatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentStatusPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one PatentStatus.
     * @param {PatentStatusUpsertArgs} args - Arguments to update or create a PatentStatus.
     * @example
     * // Update or create a PatentStatus
     * const patentStatus = await prisma.patentStatus.upsert({
     *   create: {
     *     // ... data to create a PatentStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatentStatus we want to update
     *   }
     * })
     */
    upsert<T extends PatentStatusUpsertArgs>(args: SelectSubset<T, PatentStatusUpsertArgs<ExtArgs>>): Prisma__PatentStatusClient<$Result.GetResult<Prisma.$PatentStatusPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of PatentStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentStatusCountArgs} args - Arguments to filter PatentStatuses to count.
     * @example
     * // Count the number of PatentStatuses
     * const count = await prisma.patentStatus.count({
     *   where: {
     *     // ... the filter for the PatentStatuses we want to count
     *   }
     * })
    **/
    count<T extends PatentStatusCountArgs>(
      args?: Subset<T, PatentStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatentStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatentStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatentStatusAggregateArgs>(args: Subset<T, PatentStatusAggregateArgs>): Prisma.PrismaPromise<GetPatentStatusAggregateType<T>>

    /**
     * Group by PatentStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatentStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatentStatusGroupByArgs['orderBy'] }
        : { orderBy?: PatentStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatentStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatentStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatentStatus model
   */
  readonly fields: PatentStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatentStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatentStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patent<T extends PatentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatentDefaultArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PatentStatus model
   */ 
  interface PatentStatusFieldRefs {
    readonly PatentID: FieldRef<"PatentStatus", 'Int'>
    readonly ExpiryDate: FieldRef<"PatentStatus", 'DateTime'>
    readonly Status: FieldRef<"PatentStatus", 'String'>
    readonly TechnicalCommitteeReviewDate: FieldRef<"PatentStatus", 'DateTime'>
    readonly MaintenanceYear: FieldRef<"PatentStatus", 'Int'>
    readonly MaintenanceStartDate: FieldRef<"PatentStatus", 'DateTime'>
    readonly MaintenanceEndDate: FieldRef<"PatentStatus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PatentStatus findUnique
   */
  export type PatentStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentStatus
     */
    select?: PatentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentStatus
     */
    omit?: PatentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentStatusInclude<ExtArgs> | null
    /**
     * Filter, which PatentStatus to fetch.
     */
    where: PatentStatusWhereUniqueInput
  }

  /**
   * PatentStatus findUniqueOrThrow
   */
  export type PatentStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentStatus
     */
    select?: PatentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentStatus
     */
    omit?: PatentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentStatusInclude<ExtArgs> | null
    /**
     * Filter, which PatentStatus to fetch.
     */
    where: PatentStatusWhereUniqueInput
  }

  /**
   * PatentStatus findFirst
   */
  export type PatentStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentStatus
     */
    select?: PatentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentStatus
     */
    omit?: PatentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentStatusInclude<ExtArgs> | null
    /**
     * Filter, which PatentStatus to fetch.
     */
    where?: PatentStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentStatuses to fetch.
     */
    orderBy?: PatentStatusOrderByWithRelationInput | PatentStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatentStatuses.
     */
    cursor?: PatentStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatentStatuses.
     */
    distinct?: PatentStatusScalarFieldEnum | PatentStatusScalarFieldEnum[]
  }

  /**
   * PatentStatus findFirstOrThrow
   */
  export type PatentStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentStatus
     */
    select?: PatentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentStatus
     */
    omit?: PatentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentStatusInclude<ExtArgs> | null
    /**
     * Filter, which PatentStatus to fetch.
     */
    where?: PatentStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentStatuses to fetch.
     */
    orderBy?: PatentStatusOrderByWithRelationInput | PatentStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatentStatuses.
     */
    cursor?: PatentStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatentStatuses.
     */
    distinct?: PatentStatusScalarFieldEnum | PatentStatusScalarFieldEnum[]
  }

  /**
   * PatentStatus findMany
   */
  export type PatentStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentStatus
     */
    select?: PatentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentStatus
     */
    omit?: PatentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentStatusInclude<ExtArgs> | null
    /**
     * Filter, which PatentStatuses to fetch.
     */
    where?: PatentStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentStatuses to fetch.
     */
    orderBy?: PatentStatusOrderByWithRelationInput | PatentStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatentStatuses.
     */
    cursor?: PatentStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentStatuses.
     */
    skip?: number
    distinct?: PatentStatusScalarFieldEnum | PatentStatusScalarFieldEnum[]
  }

  /**
   * PatentStatus create
   */
  export type PatentStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentStatus
     */
    select?: PatentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentStatus
     */
    omit?: PatentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a PatentStatus.
     */
    data: XOR<PatentStatusCreateInput, PatentStatusUncheckedCreateInput>
  }

  /**
   * PatentStatus createMany
   */
  export type PatentStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatentStatuses.
     */
    data: PatentStatusCreateManyInput | PatentStatusCreateManyInput[]
  }

  /**
   * PatentStatus createManyAndReturn
   */
  export type PatentStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentStatus
     */
    select?: PatentStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatentStatus
     */
    omit?: PatentStatusOmit<ExtArgs> | null
    /**
     * The data used to create many PatentStatuses.
     */
    data: PatentStatusCreateManyInput | PatentStatusCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentStatusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatentStatus update
   */
  export type PatentStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentStatus
     */
    select?: PatentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentStatus
     */
    omit?: PatentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a PatentStatus.
     */
    data: XOR<PatentStatusUpdateInput, PatentStatusUncheckedUpdateInput>
    /**
     * Choose, which PatentStatus to update.
     */
    where: PatentStatusWhereUniqueInput
  }

  /**
   * PatentStatus updateMany
   */
  export type PatentStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatentStatuses.
     */
    data: XOR<PatentStatusUpdateManyMutationInput, PatentStatusUncheckedUpdateManyInput>
    /**
     * Filter which PatentStatuses to update
     */
    where?: PatentStatusWhereInput
  }

  /**
   * PatentStatus updateManyAndReturn
   */
  export type PatentStatusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentStatus
     */
    select?: PatentStatusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatentStatus
     */
    omit?: PatentStatusOmit<ExtArgs> | null
    /**
     * The data used to update PatentStatuses.
     */
    data: XOR<PatentStatusUpdateManyMutationInput, PatentStatusUncheckedUpdateManyInput>
    /**
     * Filter which PatentStatuses to update
     */
    where?: PatentStatusWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentStatusIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatentStatus upsert
   */
  export type PatentStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentStatus
     */
    select?: PatentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentStatus
     */
    omit?: PatentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the PatentStatus to update in case it exists.
     */
    where: PatentStatusWhereUniqueInput
    /**
     * In case the PatentStatus found by the `where` argument doesn't exist, create a new PatentStatus with this data.
     */
    create: XOR<PatentStatusCreateInput, PatentStatusUncheckedCreateInput>
    /**
     * In case the PatentStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatentStatusUpdateInput, PatentStatusUncheckedUpdateInput>
  }

  /**
   * PatentStatus delete
   */
  export type PatentStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentStatus
     */
    select?: PatentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentStatus
     */
    omit?: PatentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentStatusInclude<ExtArgs> | null
    /**
     * Filter which PatentStatus to delete.
     */
    where: PatentStatusWhereUniqueInput
  }

  /**
   * PatentStatus deleteMany
   */
  export type PatentStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatentStatuses to delete
     */
    where?: PatentStatusWhereInput
  }

  /**
   * PatentStatus without action
   */
  export type PatentStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentStatus
     */
    select?: PatentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentStatus
     */
    omit?: PatentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentStatusInclude<ExtArgs> | null
  }


  /**
   * Model PatentApplicationData
   */

  export type AggregatePatentApplicationData = {
    _count: PatentApplicationDataCountAggregateOutputType | null
    _avg: PatentApplicationDataAvgAggregateOutputType | null
    _sum: PatentApplicationDataSumAggregateOutputType | null
    _min: PatentApplicationDataMinAggregateOutputType | null
    _max: PatentApplicationDataMaxAggregateOutputType | null
  }

  export type PatentApplicationDataAvgAggregateOutputType = {
    PatentID: number | null
    CountryID: number | null
  }

  export type PatentApplicationDataSumAggregateOutputType = {
    PatentID: number | null
    CountryID: number | null
  }

  export type PatentApplicationDataMinAggregateOutputType = {
    PatentID: number | null
    CountryID: number | null
    PatentNumber: string | null
    FilingDate: Date | null
    GrantDate: Date | null
    PatentType: string | null
    ApplicationNumber: string | null
  }

  export type PatentApplicationDataMaxAggregateOutputType = {
    PatentID: number | null
    CountryID: number | null
    PatentNumber: string | null
    FilingDate: Date | null
    GrantDate: Date | null
    PatentType: string | null
    ApplicationNumber: string | null
  }

  export type PatentApplicationDataCountAggregateOutputType = {
    PatentID: number
    CountryID: number
    PatentNumber: number
    FilingDate: number
    GrantDate: number
    PatentType: number
    ApplicationNumber: number
    _all: number
  }


  export type PatentApplicationDataAvgAggregateInputType = {
    PatentID?: true
    CountryID?: true
  }

  export type PatentApplicationDataSumAggregateInputType = {
    PatentID?: true
    CountryID?: true
  }

  export type PatentApplicationDataMinAggregateInputType = {
    PatentID?: true
    CountryID?: true
    PatentNumber?: true
    FilingDate?: true
    GrantDate?: true
    PatentType?: true
    ApplicationNumber?: true
  }

  export type PatentApplicationDataMaxAggregateInputType = {
    PatentID?: true
    CountryID?: true
    PatentNumber?: true
    FilingDate?: true
    GrantDate?: true
    PatentType?: true
    ApplicationNumber?: true
  }

  export type PatentApplicationDataCountAggregateInputType = {
    PatentID?: true
    CountryID?: true
    PatentNumber?: true
    FilingDate?: true
    GrantDate?: true
    PatentType?: true
    ApplicationNumber?: true
    _all?: true
  }

  export type PatentApplicationDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatentApplicationData to aggregate.
     */
    where?: PatentApplicationDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentApplicationData to fetch.
     */
    orderBy?: PatentApplicationDataOrderByWithRelationInput | PatentApplicationDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatentApplicationDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentApplicationData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentApplicationData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatentApplicationData
    **/
    _count?: true | PatentApplicationDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatentApplicationDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatentApplicationDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatentApplicationDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatentApplicationDataMaxAggregateInputType
  }

  export type GetPatentApplicationDataAggregateType<T extends PatentApplicationDataAggregateArgs> = {
        [P in keyof T & keyof AggregatePatentApplicationData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatentApplicationData[P]>
      : GetScalarType<T[P], AggregatePatentApplicationData[P]>
  }




  export type PatentApplicationDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatentApplicationDataWhereInput
    orderBy?: PatentApplicationDataOrderByWithAggregationInput | PatentApplicationDataOrderByWithAggregationInput[]
    by: PatentApplicationDataScalarFieldEnum[] | PatentApplicationDataScalarFieldEnum
    having?: PatentApplicationDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatentApplicationDataCountAggregateInputType | true
    _avg?: PatentApplicationDataAvgAggregateInputType
    _sum?: PatentApplicationDataSumAggregateInputType
    _min?: PatentApplicationDataMinAggregateInputType
    _max?: PatentApplicationDataMaxAggregateInputType
  }

  export type PatentApplicationDataGroupByOutputType = {
    PatentID: number
    CountryID: number
    PatentNumber: string
    FilingDate: Date | null
    GrantDate: Date | null
    PatentType: string
    ApplicationNumber: string
    _count: PatentApplicationDataCountAggregateOutputType | null
    _avg: PatentApplicationDataAvgAggregateOutputType | null
    _sum: PatentApplicationDataSumAggregateOutputType | null
    _min: PatentApplicationDataMinAggregateOutputType | null
    _max: PatentApplicationDataMaxAggregateOutputType | null
  }

  type GetPatentApplicationDataGroupByPayload<T extends PatentApplicationDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatentApplicationDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatentApplicationDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatentApplicationDataGroupByOutputType[P]>
            : GetScalarType<T[P], PatentApplicationDataGroupByOutputType[P]>
        }
      >
    >


  export type PatentApplicationDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    CountryID?: boolean
    PatentNumber?: boolean
    FilingDate?: boolean
    GrantDate?: boolean
    PatentType?: boolean
    ApplicationNumber?: boolean
    patent?: boolean | PatentDefaultArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentApplicationData"]>

  export type PatentApplicationDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    CountryID?: boolean
    PatentNumber?: boolean
    FilingDate?: boolean
    GrantDate?: boolean
    PatentType?: boolean
    ApplicationNumber?: boolean
    patent?: boolean | PatentDefaultArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentApplicationData"]>

  export type PatentApplicationDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    CountryID?: boolean
    PatentNumber?: boolean
    FilingDate?: boolean
    GrantDate?: boolean
    PatentType?: boolean
    ApplicationNumber?: boolean
    patent?: boolean | PatentDefaultArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentApplicationData"]>

  export type PatentApplicationDataSelectScalar = {
    PatentID?: boolean
    CountryID?: boolean
    PatentNumber?: boolean
    FilingDate?: boolean
    GrantDate?: boolean
    PatentType?: boolean
    ApplicationNumber?: boolean
  }

  export type PatentApplicationDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"PatentID" | "CountryID" | "PatentNumber" | "FilingDate" | "GrantDate" | "PatentType" | "ApplicationNumber", ExtArgs["result"]["patentApplicationData"]>
  export type PatentApplicationDataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patent?: boolean | PatentDefaultArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }
  export type PatentApplicationDataIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patent?: boolean | PatentDefaultArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }
  export type PatentApplicationDataIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patent?: boolean | PatentDefaultArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }

  export type $PatentApplicationDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatentApplicationData"
    objects: {
      patent: Prisma.$PatentPayload<ExtArgs>
      country: Prisma.$CountryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      PatentID: number
      CountryID: number
      PatentNumber: string
      FilingDate: Date | null
      GrantDate: Date | null
      PatentType: string
      ApplicationNumber: string
    }, ExtArgs["result"]["patentApplicationData"]>
    composites: {}
  }

  type PatentApplicationDataGetPayload<S extends boolean | null | undefined | PatentApplicationDataDefaultArgs> = $Result.GetResult<Prisma.$PatentApplicationDataPayload, S>

  type PatentApplicationDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatentApplicationDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatentApplicationDataCountAggregateInputType | true
    }

  export interface PatentApplicationDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatentApplicationData'], meta: { name: 'PatentApplicationData' } }
    /**
     * Find zero or one PatentApplicationData that matches the filter.
     * @param {PatentApplicationDataFindUniqueArgs} args - Arguments to find a PatentApplicationData
     * @example
     * // Get one PatentApplicationData
     * const patentApplicationData = await prisma.patentApplicationData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatentApplicationDataFindUniqueArgs>(args: SelectSubset<T, PatentApplicationDataFindUniqueArgs<ExtArgs>>): Prisma__PatentApplicationDataClient<$Result.GetResult<Prisma.$PatentApplicationDataPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one PatentApplicationData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatentApplicationDataFindUniqueOrThrowArgs} args - Arguments to find a PatentApplicationData
     * @example
     * // Get one PatentApplicationData
     * const patentApplicationData = await prisma.patentApplicationData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatentApplicationDataFindUniqueOrThrowArgs>(args: SelectSubset<T, PatentApplicationDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatentApplicationDataClient<$Result.GetResult<Prisma.$PatentApplicationDataPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first PatentApplicationData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentApplicationDataFindFirstArgs} args - Arguments to find a PatentApplicationData
     * @example
     * // Get one PatentApplicationData
     * const patentApplicationData = await prisma.patentApplicationData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatentApplicationDataFindFirstArgs>(args?: SelectSubset<T, PatentApplicationDataFindFirstArgs<ExtArgs>>): Prisma__PatentApplicationDataClient<$Result.GetResult<Prisma.$PatentApplicationDataPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first PatentApplicationData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentApplicationDataFindFirstOrThrowArgs} args - Arguments to find a PatentApplicationData
     * @example
     * // Get one PatentApplicationData
     * const patentApplicationData = await prisma.patentApplicationData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatentApplicationDataFindFirstOrThrowArgs>(args?: SelectSubset<T, PatentApplicationDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatentApplicationDataClient<$Result.GetResult<Prisma.$PatentApplicationDataPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more PatentApplicationData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentApplicationDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatentApplicationData
     * const patentApplicationData = await prisma.patentApplicationData.findMany()
     * 
     * // Get first 10 PatentApplicationData
     * const patentApplicationData = await prisma.patentApplicationData.findMany({ take: 10 })
     * 
     * // Only select the `PatentID`
     * const patentApplicationDataWithPatentIDOnly = await prisma.patentApplicationData.findMany({ select: { PatentID: true } })
     * 
     */
    findMany<T extends PatentApplicationDataFindManyArgs>(args?: SelectSubset<T, PatentApplicationDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentApplicationDataPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a PatentApplicationData.
     * @param {PatentApplicationDataCreateArgs} args - Arguments to create a PatentApplicationData.
     * @example
     * // Create one PatentApplicationData
     * const PatentApplicationData = await prisma.patentApplicationData.create({
     *   data: {
     *     // ... data to create a PatentApplicationData
     *   }
     * })
     * 
     */
    create<T extends PatentApplicationDataCreateArgs>(args: SelectSubset<T, PatentApplicationDataCreateArgs<ExtArgs>>): Prisma__PatentApplicationDataClient<$Result.GetResult<Prisma.$PatentApplicationDataPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many PatentApplicationData.
     * @param {PatentApplicationDataCreateManyArgs} args - Arguments to create many PatentApplicationData.
     * @example
     * // Create many PatentApplicationData
     * const patentApplicationData = await prisma.patentApplicationData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatentApplicationDataCreateManyArgs>(args?: SelectSubset<T, PatentApplicationDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PatentApplicationData and returns the data saved in the database.
     * @param {PatentApplicationDataCreateManyAndReturnArgs} args - Arguments to create many PatentApplicationData.
     * @example
     * // Create many PatentApplicationData
     * const patentApplicationData = await prisma.patentApplicationData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PatentApplicationData and only return the `PatentID`
     * const patentApplicationDataWithPatentIDOnly = await prisma.patentApplicationData.createManyAndReturn({
     *   select: { PatentID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatentApplicationDataCreateManyAndReturnArgs>(args?: SelectSubset<T, PatentApplicationDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentApplicationDataPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a PatentApplicationData.
     * @param {PatentApplicationDataDeleteArgs} args - Arguments to delete one PatentApplicationData.
     * @example
     * // Delete one PatentApplicationData
     * const PatentApplicationData = await prisma.patentApplicationData.delete({
     *   where: {
     *     // ... filter to delete one PatentApplicationData
     *   }
     * })
     * 
     */
    delete<T extends PatentApplicationDataDeleteArgs>(args: SelectSubset<T, PatentApplicationDataDeleteArgs<ExtArgs>>): Prisma__PatentApplicationDataClient<$Result.GetResult<Prisma.$PatentApplicationDataPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one PatentApplicationData.
     * @param {PatentApplicationDataUpdateArgs} args - Arguments to update one PatentApplicationData.
     * @example
     * // Update one PatentApplicationData
     * const patentApplicationData = await prisma.patentApplicationData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatentApplicationDataUpdateArgs>(args: SelectSubset<T, PatentApplicationDataUpdateArgs<ExtArgs>>): Prisma__PatentApplicationDataClient<$Result.GetResult<Prisma.$PatentApplicationDataPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more PatentApplicationData.
     * @param {PatentApplicationDataDeleteManyArgs} args - Arguments to filter PatentApplicationData to delete.
     * @example
     * // Delete a few PatentApplicationData
     * const { count } = await prisma.patentApplicationData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatentApplicationDataDeleteManyArgs>(args?: SelectSubset<T, PatentApplicationDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatentApplicationData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentApplicationDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatentApplicationData
     * const patentApplicationData = await prisma.patentApplicationData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatentApplicationDataUpdateManyArgs>(args: SelectSubset<T, PatentApplicationDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatentApplicationData and returns the data updated in the database.
     * @param {PatentApplicationDataUpdateManyAndReturnArgs} args - Arguments to update many PatentApplicationData.
     * @example
     * // Update many PatentApplicationData
     * const patentApplicationData = await prisma.patentApplicationData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PatentApplicationData and only return the `PatentID`
     * const patentApplicationDataWithPatentIDOnly = await prisma.patentApplicationData.updateManyAndReturn({
     *   select: { PatentID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatentApplicationDataUpdateManyAndReturnArgs>(args: SelectSubset<T, PatentApplicationDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentApplicationDataPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one PatentApplicationData.
     * @param {PatentApplicationDataUpsertArgs} args - Arguments to update or create a PatentApplicationData.
     * @example
     * // Update or create a PatentApplicationData
     * const patentApplicationData = await prisma.patentApplicationData.upsert({
     *   create: {
     *     // ... data to create a PatentApplicationData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatentApplicationData we want to update
     *   }
     * })
     */
    upsert<T extends PatentApplicationDataUpsertArgs>(args: SelectSubset<T, PatentApplicationDataUpsertArgs<ExtArgs>>): Prisma__PatentApplicationDataClient<$Result.GetResult<Prisma.$PatentApplicationDataPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of PatentApplicationData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentApplicationDataCountArgs} args - Arguments to filter PatentApplicationData to count.
     * @example
     * // Count the number of PatentApplicationData
     * const count = await prisma.patentApplicationData.count({
     *   where: {
     *     // ... the filter for the PatentApplicationData we want to count
     *   }
     * })
    **/
    count<T extends PatentApplicationDataCountArgs>(
      args?: Subset<T, PatentApplicationDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatentApplicationDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatentApplicationData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentApplicationDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatentApplicationDataAggregateArgs>(args: Subset<T, PatentApplicationDataAggregateArgs>): Prisma.PrismaPromise<GetPatentApplicationDataAggregateType<T>>

    /**
     * Group by PatentApplicationData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentApplicationDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatentApplicationDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatentApplicationDataGroupByArgs['orderBy'] }
        : { orderBy?: PatentApplicationDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatentApplicationDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatentApplicationDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatentApplicationData model
   */
  readonly fields: PatentApplicationDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatentApplicationData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatentApplicationDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patent<T extends PatentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatentDefaultArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    country<T extends CountryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CountryDefaultArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PatentApplicationData model
   */ 
  interface PatentApplicationDataFieldRefs {
    readonly PatentID: FieldRef<"PatentApplicationData", 'Int'>
    readonly CountryID: FieldRef<"PatentApplicationData", 'Int'>
    readonly PatentNumber: FieldRef<"PatentApplicationData", 'String'>
    readonly FilingDate: FieldRef<"PatentApplicationData", 'DateTime'>
    readonly GrantDate: FieldRef<"PatentApplicationData", 'DateTime'>
    readonly PatentType: FieldRef<"PatentApplicationData", 'String'>
    readonly ApplicationNumber: FieldRef<"PatentApplicationData", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PatentApplicationData findUnique
   */
  export type PatentApplicationDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataInclude<ExtArgs> | null
    /**
     * Filter, which PatentApplicationData to fetch.
     */
    where: PatentApplicationDataWhereUniqueInput
  }

  /**
   * PatentApplicationData findUniqueOrThrow
   */
  export type PatentApplicationDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataInclude<ExtArgs> | null
    /**
     * Filter, which PatentApplicationData to fetch.
     */
    where: PatentApplicationDataWhereUniqueInput
  }

  /**
   * PatentApplicationData findFirst
   */
  export type PatentApplicationDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataInclude<ExtArgs> | null
    /**
     * Filter, which PatentApplicationData to fetch.
     */
    where?: PatentApplicationDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentApplicationData to fetch.
     */
    orderBy?: PatentApplicationDataOrderByWithRelationInput | PatentApplicationDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatentApplicationData.
     */
    cursor?: PatentApplicationDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentApplicationData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentApplicationData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatentApplicationData.
     */
    distinct?: PatentApplicationDataScalarFieldEnum | PatentApplicationDataScalarFieldEnum[]
  }

  /**
   * PatentApplicationData findFirstOrThrow
   */
  export type PatentApplicationDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataInclude<ExtArgs> | null
    /**
     * Filter, which PatentApplicationData to fetch.
     */
    where?: PatentApplicationDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentApplicationData to fetch.
     */
    orderBy?: PatentApplicationDataOrderByWithRelationInput | PatentApplicationDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatentApplicationData.
     */
    cursor?: PatentApplicationDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentApplicationData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentApplicationData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatentApplicationData.
     */
    distinct?: PatentApplicationDataScalarFieldEnum | PatentApplicationDataScalarFieldEnum[]
  }

  /**
   * PatentApplicationData findMany
   */
  export type PatentApplicationDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataInclude<ExtArgs> | null
    /**
     * Filter, which PatentApplicationData to fetch.
     */
    where?: PatentApplicationDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentApplicationData to fetch.
     */
    orderBy?: PatentApplicationDataOrderByWithRelationInput | PatentApplicationDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatentApplicationData.
     */
    cursor?: PatentApplicationDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentApplicationData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentApplicationData.
     */
    skip?: number
    distinct?: PatentApplicationDataScalarFieldEnum | PatentApplicationDataScalarFieldEnum[]
  }

  /**
   * PatentApplicationData create
   */
  export type PatentApplicationDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataInclude<ExtArgs> | null
    /**
     * The data needed to create a PatentApplicationData.
     */
    data: XOR<PatentApplicationDataCreateInput, PatentApplicationDataUncheckedCreateInput>
  }

  /**
   * PatentApplicationData createMany
   */
  export type PatentApplicationDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatentApplicationData.
     */
    data: PatentApplicationDataCreateManyInput | PatentApplicationDataCreateManyInput[]
  }

  /**
   * PatentApplicationData createManyAndReturn
   */
  export type PatentApplicationDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * The data used to create many PatentApplicationData.
     */
    data: PatentApplicationDataCreateManyInput | PatentApplicationDataCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatentApplicationData update
   */
  export type PatentApplicationDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataInclude<ExtArgs> | null
    /**
     * The data needed to update a PatentApplicationData.
     */
    data: XOR<PatentApplicationDataUpdateInput, PatentApplicationDataUncheckedUpdateInput>
    /**
     * Choose, which PatentApplicationData to update.
     */
    where: PatentApplicationDataWhereUniqueInput
  }

  /**
   * PatentApplicationData updateMany
   */
  export type PatentApplicationDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatentApplicationData.
     */
    data: XOR<PatentApplicationDataUpdateManyMutationInput, PatentApplicationDataUncheckedUpdateManyInput>
    /**
     * Filter which PatentApplicationData to update
     */
    where?: PatentApplicationDataWhereInput
  }

  /**
   * PatentApplicationData updateManyAndReturn
   */
  export type PatentApplicationDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * The data used to update PatentApplicationData.
     */
    data: XOR<PatentApplicationDataUpdateManyMutationInput, PatentApplicationDataUncheckedUpdateManyInput>
    /**
     * Filter which PatentApplicationData to update
     */
    where?: PatentApplicationDataWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatentApplicationData upsert
   */
  export type PatentApplicationDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataInclude<ExtArgs> | null
    /**
     * The filter to search for the PatentApplicationData to update in case it exists.
     */
    where: PatentApplicationDataWhereUniqueInput
    /**
     * In case the PatentApplicationData found by the `where` argument doesn't exist, create a new PatentApplicationData with this data.
     */
    create: XOR<PatentApplicationDataCreateInput, PatentApplicationDataUncheckedCreateInput>
    /**
     * In case the PatentApplicationData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatentApplicationDataUpdateInput, PatentApplicationDataUncheckedUpdateInput>
  }

  /**
   * PatentApplicationData delete
   */
  export type PatentApplicationDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataInclude<ExtArgs> | null
    /**
     * Filter which PatentApplicationData to delete.
     */
    where: PatentApplicationDataWhereUniqueInput
  }

  /**
   * PatentApplicationData deleteMany
   */
  export type PatentApplicationDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatentApplicationData to delete
     */
    where?: PatentApplicationDataWhereInput
  }

  /**
   * PatentApplicationData without action
   */
  export type PatentApplicationDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataInclude<ExtArgs> | null
  }


  /**
   * Model PatentTechnicalAttributes
   */

  export type AggregatePatentTechnicalAttributes = {
    _count: PatentTechnicalAttributesCountAggregateOutputType | null
    _avg: PatentTechnicalAttributesAvgAggregateOutputType | null
    _sum: PatentTechnicalAttributesSumAggregateOutputType | null
    _min: PatentTechnicalAttributesMinAggregateOutputType | null
    _max: PatentTechnicalAttributesMaxAggregateOutputType | null
  }

  export type PatentTechnicalAttributesAvgAggregateOutputType = {
    PatentID: number | null
  }

  export type PatentTechnicalAttributesSumAggregateOutputType = {
    PatentID: number | null
  }

  export type PatentTechnicalAttributesMinAggregateOutputType = {
    PatentID: number | null
    IPC: string | null
    Scope: string | null
    MaturityLevel: string | null
    Keywords: string | null
  }

  export type PatentTechnicalAttributesMaxAggregateOutputType = {
    PatentID: number | null
    IPC: string | null
    Scope: string | null
    MaturityLevel: string | null
    Keywords: string | null
  }

  export type PatentTechnicalAttributesCountAggregateOutputType = {
    PatentID: number
    IPC: number
    Scope: number
    MaturityLevel: number
    Keywords: number
    _all: number
  }


  export type PatentTechnicalAttributesAvgAggregateInputType = {
    PatentID?: true
  }

  export type PatentTechnicalAttributesSumAggregateInputType = {
    PatentID?: true
  }

  export type PatentTechnicalAttributesMinAggregateInputType = {
    PatentID?: true
    IPC?: true
    Scope?: true
    MaturityLevel?: true
    Keywords?: true
  }

  export type PatentTechnicalAttributesMaxAggregateInputType = {
    PatentID?: true
    IPC?: true
    Scope?: true
    MaturityLevel?: true
    Keywords?: true
  }

  export type PatentTechnicalAttributesCountAggregateInputType = {
    PatentID?: true
    IPC?: true
    Scope?: true
    MaturityLevel?: true
    Keywords?: true
    _all?: true
  }

  export type PatentTechnicalAttributesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatentTechnicalAttributes to aggregate.
     */
    where?: PatentTechnicalAttributesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentTechnicalAttributes to fetch.
     */
    orderBy?: PatentTechnicalAttributesOrderByWithRelationInput | PatentTechnicalAttributesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatentTechnicalAttributesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentTechnicalAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentTechnicalAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatentTechnicalAttributes
    **/
    _count?: true | PatentTechnicalAttributesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatentTechnicalAttributesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatentTechnicalAttributesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatentTechnicalAttributesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatentTechnicalAttributesMaxAggregateInputType
  }

  export type GetPatentTechnicalAttributesAggregateType<T extends PatentTechnicalAttributesAggregateArgs> = {
        [P in keyof T & keyof AggregatePatentTechnicalAttributes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatentTechnicalAttributes[P]>
      : GetScalarType<T[P], AggregatePatentTechnicalAttributes[P]>
  }




  export type PatentTechnicalAttributesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatentTechnicalAttributesWhereInput
    orderBy?: PatentTechnicalAttributesOrderByWithAggregationInput | PatentTechnicalAttributesOrderByWithAggregationInput[]
    by: PatentTechnicalAttributesScalarFieldEnum[] | PatentTechnicalAttributesScalarFieldEnum
    having?: PatentTechnicalAttributesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatentTechnicalAttributesCountAggregateInputType | true
    _avg?: PatentTechnicalAttributesAvgAggregateInputType
    _sum?: PatentTechnicalAttributesSumAggregateInputType
    _min?: PatentTechnicalAttributesMinAggregateInputType
    _max?: PatentTechnicalAttributesMaxAggregateInputType
  }

  export type PatentTechnicalAttributesGroupByOutputType = {
    PatentID: number
    IPC: string
    Scope: string
    MaturityLevel: string
    Keywords: string
    _count: PatentTechnicalAttributesCountAggregateOutputType | null
    _avg: PatentTechnicalAttributesAvgAggregateOutputType | null
    _sum: PatentTechnicalAttributesSumAggregateOutputType | null
    _min: PatentTechnicalAttributesMinAggregateOutputType | null
    _max: PatentTechnicalAttributesMaxAggregateOutputType | null
  }

  type GetPatentTechnicalAttributesGroupByPayload<T extends PatentTechnicalAttributesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatentTechnicalAttributesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatentTechnicalAttributesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatentTechnicalAttributesGroupByOutputType[P]>
            : GetScalarType<T[P], PatentTechnicalAttributesGroupByOutputType[P]>
        }
      >
    >


  export type PatentTechnicalAttributesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    IPC?: boolean
    Scope?: boolean
    MaturityLevel?: boolean
    Keywords?: boolean
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentTechnicalAttributes"]>

  export type PatentTechnicalAttributesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    IPC?: boolean
    Scope?: boolean
    MaturityLevel?: boolean
    Keywords?: boolean
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentTechnicalAttributes"]>

  export type PatentTechnicalAttributesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PatentID?: boolean
    IPC?: boolean
    Scope?: boolean
    MaturityLevel?: boolean
    Keywords?: boolean
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patentTechnicalAttributes"]>

  export type PatentTechnicalAttributesSelectScalar = {
    PatentID?: boolean
    IPC?: boolean
    Scope?: boolean
    MaturityLevel?: boolean
    Keywords?: boolean
  }

  export type PatentTechnicalAttributesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"PatentID" | "IPC" | "Scope" | "MaturityLevel" | "Keywords", ExtArgs["result"]["patentTechnicalAttributes"]>
  export type PatentTechnicalAttributesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }
  export type PatentTechnicalAttributesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }
  export type PatentTechnicalAttributesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patent?: boolean | PatentDefaultArgs<ExtArgs>
  }

  export type $PatentTechnicalAttributesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatentTechnicalAttributes"
    objects: {
      patent: Prisma.$PatentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      PatentID: number
      IPC: string
      Scope: string
      MaturityLevel: string
      Keywords: string
    }, ExtArgs["result"]["patentTechnicalAttributes"]>
    composites: {}
  }

  type PatentTechnicalAttributesGetPayload<S extends boolean | null | undefined | PatentTechnicalAttributesDefaultArgs> = $Result.GetResult<Prisma.$PatentTechnicalAttributesPayload, S>

  type PatentTechnicalAttributesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatentTechnicalAttributesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatentTechnicalAttributesCountAggregateInputType | true
    }

  export interface PatentTechnicalAttributesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatentTechnicalAttributes'], meta: { name: 'PatentTechnicalAttributes' } }
    /**
     * Find zero or one PatentTechnicalAttributes that matches the filter.
     * @param {PatentTechnicalAttributesFindUniqueArgs} args - Arguments to find a PatentTechnicalAttributes
     * @example
     * // Get one PatentTechnicalAttributes
     * const patentTechnicalAttributes = await prisma.patentTechnicalAttributes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatentTechnicalAttributesFindUniqueArgs>(args: SelectSubset<T, PatentTechnicalAttributesFindUniqueArgs<ExtArgs>>): Prisma__PatentTechnicalAttributesClient<$Result.GetResult<Prisma.$PatentTechnicalAttributesPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one PatentTechnicalAttributes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatentTechnicalAttributesFindUniqueOrThrowArgs} args - Arguments to find a PatentTechnicalAttributes
     * @example
     * // Get one PatentTechnicalAttributes
     * const patentTechnicalAttributes = await prisma.patentTechnicalAttributes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatentTechnicalAttributesFindUniqueOrThrowArgs>(args: SelectSubset<T, PatentTechnicalAttributesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatentTechnicalAttributesClient<$Result.GetResult<Prisma.$PatentTechnicalAttributesPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first PatentTechnicalAttributes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentTechnicalAttributesFindFirstArgs} args - Arguments to find a PatentTechnicalAttributes
     * @example
     * // Get one PatentTechnicalAttributes
     * const patentTechnicalAttributes = await prisma.patentTechnicalAttributes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatentTechnicalAttributesFindFirstArgs>(args?: SelectSubset<T, PatentTechnicalAttributesFindFirstArgs<ExtArgs>>): Prisma__PatentTechnicalAttributesClient<$Result.GetResult<Prisma.$PatentTechnicalAttributesPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first PatentTechnicalAttributes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentTechnicalAttributesFindFirstOrThrowArgs} args - Arguments to find a PatentTechnicalAttributes
     * @example
     * // Get one PatentTechnicalAttributes
     * const patentTechnicalAttributes = await prisma.patentTechnicalAttributes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatentTechnicalAttributesFindFirstOrThrowArgs>(args?: SelectSubset<T, PatentTechnicalAttributesFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatentTechnicalAttributesClient<$Result.GetResult<Prisma.$PatentTechnicalAttributesPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more PatentTechnicalAttributes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentTechnicalAttributesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatentTechnicalAttributes
     * const patentTechnicalAttributes = await prisma.patentTechnicalAttributes.findMany()
     * 
     * // Get first 10 PatentTechnicalAttributes
     * const patentTechnicalAttributes = await prisma.patentTechnicalAttributes.findMany({ take: 10 })
     * 
     * // Only select the `PatentID`
     * const patentTechnicalAttributesWithPatentIDOnly = await prisma.patentTechnicalAttributes.findMany({ select: { PatentID: true } })
     * 
     */
    findMany<T extends PatentTechnicalAttributesFindManyArgs>(args?: SelectSubset<T, PatentTechnicalAttributesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentTechnicalAttributesPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a PatentTechnicalAttributes.
     * @param {PatentTechnicalAttributesCreateArgs} args - Arguments to create a PatentTechnicalAttributes.
     * @example
     * // Create one PatentTechnicalAttributes
     * const PatentTechnicalAttributes = await prisma.patentTechnicalAttributes.create({
     *   data: {
     *     // ... data to create a PatentTechnicalAttributes
     *   }
     * })
     * 
     */
    create<T extends PatentTechnicalAttributesCreateArgs>(args: SelectSubset<T, PatentTechnicalAttributesCreateArgs<ExtArgs>>): Prisma__PatentTechnicalAttributesClient<$Result.GetResult<Prisma.$PatentTechnicalAttributesPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many PatentTechnicalAttributes.
     * @param {PatentTechnicalAttributesCreateManyArgs} args - Arguments to create many PatentTechnicalAttributes.
     * @example
     * // Create many PatentTechnicalAttributes
     * const patentTechnicalAttributes = await prisma.patentTechnicalAttributes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatentTechnicalAttributesCreateManyArgs>(args?: SelectSubset<T, PatentTechnicalAttributesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PatentTechnicalAttributes and returns the data saved in the database.
     * @param {PatentTechnicalAttributesCreateManyAndReturnArgs} args - Arguments to create many PatentTechnicalAttributes.
     * @example
     * // Create many PatentTechnicalAttributes
     * const patentTechnicalAttributes = await prisma.patentTechnicalAttributes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PatentTechnicalAttributes and only return the `PatentID`
     * const patentTechnicalAttributesWithPatentIDOnly = await prisma.patentTechnicalAttributes.createManyAndReturn({
     *   select: { PatentID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatentTechnicalAttributesCreateManyAndReturnArgs>(args?: SelectSubset<T, PatentTechnicalAttributesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentTechnicalAttributesPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a PatentTechnicalAttributes.
     * @param {PatentTechnicalAttributesDeleteArgs} args - Arguments to delete one PatentTechnicalAttributes.
     * @example
     * // Delete one PatentTechnicalAttributes
     * const PatentTechnicalAttributes = await prisma.patentTechnicalAttributes.delete({
     *   where: {
     *     // ... filter to delete one PatentTechnicalAttributes
     *   }
     * })
     * 
     */
    delete<T extends PatentTechnicalAttributesDeleteArgs>(args: SelectSubset<T, PatentTechnicalAttributesDeleteArgs<ExtArgs>>): Prisma__PatentTechnicalAttributesClient<$Result.GetResult<Prisma.$PatentTechnicalAttributesPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one PatentTechnicalAttributes.
     * @param {PatentTechnicalAttributesUpdateArgs} args - Arguments to update one PatentTechnicalAttributes.
     * @example
     * // Update one PatentTechnicalAttributes
     * const patentTechnicalAttributes = await prisma.patentTechnicalAttributes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatentTechnicalAttributesUpdateArgs>(args: SelectSubset<T, PatentTechnicalAttributesUpdateArgs<ExtArgs>>): Prisma__PatentTechnicalAttributesClient<$Result.GetResult<Prisma.$PatentTechnicalAttributesPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more PatentTechnicalAttributes.
     * @param {PatentTechnicalAttributesDeleteManyArgs} args - Arguments to filter PatentTechnicalAttributes to delete.
     * @example
     * // Delete a few PatentTechnicalAttributes
     * const { count } = await prisma.patentTechnicalAttributes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatentTechnicalAttributesDeleteManyArgs>(args?: SelectSubset<T, PatentTechnicalAttributesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatentTechnicalAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentTechnicalAttributesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatentTechnicalAttributes
     * const patentTechnicalAttributes = await prisma.patentTechnicalAttributes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatentTechnicalAttributesUpdateManyArgs>(args: SelectSubset<T, PatentTechnicalAttributesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatentTechnicalAttributes and returns the data updated in the database.
     * @param {PatentTechnicalAttributesUpdateManyAndReturnArgs} args - Arguments to update many PatentTechnicalAttributes.
     * @example
     * // Update many PatentTechnicalAttributes
     * const patentTechnicalAttributes = await prisma.patentTechnicalAttributes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PatentTechnicalAttributes and only return the `PatentID`
     * const patentTechnicalAttributesWithPatentIDOnly = await prisma.patentTechnicalAttributes.updateManyAndReturn({
     *   select: { PatentID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatentTechnicalAttributesUpdateManyAndReturnArgs>(args: SelectSubset<T, PatentTechnicalAttributesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentTechnicalAttributesPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one PatentTechnicalAttributes.
     * @param {PatentTechnicalAttributesUpsertArgs} args - Arguments to update or create a PatentTechnicalAttributes.
     * @example
     * // Update or create a PatentTechnicalAttributes
     * const patentTechnicalAttributes = await prisma.patentTechnicalAttributes.upsert({
     *   create: {
     *     // ... data to create a PatentTechnicalAttributes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatentTechnicalAttributes we want to update
     *   }
     * })
     */
    upsert<T extends PatentTechnicalAttributesUpsertArgs>(args: SelectSubset<T, PatentTechnicalAttributesUpsertArgs<ExtArgs>>): Prisma__PatentTechnicalAttributesClient<$Result.GetResult<Prisma.$PatentTechnicalAttributesPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of PatentTechnicalAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentTechnicalAttributesCountArgs} args - Arguments to filter PatentTechnicalAttributes to count.
     * @example
     * // Count the number of PatentTechnicalAttributes
     * const count = await prisma.patentTechnicalAttributes.count({
     *   where: {
     *     // ... the filter for the PatentTechnicalAttributes we want to count
     *   }
     * })
    **/
    count<T extends PatentTechnicalAttributesCountArgs>(
      args?: Subset<T, PatentTechnicalAttributesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatentTechnicalAttributesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatentTechnicalAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentTechnicalAttributesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatentTechnicalAttributesAggregateArgs>(args: Subset<T, PatentTechnicalAttributesAggregateArgs>): Prisma.PrismaPromise<GetPatentTechnicalAttributesAggregateType<T>>

    /**
     * Group by PatentTechnicalAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatentTechnicalAttributesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatentTechnicalAttributesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatentTechnicalAttributesGroupByArgs['orderBy'] }
        : { orderBy?: PatentTechnicalAttributesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatentTechnicalAttributesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatentTechnicalAttributesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatentTechnicalAttributes model
   */
  readonly fields: PatentTechnicalAttributesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatentTechnicalAttributes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatentTechnicalAttributesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patent<T extends PatentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatentDefaultArgs<ExtArgs>>): Prisma__PatentClient<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PatentTechnicalAttributes model
   */ 
  interface PatentTechnicalAttributesFieldRefs {
    readonly PatentID: FieldRef<"PatentTechnicalAttributes", 'Int'>
    readonly IPC: FieldRef<"PatentTechnicalAttributes", 'String'>
    readonly Scope: FieldRef<"PatentTechnicalAttributes", 'String'>
    readonly MaturityLevel: FieldRef<"PatentTechnicalAttributes", 'String'>
    readonly Keywords: FieldRef<"PatentTechnicalAttributes", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PatentTechnicalAttributes findUnique
   */
  export type PatentTechnicalAttributesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentTechnicalAttributes
     */
    select?: PatentTechnicalAttributesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentTechnicalAttributes
     */
    omit?: PatentTechnicalAttributesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentTechnicalAttributesInclude<ExtArgs> | null
    /**
     * Filter, which PatentTechnicalAttributes to fetch.
     */
    where: PatentTechnicalAttributesWhereUniqueInput
  }

  /**
   * PatentTechnicalAttributes findUniqueOrThrow
   */
  export type PatentTechnicalAttributesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentTechnicalAttributes
     */
    select?: PatentTechnicalAttributesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentTechnicalAttributes
     */
    omit?: PatentTechnicalAttributesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentTechnicalAttributesInclude<ExtArgs> | null
    /**
     * Filter, which PatentTechnicalAttributes to fetch.
     */
    where: PatentTechnicalAttributesWhereUniqueInput
  }

  /**
   * PatentTechnicalAttributes findFirst
   */
  export type PatentTechnicalAttributesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentTechnicalAttributes
     */
    select?: PatentTechnicalAttributesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentTechnicalAttributes
     */
    omit?: PatentTechnicalAttributesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentTechnicalAttributesInclude<ExtArgs> | null
    /**
     * Filter, which PatentTechnicalAttributes to fetch.
     */
    where?: PatentTechnicalAttributesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentTechnicalAttributes to fetch.
     */
    orderBy?: PatentTechnicalAttributesOrderByWithRelationInput | PatentTechnicalAttributesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatentTechnicalAttributes.
     */
    cursor?: PatentTechnicalAttributesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentTechnicalAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentTechnicalAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatentTechnicalAttributes.
     */
    distinct?: PatentTechnicalAttributesScalarFieldEnum | PatentTechnicalAttributesScalarFieldEnum[]
  }

  /**
   * PatentTechnicalAttributes findFirstOrThrow
   */
  export type PatentTechnicalAttributesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentTechnicalAttributes
     */
    select?: PatentTechnicalAttributesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentTechnicalAttributes
     */
    omit?: PatentTechnicalAttributesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentTechnicalAttributesInclude<ExtArgs> | null
    /**
     * Filter, which PatentTechnicalAttributes to fetch.
     */
    where?: PatentTechnicalAttributesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentTechnicalAttributes to fetch.
     */
    orderBy?: PatentTechnicalAttributesOrderByWithRelationInput | PatentTechnicalAttributesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatentTechnicalAttributes.
     */
    cursor?: PatentTechnicalAttributesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentTechnicalAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentTechnicalAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatentTechnicalAttributes.
     */
    distinct?: PatentTechnicalAttributesScalarFieldEnum | PatentTechnicalAttributesScalarFieldEnum[]
  }

  /**
   * PatentTechnicalAttributes findMany
   */
  export type PatentTechnicalAttributesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentTechnicalAttributes
     */
    select?: PatentTechnicalAttributesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentTechnicalAttributes
     */
    omit?: PatentTechnicalAttributesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentTechnicalAttributesInclude<ExtArgs> | null
    /**
     * Filter, which PatentTechnicalAttributes to fetch.
     */
    where?: PatentTechnicalAttributesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatentTechnicalAttributes to fetch.
     */
    orderBy?: PatentTechnicalAttributesOrderByWithRelationInput | PatentTechnicalAttributesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatentTechnicalAttributes.
     */
    cursor?: PatentTechnicalAttributesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatentTechnicalAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatentTechnicalAttributes.
     */
    skip?: number
    distinct?: PatentTechnicalAttributesScalarFieldEnum | PatentTechnicalAttributesScalarFieldEnum[]
  }

  /**
   * PatentTechnicalAttributes create
   */
  export type PatentTechnicalAttributesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentTechnicalAttributes
     */
    select?: PatentTechnicalAttributesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentTechnicalAttributes
     */
    omit?: PatentTechnicalAttributesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentTechnicalAttributesInclude<ExtArgs> | null
    /**
     * The data needed to create a PatentTechnicalAttributes.
     */
    data: XOR<PatentTechnicalAttributesCreateInput, PatentTechnicalAttributesUncheckedCreateInput>
  }

  /**
   * PatentTechnicalAttributes createMany
   */
  export type PatentTechnicalAttributesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatentTechnicalAttributes.
     */
    data: PatentTechnicalAttributesCreateManyInput | PatentTechnicalAttributesCreateManyInput[]
  }

  /**
   * PatentTechnicalAttributes createManyAndReturn
   */
  export type PatentTechnicalAttributesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentTechnicalAttributes
     */
    select?: PatentTechnicalAttributesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatentTechnicalAttributes
     */
    omit?: PatentTechnicalAttributesOmit<ExtArgs> | null
    /**
     * The data used to create many PatentTechnicalAttributes.
     */
    data: PatentTechnicalAttributesCreateManyInput | PatentTechnicalAttributesCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentTechnicalAttributesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatentTechnicalAttributes update
   */
  export type PatentTechnicalAttributesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentTechnicalAttributes
     */
    select?: PatentTechnicalAttributesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentTechnicalAttributes
     */
    omit?: PatentTechnicalAttributesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentTechnicalAttributesInclude<ExtArgs> | null
    /**
     * The data needed to update a PatentTechnicalAttributes.
     */
    data: XOR<PatentTechnicalAttributesUpdateInput, PatentTechnicalAttributesUncheckedUpdateInput>
    /**
     * Choose, which PatentTechnicalAttributes to update.
     */
    where: PatentTechnicalAttributesWhereUniqueInput
  }

  /**
   * PatentTechnicalAttributes updateMany
   */
  export type PatentTechnicalAttributesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatentTechnicalAttributes.
     */
    data: XOR<PatentTechnicalAttributesUpdateManyMutationInput, PatentTechnicalAttributesUncheckedUpdateManyInput>
    /**
     * Filter which PatentTechnicalAttributes to update
     */
    where?: PatentTechnicalAttributesWhereInput
  }

  /**
   * PatentTechnicalAttributes updateManyAndReturn
   */
  export type PatentTechnicalAttributesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentTechnicalAttributes
     */
    select?: PatentTechnicalAttributesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatentTechnicalAttributes
     */
    omit?: PatentTechnicalAttributesOmit<ExtArgs> | null
    /**
     * The data used to update PatentTechnicalAttributes.
     */
    data: XOR<PatentTechnicalAttributesUpdateManyMutationInput, PatentTechnicalAttributesUncheckedUpdateManyInput>
    /**
     * Filter which PatentTechnicalAttributes to update
     */
    where?: PatentTechnicalAttributesWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentTechnicalAttributesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatentTechnicalAttributes upsert
   */
  export type PatentTechnicalAttributesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentTechnicalAttributes
     */
    select?: PatentTechnicalAttributesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentTechnicalAttributes
     */
    omit?: PatentTechnicalAttributesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentTechnicalAttributesInclude<ExtArgs> | null
    /**
     * The filter to search for the PatentTechnicalAttributes to update in case it exists.
     */
    where: PatentTechnicalAttributesWhereUniqueInput
    /**
     * In case the PatentTechnicalAttributes found by the `where` argument doesn't exist, create a new PatentTechnicalAttributes with this data.
     */
    create: XOR<PatentTechnicalAttributesCreateInput, PatentTechnicalAttributesUncheckedCreateInput>
    /**
     * In case the PatentTechnicalAttributes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatentTechnicalAttributesUpdateInput, PatentTechnicalAttributesUncheckedUpdateInput>
  }

  /**
   * PatentTechnicalAttributes delete
   */
  export type PatentTechnicalAttributesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentTechnicalAttributes
     */
    select?: PatentTechnicalAttributesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentTechnicalAttributes
     */
    omit?: PatentTechnicalAttributesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentTechnicalAttributesInclude<ExtArgs> | null
    /**
     * Filter which PatentTechnicalAttributes to delete.
     */
    where: PatentTechnicalAttributesWhereUniqueInput
  }

  /**
   * PatentTechnicalAttributes deleteMany
   */
  export type PatentTechnicalAttributesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatentTechnicalAttributes to delete
     */
    where?: PatentTechnicalAttributesWhereInput
  }

  /**
   * PatentTechnicalAttributes without action
   */
  export type PatentTechnicalAttributesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentTechnicalAttributes
     */
    select?: PatentTechnicalAttributesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentTechnicalAttributes
     */
    omit?: PatentTechnicalAttributesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentTechnicalAttributesInclude<ExtArgs> | null
  }


  /**
   * Model College
   */

  export type AggregateCollege = {
    _count: CollegeCountAggregateOutputType | null
    _avg: CollegeAvgAggregateOutputType | null
    _sum: CollegeSumAggregateOutputType | null
    _min: CollegeMinAggregateOutputType | null
    _max: CollegeMaxAggregateOutputType | null
  }

  export type CollegeAvgAggregateOutputType = {
    CollegeID: number | null
  }

  export type CollegeSumAggregateOutputType = {
    CollegeID: number | null
  }

  export type CollegeMinAggregateOutputType = {
    CollegeID: number | null
    Name: string | null
    Description: string | null
  }

  export type CollegeMaxAggregateOutputType = {
    CollegeID: number | null
    Name: string | null
    Description: string | null
  }

  export type CollegeCountAggregateOutputType = {
    CollegeID: number
    Name: number
    Description: number
    _all: number
  }


  export type CollegeAvgAggregateInputType = {
    CollegeID?: true
  }

  export type CollegeSumAggregateInputType = {
    CollegeID?: true
  }

  export type CollegeMinAggregateInputType = {
    CollegeID?: true
    Name?: true
    Description?: true
  }

  export type CollegeMaxAggregateInputType = {
    CollegeID?: true
    Name?: true
    Description?: true
  }

  export type CollegeCountAggregateInputType = {
    CollegeID?: true
    Name?: true
    Description?: true
    _all?: true
  }

  export type CollegeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which College to aggregate.
     */
    where?: CollegeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colleges to fetch.
     */
    orderBy?: CollegeOrderByWithRelationInput | CollegeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CollegeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colleges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colleges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Colleges
    **/
    _count?: true | CollegeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CollegeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CollegeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CollegeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CollegeMaxAggregateInputType
  }

  export type GetCollegeAggregateType<T extends CollegeAggregateArgs> = {
        [P in keyof T & keyof AggregateCollege]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCollege[P]>
      : GetScalarType<T[P], AggregateCollege[P]>
  }




  export type CollegeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollegeWhereInput
    orderBy?: CollegeOrderByWithAggregationInput | CollegeOrderByWithAggregationInput[]
    by: CollegeScalarFieldEnum[] | CollegeScalarFieldEnum
    having?: CollegeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CollegeCountAggregateInputType | true
    _avg?: CollegeAvgAggregateInputType
    _sum?: CollegeSumAggregateInputType
    _min?: CollegeMinAggregateInputType
    _max?: CollegeMaxAggregateInputType
  }

  export type CollegeGroupByOutputType = {
    CollegeID: number
    Name: string
    Description: string | null
    _count: CollegeCountAggregateOutputType | null
    _avg: CollegeAvgAggregateOutputType | null
    _sum: CollegeSumAggregateOutputType | null
    _min: CollegeMinAggregateOutputType | null
    _max: CollegeMaxAggregateOutputType | null
  }

  type GetCollegeGroupByPayload<T extends CollegeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CollegeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CollegeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CollegeGroupByOutputType[P]>
            : GetScalarType<T[P], CollegeGroupByOutputType[P]>
        }
      >
    >


  export type CollegeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    CollegeID?: boolean
    Name?: boolean
    Description?: boolean
    departments?: boolean | College$departmentsArgs<ExtArgs>
    patents?: boolean | College$patentsArgs<ExtArgs>
    _count?: boolean | CollegeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["college"]>

  export type CollegeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    CollegeID?: boolean
    Name?: boolean
    Description?: boolean
  }, ExtArgs["result"]["college"]>

  export type CollegeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    CollegeID?: boolean
    Name?: boolean
    Description?: boolean
  }, ExtArgs["result"]["college"]>

  export type CollegeSelectScalar = {
    CollegeID?: boolean
    Name?: boolean
    Description?: boolean
  }

  export type CollegeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"CollegeID" | "Name" | "Description", ExtArgs["result"]["college"]>
  export type CollegeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departments?: boolean | College$departmentsArgs<ExtArgs>
    patents?: boolean | College$patentsArgs<ExtArgs>
    _count?: boolean | CollegeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CollegeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CollegeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CollegePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "College"
    objects: {
      departments: Prisma.$DepartmentPayload<ExtArgs>[]
      patents: Prisma.$PatentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      CollegeID: number
      Name: string
      Description: string | null
    }, ExtArgs["result"]["college"]>
    composites: {}
  }

  type CollegeGetPayload<S extends boolean | null | undefined | CollegeDefaultArgs> = $Result.GetResult<Prisma.$CollegePayload, S>

  type CollegeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CollegeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CollegeCountAggregateInputType | true
    }

  export interface CollegeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['College'], meta: { name: 'College' } }
    /**
     * Find zero or one College that matches the filter.
     * @param {CollegeFindUniqueArgs} args - Arguments to find a College
     * @example
     * // Get one College
     * const college = await prisma.college.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CollegeFindUniqueArgs>(args: SelectSubset<T, CollegeFindUniqueArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one College that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CollegeFindUniqueOrThrowArgs} args - Arguments to find a College
     * @example
     * // Get one College
     * const college = await prisma.college.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CollegeFindUniqueOrThrowArgs>(args: SelectSubset<T, CollegeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first College that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeFindFirstArgs} args - Arguments to find a College
     * @example
     * // Get one College
     * const college = await prisma.college.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CollegeFindFirstArgs>(args?: SelectSubset<T, CollegeFindFirstArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first College that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeFindFirstOrThrowArgs} args - Arguments to find a College
     * @example
     * // Get one College
     * const college = await prisma.college.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CollegeFindFirstOrThrowArgs>(args?: SelectSubset<T, CollegeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Colleges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Colleges
     * const colleges = await prisma.college.findMany()
     * 
     * // Get first 10 Colleges
     * const colleges = await prisma.college.findMany({ take: 10 })
     * 
     * // Only select the `CollegeID`
     * const collegeWithCollegeIDOnly = await prisma.college.findMany({ select: { CollegeID: true } })
     * 
     */
    findMany<T extends CollegeFindManyArgs>(args?: SelectSubset<T, CollegeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a College.
     * @param {CollegeCreateArgs} args - Arguments to create a College.
     * @example
     * // Create one College
     * const College = await prisma.college.create({
     *   data: {
     *     // ... data to create a College
     *   }
     * })
     * 
     */
    create<T extends CollegeCreateArgs>(args: SelectSubset<T, CollegeCreateArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Colleges.
     * @param {CollegeCreateManyArgs} args - Arguments to create many Colleges.
     * @example
     * // Create many Colleges
     * const college = await prisma.college.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CollegeCreateManyArgs>(args?: SelectSubset<T, CollegeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Colleges and returns the data saved in the database.
     * @param {CollegeCreateManyAndReturnArgs} args - Arguments to create many Colleges.
     * @example
     * // Create many Colleges
     * const college = await prisma.college.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Colleges and only return the `CollegeID`
     * const collegeWithCollegeIDOnly = await prisma.college.createManyAndReturn({
     *   select: { CollegeID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CollegeCreateManyAndReturnArgs>(args?: SelectSubset<T, CollegeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a College.
     * @param {CollegeDeleteArgs} args - Arguments to delete one College.
     * @example
     * // Delete one College
     * const College = await prisma.college.delete({
     *   where: {
     *     // ... filter to delete one College
     *   }
     * })
     * 
     */
    delete<T extends CollegeDeleteArgs>(args: SelectSubset<T, CollegeDeleteArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one College.
     * @param {CollegeUpdateArgs} args - Arguments to update one College.
     * @example
     * // Update one College
     * const college = await prisma.college.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CollegeUpdateArgs>(args: SelectSubset<T, CollegeUpdateArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Colleges.
     * @param {CollegeDeleteManyArgs} args - Arguments to filter Colleges to delete.
     * @example
     * // Delete a few Colleges
     * const { count } = await prisma.college.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CollegeDeleteManyArgs>(args?: SelectSubset<T, CollegeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colleges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Colleges
     * const college = await prisma.college.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CollegeUpdateManyArgs>(args: SelectSubset<T, CollegeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colleges and returns the data updated in the database.
     * @param {CollegeUpdateManyAndReturnArgs} args - Arguments to update many Colleges.
     * @example
     * // Update many Colleges
     * const college = await prisma.college.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Colleges and only return the `CollegeID`
     * const collegeWithCollegeIDOnly = await prisma.college.updateManyAndReturn({
     *   select: { CollegeID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CollegeUpdateManyAndReturnArgs>(args: SelectSubset<T, CollegeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one College.
     * @param {CollegeUpsertArgs} args - Arguments to update or create a College.
     * @example
     * // Update or create a College
     * const college = await prisma.college.upsert({
     *   create: {
     *     // ... data to create a College
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the College we want to update
     *   }
     * })
     */
    upsert<T extends CollegeUpsertArgs>(args: SelectSubset<T, CollegeUpsertArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Colleges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeCountArgs} args - Arguments to filter Colleges to count.
     * @example
     * // Count the number of Colleges
     * const count = await prisma.college.count({
     *   where: {
     *     // ... the filter for the Colleges we want to count
     *   }
     * })
    **/
    count<T extends CollegeCountArgs>(
      args?: Subset<T, CollegeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CollegeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a College.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CollegeAggregateArgs>(args: Subset<T, CollegeAggregateArgs>): Prisma.PrismaPromise<GetCollegeAggregateType<T>>

    /**
     * Group by College.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CollegeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CollegeGroupByArgs['orderBy'] }
        : { orderBy?: CollegeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CollegeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCollegeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the College model
   */
  readonly fields: CollegeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for College.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CollegeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    departments<T extends College$departmentsArgs<ExtArgs> = {}>(args?: Subset<T, College$departmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    patents<T extends College$patentsArgs<ExtArgs> = {}>(args?: Subset<T, College$patentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the College model
   */ 
  interface CollegeFieldRefs {
    readonly CollegeID: FieldRef<"College", 'Int'>
    readonly Name: FieldRef<"College", 'String'>
    readonly Description: FieldRef<"College", 'String'>
  }
    

  // Custom InputTypes
  /**
   * College findUnique
   */
  export type CollegeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * Filter, which College to fetch.
     */
    where: CollegeWhereUniqueInput
  }

  /**
   * College findUniqueOrThrow
   */
  export type CollegeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * Filter, which College to fetch.
     */
    where: CollegeWhereUniqueInput
  }

  /**
   * College findFirst
   */
  export type CollegeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * Filter, which College to fetch.
     */
    where?: CollegeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colleges to fetch.
     */
    orderBy?: CollegeOrderByWithRelationInput | CollegeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colleges.
     */
    cursor?: CollegeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colleges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colleges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colleges.
     */
    distinct?: CollegeScalarFieldEnum | CollegeScalarFieldEnum[]
  }

  /**
   * College findFirstOrThrow
   */
  export type CollegeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * Filter, which College to fetch.
     */
    where?: CollegeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colleges to fetch.
     */
    orderBy?: CollegeOrderByWithRelationInput | CollegeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colleges.
     */
    cursor?: CollegeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colleges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colleges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colleges.
     */
    distinct?: CollegeScalarFieldEnum | CollegeScalarFieldEnum[]
  }

  /**
   * College findMany
   */
  export type CollegeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * Filter, which Colleges to fetch.
     */
    where?: CollegeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colleges to fetch.
     */
    orderBy?: CollegeOrderByWithRelationInput | CollegeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Colleges.
     */
    cursor?: CollegeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colleges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colleges.
     */
    skip?: number
    distinct?: CollegeScalarFieldEnum | CollegeScalarFieldEnum[]
  }

  /**
   * College create
   */
  export type CollegeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * The data needed to create a College.
     */
    data: XOR<CollegeCreateInput, CollegeUncheckedCreateInput>
  }

  /**
   * College createMany
   */
  export type CollegeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Colleges.
     */
    data: CollegeCreateManyInput | CollegeCreateManyInput[]
  }

  /**
   * College createManyAndReturn
   */
  export type CollegeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * The data used to create many Colleges.
     */
    data: CollegeCreateManyInput | CollegeCreateManyInput[]
  }

  /**
   * College update
   */
  export type CollegeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * The data needed to update a College.
     */
    data: XOR<CollegeUpdateInput, CollegeUncheckedUpdateInput>
    /**
     * Choose, which College to update.
     */
    where: CollegeWhereUniqueInput
  }

  /**
   * College updateMany
   */
  export type CollegeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Colleges.
     */
    data: XOR<CollegeUpdateManyMutationInput, CollegeUncheckedUpdateManyInput>
    /**
     * Filter which Colleges to update
     */
    where?: CollegeWhereInput
  }

  /**
   * College updateManyAndReturn
   */
  export type CollegeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * The data used to update Colleges.
     */
    data: XOR<CollegeUpdateManyMutationInput, CollegeUncheckedUpdateManyInput>
    /**
     * Filter which Colleges to update
     */
    where?: CollegeWhereInput
  }

  /**
   * College upsert
   */
  export type CollegeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * The filter to search for the College to update in case it exists.
     */
    where: CollegeWhereUniqueInput
    /**
     * In case the College found by the `where` argument doesn't exist, create a new College with this data.
     */
    create: XOR<CollegeCreateInput, CollegeUncheckedCreateInput>
    /**
     * In case the College was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CollegeUpdateInput, CollegeUncheckedUpdateInput>
  }

  /**
   * College delete
   */
  export type CollegeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * Filter which College to delete.
     */
    where: CollegeWhereUniqueInput
  }

  /**
   * College deleteMany
   */
  export type CollegeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Colleges to delete
     */
    where?: CollegeWhereInput
  }

  /**
   * College.departments
   */
  export type College$departmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    cursor?: DepartmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * College.patents
   */
  export type College$patentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInclude<ExtArgs> | null
    where?: PatentWhereInput
    orderBy?: PatentOrderByWithRelationInput | PatentOrderByWithRelationInput[]
    cursor?: PatentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatentScalarFieldEnum | PatentScalarFieldEnum[]
  }

  /**
   * College without action
   */
  export type CollegeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
  }


  /**
   * Model Department
   */

  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentAvgAggregateOutputType = {
    DepartmentID: number | null
    CollegeID: number | null
  }

  export type DepartmentSumAggregateOutputType = {
    DepartmentID: number | null
    CollegeID: number | null
  }

  export type DepartmentMinAggregateOutputType = {
    DepartmentID: number | null
    Name: string | null
    CollegeID: number | null
    Description: string | null
  }

  export type DepartmentMaxAggregateOutputType = {
    DepartmentID: number | null
    Name: string | null
    CollegeID: number | null
    Description: string | null
  }

  export type DepartmentCountAggregateOutputType = {
    DepartmentID: number
    Name: number
    CollegeID: number
    Description: number
    _all: number
  }


  export type DepartmentAvgAggregateInputType = {
    DepartmentID?: true
    CollegeID?: true
  }

  export type DepartmentSumAggregateInputType = {
    DepartmentID?: true
    CollegeID?: true
  }

  export type DepartmentMinAggregateInputType = {
    DepartmentID?: true
    Name?: true
    CollegeID?: true
    Description?: true
  }

  export type DepartmentMaxAggregateInputType = {
    DepartmentID?: true
    Name?: true
    CollegeID?: true
    Description?: true
  }

  export type DepartmentCountAggregateInputType = {
    DepartmentID?: true
    Name?: true
    CollegeID?: true
    Description?: true
    _all?: true
  }

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Department to aggregate.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DepartmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DepartmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type DepartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithAggregationInput | DepartmentOrderByWithAggregationInput[]
    by: DepartmentScalarFieldEnum[] | DepartmentScalarFieldEnum
    having?: DepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _avg?: DepartmentAvgAggregateInputType
    _sum?: DepartmentSumAggregateInputType
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }

  export type DepartmentGroupByOutputType = {
    DepartmentID: number
    Name: string
    CollegeID: number
    Description: string | null
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    DepartmentID?: boolean
    Name?: boolean
    CollegeID?: boolean
    Description?: boolean
    college?: boolean | CollegeDefaultArgs<ExtArgs>
    inventors?: boolean | Department$inventorsArgs<ExtArgs>
    patents?: boolean | Department$patentsArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    DepartmentID?: boolean
    Name?: boolean
    CollegeID?: boolean
    Description?: boolean
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    DepartmentID?: boolean
    Name?: boolean
    CollegeID?: boolean
    Description?: boolean
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectScalar = {
    DepartmentID?: boolean
    Name?: boolean
    CollegeID?: boolean
    Description?: boolean
  }

  export type DepartmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"DepartmentID" | "Name" | "CollegeID" | "Description", ExtArgs["result"]["department"]>
  export type DepartmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    college?: boolean | CollegeDefaultArgs<ExtArgs>
    inventors?: boolean | Department$inventorsArgs<ExtArgs>
    patents?: boolean | Department$patentsArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DepartmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }
  export type DepartmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }

  export type $DepartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Department"
    objects: {
      college: Prisma.$CollegePayload<ExtArgs>
      inventors: Prisma.$InventorPayload<ExtArgs>[]
      patents: Prisma.$PatentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      DepartmentID: number
      Name: string
      CollegeID: number
      Description: string | null
    }, ExtArgs["result"]["department"]>
    composites: {}
  }

  type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = $Result.GetResult<Prisma.$DepartmentPayload, S>

  type DepartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface DepartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Department'], meta: { name: 'Department' } }
    /**
     * Find zero or one Department that matches the filter.
     * @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DepartmentFindUniqueArgs>(args: SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Department that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DepartmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs>(args: SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DepartmentFindFirstArgs>(args?: SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Department that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs>(args?: SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `DepartmentID`
     * const departmentWithDepartmentIDOnly = await prisma.department.findMany({ select: { DepartmentID: true } })
     * 
     */
    findMany<T extends DepartmentFindManyArgs>(args?: SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Department.
     * @param {DepartmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
     */
    create<T extends DepartmentCreateArgs>(args: SelectSubset<T, DepartmentCreateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Departments.
     * @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DepartmentCreateManyArgs>(args?: SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departments and returns the data saved in the database.
     * @param {DepartmentCreateManyAndReturnArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departments and only return the `DepartmentID`
     * const departmentWithDepartmentIDOnly = await prisma.department.createManyAndReturn({
     *   select: { DepartmentID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DepartmentCreateManyAndReturnArgs>(args?: SelectSubset<T, DepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Department.
     * @param {DepartmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
     */
    delete<T extends DepartmentDeleteArgs>(args: SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Department.
     * @param {DepartmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DepartmentUpdateArgs>(args: SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Departments.
     * @param {DepartmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DepartmentDeleteManyArgs>(args?: SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DepartmentUpdateManyArgs>(args: SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments and returns the data updated in the database.
     * @param {DepartmentUpdateManyAndReturnArgs} args - Arguments to update many Departments.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Departments and only return the `DepartmentID`
     * const departmentWithDepartmentIDOnly = await prisma.department.updateManyAndReturn({
     *   select: { DepartmentID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DepartmentUpdateManyAndReturnArgs>(args: SelectSubset<T, DepartmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Department.
     * @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
     */
    upsert<T extends DepartmentUpsertArgs>(args: SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends DepartmentCountArgs>(
      args?: Subset<T, DepartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DepartmentGroupByArgs['orderBy'] }
        : { orderBy?: DepartmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Department model
   */
  readonly fields: DepartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    college<T extends CollegeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollegeDefaultArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    inventors<T extends Department$inventorsArgs<ExtArgs> = {}>(args?: Subset<T, Department$inventorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    patents<T extends Department$patentsArgs<ExtArgs> = {}>(args?: Subset<T, Department$patentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Department model
   */ 
  interface DepartmentFieldRefs {
    readonly DepartmentID: FieldRef<"Department", 'Int'>
    readonly Name: FieldRef<"Department", 'String'>
    readonly CollegeID: FieldRef<"Department", 'Int'>
    readonly Description: FieldRef<"Department", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Department findUnique
   */
  export type DepartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findUniqueOrThrow
   */
  export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findFirst
   */
  export type DepartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findFirstOrThrow
   */
  export type DepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Departments to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department create
   */
  export type DepartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Department.
     */
    data: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
  }

  /**
   * Department createMany
   */
  export type DepartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
  }

  /**
   * Department createManyAndReturn
   */
  export type DepartmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Department update
   */
  export type DepartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Department.
     */
    data: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
    /**
     * Choose, which Department to update.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department updateMany
   */
  export type DepartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
  }

  /**
   * Department updateManyAndReturn
   */
  export type DepartmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Department upsert
   */
  export type DepartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Department to update in case it exists.
     */
    where: DepartmentWhereUniqueInput
    /**
     * In case the Department found by the `where` argument doesn't exist, create a new Department with this data.
     */
    create: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
    /**
     * In case the Department was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
  }

  /**
   * Department delete
   */
  export type DepartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter which Department to delete.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department deleteMany
   */
  export type DepartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Departments to delete
     */
    where?: DepartmentWhereInput
  }

  /**
   * Department.inventors
   */
  export type Department$inventorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorInclude<ExtArgs> | null
    where?: InventorWhereInput
    orderBy?: InventorOrderByWithRelationInput | InventorOrderByWithRelationInput[]
    cursor?: InventorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InventorScalarFieldEnum | InventorScalarFieldEnum[]
  }

  /**
   * Department.patents
   */
  export type Department$patentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patent
     */
    select?: PatentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patent
     */
    omit?: PatentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentInclude<ExtArgs> | null
    where?: PatentWhereInput
    orderBy?: PatentOrderByWithRelationInput | PatentOrderByWithRelationInput[]
    cursor?: PatentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatentScalarFieldEnum | PatentScalarFieldEnum[]
  }

  /**
   * Department without action
   */
  export type DepartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
  }


  /**
   * Model Country
   */

  export type AggregateCountry = {
    _count: CountryCountAggregateOutputType | null
    _avg: CountryAvgAggregateOutputType | null
    _sum: CountrySumAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  export type CountryAvgAggregateOutputType = {
    CountryID: number | null
  }

  export type CountrySumAggregateOutputType = {
    CountryID: number | null
  }

  export type CountryMinAggregateOutputType = {
    CountryID: number | null
    CountryName: string | null
    ISOCode: string | null
  }

  export type CountryMaxAggregateOutputType = {
    CountryID: number | null
    CountryName: string | null
    ISOCode: string | null
  }

  export type CountryCountAggregateOutputType = {
    CountryID: number
    CountryName: number
    ISOCode: number
    _all: number
  }


  export type CountryAvgAggregateInputType = {
    CountryID?: true
  }

  export type CountrySumAggregateInputType = {
    CountryID?: true
  }

  export type CountryMinAggregateInputType = {
    CountryID?: true
    CountryName?: true
    ISOCode?: true
  }

  export type CountryMaxAggregateInputType = {
    CountryID?: true
    CountryName?: true
    ISOCode?: true
  }

  export type CountryCountAggregateInputType = {
    CountryID?: true
    CountryName?: true
    ISOCode?: true
    _all?: true
  }

  export type CountryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Country to aggregate.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Countries
    **/
    _count?: true | CountryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CountryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CountrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CountryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CountryMaxAggregateInputType
  }

  export type GetCountryAggregateType<T extends CountryAggregateArgs> = {
        [P in keyof T & keyof AggregateCountry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCountry[P]>
      : GetScalarType<T[P], AggregateCountry[P]>
  }




  export type CountryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CountryWhereInput
    orderBy?: CountryOrderByWithAggregationInput | CountryOrderByWithAggregationInput[]
    by: CountryScalarFieldEnum[] | CountryScalarFieldEnum
    having?: CountryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CountryCountAggregateInputType | true
    _avg?: CountryAvgAggregateInputType
    _sum?: CountrySumAggregateInputType
    _min?: CountryMinAggregateInputType
    _max?: CountryMaxAggregateInputType
  }

  export type CountryGroupByOutputType = {
    CountryID: number
    CountryName: string
    ISOCode: string
    _count: CountryCountAggregateOutputType | null
    _avg: CountryAvgAggregateOutputType | null
    _sum: CountrySumAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  type GetCountryGroupByPayload<T extends CountryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CountryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CountryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CountryGroupByOutputType[P]>
            : GetScalarType<T[P], CountryGroupByOutputType[P]>
        }
      >
    >


  export type CountrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    CountryID?: boolean
    CountryName?: boolean
    ISOCode?: boolean
    applications?: boolean | Country$applicationsArgs<ExtArgs>
    _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["country"]>

  export type CountrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    CountryID?: boolean
    CountryName?: boolean
    ISOCode?: boolean
  }, ExtArgs["result"]["country"]>

  export type CountrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    CountryID?: boolean
    CountryName?: boolean
    ISOCode?: boolean
  }, ExtArgs["result"]["country"]>

  export type CountrySelectScalar = {
    CountryID?: boolean
    CountryName?: boolean
    ISOCode?: boolean
  }

  export type CountryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"CountryID" | "CountryName" | "ISOCode", ExtArgs["result"]["country"]>
  export type CountryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | Country$applicationsArgs<ExtArgs>
    _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CountryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CountryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CountryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Country"
    objects: {
      applications: Prisma.$PatentApplicationDataPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      CountryID: number
      CountryName: string
      ISOCode: string
    }, ExtArgs["result"]["country"]>
    composites: {}
  }

  type CountryGetPayload<S extends boolean | null | undefined | CountryDefaultArgs> = $Result.GetResult<Prisma.$CountryPayload, S>

  type CountryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CountryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CountryCountAggregateInputType | true
    }

  export interface CountryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Country'], meta: { name: 'Country' } }
    /**
     * Find zero or one Country that matches the filter.
     * @param {CountryFindUniqueArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CountryFindUniqueArgs>(args: SelectSubset<T, CountryFindUniqueArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Country that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CountryFindUniqueOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CountryFindUniqueOrThrowArgs>(args: SelectSubset<T, CountryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Country that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindFirstArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CountryFindFirstArgs>(args?: SelectSubset<T, CountryFindFirstArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Country that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindFirstOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CountryFindFirstOrThrowArgs>(args?: SelectSubset<T, CountryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Countries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Countries
     * const countries = await prisma.country.findMany()
     * 
     * // Get first 10 Countries
     * const countries = await prisma.country.findMany({ take: 10 })
     * 
     * // Only select the `CountryID`
     * const countryWithCountryIDOnly = await prisma.country.findMany({ select: { CountryID: true } })
     * 
     */
    findMany<T extends CountryFindManyArgs>(args?: SelectSubset<T, CountryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Country.
     * @param {CountryCreateArgs} args - Arguments to create a Country.
     * @example
     * // Create one Country
     * const Country = await prisma.country.create({
     *   data: {
     *     // ... data to create a Country
     *   }
     * })
     * 
     */
    create<T extends CountryCreateArgs>(args: SelectSubset<T, CountryCreateArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Countries.
     * @param {CountryCreateManyArgs} args - Arguments to create many Countries.
     * @example
     * // Create many Countries
     * const country = await prisma.country.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CountryCreateManyArgs>(args?: SelectSubset<T, CountryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Countries and returns the data saved in the database.
     * @param {CountryCreateManyAndReturnArgs} args - Arguments to create many Countries.
     * @example
     * // Create many Countries
     * const country = await prisma.country.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Countries and only return the `CountryID`
     * const countryWithCountryIDOnly = await prisma.country.createManyAndReturn({
     *   select: { CountryID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CountryCreateManyAndReturnArgs>(args?: SelectSubset<T, CountryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Country.
     * @param {CountryDeleteArgs} args - Arguments to delete one Country.
     * @example
     * // Delete one Country
     * const Country = await prisma.country.delete({
     *   where: {
     *     // ... filter to delete one Country
     *   }
     * })
     * 
     */
    delete<T extends CountryDeleteArgs>(args: SelectSubset<T, CountryDeleteArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Country.
     * @param {CountryUpdateArgs} args - Arguments to update one Country.
     * @example
     * // Update one Country
     * const country = await prisma.country.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CountryUpdateArgs>(args: SelectSubset<T, CountryUpdateArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Countries.
     * @param {CountryDeleteManyArgs} args - Arguments to filter Countries to delete.
     * @example
     * // Delete a few Countries
     * const { count } = await prisma.country.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CountryDeleteManyArgs>(args?: SelectSubset<T, CountryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Countries
     * const country = await prisma.country.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CountryUpdateManyArgs>(args: SelectSubset<T, CountryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countries and returns the data updated in the database.
     * @param {CountryUpdateManyAndReturnArgs} args - Arguments to update many Countries.
     * @example
     * // Update many Countries
     * const country = await prisma.country.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Countries and only return the `CountryID`
     * const countryWithCountryIDOnly = await prisma.country.updateManyAndReturn({
     *   select: { CountryID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CountryUpdateManyAndReturnArgs>(args: SelectSubset<T, CountryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Country.
     * @param {CountryUpsertArgs} args - Arguments to update or create a Country.
     * @example
     * // Update or create a Country
     * const country = await prisma.country.upsert({
     *   create: {
     *     // ... data to create a Country
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Country we want to update
     *   }
     * })
     */
    upsert<T extends CountryUpsertArgs>(args: SelectSubset<T, CountryUpsertArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryCountArgs} args - Arguments to filter Countries to count.
     * @example
     * // Count the number of Countries
     * const count = await prisma.country.count({
     *   where: {
     *     // ... the filter for the Countries we want to count
     *   }
     * })
    **/
    count<T extends CountryCountArgs>(
      args?: Subset<T, CountryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CountryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CountryAggregateArgs>(args: Subset<T, CountryAggregateArgs>): Prisma.PrismaPromise<GetCountryAggregateType<T>>

    /**
     * Group by Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CountryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CountryGroupByArgs['orderBy'] }
        : { orderBy?: CountryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CountryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCountryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Country model
   */
  readonly fields: CountryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Country.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CountryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applications<T extends Country$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Country$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatentApplicationDataPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Country model
   */ 
  interface CountryFieldRefs {
    readonly CountryID: FieldRef<"Country", 'Int'>
    readonly CountryName: FieldRef<"Country", 'String'>
    readonly ISOCode: FieldRef<"Country", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Country findUnique
   */
  export type CountryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country findUniqueOrThrow
   */
  export type CountryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country findFirst
   */
  export type CountryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Countries.
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * Country findFirstOrThrow
   */
  export type CountryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Countries.
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * Country findMany
   */
  export type CountryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Countries to fetch.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Countries.
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * Country create
   */
  export type CountryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * The data needed to create a Country.
     */
    data: XOR<CountryCreateInput, CountryUncheckedCreateInput>
  }

  /**
   * Country createMany
   */
  export type CountryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Countries.
     */
    data: CountryCreateManyInput | CountryCreateManyInput[]
  }

  /**
   * Country createManyAndReturn
   */
  export type CountryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * The data used to create many Countries.
     */
    data: CountryCreateManyInput | CountryCreateManyInput[]
  }

  /**
   * Country update
   */
  export type CountryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * The data needed to update a Country.
     */
    data: XOR<CountryUpdateInput, CountryUncheckedUpdateInput>
    /**
     * Choose, which Country to update.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country updateMany
   */
  export type CountryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Countries.
     */
    data: XOR<CountryUpdateManyMutationInput, CountryUncheckedUpdateManyInput>
    /**
     * Filter which Countries to update
     */
    where?: CountryWhereInput
  }

  /**
   * Country updateManyAndReturn
   */
  export type CountryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * The data used to update Countries.
     */
    data: XOR<CountryUpdateManyMutationInput, CountryUncheckedUpdateManyInput>
    /**
     * Filter which Countries to update
     */
    where?: CountryWhereInput
  }

  /**
   * Country upsert
   */
  export type CountryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * The filter to search for the Country to update in case it exists.
     */
    where: CountryWhereUniqueInput
    /**
     * In case the Country found by the `where` argument doesn't exist, create a new Country with this data.
     */
    create: XOR<CountryCreateInput, CountryUncheckedCreateInput>
    /**
     * In case the Country was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CountryUpdateInput, CountryUncheckedUpdateInput>
  }

  /**
   * Country delete
   */
  export type CountryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter which Country to delete.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country deleteMany
   */
  export type CountryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Countries to delete
     */
    where?: CountryWhereInput
  }

  /**
   * Country.applications
   */
  export type Country$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatentApplicationData
     */
    select?: PatentApplicationDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatentApplicationData
     */
    omit?: PatentApplicationDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatentApplicationDataInclude<ExtArgs> | null
    where?: PatentApplicationDataWhereInput
    orderBy?: PatentApplicationDataOrderByWithRelationInput | PatentApplicationDataOrderByWithRelationInput[]
    cursor?: PatentApplicationDataWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatentApplicationDataScalarFieldEnum | PatentApplicationDataScalarFieldEnum[]
  }

  /**
   * Country without action
   */
  export type CountryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
  }


  /**
   * Model ContactInfo
   */

  export type AggregateContactInfo = {
    _count: ContactInfoCountAggregateOutputType | null
    _avg: ContactInfoAvgAggregateOutputType | null
    _sum: ContactInfoSumAggregateOutputType | null
    _min: ContactInfoMinAggregateOutputType | null
    _max: ContactInfoMaxAggregateOutputType | null
  }

  export type ContactInfoAvgAggregateOutputType = {
    ContactInfoID: number | null
  }

  export type ContactInfoSumAggregateOutputType = {
    ContactInfoID: number | null
  }

  export type ContactInfoMinAggregateOutputType = {
    ContactInfoID: number | null
    Name: string | null
    Email: string | null
    OfficeNumber: string | null
    PhoneNumber: string | null
    Position: string | null
    Note: string | null
  }

  export type ContactInfoMaxAggregateOutputType = {
    ContactInfoID: number | null
    Name: string | null
    Email: string | null
    OfficeNumber: string | null
    PhoneNumber: string | null
    Position: string | null
    Note: string | null
  }

  export type ContactInfoCountAggregateOutputType = {
    ContactInfoID: number
    Name: number
    Email: number
    OfficeNumber: number
    PhoneNumber: number
    Position: number
    Note: number
    _all: number
  }


  export type ContactInfoAvgAggregateInputType = {
    ContactInfoID?: true
  }

  export type ContactInfoSumAggregateInputType = {
    ContactInfoID?: true
  }

  export type ContactInfoMinAggregateInputType = {
    ContactInfoID?: true
    Name?: true
    Email?: true
    OfficeNumber?: true
    PhoneNumber?: true
    Position?: true
    Note?: true
  }

  export type ContactInfoMaxAggregateInputType = {
    ContactInfoID?: true
    Name?: true
    Email?: true
    OfficeNumber?: true
    PhoneNumber?: true
    Position?: true
    Note?: true
  }

  export type ContactInfoCountAggregateInputType = {
    ContactInfoID?: true
    Name?: true
    Email?: true
    OfficeNumber?: true
    PhoneNumber?: true
    Position?: true
    Note?: true
    _all?: true
  }

  export type ContactInfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactInfo to aggregate.
     */
    where?: ContactInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactInfos to fetch.
     */
    orderBy?: ContactInfoOrderByWithRelationInput | ContactInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactInfos
    **/
    _count?: true | ContactInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContactInfoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContactInfoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactInfoMaxAggregateInputType
  }

  export type GetContactInfoAggregateType<T extends ContactInfoAggregateArgs> = {
        [P in keyof T & keyof AggregateContactInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactInfo[P]>
      : GetScalarType<T[P], AggregateContactInfo[P]>
  }




  export type ContactInfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactInfoWhereInput
    orderBy?: ContactInfoOrderByWithAggregationInput | ContactInfoOrderByWithAggregationInput[]
    by: ContactInfoScalarFieldEnum[] | ContactInfoScalarFieldEnum
    having?: ContactInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactInfoCountAggregateInputType | true
    _avg?: ContactInfoAvgAggregateInputType
    _sum?: ContactInfoSumAggregateInputType
    _min?: ContactInfoMinAggregateInputType
    _max?: ContactInfoMaxAggregateInputType
  }

  export type ContactInfoGroupByOutputType = {
    ContactInfoID: number
    Name: string
    Email: string
    OfficeNumber: string | null
    PhoneNumber: string | null
    Position: string | null
    Note: string | null
    _count: ContactInfoCountAggregateOutputType | null
    _avg: ContactInfoAvgAggregateOutputType | null
    _sum: ContactInfoSumAggregateOutputType | null
    _min: ContactInfoMinAggregateOutputType | null
    _max: ContactInfoMaxAggregateOutputType | null
  }

  type GetContactInfoGroupByPayload<T extends ContactInfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactInfoGroupByOutputType[P]>
            : GetScalarType<T[P], ContactInfoGroupByOutputType[P]>
        }
      >
    >


  export type ContactInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ContactInfoID?: boolean
    Name?: boolean
    Email?: boolean
    OfficeNumber?: boolean
    PhoneNumber?: boolean
    Position?: boolean
    Note?: boolean
    agencyContact?: boolean | ContactInfo$agencyContactArgs<ExtArgs>
    inventor?: boolean | ContactInfo$inventorArgs<ExtArgs>
  }, ExtArgs["result"]["contactInfo"]>

  export type ContactInfoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ContactInfoID?: boolean
    Name?: boolean
    Email?: boolean
    OfficeNumber?: boolean
    PhoneNumber?: boolean
    Position?: boolean
    Note?: boolean
  }, ExtArgs["result"]["contactInfo"]>

  export type ContactInfoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ContactInfoID?: boolean
    Name?: boolean
    Email?: boolean
    OfficeNumber?: boolean
    PhoneNumber?: boolean
    Position?: boolean
    Note?: boolean
  }, ExtArgs["result"]["contactInfo"]>

  export type ContactInfoSelectScalar = {
    ContactInfoID?: boolean
    Name?: boolean
    Email?: boolean
    OfficeNumber?: boolean
    PhoneNumber?: boolean
    Position?: boolean
    Note?: boolean
  }

  export type ContactInfoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ContactInfoID" | "Name" | "Email" | "OfficeNumber" | "PhoneNumber" | "Position" | "Note", ExtArgs["result"]["contactInfo"]>
  export type ContactInfoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agencyContact?: boolean | ContactInfo$agencyContactArgs<ExtArgs>
    inventor?: boolean | ContactInfo$inventorArgs<ExtArgs>
  }
  export type ContactInfoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ContactInfoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ContactInfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactInfo"
    objects: {
      agencyContact: Prisma.$AgencyContactPersonPayload<ExtArgs> | null
      inventor: Prisma.$InventorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      ContactInfoID: number
      Name: string
      Email: string
      OfficeNumber: string | null
      PhoneNumber: string | null
      Position: string | null
      Note: string | null
    }, ExtArgs["result"]["contactInfo"]>
    composites: {}
  }

  type ContactInfoGetPayload<S extends boolean | null | undefined | ContactInfoDefaultArgs> = $Result.GetResult<Prisma.$ContactInfoPayload, S>

  type ContactInfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactInfoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactInfoCountAggregateInputType | true
    }

  export interface ContactInfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactInfo'], meta: { name: 'ContactInfo' } }
    /**
     * Find zero or one ContactInfo that matches the filter.
     * @param {ContactInfoFindUniqueArgs} args - Arguments to find a ContactInfo
     * @example
     * // Get one ContactInfo
     * const contactInfo = await prisma.contactInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactInfoFindUniqueArgs>(args: SelectSubset<T, ContactInfoFindUniqueArgs<ExtArgs>>): Prisma__ContactInfoClient<$Result.GetResult<Prisma.$ContactInfoPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one ContactInfo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactInfoFindUniqueOrThrowArgs} args - Arguments to find a ContactInfo
     * @example
     * // Get one ContactInfo
     * const contactInfo = await prisma.contactInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactInfoFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactInfoClient<$Result.GetResult<Prisma.$ContactInfoPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first ContactInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactInfoFindFirstArgs} args - Arguments to find a ContactInfo
     * @example
     * // Get one ContactInfo
     * const contactInfo = await prisma.contactInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactInfoFindFirstArgs>(args?: SelectSubset<T, ContactInfoFindFirstArgs<ExtArgs>>): Prisma__ContactInfoClient<$Result.GetResult<Prisma.$ContactInfoPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first ContactInfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactInfoFindFirstOrThrowArgs} args - Arguments to find a ContactInfo
     * @example
     * // Get one ContactInfo
     * const contactInfo = await prisma.contactInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactInfoFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactInfoClient<$Result.GetResult<Prisma.$ContactInfoPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more ContactInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactInfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactInfos
     * const contactInfos = await prisma.contactInfo.findMany()
     * 
     * // Get first 10 ContactInfos
     * const contactInfos = await prisma.contactInfo.findMany({ take: 10 })
     * 
     * // Only select the `ContactInfoID`
     * const contactInfoWithContactInfoIDOnly = await prisma.contactInfo.findMany({ select: { ContactInfoID: true } })
     * 
     */
    findMany<T extends ContactInfoFindManyArgs>(args?: SelectSubset<T, ContactInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactInfoPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a ContactInfo.
     * @param {ContactInfoCreateArgs} args - Arguments to create a ContactInfo.
     * @example
     * // Create one ContactInfo
     * const ContactInfo = await prisma.contactInfo.create({
     *   data: {
     *     // ... data to create a ContactInfo
     *   }
     * })
     * 
     */
    create<T extends ContactInfoCreateArgs>(args: SelectSubset<T, ContactInfoCreateArgs<ExtArgs>>): Prisma__ContactInfoClient<$Result.GetResult<Prisma.$ContactInfoPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many ContactInfos.
     * @param {ContactInfoCreateManyArgs} args - Arguments to create many ContactInfos.
     * @example
     * // Create many ContactInfos
     * const contactInfo = await prisma.contactInfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactInfoCreateManyArgs>(args?: SelectSubset<T, ContactInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContactInfos and returns the data saved in the database.
     * @param {ContactInfoCreateManyAndReturnArgs} args - Arguments to create many ContactInfos.
     * @example
     * // Create many ContactInfos
     * const contactInfo = await prisma.contactInfo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContactInfos and only return the `ContactInfoID`
     * const contactInfoWithContactInfoIDOnly = await prisma.contactInfo.createManyAndReturn({
     *   select: { ContactInfoID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactInfoCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactInfoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactInfoPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a ContactInfo.
     * @param {ContactInfoDeleteArgs} args - Arguments to delete one ContactInfo.
     * @example
     * // Delete one ContactInfo
     * const ContactInfo = await prisma.contactInfo.delete({
     *   where: {
     *     // ... filter to delete one ContactInfo
     *   }
     * })
     * 
     */
    delete<T extends ContactInfoDeleteArgs>(args: SelectSubset<T, ContactInfoDeleteArgs<ExtArgs>>): Prisma__ContactInfoClient<$Result.GetResult<Prisma.$ContactInfoPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one ContactInfo.
     * @param {ContactInfoUpdateArgs} args - Arguments to update one ContactInfo.
     * @example
     * // Update one ContactInfo
     * const contactInfo = await prisma.contactInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactInfoUpdateArgs>(args: SelectSubset<T, ContactInfoUpdateArgs<ExtArgs>>): Prisma__ContactInfoClient<$Result.GetResult<Prisma.$ContactInfoPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more ContactInfos.
     * @param {ContactInfoDeleteManyArgs} args - Arguments to filter ContactInfos to delete.
     * @example
     * // Delete a few ContactInfos
     * const { count } = await prisma.contactInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactInfoDeleteManyArgs>(args?: SelectSubset<T, ContactInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactInfos
     * const contactInfo = await prisma.contactInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactInfoUpdateManyArgs>(args: SelectSubset<T, ContactInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactInfos and returns the data updated in the database.
     * @param {ContactInfoUpdateManyAndReturnArgs} args - Arguments to update many ContactInfos.
     * @example
     * // Update many ContactInfos
     * const contactInfo = await prisma.contactInfo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContactInfos and only return the `ContactInfoID`
     * const contactInfoWithContactInfoIDOnly = await prisma.contactInfo.updateManyAndReturn({
     *   select: { ContactInfoID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContactInfoUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactInfoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactInfoPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one ContactInfo.
     * @param {ContactInfoUpsertArgs} args - Arguments to update or create a ContactInfo.
     * @example
     * // Update or create a ContactInfo
     * const contactInfo = await prisma.contactInfo.upsert({
     *   create: {
     *     // ... data to create a ContactInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactInfo we want to update
     *   }
     * })
     */
    upsert<T extends ContactInfoUpsertArgs>(args: SelectSubset<T, ContactInfoUpsertArgs<ExtArgs>>): Prisma__ContactInfoClient<$Result.GetResult<Prisma.$ContactInfoPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of ContactInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactInfoCountArgs} args - Arguments to filter ContactInfos to count.
     * @example
     * // Count the number of ContactInfos
     * const count = await prisma.contactInfo.count({
     *   where: {
     *     // ... the filter for the ContactInfos we want to count
     *   }
     * })
    **/
    count<T extends ContactInfoCountArgs>(
      args?: Subset<T, ContactInfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactInfoAggregateArgs>(args: Subset<T, ContactInfoAggregateArgs>): Prisma.PrismaPromise<GetContactInfoAggregateType<T>>

    /**
     * Group by ContactInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactInfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactInfoGroupByArgs['orderBy'] }
        : { orderBy?: ContactInfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactInfo model
   */
  readonly fields: ContactInfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactInfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agencyContact<T extends ContactInfo$agencyContactArgs<ExtArgs> = {}>(args?: Subset<T, ContactInfo$agencyContactArgs<ExtArgs>>): Prisma__AgencyContactPersonClient<$Result.GetResult<Prisma.$AgencyContactPersonPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    inventor<T extends ContactInfo$inventorArgs<ExtArgs> = {}>(args?: Subset<T, ContactInfo$inventorArgs<ExtArgs>>): Prisma__InventorClient<$Result.GetResult<Prisma.$InventorPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContactInfo model
   */ 
  interface ContactInfoFieldRefs {
    readonly ContactInfoID: FieldRef<"ContactInfo", 'Int'>
    readonly Name: FieldRef<"ContactInfo", 'String'>
    readonly Email: FieldRef<"ContactInfo", 'String'>
    readonly OfficeNumber: FieldRef<"ContactInfo", 'String'>
    readonly PhoneNumber: FieldRef<"ContactInfo", 'String'>
    readonly Position: FieldRef<"ContactInfo", 'String'>
    readonly Note: FieldRef<"ContactInfo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ContactInfo findUnique
   */
  export type ContactInfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInfoInclude<ExtArgs> | null
    /**
     * Filter, which ContactInfo to fetch.
     */
    where: ContactInfoWhereUniqueInput
  }

  /**
   * ContactInfo findUniqueOrThrow
   */
  export type ContactInfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInfoInclude<ExtArgs> | null
    /**
     * Filter, which ContactInfo to fetch.
     */
    where: ContactInfoWhereUniqueInput
  }

  /**
   * ContactInfo findFirst
   */
  export type ContactInfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInfoInclude<ExtArgs> | null
    /**
     * Filter, which ContactInfo to fetch.
     */
    where?: ContactInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactInfos to fetch.
     */
    orderBy?: ContactInfoOrderByWithRelationInput | ContactInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactInfos.
     */
    cursor?: ContactInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactInfos.
     */
    distinct?: ContactInfoScalarFieldEnum | ContactInfoScalarFieldEnum[]
  }

  /**
   * ContactInfo findFirstOrThrow
   */
  export type ContactInfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInfoInclude<ExtArgs> | null
    /**
     * Filter, which ContactInfo to fetch.
     */
    where?: ContactInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactInfos to fetch.
     */
    orderBy?: ContactInfoOrderByWithRelationInput | ContactInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactInfos.
     */
    cursor?: ContactInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactInfos.
     */
    distinct?: ContactInfoScalarFieldEnum | ContactInfoScalarFieldEnum[]
  }

  /**
   * ContactInfo findMany
   */
  export type ContactInfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInfoInclude<ExtArgs> | null
    /**
     * Filter, which ContactInfos to fetch.
     */
    where?: ContactInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactInfos to fetch.
     */
    orderBy?: ContactInfoOrderByWithRelationInput | ContactInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactInfos.
     */
    cursor?: ContactInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactInfos.
     */
    skip?: number
    distinct?: ContactInfoScalarFieldEnum | ContactInfoScalarFieldEnum[]
  }

  /**
   * ContactInfo create
   */
  export type ContactInfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInfoInclude<ExtArgs> | null
    /**
     * The data needed to create a ContactInfo.
     */
    data: XOR<ContactInfoCreateInput, ContactInfoUncheckedCreateInput>
  }

  /**
   * ContactInfo createMany
   */
  export type ContactInfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactInfos.
     */
    data: ContactInfoCreateManyInput | ContactInfoCreateManyInput[]
  }

  /**
   * ContactInfo createManyAndReturn
   */
  export type ContactInfoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * The data used to create many ContactInfos.
     */
    data: ContactInfoCreateManyInput | ContactInfoCreateManyInput[]
  }

  /**
   * ContactInfo update
   */
  export type ContactInfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInfoInclude<ExtArgs> | null
    /**
     * The data needed to update a ContactInfo.
     */
    data: XOR<ContactInfoUpdateInput, ContactInfoUncheckedUpdateInput>
    /**
     * Choose, which ContactInfo to update.
     */
    where: ContactInfoWhereUniqueInput
  }

  /**
   * ContactInfo updateMany
   */
  export type ContactInfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactInfos.
     */
    data: XOR<ContactInfoUpdateManyMutationInput, ContactInfoUncheckedUpdateManyInput>
    /**
     * Filter which ContactInfos to update
     */
    where?: ContactInfoWhereInput
  }

  /**
   * ContactInfo updateManyAndReturn
   */
  export type ContactInfoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * The data used to update ContactInfos.
     */
    data: XOR<ContactInfoUpdateManyMutationInput, ContactInfoUncheckedUpdateManyInput>
    /**
     * Filter which ContactInfos to update
     */
    where?: ContactInfoWhereInput
  }

  /**
   * ContactInfo upsert
   */
  export type ContactInfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInfoInclude<ExtArgs> | null
    /**
     * The filter to search for the ContactInfo to update in case it exists.
     */
    where: ContactInfoWhereUniqueInput
    /**
     * In case the ContactInfo found by the `where` argument doesn't exist, create a new ContactInfo with this data.
     */
    create: XOR<ContactInfoCreateInput, ContactInfoUncheckedCreateInput>
    /**
     * In case the ContactInfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactInfoUpdateInput, ContactInfoUncheckedUpdateInput>
  }

  /**
   * ContactInfo delete
   */
  export type ContactInfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInfoInclude<ExtArgs> | null
    /**
     * Filter which ContactInfo to delete.
     */
    where: ContactInfoWhereUniqueInput
  }

  /**
   * ContactInfo deleteMany
   */
  export type ContactInfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactInfos to delete
     */
    where?: ContactInfoWhereInput
  }

  /**
   * ContactInfo.agencyContact
   */
  export type ContactInfo$agencyContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgencyContactPerson
     */
    select?: AgencyContactPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgencyContactPerson
     */
    omit?: AgencyContactPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgencyContactPersonInclude<ExtArgs> | null
    where?: AgencyContactPersonWhereInput
  }

  /**
   * ContactInfo.inventor
   */
  export type ContactInfo$inventorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventor
     */
    select?: InventorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventor
     */
    omit?: InventorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventorInclude<ExtArgs> | null
    where?: InventorWhereInput
  }

  /**
   * ContactInfo without action
   */
  export type ContactInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactInfo
     */
    select?: ContactInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactInfo
     */
    omit?: ContactInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInfoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AgencyScalarFieldEnum: {
    AgencyID: 'AgencyID',
    Name: 'Name'
  };

  export type AgencyScalarFieldEnum = (typeof AgencyScalarFieldEnum)[keyof typeof AgencyScalarFieldEnum]


  export const AgencyPatentScalarFieldEnum: {
    PatentID: 'PatentID',
    AgencyID: 'AgencyID',
    FileCode: 'FileCode',
    Role: 'Role',
    Details: 'Details'
  };

  export type AgencyPatentScalarFieldEnum = (typeof AgencyPatentScalarFieldEnum)[keyof typeof AgencyPatentScalarFieldEnum]


  export const AgencyContactPersonScalarFieldEnum: {
    ContactPersonID: 'ContactPersonID',
    AgencyID: 'AgencyID',
    Position: 'Position',
    ContactInfoID: 'ContactInfoID'
  };

  export type AgencyContactPersonScalarFieldEnum = (typeof AgencyContactPersonScalarFieldEnum)[keyof typeof AgencyContactPersonScalarFieldEnum]


  export const FundingPlanScalarFieldEnum: {
    PlanID: 'PlanID',
    PlanType: 'PlanType'
  };

  export type FundingPlanScalarFieldEnum = (typeof FundingPlanScalarFieldEnum)[keyof typeof FundingPlanScalarFieldEnum]


  export const PatentFundingScalarFieldEnum: {
    FundingID: 'FundingID',
    PatentID: 'PatentID',
    FundingAgency: 'FundingAgency',
    ProjectNumber: 'ProjectNumber',
    PlanID: 'PlanID'
  };

  export type PatentFundingScalarFieldEnum = (typeof PatentFundingScalarFieldEnum)[keyof typeof PatentFundingScalarFieldEnum]


  export const InventorScalarFieldEnum: {
    InventorID: 'InventorID',
    Name: 'Name',
    Department: 'Department',
    Email: 'Email',
    ContactInfoID: 'ContactInfoID'
  };

  export type InventorScalarFieldEnum = (typeof InventorScalarFieldEnum)[keyof typeof InventorScalarFieldEnum]


  export const PatentInventorScalarFieldEnum: {
    PatentID: 'PatentID',
    InventorID: 'InventorID',
    Main: 'Main'
  };

  export type PatentInventorScalarFieldEnum = (typeof PatentInventorScalarFieldEnum)[keyof typeof PatentInventorScalarFieldEnum]


  export const PatentScalarFieldEnum: {
    PatentID: 'PatentID',
    Year: 'Year',
    InternalID: 'InternalID',
    Title: 'Title',
    DepartmentID: 'DepartmentID',
    CollegeID: 'CollegeID',
    TitleEnglish: 'TitleEnglish'
  };

  export type PatentScalarFieldEnum = (typeof PatentScalarFieldEnum)[keyof typeof PatentScalarFieldEnum]


  export const PatentStatusScalarFieldEnum: {
    PatentID: 'PatentID',
    ExpiryDate: 'ExpiryDate',
    Status: 'Status',
    TechnicalCommitteeReviewDate: 'TechnicalCommitteeReviewDate',
    MaintenanceYear: 'MaintenanceYear',
    MaintenanceStartDate: 'MaintenanceStartDate',
    MaintenanceEndDate: 'MaintenanceEndDate'
  };

  export type PatentStatusScalarFieldEnum = (typeof PatentStatusScalarFieldEnum)[keyof typeof PatentStatusScalarFieldEnum]


  export const PatentApplicationDataScalarFieldEnum: {
    PatentID: 'PatentID',
    CountryID: 'CountryID',
    PatentNumber: 'PatentNumber',
    FilingDate: 'FilingDate',
    GrantDate: 'GrantDate',
    PatentType: 'PatentType',
    ApplicationNumber: 'ApplicationNumber'
  };

  export type PatentApplicationDataScalarFieldEnum = (typeof PatentApplicationDataScalarFieldEnum)[keyof typeof PatentApplicationDataScalarFieldEnum]


  export const PatentTechnicalAttributesScalarFieldEnum: {
    PatentID: 'PatentID',
    IPC: 'IPC',
    Scope: 'Scope',
    MaturityLevel: 'MaturityLevel',
    Keywords: 'Keywords'
  };

  export type PatentTechnicalAttributesScalarFieldEnum = (typeof PatentTechnicalAttributesScalarFieldEnum)[keyof typeof PatentTechnicalAttributesScalarFieldEnum]


  export const CollegeScalarFieldEnum: {
    CollegeID: 'CollegeID',
    Name: 'Name',
    Description: 'Description'
  };

  export type CollegeScalarFieldEnum = (typeof CollegeScalarFieldEnum)[keyof typeof CollegeScalarFieldEnum]


  export const DepartmentScalarFieldEnum: {
    DepartmentID: 'DepartmentID',
    Name: 'Name',
    CollegeID: 'CollegeID',
    Description: 'Description'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const CountryScalarFieldEnum: {
    CountryID: 'CountryID',
    CountryName: 'CountryName',
    ISOCode: 'ISOCode'
  };

  export type CountryScalarFieldEnum = (typeof CountryScalarFieldEnum)[keyof typeof CountryScalarFieldEnum]


  export const ContactInfoScalarFieldEnum: {
    ContactInfoID: 'ContactInfoID',
    Name: 'Name',
    Email: 'Email',
    OfficeNumber: 'OfficeNumber',
    PhoneNumber: 'PhoneNumber',
    Position: 'Position',
    Note: 'Note'
  };

  export type ContactInfoScalarFieldEnum = (typeof ContactInfoScalarFieldEnum)[keyof typeof ContactInfoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type AgencyWhereInput = {
    AND?: AgencyWhereInput | AgencyWhereInput[]
    OR?: AgencyWhereInput[]
    NOT?: AgencyWhereInput | AgencyWhereInput[]
    AgencyID?: IntFilter<"Agency"> | number
    Name?: StringFilter<"Agency"> | string
    contacts?: AgencyContactPersonListRelationFilter
    patents?: AgencyPatentListRelationFilter
  }

  export type AgencyOrderByWithRelationInput = {
    AgencyID?: SortOrder
    Name?: SortOrder
    contacts?: AgencyContactPersonOrderByRelationAggregateInput
    patents?: AgencyPatentOrderByRelationAggregateInput
  }

  export type AgencyWhereUniqueInput = Prisma.AtLeast<{
    AgencyID?: number
    AND?: AgencyWhereInput | AgencyWhereInput[]
    OR?: AgencyWhereInput[]
    NOT?: AgencyWhereInput | AgencyWhereInput[]
    Name?: StringFilter<"Agency"> | string
    contacts?: AgencyContactPersonListRelationFilter
    patents?: AgencyPatentListRelationFilter
  }, "AgencyID">

  export type AgencyOrderByWithAggregationInput = {
    AgencyID?: SortOrder
    Name?: SortOrder
    _count?: AgencyCountOrderByAggregateInput
    _avg?: AgencyAvgOrderByAggregateInput
    _max?: AgencyMaxOrderByAggregateInput
    _min?: AgencyMinOrderByAggregateInput
    _sum?: AgencySumOrderByAggregateInput
  }

  export type AgencyScalarWhereWithAggregatesInput = {
    AND?: AgencyScalarWhereWithAggregatesInput | AgencyScalarWhereWithAggregatesInput[]
    OR?: AgencyScalarWhereWithAggregatesInput[]
    NOT?: AgencyScalarWhereWithAggregatesInput | AgencyScalarWhereWithAggregatesInput[]
    AgencyID?: IntWithAggregatesFilter<"Agency"> | number
    Name?: StringWithAggregatesFilter<"Agency"> | string
  }

  export type AgencyPatentWhereInput = {
    AND?: AgencyPatentWhereInput | AgencyPatentWhereInput[]
    OR?: AgencyPatentWhereInput[]
    NOT?: AgencyPatentWhereInput | AgencyPatentWhereInput[]
    PatentID?: IntFilter<"AgencyPatent"> | number
    AgencyID?: IntFilter<"AgencyPatent"> | number
    FileCode?: StringFilter<"AgencyPatent"> | string
    Role?: StringFilter<"AgencyPatent"> | string
    Details?: StringNullableFilter<"AgencyPatent"> | string | null
    agency?: XOR<AgencyScalarRelationFilter, AgencyWhereInput>
    patent?: XOR<PatentScalarRelationFilter, PatentWhereInput>
  }

  export type AgencyPatentOrderByWithRelationInput = {
    PatentID?: SortOrder
    AgencyID?: SortOrder
    FileCode?: SortOrder
    Role?: SortOrder
    Details?: SortOrderInput | SortOrder
    agency?: AgencyOrderByWithRelationInput
    patent?: PatentOrderByWithRelationInput
  }

  export type AgencyPatentWhereUniqueInput = Prisma.AtLeast<{
    PatentID_AgencyID?: AgencyPatentPatentIDAgencyIDCompoundUniqueInput
    AND?: AgencyPatentWhereInput | AgencyPatentWhereInput[]
    OR?: AgencyPatentWhereInput[]
    NOT?: AgencyPatentWhereInput | AgencyPatentWhereInput[]
    PatentID?: IntFilter<"AgencyPatent"> | number
    AgencyID?: IntFilter<"AgencyPatent"> | number
    FileCode?: StringFilter<"AgencyPatent"> | string
    Role?: StringFilter<"AgencyPatent"> | string
    Details?: StringNullableFilter<"AgencyPatent"> | string | null
    agency?: XOR<AgencyScalarRelationFilter, AgencyWhereInput>
    patent?: XOR<PatentScalarRelationFilter, PatentWhereInput>
  }, "PatentID_AgencyID">

  export type AgencyPatentOrderByWithAggregationInput = {
    PatentID?: SortOrder
    AgencyID?: SortOrder
    FileCode?: SortOrder
    Role?: SortOrder
    Details?: SortOrderInput | SortOrder
    _count?: AgencyPatentCountOrderByAggregateInput
    _avg?: AgencyPatentAvgOrderByAggregateInput
    _max?: AgencyPatentMaxOrderByAggregateInput
    _min?: AgencyPatentMinOrderByAggregateInput
    _sum?: AgencyPatentSumOrderByAggregateInput
  }

  export type AgencyPatentScalarWhereWithAggregatesInput = {
    AND?: AgencyPatentScalarWhereWithAggregatesInput | AgencyPatentScalarWhereWithAggregatesInput[]
    OR?: AgencyPatentScalarWhereWithAggregatesInput[]
    NOT?: AgencyPatentScalarWhereWithAggregatesInput | AgencyPatentScalarWhereWithAggregatesInput[]
    PatentID?: IntWithAggregatesFilter<"AgencyPatent"> | number
    AgencyID?: IntWithAggregatesFilter<"AgencyPatent"> | number
    FileCode?: StringWithAggregatesFilter<"AgencyPatent"> | string
    Role?: StringWithAggregatesFilter<"AgencyPatent"> | string
    Details?: StringNullableWithAggregatesFilter<"AgencyPatent"> | string | null
  }

  export type AgencyContactPersonWhereInput = {
    AND?: AgencyContactPersonWhereInput | AgencyContactPersonWhereInput[]
    OR?: AgencyContactPersonWhereInput[]
    NOT?: AgencyContactPersonWhereInput | AgencyContactPersonWhereInput[]
    ContactPersonID?: IntFilter<"AgencyContactPerson"> | number
    AgencyID?: IntFilter<"AgencyContactPerson"> | number
    Position?: StringFilter<"AgencyContactPerson"> | string
    ContactInfoID?: IntNullableFilter<"AgencyContactPerson"> | number | null
    contactInfo?: XOR<ContactInfoNullableScalarRelationFilter, ContactInfoWhereInput> | null
    agency?: XOR<AgencyScalarRelationFilter, AgencyWhereInput>
  }

  export type AgencyContactPersonOrderByWithRelationInput = {
    ContactPersonID?: SortOrder
    AgencyID?: SortOrder
    Position?: SortOrder
    ContactInfoID?: SortOrderInput | SortOrder
    contactInfo?: ContactInfoOrderByWithRelationInput
    agency?: AgencyOrderByWithRelationInput
  }

  export type AgencyContactPersonWhereUniqueInput = Prisma.AtLeast<{
    ContactPersonID?: number
    ContactInfoID?: number
    AND?: AgencyContactPersonWhereInput | AgencyContactPersonWhereInput[]
    OR?: AgencyContactPersonWhereInput[]
    NOT?: AgencyContactPersonWhereInput | AgencyContactPersonWhereInput[]
    AgencyID?: IntFilter<"AgencyContactPerson"> | number
    Position?: StringFilter<"AgencyContactPerson"> | string
    contactInfo?: XOR<ContactInfoNullableScalarRelationFilter, ContactInfoWhereInput> | null
    agency?: XOR<AgencyScalarRelationFilter, AgencyWhereInput>
  }, "ContactPersonID" | "ContactInfoID">

  export type AgencyContactPersonOrderByWithAggregationInput = {
    ContactPersonID?: SortOrder
    AgencyID?: SortOrder
    Position?: SortOrder
    ContactInfoID?: SortOrderInput | SortOrder
    _count?: AgencyContactPersonCountOrderByAggregateInput
    _avg?: AgencyContactPersonAvgOrderByAggregateInput
    _max?: AgencyContactPersonMaxOrderByAggregateInput
    _min?: AgencyContactPersonMinOrderByAggregateInput
    _sum?: AgencyContactPersonSumOrderByAggregateInput
  }

  export type AgencyContactPersonScalarWhereWithAggregatesInput = {
    AND?: AgencyContactPersonScalarWhereWithAggregatesInput | AgencyContactPersonScalarWhereWithAggregatesInput[]
    OR?: AgencyContactPersonScalarWhereWithAggregatesInput[]
    NOT?: AgencyContactPersonScalarWhereWithAggregatesInput | AgencyContactPersonScalarWhereWithAggregatesInput[]
    ContactPersonID?: IntWithAggregatesFilter<"AgencyContactPerson"> | number
    AgencyID?: IntWithAggregatesFilter<"AgencyContactPerson"> | number
    Position?: StringWithAggregatesFilter<"AgencyContactPerson"> | string
    ContactInfoID?: IntNullableWithAggregatesFilter<"AgencyContactPerson"> | number | null
  }

  export type FundingPlanWhereInput = {
    AND?: FundingPlanWhereInput | FundingPlanWhereInput[]
    OR?: FundingPlanWhereInput[]
    NOT?: FundingPlanWhereInput | FundingPlanWhereInput[]
    PlanID?: IntFilter<"FundingPlan"> | number
    PlanType?: IntFilter<"FundingPlan"> | number
    fundings?: PatentFundingListRelationFilter
  }

  export type FundingPlanOrderByWithRelationInput = {
    PlanID?: SortOrder
    PlanType?: SortOrder
    fundings?: PatentFundingOrderByRelationAggregateInput
  }

  export type FundingPlanWhereUniqueInput = Prisma.AtLeast<{
    PlanID?: number
    AND?: FundingPlanWhereInput | FundingPlanWhereInput[]
    OR?: FundingPlanWhereInput[]
    NOT?: FundingPlanWhereInput | FundingPlanWhereInput[]
    PlanType?: IntFilter<"FundingPlan"> | number
    fundings?: PatentFundingListRelationFilter
  }, "PlanID">

  export type FundingPlanOrderByWithAggregationInput = {
    PlanID?: SortOrder
    PlanType?: SortOrder
    _count?: FundingPlanCountOrderByAggregateInput
    _avg?: FundingPlanAvgOrderByAggregateInput
    _max?: FundingPlanMaxOrderByAggregateInput
    _min?: FundingPlanMinOrderByAggregateInput
    _sum?: FundingPlanSumOrderByAggregateInput
  }

  export type FundingPlanScalarWhereWithAggregatesInput = {
    AND?: FundingPlanScalarWhereWithAggregatesInput | FundingPlanScalarWhereWithAggregatesInput[]
    OR?: FundingPlanScalarWhereWithAggregatesInput[]
    NOT?: FundingPlanScalarWhereWithAggregatesInput | FundingPlanScalarWhereWithAggregatesInput[]
    PlanID?: IntWithAggregatesFilter<"FundingPlan"> | number
    PlanType?: IntWithAggregatesFilter<"FundingPlan"> | number
  }

  export type PatentFundingWhereInput = {
    AND?: PatentFundingWhereInput | PatentFundingWhereInput[]
    OR?: PatentFundingWhereInput[]
    NOT?: PatentFundingWhereInput | PatentFundingWhereInput[]
    FundingID?: IntFilter<"PatentFunding"> | number
    PatentID?: IntFilter<"PatentFunding"> | number
    FundingAgency?: StringFilter<"PatentFunding"> | string
    ProjectNumber?: StringFilter<"PatentFunding"> | string
    PlanID?: IntFilter<"PatentFunding"> | number
    plan?: XOR<FundingPlanScalarRelationFilter, FundingPlanWhereInput>
    patent?: XOR<PatentScalarRelationFilter, PatentWhereInput>
  }

  export type PatentFundingOrderByWithRelationInput = {
    FundingID?: SortOrder
    PatentID?: SortOrder
    FundingAgency?: SortOrder
    ProjectNumber?: SortOrder
    PlanID?: SortOrder
    plan?: FundingPlanOrderByWithRelationInput
    patent?: PatentOrderByWithRelationInput
  }

  export type PatentFundingWhereUniqueInput = Prisma.AtLeast<{
    FundingID?: number
    AND?: PatentFundingWhereInput | PatentFundingWhereInput[]
    OR?: PatentFundingWhereInput[]
    NOT?: PatentFundingWhereInput | PatentFundingWhereInput[]
    PatentID?: IntFilter<"PatentFunding"> | number
    FundingAgency?: StringFilter<"PatentFunding"> | string
    ProjectNumber?: StringFilter<"PatentFunding"> | string
    PlanID?: IntFilter<"PatentFunding"> | number
    plan?: XOR<FundingPlanScalarRelationFilter, FundingPlanWhereInput>
    patent?: XOR<PatentScalarRelationFilter, PatentWhereInput>
  }, "FundingID">

  export type PatentFundingOrderByWithAggregationInput = {
    FundingID?: SortOrder
    PatentID?: SortOrder
    FundingAgency?: SortOrder
    ProjectNumber?: SortOrder
    PlanID?: SortOrder
    _count?: PatentFundingCountOrderByAggregateInput
    _avg?: PatentFundingAvgOrderByAggregateInput
    _max?: PatentFundingMaxOrderByAggregateInput
    _min?: PatentFundingMinOrderByAggregateInput
    _sum?: PatentFundingSumOrderByAggregateInput
  }

  export type PatentFundingScalarWhereWithAggregatesInput = {
    AND?: PatentFundingScalarWhereWithAggregatesInput | PatentFundingScalarWhereWithAggregatesInput[]
    OR?: PatentFundingScalarWhereWithAggregatesInput[]
    NOT?: PatentFundingScalarWhereWithAggregatesInput | PatentFundingScalarWhereWithAggregatesInput[]
    FundingID?: IntWithAggregatesFilter<"PatentFunding"> | number
    PatentID?: IntWithAggregatesFilter<"PatentFunding"> | number
    FundingAgency?: StringWithAggregatesFilter<"PatentFunding"> | string
    ProjectNumber?: StringWithAggregatesFilter<"PatentFunding"> | string
    PlanID?: IntWithAggregatesFilter<"PatentFunding"> | number
  }

  export type InventorWhereInput = {
    AND?: InventorWhereInput | InventorWhereInput[]
    OR?: InventorWhereInput[]
    NOT?: InventorWhereInput | InventorWhereInput[]
    InventorID?: IntFilter<"Inventor"> | number
    Name?: StringFilter<"Inventor"> | string
    Department?: IntFilter<"Inventor"> | number
    Email?: StringNullableFilter<"Inventor"> | string | null
    ContactInfoID?: IntNullableFilter<"Inventor"> | number | null
    contactInfo?: XOR<ContactInfoNullableScalarRelationFilter, ContactInfoWhereInput> | null
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
    patents?: PatentInventorListRelationFilter
  }

  export type InventorOrderByWithRelationInput = {
    InventorID?: SortOrder
    Name?: SortOrder
    Department?: SortOrder
    Email?: SortOrderInput | SortOrder
    ContactInfoID?: SortOrderInput | SortOrder
    contactInfo?: ContactInfoOrderByWithRelationInput
    department?: DepartmentOrderByWithRelationInput
    patents?: PatentInventorOrderByRelationAggregateInput
  }

  export type InventorWhereUniqueInput = Prisma.AtLeast<{
    InventorID?: number
    ContactInfoID?: number
    AND?: InventorWhereInput | InventorWhereInput[]
    OR?: InventorWhereInput[]
    NOT?: InventorWhereInput | InventorWhereInput[]
    Name?: StringFilter<"Inventor"> | string
    Department?: IntFilter<"Inventor"> | number
    Email?: StringNullableFilter<"Inventor"> | string | null
    contactInfo?: XOR<ContactInfoNullableScalarRelationFilter, ContactInfoWhereInput> | null
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
    patents?: PatentInventorListRelationFilter
  }, "InventorID" | "ContactInfoID">

  export type InventorOrderByWithAggregationInput = {
    InventorID?: SortOrder
    Name?: SortOrder
    Department?: SortOrder
    Email?: SortOrderInput | SortOrder
    ContactInfoID?: SortOrderInput | SortOrder
    _count?: InventorCountOrderByAggregateInput
    _avg?: InventorAvgOrderByAggregateInput
    _max?: InventorMaxOrderByAggregateInput
    _min?: InventorMinOrderByAggregateInput
    _sum?: InventorSumOrderByAggregateInput
  }

  export type InventorScalarWhereWithAggregatesInput = {
    AND?: InventorScalarWhereWithAggregatesInput | InventorScalarWhereWithAggregatesInput[]
    OR?: InventorScalarWhereWithAggregatesInput[]
    NOT?: InventorScalarWhereWithAggregatesInput | InventorScalarWhereWithAggregatesInput[]
    InventorID?: IntWithAggregatesFilter<"Inventor"> | number
    Name?: StringWithAggregatesFilter<"Inventor"> | string
    Department?: IntWithAggregatesFilter<"Inventor"> | number
    Email?: StringNullableWithAggregatesFilter<"Inventor"> | string | null
    ContactInfoID?: IntNullableWithAggregatesFilter<"Inventor"> | number | null
  }

  export type PatentInventorWhereInput = {
    AND?: PatentInventorWhereInput | PatentInventorWhereInput[]
    OR?: PatentInventorWhereInput[]
    NOT?: PatentInventorWhereInput | PatentInventorWhereInput[]
    PatentID?: IntFilter<"PatentInventor"> | number
    InventorID?: IntFilter<"PatentInventor"> | number
    Main?: BoolFilter<"PatentInventor"> | boolean
    inventor?: XOR<InventorScalarRelationFilter, InventorWhereInput>
    patent?: XOR<PatentScalarRelationFilter, PatentWhereInput>
  }

  export type PatentInventorOrderByWithRelationInput = {
    PatentID?: SortOrder
    InventorID?: SortOrder
    Main?: SortOrder
    inventor?: InventorOrderByWithRelationInput
    patent?: PatentOrderByWithRelationInput
  }

  export type PatentInventorWhereUniqueInput = Prisma.AtLeast<{
    PatentID_InventorID?: PatentInventorPatentIDInventorIDCompoundUniqueInput
    AND?: PatentInventorWhereInput | PatentInventorWhereInput[]
    OR?: PatentInventorWhereInput[]
    NOT?: PatentInventorWhereInput | PatentInventorWhereInput[]
    PatentID?: IntFilter<"PatentInventor"> | number
    InventorID?: IntFilter<"PatentInventor"> | number
    Main?: BoolFilter<"PatentInventor"> | boolean
    inventor?: XOR<InventorScalarRelationFilter, InventorWhereInput>
    patent?: XOR<PatentScalarRelationFilter, PatentWhereInput>
  }, "PatentID_InventorID">

  export type PatentInventorOrderByWithAggregationInput = {
    PatentID?: SortOrder
    InventorID?: SortOrder
    Main?: SortOrder
    _count?: PatentInventorCountOrderByAggregateInput
    _avg?: PatentInventorAvgOrderByAggregateInput
    _max?: PatentInventorMaxOrderByAggregateInput
    _min?: PatentInventorMinOrderByAggregateInput
    _sum?: PatentInventorSumOrderByAggregateInput
  }

  export type PatentInventorScalarWhereWithAggregatesInput = {
    AND?: PatentInventorScalarWhereWithAggregatesInput | PatentInventorScalarWhereWithAggregatesInput[]
    OR?: PatentInventorScalarWhereWithAggregatesInput[]
    NOT?: PatentInventorScalarWhereWithAggregatesInput | PatentInventorScalarWhereWithAggregatesInput[]
    PatentID?: IntWithAggregatesFilter<"PatentInventor"> | number
    InventorID?: IntWithAggregatesFilter<"PatentInventor"> | number
    Main?: BoolWithAggregatesFilter<"PatentInventor"> | boolean
  }

  export type PatentWhereInput = {
    AND?: PatentWhereInput | PatentWhereInput[]
    OR?: PatentWhereInput[]
    NOT?: PatentWhereInput | PatentWhereInput[]
    PatentID?: IntFilter<"Patent"> | number
    Year?: StringFilter<"Patent"> | string
    InternalID?: StringFilter<"Patent"> | string
    Title?: StringFilter<"Patent"> | string
    DepartmentID?: IntFilter<"Patent"> | number
    CollegeID?: IntFilter<"Patent"> | number
    TitleEnglish?: StringNullableFilter<"Patent"> | string | null
    agencies?: AgencyPatentListRelationFilter
    college?: XOR<CollegeScalarRelationFilter, CollegeWhereInput>
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
    application?: XOR<PatentApplicationDataNullableScalarRelationFilter, PatentApplicationDataWhereInput> | null
    funding?: PatentFundingListRelationFilter
    inventors?: PatentInventorListRelationFilter
    status?: XOR<PatentStatusNullableScalarRelationFilter, PatentStatusWhereInput> | null
    technical?: XOR<PatentTechnicalAttributesNullableScalarRelationFilter, PatentTechnicalAttributesWhereInput> | null
  }

  export type PatentOrderByWithRelationInput = {
    PatentID?: SortOrder
    Year?: SortOrder
    InternalID?: SortOrder
    Title?: SortOrder
    DepartmentID?: SortOrder
    CollegeID?: SortOrder
    TitleEnglish?: SortOrderInput | SortOrder
    agencies?: AgencyPatentOrderByRelationAggregateInput
    college?: CollegeOrderByWithRelationInput
    department?: DepartmentOrderByWithRelationInput
    application?: PatentApplicationDataOrderByWithRelationInput
    funding?: PatentFundingOrderByRelationAggregateInput
    inventors?: PatentInventorOrderByRelationAggregateInput
    status?: PatentStatusOrderByWithRelationInput
    technical?: PatentTechnicalAttributesOrderByWithRelationInput
  }

  export type PatentWhereUniqueInput = Prisma.AtLeast<{
    PatentID?: number
    AND?: PatentWhereInput | PatentWhereInput[]
    OR?: PatentWhereInput[]
    NOT?: PatentWhereInput | PatentWhereInput[]
    Year?: StringFilter<"Patent"> | string
    InternalID?: StringFilter<"Patent"> | string
    Title?: StringFilter<"Patent"> | string
    DepartmentID?: IntFilter<"Patent"> | number
    CollegeID?: IntFilter<"Patent"> | number
    TitleEnglish?: StringNullableFilter<"Patent"> | string | null
    agencies?: AgencyPatentListRelationFilter
    college?: XOR<CollegeScalarRelationFilter, CollegeWhereInput>
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
    application?: XOR<PatentApplicationDataNullableScalarRelationFilter, PatentApplicationDataWhereInput> | null
    funding?: PatentFundingListRelationFilter
    inventors?: PatentInventorListRelationFilter
    status?: XOR<PatentStatusNullableScalarRelationFilter, PatentStatusWhereInput> | null
    technical?: XOR<PatentTechnicalAttributesNullableScalarRelationFilter, PatentTechnicalAttributesWhereInput> | null
  }, "PatentID">

  export type PatentOrderByWithAggregationInput = {
    PatentID?: SortOrder
    Year?: SortOrder
    InternalID?: SortOrder
    Title?: SortOrder
    DepartmentID?: SortOrder
    CollegeID?: SortOrder
    TitleEnglish?: SortOrderInput | SortOrder
    _count?: PatentCountOrderByAggregateInput
    _avg?: PatentAvgOrderByAggregateInput
    _max?: PatentMaxOrderByAggregateInput
    _min?: PatentMinOrderByAggregateInput
    _sum?: PatentSumOrderByAggregateInput
  }

  export type PatentScalarWhereWithAggregatesInput = {
    AND?: PatentScalarWhereWithAggregatesInput | PatentScalarWhereWithAggregatesInput[]
    OR?: PatentScalarWhereWithAggregatesInput[]
    NOT?: PatentScalarWhereWithAggregatesInput | PatentScalarWhereWithAggregatesInput[]
    PatentID?: IntWithAggregatesFilter<"Patent"> | number
    Year?: StringWithAggregatesFilter<"Patent"> | string
    InternalID?: StringWithAggregatesFilter<"Patent"> | string
    Title?: StringWithAggregatesFilter<"Patent"> | string
    DepartmentID?: IntWithAggregatesFilter<"Patent"> | number
    CollegeID?: IntWithAggregatesFilter<"Patent"> | number
    TitleEnglish?: StringNullableWithAggregatesFilter<"Patent"> | string | null
  }

  export type PatentStatusWhereInput = {
    AND?: PatentStatusWhereInput | PatentStatusWhereInput[]
    OR?: PatentStatusWhereInput[]
    NOT?: PatentStatusWhereInput | PatentStatusWhereInput[]
    PatentID?: IntFilter<"PatentStatus"> | number
    ExpiryDate?: DateTimeNullableFilter<"PatentStatus"> | Date | string | null
    Status?: StringFilter<"PatentStatus"> | string
    TechnicalCommitteeReviewDate?: DateTimeNullableFilter<"PatentStatus"> | Date | string | null
    MaintenanceYear?: IntNullableFilter<"PatentStatus"> | number | null
    MaintenanceStartDate?: DateTimeNullableFilter<"PatentStatus"> | Date | string | null
    MaintenanceEndDate?: DateTimeNullableFilter<"PatentStatus"> | Date | string | null
    patent?: XOR<PatentScalarRelationFilter, PatentWhereInput>
  }

  export type PatentStatusOrderByWithRelationInput = {
    PatentID?: SortOrder
    ExpiryDate?: SortOrderInput | SortOrder
    Status?: SortOrder
    TechnicalCommitteeReviewDate?: SortOrderInput | SortOrder
    MaintenanceYear?: SortOrderInput | SortOrder
    MaintenanceStartDate?: SortOrderInput | SortOrder
    MaintenanceEndDate?: SortOrderInput | SortOrder
    patent?: PatentOrderByWithRelationInput
  }

  export type PatentStatusWhereUniqueInput = Prisma.AtLeast<{
    PatentID?: number
    AND?: PatentStatusWhereInput | PatentStatusWhereInput[]
    OR?: PatentStatusWhereInput[]
    NOT?: PatentStatusWhereInput | PatentStatusWhereInput[]
    ExpiryDate?: DateTimeNullableFilter<"PatentStatus"> | Date | string | null
    Status?: StringFilter<"PatentStatus"> | string
    TechnicalCommitteeReviewDate?: DateTimeNullableFilter<"PatentStatus"> | Date | string | null
    MaintenanceYear?: IntNullableFilter<"PatentStatus"> | number | null
    MaintenanceStartDate?: DateTimeNullableFilter<"PatentStatus"> | Date | string | null
    MaintenanceEndDate?: DateTimeNullableFilter<"PatentStatus"> | Date | string | null
    patent?: XOR<PatentScalarRelationFilter, PatentWhereInput>
  }, "PatentID">

  export type PatentStatusOrderByWithAggregationInput = {
    PatentID?: SortOrder
    ExpiryDate?: SortOrderInput | SortOrder
    Status?: SortOrder
    TechnicalCommitteeReviewDate?: SortOrderInput | SortOrder
    MaintenanceYear?: SortOrderInput | SortOrder
    MaintenanceStartDate?: SortOrderInput | SortOrder
    MaintenanceEndDate?: SortOrderInput | SortOrder
    _count?: PatentStatusCountOrderByAggregateInput
    _avg?: PatentStatusAvgOrderByAggregateInput
    _max?: PatentStatusMaxOrderByAggregateInput
    _min?: PatentStatusMinOrderByAggregateInput
    _sum?: PatentStatusSumOrderByAggregateInput
  }

  export type PatentStatusScalarWhereWithAggregatesInput = {
    AND?: PatentStatusScalarWhereWithAggregatesInput | PatentStatusScalarWhereWithAggregatesInput[]
    OR?: PatentStatusScalarWhereWithAggregatesInput[]
    NOT?: PatentStatusScalarWhereWithAggregatesInput | PatentStatusScalarWhereWithAggregatesInput[]
    PatentID?: IntWithAggregatesFilter<"PatentStatus"> | number
    ExpiryDate?: DateTimeNullableWithAggregatesFilter<"PatentStatus"> | Date | string | null
    Status?: StringWithAggregatesFilter<"PatentStatus"> | string
    TechnicalCommitteeReviewDate?: DateTimeNullableWithAggregatesFilter<"PatentStatus"> | Date | string | null
    MaintenanceYear?: IntNullableWithAggregatesFilter<"PatentStatus"> | number | null
    MaintenanceStartDate?: DateTimeNullableWithAggregatesFilter<"PatentStatus"> | Date | string | null
    MaintenanceEndDate?: DateTimeNullableWithAggregatesFilter<"PatentStatus"> | Date | string | null
  }

  export type PatentApplicationDataWhereInput = {
    AND?: PatentApplicationDataWhereInput | PatentApplicationDataWhereInput[]
    OR?: PatentApplicationDataWhereInput[]
    NOT?: PatentApplicationDataWhereInput | PatentApplicationDataWhereInput[]
    PatentID?: IntFilter<"PatentApplicationData"> | number
    CountryID?: IntFilter<"PatentApplicationData"> | number
    PatentNumber?: StringFilter<"PatentApplicationData"> | string
    FilingDate?: DateTimeNullableFilter<"PatentApplicationData"> | Date | string | null
    GrantDate?: DateTimeNullableFilter<"PatentApplicationData"> | Date | string | null
    PatentType?: StringFilter<"PatentApplicationData"> | string
    ApplicationNumber?: StringFilter<"PatentApplicationData"> | string
    patent?: XOR<PatentScalarRelationFilter, PatentWhereInput>
    country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
  }

  export type PatentApplicationDataOrderByWithRelationInput = {
    PatentID?: SortOrder
    CountryID?: SortOrder
    PatentNumber?: SortOrder
    FilingDate?: SortOrderInput | SortOrder
    GrantDate?: SortOrderInput | SortOrder
    PatentType?: SortOrder
    ApplicationNumber?: SortOrder
    patent?: PatentOrderByWithRelationInput
    country?: CountryOrderByWithRelationInput
  }

  export type PatentApplicationDataWhereUniqueInput = Prisma.AtLeast<{
    PatentID?: number
    AND?: PatentApplicationDataWhereInput | PatentApplicationDataWhereInput[]
    OR?: PatentApplicationDataWhereInput[]
    NOT?: PatentApplicationDataWhereInput | PatentApplicationDataWhereInput[]
    CountryID?: IntFilter<"PatentApplicationData"> | number
    PatentNumber?: StringFilter<"PatentApplicationData"> | string
    FilingDate?: DateTimeNullableFilter<"PatentApplicationData"> | Date | string | null
    GrantDate?: DateTimeNullableFilter<"PatentApplicationData"> | Date | string | null
    PatentType?: StringFilter<"PatentApplicationData"> | string
    ApplicationNumber?: StringFilter<"PatentApplicationData"> | string
    patent?: XOR<PatentScalarRelationFilter, PatentWhereInput>
    country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
  }, "PatentID">

  export type PatentApplicationDataOrderByWithAggregationInput = {
    PatentID?: SortOrder
    CountryID?: SortOrder
    PatentNumber?: SortOrder
    FilingDate?: SortOrderInput | SortOrder
    GrantDate?: SortOrderInput | SortOrder
    PatentType?: SortOrder
    ApplicationNumber?: SortOrder
    _count?: PatentApplicationDataCountOrderByAggregateInput
    _avg?: PatentApplicationDataAvgOrderByAggregateInput
    _max?: PatentApplicationDataMaxOrderByAggregateInput
    _min?: PatentApplicationDataMinOrderByAggregateInput
    _sum?: PatentApplicationDataSumOrderByAggregateInput
  }

  export type PatentApplicationDataScalarWhereWithAggregatesInput = {
    AND?: PatentApplicationDataScalarWhereWithAggregatesInput | PatentApplicationDataScalarWhereWithAggregatesInput[]
    OR?: PatentApplicationDataScalarWhereWithAggregatesInput[]
    NOT?: PatentApplicationDataScalarWhereWithAggregatesInput | PatentApplicationDataScalarWhereWithAggregatesInput[]
    PatentID?: IntWithAggregatesFilter<"PatentApplicationData"> | number
    CountryID?: IntWithAggregatesFilter<"PatentApplicationData"> | number
    PatentNumber?: StringWithAggregatesFilter<"PatentApplicationData"> | string
    FilingDate?: DateTimeNullableWithAggregatesFilter<"PatentApplicationData"> | Date | string | null
    GrantDate?: DateTimeNullableWithAggregatesFilter<"PatentApplicationData"> | Date | string | null
    PatentType?: StringWithAggregatesFilter<"PatentApplicationData"> | string
    ApplicationNumber?: StringWithAggregatesFilter<"PatentApplicationData"> | string
  }

  export type PatentTechnicalAttributesWhereInput = {
    AND?: PatentTechnicalAttributesWhereInput | PatentTechnicalAttributesWhereInput[]
    OR?: PatentTechnicalAttributesWhereInput[]
    NOT?: PatentTechnicalAttributesWhereInput | PatentTechnicalAttributesWhereInput[]
    PatentID?: IntFilter<"PatentTechnicalAttributes"> | number
    IPC?: StringFilter<"PatentTechnicalAttributes"> | string
    Scope?: StringFilter<"PatentTechnicalAttributes"> | string
    MaturityLevel?: StringFilter<"PatentTechnicalAttributes"> | string
    Keywords?: StringFilter<"PatentTechnicalAttributes"> | string
    patent?: XOR<PatentScalarRelationFilter, PatentWhereInput>
  }

  export type PatentTechnicalAttributesOrderByWithRelationInput = {
    PatentID?: SortOrder
    IPC?: SortOrder
    Scope?: SortOrder
    MaturityLevel?: SortOrder
    Keywords?: SortOrder
    patent?: PatentOrderByWithRelationInput
  }

  export type PatentTechnicalAttributesWhereUniqueInput = Prisma.AtLeast<{
    PatentID?: number
    AND?: PatentTechnicalAttributesWhereInput | PatentTechnicalAttributesWhereInput[]
    OR?: PatentTechnicalAttributesWhereInput[]
    NOT?: PatentTechnicalAttributesWhereInput | PatentTechnicalAttributesWhereInput[]
    IPC?: StringFilter<"PatentTechnicalAttributes"> | string
    Scope?: StringFilter<"PatentTechnicalAttributes"> | string
    MaturityLevel?: StringFilter<"PatentTechnicalAttributes"> | string
    Keywords?: StringFilter<"PatentTechnicalAttributes"> | string
    patent?: XOR<PatentScalarRelationFilter, PatentWhereInput>
  }, "PatentID">

  export type PatentTechnicalAttributesOrderByWithAggregationInput = {
    PatentID?: SortOrder
    IPC?: SortOrder
    Scope?: SortOrder
    MaturityLevel?: SortOrder
    Keywords?: SortOrder
    _count?: PatentTechnicalAttributesCountOrderByAggregateInput
    _avg?: PatentTechnicalAttributesAvgOrderByAggregateInput
    _max?: PatentTechnicalAttributesMaxOrderByAggregateInput
    _min?: PatentTechnicalAttributesMinOrderByAggregateInput
    _sum?: PatentTechnicalAttributesSumOrderByAggregateInput
  }

  export type PatentTechnicalAttributesScalarWhereWithAggregatesInput = {
    AND?: PatentTechnicalAttributesScalarWhereWithAggregatesInput | PatentTechnicalAttributesScalarWhereWithAggregatesInput[]
    OR?: PatentTechnicalAttributesScalarWhereWithAggregatesInput[]
    NOT?: PatentTechnicalAttributesScalarWhereWithAggregatesInput | PatentTechnicalAttributesScalarWhereWithAggregatesInput[]
    PatentID?: IntWithAggregatesFilter<"PatentTechnicalAttributes"> | number
    IPC?: StringWithAggregatesFilter<"PatentTechnicalAttributes"> | string
    Scope?: StringWithAggregatesFilter<"PatentTechnicalAttributes"> | string
    MaturityLevel?: StringWithAggregatesFilter<"PatentTechnicalAttributes"> | string
    Keywords?: StringWithAggregatesFilter<"PatentTechnicalAttributes"> | string
  }

  export type CollegeWhereInput = {
    AND?: CollegeWhereInput | CollegeWhereInput[]
    OR?: CollegeWhereInput[]
    NOT?: CollegeWhereInput | CollegeWhereInput[]
    CollegeID?: IntFilter<"College"> | number
    Name?: StringFilter<"College"> | string
    Description?: StringNullableFilter<"College"> | string | null
    departments?: DepartmentListRelationFilter
    patents?: PatentListRelationFilter
  }

  export type CollegeOrderByWithRelationInput = {
    CollegeID?: SortOrder
    Name?: SortOrder
    Description?: SortOrderInput | SortOrder
    departments?: DepartmentOrderByRelationAggregateInput
    patents?: PatentOrderByRelationAggregateInput
  }

  export type CollegeWhereUniqueInput = Prisma.AtLeast<{
    CollegeID?: number
    AND?: CollegeWhereInput | CollegeWhereInput[]
    OR?: CollegeWhereInput[]
    NOT?: CollegeWhereInput | CollegeWhereInput[]
    Name?: StringFilter<"College"> | string
    Description?: StringNullableFilter<"College"> | string | null
    departments?: DepartmentListRelationFilter
    patents?: PatentListRelationFilter
  }, "CollegeID">

  export type CollegeOrderByWithAggregationInput = {
    CollegeID?: SortOrder
    Name?: SortOrder
    Description?: SortOrderInput | SortOrder
    _count?: CollegeCountOrderByAggregateInput
    _avg?: CollegeAvgOrderByAggregateInput
    _max?: CollegeMaxOrderByAggregateInput
    _min?: CollegeMinOrderByAggregateInput
    _sum?: CollegeSumOrderByAggregateInput
  }

  export type CollegeScalarWhereWithAggregatesInput = {
    AND?: CollegeScalarWhereWithAggregatesInput | CollegeScalarWhereWithAggregatesInput[]
    OR?: CollegeScalarWhereWithAggregatesInput[]
    NOT?: CollegeScalarWhereWithAggregatesInput | CollegeScalarWhereWithAggregatesInput[]
    CollegeID?: IntWithAggregatesFilter<"College"> | number
    Name?: StringWithAggregatesFilter<"College"> | string
    Description?: StringNullableWithAggregatesFilter<"College"> | string | null
  }

  export type DepartmentWhereInput = {
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    DepartmentID?: IntFilter<"Department"> | number
    Name?: StringFilter<"Department"> | string
    CollegeID?: IntFilter<"Department"> | number
    Description?: StringNullableFilter<"Department"> | string | null
    college?: XOR<CollegeScalarRelationFilter, CollegeWhereInput>
    inventors?: InventorListRelationFilter
    patents?: PatentListRelationFilter
  }

  export type DepartmentOrderByWithRelationInput = {
    DepartmentID?: SortOrder
    Name?: SortOrder
    CollegeID?: SortOrder
    Description?: SortOrderInput | SortOrder
    college?: CollegeOrderByWithRelationInput
    inventors?: InventorOrderByRelationAggregateInput
    patents?: PatentOrderByRelationAggregateInput
  }

  export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
    DepartmentID?: number
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    Name?: StringFilter<"Department"> | string
    CollegeID?: IntFilter<"Department"> | number
    Description?: StringNullableFilter<"Department"> | string | null
    college?: XOR<CollegeScalarRelationFilter, CollegeWhereInput>
    inventors?: InventorListRelationFilter
    patents?: PatentListRelationFilter
  }, "DepartmentID">

  export type DepartmentOrderByWithAggregationInput = {
    DepartmentID?: SortOrder
    Name?: SortOrder
    CollegeID?: SortOrder
    Description?: SortOrderInput | SortOrder
    _count?: DepartmentCountOrderByAggregateInput
    _avg?: DepartmentAvgOrderByAggregateInput
    _max?: DepartmentMaxOrderByAggregateInput
    _min?: DepartmentMinOrderByAggregateInput
    _sum?: DepartmentSumOrderByAggregateInput
  }

  export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    OR?: DepartmentScalarWhereWithAggregatesInput[]
    NOT?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    DepartmentID?: IntWithAggregatesFilter<"Department"> | number
    Name?: StringWithAggregatesFilter<"Department"> | string
    CollegeID?: IntWithAggregatesFilter<"Department"> | number
    Description?: StringNullableWithAggregatesFilter<"Department"> | string | null
  }

  export type CountryWhereInput = {
    AND?: CountryWhereInput | CountryWhereInput[]
    OR?: CountryWhereInput[]
    NOT?: CountryWhereInput | CountryWhereInput[]
    CountryID?: IntFilter<"Country"> | number
    CountryName?: StringFilter<"Country"> | string
    ISOCode?: StringFilter<"Country"> | string
    applications?: PatentApplicationDataListRelationFilter
  }

  export type CountryOrderByWithRelationInput = {
    CountryID?: SortOrder
    CountryName?: SortOrder
    ISOCode?: SortOrder
    applications?: PatentApplicationDataOrderByRelationAggregateInput
  }

  export type CountryWhereUniqueInput = Prisma.AtLeast<{
    CountryID?: number
    AND?: CountryWhereInput | CountryWhereInput[]
    OR?: CountryWhereInput[]
    NOT?: CountryWhereInput | CountryWhereInput[]
    CountryName?: StringFilter<"Country"> | string
    ISOCode?: StringFilter<"Country"> | string
    applications?: PatentApplicationDataListRelationFilter
  }, "CountryID">

  export type CountryOrderByWithAggregationInput = {
    CountryID?: SortOrder
    CountryName?: SortOrder
    ISOCode?: SortOrder
    _count?: CountryCountOrderByAggregateInput
    _avg?: CountryAvgOrderByAggregateInput
    _max?: CountryMaxOrderByAggregateInput
    _min?: CountryMinOrderByAggregateInput
    _sum?: CountrySumOrderByAggregateInput
  }

  export type CountryScalarWhereWithAggregatesInput = {
    AND?: CountryScalarWhereWithAggregatesInput | CountryScalarWhereWithAggregatesInput[]
    OR?: CountryScalarWhereWithAggregatesInput[]
    NOT?: CountryScalarWhereWithAggregatesInput | CountryScalarWhereWithAggregatesInput[]
    CountryID?: IntWithAggregatesFilter<"Country"> | number
    CountryName?: StringWithAggregatesFilter<"Country"> | string
    ISOCode?: StringWithAggregatesFilter<"Country"> | string
  }

  export type ContactInfoWhereInput = {
    AND?: ContactInfoWhereInput | ContactInfoWhereInput[]
    OR?: ContactInfoWhereInput[]
    NOT?: ContactInfoWhereInput | ContactInfoWhereInput[]
    ContactInfoID?: IntFilter<"ContactInfo"> | number
    Name?: StringFilter<"ContactInfo"> | string
    Email?: StringFilter<"ContactInfo"> | string
    OfficeNumber?: StringNullableFilter<"ContactInfo"> | string | null
    PhoneNumber?: StringNullableFilter<"ContactInfo"> | string | null
    Position?: StringNullableFilter<"ContactInfo"> | string | null
    Note?: StringNullableFilter<"ContactInfo"> | string | null
    agencyContact?: XOR<AgencyContactPersonNullableScalarRelationFilter, AgencyContactPersonWhereInput> | null
    inventor?: XOR<InventorNullableScalarRelationFilter, InventorWhereInput> | null
  }

  export type ContactInfoOrderByWithRelationInput = {
    ContactInfoID?: SortOrder
    Name?: SortOrder
    Email?: SortOrder
    OfficeNumber?: SortOrderInput | SortOrder
    PhoneNumber?: SortOrderInput | SortOrder
    Position?: SortOrderInput | SortOrder
    Note?: SortOrderInput | SortOrder
    agencyContact?: AgencyContactPersonOrderByWithRelationInput
    inventor?: InventorOrderByWithRelationInput
  }

  export type ContactInfoWhereUniqueInput = Prisma.AtLeast<{
    ContactInfoID?: number
    AND?: ContactInfoWhereInput | ContactInfoWhereInput[]
    OR?: ContactInfoWhereInput[]
    NOT?: ContactInfoWhereInput | ContactInfoWhereInput[]
    Name?: StringFilter<"ContactInfo"> | string
    Email?: StringFilter<"ContactInfo"> | string
    OfficeNumber?: StringNullableFilter<"ContactInfo"> | string | null
    PhoneNumber?: StringNullableFilter<"ContactInfo"> | string | null
    Position?: StringNullableFilter<"ContactInfo"> | string | null
    Note?: StringNullableFilter<"ContactInfo"> | string | null
    agencyContact?: XOR<AgencyContactPersonNullableScalarRelationFilter, AgencyContactPersonWhereInput> | null
    inventor?: XOR<InventorNullableScalarRelationFilter, InventorWhereInput> | null
  }, "ContactInfoID">

  export type ContactInfoOrderByWithAggregationInput = {
    ContactInfoID?: SortOrder
    Name?: SortOrder
    Email?: SortOrder
    OfficeNumber?: SortOrderInput | SortOrder
    PhoneNumber?: SortOrderInput | SortOrder
    Position?: SortOrderInput | SortOrder
    Note?: SortOrderInput | SortOrder
    _count?: ContactInfoCountOrderByAggregateInput
    _avg?: ContactInfoAvgOrderByAggregateInput
    _max?: ContactInfoMaxOrderByAggregateInput
    _min?: ContactInfoMinOrderByAggregateInput
    _sum?: ContactInfoSumOrderByAggregateInput
  }

  export type ContactInfoScalarWhereWithAggregatesInput = {
    AND?: ContactInfoScalarWhereWithAggregatesInput | ContactInfoScalarWhereWithAggregatesInput[]
    OR?: ContactInfoScalarWhereWithAggregatesInput[]
    NOT?: ContactInfoScalarWhereWithAggregatesInput | ContactInfoScalarWhereWithAggregatesInput[]
    ContactInfoID?: IntWithAggregatesFilter<"ContactInfo"> | number
    Name?: StringWithAggregatesFilter<"ContactInfo"> | string
    Email?: StringWithAggregatesFilter<"ContactInfo"> | string
    OfficeNumber?: StringNullableWithAggregatesFilter<"ContactInfo"> | string | null
    PhoneNumber?: StringNullableWithAggregatesFilter<"ContactInfo"> | string | null
    Position?: StringNullableWithAggregatesFilter<"ContactInfo"> | string | null
    Note?: StringNullableWithAggregatesFilter<"ContactInfo"> | string | null
  }

  export type AgencyCreateInput = {
    Name: string
    contacts?: AgencyContactPersonCreateNestedManyWithoutAgencyInput
    patents?: AgencyPatentCreateNestedManyWithoutAgencyInput
  }

  export type AgencyUncheckedCreateInput = {
    AgencyID?: number
    Name: string
    contacts?: AgencyContactPersonUncheckedCreateNestedManyWithoutAgencyInput
    patents?: AgencyPatentUncheckedCreateNestedManyWithoutAgencyInput
  }

  export type AgencyUpdateInput = {
    Name?: StringFieldUpdateOperationsInput | string
    contacts?: AgencyContactPersonUpdateManyWithoutAgencyNestedInput
    patents?: AgencyPatentUpdateManyWithoutAgencyNestedInput
  }

  export type AgencyUncheckedUpdateInput = {
    AgencyID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    contacts?: AgencyContactPersonUncheckedUpdateManyWithoutAgencyNestedInput
    patents?: AgencyPatentUncheckedUpdateManyWithoutAgencyNestedInput
  }

  export type AgencyCreateManyInput = {
    AgencyID?: number
    Name: string
  }

  export type AgencyUpdateManyMutationInput = {
    Name?: StringFieldUpdateOperationsInput | string
  }

  export type AgencyUncheckedUpdateManyInput = {
    AgencyID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
  }

  export type AgencyPatentCreateInput = {
    FileCode: string
    Role: string
    Details?: string | null
    agency: AgencyCreateNestedOneWithoutPatentsInput
    patent: PatentCreateNestedOneWithoutAgenciesInput
  }

  export type AgencyPatentUncheckedCreateInput = {
    PatentID: number
    AgencyID: number
    FileCode: string
    Role: string
    Details?: string | null
  }

  export type AgencyPatentUpdateInput = {
    FileCode?: StringFieldUpdateOperationsInput | string
    Role?: StringFieldUpdateOperationsInput | string
    Details?: NullableStringFieldUpdateOperationsInput | string | null
    agency?: AgencyUpdateOneRequiredWithoutPatentsNestedInput
    patent?: PatentUpdateOneRequiredWithoutAgenciesNestedInput
  }

  export type AgencyPatentUncheckedUpdateInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    AgencyID?: IntFieldUpdateOperationsInput | number
    FileCode?: StringFieldUpdateOperationsInput | string
    Role?: StringFieldUpdateOperationsInput | string
    Details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgencyPatentCreateManyInput = {
    PatentID: number
    AgencyID: number
    FileCode: string
    Role: string
    Details?: string | null
  }

  export type AgencyPatentUpdateManyMutationInput = {
    FileCode?: StringFieldUpdateOperationsInput | string
    Role?: StringFieldUpdateOperationsInput | string
    Details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgencyPatentUncheckedUpdateManyInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    AgencyID?: IntFieldUpdateOperationsInput | number
    FileCode?: StringFieldUpdateOperationsInput | string
    Role?: StringFieldUpdateOperationsInput | string
    Details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgencyContactPersonCreateInput = {
    Position: string
    contactInfo?: ContactInfoCreateNestedOneWithoutAgencyContactInput
    agency: AgencyCreateNestedOneWithoutContactsInput
  }

  export type AgencyContactPersonUncheckedCreateInput = {
    ContactPersonID?: number
    AgencyID: number
    Position: string
    ContactInfoID?: number | null
  }

  export type AgencyContactPersonUpdateInput = {
    Position?: StringFieldUpdateOperationsInput | string
    contactInfo?: ContactInfoUpdateOneWithoutAgencyContactNestedInput
    agency?: AgencyUpdateOneRequiredWithoutContactsNestedInput
  }

  export type AgencyContactPersonUncheckedUpdateInput = {
    ContactPersonID?: IntFieldUpdateOperationsInput | number
    AgencyID?: IntFieldUpdateOperationsInput | number
    Position?: StringFieldUpdateOperationsInput | string
    ContactInfoID?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AgencyContactPersonCreateManyInput = {
    ContactPersonID?: number
    AgencyID: number
    Position: string
    ContactInfoID?: number | null
  }

  export type AgencyContactPersonUpdateManyMutationInput = {
    Position?: StringFieldUpdateOperationsInput | string
  }

  export type AgencyContactPersonUncheckedUpdateManyInput = {
    ContactPersonID?: IntFieldUpdateOperationsInput | number
    AgencyID?: IntFieldUpdateOperationsInput | number
    Position?: StringFieldUpdateOperationsInput | string
    ContactInfoID?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FundingPlanCreateInput = {
    PlanType: number
    fundings?: PatentFundingCreateNestedManyWithoutPlanInput
  }

  export type FundingPlanUncheckedCreateInput = {
    PlanID?: number
    PlanType: number
    fundings?: PatentFundingUncheckedCreateNestedManyWithoutPlanInput
  }

  export type FundingPlanUpdateInput = {
    PlanType?: IntFieldUpdateOperationsInput | number
    fundings?: PatentFundingUpdateManyWithoutPlanNestedInput
  }

  export type FundingPlanUncheckedUpdateInput = {
    PlanID?: IntFieldUpdateOperationsInput | number
    PlanType?: IntFieldUpdateOperationsInput | number
    fundings?: PatentFundingUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type FundingPlanCreateManyInput = {
    PlanID?: number
    PlanType: number
  }

  export type FundingPlanUpdateManyMutationInput = {
    PlanType?: IntFieldUpdateOperationsInput | number
  }

  export type FundingPlanUncheckedUpdateManyInput = {
    PlanID?: IntFieldUpdateOperationsInput | number
    PlanType?: IntFieldUpdateOperationsInput | number
  }

  export type PatentFundingCreateInput = {
    FundingAgency: string
    ProjectNumber: string
    plan: FundingPlanCreateNestedOneWithoutFundingsInput
    patent: PatentCreateNestedOneWithoutFundingInput
  }

  export type PatentFundingUncheckedCreateInput = {
    FundingID?: number
    PatentID: number
    FundingAgency: string
    ProjectNumber: string
    PlanID: number
  }

  export type PatentFundingUpdateInput = {
    FundingAgency?: StringFieldUpdateOperationsInput | string
    ProjectNumber?: StringFieldUpdateOperationsInput | string
    plan?: FundingPlanUpdateOneRequiredWithoutFundingsNestedInput
    patent?: PatentUpdateOneRequiredWithoutFundingNestedInput
  }

  export type PatentFundingUncheckedUpdateInput = {
    FundingID?: IntFieldUpdateOperationsInput | number
    PatentID?: IntFieldUpdateOperationsInput | number
    FundingAgency?: StringFieldUpdateOperationsInput | string
    ProjectNumber?: StringFieldUpdateOperationsInput | string
    PlanID?: IntFieldUpdateOperationsInput | number
  }

  export type PatentFundingCreateManyInput = {
    FundingID?: number
    PatentID: number
    FundingAgency: string
    ProjectNumber: string
    PlanID: number
  }

  export type PatentFundingUpdateManyMutationInput = {
    FundingAgency?: StringFieldUpdateOperationsInput | string
    ProjectNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PatentFundingUncheckedUpdateManyInput = {
    FundingID?: IntFieldUpdateOperationsInput | number
    PatentID?: IntFieldUpdateOperationsInput | number
    FundingAgency?: StringFieldUpdateOperationsInput | string
    ProjectNumber?: StringFieldUpdateOperationsInput | string
    PlanID?: IntFieldUpdateOperationsInput | number
  }

  export type InventorCreateInput = {
    Name: string
    Email?: string | null
    contactInfo?: ContactInfoCreateNestedOneWithoutInventorInput
    department: DepartmentCreateNestedOneWithoutInventorsInput
    patents?: PatentInventorCreateNestedManyWithoutInventorInput
  }

  export type InventorUncheckedCreateInput = {
    InventorID?: number
    Name: string
    Department: number
    Email?: string | null
    ContactInfoID?: number | null
    patents?: PatentInventorUncheckedCreateNestedManyWithoutInventorInput
  }

  export type InventorUpdateInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: ContactInfoUpdateOneWithoutInventorNestedInput
    department?: DepartmentUpdateOneRequiredWithoutInventorsNestedInput
    patents?: PatentInventorUpdateManyWithoutInventorNestedInput
  }

  export type InventorUncheckedUpdateInput = {
    InventorID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Department?: IntFieldUpdateOperationsInput | number
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    ContactInfoID?: NullableIntFieldUpdateOperationsInput | number | null
    patents?: PatentInventorUncheckedUpdateManyWithoutInventorNestedInput
  }

  export type InventorCreateManyInput = {
    InventorID?: number
    Name: string
    Department: number
    Email?: string | null
    ContactInfoID?: number | null
  }

  export type InventorUpdateManyMutationInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InventorUncheckedUpdateManyInput = {
    InventorID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Department?: IntFieldUpdateOperationsInput | number
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    ContactInfoID?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PatentInventorCreateInput = {
    Main: boolean
    inventor: InventorCreateNestedOneWithoutPatentsInput
    patent: PatentCreateNestedOneWithoutInventorsInput
  }

  export type PatentInventorUncheckedCreateInput = {
    PatentID: number
    InventorID: number
    Main: boolean
  }

  export type PatentInventorUpdateInput = {
    Main?: BoolFieldUpdateOperationsInput | boolean
    inventor?: InventorUpdateOneRequiredWithoutPatentsNestedInput
    patent?: PatentUpdateOneRequiredWithoutInventorsNestedInput
  }

  export type PatentInventorUncheckedUpdateInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    InventorID?: IntFieldUpdateOperationsInput | number
    Main?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PatentInventorCreateManyInput = {
    PatentID: number
    InventorID: number
    Main: boolean
  }

  export type PatentInventorUpdateManyMutationInput = {
    Main?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PatentInventorUncheckedUpdateManyInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    InventorID?: IntFieldUpdateOperationsInput | number
    Main?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PatentCreateInput = {
    Year: string
    InternalID: string
    Title: string
    TitleEnglish?: string | null
    agencies?: AgencyPatentCreateNestedManyWithoutPatentInput
    college: CollegeCreateNestedOneWithoutPatentsInput
    department: DepartmentCreateNestedOneWithoutPatentsInput
    application?: PatentApplicationDataCreateNestedOneWithoutPatentInput
    funding?: PatentFundingCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorCreateNestedManyWithoutPatentInput
    status?: PatentStatusCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesCreateNestedOneWithoutPatentInput
  }

  export type PatentUncheckedCreateInput = {
    PatentID?: number
    Year: string
    InternalID: string
    Title: string
    DepartmentID: number
    CollegeID: number
    TitleEnglish?: string | null
    agencies?: AgencyPatentUncheckedCreateNestedManyWithoutPatentInput
    application?: PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInput
    funding?: PatentFundingUncheckedCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorUncheckedCreateNestedManyWithoutPatentInput
    status?: PatentStatusUncheckedCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInput
  }

  export type PatentUpdateInput = {
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUpdateManyWithoutPatentNestedInput
    college?: CollegeUpdateOneRequiredWithoutPatentsNestedInput
    department?: DepartmentUpdateOneRequiredWithoutPatentsNestedInput
    application?: PatentApplicationDataUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUpdateOneWithoutPatentNestedInput
  }

  export type PatentUncheckedUpdateInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    DepartmentID?: IntFieldUpdateOperationsInput | number
    CollegeID?: IntFieldUpdateOperationsInput | number
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUncheckedUpdateManyWithoutPatentNestedInput
    application?: PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUncheckedUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUncheckedUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUncheckedUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInput
  }

  export type PatentCreateManyInput = {
    PatentID?: number
    Year: string
    InternalID: string
    Title: string
    DepartmentID: number
    CollegeID: number
    TitleEnglish?: string | null
  }

  export type PatentUpdateManyMutationInput = {
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatentUncheckedUpdateManyInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    DepartmentID?: IntFieldUpdateOperationsInput | number
    CollegeID?: IntFieldUpdateOperationsInput | number
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatentStatusCreateInput = {
    ExpiryDate?: Date | string | null
    Status: string
    TechnicalCommitteeReviewDate?: Date | string | null
    MaintenanceYear?: number | null
    MaintenanceStartDate?: Date | string | null
    MaintenanceEndDate?: Date | string | null
    patent?: PatentCreateNestedOneWithoutStatusInput
  }

  export type PatentStatusUncheckedCreateInput = {
    PatentID?: number
    ExpiryDate?: Date | string | null
    Status: string
    TechnicalCommitteeReviewDate?: Date | string | null
    MaintenanceYear?: number | null
    MaintenanceStartDate?: Date | string | null
    MaintenanceEndDate?: Date | string | null
  }

  export type PatentStatusUpdateInput = {
    ExpiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: StringFieldUpdateOperationsInput | string
    TechnicalCommitteeReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    MaintenanceYear?: NullableIntFieldUpdateOperationsInput | number | null
    MaintenanceStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    MaintenanceEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patent?: PatentUpdateOneRequiredWithoutStatusNestedInput
  }

  export type PatentStatusUncheckedUpdateInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    ExpiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: StringFieldUpdateOperationsInput | string
    TechnicalCommitteeReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    MaintenanceYear?: NullableIntFieldUpdateOperationsInput | number | null
    MaintenanceStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    MaintenanceEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PatentStatusCreateManyInput = {
    PatentID?: number
    ExpiryDate?: Date | string | null
    Status: string
    TechnicalCommitteeReviewDate?: Date | string | null
    MaintenanceYear?: number | null
    MaintenanceStartDate?: Date | string | null
    MaintenanceEndDate?: Date | string | null
  }

  export type PatentStatusUpdateManyMutationInput = {
    ExpiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: StringFieldUpdateOperationsInput | string
    TechnicalCommitteeReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    MaintenanceYear?: NullableIntFieldUpdateOperationsInput | number | null
    MaintenanceStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    MaintenanceEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PatentStatusUncheckedUpdateManyInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    ExpiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: StringFieldUpdateOperationsInput | string
    TechnicalCommitteeReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    MaintenanceYear?: NullableIntFieldUpdateOperationsInput | number | null
    MaintenanceStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    MaintenanceEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PatentApplicationDataCreateInput = {
    PatentNumber: string
    FilingDate?: Date | string | null
    GrantDate?: Date | string | null
    PatentType: string
    ApplicationNumber: string
    patent?: PatentCreateNestedOneWithoutApplicationInput
    country: CountryCreateNestedOneWithoutApplicationsInput
  }

  export type PatentApplicationDataUncheckedCreateInput = {
    PatentID?: number
    CountryID: number
    PatentNumber: string
    FilingDate?: Date | string | null
    GrantDate?: Date | string | null
    PatentType: string
    ApplicationNumber: string
  }

  export type PatentApplicationDataUpdateInput = {
    PatentNumber?: StringFieldUpdateOperationsInput | string
    FilingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    GrantDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PatentType?: StringFieldUpdateOperationsInput | string
    ApplicationNumber?: StringFieldUpdateOperationsInput | string
    patent?: PatentUpdateOneRequiredWithoutApplicationNestedInput
    country?: CountryUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type PatentApplicationDataUncheckedUpdateInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    CountryID?: IntFieldUpdateOperationsInput | number
    PatentNumber?: StringFieldUpdateOperationsInput | string
    FilingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    GrantDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PatentType?: StringFieldUpdateOperationsInput | string
    ApplicationNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PatentApplicationDataCreateManyInput = {
    PatentID?: number
    CountryID: number
    PatentNumber: string
    FilingDate?: Date | string | null
    GrantDate?: Date | string | null
    PatentType: string
    ApplicationNumber: string
  }

  export type PatentApplicationDataUpdateManyMutationInput = {
    PatentNumber?: StringFieldUpdateOperationsInput | string
    FilingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    GrantDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PatentType?: StringFieldUpdateOperationsInput | string
    ApplicationNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PatentApplicationDataUncheckedUpdateManyInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    CountryID?: IntFieldUpdateOperationsInput | number
    PatentNumber?: StringFieldUpdateOperationsInput | string
    FilingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    GrantDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PatentType?: StringFieldUpdateOperationsInput | string
    ApplicationNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PatentTechnicalAttributesCreateInput = {
    IPC: string
    Scope: string
    MaturityLevel: string
    Keywords: string
    patent?: PatentCreateNestedOneWithoutTechnicalInput
  }

  export type PatentTechnicalAttributesUncheckedCreateInput = {
    PatentID?: number
    IPC: string
    Scope: string
    MaturityLevel: string
    Keywords: string
  }

  export type PatentTechnicalAttributesUpdateInput = {
    IPC?: StringFieldUpdateOperationsInput | string
    Scope?: StringFieldUpdateOperationsInput | string
    MaturityLevel?: StringFieldUpdateOperationsInput | string
    Keywords?: StringFieldUpdateOperationsInput | string
    patent?: PatentUpdateOneRequiredWithoutTechnicalNestedInput
  }

  export type PatentTechnicalAttributesUncheckedUpdateInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    IPC?: StringFieldUpdateOperationsInput | string
    Scope?: StringFieldUpdateOperationsInput | string
    MaturityLevel?: StringFieldUpdateOperationsInput | string
    Keywords?: StringFieldUpdateOperationsInput | string
  }

  export type PatentTechnicalAttributesCreateManyInput = {
    PatentID?: number
    IPC: string
    Scope: string
    MaturityLevel: string
    Keywords: string
  }

  export type PatentTechnicalAttributesUpdateManyMutationInput = {
    IPC?: StringFieldUpdateOperationsInput | string
    Scope?: StringFieldUpdateOperationsInput | string
    MaturityLevel?: StringFieldUpdateOperationsInput | string
    Keywords?: StringFieldUpdateOperationsInput | string
  }

  export type PatentTechnicalAttributesUncheckedUpdateManyInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    IPC?: StringFieldUpdateOperationsInput | string
    Scope?: StringFieldUpdateOperationsInput | string
    MaturityLevel?: StringFieldUpdateOperationsInput | string
    Keywords?: StringFieldUpdateOperationsInput | string
  }

  export type CollegeCreateInput = {
    Name: string
    Description?: string | null
    departments?: DepartmentCreateNestedManyWithoutCollegeInput
    patents?: PatentCreateNestedManyWithoutCollegeInput
  }

  export type CollegeUncheckedCreateInput = {
    CollegeID?: number
    Name: string
    Description?: string | null
    departments?: DepartmentUncheckedCreateNestedManyWithoutCollegeInput
    patents?: PatentUncheckedCreateNestedManyWithoutCollegeInput
  }

  export type CollegeUpdateInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: DepartmentUpdateManyWithoutCollegeNestedInput
    patents?: PatentUpdateManyWithoutCollegeNestedInput
  }

  export type CollegeUncheckedUpdateInput = {
    CollegeID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: DepartmentUncheckedUpdateManyWithoutCollegeNestedInput
    patents?: PatentUncheckedUpdateManyWithoutCollegeNestedInput
  }

  export type CollegeCreateManyInput = {
    CollegeID?: number
    Name: string
    Description?: string | null
  }

  export type CollegeUpdateManyMutationInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CollegeUncheckedUpdateManyInput = {
    CollegeID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DepartmentCreateInput = {
    Name: string
    Description?: string | null
    college: CollegeCreateNestedOneWithoutDepartmentsInput
    inventors?: InventorCreateNestedManyWithoutDepartmentInput
    patents?: PatentCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateInput = {
    DepartmentID?: number
    Name: string
    CollegeID: number
    Description?: string | null
    inventors?: InventorUncheckedCreateNestedManyWithoutDepartmentInput
    patents?: PatentUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUpdateInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    college?: CollegeUpdateOneRequiredWithoutDepartmentsNestedInput
    inventors?: InventorUpdateManyWithoutDepartmentNestedInput
    patents?: PatentUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateInput = {
    DepartmentID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    CollegeID?: IntFieldUpdateOperationsInput | number
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    inventors?: InventorUncheckedUpdateManyWithoutDepartmentNestedInput
    patents?: PatentUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentCreateManyInput = {
    DepartmentID?: number
    Name: string
    CollegeID: number
    Description?: string | null
  }

  export type DepartmentUpdateManyMutationInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DepartmentUncheckedUpdateManyInput = {
    DepartmentID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    CollegeID?: IntFieldUpdateOperationsInput | number
    Description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CountryCreateInput = {
    CountryName: string
    ISOCode: string
    applications?: PatentApplicationDataCreateNestedManyWithoutCountryInput
  }

  export type CountryUncheckedCreateInput = {
    CountryID?: number
    CountryName: string
    ISOCode: string
    applications?: PatentApplicationDataUncheckedCreateNestedManyWithoutCountryInput
  }

  export type CountryUpdateInput = {
    CountryName?: StringFieldUpdateOperationsInput | string
    ISOCode?: StringFieldUpdateOperationsInput | string
    applications?: PatentApplicationDataUpdateManyWithoutCountryNestedInput
  }

  export type CountryUncheckedUpdateInput = {
    CountryID?: IntFieldUpdateOperationsInput | number
    CountryName?: StringFieldUpdateOperationsInput | string
    ISOCode?: StringFieldUpdateOperationsInput | string
    applications?: PatentApplicationDataUncheckedUpdateManyWithoutCountryNestedInput
  }

  export type CountryCreateManyInput = {
    CountryID?: number
    CountryName: string
    ISOCode: string
  }

  export type CountryUpdateManyMutationInput = {
    CountryName?: StringFieldUpdateOperationsInput | string
    ISOCode?: StringFieldUpdateOperationsInput | string
  }

  export type CountryUncheckedUpdateManyInput = {
    CountryID?: IntFieldUpdateOperationsInput | number
    CountryName?: StringFieldUpdateOperationsInput | string
    ISOCode?: StringFieldUpdateOperationsInput | string
  }

  export type ContactInfoCreateInput = {
    Name: string
    Email: string
    OfficeNumber?: string | null
    PhoneNumber?: string | null
    Position?: string | null
    Note?: string | null
    agencyContact?: AgencyContactPersonCreateNestedOneWithoutContactInfoInput
    inventor?: InventorCreateNestedOneWithoutContactInfoInput
  }

  export type ContactInfoUncheckedCreateInput = {
    ContactInfoID?: number
    Name: string
    Email: string
    OfficeNumber?: string | null
    PhoneNumber?: string | null
    Position?: string | null
    Note?: string | null
    agencyContact?: AgencyContactPersonUncheckedCreateNestedOneWithoutContactInfoInput
    inventor?: InventorUncheckedCreateNestedOneWithoutContactInfoInput
  }

  export type ContactInfoUpdateInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Email?: StringFieldUpdateOperationsInput | string
    OfficeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    PhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    Position?: NullableStringFieldUpdateOperationsInput | string | null
    Note?: NullableStringFieldUpdateOperationsInput | string | null
    agencyContact?: AgencyContactPersonUpdateOneWithoutContactInfoNestedInput
    inventor?: InventorUpdateOneWithoutContactInfoNestedInput
  }

  export type ContactInfoUncheckedUpdateInput = {
    ContactInfoID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Email?: StringFieldUpdateOperationsInput | string
    OfficeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    PhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    Position?: NullableStringFieldUpdateOperationsInput | string | null
    Note?: NullableStringFieldUpdateOperationsInput | string | null
    agencyContact?: AgencyContactPersonUncheckedUpdateOneWithoutContactInfoNestedInput
    inventor?: InventorUncheckedUpdateOneWithoutContactInfoNestedInput
  }

  export type ContactInfoCreateManyInput = {
    ContactInfoID?: number
    Name: string
    Email: string
    OfficeNumber?: string | null
    PhoneNumber?: string | null
    Position?: string | null
    Note?: string | null
  }

  export type ContactInfoUpdateManyMutationInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Email?: StringFieldUpdateOperationsInput | string
    OfficeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    PhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    Position?: NullableStringFieldUpdateOperationsInput | string | null
    Note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContactInfoUncheckedUpdateManyInput = {
    ContactInfoID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Email?: StringFieldUpdateOperationsInput | string
    OfficeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    PhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    Position?: NullableStringFieldUpdateOperationsInput | string | null
    Note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type AgencyContactPersonListRelationFilter = {
    every?: AgencyContactPersonWhereInput
    some?: AgencyContactPersonWhereInput
    none?: AgencyContactPersonWhereInput
  }

  export type AgencyPatentListRelationFilter = {
    every?: AgencyPatentWhereInput
    some?: AgencyPatentWhereInput
    none?: AgencyPatentWhereInput
  }

  export type AgencyContactPersonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgencyPatentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgencyCountOrderByAggregateInput = {
    AgencyID?: SortOrder
    Name?: SortOrder
  }

  export type AgencyAvgOrderByAggregateInput = {
    AgencyID?: SortOrder
  }

  export type AgencyMaxOrderByAggregateInput = {
    AgencyID?: SortOrder
    Name?: SortOrder
  }

  export type AgencyMinOrderByAggregateInput = {
    AgencyID?: SortOrder
    Name?: SortOrder
  }

  export type AgencySumOrderByAggregateInput = {
    AgencyID?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type AgencyScalarRelationFilter = {
    is?: AgencyWhereInput
    isNot?: AgencyWhereInput
  }

  export type PatentScalarRelationFilter = {
    is?: PatentWhereInput
    isNot?: PatentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AgencyPatentPatentIDAgencyIDCompoundUniqueInput = {
    PatentID: number
    AgencyID: number
  }

  export type AgencyPatentCountOrderByAggregateInput = {
    PatentID?: SortOrder
    AgencyID?: SortOrder
    FileCode?: SortOrder
    Role?: SortOrder
    Details?: SortOrder
  }

  export type AgencyPatentAvgOrderByAggregateInput = {
    PatentID?: SortOrder
    AgencyID?: SortOrder
  }

  export type AgencyPatentMaxOrderByAggregateInput = {
    PatentID?: SortOrder
    AgencyID?: SortOrder
    FileCode?: SortOrder
    Role?: SortOrder
    Details?: SortOrder
  }

  export type AgencyPatentMinOrderByAggregateInput = {
    PatentID?: SortOrder
    AgencyID?: SortOrder
    FileCode?: SortOrder
    Role?: SortOrder
    Details?: SortOrder
  }

  export type AgencyPatentSumOrderByAggregateInput = {
    PatentID?: SortOrder
    AgencyID?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ContactInfoNullableScalarRelationFilter = {
    is?: ContactInfoWhereInput | null
    isNot?: ContactInfoWhereInput | null
  }

  export type AgencyContactPersonCountOrderByAggregateInput = {
    ContactPersonID?: SortOrder
    AgencyID?: SortOrder
    Position?: SortOrder
    ContactInfoID?: SortOrder
  }

  export type AgencyContactPersonAvgOrderByAggregateInput = {
    ContactPersonID?: SortOrder
    AgencyID?: SortOrder
    ContactInfoID?: SortOrder
  }

  export type AgencyContactPersonMaxOrderByAggregateInput = {
    ContactPersonID?: SortOrder
    AgencyID?: SortOrder
    Position?: SortOrder
    ContactInfoID?: SortOrder
  }

  export type AgencyContactPersonMinOrderByAggregateInput = {
    ContactPersonID?: SortOrder
    AgencyID?: SortOrder
    Position?: SortOrder
    ContactInfoID?: SortOrder
  }

  export type AgencyContactPersonSumOrderByAggregateInput = {
    ContactPersonID?: SortOrder
    AgencyID?: SortOrder
    ContactInfoID?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PatentFundingListRelationFilter = {
    every?: PatentFundingWhereInput
    some?: PatentFundingWhereInput
    none?: PatentFundingWhereInput
  }

  export type PatentFundingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FundingPlanCountOrderByAggregateInput = {
    PlanID?: SortOrder
    PlanType?: SortOrder
  }

  export type FundingPlanAvgOrderByAggregateInput = {
    PlanID?: SortOrder
    PlanType?: SortOrder
  }

  export type FundingPlanMaxOrderByAggregateInput = {
    PlanID?: SortOrder
    PlanType?: SortOrder
  }

  export type FundingPlanMinOrderByAggregateInput = {
    PlanID?: SortOrder
    PlanType?: SortOrder
  }

  export type FundingPlanSumOrderByAggregateInput = {
    PlanID?: SortOrder
    PlanType?: SortOrder
  }

  export type FundingPlanScalarRelationFilter = {
    is?: FundingPlanWhereInput
    isNot?: FundingPlanWhereInput
  }

  export type PatentFundingCountOrderByAggregateInput = {
    FundingID?: SortOrder
    PatentID?: SortOrder
    FundingAgency?: SortOrder
    ProjectNumber?: SortOrder
    PlanID?: SortOrder
  }

  export type PatentFundingAvgOrderByAggregateInput = {
    FundingID?: SortOrder
    PatentID?: SortOrder
    PlanID?: SortOrder
  }

  export type PatentFundingMaxOrderByAggregateInput = {
    FundingID?: SortOrder
    PatentID?: SortOrder
    FundingAgency?: SortOrder
    ProjectNumber?: SortOrder
    PlanID?: SortOrder
  }

  export type PatentFundingMinOrderByAggregateInput = {
    FundingID?: SortOrder
    PatentID?: SortOrder
    FundingAgency?: SortOrder
    ProjectNumber?: SortOrder
    PlanID?: SortOrder
  }

  export type PatentFundingSumOrderByAggregateInput = {
    FundingID?: SortOrder
    PatentID?: SortOrder
    PlanID?: SortOrder
  }

  export type DepartmentScalarRelationFilter = {
    is?: DepartmentWhereInput
    isNot?: DepartmentWhereInput
  }

  export type PatentInventorListRelationFilter = {
    every?: PatentInventorWhereInput
    some?: PatentInventorWhereInput
    none?: PatentInventorWhereInput
  }

  export type PatentInventorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InventorCountOrderByAggregateInput = {
    InventorID?: SortOrder
    Name?: SortOrder
    Department?: SortOrder
    Email?: SortOrder
    ContactInfoID?: SortOrder
  }

  export type InventorAvgOrderByAggregateInput = {
    InventorID?: SortOrder
    Department?: SortOrder
    ContactInfoID?: SortOrder
  }

  export type InventorMaxOrderByAggregateInput = {
    InventorID?: SortOrder
    Name?: SortOrder
    Department?: SortOrder
    Email?: SortOrder
    ContactInfoID?: SortOrder
  }

  export type InventorMinOrderByAggregateInput = {
    InventorID?: SortOrder
    Name?: SortOrder
    Department?: SortOrder
    Email?: SortOrder
    ContactInfoID?: SortOrder
  }

  export type InventorSumOrderByAggregateInput = {
    InventorID?: SortOrder
    Department?: SortOrder
    ContactInfoID?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type InventorScalarRelationFilter = {
    is?: InventorWhereInput
    isNot?: InventorWhereInput
  }

  export type PatentInventorPatentIDInventorIDCompoundUniqueInput = {
    PatentID: number
    InventorID: number
  }

  export type PatentInventorCountOrderByAggregateInput = {
    PatentID?: SortOrder
    InventorID?: SortOrder
    Main?: SortOrder
  }

  export type PatentInventorAvgOrderByAggregateInput = {
    PatentID?: SortOrder
    InventorID?: SortOrder
  }

  export type PatentInventorMaxOrderByAggregateInput = {
    PatentID?: SortOrder
    InventorID?: SortOrder
    Main?: SortOrder
  }

  export type PatentInventorMinOrderByAggregateInput = {
    PatentID?: SortOrder
    InventorID?: SortOrder
    Main?: SortOrder
  }

  export type PatentInventorSumOrderByAggregateInput = {
    PatentID?: SortOrder
    InventorID?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CollegeScalarRelationFilter = {
    is?: CollegeWhereInput
    isNot?: CollegeWhereInput
  }

  export type PatentApplicationDataNullableScalarRelationFilter = {
    is?: PatentApplicationDataWhereInput | null
    isNot?: PatentApplicationDataWhereInput | null
  }

  export type PatentStatusNullableScalarRelationFilter = {
    is?: PatentStatusWhereInput | null
    isNot?: PatentStatusWhereInput | null
  }

  export type PatentTechnicalAttributesNullableScalarRelationFilter = {
    is?: PatentTechnicalAttributesWhereInput | null
    isNot?: PatentTechnicalAttributesWhereInput | null
  }

  export type PatentCountOrderByAggregateInput = {
    PatentID?: SortOrder
    Year?: SortOrder
    InternalID?: SortOrder
    Title?: SortOrder
    DepartmentID?: SortOrder
    CollegeID?: SortOrder
    TitleEnglish?: SortOrder
  }

  export type PatentAvgOrderByAggregateInput = {
    PatentID?: SortOrder
    DepartmentID?: SortOrder
    CollegeID?: SortOrder
  }

  export type PatentMaxOrderByAggregateInput = {
    PatentID?: SortOrder
    Year?: SortOrder
    InternalID?: SortOrder
    Title?: SortOrder
    DepartmentID?: SortOrder
    CollegeID?: SortOrder
    TitleEnglish?: SortOrder
  }

  export type PatentMinOrderByAggregateInput = {
    PatentID?: SortOrder
    Year?: SortOrder
    InternalID?: SortOrder
    Title?: SortOrder
    DepartmentID?: SortOrder
    CollegeID?: SortOrder
    TitleEnglish?: SortOrder
  }

  export type PatentSumOrderByAggregateInput = {
    PatentID?: SortOrder
    DepartmentID?: SortOrder
    CollegeID?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PatentStatusCountOrderByAggregateInput = {
    PatentID?: SortOrder
    ExpiryDate?: SortOrder
    Status?: SortOrder
    TechnicalCommitteeReviewDate?: SortOrder
    MaintenanceYear?: SortOrder
    MaintenanceStartDate?: SortOrder
    MaintenanceEndDate?: SortOrder
  }

  export type PatentStatusAvgOrderByAggregateInput = {
    PatentID?: SortOrder
    MaintenanceYear?: SortOrder
  }

  export type PatentStatusMaxOrderByAggregateInput = {
    PatentID?: SortOrder
    ExpiryDate?: SortOrder
    Status?: SortOrder
    TechnicalCommitteeReviewDate?: SortOrder
    MaintenanceYear?: SortOrder
    MaintenanceStartDate?: SortOrder
    MaintenanceEndDate?: SortOrder
  }

  export type PatentStatusMinOrderByAggregateInput = {
    PatentID?: SortOrder
    ExpiryDate?: SortOrder
    Status?: SortOrder
    TechnicalCommitteeReviewDate?: SortOrder
    MaintenanceYear?: SortOrder
    MaintenanceStartDate?: SortOrder
    MaintenanceEndDate?: SortOrder
  }

  export type PatentStatusSumOrderByAggregateInput = {
    PatentID?: SortOrder
    MaintenanceYear?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CountryScalarRelationFilter = {
    is?: CountryWhereInput
    isNot?: CountryWhereInput
  }

  export type PatentApplicationDataCountOrderByAggregateInput = {
    PatentID?: SortOrder
    CountryID?: SortOrder
    PatentNumber?: SortOrder
    FilingDate?: SortOrder
    GrantDate?: SortOrder
    PatentType?: SortOrder
    ApplicationNumber?: SortOrder
  }

  export type PatentApplicationDataAvgOrderByAggregateInput = {
    PatentID?: SortOrder
    CountryID?: SortOrder
  }

  export type PatentApplicationDataMaxOrderByAggregateInput = {
    PatentID?: SortOrder
    CountryID?: SortOrder
    PatentNumber?: SortOrder
    FilingDate?: SortOrder
    GrantDate?: SortOrder
    PatentType?: SortOrder
    ApplicationNumber?: SortOrder
  }

  export type PatentApplicationDataMinOrderByAggregateInput = {
    PatentID?: SortOrder
    CountryID?: SortOrder
    PatentNumber?: SortOrder
    FilingDate?: SortOrder
    GrantDate?: SortOrder
    PatentType?: SortOrder
    ApplicationNumber?: SortOrder
  }

  export type PatentApplicationDataSumOrderByAggregateInput = {
    PatentID?: SortOrder
    CountryID?: SortOrder
  }

  export type PatentTechnicalAttributesCountOrderByAggregateInput = {
    PatentID?: SortOrder
    IPC?: SortOrder
    Scope?: SortOrder
    MaturityLevel?: SortOrder
    Keywords?: SortOrder
  }

  export type PatentTechnicalAttributesAvgOrderByAggregateInput = {
    PatentID?: SortOrder
  }

  export type PatentTechnicalAttributesMaxOrderByAggregateInput = {
    PatentID?: SortOrder
    IPC?: SortOrder
    Scope?: SortOrder
    MaturityLevel?: SortOrder
    Keywords?: SortOrder
  }

  export type PatentTechnicalAttributesMinOrderByAggregateInput = {
    PatentID?: SortOrder
    IPC?: SortOrder
    Scope?: SortOrder
    MaturityLevel?: SortOrder
    Keywords?: SortOrder
  }

  export type PatentTechnicalAttributesSumOrderByAggregateInput = {
    PatentID?: SortOrder
  }

  export type DepartmentListRelationFilter = {
    every?: DepartmentWhereInput
    some?: DepartmentWhereInput
    none?: DepartmentWhereInput
  }

  export type PatentListRelationFilter = {
    every?: PatentWhereInput
    some?: PatentWhereInput
    none?: PatentWhereInput
  }

  export type DepartmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CollegeCountOrderByAggregateInput = {
    CollegeID?: SortOrder
    Name?: SortOrder
    Description?: SortOrder
  }

  export type CollegeAvgOrderByAggregateInput = {
    CollegeID?: SortOrder
  }

  export type CollegeMaxOrderByAggregateInput = {
    CollegeID?: SortOrder
    Name?: SortOrder
    Description?: SortOrder
  }

  export type CollegeMinOrderByAggregateInput = {
    CollegeID?: SortOrder
    Name?: SortOrder
    Description?: SortOrder
  }

  export type CollegeSumOrderByAggregateInput = {
    CollegeID?: SortOrder
  }

  export type InventorListRelationFilter = {
    every?: InventorWhereInput
    some?: InventorWhereInput
    none?: InventorWhereInput
  }

  export type InventorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DepartmentCountOrderByAggregateInput = {
    DepartmentID?: SortOrder
    Name?: SortOrder
    CollegeID?: SortOrder
    Description?: SortOrder
  }

  export type DepartmentAvgOrderByAggregateInput = {
    DepartmentID?: SortOrder
    CollegeID?: SortOrder
  }

  export type DepartmentMaxOrderByAggregateInput = {
    DepartmentID?: SortOrder
    Name?: SortOrder
    CollegeID?: SortOrder
    Description?: SortOrder
  }

  export type DepartmentMinOrderByAggregateInput = {
    DepartmentID?: SortOrder
    Name?: SortOrder
    CollegeID?: SortOrder
    Description?: SortOrder
  }

  export type DepartmentSumOrderByAggregateInput = {
    DepartmentID?: SortOrder
    CollegeID?: SortOrder
  }

  export type PatentApplicationDataListRelationFilter = {
    every?: PatentApplicationDataWhereInput
    some?: PatentApplicationDataWhereInput
    none?: PatentApplicationDataWhereInput
  }

  export type PatentApplicationDataOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CountryCountOrderByAggregateInput = {
    CountryID?: SortOrder
    CountryName?: SortOrder
    ISOCode?: SortOrder
  }

  export type CountryAvgOrderByAggregateInput = {
    CountryID?: SortOrder
  }

  export type CountryMaxOrderByAggregateInput = {
    CountryID?: SortOrder
    CountryName?: SortOrder
    ISOCode?: SortOrder
  }

  export type CountryMinOrderByAggregateInput = {
    CountryID?: SortOrder
    CountryName?: SortOrder
    ISOCode?: SortOrder
  }

  export type CountrySumOrderByAggregateInput = {
    CountryID?: SortOrder
  }

  export type AgencyContactPersonNullableScalarRelationFilter = {
    is?: AgencyContactPersonWhereInput | null
    isNot?: AgencyContactPersonWhereInput | null
  }

  export type InventorNullableScalarRelationFilter = {
    is?: InventorWhereInput | null
    isNot?: InventorWhereInput | null
  }

  export type ContactInfoCountOrderByAggregateInput = {
    ContactInfoID?: SortOrder
    Name?: SortOrder
    Email?: SortOrder
    OfficeNumber?: SortOrder
    PhoneNumber?: SortOrder
    Position?: SortOrder
    Note?: SortOrder
  }

  export type ContactInfoAvgOrderByAggregateInput = {
    ContactInfoID?: SortOrder
  }

  export type ContactInfoMaxOrderByAggregateInput = {
    ContactInfoID?: SortOrder
    Name?: SortOrder
    Email?: SortOrder
    OfficeNumber?: SortOrder
    PhoneNumber?: SortOrder
    Position?: SortOrder
    Note?: SortOrder
  }

  export type ContactInfoMinOrderByAggregateInput = {
    ContactInfoID?: SortOrder
    Name?: SortOrder
    Email?: SortOrder
    OfficeNumber?: SortOrder
    PhoneNumber?: SortOrder
    Position?: SortOrder
    Note?: SortOrder
  }

  export type ContactInfoSumOrderByAggregateInput = {
    ContactInfoID?: SortOrder
  }

  export type AgencyContactPersonCreateNestedManyWithoutAgencyInput = {
    create?: XOR<AgencyContactPersonCreateWithoutAgencyInput, AgencyContactPersonUncheckedCreateWithoutAgencyInput> | AgencyContactPersonCreateWithoutAgencyInput[] | AgencyContactPersonUncheckedCreateWithoutAgencyInput[]
    connectOrCreate?: AgencyContactPersonCreateOrConnectWithoutAgencyInput | AgencyContactPersonCreateOrConnectWithoutAgencyInput[]
    createMany?: AgencyContactPersonCreateManyAgencyInputEnvelope
    connect?: AgencyContactPersonWhereUniqueInput | AgencyContactPersonWhereUniqueInput[]
  }

  export type AgencyPatentCreateNestedManyWithoutAgencyInput = {
    create?: XOR<AgencyPatentCreateWithoutAgencyInput, AgencyPatentUncheckedCreateWithoutAgencyInput> | AgencyPatentCreateWithoutAgencyInput[] | AgencyPatentUncheckedCreateWithoutAgencyInput[]
    connectOrCreate?: AgencyPatentCreateOrConnectWithoutAgencyInput | AgencyPatentCreateOrConnectWithoutAgencyInput[]
    createMany?: AgencyPatentCreateManyAgencyInputEnvelope
    connect?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
  }

  export type AgencyContactPersonUncheckedCreateNestedManyWithoutAgencyInput = {
    create?: XOR<AgencyContactPersonCreateWithoutAgencyInput, AgencyContactPersonUncheckedCreateWithoutAgencyInput> | AgencyContactPersonCreateWithoutAgencyInput[] | AgencyContactPersonUncheckedCreateWithoutAgencyInput[]
    connectOrCreate?: AgencyContactPersonCreateOrConnectWithoutAgencyInput | AgencyContactPersonCreateOrConnectWithoutAgencyInput[]
    createMany?: AgencyContactPersonCreateManyAgencyInputEnvelope
    connect?: AgencyContactPersonWhereUniqueInput | AgencyContactPersonWhereUniqueInput[]
  }

  export type AgencyPatentUncheckedCreateNestedManyWithoutAgencyInput = {
    create?: XOR<AgencyPatentCreateWithoutAgencyInput, AgencyPatentUncheckedCreateWithoutAgencyInput> | AgencyPatentCreateWithoutAgencyInput[] | AgencyPatentUncheckedCreateWithoutAgencyInput[]
    connectOrCreate?: AgencyPatentCreateOrConnectWithoutAgencyInput | AgencyPatentCreateOrConnectWithoutAgencyInput[]
    createMany?: AgencyPatentCreateManyAgencyInputEnvelope
    connect?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type AgencyContactPersonUpdateManyWithoutAgencyNestedInput = {
    create?: XOR<AgencyContactPersonCreateWithoutAgencyInput, AgencyContactPersonUncheckedCreateWithoutAgencyInput> | AgencyContactPersonCreateWithoutAgencyInput[] | AgencyContactPersonUncheckedCreateWithoutAgencyInput[]
    connectOrCreate?: AgencyContactPersonCreateOrConnectWithoutAgencyInput | AgencyContactPersonCreateOrConnectWithoutAgencyInput[]
    upsert?: AgencyContactPersonUpsertWithWhereUniqueWithoutAgencyInput | AgencyContactPersonUpsertWithWhereUniqueWithoutAgencyInput[]
    createMany?: AgencyContactPersonCreateManyAgencyInputEnvelope
    set?: AgencyContactPersonWhereUniqueInput | AgencyContactPersonWhereUniqueInput[]
    disconnect?: AgencyContactPersonWhereUniqueInput | AgencyContactPersonWhereUniqueInput[]
    delete?: AgencyContactPersonWhereUniqueInput | AgencyContactPersonWhereUniqueInput[]
    connect?: AgencyContactPersonWhereUniqueInput | AgencyContactPersonWhereUniqueInput[]
    update?: AgencyContactPersonUpdateWithWhereUniqueWithoutAgencyInput | AgencyContactPersonUpdateWithWhereUniqueWithoutAgencyInput[]
    updateMany?: AgencyContactPersonUpdateManyWithWhereWithoutAgencyInput | AgencyContactPersonUpdateManyWithWhereWithoutAgencyInput[]
    deleteMany?: AgencyContactPersonScalarWhereInput | AgencyContactPersonScalarWhereInput[]
  }

  export type AgencyPatentUpdateManyWithoutAgencyNestedInput = {
    create?: XOR<AgencyPatentCreateWithoutAgencyInput, AgencyPatentUncheckedCreateWithoutAgencyInput> | AgencyPatentCreateWithoutAgencyInput[] | AgencyPatentUncheckedCreateWithoutAgencyInput[]
    connectOrCreate?: AgencyPatentCreateOrConnectWithoutAgencyInput | AgencyPatentCreateOrConnectWithoutAgencyInput[]
    upsert?: AgencyPatentUpsertWithWhereUniqueWithoutAgencyInput | AgencyPatentUpsertWithWhereUniqueWithoutAgencyInput[]
    createMany?: AgencyPatentCreateManyAgencyInputEnvelope
    set?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    disconnect?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    delete?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    connect?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    update?: AgencyPatentUpdateWithWhereUniqueWithoutAgencyInput | AgencyPatentUpdateWithWhereUniqueWithoutAgencyInput[]
    updateMany?: AgencyPatentUpdateManyWithWhereWithoutAgencyInput | AgencyPatentUpdateManyWithWhereWithoutAgencyInput[]
    deleteMany?: AgencyPatentScalarWhereInput | AgencyPatentScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AgencyContactPersonUncheckedUpdateManyWithoutAgencyNestedInput = {
    create?: XOR<AgencyContactPersonCreateWithoutAgencyInput, AgencyContactPersonUncheckedCreateWithoutAgencyInput> | AgencyContactPersonCreateWithoutAgencyInput[] | AgencyContactPersonUncheckedCreateWithoutAgencyInput[]
    connectOrCreate?: AgencyContactPersonCreateOrConnectWithoutAgencyInput | AgencyContactPersonCreateOrConnectWithoutAgencyInput[]
    upsert?: AgencyContactPersonUpsertWithWhereUniqueWithoutAgencyInput | AgencyContactPersonUpsertWithWhereUniqueWithoutAgencyInput[]
    createMany?: AgencyContactPersonCreateManyAgencyInputEnvelope
    set?: AgencyContactPersonWhereUniqueInput | AgencyContactPersonWhereUniqueInput[]
    disconnect?: AgencyContactPersonWhereUniqueInput | AgencyContactPersonWhereUniqueInput[]
    delete?: AgencyContactPersonWhereUniqueInput | AgencyContactPersonWhereUniqueInput[]
    connect?: AgencyContactPersonWhereUniqueInput | AgencyContactPersonWhereUniqueInput[]
    update?: AgencyContactPersonUpdateWithWhereUniqueWithoutAgencyInput | AgencyContactPersonUpdateWithWhereUniqueWithoutAgencyInput[]
    updateMany?: AgencyContactPersonUpdateManyWithWhereWithoutAgencyInput | AgencyContactPersonUpdateManyWithWhereWithoutAgencyInput[]
    deleteMany?: AgencyContactPersonScalarWhereInput | AgencyContactPersonScalarWhereInput[]
  }

  export type AgencyPatentUncheckedUpdateManyWithoutAgencyNestedInput = {
    create?: XOR<AgencyPatentCreateWithoutAgencyInput, AgencyPatentUncheckedCreateWithoutAgencyInput> | AgencyPatentCreateWithoutAgencyInput[] | AgencyPatentUncheckedCreateWithoutAgencyInput[]
    connectOrCreate?: AgencyPatentCreateOrConnectWithoutAgencyInput | AgencyPatentCreateOrConnectWithoutAgencyInput[]
    upsert?: AgencyPatentUpsertWithWhereUniqueWithoutAgencyInput | AgencyPatentUpsertWithWhereUniqueWithoutAgencyInput[]
    createMany?: AgencyPatentCreateManyAgencyInputEnvelope
    set?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    disconnect?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    delete?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    connect?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    update?: AgencyPatentUpdateWithWhereUniqueWithoutAgencyInput | AgencyPatentUpdateWithWhereUniqueWithoutAgencyInput[]
    updateMany?: AgencyPatentUpdateManyWithWhereWithoutAgencyInput | AgencyPatentUpdateManyWithWhereWithoutAgencyInput[]
    deleteMany?: AgencyPatentScalarWhereInput | AgencyPatentScalarWhereInput[]
  }

  export type AgencyCreateNestedOneWithoutPatentsInput = {
    create?: XOR<AgencyCreateWithoutPatentsInput, AgencyUncheckedCreateWithoutPatentsInput>
    connectOrCreate?: AgencyCreateOrConnectWithoutPatentsInput
    connect?: AgencyWhereUniqueInput
  }

  export type PatentCreateNestedOneWithoutAgenciesInput = {
    create?: XOR<PatentCreateWithoutAgenciesInput, PatentUncheckedCreateWithoutAgenciesInput>
    connectOrCreate?: PatentCreateOrConnectWithoutAgenciesInput
    connect?: PatentWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AgencyUpdateOneRequiredWithoutPatentsNestedInput = {
    create?: XOR<AgencyCreateWithoutPatentsInput, AgencyUncheckedCreateWithoutPatentsInput>
    connectOrCreate?: AgencyCreateOrConnectWithoutPatentsInput
    upsert?: AgencyUpsertWithoutPatentsInput
    connect?: AgencyWhereUniqueInput
    update?: XOR<XOR<AgencyUpdateToOneWithWhereWithoutPatentsInput, AgencyUpdateWithoutPatentsInput>, AgencyUncheckedUpdateWithoutPatentsInput>
  }

  export type PatentUpdateOneRequiredWithoutAgenciesNestedInput = {
    create?: XOR<PatentCreateWithoutAgenciesInput, PatentUncheckedCreateWithoutAgenciesInput>
    connectOrCreate?: PatentCreateOrConnectWithoutAgenciesInput
    upsert?: PatentUpsertWithoutAgenciesInput
    connect?: PatentWhereUniqueInput
    update?: XOR<XOR<PatentUpdateToOneWithWhereWithoutAgenciesInput, PatentUpdateWithoutAgenciesInput>, PatentUncheckedUpdateWithoutAgenciesInput>
  }

  export type ContactInfoCreateNestedOneWithoutAgencyContactInput = {
    create?: XOR<ContactInfoCreateWithoutAgencyContactInput, ContactInfoUncheckedCreateWithoutAgencyContactInput>
    connectOrCreate?: ContactInfoCreateOrConnectWithoutAgencyContactInput
    connect?: ContactInfoWhereUniqueInput
  }

  export type AgencyCreateNestedOneWithoutContactsInput = {
    create?: XOR<AgencyCreateWithoutContactsInput, AgencyUncheckedCreateWithoutContactsInput>
    connectOrCreate?: AgencyCreateOrConnectWithoutContactsInput
    connect?: AgencyWhereUniqueInput
  }

  export type ContactInfoUpdateOneWithoutAgencyContactNestedInput = {
    create?: XOR<ContactInfoCreateWithoutAgencyContactInput, ContactInfoUncheckedCreateWithoutAgencyContactInput>
    connectOrCreate?: ContactInfoCreateOrConnectWithoutAgencyContactInput
    upsert?: ContactInfoUpsertWithoutAgencyContactInput
    disconnect?: ContactInfoWhereInput | boolean
    delete?: ContactInfoWhereInput | boolean
    connect?: ContactInfoWhereUniqueInput
    update?: XOR<XOR<ContactInfoUpdateToOneWithWhereWithoutAgencyContactInput, ContactInfoUpdateWithoutAgencyContactInput>, ContactInfoUncheckedUpdateWithoutAgencyContactInput>
  }

  export type AgencyUpdateOneRequiredWithoutContactsNestedInput = {
    create?: XOR<AgencyCreateWithoutContactsInput, AgencyUncheckedCreateWithoutContactsInput>
    connectOrCreate?: AgencyCreateOrConnectWithoutContactsInput
    upsert?: AgencyUpsertWithoutContactsInput
    connect?: AgencyWhereUniqueInput
    update?: XOR<XOR<AgencyUpdateToOneWithWhereWithoutContactsInput, AgencyUpdateWithoutContactsInput>, AgencyUncheckedUpdateWithoutContactsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PatentFundingCreateNestedManyWithoutPlanInput = {
    create?: XOR<PatentFundingCreateWithoutPlanInput, PatentFundingUncheckedCreateWithoutPlanInput> | PatentFundingCreateWithoutPlanInput[] | PatentFundingUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PatentFundingCreateOrConnectWithoutPlanInput | PatentFundingCreateOrConnectWithoutPlanInput[]
    createMany?: PatentFundingCreateManyPlanInputEnvelope
    connect?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
  }

  export type PatentFundingUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<PatentFundingCreateWithoutPlanInput, PatentFundingUncheckedCreateWithoutPlanInput> | PatentFundingCreateWithoutPlanInput[] | PatentFundingUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PatentFundingCreateOrConnectWithoutPlanInput | PatentFundingCreateOrConnectWithoutPlanInput[]
    createMany?: PatentFundingCreateManyPlanInputEnvelope
    connect?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
  }

  export type PatentFundingUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PatentFundingCreateWithoutPlanInput, PatentFundingUncheckedCreateWithoutPlanInput> | PatentFundingCreateWithoutPlanInput[] | PatentFundingUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PatentFundingCreateOrConnectWithoutPlanInput | PatentFundingCreateOrConnectWithoutPlanInput[]
    upsert?: PatentFundingUpsertWithWhereUniqueWithoutPlanInput | PatentFundingUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PatentFundingCreateManyPlanInputEnvelope
    set?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    disconnect?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    delete?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    connect?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    update?: PatentFundingUpdateWithWhereUniqueWithoutPlanInput | PatentFundingUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PatentFundingUpdateManyWithWhereWithoutPlanInput | PatentFundingUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PatentFundingScalarWhereInput | PatentFundingScalarWhereInput[]
  }

  export type PatentFundingUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PatentFundingCreateWithoutPlanInput, PatentFundingUncheckedCreateWithoutPlanInput> | PatentFundingCreateWithoutPlanInput[] | PatentFundingUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PatentFundingCreateOrConnectWithoutPlanInput | PatentFundingCreateOrConnectWithoutPlanInput[]
    upsert?: PatentFundingUpsertWithWhereUniqueWithoutPlanInput | PatentFundingUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PatentFundingCreateManyPlanInputEnvelope
    set?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    disconnect?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    delete?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    connect?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    update?: PatentFundingUpdateWithWhereUniqueWithoutPlanInput | PatentFundingUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PatentFundingUpdateManyWithWhereWithoutPlanInput | PatentFundingUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PatentFundingScalarWhereInput | PatentFundingScalarWhereInput[]
  }

  export type FundingPlanCreateNestedOneWithoutFundingsInput = {
    create?: XOR<FundingPlanCreateWithoutFundingsInput, FundingPlanUncheckedCreateWithoutFundingsInput>
    connectOrCreate?: FundingPlanCreateOrConnectWithoutFundingsInput
    connect?: FundingPlanWhereUniqueInput
  }

  export type PatentCreateNestedOneWithoutFundingInput = {
    create?: XOR<PatentCreateWithoutFundingInput, PatentUncheckedCreateWithoutFundingInput>
    connectOrCreate?: PatentCreateOrConnectWithoutFundingInput
    connect?: PatentWhereUniqueInput
  }

  export type FundingPlanUpdateOneRequiredWithoutFundingsNestedInput = {
    create?: XOR<FundingPlanCreateWithoutFundingsInput, FundingPlanUncheckedCreateWithoutFundingsInput>
    connectOrCreate?: FundingPlanCreateOrConnectWithoutFundingsInput
    upsert?: FundingPlanUpsertWithoutFundingsInput
    connect?: FundingPlanWhereUniqueInput
    update?: XOR<XOR<FundingPlanUpdateToOneWithWhereWithoutFundingsInput, FundingPlanUpdateWithoutFundingsInput>, FundingPlanUncheckedUpdateWithoutFundingsInput>
  }

  export type PatentUpdateOneRequiredWithoutFundingNestedInput = {
    create?: XOR<PatentCreateWithoutFundingInput, PatentUncheckedCreateWithoutFundingInput>
    connectOrCreate?: PatentCreateOrConnectWithoutFundingInput
    upsert?: PatentUpsertWithoutFundingInput
    connect?: PatentWhereUniqueInput
    update?: XOR<XOR<PatentUpdateToOneWithWhereWithoutFundingInput, PatentUpdateWithoutFundingInput>, PatentUncheckedUpdateWithoutFundingInput>
  }

  export type ContactInfoCreateNestedOneWithoutInventorInput = {
    create?: XOR<ContactInfoCreateWithoutInventorInput, ContactInfoUncheckedCreateWithoutInventorInput>
    connectOrCreate?: ContactInfoCreateOrConnectWithoutInventorInput
    connect?: ContactInfoWhereUniqueInput
  }

  export type DepartmentCreateNestedOneWithoutInventorsInput = {
    create?: XOR<DepartmentCreateWithoutInventorsInput, DepartmentUncheckedCreateWithoutInventorsInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutInventorsInput
    connect?: DepartmentWhereUniqueInput
  }

  export type PatentInventorCreateNestedManyWithoutInventorInput = {
    create?: XOR<PatentInventorCreateWithoutInventorInput, PatentInventorUncheckedCreateWithoutInventorInput> | PatentInventorCreateWithoutInventorInput[] | PatentInventorUncheckedCreateWithoutInventorInput[]
    connectOrCreate?: PatentInventorCreateOrConnectWithoutInventorInput | PatentInventorCreateOrConnectWithoutInventorInput[]
    createMany?: PatentInventorCreateManyInventorInputEnvelope
    connect?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
  }

  export type PatentInventorUncheckedCreateNestedManyWithoutInventorInput = {
    create?: XOR<PatentInventorCreateWithoutInventorInput, PatentInventorUncheckedCreateWithoutInventorInput> | PatentInventorCreateWithoutInventorInput[] | PatentInventorUncheckedCreateWithoutInventorInput[]
    connectOrCreate?: PatentInventorCreateOrConnectWithoutInventorInput | PatentInventorCreateOrConnectWithoutInventorInput[]
    createMany?: PatentInventorCreateManyInventorInputEnvelope
    connect?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
  }

  export type ContactInfoUpdateOneWithoutInventorNestedInput = {
    create?: XOR<ContactInfoCreateWithoutInventorInput, ContactInfoUncheckedCreateWithoutInventorInput>
    connectOrCreate?: ContactInfoCreateOrConnectWithoutInventorInput
    upsert?: ContactInfoUpsertWithoutInventorInput
    disconnect?: ContactInfoWhereInput | boolean
    delete?: ContactInfoWhereInput | boolean
    connect?: ContactInfoWhereUniqueInput
    update?: XOR<XOR<ContactInfoUpdateToOneWithWhereWithoutInventorInput, ContactInfoUpdateWithoutInventorInput>, ContactInfoUncheckedUpdateWithoutInventorInput>
  }

  export type DepartmentUpdateOneRequiredWithoutInventorsNestedInput = {
    create?: XOR<DepartmentCreateWithoutInventorsInput, DepartmentUncheckedCreateWithoutInventorsInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutInventorsInput
    upsert?: DepartmentUpsertWithoutInventorsInput
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutInventorsInput, DepartmentUpdateWithoutInventorsInput>, DepartmentUncheckedUpdateWithoutInventorsInput>
  }

  export type PatentInventorUpdateManyWithoutInventorNestedInput = {
    create?: XOR<PatentInventorCreateWithoutInventorInput, PatentInventorUncheckedCreateWithoutInventorInput> | PatentInventorCreateWithoutInventorInput[] | PatentInventorUncheckedCreateWithoutInventorInput[]
    connectOrCreate?: PatentInventorCreateOrConnectWithoutInventorInput | PatentInventorCreateOrConnectWithoutInventorInput[]
    upsert?: PatentInventorUpsertWithWhereUniqueWithoutInventorInput | PatentInventorUpsertWithWhereUniqueWithoutInventorInput[]
    createMany?: PatentInventorCreateManyInventorInputEnvelope
    set?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    disconnect?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    delete?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    connect?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    update?: PatentInventorUpdateWithWhereUniqueWithoutInventorInput | PatentInventorUpdateWithWhereUniqueWithoutInventorInput[]
    updateMany?: PatentInventorUpdateManyWithWhereWithoutInventorInput | PatentInventorUpdateManyWithWhereWithoutInventorInput[]
    deleteMany?: PatentInventorScalarWhereInput | PatentInventorScalarWhereInput[]
  }

  export type PatentInventorUncheckedUpdateManyWithoutInventorNestedInput = {
    create?: XOR<PatentInventorCreateWithoutInventorInput, PatentInventorUncheckedCreateWithoutInventorInput> | PatentInventorCreateWithoutInventorInput[] | PatentInventorUncheckedCreateWithoutInventorInput[]
    connectOrCreate?: PatentInventorCreateOrConnectWithoutInventorInput | PatentInventorCreateOrConnectWithoutInventorInput[]
    upsert?: PatentInventorUpsertWithWhereUniqueWithoutInventorInput | PatentInventorUpsertWithWhereUniqueWithoutInventorInput[]
    createMany?: PatentInventorCreateManyInventorInputEnvelope
    set?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    disconnect?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    delete?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    connect?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    update?: PatentInventorUpdateWithWhereUniqueWithoutInventorInput | PatentInventorUpdateWithWhereUniqueWithoutInventorInput[]
    updateMany?: PatentInventorUpdateManyWithWhereWithoutInventorInput | PatentInventorUpdateManyWithWhereWithoutInventorInput[]
    deleteMany?: PatentInventorScalarWhereInput | PatentInventorScalarWhereInput[]
  }

  export type InventorCreateNestedOneWithoutPatentsInput = {
    create?: XOR<InventorCreateWithoutPatentsInput, InventorUncheckedCreateWithoutPatentsInput>
    connectOrCreate?: InventorCreateOrConnectWithoutPatentsInput
    connect?: InventorWhereUniqueInput
  }

  export type PatentCreateNestedOneWithoutInventorsInput = {
    create?: XOR<PatentCreateWithoutInventorsInput, PatentUncheckedCreateWithoutInventorsInput>
    connectOrCreate?: PatentCreateOrConnectWithoutInventorsInput
    connect?: PatentWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type InventorUpdateOneRequiredWithoutPatentsNestedInput = {
    create?: XOR<InventorCreateWithoutPatentsInput, InventorUncheckedCreateWithoutPatentsInput>
    connectOrCreate?: InventorCreateOrConnectWithoutPatentsInput
    upsert?: InventorUpsertWithoutPatentsInput
    connect?: InventorWhereUniqueInput
    update?: XOR<XOR<InventorUpdateToOneWithWhereWithoutPatentsInput, InventorUpdateWithoutPatentsInput>, InventorUncheckedUpdateWithoutPatentsInput>
  }

  export type PatentUpdateOneRequiredWithoutInventorsNestedInput = {
    create?: XOR<PatentCreateWithoutInventorsInput, PatentUncheckedCreateWithoutInventorsInput>
    connectOrCreate?: PatentCreateOrConnectWithoutInventorsInput
    upsert?: PatentUpsertWithoutInventorsInput
    connect?: PatentWhereUniqueInput
    update?: XOR<XOR<PatentUpdateToOneWithWhereWithoutInventorsInput, PatentUpdateWithoutInventorsInput>, PatentUncheckedUpdateWithoutInventorsInput>
  }

  export type AgencyPatentCreateNestedManyWithoutPatentInput = {
    create?: XOR<AgencyPatentCreateWithoutPatentInput, AgencyPatentUncheckedCreateWithoutPatentInput> | AgencyPatentCreateWithoutPatentInput[] | AgencyPatentUncheckedCreateWithoutPatentInput[]
    connectOrCreate?: AgencyPatentCreateOrConnectWithoutPatentInput | AgencyPatentCreateOrConnectWithoutPatentInput[]
    createMany?: AgencyPatentCreateManyPatentInputEnvelope
    connect?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
  }

  export type CollegeCreateNestedOneWithoutPatentsInput = {
    create?: XOR<CollegeCreateWithoutPatentsInput, CollegeUncheckedCreateWithoutPatentsInput>
    connectOrCreate?: CollegeCreateOrConnectWithoutPatentsInput
    connect?: CollegeWhereUniqueInput
  }

  export type DepartmentCreateNestedOneWithoutPatentsInput = {
    create?: XOR<DepartmentCreateWithoutPatentsInput, DepartmentUncheckedCreateWithoutPatentsInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutPatentsInput
    connect?: DepartmentWhereUniqueInput
  }

  export type PatentApplicationDataCreateNestedOneWithoutPatentInput = {
    create?: XOR<PatentApplicationDataCreateWithoutPatentInput, PatentApplicationDataUncheckedCreateWithoutPatentInput>
    connectOrCreate?: PatentApplicationDataCreateOrConnectWithoutPatentInput
    connect?: PatentApplicationDataWhereUniqueInput
  }

  export type PatentFundingCreateNestedManyWithoutPatentInput = {
    create?: XOR<PatentFundingCreateWithoutPatentInput, PatentFundingUncheckedCreateWithoutPatentInput> | PatentFundingCreateWithoutPatentInput[] | PatentFundingUncheckedCreateWithoutPatentInput[]
    connectOrCreate?: PatentFundingCreateOrConnectWithoutPatentInput | PatentFundingCreateOrConnectWithoutPatentInput[]
    createMany?: PatentFundingCreateManyPatentInputEnvelope
    connect?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
  }

  export type PatentInventorCreateNestedManyWithoutPatentInput = {
    create?: XOR<PatentInventorCreateWithoutPatentInput, PatentInventorUncheckedCreateWithoutPatentInput> | PatentInventorCreateWithoutPatentInput[] | PatentInventorUncheckedCreateWithoutPatentInput[]
    connectOrCreate?: PatentInventorCreateOrConnectWithoutPatentInput | PatentInventorCreateOrConnectWithoutPatentInput[]
    createMany?: PatentInventorCreateManyPatentInputEnvelope
    connect?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
  }

  export type PatentStatusCreateNestedOneWithoutPatentInput = {
    create?: XOR<PatentStatusCreateWithoutPatentInput, PatentStatusUncheckedCreateWithoutPatentInput>
    connectOrCreate?: PatentStatusCreateOrConnectWithoutPatentInput
    connect?: PatentStatusWhereUniqueInput
  }

  export type PatentTechnicalAttributesCreateNestedOneWithoutPatentInput = {
    create?: XOR<PatentTechnicalAttributesCreateWithoutPatentInput, PatentTechnicalAttributesUncheckedCreateWithoutPatentInput>
    connectOrCreate?: PatentTechnicalAttributesCreateOrConnectWithoutPatentInput
    connect?: PatentTechnicalAttributesWhereUniqueInput
  }

  export type AgencyPatentUncheckedCreateNestedManyWithoutPatentInput = {
    create?: XOR<AgencyPatentCreateWithoutPatentInput, AgencyPatentUncheckedCreateWithoutPatentInput> | AgencyPatentCreateWithoutPatentInput[] | AgencyPatentUncheckedCreateWithoutPatentInput[]
    connectOrCreate?: AgencyPatentCreateOrConnectWithoutPatentInput | AgencyPatentCreateOrConnectWithoutPatentInput[]
    createMany?: AgencyPatentCreateManyPatentInputEnvelope
    connect?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
  }

  export type PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInput = {
    create?: XOR<PatentApplicationDataCreateWithoutPatentInput, PatentApplicationDataUncheckedCreateWithoutPatentInput>
    connectOrCreate?: PatentApplicationDataCreateOrConnectWithoutPatentInput
    connect?: PatentApplicationDataWhereUniqueInput
  }

  export type PatentFundingUncheckedCreateNestedManyWithoutPatentInput = {
    create?: XOR<PatentFundingCreateWithoutPatentInput, PatentFundingUncheckedCreateWithoutPatentInput> | PatentFundingCreateWithoutPatentInput[] | PatentFundingUncheckedCreateWithoutPatentInput[]
    connectOrCreate?: PatentFundingCreateOrConnectWithoutPatentInput | PatentFundingCreateOrConnectWithoutPatentInput[]
    createMany?: PatentFundingCreateManyPatentInputEnvelope
    connect?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
  }

  export type PatentInventorUncheckedCreateNestedManyWithoutPatentInput = {
    create?: XOR<PatentInventorCreateWithoutPatentInput, PatentInventorUncheckedCreateWithoutPatentInput> | PatentInventorCreateWithoutPatentInput[] | PatentInventorUncheckedCreateWithoutPatentInput[]
    connectOrCreate?: PatentInventorCreateOrConnectWithoutPatentInput | PatentInventorCreateOrConnectWithoutPatentInput[]
    createMany?: PatentInventorCreateManyPatentInputEnvelope
    connect?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
  }

  export type PatentStatusUncheckedCreateNestedOneWithoutPatentInput = {
    create?: XOR<PatentStatusCreateWithoutPatentInput, PatentStatusUncheckedCreateWithoutPatentInput>
    connectOrCreate?: PatentStatusCreateOrConnectWithoutPatentInput
    connect?: PatentStatusWhereUniqueInput
  }

  export type PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInput = {
    create?: XOR<PatentTechnicalAttributesCreateWithoutPatentInput, PatentTechnicalAttributesUncheckedCreateWithoutPatentInput>
    connectOrCreate?: PatentTechnicalAttributesCreateOrConnectWithoutPatentInput
    connect?: PatentTechnicalAttributesWhereUniqueInput
  }

  export type AgencyPatentUpdateManyWithoutPatentNestedInput = {
    create?: XOR<AgencyPatentCreateWithoutPatentInput, AgencyPatentUncheckedCreateWithoutPatentInput> | AgencyPatentCreateWithoutPatentInput[] | AgencyPatentUncheckedCreateWithoutPatentInput[]
    connectOrCreate?: AgencyPatentCreateOrConnectWithoutPatentInput | AgencyPatentCreateOrConnectWithoutPatentInput[]
    upsert?: AgencyPatentUpsertWithWhereUniqueWithoutPatentInput | AgencyPatentUpsertWithWhereUniqueWithoutPatentInput[]
    createMany?: AgencyPatentCreateManyPatentInputEnvelope
    set?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    disconnect?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    delete?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    connect?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    update?: AgencyPatentUpdateWithWhereUniqueWithoutPatentInput | AgencyPatentUpdateWithWhereUniqueWithoutPatentInput[]
    updateMany?: AgencyPatentUpdateManyWithWhereWithoutPatentInput | AgencyPatentUpdateManyWithWhereWithoutPatentInput[]
    deleteMany?: AgencyPatentScalarWhereInput | AgencyPatentScalarWhereInput[]
  }

  export type CollegeUpdateOneRequiredWithoutPatentsNestedInput = {
    create?: XOR<CollegeCreateWithoutPatentsInput, CollegeUncheckedCreateWithoutPatentsInput>
    connectOrCreate?: CollegeCreateOrConnectWithoutPatentsInput
    upsert?: CollegeUpsertWithoutPatentsInput
    connect?: CollegeWhereUniqueInput
    update?: XOR<XOR<CollegeUpdateToOneWithWhereWithoutPatentsInput, CollegeUpdateWithoutPatentsInput>, CollegeUncheckedUpdateWithoutPatentsInput>
  }

  export type DepartmentUpdateOneRequiredWithoutPatentsNestedInput = {
    create?: XOR<DepartmentCreateWithoutPatentsInput, DepartmentUncheckedCreateWithoutPatentsInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutPatentsInput
    upsert?: DepartmentUpsertWithoutPatentsInput
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutPatentsInput, DepartmentUpdateWithoutPatentsInput>, DepartmentUncheckedUpdateWithoutPatentsInput>
  }

  export type PatentApplicationDataUpdateOneWithoutPatentNestedInput = {
    create?: XOR<PatentApplicationDataCreateWithoutPatentInput, PatentApplicationDataUncheckedCreateWithoutPatentInput>
    connectOrCreate?: PatentApplicationDataCreateOrConnectWithoutPatentInput
    upsert?: PatentApplicationDataUpsertWithoutPatentInput
    disconnect?: PatentApplicationDataWhereInput | boolean
    delete?: PatentApplicationDataWhereInput | boolean
    connect?: PatentApplicationDataWhereUniqueInput
    update?: XOR<XOR<PatentApplicationDataUpdateToOneWithWhereWithoutPatentInput, PatentApplicationDataUpdateWithoutPatentInput>, PatentApplicationDataUncheckedUpdateWithoutPatentInput>
  }

  export type PatentFundingUpdateManyWithoutPatentNestedInput = {
    create?: XOR<PatentFundingCreateWithoutPatentInput, PatentFundingUncheckedCreateWithoutPatentInput> | PatentFundingCreateWithoutPatentInput[] | PatentFundingUncheckedCreateWithoutPatentInput[]
    connectOrCreate?: PatentFundingCreateOrConnectWithoutPatentInput | PatentFundingCreateOrConnectWithoutPatentInput[]
    upsert?: PatentFundingUpsertWithWhereUniqueWithoutPatentInput | PatentFundingUpsertWithWhereUniqueWithoutPatentInput[]
    createMany?: PatentFundingCreateManyPatentInputEnvelope
    set?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    disconnect?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    delete?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    connect?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    update?: PatentFundingUpdateWithWhereUniqueWithoutPatentInput | PatentFundingUpdateWithWhereUniqueWithoutPatentInput[]
    updateMany?: PatentFundingUpdateManyWithWhereWithoutPatentInput | PatentFundingUpdateManyWithWhereWithoutPatentInput[]
    deleteMany?: PatentFundingScalarWhereInput | PatentFundingScalarWhereInput[]
  }

  export type PatentInventorUpdateManyWithoutPatentNestedInput = {
    create?: XOR<PatentInventorCreateWithoutPatentInput, PatentInventorUncheckedCreateWithoutPatentInput> | PatentInventorCreateWithoutPatentInput[] | PatentInventorUncheckedCreateWithoutPatentInput[]
    connectOrCreate?: PatentInventorCreateOrConnectWithoutPatentInput | PatentInventorCreateOrConnectWithoutPatentInput[]
    upsert?: PatentInventorUpsertWithWhereUniqueWithoutPatentInput | PatentInventorUpsertWithWhereUniqueWithoutPatentInput[]
    createMany?: PatentInventorCreateManyPatentInputEnvelope
    set?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    disconnect?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    delete?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    connect?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    update?: PatentInventorUpdateWithWhereUniqueWithoutPatentInput | PatentInventorUpdateWithWhereUniqueWithoutPatentInput[]
    updateMany?: PatentInventorUpdateManyWithWhereWithoutPatentInput | PatentInventorUpdateManyWithWhereWithoutPatentInput[]
    deleteMany?: PatentInventorScalarWhereInput | PatentInventorScalarWhereInput[]
  }

  export type PatentStatusUpdateOneWithoutPatentNestedInput = {
    create?: XOR<PatentStatusCreateWithoutPatentInput, PatentStatusUncheckedCreateWithoutPatentInput>
    connectOrCreate?: PatentStatusCreateOrConnectWithoutPatentInput
    upsert?: PatentStatusUpsertWithoutPatentInput
    disconnect?: PatentStatusWhereInput | boolean
    delete?: PatentStatusWhereInput | boolean
    connect?: PatentStatusWhereUniqueInput
    update?: XOR<XOR<PatentStatusUpdateToOneWithWhereWithoutPatentInput, PatentStatusUpdateWithoutPatentInput>, PatentStatusUncheckedUpdateWithoutPatentInput>
  }

  export type PatentTechnicalAttributesUpdateOneWithoutPatentNestedInput = {
    create?: XOR<PatentTechnicalAttributesCreateWithoutPatentInput, PatentTechnicalAttributesUncheckedCreateWithoutPatentInput>
    connectOrCreate?: PatentTechnicalAttributesCreateOrConnectWithoutPatentInput
    upsert?: PatentTechnicalAttributesUpsertWithoutPatentInput
    disconnect?: PatentTechnicalAttributesWhereInput | boolean
    delete?: PatentTechnicalAttributesWhereInput | boolean
    connect?: PatentTechnicalAttributesWhereUniqueInput
    update?: XOR<XOR<PatentTechnicalAttributesUpdateToOneWithWhereWithoutPatentInput, PatentTechnicalAttributesUpdateWithoutPatentInput>, PatentTechnicalAttributesUncheckedUpdateWithoutPatentInput>
  }

  export type AgencyPatentUncheckedUpdateManyWithoutPatentNestedInput = {
    create?: XOR<AgencyPatentCreateWithoutPatentInput, AgencyPatentUncheckedCreateWithoutPatentInput> | AgencyPatentCreateWithoutPatentInput[] | AgencyPatentUncheckedCreateWithoutPatentInput[]
    connectOrCreate?: AgencyPatentCreateOrConnectWithoutPatentInput | AgencyPatentCreateOrConnectWithoutPatentInput[]
    upsert?: AgencyPatentUpsertWithWhereUniqueWithoutPatentInput | AgencyPatentUpsertWithWhereUniqueWithoutPatentInput[]
    createMany?: AgencyPatentCreateManyPatentInputEnvelope
    set?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    disconnect?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    delete?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    connect?: AgencyPatentWhereUniqueInput | AgencyPatentWhereUniqueInput[]
    update?: AgencyPatentUpdateWithWhereUniqueWithoutPatentInput | AgencyPatentUpdateWithWhereUniqueWithoutPatentInput[]
    updateMany?: AgencyPatentUpdateManyWithWhereWithoutPatentInput | AgencyPatentUpdateManyWithWhereWithoutPatentInput[]
    deleteMany?: AgencyPatentScalarWhereInput | AgencyPatentScalarWhereInput[]
  }

  export type PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInput = {
    create?: XOR<PatentApplicationDataCreateWithoutPatentInput, PatentApplicationDataUncheckedCreateWithoutPatentInput>
    connectOrCreate?: PatentApplicationDataCreateOrConnectWithoutPatentInput
    upsert?: PatentApplicationDataUpsertWithoutPatentInput
    disconnect?: PatentApplicationDataWhereInput | boolean
    delete?: PatentApplicationDataWhereInput | boolean
    connect?: PatentApplicationDataWhereUniqueInput
    update?: XOR<XOR<PatentApplicationDataUpdateToOneWithWhereWithoutPatentInput, PatentApplicationDataUpdateWithoutPatentInput>, PatentApplicationDataUncheckedUpdateWithoutPatentInput>
  }

  export type PatentFundingUncheckedUpdateManyWithoutPatentNestedInput = {
    create?: XOR<PatentFundingCreateWithoutPatentInput, PatentFundingUncheckedCreateWithoutPatentInput> | PatentFundingCreateWithoutPatentInput[] | PatentFundingUncheckedCreateWithoutPatentInput[]
    connectOrCreate?: PatentFundingCreateOrConnectWithoutPatentInput | PatentFundingCreateOrConnectWithoutPatentInput[]
    upsert?: PatentFundingUpsertWithWhereUniqueWithoutPatentInput | PatentFundingUpsertWithWhereUniqueWithoutPatentInput[]
    createMany?: PatentFundingCreateManyPatentInputEnvelope
    set?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    disconnect?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    delete?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    connect?: PatentFundingWhereUniqueInput | PatentFundingWhereUniqueInput[]
    update?: PatentFundingUpdateWithWhereUniqueWithoutPatentInput | PatentFundingUpdateWithWhereUniqueWithoutPatentInput[]
    updateMany?: PatentFundingUpdateManyWithWhereWithoutPatentInput | PatentFundingUpdateManyWithWhereWithoutPatentInput[]
    deleteMany?: PatentFundingScalarWhereInput | PatentFundingScalarWhereInput[]
  }

  export type PatentInventorUncheckedUpdateManyWithoutPatentNestedInput = {
    create?: XOR<PatentInventorCreateWithoutPatentInput, PatentInventorUncheckedCreateWithoutPatentInput> | PatentInventorCreateWithoutPatentInput[] | PatentInventorUncheckedCreateWithoutPatentInput[]
    connectOrCreate?: PatentInventorCreateOrConnectWithoutPatentInput | PatentInventorCreateOrConnectWithoutPatentInput[]
    upsert?: PatentInventorUpsertWithWhereUniqueWithoutPatentInput | PatentInventorUpsertWithWhereUniqueWithoutPatentInput[]
    createMany?: PatentInventorCreateManyPatentInputEnvelope
    set?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    disconnect?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    delete?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    connect?: PatentInventorWhereUniqueInput | PatentInventorWhereUniqueInput[]
    update?: PatentInventorUpdateWithWhereUniqueWithoutPatentInput | PatentInventorUpdateWithWhereUniqueWithoutPatentInput[]
    updateMany?: PatentInventorUpdateManyWithWhereWithoutPatentInput | PatentInventorUpdateManyWithWhereWithoutPatentInput[]
    deleteMany?: PatentInventorScalarWhereInput | PatentInventorScalarWhereInput[]
  }

  export type PatentStatusUncheckedUpdateOneWithoutPatentNestedInput = {
    create?: XOR<PatentStatusCreateWithoutPatentInput, PatentStatusUncheckedCreateWithoutPatentInput>
    connectOrCreate?: PatentStatusCreateOrConnectWithoutPatentInput
    upsert?: PatentStatusUpsertWithoutPatentInput
    disconnect?: PatentStatusWhereInput | boolean
    delete?: PatentStatusWhereInput | boolean
    connect?: PatentStatusWhereUniqueInput
    update?: XOR<XOR<PatentStatusUpdateToOneWithWhereWithoutPatentInput, PatentStatusUpdateWithoutPatentInput>, PatentStatusUncheckedUpdateWithoutPatentInput>
  }

  export type PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInput = {
    create?: XOR<PatentTechnicalAttributesCreateWithoutPatentInput, PatentTechnicalAttributesUncheckedCreateWithoutPatentInput>
    connectOrCreate?: PatentTechnicalAttributesCreateOrConnectWithoutPatentInput
    upsert?: PatentTechnicalAttributesUpsertWithoutPatentInput
    disconnect?: PatentTechnicalAttributesWhereInput | boolean
    delete?: PatentTechnicalAttributesWhereInput | boolean
    connect?: PatentTechnicalAttributesWhereUniqueInput
    update?: XOR<XOR<PatentTechnicalAttributesUpdateToOneWithWhereWithoutPatentInput, PatentTechnicalAttributesUpdateWithoutPatentInput>, PatentTechnicalAttributesUncheckedUpdateWithoutPatentInput>
  }

  export type PatentCreateNestedOneWithoutStatusInput = {
    create?: XOR<PatentCreateWithoutStatusInput, PatentUncheckedCreateWithoutStatusInput>
    connectOrCreate?: PatentCreateOrConnectWithoutStatusInput
    connect?: PatentWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PatentUpdateOneRequiredWithoutStatusNestedInput = {
    create?: XOR<PatentCreateWithoutStatusInput, PatentUncheckedCreateWithoutStatusInput>
    connectOrCreate?: PatentCreateOrConnectWithoutStatusInput
    upsert?: PatentUpsertWithoutStatusInput
    connect?: PatentWhereUniqueInput
    update?: XOR<XOR<PatentUpdateToOneWithWhereWithoutStatusInput, PatentUpdateWithoutStatusInput>, PatentUncheckedUpdateWithoutStatusInput>
  }

  export type PatentCreateNestedOneWithoutApplicationInput = {
    create?: XOR<PatentCreateWithoutApplicationInput, PatentUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: PatentCreateOrConnectWithoutApplicationInput
    connect?: PatentWhereUniqueInput
  }

  export type CountryCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<CountryCreateWithoutApplicationsInput, CountryUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: CountryCreateOrConnectWithoutApplicationsInput
    connect?: CountryWhereUniqueInput
  }

  export type PatentUpdateOneRequiredWithoutApplicationNestedInput = {
    create?: XOR<PatentCreateWithoutApplicationInput, PatentUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: PatentCreateOrConnectWithoutApplicationInput
    upsert?: PatentUpsertWithoutApplicationInput
    connect?: PatentWhereUniqueInput
    update?: XOR<XOR<PatentUpdateToOneWithWhereWithoutApplicationInput, PatentUpdateWithoutApplicationInput>, PatentUncheckedUpdateWithoutApplicationInput>
  }

  export type CountryUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<CountryCreateWithoutApplicationsInput, CountryUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: CountryCreateOrConnectWithoutApplicationsInput
    upsert?: CountryUpsertWithoutApplicationsInput
    connect?: CountryWhereUniqueInput
    update?: XOR<XOR<CountryUpdateToOneWithWhereWithoutApplicationsInput, CountryUpdateWithoutApplicationsInput>, CountryUncheckedUpdateWithoutApplicationsInput>
  }

  export type PatentCreateNestedOneWithoutTechnicalInput = {
    create?: XOR<PatentCreateWithoutTechnicalInput, PatentUncheckedCreateWithoutTechnicalInput>
    connectOrCreate?: PatentCreateOrConnectWithoutTechnicalInput
    connect?: PatentWhereUniqueInput
  }

  export type PatentUpdateOneRequiredWithoutTechnicalNestedInput = {
    create?: XOR<PatentCreateWithoutTechnicalInput, PatentUncheckedCreateWithoutTechnicalInput>
    connectOrCreate?: PatentCreateOrConnectWithoutTechnicalInput
    upsert?: PatentUpsertWithoutTechnicalInput
    connect?: PatentWhereUniqueInput
    update?: XOR<XOR<PatentUpdateToOneWithWhereWithoutTechnicalInput, PatentUpdateWithoutTechnicalInput>, PatentUncheckedUpdateWithoutTechnicalInput>
  }

  export type DepartmentCreateNestedManyWithoutCollegeInput = {
    create?: XOR<DepartmentCreateWithoutCollegeInput, DepartmentUncheckedCreateWithoutCollegeInput> | DepartmentCreateWithoutCollegeInput[] | DepartmentUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: DepartmentCreateOrConnectWithoutCollegeInput | DepartmentCreateOrConnectWithoutCollegeInput[]
    createMany?: DepartmentCreateManyCollegeInputEnvelope
    connect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
  }

  export type PatentCreateNestedManyWithoutCollegeInput = {
    create?: XOR<PatentCreateWithoutCollegeInput, PatentUncheckedCreateWithoutCollegeInput> | PatentCreateWithoutCollegeInput[] | PatentUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: PatentCreateOrConnectWithoutCollegeInput | PatentCreateOrConnectWithoutCollegeInput[]
    createMany?: PatentCreateManyCollegeInputEnvelope
    connect?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
  }

  export type DepartmentUncheckedCreateNestedManyWithoutCollegeInput = {
    create?: XOR<DepartmentCreateWithoutCollegeInput, DepartmentUncheckedCreateWithoutCollegeInput> | DepartmentCreateWithoutCollegeInput[] | DepartmentUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: DepartmentCreateOrConnectWithoutCollegeInput | DepartmentCreateOrConnectWithoutCollegeInput[]
    createMany?: DepartmentCreateManyCollegeInputEnvelope
    connect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
  }

  export type PatentUncheckedCreateNestedManyWithoutCollegeInput = {
    create?: XOR<PatentCreateWithoutCollegeInput, PatentUncheckedCreateWithoutCollegeInput> | PatentCreateWithoutCollegeInput[] | PatentUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: PatentCreateOrConnectWithoutCollegeInput | PatentCreateOrConnectWithoutCollegeInput[]
    createMany?: PatentCreateManyCollegeInputEnvelope
    connect?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
  }

  export type DepartmentUpdateManyWithoutCollegeNestedInput = {
    create?: XOR<DepartmentCreateWithoutCollegeInput, DepartmentUncheckedCreateWithoutCollegeInput> | DepartmentCreateWithoutCollegeInput[] | DepartmentUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: DepartmentCreateOrConnectWithoutCollegeInput | DepartmentCreateOrConnectWithoutCollegeInput[]
    upsert?: DepartmentUpsertWithWhereUniqueWithoutCollegeInput | DepartmentUpsertWithWhereUniqueWithoutCollegeInput[]
    createMany?: DepartmentCreateManyCollegeInputEnvelope
    set?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    disconnect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    delete?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    connect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    update?: DepartmentUpdateWithWhereUniqueWithoutCollegeInput | DepartmentUpdateWithWhereUniqueWithoutCollegeInput[]
    updateMany?: DepartmentUpdateManyWithWhereWithoutCollegeInput | DepartmentUpdateManyWithWhereWithoutCollegeInput[]
    deleteMany?: DepartmentScalarWhereInput | DepartmentScalarWhereInput[]
  }

  export type PatentUpdateManyWithoutCollegeNestedInput = {
    create?: XOR<PatentCreateWithoutCollegeInput, PatentUncheckedCreateWithoutCollegeInput> | PatentCreateWithoutCollegeInput[] | PatentUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: PatentCreateOrConnectWithoutCollegeInput | PatentCreateOrConnectWithoutCollegeInput[]
    upsert?: PatentUpsertWithWhereUniqueWithoutCollegeInput | PatentUpsertWithWhereUniqueWithoutCollegeInput[]
    createMany?: PatentCreateManyCollegeInputEnvelope
    set?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    disconnect?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    delete?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    connect?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    update?: PatentUpdateWithWhereUniqueWithoutCollegeInput | PatentUpdateWithWhereUniqueWithoutCollegeInput[]
    updateMany?: PatentUpdateManyWithWhereWithoutCollegeInput | PatentUpdateManyWithWhereWithoutCollegeInput[]
    deleteMany?: PatentScalarWhereInput | PatentScalarWhereInput[]
  }

  export type DepartmentUncheckedUpdateManyWithoutCollegeNestedInput = {
    create?: XOR<DepartmentCreateWithoutCollegeInput, DepartmentUncheckedCreateWithoutCollegeInput> | DepartmentCreateWithoutCollegeInput[] | DepartmentUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: DepartmentCreateOrConnectWithoutCollegeInput | DepartmentCreateOrConnectWithoutCollegeInput[]
    upsert?: DepartmentUpsertWithWhereUniqueWithoutCollegeInput | DepartmentUpsertWithWhereUniqueWithoutCollegeInput[]
    createMany?: DepartmentCreateManyCollegeInputEnvelope
    set?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    disconnect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    delete?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    connect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    update?: DepartmentUpdateWithWhereUniqueWithoutCollegeInput | DepartmentUpdateWithWhereUniqueWithoutCollegeInput[]
    updateMany?: DepartmentUpdateManyWithWhereWithoutCollegeInput | DepartmentUpdateManyWithWhereWithoutCollegeInput[]
    deleteMany?: DepartmentScalarWhereInput | DepartmentScalarWhereInput[]
  }

  export type PatentUncheckedUpdateManyWithoutCollegeNestedInput = {
    create?: XOR<PatentCreateWithoutCollegeInput, PatentUncheckedCreateWithoutCollegeInput> | PatentCreateWithoutCollegeInput[] | PatentUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: PatentCreateOrConnectWithoutCollegeInput | PatentCreateOrConnectWithoutCollegeInput[]
    upsert?: PatentUpsertWithWhereUniqueWithoutCollegeInput | PatentUpsertWithWhereUniqueWithoutCollegeInput[]
    createMany?: PatentCreateManyCollegeInputEnvelope
    set?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    disconnect?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    delete?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    connect?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    update?: PatentUpdateWithWhereUniqueWithoutCollegeInput | PatentUpdateWithWhereUniqueWithoutCollegeInput[]
    updateMany?: PatentUpdateManyWithWhereWithoutCollegeInput | PatentUpdateManyWithWhereWithoutCollegeInput[]
    deleteMany?: PatentScalarWhereInput | PatentScalarWhereInput[]
  }

  export type CollegeCreateNestedOneWithoutDepartmentsInput = {
    create?: XOR<CollegeCreateWithoutDepartmentsInput, CollegeUncheckedCreateWithoutDepartmentsInput>
    connectOrCreate?: CollegeCreateOrConnectWithoutDepartmentsInput
    connect?: CollegeWhereUniqueInput
  }

  export type InventorCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<InventorCreateWithoutDepartmentInput, InventorUncheckedCreateWithoutDepartmentInput> | InventorCreateWithoutDepartmentInput[] | InventorUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: InventorCreateOrConnectWithoutDepartmentInput | InventorCreateOrConnectWithoutDepartmentInput[]
    createMany?: InventorCreateManyDepartmentInputEnvelope
    connect?: InventorWhereUniqueInput | InventorWhereUniqueInput[]
  }

  export type PatentCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<PatentCreateWithoutDepartmentInput, PatentUncheckedCreateWithoutDepartmentInput> | PatentCreateWithoutDepartmentInput[] | PatentUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: PatentCreateOrConnectWithoutDepartmentInput | PatentCreateOrConnectWithoutDepartmentInput[]
    createMany?: PatentCreateManyDepartmentInputEnvelope
    connect?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
  }

  export type InventorUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<InventorCreateWithoutDepartmentInput, InventorUncheckedCreateWithoutDepartmentInput> | InventorCreateWithoutDepartmentInput[] | InventorUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: InventorCreateOrConnectWithoutDepartmentInput | InventorCreateOrConnectWithoutDepartmentInput[]
    createMany?: InventorCreateManyDepartmentInputEnvelope
    connect?: InventorWhereUniqueInput | InventorWhereUniqueInput[]
  }

  export type PatentUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<PatentCreateWithoutDepartmentInput, PatentUncheckedCreateWithoutDepartmentInput> | PatentCreateWithoutDepartmentInput[] | PatentUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: PatentCreateOrConnectWithoutDepartmentInput | PatentCreateOrConnectWithoutDepartmentInput[]
    createMany?: PatentCreateManyDepartmentInputEnvelope
    connect?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
  }

  export type CollegeUpdateOneRequiredWithoutDepartmentsNestedInput = {
    create?: XOR<CollegeCreateWithoutDepartmentsInput, CollegeUncheckedCreateWithoutDepartmentsInput>
    connectOrCreate?: CollegeCreateOrConnectWithoutDepartmentsInput
    upsert?: CollegeUpsertWithoutDepartmentsInput
    connect?: CollegeWhereUniqueInput
    update?: XOR<XOR<CollegeUpdateToOneWithWhereWithoutDepartmentsInput, CollegeUpdateWithoutDepartmentsInput>, CollegeUncheckedUpdateWithoutDepartmentsInput>
  }

  export type InventorUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<InventorCreateWithoutDepartmentInput, InventorUncheckedCreateWithoutDepartmentInput> | InventorCreateWithoutDepartmentInput[] | InventorUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: InventorCreateOrConnectWithoutDepartmentInput | InventorCreateOrConnectWithoutDepartmentInput[]
    upsert?: InventorUpsertWithWhereUniqueWithoutDepartmentInput | InventorUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: InventorCreateManyDepartmentInputEnvelope
    set?: InventorWhereUniqueInput | InventorWhereUniqueInput[]
    disconnect?: InventorWhereUniqueInput | InventorWhereUniqueInput[]
    delete?: InventorWhereUniqueInput | InventorWhereUniqueInput[]
    connect?: InventorWhereUniqueInput | InventorWhereUniqueInput[]
    update?: InventorUpdateWithWhereUniqueWithoutDepartmentInput | InventorUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: InventorUpdateManyWithWhereWithoutDepartmentInput | InventorUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: InventorScalarWhereInput | InventorScalarWhereInput[]
  }

  export type PatentUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<PatentCreateWithoutDepartmentInput, PatentUncheckedCreateWithoutDepartmentInput> | PatentCreateWithoutDepartmentInput[] | PatentUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: PatentCreateOrConnectWithoutDepartmentInput | PatentCreateOrConnectWithoutDepartmentInput[]
    upsert?: PatentUpsertWithWhereUniqueWithoutDepartmentInput | PatentUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: PatentCreateManyDepartmentInputEnvelope
    set?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    disconnect?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    delete?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    connect?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    update?: PatentUpdateWithWhereUniqueWithoutDepartmentInput | PatentUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: PatentUpdateManyWithWhereWithoutDepartmentInput | PatentUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: PatentScalarWhereInput | PatentScalarWhereInput[]
  }

  export type InventorUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<InventorCreateWithoutDepartmentInput, InventorUncheckedCreateWithoutDepartmentInput> | InventorCreateWithoutDepartmentInput[] | InventorUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: InventorCreateOrConnectWithoutDepartmentInput | InventorCreateOrConnectWithoutDepartmentInput[]
    upsert?: InventorUpsertWithWhereUniqueWithoutDepartmentInput | InventorUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: InventorCreateManyDepartmentInputEnvelope
    set?: InventorWhereUniqueInput | InventorWhereUniqueInput[]
    disconnect?: InventorWhereUniqueInput | InventorWhereUniqueInput[]
    delete?: InventorWhereUniqueInput | InventorWhereUniqueInput[]
    connect?: InventorWhereUniqueInput | InventorWhereUniqueInput[]
    update?: InventorUpdateWithWhereUniqueWithoutDepartmentInput | InventorUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: InventorUpdateManyWithWhereWithoutDepartmentInput | InventorUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: InventorScalarWhereInput | InventorScalarWhereInput[]
  }

  export type PatentUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<PatentCreateWithoutDepartmentInput, PatentUncheckedCreateWithoutDepartmentInput> | PatentCreateWithoutDepartmentInput[] | PatentUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: PatentCreateOrConnectWithoutDepartmentInput | PatentCreateOrConnectWithoutDepartmentInput[]
    upsert?: PatentUpsertWithWhereUniqueWithoutDepartmentInput | PatentUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: PatentCreateManyDepartmentInputEnvelope
    set?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    disconnect?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    delete?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    connect?: PatentWhereUniqueInput | PatentWhereUniqueInput[]
    update?: PatentUpdateWithWhereUniqueWithoutDepartmentInput | PatentUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: PatentUpdateManyWithWhereWithoutDepartmentInput | PatentUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: PatentScalarWhereInput | PatentScalarWhereInput[]
  }

  export type PatentApplicationDataCreateNestedManyWithoutCountryInput = {
    create?: XOR<PatentApplicationDataCreateWithoutCountryInput, PatentApplicationDataUncheckedCreateWithoutCountryInput> | PatentApplicationDataCreateWithoutCountryInput[] | PatentApplicationDataUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: PatentApplicationDataCreateOrConnectWithoutCountryInput | PatentApplicationDataCreateOrConnectWithoutCountryInput[]
    createMany?: PatentApplicationDataCreateManyCountryInputEnvelope
    connect?: PatentApplicationDataWhereUniqueInput | PatentApplicationDataWhereUniqueInput[]
  }

  export type PatentApplicationDataUncheckedCreateNestedManyWithoutCountryInput = {
    create?: XOR<PatentApplicationDataCreateWithoutCountryInput, PatentApplicationDataUncheckedCreateWithoutCountryInput> | PatentApplicationDataCreateWithoutCountryInput[] | PatentApplicationDataUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: PatentApplicationDataCreateOrConnectWithoutCountryInput | PatentApplicationDataCreateOrConnectWithoutCountryInput[]
    createMany?: PatentApplicationDataCreateManyCountryInputEnvelope
    connect?: PatentApplicationDataWhereUniqueInput | PatentApplicationDataWhereUniqueInput[]
  }

  export type PatentApplicationDataUpdateManyWithoutCountryNestedInput = {
    create?: XOR<PatentApplicationDataCreateWithoutCountryInput, PatentApplicationDataUncheckedCreateWithoutCountryInput> | PatentApplicationDataCreateWithoutCountryInput[] | PatentApplicationDataUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: PatentApplicationDataCreateOrConnectWithoutCountryInput | PatentApplicationDataCreateOrConnectWithoutCountryInput[]
    upsert?: PatentApplicationDataUpsertWithWhereUniqueWithoutCountryInput | PatentApplicationDataUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: PatentApplicationDataCreateManyCountryInputEnvelope
    set?: PatentApplicationDataWhereUniqueInput | PatentApplicationDataWhereUniqueInput[]
    disconnect?: PatentApplicationDataWhereUniqueInput | PatentApplicationDataWhereUniqueInput[]
    delete?: PatentApplicationDataWhereUniqueInput | PatentApplicationDataWhereUniqueInput[]
    connect?: PatentApplicationDataWhereUniqueInput | PatentApplicationDataWhereUniqueInput[]
    update?: PatentApplicationDataUpdateWithWhereUniqueWithoutCountryInput | PatentApplicationDataUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: PatentApplicationDataUpdateManyWithWhereWithoutCountryInput | PatentApplicationDataUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: PatentApplicationDataScalarWhereInput | PatentApplicationDataScalarWhereInput[]
  }

  export type PatentApplicationDataUncheckedUpdateManyWithoutCountryNestedInput = {
    create?: XOR<PatentApplicationDataCreateWithoutCountryInput, PatentApplicationDataUncheckedCreateWithoutCountryInput> | PatentApplicationDataCreateWithoutCountryInput[] | PatentApplicationDataUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: PatentApplicationDataCreateOrConnectWithoutCountryInput | PatentApplicationDataCreateOrConnectWithoutCountryInput[]
    upsert?: PatentApplicationDataUpsertWithWhereUniqueWithoutCountryInput | PatentApplicationDataUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: PatentApplicationDataCreateManyCountryInputEnvelope
    set?: PatentApplicationDataWhereUniqueInput | PatentApplicationDataWhereUniqueInput[]
    disconnect?: PatentApplicationDataWhereUniqueInput | PatentApplicationDataWhereUniqueInput[]
    delete?: PatentApplicationDataWhereUniqueInput | PatentApplicationDataWhereUniqueInput[]
    connect?: PatentApplicationDataWhereUniqueInput | PatentApplicationDataWhereUniqueInput[]
    update?: PatentApplicationDataUpdateWithWhereUniqueWithoutCountryInput | PatentApplicationDataUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: PatentApplicationDataUpdateManyWithWhereWithoutCountryInput | PatentApplicationDataUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: PatentApplicationDataScalarWhereInput | PatentApplicationDataScalarWhereInput[]
  }

  export type AgencyContactPersonCreateNestedOneWithoutContactInfoInput = {
    create?: XOR<AgencyContactPersonCreateWithoutContactInfoInput, AgencyContactPersonUncheckedCreateWithoutContactInfoInput>
    connectOrCreate?: AgencyContactPersonCreateOrConnectWithoutContactInfoInput
    connect?: AgencyContactPersonWhereUniqueInput
  }

  export type InventorCreateNestedOneWithoutContactInfoInput = {
    create?: XOR<InventorCreateWithoutContactInfoInput, InventorUncheckedCreateWithoutContactInfoInput>
    connectOrCreate?: InventorCreateOrConnectWithoutContactInfoInput
    connect?: InventorWhereUniqueInput
  }

  export type AgencyContactPersonUncheckedCreateNestedOneWithoutContactInfoInput = {
    create?: XOR<AgencyContactPersonCreateWithoutContactInfoInput, AgencyContactPersonUncheckedCreateWithoutContactInfoInput>
    connectOrCreate?: AgencyContactPersonCreateOrConnectWithoutContactInfoInput
    connect?: AgencyContactPersonWhereUniqueInput
  }

  export type InventorUncheckedCreateNestedOneWithoutContactInfoInput = {
    create?: XOR<InventorCreateWithoutContactInfoInput, InventorUncheckedCreateWithoutContactInfoInput>
    connectOrCreate?: InventorCreateOrConnectWithoutContactInfoInput
    connect?: InventorWhereUniqueInput
  }

  export type AgencyContactPersonUpdateOneWithoutContactInfoNestedInput = {
    create?: XOR<AgencyContactPersonCreateWithoutContactInfoInput, AgencyContactPersonUncheckedCreateWithoutContactInfoInput>
    connectOrCreate?: AgencyContactPersonCreateOrConnectWithoutContactInfoInput
    upsert?: AgencyContactPersonUpsertWithoutContactInfoInput
    disconnect?: AgencyContactPersonWhereInput | boolean
    delete?: AgencyContactPersonWhereInput | boolean
    connect?: AgencyContactPersonWhereUniqueInput
    update?: XOR<XOR<AgencyContactPersonUpdateToOneWithWhereWithoutContactInfoInput, AgencyContactPersonUpdateWithoutContactInfoInput>, AgencyContactPersonUncheckedUpdateWithoutContactInfoInput>
  }

  export type InventorUpdateOneWithoutContactInfoNestedInput = {
    create?: XOR<InventorCreateWithoutContactInfoInput, InventorUncheckedCreateWithoutContactInfoInput>
    connectOrCreate?: InventorCreateOrConnectWithoutContactInfoInput
    upsert?: InventorUpsertWithoutContactInfoInput
    disconnect?: InventorWhereInput | boolean
    delete?: InventorWhereInput | boolean
    connect?: InventorWhereUniqueInput
    update?: XOR<XOR<InventorUpdateToOneWithWhereWithoutContactInfoInput, InventorUpdateWithoutContactInfoInput>, InventorUncheckedUpdateWithoutContactInfoInput>
  }

  export type AgencyContactPersonUncheckedUpdateOneWithoutContactInfoNestedInput = {
    create?: XOR<AgencyContactPersonCreateWithoutContactInfoInput, AgencyContactPersonUncheckedCreateWithoutContactInfoInput>
    connectOrCreate?: AgencyContactPersonCreateOrConnectWithoutContactInfoInput
    upsert?: AgencyContactPersonUpsertWithoutContactInfoInput
    disconnect?: AgencyContactPersonWhereInput | boolean
    delete?: AgencyContactPersonWhereInput | boolean
    connect?: AgencyContactPersonWhereUniqueInput
    update?: XOR<XOR<AgencyContactPersonUpdateToOneWithWhereWithoutContactInfoInput, AgencyContactPersonUpdateWithoutContactInfoInput>, AgencyContactPersonUncheckedUpdateWithoutContactInfoInput>
  }

  export type InventorUncheckedUpdateOneWithoutContactInfoNestedInput = {
    create?: XOR<InventorCreateWithoutContactInfoInput, InventorUncheckedCreateWithoutContactInfoInput>
    connectOrCreate?: InventorCreateOrConnectWithoutContactInfoInput
    upsert?: InventorUpsertWithoutContactInfoInput
    disconnect?: InventorWhereInput | boolean
    delete?: InventorWhereInput | boolean
    connect?: InventorWhereUniqueInput
    update?: XOR<XOR<InventorUpdateToOneWithWhereWithoutContactInfoInput, InventorUpdateWithoutContactInfoInput>, InventorUncheckedUpdateWithoutContactInfoInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AgencyContactPersonCreateWithoutAgencyInput = {
    Position: string
    contactInfo?: ContactInfoCreateNestedOneWithoutAgencyContactInput
  }

  export type AgencyContactPersonUncheckedCreateWithoutAgencyInput = {
    ContactPersonID?: number
    Position: string
    ContactInfoID?: number | null
  }

  export type AgencyContactPersonCreateOrConnectWithoutAgencyInput = {
    where: AgencyContactPersonWhereUniqueInput
    create: XOR<AgencyContactPersonCreateWithoutAgencyInput, AgencyContactPersonUncheckedCreateWithoutAgencyInput>
  }

  export type AgencyContactPersonCreateManyAgencyInputEnvelope = {
    data: AgencyContactPersonCreateManyAgencyInput | AgencyContactPersonCreateManyAgencyInput[]
  }

  export type AgencyPatentCreateWithoutAgencyInput = {
    FileCode: string
    Role: string
    Details?: string | null
    patent: PatentCreateNestedOneWithoutAgenciesInput
  }

  export type AgencyPatentUncheckedCreateWithoutAgencyInput = {
    PatentID: number
    FileCode: string
    Role: string
    Details?: string | null
  }

  export type AgencyPatentCreateOrConnectWithoutAgencyInput = {
    where: AgencyPatentWhereUniqueInput
    create: XOR<AgencyPatentCreateWithoutAgencyInput, AgencyPatentUncheckedCreateWithoutAgencyInput>
  }

  export type AgencyPatentCreateManyAgencyInputEnvelope = {
    data: AgencyPatentCreateManyAgencyInput | AgencyPatentCreateManyAgencyInput[]
  }

  export type AgencyContactPersonUpsertWithWhereUniqueWithoutAgencyInput = {
    where: AgencyContactPersonWhereUniqueInput
    update: XOR<AgencyContactPersonUpdateWithoutAgencyInput, AgencyContactPersonUncheckedUpdateWithoutAgencyInput>
    create: XOR<AgencyContactPersonCreateWithoutAgencyInput, AgencyContactPersonUncheckedCreateWithoutAgencyInput>
  }

  export type AgencyContactPersonUpdateWithWhereUniqueWithoutAgencyInput = {
    where: AgencyContactPersonWhereUniqueInput
    data: XOR<AgencyContactPersonUpdateWithoutAgencyInput, AgencyContactPersonUncheckedUpdateWithoutAgencyInput>
  }

  export type AgencyContactPersonUpdateManyWithWhereWithoutAgencyInput = {
    where: AgencyContactPersonScalarWhereInput
    data: XOR<AgencyContactPersonUpdateManyMutationInput, AgencyContactPersonUncheckedUpdateManyWithoutAgencyInput>
  }

  export type AgencyContactPersonScalarWhereInput = {
    AND?: AgencyContactPersonScalarWhereInput | AgencyContactPersonScalarWhereInput[]
    OR?: AgencyContactPersonScalarWhereInput[]
    NOT?: AgencyContactPersonScalarWhereInput | AgencyContactPersonScalarWhereInput[]
    ContactPersonID?: IntFilter<"AgencyContactPerson"> | number
    AgencyID?: IntFilter<"AgencyContactPerson"> | number
    Position?: StringFilter<"AgencyContactPerson"> | string
    ContactInfoID?: IntNullableFilter<"AgencyContactPerson"> | number | null
  }

  export type AgencyPatentUpsertWithWhereUniqueWithoutAgencyInput = {
    where: AgencyPatentWhereUniqueInput
    update: XOR<AgencyPatentUpdateWithoutAgencyInput, AgencyPatentUncheckedUpdateWithoutAgencyInput>
    create: XOR<AgencyPatentCreateWithoutAgencyInput, AgencyPatentUncheckedCreateWithoutAgencyInput>
  }

  export type AgencyPatentUpdateWithWhereUniqueWithoutAgencyInput = {
    where: AgencyPatentWhereUniqueInput
    data: XOR<AgencyPatentUpdateWithoutAgencyInput, AgencyPatentUncheckedUpdateWithoutAgencyInput>
  }

  export type AgencyPatentUpdateManyWithWhereWithoutAgencyInput = {
    where: AgencyPatentScalarWhereInput
    data: XOR<AgencyPatentUpdateManyMutationInput, AgencyPatentUncheckedUpdateManyWithoutAgencyInput>
  }

  export type AgencyPatentScalarWhereInput = {
    AND?: AgencyPatentScalarWhereInput | AgencyPatentScalarWhereInput[]
    OR?: AgencyPatentScalarWhereInput[]
    NOT?: AgencyPatentScalarWhereInput | AgencyPatentScalarWhereInput[]
    PatentID?: IntFilter<"AgencyPatent"> | number
    AgencyID?: IntFilter<"AgencyPatent"> | number
    FileCode?: StringFilter<"AgencyPatent"> | string
    Role?: StringFilter<"AgencyPatent"> | string
    Details?: StringNullableFilter<"AgencyPatent"> | string | null
  }

  export type AgencyCreateWithoutPatentsInput = {
    Name: string
    contacts?: AgencyContactPersonCreateNestedManyWithoutAgencyInput
  }

  export type AgencyUncheckedCreateWithoutPatentsInput = {
    AgencyID?: number
    Name: string
    contacts?: AgencyContactPersonUncheckedCreateNestedManyWithoutAgencyInput
  }

  export type AgencyCreateOrConnectWithoutPatentsInput = {
    where: AgencyWhereUniqueInput
    create: XOR<AgencyCreateWithoutPatentsInput, AgencyUncheckedCreateWithoutPatentsInput>
  }

  export type PatentCreateWithoutAgenciesInput = {
    Year: string
    InternalID: string
    Title: string
    TitleEnglish?: string | null
    college: CollegeCreateNestedOneWithoutPatentsInput
    department: DepartmentCreateNestedOneWithoutPatentsInput
    application?: PatentApplicationDataCreateNestedOneWithoutPatentInput
    funding?: PatentFundingCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorCreateNestedManyWithoutPatentInput
    status?: PatentStatusCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesCreateNestedOneWithoutPatentInput
  }

  export type PatentUncheckedCreateWithoutAgenciesInput = {
    PatentID?: number
    Year: string
    InternalID: string
    Title: string
    DepartmentID: number
    CollegeID: number
    TitleEnglish?: string | null
    application?: PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInput
    funding?: PatentFundingUncheckedCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorUncheckedCreateNestedManyWithoutPatentInput
    status?: PatentStatusUncheckedCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInput
  }

  export type PatentCreateOrConnectWithoutAgenciesInput = {
    where: PatentWhereUniqueInput
    create: XOR<PatentCreateWithoutAgenciesInput, PatentUncheckedCreateWithoutAgenciesInput>
  }

  export type AgencyUpsertWithoutPatentsInput = {
    update: XOR<AgencyUpdateWithoutPatentsInput, AgencyUncheckedUpdateWithoutPatentsInput>
    create: XOR<AgencyCreateWithoutPatentsInput, AgencyUncheckedCreateWithoutPatentsInput>
    where?: AgencyWhereInput
  }

  export type AgencyUpdateToOneWithWhereWithoutPatentsInput = {
    where?: AgencyWhereInput
    data: XOR<AgencyUpdateWithoutPatentsInput, AgencyUncheckedUpdateWithoutPatentsInput>
  }

  export type AgencyUpdateWithoutPatentsInput = {
    Name?: StringFieldUpdateOperationsInput | string
    contacts?: AgencyContactPersonUpdateManyWithoutAgencyNestedInput
  }

  export type AgencyUncheckedUpdateWithoutPatentsInput = {
    AgencyID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    contacts?: AgencyContactPersonUncheckedUpdateManyWithoutAgencyNestedInput
  }

  export type PatentUpsertWithoutAgenciesInput = {
    update: XOR<PatentUpdateWithoutAgenciesInput, PatentUncheckedUpdateWithoutAgenciesInput>
    create: XOR<PatentCreateWithoutAgenciesInput, PatentUncheckedCreateWithoutAgenciesInput>
    where?: PatentWhereInput
  }

  export type PatentUpdateToOneWithWhereWithoutAgenciesInput = {
    where?: PatentWhereInput
    data: XOR<PatentUpdateWithoutAgenciesInput, PatentUncheckedUpdateWithoutAgenciesInput>
  }

  export type PatentUpdateWithoutAgenciesInput = {
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    college?: CollegeUpdateOneRequiredWithoutPatentsNestedInput
    department?: DepartmentUpdateOneRequiredWithoutPatentsNestedInput
    application?: PatentApplicationDataUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUpdateOneWithoutPatentNestedInput
  }

  export type PatentUncheckedUpdateWithoutAgenciesInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    DepartmentID?: IntFieldUpdateOperationsInput | number
    CollegeID?: IntFieldUpdateOperationsInput | number
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    application?: PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUncheckedUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUncheckedUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUncheckedUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInput
  }

  export type ContactInfoCreateWithoutAgencyContactInput = {
    Name: string
    Email: string
    OfficeNumber?: string | null
    PhoneNumber?: string | null
    Position?: string | null
    Note?: string | null
    inventor?: InventorCreateNestedOneWithoutContactInfoInput
  }

  export type ContactInfoUncheckedCreateWithoutAgencyContactInput = {
    ContactInfoID?: number
    Name: string
    Email: string
    OfficeNumber?: string | null
    PhoneNumber?: string | null
    Position?: string | null
    Note?: string | null
    inventor?: InventorUncheckedCreateNestedOneWithoutContactInfoInput
  }

  export type ContactInfoCreateOrConnectWithoutAgencyContactInput = {
    where: ContactInfoWhereUniqueInput
    create: XOR<ContactInfoCreateWithoutAgencyContactInput, ContactInfoUncheckedCreateWithoutAgencyContactInput>
  }

  export type AgencyCreateWithoutContactsInput = {
    Name: string
    patents?: AgencyPatentCreateNestedManyWithoutAgencyInput
  }

  export type AgencyUncheckedCreateWithoutContactsInput = {
    AgencyID?: number
    Name: string
    patents?: AgencyPatentUncheckedCreateNestedManyWithoutAgencyInput
  }

  export type AgencyCreateOrConnectWithoutContactsInput = {
    where: AgencyWhereUniqueInput
    create: XOR<AgencyCreateWithoutContactsInput, AgencyUncheckedCreateWithoutContactsInput>
  }

  export type ContactInfoUpsertWithoutAgencyContactInput = {
    update: XOR<ContactInfoUpdateWithoutAgencyContactInput, ContactInfoUncheckedUpdateWithoutAgencyContactInput>
    create: XOR<ContactInfoCreateWithoutAgencyContactInput, ContactInfoUncheckedCreateWithoutAgencyContactInput>
    where?: ContactInfoWhereInput
  }

  export type ContactInfoUpdateToOneWithWhereWithoutAgencyContactInput = {
    where?: ContactInfoWhereInput
    data: XOR<ContactInfoUpdateWithoutAgencyContactInput, ContactInfoUncheckedUpdateWithoutAgencyContactInput>
  }

  export type ContactInfoUpdateWithoutAgencyContactInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Email?: StringFieldUpdateOperationsInput | string
    OfficeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    PhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    Position?: NullableStringFieldUpdateOperationsInput | string | null
    Note?: NullableStringFieldUpdateOperationsInput | string | null
    inventor?: InventorUpdateOneWithoutContactInfoNestedInput
  }

  export type ContactInfoUncheckedUpdateWithoutAgencyContactInput = {
    ContactInfoID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Email?: StringFieldUpdateOperationsInput | string
    OfficeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    PhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    Position?: NullableStringFieldUpdateOperationsInput | string | null
    Note?: NullableStringFieldUpdateOperationsInput | string | null
    inventor?: InventorUncheckedUpdateOneWithoutContactInfoNestedInput
  }

  export type AgencyUpsertWithoutContactsInput = {
    update: XOR<AgencyUpdateWithoutContactsInput, AgencyUncheckedUpdateWithoutContactsInput>
    create: XOR<AgencyCreateWithoutContactsInput, AgencyUncheckedCreateWithoutContactsInput>
    where?: AgencyWhereInput
  }

  export type AgencyUpdateToOneWithWhereWithoutContactsInput = {
    where?: AgencyWhereInput
    data: XOR<AgencyUpdateWithoutContactsInput, AgencyUncheckedUpdateWithoutContactsInput>
  }

  export type AgencyUpdateWithoutContactsInput = {
    Name?: StringFieldUpdateOperationsInput | string
    patents?: AgencyPatentUpdateManyWithoutAgencyNestedInput
  }

  export type AgencyUncheckedUpdateWithoutContactsInput = {
    AgencyID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    patents?: AgencyPatentUncheckedUpdateManyWithoutAgencyNestedInput
  }

  export type PatentFundingCreateWithoutPlanInput = {
    FundingAgency: string
    ProjectNumber: string
    patent: PatentCreateNestedOneWithoutFundingInput
  }

  export type PatentFundingUncheckedCreateWithoutPlanInput = {
    FundingID?: number
    PatentID: number
    FundingAgency: string
    ProjectNumber: string
  }

  export type PatentFundingCreateOrConnectWithoutPlanInput = {
    where: PatentFundingWhereUniqueInput
    create: XOR<PatentFundingCreateWithoutPlanInput, PatentFundingUncheckedCreateWithoutPlanInput>
  }

  export type PatentFundingCreateManyPlanInputEnvelope = {
    data: PatentFundingCreateManyPlanInput | PatentFundingCreateManyPlanInput[]
  }

  export type PatentFundingUpsertWithWhereUniqueWithoutPlanInput = {
    where: PatentFundingWhereUniqueInput
    update: XOR<PatentFundingUpdateWithoutPlanInput, PatentFundingUncheckedUpdateWithoutPlanInput>
    create: XOR<PatentFundingCreateWithoutPlanInput, PatentFundingUncheckedCreateWithoutPlanInput>
  }

  export type PatentFundingUpdateWithWhereUniqueWithoutPlanInput = {
    where: PatentFundingWhereUniqueInput
    data: XOR<PatentFundingUpdateWithoutPlanInput, PatentFundingUncheckedUpdateWithoutPlanInput>
  }

  export type PatentFundingUpdateManyWithWhereWithoutPlanInput = {
    where: PatentFundingScalarWhereInput
    data: XOR<PatentFundingUpdateManyMutationInput, PatentFundingUncheckedUpdateManyWithoutPlanInput>
  }

  export type PatentFundingScalarWhereInput = {
    AND?: PatentFundingScalarWhereInput | PatentFundingScalarWhereInput[]
    OR?: PatentFundingScalarWhereInput[]
    NOT?: PatentFundingScalarWhereInput | PatentFundingScalarWhereInput[]
    FundingID?: IntFilter<"PatentFunding"> | number
    PatentID?: IntFilter<"PatentFunding"> | number
    FundingAgency?: StringFilter<"PatentFunding"> | string
    ProjectNumber?: StringFilter<"PatentFunding"> | string
    PlanID?: IntFilter<"PatentFunding"> | number
  }

  export type FundingPlanCreateWithoutFundingsInput = {
    PlanType: number
  }

  export type FundingPlanUncheckedCreateWithoutFundingsInput = {
    PlanID?: number
    PlanType: number
  }

  export type FundingPlanCreateOrConnectWithoutFundingsInput = {
    where: FundingPlanWhereUniqueInput
    create: XOR<FundingPlanCreateWithoutFundingsInput, FundingPlanUncheckedCreateWithoutFundingsInput>
  }

  export type PatentCreateWithoutFundingInput = {
    Year: string
    InternalID: string
    Title: string
    TitleEnglish?: string | null
    agencies?: AgencyPatentCreateNestedManyWithoutPatentInput
    college: CollegeCreateNestedOneWithoutPatentsInput
    department: DepartmentCreateNestedOneWithoutPatentsInput
    application?: PatentApplicationDataCreateNestedOneWithoutPatentInput
    inventors?: PatentInventorCreateNestedManyWithoutPatentInput
    status?: PatentStatusCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesCreateNestedOneWithoutPatentInput
  }

  export type PatentUncheckedCreateWithoutFundingInput = {
    PatentID?: number
    Year: string
    InternalID: string
    Title: string
    DepartmentID: number
    CollegeID: number
    TitleEnglish?: string | null
    agencies?: AgencyPatentUncheckedCreateNestedManyWithoutPatentInput
    application?: PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInput
    inventors?: PatentInventorUncheckedCreateNestedManyWithoutPatentInput
    status?: PatentStatusUncheckedCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInput
  }

  export type PatentCreateOrConnectWithoutFundingInput = {
    where: PatentWhereUniqueInput
    create: XOR<PatentCreateWithoutFundingInput, PatentUncheckedCreateWithoutFundingInput>
  }

  export type FundingPlanUpsertWithoutFundingsInput = {
    update: XOR<FundingPlanUpdateWithoutFundingsInput, FundingPlanUncheckedUpdateWithoutFundingsInput>
    create: XOR<FundingPlanCreateWithoutFundingsInput, FundingPlanUncheckedCreateWithoutFundingsInput>
    where?: FundingPlanWhereInput
  }

  export type FundingPlanUpdateToOneWithWhereWithoutFundingsInput = {
    where?: FundingPlanWhereInput
    data: XOR<FundingPlanUpdateWithoutFundingsInput, FundingPlanUncheckedUpdateWithoutFundingsInput>
  }

  export type FundingPlanUpdateWithoutFundingsInput = {
    PlanType?: IntFieldUpdateOperationsInput | number
  }

  export type FundingPlanUncheckedUpdateWithoutFundingsInput = {
    PlanID?: IntFieldUpdateOperationsInput | number
    PlanType?: IntFieldUpdateOperationsInput | number
  }

  export type PatentUpsertWithoutFundingInput = {
    update: XOR<PatentUpdateWithoutFundingInput, PatentUncheckedUpdateWithoutFundingInput>
    create: XOR<PatentCreateWithoutFundingInput, PatentUncheckedCreateWithoutFundingInput>
    where?: PatentWhereInput
  }

  export type PatentUpdateToOneWithWhereWithoutFundingInput = {
    where?: PatentWhereInput
    data: XOR<PatentUpdateWithoutFundingInput, PatentUncheckedUpdateWithoutFundingInput>
  }

  export type PatentUpdateWithoutFundingInput = {
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUpdateManyWithoutPatentNestedInput
    college?: CollegeUpdateOneRequiredWithoutPatentsNestedInput
    department?: DepartmentUpdateOneRequiredWithoutPatentsNestedInput
    application?: PatentApplicationDataUpdateOneWithoutPatentNestedInput
    inventors?: PatentInventorUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUpdateOneWithoutPatentNestedInput
  }

  export type PatentUncheckedUpdateWithoutFundingInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    DepartmentID?: IntFieldUpdateOperationsInput | number
    CollegeID?: IntFieldUpdateOperationsInput | number
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUncheckedUpdateManyWithoutPatentNestedInput
    application?: PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInput
    inventors?: PatentInventorUncheckedUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUncheckedUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInput
  }

  export type ContactInfoCreateWithoutInventorInput = {
    Name: string
    Email: string
    OfficeNumber?: string | null
    PhoneNumber?: string | null
    Position?: string | null
    Note?: string | null
    agencyContact?: AgencyContactPersonCreateNestedOneWithoutContactInfoInput
  }

  export type ContactInfoUncheckedCreateWithoutInventorInput = {
    ContactInfoID?: number
    Name: string
    Email: string
    OfficeNumber?: string | null
    PhoneNumber?: string | null
    Position?: string | null
    Note?: string | null
    agencyContact?: AgencyContactPersonUncheckedCreateNestedOneWithoutContactInfoInput
  }

  export type ContactInfoCreateOrConnectWithoutInventorInput = {
    where: ContactInfoWhereUniqueInput
    create: XOR<ContactInfoCreateWithoutInventorInput, ContactInfoUncheckedCreateWithoutInventorInput>
  }

  export type DepartmentCreateWithoutInventorsInput = {
    Name: string
    Description?: string | null
    college: CollegeCreateNestedOneWithoutDepartmentsInput
    patents?: PatentCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateWithoutInventorsInput = {
    DepartmentID?: number
    Name: string
    CollegeID: number
    Description?: string | null
    patents?: PatentUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentCreateOrConnectWithoutInventorsInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutInventorsInput, DepartmentUncheckedCreateWithoutInventorsInput>
  }

  export type PatentInventorCreateWithoutInventorInput = {
    Main: boolean
    patent: PatentCreateNestedOneWithoutInventorsInput
  }

  export type PatentInventorUncheckedCreateWithoutInventorInput = {
    PatentID: number
    Main: boolean
  }

  export type PatentInventorCreateOrConnectWithoutInventorInput = {
    where: PatentInventorWhereUniqueInput
    create: XOR<PatentInventorCreateWithoutInventorInput, PatentInventorUncheckedCreateWithoutInventorInput>
  }

  export type PatentInventorCreateManyInventorInputEnvelope = {
    data: PatentInventorCreateManyInventorInput | PatentInventorCreateManyInventorInput[]
  }

  export type ContactInfoUpsertWithoutInventorInput = {
    update: XOR<ContactInfoUpdateWithoutInventorInput, ContactInfoUncheckedUpdateWithoutInventorInput>
    create: XOR<ContactInfoCreateWithoutInventorInput, ContactInfoUncheckedCreateWithoutInventorInput>
    where?: ContactInfoWhereInput
  }

  export type ContactInfoUpdateToOneWithWhereWithoutInventorInput = {
    where?: ContactInfoWhereInput
    data: XOR<ContactInfoUpdateWithoutInventorInput, ContactInfoUncheckedUpdateWithoutInventorInput>
  }

  export type ContactInfoUpdateWithoutInventorInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Email?: StringFieldUpdateOperationsInput | string
    OfficeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    PhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    Position?: NullableStringFieldUpdateOperationsInput | string | null
    Note?: NullableStringFieldUpdateOperationsInput | string | null
    agencyContact?: AgencyContactPersonUpdateOneWithoutContactInfoNestedInput
  }

  export type ContactInfoUncheckedUpdateWithoutInventorInput = {
    ContactInfoID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Email?: StringFieldUpdateOperationsInput | string
    OfficeNumber?: NullableStringFieldUpdateOperationsInput | string | null
    PhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    Position?: NullableStringFieldUpdateOperationsInput | string | null
    Note?: NullableStringFieldUpdateOperationsInput | string | null
    agencyContact?: AgencyContactPersonUncheckedUpdateOneWithoutContactInfoNestedInput
  }

  export type DepartmentUpsertWithoutInventorsInput = {
    update: XOR<DepartmentUpdateWithoutInventorsInput, DepartmentUncheckedUpdateWithoutInventorsInput>
    create: XOR<DepartmentCreateWithoutInventorsInput, DepartmentUncheckedCreateWithoutInventorsInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutInventorsInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutInventorsInput, DepartmentUncheckedUpdateWithoutInventorsInput>
  }

  export type DepartmentUpdateWithoutInventorsInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    college?: CollegeUpdateOneRequiredWithoutDepartmentsNestedInput
    patents?: PatentUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateWithoutInventorsInput = {
    DepartmentID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    CollegeID?: IntFieldUpdateOperationsInput | number
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    patents?: PatentUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type PatentInventorUpsertWithWhereUniqueWithoutInventorInput = {
    where: PatentInventorWhereUniqueInput
    update: XOR<PatentInventorUpdateWithoutInventorInput, PatentInventorUncheckedUpdateWithoutInventorInput>
    create: XOR<PatentInventorCreateWithoutInventorInput, PatentInventorUncheckedCreateWithoutInventorInput>
  }

  export type PatentInventorUpdateWithWhereUniqueWithoutInventorInput = {
    where: PatentInventorWhereUniqueInput
    data: XOR<PatentInventorUpdateWithoutInventorInput, PatentInventorUncheckedUpdateWithoutInventorInput>
  }

  export type PatentInventorUpdateManyWithWhereWithoutInventorInput = {
    where: PatentInventorScalarWhereInput
    data: XOR<PatentInventorUpdateManyMutationInput, PatentInventorUncheckedUpdateManyWithoutInventorInput>
  }

  export type PatentInventorScalarWhereInput = {
    AND?: PatentInventorScalarWhereInput | PatentInventorScalarWhereInput[]
    OR?: PatentInventorScalarWhereInput[]
    NOT?: PatentInventorScalarWhereInput | PatentInventorScalarWhereInput[]
    PatentID?: IntFilter<"PatentInventor"> | number
    InventorID?: IntFilter<"PatentInventor"> | number
    Main?: BoolFilter<"PatentInventor"> | boolean
  }

  export type InventorCreateWithoutPatentsInput = {
    Name: string
    Email?: string | null
    contactInfo?: ContactInfoCreateNestedOneWithoutInventorInput
    department: DepartmentCreateNestedOneWithoutInventorsInput
  }

  export type InventorUncheckedCreateWithoutPatentsInput = {
    InventorID?: number
    Name: string
    Department: number
    Email?: string | null
    ContactInfoID?: number | null
  }

  export type InventorCreateOrConnectWithoutPatentsInput = {
    where: InventorWhereUniqueInput
    create: XOR<InventorCreateWithoutPatentsInput, InventorUncheckedCreateWithoutPatentsInput>
  }

  export type PatentCreateWithoutInventorsInput = {
    Year: string
    InternalID: string
    Title: string
    TitleEnglish?: string | null
    agencies?: AgencyPatentCreateNestedManyWithoutPatentInput
    college: CollegeCreateNestedOneWithoutPatentsInput
    department: DepartmentCreateNestedOneWithoutPatentsInput
    application?: PatentApplicationDataCreateNestedOneWithoutPatentInput
    funding?: PatentFundingCreateNestedManyWithoutPatentInput
    status?: PatentStatusCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesCreateNestedOneWithoutPatentInput
  }

  export type PatentUncheckedCreateWithoutInventorsInput = {
    PatentID?: number
    Year: string
    InternalID: string
    Title: string
    DepartmentID: number
    CollegeID: number
    TitleEnglish?: string | null
    agencies?: AgencyPatentUncheckedCreateNestedManyWithoutPatentInput
    application?: PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInput
    funding?: PatentFundingUncheckedCreateNestedManyWithoutPatentInput
    status?: PatentStatusUncheckedCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInput
  }

  export type PatentCreateOrConnectWithoutInventorsInput = {
    where: PatentWhereUniqueInput
    create: XOR<PatentCreateWithoutInventorsInput, PatentUncheckedCreateWithoutInventorsInput>
  }

  export type InventorUpsertWithoutPatentsInput = {
    update: XOR<InventorUpdateWithoutPatentsInput, InventorUncheckedUpdateWithoutPatentsInput>
    create: XOR<InventorCreateWithoutPatentsInput, InventorUncheckedCreateWithoutPatentsInput>
    where?: InventorWhereInput
  }

  export type InventorUpdateToOneWithWhereWithoutPatentsInput = {
    where?: InventorWhereInput
    data: XOR<InventorUpdateWithoutPatentsInput, InventorUncheckedUpdateWithoutPatentsInput>
  }

  export type InventorUpdateWithoutPatentsInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: ContactInfoUpdateOneWithoutInventorNestedInput
    department?: DepartmentUpdateOneRequiredWithoutInventorsNestedInput
  }

  export type InventorUncheckedUpdateWithoutPatentsInput = {
    InventorID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Department?: IntFieldUpdateOperationsInput | number
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    ContactInfoID?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PatentUpsertWithoutInventorsInput = {
    update: XOR<PatentUpdateWithoutInventorsInput, PatentUncheckedUpdateWithoutInventorsInput>
    create: XOR<PatentCreateWithoutInventorsInput, PatentUncheckedCreateWithoutInventorsInput>
    where?: PatentWhereInput
  }

  export type PatentUpdateToOneWithWhereWithoutInventorsInput = {
    where?: PatentWhereInput
    data: XOR<PatentUpdateWithoutInventorsInput, PatentUncheckedUpdateWithoutInventorsInput>
  }

  export type PatentUpdateWithoutInventorsInput = {
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUpdateManyWithoutPatentNestedInput
    college?: CollegeUpdateOneRequiredWithoutPatentsNestedInput
    department?: DepartmentUpdateOneRequiredWithoutPatentsNestedInput
    application?: PatentApplicationDataUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUpdateOneWithoutPatentNestedInput
  }

  export type PatentUncheckedUpdateWithoutInventorsInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    DepartmentID?: IntFieldUpdateOperationsInput | number
    CollegeID?: IntFieldUpdateOperationsInput | number
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUncheckedUpdateManyWithoutPatentNestedInput
    application?: PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUncheckedUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUncheckedUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInput
  }

  export type AgencyPatentCreateWithoutPatentInput = {
    FileCode: string
    Role: string
    Details?: string | null
    agency: AgencyCreateNestedOneWithoutPatentsInput
  }

  export type AgencyPatentUncheckedCreateWithoutPatentInput = {
    AgencyID: number
    FileCode: string
    Role: string
    Details?: string | null
  }

  export type AgencyPatentCreateOrConnectWithoutPatentInput = {
    where: AgencyPatentWhereUniqueInput
    create: XOR<AgencyPatentCreateWithoutPatentInput, AgencyPatentUncheckedCreateWithoutPatentInput>
  }

  export type AgencyPatentCreateManyPatentInputEnvelope = {
    data: AgencyPatentCreateManyPatentInput | AgencyPatentCreateManyPatentInput[]
  }

  export type CollegeCreateWithoutPatentsInput = {
    Name: string
    Description?: string | null
    departments?: DepartmentCreateNestedManyWithoutCollegeInput
  }

  export type CollegeUncheckedCreateWithoutPatentsInput = {
    CollegeID?: number
    Name: string
    Description?: string | null
    departments?: DepartmentUncheckedCreateNestedManyWithoutCollegeInput
  }

  export type CollegeCreateOrConnectWithoutPatentsInput = {
    where: CollegeWhereUniqueInput
    create: XOR<CollegeCreateWithoutPatentsInput, CollegeUncheckedCreateWithoutPatentsInput>
  }

  export type DepartmentCreateWithoutPatentsInput = {
    Name: string
    Description?: string | null
    college: CollegeCreateNestedOneWithoutDepartmentsInput
    inventors?: InventorCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateWithoutPatentsInput = {
    DepartmentID?: number
    Name: string
    CollegeID: number
    Description?: string | null
    inventors?: InventorUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentCreateOrConnectWithoutPatentsInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutPatentsInput, DepartmentUncheckedCreateWithoutPatentsInput>
  }

  export type PatentApplicationDataCreateWithoutPatentInput = {
    PatentNumber: string
    FilingDate?: Date | string | null
    GrantDate?: Date | string | null
    PatentType: string
    ApplicationNumber: string
    country: CountryCreateNestedOneWithoutApplicationsInput
  }

  export type PatentApplicationDataUncheckedCreateWithoutPatentInput = {
    CountryID: number
    PatentNumber: string
    FilingDate?: Date | string | null
    GrantDate?: Date | string | null
    PatentType: string
    ApplicationNumber: string
  }

  export type PatentApplicationDataCreateOrConnectWithoutPatentInput = {
    where: PatentApplicationDataWhereUniqueInput
    create: XOR<PatentApplicationDataCreateWithoutPatentInput, PatentApplicationDataUncheckedCreateWithoutPatentInput>
  }

  export type PatentFundingCreateWithoutPatentInput = {
    FundingAgency: string
    ProjectNumber: string
    plan: FundingPlanCreateNestedOneWithoutFundingsInput
  }

  export type PatentFundingUncheckedCreateWithoutPatentInput = {
    FundingID?: number
    FundingAgency: string
    ProjectNumber: string
    PlanID: number
  }

  export type PatentFundingCreateOrConnectWithoutPatentInput = {
    where: PatentFundingWhereUniqueInput
    create: XOR<PatentFundingCreateWithoutPatentInput, PatentFundingUncheckedCreateWithoutPatentInput>
  }

  export type PatentFundingCreateManyPatentInputEnvelope = {
    data: PatentFundingCreateManyPatentInput | PatentFundingCreateManyPatentInput[]
  }

  export type PatentInventorCreateWithoutPatentInput = {
    Main: boolean
    inventor: InventorCreateNestedOneWithoutPatentsInput
  }

  export type PatentInventorUncheckedCreateWithoutPatentInput = {
    InventorID: number
    Main: boolean
  }

  export type PatentInventorCreateOrConnectWithoutPatentInput = {
    where: PatentInventorWhereUniqueInput
    create: XOR<PatentInventorCreateWithoutPatentInput, PatentInventorUncheckedCreateWithoutPatentInput>
  }

  export type PatentInventorCreateManyPatentInputEnvelope = {
    data: PatentInventorCreateManyPatentInput | PatentInventorCreateManyPatentInput[]
  }

  export type PatentStatusCreateWithoutPatentInput = {
    ExpiryDate?: Date | string | null
    Status: string
    TechnicalCommitteeReviewDate?: Date | string | null
    MaintenanceYear?: number | null
    MaintenanceStartDate?: Date | string | null
    MaintenanceEndDate?: Date | string | null
  }

  export type PatentStatusUncheckedCreateWithoutPatentInput = {
    ExpiryDate?: Date | string | null
    Status: string
    TechnicalCommitteeReviewDate?: Date | string | null
    MaintenanceYear?: number | null
    MaintenanceStartDate?: Date | string | null
    MaintenanceEndDate?: Date | string | null
  }

  export type PatentStatusCreateOrConnectWithoutPatentInput = {
    where: PatentStatusWhereUniqueInput
    create: XOR<PatentStatusCreateWithoutPatentInput, PatentStatusUncheckedCreateWithoutPatentInput>
  }

  export type PatentTechnicalAttributesCreateWithoutPatentInput = {
    IPC: string
    Scope: string
    MaturityLevel: string
    Keywords: string
  }

  export type PatentTechnicalAttributesUncheckedCreateWithoutPatentInput = {
    IPC: string
    Scope: string
    MaturityLevel: string
    Keywords: string
  }

  export type PatentTechnicalAttributesCreateOrConnectWithoutPatentInput = {
    where: PatentTechnicalAttributesWhereUniqueInput
    create: XOR<PatentTechnicalAttributesCreateWithoutPatentInput, PatentTechnicalAttributesUncheckedCreateWithoutPatentInput>
  }

  export type AgencyPatentUpsertWithWhereUniqueWithoutPatentInput = {
    where: AgencyPatentWhereUniqueInput
    update: XOR<AgencyPatentUpdateWithoutPatentInput, AgencyPatentUncheckedUpdateWithoutPatentInput>
    create: XOR<AgencyPatentCreateWithoutPatentInput, AgencyPatentUncheckedCreateWithoutPatentInput>
  }

  export type AgencyPatentUpdateWithWhereUniqueWithoutPatentInput = {
    where: AgencyPatentWhereUniqueInput
    data: XOR<AgencyPatentUpdateWithoutPatentInput, AgencyPatentUncheckedUpdateWithoutPatentInput>
  }

  export type AgencyPatentUpdateManyWithWhereWithoutPatentInput = {
    where: AgencyPatentScalarWhereInput
    data: XOR<AgencyPatentUpdateManyMutationInput, AgencyPatentUncheckedUpdateManyWithoutPatentInput>
  }

  export type CollegeUpsertWithoutPatentsInput = {
    update: XOR<CollegeUpdateWithoutPatentsInput, CollegeUncheckedUpdateWithoutPatentsInput>
    create: XOR<CollegeCreateWithoutPatentsInput, CollegeUncheckedCreateWithoutPatentsInput>
    where?: CollegeWhereInput
  }

  export type CollegeUpdateToOneWithWhereWithoutPatentsInput = {
    where?: CollegeWhereInput
    data: XOR<CollegeUpdateWithoutPatentsInput, CollegeUncheckedUpdateWithoutPatentsInput>
  }

  export type CollegeUpdateWithoutPatentsInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: DepartmentUpdateManyWithoutCollegeNestedInput
  }

  export type CollegeUncheckedUpdateWithoutPatentsInput = {
    CollegeID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: DepartmentUncheckedUpdateManyWithoutCollegeNestedInput
  }

  export type DepartmentUpsertWithoutPatentsInput = {
    update: XOR<DepartmentUpdateWithoutPatentsInput, DepartmentUncheckedUpdateWithoutPatentsInput>
    create: XOR<DepartmentCreateWithoutPatentsInput, DepartmentUncheckedCreateWithoutPatentsInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutPatentsInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutPatentsInput, DepartmentUncheckedUpdateWithoutPatentsInput>
  }

  export type DepartmentUpdateWithoutPatentsInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    college?: CollegeUpdateOneRequiredWithoutDepartmentsNestedInput
    inventors?: InventorUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateWithoutPatentsInput = {
    DepartmentID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    CollegeID?: IntFieldUpdateOperationsInput | number
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    inventors?: InventorUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type PatentApplicationDataUpsertWithoutPatentInput = {
    update: XOR<PatentApplicationDataUpdateWithoutPatentInput, PatentApplicationDataUncheckedUpdateWithoutPatentInput>
    create: XOR<PatentApplicationDataCreateWithoutPatentInput, PatentApplicationDataUncheckedCreateWithoutPatentInput>
    where?: PatentApplicationDataWhereInput
  }

  export type PatentApplicationDataUpdateToOneWithWhereWithoutPatentInput = {
    where?: PatentApplicationDataWhereInput
    data: XOR<PatentApplicationDataUpdateWithoutPatentInput, PatentApplicationDataUncheckedUpdateWithoutPatentInput>
  }

  export type PatentApplicationDataUpdateWithoutPatentInput = {
    PatentNumber?: StringFieldUpdateOperationsInput | string
    FilingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    GrantDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PatentType?: StringFieldUpdateOperationsInput | string
    ApplicationNumber?: StringFieldUpdateOperationsInput | string
    country?: CountryUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type PatentApplicationDataUncheckedUpdateWithoutPatentInput = {
    CountryID?: IntFieldUpdateOperationsInput | number
    PatentNumber?: StringFieldUpdateOperationsInput | string
    FilingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    GrantDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PatentType?: StringFieldUpdateOperationsInput | string
    ApplicationNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PatentFundingUpsertWithWhereUniqueWithoutPatentInput = {
    where: PatentFundingWhereUniqueInput
    update: XOR<PatentFundingUpdateWithoutPatentInput, PatentFundingUncheckedUpdateWithoutPatentInput>
    create: XOR<PatentFundingCreateWithoutPatentInput, PatentFundingUncheckedCreateWithoutPatentInput>
  }

  export type PatentFundingUpdateWithWhereUniqueWithoutPatentInput = {
    where: PatentFundingWhereUniqueInput
    data: XOR<PatentFundingUpdateWithoutPatentInput, PatentFundingUncheckedUpdateWithoutPatentInput>
  }

  export type PatentFundingUpdateManyWithWhereWithoutPatentInput = {
    where: PatentFundingScalarWhereInput
    data: XOR<PatentFundingUpdateManyMutationInput, PatentFundingUncheckedUpdateManyWithoutPatentInput>
  }

  export type PatentInventorUpsertWithWhereUniqueWithoutPatentInput = {
    where: PatentInventorWhereUniqueInput
    update: XOR<PatentInventorUpdateWithoutPatentInput, PatentInventorUncheckedUpdateWithoutPatentInput>
    create: XOR<PatentInventorCreateWithoutPatentInput, PatentInventorUncheckedCreateWithoutPatentInput>
  }

  export type PatentInventorUpdateWithWhereUniqueWithoutPatentInput = {
    where: PatentInventorWhereUniqueInput
    data: XOR<PatentInventorUpdateWithoutPatentInput, PatentInventorUncheckedUpdateWithoutPatentInput>
  }

  export type PatentInventorUpdateManyWithWhereWithoutPatentInput = {
    where: PatentInventorScalarWhereInput
    data: XOR<PatentInventorUpdateManyMutationInput, PatentInventorUncheckedUpdateManyWithoutPatentInput>
  }

  export type PatentStatusUpsertWithoutPatentInput = {
    update: XOR<PatentStatusUpdateWithoutPatentInput, PatentStatusUncheckedUpdateWithoutPatentInput>
    create: XOR<PatentStatusCreateWithoutPatentInput, PatentStatusUncheckedCreateWithoutPatentInput>
    where?: PatentStatusWhereInput
  }

  export type PatentStatusUpdateToOneWithWhereWithoutPatentInput = {
    where?: PatentStatusWhereInput
    data: XOR<PatentStatusUpdateWithoutPatentInput, PatentStatusUncheckedUpdateWithoutPatentInput>
  }

  export type PatentStatusUpdateWithoutPatentInput = {
    ExpiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: StringFieldUpdateOperationsInput | string
    TechnicalCommitteeReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    MaintenanceYear?: NullableIntFieldUpdateOperationsInput | number | null
    MaintenanceStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    MaintenanceEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PatentStatusUncheckedUpdateWithoutPatentInput = {
    ExpiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: StringFieldUpdateOperationsInput | string
    TechnicalCommitteeReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    MaintenanceYear?: NullableIntFieldUpdateOperationsInput | number | null
    MaintenanceStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    MaintenanceEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PatentTechnicalAttributesUpsertWithoutPatentInput = {
    update: XOR<PatentTechnicalAttributesUpdateWithoutPatentInput, PatentTechnicalAttributesUncheckedUpdateWithoutPatentInput>
    create: XOR<PatentTechnicalAttributesCreateWithoutPatentInput, PatentTechnicalAttributesUncheckedCreateWithoutPatentInput>
    where?: PatentTechnicalAttributesWhereInput
  }

  export type PatentTechnicalAttributesUpdateToOneWithWhereWithoutPatentInput = {
    where?: PatentTechnicalAttributesWhereInput
    data: XOR<PatentTechnicalAttributesUpdateWithoutPatentInput, PatentTechnicalAttributesUncheckedUpdateWithoutPatentInput>
  }

  export type PatentTechnicalAttributesUpdateWithoutPatentInput = {
    IPC?: StringFieldUpdateOperationsInput | string
    Scope?: StringFieldUpdateOperationsInput | string
    MaturityLevel?: StringFieldUpdateOperationsInput | string
    Keywords?: StringFieldUpdateOperationsInput | string
  }

  export type PatentTechnicalAttributesUncheckedUpdateWithoutPatentInput = {
    IPC?: StringFieldUpdateOperationsInput | string
    Scope?: StringFieldUpdateOperationsInput | string
    MaturityLevel?: StringFieldUpdateOperationsInput | string
    Keywords?: StringFieldUpdateOperationsInput | string
  }

  export type PatentCreateWithoutStatusInput = {
    Year: string
    InternalID: string
    Title: string
    TitleEnglish?: string | null
    agencies?: AgencyPatentCreateNestedManyWithoutPatentInput
    college: CollegeCreateNestedOneWithoutPatentsInput
    department: DepartmentCreateNestedOneWithoutPatentsInput
    application?: PatentApplicationDataCreateNestedOneWithoutPatentInput
    funding?: PatentFundingCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorCreateNestedManyWithoutPatentInput
    technical?: PatentTechnicalAttributesCreateNestedOneWithoutPatentInput
  }

  export type PatentUncheckedCreateWithoutStatusInput = {
    PatentID?: number
    Year: string
    InternalID: string
    Title: string
    DepartmentID: number
    CollegeID: number
    TitleEnglish?: string | null
    agencies?: AgencyPatentUncheckedCreateNestedManyWithoutPatentInput
    application?: PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInput
    funding?: PatentFundingUncheckedCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorUncheckedCreateNestedManyWithoutPatentInput
    technical?: PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInput
  }

  export type PatentCreateOrConnectWithoutStatusInput = {
    where: PatentWhereUniqueInput
    create: XOR<PatentCreateWithoutStatusInput, PatentUncheckedCreateWithoutStatusInput>
  }

  export type PatentUpsertWithoutStatusInput = {
    update: XOR<PatentUpdateWithoutStatusInput, PatentUncheckedUpdateWithoutStatusInput>
    create: XOR<PatentCreateWithoutStatusInput, PatentUncheckedCreateWithoutStatusInput>
    where?: PatentWhereInput
  }

  export type PatentUpdateToOneWithWhereWithoutStatusInput = {
    where?: PatentWhereInput
    data: XOR<PatentUpdateWithoutStatusInput, PatentUncheckedUpdateWithoutStatusInput>
  }

  export type PatentUpdateWithoutStatusInput = {
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUpdateManyWithoutPatentNestedInput
    college?: CollegeUpdateOneRequiredWithoutPatentsNestedInput
    department?: DepartmentUpdateOneRequiredWithoutPatentsNestedInput
    application?: PatentApplicationDataUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUpdateManyWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUpdateOneWithoutPatentNestedInput
  }

  export type PatentUncheckedUpdateWithoutStatusInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    DepartmentID?: IntFieldUpdateOperationsInput | number
    CollegeID?: IntFieldUpdateOperationsInput | number
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUncheckedUpdateManyWithoutPatentNestedInput
    application?: PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUncheckedUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUncheckedUpdateManyWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInput
  }

  export type PatentCreateWithoutApplicationInput = {
    Year: string
    InternalID: string
    Title: string
    TitleEnglish?: string | null
    agencies?: AgencyPatentCreateNestedManyWithoutPatentInput
    college: CollegeCreateNestedOneWithoutPatentsInput
    department: DepartmentCreateNestedOneWithoutPatentsInput
    funding?: PatentFundingCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorCreateNestedManyWithoutPatentInput
    status?: PatentStatusCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesCreateNestedOneWithoutPatentInput
  }

  export type PatentUncheckedCreateWithoutApplicationInput = {
    PatentID?: number
    Year: string
    InternalID: string
    Title: string
    DepartmentID: number
    CollegeID: number
    TitleEnglish?: string | null
    agencies?: AgencyPatentUncheckedCreateNestedManyWithoutPatentInput
    funding?: PatentFundingUncheckedCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorUncheckedCreateNestedManyWithoutPatentInput
    status?: PatentStatusUncheckedCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInput
  }

  export type PatentCreateOrConnectWithoutApplicationInput = {
    where: PatentWhereUniqueInput
    create: XOR<PatentCreateWithoutApplicationInput, PatentUncheckedCreateWithoutApplicationInput>
  }

  export type CountryCreateWithoutApplicationsInput = {
    CountryName: string
    ISOCode: string
  }

  export type CountryUncheckedCreateWithoutApplicationsInput = {
    CountryID?: number
    CountryName: string
    ISOCode: string
  }

  export type CountryCreateOrConnectWithoutApplicationsInput = {
    where: CountryWhereUniqueInput
    create: XOR<CountryCreateWithoutApplicationsInput, CountryUncheckedCreateWithoutApplicationsInput>
  }

  export type PatentUpsertWithoutApplicationInput = {
    update: XOR<PatentUpdateWithoutApplicationInput, PatentUncheckedUpdateWithoutApplicationInput>
    create: XOR<PatentCreateWithoutApplicationInput, PatentUncheckedCreateWithoutApplicationInput>
    where?: PatentWhereInput
  }

  export type PatentUpdateToOneWithWhereWithoutApplicationInput = {
    where?: PatentWhereInput
    data: XOR<PatentUpdateWithoutApplicationInput, PatentUncheckedUpdateWithoutApplicationInput>
  }

  export type PatentUpdateWithoutApplicationInput = {
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUpdateManyWithoutPatentNestedInput
    college?: CollegeUpdateOneRequiredWithoutPatentsNestedInput
    department?: DepartmentUpdateOneRequiredWithoutPatentsNestedInput
    funding?: PatentFundingUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUpdateOneWithoutPatentNestedInput
  }

  export type PatentUncheckedUpdateWithoutApplicationInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    DepartmentID?: IntFieldUpdateOperationsInput | number
    CollegeID?: IntFieldUpdateOperationsInput | number
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUncheckedUpdateManyWithoutPatentNestedInput
    funding?: PatentFundingUncheckedUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUncheckedUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUncheckedUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInput
  }

  export type CountryUpsertWithoutApplicationsInput = {
    update: XOR<CountryUpdateWithoutApplicationsInput, CountryUncheckedUpdateWithoutApplicationsInput>
    create: XOR<CountryCreateWithoutApplicationsInput, CountryUncheckedCreateWithoutApplicationsInput>
    where?: CountryWhereInput
  }

  export type CountryUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: CountryWhereInput
    data: XOR<CountryUpdateWithoutApplicationsInput, CountryUncheckedUpdateWithoutApplicationsInput>
  }

  export type CountryUpdateWithoutApplicationsInput = {
    CountryName?: StringFieldUpdateOperationsInput | string
    ISOCode?: StringFieldUpdateOperationsInput | string
  }

  export type CountryUncheckedUpdateWithoutApplicationsInput = {
    CountryID?: IntFieldUpdateOperationsInput | number
    CountryName?: StringFieldUpdateOperationsInput | string
    ISOCode?: StringFieldUpdateOperationsInput | string
  }

  export type PatentCreateWithoutTechnicalInput = {
    Year: string
    InternalID: string
    Title: string
    TitleEnglish?: string | null
    agencies?: AgencyPatentCreateNestedManyWithoutPatentInput
    college: CollegeCreateNestedOneWithoutPatentsInput
    department: DepartmentCreateNestedOneWithoutPatentsInput
    application?: PatentApplicationDataCreateNestedOneWithoutPatentInput
    funding?: PatentFundingCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorCreateNestedManyWithoutPatentInput
    status?: PatentStatusCreateNestedOneWithoutPatentInput
  }

  export type PatentUncheckedCreateWithoutTechnicalInput = {
    PatentID?: number
    Year: string
    InternalID: string
    Title: string
    DepartmentID: number
    CollegeID: number
    TitleEnglish?: string | null
    agencies?: AgencyPatentUncheckedCreateNestedManyWithoutPatentInput
    application?: PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInput
    funding?: PatentFundingUncheckedCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorUncheckedCreateNestedManyWithoutPatentInput
    status?: PatentStatusUncheckedCreateNestedOneWithoutPatentInput
  }

  export type PatentCreateOrConnectWithoutTechnicalInput = {
    where: PatentWhereUniqueInput
    create: XOR<PatentCreateWithoutTechnicalInput, PatentUncheckedCreateWithoutTechnicalInput>
  }

  export type PatentUpsertWithoutTechnicalInput = {
    update: XOR<PatentUpdateWithoutTechnicalInput, PatentUncheckedUpdateWithoutTechnicalInput>
    create: XOR<PatentCreateWithoutTechnicalInput, PatentUncheckedCreateWithoutTechnicalInput>
    where?: PatentWhereInput
  }

  export type PatentUpdateToOneWithWhereWithoutTechnicalInput = {
    where?: PatentWhereInput
    data: XOR<PatentUpdateWithoutTechnicalInput, PatentUncheckedUpdateWithoutTechnicalInput>
  }

  export type PatentUpdateWithoutTechnicalInput = {
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUpdateManyWithoutPatentNestedInput
    college?: CollegeUpdateOneRequiredWithoutPatentsNestedInput
    department?: DepartmentUpdateOneRequiredWithoutPatentsNestedInput
    application?: PatentApplicationDataUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUpdateOneWithoutPatentNestedInput
  }

  export type PatentUncheckedUpdateWithoutTechnicalInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    DepartmentID?: IntFieldUpdateOperationsInput | number
    CollegeID?: IntFieldUpdateOperationsInput | number
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUncheckedUpdateManyWithoutPatentNestedInput
    application?: PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUncheckedUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUncheckedUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUncheckedUpdateOneWithoutPatentNestedInput
  }

  export type DepartmentCreateWithoutCollegeInput = {
    Name: string
    Description?: string | null
    inventors?: InventorCreateNestedManyWithoutDepartmentInput
    patents?: PatentCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateWithoutCollegeInput = {
    DepartmentID?: number
    Name: string
    Description?: string | null
    inventors?: InventorUncheckedCreateNestedManyWithoutDepartmentInput
    patents?: PatentUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentCreateOrConnectWithoutCollegeInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutCollegeInput, DepartmentUncheckedCreateWithoutCollegeInput>
  }

  export type DepartmentCreateManyCollegeInputEnvelope = {
    data: DepartmentCreateManyCollegeInput | DepartmentCreateManyCollegeInput[]
  }

  export type PatentCreateWithoutCollegeInput = {
    Year: string
    InternalID: string
    Title: string
    TitleEnglish?: string | null
    agencies?: AgencyPatentCreateNestedManyWithoutPatentInput
    department: DepartmentCreateNestedOneWithoutPatentsInput
    application?: PatentApplicationDataCreateNestedOneWithoutPatentInput
    funding?: PatentFundingCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorCreateNestedManyWithoutPatentInput
    status?: PatentStatusCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesCreateNestedOneWithoutPatentInput
  }

  export type PatentUncheckedCreateWithoutCollegeInput = {
    PatentID?: number
    Year: string
    InternalID: string
    Title: string
    DepartmentID: number
    TitleEnglish?: string | null
    agencies?: AgencyPatentUncheckedCreateNestedManyWithoutPatentInput
    application?: PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInput
    funding?: PatentFundingUncheckedCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorUncheckedCreateNestedManyWithoutPatentInput
    status?: PatentStatusUncheckedCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInput
  }

  export type PatentCreateOrConnectWithoutCollegeInput = {
    where: PatentWhereUniqueInput
    create: XOR<PatentCreateWithoutCollegeInput, PatentUncheckedCreateWithoutCollegeInput>
  }

  export type PatentCreateManyCollegeInputEnvelope = {
    data: PatentCreateManyCollegeInput | PatentCreateManyCollegeInput[]
  }

  export type DepartmentUpsertWithWhereUniqueWithoutCollegeInput = {
    where: DepartmentWhereUniqueInput
    update: XOR<DepartmentUpdateWithoutCollegeInput, DepartmentUncheckedUpdateWithoutCollegeInput>
    create: XOR<DepartmentCreateWithoutCollegeInput, DepartmentUncheckedCreateWithoutCollegeInput>
  }

  export type DepartmentUpdateWithWhereUniqueWithoutCollegeInput = {
    where: DepartmentWhereUniqueInput
    data: XOR<DepartmentUpdateWithoutCollegeInput, DepartmentUncheckedUpdateWithoutCollegeInput>
  }

  export type DepartmentUpdateManyWithWhereWithoutCollegeInput = {
    where: DepartmentScalarWhereInput
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyWithoutCollegeInput>
  }

  export type DepartmentScalarWhereInput = {
    AND?: DepartmentScalarWhereInput | DepartmentScalarWhereInput[]
    OR?: DepartmentScalarWhereInput[]
    NOT?: DepartmentScalarWhereInput | DepartmentScalarWhereInput[]
    DepartmentID?: IntFilter<"Department"> | number
    Name?: StringFilter<"Department"> | string
    CollegeID?: IntFilter<"Department"> | number
    Description?: StringNullableFilter<"Department"> | string | null
  }

  export type PatentUpsertWithWhereUniqueWithoutCollegeInput = {
    where: PatentWhereUniqueInput
    update: XOR<PatentUpdateWithoutCollegeInput, PatentUncheckedUpdateWithoutCollegeInput>
    create: XOR<PatentCreateWithoutCollegeInput, PatentUncheckedCreateWithoutCollegeInput>
  }

  export type PatentUpdateWithWhereUniqueWithoutCollegeInput = {
    where: PatentWhereUniqueInput
    data: XOR<PatentUpdateWithoutCollegeInput, PatentUncheckedUpdateWithoutCollegeInput>
  }

  export type PatentUpdateManyWithWhereWithoutCollegeInput = {
    where: PatentScalarWhereInput
    data: XOR<PatentUpdateManyMutationInput, PatentUncheckedUpdateManyWithoutCollegeInput>
  }

  export type PatentScalarWhereInput = {
    AND?: PatentScalarWhereInput | PatentScalarWhereInput[]
    OR?: PatentScalarWhereInput[]
    NOT?: PatentScalarWhereInput | PatentScalarWhereInput[]
    PatentID?: IntFilter<"Patent"> | number
    Year?: StringFilter<"Patent"> | string
    InternalID?: StringFilter<"Patent"> | string
    Title?: StringFilter<"Patent"> | string
    DepartmentID?: IntFilter<"Patent"> | number
    CollegeID?: IntFilter<"Patent"> | number
    TitleEnglish?: StringNullableFilter<"Patent"> | string | null
  }

  export type CollegeCreateWithoutDepartmentsInput = {
    Name: string
    Description?: string | null
    patents?: PatentCreateNestedManyWithoutCollegeInput
  }

  export type CollegeUncheckedCreateWithoutDepartmentsInput = {
    CollegeID?: number
    Name: string
    Description?: string | null
    patents?: PatentUncheckedCreateNestedManyWithoutCollegeInput
  }

  export type CollegeCreateOrConnectWithoutDepartmentsInput = {
    where: CollegeWhereUniqueInput
    create: XOR<CollegeCreateWithoutDepartmentsInput, CollegeUncheckedCreateWithoutDepartmentsInput>
  }

  export type InventorCreateWithoutDepartmentInput = {
    Name: string
    Email?: string | null
    contactInfo?: ContactInfoCreateNestedOneWithoutInventorInput
    patents?: PatentInventorCreateNestedManyWithoutInventorInput
  }

  export type InventorUncheckedCreateWithoutDepartmentInput = {
    InventorID?: number
    Name: string
    Email?: string | null
    ContactInfoID?: number | null
    patents?: PatentInventorUncheckedCreateNestedManyWithoutInventorInput
  }

  export type InventorCreateOrConnectWithoutDepartmentInput = {
    where: InventorWhereUniqueInput
    create: XOR<InventorCreateWithoutDepartmentInput, InventorUncheckedCreateWithoutDepartmentInput>
  }

  export type InventorCreateManyDepartmentInputEnvelope = {
    data: InventorCreateManyDepartmentInput | InventorCreateManyDepartmentInput[]
  }

  export type PatentCreateWithoutDepartmentInput = {
    Year: string
    InternalID: string
    Title: string
    TitleEnglish?: string | null
    agencies?: AgencyPatentCreateNestedManyWithoutPatentInput
    college: CollegeCreateNestedOneWithoutPatentsInput
    application?: PatentApplicationDataCreateNestedOneWithoutPatentInput
    funding?: PatentFundingCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorCreateNestedManyWithoutPatentInput
    status?: PatentStatusCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesCreateNestedOneWithoutPatentInput
  }

  export type PatentUncheckedCreateWithoutDepartmentInput = {
    PatentID?: number
    Year: string
    InternalID: string
    Title: string
    CollegeID: number
    TitleEnglish?: string | null
    agencies?: AgencyPatentUncheckedCreateNestedManyWithoutPatentInput
    application?: PatentApplicationDataUncheckedCreateNestedOneWithoutPatentInput
    funding?: PatentFundingUncheckedCreateNestedManyWithoutPatentInput
    inventors?: PatentInventorUncheckedCreateNestedManyWithoutPatentInput
    status?: PatentStatusUncheckedCreateNestedOneWithoutPatentInput
    technical?: PatentTechnicalAttributesUncheckedCreateNestedOneWithoutPatentInput
  }

  export type PatentCreateOrConnectWithoutDepartmentInput = {
    where: PatentWhereUniqueInput
    create: XOR<PatentCreateWithoutDepartmentInput, PatentUncheckedCreateWithoutDepartmentInput>
  }

  export type PatentCreateManyDepartmentInputEnvelope = {
    data: PatentCreateManyDepartmentInput | PatentCreateManyDepartmentInput[]
  }

  export type CollegeUpsertWithoutDepartmentsInput = {
    update: XOR<CollegeUpdateWithoutDepartmentsInput, CollegeUncheckedUpdateWithoutDepartmentsInput>
    create: XOR<CollegeCreateWithoutDepartmentsInput, CollegeUncheckedCreateWithoutDepartmentsInput>
    where?: CollegeWhereInput
  }

  export type CollegeUpdateToOneWithWhereWithoutDepartmentsInput = {
    where?: CollegeWhereInput
    data: XOR<CollegeUpdateWithoutDepartmentsInput, CollegeUncheckedUpdateWithoutDepartmentsInput>
  }

  export type CollegeUpdateWithoutDepartmentsInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    patents?: PatentUpdateManyWithoutCollegeNestedInput
  }

  export type CollegeUncheckedUpdateWithoutDepartmentsInput = {
    CollegeID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    patents?: PatentUncheckedUpdateManyWithoutCollegeNestedInput
  }

  export type InventorUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: InventorWhereUniqueInput
    update: XOR<InventorUpdateWithoutDepartmentInput, InventorUncheckedUpdateWithoutDepartmentInput>
    create: XOR<InventorCreateWithoutDepartmentInput, InventorUncheckedCreateWithoutDepartmentInput>
  }

  export type InventorUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: InventorWhereUniqueInput
    data: XOR<InventorUpdateWithoutDepartmentInput, InventorUncheckedUpdateWithoutDepartmentInput>
  }

  export type InventorUpdateManyWithWhereWithoutDepartmentInput = {
    where: InventorScalarWhereInput
    data: XOR<InventorUpdateManyMutationInput, InventorUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type InventorScalarWhereInput = {
    AND?: InventorScalarWhereInput | InventorScalarWhereInput[]
    OR?: InventorScalarWhereInput[]
    NOT?: InventorScalarWhereInput | InventorScalarWhereInput[]
    InventorID?: IntFilter<"Inventor"> | number
    Name?: StringFilter<"Inventor"> | string
    Department?: IntFilter<"Inventor"> | number
    Email?: StringNullableFilter<"Inventor"> | string | null
    ContactInfoID?: IntNullableFilter<"Inventor"> | number | null
  }

  export type PatentUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: PatentWhereUniqueInput
    update: XOR<PatentUpdateWithoutDepartmentInput, PatentUncheckedUpdateWithoutDepartmentInput>
    create: XOR<PatentCreateWithoutDepartmentInput, PatentUncheckedCreateWithoutDepartmentInput>
  }

  export type PatentUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: PatentWhereUniqueInput
    data: XOR<PatentUpdateWithoutDepartmentInput, PatentUncheckedUpdateWithoutDepartmentInput>
  }

  export type PatentUpdateManyWithWhereWithoutDepartmentInput = {
    where: PatentScalarWhereInput
    data: XOR<PatentUpdateManyMutationInput, PatentUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type PatentApplicationDataCreateWithoutCountryInput = {
    PatentNumber: string
    FilingDate?: Date | string | null
    GrantDate?: Date | string | null
    PatentType: string
    ApplicationNumber: string
    patent?: PatentCreateNestedOneWithoutApplicationInput
  }

  export type PatentApplicationDataUncheckedCreateWithoutCountryInput = {
    PatentID?: number
    PatentNumber: string
    FilingDate?: Date | string | null
    GrantDate?: Date | string | null
    PatentType: string
    ApplicationNumber: string
  }

  export type PatentApplicationDataCreateOrConnectWithoutCountryInput = {
    where: PatentApplicationDataWhereUniqueInput
    create: XOR<PatentApplicationDataCreateWithoutCountryInput, PatentApplicationDataUncheckedCreateWithoutCountryInput>
  }

  export type PatentApplicationDataCreateManyCountryInputEnvelope = {
    data: PatentApplicationDataCreateManyCountryInput | PatentApplicationDataCreateManyCountryInput[]
  }

  export type PatentApplicationDataUpsertWithWhereUniqueWithoutCountryInput = {
    where: PatentApplicationDataWhereUniqueInput
    update: XOR<PatentApplicationDataUpdateWithoutCountryInput, PatentApplicationDataUncheckedUpdateWithoutCountryInput>
    create: XOR<PatentApplicationDataCreateWithoutCountryInput, PatentApplicationDataUncheckedCreateWithoutCountryInput>
  }

  export type PatentApplicationDataUpdateWithWhereUniqueWithoutCountryInput = {
    where: PatentApplicationDataWhereUniqueInput
    data: XOR<PatentApplicationDataUpdateWithoutCountryInput, PatentApplicationDataUncheckedUpdateWithoutCountryInput>
  }

  export type PatentApplicationDataUpdateManyWithWhereWithoutCountryInput = {
    where: PatentApplicationDataScalarWhereInput
    data: XOR<PatentApplicationDataUpdateManyMutationInput, PatentApplicationDataUncheckedUpdateManyWithoutCountryInput>
  }

  export type PatentApplicationDataScalarWhereInput = {
    AND?: PatentApplicationDataScalarWhereInput | PatentApplicationDataScalarWhereInput[]
    OR?: PatentApplicationDataScalarWhereInput[]
    NOT?: PatentApplicationDataScalarWhereInput | PatentApplicationDataScalarWhereInput[]
    PatentID?: IntFilter<"PatentApplicationData"> | number
    CountryID?: IntFilter<"PatentApplicationData"> | number
    PatentNumber?: StringFilter<"PatentApplicationData"> | string
    FilingDate?: DateTimeNullableFilter<"PatentApplicationData"> | Date | string | null
    GrantDate?: DateTimeNullableFilter<"PatentApplicationData"> | Date | string | null
    PatentType?: StringFilter<"PatentApplicationData"> | string
    ApplicationNumber?: StringFilter<"PatentApplicationData"> | string
  }

  export type AgencyContactPersonCreateWithoutContactInfoInput = {
    Position: string
    agency: AgencyCreateNestedOneWithoutContactsInput
  }

  export type AgencyContactPersonUncheckedCreateWithoutContactInfoInput = {
    ContactPersonID?: number
    AgencyID: number
    Position: string
  }

  export type AgencyContactPersonCreateOrConnectWithoutContactInfoInput = {
    where: AgencyContactPersonWhereUniqueInput
    create: XOR<AgencyContactPersonCreateWithoutContactInfoInput, AgencyContactPersonUncheckedCreateWithoutContactInfoInput>
  }

  export type InventorCreateWithoutContactInfoInput = {
    Name: string
    Email?: string | null
    department: DepartmentCreateNestedOneWithoutInventorsInput
    patents?: PatentInventorCreateNestedManyWithoutInventorInput
  }

  export type InventorUncheckedCreateWithoutContactInfoInput = {
    InventorID?: number
    Name: string
    Department: number
    Email?: string | null
    patents?: PatentInventorUncheckedCreateNestedManyWithoutInventorInput
  }

  export type InventorCreateOrConnectWithoutContactInfoInput = {
    where: InventorWhereUniqueInput
    create: XOR<InventorCreateWithoutContactInfoInput, InventorUncheckedCreateWithoutContactInfoInput>
  }

  export type AgencyContactPersonUpsertWithoutContactInfoInput = {
    update: XOR<AgencyContactPersonUpdateWithoutContactInfoInput, AgencyContactPersonUncheckedUpdateWithoutContactInfoInput>
    create: XOR<AgencyContactPersonCreateWithoutContactInfoInput, AgencyContactPersonUncheckedCreateWithoutContactInfoInput>
    where?: AgencyContactPersonWhereInput
  }

  export type AgencyContactPersonUpdateToOneWithWhereWithoutContactInfoInput = {
    where?: AgencyContactPersonWhereInput
    data: XOR<AgencyContactPersonUpdateWithoutContactInfoInput, AgencyContactPersonUncheckedUpdateWithoutContactInfoInput>
  }

  export type AgencyContactPersonUpdateWithoutContactInfoInput = {
    Position?: StringFieldUpdateOperationsInput | string
    agency?: AgencyUpdateOneRequiredWithoutContactsNestedInput
  }

  export type AgencyContactPersonUncheckedUpdateWithoutContactInfoInput = {
    ContactPersonID?: IntFieldUpdateOperationsInput | number
    AgencyID?: IntFieldUpdateOperationsInput | number
    Position?: StringFieldUpdateOperationsInput | string
  }

  export type InventorUpsertWithoutContactInfoInput = {
    update: XOR<InventorUpdateWithoutContactInfoInput, InventorUncheckedUpdateWithoutContactInfoInput>
    create: XOR<InventorCreateWithoutContactInfoInput, InventorUncheckedCreateWithoutContactInfoInput>
    where?: InventorWhereInput
  }

  export type InventorUpdateToOneWithWhereWithoutContactInfoInput = {
    where?: InventorWhereInput
    data: XOR<InventorUpdateWithoutContactInfoInput, InventorUncheckedUpdateWithoutContactInfoInput>
  }

  export type InventorUpdateWithoutContactInfoInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    department?: DepartmentUpdateOneRequiredWithoutInventorsNestedInput
    patents?: PatentInventorUpdateManyWithoutInventorNestedInput
  }

  export type InventorUncheckedUpdateWithoutContactInfoInput = {
    InventorID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Department?: IntFieldUpdateOperationsInput | number
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    patents?: PatentInventorUncheckedUpdateManyWithoutInventorNestedInput
  }

  export type AgencyContactPersonCreateManyAgencyInput = {
    ContactPersonID?: number
    Position: string
    ContactInfoID?: number | null
  }

  export type AgencyPatentCreateManyAgencyInput = {
    PatentID: number
    FileCode: string
    Role: string
    Details?: string | null
  }

  export type AgencyContactPersonUpdateWithoutAgencyInput = {
    Position?: StringFieldUpdateOperationsInput | string
    contactInfo?: ContactInfoUpdateOneWithoutAgencyContactNestedInput
  }

  export type AgencyContactPersonUncheckedUpdateWithoutAgencyInput = {
    ContactPersonID?: IntFieldUpdateOperationsInput | number
    Position?: StringFieldUpdateOperationsInput | string
    ContactInfoID?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AgencyContactPersonUncheckedUpdateManyWithoutAgencyInput = {
    ContactPersonID?: IntFieldUpdateOperationsInput | number
    Position?: StringFieldUpdateOperationsInput | string
    ContactInfoID?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AgencyPatentUpdateWithoutAgencyInput = {
    FileCode?: StringFieldUpdateOperationsInput | string
    Role?: StringFieldUpdateOperationsInput | string
    Details?: NullableStringFieldUpdateOperationsInput | string | null
    patent?: PatentUpdateOneRequiredWithoutAgenciesNestedInput
  }

  export type AgencyPatentUncheckedUpdateWithoutAgencyInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    FileCode?: StringFieldUpdateOperationsInput | string
    Role?: StringFieldUpdateOperationsInput | string
    Details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgencyPatentUncheckedUpdateManyWithoutAgencyInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    FileCode?: StringFieldUpdateOperationsInput | string
    Role?: StringFieldUpdateOperationsInput | string
    Details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatentFundingCreateManyPlanInput = {
    FundingID?: number
    PatentID: number
    FundingAgency: string
    ProjectNumber: string
  }

  export type PatentFundingUpdateWithoutPlanInput = {
    FundingAgency?: StringFieldUpdateOperationsInput | string
    ProjectNumber?: StringFieldUpdateOperationsInput | string
    patent?: PatentUpdateOneRequiredWithoutFundingNestedInput
  }

  export type PatentFundingUncheckedUpdateWithoutPlanInput = {
    FundingID?: IntFieldUpdateOperationsInput | number
    PatentID?: IntFieldUpdateOperationsInput | number
    FundingAgency?: StringFieldUpdateOperationsInput | string
    ProjectNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PatentFundingUncheckedUpdateManyWithoutPlanInput = {
    FundingID?: IntFieldUpdateOperationsInput | number
    PatentID?: IntFieldUpdateOperationsInput | number
    FundingAgency?: StringFieldUpdateOperationsInput | string
    ProjectNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PatentInventorCreateManyInventorInput = {
    PatentID: number
    Main: boolean
  }

  export type PatentInventorUpdateWithoutInventorInput = {
    Main?: BoolFieldUpdateOperationsInput | boolean
    patent?: PatentUpdateOneRequiredWithoutInventorsNestedInput
  }

  export type PatentInventorUncheckedUpdateWithoutInventorInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Main?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PatentInventorUncheckedUpdateManyWithoutInventorInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Main?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AgencyPatentCreateManyPatentInput = {
    AgencyID: number
    FileCode: string
    Role: string
    Details?: string | null
  }

  export type PatentFundingCreateManyPatentInput = {
    FundingID?: number
    FundingAgency: string
    ProjectNumber: string
    PlanID: number
  }

  export type PatentInventorCreateManyPatentInput = {
    InventorID: number
    Main: boolean
  }

  export type AgencyPatentUpdateWithoutPatentInput = {
    FileCode?: StringFieldUpdateOperationsInput | string
    Role?: StringFieldUpdateOperationsInput | string
    Details?: NullableStringFieldUpdateOperationsInput | string | null
    agency?: AgencyUpdateOneRequiredWithoutPatentsNestedInput
  }

  export type AgencyPatentUncheckedUpdateWithoutPatentInput = {
    AgencyID?: IntFieldUpdateOperationsInput | number
    FileCode?: StringFieldUpdateOperationsInput | string
    Role?: StringFieldUpdateOperationsInput | string
    Details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgencyPatentUncheckedUpdateManyWithoutPatentInput = {
    AgencyID?: IntFieldUpdateOperationsInput | number
    FileCode?: StringFieldUpdateOperationsInput | string
    Role?: StringFieldUpdateOperationsInput | string
    Details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatentFundingUpdateWithoutPatentInput = {
    FundingAgency?: StringFieldUpdateOperationsInput | string
    ProjectNumber?: StringFieldUpdateOperationsInput | string
    plan?: FundingPlanUpdateOneRequiredWithoutFundingsNestedInput
  }

  export type PatentFundingUncheckedUpdateWithoutPatentInput = {
    FundingID?: IntFieldUpdateOperationsInput | number
    FundingAgency?: StringFieldUpdateOperationsInput | string
    ProjectNumber?: StringFieldUpdateOperationsInput | string
    PlanID?: IntFieldUpdateOperationsInput | number
  }

  export type PatentFundingUncheckedUpdateManyWithoutPatentInput = {
    FundingID?: IntFieldUpdateOperationsInput | number
    FundingAgency?: StringFieldUpdateOperationsInput | string
    ProjectNumber?: StringFieldUpdateOperationsInput | string
    PlanID?: IntFieldUpdateOperationsInput | number
  }

  export type PatentInventorUpdateWithoutPatentInput = {
    Main?: BoolFieldUpdateOperationsInput | boolean
    inventor?: InventorUpdateOneRequiredWithoutPatentsNestedInput
  }

  export type PatentInventorUncheckedUpdateWithoutPatentInput = {
    InventorID?: IntFieldUpdateOperationsInput | number
    Main?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PatentInventorUncheckedUpdateManyWithoutPatentInput = {
    InventorID?: IntFieldUpdateOperationsInput | number
    Main?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DepartmentCreateManyCollegeInput = {
    DepartmentID?: number
    Name: string
    Description?: string | null
  }

  export type PatentCreateManyCollegeInput = {
    PatentID?: number
    Year: string
    InternalID: string
    Title: string
    DepartmentID: number
    TitleEnglish?: string | null
  }

  export type DepartmentUpdateWithoutCollegeInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    inventors?: InventorUpdateManyWithoutDepartmentNestedInput
    patents?: PatentUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateWithoutCollegeInput = {
    DepartmentID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    inventors?: InventorUncheckedUpdateManyWithoutDepartmentNestedInput
    patents?: PatentUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateManyWithoutCollegeInput = {
    DepartmentID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatentUpdateWithoutCollegeInput = {
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUpdateManyWithoutPatentNestedInput
    department?: DepartmentUpdateOneRequiredWithoutPatentsNestedInput
    application?: PatentApplicationDataUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUpdateOneWithoutPatentNestedInput
  }

  export type PatentUncheckedUpdateWithoutCollegeInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    DepartmentID?: IntFieldUpdateOperationsInput | number
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUncheckedUpdateManyWithoutPatentNestedInput
    application?: PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUncheckedUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUncheckedUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUncheckedUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInput
  }

  export type PatentUncheckedUpdateManyWithoutCollegeInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    DepartmentID?: IntFieldUpdateOperationsInput | number
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InventorCreateManyDepartmentInput = {
    InventorID?: number
    Name: string
    Email?: string | null
    ContactInfoID?: number | null
  }

  export type PatentCreateManyDepartmentInput = {
    PatentID?: number
    Year: string
    InternalID: string
    Title: string
    CollegeID: number
    TitleEnglish?: string | null
  }

  export type InventorUpdateWithoutDepartmentInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: ContactInfoUpdateOneWithoutInventorNestedInput
    patents?: PatentInventorUpdateManyWithoutInventorNestedInput
  }

  export type InventorUncheckedUpdateWithoutDepartmentInput = {
    InventorID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    ContactInfoID?: NullableIntFieldUpdateOperationsInput | number | null
    patents?: PatentInventorUncheckedUpdateManyWithoutInventorNestedInput
  }

  export type InventorUncheckedUpdateManyWithoutDepartmentInput = {
    InventorID?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    ContactInfoID?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PatentUpdateWithoutDepartmentInput = {
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUpdateManyWithoutPatentNestedInput
    college?: CollegeUpdateOneRequiredWithoutPatentsNestedInput
    application?: PatentApplicationDataUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUpdateOneWithoutPatentNestedInput
  }

  export type PatentUncheckedUpdateWithoutDepartmentInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    CollegeID?: IntFieldUpdateOperationsInput | number
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
    agencies?: AgencyPatentUncheckedUpdateManyWithoutPatentNestedInput
    application?: PatentApplicationDataUncheckedUpdateOneWithoutPatentNestedInput
    funding?: PatentFundingUncheckedUpdateManyWithoutPatentNestedInput
    inventors?: PatentInventorUncheckedUpdateManyWithoutPatentNestedInput
    status?: PatentStatusUncheckedUpdateOneWithoutPatentNestedInput
    technical?: PatentTechnicalAttributesUncheckedUpdateOneWithoutPatentNestedInput
  }

  export type PatentUncheckedUpdateManyWithoutDepartmentInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    Year?: StringFieldUpdateOperationsInput | string
    InternalID?: StringFieldUpdateOperationsInput | string
    Title?: StringFieldUpdateOperationsInput | string
    CollegeID?: IntFieldUpdateOperationsInput | number
    TitleEnglish?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatentApplicationDataCreateManyCountryInput = {
    PatentID?: number
    PatentNumber: string
    FilingDate?: Date | string | null
    GrantDate?: Date | string | null
    PatentType: string
    ApplicationNumber: string
  }

  export type PatentApplicationDataUpdateWithoutCountryInput = {
    PatentNumber?: StringFieldUpdateOperationsInput | string
    FilingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    GrantDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PatentType?: StringFieldUpdateOperationsInput | string
    ApplicationNumber?: StringFieldUpdateOperationsInput | string
    patent?: PatentUpdateOneRequiredWithoutApplicationNestedInput
  }

  export type PatentApplicationDataUncheckedUpdateWithoutCountryInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    PatentNumber?: StringFieldUpdateOperationsInput | string
    FilingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    GrantDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PatentType?: StringFieldUpdateOperationsInput | string
    ApplicationNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PatentApplicationDataUncheckedUpdateManyWithoutCountryInput = {
    PatentID?: IntFieldUpdateOperationsInput | number
    PatentNumber?: StringFieldUpdateOperationsInput | string
    FilingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    GrantDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PatentType?: StringFieldUpdateOperationsInput | string
    ApplicationNumber?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}