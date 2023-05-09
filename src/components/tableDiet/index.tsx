'use client'

import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

interface List {
  time: string
  gram: string
  food: string
}

export function TableDiet() {
  const { handleSubmit, register, getValues, reset } = useForm()
  const [week, setWeek] = useState(['Semanal'])
  const [list, setList] = useState<List[]>([])

  function handleNewList() {
    const time = getValues('time')
    const gram = getValues('gram')
    const food = getValues('food')

    setList((state) => [...state, { time, gram, food }])

    reset()
  }

  function handleOptionChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedOption = event.target.value
    if (selectedOption === 'semanal') {
      setWeek(['Semanal'])
    } else if (selectedOption === 'seg_a_sex') {
      setWeek(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'])
    } else if (selectedOption === 'seg_a_sab') {
      setWeek(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'])
    }
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
        onSubmit={handleSubmit(handleNewList)}
        className="mt-20 flex flex-wrap gap-6"
      >
        {week.map((day) => (
          <article
            key={day}
            className="border border-zinc-600 rounded p-6 flex flex-col gap-5"
          >
            <h2 className="text-3xl font-semibold">{day}</h2>
            <ul className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="ex: café da manha"
                className="p-1 rounded bg-zinc-600 w-2/6"
              />
              {list.map((li) => (
                <li
                  key={li.food}
                  className="flex items-center justify-between py-1 px-2 gap-6 border-b"
                >
                  <span>{li.time}</span>

                  <section className="flex items-center gap-1">
                    <span>
                      {li.gram}
                      <span className="text-xs text-zinc-300">(g)</span>
                    </span>
                    <span>{li.food}</span>
                  </section>

                  <button
                    type="submit"
                    className="border rounded px-1 text-xs text-center"
                  >
                    X
                  </button>
                </li>
              ))}

              <li className="flex items-center gap-4 py-2">
                <select
                  id=""
                  {...register('time')}
                  className="rounded p-1 bg-zinc-600"
                >
                  <option value="08:00">08:00</option>
                  <option value="0">08:00</option>
                  <option value="1">08:00</option>
                </select>

                <section className="flex gap-2">
                  <div className="flex items-center gap-1 w-1/6">
                    <label htmlFor="">g:</label>
                    <input
                      type="text"
                      placeholder="(g)"
                      className="w-full text-center rounded bg-zinc-600 py-1"
                      {...register('gram')}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Alimento"
                    className="px-1 w-full rounded bg-zinc-600 py-1"
                    {...register('food')}
                  />
                </section>

                <button type="submit" className="border rounded px-2">
                  OK
                </button>
              </li>
            </ul>
          </article>
        ))}
      </form>
    </>
  )
}
