/*
  Warnings:

  - You are about to alter the column `carbo` on the `foods` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `fat` on the `foods` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `protein` on the `foods` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_foods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "carbo" REAL NOT NULL,
    "protein" REAL NOT NULL,
    "fat" REAL NOT NULL
);
INSERT INTO "new_foods" ("amount", "carbo", "category", "fat", "foodName", "id", "protein") SELECT "amount", "carbo", "category", "fat", "foodName", "id", "protein" FROM "foods";
DROP TABLE "foods";
ALTER TABLE "new_foods" RENAME TO "foods";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
