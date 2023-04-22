'use client'

import { General } from './components/general'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TaskItem } from '@/components/taskItem'
import { Plus } from 'phosphor-react'
import { Annotations } from '@/components/annotations'

interface Task {
  name: string
  series: number
  volume: number
}

export default function Training() {
  const [tasks, setTasks] = useState<Task[]>([])
  const { register, getValues, reset, handleSubmit } = useForm()

  function handleNewTask() {
    const nameTask = getValues('task').toLowerCase()
    const series = getValues('series')
    const volume = getValues('volume')

    if (nameTask) {
      const formattedName = nameTask.replace(/\b\w/g, (formated: string) =>
        formated.toUpperCase(),
      )
      setTasks((state) => [...state, { name: formattedName, series, volume }])
      reset()
    }
  }

  function handleRemoveTask(index: number) {
    setTasks((state) => state.filter((_, i) => i !== index))
  }

  return (
    <section className="mt-24 w-full grid grid-cols-2 gap-6">
      <div className="px-5">
        <h2 className="text-5xl font-bold">Peito e Ombro</h2>

        <article className="mt-20">
          <h3 className="text-2xl font-semibold mb-5">Exercicios</h3>
          <ul className="flex flex-col gap-4">
            {tasks.length > 0 &&
              tasks.map((task, index) => (
                <TaskItem
                  key={index}
                  task={task}
                  onRemove={() => handleRemoveTask(index)}
                />
              ))}

            <li className="">
              <form
                onSubmit={handleSubmit(handleNewTask)}
                className="flex items-center gap-1 bg-zinc-800 p-1 rounded border border-zinc-600"
              >
                <div className="flex items-center gap-2 w-1/2">
                  <button type="submit">
                    <Plus weight="bold" className="text-zinc-100" />
                  </button>

                  <input
                    type="text"
                    id="newExercice"
                    placeholder="Adicionar Exercicio"
                    {...register('task')}
                    className="bg-transparent border-none text-sm outline-none w-full"
                  />
                </div>

                <div className="flex items-center justify-center w-36 gap-2">
                  <div className="flex items-center gap-2">
                    <label htmlFor="series">Series:</label>
                    <input
                      type="text"
                      id="series"
                      placeholder="4"
                      {...register('series')}
                      className="w-4 bg-transparent border-none text-sm outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label htmlFor="volume">/</label>
                    <input
                      type="text"
                      id="volume"
                      placeholder="12"
                      {...register('volume')}
                      className="w-4 bg-transparent border-none text-sm outline-none"
                    />
                  </div>
                </div>
              </form>
            </li>
          </ul>
        </article>

        <article className="mt-20">
          <Annotations />
        </article>
      </div>
      <General />
    </section>
  )
}
