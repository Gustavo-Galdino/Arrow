'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Food {
  id: string
  foodName: string
}

interface DietList {
  id: string
  meal: string
  dietBoxId: string
  food: Food[]
}

interface DietTable {
  id: string
  title: string
  dietTableId: string
  dietList: DietList[]
}

interface TableProps {
  tables: DietTable[]
}
export function Table({ tables }: TableProps) {
  const [dietTables, setDietTables] = useState<DietTable[]>([])
  const { register, getValues } = useForm()

  useEffect(() => {
    setDietTables(tables)
  }, [tables])

  async function handleNewList(dietBoxId: string) {
    const meal = getValues(`meal${dietBoxId}`)
    if (meal) {
      await fetch('http://localhost:3000/api/dietList', {
        method: 'POST',
        body: JSON.stringify({
          meal,
          dietBoxId,
        }),
      })
    }

    const response = await fetch('http://localhost:3000/api/dietTable')
    const data = await response.json()
    setDietTables(data)
  }

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {dietTables.map((table) => (
        <form key={table.id} className="border rounded p-6">
          <h2 className="text-3xl font-semibold mb-6">{table.title}</h2>
          {table.dietList.map((meal) => (
            <ul key={meal.id} className="flex flex-col gap-4">
              <h3 className="text-xl">{meal.meal}</h3>
              {meal.food.map((food) => (
                <li key={food.id}>{food.foodName}</li>
              ))}
              <li className="flex items-center gap-2 border border-zinc-500 rounded p-2">
                <input
                  type="text"
                  placeholder="Alimento"
                  className="w-full bg-zinc-600 rounded px-2"
                />
                <div className="flex items-center gap-2 w-2/5">
                  <input
                    type="text"
                    placeholder="Carb"
                    className="w-full bg-zinc-600 rounded px-1"
                  />
                  <input
                    type="text"
                    placeholder="Protein"
                    className="w-full bg-zinc-600 rounded px-1"
                  />
                  <input
                    type="text"
                    placeholder="Fat"
                    className="w-full bg-zinc-600 rounded px-1"
                  />
                </div>
                <button className="border rounded px-3 bg-green-600 border-green-800 shadow hover:bg-green-500">
                  OK
                </button>
              </li>
            </ul>
          ))}

          <div className="flex flex-col gap-1 mt-6">
            <label htmlFor="">Refeição:</label>
            <div>
              <input
                type="text"
                placeholder="ex: café da manhã"
                className="bg-zinc-600 rounded p-1"
                {...register(`meal${table.id}`)}
              />
              <button
                type="button"
                className="ml-2 border rounded p-1"
                onClick={() => handleNewList(table.id)}
              >
                Add
              </button>
            </div>
          </div>
        </form>
      ))}
    </div>
  )
}
