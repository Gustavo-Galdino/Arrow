'use client'

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { isLoaded } = useUser()

  return (
    <nav className="flex items-center justify-between p-5 px-2 sm:px-10">
      <div className=" flex w-full flex-wrap items-center justify-between">
        <Link href="/" className="text-4xl font-bold">
          Arrow
        </Link>

        {isLoaded ? (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          >
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        ) : (
          ''
        )}

        <SignedIn>
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } mt-4 w-full md:block md:w-auto`}
          >
            <ul className="flex flex-col items-center gap-8 font-medium md:flex-row">
              <li>
                <Link href="/training">Treino</Link>
              </li>
              <li>
                <Link href="/diet">Dieta</Link>
              </li>
              <li>
                <Link href="/stoke">Estoque</Link>
              </li>
              <li>
                <Link href="/profile">Perfil</Link>
              </li>
              <li>
                <UserButton afterSignOutUrl="/" />
              </li>
            </ul>
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  )
}

/*



*/
