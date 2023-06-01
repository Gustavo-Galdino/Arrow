import { Header } from '@/components/Header'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import { NewTraining } from './NewTraining'
import { FormNewExercise } from './FormNewExercice'
import { DeleteModal } from '@/components/ButtonDelete'
import { ExerciseList } from './ExerciseList'
import { ButtonCheck } from './ButtonCheck'

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

  const user: User = response.data
  return (
    <main className="px-10">
      <Header />

      <section className="mt-16">
        <div>
          <div className="flex items-center gap-1">
            <strong className="text-xl uppercase leading-relaxed tracking-widest">
              {user.name}
            </strong>
            <span className="font-bold">|</span>
            <span className="text-sm text-gray-200">Frango</span>
          </div>
          <strong className="text-xs">
            Lv: {user.nivel} - exp: {user.experience}
          </strong>
        </div>
        <div className="mt-1 border" />

        {user.workoutTable.map((table) => (
          <section key={table.id} className="mt-16 grid grid-cols-3 gap-4">
            {table.WorkoutTableExercise.map((tableExercise) => (
              <ul
                key={tableExercise.id}
                className="relative flex flex-col gap-4 rounded-lg border border-gray-400 p-6 shadow"
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
                  <ButtonCheck tableId={tableExercise.id} />
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
      </section>
    </main>
  )
}
