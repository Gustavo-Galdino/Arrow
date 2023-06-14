-- CreateTable
CREATE TABLE "Stoke" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Stoke_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    CONSTRAINT "foods_stokeId_fkey" FOREIGN KEY ("stokeId") REFERENCES "Stoke" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_foods" ("amount", "carbo", "category", "fat", "foodName", "id", "protein") SELECT "amount", "carbo", "category", "fat", "foodName", "id", "protein" FROM "foods";
DROP TABLE "foods";
ALTER TABLE "new_foods" RENAME TO "foods";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
