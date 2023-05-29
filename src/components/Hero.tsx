import Image from 'next/image'

import banner from '@/assets/banner.png'
import arrow1 from '@/assets/arrow1.svg'
import arrow2 from '@/assets/arrow2.svg'
import arrow3 from '@/assets/arrow3.svg'
import arrow4 from '@/assets/arrow4.svg'
import trainingIcon from '@/assets/training_icon.png'
import foodIcon from '@/assets/food_icon.png'
import stokeIcon from '@/assets/stoke_icon.png'
import coachIcon from '@/assets/coach_icon.png'
import Link from 'next/link'
import { LogIn } from 'lucide-react'
import { IconButton } from './IconButton'

export function Hero() {
  return (
    <main>
      <Image src={banner} alt="" className="fixed h-full w-screen opacity-30" />
      <div className="relative m-auto w-[1440px]">
        <Image src={banner} alt="" className="rounded-lg object-cover shadow" />
        <div className="absolute top-6 flex w-full items-center justify-between px-6 ">
          <Link href="/" className="text-5xl font-bold underline">
            Arrow
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-lg font-semibold transition-colors hover:text-green-300"
          >
            Login
            <LogIn />
          </Link>
        </div>

        <div className="absolute left-[35%] top-64">
          <Image src={arrow1} alt="" />
          <IconButton
            img={trainingIcon}
            top="-top-16"
            left="-left-4"
            title="Plano de Treinamento"
            description="aodjaosidjasoidjoiajoid jasoifjaodisfjadsoifjasodifjadso igjadosifjasopdikdmfa sdnfgadosij"
            popoverContainerStyles="bg-orange-400 p-4 rounded shadow w-96"
            popoverArrowStyles="fill-orange-400"
            popoverPosition="left"
          />
        </div>

        <div className="absolute left-[49%] top-[18%] w-16">
          <Image src={arrow2} alt="" />
          <IconButton
            img={stokeIcon}
            top="-top-16"
            left="-left-5"
            title="Test"
            description="Testtt"
          />
        </div>

        <div className="absolute bottom-[40%] left-[39%]">
          <Image src={arrow3} alt="" />
          <IconButton
            img={foodIcon}
            top="top-16"
            left="-left-4"
            title="Test"
            description="Testtt"
          />
        </div>

        <div className="absolute right-1/3 top-1/4">
          <Image src={arrow4} alt="" />
          <IconButton
            img={coachIcon}
            top="top-52"
            left="left-36"
            title="Test"
            description="Testtt"
          />
        </div>
      </div>
    </main>
  )
}
