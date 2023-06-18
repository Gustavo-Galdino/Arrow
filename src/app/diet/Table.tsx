'use client'

import { DeleteModal } from '@/components/ButtonDelete'
import { useStore } from '@/context/store'
import { NewDiet } from './NewDiet'
import { FormNewMeal } from './FormNewMeal'
import { NewFood } from './NewFood'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { FoodList } from './FoodList'
import * as Accordion from '@radix-ui/react-accordion'
import { EditUl } from './EditUl'
import { MacrosTotal } from './MacrosTotal'
import { useState } from 'react'

export function Table() {
  const [open, setOpen] = useState(false)
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
                            <ul
                              className="flex cursor-pointer flex-col gap-4 hover:text-gray-200"
                              onClick={() => setOpen(!open)}
                            >
                              <div className="flex items-center gap-1.5">
                                {open ? (
                                  <ChevronDown size={14} />
                                ) : (
                                  <ChevronRight size={14} />
                                )}

                                <h2 className="text-xl font-semibold uppercase">
                                  {list.time} - {list.meal}
                                </h2>
                                <EditUl id={list.id} />
                              </div>
                            </ul>
                          </Accordion.Trigger>
                          <Accordion.Content className="mt-2 space-y-4">
                            {list.food.length > 0 ? (
                              <>
                                {list.food.map((food) => (
                                  <li key={food.id} className="list-none">
                                    <FoodList
                                      grams={food.grams}
                                      carbo={food.food.carbo}
                                      fat={food.food.fat}
                                      protein={food.food.protein}
                                      foodId={food.id}
                                      name={food.food.foodName}
                                      idGrams={food.id}
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
