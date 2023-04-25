import { TaskList } from '@/components/taskList'
import { General } from './components/general'
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

export default async function Training() {
  const response = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
  })
  const data: User = await response.json()

  return (
    <main className="mt-24 flex">
      <AsideUserLayout name={data.username} tables={data.tables} />

      <section className="px-5 ml-72">
        <h2 className="text-5xl font-bold">{data.tables[0].tableName}</h2>
        <article className="mt-20">
          <TaskList />
        </article>

        <article className="mt-20">
          <Annotations />
        </article>
      </section>
      <General />
    </main>
  )
}