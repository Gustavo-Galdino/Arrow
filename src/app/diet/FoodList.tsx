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
  type: string
}

export function FoodList({
  carbo,
  fat,
  name,
  grams,
  type,
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

      const response = await api.get('/api/user')
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

      const response = await api.get('/api/user')
      const user = response.data
      useStore.setState({ user })
    } catch (error) {
      console.log(error)
    }
  }

  let carboCalc = ''
  let proteinCalc = ''
  let fatCalc = ''

  if (type === 'g') {
    carboCalc = ((carbo * grams) / 100).toFixed(1)
    proteinCalc = ((protein * grams) / 100).toFixed(1)
    fatCalc = ((fat * grams) / 100).toFixed(1)
  } else {
    carboCalc = (carbo * grams).toFixed(1)
    proteinCalc = (protein * grams).toFixed(1)
    fatCalc = (fat * grams).toFixed(1)
  }

  return (
    <div className="box-border grid grid-cols-2 items-center justify-between gap-2 rounded-md bg-zinc-200 px-2 py-1.5 text-sm shadow-md transition-colors duration-200 ease-in-out dark:bg-zinc-800 sm:text-base">
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
              className="w-2/4 rounded bg-zinc-100 dark:bg-zinc-50"
            />
            <button type="submit" className="rounded-lg border px-1">
              ok
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-1">
            <span className="font-bold">
              {grams}
              {type}
            </span>
            <Edit2
              size={12}
              onClick={() => setEditGrams(true)}
              className="cursor-pointer hover:text-zinc-500"
            />
          </div>
        )}
        <span className="text-base font-bold">{name}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p>C: {carboCalc}</p>
        <p>P: {proteinCalc}</p>
        <p>G: {fatCalc}</p>

        <div className="flex">
          <button onClick={() => handleRemoveFood()}>
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
