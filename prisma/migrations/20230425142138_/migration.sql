/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `workoutTableExercises` table. All the data in the column will be lost.
  - You are about to drop the column `tableId` on the `workoutTableExercises` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_workoutTableExercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workoutTableId" TEXT NOT NULL,
    CONSTRAINT "workoutTableExercises_workoutTableId_fkey" FOREIGN KEY ("workoutTableId") REFERENCES "workoutTables" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_workoutTableExercises" ("id", "workoutTableId") SELECT "id", "workoutTableId" FROM "workoutTableExercises";
DROP TABLE "workoutTableExercises";
ALTER TABLE "new_workoutTableExercises" RENAME TO "workoutTableExercises";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
