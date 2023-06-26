import { User, useStore } from '@/context/store'
import { StoreInitializer } from '@/components/StoreInitializer'
import { auth } from '@clerk/nextjs'
import { Table } from './table'
import { UserInformations } from '@/components/UserInformations'
import { Header } from '@/components/Header'

export default async function Stock() {
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

      <div className="mt-10">
        <Table />
      </div>
    </main>
  )
}
