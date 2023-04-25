/*
  Warnings:

  - You are about to drop the `notes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workoutTableNotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `workoutTableExerciseId` on the `workoutTables` table. All the data in the column will be lost.
  - You are about to drop the column `workoutTableNoteId` on the `workoutTables` table. All the data in the column will be lost.
  - Added the required column `workoutTableId` to the `workoutTableExercises` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "notes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "workoutTableNotes";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_workoutTableExercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tableId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "workoutTableId" TEXT NOT NULL,
    CONSTRAINT "workoutTableExercises_workoutTableId_fkey" FOREIGN KEY ("workoutTableId") REFERENCES "workoutTables" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_workoutTableExercises" ("exerciseId", "id", "tableId") SELECT "exerciseId", "id", "tableId" FROM "workoutTableExercises";
DROP TABLE "workoutTableExercises";
ALTER TABLE "new_workoutTableExercises" RENAME TO "workoutTableExercises";
CREATE TABLE "new_workoutTables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tableName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "workoutTables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_workoutTables" ("id", "tableName", "userId") SELECT "id", "tableName", "userId" FROM "workoutTables";
DROP TABLE "workoutTables";
ALTER TABLE "new_workoutTables" RENAME TO "workoutTables";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
