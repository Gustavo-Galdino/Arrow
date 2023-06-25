import { useStore } from '@/context/store'
import { api } from '@/lib/api'
import { Edit2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function FormUserInfos() {
  const user = useStore((state) => state.user)
  const { register, handleSubmit, getValues } = useForm()
  const [editWeight, setEditWeight] = useState(false)
  const [editGoal, setEditGoal] = useState(false)

  if (!user) return null

  const age = new Date().getFullYear() - new Date(user.age).getFullYear()

  const calcMetabolism =
    66 + 13.8 * user.weight + 5 * user.height - 6.8 * age + user.goal

  let goal = ''
  switch (user.goal) {
    case -500:
      goal = 'Cutting'
      break
    case 0:
      goal = 'Normocalorica'
      break
    case 500:
      goal = 'Bulking'
      break
    default:
      goal = ''
      break
  }
  const userId = user.id

  async function handleEditGoal() {
    const goal = parseInt(getValues('goal'))
    const weight = user?.weight

    try {
      await api.patch('/api/user', {
        userId,
        goal,
        weight,
      })

      setEditGoal(false)

      const response = await api.get('/api/user')
      const user = response.data
      useStore.setState({ user })
    } catch (error) {
      console.log(error)
    }
  }

  async function handleEditWeight() {
    const goal = user?.goal
    const weight = parseFloat(getValues('weight'))

    try {
      await api.patch('/api/user', {
        userId,
        goal,
        weight,
      })

      setEditWeight(false)

      const response = await api.get('/api/user')
      const user = response.data
      useStore.setState({ user })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <span className="text-sm text-purple-400">Nivel: {user.nivel}</span>
      <section className="flex flex-col items-start justify-center gap-2">
        <p className="mb-4 text-xl">
          Taxa Metabolica Basal: <span>{calcMetabolism.toFixed(0)} kcal</span>
        </p>

        {editWeight ? (
          <form
            className="flex items-center gap-2"
            onSubmit={handleSubmit(handleEditWeight)}
          >
            <label>
              <span>Editar Peso: </span>
              <input
                type="number"
                {...register('weight')}
                className="w-14 rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-500"
              />
            </label>

            <button
              type="submit"
              className="rounded bg-violet-500 px-2 py-1 shadow-md hover:bg-violet-400"
            >
              Salvar
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2">
            <p className="">Peso: {user?.weight} kg</p>
            <button
              type="button"
              className="hover:text-zinc-200"
              onClick={() => setEditWeight(true)}
            >
              <Edit2 size={14} />
            </button>
          </div>
        )}

        <p className="">Altura: {user?.height} cm</p>

        <p className="">Idade: {age} anos</p>

        {editGoal ? (
          <form
            onSubmit={handleSubmit(handleEditGoal)}
            className="flex items-center gap-2"
          >
            <select
              {...register('goal')}
              className="rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-500"
            >
              <option value="-500">Cutting</option>
              <option value="0">Normocalorica</option>
              <option value="500">Bulking</option>
            </select>

            <button
              type="submit"
              className="rounded bg-violet-500 px-2 py-1 shadow-md hover:bg-violet-400"
            >
              Salvar
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2">
            <p className="">Atividade: {goal}</p>
            <button
              type="button"
              className="hover:text-zinc-200"
              onClick={() => setEditGoal(true)}
            >
              <Edit2 size={14} />
            </button>
          </div>
        )}
      </section>
    </>
  )
}
