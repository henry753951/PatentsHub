-- CreateTable
CREATE TABLE "Note" (
    "NoteID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Key" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Body" TEXT NOT NULL,
    "Date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_Key_key" ON "Note"("Key");

-- CreateIndex
CREATE INDEX "KeyIndex" ON "Note"("Key");
