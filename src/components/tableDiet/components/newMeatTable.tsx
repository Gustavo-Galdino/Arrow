'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Table } from './table'
import { useForm } from 'react-hook-form'

interface DietTable {
  id: string
  title: string
  dietTableId: string
  dietList: []
}

interface NewMeatTableProps {
  table: DietTable[]
}

export function NewMeatTable({ table }: NewMeatTableProps) {
  const [mealTables, setMealTables] = useState<DietTable[]>([])
  const { register, handleSubmit, getValues, reset } = useForm()

  useEffect(() => {
    setMealTables(table)
  }, [table])

  const pathname = usePathname()
  const dietTableId = pathname.replace(/\/diet\/([^/]+)/, '$1')

  async function handleNewTable() {
    const title = getValues('title')

    await fetch('http://localhost:3000/api/dietTable', {
      method: 'POST',
      body: JSON.stringify({
        dietTableId,
        title,
      }),
    })

    reset()

    const response = await fetch('http://localhost:3000/api/dietTable')
    const data = await response.json()
    setMealTables(data)
  }

  return (
    <section className="flex items-start gap-6">
      <form
        onSubmit={handleSubmit(handleNewTable)}
        className="flex flex-col items-center justify-around gap-6 rounded border border-zinc-600 p-6"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Titulo:</label>
          <input
            type="text"
            id="title"
            placeholder="ex: Semanal, Segunda, Ter..."
            {...register('title')}
            className="rounded bg-zinc-600 p-2"
          />
        </div>
        <button
          type="submit"
          className="rounded border p-2 text-center hover:border-zinc-400"
        >
          Adicionar
        </button>
      </form>
      <Table tables={mealTables} />
    </section>
  )
}
