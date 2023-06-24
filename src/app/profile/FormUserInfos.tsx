import { useStore } from '@/context/store'

export function FormUserInfos() {
  const user = useStore((state) => state.user)

  if (!user) return null

  const age = new Date().getFullYear() - new Date(user.age).getFullYear()

  const calcMetabolism = 66 + 13.8 * user.weight + 5 * user.height - 6.8 * age
  return (
    <>
      <span className="text-lg text-purple-400"> - Nivel: {user.nivel}</span>
      <section className="flex flex-col items-start justify-center gap-2">
        <p className="mb-4 text-xl">
          Taxa Metabolica Basal:{' '}
          <span>{calcMetabolism.toFixed(0)} Calorias</span>
        </p>

        <div className="flex items-center gap-4">
          <p className="">Peso Inicial: {user?.weight} kg</p>
          <span>-</span>
          <p className="">Peso Atual: {user?.weight} kg</p>
        </div>

        <p className="">Altura: {user?.height} cm</p>

        <p className="">Idade: {age} anos</p>

        <p className="">Atividade: {user?.activity}</p>
      </section>
    </>
  )
}
