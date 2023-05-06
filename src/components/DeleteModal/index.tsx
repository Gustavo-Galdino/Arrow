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
        <Dialog.Content className="bg-zinc-700 rounded-md fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 p-6">
          <Dialog.Title className="text-2xl font-bold mb-5">
            Deletar Treino?
          </Dialog.Title>
          <Dialog.Description className="mb-5">
            Ao clicar deletar seu treino sera excluido.
          </Dialog.Description>
          <div className="flex gap-2 items-center justify-end">
            <Dialog.Close asChild>
              <button className="px-2 py-1 rounded-md font-semibold border hover:bg-zinc-600">
                Cancelar
              </button>
            </Dialog.Close>
            <button
              className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md font-semibold"
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
