import { AsideUserLayout } from '@/components/aside'

interface Table {
  id: string
  tableName: string
}

interface User {
  id: string
  username: string
  tables: Table[]
}

export default async function Training() {
  const user = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
  })
  const userData: User = await user.json()

  return (
    <main className="mt-24 flex">
      <AsideUserLayout user={userData} tables={userData.tables} />

      <section className="px-5 ml-72">
        <h1>Pagina de Treino</h1>
      </section>
    </main>
  )
}
