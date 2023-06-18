import { useStore } from '@/context/store'
import { api } from '@/lib/api'
import { Edit2, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FoodListProps {
  name: string
  grams: number
  carbo: number
  protein: number
  fat: number
  foodId: string
  idGrams: string
}

export function FoodList({
  carbo,
  fat,
  name,
  grams,
  protein,
  foodId,
  idGrams,
}: FoodListProps) {
  const [editGrams, setEditGrams] = useState(false)
  const { register, getValues, handleSubmit } = useForm()

  async function handleEditGrams() {
    try {
      const grams = parseInt(getValues('grams'))
      await api.patch('api/foodInGrams', {
        id: idGrams,
        grams,
      })

      const response = await api.get('/api/users')
      const user = response.data
      useStore.setState({ user })

      setEditGrams(false)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRemoveFood() {
    try {
      await api.delete('/api/foodInGrams', {
        data: {
          id: foodId,
        },
      })

      const response = await api.get('/api/users')
      const user = response.data
      useStore.setState({ user })
    } catch (error) {
      console.log(error)
    }
  }

  const carboCalc = ((carbo * grams) / 100).toFixed(1)
  const proteinCalc = ((protein * grams) / 100).toFixed(1)
  const fatCalc = ((fat * grams) / 100).toFixed(1)

  return (
    <div className="box-border grid grid-cols-1 items-center justify-between gap-2 rounded-md border border-gray-900 bg-gray-800 px-2 py-1.5 text-sm shadow-md transition-colors duration-200 ease-in-out sm:grid-cols-3 sm:text-base">
      <div className="flex items-center gap-1">
        {editGrams ? (
          <form
            onSubmit={handleSubmit(handleEditGrams)}
            className="flex w-full items-center gap-1"
          >
            <input
              type="text"
              {...register('grams')}
              placeholder={`${grams}`}
              className="w-full rounded bg-gray-500"
            />
            <button type="submit" className="rounded-lg border px-1">
              ok
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-0.5 pr-1">
            <span>{grams}g</span>
            <Edit2
              size={12}
              onClick={() => setEditGrams(true)}
              className="cursor-pointer hover:text-gray-500"
            />
          </div>
        )}
        <strong className="text-base text-white sm:text-base">{name}</strong>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <p className="text-gray-300">C: {carboCalc}</p>
        <p className="text-gray-300">P: {proteinCalc}</p>
        <p className="text-gray-300">G: {fatCalc}</p>
      </div>

      <div className="mt-2 justify-self-end sm:mt-0">
        <button onClick={() => handleRemoveFood()}>
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
