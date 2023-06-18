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
    const category = getValues('category')
    const carbo = parseFloat(getValues('carbo'))
    const protein = parseFloat(getValues('protein'))
    const fat = parseFloat(getValues('fat'))
    const grams = 0

    try {
      await api.post('/api/food', {
        foodName,
        amount,
        grams,
        category,
        carbo,
        protein,
        fat,
        stokeId,
      })

      const response = await api.get('/api/users')
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
      className="flex flex-col flex-wrap items-start gap-2 rounded bg-gray-800 text-sm md:flex-row md:items-center"
    >
      <select
        {...register('category')}
        className="rounded bg-gray-600 p-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="Fontes de Carboidrato">Fontes de Carboidrato</option>
        <option value="Fontes de Proteína">Fontes de Proteína</option>
        <option value="Fontes de Gordura">Fontes de Gordura</option>
      </select>
      <input
        type="text"
        placeholder="Nome"
        {...register('foodName')}
        className="w-full rounded bg-gray-600 p-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-24"
      />
      <div className="relative">
        <Information />
        <input
          type="text"
          placeholder="Porção"
          {...register('amount')}
          className="w-full rounded bg-gray-600 p-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-24"
        />
      </div>

      <div className="mb-2 flex w-full flex-col gap-2 md:mb-0 md:w-auto md:flex-row">
        <input
          type="text"
          placeholder="Carboidrato"
          {...register('carbo')}
          className="w-full rounded bg-gray-600 p-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-24"
        />
        <input
          type="text"
          placeholder="Proteina"
          {...register('protein')}
          className="w-full rounded bg-gray-600 p-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-24"
        />
        <input
          type="text"
          placeholder="Gordura"
          {...register('fat')}
          className="w-full rounded bg-gray-600 p-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-24"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-indigo-600 px-2 py-1 font-bold text-white hover:bg-indigo-500 md:mt-0 md:w-auto"
      >
        Adicionar
      </button>
    </form>
  )
}
