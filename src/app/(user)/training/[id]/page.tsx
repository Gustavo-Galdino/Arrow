import { TaskList } from '@/components/taskList'
import { General } from '../components/general'
import { Annotations } from '@/components/annotations'
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

export default async function Page() {
  const user = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
  })
  const userData: User = await user.json()

  const tables = await fetch('http://localhost:3000/api/tables', {
    cache: 'no-store',
  })

  const tablesData = await tables.json()

  return (
    <main className="mt-24 flex">
      <AsideUserLayout name={userData.username} tables={userData.tables} />

      <section className="px-5 ml-72">
        <article>
          <TaskList userData={userData} exerciceTable={tablesData} />
        </article>

        <article className="mt-20">
          <Annotations />
        </article>
      </section>
      <General />
    </main>
  )
}
