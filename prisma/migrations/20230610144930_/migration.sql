-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DietList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meal" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "dietBoxId" TEXT NOT NULL,
    CONSTRAINT "DietList_dietBoxId_fkey" FOREIGN KEY ("dietBoxId") REFERENCES "dietTableExercises" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DietList" ("dietBoxId", "id", "meal", "time") SELECT "dietBoxId", "id", "meal", "time" FROM "DietList";
DROP TABLE "DietList";
ALTER TABLE "new_DietList" RENAME TO "DietList";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
