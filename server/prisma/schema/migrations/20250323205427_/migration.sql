-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatentInventor" (
    "PatentID" INTEGER NOT NULL,
    "InventorID" INTEGER NOT NULL,
    "Main" BOOLEAN NOT NULL,
    "Contribution" REAL NOT NULL DEFAULT 0,

    PRIMARY KEY ("PatentID", "InventorID"),
    CONSTRAINT "PatentInventor_PatentID_fkey" FOREIGN KEY ("PatentID") REFERENCES "Patent" ("PatentID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PatentInventor_InventorID_fkey" FOREIGN KEY ("InventorID") REFERENCES "Inventor" ("InventorID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatentInventor" ("Contribution", "InventorID", "Main", "PatentID") SELECT coalesce("Contribution", 0) AS "Contribution", "InventorID", "Main", "PatentID" FROM "PatentInventor";
DROP TABLE "PatentInventor";
ALTER TABLE "new_PatentInventor" RENAME TO "PatentInventor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
