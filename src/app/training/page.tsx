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
