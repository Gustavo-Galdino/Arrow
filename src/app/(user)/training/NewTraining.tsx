'use client'

import { api } from '@/lib/api'
import { FilePlus } from 'lucide-react'
import { useForm, FieldError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const NewTrainingFormSchema = z.object({
  title: z.string().nonempty({ message: 'Titulo é obrigatorio.' }),
})

interface NewTrainingProps {
  workoutTableId: string
}
export function NewTraining({ workoutTableId }: NewTrainingProps) {
  const {
    register,
    getValues,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(NewTrainingFormSchema),
  })

  async function handleNewTraining() {
    const title = getValues('title')

    if (title) {
      await api.post('/api/users', {
        title,
        WorkoutTableExercise: workoutTableId,
      })
    }

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleNewTraining)}
      className="mx-6 flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-800 p-6 text-gray-300 shadow"
    >
      <div className="flex flex-col">
        <label className="self-start text-xs" htmlFor="title">
          Titulo da tabela
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="rounded bg-gray-600 px-2 py-1 text-gray-100 placeholder:text-sm"
          placeholder="ex: Peito, Braço..."
        />
        {errors.title && (
          <span className="px-1 py-1 text-xs text-red-300">
            {(errors.title as FieldError).message}
          </span>
        )}
      </div>
      <button type="submit" className="hover:text-gray-100">
        <FilePlus size={60} className="" />
      </button>
    </form>
  )
}
