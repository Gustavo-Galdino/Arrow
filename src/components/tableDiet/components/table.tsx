'use client'

import { DeleteModal } from '@/components/DeleteModal'
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

  async function handleNewFood(dietListId: string) {
    const foodName = getValues(`food${dietListId}`)
    if (foodName) {
      await fetch('http://localhost:3000/api/food', {
        method: 'POST',
        body: JSON.stringify({
          foodName,
          dietListId,
        }),
      })
    }

    const response = await fetch('http://localhost:3000/api/dietTable')
    const data = await response.json()
    setDietTables(data)
  }

  async function handleDeleteFood(id: string) {
    await fetch('http://localhost:3000/api/food', {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })

    const response = await fetch('http://localhost:3000/api/dietTable')
    const data = await response.json()
    setDietTables(data)
  }

  async function handleDeleteMeal(id: string) {
    await fetch('http://localhost:3000/api/dietList', {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })

    const response = await fetch('http://localhost:3000/api/dietTable')
    const data = await response.json()
    setDietTables(data)
  }

  async function handleDeleteTable(id: string) {
    await fetch('http://localhost:3000/api/dietTable', {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })

    const response = await fetch('http://localhost:3000/api/dietTable')
    const data = await response.json()
    setDietTables(data)
  }

  return (
    <div className="flex flex-wrap items-start gap-6">
      {dietTables.map((table) => (
        <form
          key={table.id}
          className="rounded border border-zinc-500 bg-zinc-800 p-6"
        >
          <div className="flex">
            <h2 className="mb-6 text-3xl font-semibold">{table.title}</h2>
            <button
              type="button"
              className="ml-auto self-start pr-2 text-zinc-500 hover:text-red-500"
            >
              <DeleteModal onDeleteTable={() => handleDeleteTable(table.id)} />
            </button>
          </div>
          {table.dietList.map((meal) => (
            <ul key={meal.id} className="flex flex-col gap-4 border-b-2 py-4">
              <div className="flex items-center">
                <h3 className="text-xl">- {meal.meal}</h3>
                <button
                  type="button"
                  className="ml-auto self-start pr-2 text-zinc-500 hover:text-red-500"
                >
                  <DeleteModal
                    onDeleteTable={() => handleDeleteMeal(meal.id)}
                  />
                </button>
              </div>
              {meal.food.map((food) => (
                <li
                  key={food.id}
                  className="flex items-center justify-between border-b border-zinc-500 p-1"
                >
                  <strong className="w-1/2">{food.foodName}</strong>
                  <div className="flex items-center gap-2">
                    <p>C:</p>
                    <p>P:</p>
                    <p>C:</p>
                  </div>

                  <button
                    type="button"
                    className="ml-auto pr-2 hover:text-red-500"
                  >
                    <DeleteModal
                      onDeleteTable={() => handleDeleteFood(food.id)}
                    />
                  </button>
                </li>
              ))}
              <li className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  placeholder="Alimento"
                  {...register(`food${meal.id}`)}
                  className="w-2/5 rounded bg-zinc-600 px-2"
                />
                <div className="flex w-2/5 items-center gap-2">
                  <input
                    type="text"
                    placeholder="Carb"
                    className="w-full rounded bg-zinc-600 px-1"
                  />
                  <input
                    type="text"
                    placeholder="Protein"
                    className="w-full rounded bg-zinc-600 px-1"
                  />
                  <input
                    type="text"
                    placeholder="Fat"
                    className="w-full rounded bg-zinc-600 px-1"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleNewFood(meal.id)}
                  className="rounded border border-green-800 bg-green-600 px-3 shadow hover:bg-green-500"
                >
                  OK
                </button>
              </li>
            </ul>
          ))}

          <div className="mt-6 flex flex-col gap-1">
            <label htmlFor="">Refeição:</label>
            <div>
              <input
                type="text"
                placeholder="ex: café da manhã"
                className="rounded bg-zinc-600 p-1"
                {...register(`meal${table.id}`)}
              />
              <button
                type="button"
                className="ml-2 rounded border p-1"
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
