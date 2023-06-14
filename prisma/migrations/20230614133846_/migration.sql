/*
  Warnings:

  - You are about to drop the `_DietListToFood` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_DietListToFood_B_index";

-- DropIndex
DROP INDEX "_DietListToFood_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_DietListToFood";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FoodInGrams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grams" INTEGER NOT NULL,
    "foodId" TEXT NOT NULL,
    "dietListId" TEXT,
    CONSTRAINT "FoodInGrams_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FoodInGrams_dietListId_fkey" FOREIGN KEY ("dietListId") REFERENCES "DietList" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FoodInGrams" ("foodId", "grams", "id") SELECT "foodId", "grams", "id" FROM "FoodInGrams";
DROP TABLE "FoodInGrams";
ALTER TABLE "new_FoodInGrams" RENAME TO "FoodInGrams";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
