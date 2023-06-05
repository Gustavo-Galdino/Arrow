'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export function Header() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <header className="h-20 w-full">
      <nav className="container flex h-full items-center justify-between">
        <div>
          <Link href="/" className="text-4xl font-semibold underline">
            Arrow
          </Link>
        </div>
        <ul className="flex items-center gap-4">
          <li>
            <Link className="hover:text-gray-50" href="/">
              Inicio
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link className="hover:text-gray-50" href="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-50" href="/register">
                  Registrar
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link className="hover:text-gray-50" href="/profile">
                  Perfil
                </Link>
              </li>
              <li className="cursor-pointer" onClick={() => signOut()}>
                Sair
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
