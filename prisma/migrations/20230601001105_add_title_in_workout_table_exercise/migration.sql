/*
  Warnings:

  - Added the required column `title` to the `workoutTableExercises` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_workoutTableExercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "workoutTableId" TEXT NOT NULL,
    CONSTRAINT "workoutTableExercises_workoutTableId_fkey" FOREIGN KEY ("workoutTableId") REFERENCES "workoutTables" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_workoutTableExercises" ("id", "workoutTableId") SELECT "id", "workoutTableId" FROM "workoutTableExercises";
DROP TABLE "workoutTableExercises";
ALTER TABLE "new_workoutTableExercises" RENAME TO "workoutTableExercises";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
