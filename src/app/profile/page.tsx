'use client'

import { Header } from '@/components/Header'
import { api } from '@/lib/api'
import { useUser } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'

export default function Profile() {
  const { user } = useUser()
  const { handleSubmit, register, getValues } = useForm()

  if (!user) return null

  async function handleCreateUser() {
    await api.post('/api/user', {
      userId: user?.id,
    })
  }

  return (
    <main className="px-10">
      <Header />
      <div className="m-auto mt-16 w-96 space-y-5 rounded-lg bg-gray-600 p-6 shadow-md">
        <strong className="text-xl font-bold uppercase">{user.fullName}</strong>
        <form
          className="flex flex-col items-start justify-center gap-2"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <label className="block">
            <span className="block">Peso</span>
            <input type="number" className="rounded bg-gray-500 px-2 py-1" />
          </label>

          <label className="block">
            <span className="block">Altura</span>
            <input type="number" className="rounded bg-gray-500 px-2 py-1" />
          </label>

          <label className="block">
            <span className="block">Idade</span>
            <input type="date" className="rounded bg-gray-500 px-2 py-1" />
          </label>

          <label className="block">
            <span className="block">Atividade</span>
            <input type="text" className="rounded bg-gray-500 px-2 py-1" />
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
