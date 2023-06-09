import { api } from '@/lib/api'
import { FieldError, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useStore } from '@/context/store'

const NewTrainingFormSchema = z.object({
  title: z.string().nonempty({ message: 'Titulo é obrigatorio.' }),
})

interface NewDietProps {
  dietTableId: string
}
export function NewDiet({ dietTableId }: NewDietProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NewTrainingFormSchema),
  })

  async function handleNewDiet() {
    try {
      const title = getValues('title')

      if (title) {
        await api.post('/api/dietTable', {
          title,
          dietTableId,
        })
        const response = await api.get('/api/user')
        const user = response.data
        useStore.setState({ user })
      }

      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className="rounded bg-zinc-400 p-4 shadow-md dark:bg-zinc-700"
      onSubmit={handleSubmit(handleNewDiet)}
    >
      <label className="text-sm">
        <span>Nova Tabela</span>
        <div className="flex items-center gap-2">
          <input
            type="text"
            {...register('title')}
            placeholder="ex: Segunda, Terça..."
            className="w-full rounded-lg border-2 border-zinc-400 bg-zinc-100 px-1 py-2 outline-none dark:border-zinc-600 dark:bg-zinc-500"
          />
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-2 py-2 font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Criar
          </button>
        </div>
      </label>
      <div className="flex flex-grow flex-col">
        {errors.title && (
          <span className="px-1 py-1 text-xs text-red-300">
            {(errors.title as FieldError).message}
          </span>
        )}
      </div>
    </form>
  )
}
