'use client'

import { api } from '@/lib/api'
import { useUser } from '@clerk/nextjs'
import { useForm, FieldError } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const userSchema = z.object({
  weight: z.number().nonnegative().min(1),
  height: z.number().nonnegative().min(1),
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
    <main className="px-10">
      <div className="m-auto mt-16 w-96 space-y-5 rounded-lg bg-gray-600 p-6 shadow-md">
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
              className="rounded bg-gray-500 px-2 py-1"
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
              className="rounded bg-gray-500 px-2 py-1"
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
              className="rounded bg-gray-500 px-2 py-1"
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
              className="rounded bg-gray-500 px-2 py-1"
            >
              <option value="-500">Cutting</option>
              <option value="0">Normocalorica</option>
              <option value="500">Bulking</option>
            </select>
          </label>

          <button
            type="submit"
            className="mt-2 rounded-md bg-violet-500 px-4 py-2 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 dark:md:hover:bg-fuchsia-600"
          >
            Salvar
          </button>
        </form>
      </div>
    </main>
  )
}
