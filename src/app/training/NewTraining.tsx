import { api } from '@/lib/api'
import { FilePlus } from 'lucide-react'
import { useForm, FieldError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useStore } from '@/context/store'

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
    try {
      const title = getValues('title')

      if (title) {
        await api.post('/api/workoutTable', {
          title,
          workoutTableId,
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
      onSubmit={handleSubmit(handleNewTraining)}
      className="box-border flex flex-col items-center justify-center gap-2 rounded border bg-zinc-400 p-6 shadow-md dark:border-zinc-500 dark:bg-zinc-700/20"
    >
      <div className="flex flex-col">
        <label className="self-start text-xs" htmlFor="title">
          Titulo da tabela
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="rounded bg-zinc-50 px-2 py-1 text-zinc-100 placeholder:text-sm dark:bg-zinc-600"
          placeholder="ex: Peito, Braço..."
        />
        {errors.title && (
          <span className="px-1 py-1 text-xs text-red-300">
            {(errors.title as FieldError).message}
          </span>
        )}
      </div>
      <button type="submit" className="hover:text-zinc-100">
        <FilePlus size={60} className="" />
      </button>
    </form>
  )
}
