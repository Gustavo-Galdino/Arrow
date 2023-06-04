'use client'

import { api } from '@/lib/api'
import { Check, RotateCcw } from 'lucide-react'
import { useState } from 'react'

interface WorkoutTableExercice {
  id: string
  exercise: []
}

interface WorkoutTable {
  id: string
  WorkoutTableExercise: WorkoutTableExercice[]
}

interface User {
  id?: string
  nivel: number
  experience: number
  completed: boolean
  workoutTable?: WorkoutTable[]
}

interface ButtonCheckProps {
  tableId: string
  complete?: boolean
  nivel: number
  experience: number
}

export function ButtonCheck({
  tableId,
  complete,
  nivel,
  experience,
}: ButtonCheckProps) {
  const [completed, setCompleted] = useState(complete)

  async function handleChecked() {
    try {
      const response = await api.get('/api/users')
      const user: User = response.data

      const experienceLenght = user.workoutTable?.flatMap(
        (tables) =>
          tables.WorkoutTableExercise.find(
            (exerciseTable) => exerciseTable.id === tableId,
          )?.exercise,
      )

      let experience = user.experience + experienceLenght?.length! * 10
      let nivel = user.nivel

      if (experience >= 100) {
        nivel += 1
        experience = 0
      }

      const patchResponse = await api.patch('/api/users', {
        nivel,
        experience,
        completed: true,
        WorkoutTableExerciseId: tableId,
      })

      if (patchResponse.status === 200) {
        setCompleted(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function restart() {
    setCompleted(false)

    await api.patch('/api/users', {
      nivel,
      experience,
      WorkoutTableExerciseId: tableId,
      completed: false,
    })
  }

  return (
    <div className="flex items-center gap-2">
      {completed ? (
        <div className="flex items-center gap-2">
          <span>
            <Check className="text-green-300 " />
          </span>
          <button onClick={() => restart()}>
            <RotateCcw size={18} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={completed}
          className="rounded border p-0.5 hover:bg-green-400 hover:transition-colors disabled:cursor-not-allowed disabled:border-none disabled:bg-transparent"
          onClick={() => handleChecked()}
        >
          <strong className="px-1 text-sm font-semibold ">Concluir</strong>
        </button>
      )}
    </div>
  )
}
