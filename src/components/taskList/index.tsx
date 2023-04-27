'use client'

import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import * as Checkbox from '@radix-ui/react-checkbox'

import { Check, Plus, X } from 'phosphor-react'

interface Table {
  id: string
  tableName: string
  workoutTableExerciseId?: string
  workoutTableNoteId?: string
}

interface User {
  id: string
  username: string
  tables: Table[]
}

interface Exercice {
  id: string
  exerciseName: string
  series: number
  volume: number
}

interface ExerciceTable {
  id: string
  exercise: Exercice[]
}

interface TaskListProps {
  userData: User
  exerciceTable: ExerciceTable[]
}

export function TaskList({ userData, exerciceTable }: TaskListProps) {
  const { register, getValues, reset, handleSubmit } = useForm()
  const [tables, setTables] = useState<User[]>([])
  const [task, setTasks] = useState<ExerciceTable[]>(exerciceTable)

  useEffect(() => {
    setTables((state) => [...state, userData])
  }, [userData])

  const pathname = usePathname()
  const tableId = pathname.replace(/\/training\/([^/]+)/, '$1')

  const selectedTable = tables
    .flatMap((user) => user.tables)
    .find((table) => table.id === tableId)

  const exercises = task
    .filter((table) => table.id === selectedTable?.workoutTableExerciseId)
    .flatMap((exercise) => exercise.exercise)

  const exerciseTableId = task.find(
    (table) => table.id === selectedTable?.workoutTableExerciseId,
  )?.id

  async function handleNewTask() {
    const nameTask = getValues('task').toLowerCase()
    const series = parseInt(getValues('series'))
    const volume = parseInt(getValues('volume'))
    const exerciseName = nameTask.replace(/\b\w/g, (formated: string) =>
      formated.toUpperCase(),
    )

    if (nameTask) {
      await fetch('http://localhost:3000/api/exercices', {
        method: 'POST',
        body: JSON.stringify({
          exerciseName,
          series,
          volume,
          exerciseTableId,
        }),
      })

      const response = await fetch('http://localhost:3000/api/exercices')
      const data = await response.json()
      setTasks(data)

      reset()
    }
  }

  async function handleDeleteTask(id: string) {
    await fetch('http://localhost:3000/api/exercices', {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })

    const response = await fetch('http://localhost:3000/api/exercices')
    const data = await response.json()
    setTasks(data)
  }

  return (
    <>
      <h2 className="text-5xl font-bold mb-20">{selectedTable?.tableName}</h2>
      <h3 className="text-2xl font-semibold mb-5">Exercicios</h3>

      <ul>
        <form
          onSubmit={handleSubmit(handleNewTask)}
          className="flex flex-col gap-4"
        >
          {exercises.length > 0 &&
            exercises.map((task) => (
              <li
                key={task.id}
                className="border-b-2 border-zinc-500 px-1 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 w-1/3">
                  <Checkbox.Root
                    className="w-4 h-4 border border-gray-300 rounded focus:ring-blue-500 flex items-center justify-center"
                    id={task.id}
                  >
                    <Checkbox.Indicator>
                      <Check color="white" size={12} weight="bold" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label
                    htmlFor={task.exerciseName}
                    className="w-full text-base"
                  >
                    {task.exerciseName}
                  </label>
                </div>
                <div>
                  <p>
                    Series: {task.series} / {task.volume}
                  </p>
                </div>
                <button type="button" onClick={() => handleDeleteTask(task.id)}>
                  <X weight="bold" className="text-red-500" />
                </button>
              </li>
            ))}

          <li className="bg-zinc-800 p-1 rounded border border-zinc-600 flex items-center">
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
          </li>
        </form>
      </ul>
    </>
  )
}
