import Image from 'next/image'
import { useStore } from '@/context/store'

import frangoIcon from '@/assets/achivments/chickIcon.png'
import frangolinoIcon from '@/assets/achivments/frangolino.png'
import gymRat from '@/assets/achivments/gymrat.png'
import pedreiro from '@/assets/achivments/pedreiro.png'
import yeeep from '@/assets/achivments/yeeep.png'
import theking from '@/assets/achivments/theking.png'

export function Achievements() {
  const user = useStore((state) => state.user)

  if (!user) return null

  const achievements = [
    {
      nivel: 1,
      title: 'Frango',
      image: frangoIcon,
    },
    {
      nivel: 10,
      title: 'Frango Evoluido',
      image: frangolinoIcon,
    },
    {
      nivel: 20,
      title: 'Rato de Academia',
      image: gymRat,
    },
    {
      nivel: 30,
      title: 'Rato Motivado',
      image: pedreiro,
    },
    {
      nivel: 40,
      title: 'Yeeh Buddy',
      image: yeeep,
    },
    {
      nivel: 50,
      title: 'Oq ela te fez man?',
      image: theking,
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-3">
      {achievements.map((conquest, index) => (
        <div
          key={index}
          className={`flex w-32 flex-col items-center justify-center gap-2 rounded-lg bg-gray-800 py-6 shadow-md ${
            conquest.nivel > user.nivel && 'opacity-50'
          }`}
        >
          <Image
            src={conquest.image}
            alt=""
            className="rounded-full"
            width={72}
            height={72}
          />
          <span className="text-xs">Nivel: {conquest.nivel}</span>
          <span className="border-t py-1 text-center text-xs">
            {conquest.title}
          </span>
        </div>
      ))}
    </div>
  )
}
