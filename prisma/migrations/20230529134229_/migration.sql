-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "nivel" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
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
    "dietBoxId" TEXT NOT NULL,
    CONSTRAINT "DietList_dietBoxId_fkey" FOREIGN KEY ("dietBoxId") REFERENCES "dietTableExercises" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "foods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "foodName" TEXT NOT NULL
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

-- CreateTable
CREATE TABLE "_DietListToFood" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DietListToFood_A_fkey" FOREIGN KEY ("A") REFERENCES "DietList" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DietListToFood_B_fkey" FOREIGN KEY ("B") REFERENCES "foods" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkoutTableExercise_AB_unique" ON "_ExerciseToWorkoutTableExercise"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkoutTableExercise_B_index" ON "_ExerciseToWorkoutTableExercise"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NoteToWorkoutTableNote_AB_unique" ON "_NoteToWorkoutTableNote"("A", "B");

-- CreateIndex
CREATE INDEX "_NoteToWorkoutTableNote_B_index" ON "_NoteToWorkoutTableNote"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DietListToFood_AB_unique" ON "_DietListToFood"("A", "B");

-- CreateIndex
CREATE INDEX "_DietListToFood_B_index" ON "_DietListToFood"("B");
