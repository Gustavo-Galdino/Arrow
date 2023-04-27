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

  const exercices = await fetch('http://localhost:3000/api/exercices', {
    cache: 'no-store',
  })

  const exercicesData = await exercices.json()

  const notes = await fetch('http://localhost:3000/api/notes', {
    cache: 'no-store',
  })

  const notesData = await notes.json()

  return (
    <main className="mt-24 flex">
      <AsideUserLayout user={userData} tables={userData.tables} />

      <section className="px-5 ml-72">
        <article>
          <TaskList userData={userData} exerciceTable={exercicesData} />
        </article>

        <article className="mt-20">
          <Annotations noteTable={notesData} userTable={userData} />
        </article>
      </section>
      <General />
    </main>
  )
}
