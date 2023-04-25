'use client'

import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import * as Checkbox from '@radix-ui/react-checkbox'

import { Check, Plus, X } from 'phosphor-react'

interface Table {
  id: string
  tableName: string
}

interface User {
  id: string
  username: string
  tables: Table[]
}

interface Exercice {
  id: string
  workoutTableId: string
}

interface ExerciceTable {
  id: string
  exerciseName: string
  series: number
  volume: number
  tables: Exercice[]
}

interface TaskListProps {
  userData: User
  exerciceTable: ExerciceTable[]
}

export function TaskList({ userData, exerciceTable }: TaskListProps) {
  const { register, getValues, reset, handleSubmit } = useForm()
  const [tasks, setTasks] = useState<ExerciceTable[]>(exerciceTable)
  const [tables, setTables] = useState<User[]>([])

  useEffect(() => {
    setTables((state) => [...state, userData])
  }, [userData])

  const pathname = usePathname()
  const tableId = pathname.replace(/\/training\/([^/]+)/, '$1')

  const selectedTable = tables
    .flatMap((user) => user.tables)
    .find((table) => table.id === tableId)

  const checkTableId = tasks.filter((task) =>
    task.tables.some((t) => t.workoutTableId === tableId),
  )
  const filteredTables = checkTableId.flatMap((table) =>
    table.tables.filter((t) => t.workoutTableId === tableId),
  )
  const captureIdTable = filteredTables.map((table) => table.id)
  const idTable = captureIdTable[0]

  async function handleNewTask() {
    const nameTask = getValues('task').toLowerCase()
    const series = parseInt(getValues('series'))
    const volume = parseInt(getValues('volume'))
    const exerciseName = nameTask.replace(/\b\w/g, (formated: string) =>
      formated.toUpperCase(),
    )

    if (nameTask) {
      await fetch('http://localhost:3000/api/tables', {
        method: 'POST',
        body: JSON.stringify({
          exerciseName,
          series,
          volume,
          idTable,
        }),
      })
    }
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
          {checkTableId.length > 0 &&
            checkTableId.map((task) => (
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
                <button>
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
