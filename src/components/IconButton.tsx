'use client'

import Image, { StaticImageData } from 'next/image'
import * as Popover from '@radix-ui/react-popover'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface IconButtonProps {
  img: StaticImageData
  top: string
  left: string
  title: string
  description: string
  popoverContainerStyles: string
  popoverArrowStyles: string
  linkColor: string
  linkText: string
  linkHref: string
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
  linkColor,
  linkText,
  linkHref,
  popoverPosition,
}: IconButtonProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={`absolute ${top} ${left} h-16 w-16 cursor-pointer rounded-full shadow  hover:border-2 hover:border-sky-500`}
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
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-bold underline">{title}</h2>
            <p>{description}</p>
            <Popover.Close asChild>
              <Link
                href={linkHref}
                className={`${linkColor} flex items-center gap-1.5 rounded-lg px-4 py-2 shadow`}
              >
                {linkText}
                <ArrowRight />
              </Link>
            </Popover.Close>
          </div>
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
