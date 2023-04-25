-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "workoutTables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tableName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workoutTableExerciseId" TEXT NOT NULL,
    "workoutTableNoteId" TEXT NOT NULL,
    CONSTRAINT "workoutTables_workoutTableExerciseId_fkey" FOREIGN KEY ("workoutTableExerciseId") REFERENCES "workoutTableExercises" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "workoutTables_workoutTableNoteId_fkey" FOREIGN KEY ("workoutTableNoteId") REFERENCES "workoutTableNotes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "workoutTables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "workoutTableExercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tableId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "exerciseName" TEXT NOT NULL,
    "series" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "workoutTableNotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tableId" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,
    CONSTRAINT "workoutTableNotes_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "note" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseToWorkoutTableExercise" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ExerciseToWorkoutTableExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "exercises" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ExerciseToWorkoutTableExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "workoutTableExercises" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkoutTableExercise_AB_unique" ON "_ExerciseToWorkoutTableExercise"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkoutTableExercise_B_index" ON "_ExerciseToWorkoutTableExercise"("B");
