import Image from 'next/image'
import { Hero } from '@/components/Hero'

import dumbbellIcon from '@/assets/dumbbell.png'
import foodIcon from '@/assets/food.png'
import stokeIcon from '@/assets/stoke.png'
import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="w-full">
        <Header />
      </div>
      <Hero />

      <div className="mb-32 mt-10 flex w-full flex-col items-center justify-center">
        <h2 className="text-3xl font-bold md:text-4xl">Seu Foco em um Lugar</h2>
        <div className="mx-auto h-0.5 w-48 border border-zinc-900 dark:border-zinc-200" />
      </div>

      <div className="mb-40 w-full bg-zinc-200 px-6 pb-20 shadow-md dark:bg-zinc-600">
        <article className="flex flex-col items-center justify-center gap-12 md:flex-row md:gap-6">
          <section className="-mt-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-zinc-300 p-6 shadow-md dark:bg-zinc-700">
            <h3 className="text-2xl font-medium">Treino</h3>
            <Image
              src={dumbbellIcon}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
            />
            <p className="text-center">
              Cadastre seu plano de treinamento e anotações por exercicios.
            </p>
            <Link
              href="/training"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-purple-400 py-2 font-semibold hover:bg-purple-300"
            >
              Começar
              <ArrowRight />
            </Link>
          </section>
          <section className="-mt-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-zinc-300 p-6 shadow-md dark:bg-zinc-700">
            <h3 className="text-2xl font-medium">Dieta</h3>
            <Image
              src={foodIcon}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
            />
            <p className="text-center">
              Cadastre seu plano alimentar, acompanhe o consumo diario de
              macronutrientes.
            </p>
            <Link
              href="/diet"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-purple-400 py-2 font-semibold hover:bg-purple-300"
            >
              Começar
              <ArrowRight />
            </Link>
          </section>
          <section className="-mt-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-zinc-300 p-6 shadow-md dark:bg-zinc-700">
            <h3 className="text-2xl font-medium">Estoque</h3>
            <Image
              src={stokeIcon}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
            />
            <p className="text-center">
              Personalze seu estoque com os alimentos de sua dieta.
            </p>
            <Link
              href="/stoke"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-purple-400 py-2 font-semibold hover:bg-purple-300"
            >
              Começar
              <ArrowRight />
            </Link>
          </section>
        </article>
      </div>

      <footer className="flex w-full flex-col items-start bg-zinc-400 p-6 dark:bg-zinc-900 md:items-end">
        <div className="mr-6 flex flex-col gap-2">
          <Link
            href="https://github.com/Gustavo-Galdino"
            className="flex items-center gap-1"
          >
            <Github />
            Github
          </Link>
          <Link
            href="https://www.linkedin.com/in/gustavo-galdinom/"
            className="flex items-center gap-1"
          >
            <Linkedin />
            LinkedIn
          </Link>

          <span className="flex items-center gap-1">
            <Mail />
            Email: gustavogaldinomartins@gmail.com
          </span>
        </div>
        <span className="mt-2 self-center">
          Desenvolvido por Gustavo Galdino
        </span>
      </footer>
    </main>
  )
}
