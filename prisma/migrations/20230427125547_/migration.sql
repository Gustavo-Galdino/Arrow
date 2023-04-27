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
    CONSTRAINT "workoutTables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "workoutTables_workoutTableExerciseId_fkey" FOREIGN KEY ("workoutTableExerciseId") REFERENCES "workoutTableExercises" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "workoutTables_workoutTableNoteId_fkey" FOREIGN KEY ("workoutTableNoteId") REFERENCES "workoutTableNotes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "workoutTableExercises" (
    "id" TEXT NOT NULL PRIMARY KEY
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
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "annotation" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseToWorkoutTableExercise" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ExerciseToWorkoutTableExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "exercises" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ExerciseToWorkoutTableExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "workoutTableExercises" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_NoteToWorkoutTableNote" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_NoteToWorkoutTableNote_A_fkey" FOREIGN KEY ("A") REFERENCES "notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_NoteToWorkoutTableNote_B_fkey" FOREIGN KEY ("B") REFERENCES "workoutTableNotes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkoutTableExercise_AB_unique" ON "_ExerciseToWorkoutTableExercise"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkoutTableExercise_B_index" ON "_ExerciseToWorkoutTableExercise"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NoteToWorkoutTableNote_AB_unique" ON "_NoteToWorkoutTableNote"("A", "B");

-- CreateIndex
CREATE INDEX "_NoteToWorkoutTableNote_B_index" ON "_NoteToWorkoutTableNote"("B");