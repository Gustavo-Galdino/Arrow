import * as Tooltip from '@radix-ui/react-tooltip'
import { AlertCircle } from 'lucide-react'

import tableExemple from '@/assets/tabela.png'
import Image from 'next/image'

export function Information() {
  return (
    <div className="absolute right-0.5 top-1.5">
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <AlertCircle className="" size={16} />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="flex flex-col items-center rounded bg-gray-600 py-2 shadow-md">
              <p className="w-1/2">
                Adicione a quantidade em gramas proporcional aos macros
              </p>
              <Image src={tableExemple} alt="" width={200} height={200} />

              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  )
}
