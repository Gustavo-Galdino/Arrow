'use client'

import { Plus, User } from 'phosphor-react'
import { ReactNode } from 'react'

interface AsideUserLayoutProps {
  children: ReactNode
}

export default function AsideUserLayout({ children }: AsideUserLayoutProps) {
  return (
    <main className="h-screen flex gap-5">
      <aside className="w-64 bg-zinc-800 mt-16 py-10 px-5 flex flex-col gap-6 items-center">
        <section className="flex gap-4 items-center self-start">
          <div className="border rounded-full bg-white w-14 h-14 flex items-center justify-center">
            <User size={32} color="#000" />
          </div>
          <div>
            <h3>Voodoo</h3>
            <p>Frango</p>
          </div>
        </section>

        <div className=" border rounded-full w-56 bg-gray-100" />

        <section className="ml-10">
          <ul className="flex flex-col items-start gap-4 list-disc">
            <li className="cursor-pointer hover:font-bold hover:underline underline-offset-4">
              Peito e Ombro
            </li>
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
      {children}
    </main>
  )
}
