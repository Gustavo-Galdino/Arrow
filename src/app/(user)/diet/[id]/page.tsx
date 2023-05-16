import { AsideUserLayout } from '@/components/aside'
import { NewMeatTable } from '@/components/tableDiet/components/newMeatTable'

interface Table {
  id: string
  tableName: string
  days: string
}

interface User {
  id: string
  username: string
  diettTable: Table[]
}

export default async function Diet() {
  const user = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
  })
  const userData: User = await user.json()

  const tables = await fetch('http://localhost:3000/api/dietTable', {
    cache: 'no-store',
  }).then((response) => response.json())

  return (
    <main className="mt-24 flex">
      <AsideUserLayout
        user={userData}
        tables={userData.diettTable}
        tableName="Plano Alimentar"
      />
      <section className="ml-72 px-6">
        <h1>Plano 1</h1>

        <NewMeatTable table={tables} />
      </section>
    </main>
  )
}
