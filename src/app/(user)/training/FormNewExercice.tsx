'use client'

import { useForm, FieldError } from 'react-hook-form'
import { Check } from 'lucide-react'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const FormNewExerciseSchema = z.object({
  name: z.string().nonempty({ message: 'Nome do exercicio é obrigatorio.' }),
})

interface FormNewExerciceProps {
  exerciseTableId: string
}

export function FormNewExercise({ exerciseTableId }: FormNewExerciceProps) {
  const {
    register,
    getValues,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(FormNewExerciseSchema),
  })
  async function handleNewExercise() {
    const exerciseName = getValues('name')
      .toLowerCase()
      .replace(/\b\w/g, (formated: string) => formated.toUpperCase())
    const series = parseInt(getValues('series'))
    const volume = parseInt(getValues('volume'))

    if (exerciseName) {
      await api.post('/api/exercise', {
        exerciseName,
        series,
        volume,
        exerciseTableId,
      })

      reset()
    }
  }

  return (
    <form
      className="grid grid-cols-3 items-center justify-between gap-4"
      onSubmit={handleSubmit(handleNewExercise)}
    >
      <div className="flex flex-col">
        <input
          type="text"
          {...register('name')}
          placeholder="Nome do exercicio"
          className="rounded bg-gray-600 px-1 py-1 placeholder:text-sm"
        />
        {errors.name && (
          <span className="px-1 py-1 text-xs text-red-300">
            {(errors.name as FieldError).message}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="flex flex-col">
          <input
            required
            type="number"
            {...register('series')}
            placeholder="Series"
            className="w-full rounded bg-gray-600 px-1 py-1 placeholder:text-sm"
          />
          {errors.series && (
            <span className="px-1 py-1 text-xs text-red-300">
              {(errors.series as FieldError).message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            required
            type="number"
            {...register('volume')}
            placeholder="Volume"
            className="w-full rounded bg-gray-600 px-1 py-1 placeholder:text-sm"
          />
          {errors.volume && (
            <span className="px-1 py-1 text-xs text-red-300">
              {(errors.volume as FieldError).message}
            </span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="cursor-pointer justify-self-start rounded border px-1 py-1 hover:border-green-400 hover:bg-green-500 hover:text-gray-50 hover:transition-colors"
      >
        <Check size={16} />
      </button>
    </form>
  )
}
