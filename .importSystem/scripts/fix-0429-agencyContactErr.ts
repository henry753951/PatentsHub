import { BaseScript } from "./base";

class Fix0429AgencyContactErr extends BaseScript {
   name = "Fix0429AgencyContactErrRecordError";
   description = "Fixes the agency contact error in the database.";
   constructor(db1: string, db2: string) {
      super();
      this.initializePrismaClient("db1", db1);
      this.initializePrismaClient("db2", db2);
   }

   async run() {
      const fixedPrisma = this.prismaClients.get("db1");
      const buggedPrisma = this.prismaClients.get("db2");
      if (!fixedPrisma || !buggedPrisma) {
         throw new Error("Prisma clients not initialized properly.");
      }
      // fix agency contact error
   }
}
const currentDir = process.cwd();

const db1 = "file:" + currentDir + "/.importSystem/database/app.db";
const db2 = "file:" + currentDir + "/.importSystem/database/app_20250429.db";
const script = new Fix0429AgencyContactErr(db1, db2);
script
   .run()
   .then(() => {
      console.log("Script completed successfully.");
   })
   .catch((error) => {
      console.error("Script failed:", error);
   });
