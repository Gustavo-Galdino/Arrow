'use client'

import { useStore } from '@/context/store'
import { api } from '@/lib/api'
import * as Dialog from '@radix-ui/react-dialog'
import { Trash } from 'lucide-react'

interface DeleteModalProps {
  exerciseId: string
  title: string
  description: string
  whereApi: string
}

export function DeleteModal({
  exerciseId,
  title,
  description,
  whereApi,
}: DeleteModalProps) {
  async function handleDeleteTask(id: string) {
    await api.delete(`/api/${whereApi}`, {
      data: {
        id,
      },
    })
    const response = await api.get('/api/user')
    const user = response.data
    useStore.setState({ user })
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="hover:text-red-300" type="button">
          <Trash size={16} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="absolute" />
        <Dialog.Content className="fixed left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 rounded-md bg-zinc-400 p-6 dark:bg-zinc-700">
          <Dialog.Title className="mb-5 text-2xl font-bold">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-5">
            {description}
          </Dialog.Description>
          <div className="flex items-center justify-end gap-2">
            <Dialog.Close asChild>
              <button className="rounded-md border px-2 py-1 font-semibold hover:bg-zinc-600">
                Cancelar
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="rounded-md bg-red-500 px-2 py-1 font-semibold text-zinc-100 hover:bg-red-600 dark:text-zinc-900"
                onClick={() => handleDeleteTask(exerciseId)}
              >
                Deletar
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
