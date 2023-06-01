import { Header } from '@/components/Header'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import { NewTraining } from './NewTraining'
import { Check } from 'lucide-react'
import { FormNewExercise } from './FormNewExercice'
import { DeleteModal } from '@/components/ButtonDelete'

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

export default async function Training() {
  const token = cookies().get('next-auth.session-token')?.value

  const response = await api.get('/api/users', {
    withCredentials: true,
    headers: {
      Cookie: `next-auth.session-token=${token}`,
    },
  })

  const user: User[] = response.data

  return (
    <main className="px-10">
      <Header />

      {user.map((u) => (
        <section key={u.id} className="mt-16">
          <div>
            <div className="flex items-center gap-1">
              <strong className="text-xl uppercase leading-relaxed tracking-widest">
                {u.name}
              </strong>
              <span className="font-bold">|</span>
              <span className="text-sm text-gray-200">Frango</span>
            </div>
            <strong className="text-xs">
              Lv: {u.nivel} - exp: {u.experience}
            </strong>
          </div>
          <div className="mt-1 border" />

          {u.workoutTable.map((table) => (
            <section key={table.id} className="mt-16 grid grid-cols-3 gap-4">
              {table.WorkoutTableExercise.map((tableExercise) => (
                <ul
                  key={tableExercise.id}
                  className="flex flex-col gap-4 rounded-lg border border-gray-400 p-6 shadow"
                >
                  <h2 className="text-2xl font-bold">{tableExercise.title}</h2>
                  {tableExercise.exercise.map((exercise) => (
                    <li
                      key={exercise.id}
                      className="grid grid-cols-3 items-center justify-between gap-4 rounded bg-gray-600 px-2 py-1"
                    >
                      <strong>{exercise.exerciseName}</strong>
                      <span>
                        Series: {exercise.series} / {exercise.volume}
                      </span>

                      <div className="flex gap-2 justify-self-end">
                        <DeleteModal
                          exerciseId={exercise.id}
                          title="Deletar Exercicio?"
                          description="Ao deleter o exercicio sera apagado permanentemente"
                        />
                        <Check
                          size={16}
                          className="cursor-pointer hover:text-green-300"
                        />
                      </div>
                    </li>
                  ))}
                  <FormNewExercise exerciseTableId={tableExercise.id} />
                </ul>
              ))}
              <NewTraining workoutTableId={table.id} />
            </section>
          ))}
        </section>
      ))}
    </main>
  )
}
