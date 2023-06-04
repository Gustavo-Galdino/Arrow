'use client'

import { DeleteModal } from '@/components/ButtonDelete'
import { ButtonCheck } from './ButtonCheck'
import { ExerciseList } from './ExerciseList'
import { FormNewExercise } from './FormNewExercice'
import { NewTraining } from './NewTraining'
import { useStore } from '@/context/store'

interface Exercise {
  id: string
  exerciseName: string
  series: number
  volume: number
  annotation?: string
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
  workoutTable: WorkoutTable[]
}

export function Table() {
  const user = useStore((state) => state.user)

  if (!user) return null

  return (
    <>
      {user.workoutTable.map((table) => (
        <section
          key={table.id}
          className="mt-16 flex flex-wrap items-start justify-center gap-4"
        >
          {table.WorkoutTableExercise.map((tableExercise) => (
            <ul
              key={tableExercise.id}
              className="relative flex max-w-md flex-col gap-4 rounded-lg border border-gray-400 p-6 shadow"
            >
              <div className="absolute right-0 top-0 p-2">
                <DeleteModal
                  title={`Deletar tabela ${tableExercise.title}?`}
                  description="Isso ira deletar a tabela completa!"
                  exerciseId={tableExercise.id}
                  whereApi="users"
                />
              </div>

              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{tableExercise.title}</h2>
                <ButtonCheck
                  tableId={tableExercise.id}
                  complete={tableExercise.completed}
                  experience={user.experience}
                  nivel={user.nivel}
                />
              </div>
              {tableExercise.exercise.map((exercise) => (
                <li key={exercise.id}>
                  <ExerciseList
                    exerciseId={exercise.id}
                    name={exercise.exerciseName}
                    series={exercise.series}
                    volume={exercise.volume}
                  />
                </li>
              ))}
              <FormNewExercise exerciseTableId={tableExercise.id} />
            </ul>
          ))}
          <NewTraining workoutTableId={table.id} />
        </section>
      ))}
    </>
  )
}
