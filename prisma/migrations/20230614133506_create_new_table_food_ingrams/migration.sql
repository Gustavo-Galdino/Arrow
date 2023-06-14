/*
  Warnings:

  - You are about to drop the column `grams` on the `foods` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "FoodInGrams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grams" INTEGER NOT NULL,
    "foodId" TEXT NOT NULL,
    CONSTRAINT "FoodInGrams_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_foods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
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
