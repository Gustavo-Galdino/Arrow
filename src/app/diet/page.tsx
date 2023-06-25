import { StoreInitializer } from '@/components/StoreInitializer'

import { Table } from './Table'
import { auth } from '@clerk/nextjs'
import { User, useStore } from '@/context/store'
import { UserInformations } from '@/components/UserInformations'

export default async function Diet() {
  const { getToken, userId } = auth()

  if (!userId) {
    return null
  }

  const token = await getToken()

  const response = await fetch('https://arrow-alpha.vercel.app/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const user: User = await response.json()
  useStore.setState({ user })

  return (
    <main className="px-10">
      <StoreInitializer user={user} />

      <UserInformations />
      <Table />
    </main>
  )
}
