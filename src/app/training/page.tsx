import { Header } from '@/components/Header'
import { auth } from '@clerk/nextjs'
import { UserInformations } from '@/components/UserInformations'
import { User, useStore } from '@/context/store'
import { StoreInitializer } from '@/components/StoreInitializer'
import { Table } from './Table'

export default async function Training() {
  const { getToken, userId } = auth()

  if (!userId) {
    return null
  }

  const token = await getToken()

  const response = await fetch('http://localhost:3000/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const user: User = await response.json()
  useStore.setState({ user })

  return (
    <main className="px-10">
      <StoreInitializer user={user} />
      <Header />

      <UserInformations />
      <Table />
    </main>
  )
}
