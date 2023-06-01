/*
  Warnings:

  - You are about to drop the `_NoteToWorkoutTableNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workoutTableNotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `tableName` on the `workoutTables` table. All the data in the column will be lost.
  - You are about to drop the column `workoutTableNoteId` on the `workoutTables` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_NoteToWorkoutTableNote_B_index";

-- DropIndex
DROP INDEX "_NoteToWorkoutTableNote_AB_unique";

-- AlterTable
ALTER TABLE "exercises" ADD COLUMN "annotation" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_NoteToWorkoutTableNote";
PRAGMA foreign_keys=on;

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
CREATE TABLE "new_workoutTables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "workoutTableExerciseId" TEXT NOT NULL,
    CONSTRAINT "workoutTables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "workoutTables_workoutTableExerciseId_fkey" FOREIGN KEY ("workoutTableExerciseId") REFERENCES "workoutTableExercises" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_workoutTables" ("id", "userId", "workoutTableExerciseId") SELECT "id", "userId", "workoutTableExerciseId" FROM "workoutTables";
DROP TABLE "workoutTables";
ALTER TABLE "new_workoutTables" RENAME TO "workoutTables";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "nivel" INTEGER,
    "experience" INTEGER
);
INSERT INTO "new_users" ("email", "emailVerified", "experience", "id", "image", "name", "nivel", "password") SELECT "email", "emailVerified", "experience", "id", "image", "name", "nivel", "password" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
