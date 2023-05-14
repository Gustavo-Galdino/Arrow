'use client'

import { Trash } from 'phosphor-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface List {
  time: string
  gram: string
  food: string
}

interface Meal {
  name: string
  list: List[]
}

interface Food {
  id: string
  foodooName: string
}

interface DietList {
  id: string
  meal: string
  food: Food[]
}

interface DietBox {
  id: string
  week: string
  DietList: DietList[]
}

interface TableDietProps {
  dietTables: DietBox[]
}

export function TableDiet({ dietTables }: TableDietProps) {
  const { handleSubmit, register, getValues, reset } = useForm()
  const [week, setWeek] = useState<DietBox[]>([])

  useEffect(() => {
    setWeek(dietTables)
  }, [dietTables])

  function handleNewList() {
    // const time = getValues('time')
    // const gram = getValues('gram')
    // const food = getValues('food')
    // const mealName = getValues('meal')
    // setMeals((state) => {
    //   return state.map((meal) => {
    //     if (meal.name === mealName) {
    //       return {
    //         ...meal,
    //         list: [...meal.list, { time, gram, food }],
    //       }
    //     }
    //     return meal
    //   })
    // })
    // reset()
  }

  function handleMealTitle() {
    // const meal = getValues('meal')
    // setMeals((state) => [...state, { name: meal, list: [] }])
  }

  function handleOptionChange(event: ChangeEvent<HTMLSelectElement>) {
    // const selectedOption = event.target.value
    // if (selectedOption === 'semanal') {
    //   setWeek(['Semanal'])
    // } else if (selectedOption === 'seg_a_sex') {
    //   setWeek(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'])
    // } else if (selectedOption === 'seg_a_sab') {
    //   setWeek(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'])
    // }
  }

  return (
    <>
      <div className="flex items-center gap-1">
        <label htmlFor="">Dia(s):</label>
        <select
          onChange={handleOptionChange}
          className="text-zinc-950 border border-zinc-300 px-2 py-1 rounded"
        >
          <option value="semanal">Semanal</option>
          <option value="seg_a_sex">Seg. a Sex.</option>
          <option value="seg_a_sab">Seg. a Sab.</option>
        </select>
      </div>

      <form
        onSubmit={handleSubmit(handleMealTitle)}
        className="mt-20 flex flex-wrap gap-6"
      >
        {week.map((day) => (
          <article
            key={day.id}
            className="border border-zinc-600 rounded p-6 flex flex-col gap-5 w-2/4"
          >
            <h2 className="text-3xl font-semibold">{day.week}</h2>

            <div className="flex flex-col gap-2">
              {day.DietList.map((meal) => (
                <ul key={meal.id}>
                  <div className="flex items-center gap-2 text-xl font-semibold border-b mb-5 py-1">
                    <span>08:00 |</span>
                    <h4 className="">{meal.meal}</h4>
                  </div>
                  {meal.food.map((food) => (
                    <li
                      key={food.id}
                      className="grid grid-cols-3 gap-1 py-1 items-center"
                    >
                      <strong>{food.foodooName}</strong>
                      <div className="flex items-center gap-2">
                        <span>C: 0</span>
                        <span>P: 0</span>
                        <span>G: 0</span>
                      </div>
                      <button className="justify-self-end hover:text-red-500">
                        <Trash />
                      </button>
                    </li>
                  ))}
                  <div className="flex items-center gap-4 border  rounded px-2 py-4 mt-5">
                    <div>
                      <h5>Adicionar alimento</h5>
                      <input
                        type="text"
                        id="food"
                        placeholder="arroz, feijao..."
                        className="bg-zinc-500 rounded text-center"
                      />
                    </div>
                    <div className="flex items-center gap-2 w-2/5 self-end">
                      <div className="flex items-center gap-1">
                        <label htmlFor="carbo">C:</label>
                        <input
                          type="text"
                          placeholder="30g"
                          className="w-full bg-zinc-500 rounded text-center"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label htmlFor="protein">P:</label>
                        <input
                          type="text"
                          placeholder="30g"
                          className="w-full bg-zinc-500 rounded text-center"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label htmlFor="fat">C:</label>
                        <input
                          type="text"
                          placeholder="30g"
                          className="w-full bg-zinc-500 rounded text-center"
                        />
                      </div>
                    </div>
                    <button className="self-end border border-green-700 rounded px-1 bg-green-500 cursor-pointer hover:bg-green-400">
                      OK
                    </button>
                  </div>
                </ul>
              ))}
            </div>
          </article>
        ))}
      </form>
    </>
  )
}
