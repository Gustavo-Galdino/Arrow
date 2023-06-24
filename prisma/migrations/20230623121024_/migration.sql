-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nivel" INTEGER DEFAULT 1,
    "experience" INTEGER DEFAULT 0,
    "weight" REAL NOT NULL,
    "height" REAL NOT NULL,
    "age" DATETIME NOT NULL,
    "activity" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "workoutTables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "workoutTables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "workoutTableExercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "workoutTableId" TEXT NOT NULL,
    CONSTRAINT "workoutTableExercises_workoutTableId_fkey" FOREIGN KEY ("workoutTableId") REFERENCES "workoutTables" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "exerciseName" TEXT NOT NULL,
    "series" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "annotation" TEXT
);

-- CreateTable
CREATE TABLE "dietTables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "dietTables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "dietTableExercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "dietTableId" TEXT NOT NULL,
    CONSTRAINT "dietTableExercises_dietTableId_fkey" FOREIGN KEY ("dietTableId") REFERENCES "dietTables" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DietList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meal" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "dietBoxId" TEXT NOT NULL,
    CONSTRAINT "DietList_dietBoxId_fkey" FOREIGN KEY ("dietBoxId") REFERENCES "dietTableExercises" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "foods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "carbo" REAL NOT NULL,
    "protein" REAL NOT NULL,
    "fat" REAL NOT NULL,
    "stokeId" TEXT,
    CONSTRAINT "foods_stokeId_fkey" FOREIGN KEY ("stokeId") REFERENCES "stoke" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FoodInGrams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grams" INTEGER NOT NULL,
    "foodId" TEXT NOT NULL,
    "dietListId" TEXT,
    CONSTRAINT "FoodInGrams_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FoodInGrams_dietListId_fkey" FOREIGN KEY ("dietListId") REFERENCES "DietList" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stoke" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "stoke_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ExerciseToWorkoutTableExercise" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ExerciseToWorkoutTableExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "exercises" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ExerciseToWorkoutTableExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "workoutTableExercises" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkoutTableExercise_AB_unique" ON "_ExerciseToWorkoutTableExercise"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkoutTableExercise_B_index" ON "_ExerciseToWorkoutTableExercise"("B");
