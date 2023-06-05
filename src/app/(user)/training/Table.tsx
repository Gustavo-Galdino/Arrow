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
          className="mt-16 grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {table.WorkoutTableExercise.map((tableExercise) => (
            <ul
              key={tableExercise.id}
              className={`shadow-gray-900/102 relative box-border flex w-full flex-col gap-4 rounded  p-4 text-base shadow-lg ${
                tableExercise.completed ? 'bg-slate-700' : 'bg-gray-700'
              }`}
            >
              <div className="absolute right-0 top-0 px-5 py-3">
                <DeleteModal
                  title={`Deletar tabela ${tableExercise.title}?`}
                  description="Isso ira deletar a tabela completa!"
                  exerciseId={tableExercise.id}
                  whereApi="users"
                />
              </div>

              <div className="flex items-center gap-2 xl:flex-col 2xl:flex-row">
                <h2 className="text-2xl font-bold">{tableExercise.title}</h2>
                <ButtonCheck
                  tableId={tableExercise.id}
                  complete={tableExercise.completed}
                  experience={user.experience}
                  nivel={user.nivel}
                />
              </div>
              {tableExercise.exercise.length > 0 ? (
                <>
                  {tableExercise.exercise.map((exercise) => (
                    <li key={exercise.id}>
                      <ExerciseList
                        exerciseId={exercise.id}
                        name={exercise.exerciseName}
                        series={exercise.series}
                        volume={exercise.volume}
                        annotation={exercise.annotation}
                      />
                    </li>
                  ))}
                </>
              ) : (
                <p className="mt-4 text-center text-gray-400">
                  Lista de Treino Vazia
                </p>
              )}
              <FormNewExercise exerciseTableId={tableExercise.id} />
            </ul>
          ))}
          <NewTraining workoutTableId={table.id} />
        </section>
      ))}
    </>
  )
}
