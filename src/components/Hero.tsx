import Image from 'next/image'

import banner from '@/assets/banner.png'

export function Hero() {
  return (
    <div className="flex w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800">
      <Image
        src={banner}
        alt=""
        className="object-cover"
        width={1440}
        height={1440}
        quality={100}
      />
    </div>
  )
}
