'use client'

import { DeleteModal } from '@/components/ButtonDelete'
import { useStore } from '@/context/store'
import { NewFoodStoke } from './NewFood'

export function Table() {
  const user = useStore((state) => state.user)

  if (!user) return null

  const categories = [
    'Fontes de Carboidrato',
    'Fontes de Proteína',
    'Fontes de Gordura',
  ]

  return (
    <>
      {categories.map((category) => (
        <div key={category}>
          <h2 className="my-4 text-2xl">{category}</h2>

          <table className="w-full table-auto text-left">
            <thead className="border-b-2 border-gray-300 text-center">
              <tr>
                <th className="px-4">Nome</th>
                <th className="px-4">Quantidade</th>
                <th className="px-4">Carboidratos</th>
                <th className="px-4">Proteínas</th>
                <th className="px-4">Gorduras</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {user
                .stoke!.flatMap((stokeItem) => stokeItem.food)
                .filter((food) => food.category === category)
                .map((food) => (
                  <tr key={food.id}>
                    <td className="border-b border-gray-500 p-1 text-start">
                      {food.foodName}
                    </td>
                    <td className="border-b border-gray-500 p-1">
                      {food.amount}
                    </td>
                    <td className="border-b border-gray-500 p-1">
                      {food.carbo}
                    </td>
                    <td className="border-b border-gray-500 p-1">
                      {food.protein}
                    </td>
                    <td className="border-b border-gray-500 p-1">{food.fat}</td>
                    <td className="border-b border-gray-500 p-1">
                      <DeleteModal
                        description={`Ao deletar ${food.foodName}, sera apagado tambem da sua lista de dieta`}
                        exerciseId={food.id}
                        title={`Deletar ${food.foodName}?`}
                        whereApi="stoke"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}

      <div className="mt-8">
        <h2 className="mb-4 text-2xl">Adicionar novo alimento</h2>
        <div>
          {user.stoke!.map((item) => (
            <NewFoodStoke key={item.id} stokeId={item.id} />
          ))}
        </div>
      </div>
    </>
  )
}
