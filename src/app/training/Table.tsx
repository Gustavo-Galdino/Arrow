'use client'

import { DeleteModal } from '@/components/ButtonDelete'
import { ButtonCheck } from './ButtonCheck'
import { ExerciseList } from './ExerciseList'
import { FormNewExercise } from './FormNewExercice'
import { NewTraining } from './NewTraining'
import { useStore } from '@/context/store'

export function Table() {
  const user = useStore((state) => state.user)

  if (!user?.workoutTable) return null

  return (
    <>
      {user.workoutTable.map((table) => (
        <section
          key={table.id}
          className="grid gap-4 py-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {table.WorkoutTableExercise.map((tableExercise) => (
            <ul
              key={tableExercise.id}
              className={`dark:shadow-zinc-900/102 shadow-zinc-100/102 relative box-border flex w-full flex-col gap-4 rounded  p-4 text-base shadow-lg ${
                tableExercise.completed
                  ? 'bg-zinc-300 dark:bg-zinc-700'
                  : 'bg-zinc-200 dark:bg-zinc-700'
              }`}
            >
              <div className="absolute right-0 top-0 px-5 py-3">
                <DeleteModal
                  title={`Deletar tabela ${tableExercise.title}?`}
                  description="Isso ira deletar a tabela completa!"
                  exerciseId={tableExercise.id}
                  whereApi="workoutTable"
                />
              </div>

              <div className="flex items-center gap-2 xl:flex-col 2xl:flex-row">
                <h2 className="text-2xl font-bold">{tableExercise.title}</h2>
                <ButtonCheck
                  userId={user.id}
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
                <p className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
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
