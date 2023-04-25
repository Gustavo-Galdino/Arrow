'use client'

import Link from 'next/link'
import { Plus, User } from 'phosphor-react'

interface Table {
  id: string
  tableName: string
}

interface AsideProps {
  name: string
  tables: Table[]
}

export function AsideUserLayout({ name, tables }: AsideProps) {
  return (
    <aside className="absolute top-16 py-10 px-5 h-full bg-zinc-800 flex flex-col gap-6 items-center">
      <section className="flex gap-4 items-center self-start">
        <div className="border rounded-full bg-white w-14 h-14 flex items-center justify-center">
          <User size={32} color="#000" />
        </div>
        <div>
          <h3>{name}</h3>
          <p>Frango</p>
        </div>
      </section>

      <div className=" border rounded-full w-56 bg-gray-100" />

      <section className="ml-10">
        <ul className="flex flex-col items-start gap-4 list-disc">
          {tables.map((table) => (
            <li
              key={table.id}
              className="cursor-pointer hover:font-bold hover:underline underline-offset-4"
            >
              <Link href={`/training/${table.id}`}>{table.tableName}</Link>
            </li>
          ))}

          <li className="list-none -ml-5">
            <div className="flex items-center gap-2">
              <label htmlFor="add exercice" className="cursor-pointer">
                <Plus size={16} weight="bold" color="#fff" />
              </label>
              <input
                id="add exercice"
                type="text"
                placeholder="Adicionar Tabela"
                className="
                  bg-transparent
                  border-none
                  text-sm
                "
              />
            </div>
          </li>
        </ul>
      </section>
    </aside>
  )
}
