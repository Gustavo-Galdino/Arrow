'use client'

import Image, { StaticImageData } from 'next/image'
import * as Popover from '@radix-ui/react-popover'
import { ArrowRight } from 'lucide-react'

interface IconButtonProps {
  img: StaticImageData
  top: string
  left: string
  title: string
  description: string
  popoverContainerStyles: string
  popoverArrowStyles: string
  popoverPosition: 'top' | 'left' | 'right' | 'bottom' | undefined
}

export function IconButton({
  img,
  top,
  left,
  title,
  description,
  popoverContainerStyles,
  popoverArrowStyles,
  popoverPosition,
}: IconButtonProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={`absolute ${top} ${left} h-16 w-16 cursor-pointer rounded-full shadow  hover:border-2 hover:border-sky-700`}
        >
          <Image
            src={img}
            alt=""
            width={200}
            height={200}
            className="h-16 w-16 rounded-full object-cover"
          />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className={popoverContainerStyles}
          side={popoverPosition}
          align="center"
        >
          <h2>{title}</h2>
          <p> {description}</p>
          <Popover.Close asChild>
            <button className="flex items-center gap-1.5 rounded-lg border px-4 py-2">
              Ir para Plano de Treino
              <ArrowRight />
            </button>
          </Popover.Close>
          <Popover.Arrow
            className={popoverArrowStyles}
            width={20}
            height={10}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
