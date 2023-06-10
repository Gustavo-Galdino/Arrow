'use client'

import { DeleteModal } from '@/components/ButtonDelete'
import { useStore } from '@/context/store'
import { NewDiet } from './NewDiet'
import { FormNewMeal } from './FormNewMeal'
import { NewFood } from './NewFood'
import { ChevronRight } from 'lucide-react'
import { FoodList } from './FoodList'
import * as Accordion from '@radix-ui/react-accordion'
import { EditUl } from './EditUl'
import { MacrosTotal } from './MacrosTotal'

export function Table() {
  const user = useStore((state) => state.user)

  if (!user) return null

  return (
    <>
      {user.dietTable!.map((table) => (
        <section key={table.id} className="mt-6 w-full">
          <NewDiet dietTableId={table.id} />
          <div className="mt-6 flex flex-wrap items-start justify-center gap-4">
            {table.dietBox.map((tableBox) => (
              <article
                key={tableBox.id}
                className="shadow-gray-900/102 container relative box-border grid grid-cols-1 gap-4 rounded bg-gray-700 p-4 text-base shadow-lg md:grid-cols-2"
              >
                <div className="border-gray-500 md:col-start-2 md:border-l">
                  <MacrosTotal dietBox={tableBox} />
                </div>

                <div className="col-start-1 row-start-1 space-y-4">
                  <h2 className="mb-2 text-3xl font-bold">{tableBox.title}</h2>
                  <div className="absolute right-0 top-0 px-5 py-3">
                    <DeleteModal
                      title={`Deletar tabela ${tableBox.title}?`}
                      description="Isso ira deletar a tabela completa!"
                      exerciseId={tableBox.id}
                      whereApi="dietTable"
                    />
                  </div>

                  {tableBox.dietList.map((list) => (
                    <div key={list.id}>
                      <Accordion.Root type="single" collapsible>
                        <Accordion.Item value={list.meal}>
                          <Accordion.Trigger asChild>
                            <ul className="flex cursor-pointer flex-col gap-4 hover:text-gray-200">
                              <div className="flex items-center gap-1.5">
                                <span>
                                  <ChevronRight size={16} />
                                </span>
                                <h2 className="text-xl font-semibold uppercase">
                                  {list.time} - {list.meal}
                                </h2>
                                <EditUl id={list.id} />
                              </div>
                            </ul>
                          </Accordion.Trigger>
                          <Accordion.Content className="space-y-4">
                            {list.food.length > 0 ? (
                              <>
                                {list.food.map((food) => (
                                  <li key={food.id} className="list-none">
                                    <FoodList
                                      carbo={food.carbo}
                                      fat={food.fat}
                                      protein={food.protein}
                                      foodId={food.id}
                                      tableId={list.id}
                                      name={food.foodName}
                                    />
                                  </li>
                                ))}
                              </>
                            ) : (
                              <p className="mt-4 text-center text-gray-400">
                                Lista de Alimentos Vazia
                              </p>
                            )}
                            <NewFood dietListId={list.id} />
                          </Accordion.Content>
                        </Accordion.Item>
                      </Accordion.Root>
                    </div>
                  ))}
                  <div>
                    <FormNewMeal id={tableBox.id} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
