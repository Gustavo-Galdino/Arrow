import { useStore } from '@/context/store'
import { api } from '@/lib/api'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import debounce from 'lodash.debounce'
import { useState } from 'react'

interface FoodOption {
  id: string
  label: string
  carbo: number
  protein: number
  fat: number
}

interface NewFoodProps {
  dietListId: string
}

export function NewFood({ dietListId }: NewFoodProps) {
  const { handleSubmit, reset, register, setValue } = useForm()

  const [selectedFood, setSelectedFood] = useState<FoodOption | null>(null)
  const [foodOptions, setFoodOptions] = useState<FoodOption[]>([])

  const handleInputChange = debounce((value) => {
    loadOptions(value)
  }, 500)

  const loadOptions = async (inputValue: string) => {
    if (!inputValue) return
    const response = await api.get('/api/food', {
      params: {
        search: inputValue,
      },
    })

    const options: FoodOption[] = response.data.map((food: any) => ({
      id: food.id,
      label: food.foodName,
      carbo: food.carbo,
      protein: food.protein,
      fat: food.fat,
    }))

    setFoodOptions(options)
  }

  async function handleNewFood() {
    if (selectedFood) {
      try {
        await api.patch('/api/dietList', {
          id: dietListId,
          foodId: selectedFood.id,
        })

        const response = await api.get('/api/users')
        const user = response.data
        useStore.setState({ user })

        reset()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgb(75 85 99)',
      borderColor: '#4B5563',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#4B5563',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#D1D5DB',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#D1D5DB',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: '#fff',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#1F2937',
      borderColor: '#4B5563',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? '#F9FAFB' : '#D1D5DB',
      backgroundColor: state.isFocused ? '#4B5563' : null,
      '&:active': {
        backgroundColor: '#6B7280',
      },
    }),
  }

  return (
    <form
      className="flex flex-col flex-wrap items-start gap-2 rounded bg-gray-800 p-4 text-sm md:flex-row md:items-center"
      onSubmit={handleSubmit(handleNewFood)}
    >
      <Select
        onInputChange={handleInputChange}
        options={foodOptions}
        onChange={(food) => {
          setSelectedFood(food)
          setValue('carbo', food?.carbo)
          setValue('protein', food?.protein)
          setValue('fat', food?.fat)
        }}
        placeholder="Alimento"
        styles={customStyles}
        className="mb-2 w-full md:mb-0"
      />

      <div className="mb-2 flex w-full flex-col gap-2 md:mb-0 md:w-auto md:flex-row">
        <input
          type="text"
          {...register('carbo')}
          value={selectedFood?.carbo}
          placeholder="Carboidrato"
          className="w-full rounded bg-gray-600 p-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-24"
        />
        <input
          type="text"
          {...register('protein')}
          value={selectedFood?.protein}
          placeholder="Proteina"
          className="w-full rounded bg-gray-600 p-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-24"
        />
        <input
          type="text"
          {...register('fat')}
          value={selectedFood?.fat}
          placeholder="Gordura"
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
