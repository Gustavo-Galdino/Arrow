/*
  Warnings:

  - Added the required column `amount` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbo` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_foods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "carbo" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL
);
INSERT INTO "new_foods" ("foodName", "id") SELECT "foodName", "id" FROM "foods";
DROP TABLE "foods";
ALTER TABLE "new_foods" RENAME TO "foods";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
