'use client'

import { api } from '@/lib/api'
import { useUser } from '@clerk/nextjs'
import { useForm, FieldError } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const userSchema = z.object({
  weight: z.string(),
  height: z.string(),
  age: z.string(),
})

export default function Register() {
  const { user } = useUser()
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  })

  const router = useRouter()

  if (!user) return null

  async function handleCreateUser() {
    const weight = parseFloat(getValues('weight'))
    const height = parseFloat(getValues('height'))
    const age = new Date(getValues('age')).toISOString()
    const goal = parseInt(getValues('goal'))

    try {
      await api.post('/api/user', {
        userId: user?.id,
        weight,
        height,
        age,
        goal,
      })

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="px-4 md:px-10">
      <div className="m-auto mt-4 w-full space-y-5 rounded-lg bg-zinc-200 p-4 shadow-md dark:bg-zinc-600 md:mt-16 md:w-96 md:p-6">
        <strong className="text-xl font-bold uppercase">{user.fullName}</strong>
        <form
          className="flex flex-col items-start justify-center gap-2"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <label className="block">
            <span className="block">Peso</span>
            <input
              type="number"
              {...register('weight')}
              className="w-full rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-500"
            />
            {errors.weight && (
              <span className="px-1 py-1 text-xs text-red-300">
                {(errors.weight as FieldError).message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="block">Altura</span>
            <input
              type="number"
              {...register('height')}
              className="w-full rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-500"
            />
            {errors.height && (
              <span className="px-1 py-1 text-xs text-red-300">
                {(errors.height as FieldError).message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="block">Idade</span>
            <input
              type="date"
              {...register('age')}
              className="w-full rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-500"
            />
            {errors.age && (
              <span className="px-1 py-1 text-xs text-red-300">
                {(errors.age as FieldError).message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="block">Objetivo</span>
            <select
              {...register('goal')}
              className="w-full rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-500"
            >
              <option value="-500">Cutting</option>
              <option value="0">Normocalorica</option>
              <option value="500">Bulking</option>
            </select>
          </label>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-violet-500 px-4 py-2 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 dark:md:hover:bg-fuchsia-600"
          >
            Salvar
          </button>
        </form>
      </div>
    </main>
  )
}
