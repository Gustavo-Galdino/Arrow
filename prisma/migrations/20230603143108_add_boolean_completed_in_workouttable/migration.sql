-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_workoutTableExercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "workoutTableId" TEXT NOT NULL,
    CONSTRAINT "workoutTableExercises_workoutTableId_fkey" FOREIGN KEY ("workoutTableId") REFERENCES "workoutTables" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_workoutTableExercises" ("id", "title", "workoutTableId") SELECT "id", "title", "workoutTableId" FROM "workoutTableExercises";
DROP TABLE "workoutTableExercises";
ALTER TABLE "new_workoutTableExercises" RENAME TO "workoutTableExercises";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
