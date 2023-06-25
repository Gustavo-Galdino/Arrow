import { useStore } from '@/context/store'
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
  userId: string
  tableId: string
  complete?: boolean
  nivel: number
  experience: number
}

export function ButtonCheck({
  userId,
  tableId,
  complete,
  nivel,
  experience,
}: ButtonCheckProps) {
  const [completed, setCompleted] = useState(complete)

  async function handleChecked() {
    try {
      const response = await api.get('/api/user')
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

      const patchResponse = await api.patch('/api/workoutTable', {
        userId,
        nivel,
        experience,
        completed: true,
        WorkoutTableExerciseId: tableId,
      })

      if (patchResponse.status === 200) {
        setCompleted(true)
      }

      const reloadResponse = await api.get('/api/user')
      const reloadUser = reloadResponse.data
      useStore.setState({ user: reloadUser })
    } catch (error) {
      console.log(error)
    }
  }

  async function restart() {
    setCompleted(false)

    await api.patch('/api/workoutTable', {
      userId,
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
            <Check className="text-green-700 dark:text-green-300" />
          </span>
          <button onClick={() => restart()}>
            <RotateCcw size={18} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={completed}
          className="box-border rounded bg-zinc-100 px-2 py-1 text-xs shadow-lg hover:bg-green-500 hover:transition-colors dark:bg-zinc-500"
          onClick={() => handleChecked()}
        >
          <strong className="px-1 text-sm font-semibold ">Concluir</strong>
        </button>
      )}
    </div>
  )
}
