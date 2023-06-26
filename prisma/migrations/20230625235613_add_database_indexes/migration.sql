-- DropForeignKey
ALTER TABLE `DietList` DROP FOREIGN KEY `DietList_dietBoxId_fkey`;

-- DropForeignKey
ALTER TABLE `FoodInGrams` DROP FOREIGN KEY `FoodInGrams_dietListId_fkey`;

-- DropForeignKey
ALTER TABLE `FoodInGrams` DROP FOREIGN KEY `FoodInGrams_foodId_fkey`;

-- DropForeignKey
ALTER TABLE `_ExerciseToWorkoutTableExercise` DROP FOREIGN KEY `_ExerciseToWorkoutTableExercise_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ExerciseToWorkoutTableExercise` DROP FOREIGN KEY `_ExerciseToWorkoutTableExercise_B_fkey`;

-- DropForeignKey
ALTER TABLE `dietTableExercises` DROP FOREIGN KEY `dietTableExercises_dietTableId_fkey`;

-- DropForeignKey
ALTER TABLE `dietTables` DROP FOREIGN KEY `dietTables_userId_fkey`;

-- DropForeignKey
ALTER TABLE `foods` DROP FOREIGN KEY `foods_stokeId_fkey`;

-- DropForeignKey
ALTER TABLE `stoke` DROP FOREIGN KEY `stoke_userId_fkey`;

-- DropForeignKey
ALTER TABLE `workoutTableExercises` DROP FOREIGN KEY `workoutTableExercises_workoutTableId_fkey`;

-- DropForeignKey
ALTER TABLE `workoutTables` DROP FOREIGN KEY `workoutTables_userId_fkey`;

-- RenameIndex
ALTER TABLE `DietList` RENAME INDEX `DietList_dietBoxId_fkey` TO `DietList_dietBoxId_idx`;

-- RenameIndex
ALTER TABLE `FoodInGrams` RENAME INDEX `FoodInGrams_dietListId_fkey` TO `FoodInGrams_dietListId_idx`;

-- RenameIndex
ALTER TABLE `FoodInGrams` RENAME INDEX `FoodInGrams_foodId_fkey` TO `FoodInGrams_foodId_idx`;

-- RenameIndex
ALTER TABLE `dietTableExercises` RENAME INDEX `dietTableExercises_dietTableId_fkey` TO `dietTableExercises_dietTableId_idx`;

-- RenameIndex
ALTER TABLE `dietTables` RENAME INDEX `dietTables_userId_fkey` TO `dietTables_userId_idx`;

-- RenameIndex
ALTER TABLE `foods` RENAME INDEX `foods_stokeId_fkey` TO `foods_stokeId_idx`;

-- RenameIndex
ALTER TABLE `stoke` RENAME INDEX `stoke_userId_fkey` TO `stoke_userId_idx`;

-- RenameIndex
ALTER TABLE `workoutTableExercises` RENAME INDEX `workoutTableExercises_workoutTableId_fkey` TO `workoutTableExercises_workoutTableId_idx`;

-- RenameIndex
ALTER TABLE `workoutTables` RENAME INDEX `workoutTables_userId_fkey` TO `workoutTables_userId_idx`;
