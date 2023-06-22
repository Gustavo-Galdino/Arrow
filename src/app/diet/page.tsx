import { Experience } from '@/components/UserInformations'
import { Header } from '@/components/Header'
import { StoreInitializer } from '@/components/StoreInitializer'
import { api } from '@/lib/api'
import { ArrowRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Table } from './Table'
import { useStore } from '@/context/store'

interface Food {
  id: string
  foodName: string
  carbo: number
  protein: number
  fat: number
  amount: number
  grams: number
  category: string
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
interface Stoke {
  id: string
  userId: string
  food: Food[]
}

export interface User {
  data: {
    id: string
    name: string
    nivel: number
    experience: number
    dietTable: DietTable[]
    Stoke: Stoke[]
  }
}

export default async function Diet() {
  const token = cookies().get('next-auth.session-token')?.value

  const response = await api.get('/api/users', {
    withCredentials: true,
    headers: {
      Cookie: `next-auth.session-token=${token}`,
    },
  })

  const { data: user }: User = response
  useStore.setState({ user })

  return (
    <main className="px-10">
      <StoreInitializer user={user} />
      <Header />

      <section className="mt-16 flex flex-col items-center justify-center">
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
          <div className="flex flex-col items-center gap-1">
            <Link
              href="/stoke"
              className="flex items-center gap-1 self-end text-sm hover:text-gray-200"
            >
              Estoque
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/training"
              className="flex items-center gap-1 self-end text-sm hover:text-gray-200"
            >
              Ir para Plano de Treino
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <Table />
      </section>

      <footer className="mt-20" />
    </main>
  )
}
