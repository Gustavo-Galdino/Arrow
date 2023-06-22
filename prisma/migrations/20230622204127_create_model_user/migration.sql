-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nivel" INTEGER,
    "experience" INTEGER
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_dietTables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "dietTables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_dietTables" ("id", "userId") SELECT "id", "userId" FROM "dietTables";
DROP TABLE "dietTables";
ALTER TABLE "new_dietTables" RENAME TO "dietTables";
CREATE TABLE "new_workoutTables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "workoutTables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_workoutTables" ("id", "userId") SELECT "id", "userId" FROM "workoutTables";
DROP TABLE "workoutTables";
ALTER TABLE "new_workoutTables" RENAME TO "workoutTables";
CREATE TABLE "new_stoke" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "stoke_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stoke" ("id", "userId") SELECT "id", "userId" FROM "stoke";
DROP TABLE "stoke";
ALTER TABLE "new_stoke" RENAME TO "stoke";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
