'use client'

import { useUser } from '@clerk/nextjs'
import { FormUserInfos } from './FormUserInfos'
import { UserTitle } from '@/components/UserTitle'
import { Achievements } from '@/components/Achievements'

export function UserInfos() {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="mt-16  space-y-10 rounded-lg bg-gray-700 p-6 shadow-md">
      <div className="flex items-center gap-1">
        <strong className="text-xl font-bold uppercase">{user.fullName}</strong>
        <span>|</span>
        <UserTitle />
      </div>
      <FormUserInfos />

      <section className="space-y-10">
        <h2 className="border-b text-2xl font-bold">Conquistas</h2>

        <Achievements />
      </section>
    </div>
  )
}
