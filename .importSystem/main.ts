import consola from "consola";
import { Command } from "commander";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";
import initialFundingPlans from "./initial-data/fundingPlans";
import { parseCSV } from "./csv-import/parse";
import { insertData } from "./csv-import/insert";
const program = new Command();
program
   .option("--import-csv <path>", "Import data from a CSV file")
   .option("--reset-db", "Reset the database");
program.parse(process.argv);
const options = program.opts();

// =========================================================
// |                                                       |
// |                       Entry point                     |
// |                                                       |
// =========================================================
const ENTRY_POINT = async () => {
   // Reset the database if --reset-db is passed
   if (isResetDb) {
      consola.warn("Resetting database... (--reset-db)");
      fs.rmSync(path.join(process.cwd(), ".importSystem", "app.db"), {
         force: true,
      });
   }

   // Check if the database exists
   try {
      fs.accessSync(path.join(process.cwd(), ".importSystem", "app.db"));
      consola.info("Database exists.");
   }
   catch (error) {
      consola.warn("Database does not exist. Generating database...");
      generateDatabase();
   }

   // Initialize Prisma Client
   const prisma = initializePrismaClient(dbPath);

   // Initialize database
   await initializeDatabase(prisma);

   // Import CSV data if --import-csv is passed
   if (isImportCsv) {
      consola.info("Importing data from CSV file...");
      const csvPath = path.join(process.cwd(), options.importCsv);
      if (fs.existsSync(csvPath)) {
         consola.info(`CSV file found at ${csvPath}`);
         const data = await parseCSV(csvPath);
         fs.writeFileSync(
            path.join(process.cwd(), ".importSystem", "patents.json"),
            JSON.stringify(data, null, 2),
         );
         insertData(data, prisma);
         consola.success("CSV file successfully processed.");
      }
      else {
         consola.error(`CSV file not found at ${csvPath}`);
      }
   }
};
// ==========================================================

// =========================================================
// |                                                       |
// |                       Functions                       |
// |                                                       |
// =========================================================

// Generate database
const generateDatabase = async () => {
   consola.info("Generating database...");
   try {
      execSync("pnpm prisma db push", {
         stdio: "inherit",
         env: {
            DATABASE_URL: dbPath,
         },
      });
      consola.success("Database generated.");
   }
   catch (error) {
      consola.error("Error generating database:", error);
   }
};

// Initialize Prisma Client
const initializePrismaClient = (dbPath: string) => {
   consola.info("Initializing Prisma Client...");
   const prisma = new PrismaClient({
      datasources: {
         db: {
            url: dbPath,
         },
      },
   });
   consola.success("Prisma Client initialized.");
   return prisma;
};

// Initialize database
const initializeDatabase = async (prisma: PrismaClient) => {
   consola.info("Initializing database...");
   const steps = [{ name: "Funding Plans", function: initialFundingPlans }];

   for (const step of steps) {
      try {
         consola.log(` |  Initializing ${step.name}...`);
         await step.function(prisma);
         consola.log(` |  ${step.name} initialized.`);
      }
      catch (error) {
         consola.error(`Error initializing ${step.name}:`, error);
      }
   }

   consola.success("Database initialized.");
};

// =========================================================

const isImportCsv = !!options.importCsv;
const isResetDb = !!options.resetDb;
const csvPath = options.importCsv;
const currentDir = process.cwd();
const dbPath = "file:" + currentDir + "/.importSystem/app.db";

const MESSAGE = `
                       ImportSystem
###########################################################
   help:
      --import-csv <path>  Import data from a CSV file
      --reset-db           Reset the database

   info:
       DATABASE_URL: ${dbPath}
       Import CSV: ${isImportCsv ? csvPath : "No import"}
       Reset DB: ${isResetDb ? "Yes" : "No"}
###########################################################
`;
consola.info("Starting...");
console.log(MESSAGE);

ENTRY_POINT();
