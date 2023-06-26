'use client'

import { useStore } from '@/context/store'
import { api } from '@/lib/api'
import { useForm } from 'react-hook-form'
import { Information } from './information'

interface NewFoodProps {
  stokeId: string
}

export function NewFoodStoke({ stokeId }: NewFoodProps) {
  const { handleSubmit, reset, register, getValues } = useForm()

  async function handleNewFood() {
    const foodName = getValues('foodName')
    const amount = parseInt(getValues('amount'))
    const type = getValues('type')
    const category = getValues('category')
    const carbo = parseFloat(getValues('carbo'))
    const protein = parseFloat(getValues('protein'))
    const fat = parseFloat(getValues('fat'))
    const grams = 0

    try {
      await api.post('/api/food', {
        foodName,
        amount,
        type,
        grams,
        category,
        carbo,
        protein,
        fat,
        stokeId,
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
      onSubmit={handleSubmit(handleNewFood)}
      className="flex flex-col flex-wrap items-start gap-2 rounded-md bg-zinc-200 p-4 px-1 py-2 text-sm dark:bg-zinc-700 md:flex-row md:items-center"
    >
      <select
        {...register('category')}
        className="rounded bg-zinc-100 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-600"
      >
        <option value="Fontes de Carboidrato">Fontes de Carboidrato</option>
        <option value="Fontes de Proteína">Fontes de Proteína</option>
        <option value="Fontes de Gordura">Fontes de Gordura</option>
      </select>
      <input
        type="text"
        placeholder="Nome"
        {...register('foodName')}
        className="rounded bg-zinc-100 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-600"
      />
      <div className="relative">
        <Information />
        <input
          type="text"
          placeholder="Porção"
          {...register('amount')}
          className="rounded bg-zinc-100 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-600"
        />
      </div>
      <select
        {...register('type')}
        className="rounded bg-zinc-100 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-600"
      >
        <option value="g">g</option>
        <option value="un">un</option>
      </select>

      <div className="mb-2 flex w-full flex-col gap-2 md:mb-0 md:w-auto md:flex-row">
        <input
          type="number"
          placeholder="Carboidrato"
          {...register('carbo')}
          className="w-2/4 rounded bg-zinc-100 px-1  py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-600"
        />
        <input
          type="number"
          placeholder="Proteina"
          {...register('protein')}
          className="w-2/4 rounded bg-zinc-100 px-1  py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-600"
        />
        <input
          type="number"
          placeholder="Gordura"
          {...register('fat')}
          className="w-2/4 rounded bg-zinc-100 px-1  py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-600"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-indigo-600 px-2 py-2 font-bold text-white hover:bg-indigo-500 md:mt-0 md:w-auto"
      >
        Adicionar
      </button>
    </form>
  )
}
