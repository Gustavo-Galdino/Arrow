/*
  Warnings:

  - You are about to alter the column `goal` on the `users` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nivel" INTEGER DEFAULT 1,
    "experience" INTEGER DEFAULT 0,
    "weight" REAL NOT NULL,
    "height" REAL NOT NULL,
    "age" DATETIME NOT NULL,
    "goal" INTEGER NOT NULL
);
INSERT INTO "new_users" ("age", "experience", "goal", "height", "id", "nivel", "userId", "weight") SELECT "age", "experience", "goal", "height", "id", "nivel", "userId", "weight" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
