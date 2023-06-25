import { useStore } from '@/context/store'
import { api } from '@/lib/api'
import { Check } from 'lucide-react'
import { FieldError, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  meal: z.string().nonempty({ message: '⚠️  Refeição é obrigatória' }),
})

interface FormNewListProps {
  id: string
}

export function FormNewMeal({ id }: FormNewListProps) {
  const {
    handleSubmit,
    reset,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  async function handleNewList() {
    const meal = getValues('meal')
    const time = getValues('time')
    try {
      await api.patch('/api/dietTable', {
        id,
        meal,
        time,
      })

      const response = await api.get('/api/user')
      const user = response.data
      useStore.setState({ user })

      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className="flex flex-wrap items-center gap-2 rounded border-t border-zinc-50 p-2 pt-2 dark:border-zinc-400 dark:bg-zinc-700"
      onSubmit={handleSubmit(handleNewList)}
    >
      <div className="flex w-full flex-col gap-1 sm:w-auto">
        <label htmlFor={id} className="font-bold">
          Adicionar Refeição
        </label>
        <div className="flex items-center gap-2 md:flex-wrap">
          <input
            type="time"
            {...register('time')}
            id="time"
            className="w-full rounded-md bg-zinc-100 p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-600 sm:w-24"
          />
          <input
            id={id}
            type="text"
            {...register('meal')}
            placeholder="Refeição, ex: Almoço..."
            className="w-full rounded-md bg-zinc-100 px-1 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-600 sm:w-72"
          />
          {errors.meal && (
            <span className="px-1 py-1 text-xs text-red-300">
              {(errors.meal as FieldError).message}
            </span>
          )}
          <button
            type="submit"
            className="rounded bg-indigo-600 px-2 py-1 font-bold text-white hover:bg-indigo-500"
          >
            <Check size={16} />
          </button>
        </div>
      </div>
    </form>
  )
}
