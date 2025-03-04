# tRPC Router 架構

## 路由中 Function 定義

輸入為 { name : string }，回傳 `Hello ${name}!` 字串。
直接看程式碼理解就好。
( query(func) 中的 func 的參數`input`會 Follow z.object 定義的格式 )

```ts
import { procedure, router } from "./trpc";

export default router({
   hello: procedure
      .input(z.object({ name: z.string() }).nullish())
      .query(({ input }) => {
         return "Hello " + input.name + "!";
      }),
});
```

至於用 query 或 mutation，取決於你的操作是讀取還是寫入，這裡的例子是讀取，所以用 query。
雖然應該沒差在 electron 中。 [可以看差別](https://github.com/trpc/trpc/discussions/1638)


## 巢狀路由

```ts
import { procedure, router } from "./trpc";

export default router({
   helloNoInput: procedure.input(z.undefined()).query(({ input }) => {
      return "Hello !";
   }),
   nested: router({
      hello: procedure
         .input(z.object({ name: z.string() }).nullish())
         .query(({ input }) => {
            return "Hello " + input.name + "!";
         }),
   }),
});
```

透過這個巢狀結構，可以更好的組織路由，並且可以更好的管理路由的功能，我將按照功能分類，並且將其放置在 routers 資料夾中。

## 路由組織

```
│  mainRouter.ts # 主路由
│
└─routers // 子路由，可按照功能分類，記得巢狀引用
    │  test.ts
    │
    ├─app
    │      index.ts
    │      window.ts
    │
    └─data
            index.ts
```

比方我想建立一個 data/example.ts 的路由，我會在 routers 資料夾中建立一個 data 資料夾，並在其中建立一個 example.ts 檔案，並在 data/index.ts 中引用。
**若是新分類 (routers/xxx) 則必須在 xxx/建立 index.ts 並在 mainRouter.ts 做引用**

- data/example.ts

```ts
import { procedure, router } from "./trpc";

export default router({
   hello: procedure
      .input(z.object({ name: z.string() }).nullish())
      .query(({ input }) => {
         return "Hello " + input.name + "!";
      }),
});
```

- data/index.ts

```ts
import example from "./example";

export default router({
   // ... 其他路由 ... 省略
   //
   example: example,
});
```

## 輸入輸出型態
- https://trpc.io/docs/client/vanilla/infer-types
使用 `~/server/index.ts` 中的

```ts
export type RouterInput = inferRouterInputs<MainRouter>;
export type RouterOutput = inferRouterOutputs<MainRouter>;
```

來取得所有路由的輸入輸出型態，這樣就可以在所有地方中使用。 如下
```ts
type PostCreateInput = RouterInput['post']['create'];
type PostCreateOutput = RouterOutput['post']['create'];
```

# Prisma

## 生成 Prisma Client

假設有更新 schema，需要重新生成 Prisma Client

```bash
pnpm prisma generate
```

## 生成 ZOD Schema

我用了一個可以從 Prisma schema 自動生成 ZOD Schema，可以幫助取得資料庫的 Insert/Select/Update 等等的資料格式。

```bash
pnpm prisma generate zod
```

## 使用 Zod Schema

舉例，我們有一個 Country 的資料表

```prisma
model Country {
    CountryID   Int    @id @default(autoincrement()) // 專利國家ID
    CountryName String // 專利國家
    ISOCode     String // 國家代碼
}
```

若要完成 prisma.country.create({...})，則必須滿足以下格式

```ts
{
    CountryID: number | undefined, // 可以不給也 OK 有預設值
    CountryName: string,
    ISOCode: string,
}
```

但你就要自己定義這個格式的 ZOD Schema，所以可以引入生成的 ZOD Schema 來挑選你要的格式 (dbZ)

```ts
import { dbZ, prisma } from "~/server";

export default router({
   insertCountry: procedure
      .input(dbZ.CountryCreateInputSchema)
      .mutation(({ input }) => {
         return prisma.country.create({
            data: input,
         });
      }),
});
```
