import { Header } from '@/components/Header'

import { StoreInitializer } from '@/components/StoreInitializer'

import { ArrowRight } from 'lucide-react'
import { auth } from '@clerk/nextjs'
import { Butao } from './Butao'
import { UserInformations } from '@/components/UserInformations'

export default async function Training() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  return (
    <main className="px-10">
      {/* <StoreInitializer user={user} /> */}
      <Header />

      <UserInformations />
      {/* <Table /> */}
    </main>
  )
}
