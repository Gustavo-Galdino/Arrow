'use client'

import { useStore } from '@/context/store'

export function UserTitle() {
  const user = useStore((state) => state.user)

  if (!user) return null

  let conquest = ''
  switch (user.nivel) {
    case 1:
      conquest = 'Frango'
      break
    case 10:
      conquest = 'Frango Evoluido'
      break
    case 20:
      conquest = 'Rato de Academia'
      break
    case 30:
      conquest = 'Rato Motivado'
      break
    case 40:
      conquest = 'Yeeh Buddy'
      break
    case 50:
      conquest = 'Oq ela te fez man?'
      break
    default:
      conquest = 'Frango'
      break
  }
  return <span>{conquest}</span>
}
