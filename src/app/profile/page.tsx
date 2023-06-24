import { Header } from '@/components/Header'
import { auth } from '@clerk/nextjs'
import { UserInfos } from './UserInfos'
import { User, useStore } from '@/context/store'
import { StoreInitializer } from '@/components/StoreInitializer'

export default async function Profile() {
  const { getToken } = auth()

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

      <UserInfos />
    </main>
  )
}
