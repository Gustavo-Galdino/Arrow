'use client'

import {
  ArrowDown,
  ArrowRight,
  Barbell,
  Knife,
  Person,
  Money,
} from 'phosphor-react'

export default function Home() {
  function handleScrollClick() {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <main>
      <header
        className="
          bg-sky-700 
          h-screen 
          flex 
          flex-col 
          items-center 
          justify-between 
          px-10"
      >
        <h1 className="text-8xl mt-72">
          Trace metas de acordo com seus objetivos
        </h1>
        <span
          className="border-2 rounded-full p-2 cursor-pointer mb-10"
          onClick={() => handleScrollClick()}
        >
          <ArrowDown size={32} className="animate-bounce" />
        </span>
      </header>

      <section className="h-screen flex flex-col mt-14">
        <article className="h-2/4 px-10 flex items-center justify-around">
          <div className=" border border-orange-500 rounded-full w-72 h-72 bg-orange-500"></div>

          <div className="flex flex-col items-center gap-5 w-96">
            <h2 className="self-start font-bold text-2xl flex items-center gap-2">
              <Barbell size={40} className="-rotate-45" />
              Plano de Treinamento
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos magnam, quasi, deleniti porro, minus fuga architecto
              distinctio suscipit voluptates culpa dolor dolore minima?
              Necessitatibus obcaecati quae in quaerat. Neque, iure!
            </p>
            <button
              className="
              flex items-center gap-2 
              border border-orange-600 rounded-md px-4 py-2 bg-orange-500 hover:bg-orange-400
              mt-5"
            >
              Começe Agora
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </article>

        <article className="h-2/4 px-10 flex items-center justify-around bg-green-900">
          <div className="flex flex-col items-center gap-5 w-96">
            <h2 className="self-start font-bold text-2xl flex items-center gap-2">
              <Knife size={40} />
              Plano Alimentar
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos magnam, quasi, deleniti porro, minus fuga architecto
              distinctio suscipit voluptates culpa dolor dolore minima?
              Necessitatibus obcaecati quae in quaerat. Neque, iure!
            </p>
            <button
              className="
              flex items-center gap-2 
              border border-green-600 rounded-md px-4 py-2 bg-green-500 hover:bg-green-400
              mt-5"
            >
              Começe Agora
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
          <div className=" border border-green-500 rounded-full w-72 h-72 bg-green-500"></div>
        </article>
      </section>

      <section className="px-10 h-screen flex flex-col items-center justify-center gap-5">
        <article className="flex flex-col items-center justify-center gap-4 w-3/4">
          <h2 className="text-2xl font-bold">Para Profissionais</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
            laboriosam quas exercitationem? Dolorem earum eum inventore animi
            consectetur. Earum necessitatibus aut nemo, error impedit tempore
            harum repellendus sunt facilis debitis? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Magni aliquam, placeat error nemo
            commodi esse tenetur, doloribus, minus ipsa culpa accusantium beatae
            voluptates rerum illo. Quaerat ea qui nisi a.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea quo
            quis fugit pariatur earum! Quas quasi odit ut animi rem, beatae,
            eaque facere quae eos impedit nulla id iusto ipsa.
          </p>
        </article>

        <article
          className="
            flex 
            gap-5 
            items-center 
            justify-center 
            bg-sky-700 
            rounded-xl 
            p-8 
            mt-12 
            shadow-sm
            max-w-4xl
          "
        >
          <div className="flex flex-col gap-5 border-r-2">
            <Person size={32} />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Molestias laborum repudiandae tempora harum minima, ipsum
            </p>
          </div>

          <div className="flex flex-col gap-5 border-r-2">
            <Barbell size={32} />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Molestias laborum repudiandae tempora harum minima, ipsum
            </p>
          </div>

          <div className="flex flex-col gap-5 border-r-2 pl-3">
            <Knife size={32} />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Molestias laborum repudiandae tempora harum minima, ipsum
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <Money size={32} />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Molestias laborum repudiandae tempora harum minima, ipsum
            </p>
          </div>
        </article>
      </section>

      <footer className="bg-zinc-700 px-10 py-10">
        RODAPE AQUI
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam ea
          ipsa nemo, suscipit reprehenderit facilis architecto, dolores pariatur
          repudiandae, iusto nihil qui dicta possimus laudantium. Qui magni unde
          consequatur inventore!
        </p>
      </footer>
    </main>
  )
}
