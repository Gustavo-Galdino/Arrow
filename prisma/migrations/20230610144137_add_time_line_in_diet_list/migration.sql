/*
  Warnings:

  - Added the required column `time` to the `DietList` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DietList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meal" TEXT NOT NULL,
    "time" DATETIME NOT NULL,
    "dietBoxId" TEXT NOT NULL,
    CONSTRAINT "DietList_dietBoxId_fkey" FOREIGN KEY ("dietBoxId") REFERENCES "dietTableExercises" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DietList" ("dietBoxId", "id", "meal") SELECT "dietBoxId", "id", "meal" FROM "DietList";
DROP TABLE "DietList";
ALTER TABLE "new_DietList" RENAME TO "DietList";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
