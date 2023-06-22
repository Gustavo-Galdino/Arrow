import { create } from 'zustand'

export interface Food {
  id: string
  foodName: string
  carbo: number
  protein: number
  fat: number
  amount: number
  category: string
}

interface Stoke {
  id: string
  userId: string
  food: Food[]
}

interface FoodInGrams {
  id: string
  grams: number
  food: Food
}

interface DietList {
  id: string
  meal: string
  time: number
  food: FoodInGrams[]
}

export interface DietBox {
  id: string
  title: string
  dietList: DietList[]
}

interface DietTable {
  id: string
  dietBox: DietBox[]
}

interface Exercise {
  id: string
  exerciseName: string
  series: number
  volume: number
  annotation: string
}
interface WorkoutTableExercice {
  id: string
  title: string
  completed: boolean
  exercise: Exercise[]
}

interface WorkoutTable {
  id: string
  WorkoutTableExercise: WorkoutTableExercice[]
}

export interface User {
  id: string
  name: string
  nivel: number
  experience: number
  workoutTable?: WorkoutTable[]
  dietTable?: DietTable[]
  Stoke: Stoke[]
}

export const useStore = create<{ user: User | null }>((set) => ({
  user: null,
}))
