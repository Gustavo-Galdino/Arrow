import { StoreInitializer } from '@/components/StoreInitializer'

import { Table } from './Table'
import { auth } from '@clerk/nextjs'
import { User, useStore } from '@/context/store'
import { UserInformations } from '@/components/UserInformations'
import { Header } from '@/components/Header'

export default async function Diet() {
  const { getToken, userId } = auth()

  if (!userId) {
    return null
  }

  const token = await getToken()

  const response = await fetch('https://arrow-iota.vercel.app/api/user', {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const user: User = await response.json()
  useStore.setState({ user })

  return (
    <main className="px-2 sm:px-10">
      <StoreInitializer user={user} />
      <Header />
      <UserInformations />
      <Table />
    </main>
  )
}
