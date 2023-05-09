import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/logo.svg'

export function Navbar() {
  return (
    <nav
      className="
          bg-sky-700
            w-full px-8 py-4 
            flex items-center justify-between 
            fixed top-0
            z-10
            shadow-sm
          "
    >
      <Image src={logo} alt="Arrow" width={100} className="my-0" />
      <section className="flex gap-4 mr-10">
        <Link
          href="/"
          className="no-underline hover:underline underline-offset-4"
        >
          Home
        </Link>
        <Link
          href="/diet"
          className="no-underline hover:underline underline-offset-4"
        >
          Plano Alimentar
        </Link>
        <Link
          href="/training"
          className="no-underline hover:underline underline-offset-4"
        >
          Plano de Treinamento
        </Link>
        <Link
          href="/"
          className="no-underline hover:underline underline-offset-4"
        >
          Perfil
        </Link>
      </section>
    </nav>
  )
}
