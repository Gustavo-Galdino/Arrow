import { AsideUserLayout } from '@/components/aside'
import { TableDiet } from '@/components/tableDiet'

interface Table {
  id: string
  tableName: string
  days: string
}

interface User {
  id: string
  username: string
  DiettTable: Table[]
}

export default async function Diet() {
  const user = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
  })
  const userData: User = await user.json()

  const dietTable = await fetch('http://localhost:3000/api/dietTable', {
    cache: 'no-store',
  })
  const dietTableData = await dietTable.json()

  return (
    <main className="mt-24 flex">
      <AsideUserLayout user={userData} tables={userData.DiettTable} />

      <section className="px-6 ml-72 w-full">
        <h1>Plano 1</h1>

        <TableDiet dietTables={dietTableData} />
      </section>
    </main>
  )
}
