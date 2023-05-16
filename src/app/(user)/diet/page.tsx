import { AsideUserLayout } from '@/components/aside'

interface Table {
  id: string
  tableName: string
}

interface DiettTable {
  id: string
  tableName: string
  days: string
}

interface User {
  id: string
  username: string
  tables: Table[]
  diettTable: DiettTable[]
}

export default async function Diet() {
  const user = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
  })
  const userData: User = await user.json()

  return (
    <main className="mt-24 flex">
      <AsideUserLayout
        user={userData}
        tables={userData.diettTable}
        tableName="Plano Alimentar"
      />

      <section className="ml-72 px-5">
        <h1>Pagina de Dieta</h1>
      </section>
    </main>
  )
}
