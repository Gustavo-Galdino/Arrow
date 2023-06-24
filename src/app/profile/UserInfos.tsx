'use client'

import { useUser } from '@clerk/nextjs'
import { FormUserInfos } from './FormUserInfos'

export function UserInfos() {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="mt-16 h-[calc(100vh-10rem)] space-y-10 rounded-lg bg-gray-700 p-6 shadow-md">
      <strong className="text-xl font-bold uppercase">{user.fullName}</strong>
      <FormUserInfos />

      <section className="space-y-10">
        <h2 className="border-b text-2xl font-bold">Conquistas</h2>

        <article className="flex flex-wrap items-center gap-6">
          <div className="h-14 w-14 rounded-full border" />
          <div className="h-14 w-14 rounded-full border" />
          <div className="h-14 w-14 rounded-full border" />
          <div className="h-14 w-14 rounded-full border" />
          <div className="h-14 w-14 rounded-full border" />
          <div className="h-14 w-14 rounded-full border" />
          <div className="h-14 w-14 rounded-full border" />
          <div className="h-14 w-14 rounded-full border" />
          <div className="h-14 w-14 rounded-full border" />
          <div className="h-14 w-14 rounded-full border" />
          <div className="h-14 w-14 rounded-full border" />
          <div className="h-14 w-14 rounded-full border" />
          <div className="h-14 w-14 rounded-full border" />
        </article>
      </section>
    </div>
  )
}
