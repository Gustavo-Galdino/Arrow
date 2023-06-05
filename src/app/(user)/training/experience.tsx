'use client'

import { useStore } from '@/context/store'
import * as Progress from '@radix-ui/react-progress'

export function Experience() {
  const user = useStore((state) => state.user)

  if (!user) return null
  return (
    <div>
      <strong className="text-xs">
        <span className="text-green-300">Lv: {user.nivel}</span> - exp:{' '}
        {user.experience}
      </strong>

      <Progress.Root
        className="relative h-0.5 w-36 overflow-hidden rounded-full bg-gray-100"
        value={user.experience}
      >
        <Progress.Indicator
          className="h-full w-full bg-green-500 transition-transform"
          style={{ transform: `translateX(-${100 - user.experience}%)` }}
        />
      </Progress.Root>
    </div>
  )
}
