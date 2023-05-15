/*
  Warnings:

  - Added the required column `title` to the `dietTableExercises` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_dietTableExercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "dietTableId" TEXT NOT NULL,
    CONSTRAINT "dietTableExercises_dietTableId_fkey" FOREIGN KEY ("dietTableId") REFERENCES "dietTables" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_dietTableExercises" ("dietTableId", "id") SELECT "dietTableId", "id" FROM "dietTableExercises";
DROP TABLE "dietTableExercises";
ALTER TABLE "new_dietTableExercises" RENAME TO "dietTableExercises";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
