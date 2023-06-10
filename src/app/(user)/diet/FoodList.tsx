import { useStore } from '@/context/store'
import { api } from '@/lib/api'
import { X } from 'lucide-react'

interface FoodListProps {
  name: string
  carbo: number
  protein: number
  fat: number
  foodId: string
  tableId: string
}

export function FoodList({
  carbo,
  fat,
  name,
  protein,
  foodId,
  tableId,
}: FoodListProps) {
  async function handleRemoveFood() {
    try {
      await api.patch('/api/food', {
        foodId,
        tableId,
      })

      const response = await api.get('/api/users')
      const user = response.data
      useStore.setState({ user })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="box-border grid grid-cols-1 items-center justify-between gap-2 rounded-md border border-gray-500 px-2 py-1.5 text-sm transition-colors duration-200 ease-in-out sm:grid-cols-3 sm:text-base">
      <strong className="text-base text-white sm:text-base">{name}</strong>
      <div className="flex items-center gap-2 sm:gap-4">
        <p className="text-gray-300">C: {carbo}</p>
        <p className="text-gray-300">P: {protein}</p>
        <p className="text-gray-300">G: {fat}</p>
      </div>

      <div className="mt-2 justify-self-end sm:mt-0">
        <button onClick={() => handleRemoveFood()}>
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
