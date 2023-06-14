/*
  Warnings:

  - Added the required column `grams` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_foods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "grams" INTEGER NOT NULL,
    "carbo" REAL NOT NULL,
    "protein" REAL NOT NULL,
    "fat" REAL NOT NULL,
    "stokeId" TEXT,
    CONSTRAINT "foods_stokeId_fkey" FOREIGN KEY ("stokeId") REFERENCES "stoke" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_foods" ("amount", "carbo", "category", "fat", "foodName", "id", "protein", "stokeId") SELECT "amount", "carbo", "category", "fat", "foodName", "id", "protein", "stokeId" FROM "foods";
DROP TABLE "foods";
ALTER TABLE "new_foods" RENAME TO "foods";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
