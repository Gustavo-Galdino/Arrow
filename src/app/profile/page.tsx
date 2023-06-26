import { auth } from '@clerk/nextjs'
import { UserInfos } from './UserInfos'
import { User, useStore } from '@/context/store'
import { StoreInitializer } from '@/components/StoreInitializer'
import { Header } from '@/components/Header'

export default async function Profile() {
  const { getToken } = auth()

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
    <main className="px-10">
      <StoreInitializer user={user} />
      <Header />
      <UserInfos />
    </main>
  )
}
