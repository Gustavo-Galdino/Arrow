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
import { IconButton } from './IconButton'

export function Hero() {
  return (
    <div>
      <Image src={banner} alt="" className="fixed h-full w-screen opacity-30" />
      <div className="relative m-auto max-w-[1440px]">
        <Image src={banner} alt="" className="object-cover shadow" />
        <div className="absolute top-0 w-full"></div>

        <div className="absolute left-[35%] top-64">
          <Image src={arrow1} alt="" />
          <IconButton
            img={trainingIcon}
            top="-top-16"
            left="-left-4"
            title="Plano de Treinamento"
            description="Cadastre sua rotina de treino, acompanhe seus exercicios e progresso atravez de uma tabela personalizada."
            popoverContainerStyles="bg-orange-400 p-4 rounded shadow w-96"
            popoverArrowStyles="fill-orange-400 shadow"
            popoverPosition="left"
            linkColor="bg-orange-600 hover:bg-orange-500 hover:text-gray-50"
            linkHref="/training"
            linkText="Começar"
          />
        </div>

        <div className="absolute left-[49%] top-[18%] w-16">
          <Image src={arrow2} alt="" />
          <IconButton
            img={stokeIcon}
            top="-top-16"
            left="-left-5"
            title="Estoque"
            description="Uma dispensa para ter controle dos itens da dieta, para não deixar faltar nada."
            popoverContainerStyles="bg-sky-400 p-4 rounded shadow w-96"
            popoverArrowStyles="fill-sky-400 shadow"
            popoverPosition="right"
            linkColor="bg-sky-600 hover:bg-sky-500 hover:text-gray-50"
            linkHref="/stoke"
            linkText="Começar"
          />
        </div>

        <div className="absolute bottom-[40%] left-[39%]">
          <Image src={arrow3} alt="" />
          <IconButton
            img={foodIcon}
            top="top-16"
            left="-left-4"
            title="Plano Alimentar"
            description="Cadatre seu plano alimentar e acompanhe o consumo diario de calorias e macronutrientes."
            popoverContainerStyles="bg-amber-300 p-4 rounded shadow w-96"
            popoverArrowStyles="fill-amber-400 shadow"
            popoverPosition="left"
            linkColor="bg-amber-400 hover:bg-amber-300 hover:text-gray-50"
            linkHref="/diet"
            linkText="Começar"
          />
        </div>

        <div className="absolute right-1/3 top-1/4">
          <Image src={arrow4} alt="" />
          <IconButton
            img={coachIcon}
            top="top-52"
            left="left-36"
            title="Profissional"
            description="Não sabe como montar a melhor estrategia? Contrate um profissional que ira traçar o melhor plano e acompanhar seu progresso junto a voce!"
            popoverContainerStyles="bg-amber-600 p-4 rounded shadow w-96"
            popoverArrowStyles="fill-amber-600 shadow"
            popoverPosition="top"
            linkColor="bg-amber-800 hover:bg-amber-700 hover:text-gray-50"
            linkHref="/pro"
            linkText="Começar"
          />
        </div>
      </div>
    </div>
  )
}
