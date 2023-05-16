import * as Dialog from '@radix-ui/react-dialog'
import { Trash } from 'phosphor-react'

interface DeleteModalProps {
  onDeleteTable: (id?: string) => void
}

export function DeleteModal({ onDeleteTable }: DeleteModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Trash />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="absolute" />
        <Dialog.Content className="fixed left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 rounded-md bg-zinc-700 p-6">
          <Dialog.Title className="mb-5 text-2xl font-bold">
            Deletar Treino?
          </Dialog.Title>
          <Dialog.Description className="mb-5">
            Ao clicar deletar seu treino sera excluido.
          </Dialog.Description>
          <div className="flex items-center justify-end gap-2">
            <Dialog.Close asChild>
              <button className="rounded-md border px-2 py-1 font-semibold hover:bg-zinc-600">
                Cancelar
              </button>
            </Dialog.Close>
            <button
              className="rounded-md bg-red-500 px-2 py-1 font-semibold hover:bg-red-600"
              onClick={() => onDeleteTable()}
            >
              Deletar
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
