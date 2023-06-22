'use client'

import Link from 'next/link'
import { useStore } from '@/context/store'
import { useUser } from '@clerk/nextjs'
import * as Progress from '@radix-ui/react-progress'
import { ArrowRight } from 'lucide-react'

export function UserInformations() {
  const { user } = useUser()
  // const user = useStore((state) => state.user)

  if (!user) return null

  return (
    <section className="mt-16 flex w-full justify-between border-b pb-2">
      <div className="flex flex-col">
        <div>
          <strong className="text-xs">
            <span className="text-green-300">Lv: 1</span> - exp: 10
          </strong>

          <Progress.Root
            className="relative h-0.5 w-36 overflow-hidden rounded-full bg-gray-100"
            value={10}
          >
            <Progress.Indicator
              className="h-full w-full bg-green-500 transition-transform"
              style={{ transform: `translateX(-${100 - 20}%)` }}
            />
          </Progress.Root>
        </div>
        <div className="flex items-center gap-1">
          <strong className="text-xl uppercase leading-relaxed tracking-widest">
            {user.fullName}
          </strong>
          <span className="font-bold">|</span>
          <span className="text-sm text-gray-200">Frango</span>
        </div>
      </div>

      <Link href="/diet" className="flex items-center gap-1 self-end text-sm">
        Ir para Plano Alimentar
        <ArrowRight size={14} />
      </Link>
    </section>
  )
}
