'use client'

import { api } from '@/lib/api'
import { Check } from 'lucide-react'
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
  workoutTable?: WorkoutTable[]
}

interface ButtonCheckProps {
  tableId: string
}

export function ButtonCheck({ tableId }: ButtonCheckProps) {
  const [completed, setCompleted] = useState(false)
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

      await api.patch('/api/users', {
        nivel,
        experience,
      })

      setCompleted(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      type="button"
      disabled={completed}
      className="rounded border p-0.5 hover:bg-green-400 hover:transition-colors disabled:cursor-not-allowed disabled:border-none disabled:bg-transparent"
      onClick={() => handleChecked()}
    >
      {completed ? (
        <Check size={24} className="text-green-400" />
      ) : (
        <strong className="px-1 text-sm font-semibold">Concluir</strong>
      )}
    </button>
  )
}
