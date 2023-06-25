import { useStore } from '@/context/store'
import { api } from '@/lib/api'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface AnnotationProps {
  note: string
  exerciseId: string
}
export function Annotation({ note, exerciseId }: AnnotationProps) {
  const { register, getValues, handleSubmit } = useForm()
  const [edit, setEdit] = useState(false)

  async function handleAddNote() {
    try {
      const annotation = getValues('note')

      await api.patch('/api/exercise', {
        id: exerciseId,
        annotation,
      })

      setEdit(false)

      const reloadResponse = await api.get('/api/user')
      const reloadUser = reloadResponse.data
      useStore.setState({ user: reloadUser })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {note && !edit ? (
        <div className="flex items-center justify-between">
          <p className="px-1 text-sm">{note}</p>
          <button className="hover:text-zinc-200" onClick={() => setEdit(true)}>
            <Pencil size={14} />
          </button>
        </div>
      ) : (
        <form className="mt-2" onSubmit={handleSubmit(handleAddNote)}>
          <textarea
            {...register('note')}
            className="w-full rounded border border-zinc-50 bg-zinc-100 p-2 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-zinc-300 dark:bg-zinc-600"
            placeholder="Digite sua anotação"
          />
          <button
            type="submit"
            className="mt-2 rounded bg-indigo-500 px-3 py-1 text-white transition duration-200 ease-in-out hover:bg-indigo-600"
          >
            OK
          </button>
        </form>
      )}
    </div>
  )
}
