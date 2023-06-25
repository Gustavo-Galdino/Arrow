'use client'

import { useStore } from '@/context/store'
import { useUser } from '@clerk/nextjs'
import * as Progress from '@radix-ui/react-progress'
import { UserTitle } from './UserTitle'

export function UserInformations() {
  const { user } = useUser()
  const u = useStore((state) => state.user)

  if (!user) return null

  return (
    <section className="mt-16 flex w-full justify-between border-b border-b-zinc-400 pb-2">
      <div className="flex flex-col">
        <div>
          <strong className="text-xs">
            <span className="text-green-500 dark:text-green-300">
              Nv: {u?.nivel}
            </span>{' '}
            - exp: {u?.experience}
          </strong>

          <Progress.Root
            className="relative h-1 w-36 overflow-hidden rounded-full bg-gray-900 dark:bg-gray-100"
            value={10}
          >
            <Progress.Indicator
              className="h-full w-full bg-green-500 transition-transform"
              style={{ transform: `translateX(-${100 - u?.experience!}%)` }}
            />
          </Progress.Root>
        </div>
        <div className="flex items-center gap-1">
          <strong className="text-xl uppercase leading-relaxed tracking-widest">
            {user.fullName}
          </strong>
          <span className="font-bold">|</span>
          <UserTitle />
        </div>
      </div>
    </section>
  )
}
