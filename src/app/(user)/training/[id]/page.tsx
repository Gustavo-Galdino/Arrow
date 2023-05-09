import { TaskList } from '@/components/taskList'
import { Annotations } from '@/components/annotations'
import { AsideUserLayout } from '@/components/aside'

interface Table {
  id: string
  tableName: string
}

interface User {
  id: string
  username: string
  nivel: number
  experience: number
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
    <main className="mt-24 flex justify-between">
      <AsideUserLayout user={userData} tables={userData.tables} />

      <section className="ml-72 grid grid-cols-2 w-full gap-2">
        <article className="px-4">
          <TaskList userData={userData} exerciceTable={exercicesData} />
        </article>
        <article className="mt-20 w-full border-l-2 border-zinc-500 px-4 h-full">
          <Annotations noteTable={notesData} userTable={userData} />
        </article>
      </section>
    </main>
  )
}
