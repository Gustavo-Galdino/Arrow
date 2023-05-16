'use client'

import Link from 'next/link'
import { Plus, User } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DeleteModal } from '../DeleteModal'
import { usePathname, useRouter } from 'next/navigation'

interface Table {
  id: string
  tableName: string
}

interface UserData {
  id: string
  username: string
  tables?: Table[]
}

interface AsideProps {
  user: UserData
  tableName?: string
  tables: Table[]
}

export function AsideUserLayout({ user, tables, tableName }: AsideProps) {
  const { register, getValues, reset, handleSubmit } = useForm()
  const [asideTables, setAsideTables] = useState<Table[]>(tables)

  const router = useRouter()
  const pathname = usePathname()
  const tableId = pathname.replace(/\/training\/([^/]+)/, '$1')

  async function handleCreateTable() {
    const tableName = getValues('newTable')
    const userId = user.id

    if (tableName) {
      await fetch('http://localhost:3000/api/tables', {
        method: 'POST',
        body: JSON.stringify({
          tableName,
          userId,
        }),
      })

      const response = await fetch('http://localhost:3000/api/tables')
      const data = await response.json()
      setAsideTables(data)

      reset()
    }
  }

  async function handleDeleteTable(id: string) {
    await fetch('http://localhost:3000/api/tables', {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })

    const response = await fetch('http://localhost:3000/api/tables')
    const data = await response.json()
    setAsideTables(data)

    router.push('training')
  }

  return (
    <aside className="fixed top-16 flex h-full flex-col gap-4 bg-zinc-800 p-6">
      <section className="flex items-center gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-white">
          <User size={32} color="#000" />
        </div>
        <div>
          <h3>{user.username}</h3>
          <p className="text-sm text-zinc-300">Frango</p>
        </div>
      </section>

      <div className="w-56 rounded-full border border-zinc-300" />

      <section>
        <ul className="flex flex-col gap-2">
          {asideTables.map((table) => (
            <li
              key={table.id}
              className="flex w-full cursor-pointer items-center justify-between text-zinc-400 hover:font-bold hover:underline hover:underline-offset-4"
            >
              <Link
                href={`${pathname}/${table.id}`}
                className={
                  tableId === table.id ? 'font-bold text-zinc-100' : ''
                }
              >
                {table.tableName || tableName}
              </Link>
              <button type="button" className="hover:text-red-500">
                <DeleteModal
                  onDeleteTable={() => handleDeleteTable(table.id)}
                />
              </button>
            </li>
          ))}

          <li className="flex items-center rounded border border-zinc-600 bg-zinc-700 p-1">
            <form
              className="flex items-center gap-2"
              onClick={handleSubmit(handleCreateTable)}
            >
              <button type="submit" className="cursor-pointer">
                <Plus size={16} weight="bold" color="#fff" />
              </button>
              <input
                id="add exercice"
                type="text"
                placeholder="Adicionar Tabela"
                {...register('newTable')}
                className="
                  border-none
                  bg-transparent
                  text-sm
                  outline-none
                "
              />
            </form>
          </li>
        </ul>
      </section>
    </aside>
  )
}
