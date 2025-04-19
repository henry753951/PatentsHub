import consola from "consola";
import csv from "csv-parser";
import fs from "fs";
import * as dbZ from "../../server/prisma/zod";
import { PatentRaw, PatentTransformed } from "../types/patent";
import { PatentTransformer } from "./patentTransformer";
import { z } from "zod";
import { columnMapping } from "./utils";


const parseCSV = async (filePath: string): Promise<PatentTransformed[]> => {
   return new Promise((resolve, reject) => {
      const patents: PatentTransformed[] = [];

      fs.createReadStream(filePath)
         .pipe(csv())
         .on("data", (row: { [key: string]: string }) => {
            try {
               // Map CSV row to PatentRaw using columnMapping
               const raw: PatentRaw = Object.keys(columnMapping).reduce(
                  (acc, csvColumn) => {
                     const prop = columnMapping[csvColumn];
                     acc[prop] = row[csvColumn] || ""; // Default to empty string if undefined
                     return acc;
                  },
                  {} as PatentRaw,
               );

               // Transform to Patent
               const transformedPatent = PatentTransformer.transform(raw);
               patents.push(transformedPatent);
            } catch (error) {
               consola.error("Error transforming row:", row, error);
            }
         })
         .on("end", () => {
            consola.success(
               `CSV file successfully processed. Total patents: ${patents.length}`,
            );
            resolve(patents);
         })
         .on("error", (error) => {
            consola.error("Error reading CSV file:", error);
            reject(error);
         });
   });
};


export { parseCSV };
