import { Header } from '@/components/Header'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import { Table } from './Table'
import { useStore } from '@/context/store'
import { StoreInitializer } from '@/components/StoreInitializer'
import { Experience } from './experience'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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

export default async function Training() {
  const token = cookies().get('next-auth.session-token')?.value

  const response = await api.get('/api/users', {
    withCredentials: true,
    headers: {
      Cookie: `next-auth.session-token=${token}`,
    },
  })

  const user: User = response.data

  useStore.setState({ user })
  return (
    <main className="px-10">
      <StoreInitializer user={user} />
      <Header />

      <section className="mt-16 flex w-full flex-col items-center justify-center">
        <div className="flex w-full justify-between border-b pb-2">
          <div>
            <Experience />
            <div className="flex items-center gap-1">
              <strong className="text-xl uppercase leading-relaxed tracking-widest">
                {user.name}
              </strong>
              <span className="font-bold">|</span>
              <span className="text-sm text-gray-200">Frango</span>
            </div>
          </div>
          <Link
            href="/diet"
            className="flex items-center gap-1 self-end text-sm"
          >
            Ir para Plano Alimentar
            <ArrowRight size={14} />
          </Link>
        </div>

        <Table />
      </section>

      <footer className="mt-20" />
    </main>
  )
}
