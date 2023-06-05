import { create } from 'zustand'

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

interface User {
  id: string
  name: string
  nivel: number
  experience: number
  workoutTable: WorkoutTable[]
}

export const useStore = create<{ user: User | null }>((set) => ({
  user: null,
}))
