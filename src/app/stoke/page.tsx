import { Food } from '@/context/store'
import { api } from '@/lib/api'
import { NewFoodStoke } from './NewFood'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Stoke {
  id: string
  userId: string
  food: Food[]
}

export default async function Stock() {
  const response = await api.get('api/stoke')
  const stoke: Stoke[] = response.data

  const categories = [
    'Fontes de Carboidrato',
    'Fontes de Proteína',
    'Fontes de Gordura',
  ]

  return (
    <main className="px-10">
      <Header />

      <div className="container mx-auto p-4">
        <div className="flex w-full">
          <Link
            href="/diet"
            className="flex items-center gap-1 self-end justify-self-start"
          >
            <ArrowLeft size={14} />
            Voltar
          </Link>
          <h1 className="m-auto mb-10 text-5xl font-bold underline underline-offset-2">
            Estoque
          </h1>
        </div>

        {categories.map((category) => (
          <div key={category}>
            <h2 className="my-4 text-2xl">{category}</h2>

            <table className="w-full table-auto text-left">
              <thead className="border-b-2 border-gray-300">
                <tr>
                  <th className="px-4">Nome</th>
                  <th className="px-4">Quantidade</th>
                  <th className="px-4">Carboidratos</th>
                  <th className="px-4">Proteínas</th>
                  <th className="px-4">Gorduras</th>
                </tr>
              </thead>
              <tbody>
                {stoke
                  .flatMap((stokeItem) => stokeItem.food)
                  .filter((food) => food.category === category)
                  .map((food) => (
                    <tr key={food.id}>
                      <td className="border p-1">{food.foodName}</td>
                      <td className="border p-1">{food.amount}</td>
                      <td className="border p-1">{food.carbo}</td>
                      <td className="border p-1">{food.protein}</td>
                      <td className="border p-1">{food.fat}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}

        <div className="mt-8">
          <h2 className="mb-4 text-2xl">Adicionar novo alimento</h2>
          <div>
            {stoke.map((item) => (
              <NewFoodStoke key={item.id} stokeId={item.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
