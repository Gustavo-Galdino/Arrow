import { useStore } from '@/context/store'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Pencil } from 'lucide-react'
import { useState } from 'react'
import { useForm, FieldError } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  meal: z.string().nonempty({ message: 'Por favor, insira uma refeição' }),
  time: z.string().nonempty({ message: 'Por favor, insira o tempo' }),
})

interface EditUlProps {
  id: string
}

export function EditUl({ id }: EditUlProps) {
  const {
    handleSubmit,
    reset,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })
  const [isEditing, setIsEditing] = useState(false)

  async function handleEdit() {
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
      setIsEditing(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <button type="button" onClick={() => setIsEditing(true)}>
        <Pencil size={14} />
      </button>
      {isEditing && (
        <form onSubmit={handleSubmit(handleEdit)}>
          <div className="flex flex-col items-start gap-1">
            <input
              type="time"
              {...register('time')}
              id="time"
              className="w-full rounded-md bg-gray-600 p-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-24"
            />
            {errors.time && (
              <span className="px-1 py-1 text-xs text-red-300">
                {(errors.time as FieldError).message}
              </span>
            )}
            <input
              type="text"
              {...register('meal')}
              placeholder="Refeição, ex: Almoço..."
              className="w-full rounded-md bg-gray-600 p-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-72"
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
        </form>
      )}
    </>
  )
}
