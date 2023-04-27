'use client'

import { usePathname } from 'next/navigation'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Note {
  id: string
  annotation: string
}

interface NoteTable {
  id: string
  notes: Note[]
}

interface Table {
  id: string
  tableName: string
  workoutTableNoteId?: string
}

interface UserTable {
  id: string
  username: string
  tables: Table[]
}

interface AnnotationType {
  noteTable: NoteTable[]
  userTable: UserTable
}

export function Annotations({ noteTable, userTable }: AnnotationType) {
  const { register, handleSubmit, getValues, reset } = useForm()
  const [notes, setNotes] = useState<NoteTable[]>(noteTable)
  const [table, setTable] = useState<UserTable[]>([userTable])

  useEffect(() => {
    setTable([userTable])
  }, [userTable])

  const pathname = usePathname()
  const tableId = pathname.replace(/\/training\/([^/]+)/, '$1')

  const selectedTable = table
    .flatMap((user) => user.tables)
    .find((table) => table.id === tableId)

  const annotations = notes
    .filter((annotation) => annotation.id === selectedTable?.workoutTableNoteId)
    .flatMap((note) => note.notes)

  const noteTableId = notes.find(
    (table) => table.id === selectedTable?.workoutTableNoteId,
  )?.id

  async function handleNewAnnotation() {
    const annotationValue = getValues('annotations')

    if (annotationValue) {
      await fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        body: JSON.stringify({
          annotationValue,
          noteTableId,
        }),
      })
    }

    const response = await fetch('http://localhost:3000/api/notes')
    const data = await response.json()
    setNotes(data)

    reset()
  }

  async function handleDeleteNote(id: string) {
    await fetch('http://localhost:3000/api/notes', {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })

    const response = await fetch('http://localhost:3000/api/notes')
    const data = await response.json()
    setNotes(data)
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-5">Anotações</h2>

      <div className="flex flex-col gap-4">
        {annotations.length > 0 &&
          annotations.map((annotation) => (
            <div
              key={annotation.annotation}
              className="flex items-center justify-between border-b-2 border-zinc-500 px-1"
            >
              <p className="truncate w-11/12">{annotation.annotation}</p>
              <button
                type="button"
                onClick={() => handleDeleteNote(annotation.id)}
              >
                <X weight="bold" className="text-red-500" />
              </button>
            </div>
          ))}

        <form onSubmit={handleSubmit(handleNewAnnotation)}>
          <textarea
            id="annotation"
            rows={4}
            placeholder="Digite sua anotação"
            {...register('annotations')}
            className="p-2 w-full text-sm rounded border bg-zinc-800 border-zinc-600 outline-none"
          />
          <button
            type="submit"
            className="py-3 px-5 mt-1 text-xs font-medium text-center bg-orange-700 rounded"
          >
            Adicionar
          </button>
        </form>
      </div>
    </section>
  )
}
