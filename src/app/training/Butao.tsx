'use client'

import { api } from '@/lib/api'
import { useUser } from '@clerk/nextjs'

interface ButaoProps {
  userId: string
}

export function Butao({ userId }: ButaoProps) {
  const { user } = useUser()
  async function createTable() {
    await api.post('/api/workoutTable', {
      userId,
    })
  }
  return (
    <>
      <p>{user?.fullName}</p>
      <button onClick={() => createTable()}>criar</button>
    </>
  )
}
