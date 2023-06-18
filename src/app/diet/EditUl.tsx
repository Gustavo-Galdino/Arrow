import { useStore } from '@/context/store'
import { api } from '@/lib/api'
import { Check, Pencil } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface EditUlProps {
  id: string
}

export function EditUl({ id }: EditUlProps) {
  const { handleSubmit, reset, register, getValues } = useForm()
  const [isEditing, setIsEditing] = useState(false)

  async function handleEdit() {
    const meal = getValues('meal')
    const time = getValues('time')
    try {
      await api.patch('/api/dietList', {
        id,
        meal,
        time,
      })

      const response = await api.get('/api/users')
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
        <form className="" onSubmit={handleSubmit(handleEdit)}>
          <div className="flex w-full gap-1 sm:w-auto">
            <input
              type="time"
              {...register('time')}
              id="time"
              className="w-full rounded-md bg-gray-600 p-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-24"
            />
            <input
              type="text"
              {...register('meal')}
              placeholder="Refeição, ex: Almoço..."
              className="w-full rounded-md bg-gray-600 p-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-72"
            />

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
