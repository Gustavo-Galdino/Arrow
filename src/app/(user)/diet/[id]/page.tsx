import { AsideUserLayout } from '@/components/aside'
import { TableDiet } from '@/components/tableDiet'

interface Table {
  id: string
  tableName: string
}

interface User {
  id: string
  username: string
  tables: Table[]
}

export default async function Diet() {
  const user = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
  })
  const userData: User = await user.json()

  return (
    <main className="mt-24 flex">
      <AsideUserLayout user={userData} tables={userData.tables} />

      <section className="px-5 ml-72">
        <h1>Plano 1</h1>

        <TableDiet />
      </section>
    </main>
  )
}
