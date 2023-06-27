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
      <div className="mt-8">
        <h2 className="mb-4 text-2xl">Adicionar novo alimento</h2>
        <div>
          {user.stoke!.map((item) => (
            <NewFoodStoke key={item.id} stokeId={item.id} />
          ))}
        </div>
      </div>
      <section className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
        {categories.map((category) => (
          <div
            key={category}
            className=" w-full rounded-md border px-4 py-2 sm:self-start"
          >
            <h2 className="my-4 text-2xl">{category}</h2>

            {user
              .stoke!.flatMap((stokeItem) => stokeItem.food)
              .filter((food) => food.category === category)
              .map((food) => (
                <div
                  key={food.id}
                  className="flex flex-col items-center border-b"
                >
                  <span className="font-semibold uppercase underline underline-offset-2">
                    {food.foodName}
                  </span>
                  <span>
                    {food.amount}
                    {food.type}
                  </span>
                  <div className="space-x-2 border-t border-gray-500 py-1">
                    <span>C: {food.carbo}g</span>
                    <span>P: {food.protein}g</span>
                    <span>G: {food.fat}g</span>
                  </div>
                  <span>
                    <DeleteModal
                      description={`Ao deletar ${food.foodName}, sera apagado tambem da sua lista de dieta`}
                      exerciseId={food.id}
                      title={`Deletar ${food.foodName}?`}
                      whereApi="stoke"
                    />
                  </span>
                </div>
              ))}
          </div>
        ))}
      </section>
    </>
  )
}
